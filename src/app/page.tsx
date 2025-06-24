"use client";
import Image from "next/image";
import { JSX, useEffect, useState } from "react";
import ArcheryGame from "./components/ArcheryGame";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import MemoryGame1 from "./components/MemoryGame1";
import MemoryGame2 from "./components/MemoryGame2";
import ListeningGame from "./components/ListeningGame7";

// Define a type for our games
type Game = {
  id: string;
  title: string;
  description: string;
  component: JSX.Element;
  image: string;
};

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTopic, setIsOpenTopic] = useState(false);
  const [selectedContent, setSelectedContent] = useState<
    "home" | "game" | "vocab" | null
  >("home");
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState<number | null>(
    null
  );

  const { data: session } = useSession();

  // List of available games
  const games1: Game[] = [
    {
      id: "archery",
      title: "Bé Phiêu Lưu Ký",
      description: "Trò chơi bắn cung giúp học từ vựng",
      component: <ArcheryGame />,
      image: "/images/game1.png",
    },
    {
      id: "memory",
      title: "Trò Chơi Lật Thẻ",
      description: "Lật thẻ và tìm cặp từ vựng phù hợp",
      component: <MemoryGame1 />,
      image: "/images/game2.png",
    },
    {
      id: "quiz",
      title: "Bạn Nghe Được Gì",
      description: "Trả lời câu hỏi nhanh để ghi điểm",
      component: (
        <div className="text-center mt-10 text-2xl font-bold text-orange-600">
          ❓ Đố Vui Học Tập (Coming Soon)
        </div>
      ),
      image: "/images/quiz_thumb.jpg",
    },
  ];
  const games2: Game[] = [
    {
      id: "1",
      title: "Bé Phiêu Lưu Ký12",
      description: "Trò chơi bắn cung giúp học từ vựng",
      component: <ArcheryGame />,
      image: "/images/game1.png",
    },
    {
      id: "2",
      title: "Trò Chơi Lật Thẻ123",
      description: "Lật thẻ và tìm cặp từ vựng phù hợp",
      component: <MemoryGame2 />,
      image: "/images/bannergame2.jpg",
    },
    {
      id: "3",
      title: "Đố Vui Học Tập123",
      description: "Trả lời câu hỏi nhanh để ghi điểm",
      component: (
        <div className="text-center mt-10 text-2xl font-bold text-orange-600">
          ❓ Đố Vui Học Tập (Coming Soon)
        </div>
      ),
      image: "/images/quiz_thumb.jpg",
    },
  ];
  const games3: Game[] = [
    {
      id: "archery",
      title: "Bé Phiêu Lưu Ký",
      description: "Trò chơi bắn cung giúp học từ vựng",
      component: <ArcheryGame />,
      image: "/images/game1.png",
    },
    {
      id: "memory",
      title: "Trò Chơi Lật Thẻ",
      description: "Lật thẻ và tìm cặp từ vựng phù hợp",
      component: <MemoryGame1 />,
      image: "/images/game2.png",
    },
    {
      id: "quiz",
      title: "Bạn Nghe Được Gì",
      description: "Trả lời câu hỏi nhanh để ghi điểm",
      component: (
        <div className="text-center mt-10 text-2xl font-bold text-orange-600">
          ❓ Đố Vui Học Tập (Coming Soon)
        </div>
      ),
      image: "/images/quiz_thumb.jpg",
    },
  ];
  const games4: Game[] = [
    {
      id: "1",
      title: "Bé Phiêu Lưu Ký 2",
      description: "Trò chơi bắn cung giúp học từ vựng",
      component: <ArcheryGame />,
      image: "/images/game1.png",
    },
    {
      id: "2",
      title: "Trò Chơi Lật Thẻ 2",
      description: "Lật thẻ và tìm cặp từ vựng phù hợp",
      component: <MemoryGame2 />,
      image: "/images/bannergame2.jpg",
    },
    {
      id: "3",
      title: "Đố Vui Học Tập 2",
      description: "Trả lời câu hỏi nhanh để ghi điểm",
      component: (
        <div className="text-center mt-10 text-2xl font-bold text-orange-600">
          ❓ Đố Vui Học Tập (Coming Soon)
        </div>
      ),
      image: "/images/quiz_thumb.jpg",
    },
  ];
  const games5: Game[] = [
    {
      id: "archery",
      title: "Bé Phiêu Lưu Ký",
      description: "Trò chơi bắn cung giúp học từ vựng",
      component: <ArcheryGame />,
      image: "/images/game1.png",
    },
    {
      id: "memory",
      title: "Trò Chơi Lật Thẻ",
      description: "Lật thẻ và tìm cặp từ vựng phù hợp",
      component: <MemoryGame1 />,
      image: "/images/game2.png",
    },
    {
      id: "quiz",
      title: "Bạn Nghe Được Gì",
      description: "Trả lời câu hỏi nhanh để ghi điểm",
      component: (
        <div className="text-center mt-10 text-2xl font-bold text-orange-600">
          ❓ Đố Vui Học Tập (Coming Soon)
        </div>
      ),
      image: "/images/quiz_thumb.jpg",
    },
  ];
  const games6: Game[] = [
    {
      id: "1",
      title: "Bé Phiêu Lưu Ký12",
      description: "Trò chơi bắn cung giúp học từ vựng",
      component: <ArcheryGame />,
      image: "/images/game1.png",
    },
    {
      id: "2",
      title: "Trò Chơi Lật Thẻ123",
      description: "Lật thẻ và tìm cặp từ vựng phù hợp",
      component: <MemoryGame2 />,
      image: "/images/bannergame2.jpg",
    },
    {
      id: "3",
      title: "Đố Vui Học Tập123",
      description: "Trả lời câu hỏi nhanh để ghi điểm",
      component: (
        <div className="text-center mt-10 text-2xl font-bold text-orange-600">
          ❓ Đố Vui Học Tập (Coming Soon)
        </div>
      ),
      image: "/images/quiz_thumb.jpg",
    },
  ];
  const games7: Game[] = [
    {
      id: "archery",
      title: "Bé Phiêu Lưu Ký 7",
      description: "Trò chơi bắn cung giúp học từ vựng",
      component: <ArcheryGame />,
      image: "/images/game1.png",
    },
    {
      id: "memory",
      title: "Trò Chơi Lật Thẻ 7",
      description: "Lật thẻ và tìm cặp từ vựng phù hợp",
      component: <MemoryGame1 />,
      image: "/images/game2.png",
    },
    {
      id: "quiz",
      title: "Bạn Nghe Được Gì 7",
      description: "Trả lời câu hỏi nhanh để ghi điểm",
      component: <ListeningGame />,
      image: "/images/bannergame3.jpg",
    },
  ];
  const games8: Game[] = [
    {
      id: "1",
      title: "Bé Phiêu Lưu Ký12",
      description: "Trò chơi bắn cung giúp học từ vựng",
      component: <ArcheryGame />,
      image: "/images/game1.png",
    },
    {
      id: "2",
      title: "Trò Chơi Lật Thẻ123",
      description: "Lật thẻ và tìm cặp từ vựng phù hợp",
      component: <MemoryGame2 />,
      image: "/images/bannergame2.jpg",
    },
    {
      id: "3",
      title: "Đố Vui Học Tập123",
      description: "Trả lời câu hỏi nhanh để ghi điểm",
      component: (
        <div className="text-center mt-10 text-2xl font-bold text-orange-600">
          ❓ Đố Vui Học Tập (Coming Soon)
        </div>
      ),
      image: "/images/bannergame3.jpg",
    },
  ];
  const allGames = [
    games1, // Bài 1
    games2, // Bài 2
    games3, // Bài 3
    games4, // Bài 4
    games5, // Bài 5
    games6, // Bài 6
    games7, // Bài 7
    games8, // Bài 8
  ];
  const getCurrentGames = () => {
    if (selectedLessonIndex === null) return [];
    return allGames[selectedLessonIndex] || [];
  };
  const handleOpenTopic = () => {
    setIsOpenTopic(!isOpenTopic);
  };
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleGameSelect = (gameId: string) => {
    setSelectedContent("game");
    setSelectedGame(gameId);
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-blue-50 text-gray-800">
      {/* Top Navbar */}
      <header className="flex justify-between items-center bg-white px-6 py-4 shadow">
        <button className="hover:bg-gray-200 rounded-xl" onClick={handleOpen}>
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
        <nav className="space-x-4 hidden md:flex items-center">
          {session ? (
            <>
              <span className="text-blue-600">
                Xin chào, {session.user?.name}
              </span>
              <button onClick={() => signOut()} className="hover:text-blue-600">
                Đăng xuất
              </button>
            </>
          ) : (
            <Link className="hover:text-blue-600" href={"/login"}>
              Đăng Nhập
            </Link>
          )}
          <Link href="/submit" className="hover:text-blue-600">
            Nộp Bài
          </Link>

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
              onClick={() => {
                setSelectedContent("home");
                setSelectedGame(null);
              }}
              className="hover:text-blue-500 flex items-center"
            >
              <h2 className="text-lg font-semibold mb-4 flex">Home</h2>
            </button>
            <h2 className="text-lg font-semibold mb-4 flex">
              Bài Học{" "}
              <button onClick={handleOpenTopic}>
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
                              onClick={() => {
                                setSelectedLessonIndex(idx);
                                setSelectedContent("game");
                                setSelectedGame(null);
                              }}
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
                      {idx === 1 && (
                        <ul className="ml-4 mt-1 space-y-1 text-sm text-gray-700">
                          <li>
                            <button
                              onClick={() => {
                                setSelectedLessonIndex(idx);
                                setSelectedContent("game");
                                setSelectedGame(null);
                              }}
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
                      {idx === 6 && (
                        <ul className="ml-4 mt-1 space-y-1 text-sm text-gray-700">
                          <li>
                            <button
                              onClick={() => {
                                setSelectedLessonIndex(idx);
                                setSelectedContent("game");
                                setSelectedGame(null);
                              }}
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
              {session && (
                <div className="mb-6 p-4 bg-blue-100 rounded-lg">
                  <h2 className="text-xl font-bold text-blue-800">
                    Xin chào, {session.user?.name}!
                  </h2>
                  <p className="text-blue-600">
                    Bạn đã đăng nhập với email: {session.user?.email}
                  </p>
                </div>
              )}
              <div className="text-center">
                <Image
                  src="/images/bg_cutepanda.jpg"
                  alt="Cute Panda"
                  width={1920}
                  height={1080}
                  className="mx-auto w-[1200px] h-[600px] rounded-sm shadow-lg"
                />
              </div>
            </>
          )}

          {selectedContent === "game" && !selectedGame && (
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-center mb-8 text-blue-700">
                {selectedLessonIndex !== null
                  ? `Trò chơi Bài ${selectedLessonIndex + 1}`
                  : "Chọn Trò Chơi"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {getCurrentGames().map((game) => (
                  <div
                    key={game.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() => handleGameSelect(game.id)}
                  >
                    <div className="w-full h-72 relative">
                      <Image
                        src={game.image}
                        alt={game.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                      <p className="text-gray-600">{game.description}</p>
                      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                        Chơi Ngay
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedContent === "game" && selectedGame && (
            <div className="mt-10">
              {getCurrentGames().find((g) => g.id === selectedGame)?.component}
              <button
                onClick={() => setSelectedGame(null)}
                className="mt-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
              >
                ← Quay lại danh sách trò chơi
              </button>
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
