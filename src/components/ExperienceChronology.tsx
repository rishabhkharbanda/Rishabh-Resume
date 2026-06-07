import React from 'react';
import { 
  TrendingDown, 
  TrendingUp, 
  CheckCircle, 
  LineChart, 
  TrendingUp as IconTrendingUp,
  Workflow,
  Sparkles,
  Award
} from 'lucide-react';
import { portfolioExperiences } from '../data';

export default function ExperienceChronology() {
  return (
    <div className="relative">
      {/* Central Timeline Vertical Rail - Desktop Only */}
      <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[1px] bg-outline-variant/30 -translate-x-1/2 hidden md:block" />

      <div className="space-y-24">
        {/* Role 1: Head Digital Works */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Column: Role Details & Metrics */}
          <div className="md:text-right md:pr-12 order-2 md:order-1 pl-[50px] md:pl-0">
            <div className="inline-block px-3.5 py-1 border border-outline-variant/40 bg-primary-container/20 mb-4 rounded-full backdrop-blur-md">
              <span className="font-mono text-[10px] text-on-surface-variant tracking-wider font-extrabold uppercase">SEPT 2024 - PRESENT</span>
            </div>
            <h2 className="font-headline text-2xl font-bold mb-1">Senior Marketing Analyst</h2>
            <h3 className="font-headline text-lg text-primary font-semibold mb-6">Head Digital Works</h3>
            
            {/* HDW KPI Blocks */}
            <div className="flex flex-wrap gap-4 md:justify-end mb-4">
              <div className="relative group/tooltip liquid-glass p-5 border border-outline-variant/40 min-w-[140px] text-left md:text-right rounded-2xl hover:scale-105 transition-all cursor-help">
                <span className="font-mono text-[10px] text-on-surface-variant block mb-1.5 font-bold">CAC REDUCTION</span>
                <div className="flex items-center gap-2 md:justify-end">
                  <span className="font-headline text-3xl font-extrabold text-primary">17%</span>
                  <TrendingDown className="w-5 h-5 text-data-growth animate-bounce" />
                </div>
                {/* Custom active tooltip */}
                <div className="absolute bottom-[108%] left-1/2 -translate-x-1/2 w-56 p-3.5 rounded-2xl liquid-glass border border-primary/25 shadow-xl opacity-0 translate-y-1 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 transition-all duration-200 pointer-events-none z-50 text-left text-[11px] leading-relaxed font-sans font-medium backdrop-blur-xl">
                  <div className="font-mono text-[9px] text-primary font-extrabold uppercase mb-1">CAC Reduction Detail</div>
                  Pruned non-converting keywords and shifted focus specifically onto high-ROAS localized cohorts.
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-6 border-transparent border-t-white/80 dark:border-t-surface-container/80" />
                </div>
              </div>

              <div className="relative group/tooltip liquid-glass p-5 border border-outline-variant/40 min-w-[140px] text-left md:text-right rounded-2xl hover:scale-105 transition-all cursor-help">
                <span className="font-mono text-[10px] text-on-surface-variant block mb-1.5 font-bold">BUDGET EFFICIENCY</span>
                <div className="flex flex-col">
                  <div className="font-headline text-3xl font-extrabold text-primary">₹2.2Cr</div>
                  <span className="font-mono text-[10px] text-data-growth mt-1 font-bold">Saved Monthly</span>
                </div>
                {/* Custom active tooltip */}
                <div className="absolute bottom-[108%] left-1/2 -translate-x-1/2 w-56 p-3.5 rounded-2xl liquid-glass border border-primary/25 shadow-xl opacity-0 translate-y-1 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 transition-all duration-200 pointer-events-none z-50 text-left text-[11px] leading-relaxed font-sans font-medium backdrop-blur-xl">
                  <div className="font-mono text-[9px] text-primary font-extrabold uppercase mb-1">Operational Savings</div>
                  Reallocated performance routing to achieve ₹26.4M annual savings without scaling limits.
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-6 border-transparent border-t-white/80 dark:border-t-surface-container/80" />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 md:justify-end mt-4">
              <div className="relative group/tooltip liquid-glass px-3.5 py-1.5 border border-outline-variant/40 text-[10px] font-mono text-on-surface-variant rounded-full font-bold cursor-help">
                CHURN: <span className="text-primary font-bold">15% ↓</span>
                {/* Custom active tooltip */}
                <div className="absolute bottom-[115%] left-1/2 -translate-x-1/2 w-48 p-3 rounded-2xl liquid-glass border border-primary/25 shadow-xl opacity-0 translate-y-1 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 transition-all duration-200 pointer-events-none z-50 text-left text-[11px] leading-relaxed font-sans font-medium backdrop-blur-xl">
                  <div className="font-mono text-[9px] text-primary font-bold uppercase mb-0.5">Retention Drive</div>
                  Automated customer onboarding via WebEngage behavior trackers.
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-6 border-transparent border-t-white/80 dark:border-t-surface-container/80" />
                </div>
              </div>
              <div className="relative group/tooltip liquid-glass px-3.5 py-1.5 border border-outline-variant/40 text-[10px] font-mono text-on-surface-variant rounded-full font-bold cursor-help">
                BUDGET: <span className="text-primary font-bold">₹1.8Cr</span>
                {/* Custom active tooltip */}
                <div className="absolute bottom-[115%] left-1/2 -translate-x-1/2 w-48 p-3 rounded-2xl liquid-glass border border-primary/25 shadow-xl opacity-0 translate-y-1 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 transition-all duration-200 pointer-events-none z-50 text-left text-[11px] leading-relaxed font-sans font-medium backdrop-blur-xl">
                  <div className="font-mono text-[9px] text-primary font-bold uppercase mb-0.5">Spend Ceiling</div>
                  Streamlined performance marketing running spend under rigid limits.
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-6 border-transparent border-t-white/80 dark:border-t-surface-container/80" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Initiatives Details Card */}
          <div className="relative order-1 md:order-2 pl-[50px] md:pl-12">
            {/* Timeline node */}
            <div className="absolute left-[30px] md:left-0 top-8 w-5 h-5 bg-primary border-4 border-surface ring-4 ring-primary/25 rounded-full md:-translate-x-1/2 z-10 transition-all duration-300 hover:scale-125" />
 
            <div className="liquid-glass-active border border border-outline-variant p-8 rounded-3xl relative group hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <Workflow className="w-5 h-5 text-primary" />
                <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider font-extrabold">Key Strategic Initiatives</span>
              </div>
              
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-primary text-xl leading-none font-bold select-none">•</span>
                  <p className="font-sans text-[13px] md:text-sm text-on-surface-variant leading-relaxed">
                    Strategically optimized marketing channels via hyper-local geo-segmentation, drastically increasing ROAS across Tier 1 markets.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary text-xl leading-none font-bold select-none">•</span>
                  <p className="font-sans text-[13px] md:text-sm text-on-surface-variant leading-relaxed">
                    Engineered a reduction in monthly operational budget from ₹4Cr to ₹1.8Cr while maintaining peak acquisition rates.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary text-xl leading-none font-bold select-none">•</span>
                  <p className="font-sans text-[13px] md:text-sm text-on-surface-variant leading-relaxed">
                    Implemented targeted automated onboarding journeys via WebEngage, resulting in a 15% reduction in early-stage churn.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Role 2: KSKT Agromart */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Column (Alternated description detail cards) */}
          <div className="relative order-1 md:pl-0 md:pr-12 pl-[50px]">
            {/* Timeline Node */}
            <div className="absolute left-[30px] md:left-full top-8 w-5 h-5 bg-surface-variant border-4 border-surface ring-4 ring-outline-variant/30 rounded-full md:-translate-x-1/2 z-10 hover:bg-primary hover:ring-primary/25 transition-all duration-300 hover:scale-125" />

            <div className="liquid-glass-active border border-outline-variant p-8 rounded-3xl group hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <LineChart className="w-5 h-5 text-primary" />
                <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider font-extrabold">Growth &amp; Analytics</span>
              </div>
              
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-primary text-xl leading-none font-bold select-none">•</span>
                  <p className="font-sans text-[13px] md:text-sm text-on-surface-variant leading-relaxed">
                    Architected 3 comprehensive KPI dashboards for real-time monitoring of supply chain and sales performance.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary text-xl leading-none font-bold select-none">•</span>
                  <p className="font-sans text-[13px] md:text-sm text-on-surface-variant leading-relaxed">
                    Developed churn prediction models that successfully identified at-risk segments with 85% accuracy.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary text-xl leading-none font-bold select-none">•</span>
                  <p className="font-sans text-[13px] md:text-sm text-on-surface-variant leading-relaxed">
                    Enhanced the customer analytics framework, leading to a 60% increase in Average Order Value (AOV) via personalized cross-selling.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Time & KPI Metrics Alternated */}
          <div className="md:pl-12 order-2 md:order-2 pl-[50px] md:text-left">
            <div className="inline-block px-3.5 py-1 border border-outline-variant/40 bg-primary-container/20 mb-4 rounded-full backdrop-blur-md">
              <span className="font-mono text-[10px] text-on-surface-variant tracking-wider font-extrabold uppercase">DEC 2023 - AUG 2024</span>
            </div>
            <h2 className="font-headline text-2xl font-bold mb-1">Data Analyst</h2>
            <h3 className="font-headline text-lg text-primary font-semibold mb-6">KSKT Agromart</h3>

            {/* KSKT Metrics */}
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="relative group/tooltip liquid-glass p-5 border border-outline-variant/40 min-w-[140px] rounded-2xl hover:scale-105 transition-all cursor-help">
                <span className="font-mono text-[10px] text-on-surface-variant block mb-1.5 font-bold">SALES GROWTH</span>
                <div className="flex items-center gap-2">
                  <span className="font-headline text-3xl font-extrabold text-primary">70%</span>
                  <TrendingUp className="w-5 h-5 text-data-growth animate-pulse" />
                </div>
                {/* Custom active tooltip */}
                <div className="absolute bottom-[108%] left-1/2 -translate-x-1/2 w-56 p-3.5 rounded-2xl liquid-glass border border-primary/25 shadow-xl opacity-0 translate-y-1 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 transition-all duration-200 pointer-events-none z-50 text-left text-[11px] leading-relaxed font-sans font-medium backdrop-blur-xl">
                  <div className="font-mono text-[9px] text-primary font-extrabold uppercase mb-1">Sales Volume Detail</div>
                  Drove rapid Month-over-Month grocery sales volumes by deploying personal cross-selling recommendations.
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-6 border-transparent border-t-white/80 dark:border-t-surface-container/80" />
                </div>
              </div>

              <div className="relative group/tooltip liquid-glass p-5 border border-outline-variant/40 min-w-[140px] rounded-2xl hover:scale-105 transition-all cursor-help">
                <span className="font-mono text-[10px] text-on-surface-variant block mb-1.5 font-bold">RETENTION</span>
                <div className="flex flex-col">
                  <div className="font-headline text-3xl font-extrabold text-primary">80%</div>
                  <span className="font-mono text-[10px] text-data-growth mt-1 font-bold">User Base</span>
                </div>
                {/* Custom active tooltip */}
                <div className="absolute bottom-[108%] left-1/2 -translate-x-1/2 w-56 p-3.5 rounded-2xl liquid-glass border border-primary/25 shadow-xl opacity-0 translate-y-1 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 transition-all duration-200 pointer-events-none z-50 text-left text-[11px] leading-relaxed font-sans font-medium backdrop-blur-xl">
                  <div className="font-mono text-[9px] text-primary font-extrabold uppercase mb-1">Retention Integrity</div>
                  Preserved high customer retention thresholds using cohort loyalty curves and churn notifications.
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-6 border-transparent border-t-white/80 dark:border-t-surface-container/80" />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <div className="relative group/tooltip liquid-glass px-3.5 py-1.5 border border-outline-variant/40 text-[10px] font-mono text-on-surface-variant rounded-full font-bold cursor-help">
                AOV UP: <span className="text-primary font-bold">60% ↑</span>
                {/* Custom active tooltip */}
                <div className="absolute bottom-[115%] left-1/2 -translate-x-1/2 w-48 p-3 rounded-2xl liquid-glass border border-primary/25 shadow-xl opacity-0 translate-y-1 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 transition-all duration-200 pointer-events-none z-50 text-left text-[11px] leading-relaxed font-sans font-medium backdrop-blur-xl">
                  <div className="font-mono text-[9px] text-primary font-bold uppercase mb-0.5">Order Upsell</div>
                  Boosted Average Order Value via item-association modeling.
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-6 border-transparent border-t-white/80 dark:border-t-surface-container/80" />
                </div>
              </div>
              <div className="relative group/tooltip liquid-glass px-3.5 py-1.5 border border-outline-variant/40 text-[10px] font-mono text-on-surface-variant rounded-full font-bold cursor-help">
                DASHBOARDS: <span className="text-primary font-bold">3 Built</span>
                {/* Custom active tooltip */}
                <div className="absolute bottom-[115%] left-1/2 -translate-x-1/2 w-48 p-3 rounded-2xl liquid-glass border border-primary/25 shadow-xl opacity-0 translate-y-1 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 transition-all duration-200 pointer-events-none z-50 text-left text-[11px] leading-relaxed font-sans font-medium backdrop-blur-xl">
                  <div className="font-mono text-[9px] text-primary font-bold uppercase mb-0.5">Product Analytics</div>
                  Interactive delivery tracking pipelines built from scratch.
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-6 border-transparent border-t-white/80 dark:border-t-surface-container/80" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Role 3: DaddyTech */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Column: Role Details & Metrics */}
          <div className="md:text-right md:pr-12 order-2 md:order-1 pl-[50px] md:pl-0">
            <div className="inline-block px-3.5 py-1 border border-outline-variant/40 bg-primary-container/20 mb-4 rounded-full backdrop-blur-md">
              <span className="font-mono text-[10px] text-on-surface-variant tracking-wider font-extrabold uppercase">FEB 2023 - NOV 2023</span>
            </div>
            <h2 className="font-headline text-2xl font-bold mb-1">Data Analyst</h2>
            <h3 className="font-headline text-lg text-primary font-semibold mb-6">DaddyTech</h3>

            {/* DaddyTech Metrics */}
            <div className="flex flex-wrap gap-4 md:justify-end mb-4">
              <div className="relative group/tooltip liquid-glass p-5 border border-outline-variant/40 min-w-[140px] text-left md:text-right rounded-2xl hover:scale-105 transition-all cursor-help">
                <span className="font-mono text-[10px] text-on-surface-variant block mb-1.5 font-bold">REVENUE GROWTH</span>
                <div className="flex items-center gap-2 md:justify-end">
                  <span className="font-headline text-3xl font-extrabold text-primary">30%</span>
                  <TrendingUp className="w-5 h-5 text-data-growth animate-pulse" />
                </div>
                {/* Custom active tooltip */}
                <div className="absolute bottom-[108%] left-1/2 -translate-x-1/2 w-56 p-3.5 rounded-2xl liquid-glass border border-primary/25 shadow-xl opacity-0 translate-y-1 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 transition-all duration-200 pointer-events-none z-50 text-left text-[11px] leading-relaxed font-sans font-medium backdrop-blur-xl">
                  <div className="font-mono text-[9px] text-primary font-extrabold uppercase mb-1">Revenue Optimisation</div>
                  Boosted pipeline revenue by streamlining ad placements and refining lead-generation workflows.
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-6 border-transparent border-t-white/80 dark:border-t-surface-container/80" />
                </div>
              </div>

              <div className="relative group/tooltip liquid-glass p-5 border border-outline-variant/40 min-w-[140px] text-left md:text-right rounded-2xl hover:scale-105 transition-all cursor-help">
                <span className="font-mono text-[10px] text-on-surface-variant block mb-1.5 font-bold">DAILY VOLUME</span>
                <div className="flex flex-col">
                  <div className="font-headline text-3xl font-extrabold text-primary">100+</div>
                  <span className="font-mono text-[10px] text-data-growth mt-1 font-bold">New Customers</span>
                </div>
                {/* Custom active tooltip */}
                <div className="absolute bottom-[108%] left-1/2 -translate-x-1/2 w-56 p-3.5 rounded-2xl liquid-glass border border-primary/25 shadow-xl opacity-0 translate-y-1 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 transition-all duration-200 pointer-events-none z-50 text-left text-[11px] leading-relaxed font-sans font-medium backdrop-blur-xl">
                  <div className="font-mono text-[9px] text-primary font-extrabold uppercase mb-1">Customer Acquisition</div>
                  Achieved peak lead volume daily through intelligent CRM profiling and landing page experiments.
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-6 border-transparent border-t-white/80 dark:border-t-surface-container/80" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Initiatives Details Card */}
          <div className="relative order-1 md:order-2 pl-[50px] md:pl-12">
            {/* Timeline node */}
            <div className="absolute left-[30px] md:left-0 top-8 w-5 h-5 bg-surface-variant border-4 border-surface ring-4 ring-outline-variant/30 rounded-full md:-translate-x-1/2 z-10 hover:bg-primary hover:ring-primary/25 transition-all duration-300 hover:scale-125" />

            <div className="liquid-glass-active border border-outline-variant p-8 rounded-3xl relative group hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider font-extrabold">Business Intelligence</span>
              </div>
              
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-primary text-xl leading-none font-bold select-none">•</span>
                  <p className="font-sans text-[13px] md:text-sm text-on-surface-variant leading-relaxed">
                    Built a custom predictive analytics engine that automated lead scoring and scaled customer acquisition 100x.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary text-xl leading-none font-bold select-none">•</span>
                  <p className="font-sans text-[13px] md:text-sm text-on-surface-variant leading-relaxed">
                    Optimized top-of-funnel acquisition strategies, resulting in 30% quarterly revenue growth.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary text-xl leading-none font-bold select-none">•</span>
                  <p className="font-sans text-[13px] md:text-sm text-on-surface-variant leading-relaxed">
                    Improved user retention by 22% through detailed cohort analysis and feature adoption tracking.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
