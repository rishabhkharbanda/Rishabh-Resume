import React, { useState } from 'react';
import { X, BarChart3, Users, Eye, TrendingUp, ExternalLink, UserRound, Bot, AlertTriangle, Copy, Check, Cpu } from 'lucide-react';
import { fetchVisitStats, VisitStats } from '../config/api';

const BACKEND_SCRIPT_URL =
  'https://raw.githubusercontent.com/rishabhkharbanda/Rishabh-Resume/main/scripts/portfolio-backend-google-apps-script.gs';

interface VisitStatsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VisitStatsPanel({ isOpen, onClose }: VisitStatsPanelProps) {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<VisitStats | null>(null);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await fetchVisitStats(pin.trim());
      setStats(data);
    } catch (err) {
      setStats(null);
      setError(err instanceof Error ? err.message : 'Failed to load stats.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyBackend = async () => {
    try {
      const response = await fetch(BACKEND_SCRIPT_URL);
      if (!response.ok) throw new Error('Could not download backend script.');
      const script = await response.text();
      await navigator.clipboard.writeText(script);
      setCopyState('copied');
      window.setTimeout(() => setCopyState('idle'), 2500);
    } catch {
      setCopyState('error');
      window.setTimeout(() => setCopyState('idle'), 2500);
    }
  };

  const statCards = stats
    ? [
        { label: 'Unique visitors', value: stats.uniqueVisitors, icon: Users },
        { label: 'Total page views', value: stats.totalPageViews, icon: Eye },
        { label: 'Views today', value: stats.todayPageViews, icon: BarChart3 },
        { label: 'New uniques today', value: stats.todayNewUniques, icon: TrendingUp },
        ...(stats.backendNeedsUpgrade
          ? []
          : [
              { label: 'Human page views', value: stats.humanPageViews, icon: UserRound },
              { label: 'ATS page views', value: stats.atsPageViews, icon: Bot },
              { label: 'Bot / crawler views', value: stats.botPageViews, icon: Cpu },
              { label: 'Human uniques', value: stats.humanUniques, icon: UserRound },
              { label: 'ATS uniques', value: stats.atsUniques, icon: Bot },
              ...(stats.unknownPageViews > 0
                ? [{ label: 'Unclassified views', value: stats.unknownPageViews, icon: Eye }]
                : []),
            ]),
      ]
    : [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto liquid-glass-active border border-outline-variant/50 rounded-3xl p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors"
          aria-label="Close stats"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-6 h-6 text-primary" />
          <h2 className="font-headline text-xl font-bold">Portfolio Analytics</h2>
        </div>

        {!stats ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Enter your private PIN to view visits, including human vs ATS traffic.
            </p>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Access PIN"
              className="w-full bg-surface/30 border-2 border-outline-variant/60 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary"
              autoFocus
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading || !pin.trim()}
              className="w-full bg-primary text-on-primary py-3 rounded-full font-mono text-xs font-bold uppercase tracking-widest disabled:opacity-50"
            >
              {loading ? 'Loading…' : 'View stats'}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            {stats.backendNeedsUpgrade && (
              <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 space-y-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-on-surface">Analytics backend needs a one-time update</p>
                    <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                      GitHub deploys the website only. Human/ATS stats live in Google Apps Script, which is still on
                      version {stats.backendVersion ?? 1}. Pushing code to GitHub does not update it.
                    </p>
                  </div>
                </div>

                <ol className="text-xs text-on-surface-variant space-y-1.5 list-decimal list-inside leading-relaxed">
                  <li>
                    Open{' '}
                    <a
                      href="https://script.google.com/home"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      script.google.com
                    </a>{' '}
                    → your portfolio project
                  </li>
                  <li>Replace all code with the latest backend script (copy below)</li>
                  <li>Run <span className="font-mono">authorizeSetup</span> → Allow permissions</li>
                  <li>
                    Deploy → Manage deployments → Edit → <strong>New version</strong> → Deploy
                  </li>
                  <li>Refresh this panel</li>
                </ol>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleCopyBackend}
                    className="inline-flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider"
                  >
                    {copyState === 'copied' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copyState === 'copied' ? 'Copied' : copyState === 'error' ? 'Copy failed' : 'Copy backend script'}
                  </button>
                  <a
                    href={BACKEND_SCRIPT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-outline-variant px-4 py-2 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider text-on-surface-variant hover:text-primary"
                  >
                    View script
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              {statCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.label}
                    className="liquid-glass p-4 rounded-2xl border border-outline-variant/40"
                  >
                    <Icon className="w-4 h-4 text-primary mb-2" />
                    <p className="font-headline text-2xl font-bold text-primary">{card.value}</p>
                    <p className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant mt-1">
                      {card.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {!stats.backendNeedsUpgrade && (stats.todayHumanPageViews > 0 || stats.todayAtsPageViews > 0) && (
              <p className="text-xs text-on-surface-variant font-mono text-center">
                Today: {stats.todayHumanPageViews} human · {stats.todayAtsPageViews} ATS
              </p>
            )}

            {stats.sheetUrl && (
              <a
                href={stats.sheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-sm text-primary hover:underline font-mono"
              >
                Open full spreadsheet
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex gap-2">
              <button
                onClick={async () => {
                  setLoading(true);
                  setError(null);
                  try {
                    const data = await fetchVisitStats(pin);
                    setStats(data);
                  } catch (err) {
                    setError(err instanceof Error ? err.message : 'Failed to refresh stats.');
                  } finally {
                    setLoading(false);
                  }
                }}
                disabled={loading}
                className="flex-1 border border-outline-variant py-2.5 rounded-full font-mono text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-primary disabled:opacity-50"
              >
                {loading ? 'Refreshing…' : 'Refresh'}
              </button>
              <button
                onClick={() => {
                  setStats(null);
                  setPin('');
                  setError(null);
                }}
                className="flex-1 border border-outline-variant py-2.5 rounded-full font-mono text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-primary"
              >
                Lock
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
