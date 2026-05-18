import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Send, ChevronDown, CircleStop, RefreshCw, Copy, Check, Trash2, Download, AlertCircle } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useAIChat, type Message } from '../hooks/useAIChat'
import ThinkingBlock from './ThinkingBlock'

interface AIChatProps {
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
}

const quickQuestions = [
  { label: '定金不退合法吗？', prompt: '购车定金不退合法吗？商家以各种理由拒绝退还定金，我该怎么办？' },
  { label: '识别霸王条款', prompt: '如何识别购车合同中的霸王条款？有哪些常见的侵权条款形式？' },
  { label: '强制搭售保险', prompt: '4S店强制要求在店内购买保险才能提车，这合法吗？如何维权？' },
  { label: '延迟交车维权', prompt: '合同约定了提车时间但商家一直延迟交车，我该如何维权？' },
]

function MessageBubble({ message, isStreaming = false }: { message: Message; isStreaming?: boolean }) {
  const [copied, setCopied] = useState(false)
  const isUser = message.role === 'user'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`relative max-w-[88%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-white text-black rounded-br-md'
            : 'bg-neutral-900 text-neutral-200 border border-neutral-800 rounded-bl-md'
        }`}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
        ) : message.content || message.reasoning ? (
          <>
            {message.reasoning && (
              <ThinkingBlock reasoning={message.reasoning} isStreaming={isStreaming && !message.content} />
            )}
            {message.content ? (
              <div className="text-sm leading-relaxed prose-chat break-words">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                    li: ({ children }) => <li className="text-sm">{children}</li>,
                    strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
                    code: ({ children, className }) => {
                      const isBlock = !!className
                      return isBlock ? (
                        <code className="block p-3 bg-black/50 rounded-lg text-xs font-mono border border-neutral-800 overflow-x-auto whitespace-pre-wrap">{children}</code>
                      ) : (
                        <code className="px-1.5 py-0.5 bg-white/10 rounded text-xs font-mono">{children}</code>
                      )
                    },
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-2 border-neutral-600 pl-3 my-2 text-neutral-400">{children}</blockquote>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-2"><table className="min-w-full border-collapse text-xs">{children}</table></div>
                    ),
                    th: ({ children }) => <th className="px-2 py-1.5 text-left font-semibold border-b border-neutral-700 text-white">{children}</th>,
                    td: ({ children }) => <td className="px-2 py-1.5 border-b border-neutral-800">{children}</td>,
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="flex gap-1.5 py-1 mt-1">
                <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
          </>
        ) : (
          <div className="flex gap-1.5 py-1">
            <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}

        {!isUser && message.content && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 w-6 h-6 rounded-md bg-white/5 hover:bg-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            title={copied ? '已复制' : '复制'}
          >
            {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 text-neutral-500" />}
          </button>
        )}

        <p className={`text-[10px] mt-1.5 ${isUser ? 'text-neutral-500' : 'text-neutral-600'}`}>
          {new Date(message.timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  )
}

export default function AIChat({ isOpen, onToggle, onClose }: AIChatProps) {
  const { messages, isLoading, error, sendMessage, stopGenerating, retryLastMessage, clearHistory } = useAIChat()
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen) textareaRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  const handleSend = () => {
    if (!input.trim() || isLoading) return
    sendMessage(input)
    setInput('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const exportMarkdown = () => {
    const header = `# 权盾 AI 对话记录\n\n`
    const body = messages.map(m => `## ${m.role === 'user' ? '用户' : '助手'}\n\n${m.content}\n`).join('\n')
    const blob = new Blob([header + body], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `权盾对话-${new Date().toISOString().slice(0, 10)}.md`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <>
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-50 w-full h-full md:w-[420px] md:h-[600px] md:max-h-[calc(100vh-48px)] bg-neutral-950 md:border md:border-neutral-800 md:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800 bg-black/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-black" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">权盾 AI 助手</h3>
                  <p className="text-xs text-neutral-500">汽车消费权益保护</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {messages.length > 0 && (
                  <>
                    <button onClick={exportMarkdown} className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center" title="导出对话">
                      <Download className="w-4 h-4 text-neutral-500" />
                    </button>
                    <button onClick={clearHistory} className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center" title="清空对话">
                      <Trash2 className="w-4 h-4 text-neutral-500" />
                    </button>
                  </>
                )}
                {isLoading && (
                  <button onClick={stopGenerating} className="w-8 h-8 rounded-lg bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center" title="停止生成">
                    <CircleStop className="w-4 h-4 text-red-400" />
                  </button>
                )}
                <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center">
                  <ChevronDown className="w-5 h-5 text-neutral-500" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <div className="w-16 h-16 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-center mb-4">
                    <MessageSquare className="w-7 h-7 text-neutral-500" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">权盾 AI 法律助手</h3>
                  <p className="text-sm text-neutral-500 mb-6 max-w-xs">
                    专注汽车消费权益保护。将购车合同条款发给我，帮您分析风险。
                  </p>
                  <div className="w-full grid grid-cols-2 gap-2">
                    {quickQuestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => { setInput(q.prompt); textareaRef.current?.focus() }}
                        className="text-left text-xs px-3 py-2.5 bg-neutral-900 text-neutral-400 rounded-xl border border-neutral-800 hover:border-neutral-600 hover:text-white transition-colors"
                      >
                        {q.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((msg, idx) => (
                    <div key={msg.id} className="group">
                      <MessageBubble
                        message={msg}
                        isStreaming={isLoading && msg.role === 'assistant' && idx === messages.length - 1}
                      />
                    </div>
                  ))}

                  {error && (
                    <div className="flex items-start gap-2 p-3 bg-red-500/10 rounded-xl border border-red-500/20 mb-3">
                      <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-red-300 mb-1.5">{error}</p>
                        <button onClick={retryLastMessage} className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300 font-medium">
                          <RefreshCw className="w-3 h-3" /> 重试
                        </button>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-neutral-800">
              <div className="flex gap-2 items-end">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={isLoading ? 'AI 正在思考...' : '输入您的问题...'}
                  disabled={isLoading}
                  rows={1}
                  className="flex-1 bg-neutral-900 border border-neutral-800 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-neutral-600 placeholder-neutral-600 transition-colors resize-none disabled:opacity-50"
                  style={{ minHeight: '42px', maxHeight: '120px' }}
                  onInput={e => {
                    const t = e.target as HTMLTextAreaElement
                    t.style.height = 'auto'
                    t.style.height = t.scrollHeight + 'px'
                  }}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="flex-shrink-0 w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center hover:bg-neutral-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="hidden md:block text-[10px] text-neutral-600 mt-1.5 text-center">Enter 发送 · Shift+Enter 换行 · ESC 关闭</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
