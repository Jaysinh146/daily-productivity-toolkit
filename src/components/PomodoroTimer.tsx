import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const timerRef = useRef<number>();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      if (audioRef.current) {
        audioRef.current.play();
      }
      setIsRunning(false);
      setSessions(s => s + 1);
      setTimeLeft(25 * 60);
    }
  }, [timeLeft]);

  const toggleTimer = () => {
    if (isRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center">
      <div className="text-6xl font-mono text-white mb-8">
        {formatTime(timeLeft)}
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={toggleTimer}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          aria-label={isRunning ? 'Pause timer' : 'Start timer'}
        >
          {isRunning ? <Pause /> : <Play />}
        </button>
        <button
          onClick={resetTimer}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          aria-label="Reset timer"
        >
          <RefreshCw />
        </button>
      </div>

      <div className="text-white/80">
        Sessions completed: {sessions}
      </div>

      <audio ref={audioRef}>
        <source src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}