import { useState, useCallback, useRef } from 'react'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  reasoning?: string
  timestamp: number
}

const STORAGE_KEY = 'rights_shield_chat'
const API_URL = '/api/chat'
const MODEL = 'deepseek-ai/DeepSeek-V3.2'

const SYSTEM_PROMPT = `你是"权盾 AI 法律助手"，专注中国汽车消费者权益保护。直接回答用户问题，不要输出思考过程、分析步骤或格式说明。

职责：分析购车合同条款、引用相关法律法规、提供维权建议和投诉路径、评估风险等级。

回答风格：简洁专业，引用法条标注条款编号，给出可操作建议，用中文回答。超出汽车消费领域的问题礼貌引导回主题。`

function loadMessages(): Message[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function saveMessages(msgs: Message[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs)) } catch {}
}

export function useAIChat() {
  const [messages, setMessages] = useState<Message[]>(loadMessages)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', content: content.trim(), timestamp: Date.now() }
    const assistantMsg: Message = { id: `a-${Date.now()}`, role: 'assistant', content: '', timestamp: Date.now() }

    const updated = [...messages, userMsg, assistantMsg]
    setMessages(updated)
    saveMessages(updated)
    setIsLoading(true)
    setError(null)

    const controller = new AbortController()
    abortRef.current = controller

    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...updated.filter(m => m.content).map(m => ({ role: m.role, content: m.content })),
    ]
    apiMessages.pop()

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: MODEL, messages: apiMessages, stream: true, max_tokens: 2048, temperature: 0.7 }),
        signal: controller.signal,
      })

      if (!res.ok) throw new Error(`服务暂时不可用 (${res.status})`)
      const reader = res.body?.getReader()
      if (!reader) throw new Error('无法获取响应流')

      const decoder = new TextDecoder()
      let rawContent = ''
      let reasoningAccumulated = ''
      let inThinkTag = false

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        for (const line of chunk.split('\n')) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()
          if (data === '[DONE]') break
          try {
            const parsed = JSON.parse(data)
            const delta = parsed.choices?.[0]?.delta
            const contentDelta = delta?.content || ''
            const reasoningDelta = delta?.reasoning_content || ''
            let changed = false

            if (reasoningDelta) {
              reasoningAccumulated += reasoningDelta
              changed = true
            }

            if (contentDelta) {
              rawContent += contentDelta
              changed = true
            }

            if (changed) {
              let displayContent = rawContent
              let displayReasoning = reasoningAccumulated

              const thinkOpen = rawContent.indexOf('<think>')
              if (thinkOpen !== -1) {
                inThinkTag = true
                const thinkClose = rawContent.indexOf('</think>')
                if (thinkClose !== -1) {
                  displayReasoning = rawContent.slice(thinkOpen + 7, thinkClose).trim()
                  displayContent = (rawContent.slice(0, thinkOpen) + rawContent.slice(thinkClose + 8)).trim()
                  inThinkTag = false
                } else {
                  displayReasoning = rawContent.slice(thinkOpen + 7).trim()
                  displayContent = rawContent.slice(0, thinkOpen).trim()
                }
              }

              const finalContent = displayContent
              const finalReasoning = displayReasoning
              setMessages(prev => {
                const next = prev.map(m => m.id === assistantMsg.id
                  ? { ...m, content: finalContent, reasoning: finalReasoning || undefined }
                  : m
                )
                saveMessages(next)
                return next
              })
            }
          } catch {}
        }
      }
      void inThinkTag;
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        setIsLoading(false)
        return
      }
      const errMsg = err instanceof Error ? err.message : '网络连接出现问题'
      setError(errMsg)
      setMessages(prev => {
        const next = prev.filter(m => m.id !== assistantMsg.id)
        saveMessages(next)
        return next
      })
    } finally {
      abortRef.current = null
      setIsLoading(false)
    }
  }, [messages, isLoading])

  const stopGenerating = useCallback(() => {
    abortRef.current?.abort()
    abortRef.current = null
    setIsLoading(false)
  }, [])

  const retryLastMessage = useCallback(() => {
    if (messages.length === 0) return
    let lastUserIdx = -1
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'user') { lastUserIdx = i; break }
    }
    if (lastUserIdx === -1) return
    const content = messages[lastUserIdx].content
    const trimmed = messages.slice(0, lastUserIdx)
    setMessages(trimmed)
    saveMessages(trimmed)
    setError(null)
    setTimeout(() => sendMessage(content), 50)
  }, [messages, sendMessage])

  const clearHistory = useCallback(() => {
    setMessages([])
    saveMessages([])
    setError(null)
  }, [])

  return { messages, isLoading, error, sendMessage, stopGenerating, retryLastMessage, clearHistory }
}
