import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map, ClipboardList, User, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/map', icon: Map, label: 'Map' },
  { path: '/report', icon: Plus, label: 'Report', isFab: true },
  { path: '/my-reports', icon: ClipboardList, label: 'Reports' },
  { path: '/leaderboard', icon: User, label: 'Rank' },
];

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-background pb-20">
      <main>{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-border/50 backdrop-blur-2xl">
        <div className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;

            if (item.isFab) {
              return (
                <Link key={item.path} to={item.path} className="-mt-8">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg glow-cyan"
                  >
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </motion.div>
                </Link>
              );
            }

            return (
              <Link key={item.path} to={item.path} className="flex flex-col items-center gap-1 px-3 py-1">
                <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div layoutId="nav-dot" className="w-1 h-1 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
