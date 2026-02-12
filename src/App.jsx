import React, { useState, useEffect, useCallback } from 'react';

// --- SVG Assets ---
const BearWithFlowers = () => (
  <svg viewBox="0 0 200 200" className="w-48 h-48 md:w-64 md:h-64 drop-shadow-xl animate-bounce">
    <circle cx="100" cy="120" r="50" fill="#8B4513" />
    <circle cx="100" cy="70" r="40" fill="#8B4513" />
    <circle cx="70" cy="45" r="15" fill="#8B4513" />
    <circle cx="130" cy="45" r="15" fill="#8B4513" />
    <circle cx="100" cy="80" r="12" fill="#D2B48C" />
    <circle cx="85" cy="65" r="4" fill="black" />
    <circle cx="115" cy="65" r="4" fill="black" />
    <g transform="translate(110, 110) rotate(-10)">
      <rect x="-2" y="0" width="4" height="30" fill="#228B22" rx="2" />
      <circle cx="0" cy="0" r="8" fill="#FF69B4" />
      <circle cx="6" cy="-6" r="8" fill="#FF1493" />
      <circle cx="-6" cy="-6" r="8" fill="#FF69B4" />
      <circle cx="6" cy="6" r="8" fill="#C71585" />
      <circle cx="-6" cy="6" r="8" fill="#FF1493" />
      <circle cx="0" cy="0" r="4" fill="#FFFF00" />
    </g>
  </svg>
);

const BearsHugging = () => (
  <svg viewBox="0 0 200 200" className="w-48 h-48 md:w-64 md:h-64 drop-shadow-2xl">
    <circle cx="80" cy="120" r="45" fill="#8B4513" />
    <circle cx="80" cy="75" r="35" fill="#8B4513" />
    <circle cx="55" cy="55" r="12" fill="#8B4513" />
    <circle cx="120" cy="120" r="45" fill="#F5F5F5" />
    <circle cx="120" cy="75" r="35" fill="#F5F5F5" />
    <circle cx="145" cy="55" r="12" fill="#F5F5F5" />
    <path d="M100 50 Q100 40 110 40 T120 50 T100 70 T80 50 T90 40 T100 50" fill="#FF0000">
      <animate attributeName="scale" values="1;1.2;1" dur="1s" repeatCount="indefinite" />
    </path>
  </svg>
);

const Confetti = () => (
  <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
    {[...Array(50)].map((_, i) => (
      <div
        key={i}
        className="absolute w-3 h-3 rounded-full animate-ping"
        style={{
          left: `${Math.random() * 100}%`,
          top: `-10%`,
          backgroundColor: ['#ff0000', '#ff69b4', '#ffffff', '#ffd700'][Math.floor(Math.random() * 4)],
          animation: `fall ${Math.random() * 3 + 2}s linear infinite`,
          animationDelay: `${Math.random() * 5}s`
        }}
      />
    ))}
    <style>{`
      @keyframes fall {
        0% { transform: translateY(0vh) rotate(0deg); opacity: 1; }
        100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
      }
    `}</style>
  </div>
);

export default function App() {
  const [noCount, setNoCount] = useState(0);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isEscaping, setIsEscaping] = useState(false);
  const [isGone, setIsGone] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const noResponses = [
    "No", "Are you sure?", "Think again! 🥺", "Pwease? 👉👈", 
    "You're breaking my heart!", "I'll give you chocolate! 🍫", 
    "Last chance! 🛑", "Surely you misclicked?", 
    "Don't do this to the bear...", "Pretty please? 🍒", "Catch me if you can! 🏃💨"
  ];

  const handleNoClick = () => { if (noCount < 10) setNoCount(prev => prev + 1); };

  useEffect(() => {
    if (noCount === 10) {
      setIsEscaping(true);
      const timer = setTimeout(() => {
        setIsGone(true);
        setIsEscaping(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [noCount]);

  const moveButton = useCallback(() => {
    if (!isEscaping) return;
    const x = Math.random() * (window.innerWidth - 150) - (window.innerWidth / 2) + 75;
    const y = Math.random() * (window.innerHeight - 100) - (window.innerHeight / 2) + 50;
    setPosition({ x, y });
  }, [isEscaping]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-red-300 to-pink-400 flex flex-col items-center justify-center p-4 text-center font-sans overflow-hidden">
      {isAccepted && <Confetti />}
      <div className="max-w-md w-full bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/30 flex flex-col items-center gap-8 transition-all duration-500">
        <h1 className="text-4xl md:text-5xl font-bold text-red-600">
          {isAccepted ? "YAY! I love you! ❤️" : (isGone ? "Please just say yes... 🥺" : "Will you be my valentine?") }
        </h1>
        <div>{isAccepted ? <BearsHugging /> : <BearWithFlowers />}</div>
        <div className={`flex flex-wrap items-center justify-center gap-6 w-full ${isGone ? 'flex-col' : ''}`}>
          <button onClick={() => setIsAccepted(true)} className={`bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all active:scale-95 text-xl ${isGone ? 'order-first scale-125 animate-pulse' : ''}`}>
            {isGone ? "YES PLEASE! ✨" : "Yes"}
          </button>
          {!isAccepted && !isGone && (
            <button
              onClick={handleNoClick}
              onMouseEnter={moveButton}
              style={isEscaping ? { position: 'fixed', left: '50%', top: '50%', transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`, transition: 'all 0.15s ease-out', zIndex: 100 } : {}}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all active:scale-90 text-lg whitespace-nowrap"
            >
              {noResponses[noCount]}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}