import React from 'react';

interface CasesProps {
  onOpenChat?: () => void;
}

const Cases: React.FC<CasesProps> = ({ onOpenChat }) => {
  const cases = [
    {
      title: '定金不可退纠纷',
      category: '定金陷阱',
      description: '消费者在4S店缴纳定金后，因个人原因无法购车，商家拒绝退还定金。通过法律分析，发现合同条款存在霸王条款嫌疑。',
      result: '成功维权，全额退还定金',
      color: '#ff006e',
    },
    {
      title: '预售车型配置变更',
      category: '预售条款',
      description: '消费者预订的新能源汽车，交付时发现配置与预售宣传不符。商家以"预售条款已说明"为由拒绝赔偿。',
      result: '协商解决，获得配置补偿',
      color: '#ccff00',
    },
    {
      title: '金融服务费争议',
      category: '隐形收费',
      description: '购车时被强制收取金融服务费，消费者认为该费用不合理且未提前告知。',
      result: '投诉成功，退还服务费',
      color: '#00d9ff',
    },
    {
      title: '质量问题维权',
      category: '产品质量',
      description: '新车交付后发现存在质量问题，多次维修仍未解决。消费者要求退车，商家以各种理由拖延。',
      result: '法律介入，成功退车',
      color: '#ff9500',
    },
  ];

  return (
    <section id="cases" className="py-20 md:py-32 bg-black">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="nb-badge nb-badge-pink mb-4">
            成功案例
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            真实维权案例
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            以下是我们帮助消费者成功维权的真实案例，为您提供参考和借鉴
          </p>
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((caseItem, index) => (
            <div
              key={caseItem.title}
              className="nb-card p-6 md:p-8 bg-white nb-animate-bounce"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Category Tag */}
              <div 
                className="nb-badge mb-4"
                style={{ 
                  background: caseItem.color,
                  color: caseItem.color === '#ccff00' ? '#000000' : '#ffffff',
                }}
              >
                {caseItem.category}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-black mb-3 uppercase">
                {caseItem.title}
              </h3>

              {/* Description */}
              <p className="text-black/70 leading-relaxed mb-4">
                {caseItem.description}
              </p>

              {/* Result */}
              <div className="flex items-center gap-2 pt-4 border-t-4 border-black">
                <span className="text-xl">✓</span>
                <span className="text-sm font-bold text-black uppercase">
                  {caseItem.result}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={onOpenChat}
            className="nb-btn nb-btn-primary px-8 py-4 text-lg"
          >
            咨询您的案例
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cases;
