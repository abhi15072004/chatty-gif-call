
import React from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Volume2, Volume1, VolumeX } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface CallControlsProps {
  isVideoCall?: boolean;
}

const CallControls: React.FC<CallControlsProps> = ({ isVideoCall = false }) => {
  const [isMuted, setIsMuted] = React.useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = React.useState(true);
  const [volume, setVolume] = React.useState(50);

  const handleEndCall = () => {
    toast({
      title: "Call ended",
      description: "The call has been ended.",
    });
    // In a real implementation, we would handle ending the call here
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.target.value));
  };

  const VolumeIcon = volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2;

  return (
    <div className="glass-panel rounded-full p-2 flex items-center gap-3 shadow-lg animate-fade-in">
      <div className="relative group">
        <button
          onClick={() => setVolume(prevVolume => prevVolume === 0 ? 50 : 0)}
          className="icon-button"
          aria-label={volume === 0 ? "Unmute speaker" : "Mute speaker"}
        >
          <VolumeIcon className="w-6 h-6 text-foreground" />
        </button>
        
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 p-2 glass-panel rounded-lg hidden group-hover:block">
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full accent-primary"
          />
        </div>
      </div>
      
      <button
        onClick={() => setIsMuted(!isMuted)}
        className={`icon-button ${isMuted ? 'bg-destructive/10 text-destructive' : ''}`}
        aria-label={isMuted ? "Unmute microphone" : "Mute microphone"}
      >
        {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6 text-foreground" />}
      </button>
      
      {isVideoCall && (
        <button
          onClick={() => setIsVideoEnabled(!isVideoEnabled)}
          className={`icon-button ${!isVideoEnabled ? 'bg-destructive/10 text-destructive' : ''}`}
          aria-label={isVideoEnabled ? "Turn off camera" : "Turn on camera"}
        >
          {isVideoEnabled ? <Video className="w-6 h-6 text-foreground" /> : <VideoOff className="w-6 h-6" />}
        </button>
      )}
      
      <button
        onClick={handleEndCall}
        className="p-2 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
        aria-label="End call"
      >
        <PhoneOff className="w-6 h-6" />
      </button>
    </div>
  );
};

export default CallControls;
