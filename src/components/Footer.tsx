import React from 'react';
import { Shield, Globe, Mail, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="about" className="relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Shield size={16} className="text-accent" />
              </div>
              <div>
                <span className="font-display text-sm font-semibold text-white">权盾</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 ml-2">RightsShield</span>
              </div>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-sm mb-6">
              基于 AI 技术的购车消费者权益保护平台。我们致力于让每一份购车合同都透明可信赖，
              让每一位车主都能平等、便捷地获取法律知识与维权支持。
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 transition-all">
                <Globe size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 transition-all">
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-white/30 mb-4">产品</h4>
            <ul className="space-y-2.5">
              {['购车合同扫描', '预售条款分析', 'AI 购车助手', '购车维权知识库'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/50 hover:text-white/80 transition-colors flex items-center gap-1">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-white/30 mb-4">法律资源</h4>
            <ul className="space-y-2.5">
              {[
                { name: '民法典', href: '#' },
                { name: '消费者权益保护法', href: '#' },
                { name: '汽车销售管理办法', href: '#' },
                { name: '12315 投诉平台', href: '#' },
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm text-white/50 hover:text-white/80 transition-colors flex items-center gap-1">
                    {item.name}
                    <ExternalLink size={10} className="opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © 2025 权盾 RightsShield. 仅供学术研究与消费者教育使用，不构成法律意见。
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors">隐私政策</a>
            <a href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors">使用条款</a>
            <a href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors">免责声明</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
