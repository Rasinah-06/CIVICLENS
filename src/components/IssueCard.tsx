import { CivicIssue, issueTypeLabels, issueTypeIcons } from '@/data/mockData';
import SeverityBadge from './SeverityBadge';
import StatusBadge from './StatusBadge';
import { ThumbsUp, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function IssueCard({ issue, index = 0 }: { issue: CivicIssue; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="glass-card p-3 space-y-3"
    >
      <div className="flex gap-3">
        <img
          src={issue.photo}
          alt={issue.title}
          className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm">{issueTypeIcons[issue.type]}</span>
            <span className="text-xs text-muted-foreground">{issueTypeLabels[issue.type]}</span>
          </div>
          <h3 className="text-sm font-heading font-semibold text-foreground truncate">{issue.title}</h3>
          <div className="flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground truncate">{issue.location.address}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SeverityBadge severity={issue.severity} />
          <StatusBadge status={issue.status} />
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <ThumbsUp className="w-3 h-3" /> {issue.upvotes}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {issue.reportedAt}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
