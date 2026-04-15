import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Clock, TrendingUp, Flame, Trophy, MapPin, ArrowRight } from 'lucide-react';
import { mockIssues, mockUser, issueTypeIcons, issueTypeLabels } from '@/data/mockData';
import IssueCard from '@/components/IssueCard';
import { Link } from 'react-router-dom';

function StatCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string | number; color: string }) {
  return (
    <div className="glass-card p-4 space-y-2">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="w-4 h-4" />
      </div>
      <p className="text-2xl font-heading font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

export default function Index() {
  const pendingCount = mockIssues.filter(i => i.status === 'pending').length;
  const resolvedCount = mockIssues.filter(i => i.status === 'resolved').length;
  const highSeverity = mockIssues.filter(i => i.severity === 'high').length;
  const recentIssues = [...mockIssues].sort((a, b) => b.reportedAt.localeCompare(a.reportedAt)).slice(0, 4);

  return (
    <div className="px-4 pt-6 space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Welcome back,</p>
            <h1 className="text-2xl font-heading font-bold text-gradient-cyan">
              {mockUser.name.split(' ')[0]} 👋
            </h1>
          </div>
          <div className="glass-card px-3 py-2 flex items-center gap-2">
            <Flame className="w-4 h-4 text-accent" />
            <span className="text-sm font-heading font-semibold text-accent">{mockUser.streak} day streak</span>
          </div>
        </div>
      </motion.div>

      {/* Points Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-5 glow-cyan relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Your Points</p>
              <p className="text-4xl font-heading font-bold text-gradient-cyan mt-1">{mockUser.points.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">
                <Trophy className="w-3 h-3 inline mr-1 text-accent" />
                Rank #{mockUser.rank} in your ward
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Next reward at</p>
              <p className="text-lg font-heading font-bold text-accent">2,000</p>
              <div className="w-24 h-2 bg-muted rounded-full mt-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(mockUser.points / 2000) * 100}%` }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="h-full bg-gradient-to-r from-primary to-cyan-300 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* City Stats */}
      <div>
        <h2 className="text-sm font-heading font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          City Pulse
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <StatCard icon={AlertTriangle} label="Pending Issues" value={pendingCount} color="bg-severity-mid/20 text-amber-400" />
          <StatCard icon={CheckCircle} label="Resolved" value={resolvedCount} color="bg-success/20 text-green-400" />
          <StatCard icon={TrendingUp} label="High Severity" value={highSeverity} color="bg-severity-high/20 text-red-400" />
          <StatCard icon={MapPin} label="Total Reports" value={mockIssues.length} color="bg-primary/20 text-primary" />
        </div>
      </div>

      {/* Badges */}
      <div>
        <h2 className="text-sm font-heading font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Your Badges
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {mockUser.badges.map((badge) => (
            <motion.div
              key={badge.id}
              whileHover={{ scale: 1.05 }}
              className={`flex-shrink-0 glass-card p-3 w-20 text-center ${!badge.earned ? 'opacity-40 grayscale' : ''}`}
            >
              <span className="text-2xl">{badge.icon}</span>
              <p className="text-[10px] font-medium text-foreground mt-1 leading-tight">{badge.name}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Issues */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-heading font-semibold text-muted-foreground uppercase tracking-wider">
            Recent Issues
          </h2>
          <Link to="/my-reports" className="text-xs text-primary flex items-center gap-1">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-3">
          {recentIssues.map((issue, i) => (
            <IssueCard key={issue.id} issue={issue} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
