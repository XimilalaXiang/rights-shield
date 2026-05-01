import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="about" className="bg-black text-white py-16 md:py-24 px-4 md:px-8 border-t-4 border-black relative overflow-hidden">
      {/* Memphis 装饰 */}
      <div className="absolute top-10 right-10 w-16 h-16 bg-[#ff6b6b] border-4 border-white/20 rounded-full opacity-30" />
      <div className="absolute bottom-20 left-10 w-12 h-12 bg-[#feca57] border-4 border-white/20 opacity-20 rotate-45" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <span className="font-black text-3xl md:text-4xl block mb-4">
              权盾
            </span>
            <p className="font-sans text-sm md:text-base text-gray-400 max-w-sm mb-6 leading-relaxed">
              基于 AI 技术的购车消费者权益保护平台。我们致力于让每一份购车合同都透明可信赖，
              让每一位车主都能平等、便捷地获取法律知识与维权支持。
            </p>
            <div className="flex gap-3">
              {['🌐', '📧'].map((icon, i) => (
                <div key={i} className="w-10 h-10 bg-white/10 border-2 border-white/30 flex items-center justify-center hover:bg-[#ff6b6b] hover:border-white transition-colors cursor-pointer">
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-black text-lg mb-4 text-[#feca57]">产品</h4>
            <ul className="space-y-3">
              {['购车合同扫描', '预售条款分析', 'AI 购车助手', '购车维权知识库'].map((item) => (
                <li key={item}>
                  <a href="#" className="font-sans text-sm text-gray-400 hover:text-white hover:pl-2 transition-all duration-200">
                    → {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-lg mb-4 text-[#48dbfb]">法律资源</h4>
            <ul className="space-y-3">
              {['民法典', '消费者权益保护法', '汽车销售管理办法', '12315 投诉平台'].map((item) => (
                <li key={item}>
                  <a href="#" className="font-sans text-sm text-gray-400 hover:text-white hover:pl-2 transition-all duration-200">
                    → {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 md:mt-24 pt-6 border-t-2 border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-sans text-xs text-gray-500">
            © 2025 权盾 RightsShield. 仅供学术研究与消费者教育使用，不构成法律意见。
          </p>
          <div className="flex items-center gap-6">
            {['隐私政策', '使用条款', '免责声明'].map((item) => (
              <a key={item} href="#" className="font-sans text-xs text-gray-500 hover:text-white transition-colors">
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
