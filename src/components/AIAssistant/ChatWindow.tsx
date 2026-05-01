import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Minimize2, Shield } from 'lucide-react';
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
        '定金不可退是否合法？': '根据《民法典》第五百八十七条，定金罚则规定：\n\n**给付定金的一方不履行债务的，无权请求返还定金**\n\n但以下情况可主张退还：\n1. 商家存在违约行为\n2. 定金超过合同标的额20%的部分\n3. 合同存在重大误解或显失公平\n4. 商家未尽到充分告知义务\n\n⚠️ **关键提示**：如果商家在缔约时未以显著方式提示"定金不可退"，可能构成缔约过失，消费者可主张赔偿信赖利益损失。',
        '商家拒绝交车怎么办？': '商家拒绝交车时，您可以按以下步骤维权：\n\n**第一步：确认拒绝理由**\n• 商家单方面违约\n• 配置变更导致无法交付\n• 价格变动拒绝履行\n\n**第二步：收集证据**\n• 保存购车合同、订单确认书\n• 保留聊天记录、电话录音\n• 保存付款凭证\n\n**第三步：维权渠道**\n1. 与商家协商 → 2. 厂家投诉 → 3. 12315热线 → 4. 法院起诉\n\n💡 建议先通过厂家400电话投诉，通常能快速解决。',
      };

      const defaultResponse = '感谢您的咨询！基于您的描述，我来分析一下：\n\n**初步判断**：\n您提到的情况涉及购车消费者权益保护的相关问题。根据《汽车销售管理办法》第十四条，经销商不得限定消费者户籍所在地。\n\n**建议**：\n1. 保留所有相关证据（购车合同、聊天记录、支付凭证）\n2. 与商家协商解决\n3. 如协商不成，可向12315投诉或联系厂家\n\n如需更详细的分析，请提供更多购车合同具体条款内容。';

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
    <div className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-50 flex flex-col w-full h-full md:w-[420px] lg:w-[480px] md:h-[600px] md:rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
      {/* 顶部栏 */}
      <div className="flex items-center justify-between px-5 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">法律咨询助手</h3>
            <p className="text-xs text-gray-500">购车权益守护 · 实时解答</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => { setMessages([]); setInput(''); }}
            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center text-gray-500 hover:text-gray-700"
            title="新会话"
          >
            <Minimize2 className="h-4 w-4" />
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center text-gray-500 hover:text-gray-700"
            title="关闭"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 消息区 */}
      <div className="flex-1 overflow-y-auto p-5 bg-white">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col">
            {/* 欢迎消息 */}
            <div className="mb-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-4 w-4 text-blue-600" />
                </div>
                <div className="bg-gray-50 rounded-xl rounded-tl-none px-4 py-3 max-w-[85%]">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    您好！我是购车权益法律助手 🛡️<br /><br />
                    我可以帮您：<br />
                    • 分析购车合同条款<br />
                    • 识别定金陷阱<br />
                    • 提供维权建议<br /><br />
                    请描述您的问题，或点击下方快捷提问。
                  </p>
                </div>
              </div>
            </div>

            {/* 快捷提问 */}
            <div className="mt-auto">
              <p className="text-xs text-gray-400 mb-3 font-medium">快捷提问</p>
              <QuickQuestions onSelect={handleQuickQuestion} disabled={isLoading} />
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 mb-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-4 w-4 text-blue-600" />
                  </div>
                )}
                <div className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white rounded-tr-none'
                    : 'bg-gray-50 text-gray-700 rounded-tl-none'
                }`}>
                  <div className="whitespace-pre-wrap">
                    {message.content.split('\n').map((line, j) => {
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return <p key={j} className="font-semibold mt-2 first:mt-0">{line.replace(/\*\*/g, '')}</p>;
                      }
                      if (line.startsWith('•') || /^\d+\./.test(line)) {
                        return <p key={j} className="ml-2">{line}</p>;
                      }
                      if (line.startsWith('⚠️') || line.startsWith('💡')) {
                        return <p key={j} className="mt-2 text-amber-600">{line}</p>;
                      }
                      return <p key={j}>{line}</p>;
                    })}
                  </div>
                  <p className="text-[10px] mt-2 opacity-60">
                    {message.timestamp.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-4 w-4 text-blue-600" />
                </div>
                <div className="bg-gray-50 rounded-xl rounded-tl-none px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* 输入区 */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isLoading ? 'AI 正在思考...' : '请输入您的问题或需求...'}
            disabled={isLoading}
            rows={1}
            className="flex-1 px-4 py-2.5 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm text-gray-700 placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            style={{ minHeight: '40px', maxHeight: '100px' }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = target.scrollHeight + 'px';
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="flex-shrink-0 px-4 py-2.5 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-300 text-white rounded-lg transition-colors disabled:cursor-not-allowed flex items-center gap-2 text-sm font-medium"
          >
            <Send className="h-4 w-4" />
            发送
          </button>
        </div>
        <p className="text-[11px] text-gray-400 mt-2 text-center">仅提供参考，不构成法律建议</p>
      </div>
    </div>
  );
};

export default ChatWindow;
