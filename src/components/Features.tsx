import React from 'react';
import { Car, FileText, Shield, MessageSquare, BookOpen, Zap } from 'lucide-react';

const features = [
  {
    number: '01',
    icon: Car,
    title: '购车合同智能扫描',
    description: '上传购车合同、订单确认书、定金收据，AI 自动识别定金陷阱、不合理条款、霸王条款等潜在侵权内容。',
  },
  {
    number: '02',
    icon: FileText,
    title: '预售条款合规分析',
    description: '基于《民法典》《消费者权益保护法》《汽车销售管理办法》，逐条分析购车预售合同条款的合法性。',
  },
  {
    number: '03',
    icon: Shield,
    title: '定金/订金风险预警',
    description: '对定金条款、退换货规则、交付时间、配置变更等高风险领域进行专项检测与风险等级评估。',
  },
  {
    number: '04',
    icon: MessageSquare,
    title: 'AI 购车法律顾问',
    description: '对话式 AI 助手，随时解答购车纠纷问题，提供维权路径建议和法律依据引用。',
  },
  {
    number: '05',
    icon: BookOpen,
    title: '购车维权知识库',
    description: '涵盖常见购车合同类型、典型案例解读、维权流程指南等实用法律知识。',
  },
  {
    number: '06',
    icon: Zap,
    title: '即时响应',
    description: '毫秒级分析速度，无需等待。支持批量合同扫描，高效省时。',
  },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 md:py-40 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16 md:mb-24">
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-[#1C1C1C]/40 block mb-4">
            核心功能
          </span>
          <h2 className="font-serif text-3xl md:text-5xl tracking-tight text-[#1C1C1C]">
            全方位守护您的购车权益
          </h2>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1C1C1C]/10">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="bg-[#F9F8F6] p-8 md:p-10 group hover:bg-[#1C1C1C] transition-colors duration-500"
            >
              <div className="flex items-start justify-between mb-6">
                <feature.icon size={20} className="text-[#1C1C1C]/40 group-hover:text-[#F9F8F6]/40 transition-colors duration-500" />
                <span className="font-sans text-xs text-[#1C1C1C]/20 group-hover:text-[#F9F8F6]/20 transition-colors duration-500">
                  {feature.number}
                </span>
              </div>
              <h3 className="font-serif text-xl md:text-2xl tracking-tight text-[#1C1C1C] group-hover:text-[#F9F8F6] mb-4 transition-colors duration-500">
                {feature.title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-[#1C1C1C]/60 group-hover:text-[#F9F8F6]/60 transition-colors duration-500">
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
