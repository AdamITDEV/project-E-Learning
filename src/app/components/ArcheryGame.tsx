"use client";
import { useState, useEffect } from "react";
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
  const [showQuestion, setShowQuestion] = useState(false);
  const [zoomIn, setZoomIn] = useState(false);

  const [showSmoke, setShowSmoke] = useState(false);
  const [showCompleteAttack, setShowCompleteAttack] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWukongEntered(true);
      setShowQuestion(true);
      setZoomIn(true);
      setShowSmoke(true); // Show smoke every time a new question appears
      setTimeout(() => setShowSmoke(false), 1000); // Hide smoke after 1 second
    }, 5000); // Delay before showing the question

    return () => clearTimeout(timer);
  }, [currentQuestionIndex]); // Trigger on question change

  useEffect(() => {
    const timer = setTimeout(() => {
      setWukongEntered(true);
      setShowQuestion(true);
      setZoomIn(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (result) return;

    const timer = setTimeout(() => {
      setWukongEntered(true);
      setShowQuestion(true);
      setZoomIn(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentQuestionIndex, result]);

  const [wukongEntered, setWukongEntered] = useState(false);
  const [bossVisible, setBossVisible] = useState(true);

  const currentQuestion = !gameOver ? questions[currentQuestionIndex] : null;

  useEffect(() => {
    const timer = setTimeout(() => {
      setWukongEntered(true);
      setShowQuestion(true);
      setZoomIn(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentQuestionIndex]);

  const handleAnswer = (index: number) => {
    if (gameOver || result) return;
    setSelected(index);
    const isCorrect = index === currentQuestion!.correct;
    setResult(isCorrect ? "correct" : "wrong");
    setShowQuestion(false);

    setTimeout(() => {
      // Chỉ hiện complete_attack nếu đúng
      if (isCorrect) {
        setShowCompleteAttack(true);

        setTimeout(() => {
          setShowCompleteAttack(false);
        }, 1000); // Ẩn sau 1s
      }

      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
          resetQuestion();
          setBossVisible(true);
        } else {
          setWon(true);
          setGameOver(true);
        }
      }, 2700);
    }, 800);
  };

  const resetQuestion = () => {
    setSelected(null);
    setResult(null);
    setShowQuestion(false);
    setZoomIn(false);

    setWukongEntered(false);
  };

  const restartGame = () => {
    setCurrentQuestionIndex(0);
    setSelected(null);
    setResult(null);
    setLives(3);
    setGameOver(false);
    setWon(false);
    setShowQuestion(false);
    setWukongEntered(false);
    setBossVisible(true);
  };

  return (
    <div
      className="relative w-full h-[550px] bg-cover bg-center rounded-xl p-6 overflow-hidden"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      {/* Boss */}

      {showSmoke && bossVisible && (
        <div className="absolute right-20 top-1/2 transform -translate-y-1/2 w-[450px] h-[450px] pointer-events-none">
          <Image
            src="/images/smoke.gif"
            alt="Smoke Effect"
            fill
            className="object-contain"
          />
        </div>
      )}

      {/* Wukong flying in */}
      {!wukongEntered && !result && (
        <motion.div
          animate={{ x: wukongEntered ? 100 : 400, y: 10, opacity: 1 }}
          initial={{ x: -200, y: -100, opacity: 0 }}
          transition={{ duration: 5, ease: "easeInOut" }}
          className="absolute w-[350px] h-[350px] top-32"
        >
          <Image
            src="/images/shifu.png"
            alt="Shifu"
            fill
            className="object-contain transform scale-x-[-1] ml-[-100px] mt-[-120px] " // Flips the image vertically
          />
          <Image
            src="/images/sky.png"
            alt="Shifu"
            fill
            className="object-contain transform scale-x-[-1] ml-[-100px] mb-[-120px] " // Flips the image vertically
          />
          <Image
            src="/images/WukongPanda.png"
            alt="Wukong Panda"
            fill
            className="object-contain"
          />
        </motion.div>
      )}
      {/* Boss */}
      {bossVisible && (!wukongEntered || result === "wrong") && (
        <motion.div
          initial={{
            x: result === "wrong" ? -600 : 0, // Bắt đầu từ bên trái
            y: 0,
            opacity: 1,
          }}
          animate={{
            x: result === "wrong" ? 400 : 0, // Di chuyển thẳng qua phải
            opacity: result === "wrong" ? 0 : 1, // Mờ dần khi di chuyển xong
          }}
          transition={{
            x: { duration: 2, ease: "easeInOut" }, // Di chuyển mượt trong 2 giây
            opacity: { duration: 1, ease: "easeInOut", delay: 2 }, // Mờ dần sau khi di chuyển xong
          }}
          className="absolute right-20 top-1/2 transform -translate-y-1/2 w-[420px] h-[420px]"
        >
          {/* Boss image */}
          <Image
            src="/images/boss.png"
            alt="boss"
            fill
            className="object-contain z-50"
          />

          {/* Sky always */}
          <div className="absolute right-[-50px] top-[320px] transform -translate-y-1/2 w-[450px] h-[450px] z-10">
            <Image
              src="/images/sky.png"
              alt="Sky"
              fill
              className="object-contain"
            />
          </div>

          {/* Shifu + Sky chỉ khi wrong */}
          {result === "wrong" && (
            <>
              <Image
                src="/images/shifu.png"
                alt="Shifu"
                fill
                className="object-contain transform scale-x-[-1] ml-[-100px] mt-[-120px]"
              />
              <Image
                src="/images/sky.png"
                alt="Shifu"
                fill
                className="object-contain transform scale-x-[-1] ml-[-100px] mb-[-120px]"
              />
            </>
          )}
        </motion.div>
      )}

      {/* Shifu */}
      {result === "wrong" && !wukongEntered && (
        <motion.div
          animate={{
            x: 500, // Di chuyển sang phải khi sai
            y: 10,
            opacity: 1,
          }}
          initial={{ x: -200, y: -100, opacity: 0 }}
          transition={{ duration: 5, ease: "easeInOut" }}
          className="absolute w-[350px] h-[350px] top-32"
        >
          <Image
            src="/images/shifu.png"
            alt="Shifu"
            fill
            className="object-contain transform scale-x-[-1] ml-[-100px] mt-[-120px]" // Flips the image vertically
          />
          <Image
            src="/images/sky.png"
            alt="Shifu"
            fill
            className="object-contain transform scale-x-[-1] ml-[-100px] mb-[-120px]" // Flips the image vertically
          />
          <Image
            src="/images/WukongPanda.png"
            alt="Wukong Panda"
            fill
            className="object-contain"
          />
        </motion.div>
      )}

      {/* Attack arrow */}
      {result === "correct" && (
        <>
          {/* Attack animation */}
          <motion.div
            key={`attack-${selected}`}
            initial={{ x: 200, y: 100, opacity: 1 }}
            animate={{ x: 600, y: 100, rotate: 360, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute w-[300px] h-[300px] left-0 top-0 z-30"
          >
            <Image
              src="/images/attack.png"
              alt="Attack"
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Boss image */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{
              opacity: result === "correct" ? 0 : 1,
              scale: result === "correct" ? 0.5 : 1,
              y: result === "correct" ? 100 : 0,
            }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute w-[400px] h-[400px] left-[600px] top-[100px] z-10"
          >
            <Image
              src="/images/boss.png"
              alt="Boss"
              fill
              className="object-contain"
            />
            <div className="absolute right-[-50px] top-[320px] transform -translate-y-1/2 w-[450px] h-[450px] z-10">
              <Image
                src="/images/sky.png"
                alt="Sky"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* Wukong image */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ x: 700, y: 0, rotate: 10, opacity: 1 }}
            transition={{ delay: 2.1, duration: 1.0 }}
            className="absolute w-[350px] h-[350px] left-[100px] top-[100px] z-20"
          >
            <Image
              src="/images/WukongPanda.png"
              alt="Wukong"
              fill
              className="object-contain"
            />
          </motion.div>
        </>
      )}

      {showCompleteAttack && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.6 }} // giữ animation ngắn để Wukong bay sau
          className="absolute w-[500px] h-[500px] top-[100px] left-[500px] z-50 pointer-events-none"
        >
          <Image
            src="/images/complete_attack.png"
            alt="Complete Attack"
            fill
            className="object-contain"
          />
        </motion.div>
      )}

      {result === "wrong" && (
        <motion.div
          key={`miss-${selected}`}
          initial={{ x: 200, y: 100, opacity: 1 }}
          animate={{ x: 600, y: 300, rotate: 100, opacity: 0.5 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute w-[400px] h-[400px] left-0 top-0 z-30"
        >
          <Image
            src="/images/attack.png"
            alt="Miss"
            fill
            className="object-contain"
          />
        </motion.div>
      )}

      {/* Lives */}
      <div className="absolute top-4 left-4 text-lg font-bold text-red-600">
        ❤️ {lives}
      </div>

      {/* Question box */}
      {showQuestion && currentQuestion && !gameOver && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={zoomIn ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-lg p-6 w-[90%] h-[90%] max-w-4xl flex flex-col justify-start items-center"
        >
          <h2 className="text-2xl font-extrabold text-green-700 mb-6 text-center">
            Câu hỏi
          </h2>
          <p className="text-lg font-semibold mb-8 text-center">
            {currentQuestion.text}
          </p>
          <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
            {currentQuestion.options.map((opt, idx) => {
              const optionLetter = String.fromCharCode(97 + idx); // 'a', 'b', ...
              const isCorrect = selected === idx && result === "correct";
              const isWrong = selected === idx && result === "wrong";

              const baseColors = [
                "bg-blue-200",
                "bg-pink-200",
                "bg-green-200",
                "bg-orange-200",
              ];

              return (
                <button
                  key={idx}
                  disabled={result !== null}
                  onClick={() => handleAnswer(idx)}
                  className={clsx(
                    "flex items-center gap-3 px-6 py-3 rounded-full text-left shadow-md transition duration-300",
                    baseColors[idx],
                    {
                      "bg-green-400": isCorrect,
                      "bg-red-300": isWrong,
                      "opacity-60": result !== null && selected !== idx,
                      "cursor-not-allowed": result !== null,
                    }
                  )}
                >
                  <span className="w-8 h-8 rounded-full bg-white text-center font-bold text-md flex items-center justify-center border border-gray-400">
                    {optionLetter}
                  </span>
                  <span className="font-medium">{opt}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Game Over / Win */}
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
