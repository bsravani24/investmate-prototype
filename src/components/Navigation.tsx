
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, PieChart, User } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = [
    { label: 'Home', icon: Home, path: '/dashboard' },
    { label: 'Learn', icon: BookOpen, path: '/learn' },
    { label: 'Invest', icon: PieChart, path: '/invest' },
    { label: 'Account', icon: User, path: '/account' },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card shadow-lg border-t border-border">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center h-full w-full ${
              isActive(item.path) ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <item.icon size={20} />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
