import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="about" className="py-24 md:py-32 px-6 md:px-12 border-t border-[#1C1C1C]/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <span className="font-serif text-2xl md:text-3xl tracking-tight text-[#1C1C1C] block mb-4">
              权盾
            </span>
            <p className="font-sans text-sm leading-relaxed text-[#1C1C1C]/60 max-w-sm mb-6">
              基于 AI 技术的购车消费者权益保护平台。我们致力于让每一份购车合同都透明可信赖，
              让每一位车主都能平等、便捷地获取法律知识与维权支持。
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-[#1C1C1C]/40 mb-6">
              产品
            </h4>
            <ul className="space-y-3">
              {['购车合同扫描', '预售条款分析', 'AI 购车助手', '购车维权知识库'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover-underline font-sans text-sm text-[#1C1C1C]/60 hover:text-[#1C1C1C] transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-[#1C1C1C]/40 mb-6">
              法律资源
            </h4>
            <ul className="space-y-3">
              {['民法典', '消费者权益保护法', '汽车销售管理办法', '12315 投诉平台'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover-underline font-sans text-sm text-[#1C1C1C]/60 hover:text-[#1C1C1C] transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-24 md:mt-32 pt-8 border-t border-[#1C1C1C]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-sans text-xs text-[#1C1C1C]/40">
            © 2025 权盾 RightsShield. 仅供学术研究与消费者教育使用，不构成法律意见。
          </p>
          <div className="flex items-center gap-6">
            {['隐私政策', '使用条款', '免责声明'].map((item) => (
              <a key={item} href="#" className="font-sans text-xs text-[#1C1C1C]/40 hover:text-[#1C1C1C] transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
