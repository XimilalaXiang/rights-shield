import React from 'react';

const testimonials = [
  {
    name: '张女士',
    role: '比亚迪车主',
    content: '买比亚迪时差点没注意到定金不可退的条款，多亏权盾 AI 提前提醒，帮我避免了 5000 元损失。',
  },
  {
    name: '李先生',
    role: '特斯拉车主',
    content: '特斯拉购车合同密密麻麻看不懂，AI 帮我逐条分析，发现了三处不合理的格式条款，和销售协商后成功修改。',
  },
  {
    name: '王同学',
    role: '小鹏车主',
    content: '小鹏的预售合同里藏着不少坑，用权盾查了才知道商家违规了。按 AI 给的维权指南，一周就解决了。',
  },
  {
    name: '陈先生',
    role: '蔚来车主',
    content: '蔚来的购车合同里有很多模糊条款，AI 帮我明确了每一项的责任归属，提车过程中省了不少麻烦。',
  },
  {
    name: '刘女士',
    role: '理想车主',
    content: '理想汽车的定金条款不清晰，权盾 AI 帮我分析了法律风险，最终成功拿回了定金。',
  },
  {
    name: '赵先生',
    role: '吉利车主',
    content: '吉利4S店的购车合同里藏着金融服务费，AI 都给标出来了。现在签合同前都会先用权盾扫一遍。',
  },
];

const Cases: React.FC = () => {
  return (
    <section id="cases" className="py-24 md:py-40 px-6 md:px-12 border-t border-[#1C1C1C]/10">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16 md:mb-24">
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-[#1C1C1C]/40 block mb-4">
            用户故事
          </span>
          <h2 className="font-serif text-3xl md:text-5xl tracking-tight text-[#1C1C1C]">
            已帮助数千车主守护购车权益
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="group">
              <div className="border-b border-[#1C1C1C]/10 pb-8 mb-8">
                <p className="font-sans text-sm leading-relaxed text-[#1C1C1C]/60 mb-6">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-[#1C1C1C]/10 flex items-center justify-center">
                    <span className="font-serif text-sm text-[#1C1C1C]/40">
                      {testimonial.name[0]}
                    </span>
                  </div>
                  <div>
                    <div className="font-sans text-sm text-[#1C1C1C]">{testimonial.name}</div>
                    <div className="font-sans text-xs text-[#1C1C1C]/40">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cases;
