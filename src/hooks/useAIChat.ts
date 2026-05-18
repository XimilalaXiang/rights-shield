import { useState, useCallback, useRef } from 'react'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

const STORAGE_KEY = 'rights_shield_chat'
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
      let accumulated = ''

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
            const delta = parsed.choices?.[0]?.delta?.content
            if (delta) {
              accumulated += delta
              const current = accumulated
              setMessages(prev => {
                const next = prev.map(m => m.id === assistantMsg.id ? { ...m, content: current } : m)
                saveMessages(next)
                return next
              })
            }
          } catch {}
        }
      }
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
