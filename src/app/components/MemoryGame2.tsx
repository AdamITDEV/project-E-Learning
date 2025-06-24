"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Dữ liệu thẻ bài - Level 1 (8 cặp)
const cardData1 = [
  {
    id: 1,
    content: "Níu Con Bò",
    pairId: 1,
    image: "/images/niu.png",
    matched: false,
  },
  {
    id: 2,
    content: "Con Bò",
    pairId: 1,
    image: "/images/conbo.jpg",
    matched: false,
  },
  {
    id: 3,
    content: "ij con gà",
    pairId: 2,
    image: "/images/ji.png",
    matched: false,
  },
  {
    id: 4,
    content: "con gà",
    pairId: 2,
    image: "/images/conga.jpg",
    matched: false,
  },
  {
    id: 5,
    content: "lóng con rồng",
    pairId: 3,
    image: "/images/long.png",
    matched: false,
  },
  {
    id: 6,
    content: "Con Rồng",
    pairId: 3,
    image: "/images/conrong.jpg",
    matched: false,
  },
  {
    id: 7,
    content: "Qiú quả bóng",
    pairId: 4,
    image: "/images/qíu.png",
    matched: false,
  },
  {
    id: 8,
    content: "Quả Bóng",
    pairId: 4,
    image: "/images/quabong.jpg",
    matched: false,
  },
  {
    id: 9,
    content: "Yè ban đêm",
    pairId: 5,
    image: "/images/ỳe.png",
    matched: false,
  },
  {
    id: 10,
    content: "ban đêm",
    pairId: 5,
    image: "/images/bandem.jpg",
    matched: false,
  },
  {
    id: 11,
    content: "Hẽ Uống Nước",
    pairId: 6,
    image: "/images/hẽ.png",
    matched: false,
  },
  {
    id: 12,
    content: "Uống Nước",
    pairId: 6,
    image: "/images/uongnuoc.jpg",
    matched: false,
  },
  {
    id: 13,
    content: "ya cái răng",
    pairId: 7,
    image: "/images/ya.png",
    matched: false,
  },
  {
    id: 14,
    content: "Răng",
    pairId: 7,
    image: "/images/cairang.jpg",
    matched: false,
  },
  {
    id: 15,
    content: "dẽng đèn học",
    pairId: 8,
    image: "/images/dẽng.png",
    matched: false,
  },
  {
    id: 16,
    content: "Đèn học",
    pairId: 8,
    image: "/images/denhoc.png",
    matched: false,
  },
];

// Dữ liệu thẻ bài - Level 2 (8 cặp khác)
const cardData2 = [
  {
    id: 1,
    content: "Hoa hồng",
    pairId: 1,
    image: "/images/hoa_hong.jpg",
    matched: false,
  },
  {
    id: 2,
    content: "Rose",
    pairId: 1,
    image: "/images/rose.jpg",
    matched: false,
  },
  {
    id: 3,
    content: "Con mèo",
    pairId: 2,
    image: "/images/con_meo.jpg",
    matched: false,
  },
  {
    id: 4,
    content: "Cat",
    pairId: 2,
    image: "/images/cat.jpg",
    matched: false,
  },
  {
    id: 5,
    content: "Quả táo",
    pairId: 3,
    image: "/images/qua_tao.jpg",
    matched: false,
  },
  {
    id: 6,
    content: "Apple",
    pairId: 3,
    image: "/images/apple.jpg",
    matched: false,
  },
  {
    id: 7,
    content: "Mặt trời",
    pairId: 4,
    image: "/images/mat_troi.jpg",
    matched: false,
  },
  {
    id: 8,
    content: "Sun",
    pairId: 4,
    image: "/images/sun.jpg",
    matched: false,
  },
  {
    id: 9,
    content: "Quyển sách",
    pairId: 5,
    image: "/images/quyen_sach.jpg",
    matched: false,
  },
  {
    id: 10,
    content: "Book",
    pairId: 5,
    image: "/images/book.jpg",
    matched: false,
  },
  {
    id: 11,
    content: "Cái bàn",
    pairId: 6,
    image: "/images/cai_ban.jpg",
    matched: false,
  },
  {
    id: 12,
    content: "Table",
    pairId: 6,
    image: "/images/table.jpg",
    matched: false,
  },
  {
    id: 13,
    content: "Bông hoa",
    pairId: 7,
    image: "/images/bong_hoa.jpg",
    matched: false,
  },
  {
    id: 14,
    content: "Flower",
    pairId: 7,
    image: "/images/flower.jpg",
    matched: false,
  },
  {
    id: 15,
    content: "Con chó",
    pairId: 8,
    image: "/images/con_cho.jpg",
    matched: false,
  },
  {
    id: 16,
    content: "Dog",
    pairId: 8,
    image: "/images/dog.jpg",
    matched: false,
  },
];

