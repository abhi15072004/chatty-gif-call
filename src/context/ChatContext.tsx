
import React, { createContext, useContext, useState } from 'react';

// Types
export type User = {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: string;
};

export type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  type: 'text' | 'emoji' | 'gif' | 'image';
  url?: string;
};

export type Conversation = {
  id: string;
  participants: User[];
  messages: Message[];
  unreadCount: number;
  lastMessagePreview: string;
  lastMessageTime: string;
};

// Initial mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop&q=80',
    status: 'online',
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&auto=format&fit=crop&q=80',
    status: 'away',
    lastSeen: '2 hours ago',
  },
  {
    id: '3',
    name: 'Emma Williams',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&auto=format&fit=crop&q=80',
    status: 'online',
  },
  {
    id: '4',
    name: 'Alex Taylor',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&auto=format&fit=crop&q=80',
    status: 'offline',
    lastSeen: 'yesterday',
  },
];

const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: [mockUsers[0]],
    messages: [
      {
        id: '101',
        senderId: '1',
        text: 'Hey, how are you doing?',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        type: 'text',
      },
      {
        id: '102',
        senderId: 'me',
        text: 'I\'m good! Just finishing up some work. What about you?',
        timestamp: new Date(Date.now() - 3500000).toISOString(),
        type: 'text',
      },
      {
        id: '103',
        senderId: '1',
        text: 'Same here. Want to grab coffee later?',
        timestamp: new Date(Date.now() - 3400000).toISOString(),
        type: 'text',
      },
    ],
    unreadCount: 1,
    lastMessagePreview: 'Same here. Want to grab coffee later?',
    lastMessageTime: '10:30 AM',
  },
  {
    id: '2',
    participants: [mockUsers[1]],
    messages: [
      {
        id: '201',
        senderId: '2',
        text: 'Did you see the latest project requirements?',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        type: 'text',
      },
      {
        id: '202',
        senderId: 'me',
        text: 'Yes, I\'m reviewing them now. They seem pretty straightforward.',
        timestamp: new Date(Date.now() - 86000000).toISOString(),
        type: 'text',
      },
    ],
    unreadCount: 0,
    lastMessagePreview: 'Yes, I\'m reviewing them now...',
    lastMessageTime: 'Yesterday',
  },
  {
    id: '3',
    participants: [mockUsers[2]],
    messages: [
      {
        id: '301',
        senderId: '3',
        text: 'Hey! Are we still on for dinner tonight?',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        type: 'text',
      },
    ],
    unreadCount: 0,
    lastMessagePreview: 'Hey! Are we still on for dinner tonight?',
    lastMessageTime: '2d ago',
  },
];

// Context type
type ChatContextType = {
  users: User[];
  conversations: Conversation[];
  activeConversation: Conversation | null;
  setActiveConversation: (conversation: Conversation | null) => void;
  sendMessage: (text: string, type: Message['type'], url?: string) => void;
  addContact: (name: string) => void;
};

// Create context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Provider component
export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);

  const sendMessage = (text: string, type: Message['type'] = 'text', url?: string) => {
    if (!activeConversation) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text,
      timestamp: new Date().toISOString(),
      type,
      url,
    };

    const updatedConversation = {
      ...activeConversation,
      messages: [...activeConversation.messages, newMessage],
      lastMessagePreview: text.length > 30 ? text.substring(0, 30) + '...' : text,
      lastMessageTime: 'Just now',
    };

    setActiveConversation(updatedConversation);
    setConversations(
      conversations.map((conv) =>
        conv.id === activeConversation.id ? updatedConversation : conv
      )
    );
  };

  const addContact = (name: string) => {
    if (!name.trim()) return;
    
    const newUser: User = {
      id: Date.now().toString(),
      name,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
      status: 'offline',
    };

    setUsers([...users, newUser]);

    // Create a new empty conversation with this user
    const newConversation: Conversation = {
      id: Date.now().toString(),
      participants: [newUser],
      messages: [],
      unreadCount: 0,
      lastMessagePreview: 'Start a conversation',
      lastMessageTime: 'New',
    };

    setConversations([...conversations, newConversation]);
  };

  return (
    <ChatContext.Provider
      value={{
        users,
        conversations,
        activeConversation,
        setActiveConversation,
        sendMessage,
        addContact,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to use the chat context
export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
