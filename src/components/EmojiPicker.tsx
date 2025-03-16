
import React, { useState, useRef, useEffect } from 'react';
import { Smile } from 'lucide-react';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

const EMOJI_CATEGORIES = [
  {
    name: 'Smileys & Emotion',
    emojis: ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '🥰', '😍', '😘', '🙂', '🙃', '😇']
  },
  {
    name: 'People & Body',
    emojis: ['👍', '👎', '👌', '🤞', '✌️', '🤘', '👋', '🤚', '🖐️', '✋', '👏', '🙌', '👐', '🤲', '🙏', '💪', '👨', '👩']
  },
  {
    name: 'Animals & Nature',
    emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦']
  },
  {
    name: 'Food & Drink',
    emojis: ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆']
  },
  {
    name: 'Activities',
    emojis: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🥊', '🥋', '⛳', '⛸️', '🎣', '🤿']
  },
  {
    name: 'Travel & Places',
    emojis: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🛻', '🚚', '🚛', '🚜', '🛴', '🚲', '🛵', '🏍️']
  },
  {
    name: 'Objects',
    emojis: ['⌚', '📱', '💻', '⌨️', '🖥️', '🖨️', '💾', '💿', '📀', '📷', '📸', '📹', '🎥', '📽️', '🎞️', '📞', '☎️', '📟']
  },
  {
    name: 'Symbols',
    emojis: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝']
  }
];

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEmojiClick = (emoji: string) => {
    onEmojiSelect(emoji);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={pickerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="icon-button group"
        aria-label="Open emoji picker"
      >
        <Smile className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
      </button>

      {isOpen && (
        <div className="absolute bottom-12 right-0 glass-panel rounded-xl shadow-lg w-72 h-80 overflow-hidden animate-scale-in z-10">
          <div className="flex border-b border-border">
            {EMOJI_CATEGORIES.map((category, index) => (
              <button
                key={index}
                className={`p-2 text-xs flex-1 transition-colors ${
                  activeCategory === index ? 'bg-secondary text-foreground' : 'text-muted-foreground'
                }`}
                onClick={() => setActiveCategory(index)}
              >
                {category.emojis[0]}
              </button>
            ))}
          </div>
          
          <div className="p-2 h-[calc(100%-40px)] overflow-y-auto">
            <h3 className="text-xs text-muted-foreground mb-2">{EMOJI_CATEGORIES[activeCategory].name}</h3>
            <div className="grid grid-cols-7 gap-1">
              {EMOJI_CATEGORIES[activeCategory].emojis.map((emoji, index) => (
                <button
                  key={index}
                  className="p-1.5 text-xl hover:bg-secondary rounded transition-colors"
                  onClick={() => handleEmojiClick(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;
