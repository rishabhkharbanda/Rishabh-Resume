import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { IntroChipId, overlayContent } from '../../data/marketerCopy';

interface IntroOverlayProps {
  chip: IntroChipId | null;
  onClose: () => void;
  onCta: (chip: IntroChipId) => void;
}

export default function IntroOverlay({ chip, onClose, onCta }: IntroOverlayProps) {
  const content = chip ? overlayContent[chip] : null;

  return (
    <AnimatePresence>
      {chip && content && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="intro-overlay-title"
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-[#030308]/80 backdrop-blur-md"
            onClick={onClose}
            aria-label="Close"
          />

          <motion.div
            className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#12121c]/95 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-[#7F77DD]/10"
            initial={{ y: 80, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close panel"
            >
              <X className="w-5 h-5" />
            </button>

            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7F77DD] mb-3">
              Rishabh says
            </p>
            <h2 id="intro-overlay-title" className="font-headline text-2xl sm:text-3xl font-bold text-white mb-6 pr-8">
              {content.title}
            </h2>

            <ul className="space-y-4 mb-8">
              {content.lines.map((line) => (
                <li key={line} className="text-[15px] text-white/75 leading-relaxed pl-4 border-l-2 border-[#7F77DD]/40">
                  {line}
                </li>
              ))}
            </ul>

            {content.meta && (
              <p className="text-sm text-[#7F77DD]/90 italic mb-6 font-medium">
                {content.meta}
              </p>
            )}

            <button
              type="button"
              onClick={() => onCta(chip)}
              className="w-full py-4 rounded-2xl bg-[#7F77DD] text-white font-mono text-xs font-bold uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all"
            >
              {content.cta}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
