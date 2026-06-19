import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { mascotAvatarUrl } from '../config/assets';
import {
  GREETING_PART_ONE,
  GREETING_PART_TWO,
  GREETING_RESPONSES,
  MARKETER_SIMULATOR_SPEECH,
  EXPERIENCE_OVERVIEW_LINES,
  GreetingAction,
} from '../data/visitorGreeting';
import { ViewTab } from '../types';

type HeroPhase = 'enter' | 'typing-one' | 'pause' | 'typing-two' | 'chips';
type ActiveSpeech = 'hero' | 'marketer' | 'experience' | null;

const AUTO_HIDE_MS = 10_000;
const SCROLL_DISMISS_DELTA = 12;
const HEADER_OFFSET_PX = 96;
const SECTION_DISMISS_GRACE_MS = 1_200;
const LINE_HOLD_MS = 550;
const LINE_GAP_MS = 320;

type SpeechDismissOptions = {
  inactivityEnabled?: boolean;
  scrollMode?: 'any' | 'section-away' | 'none';
  sectionHeadingId?: string;
};

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

function useSequentialLineSpeech(lines: string[], panelActive: boolean) {
  const [lineIndex, setLineIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const [sequenceComplete, setSequenceComplete] = useState(false);

  const line = lines[lineIndex] ?? '';
  const shouldType = panelActive && showBubble && !sequenceComplete;
  const { displayed, done } = useTypewriter(line, shouldType, 22);

  useEffect(() => {
    if (!panelActive) {
      setLineIndex(0);
      setShowBubble(false);
      setSequenceComplete(false);
      return;
    }

    setLineIndex(0);
    setShowBubble(true);
    setSequenceComplete(false);
  }, [panelActive]);

  useEffect(() => {
    if (!shouldType || !done) return;

    const timer = window.setTimeout(() => {
      setShowBubble(false);
    }, LINE_HOLD_MS);

    return () => window.clearTimeout(timer);
  }, [shouldType, done, lineIndex]);

  useEffect(() => {
    if (!panelActive || showBubble || sequenceComplete) return;

    const timer = window.setTimeout(() => {
      if (lineIndex >= lines.length - 1) {
        setSequenceComplete(true);
        return;
      }

      setLineIndex((prev) => prev + 1);
      setShowBubble(true);
    }, LINE_GAP_MS);

    return () => window.clearTimeout(timer);
  }, [panelActive, showBubble, sequenceComplete, lineIndex, lines.length]);

  return {
    body: displayed,
    showBubble: showBubble && panelActive,
    showCursor: showBubble && !done,
    sequenceComplete,
    lineIndex,
  };
}

function useSpeechPanelDismiss(
  isVisible: boolean,
  onDismiss: () => void,
  options: SpeechDismissOptions = {},
) {
  const {
    inactivityEnabled = false,
    scrollMode = 'none',
    sectionHeadingId,
  } = options;

  useEffect(() => {
    if (!isVisible || !inactivityEnabled) return;

    const timer = window.setTimeout(onDismiss, AUTO_HIDE_MS);
    return () => window.clearTimeout(timer);
  }, [isVisible, inactivityEnabled, onDismiss]);

  useEffect(() => {
    if (!isVisible || scrollMode !== 'any') return;

    const scrollYWhenShown = window.scrollY;

    const onScroll = () => {
      if (Math.abs(window.scrollY - scrollYWhenShown) > SCROLL_DISMISS_DELTA) {
        onDismiss();
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isVisible, scrollMode, onDismiss]);

  useEffect(() => {
    if (!isVisible || scrollMode !== 'section-away' || !sectionHeadingId) return;

    const heading = document.getElementById(sectionHeadingId);
    if (!heading) return;

    let canDismissOnLeave = false;
    const graceTimer = window.setTimeout(() => {
      canDismissOnLeave = true;
    }, SECTION_DISMISS_GRACE_MS);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (canDismissOnLeave && !entry.isIntersecting) {
          onDismiss();
        }
      },
      {
        root: null,
        rootMargin: `-${HEADER_OFFSET_PX}px 0px -35% 0px`,
        threshold: 0,
      },
    );

    observer.observe(heading);
    return () => {
      window.clearTimeout(graceTimer);
      observer.disconnect();
    };
  }, [isVisible, scrollMode, sectionHeadingId, onDismiss]);
}

function useSectionSpeechTrigger(
  headingId: string,
  shownRef: React.MutableRefObject<boolean>,
  onTrigger: () => void,
) {
  useEffect(() => {
    const heading = document.getElementById(headingId);
    if (!heading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !shownRef.current) {
          shownRef.current = true;
          onTrigger();
        }
      },
      {
        root: null,
        rootMargin: `-${HEADER_OFFSET_PX}px 0px -55% 0px`,
        threshold: 0,
      },
    );

    observer.observe(heading);
    return () => observer.disconnect();
  }, [headingId, onTrigger, shownRef]);
}

interface SpeechBubbleProps {
  body: string;
  showCursor?: boolean;
  showTyping?: boolean;
  chips?: React.ReactNode;
}

