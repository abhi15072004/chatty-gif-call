
import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, Video, ChevronLeft, MoreVertical } from 'lucide-react';
import Message from './Message';
import EmojiPicker from './EmojiPicker';
import GifPicker from './GifPicker';
import CallControls from './CallControls';
import { useChat } from '@/context/ChatContext';
import { toast } from '@/components/ui/use-toast';

const ChatInterface: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isCallActive, setIsCallActive] = useState(false);
  const [isVideoCall, setIsVideoCall] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { activeConversation, setActiveConversation, sendMessage } = useChat();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeConversation?.messages]);

  if (!activeConversation) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center animate-fade-in">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h2 className="text-xl font-medium mb-2">Select a conversation</h2>
        <p className="text-muted-foreground text-sm max-w-sm">
          Choose a contact from the left sidebar to start messaging or add a new contact.
        </p>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message, 'text');
      setMessage('');
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    sendMessage(emoji, 'emoji');
  };

  const handleGifSelect = (url: string) => {
    sendMessage('', 'gif', url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startCall = (video: boolean) => {
    setIsCallActive(true);
    setIsVideoCall(video);
    toast({
      title: video ? "Video call started" : "Voice call started",
      description: `Calling ${activeConversation.participants[0].name}...`,
    });
  };

  const endCall = () => {
    setIsCallActive(false);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-background animate-fade-in">
      {/* Chat header */}
      <div className="p-4 border-b flex items-center justify-between glass-panel z-10">
        <div className="flex items-center gap-3">
          <button 
            className="md:hidden icon-button"
            onClick={() => setActiveConversation(null)}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="relative">
            <img
              src={activeConversation.participants[0].avatar}
              alt={activeConversation.participants[0].name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-background ${
              activeConversation.participants[0].status === 'online' ? 'bg-green-500' : 
              activeConversation.participants[0].status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
            }`} />
          </div>
          
          <div>
            <h2 className="font-medium leading-tight">{activeConversation.participants[0].name}</h2>
            <p className="text-xs text-muted-foreground">
              {activeConversation.participants[0].status === 'online' 
                ? 'Online' 
                : activeConversation.participants[0].status === 'away'
                ? 'Away'
                : `Last seen ${activeConversation.participants[0].lastSeen}`}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <button 
            className="icon-button"
            onClick={() => startCall(false)}
            disabled={isCallActive}
          >
            <Phone className="w-5 h-5" />
          </button>
          
          <button 
            className="icon-button"
            onClick={() => startCall(true)}
            disabled={isCallActive}
          >
            <Video className="w-5 h-5" />
          </button>
          
          <button className="icon-button">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Call overlay */}
      {isCallActive && (
        <div className="absolute inset-0 z-20 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in">
          <div className="w-20 h-20 mb-4 relative">
            <img
              src={activeConversation.participants[0].avatar}
              alt={activeConversation.participants[0].name}
              className="w-full h-full rounded-full object-cover"
            />
            {isVideoCall && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full">
                <Video className="w-8 h-8 text-white animate-pulse-subtle" />
              </div>
            )}
          </div>
          
          <h2 className="text-xl font-medium mb-1">{activeConversation.participants[0].name}</h2>
          <p className="text-muted-foreground mb-8 animate-pulse-subtle">
            {isVideoCall ? 'Video call in progress...' : 'Voice call in progress...'}
          </p>
          
          <div className="relative mb-4">
            <div className="w-3 h-3 bg-primary rounded-full absolute -top-1 -left-1 animate-ping"></div>
            <div className="w-2 h-2 bg-primary rounded-full absolute -top-3 left-3 animate-ping" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full absolute -top-2 left-8 animate-ping" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="mt-8">
            <CallControls isVideoCall={isVideoCall} />
          </div>
          
          <button
            onClick={endCall}
            className="mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Return to chat
          </button>
        </div>
      )}
      
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeConversation.messages.length > 0 ? (
          activeConversation.messages.map((msg) => (
            <Message
              key={msg.id}
              message={msg}
              isMine={msg.senderId === 'me'}
            />
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-6">
            <p className="text-muted-foreground mb-2">No messages yet</p>
            <p className="text-sm text-muted-foreground">
              Send a message to start the conversation
            </p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input */}
      <div className="p-4 border-t glass-panel z-10">
        <div className="flex items-end gap-2">
          <div className="flex-1 bg-secondary/50 rounded-xl px-3 py-2 focus-within:bg-secondary transition-colors">
            <textarea
              placeholder="Type a message..."
              className="w-full bg-transparent outline-none resize-none text-foreground placeholder:text-muted-foreground min-h-[40px] max-h-[120px]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
          </div>
          
          <div className="flex items-center gap-1">
            <EmojiPicker onEmojiSelect={handleEmojiSelect} />
            <GifPicker onGifSelect={handleGifSelect} />
            
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className={`p-2 rounded-full ${
                message.trim() 
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                  : 'bg-secondary text-muted-foreground'
              } transition-all duration-200`}
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
