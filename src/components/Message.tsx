
import React from 'react';
import { Message as MessageType } from '@/context/ChatContext';

interface MessageProps {
  message: MessageType;
  isMine: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isMine }) => {
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const renderMessageContent = () => {
    switch (message.type) {
      case 'text':
        return <p>{message.text}</p>;
      case 'emoji':
        return <p className="text-2xl">{message.text}</p>;
      case 'gif':
        return (
          <div className="rounded-lg overflow-hidden">
            <img src={message.url} alt="GIF" className="max-w-full" />
            {message.text && <p className="mt-2">{message.text}</p>}
          </div>
        );
      case 'image':
        return (
          <div className="rounded-lg overflow-hidden">
            <img src={message.url} alt="Image" className="max-w-full" />
            {message.text && <p className="mt-2">{message.text}</p>}
          </div>
        );
      default:
        return <p>{message.text}</p>;
    }
  };

  return (
    <div className={`flex mb-4 ${isMine ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div className={isMine ? 'message-sender' : 'message-receiver'}>
        {renderMessageContent()}
        <div className={`text-xs mt-1 ${isMine ? 'text-primary-foreground/70' : 'text-secondary-foreground/70'} text-right`}>
          {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default Message;
