import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockIssues, IssueStatus, statusLabels } from '@/data/mockData';
import IssueCard from '@/components/IssueCard';

const tabs: { key: IssueStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'in-progress', label: 'Active' },
  { key: 'resolved', label: 'Resolved' },
];

export default function MyReports() {
  const [filter, setFilter] = useState<IssueStatus | 'all'>('all');
  const filtered = filter === 'all' ? mockIssues : mockIssues.filter(i => i.status === filter);

  return (
    <div className="px-4 pt-6 space-y-5">
      <h1 className="text-2xl font-heading font-bold text-foreground">My Reports</h1>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              filter === tab.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total', value: mockIssues.length, color: 'text-primary' },
          { label: 'Active', value: mockIssues.filter(i => i.status !== 'resolved').length, color: 'text-accent' },
          { label: 'Resolved', value: mockIssues.filter(i => i.status === 'resolved').length, color: 'text-green-400' },
        ].map(s => (
          <div key={s.label} className="glass-card p-3 text-center">
            <p className={`text-xl font-heading font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Issues List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-4xl mb-3">📋</p>
            <p className="font-heading font-semibold">No reports found</p>
          </div>
        ) : (
          filtered.map((issue, i) => <IssueCard key={issue.id} issue={issue} index={i} />)
        )}
      </div>
    </div>
  );
}
