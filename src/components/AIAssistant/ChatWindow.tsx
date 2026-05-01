import React, { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw, AlertCircle, Shield, CircleStop, Plus, History, Minimize2 } from 'lucide-react';
import MessageBubble from './MessageBubble';
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

// 聊天对话框 - 深色科技风格
const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ESC 关闭
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  // 发送
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
    setError(null);

    // 模拟AI响应
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

  // 输入框快捷键
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

  // 导出为 Markdown
  const buildMarkdown = () => {
    const header = `# 权盾 RightsShield 对话记录\n\n`;
    const body = messages.map((m) => `## ${m.role === 'user' ? '用户' : '助手'}\n\n${m.content || ''}\n`).join('\n');
    return header + body;
  };
  
  const exportMarkdown = () => {
    const md = buildMarkdown();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const ts = new Date().toISOString().replace(/[:.]/g, '-');
    a.href = url;
    a.download = `rights-shield-chat-${ts}.md`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-50 flex flex-col w-full h-full md:w-[460px] lg:w-[520px] md:h-[600px] md:rounded-2xl bg-[#0a0a0a] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] border border-white/[0.08] overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="AI购车法律助手"
    >
      {/* 顶部栏 */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#0f0f0f] to-[#141414] border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          {/* Logo 图标 */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-[0_4px_15px_rgba(59,130,246,0.3)]">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">AI 购车法律助手</h3>
            <p className="text-xs text-white/40">随时守护您的购车权益</p>
          </div>
        </div>

        {/* 控制按钮组 */}
        <div className="flex items-center gap-2">
          {/* 新会话 */}
          <button
            onClick={() => { setMessages([]); setInput(''); setError(null); }}
            className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all duration-200 flex items-center justify-center group"
            title="新会话"
            aria-label="新会话"
          >
            <Plus className="h-4 w-4 text-white/60 group-hover:text-accent" />
          </button>

          {/* 最小化 */}
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all duration-200 flex items-center justify-center group"
            title="最小化"
            aria-label="最小化"
          >
            <Minimize2 className="h-4 w-4 text-white/60 group-hover:text-accent" />
          </button>

          {isLoading && (
            <button
              onClick={() => setIsLoading(false)}
              className="w-9 h-9 rounded-lg bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition-all duration-200 flex items-center justify-center"
              title="停止生成"
              aria-label="停止生成"
            >
              <CircleStop className="h-4 w-4 text-red-400" />
            </button>
          )}
        </div>
      </div>

      {/* 消息区 */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#050505]" aria-live="polite">
        {messages.length === 0 ? (
          // 欢迎界面
          <div className="h-full flex flex-col items-center justify-center text-center px-6">
            {/* 主图标 */}
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-[0_8px_30px_rgba(59,130,246,0.3)]">
                <span className="text-4xl">🛡️</span>
              </div>
              {/* 状态指示灯 */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-[#050505] flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-2">你好，我是 AI 购车法律助手</h3>
            <p className="text-sm text-white/50 mb-6 leading-relaxed max-w-xs">
              我可以帮您分析购车合同、识别定金陷阱、提供维权建议。
              遇到任何购车权益问题，随时问我。
            </p>
            
            {/* 快速提问 */}
            <QuickQuestions onSelect={handleQuickQuestion} disabled={isLoading} />
          </div>
        ) : (
          // 消息列表
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} onExportMarkdown={exportMarkdown} />
            ))}

            {/* 错误提示 */}
            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-500/10 rounded-xl border border-red-500/30">
                <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-red-300 mb-2">{error}</p>
                  <button onClick={() => setError(null)} className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300 font-medium">
                    <RefreshCw className="h-3 w-3" />
                    重试
                  </button>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* 输入区 */}
      <div className="p-4 bg-[#0a0a0a] border-t border-white/[0.08]">
        <div className="flex gap-3">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isLoading ? 'AI 正在思考...' : '请输入您的购车合同问题...'}
            disabled={isLoading}
            rows={1}
            className="flex-1 px-4 py-3 bg-white/5 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-none text-sm text-white placeholder-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            style={{ minHeight: '44px', maxHeight: '120px' }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = target.scrollHeight + 'px';
            }}
          />

          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="flex-shrink-0 w-11 h-11 bg-gradient-to-br from-primary to-blue-600 rounded-xl text-white shadow-[0_4px_15px_rgba(59,130,246,0.3)] transition-all duration-200 hover:shadow-[0_6px_20px_rgba(59,130,246,0.4)] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none flex items-center justify-center"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>

        <p className="hidden md:block text-xs text-white/30 mt-2 text-center">按 Enter 发送，Shift + Enter 换行</p>
      </div>
    </div>
  );
};

export default ChatWindow;
