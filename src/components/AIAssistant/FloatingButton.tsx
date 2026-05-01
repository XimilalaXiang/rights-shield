import React from 'react';
import { MessageSquare } from 'lucide-react';

interface FloatingButtonProps {
  onClick: () => void;
  hasUnread?: boolean;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick, hasUnread = false }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 group"
      aria-label="打开法律咨询助手"
    >
      <div className="w-14 h-14 md:w-16 md:h-16 bg-[#ff6b6b] border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[3px] group-hover:translate-y-[3px] transition-all duration-200">
        <MessageSquare className="h-6 w-6 md:h-7 md:w-7 text-white" />
        
        {hasUnread && (
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#feca57] border-2 border-black flex items-center justify-center">
            <span className="text-[10px] font-black">!</span>
          </div>
        )}
      </div>
    </button>
  );
};

export default FloatingButton;
