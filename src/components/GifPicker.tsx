
import React, { useState, useRef, useEffect } from 'react';
import { Image } from 'lucide-react';

interface GifPickerProps {
  onGifSelect: (url: string) => void;
}

// Mock GIF data for demonstration purposes
const MOCK_GIFS = [
  'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjRieTh0ZzVqb2Y3dnN5MDM4bjNrM2g5bXg0eHYzdzNrNWdpY3JiMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7abKhOpu0NwenH3O/giphy.gif',
  'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExemVoaXg5N2JmZngzaW5ycXY2Y2diZXdqdXkwNm1xaWlpNG5hemFvciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8TweEdaxxfuElKkRxz/giphy.gif',
  'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2kyanoyZ2R3YjFibngycDEzMGEzOGczMW4wODI2MjFqNmF5dThxNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BzyTuYCmvSORqs1ABM/giphy.gif',
  'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWs2Y2lyYWR1MmR3b2hwamJyOHVtZnR2Z2dhYmNjanlhMnF1bnlmMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QMHoU66sBXqqLqYvGO/giphy.gif',
  'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGVobHg3eTRvbDY4MWNkZWxzeHdkYzR4NnBxOWFqM3ZsYm5nZzQ0bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5xtDarEbygs3Pu7p3jO/giphy.gif',
  'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmY5YTNzeXZhejNid3N5eTU5emw0N2ZkMnN6aWJuamd0YnVtaHlteiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjHYibHwRL7mrNyo/giphy.gif',
  'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMW1ta2RlMW95bGM5cWhkOW9yMm90dG9ibHY3NGNtdTYzcGU5ZHM2eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dkGhBWE3SyzXW/giphy.gif',
  'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXczdGdmc2o0bmJudDVhaXoxY2J6czc3cWlnYnB6YWR2eHFtdWU0NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nXxOjZrbnbRxS/giphy.gif',
  'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTMxY3BtbXQ0Z3p0YnFjNmZ4MTd3Y2JlNWVjODNsZmJiNjB5czdyaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lqVVmTsxhKhRC/giphy.gif',
  'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWQzbDF1MGI1ZzU4Y2xoem41cnkxamg2eWs2OHplb3ZnMG9iNzRpdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3NtY188QaJfq0/giphy.gif',
  'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGNuaHpxb2NhaWZoMHUzcG1kZ3h5emRyeG9qajFqN2gxd3ZleDdrdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/G96zgMcLqSSYE/giphy.gif',
  'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWdscWJlMnNlemV2ajdpNXk3aTB5eWM1aGh1MWlrYzh1M2ZnNnNrZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kHmVOy84g8G6my09fu/giphy.gif'
];

const CATEGORIES = ['Trending', 'Reactions', 'Animals', 'Sports', 'Memes', 'TV & Movies'];

const GifPicker: React.FC<GifPickerProps> = ({ onGifSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
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

  const handleGifClick = (gifUrl: string) => {
    onGifSelect(gifUrl);
    setIsOpen(false);
  };

  // For a real implementation, we would filter GIFs based on search term and category
  // Here we're just using the mock data for demonstration
  const displayedGifs = MOCK_GIFS;

  return (
    <div className="relative" ref={pickerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="icon-button group"
        aria-label="Open GIF picker"
      >
        <Image className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
      </button>

      {isOpen && (
        <div className="absolute bottom-12 right-0 glass-panel rounded-xl shadow-lg w-80 h-96 overflow-hidden animate-scale-in z-10">
          <div className="p-3 border-b border-border">
            <input
              type="text"
              placeholder="Search GIFs..."
              className="w-full px-3 py-1.5 rounded-lg bg-secondary/50 text-foreground placeholder:text-muted-foreground outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="overflow-x-auto whitespace-nowrap p-2 border-b border-border">
            {CATEGORIES.map((category, index) => (
              <button
                key={index}
                className={`px-3 py-1 mr-2 rounded-full text-xs transition-colors ${
                  activeCategory === index 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                }`}
                onClick={() => setActiveCategory(index)}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="p-2 h-[calc(100%-104px)] overflow-y-auto">
            <div className="grid grid-cols-2 gap-2">
              {displayedGifs.map((gif, index) => (
                <button
                  key={index}
                  className="rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                  onClick={() => handleGifClick(gif)}
                >
                  <img src={gif} alt={`GIF ${index + 1}`} className="w-full h-24 object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GifPicker;
