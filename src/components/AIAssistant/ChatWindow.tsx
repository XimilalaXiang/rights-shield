import React, { useState, useRef, useEffect } from 'react';
import { X, MessageSquare } from 'lucide-react';
import QuickQuestions from './QuickQuestions';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatWindowProps {
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const responses: Record<string, string> = {
        '定金不可退是否合法？': '根据《民法典》第五百八十七条，定金罚则规定：\n\n**给付定金的一方不履行债务的，无权请求返还定金**\n\n但以下情况可主张退还：\n1. 商家存在违约行为\n2. 定金超过合同标的额20%的部分\n3. 合同存在重大误解或显失公平\n4. 商家未尽到充分告知义务',
        '商家拒绝交车怎么办？': '商家拒绝交车时，您可以按以下步骤维权：\n\n**第一步：确认拒绝理由**\n• 商家单方面违约\n• 配置变更导致无法交付\n• 价格变动拒绝履行\n\n**第二步：收集证据**\n• 保存购车合同、订单确认书\n• 保留聊天记录、电话录音\n• 保存付款凭证\n\n**第三步：维权渠道**\n1. 与商家协商 → 2. 厂家投诉 → 3. 12315热线 → 4. 法院起诉',
      };

      const defaultResponse = '感谢您的咨询！基于您的描述，我来分析一下：\n\n**初步判断**：\n您提到的情况涉及购车消费者权益保护的相关问题。根据《汽车销售管理办法》第十四条，经销商不得限定消费者户籍所在地。\n\n**建议**：\n1. 保留所有相关证据（购车合同、聊天记录、支付凭证）\n2. 与商家协商解决\n3. 如协商不成，可向12315投诉或联系厂家';

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[userMessage.content] || defaultResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickQuestion = (prompt: string) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  return (
    <div className="fixed bottom-0 right-0 md:bottom-8 md:right-8 z-50 flex flex-col w-full h-full md:w-[440px] lg:w-[500px] md:h-[600px] bg-[#fef9ef] border-l-4 border-t-4 md:border-4 border-black overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-[#ff6b6b] border-b-4 border-black">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white border-4 border-black flex items-center justify-center">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-black text-lg text-white">法律咨询助手</h3>
            <p className="font-sans text-xs text-white/80">购车权益守护 · 实时解答</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-8 h-8 bg-white border-4 border-black flex items-center justify-center hover:bg-[#feca57] transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col">
            {/* Welcome message */}
            <div className="mb-6">
              <div className="p-4 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <p className="font-sans text-sm leading-relaxed">
                  您好！我是购车权益法律助手 🛡️<br /><br />
                  我可以帮您：<br />
                  • 分析购车合同条款<br />
                  • 识别定金陷阱<br />
                  • 提供维权建议<br /><br />
                  请描述您的问题，或点击下方快捷提问。
                </p>
              </div>
            </div>

            {/* Quick questions */}
            <div className="mt-auto">
              <p className="font-black text-sm mb-3">快捷提问</p>
              <QuickQuestions onSelect={handleQuickQuestion} disabled={isLoading} />
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div key={message.id} className={`mb-4 ${message.role === 'user' ? 'flex justify-end' : ''}`}>
                {message.role === 'assistant' && (
                  <p className="font-black text-xs mb-1 text-[#ff6b6b]">法律助手</p>
                )}
                <div
                  className={`inline-block max-w-[85%] p-4 border-4 border-black ${
                    message.role === 'user'
                      ? 'bg-[#48dbfb] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                  }`}
                >
                  <div className="font-sans text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content.split('\n').map((line, j) => {
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return <p key={j} className="font-black mt-2 first:mt-0">{line.replace(/\*\*/g, '')}</p>;
                      }
                      if (line.startsWith('•') || /^\d+\./.test(line)) {
                        return <p key={j} className="ml-3">{line}</p>;
                      }
                      return <p key={j}>{line}</p>;
                    })}
                  </div>
                  <p className="font-sans text-[10px] opacity-50 mt-2">
                    {message.timestamp.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="mb-4">
                <p className="font-black text-xs mb-1 text-[#ff6b6b]">法律助手</p>
                <div className="inline-block p-4 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-[#ff6b6b] rounded-full animate-bounce" />
                    <div className="w-3 h-3 bg-[#feca57] rounded-full animate-bounce delay-100" />
                    <div className="w-3 h-3 bg-[#48dbfb] rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t-4 border-black">
        <div className="flex gap-3">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isLoading ? 'AI 正在思考...' : '请输入您的问题...'}
            disabled={isLoading}
            rows={1}
            className="flex-1 px-4 py-3 border-4 border-black font-sans text-sm resize-none focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            style={{ minHeight: '44px', maxHeight: '100px' }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = target.scrollHeight + 'px';
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="flex-shrink-0 px-5 py-3 bg-[#ff6b6b] text-white font-black text-sm border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            发送
          </button>
        </div>
        <p className="font-sans text-[11px] text-gray-500 mt-2 text-center">
          仅提供参考，不构成法律建议
        </p>
      </div>
    </div>
  );
};

export default ChatWindow;
