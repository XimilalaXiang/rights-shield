import { AlertTriangle, FileText, CreditCard, Car, Wrench, Scale, type LucideIcon } from 'lucide-react'

export interface WarningCategory {
  id: string
  title: string
  icon: LucideIcon
  color: string
  warnings: string[]
}

export interface ProtectionStrategy {
  title: string
  description: string
  tips: string[]
}

export interface EmergencyStep {
  num: string
  text: string
}

export interface EmergencyContact {
  label: string
  number: string
}

export const warningCategories: WarningCategory[] = [
  {
    id: 'contract',
    title: '合同陷阱',
    icon: FileText,
    color: '#f59e0b',
    warnings: [
      '合同中"定金"与"订金"混用，问清楚是否可退',
      '"最终解释权归商家所有"属无效格式条款',
      '交车日期写"以实际情况为准"无法追究违约',
      '关键条款字体小于正文，故意降低阅读率',
      '口头承诺未写入合同，后续无法维权',
      '合同附件与主合同条款冲突时以附件为准',
      '提前还款违约金条款隐藏在合同尾页',
    ],
  },
  {
    id: 'finance',
    title: '金融欺诈',
    icon: CreditCard,
    color: '#ef4444',
    warnings: [
      '"零利率"贷款暗藏高额手续费',
      '金融服务费不开发票属违规收费',
      '强制安装GPS并收费2000-5000元',
      '贷款实际利率高于口头承诺',
      '发票金额低开导致后续理赔受损',
      '分期尾款"阴阳合同"多收数万元',
      '提前还款被收取剩余利息50%违约金',
    ],
  },
  {
    id: 'quality',
    title: '质量与售后',
    icon: Car,
    color: '#3b82f6',
    warnings: [
      '新车PDI检测报告不完整或造假',
      '库存超18个月的滞销车冒充新车',
      '交付时里程表超出正常运输里程',
      '召回维修后同一问题再次出现',
      'OTA升级后性能下降且无法回退',
      '试驾车/展车当新车交付',
      '轮胎品牌与官网公示不符',
    ],
  },
  {
    id: 'repair',
    title: '维修猫腻',
    icon: Wrench,
    color: '#8b5cf6',
    warnings: [
      '工时费远超行业标准且不允许旁观',
      '原厂配件被偷换为副厂件但收原厂价',
      '维修清单包含未执行的"隐形项目"',
      '保养项目推荐超出厂家规定标准',
      '旧件不归还，流入二手市场牟利',
      '使用假冒原厂机油贴标产品',
      '小问题夸大描述制造恐慌消费',
    ],
  },
  {
    id: 'used',
    title: '二手车风险',
    icon: AlertTriangle,
    color: '#f97316',
    warnings: [
      '调表车：维保记录里程高于表显',
      '泡水车：底盘锈蚀、电气偶发故障',
      '事故车：A柱变形、车身缝隙不均',
      '网约车冒充私家车售卖',
      '第三方检测报告可能伪造',
      '"现状交付"条款免除卖方一切责任',
      '过户后才发现抵押或查封状态',
    ],
  },
  {
    id: 'rights',
    title: '强制消费',
    icon: Scale,
    color: '#10b981',
    warnings: [
      '购车必须在店内买3年全险',
      '加价提车以"装潢费"名义收取',
      '代办上牌收3000元（实际500元）',
      '不买保险不交车、不上牌',
      '强制购买延保服务',
      '必须在店内做首保否则脱保',
      '购车捆绑高价装潢/配件套餐',
    ],
  },
]

export const protectionStrategies: ProtectionStrategy[] = [
  {
    title: '录音录像取证',
    description: '与销售人员沟通时全程录音，看车试驾时拍照记录。',
    tips: ['保存微信/短信聊天记录', '录音中让对方确认姓名身份', '拍摄合同每一页包括附件'],
  },
  {
    title: '合同逐条审阅',
    description: '签字前逐条阅读合同，不明白的条款要求解释并留存。',
    tips: ['重点关注违约金/退款条款', '口头承诺必须写入合同', '空白处划线防止后续添加内容'],
  },
  {
    title: '独立验车验证',
    description: '提车时自行检查或请第三方验车，不依赖4S店PDI报告。',
    tips: ['用漆膜仪检测全车漆面', '检查轮胎生产日期DOT码', '核对发动机号与合格证一致'],
  },
  {
    title: '保留付款凭证',
    description: '所有费用要求正规发票或收据，拒绝现金/私人转账。',
    tips: ['发票金额须与实付一致', '对公账户转账保留回单', '手续费/服务费也要发票'],
  },
  {
    title: '查询车辆历史',
    description: '二手车交易前查询维保记录、保险出险记录、抵押状态。',
    tips: ['4S店可查维保记录', '交管12123查违章和抵押', '保险公司查出险次数和金额'],
  },
  {
    title: '了解三包法规',
    description: '熟悉汽车三包规定，知晓退换车条件和质保期限。',
    tips: ['家用车三包期2年/5万公里', '同一问题修理5次以上可换车', '严重安全问题可直接退车'],
  },
]

export const emergencySteps: EmergencyStep[] = [
  { num: '01', text: '立即停止付款，保留所有交易凭证和沟通记录' },
  { num: '02', text: '向4S店/厂商书面投诉，要求限期答复（保留签收凭证）' },
  { num: '03', text: '向市场监管局（12315）投诉，提供完整证据材料' },
  { num: '04', text: '联系消费者协会寻求调解帮助' },
  { num: '05', text: '必要时委托律师发送律师函或提起诉讼' },
  { num: '06', text: '通过媒体曝光施加舆论压力（保证信息真实）' },
]

export const emergencyContacts: EmergencyContact[] = [
  { label: '消费者投诉热线', number: '12315' },
  { label: '市场监管总局', number: '12345' },
  { label: '交通运输投诉', number: '12328' },
  { label: '法律援助热线', number: '12348' },
]
