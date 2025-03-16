
import React from 'react';
import { MessageSquare, Phone, Video, Users, Settings, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '@/context/ChatContext';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { conversations } = useChat();
  const unreadCount = conversations.reduce((acc, conv) => acc + conv.unreadCount, 0);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="fixed left-0 bottom-0 w-full md:left-0 md:top-0 md:h-full md:w-20 glass-panel z-10 transition-all duration-500 ease-in-out">
      <div className="flex flex-row justify-around md:flex-col md:justify-start md:h-full items-center py-3 md:py-8 md:gap-8">
        <div className="md:mb-8 animate-float">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold">
            M
          </div>
        </div>
        
        <nav className="flex flex-row md:flex-col items-center justify-center gap-1 md:gap-4">
          <button 
            onClick={() => navigate('/')}
            className="icon-button relative group"
            aria-label="Messages"
          >
            <MessageSquare className="w-6 h-6 text-foreground transition-transform group-hover:scale-110" />
            {unreadCount > 0 && (
              <span className="icon-badge">{unreadCount}</span>
            )}
          </button>
          
          <button 
            onClick={() => navigate('/calls')}
            className="icon-button group"
            aria-label="Voice calls"
          >
            <Phone className="w-6 h-6 text-foreground transition-transform group-hover:scale-110" />
          </button>
          
          <button 
            onClick={() => navigate('/video')}
            className="icon-button group"
            aria-label="Video calls"
          >
            <Video className="w-6 h-6 text-foreground transition-transform group-hover:scale-110" />
          </button>
          
          <button 
            onClick={() => navigate('/contacts')}
            className="icon-button group"
            aria-label="Contacts"
          >
            <Users className="w-6 h-6 text-foreground transition-transform group-hover:scale-110" />
          </button>
        </nav>
        
        <div className="mt-auto flex flex-row md:flex-col gap-2">
          <button 
            onClick={toggleDarkMode}
            className="icon-button group"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-6 h-6 text-foreground transition-transform group-hover:scale-110" />
            ) : (
              <Moon className="w-6 h-6 text-foreground transition-transform group-hover:scale-110" />
            )}
          </button>
          
          <button 
            onClick={() => navigate('/settings')}
            className="icon-button group"
            aria-label="Settings"
          >
            <Settings className="w-6 h-6 text-foreground transition-transform group-hover:scale-110" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
