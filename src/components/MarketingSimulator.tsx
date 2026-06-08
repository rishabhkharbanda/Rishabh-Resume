import React, { useState } from 'react';
import { 
  DollarSign, 
  Percent, 
  Activity, 
  HelpCircle, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  AlertTriangle 
} from 'lucide-react';

export default function MarketingSimulator() {
  // Simulator Variable States
  const [budget, setBudget] = useState(1800000); // 1.8Cr or monthly budget (e.g. ₹18L)
  const [cac, setCac] = useState(1500); // Cost per acquisition
  const [aov, setAov] = useState(4500); // Average Order Value
  const [churn, setChurn] = useState(15); // Monthly Churn Rate %

  // Scenarios presets matching Rishabh's real achievements
  const presets = [
    {
      name: 'Yong Yuan Intl.',
      desc: 'Multi-Market Campaign Analytics',
      budget: 1500000,
      cac: 1100,
      aov: 4200,
      churn: 18
    },
    {
      name: 'HDW Optimized',
      desc: 'Optimized Poker Tournament Campaign',
      budget: 1800000,
      cac: 1200,
      aov: 5000,
      churn: 15
    },
    {
      name: 'KSKT Agromart',
      desc: 'E-commerce Growth Funnel',
      budget: 800000,
      cac: 750,
      aov: 2400,
      churn: 20
    },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setBudget(preset.budget);
    setCac(preset.cac);
    setAov(preset.aov);
    setChurn(preset.churn);
  };

  // Calculations
  const acquisitions = Math.floor(budget / Math.max(1, cac));
  const customerLifespanMonths = Math.max(1, parseFloat((100 / Math.max(1, churn)).toFixed(1)));
  const computedLtv = Math.round(aov * customerLifespanMonths);
  const totalValueWorth = acquisitions * computedLtv;
  const ltvToCacRatio = +(computedLtv / Math.max(1, cac)).toFixed(2);
  const projectedRoas = +(totalValueWorth / Math.max(1, budget)).toFixed(2);

  // Cohort Decay Curve points for SVG rendering
  // Array represented as % retention over 6 cycles: [100, retention, retention^2, etc.]
  const retentionMultiplier = (100 - churn) / 100;
  const cohortSequence = Array.from({ length: 6 }, (_, idx) => {
    return Math.round(100 * Math.pow(retentionMultiplier, idx));
  });

  // Calculate coordinates for SVG line path
  // Box is width=500 height=160. Margin left=40, right=20, top=15, bottom=25
  const svgWidth = 480;
  const svgHeight = 120;
  const xOffset = 40;
  const colWidth = (svgWidth - xOffset - 20) / 5;

  const pointsString = cohortSequence.map((val, idx) => {
    const x = xOffset + idx * colWidth;
    const y = svgHeight - 15 - (val / 100) * (svgHeight - 30);
    return `${x},${y}`;
  }).join(' ');

  // Get color and advice for LTV:CAC logic
  const getLtvCacStatus = (ratio: number) => {
    if (ratio >= 4) return { text: 'EXCELLENT', color: 'text-data-growth bg-primary-container', desc: 'Highly scalable & highly profitable cohort dynamics.' };
    if (ratio >= 3) return { text: 'EFFICIENT', color: 'text-primary bg-primary/10', desc: 'Healthy unit economics aligned for mid-stage scale.' };
    return { text: 'RISKY', color: 'text-red-600 bg-red-50/80 border-red-200', desc: 'CAC is outstripping lifetime values. Needs targeting refinement.' };
  };

  const status = getLtvCacStatus(ltvToCacRatio);

  return (
    <div className="space-y-12">
      {/* Simulation Cockpit Framework */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Sliders Control Deck */}
        <div className="lg:col-span-5 flex flex-col justify-between liquid-glass p-8 md:p-10 rounded-3xl relative overflow-hidden">
          {/* Subtle liquid blob glow background inside panel */}
          <div className="absolute -top-16 -left-16 w-44 h-44 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Activity className="w-5 h-5 text-primary" />
              <span className="font-mono text-[11px] text-primary uppercase font-extrabold tracking-widest">
                Variables Deck
              </span>
            </div>

            {/* Campaign Presets Action row */}
            <div className="mb-8">
              <p className="font-mono text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mb-3 block select-none">
                PRE-SET CAMPAIGN BLUEPRINTS
              </p>
              <div className="grid grid-cols-3 gap-2">
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => applyPreset(p)}
                    className="p-3 text-left rounded-lg bg-surface/65 hover:bg-primary-container border border-outline-variant/60 hover:border-primary/40 active:scale-95 transition-all text-xs cursor-pointer group"
                  >
                    <div className="font-headline font-bold text-primary group-hover:text-primary leading-tight mb-0.5">
                      {p.name}
                    </div>
                    <div className="text-[9px] text-on-surface-variant font-medium leading-none truncated truncate max-w-full">
                      {p.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* SLIDERS LIST */}
            <div className="space-y-8">
              {/* Slider 1: Monthly Budget */}
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="font-mono text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
                    Monthly Ad Budget
                  </span>
                  <span className="font-headline text-lg font-extrabold text-primary">
                    ₹{(budget / 100000).toFixed(1)}L
                  </span>
                </div>
                <input 
                  type="range"
                  min={100000}
                  max={5000000}
                  step={50000}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-surface-container-high rounded-lg cursor-pointer"
                />
                <div className="flex justify-between font-mono text-[9px] text-on-surface-variant/70 font-semibold uppercase">
                  <span>₹1.0L</span>
                  <span>₹50.0L</span>
                </div>
              </div>

              {/* Slider 2: CAC */}
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="font-mono text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
                    Target CPA / CAC
                  </span>
                  <span className="font-headline text-lg font-extrabold text-primary">
                    ₹{cac.toLocaleString('en-IN')}
                  </span>
                </div>
                <input 
                  type="range"
                  min={200}
                  max={8000}
                  step={50}
                  value={cac}
                  onChange={(e) => setCac(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-surface-container-high rounded-lg cursor-pointer"
                />
                <div className="flex justify-between font-mono text-[9px] text-on-surface-variant/70 font-semibold uppercase">
                  <span>₹200</span>
                  <span>₹8,000</span>
                </div>
              </div>

              {/* Slider 3: AOV */}
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="font-mono text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
                    Average Order Value (AOV)
                  </span>
                  <span className="font-headline text-lg font-extrabold text-primary">
                    ₹{aov.toLocaleString('en-IN')}
                  </span>
                </div>
                <input 
                  type="range"
                  min={500}
                  max={20000}
                  step={100}
                  value={aov}
                  onChange={(e) => setAov(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-surface-container-high rounded-lg cursor-pointer"
                />
                <div className="flex justify-between font-mono text-[9px] text-on-surface-variant/70 font-semibold uppercase">
                  <span>₹500</span>
                  <span>₹20,000</span>
                </div>
              </div>

              {/* Slider 4: Monthly Churn % */}
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="font-mono text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
                    Monthly Churn Rate
                  </span>
                  <span className="font-headline text-lg font-extrabold text-primary">
                    {churn}%
                  </span>
                </div>
                <input 
                  type="range"
                  min={5}
                  max={45}
                  step={1}
                  value={churn}
                  onChange={(e) => setChurn(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-surface-container-high rounded-lg cursor-pointer"
                />
                <div className="flex justify-between font-mono text-[9px] text-on-surface-variant/70 font-semibold uppercase">
                  <span>5% (High LTV)</span>
                  <span>45% (Aggressive)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-outline-variant flex items-center justify-between text-on-surface-variant text-[10px] font-mono leading-relaxed">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>LTV Algorithm Validated</span>
            </span>
          </div>
        </div>

        {/* Analytics Display Deck */}
        <div className="lg:col-span-7 flex flex-col justify-between liquid-glass-active p-8 md:p-10 rounded-3xl relative overflow-hidden bg-surface-container/75 border-primary/25">
          {/* Decorative Gloss Gradient shines */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-primary/5 pointer-events-none" />
          
          <div>
            <div className="flex items-center justify-between gap-3 mb-10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="font-headline font-bold text-sm tracking-tight text-on-surface">
                  LTV Real-time Cockpit Metrics
                </span>
              </div>
              <div className="px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-[9px] font-mono font-bold text-primary tracking-widest uppercase">
                ACTIVE CALCULATOR
              </div>
            </div>

            {/* Key Computations Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {/* Acquisitions block */}
              <div>
                <span className="font-mono text-[9px] text-on-surface-variant font-bold uppercase tracking-wider block mb-1">
                  Expected Acquisitions
                </span>
                <div className="font-headline text-2xl md:text-3xl font-extrabold text-primary">
                  {acquisitions.toLocaleString('en-IN')}
                </div>
                <span className="font-sans text-[10px] text-on-surface-variant mt-1 block">
                  Customers per month
                </span>
              </div>

              {/* LTV block */}
              <div>
                <span className="font-mono text-[9px] text-on-surface-variant font-bold uppercase tracking-wider block mb-1">
                  Computed Customer LTV
                </span>
                <div className="font-headline text-2xl md:text-3xl font-extrabold text-primary">
                  ₹{computedLtv.toLocaleString('en-IN')}
                </div>
                <span className="font-sans text-[10px] text-on-surface-variant mt-1 block">
                  LTV lifespan: <span className="font-mono font-bold text-primary">{customerLifespanMonths} mos</span>
                </span>
              </div>

              {/* LTV : CAC efficiency score */}
              <div className="col-span-2 md:col-span-1 liquid-glass border border-outline-variant/40 p-4 rounded-3xl flex items-center justify-between md:flex-col md:items-start md:justify-center gap-1">
                <div>
                  <span className="font-mono text-[9px] text-on-surface-variant font-bold uppercase tracking-wider block">
                    LTV : CAC Rationing
                  </span>
                  <div className="font-headline text-2xl font-extrabold text-[#2a592e] dark:text-data-growth flex items-baseline gap-1 mt-0.5 animate-pulse">
                    {ltvToCacRatio}x
                  </div>
                </div>
                <div className={`px-2.5 py-1.5 rounded-full text-[8px] font-mono font-extrabold uppercase ${status.color} mt-2`}>
                  {status.text}
                </div>
              </div>
            </div>

            {/* Extended Multi-Value ROI Block */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 liquid-glass p-6 rounded-3xl border border-outline-variant/40 relative overflow-hidden mb-10">
              <div>
                <span className="font-mono text-[9px] text-on-surface-variant font-bold uppercase tracking-wider block mb-2">
                  Projected Lifetime Earned Value
                </span>
                <div className="font-headline text-3xl font-extrabold text-primary tracking-tight">
                  ₹{(totalValueWorth / 100000).toFixed(1)}L
                </div>
                <p className="font-sans text-[10px] text-on-surface-variant mt-2 leading-relaxed">
                  Calculated cumulative worth from the simulated cohort acquisition pool across their full retention span.
                </p>
              </div>

              <div className="border-t md:border-t-0 md:border-l border-outline-variant/50 pt-4 md:pt-0 md:pl-6 flex flex-col justify-center">
                <span className="font-mono text-[9px] text-on-surface-variant font-bold uppercase tracking-wider block mb-1">
                  Projected Campaign ROAS
                </span>
                <div className="flex items-center gap-2">
                  <div className="font-headline text-4xl font-extrabold text-[#2b7a3d]">
                    {projectedRoas}x
                  </div>
                  <TrendingUp className="w-5 h-5 text-data-growth" />
                </div>
                <div className="text-[10px] font-sans text-on-surface-variant leading-tight mt-1.5 font-medium">
                  Est. ROI multiplier is <span className="font-mono font-bold text-primary">{Math.round((projectedRoas - 1) * 100)}%</span> net positive over spend budget threshold.
                </div>
              </div>
            </div>

            {/* REAL-TIME SG RETENTION GRAPH */}
            <div className="pt-2 border-t border-outline-variant/60">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-headline text-xs font-bold text-on-surface">
                    Real-time Cohort Decay Curve
                  </h4>
                  <p className="text-[10px] text-on-surface-variant">
                    Visualizing user decay percentage over 6 billing cycles at <span className="font-mono font-semibold text-primary">{churn}% churn/month</span>.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[8.5px] font-semibold text-on-surface-variant uppercase bg-surface-container px-2 py-1 rounded">
                  <span>Cycle 1: 100% Retained</span>
                </div>
              </div>

              {/* Responsive SVG Plot */}
              <div className="w-full bg-surface-container/40 border border-outline-variant/40 rounded-xl p-4 overflow-hidden relative">
                <svg viewBox="0 0 480 120" className="w-full h-auto text-primary">
                  {/* Subtle Grid horizontal tracks */}
                  <line x1="40" y1="15" x2="460" y2="15" stroke="currentColor" className="stroke-outline-variant/25 text-outline-variant" strokeDasharray="3 3" />
                  <line x1="40" y1="52.5" x2="460" y2="52.5" stroke="currentColor" className="stroke-outline-variant/25 text-outline-variant" strokeDasharray="3 3" />
                  <line x1="40" y1="90" x2="460" y2="90" stroke="currentColor" className="stroke-outline-variant/25 text-outline-variant" strokeDasharray="3 3" />
                  
                  {/* Y Axis Grid values */}
                  <text x="12" y="20" className="font-mono text-[9px] fill-on-surface-variant/80 font-bold">100%</text>
                  <text x="18" y="56" className="font-mono text-[9px] fill-on-surface-variant/80 font-bold">50%</text>
                  <text x="24" y="93" className="font-mono text-[9px] fill-on-surface-variant/80 font-bold">0%</text>

                  {/* Shaded Area Under Line Path */}
                  <path 
                    d={`M ${xOffset},${svgHeight - 15} L ${pointsString} L ${xOffset + 5 * colWidth},${svgHeight - 15} Z`}
                    fill="url(#sageGradient)"
                    opacity="0.32"
                  />

                  {/* Main Line Path and Glow Trace */}
                  <polyline 
                    fill="none" 
                    stroke="var(--color-primary)" 
                    strokeWidth="3.5" 
                    points={pointsString} 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Circular Nodes */}
                  {cohortSequence.map((val, idx) => {
                    const cx = xOffset + idx * colWidth;
                    const cy = svgHeight - 15 - (val / 100) * (svgHeight - 30);
                    return (
                      <g key={idx} className="group/node cursor-pointer">
                        <circle 
                          cx={cx} 
                          cy={cy} 
                          r="6" 
                          fill="var(--color-background)" 
                          stroke="var(--color-primary)" 
                          strokeWidth="2.5" 
                        />
                        <circle 
                          cx={cx} 
                          cy={cy} 
                          r="12" 
                          fill="var(--color-primary)" 
                          opacity="0"
                          className="hover:opacity-15 transition-opacity"
                        />
                        {/* Inline Data tooltip overlay on Hover */}
                        <text 
                          x={cx} 
                          y={cy - 12} 
                          textAnchor="middle" 
                          className="font-mono text-[8px] font-extrabold fill-primary opacity-90"
                        >
                          {val}%
                        </text>
                      </g>
                    );
                  })}

                  {/* Bottom Cycle markers */}
                  <text x={xOffset} y="112" textAnchor="middle" className="font-mono text-[8px] font-bold fill-on-surface-variant">C1</text>
                  <text x={xOffset + colWidth} y="112" textAnchor="middle" className="font-mono text-[8px] font-bold fill-on-surface-variant">C2</text>
                  <text x={xOffset + 2 * colWidth} y="112" textAnchor="middle" className="font-mono text-[8px] font-bold fill-on-surface-variant">C3</text>
                  <text x={xOffset + 3 * colWidth} y="112" textAnchor="middle" className="font-mono text-[8px] font-bold fill-on-surface-variant">C4</text>
                  <text x={xOffset + 4 * colWidth} y="112" textAnchor="middle" className="font-mono text-[8px] font-bold fill-on-surface-variant">C5</text>
                  <text x={xOffset + 5 * colWidth} y="112" textAnchor="middle" className="font-mono text-[8px] font-bold fill-on-surface-variant">C6</text>

                  {/* Gradient shaders definition */}
                  <defs>
                    <linearGradient id="sageGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary-container)" />
                      <stop offset="100%" stopColor="var(--color-background)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

          </div>

          <div className="mt-8 pt-4 border-t border-outline-variant/60">
            <div className="flex gap-2 items-start text-on-surface-variant font-sans text-xs">
              <AlertTriangle className="w-5 h-5 text-primary shrink-0 transition-transform hover:scale-110" />
              <p className="leading-normal">
                <span className="font-bold text-on-surface">Insight Advice:</span> {status.desc} Optimal retention thresholds are engineered by aligning targeted customer journeys with geo-segmented marketing channels.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
