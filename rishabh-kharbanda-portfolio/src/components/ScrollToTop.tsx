import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-[80] p-4 rounded-full liquid-glass-active border-primary/35 bg-surface/85 text-primary shadow-lg hover:bg-primary-container hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5px] animate-pulse" />
        </button>
      )}
    </>
  );
}
