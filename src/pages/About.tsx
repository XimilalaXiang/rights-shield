import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, BookOpen, Users, FileText, Mail } from 'lucide-react'

const pages: Record<string, { title: string; subtitle: string; icon: typeof BookOpen; content: string[] }> = {
  research: {
    title: '研究课题',
    subtitle: '中山大学数字汽车预售模式消费者权益保护研究',
    icon: BookOpen,
    content: [
      '本项目是中山大学法学院"数字经济时代汽车消费者权益保护"研究课题的应用成果。',
      '研究背景：随着汽车销售模式向数字化、线上化转型，消费者面临的合同陷阱、金融欺诈等问题日益复杂。传统维权方式效率低、成本高，亟需技术手段赋能。',
      '研究目标：探索 AI 技术在消费者权益保护领域的应用，开发智能法律助手原型系统，为消费者提供合同审查、风险评估、维权指引等服务。',
      '技术路线：基于大语言模型（LLM）的法律知识问答系统，结合汽车消费领域的专业法规数据库，实现智能化、精准化的维权辅助。',
      '预期成果：形成一套完整的汽车消费者权益AI保护方案，发表相关学术论文，并推动相关政策建议。',
    ],
  },
  team: {
    title: '团队介绍',
    subtitle: '跨学科研究团队',
    icon: Users,
    content: [
      '本项目由中山大学法学院、计算机科学学院联合指导，集合法学、人工智能、软件工程等多学科背景。',
      '指导教师：张教授（法学院，消费者权益保护法研究方向）、李教授（计算机学院，自然语言处理研究方向）',
      '核心成员：研究生3名（法律信息学、AI应用、前端开发），本科生2名（数据标注、测试）',
      '合作单位：广东省消费者委员会、广州市市场监督管理局（提供案例数据与指导意见）',
      '项目周期：2025年3月-2026年6月',
    ],
  },
  usage: {
    title: '使用指南',
    subtitle: '快速上手权盾平台',
    icon: FileText,
    content: [
      'AI 咨询：点击导航栏"AI 咨询"进入对话界面，直接向 AI 助手提问购车相关的法律问题。支持多轮对话、文件上传（合同文本分析）。',
      '案例库：浏览 60+ 真实汽车消费维权案例，支持按类别筛选和关键词搜索。每个案例包含详细描述和预警信号。',
      '维权指南：系统学习 42 个购车预警信号和 6 大维权策略，点击标记已学习进度会自动保存。',
      '风险检测：通过情境选择题测试你的购车维权知识，设有三个难度等级，完成后查看详细解析。',
      '注意事项：本平台提供的信息仅供学术研究参考，不构成正式法律意见。如遇实际法律问题，请咨询执业律师。',
    ],
  },
  contact: {
    title: '联系我们',
    subtitle: '欢迎交流与反馈',
    icon: Mail,
    content: [
      '邮箱：rights-shield@mail.sysu.edu.cn',
      '地址：广东省广州市海珠区新港西路135号 中山大学法学院',
      '问题反馈：如在使用过程中发现 Bug 或有功能建议，欢迎通过邮件反馈。',
      'GitHub：项目源码托管于 GitHub，欢迎学术交流与合作。',
      '声明：本项目为学术研究成果，不提供商业法律服务。所有案例数据已脱敏处理。',
    ],
  },
}

export default function About() {
  const { page } = useParams<{ page: string }>()
  const info = pages[page || ''] || pages.research

  const Icon = info.icon

  return (
    <div className="bg-black min-h-screen w-full pt-20">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.02),transparent_60%)]" />
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white text-sm mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </Link>

        <div className="mb-12">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
            <Icon className="w-6 h-6 text-neutral-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{info.title}</h1>
          <p className="text-sm text-neutral-500">{info.subtitle}</p>
        </div>

        <div className="space-y-6">
          {info.content.map((paragraph, i) => (
            <p key={i} className="text-sm text-neutral-400 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
