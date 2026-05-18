import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Lock, LogIn, UserPlus } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    if (isLogin) {
      const { error } = await signIn(email, password)
      if (error) {
        setError(error)
      } else {
        navigate('/')
      }
    } else {
      const { error } = await signUp(email, password)
      if (error) {
        setError(error)
      } else {
        setSuccess('注册成功！请检查邮箱完成验证后登录。')
        setIsLogin(true)
      }
    }
    setLoading(false)
  }

  return (
    <div className="bg-black min-h-screen w-full pt-20 flex items-center justify-center px-4">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.02),transparent_60%)]" />
      </div>

      <div className="w-full max-w-sm relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </Link>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8">
          <h1 className="text-2xl font-bold text-white mb-2">
            {isLogin ? '登录' : '注册'}
          </h1>
          <p className="text-sm text-neutral-500 mb-8">
            {isLogin ? '登录后可云同步学习进度' : '创建账号开始学习之旅'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="email"
                required
                placeholder="邮箱地址"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="password"
                required
                minLength={6}
                placeholder="密码（至少6位）"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
            )}
            {success && (
              <p className="text-xs text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">{success}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : isLogin ? (
                <>
                  <LogIn className="w-4 h-4" /> 登录
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" /> 注册
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setIsLogin(!isLogin); setError(null); setSuccess(null) }}
              className="text-sm text-neutral-500 hover:text-white transition-colors"
            >
              {isLogin ? '没有账号？点击注册' : '已有账号？点击登录'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
