import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowRight } from 'lucide-react'

const cases = [
  {
    title: '定金不可退陷阱',
    risk: '高风险',
    description: '合同约定"定金不退"，违反《民法典》第五百八十六条，消费者有权在特定条件下要求返还。',
    tags: ['定金条款', '民法典'],
  },
  {
    title: '强制捆绑销售',
    risk: '高风险',
    description: '要求消费者必须购买店内保险或装潢套餐，涉嫌违反《消费者权益保护法》第九条自主选择权。',
    tags: ['捆绑销售', '消保法'],
  },
  {
    title: '模糊交付时间',
    risk: '中风险',
    description: '交车时间约定模糊，未明确违约责任，消费者维权困难。',
    tags: ['交付条款', '违约责任'],
  },
  {
    title: '单方解释权',
    risk: '高风险',
    description: '"最终解释权归本店所有"，此类条款已被市场监管总局明确认定为无效格式条款。',
    tags: ['格式条款', '解释权'],
  },
]

export default function Cases() {
  return (
    <section id="cases" className="py-20 px-4 bg-black">
      <div className="container mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            典型案例
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            常见汽车消费合同侵权条款解析
          </p>
        </motion.div>

        {/* Cases grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12">
          {cases.map((item, i) => (
            <motion.div
              key={i}
              className="bento-card p-6 md:p-8 group cursor-default"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <span
                    className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                      item.risk === '高风险'
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                        : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                    }`}
                  >
                    <AlertTriangle className="w-3 h-3" />
                    {item.risk}
                  </span>
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 bg-neutral-900 text-neutral-500 rounded-md border border-neutral-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            to="/chat"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 transition-all duration-300"
          >
            立即检查我的合同
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
