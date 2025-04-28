"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LenisProvider } from "./components/LenisProvider";
import StorytellingHero from "./components/StorytellingHero";
import LoadingSequence from "./components/LoadingSequence";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  return (
    <>
      <LenisProvider>
        <div className="relative w-full h-full bg-black">
          {showLoading && (
            <LoadingSequence
              onComplete={() => {
                setShowContent(true);
                setShowLoading(false);
              }}
            />
          )}
          <AnimatePresence mode="wait">
            {showContent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <StorytellingHero />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </LenisProvider>
    </>
  );
}
