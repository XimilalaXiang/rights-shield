interface Env {
  SILICONFLOW_API_KEY: string
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const apiKey = context.env.SILICONFLOW_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const body = await context.request.text()

  const res = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body,
  })

  return new Response(res.body, {
    status: res.status,
    headers: {
      'Content-Type': res.headers.get('Content-Type') || 'text/event-stream',
      'Cache-Control': 'no-cache',
    },
  })
}
