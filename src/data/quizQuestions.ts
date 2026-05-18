export interface QuizOption {
  id: string
  text: string
}

export interface QuizQuestion {
  id: string
  type: 'scenario' | 'single'
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  scenario?: string
  options: QuizOption[]
  correctAnswer: string
  explanation: string
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'c1',
    type: 'scenario',
    category: 'contract',
    difficulty: 'easy',
    question: '这份购车合同存在什么问题？',
    scenario: '小张看中一辆车，销售让他交5000元"定金"并签了意向书。销售口头承诺"不满意随时全额退款"，但合同上写的是"定金"二字。',
    options: [
      { id: 'a', text: '没有问题，销售承诺了可退' },
      { id: 'b', text: '有风险，"定金"依法不可退，口头承诺无效' },
      { id: 'c', text: '只要金额不大就没关系' },
      { id: 'd', text: '签了意向书不是正式合同，不受约束' },
    ],
    correctAnswer: 'b',
    explanation: '根据《民法典》，"定金"具有担保性质，消费者违约时无权要求返还。而"订金"仅为预付款可全额退还。口头承诺如未写入合同则不具法律效力。',
  },
  {
    id: 'c2',
    type: 'scenario',
    category: 'finance',
    difficulty: 'easy',
    question: '小李应该如何应对？',
    scenario: '小李贷款购车，4S店要求额外支付3000元"金融服务费"，声称是"帮你跑银行的辛苦费"。付款后只给了一张手写收据，没有正规发票。',
    options: [
      { id: 'a', text: '正常费用，4S店确实提供了服务' },
      { id: 'b', text: '要求开具正规发票，否则拒绝支付' },
      { id: 'c', text: '金额不大，算了' },
      { id: 'd', text: '下次换一家就好' },
    ],
    correctAnswer: 'b',
    explanation: '金融服务费必须开具正规发票。未开发票属违规收费，消费者有权拒绝支付或事后向税务部门举报。2019年"西安奔驰事件"后，这类收费已被严格监管。',
  },
  {
    id: 'c3',
    type: 'single',
    category: 'quality',
    difficulty: 'easy',
    question: '以下哪种情况提车时应当警惕？',
    options: [
      { id: 'a', text: '里程表显示12公里' },
      { id: 'b', text: '里程表显示150公里，销售称"运输里程"' },
      { id: 'c', text: '发动机舱干净整洁' },
      { id: 'd', text: '车辆合格证与VIN码一致' },
    ],
    correctAnswer: 'b',
    explanation: '新车正常运输里程一般不超过50公里。150公里的里程很可能意味着车辆被试驾、被作为展车使用，或运输途中绕路，应要求说明并保留证据。',
  },
  {
    id: 'c4',
    type: 'scenario',
    category: 'repair',
    difficulty: 'medium',
    question: '这次保养存在什么问题？',
    scenario: '小王的车行驶了1.5万公里去4S店保养，服务顾问建议更换变速箱油、刹车油、防冻液，共计费用3800元。厂家保养手册规定这些项目的更换周期为4万公里或3年。',
    options: [
      { id: 'a', text: '服务顾问是专业的，应该听从建议' },
      { id: 'b', text: '过度推荐不必要项目，按厂家保养手册执行即可' },
      { id: 'c', text: '提前更换对车好，花点钱值得' },
      { id: 'd', text: '换不换都行，看自己预算' },
    ],
    correctAnswer: 'b',
    explanation: '厂家保养手册是最权威的保养依据。4S店为提高产值经常过度推荐项目。消费者应以厂家规定为准，不被"话术恐吓"影响决策。',
  },
  {
    id: 'c5',
    type: 'scenario',
    category: 'used',
    difficulty: 'medium',
    question: '这辆二手车可能存在什么问题？',
    scenario: '一辆2020年的SUV，表显里程3.2万公里，售价比同款低2万。看车时发现方向盘皮质有明显磨损，刹车踏板橡胶磨平。车商说"原车主开车习惯不好"。',
    options: [
      { id: 'a', text: '确实可能是驾驶习惯问题' },
      { id: 'b', text: '高度疑似调表车，实际里程远超表显' },
      { id: 'c', text: '价格便宜值得买' },
      { id: 'd', text: '多跑几家比比价格再决定' },
    ],
    correctAnswer: 'b',
    explanation: '方向盘和刹车踏板的磨损与里程直接相关。3.2万公里的车不应有明显磨损。应查询维保记录核实真实里程，磨损程度与表显严重不符是调表的典型特征。',
  },
  {
    id: 'c6',
    type: 'single',
    category: 'contract',
    difficulty: 'medium',
    question: '以下哪个合同条款属于"霸王条款"？',
    options: [
      { id: 'a', text: '"乙方应在签约后3日内支付首付款"' },
      { id: 'b', text: '"本合同最终解释权归甲方所有"' },
      { id: 'c', text: '"逾期交车每日赔偿合同金额万分之五"' },
      { id: 'd', text: '"车辆颜色以实际交付为准"' },
    ],
    correctAnswer: 'b',
    explanation: '"最终解释权归商家"违反《消费者权益保护法》，属无效格式条款。合同解释权属于法院和仲裁机构，商家不能单方面自我赋权。',
  },
  {
    id: 'c7',
    type: 'scenario',
    category: 'finance',
    difficulty: 'hard',
    question: '小陈面临的真实风险是什么？',
    scenario: '小陈购车时，销售建议"发票金额写低一些，帮你省购置税"。原价20万的车，发票只开了15万，差额5万以现金方式另付。',
    options: [
      { id: 'a', text: '确实能省税，双赢方案' },
      { id: 'b', text: '有风险但不大' },
      { id: 'c', text: '涉及税务违法，且二手车出售和保险理赔时损失更大' },
      { id: 'd', text: '只要保留现金收据就没问题' },
    ],
    correctAnswer: 'c',
    explanation: '低开发票属偷税行为。更严重的后果：①车辆全损时保险只按发票金额赔付（少5万）；②二手交易时车辆估值以发票为基础（亏5万）；③若被税务稽查，消费者也承担连带责任。',
  },
  {
    id: 'c8',
    type: 'scenario',
    category: 'quality',
    difficulty: 'hard',
    question: '小刘应该如何维权？',
    scenario: '小刘购买新车2个月后发现发动机漏油。4S店检查后表示"是正常渗油，不属于质量问题"，拒绝三包退换。但小刘在论坛发现同款车大量类似投诉。',
    options: [
      { id: 'a', text: '4S店说不算就不算了' },
      { id: 'b', text: '去其他4S店再检查看看' },
      { id: 'c', text: '委托第三方鉴定机构检测，留存证据后向市场监管局投诉' },
      { id: 'd', text: '在网上发帖曝光' },
    ],
    correctAnswer: 'c',
    explanation: '第三方鉴定报告是维权的关键证据。按三包规定，发动机漏油属于严重质量问题，60天/3000公里内可退换。同时向12315投诉并保留论坛同类投诉截图作为群体性证据。',
  },
  {
    id: 'c9',
    type: 'single',
    category: 'used',
    difficulty: 'easy',
    question: '买二手车前，以下哪项检查最重要？',
    options: [
      { id: 'a', text: '检查车漆光泽度' },
      { id: 'b', text: '查询维保记录和保险出险记录' },
      { id: 'c', text: '听发动机声音是否正常' },
      { id: 'd', text: '看内饰是否干净' },
    ],
    correctAnswer: 'b',
    explanation: '维保记录和保险出险记录是验证车辆真实状况的最客观依据，可以发现调表、事故、泡水等隐藏问题。外观和听感都可以通过整备伪装。',
  },
  {
    id: 'c10',
    type: 'scenario',
    category: 'contract',
    difficulty: 'medium',
    question: '这种情况下消费者有权要求什么？',
    scenario: '小赵下单时车辆官网价格为25万，等了4个月提车时厂家降价到22万。4S店表示合同已签不能改价，小赵需按25万付款。',
    options: [
      { id: 'a', text: '合同已签，只能按原价支付' },
      { id: 'b', text: '可以要求退车并全额退款' },
      { id: 'c', text: '可以协商补差价或等价升级配置' },
      { id: 'd', text: '找消协投诉要求按新价执行' },
    ],
    correctAnswer: 'c',
    explanation: '合同合法有效的情况下确实应按约定执行，但消费者可以与经销商协商补偿方案。实际操作中多数4S店会通过赠送保养、升级配置等方式补偿，以维护品牌口碑。',
  },
  {
    id: 'c11',
    type: 'single',
    category: 'finance',
    difficulty: 'hard',
    question: '以下哪种贷款方式综合成本最低？',
    options: [
      { id: 'a', text: '4S店"零利率"贷款（含5000元手续费）' },
      { id: 'b', text: '银行车贷年化利率4.5%，无手续费' },
      { id: 'c', text: '厂家金融1年免息，之后转4.9%利率' },
      { id: 'd', text: '需要计算实际年化成本才能比较' },
    ],
    correctAnswer: 'd',
    explanation: '不同贷款方式需换算成统一的"年化综合成本"才能公平比较。"零利率"可能手续费很高，"免息期"可能后续利率更贵。建议使用IRR公式计算真实利率。',
  },
  {
    id: 'c12',
    type: 'scenario',
    category: 'quality',
    difficulty: 'medium',
    question: '小周该如何处理？',
    scenario: '小周的电动车通过OTA更新后，加速性能明显下降，充电速度也变慢。厂家声称"为了延长电池寿命进行优化"，更新无法回退。',
    options: [
      { id: 'a', text: '为了电池寿命可以理解' },
      { id: 'b', text: '联合其他车主向消协集体投诉，未经同意降低已付费功能涉嫌违约' },
      { id: 'c', text: '等下次更新恢复' },
      { id: 'd', text: '换一个品牌的车' },
    ],
    correctAnswer: 'b',
    explanation: '未经消费者同意降低已购产品性能涉嫌违反《消费者权益保护法》知情权和公平交易权。集体投诉更有力度，可要求恢复原有性能或给予补偿。',
  },
]

export const difficultyConfig = {
  easy: { label: '基础', count: 5, time: 30, color: '#10b981' },
  medium: { label: '进阶', count: 8, time: 25, color: '#f59e0b' },
  hard: { label: '专家', count: 10, time: 20, color: '#ef4444' },
}

export function getRandomQuestions(difficulty: 'easy' | 'medium' | 'hard'): QuizQuestion[] {
  const config = difficultyConfig[difficulty]
  const pool = quizQuestions.filter(q => {
    if (difficulty === 'easy') return q.difficulty === 'easy'
    if (difficulty === 'medium') return q.difficulty !== 'hard'
    return true
  })
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(config.count, shuffled.length))
}
