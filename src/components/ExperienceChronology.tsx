import React from 'react';
import { TrendingDown, TrendingUp, Workflow } from 'lucide-react';
import { portfolioExperiences } from '../data';
import { ExperienceItem, Metric } from '../types';

function MetricCard({ metric, alignEnd }: { metric: Metric; alignEnd?: boolean }) {
  const isUp = metric.trend === 'up';
  const isDown = metric.trend === 'down';

  return (
    <div
      className={`relative group/tooltip liquid-glass p-5 border border-outline-variant/40 min-w-[140px] rounded-2xl hover:scale-105 transition-all cursor-help ${
        alignEnd ? 'text-left md:text-right' : ''
      }`}
    >
      <span className="font-mono text-[10px] text-on-surface-variant block mb-1.5 font-bold">
        {metric.label}
      </span>
      <div className={`flex items-center gap-2 ${alignEnd ? 'md:justify-end' : ''}`}>
        <span className="font-headline text-3xl font-extrabold text-primary">{metric.value}</span>
        {isUp && <TrendingUp className="w-5 h-5 text-data-growth animate-pulse" />}
        {isDown && <TrendingDown className="w-5 h-5 text-data-growth animate-bounce" />}
      </div>
      {metric.subLabel && (
        <span className="font-mono text-[10px] text-data-growth mt-1 font-bold block">
          {metric.subLabel}
        </span>
      )}
    </div>
  );
}

function ExperienceBlock({
  experience,
  index,
}: {
  experience: ExperienceItem;
  index: number;
}) {
  const isEven = index % 2 === 0;
  const primaryMetrics = experience.metrics.slice(0, 2);
  const secondaryMetrics = experience.metrics.slice(2);

  const detailsColumn = (
    <div className={`${isEven ? 'md:text-right md:pr-12' : 'md:pl-12 md:text-left'} order-2 ${isEven ? 'md:order-1' : 'md:order-2'} pl-[50px] md:pl-0`}>
      <div className="inline-block px-3.5 py-1 border border-outline-variant/40 bg-primary-container/20 mb-4 rounded-full backdrop-blur-md">
        <span className="font-mono text-[10px] text-on-surface-variant tracking-wider font-extrabold uppercase">
          {experience.period}
        </span>
      </div>
      <h2 className="font-headline text-2xl font-bold mb-1">{experience.role}</h2>
      <h3 className="font-headline text-lg text-primary font-semibold mb-2">{experience.company}</h3>
      {experience.location && (
        <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-6 font-bold">
          {experience.location}
        </p>
      )}

      <div className={`flex flex-wrap gap-4 mb-4 ${isEven ? 'md:justify-end' : ''}`}>
        {primaryMetrics.map((metric) => (
          <div key={metric.label}>
            <MetricCard metric={metric} alignEnd={isEven} />
          </div>
        ))}
      </div>

      {secondaryMetrics.length > 0 && (
        <div className={`flex flex-wrap gap-3 mt-4 ${isEven ? 'md:justify-end' : ''}`}>
          {secondaryMetrics.map((metric) => (
            <div
              key={metric.label}
              className="liquid-glass px-3.5 py-1.5 border border-outline-variant/40 text-[10px] font-mono text-on-surface-variant rounded-full font-bold"
            >
              {metric.label}: <span className="text-primary font-bold">{metric.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const initiativesColumn = (
    <div className={`relative order-1 ${isEven ? 'md:order-2 pl-[50px] md:pl-12' : 'md:order-1 md:pr-12 pl-[50px]'}`}>
      <div
        className={`absolute left-[30px] w-5 h-5 border-4 border-surface rounded-full z-10 transition-all duration-300 hover:scale-125 top-8 ${
          isEven
            ? 'md:left-0 bg-primary ring-4 ring-primary/25 md:-translate-x-1/2'
            : 'md:left-full bg-surface-variant ring-4 ring-outline-variant/30 md:-translate-x-1/2 hover:bg-primary hover:ring-primary/25'
        }`}
      />

      <div className="liquid-glass-active border border-outline-variant p-8 rounded-3xl relative group hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <Workflow className="w-5 h-5 text-primary" />
          <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider font-extrabold">
            {experience.descriptionTitle ?? 'Key Initiatives'}
          </span>
        </div>

        <ul className="space-y-4">
          {experience.points.map((point) => (
            <li key={`${point.label ?? 'detail'}-${point.text.slice(0, 48)}`} className="flex gap-3">
              <span className="text-primary text-xl leading-none font-bold select-none">•</span>
              <p className="font-sans text-[13px] md:text-sm text-on-surface-variant leading-relaxed">
                {point.label ? (
                  <>
                    <span className="font-semibold text-on-surface">{point.label}: </span>
                    {point.text}
                  </>
                ) : (
                  point.text
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      {isEven ? (
        <>
          {detailsColumn}
          {initiativesColumn}
        </>
      ) : (
        <>
          {initiativesColumn}
          {detailsColumn}
        </>
      )}
    </div>
  );
}

export default function ExperienceChronology() {
  return (
    <div className="relative">
      <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[1px] bg-outline-variant/30 -translate-x-1/2 hidden md:block" />

      <div className="space-y-24">
        {portfolioExperiences.map((experience, index) => (
          <div key={`${experience.company}-${experience.period}`}>
            <ExperienceBlock experience={experience} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}
