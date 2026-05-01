import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="about" className="bg-black text-white py-16 md:py-20 border-t-4 border-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#ff006e] border-4 border-white flex items-center justify-center">
                <span className="text-white font-bold text-xl">权</span>
              </div>
              <span className="text-3xl font-bold tracking-wider uppercase">权盾</span>
            </div>
            <p className="text-white/60 leading-relaxed mb-6 max-w-md">
              基于AI技术的专业法律咨询平台，致力于守护消费者合法权益，
              让每一位车主都能安心购车。
            </p>
            <div className="flex gap-4">
              {/* Social Icons */}
              <a href="#" className="nb-btn nb-btn-outline px-3 py-2 text-sm">
                𝕏
              </a>
              <a href="#" className="nb-btn nb-btn-outline px-3 py-2 text-sm">
                ◆
              </a>
              <a href="#" className="nb-btn nb-btn-outline px-3 py-2 text-sm">
                ▣
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 tracking-wider uppercase">快速链接</h4>
            <ul className="space-y-3">
              {['首页', '功能', '案例', '关于'].map((item) => (
                <li key={item}>
                  <a href={`#${item}`} className="text-white/60 hover:text-[#ff006e] transition-colors font-bold uppercase">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4 tracking-wider uppercase">联系我们</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/60">
                <span className="text-xl">📧</span>
                contact@rights-shield.com
              </li>
              <li className="flex items-center gap-2 text-white/60">
                <span className="text-xl">📱</span>
                400-123-4567
              </li>
              <li className="flex items-center gap-2 text-white/60">
                <span className="text-xl">📍</span>
                广州市海珠区中山大学
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="nb-divider bg-white my-12" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm uppercase">
            © 2024 权盾 RightsShield. 保留所有权利.
          </p>
          <p className="text-white/40 text-sm uppercase">
            中山大学法学院 · 车企数字预售模式消费者权益研究项目
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
