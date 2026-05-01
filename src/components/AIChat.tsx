import React, { useState } from 'react';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: '感谢您的咨询。根据您描述的情况，我建议您首先保留相关证据，包括合同文本、付款凭证、沟通记录等。然后可以向消费者协会投诉或寻求法律援助。' 
      }]);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    handleSend();
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#d4553a] border-2 border-[#1a3055] shadow-[3px_3px_0px_#1a3055] flex items-center justify-center hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all z-50"
      >
        <svg className="w-6 h-6 text-[#f5f0e1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[380px] max-h-[600px] bg-[#f5f0e1] border-2 border-[#1a3055] shadow-[6px_6px_0px_#1a3055] flex flex-col z-50 ue-animate-in">
          {/* Header */}
          <div className="bg-[#1a3055] text-[#f5f0e1] p-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold tracking-wider">法律咨询助手</h3>
              <p className="text-xs text-[#f5f0e1]/60">购车权益守护 · 实时解答</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 border-2 border-[#f5f0e1]/30 flex items-center justify-center hover:border-[#d4553a] hover:text-[#d4553a] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[400px]">
            {/* Welcome Message */}
            {messages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#d4553a] border-2 border-[#1a3055] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#f5f0e1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="font-bold text-[#1a3055] mb-2">您好！我是AI法律助手</h4>
                <p className="text-sm text-[#1a3055]/60 mb-6">
                  我可以帮您分析购车合同条款、识别定金陷阱、提供维权建议。
                </p>
                <div className="space-y-2">
                  {quickQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleQuickQuestion(q)}
                      className="w-full text-left px-4 py-2 bg-[#1a3055]/5 border-2 border-[#1a3055]/10 text-sm text-[#1a3055] hover:border-[#d4553a] hover:bg-[#d4553a]/5 transition-all"
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
                  className={`max-w-[80%] p-3 ${
                    msg.role === 'user' 
                      ? 'bg-[#1a3055] text-[#f5f0e1] border-2 border-[#1a3055]' 
                      : 'bg-[#f5f0e1] text-[#1a3055] border-2 border-[#1a3055]'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t-2 border-[#1a3055]/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="输入您的问题..."
                className="flex-1 ue-input text-sm"
              />
              <button 
                onClick={handleSend}
                className="ue-btn ue-btn-vermilion px-4 py-2 text-sm"
              >
                发送
              </button>
            </div>
            <p className="text-xs text-[#1a3055]/40 mt-2 text-center">
              仅提供参考，不构成法律建议
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;