export default function MemoryGame2() {
  const [cards, setCards] = useState<typeof cardData1>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);

  // Khởi tạo game
  const initGame = useCallback(() => {
    const currentCardData = currentLevel === 1 ? cardData1 : cardData2;
    const shuffledCards = [...currentCardData]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, matched: false }));

    setCards(shuffledCards);
    setFlipped([]);
    setMoves(0);
    setGameComplete(false);
  }, [currentLevel]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  // Chuyển level
  const goToNextLevel = () => {
    setCurrentLevel(2);
    setGameComplete(false);
    setTimeout(initGame, 100);
  };

  // Quay lại level 1
  const goToPreviousLevel = () => {
    setCurrentLevel(1);
    initGame();
  };

  // Xử lý khi click vào thẻ
  const handleClick = (id: number) => {
    if (
      disabled ||
      flipped.includes(id) ||
      cards.find((card) => card.id === id)?.matched
    )
      return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      checkForMatch(newFlipped);
    }
  };

  // Kiểm tra cặp thẻ
  const checkForMatch = (flippedCards: number[]) => {
    setDisabled(true);
    const [firstId, secondId] = flippedCards;
    const firstCard = cards.find((card) => card.id === firstId);
    const secondCard = cards.find((card) => card.id === secondId);

    if (firstCard?.pairId === secondCard?.pairId) {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === firstId || card.id === secondId
            ? { ...card, matched: true }
            : card
        )
      );
      resetTurn();
    } else {
      setTimeout(resetTurn, 1000);
    }
  };

  const checkGameComplete = useCallback(() => {
    const allMatched = cards.length > 0 && cards.every((card) => card.matched);
    setGameComplete(allMatched);
  }, [cards]);

  const resetTurn = useCallback(() => {
    setFlipped([]);
    setDisabled(false);
    checkGameComplete();
  }, [checkGameComplete]);

  useEffect(() => {
    if (cards.length > 0) {
      const allMatched = cards.every((card) => card.matched);
      if (allMatched) {
        setGameComplete(true);
      }
    }
  }, [cards]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-2">
          Trò Chơi Lật Thẻ - Bài {currentLevel} Thanh Điệu
        </h1>
        <p className="text-center text-gray-600 mb-6">
          {currentLevel === 1
            ? "Ghép đúng thanh điệu với hình ảnh tương ứng"
            : "Level nâng cao - Ghép từ tiếng Việt với tiếng Anh"}
        </p>

        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-semibold text-blue-600">
            Số lượt: <span className="font-bold">{moves}</span>
          </div>
          <button
            onClick={initGame}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Chơi lại
          </button>
        </div>

        {gameComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            style={{ backdropFilter: "blur(5px)" }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full mx-4"
            >
              <h2 className="text-3xl font-bold text-green-600 mb-4">
                🎉 Hoàn thành!
              </h2>
              <p className="text-xl mb-6">
                Bạn đã hoàn thành level {currentLevel} với {moves} lượt!
              </p>
              <div className="flex flex-col space-y-4">
                <button
                  onClick={initGame}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
                >
                  Chơi lại
                </button>
                {currentLevel === 1 ? (
                  <button
                    onClick={goToNextLevel}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                  >
                    Level nâng cao
                  </button>
                ) : (
                  <button
                    onClick={goToPreviousLevel}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-semibold"
                  >
                    Quay lại Level 1
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}

        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="grid grid-cols-4 gap-3 w-[540px] h-[540px]">
            {cards.map((card) => (
              <motion.div
                key={card.id}
                className="aspect-square cursor-pointer relative rounded-md overflow-hidden shadow-sm"
                onClick={() => handleClick(card.id)}
                whileHover={{
                  scale: flipped.includes(card.id) || card.matched ? 1 : 1.05,
                }}
                animate={{
                  rotateY: flipped.includes(card.id) || card.matched ? 180 : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                {/* Mặt sau thẻ */}
                <motion.div
                  className="absolute inset-0 bg-blue-500"
                  animate={{
                    opacity: flipped.includes(card.id) || card.matched ? 0 : 1,
                    rotateY:
                      flipped.includes(card.id) || card.matched ? 180 : 0,
                  }}
                >
                  <Image
                    src="/images/bannerbai2.jpg"
                    alt="Card Back"
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Mặt trước thẻ */}
                <motion.div
                  className="absolute inset-0 bg-white flex items-center justify-center p-2"
                  animate={{
                    opacity: flipped.includes(card.id) || card.matched ? 1 : 0,
                    rotateY:
                      flipped.includes(card.id) || card.matched ? 180 : 0,
                  }}
                >
                  <div className="relative w-[120%] h-[120%]">
                    <Image
                      src={card.image}
                      alt="Card Front"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {gameComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            >
              <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm">
                <h2 className="text-2xl font-bold text-green-600 mb-3">
                  Hoàn thành với {moves} lượt!
                </h2>
                <button
                  onClick={initGame}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Chơi lại
                </button>
              </div>
            </motion.div>
          )}
        </div>

        <div className="mt-8 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-bold text-lg text-purple-600 mb-2">
            Hướng dẫn chơi:
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Level {currentLevel}:{" "}
              {currentLevel === 1
                ? "Ghép thanh điệu với hình ảnh tương ứng"
                : "Ghép từ tiếng Việt với từ tiếng Anh tương ứng"}
            </li>
            <li>
              Trong mỗi lượt chơi, người tham gia lật hai thẻ bất kỳ để quan sát
              nội dung.
            </li>
            <li>
              Nếu hai thẻ đó có nội dung tương ứng (ví dụ: giống hình ảnh, cùng
              từ vựng hoặc mang ý nghĩa khớp nhau), chúng sẽ được giữ nguyên
              trạng thái mở
            </li>
            <li>
              Nếu hai thẻ không khớp, người chơi cần ghi nhớ nội dung và vị trí,
              sau đó lật lại úp xuống như ban đầu.
            </li>
            <li>
              Quá trình này được lặp lại liên tục cho đến khi tất cả các cặp thẻ
              được tìm thấy và ghép đúng.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
