"use client";
import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { motion } from "framer-motion";
const question = {
  text: "Gấu trúc thường ăn gì?",
  options: ["Thịt", "Tre", "Táo", "Cá"],
  correct: 1, // Index of "Tre"
};

export default function ArcheryGame() {
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);

  const handleAnswer = (index: number) => {
    setSelected(index);
    if (index === question.correct) {
      setResult("correct");
    } else {
      setResult("wrong");
    }
  };

  return (
    <div className="relative w-full h-[500px] bg-gradient-to-b from-blue-100 to-blue-300 rounded-xl p-6">
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
          src="/images/bow.webp" // Replace with actual bow image
          alt="bow"
          fill
          className="object-contain"
        />
      </div>

      {/* Arrow */}
      {result && (
        <motion.div
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          animate={
            result === "correct"
              ? { x: 710, y: -23, rotate: -5, opacity: 1 }
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

      {/* Question Box */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-lg p-4 w-[90%] max-w-md">
        <h2 className="text-lg font-bold mb-4">{question.text}</h2>
        <div className="grid grid-cols-2 gap-4">
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              disabled={result !== null}
              onClick={() => handleAnswer(idx)}
              className={clsx(
                "py-2 px-3 rounded bg-blue-100 hover:bg-blue-200 transition",
                {
                  "bg-green-300":
                    selected === idx &&
                    result === "correct" &&
                    idx === question.correct,
                  "bg-red-300":
                    selected === idx &&
                    result === "wrong" &&
                    idx !== question.correct,
                }
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
