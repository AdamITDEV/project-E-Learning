"use client";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

type AudioItem = {
  id: number;
  audioSrc: string;
  text: string;
};

const audioData: AudioItem[] = [
  { id: 1, audioSrc: "/audio/lesson7/tro3bai7cau1.wav", text: "他叫国安。" },
  {
    id: 2,
    audioSrc: "/audio/lesson7/tro3bai7cau2.wav",
    text: "你叫什么名字？",
  },
  { id: 3, audioSrc: "/audio/lesson7/tro3bai7cau3.wav", text: "她姓什么？" },
  {
    id: 4,
    audioSrc: "/audio/lesson7/tro3bai7cau4.wav",
    text: "你好！你叫什么名字？",
  },
  {
    id: 5,
    audioSrc: "/audio/lesson7/tro3bai7cau5.wav",
    text: "我叫文山。你呢？",
  },
  { id: 6, audioSrc: "/audio/lesson7/tro3bai7cau6.wav", text: "你们好！" },
  { id: 7, audioSrc: "/audio/lesson7/tro3bai7cau7.wav", text: "她姓邓。" },
  { id: 8, audioSrc: "/audio/lesson7/tro3bai7cau8.wav", text: "她叫宝玉。" },
  {
    id: 9,
    audioSrc: "/audio/lesson7/tro3bai7cau9.wav",
    text: "那是我们班的同学，叫文山。",
  },
  { id: 10, audioSrc: "/audio/lesson7/tro3bai7cau10.wav", text: "那是谁？" },
];

// Add feedback audio files
const feedbackAudio = {
  correct: "/audio/feedback/correct.mp3",
  incorrect: "/audio/feedback/wrong.mp3",
  complete: "/audio/feedback/win.mp3",
};

const shuffleArray = <T,>(array: T[]): T[] => {
  return array.sort(() => Math.random() - 0.5);
};

type Connection = {
  left: number;
  right: number;
  isCorrect: boolean;
  id: string;
};

