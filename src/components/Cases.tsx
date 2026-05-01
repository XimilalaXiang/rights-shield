import React from 'react';

const Cases: React.FC = () => {
  const cases = [
    {
      title: '定金不可退纠纷',
      category: '定金陷阱',
      description: '消费者在4S店缴纳定金后，因个人原因无法购车，商家拒绝退还定金。通过法律分析，发现合同条款存在霸王条款嫌疑。',
      result: '成功维权，全额退还定金',
      color: '#d4553a',
    },
    {
      title: '预售车型配置变更',
      category: '预售条款',
      description: '消费者预订的新能源汽车，交付时发现配置与预售宣传不符。商家以"预售条款已说明"为由拒绝赔偿。',
      result: '协商解决，获得配置补偿',
      color: '#c9a227',
    },
    {
      title: '金融服务费争议',
      category: '隐形收费',
      description: '购车时被强制收取金融服务费，消费者认为该费用不合理且未提前告知。',
      result: '投诉成功，退还服务费',
      color: '#2a5a8c',
    },
    {
      title: '质量问题维权',
      category: '产品质量',
      description: '新车交付后发现存在质量问题，多次维修仍未解决。消费者要求退车，商家以各种理由拖延。',
      result: '法律介入，成功退车',
      color: '#747800',
    },
  ];

  return (
    <section id="cases" className="py-20 md:py-32 bg-[#1a3055]">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 border-2 border-[#f5f0e1] text-[#f5f0e1] text-sm font-bold tracking-wider mb-4">
            成功案例
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f5f0e1] mb-4">
            真实维权案例
          </h2>
          <p className="text-[#f5f0e1]/60 max-w-2xl mx-auto">
            以下是我们帮助消费者成功维权的真实案例，为您提供参考和借鉴
          </p>
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((caseItem, index) => (
            <div
              key={caseItem.title}
              className="bg-[#f5f0e1] border-2 border-[#1a3055] p-6 md:p-8 ue-animate-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Category Tag */}
              <span 
                className="inline-block px-3 py-1 text-xs font-bold tracking-wider mb-4"
                style={{ 
                  background: caseItem.color,
                  color: '#f5f0e1',
                }}
              >
                {caseItem.category}
              </span>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#1a3055] mb-3 tracking-wider">
                {caseItem.title}
              </h3>

              {/* Description */}
              <p className="text-[#1a3055]/70 leading-relaxed mb-4">
                {caseItem.description}
              </p>

              {/* Result */}
              <div className="flex items-center gap-2 pt-4 border-t-2 border-[#1a3055]/10">
                <svg className="w-5 h-5 text-[#d4553a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-bold text-[#1a3055]">
                  {caseItem.result}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#contact"
            className="ue-btn bg-[#d4553a] border-[#d4553a] text-[#f5f0e1] px-8 py-4"
          >
            咨询您的案例
          </a>
        </div>
      </div>
    </section>
  );
};

export default Cases;
