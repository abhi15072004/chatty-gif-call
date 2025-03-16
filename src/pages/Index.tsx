
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ContactList from '@/components/ContactList';
import ChatInterface from '@/components/ChatInterface';

interface IndexProps {
  activeTab?: 'messages' | 'calls' | 'video' | 'contacts' | 'settings';
}

const Index: React.FC<IndexProps> = ({ activeTab = 'messages' }) => {
  // In a fully implemented app, we would handle different tabs here
  // For now, we're focusing on the messaging interface

  useEffect(() => {
    // Set document title
    document.title = 'Messaging App';
  }, []);

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Navigation */}
      <Navbar />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col md:flex-row md:ml-20 h-[calc(100vh-64px)] md:h-screen relative">
        {/* Contact list sidebar - hidden on mobile when chat is active */}
        <div className="md:w-80 lg:w-96 h-full border-r border-border bg-background/50 backdrop-blur-xs">
          <ContactList />
        </div>
        
        {/* Chat interface */}
        <div className="flex-1 h-full">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
};

export default Index;
