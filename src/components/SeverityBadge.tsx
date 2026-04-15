import { IssueSeverity } from '@/data/mockData';

const config: Record<IssueSeverity, { label: string; className: string }> = {
  high: { label: '🔴 High', className: 'bg-severity-high/20 text-red-400 border-red-500/30' },
  mid: { label: '🟡 Mid', className: 'bg-severity-mid/20 text-amber-400 border-amber-500/30' },
  low: { label: '🟢 Low', className: 'bg-severity-low/20 text-green-400 border-green-500/30' },
};

export default function SeverityBadge({ severity }: { severity: IssueSeverity }) {
  const { label, className } = config[severity];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${className}`}>
      {label}
    </span>
  );
}
