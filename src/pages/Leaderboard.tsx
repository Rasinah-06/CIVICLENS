import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { mockLeaderboard, mockUser } from '@/data/mockData';

const tabOptions = ['Global', 'My City', 'My Ward'] as const;

const crownColors: Record<number, string> = {
  1: 'text-yellow-400',
  2: 'text-gray-300',
  3: 'text-amber-600',
};

const crownIcons: Record<number, string> = { 1: '👑', 2: '🥈', 3: '🥉' };

export default function Leaderboard() {
  const [tab, setTab] = useState(0);

  return (
    <div className="px-4 pt-6 space-y-5">
      <h1 className="text-2xl font-heading font-bold text-foreground">Leaderboard</h1>

      {/* Tabs */}
      <div className="flex gap-2">
        {tabOptions.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
              tab === i ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Top 3 */}
      <div className="flex items-end justify-center gap-4 py-4">
        {[1, 0, 2].map((idx) => {
          const entry = mockLeaderboard[idx];
          const isFirst = idx === 0;
          return (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              className={`flex flex-col items-center ${isFirst ? 'order-first' : ''}`}
            >
              <span className="text-2xl mb-1">{crownIcons[entry.rank]}</span>
              <div className={`w-14 h-14 rounded-full bg-muted flex items-center justify-center text-xl font-heading font-bold ${crownColors[entry.rank] || 'text-foreground'} ${isFirst ? 'w-18 h-18 ring-2 ring-yellow-400/50' : ''}`}>
                {entry.name[0]}
              </div>
              <p className="text-xs font-medium text-foreground mt-2 text-center max-w-[80px] truncate">{entry.name}</p>
              <p className={`text-xs font-heading font-bold ${crownColors[entry.rank] || 'text-muted-foreground'}`}>
                {entry.points.toLocaleString()} pts
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Your Rank */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card p-4 glow-cyan flex items-center gap-4"
      >
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-heading font-semibold text-foreground">Your Rank</p>
          <p className="text-xs text-muted-foreground">{mockUser.points.toLocaleString()} points</p>
        </div>
        <span className="text-2xl font-heading font-bold text-primary">#{mockUser.rank}</span>
      </motion.div>

      {/* Full List */}
      <div className="space-y-2">
        {mockLeaderboard.slice(3).map((entry, i) => (
          <motion.div
            key={entry.rank}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-3 flex items-center gap-3"
          >
            <span className="text-sm font-heading font-bold text-muted-foreground w-6 text-center">
              {entry.rank}
            </span>
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-foreground">
              {entry.name[0]}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{entry.name}</p>
              <p className="text-xs text-muted-foreground">{entry.reports} reports</p>
            </div>
            <span className="text-sm font-heading font-semibold text-foreground">{entry.points.toLocaleString()}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
