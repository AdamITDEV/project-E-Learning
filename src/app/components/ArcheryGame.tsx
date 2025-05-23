"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import clsx from "clsx";
import { motion } from "framer-motion";

const questions = [
  {
    text: "1. Trong các nguyên âm dưới đây nguyên âm nào là nguyên âm đơn?",
    options: ["i", "u", "ai", "e"],
    correct: 2,
  },
  {
    text: "2. Âm nào là nguyên âm?",
    options: ["b", "m", "u", "p"],
    correct: 2,
  },
  {
    text: "3. Nhìn hình chọn đáp án đúng:",
    options: ["mà", "bà", "pà", "fà"],
    correct: 3,
    image: "/images/hinhanhcau3bai1.jpg",
  },
  {
    text: "4. Trong 4 âm / d / t / n / l / âm nào phát âm bật hơi ?",
    options: ["n", "t", "l", "d"],
    correct: 1,
    audio: "audio/bai1cauhoi4.mp3",
  },
  {
    text: "5. Nhìn hình chọn đáp án đúng :",
    options: ["bà", "bá", "mà", "là"],
    correct: 1,
    image: "/images/hinhanhcau5bai1.jpg",
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVS, setShowVS] = useState(false);
  const backgroundSoundRef = useRef<HTMLAudioElement | null>(null);
  const [isBackgroundPlaying, setIsBackgroundPlaying] = useState(false);

  // Thêm useEffect để khởi tạo và phát nhạc nền
  useEffect(() => {
    // Khởi tạo audio
    backgroundSoundRef.current = new Audio("/audio/tayduky.mp3");
    backgroundSoundRef.current.loop = true; // Lặp lại nhạc nền

    // Tự động phát nhạc (cần xử lý trình duyệt chặn autoplay)
    const handlePlay = () => {
      backgroundSoundRef.current
        ?.play()
        .then(() => setIsBackgroundPlaying(true))
        .catch((e) => console.error("Lỗi phát nhạc nền:", e));
    };

    // Thêm sự kiện click để kích hoạt audio (vì nhiều trình duyệt chặn autoplay)
    document.addEventListener("click", handlePlay, { once: true });

    // Dọn dẹp
    return () => {
      backgroundSoundRef.current?.pause();
      backgroundSoundRef.current = null;
      document.removeEventListener("click", handlePlay);
    };
  }, []);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const handlePlayAudio = () => {
    if (!currentQuestion?.audio) return;

    // Dừng audio hiện tại nếu có
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    // Tạo audio mới
    const audio = new Audio(currentQuestion.audio);
    setCurrentAudio(audio);

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch((error) => console.error("Error playing audio:", error));

    audio.onended = () => {
      setIsPlaying(false);
    };
  };

  const handlePauseAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      setIsPlaying(false);
    }
  };

  const handleReplayAudio = () => {
    if (currentAudio) {
      currentAudio.currentTime = 0;
      currentAudio
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.error("Error replaying audio:", error));
    } else {
      handlePlayAudio();
    }
  };
  const [showSmoke, setShowSmoke] = useState(false);
  const [showCompleteAttack, setShowCompleteAttack] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setWukongEntered(true);
      setShowVS(true); // Hiển thị VS

      setTimeout(() => {
        setShowVS(false); // Ẩn VS sau 2 giây

        // Thêm delay 0.5s sau khi ẩn VS rồi mới hiện khói
        setTimeout(() => {
          setShowSmoke(true);

          setTimeout(() => {
            setShowSmoke(false); // Ẩn khói sau 1 giây
            setShowVS(false);
            // Thêm delay 0.5s sau khi ẩn khói rồi mới hiện câu hỏi
            setTimeout(() => {
              setShowQuestion(true);
              setZoomIn(true);
            }, 2000);
          }, 1000);
        }, 500);
      }, 800);
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentQuestionIndex]);

  // Three more almost identical effects...

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
  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        setIsPlaying(false);
      }
    };
  }, [currentAudio]);

  useEffect(() => {
    // Reset audio state khi chuyển câu hỏi
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setCurrentAudio(null);
    }
    setIsPlaying(false);
  }, [currentQuestionIndex]);

  const correctSoundRef = useRef<HTMLAudioElement | null>(null);
  const wrongSoundRef = useRef<HTMLAudioElement | null>(null);
  const attackSoundRef = useRef<HTMLAudioElement | null>(null);
  const smileSoundRef = useRef<HTMLAudioElement | null>(null);

  // Khởi tạo audio khi component mount
  useEffect(() => {
    correctSoundRef.current = new Audio("/audio/correct.mp3");
    wrongSoundRef.current = new Audio("/audio/wrong.mp3");
    attackSoundRef.current = new Audio("/audio/attack.mp3");
    smileSoundRef.current = new Audio("/audio/smile.mp3");

    // Dọn dẹp khi unmount
    return () => {
      [correctSoundRef, wrongSoundRef, attackSoundRef, smileSoundRef].forEach(
        (ref) => {
          if (ref.current) {
            ref.current.pause();
            ref.current = null;
          }
        }
      );
    };
  }, []);

  const handleAnswer = (index: number) => {
    if (gameOver || result) return;
    setSelected(index);
    const isCorrect = index === currentQuestion!.correct;
    setResult(isCorrect ? "correct" : "wrong");
    setShowQuestion(false);

    // Phát âm thanh tương ứng
    if (isCorrect) {
      correctSoundRef.current
        ?.play()
        .catch((e) => console.error("Error playing correct sound:", e));

      // Thêm delay để âm thanh attack phát cùng lúc với hiệu ứng
      setTimeout(() => {
        attackSoundRef.current
          ?.play()
          .catch((e) => console.error("Error playing attack sound:", e));
      }, 500); // Delay 0.5s để đồng bộ với animation
    } else {
      wrongSoundRef.current
        ?.play()
        .catch((e) => console.error("Error playing wrong sound:", e));
      smileSoundRef.current
        ?.play()
        .catch((e) => console.error("Error playing smile sound:", e));
      setLives((prev) => prev - 1);
    }

    setTimeout(() => {
      // Chỉ hiện complete_attack nếu đúng
      if (isCorrect) {
        setShowCompleteAttack(true);
        setTimeout(() => {
          setShowCompleteAttack(false);
        }, 1000);
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
      {showVS && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.5, 1.5], // Scale lên 1.5 và giữ nguyên
            opacity: [0, 1, 1], // Opacity lên 1 và giữ nguyên
          }}
          transition={{
            duration: 1, // Tổng thời gian animation là 2 giây
            times: [0, 0.3, 1], // 30% đầu để scale/opacity lên, 70% còn lại giữ nguyên
          }}
          className="relative top-1/2 left-1/2 mt-[-100px] transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] z-50 pointer-events-none"
        >
          <Image
            src="/images/vs.jpg"
            alt="VS"
            width={700}
            height={600}
            className="object-contain"
          />
        </motion.div>
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
            x: result === "wrong" ? -600 : 0, // Bắt đầu từ bên trái khi sai
            scale: 1,
            opacity: 1,
          }}
          animate={{
            x: result === "wrong" ? 400 : 0, // Bay sang phải khi sai
            scale: result === "wrong" ? 0.2 : 1, // Zoom out khi sai
            opacity: result === "wrong" ? 0 : 1, // Mờ dần khi sai
          }}
          transition={{
            x: { duration: 2, ease: "easeInOut" },
            scale: { duration: 2, ease: "easeInOut" },
            opacity: { duration: 1, ease: "easeInOut", delay: 2 },
          }}
          className="absolute right-20 top-1/2 transform -translate-y-1/2 w-[320px] h-[320px]"
        >
          {/* Boss image */}
          <Image
            src="/images/boss.png"
            alt="boss"
            fill
            className="object-contain z-50"
          />

          {/* Sky luôn xuất hiện */}
          <div className="absolute right-[-50px] z-50 top-[270px] transform -translate-y-1/2 w-[450px] h-[450px] ">
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
                alt="Shifu Sky"
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
            animate={{
              x: 600,
              y: 100,
              rotate: 360,
              opacity: [1, 1, 0], // giữ opacity 1 một lúc rồi giảm dần về 0
            }}
            transition={{
              duration: 1, // tổng thời gian
              ease: "easeOut",
              times: [0, 0.75, 1], // 75% thời gian đầu opacity=1, 25% còn lại opacity giảm xuống 0
            }}
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
            className="absolute w-[320px] h-[320px] left-[600px] top-[100px] z-10"
          >
            <Image
              src="/images/boss.png"
              alt="Boss"
              fill
              className="object-contain"
            />
            <div className="absolute right-[-50px] top-[270px] z-50 transform -translate-y-1/2 w-[450px] h-[450px] ">
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
            animate={{ x: 800, y: 0, rotate: 10, opacity: 1 }}
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
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={() => {
            if (isBackgroundPlaying) {
              backgroundSoundRef.current?.pause();
            } else {
              backgroundSoundRef.current?.play();
            }
            setIsBackgroundPlaying(!isBackgroundPlaying);
          }}
          className="p-2 bg-white rounded-full shadow-md"
        >
          {isBackgroundPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          )}
        </button>

        <div className="text-lg font-bold text-red-600">❤️ {lives}</div>
      </div>
      {/* Question box */}
      {showQuestion && currentQuestion && !gameOver && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={zoomIn ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }} // 👈 Thêm delay ở đây
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-lg p-6 w-[90%] h-[90%] max-w-4xl flex flex-col justify-start items-center"
        >
          <h2 className="text-2xl font-extrabold text-green-700 mb-6 text-center">
            Câu hỏi
          </h2>
          <p className="text-lg font-semibold mb-8 text-center">
            {currentQuestion.text}
          </p>
          {currentQuestion.image && (
            <div className="mb-6 w-40 h-40 flex justify-center">
              <Image
                src={currentQuestion.image}
                alt="Câu hỏi minh họa"
                width={300}
                height={200}
                className="rounded-lg object-contain"
              />
            </div>
          )}

          {currentQuestion.audio && (
            <div className="mb-6 flex items-center justify-center gap-4">
              {!isPlaying ? (
                <button
                  onClick={handlePlayAudio}
                  className="p-3 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </button>
              ) : (
                <button
                  onClick={handlePauseAudio}
                  className="p-3 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                  </svg>
                </button>
              )}

              <button
                onClick={handleReplayAudio}
                className="p-3 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="23 4 23 10 17 10"></polyline>
                  <polyline points="1 20 1 14 7 14"></polyline>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                </svg>
              </button>

              {/* <span className="text-sm text-gray-600">
                {currentQuestion.audio.replace("audio/", "")}
              </span> */}
            </div>
          )}

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
