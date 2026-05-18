import { Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

const aboutLinks = [
  { label: '研究课题', path: '/about/research' },
  { label: '团队介绍', path: '/about/team' },
  { label: '使用指南', path: '/about/usage' },
  { label: '联系我们', path: '/about/contact' },
]

const featureLinks = [
  { label: 'AI 咨询', path: '/chat' },
  { label: '案例库', path: '/cases' },
  { label: '维权指南', path: '/guide' },
  { label: '风险检测', path: '/quiz' },
]

export default function Footer() {
  return (
    <footer id="about" className="py-16 px-4 border-t border-neutral-800/50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <Shield className="w-5 h-5 text-white" />
              <span className="text-base font-bold text-white">权盾 RightsShield</span>
            </div>
            <p className="text-sm text-neutral-500 leading-relaxed max-w-md">
              专注于汽车消费领域的智能法律助手，利用 AI 技术帮助消费者识别合同陷阱、
              维护合法权益。服务于中山大学数字汽车预售模式消费者权益研究课题。
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">功能</h4>
            <ul className="space-y-2.5">
              {featureLinks.map(item => (
                <li key={item.path}>
                  <Link to={item.path} className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">关于</h4>
            <ul className="space-y-2.5">
              {aboutLinks.map(item => (
                <li key={item.path}>
                  <Link to={item.path} className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-600">
            © 2026 权盾 RightsShield · 中山大学法学院研究项目
          </p>
          <p className="text-xs text-neutral-600">
            仅供学术研究参考，不构成法律意见
          </p>
        </div>
      </div>
    </footer>
  )
}
