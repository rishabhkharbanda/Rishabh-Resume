import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface CartoonAvatarProps {
  waving: boolean;
  onClick: () => void;
}

export default function CartoonAvatar({ waving, onClick }: CartoonAvatarProps) {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const blinkLoop = () => {
      const delay = 2800 + Math.random() * 2000;
      return window.setTimeout(() => {
        setBlink(true);
        window.setTimeout(() => setBlink(false), 140);
        timer = blinkLoop();
      }, delay);
    };
    let timer = blinkLoop();
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="marketer-avatar relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F77DD] rounded-3xl"
      aria-label="Say hi to Rishabh"
      whileTap={{ scale: 0.97 }}
    >
      <div className="marketer-avatar__body">
        {/* Hair */}
        <div className="marketer-avatar__hair" />
        {/* Face */}
        <div className="marketer-avatar__face">
          <div className={`marketer-avatar__eyes ${blink ? 'is-blinking' : ''}`}>
            <span />
            <span />
          </div>
          <div className="marketer-avatar__smile" />
        </div>
        {/* Shirt with RK */}
        <div className="marketer-avatar__shirt">
          <span>RK</span>
        </div>
        {/* Waving arm */}
        <motion.div
          className="marketer-avatar__arm"
          animate={
            waving
              ? { rotate: [0, 18, -8, 22, -4, 16, 0] }
              : { rotate: [0, 4, -2, 4, 0] }
          }
          transition={
            waving
              ? { duration: 0.9, ease: 'easeInOut' }
              : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          <div className="marketer-avatar__hand">
            <span /><span /><span /><span /><span />
          </div>
        </motion.div>
      </div>
    </motion.button>
  );
}
