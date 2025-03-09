import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const tips = [
  "Break large tasks into smaller, manageable chunks",
  "Take regular breaks to maintain productivity",
  "Use the 2-minute rule: If it takes less than 2 minutes, do it now",
  "Set specific, achievable goals for each day",
  "Prioritize your most important tasks first",
  "Keep your workspace clean and organized",
  "Use time-blocking to schedule your day"
];

export default function TipOfTheDay() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentTip, setCurrentTip] = useState('');

  useEffect(() => {
    const lastUpdate = localStorage.getItem('lastTipUpdate');
    const savedTip = localStorage.getItem('currentTip');

    const now = new Date().toDateString();
    if (lastUpdate !== now || !savedTip) {
      const newTip = tips[Math.floor(Math.random() * tips.length)];
      setCurrentTip(newTip);
      localStorage.setItem('currentTip', newTip);
      localStorage.setItem('lastTipUpdate', now);
    } else {
      setCurrentTip(savedTip);
    }
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 w-64 bg-white/10 backdrop-blur-md rounded-lg shadow-lg transition-all duration-300 ${
        isMinimized ? 'h-12' : 'h-auto'
      }`}
    >
      <div className="flex items-center justify-between p-3 cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
        <h3 className="text-white font-medium">Tip of the Day</h3>
        {isMinimized ? <ChevronUp className="text-white" /> : <ChevronDown className="text-white" />}
      </div>
      
      {!isMinimized && (
        <div className="p-3 pt-0 text-white/80">
          {currentTip}
        </div>
      )}
    </div>
  );
}