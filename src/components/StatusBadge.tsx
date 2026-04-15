import { IssueStatus } from '@/data/mockData';

const config: Record<IssueStatus, { label: string; className: string }> = {
  pending: { label: 'Pending', className: 'bg-muted text-muted-foreground' },
  'under-review': { label: 'Under Review', className: 'bg-primary/20 text-primary' },
  'in-progress': { label: 'In Progress', className: 'bg-accent/20 text-accent' },
  resolved: { label: 'Resolved', className: 'bg-success/20 text-green-400' },
};

export default function StatusBadge({ status }: { status: IssueStatus }) {
  const { label, className } = config[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {status === 'resolved' && '✅ '}{label}
    </span>
  );
}
