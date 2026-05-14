import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Send, ChevronDown } from 'lucide-react'

interface AIChatProps {
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
}

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  time: string
}

const quickQuestions = [
  '定金不退合法吗？',
  '如何识别霸王条款？',
  '被强制搭售保险怎么办？',
  '提车时间延迟如何维权？',
]

export default function AIChat({ isOpen, onToggle, onClose }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: '您好！我是权盾 AI 法律助手，专注于汽车消费权益保护。您可以将购车合同中的条款发给我，我会帮您分析是否存在侵权风险。',
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  const sendMessage = (text?: string) => {
    const content = text || input.trim()
    if (!content) return

    const userMsg: Message = {
      id: Date.now(),
      role: 'user',
      content,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const responses: Record<string, string> = {
        '定金不退合法吗？': '根据《民法典》第五百八十七条：收受定金的一方不履行债务或者履行债务不符合约定，致使不能实现合同目的的，应当双倍返还定金。\n\n⚠️ 关键点：如果是因为商家原因（如车辆质量问题、无法按时交车等）导致交易无法完成，定金必须退还，甚至需要双倍返还。\n\n💡 建议：保留好定金收据和沟通记录。',
        '如何识别霸王条款？': '常见霸王条款特征：\n\n1️⃣ "最终解释权归本店所有" — 无效\n2️⃣ "定金一律不退" — 违反民法典\n3️⃣ "必须在本店购买保险" — 侵犯选择权\n4️⃣ "逾期提车不承担违约责任" — 不合理免责\n\n📋 法律依据：《消费者权益保护法》第二十六条明确规定，经营者不得以格式条款排除消费者权利。',
        '被强制搭售保险怎么办？': '强制搭售保险属于违法行为：\n\n⚖️ 《消费者权益保护法》第九条：消费者有自主选择权\n⚖️ 《反不正当竞争法》第十二条：不得强制搭售\n\n🔧 维权步骤：\n1. 拒绝购买并保留证据\n2. 向 12315 投诉\n3. 向银保监会举报（保险问题）\n4. 必要时提起诉讼',
        '提车时间延迟如何维权？': '延迟交车维权指南：\n\n📝 首先检查合同中的交车时间条款是否明确\n⏰ 如果超过约定时间：\n- 发送书面催告函\n- 要求支付违约金\n- 超过 30 天可解除合同\n\n💰 赔偿标准：\n- 合同有约定：按约定执行\n- 无约定：可主张实际损失\n\n🔍 保留好合同、付款凭证、沟通记录',
      }

      const assistantMsg: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: responses[content] || `感谢您的咨询。关于"${content}"的问题：\n\n根据《消费者权益保护法》和《民法典》相关规定，建议您：\n\n1. 仔细审查合同条款\n2. 保留相关证据\n3. 必要时寻求专业律师帮助\n\n如需更详细的分析，请将具体合同条款发给我。`,
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages(prev => [...prev, assistantMsg])
      setIsTyping(false)
    }, 800)
  }

  return (
    <>
      {/* FAB */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={onToggle}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-white text-black rounded-full shadow-2xl flex items-center justify-center hover:bg-neutral-200 transition-colors"
          >
            <MessageSquare className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[560px] max-h-[calc(100vh-96px)] bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800 bg-black/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-black" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">权盾 AI 助手</h3>
                  <p className="text-xs text-neutral-500">汽车消费权益保护</p>
                </div>
              </div>
              <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      msg.role === 'user'
                        ? 'bg-white text-black rounded-br-md'
                        : 'bg-neutral-900 text-neutral-200 border border-neutral-800 rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
                    <p className={`text-[10px] mt-1.5 ${msg.role === 'user' ? 'text-neutral-500' : 'text-neutral-600'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-neutral-900 border border-neutral-800 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-3 py-1.5 bg-neutral-900 text-neutral-400 rounded-full border border-neutral-800 hover:border-neutral-600 hover:text-white transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-neutral-800">
              <form
                onSubmit={e => { e.preventDefault(); sendMessage() }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="输入您的问题..."
                  className="flex-1 bg-neutral-900 border border-neutral-800 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-neutral-600 placeholder-neutral-600 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center hover:bg-neutral-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
