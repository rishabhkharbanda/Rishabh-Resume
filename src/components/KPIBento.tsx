import React from 'react';
import { TrendingDown, TrendingUp, Award } from 'lucide-react';

export default function KPIBento() {
  const cards = [
    {
      label: 'CAC Optimization',
      value: '17%',
      impact: 'REDUCTION ACHIEVED',
      description: 'Strategically optimized marketing channels with geo-segmentation at Head Digital Works.',
      trend: 'down',
      icon: TrendingDown,
      tooltip: 'Achieved by pruning non-converting keywords and routing ad spend efficiently to high-LTV localized gaming cohorts.'
    },
    {
      label: 'Sales Performance',
      value: '70%',
      impact: 'MOM GROWTH',
      description: 'Drove unprecedented sales growth through strategic optimization at KSKT Agromart.',
      trend: 'up',
      icon: TrendingUp,
      tooltip: 'Engineered recommendation layers and tailored localized push sequences based on user activity matrices.'
    },
    {
      label: 'Industry Experience',
      value: '5+',
      impact: 'YEARS OF EXPERTISE',
      description: 'Years of experience across gaming, e-commerce, B2C growth, and international markets.',
      trend: 'normal',
      icon: Award,
      tooltip: 'Career spanning Yong Yung Casino, Head Digital Works, KSKT Agromart, DaddyTech, and FabHotels.',
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div 
            key={i} 
            className="relative group/tooltip liquid-glass p-8 rounded-3xl hover:border-primary/50 hover:bg-surface/75 hover:scale-[1.01] transition-all duration-300"
          >
            {/* Top tiny decorator */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent scale-x-0 group-hover/tooltip:scale-x-100 transition-transform duration-500 rounded-t-3xl" />
            
            {/* Gloss reflection shine overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 pointer-events-none rounded-3xl" />

            <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-4 block font-extrabold">
              {card.label}
            </span>
            <div className="font-headline text-[44px] md:text-[54px] font-extrabold text-primary mb-2 tracking-tight leading-none group-hover/tooltip:translate-x-1 transition-transform">
              {card.value}
            </div>

            <div className={`flex items-center gap-2 font-mono text-[10px] font-extrabold tracking-wider ${
              card.trend === 'down' || card.trend === 'up' 
                ? 'text-data-growth bg-primary-container border border-primary/30' 
                : 'text-primary'
              } px-3 py-1.5 rounded-full w-fit mb-6`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{card.impact}</span>
            </div>

            <p className="text-on-surface-variant text-sm font-sans leading-relaxed">
              {card.description}
            </p>

            {/* Tooltip Popup container */}
            <div className="absolute bottom-[104%] left-1/2 -translate-x-1/2 w-64 max-w-[calc(100vw-2rem)] p-4 rounded-2xl liquid-glass border border-primary/25 shadow-xl opacity-0 translate-y-1 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 transition-all duration-300 pointer-events-none z-50 text-center text-xs backdrop-blur-xl hidden md:block">
              <div className="font-mono text-[9px] text-primary font-extrabold uppercase tracking-wider mb-1">
                Strategic Insight
              </div>
              <p className="text-on-surface text-[11px] leading-relaxed font-sans font-medium">
                {card.tooltip}
              </p>
              {/* Tooltip triangle indicator */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-6 border-transparent border-t-white/80 dark:border-t-surface-container/80" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