function SpeechBubble({ body, showCursor, showTyping, chips }: SpeechBubbleProps) {
  return (
    <div className="flex flex-1 min-w-0 items-start gap-3 sm:gap-4 pointer-events-auto mb-16 sm:mb-20 md:mb-24 lg:mb-[6.5rem]">
      <div className="visitor-greeting-bubble flex-1 min-w-0 rounded-3xl rounded-bl-md border border-outline-variant px-4 py-3.5 sm:px-6 sm:py-5 shadow-lg max-w-2xl">
        <div className="flex items-center gap-2 mb-2 sm:mb-3 text-primary">
          <MessageCircle className="w-4 h-4 shrink-0" aria-hidden />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
            Rishabh
          </span>
        </div>

        <p className="visitor-greeting-text font-sans text-sm sm:text-[16px] text-on-surface leading-relaxed whitespace-pre-line">
          {body}
          {showCursor && (
            <span className="visitor-greeting-cursor" aria-hidden>
              |
            </span>
          )}
        </p>

        {showTyping && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 font-mono text-[11px] text-on-surface-variant tracking-wide"
          >
            Typing
            <span className="visitor-greeting-ellipsis" aria-hidden>
              ...
            </span>
          </motion.p>
        )}
      </div>

      {chips}
    </div>
  );
}

