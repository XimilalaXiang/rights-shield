import { useState, useCallback } from 'react'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  reasoning?: string
  timestamp: number
}

export interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: number
  updatedAt: number
}

const STORAGE_KEY = 'rights_shield_conversations'
const API_URL = '/api/chat'
const MODEL = 'deepseek-ai/DeepSeek-V3.2'

const SYSTEM_PROMPT = `你是"权盾 AI 法律助手"，专注中国汽车消费者权益保护。直接回答用户问题，不要输出思考过程、分析步骤或格式说明。

职责：分析购车合同条款、引用相关法律法规、提供维权建议和投诉路径、评估风险等级。

回答风格：简洁专业，引用法条标注条款编号，给出可操作建议，用中文回答。超出汽车消费领域的问题礼貌引导回主题。`

function loadConversations(): Conversation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function saveConversations(convs: Conversation[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(convs)) } catch {}
}

function generateTitle(content: string): string {
  return content.length > 20 ? content.slice(0, 20) + '...' : content
}

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>(loadConversations)
  const [activeId, setActiveId] = useState<string | null>(() => {
    const convs = loadConversations()
    return convs.length > 0 ? convs[0].id : null
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [abortController, setAbortController] = useState<AbortController | null>(null)

  const activeConversation = conversations.find(c => c.id === activeId) || null

  const persist = useCallback((convs: Conversation[]) => {
    setConversations(convs)
    saveConversations(convs)
  }, [])

  const createConversation = useCallback(() => {
    const newConv: Conversation = {
      id: `conv-${Date.now()}`,
      title: '新对话',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    const updated = [newConv, ...conversations]
    persist(updated)
    setActiveId(newConv.id)
    setError(null)
    return newConv.id
  }, [conversations, persist])

  const deleteConversation = useCallback((id: string) => {
    const updated = conversations.filter(c => c.id !== id)
    persist(updated)
    if (activeId === id) {
      setActiveId(updated.length > 0 ? updated[0].id : null)
    }
  }, [conversations, activeId, persist])

  const switchConversation = useCallback((id: string) => {
    setActiveId(id)
    setError(null)
  }, [])

  const renameConversation = useCallback((id: string, title: string) => {
    const updated = conversations.map(c => c.id === id ? { ...c, title } : c)
    persist(updated)
  }, [conversations, persist])

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return

    let targetId = activeId
    let convs = [...conversations]

    if (!targetId) {
      const newConv: Conversation = {
        id: `conv-${Date.now()}`,
        title: generateTitle(content),
        messages: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
      convs = [newConv, ...convs]
      targetId = newConv.id
      setActiveId(targetId)
    }

    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', content: content.trim(), timestamp: Date.now() }
    const assistantMsg: Message = { id: `a-${Date.now()}`, role: 'assistant', content: '', timestamp: Date.now() }

    convs = convs.map(c => {
      if (c.id !== targetId) return c
      const isFirstMessage = c.messages.length === 0
      return {
        ...c,
        title: isFirstMessage ? generateTitle(content) : c.title,
        messages: [...c.messages, userMsg, assistantMsg],
        updatedAt: Date.now(),
      }
    })
    persist(convs)
    setIsLoading(true)
    setError(null)

    const controller = new AbortController()
    setAbortController(controller)

    const conv = convs.find(c => c.id === targetId)!
    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conv.messages.filter(m => m.content).map(m => ({ role: m.role, content: m.content })),
    ]
    apiMessages.pop()

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: MODEL, messages: apiMessages, stream: true, max_tokens: 4096, temperature: 0.7 }),
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

              // Detect <think>...</think> tags in content
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
              setConversations(prev => {
                const next = prev.map(c => {
                  if (c.id !== targetId) return c
                  return {
                    ...c,
                    messages: c.messages.map(m => m.id === assistantMsg.id
                      ? { ...m, content: finalContent, reasoning: finalReasoning || undefined }
                      : m
                    ),
                    updatedAt: Date.now(),
                  }
                })
                saveConversations(next)
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
        setAbortController(null)
        return
      }
      const errMsg = err instanceof Error ? err.message : '网络连接出现问题'
      setError(errMsg)
      setConversations(prev => {
        const next = prev.map(c => {
          if (c.id !== targetId) return c
          return { ...c, messages: c.messages.filter(m => m.id !== assistantMsg.id) }
        })
        saveConversations(next)
        return next
      })
    } finally {
      setAbortController(null)
      setIsLoading(false)
    }
  }, [conversations, activeId, isLoading, persist])

  const stopGenerating = useCallback(() => {
    abortController?.abort()
    setAbortController(null)
    setIsLoading(false)
  }, [abortController])

  const retryLastMessage = useCallback(() => {
    if (!activeConversation || activeConversation.messages.length === 0) return
    const msgs = activeConversation.messages
    let lastUserIdx = -1
    for (let i = msgs.length - 1; i >= 0; i--) {
      if (msgs[i].role === 'user') { lastUserIdx = i; break }
    }
    if (lastUserIdx === -1) return
    const content = msgs[lastUserIdx].content
    const trimmed = msgs.slice(0, lastUserIdx)
    const updated = conversations.map(c => c.id === activeId ? { ...c, messages: trimmed } : c)
    persist(updated)
    setError(null)
    setTimeout(() => sendMessage(content), 50)
  }, [activeConversation, conversations, activeId, persist, sendMessage])

  const clearCurrentChat = useCallback(() => {
    if (!activeId) return
    const updated = conversations.map(c => c.id === activeId ? { ...c, messages: [], title: '新对话', updatedAt: Date.now() } : c)
    persist(updated)
    setError(null)
  }, [conversations, activeId, persist])

  return {
    conversations,
    activeId,
    activeConversation,
    isLoading,
    error,
    createConversation,
    deleteConversation,
    switchConversation,
    renameConversation,
    sendMessage,
    stopGenerating,
    retryLastMessage,
    clearCurrentChat,
  }
}
