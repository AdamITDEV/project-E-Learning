// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { connectDB } from "@/app/lib/db";
import User from "@/app/models/User";

interface CustomUser {
  id: string;
  email: string;
  name: string;
  username: string;
  isTeacher?: boolean;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({ email: credentials?.email }).select(
          "+password"
        );
        if (!user) throw new Error("Invalid email or password");

        const isValid = await bcrypt.compare(
          credentials!.password!,
          user.password
        );
        if (!isValid) throw new Error("Invalid email or password");

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.username,
          username: user.username,
          isTeacher: user.isTeacher, // Quan trọng để truyền trong token
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email ?? "";
        token.isTeacher = (user as CustomUser).isTeacher;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.isTeacher = token.isTeacher as boolean | undefined;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

// Export NextAuth handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
