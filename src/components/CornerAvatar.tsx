import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { mascotAvatarUrl } from '../config/assets';

const GREETINGS = [
  "Hey! Need the numbers or the story behind them?",
  "Plot twist: the best campaigns start with a conversation.",
  "I turn messy data into growth. Want a tour?",
  "You're still here — that's already better conversion than most landing pages.",
];

export default function CornerAvatar() {
  const [bubble, setBubble] = useState<string | null>(null);
  const [greetingIndex, setGreetingIndex] = useState(0);

  const handleClick = useCallback(() => {
    const line = GREETINGS[greetingIndex % GREETINGS.length];
    setGreetingIndex((i) => i + 1);
    setBubble(line);
    window.setTimeout(() => setBubble(null), 4500);
  }, [greetingIndex]);

  return (
    <div
      className="fixed bottom-0 left-0 z-40 pointer-events-none flex items-end p-2 sm:p-4"
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
    >
      <AnimatePresence>
        {bubble && (
          <motion.div
            key={bubble}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            className="pointer-events-none absolute bottom-[calc(100%-0.25rem)] left-3 sm:left-5 max-w-[min(240px,calc(100vw-6rem))] mb-1"
          >
            <div className="rounded-2xl rounded-bl-sm border border-outline-variant/50 bg-surface/95 backdrop-blur-xl px-3.5 py-2.5 shadow-lg text-xs sm:text-sm text-on-surface leading-snug font-medium">
              {bubble}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={handleClick}
        className="pointer-events-auto relative shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
        aria-label="Say hi to Rishabh"
        title="Say hi!"
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 16, stiffness: 140, delay: 0.5 }}
        whileHover={{ scale: 1.05, y: -6 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.img
          src={mascotAvatarUrl}
          alt="Rishabh — marketing analyst guide"
          className="w-[clamp(96px,24vw,160px)] h-auto object-contain object-bottom drop-shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
          draggable={false}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.button>
    </div>
  );
}
