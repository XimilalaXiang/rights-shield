const testimonials = [
  {
    name: '张先生',
    title: '车主 · 合同纠纷',
    company: '深圳 · 4S店购车',
    quote: '签合同前用权盾分析了一下，发现了3条霸王条款，避免了近万元的隐性收费。',
    rating: 5,
  },
  {
    name: '李女士',
    title: '车主 · 定金纠纷',
    company: '广州 · 品牌直营',
    quote: '交了5000定金后想退，商家拒绝。AI助手引用民法典587条帮我成功维权退款。',
    rating: 5,
  },
  {
    name: '王先生',
    title: '车主 · 强制搭售',
    company: '北京 · 4S店',
    quote: '4S店强制买店内保险，权盾告诉我这违反了消费者权益保护法第九条，投诉后成功免除。',
    rating: 5,
  },
  {
    name: '陈女士',
    title: '车主 · 延迟交车',
    company: '杭州 · 新能源',
    quote: '合同写了30天交车拖了3个月，按照AI的建议发了律师函，两天就安排提车了。',
    rating: 5,
  },
  {
    name: '赵先生',
    title: '车主 · 加价提车',
    company: '上海 · 豪华品牌',
    quote: '经销商加价2万，权盾帮我整理了投诉材料，向市场监管局举报后成功按指导价购车。',
    rating: 5,
  },
  {
    name: '周女士',
    title: '车主 · 质量问题',
    company: '成都 · 合资品牌',
    quote: '新车第二天就出故障，AI帮我分析了三包政策条款，成功换了新车不是修车。',
    rating: 5,
  },
  {
    name: '刘先生',
    title: '车主 · 金融陷阱',
    company: '武汉 · 贷款购车',
    quote: '贷款合同中发现了"金融服务费"条款，AI指出这不合法，帮我省了8000块。',
    rating: 5,
  },
  {
    name: '吴女士',
    title: '车主 · 售后纠纷',
    company: '南京 · 二手车',
    quote: '买到事故车对方隐瞒了，按照权盾的维权路径走仲裁，最终获得三倍赔偿。',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-medium text-neutral-400 bg-neutral-900 border border-neutral-800 rounded-full">
            用户反馈
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-6">
            来自车主的<span className="font-light italic">真实评价</span>
          </h2>
          <p className="text-sm text-neutral-500 mt-4 max-w-xl mx-auto">
            已帮助数千名车主识别合同陷阱、成功维权
          </p>
        </div>

        <div className="space-y-6">
          {[0, 1].map((row) => (
            <div key={row} className="testimonial-marquee">
              <div
                className={`testimonial-track ${row === 0 ? 'animate-marquee-left' : 'animate-marquee-right'}`}
                style={{ '--marquee-duration': row === 0 ? '45s' : '52s' } as React.CSSProperties}
              >
                {[...testimonials, ...testimonials].map((item, idx) => (
                  <div key={`${row}-${idx}`} className="testimonial-card">
                    <div className="flex flex-col h-full gap-3">
                      <div className="flex items-center gap-2 text-amber-400 text-xs font-mono">
                        <span>"</span>
                        <span className="uppercase tracking-wide">Feedback</span>
                      </div>
                      <p className="text-white text-sm leading-relaxed flex-1">
                        {item.quote}
                      </p>
                      <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-white font-semibold text-sm truncate">{item.name}</div>
                          <div className="text-white/60 text-xs truncate">{item.title}</div>
                          <div className="text-white/40 text-xs truncate">{item.company}</div>
                        </div>
                        <div className="flex items-center text-amber-400 text-xs gap-0.5">
                          {Array.from({ length: item.rating }).map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
