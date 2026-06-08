import React, { useState } from 'react';
import { X, BarChart3, Users, Eye, TrendingUp, ExternalLink } from 'lucide-react';
import { fetchVisitStats, VisitStats } from '../config/api';

interface VisitStatsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VisitStatsPanel({ isOpen, onClose }: VisitStatsPanelProps) {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<VisitStats | null>(null);

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

  const statCards = stats
    ? [
        { label: 'Unique visitors', value: stats.uniqueVisitors, icon: Users },
        { label: 'Total page views', value: stats.totalPageViews, icon: Eye },
        { label: 'Views today', value: stats.todayPageViews, icon: BarChart3 },
        { label: 'New uniques today', value: stats.todayNewUniques, icon: TrendingUp },
      ]
    : [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md liquid-glass-active border border-outline-variant/50 rounded-3xl p-8 shadow-2xl">
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
              Enter your private PIN to view unique visits and page views.
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

            <button
              onClick={() => {
                setStats(null);
                setPin('');
              }}
              className="w-full border border-outline-variant py-2.5 rounded-full font-mono text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-primary"
            >
              Lock
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
