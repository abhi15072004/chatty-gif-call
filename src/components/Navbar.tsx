
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Phone, Video, Users, FileText, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TabType } from '@/pages/Index';

interface NavbarProps {
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab = 'messages', onTabChange }) => {
  const navItems = [
    { icon: MessageSquare, label: 'Messages', id: 'messages' as TabType },
    { icon: Phone, label: 'Calls', id: 'calls' as TabType },
    { icon: Video, label: 'Video', id: 'video' as TabType },
    { icon: Users, label: 'Contacts', id: 'contacts' as TabType },
    { icon: FileText, label: 'Files', id: 'files' as TabType },
    { icon: Settings, label: 'Settings', id: 'settings' as TabType },
  ];

  const handleTabClick = (tabId: TabType) => {
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 md:bottom-auto md:right-auto md:h-screen w-full md:w-20 bg-background border-t md:border-t-0 md:border-r border-border z-50">
      <div className="flex md:flex-col items-center justify-around md:justify-start h-16 md:h-full">
        <div className="hidden md:flex items-center justify-center h-16 w-full border-b border-border">
          <span className="font-bold text-xl">ABHI</span>
        </div>
        
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Link
              key={item.id}
              to={`/${item.id === 'messages' ? '' : item.id}`}
              className={cn(
                "flex flex-col items-center justify-center py-1 md:py-4 w-full relative transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => handleTabClick(item.id)}
            >
              <Icon className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-xs mt-1">{item.label}</span>
              
              {isActive && (
                <span className="absolute bottom-0 md:left-0 h-1 md:h-full w-8 md:w-1 bg-primary rounded-t-full md:rounded-l-none md:rounded-r-full"></span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
