export type IssueSeverity = 'high' | 'mid' | 'low';
export type IssueStatus = 'pending' | 'under-review' | 'in-progress' | 'resolved';
export type IssueType = 'pothole' | 'garbage' | 'water-leak' | 'broken-streetlight' | 'encroachment' | 'fallen-tree' | 'open-drain' | 'vandalism';

export interface CivicIssue {
  id: string;
  type: IssueType;
  severity: IssueSeverity;
  status: IssueStatus;
  title: string;
  description: string;
  photo: string;
  location: { lat: number; lng: number; address: string };
  reportedBy: string;
  reportedAt: string;
  estimatedResolution: string;
  upvotes: number;
  points: number;
  statusHistory: { status: IssueStatus; date: string; note: string }[];
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  points: number;
  rank: number;
  reportsCount: number;
  resolvedCount: number;
  badges: Badge[];
  streak: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earned: boolean;
  earnedAt?: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  reports: number;
}

const issuePhotos: Record<IssueType, string> = {
  pothole: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=400&h=300&fit=crop',
  garbage: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&h=300&fit=crop',
  'water-leak': 'https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=400&h=300&fit=crop',
  'broken-streetlight': 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop',
  encroachment: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
  'fallen-tree': 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop',
  'open-drain': 'https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=400&h=300&fit=crop',
  vandalism: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=400&h=300&fit=crop',
};

export const mockIssues: CivicIssue[] = [
  {
    id: '1', type: 'pothole', severity: 'high', status: 'in-progress',
    title: 'Deep pothole on MG Road',
    description: 'A 2-foot deep pothole near MG Road junction causing accidents. Multiple vehicles damaged.',
    photo: issuePhotos.pothole,
    location: { lat: 12.9716, lng: 77.5946, address: 'MG Road, Ward 4' },
    reportedBy: 'Arjun K.', reportedAt: '2026-03-25', estimatedResolution: '2026-03-27',
    upvotes: 47, points: 50,
    statusHistory: [
      { status: 'pending', date: '2026-03-25', note: 'Report filed' },
      { status: 'under-review', date: '2026-03-26', note: 'Assigned to Ward 4 Team' },
      { status: 'in-progress', date: '2026-03-27', note: 'Repair crew dispatched' },
    ],
  },
  {
    id: '2', type: 'garbage', severity: 'mid', status: 'pending',
    title: 'Garbage overflow at Jayanagar 4th Block',
    description: 'Garbage bin overflowing for 3 days. Stray dogs spreading waste across the road.',
    photo: issuePhotos.garbage,
    location: { lat: 12.9250, lng: 77.5938, address: 'Jayanagar 4th Block, Ward 7' },
    reportedBy: 'Priya M.', reportedAt: '2026-03-27', estimatedResolution: '2026-04-03',
    upvotes: 23, points: 50,
    statusHistory: [
      { status: 'pending', date: '2026-03-27', note: 'Report filed' },
    ],
  },
  {
    id: '3', type: 'water-leak', severity: 'high', status: 'under-review',
    title: 'Major water pipe burst on 5th Cross',
    description: 'Water gushing from broken pipeline. Road flooded and traffic blocked.',
    photo: issuePhotos['water-leak'],
    location: { lat: 12.9352, lng: 77.6245, address: '5th Cross, Indiranagar, Ward 12' },
    reportedBy: 'Rahul S.', reportedAt: '2026-03-28', estimatedResolution: '2026-03-30',
    upvotes: 89, points: 50,
    statusHistory: [
      { status: 'pending', date: '2026-03-28', note: 'Report filed' },
      { status: 'under-review', date: '2026-03-28', note: 'Emergency team notified' },
    ],
  },
  {
    id: '4', type: 'broken-streetlight', severity: 'mid', status: 'resolved',
    title: 'Streetlight out on Brigade Road',
    description: 'Three consecutive streetlights not working. Area completely dark after 7 PM.',
    photo: issuePhotos['broken-streetlight'],
    location: { lat: 12.9719, lng: 77.6072, address: 'Brigade Road, Ward 5' },
    reportedBy: 'Kavya R.', reportedAt: '2026-03-20', estimatedResolution: '2026-03-27',
    upvotes: 34, points: 150,
    statusHistory: [
      { status: 'pending', date: '2026-03-20', note: 'Report filed' },
      { status: 'in-progress', date: '2026-03-22', note: 'Electrician dispatched' },
      { status: 'resolved', date: '2026-03-24', note: 'All 3 lights replaced' },
    ],
  },
  {
    id: '5', type: 'fallen-tree', severity: 'high', status: 'pending',
    title: 'Fallen tree blocking Residency Road',
    description: 'Large banyan tree fell during storm. Completely blocking both lanes.',
    photo: issuePhotos['fallen-tree'],
    location: { lat: 12.9698, lng: 77.5986, address: 'Residency Road, Ward 3' },
    reportedBy: 'Anil T.', reportedAt: '2026-03-28', estimatedResolution: '2026-03-30',
    upvotes: 112, points: 50,
    statusHistory: [
      { status: 'pending', date: '2026-03-28', note: 'Report filed' },
    ],
  },
  {
    id: '6', type: 'open-drain', severity: 'mid', status: 'in-progress',
    title: 'Open drain cover missing near school',
    description: 'Drain cover missing near government school entrance. Children at risk.',
    photo: issuePhotos['open-drain'],
    location: { lat: 12.9540, lng: 77.5830, address: 'Basavanagudi, Ward 9' },
    reportedBy: 'Meera D.', reportedAt: '2026-03-26', estimatedResolution: '2026-04-02',
    upvotes: 56, points: 50,
    statusHistory: [
      { status: 'pending', date: '2026-03-26', note: 'Report filed' },
      { status: 'in-progress', date: '2026-03-27', note: 'Cover ordered from vendor' },
    ],
  },
];

