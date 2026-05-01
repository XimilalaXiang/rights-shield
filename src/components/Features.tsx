import React, { useRef } from 'react';
import { 
  Car, FileSearch, ShieldAlert, BookOpen, MessageSquare, Zap,
  type LucideIcon 
} from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  span?: string;
  gradient?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon: Icon, title, description, span = '', gradient = '' 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`feature-card glass-card glass-card-hover rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 ${span} group`}
    >
      <div className="relative z-10">
        <div className={`w-12 h-12 rounded-xl ${gradient || 'bg-primary/10'} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={22} className="text-accent" />
        </div>
        <h3 className="font-display text-lg font-semibold text-white mb-3">{title}</h3>
        <p className="text-sm text-white/50 leading-relaxed">{description}</p>
      </div>
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

const features: FeatureCardProps[] = [
  {
    icon: Car,
    title: '购车合同智能扫描',
    description: '上传购车合同、订单确认书、定金收据，AI 自动识别定金陷阱、不合理条款、霸王条款等潜在侵权内容。',
    span: 'md:col-span-2 md:row-span-2',
    gradient: 'bg-blue-500/10',
  },
  {
    icon: FileSearch,
    title: '预售条款合规分析',
    description: '基于《民法典》《消费者权益保护法》《汽车销售管理办法》，逐条分析购车预售合同条款的合法性。',
    gradient: 'bg-indigo-500/10',
  },
  {
    icon: ShieldAlert,
    title: '定金/订金风险预警',
    description: '对定金条款、退换货规则、交付时间、配置变更等高风险领域进行专项检测与风险等级评估。',
    gradient: 'bg-cyan-500/10',
  },
  {
    icon: MessageSquare,
    title: 'AI 购车法律顾问',
    description: '对话式 AI 助手，随时解答购车纠纷问题，提供维权路径建议和法律依据引用。',
    span: 'md:col-span-2',
    gradient: 'bg-violet-500/10',
  },
  {
    icon: BookOpen,
    title: '购车维权知识库',
    description: '涵盖常见购车合同类型、典型案例解读、维权流程指南等实用法律知识。',
    gradient: 'bg-emerald-500/10',
  },
  {
    icon: Zap,
    title: '即时响应',
    description: '毫秒级分析速度，无需等待。支持批量合同扫描，高效省时。',
    gradient: 'bg-amber-500/10',
  },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-30" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="pill mb-4 inline-flex">核心功能</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-4 mb-4">
            全方位守护您的购车权益
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            从购车合同扫描到维权建议，AI 全程陪伴，让每一份购车合同都透明可信赖
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={i} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
