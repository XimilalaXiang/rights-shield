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
      className="fixed bottom-8 right-8 z-50 group"
      aria-label="打开法律咨询助手"
    >
      <div className="w-14 h-14 md:w-16 md:h-16 border border-[#1C1C1C] bg-[#F9F8F6] flex items-center justify-center transition-all duration-300 group-hover:bg-[#1C1C1C] group-hover:text-[#F9F8F6]">
        <MessageSquare className="h-5 w-5 md:h-6 md:w-6 text-[#1C1C1C] group-hover:text-[#F9F8F6] transition-colors duration-300" />
        
        {hasUnread && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#1C1C1C] border-2 border-[#F9F8F6]" />
        )}
      </div>
    </button>
  );
};

export default FloatingButton;