export const mockUser: UserProfile = {
  id: 'u1', name: 'Arjun Krishnamurthy', avatar: '',
  points: 1850, rank: 3, reportsCount: 24, resolvedCount: 18, streak: 5,
  badges: [
    { id: 'b1', name: 'City Detective', icon: '🕵️', description: '10 reports filed', earned: true, earnedAt: '2026-02-15' },
    { id: 'b2', name: 'Night Watcher', icon: '🔦', description: 'Reported a broken streetlight', earned: true, earnedAt: '2026-03-01' },
    { id: 'b3', name: 'Water Guardian', icon: '💧', description: 'Reported 5 water leaks', earned: true, earnedAt: '2026-03-20' },
    { id: 'b4', name: 'Ward Hero', icon: '🏆', description: 'Top reporter in your ward this month', earned: false },
    { id: 'b5', name: 'Pioneer', icon: '🚀', description: 'First report in your area', earned: true, earnedAt: '2026-01-10' },
    { id: 'b6', name: 'Streak Master', icon: '🔥', description: '7-day reporting streak', earned: false },
  ],
};

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Sneha Patel', avatar: '', points: 3200, reports: 42 },
  { rank: 2, name: 'Vikram Reddy', avatar: '', points: 2800, reports: 35 },
  { rank: 3, name: 'Arjun K.', avatar: '', points: 1850, reports: 24 },
  { rank: 4, name: 'Divya Sharma', avatar: '', points: 1600, reports: 21 },
  { rank: 5, name: 'Ravi Kumar', avatar: '', points: 1450, reports: 19 },
  { rank: 6, name: 'Ananya Iyer', avatar: '', points: 1200, reports: 16 },
  { rank: 7, name: 'Karthik N.', avatar: '', points: 1100, reports: 14 },
  { rank: 8, name: 'Fatima B.', avatar: '', points: 980, reports: 12 },
  { rank: 9, name: 'Suresh M.', avatar: '', points: 870, reports: 11 },
  { rank: 10, name: 'Lakshmi V.', avatar: '', points: 750, reports: 9 },
];

export const issueTypeLabels: Record<IssueType, string> = {
  pothole: 'Pothole',
  garbage: 'Garbage Overflow',
  'water-leak': 'Water Leak',
  'broken-streetlight': 'Broken Streetlight',
  encroachment: 'Encroachment',
  'fallen-tree': 'Fallen Tree',
  'open-drain': 'Open Drain',
  vandalism: 'Vandalism',
};

export const issueTypeIcons: Record<IssueType, string> = {
  pothole: '🕳️',
  garbage: '🗑️',
  'water-leak': '💧',
  'broken-streetlight': '💡',
  encroachment: '🏗️',
  'fallen-tree': '🌳',
  'open-drain': '🚧',
  vandalism: '🎨',
};

export const statusLabels: Record<IssueStatus, string> = {
  pending: 'Pending',
  'under-review': 'Under Review',
  'in-progress': 'In Progress',
  resolved: 'Resolved',
};
