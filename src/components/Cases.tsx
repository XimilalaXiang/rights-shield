import React from 'react';

const testimonials = [
  {
    name: '张女士',
    role: '比亚迪车主',
    content: '买比亚迪时差点没注意到定金不可退的条款，多亏权盾 AI 提前提醒，帮我避免了 5000 元损失。',
    color: '#ff6b6b',
  },
  {
    name: '李先生',
    role: '特斯拉车主',
    content: '特斯拉购车合同密密麻麻看不懂，AI 帮我逐条分析，发现了三处不合理的格式条款，和销售协商后成功修改。',
    color: '#feca57',
  },
  {
    name: '王同学',
    role: '小鹏车主',
    content: '小鹏的预售合同里藏着不少坑，用权盾查了才知道商家违规了。按 AI 给的维权指南，一周就解决了。',
    color: '#48dbfb',
  },
  {
    name: '陈先生',
    role: '蔚来车主',
    content: '蔚来的购车合同里有很多模糊条款，AI 帮我明确了每一项的责任归属，提车过程中省了不少麻烦。',
    color: '#ff9ff3',
  },
  {
    name: '刘女士',
    role: '理想车主',
    content: '理想汽车的定金条款不清晰，权盾 AI 帮我分析了法律风险，最终成功拿回了定金。',
    color: '#1dd1a1',
  },
  {
    name: '赵先生',
    role: '吉利车主',
    content: '吉利4S店的购车合同里藏着金融服务费，AI 都给标出来了。现在签合同前都会先用权盾扫一遍。',
    color: '#5f27cd',
  },
];

const Cases: React.FC = () => {
  return (
    <section id="cases" className="py-16 md:py-32 px-4 md:px-8 bg-[#feca57] border-t-4 border-b-4 border-black relative overflow-hidden">
      {/* Memphis 装饰 */}
      <div className="absolute top-5 right-10 w-20 h-20 border-4 border-black rounded-full opacity-20" />
      <div className="absolute bottom-10 left-5 w-0 h-0 border-l-[30px] border-l-transparent border-b-[50px] border-b-[#ff6b6b] border-r-[30px] border-r-transparent opacity-40" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <div className="inline-block px-4 py-2 bg-black text-white font-black text-sm border-4 border-black shadow-[4px_4px_0px_0px_rgba(255,107,107,1)] mb-4">
            用户故事
          </div>
          <h2 className="font-black text-3xl md:text-5xl tracking-tight">
            已帮助数千车主守护购车权益
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="p-5 md:p-6 bg-white border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200"
            >
              <p className="font-sans text-sm md:text-base text-gray-700 leading-relaxed mb-4 border-b-2 border-dashed border-black/20 pb-4">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 flex items-center justify-center border-4 border-black font-black text-sm"
                  style={{ background: testimonial.color }}
                >
                  {testimonial.name[0]}
                </div>
                <div>
                  <div className="font-black text-sm">{testimonial.name}</div>
                  <div className="font-sans text-xs text-gray-600">{testimonial.role}</div>
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
