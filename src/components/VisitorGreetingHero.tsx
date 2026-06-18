import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, MessageCircle } from 'lucide-react';
import { mascotAvatarUrl } from '../config/assets';
import {
  GREETING_PART_ONE,
  GREETING_PART_TWO,
  GREETING_RESPONSES,
  GreetingAction,
} from '../data/visitorGreeting';
import { ViewTab } from '../types';

type Phase = 'enter' | 'typing-one' | 'pause' | 'typing-two' | 'chips';

interface VisitorGreetingHeroProps {
  onNavigate: (tab: ViewTab) => void;
  onScrollTo: (id: string) => void;
}

function useTypewriter(text: string, active: boolean, speed = 24) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) {
      setDisplayed('');
      setDone(false);
      return;
    }

    setDisplayed('');
    setDone(false);
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(timer);
        setDone(true);
      }
    }, speed);

    return () => window.clearInterval(timer);
  }, [text, active, speed]);

  return { displayed, done };
}

export default function VisitorGreetingHero({
  onNavigate,
  onScrollTo,
}: VisitorGreetingHeroProps) {
  const [phase, setPhase] = useState<Phase>('enter');
  const typeOne = useTypewriter(GREETING_PART_ONE, phase === 'typing-one');
  const typeTwo = useTypewriter(GREETING_PART_TWO, phase === 'typing-two');

  useEffect(() => {
    const timer = window.setTimeout(() => setPhase('typing-one'), 650);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase === 'typing-one' && typeOne.done) {
      const timer = window.setTimeout(() => setPhase('pause'), 350);
      return () => window.clearTimeout(timer);
    }
  }, [phase, typeOne.done]);

  useEffect(() => {
    if (phase === 'pause') {
      const timer = window.setTimeout(() => setPhase('typing-two'), 1100);
      return () => window.clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'typing-two' && typeTwo.done) {
      const timer = window.setTimeout(() => setPhase('chips'), 450);
      return () => window.clearTimeout(timer);
    }
  }, [phase, typeTwo.done]);

  const handleChipClick = useCallback(
    (id: GreetingAction) => {
      switch (id) {
        case 'wins':
          onScrollTo('home-wins');
          break;
        case 'built':
          onScrollTo('home-featured');
          break;
        case 'hire':
          onScrollTo('home-hire');
          break;
        case 'marketer':
          onScrollTo('home-marketer');
          break;
        case 'talk':
          onNavigate('contact');
          break;
      }
    },
    [onNavigate, onScrollTo],
  );

  const bubbleBody =
    phase === 'typing-two' || phase === 'chips'
      ? `${GREETING_PART_ONE}\n\n${typeTwo.displayed}`
      : typeOne.displayed;

  const showBubble = phase !== 'enter';
  const showTyping = phase === 'pause';
  const showChips = phase === 'chips';

  return (
    <section className="visitor-greeting-hero relative min-h-[min(100vh,920px)] flex flex-col justify-end px-4 sm:px-6 md:px-12 max-w-6xl mx-auto w-full overflow-hidden pb-8 sm:pb-12">
      <div className="absolute inset-0 grid-pattern opacity-40 -z-10" />

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(220px,320px)] gap-8 lg:gap-12 items-end">
        <div className="flex flex-col sm:flex-row items-end gap-4 sm:gap-6 min-w-0">
          <motion.div
            className="shrink-0 self-center sm:self-end"
            initial={{ y: 140, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', damping: 18, stiffness: 130, delay: 0.15 }}
          >
            <motion.img
              src={mascotAvatarUrl}
              alt="Rishabh — your guide through this portfolio"
              className="visitor-greeting-avatar w-[clamp(120px,28vw,200px)] h-auto object-contain object-bottom drop-shadow-[0_16px_36px_rgba(0,0,0,0.28)]"
              draggable={false}
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          <AnimatePresence>
            {showBubble && (
              <motion.div
                key="speech-bubble"
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 180 }}
                className="flex-1 min-w-0 w-full"
              >
                <div className="visitor-greeting-bubble liquid-glass rounded-3xl rounded-bl-md border border-outline-variant/50 px-5 py-4 sm:px-6 sm:py-5 shadow-lg">
                  <div className="flex items-center gap-2 mb-3 text-primary">
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
                      Rishabh
                    </span>
                  </div>

                  <p className="visitor-greeting-text font-sans text-[15px] sm:text-[17px] text-on-surface leading-relaxed whitespace-pre-line">
                    {bubbleBody}
                    {(phase === 'typing-one' || phase === 'typing-two') && (
                      <span className="visitor-greeting-cursor" aria-hidden>
                        |
                      </span>
                    )}
                  </p>

                  {showTyping && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 font-mono text-[11px] text-on-surface-variant tracking-wide"
                    >
                      Typing
                      <span className="visitor-greeting-ellipsis" aria-hidden>
                        ...
                      </span>
                    </motion.p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-3 lg:pb-2">
          <AnimatePresence>
            {showChips &&
              GREETING_RESPONSES.map((chip, index) => (
                <motion.button
                  key={chip.id}
                  type="button"
                  initial={{ opacity: 0, x: 24, y: 8 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    type: 'spring',
                    damping: 18,
                    stiffness: 160,
                  }}
                  whileHover={{ scale: 1.03, x: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleChipClick(chip.id)}
                  className="visitor-greeting-chip liquid-glass text-left px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl border border-outline-variant/45 font-sans text-sm sm:text-[15px] font-medium text-on-surface hover:border-primary/45 hover:text-primary transition-colors cursor-pointer"
                >
                  {chip.label}
                </motion.button>
              ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50 select-none hidden md:flex">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] font-medium scale-90 text-primary">
          Scroll
        </span>
        <ArrowDown className="w-4 h-4 animate-bounce text-primary" />
      </div>
    </section>
  );
}
