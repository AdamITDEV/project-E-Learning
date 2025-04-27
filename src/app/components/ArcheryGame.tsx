"use client";
import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { motion } from "framer-motion";

const questions = [
  {
    text: "Gấu trúc thường ăn gì?",
    options: ["Thịt", "Tre", "Táo", "Cá"],
    correct: 1,
  },
  {
    text: "Mặt trời mọc hướng nào?",
    options: ["Bắc", "Nam", "Đông", "Tây"],
    correct: 2,
  },
  {
    text: "Con vật nào biết bay?",
    options: ["Cá mập", "Chim sẻ", "Sư tử", "Cá voi"],
    correct: 1,
  },
  {
    text: "Mùa nào thường lạnh nhất?",
    options: ["Xuân", "Hạ", "Thu", "Đông"],
    correct: 3,
  },
];

export default function ArcheryGame() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const handleAnswer = (index: number) => {
    if (gameOver) return; // Nếu đã game over thì không làm gì nữa
    setSelected(index);

    const isCorrect = index === questions[currentQuestionIndex].correct;

    if (isCorrect) {
      setResult("correct");
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
          resetQuestion();
        } else {
          setWon(true);
          setGameOver(true);
        }
      }, 1500);
    } else {
      setResult("wrong");
      setLives((prev) => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setTimeout(() => setGameOver(true), 1000);
        }
        return newLives;
      });
    }
  };

  const resetQuestion = () => {
    setSelected(null);
    setResult(null);
  };

  const restartGame = () => {
    setCurrentQuestionIndex(0);
    setSelected(null);
    setResult(null);
    setLives(3);
    setGameOver(false);
    setWon(false);
  };

  const currentQuestion = !gameOver ? questions[currentQuestionIndex] : null;

  return (
    <div className="relative w-full h-[550px] bg-gradient-to-b from-blue-100 to-blue-300 rounded-xl p-6 overflow-hidden">
      {/* Target */}
      <div
        className="absolute right-40 top-1/2 transform -translate-y-1/2"
        style={{ width: "200px", height: "200px" }}
      >
        <Image
          src="/images/target.webp"
          alt="target"
          fill
          className="object-contain"
        />
      </div>

      {/* Bow */}
      <div className="absolute left-10 top-55 w-[100px] h-[100px]">
        <Image
          src="/images/bow.webp"
          alt="bow"
          fill
          className="object-contain"
        />
      </div>

      {/* Arrow */}
      {result && (
        <motion.div
          key={selected}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          animate={
            result === "correct"
              ? { x: 710, y: -5, rotate: -5, opacity: 1 }
              : { x: 800, y: -200, rotate: 45, opacity: 0 }
          }
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute left-[110px] top-[220px]"
        >
          <Image
            src="/images/arrow.webp"
            alt="arrow"
            width={128}
            height={32}
            className="object-contain"
          />
        </motion.div>
      )}

      {/* Lives */}
      <div className="absolute top-4 left-4 text-lg font-bold text-red-600">
        ❤️ {lives}
      </div>

      {/* Question Box */}
      {currentQuestion && !gameOver && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-lg p-4 w-[90%] max-w-md">
          <h2 className="text-lg font-bold mb-4">{currentQuestion.text}</h2>
          <div className="grid grid-cols-2 gap-4">
            {currentQuestion.options.map((opt, idx) => (
              <button
                key={idx}
                disabled={result === "correct"}
                onClick={() => handleAnswer(idx)}
                className={clsx(
                  "py-2 px-3 rounded bg-blue-100 hover:bg-blue-200 transition",
                  {
                    "bg-green-300":
                      selected === idx &&
                      result === "correct" &&
                      idx === currentQuestion.correct,
                    "bg-red-300":
                      selected === idx &&
                      result === "wrong" &&
                      idx === selected,
                  }
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Game Over / Win Box */}
      {gameOver && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md text-center">
          <h2 className="text-xl font-bold mb-4">
            {won ? "🎉 Chiến thắng!" : "💀 Game Over!"}
          </h2>
          <button
            onClick={restartGame}
            className="px-6 py-3 bg-green-400 rounded-lg hover:bg-green-500 transition font-semibold"
          >
            Bắt đầu lại
          </button>
        </div>
      )}
    </div>
  );
}
