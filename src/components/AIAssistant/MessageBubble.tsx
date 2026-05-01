import React from 'react';
import { Bot, User, Download } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
  onExportMarkdown?: () => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onExportMarkdown }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 mb-4 ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* 头像 */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
        isUser 
          ? 'bg-white/10 border border-white/10' 
          : 'bg-primary/20 border border-primary/30'
      }`}>
        {isUser ? (
          <User size={16} className="text-white/70" />
        ) : (
          <Bot size={16} className="text-accent" />
        )}
      </div>

      {/* 消息内容 */}
      <div className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
        isUser
          ? 'bg-primary/20 border border-primary/20 text-white'
          : 'bg-white/[0.04] border border-white/[0.06] text-white/80'
      }`}>
        <div className="whitespace-pre-wrap">
          {message.content.split('\n').map((line, j) => {
            if (line.startsWith('**') && line.endsWith('**')) {
              return <p key={j} className="font-semibold text-white mt-2 first:mt-0">{line.replace(/\*\*/g, '')}</p>;
            }
            if (line.startsWith('•') || line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.')) {
              return <p key={j} className="ml-2">{line}</p>;
            }
            if (line.startsWith('⚠️') || line.startsWith('💡')) {
              return <p key={j} className="mt-2 text-amber-400/90">{line}</p>;
            }
            return <p key={j}>{line}</p>;
          })}
        </div>
        
        {/* 时间戳和导出按钮 */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/[0.06]">
          <span className="text-[10px] text-white/30">
            {message.timestamp.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
          </span>
          {!isUser && onExportMarkdown && (
            <button
              onClick={onExportMarkdown}
              className="text-[10px] text-white/30 hover:text-white/50 transition-colors flex items-center gap-1"
            >
              <Download size={10} />
              导出
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
