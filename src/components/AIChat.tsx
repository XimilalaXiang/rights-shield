import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Car, Scale, AlertTriangle } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const quickPrompts = [
  { icon: Car, text: '分析这段购车合同条款是否合规' },
  { icon: Scale, text: '定金不可退是否合法？' },
  { icon: AlertTriangle, text: '商家拒绝交车怎么办？' },
];

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '您好！我是权盾 AI 购车法律助手 🛡️\n\n我可以帮您：\n• 分析购车合同条款是否合规\n• 识别购车定金陷阱和霸王条款\n• 提供购车维权建议和法律依据\n\n请描述您的购车问题，或上传购车合同开始分析。',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const message = text || input.trim();
    if (!message || isTyping) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: message, timestamp: new Date() }]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        '定金不可退是否合法？': '根据《民法典》第五百八十七条，定金罚则规定：\n\n**给付定金的一方不履行债务的，无权请求返还定金**\n\n但以下情况可主张退还：\n1. 商家存在违约行为\n2. 定金超过合同标的额20%的部分\n3. 合同存在重大误解或显失公平\n4. 商家未尽到充分告知义务\n\n⚠️ **关键提示**：如果商家在缔约时未以显著方式提示"定金不可退"，可能构成缔约过失，消费者可主张赔偿信赖利益损失。',
        '商家拒绝交车怎么办？': '商家拒绝交车时，您可以按以下步骤维权：\n\n**第一步：确认拒绝理由**\n• 商家单方面违约\n• 配置变更导致无法交付\n• 价格变动拒绝履行\n\n**第二步：收集证据**\n• 保存购车合同、订单确认书\n• 保留聊天记录、电话录音\n• 保存付款凭证\n\n**第三步：维权渠道**\n1. 与商家协商 → 2. 厂家投诉 → 3. 12315热线 → 4. 法院起诉\n\n💡 建议先通过厂家400电话投诉，通常能快速解决。',
      };

      const defaultResponse = '感谢您的咨询！基于您的描述，我来分析一下：\n\n**初步判断**：\n您提到的情况涉及购车消费者权益保护的相关问题。根据《汽车销售管理办法》第十四条，经销商不得限定消费者户籍所在地。\n\n**建议**：\n1. 保留所有相关证据（购车合同、聊天记录、支付凭证）\n2. 与商家协商解决\n3. 如协商不成，可向12315投诉或联系厂家\n\n如需更详细的分析，请提供更多购车合同具体条款内容。';

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: responses[message] || defaultResponse,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section id="ai-chat" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-20" />
      
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="pill mb-4 inline-flex">
            <Sparkles size={12} />
            AI 购车法律助手
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-4 mb-4">
            随时咨询，即时解答
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            基于海量购车纠纷数据训练的 AI 助手，为您提供专业的购车权益分析
          </p>
        </div>

        {/* Chat Container */}
        <div className="glass-card rounded-2xl overflow-hidden border border-white/[0.08]" style={{ boxShadow: '0 0 60px rgba(59, 130, 246, 0.08)' }}>
          {/* Messages */}
          <div className="h-[450px] overflow-y-auto p-6 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                  msg.role === 'assistant' 
                    ? 'bg-primary/20 border border-primary/30' 
                    : 'bg-white/10 border border-white/10'
                }`}>
                  {msg.role === 'assistant' ? (
                    <Bot size={16} className="text-accent" />
                  ) : (
                    <User size={16} className="text-white/70" />
                  )}
                </div>
                <div className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'assistant'
                    ? 'bg-white/[0.04] border border-white/[0.06] text-white/80'
                    : 'bg-primary/20 border border-primary/20 text-white'
                }`}>
                  <div className="whitespace-pre-wrap">
                    {msg.content.split('\n').map((line, j) => {
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
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <Bot size={16} className="text-accent" />
                </div>
                <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-accent/60 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-accent/60 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-accent/60 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompts */}
          <div className="px-6 py-3 border-t border-white/[0.04] flex gap-2 overflow-x-auto">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt.text)}
                className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] rounded-full text-xs text-white/50 hover:text-white/70 transition-all duration-200"
              >
                <prompt.icon size={12} />
                {prompt.text}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/[0.06]">
            <div className="flex gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="描述您的购车合同问题或消费纠纷..."
                className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 resize-none focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all"
                rows={1}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="flex-shrink-0 w-11 h-11 bg-primary hover:bg-primary-600 disabled:bg-white/[0.04] disabled:text-white/20 text-white rounded-xl flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIChat;
