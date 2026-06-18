import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import StarField from './StarField';
import CartoonAvatar from './CartoonAvatar';
import IntroOverlay from './IntroOverlay';
import {
  IntroChipId,
  avatarClickLines,
  getTimeGreeting,
  introChips,
  openingLine,
} from '../../data/marketerCopy';
import { ViewTab } from '../../types';

interface MarketerIntroProps {
  onNavigate: (tab: ViewTab) => void;
  onScrollToProjects: () => void;
}

function useTypewriter(text: string, speed = 28, startDelay = 0) {
  const [display, setDisplay] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplay('');
    setDone(false);
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const startTimer = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setDisplay(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(startTimer);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { display, done };
}

export default function MarketerIntro({ onNavigate, onScrollToProjects }: MarketerIntroProps) {
  const [greeting] = useState(() => getTimeGreeting());
  const [speech, setSpeech] = useState(openingLine);
  const [waving, setWaving] = useState(true);
  const [activeChip, setActiveChip] = useState<IntroChipId | null>(null);
  const [cheekyIndex, setCheekyIndex] = useState(0);

  const greetingTyped = useTypewriter(greeting, 32, 600);
  const openingTyped = useTypewriter(
    speech,
    26,
    greetingTyped.done ? 400 : 99999
  );

  useEffect(() => {
    const t = setTimeout(() => setWaving(false), 2200);
    return () => clearTimeout(t);
  }, []);

  const handleAvatarClick = useCallback(() => {
    setWaving(true);
    const next = avatarClickLines[cheekyIndex % avatarClickLines.length];
    setCheekyIndex((n) => n + 1);
    setSpeech(next);
    setTimeout(() => setWaving(false), 900);
  }, [cheekyIndex]);

  const handleChipCta = (chip: IntroChipId) => {
    setActiveChip(null);
    if (chip === 'experience') onNavigate('experience');
    else if (chip === 'skills') onNavigate('skills');
    else if (chip === 'projects') onScrollToProjects();
    else if (chip === 'hire') onNavigate('contact');
  };

  const scrollToPortfolio = () => {
    document.getElementById('portfolio-below-intro')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="marketer-intro relative min-h-[100dvh] flex flex-col justify-end overflow-hidden">
      <StarField />
      <div className="marketer-intro__glow" aria-hidden="true" />

      {/* Time greeting — top */}
      <div className="absolute top-24 sm:top-28 left-0 right-0 px-6 z-10 text-center">
        <motion.p
          className="font-mono text-xs sm:text-sm text-[#7F77DD]/90 tracking-wide min-h-[1.5rem]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {greetingTyped.display}
          {!greetingTyped.done && <span className="marketer-cursor">|</span>}
        </motion.p>
      </div>

      {/* Speech bubble */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-20 w-[min(92vw,420px)] px-2"
        style={{ bottom: 'calc(280px + env(safe-area-inset-bottom))' }}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.8, type: 'spring', damping: 20 }}
      >
        <div className="marketer-bubble relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-4 text-center shadow-lg shadow-[#7F77DD]/10">
          <p className="text-[15px] sm:text-base text-white/90 leading-relaxed font-medium min-h-[3rem]">
            {greetingTyped.done ? (
              <>
                {openingTyped.display}
                {!openingTyped.done && <span className="marketer-cursor">|</span>}
              </>
            ) : (
              <span className="text-white/30">...</span>
            )}
          </p>
          <div className="marketer-bubble__tail" />
        </div>
      </motion.div>

      {/* Chips */}
      <motion.div
        className="absolute left-0 right-0 z-20 flex flex-wrap justify-center gap-2 sm:gap-3 px-4"
        style={{ bottom: 'calc(200px + env(safe-area-inset-bottom))' }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        {introChips.map((chip, i) => (
          <motion.button
            key={chip.id}
            type="button"
            onClick={() => setActiveChip(chip.id)}
            className="marketer-chip"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 + i * 0.08 }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>{chip.emoji}</span>
            <span>{chip.label}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Avatar — slides up from bottom */}
      <motion.div
        className="relative z-10 flex justify-center pb-6 sm:pb-10"
        initial={{ y: '120%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 14, stiffness: 120, delay: 0.15 }}
      >
        <CartoonAvatar waving={waving} onClick={handleAvatarClick} />
      </motion.div>

      {/* Skip / dive in */}
      <motion.button
        type="button"
        onClick={scrollToPortfolio}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/40 hover:text-[#7F77DD] transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        aria-label="Scroll to full portfolio"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em]">Dive in</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.button>

      <IntroOverlay chip={activeChip} onClose={() => setActiveChip(null)} onCta={handleChipCta} />
    </section>
  );
}
