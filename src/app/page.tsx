"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LenisProvider } from "./components/LenisProvider";
import StorytellingHero from "./components/StorytellingHero";
import LoadingSequence from "./components/LoadingSequence";

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  return (
    <LenisProvider>
      <div className="relative w-full h-full bg-black">
        <LoadingSequence onComplete={() => setShowContent(true)} />
        <AnimatePresence mode="wait">
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <StorytellingHero />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LenisProvider>
  );
}
