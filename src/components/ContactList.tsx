
import React, { useState } from 'react';
import { Search, ChevronDown, Plus } from 'lucide-react';
import { useChat } from '@/context/ChatContext';
import AddContactButton from './AddContactButton';

const ContactList: React.FC = () => {
  const { conversations, setActiveConversation } = useChat();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.participants[0].name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.lastMessagePreview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col overflow-hidden animate-fade-in">
      <div className="p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Messages</h1>
          <AddContactButton />
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full rounded-full py-2.5 pl-10 pr-4 bg-secondary/50 focus:bg-secondary text-foreground placeholder:text-muted-foreground outline-none transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
          <span>All Messages</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {filteredConversations.length > 0 ? (
          <div className="space-y-2">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className="p-3 rounded-xl hover:bg-secondary/60 transition-all duration-200 cursor-pointer"
                onClick={() => setActiveConversation(conversation)}
              >
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <img
                      src={conversation.participants[0].avatar}
                      alt={conversation.participants[0].name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${
                      conversation.participants[0].status === 'online' ? 'bg-green-500' : 
                      conversation.participants[0].status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium truncate">{conversation.participants[0].name}</h3>
                      <span className="text-xs text-muted-foreground flex-shrink-0">{conversation.lastMessageTime}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conversation.lastMessagePreview}</p>
                  </div>
                  
                  {conversation.unreadCount > 0 && (
                    <div className="flex-shrink-0 bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs">
                      {conversation.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <div className="text-muted-foreground mb-2">No conversations found</div>
            <p className="text-sm text-muted-foreground mb-4">Try a different search or add a new contact to start chatting</p>
            <AddContactButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactList;
