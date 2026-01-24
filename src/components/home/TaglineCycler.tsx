'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TAGLINES = [
  "safe",
  "reliable",
  "sustainable",
  "smarter",
  "faster",
  "efficient"
];

export function TaglineCycler() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % TAGLINES.length);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="inline-flex flex-wrap items-center gap-2 text-xl sm:text-2xl font-medium mb-10 text-gray-200 px-6 py-3 rounded-2xl backdrop-blur-sm">
      <span>CU Boulder is where AI is made</span>
      <div className="relative inline-flex h-[1.5em] w-[130px] sm:w-[150px] items-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={TAGLINES[index]}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-0 font-bold text-primary italic"
            style={{ fontFamily: 'var(--font-spline-sans)' }} // Ensuring it uses the app font
          >
            {TAGLINES[index]}.
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
