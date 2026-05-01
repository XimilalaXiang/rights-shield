import React from 'react';
import { MessageCircle } from 'lucide-react';

interface FloatingButtonProps {
  onClick: () => void;
  hasUnread?: boolean;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick, hasUnread = false }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="打开法律咨询助手"
    >
      {/* 外层发光效果 */}
      <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
      
      {/* 主按钮 */}
      <div className="relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105 group-active:scale-95">
        <MessageCircle className="h-6 w-6 md:h-7 md:w-7 text-white" />
        
        {/* 未读提示点 */}
        {hasUnread && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow animate-pulse" />
        )}
      </div>
    </button>
  );
};

export default FloatingButton;
