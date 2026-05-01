import React from 'react';
import { Car, FileText, Shield, MessageSquare, BookOpen, Zap } from 'lucide-react';

const features = [
  {
    number: '01',
    icon: Car,
    title: '购车合同智能扫描',
    description: '上传购车合同、订单确认书、定金收据，AI 自动识别定金陷阱、不合理条款、霸王条款等潜在侵权内容。',
    color: '#ff6b6b',
  },
  {
    number: '02',
    icon: FileText,
    title: '预售条款合规分析',
    description: '基于《民法典》《消费者权益保护法》《汽车销售管理办法》，逐条分析购车预售合同条款的合法性。',
    color: '#feca57',
  },
  {
    number: '03',
    icon: Shield,
    title: '定金/订金风险预警',
    description: '对定金条款、退换货规则、交付时间、配置变更等高风险领域进行专项检测与风险等级评估。',
    color: '#48dbfb',
  },
  {
    number: '04',
    icon: MessageSquare,
    title: 'AI 购车法律顾问',
    description: '对话式 AI 助手，随时解答购车纠纷问题，提供维权路径建议和法律依据引用。',
    color: '#ff9ff3',
  },
  {
    number: '05',
    icon: BookOpen,
    title: '购车维权知识库',
    description: '涵盖常见购车合同类型、典型案例解读、维权流程指南等实用法律知识。',
    color: '#1dd1a1',
  },
  {
    number: '06',
    icon: Zap,
    title: '即时响应',
    description: '毫秒级分析速度，无需等待。支持批量合同扫描，高效省时。',
    color: '#5f27cd',
  },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-16 md:py-32 px-4 md:px-8 relative">
      {/* Memphis 装饰 */}
      <div className="absolute top-10 left-5 w-12 h-12 bg-[#feca57] border-4 border-black rounded-full opacity-60" />
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-[#ff9ff3] border-4 border-black opacity-40 rotate-45" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <div className="inline-block px-4 py-2 bg-[#ff6b6b] text-white font-black text-sm border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4">
            核心功能
          </div>
          <h2 className="font-black text-3xl md:text-5xl tracking-tight">
            全方位守护您的购车权益
          </h2>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="p-5 md:p-8 bg-white border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 flex items-center justify-center border-4 border-black"
                  style={{ background: feature.color }}
                >
                  <feature.icon size={18} />
                </div>
                <span className="font-black text-2xl text-black/10">{feature.number}</span>
              </div>
              <h3 className="font-black text-xl md:text-2xl tracking-tight mb-3">
                {feature.title}
              </h3>
              <p className="font-sans text-sm md:text-base text-gray-700 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
