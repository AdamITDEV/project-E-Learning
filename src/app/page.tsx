"use client";
import Image from "next/image";
import { useState } from "react";
import ArcheryGame from "./components/ArcheryGame";
const categories = [
  { name: "Gấu trúc", icon: "🐼" },
  { name: "Gấu trắng", icon: "🐻‍❄️" },
  { name: "Panda mini", icon: "🧸" },
  { name: "Gấu xám", icon: "🐾" },
  { name: "Gấu hoạt hình", icon: "🌿" },
];

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTopic, setIsOpenTopic] = useState(false);
  const [selectedContent, setSelectedContent] = useState<
    "home" | "game" | "vocab"
  >("home");

  const handleOpenTopic = () => {
    setIsOpenTopic(!isOpenTopic);
  };
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50 text-gray-800">
      {/* Top Navbar */}
      <header className="flex justify-between items-center bg-white px-6 py-4 shadow">
        <button className="hover:bg-gray-200 rounded-xl" onClick={handleOpen}>
          {" "}
          <svg
            className="w-10 h-10 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="M5 7h14M5 12h14M5 17h14"
            />
          </svg>
        </button>
        <nav className="space-x-4 hidden md:flex">
          <a href="#" className="hover:text-blue-600">
            Sơ đồ
          </a>
          <a href="#" className="hover:text-blue-600">
            Nổi bật
          </a>
          <a href="#" className="hover:text-blue-600">
            Hỗ trợ
          </a>
        </nav>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        {isOpen && (
          <aside className="w-64 bg-white p-6 border-r hidden md:block">
            <button
              onClick={() => setSelectedContent("home")}
              className="hover:text-blue-500 flex items-center"
            >
              <h2 className="text-lg font-semibold mb-4 flex">Home</h2>
            </button>
            <h2 className="text-lg font-semibold mb-4 flex">
              Bài Học{" "}
              <button onClick={handleOpenTopic}>
                {" "}
                <svg
                  className="w-6 h-6 text-gray-800 ml-[20px] cursor-pointer"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 9-7 7-7-7"
                  />
                </svg>
              </button>
            </h2>
            {isOpenTopic && (
              <ul className=" space-y-2">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <li key={idx}>
                    <details className="group">
                      <summary className="cursor-pointer hover:text-blue-500">
                        Bài {idx + 1}
                      </summary>
                      {idx === 0 && (
                        <ul className="ml-4 mt-1 space-y-1 text-sm text-gray-700">
                          <li>
                            <button
                              onClick={() => setSelectedContent("game")}
                              className="hover:text-blue-500 flex items-center"
                            >
                              🧩 <span className="ml-1">Trò chơi</span>
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => setSelectedContent("vocab")}
                              className="hover:text-blue-500 flex items-center"
                            >
                              📚 <span className="ml-1">Ôn tập từ vựng</span>
                            </button>
                          </li>
                        </ul>
                      )}
                    </details>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        )}
        {/* Main Content */}
        <main className="flex-1 p-8">
          {selectedContent === "home" && (
            <>
              <div className="text-center mb-10">
                <Image
                  src="/panda.jpg"
                  alt="Cute Panda"
                  width={240}
                  height={240}
                  className="mx-auto"
                />
                <h2 className="text-3xl font-bold mt-4">
                  Chào mừng đến với Homepane!
                </h2>
                <p className="text-gray-600 mt-2">
                  Thế giới gấu trúc dễ thương đang chờ bạn!
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map((cat, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-xl shadow text-center hover:scale-105 transition"
                  >
                    <div className="text-4xl">{cat.icon}</div>
                    <p className="mt-2">{cat.name}</p>
                  </div>
                ))}
              </div>
            </>
          )}
          {selectedContent === "game" && (
            <div className="mt-10">
              <ArcheryGame />
            </div>
          )}

          {selectedContent === "vocab" && (
            <div className="text-center mt-10 text-2xl font-bold text-green-600">
              📚 Đây là phần Ôn tập từ vựng
            </div>
          )}
        </main>
      </div>

      <footer className="bg-white text-center py-4 shadow-inner mt-auto">
        © 2025 Panda UI. All rights reserved.
      </footer>
    </div>
  );
}
