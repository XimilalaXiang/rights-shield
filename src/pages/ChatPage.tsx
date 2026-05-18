import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Trash2, MessageSquare, Send, CircleStop, RefreshCw,
  Copy, Check, AlertCircle, Download, PanelLeftClose, PanelLeftOpen,
  ArrowLeft, Pencil, X, Paperclip, FileText
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useConversations, type Message, type Conversation } from '../hooks/useConversations'
import ThinkingBlock from '../components/ThinkingBlock'

const quickQuestions = [
  { label: '🔍 定金不退合法吗？', prompt: '购车定金不退合法吗？商家以各种理由拒绝退还定金，我该怎么办？' },
  { label: '📋 识别霸王条款', prompt: '如何识别购车合同中的霸王条款？有哪些常见的侵权条款形式？' },
  { label: '🛡️ 强制搭售保险', prompt: '4S店强制要求在店内购买保险才能提车，这合法吗？如何维权？' },
  { label: '⏰ 延迟交车维权', prompt: '合同约定了提车时间但商家一直延迟交车，我该如何维权？' },
  { label: '💰 加价提车', prompt: '4S店要求在指导价基础上加价才能提车，这是否违法？我该如何投诉？' },
  { label: '🔧 新车质量问题', prompt: '刚买的新车发现有质量问题，可以退换车吗？三包政策是怎么规定的？' },
]

