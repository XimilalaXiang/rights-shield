import React from 'react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: '张女士',
    role: '比亚迪车主',
    content: '买比亚迪时差点没注意到定金不可退的条款，多亏权盾 AI 提前提醒，帮我避免了 5000 元损失。',
    rating: 5,
  },
  {
    name: '李先生',
    role: '特斯拉车主',
    content: '特斯拉购车合同密密麻麻看不懂，AI 帮我逐条分析，发现了三处不合理的格式条款，和销售协商后成功修改。',
    rating: 5,
  },
  {
    name: '王同学',
    role: '小鹏车主',
    content: '小鹏的预售合同里藏着不少坑，用权盾查了才知道商家违规了。按 AI 给的维权指南，一周就解决了。',
    rating: 5,
  },
  {
    name: '陈先生',
    role: '蔚来车主',
    content: '蔚来的购车合同里有很多模糊条款，AI 帮我明确了每一项的责任归属，提车过程中省了不少麻烦。',
    rating: 4,
  },
  {
    name: '刘女士',
    role: '理想车主',
    content: '理想汽车的定金条款不清晰，权盾 AI 帮我分析了法律风险，最终成功拿回了定金。',
    rating: 5,
  },
  {
    name: '赵先生',
    role: '吉利车主',
    content: '吉利4S店的购车合同里藏着金融服务费，AI 都给标出来了。现在签合同前都会先用权盾扫一遍。',
    rating: 5,
  },
];

const MarqueeRow: React.FC<{ items: typeof testimonials; reverse?: boolean }> = ({ items, reverse }) => (
  <div className="flex gap-4 overflow-hidden">
    <div className={`flex gap-4 ${reverse ? 'marquee-reverse' : 'marquee'}`}>
      {[...items, ...items].map((t, i) => (
        <div
          key={i}
          className="flex-shrink-0 w-80 glass-card rounded-xl p-5 border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-300"
        >
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: t.rating }).map((_, j) => (
              <Star key={j} size={12} className="fill-amber-400 text-amber-400" />
            ))}
          </div>
          <Quote size={16} className="text-primary/40 mb-2" />
          <p className="text-sm text-white/60 leading-relaxed mb-4 line-clamp-3">{t.content}</p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-blue-600/30 flex items-center justify-center text-xs font-bold text-white/80">
              {t.name[0]}
            </div>
            <div>
              <div className="text-sm font-medium text-white/80">{t.name}</div>
              <div className="text-xs text-white/40">{t.role}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Cases: React.FC = () => {
  const firstHalf = testimonials.slice(0, 3);
  const secondHalf = testimonials.slice(3);

  return (
    <section id="cases" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-20" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16 px-6">
          <span className="pill mb-4 inline-flex">用户故事</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-4 mb-4">
            已帮助数千车主守护购车权益
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            真实案例，真实反馈。每一次购车咨询，都是一份信任
          </p>
        </div>

        {/* Marquee */}
        <div className="space-y-4">
          <MarqueeRow items={firstHalf} />
          <MarqueeRow items={secondHalf} reverse />
        </div>
      </div>
    </section>
  );
};

export default Cases;
