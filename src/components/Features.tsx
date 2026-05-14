import { motion } from 'framer-motion'
import { 
  Shield, FileSearch, AlertTriangle, Scale, 
  MessageSquare, BookOpen 
} from 'lucide-react'

interface BentoCardProps {
  icon: React.ReactNode
  title: string
  value: string
  subtitle?: string
  delay: number
  span?: string
}

function BentoCard({ icon, title, value, subtitle, delay, span = '' }: BentoCardProps) {
  return (
    <motion.div
      className={`bento-card grid-pattern p-6 md:p-8 flex flex-col justify-center ${span}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="relative z-10">
        <div className="text-neutral-500 mb-3">{icon}</div>
        <h3 className="text-sm md:text-base text-neutral-300 mb-2">{title}</h3>
        <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">{value}</p>
        {subtitle && (
          <p className="text-sm text-neutral-500 leading-relaxed">{subtitle}</p>
        )}
      </div>
    </motion.div>
  )
}

export default function Features() {
  const features = [
    {
      icon: <FileSearch className="w-6 h-6" />,
      title: '合同条款扫描',
      value: '智能识别',
      subtitle: '自动检测购车合同中的霸王条款、不合理免责、定金陷阱等侵权内容',
      span: 'md:col-span-2',
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: '风险等级评估',
      value: '四级预警',
      subtitle: '从低风险到严重侵权，精准评估每条条款的风险等级',
      span: '',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: '法律依据匹配',
      value: '精准引用',
      subtitle: '自动匹配消费者权益保护法、民法典等相关法条',
      span: '',
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: '维权方案生成',
      value: '定制方案',
      subtitle: '根据具体侵权情况，生成个性化维权建议和投诉模板',
      span: 'md:col-span-2',
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'AI 法律咨询',
      value: '7×24',
      subtitle: '随时在线咨询汽车消费相关法律问题，专业解答',
      span: 'md:col-span-1',
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: '案例知识库',
      value: '持续更新',
      subtitle: '收录大量汽车消费纠纷案例，提供参考借鉴',
      span: 'md:col-span-2',
    },
  ]

  return (
    <section id="features" className="py-20 px-4 bg-black">
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
            核心能力
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            全方位守护您的汽车消费权益
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, i) => (
            <BentoCard
              key={i}
              icon={feature.icon}
              title={feature.title}
              value={feature.value}
              subtitle={feature.subtitle}
              delay={i * 0.1}
              span={feature.span}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