function ChatBubble({ message, isStreaming = false }: { message: Message; isStreaming?: boolean }) {
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
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 group`}>
      <div className={`relative max-w-[75%] md:max-w-[65%] rounded-2xl px-5 py-3.5 ${
        isUser
          ? 'bg-white text-black rounded-br-md'
          : 'bg-neutral-900/80 text-neutral-200 border border-neutral-800 rounded-bl-md'
      }`}>
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
                        <code className="block p-3 bg-black/60 rounded-lg text-xs font-mono border border-neutral-700 overflow-x-auto whitespace-pre-wrap my-2">{children}</code>
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
                <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
          </>
        ) : (
          <div className="flex gap-1.5 py-1">
            <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}

        {!isUser && message.content && (
          <button
            onClick={handleCopy}
            className="absolute -bottom-3 right-2 w-7 h-7 rounded-lg bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
            title={copied ? '已复制' : '复制'}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-neutral-400" />}
          </button>
        )}
      </div>
    </div>
  )
}

function Sidebar({
  conversations, activeId, isOpen, onClose,
  onCreate, onSwitch, onDelete, onRename
}: {
  conversations: Conversation[]
  activeId: string | null
  isOpen: boolean
  onClose: () => void
  onCreate: () => void
  onSwitch: (id: string) => void
  onDelete: (id: string) => void
  onRename: (id: string, title: string) => void
}) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')

  const startEdit = (conv: Conversation) => {
    setEditingId(conv.id)
    setEditTitle(conv.title)
  }

  const confirmEdit = () => {
    if (editingId && editTitle.trim()) {
      onRename(editingId, editTitle.trim())
    }
    setEditingId(null)
  }

  return (
    <>
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black/60 z-40" onClick={onClose} />
      )}

      <aside className={`
        fixed md:relative inset-y-0 left-0 z-50
        w-72 bg-neutral-950 border-r border-neutral-800 flex flex-col
        transition-transform duration-200 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:hidden'}
      `}>
        <div className="p-3 border-b border-neutral-800">
          <button
            onClick={onCreate}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black font-medium text-sm hover:bg-neutral-200 transition-colors"
          >
            <Plus className="w-4 h-4" />
            新建对话
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {conversations.length === 0 ? (
            <div className="text-center text-neutral-600 text-xs mt-8 px-4">
              暂无对话，点击上方按钮开始
            </div>
          ) : (
            conversations.map(conv => (
              <div
                key={conv.id}
                className={`group flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                  activeId === conv.id ? 'bg-neutral-800' : 'hover:bg-neutral-900'
                }`}
                onClick={() => { onSwitch(conv.id); onClose() }}
              >
                <MessageSquare className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                {editingId === conv.id ? (
                  <input
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    onBlur={confirmEdit}
                    onKeyDown={e => { if (e.key === 'Enter') confirmEdit(); if (e.key === 'Escape') setEditingId(null) }}
                    className="flex-1 bg-transparent border border-neutral-600 rounded px-1.5 py-0.5 text-xs text-white outline-none"
                    autoFocus
                    onClick={e => e.stopPropagation()}
                  />
                ) : (
                  <span className="flex-1 text-sm text-neutral-300 truncate">{conv.title}</span>
                )}
                <div className="hidden group-hover:flex items-center gap-0.5">
                  <button
                    onClick={e => { e.stopPropagation(); startEdit(conv) }}
                    className="w-6 h-6 rounded-md hover:bg-neutral-700 flex items-center justify-center"
                  >
                    <Pencil className="w-3 h-3 text-neutral-500" />
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); onDelete(conv.id) }}
                    className="w-6 h-6 rounded-md hover:bg-red-500/20 flex items-center justify-center"
                  >
                    <Trash2 className="w-3 h-3 text-red-400" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-3 border-t border-neutral-800">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
        </div>
      </aside>
    </>
  )
}

export default function ChatPage() {
  const {
    conversations, activeId, activeConversation, isLoading, error,
    createConversation, deleteConversation, switchConversation,
    renameConversation, sendMessage, stopGenerating, retryLastMessage, clearCurrentChat
  } = useConversations()

  const [input, setInput] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [attachedFile, setAttachedFile] = useState<{ name: string; content: string } | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeConversation?.messages])

  const handleSend = () => {
    if ((!input.trim() && !attachedFile) || isLoading) return
    let messageContent = input.trim()
    if (attachedFile) {
      const filePrefix = `[附件: ${attachedFile.name}]\n\`\`\`\n${attachedFile.content}\n\`\`\`\n\n`
      messageContent = filePrefix + (messageContent || '请分析这份文件内容')
    }
    sendMessage(messageContent)
    setInput('')
    setAttachedFile(null)
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const validTypes = ['text/plain', 'text/markdown', 'text/csv', '']
    const validExtensions = ['.txt', '.md', '.csv', '.text']
    const ext = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!validTypes.includes(file.type) && !validExtensions.includes(ext)) {
      return
    }
    if (file.size > 100 * 1024) {
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) => {
      const content = ev.target?.result as string
      setAttachedFile({ name: file.name, content })
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const exportChat = () => {
    if (!activeConversation) return
    const header = `# ${activeConversation.title}\n\n`
    const body = activeConversation.messages
      .filter(m => m.content)
      .map(m => `## ${m.role === 'user' ? '用户' : '助手'}\n\n${m.content}\n`)
      .join('\n')
    const blob = new Blob([header + body], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${activeConversation.title}-${new Date().toISOString().slice(0, 10)}.md`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const messages = activeConversation?.messages || []

  return (
    <div className="h-screen flex bg-black text-white overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:flex">
        <Sidebar
          conversations={conversations}
          activeId={activeId}
          isOpen={true}
          onClose={() => setSidebarOpen(false)}
          onCreate={createConversation}
          onSwitch={switchConversation}
          onDelete={deleteConversation}
          onRename={renameConversation}
        />
      </div>

      {/* Mobile sidebar */}
      <Sidebar
        conversations={conversations}
        activeId={activeId}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onCreate={createConversation}
        onSwitch={switchConversation}
        onDelete={deleteConversation}
        onRename={renameConversation}
      />

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-neutral-800 bg-black/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden w-9 h-9 rounded-lg hover:bg-neutral-800 flex items-center justify-center"
            >
              {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-black" />
              </div>
              <div>
                <h1 className="text-sm font-semibold">
                  {activeConversation?.title || '权盾 AI 助手'}
                </h1>
                <p className="text-[11px] text-neutral-500">DeepSeek-V3.2 · 汽车消费权益</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {messages.length > 0 && (
              <>
                <button onClick={exportChat} className="w-8 h-8 rounded-lg hover:bg-neutral-800 flex items-center justify-center" title="导出对话">
                  <Download className="w-4 h-4 text-neutral-400" />
                </button>
                <button onClick={clearCurrentChat} className="w-8 h-8 rounded-lg hover:bg-neutral-800 flex items-center justify-center" title="清空当前对话">
                  <Trash2 className="w-4 h-4 text-neutral-400" />
                </button>
              </>
            )}
            {isLoading && (
              <button onClick={stopGenerating} className="w-8 h-8 rounded-lg bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center" title="停止生成">
                <CircleStop className="w-4 h-4 text-red-400" />
              </button>
            )}
            <Link to="/" className="md:hidden w-8 h-8 rounded-lg hover:bg-neutral-800 flex items-center justify-center" title="返回首页">
              <X className="w-4 h-4 text-neutral-400" />
            </Link>
          </div>
        </header>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center px-4">
              <div className="max-w-lg w-full text-center">
                <div className="w-20 h-20 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-9 h-9 text-neutral-500" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">权盾 AI 法律助手</h2>
                <p className="text-neutral-500 text-sm mb-8">
                  专注汽车消费权益保护。将购车合同条款发给我，帮您分析风险、识别霸王条款。
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {quickQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => { setInput(q.prompt); textareaRef.current?.focus() }}
                      className="text-left px-4 py-3 bg-neutral-900/80 text-neutral-300 rounded-xl border border-neutral-800 hover:border-neutral-600 hover:text-white transition-all text-sm"
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto px-4 py-6">
              <AnimatePresence initial={false}>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChatBubble
                      message={msg}
                      isStreaming={isLoading && msg.role === 'assistant' && idx === messages.length - 1}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {error && (
                <div className="flex items-start gap-3 p-4 bg-red-500/10 rounded-xl border border-red-500/20 mb-4 max-w-[75%]">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-red-300 mb-2">{error}</p>
                    <button onClick={retryLastMessage} className="inline-flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 font-medium">
                      <RefreshCw className="w-3.5 h-3.5" /> 重新生成
                    </button>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="border-t border-neutral-800 bg-black/80 backdrop-blur-sm px-4 py-4">
          <div className="max-w-3xl mx-auto">
            {attachedFile && (
              <div className="flex items-center gap-2 mb-2 px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl">
                <FileText className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                <span className="text-xs text-neutral-300 truncate flex-1">{attachedFile.name}</span>
                <span className="text-[10px] text-neutral-500">{(attachedFile.content.length / 1024).toFixed(1)}KB</span>
                <button onClick={() => setAttachedFile(null)} className="w-5 h-5 rounded hover:bg-neutral-700 flex items-center justify-center">
                  <X className="w-3 h-3 text-neutral-500" />
                </button>
              </div>
            )}
            <div className="flex gap-2 items-end bg-neutral-900 border border-neutral-800 rounded-2xl px-4 py-3 focus-within:border-neutral-600 transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.md,.csv,.text,text/plain,text/markdown"
                className="hidden"
                onChange={handleFileSelect}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className="flex-shrink-0 w-9 h-9 rounded-xl hover:bg-neutral-800 flex items-center justify-center transition-colors disabled:opacity-30"
                title="上传文件 (txt/md/csv, 最大100KB)"
              >
                <Paperclip className="w-4 h-4 text-neutral-400" />
              </button>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isLoading ? 'AI 正在思考...' : '输入您的法律问题，或上传合同文件...'}
                disabled={isLoading}
                rows={1}
                className="flex-1 bg-transparent text-white text-sm placeholder-neutral-600 outline-none resize-none"
                style={{ minHeight: '24px', maxHeight: '150px' }}
                onInput={e => {
                  const t = e.target as HTMLTextAreaElement
                  t.style.height = 'auto'
                  t.style.height = t.scrollHeight + 'px'
                }}
              />
              <button
                onClick={handleSend}
                disabled={(!input.trim() && !attachedFile) || isLoading}
                className="flex-shrink-0 w-9 h-9 bg-white text-black rounded-xl flex items-center justify-center hover:bg-neutral-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-neutral-600 mt-2 text-center">
              Enter 发送 · Shift+Enter 换行 · 支持上传 txt/md/csv 文件
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
