"use client";

import { useState } from "react";
import clsx from "clsx";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);

    if (isLogin) {
      // Login
      const result = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/");
      }
    } else {
      // Register
      if (formData.get("password") !== formData.get("confirmPassword")) {
        setError("Passwords don't match");
        return;
      }

      const result = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          username: formData.get("username"),
          email: formData.get("email"),
          password: formData.get("password"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.ok) {
        // Auto-login after registration
        const loginResult = await signIn("credentials", {
          email: formData.get("email"),
          password: formData.get("password"),
          redirect: false,
        });

        if (loginResult?.error) {
          setError("Registration successful. Please login.");
          setIsLogin(true);
        } else {
          router.push("/");
        }
      } else {
        setError("Registration failed. Email may already exist.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={clsx(
              "px-4 py-2 rounded-l-full",
              isLogin ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
            )}
          >
            Đăng nhập
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={clsx(
              "px-4 py-2 rounded-r-full",
              !isLogin ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
            )}
          >
            Đăng ký
          </button>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {isLogin ? (
          <LoginForm onSubmit={handleSubmit} />
        ) : (
          <RegisterForm onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
}

const LoginForm = ({
  onSubmit,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <form className="space-y-4 text-black" onSubmit={onSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Mật khẩu"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Đăng nhập
      </button>
    </form>
  );
};

const RegisterForm = ({
  onSubmit,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <form className="space-y-4 text-black" onSubmit={onSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Tên người dùng"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Mật khẩu"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Xác nhận mật khẩu"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        Đăng ký
      </button>
    </form>
  );
};