export default function AudioMatchGame() {
  const { data: session } = useSession();
  const [leftItems, setLeftItems] = useState<AudioItem[]>([]);
  const [rightItems, setRightItems] = useState<AudioItem[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [dragStart, setDragStart] = useState<{
    x: number;
    y: number;
    id: number;
  } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    setLeftItems([...audioData]);
    setRightItems(shuffleArray([...audioData]));
    setConnections([]);
    setScore(0);
    setGameOver(false);
  };

  const playAudio = (src: string) => {
    try {
      const audio = new Audio(src);
      audio.play().catch((error) => {
        console.error("Lỗi phát audio:", error);
      });
    } catch (error) {
      console.error("Lỗi tạo audio:", error);
    }
  };

  const handleDragStart = (e: React.MouseEvent, id: number) => {
    setDragStart({ x: e.clientX, y: e.clientY, id });
  };

  const handleDrop = (e: React.MouseEvent, rightId: number) => {
    if (!dragStart) return;

    const leftId = dragStart.id;
    const leftItem = leftItems.find((item) => item.id === leftId);
    const rightItem = rightItems.find((item) => item.id === rightId);

    if (!leftItem || !rightItem) return;

    const existingConnection = connections.find(
      (conn) => conn.left === leftId || conn.right === rightId
    );

    if (existingConnection) return;

    const isCorrect = leftItem.text === rightItem.text;
    const newConnection: Connection = {
      left: leftId,
      right: rightId,
      isCorrect,
      id: `${leftId}-${rightId}`,
    };

    setConnections([...connections, newConnection]);
    setScore(score + (isCorrect ? 1 : 0));

    // Play feedback audio
    playAudio(isCorrect ? feedbackAudio.correct : feedbackAudio.incorrect);

    if (connections.length + 1 === audioData.length) {
      setGameOver(true);
      // Play completion audio when game is over
      setTimeout(() => playAudio(feedbackAudio.complete), 500);
    }
  };

  const removeConnection = (connectionId: string) => {
    const connectionToRemove = connections.find(
      (conn) => conn.id === connectionId
    );
    if (!connectionToRemove) return;

    setConnections(connections.filter((conn) => conn.id !== connectionId));
    if (connectionToRemove.isCorrect) {
      setScore(score - 1);
    }
  };

  const drawLines = () => {
    return connections.map((conn) => {
      const leftEl = document.getElementById(`left-${conn.left}`);
      const rightEl = document.getElementById(`right-${conn.right}`);
      if (!leftEl || !rightEl || !svgRef.current) return null;

      const leftRect = leftEl.getBoundingClientRect();
      const rightRect = rightEl.getBoundingClientRect();
      const svgRect = svgRef.current.getBoundingClientRect();

      const x1 = leftRect.right - svgRect.left;
      const y1 = leftRect.top + leftRect.height / 2 - svgRect.top;
      const x2 = rightRect.left - svgRect.left;
      const y2 = rightRect.top + rightRect.height / 2 - svgRect.top;
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;

      return (
        <g key={conn.id}>
          <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={conn.isCorrect ? "green" : "red"}
            strokeWidth="2"
            pointerEvents="none"
          />
          <circle
            cx={midX}
            cy={midY}
            r="15"
            fill="transparent"
            stroke="none"
            onClick={(e) => {
              e.stopPropagation();
              removeConnection(conn.id);
            }}
            style={{ cursor: "pointer", pointerEvents: "visible" }}
          />
          <circle
            cx={midX}
            cy={midY}
            r="10"
            fill="white"
            stroke="gray"
            pointerEvents="none"
          />
          <text
            x={midX}
            y={midY}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
            fill="black"
            pointerEvents="none"
          >
            X
          </text>
        </g>
      );
    });
  };

  const getConnectionStatus = (id: number, side: "left" | "right") => {
    const connection = connections.find((conn) =>
      side === "left" ? conn.left === id : conn.right === id
    );
    if (!connection) return "";
    return connection.isCorrect ? "border-green-500" : "border-red-500";
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center p-4 relative">
      {session && (
        <div className="mb-4 p-2 bg-blue-100 rounded-lg w-full max-w-3xl">
          <h2 className="text-lg font-bold text-blue-800">
            Xin chào, {session.user?.name}!
          </h2>
          <p className="text-sm text-blue-600">Hãy nối audio với câu đúng!</p>
        </div>
      )}

      <h2 className="text-xl font-bold text-blue-700 mb-4">
        Trò Chơi Nối Audio - Bài 7
      </h2>

      <div className="flex justify-center gap-8 w-full max-w-3xl">
        {/* Left Column: Audio */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-center">
            <Image
              src="/images/headphone.png"
              alt="headphone"
              width={40}
              height={40}
            />
          </div>
          {leftItems.map((item) => (
            <div
              key={item.id}
              id={`left-${item.id}`}
              className={`flex items-center bg-white p-2 rounded shadow hover:shadow-md border-2 ${getConnectionStatus(
                item.id,
                "left"
              )}`}
              draggable
              onDragStart={(e) => handleDragStart(e, item.id)}
            >
              <button
                onClick={() => playAudio(item.audioSrc)}
                className="mr-2 p-1 bg-blue-300 text-white rounded-full hover:bg-blue-200"
              >
                <Image
                  src="/images/plug-and-play.png"
                  alt="Play"
                  width={16}
                  height={16}
                />
              </button>
              <span className="text-sm">{item.id}</span>
            </div>
          ))}
        </div>

        {/* Right Column: Text */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-center">
            <Image
              src="/images/answer.png"
              alt="answer"
              width={40}
              height={40}
            />
          </div>
          {rightItems.map((item) => (
            <div
              key={item.id}
              id={`right-${item.id}`}
              className={`bg-white p-2 rounded shadow hover:shadow-md border-2 ${getConnectionStatus(
                item.id,
                "right"
              )}`}
              onDrop={(e) => handleDrop(e, item.id)}
              onDragOver={(e) => e.preventDefault()}
            >
              <span className="text-sm">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SVG for drawing lines */}
      <svg
        ref={svgRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-50"
      >
        {drawLines()}
      </svg>

      {/* Score and Game Over */}
      <div className="mt-4 text-center">
        <p className="text-lg font-bold">
          Điểm: {score} / {audioData.length}
        </p>
        {gameOver && (
          <div className="mt-2">
            <p className="text-xl font-bold text-green-600">Hoàn thành!</p>
            <button
              onClick={resetGame}
              className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              Chơi Lại
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
