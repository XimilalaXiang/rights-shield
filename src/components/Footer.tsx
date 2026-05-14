import { Shield } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="about" className="py-16 px-4 border-t border-neutral-800/50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
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

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">功能</h4>
            <ul className="space-y-2.5">
              {['合同扫描', '风险评估', '法律咨询', '案例查询'].map(item => (
                <li key={item}>
                  <a href="#features" className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">关于</h4>
            <ul className="space-y-2.5">
              {['研究课题', '团队介绍', '使用指南', '联系我们'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
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