export default function VisitorGreetingHero({
  onNavigate,
  onScrollTo,
}: VisitorGreetingHeroProps) {
  const [heroPhase, setHeroPhase] = useState<HeroPhase>('enter');
  const [heroPanelVisible, setHeroPanelVisible] = useState(true);
  const [marketerPanelVisible, setMarketerPanelVisible] = useState(false);
  const [experiencePanelVisible, setExperiencePanelVisible] = useState(false);
  const marketerShownRef = useRef(false);
  const experienceShownRef = useRef(false);

  const typeOne = useTypewriter(GREETING_PART_ONE, heroPhase === 'typing-one' && heroPanelVisible);
  const typeTwo = useTypewriter(GREETING_PART_TWO, heroPhase === 'typing-two' && heroPanelVisible);
  const marketerType = useTypewriter(
    MARKETER_SIMULATOR_SPEECH,
    marketerPanelVisible,
    20,
  );
  const experienceSpeech = useSequentialLineSpeech(
    EXPERIENCE_OVERVIEW_LINES,
    experiencePanelVisible,
  );

  const dismissHeroPanel = useCallback(() => {
    setHeroPanelVisible(false);
  }, []);

  const dismissMarketerPanel = useCallback(() => {
    setMarketerPanelVisible(false);
  }, []);

  const dismissExperiencePanel = useCallback(() => {
    setExperiencePanelVisible(false);
  }, []);

  const triggerMarketerSpeech = useCallback(() => {
    dismissHeroPanel();
    dismissExperiencePanel();
    setMarketerPanelVisible(true);
  }, [dismissHeroPanel, dismissExperiencePanel]);

  const triggerExperienceSpeech = useCallback(() => {
    dismissHeroPanel();
    dismissMarketerPanel();
    setExperiencePanelVisible(true);
  }, [dismissHeroPanel, dismissMarketerPanel]);

  const showHeroBubble = heroPanelVisible && heroPhase !== 'enter';
  const showHeroTyping = heroPanelVisible && heroPhase === 'pause';
  const showHeroChips = heroPanelVisible && heroPhase === 'chips';
  const showMarketerBubble = marketerPanelVisible;
  const showExperienceBubble = experienceSpeech.showBubble;

  const activeSpeech: ActiveSpeech = showExperienceBubble
    ? 'experience'
    : showMarketerBubble
      ? 'marketer'
      : showHeroBubble
        ? 'hero'
        : null;

  useSpeechPanelDismiss(showHeroBubble, dismissHeroPanel, {
    scrollMode: 'any',
    inactivityEnabled: heroPhase === 'chips',
  });

  useSpeechPanelDismiss(marketerPanelVisible, dismissMarketerPanel, {
    scrollMode: 'section-away',
    sectionHeadingId: 'home-marketer-heading',
    inactivityEnabled: marketerType.done,
  });

  useSpeechPanelDismiss(experiencePanelVisible, dismissExperiencePanel, {
    scrollMode: 'section-away',
    sectionHeadingId: 'home-hire-heading',
    inactivityEnabled: experienceSpeech.sequenceComplete,
  });

  useEffect(() => {
    const timer = window.setTimeout(() => setHeroPhase('typing-one'), 650);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (heroPhase === 'typing-one' && typeOne.done) {
      const timer = window.setTimeout(() => setHeroPhase('pause'), 350);
      return () => window.clearTimeout(timer);
    }
  }, [heroPhase, typeOne.done]);

  useEffect(() => {
    if (heroPhase === 'pause') {
      const timer = window.setTimeout(() => setHeroPhase('typing-two'), 1100);
      return () => window.clearTimeout(timer);
    }
  }, [heroPhase]);

  useEffect(() => {
    if (heroPhase === 'typing-two' && typeTwo.done) {
      const timer = window.setTimeout(() => setHeroPhase('chips'), 450);
      return () => window.clearTimeout(timer);
    }
  }, [heroPhase, typeTwo.done]);

  useSectionSpeechTrigger('home-marketer-heading', marketerShownRef, triggerMarketerSpeech);
  useSectionSpeechTrigger('home-hire-heading', experienceShownRef, triggerExperienceSpeech);

  const handleChipClick = useCallback(
    (id: GreetingAction) => {
      dismissHeroPanel();

      switch (id) {
        case 'wins':
          onScrollTo('home-wins');
          break;
        case 'built':
          onScrollTo('home-featured');
          break;
        case 'hire':
          onScrollTo('home-hire');
          window.setTimeout(() => {
            if (!experienceShownRef.current) {
              experienceShownRef.current = true;
              triggerExperienceSpeech();
            }
          }, 700);
          break;
        case 'marketer':
          onScrollTo('home-marketer');
          window.setTimeout(() => {
            if (!marketerShownRef.current) {
              marketerShownRef.current = true;
              triggerMarketerSpeech();
            }
          }, 700);
          break;
        case 'talk':
          onNavigate('contact');
          break;
      }
    },
    [dismissHeroPanel, onNavigate, onScrollTo, triggerExperienceSpeech, triggerMarketerSpeech],
  );

  const heroBubbleBody =
    heroPhase === 'typing-two' || heroPhase === 'chips'
      ? `${GREETING_PART_ONE}\n\n${typeTwo.displayed}`
      : typeOne.displayed;

  const heroChipsDesktop = (
    <div className="hidden lg:flex flex-col gap-2.5 shrink-0 max-w-[240px]">
      <AnimatePresence>
        {showHeroChips &&
          GREETING_RESPONSES.map((chip, index) => (
            <motion.button
              key={chip.id}
              type="button"
              initial={{ opacity: 0, x: 16, y: 6 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{
                delay: index * 0.08,
                type: 'spring',
                damping: 18,
                stiffness: 160,
              }}
              whileHover={{ scale: 1.03, x: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleChipClick(chip.id)}
              className="visitor-greeting-chip text-left px-4 py-2.5 rounded-2xl border border-outline-variant font-sans text-sm font-medium text-on-surface hover:border-primary hover:text-primary transition-colors cursor-pointer whitespace-nowrap"
            >
              {chip.label}
            </motion.button>
          ))}
      </AnimatePresence>
    </div>
  );

  return (
    <div
      className="visitor-greeting-root fixed bottom-0 left-0 z-40 w-full pointer-events-none"
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-end gap-3 sm:gap-4 p-2 sm:p-4 max-w-7xl">
        <motion.div
          className="shrink-0 pointer-events-auto"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 18, stiffness: 130, delay: 0.15 }}
        >
          <motion.img
            src={mascotAvatarUrl}
            alt="Rishabh — your guide through this portfolio"
            className="visitor-greeting-avatar w-[clamp(96px,22vw,160px)] h-auto object-contain object-bottom drop-shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
            draggable={false}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {activeSpeech === 'experience' && (
            <motion.div
              key={`experience-line-${experienceSpeech.lineIndex}`}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ type: 'spring', damping: 20, stiffness: 180 }}
              className="flex flex-1 min-w-0"
            >
              <SpeechBubble
                body={experienceSpeech.body}
                showCursor={experienceSpeech.showCursor}
              />
            </motion.div>
          )}

          {activeSpeech === 'marketer' && (
            <motion.div
              key="marketer-panel"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ type: 'spring', damping: 20, stiffness: 180 }}
              className="flex flex-1 min-w-0"
            >
              <SpeechBubble
                body={marketerType.displayed}
                showCursor={!marketerType.done}
              />
            </motion.div>
          )}

          {activeSpeech === 'hero' && (
            <motion.div
              key="hero-panel"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ type: 'spring', damping: 20, stiffness: 180 }}
              className="flex flex-1 min-w-0"
            >
              <SpeechBubble
                body={heroBubbleBody}
                showCursor={heroPhase === 'typing-one' || heroPhase === 'typing-two'}
                showTyping={showHeroTyping}
                chips={heroChipsDesktop}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showHeroChips && activeSpeech !== 'marketer' && activeSpeech !== 'experience' && (
          <motion.div
            key="mobile-chips"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="lg:hidden flex gap-2 overflow-x-auto px-3 pb-2 pointer-events-auto scrollbar-none"
          >
            {GREETING_RESPONSES.map((chip, index) => (
              <motion.button
                key={chip.id}
                type="button"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.06 }}
                onClick={() => handleChipClick(chip.id)}
                className="visitor-greeting-chip shrink-0 px-3.5 py-2 rounded-full border border-outline-variant font-sans text-xs font-medium text-on-surface hover:border-primary hover:text-primary transition-colors cursor-pointer"
              >
                {chip.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
