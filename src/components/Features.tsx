import React from 'react';

const Features: React.FC = () => {
  const features = [
    {
      icon: '✅',
      title: '合同条款分析',
      description: 'AI智能识别购车合同中的不公平条款，提供专业的法律解读和风险评估',
      color: '#ff006e',
      badge: '核心功能',
    },
    {
      icon: '⚠️',
      title: '定金陷阱识别',
      description: '识别"定金不可退"等霸王条款，帮助您避免购车定金纠纷',
      color: '#ccff00',
      badge: '风险防控',
    },
    {
      icon: '📋',
      title: '预售条款审查',
      description: '审查数字预售模式中的预售条款，保障消费者的知情权和选择权',
      color: '#00d9ff',
      badge: '条款审查',
    },
    {
      icon: '⚖️',
      title: '维权指导',
      description: '提供专业的维权流程指导，帮助您通过合法途径维护自身权益',
      color: '#ff9500',
      badge: '法律支持',
    },
    {
      icon: '🤖',
      title: '智能问答',
      description: '24小时AI法律助手，随时解答您的购车法律问题',
      color: '#ff006e',
      badge: 'AI驱动',
    },
    {
      icon: '📚',
      title: '案例库',
      description: '丰富的购车纠纷案例库，提供参考和借鉴',
      color: '#ccff00',
      badge: '知识库',
    },
  ];

  return (
    <section id="features" className="py-20 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="nb-badge nb-badge-blue mb-4">
            核心功能
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
            专业的购车权益守护
          </h2>
          <p className="text-black/60 max-w-2xl mx-auto text-lg">
            我们提供全方位的购车法律咨询服务，帮助您识别风险、规避陷阱、维护权益
          </p>
        </div>

        {/* Features Grid - Asymmetric Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="nb-card p-6 md:p-8 nb-animate-bounce"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="text-4xl mb-4">
                {feature.icon}
              </div>

              {/* Badge */}
              <div 
                className="nb-badge mb-4"
                style={{ 
                  background: feature.color,
                  color: feature.color === '#ccff00' ? '#000000' : '#ffffff',
                }}
              >
                {feature.badge}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-black mb-3 uppercase">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-black/70 leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative Line */}
              <div 
                className="w-16 h-1 mt-4"
                style={{ background: feature.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
