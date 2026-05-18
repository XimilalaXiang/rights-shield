import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Send, ChevronDown } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

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

const API_URL = '/api/chat'
const MODEL = 'deepseek-ai/DeepSeek-V4-Flash'

const SYSTEM_PROMPT = `你是"权盾 AI 法律助手"，专注于中国汽车消费者权益保护领域。

你的职责：
1. 分析购车合同条款，识别霸王条款和侵权内容
2. 引用相关法律法规（消费者权益保护法、民法典、合同法等）
3. 提供维权建议和投诉路径
4. 评估条款风险等级

回答要求：
- 简洁专业，通俗易懂
- 引用具体法条时标注条款编号
- 给出可操作的建议
- 如果问题超出汽车消费领域，礼貌引导回主题
- 用中文回答`

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
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  const callAPI = useCallback(async (allMessages: Message[]) => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    const apiMessages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...allMessages.map(m => ({ role: m.role, content: m.content })),
    ]

    const assistantId = Date.now() + 1
    setMessages(prev => [...prev, {
      id: assistantId,
      role: 'assistant',
      content: '',
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    }])
    setIsTyping(true)

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: MODEL,
          messages: apiMessages,
          stream: true,
          max_tokens: 1024,
          temperature: 0.7,
        }),
        signal: controller.signal,
      })

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`)
      }

      const reader = res.body?.getReader()
      if (!reader) throw new Error('No reader')

      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()
          if (data === '[DONE]') break

          try {
            const parsed = JSON.parse(data)
            const delta = parsed.choices?.[0]?.delta?.content
            if (delta) {
              accumulated += delta
              const current = accumulated
              setMessages(prev => prev.map(m =>
                m.id === assistantId ? { ...m, content: current } : m
              ))
            }
          } catch {
            // skip parse errors
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return
      setMessages(prev => prev.map(m =>
        m.id === assistantId
          ? { ...m, content: '抱歉，网络连接出现问题，请稍后重试。' }
          : m
      ))
    } finally {
      setIsTyping(false)
    }
  }, [])

  const sendMessage = (text?: string) => {
    const content = text || input.trim()
    if (!content || isTyping) return

    const userMsg: Message = {
      id: Date.now(),
      role: 'user',
      content,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    }

    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')

    callAPI(newMessages.filter(m => m.id !== 1))
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
                    {msg.role === 'assistant' ? (
                      <div className="text-sm leading-relaxed prose-chat">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
                    )}
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
