
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import ContactList from '@/components/ContactList';
import ChatInterface from '@/components/ChatInterface';
import ContactsView from '@/components/ContactsView';
import FileStorageView from '@/components/FileStorageView';

export type TabType = 'messages' | 'calls' | 'video' | 'contacts' | 'files' | 'settings';

interface IndexProps {
  activeTab?: TabType;
}

const Index: React.FC<IndexProps> = ({ activeTab = 'messages' }) => {
  const [currentTab, setCurrentTab] = useState<TabType>(activeTab);

  useEffect(() => {
    // Set document title
    document.title = 'ABHI';
    
    // Update tab from prop if it changes
    if (activeTab !== currentTab) {
      setCurrentTab(activeTab);
    }
  }, [activeTab, currentTab]);

  // Render the appropriate content based on the active tab
  const renderSidebar = () => {
    switch (currentTab) {
      case 'contacts':
        return <ContactsView />;
      case 'files':
        return <FileStorageView />;
      case 'messages':
      default:
        return <ContactList />;
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Navigation */}
      <Navbar activeTab={currentTab} onTabChange={setCurrentTab} />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col md:flex-row md:ml-20 h-[calc(100vh-64px)] md:h-screen relative">
        {/* Sidebar - dynamic based on active tab */}
        <div className="md:w-80 lg:w-96 h-full border-r border-border bg-background/50 backdrop-blur-xs">
          {renderSidebar()}
        </div>
        
        {/* Chat interface - only show when messages tab is active */}
        <div className="flex-1 h-full">
          {currentTab === 'messages' ? (
            <ChatInterface />
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center">
              <h2 className="text-xl font-medium mb-2">
                {currentTab === 'contacts' ? 'Select a contact to start chatting' : 
                 currentTab === 'files' ? 'Select a file to share' :
                 'Feature coming soon'}
              </h2>
              <p className="text-muted-foreground max-w-sm">
                {currentTab === 'contacts' ? 'Import contacts from your device or add new contacts to your ABHI app.' : 
                 currentTab === 'files' ? 'Upload files to share them in your conversations.' :
                 'This feature is currently under development.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
