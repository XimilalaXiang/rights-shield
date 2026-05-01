import React, { useState } from 'react';

interface AIChatProps {
  isOpen?: boolean;
  onToggle?: () => void;
  onClose?: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ isOpen = false, onToggle, onClose }) => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai'; text: string }>>([]);
  const [input, setInput] = useState('');

  const quickQuestions = [
    '分析这段购车合同条款是否合规',
    '定金不可退是否合法？',
    '商家拒绝交车怎么办？',
    '预售合同有哪些常见陷阱？',
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: '感谢您的咨询。根据您描述的情况，我建议您首先保留相关证据，包括合同文本、付款凭证、沟通记录等。然后可以向消费者协会投诉或寻求法律援助。' 
      }]);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#ff006e] border-4 border-black shadow-[8px_8px_0px_#000000] flex items-center justify-center hover:shadow-[12px_12px_0px_#ccff00] hover:bg-[#ccff00] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-none active:translate-x-[8px] active:translate-y-[8px] transition-all duration-150 z-50"
      >
        <span className="text-2xl text-white">💬</span>
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-28 right-6 w-[400px] max-h-[600px] bg-white border-4 border-black shadow-[12px_12px_0px_#ff006e] flex flex-col z-50 nb-animate-bounce">
          {/* Header */}
          <div className="bg-black text-white p-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold tracking-wider uppercase text-lg">法律咨询助手</h3>
              <p className="text-xs text-white/60">购车权益守护 · 实时解答</p>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 border-2 border-white flex items-center justify-center hover:bg-[#ff006e] transition-colors"
            >
              <span className="text-xl">✕</span>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[400px]">
            {/* Welcome Message */}
            {messages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-[#ccff00] border-4 border-black flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🛡️</span>
                </div>
                <h4 className="font-bold text-black mb-2 text-xl uppercase">您好！我是AI法律助手</h4>
                <p className="text-sm text-black/60 mb-6">
                  我可以帮您分析购车合同条款、识别定金陷阱、提供维权建议。
                </p>
                <div className="space-y-3">
                  {quickQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleQuickQuestion(q)}
                      className="w-full text-left px-4 py-3 bg-[#f0f0f0] border-2 border-black text-sm text-black hover:bg-[#ccff00] hover:shadow-[4px_4px_0px_#000000] transition-all duration-150"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Messages */}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] p-3 border-2 border-black ${
                    msg.role === 'user' 
                      ? 'bg-[#ff006e] text-white shadow-[4px_4px_0px_#000000]' 
                      : 'bg-[#ccff00] text-black shadow-[4px_4px_0px_#000000]'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t-4 border-black">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="输入您的问题..."
                className="flex-1 nb-input text-sm"
              />
              <button 
                onClick={handleSend}
                className="nb-btn nb-btn-primary px-4 py-2 text-sm"
              >
                发送
              </button>
            </div>
            <p className="text-xs text-black/40 mt-2 text-center uppercase">
              仅提供参考，不构成法律建议
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;
