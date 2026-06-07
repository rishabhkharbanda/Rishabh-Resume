import React from 'react';
import { CheckCircle2, ArrowLeft, Activity } from 'lucide-react';

interface SuccessScreenProps {
  onBack: () => void;
  formPayload?: {
    name: string;
    email: string;
    subject: string;
    message: string;
  } | null;
}

export default function SuccessScreen({ onBack, formPayload }: SuccessScreenProps) {
  return (
    <section className="max-w-2xl w-full text-center mx-auto">
      {/* Decorative Matrix Background */}
      <div className="absolute inset-0 -z-10 opacity-10" style={{ backgroundImage: 'radial-gradient(#3d494c 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="bg-surface-container border border-outline-variant p-8 md:p-16 rounded-lg success-glow relative overflow-hidden">
        {/* Holographic glowing line at the top border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        
        {/* Animated Check Circle Hero */}
        <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-primary/30 bg-primary/5 animate-pulse-slow">
          <CheckCircle2 className="w-10 h-10 text-primary" strokeWidth={2} />
        </div>

        {/* Dynamic Success Headline */}
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface mb-4 tracking-tight">
          Message Sent Successfully
        </h2>

        {/* Subtitle callout status */}
        <p className="font-sans text-lg text-on-surface-variant mb-10 leading-relaxed max-w-md mx-auto">
          Thanks for reaching out, <span className="text-primary font-bold">{formPayload?.name || 'Partner'}</span>! I typically respond within <span className="text-primary font-mono font-bold">24 hours</span> to discuss data-driven growth opportunities.
        </p>

        {/* Call to action center triggers */}
        <div className="flex flex-col items-center gap-6">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-3 bg-primary text-on-primary px-8 py-4 rounded font-mono text-[11px] font-extrabold uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
            <span>Back to Home</span>
          </button>

          {/* Core system state indicator */}
          <div className="flex items-center gap-2 opacity-60">
            <Activity className="w-4 h-4 text-primary animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-widest font-bold text-on-surface-variant">
              Growth Engine Active
            </span>
          </div>
        </div>

        {/* High-fidelity responsive technical JSON logging packet */}
        <div className="absolute bottom-4 right-8 opacity-25 pointer-events-none hidden md:block select-none text-left font-mono text-[8px] leading-normal text-primary">
          <pre>
{`{
  "status": 200,
  "intent": "COLLABORATION",
  "priority": "HIGH_GROWTH",
  "name": "${(formPayload?.name || 'visitor').toUpperCase().substring(0, 15)}",
  "domain": "${(formPayload?.email || 'unassigned').split('@')[1] || 'local'}",
  "data_packets": "RECEIVED"
}`}
          </pre>
        </div>
      </div>
    </section>
  );
}
