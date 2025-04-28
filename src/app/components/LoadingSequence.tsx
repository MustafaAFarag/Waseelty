"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingSequenceProps {
  onComplete: () => void;
  className?: string;
}

const LoadingSequence = ({
  onComplete,
  className = "",
}: LoadingSequenceProps) => {
  const [progress, setProgress] = useState(0);
  const [showWords, setShowWords] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const words = [
    "FREELANCE",
    "AI",
    "INNOVATION",
    "CREATIVITY",
    "PRODUCTIVITY",
    "GROWTH",
    "OPPORTUNITY",
    "FUTURE",
  ];

  // Realistic loading progress simulation
  useEffect(() => {
    const interval = 15; // Update every 15ms (faster updates)

    // Create a more realistic loading pattern with varying speeds (even faster now)
    const loadingPattern = [
      { start: 0, end: 10, speed: 0.8 },
      { start: 10, end: 25, speed: 1.0 },
      { start: 25, end: 40, speed: 0.9 },
      { start: 40, end: 60, speed: 1.2 },
      { start: 60, end: 80, speed: 1.0 },
      { start: 80, end: 100, speed: 0.8 },
    ];

    let currentProgress = 0;
    let currentPatternIndex = 0;

    const timer = setInterval(() => {
      if (currentPatternIndex >= loadingPattern.length) {
        clearInterval(timer);
        setProgress(100);
        setTimeout(() => {
          setShowWords(true);
        }, 300);
        return;
      }

      const pattern = loadingPattern[currentPatternIndex];
      currentProgress += pattern.speed;

      if (currentProgress >= pattern.end) {
        currentPatternIndex++;
        if (currentPatternIndex < loadingPattern.length) {
          currentProgress = loadingPattern[currentPatternIndex].start;
        }
      }

      setProgress(currentProgress);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Word animation
  useEffect(() => {
    if (!showWords) return;

    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => {
        if (prev >= words.length - 1) {
          clearInterval(wordInterval);
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 0);
          return prev;
        }
        return prev + 1;
      });
    }, 200);

    return () => clearInterval(wordInterval);
  }, [showWords, onComplete]);

  return (
    <motion.div
      className={`fixed inset-0 bg-black flex flex-col items-center justify-center text-white z-30 ${className}`}
      initial={false}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      <AnimatePresence mode="wait">
        {!showWords ? (
          <motion.div
            key="progress"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className="text-6xl font-bold mb-4">
              {Math.min(100, Math.floor(progress))}%
            </div>
            <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="words"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2, y: -30 }}
            className="text-center"
          >
            <motion.div
              key={currentWordIndex}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="text-7xl font-bold"
            >
              {words[currentWordIndex]}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LoadingSequence;
