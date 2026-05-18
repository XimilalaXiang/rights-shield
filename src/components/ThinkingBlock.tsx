import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, ChevronDown } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ThinkingBlockProps {
  reasoning: string
  isStreaming?: boolean
}

export default function ThinkingBlock({ reasoning, isStreaming = false }: ThinkingBlockProps) {
  const [expanded, setExpanded] = useState(isStreaming)

  if (!reasoning) return null

  const lineCount = reasoning.split('\n').length
  const charCount = reasoning.length

  return (
    <div className="mb-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-800/60 border border-neutral-700/50 hover:bg-neutral-800 transition-colors text-xs text-neutral-400 group"
      >
        <Brain className={`w-3.5 h-3.5 ${isStreaming ? 'text-blue-400 animate-pulse' : 'text-neutral-500'}`} />
        <span className="font-medium">
          {isStreaming ? '思考中...' : '思考过程'}
        </span>
        {!isStreaming && (
          <span className="text-neutral-600">
            ({lineCount} 行 · {charCount > 1000 ? `${(charCount / 1000).toFixed(1)}k` : charCount} 字)
          </span>
        )}
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-2 px-3 py-2.5 rounded-xl bg-neutral-900/50 border border-neutral-800/50 max-h-64 overflow-y-auto">
              <div className="text-xs text-neutral-500 leading-relaxed prose-thinking break-words">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {reasoning}
                </ReactMarkdown>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
