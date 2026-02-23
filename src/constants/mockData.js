// ============================================================
// 学科数据
// ============================================================
export const SUBJECTS = [
  { name: "数学", icon: "📐", color: "#4F6EF7", errors: 23, mastery: 72 },
  { name: "英语", icon: "🔤", color: "#22C55E", errors: 15, mastery: 81 },
  { name: "物理", icon: "⚡", color: "#F59E0B", errors: 18, mastery: 65 },
  { name: "语文", icon: "📖", color: "#EF4444", errors: 8, mastery: 88 },
];

// ============================================================
// 错题数据（4道，覆盖数学/物理/英语）
// ============================================================
export const ERROR_QUESTIONS = [
  {
    id: 1,
    subject: "数学",
    topic: "二次函数",
    knowledgePoint: "顶点式求解",
    question: "已知二次函数 y=a(x-1)²+3 的图像经过点(2,1)，求a的值",
    yourAnswer: "a = 2",
    correctAnswer: "a = -2",
    errorType: "符号错误",
    errorLevel: "概念迷雾",
    errorAnalysis:
      "代入点(2,1)后计算 1=a(2-1)\u00B2+3，得 a=-2。你在移项时忘记变号，这是代数运算中最常见的失误。建议在做移项操作时养成「移项变号」四字口诀的习惯。",
    date: "2月21日",
    reviewCount: 0,
    mastered: false,
  },
  {
    id: 2,
    subject: "数学",
    topic: "概率统计",
    knowledgePoint: "条件概率",
    question:
      "袋中有3红2白球，不放回取2次，第一次红色的条件下第二次红色的概率",
    yourAnswer: "3/5",
    correctAnswer: "2/4 = 1/2",
    errorType: "思路偏差",
    errorLevel: "策略偏差",
    errorAnalysis:
      '你没有考虑"不放回"的条件，第一次取走红球后剩余4球中只有2红球，所以P=2/4=1/2。条件概率的关键是明确"在什么条件下"计算。',
    date: "2月20日",
    reviewCount: 1,
    mastered: false,
  },
  {
    id: 3,
    subject: "物理",
    topic: "牛顿运动定律",
    knowledgePoint: "受力分析",
    question: "倾斜角30°的光滑斜面上，质量2kg物体的加速度",
    yourAnswer: "10 m/s²",
    correctAnswer: "5 m/s²",
    errorType: "公式错用",
    errorLevel: "表层错误",
    errorAnalysis:
      "你用了 a=g 而非 a=gsinθ。斜面上的加速度需要分解重力沿斜面方向的分量：a = g·sin30° = 10×0.5 = 5 m/s²。受力分析时一定要先画受力图。",
    date: "2月19日",
    reviewCount: 2,
    mastered: false,
  },
  {
    id: 4,
    subject: "英语",
    topic: "定语从句",
    knowledgePoint: "关系代词选择",
    question: 'The book _____ cover is red belongs to Mary.',
    yourAnswer: "which",
    correctAnswer: "whose",
    errorType: "语法混淆",
    errorLevel: "概念迷雾",
    errorAnalysis:
      "当关系代词修饰名词（cover）表示所属关系时，应使用whose而非which。whose = of which the，表示\"……的\"。类似结构：The girl whose hair is long...（那个头发长的女孩）。",
    date: "2月18日",
    reviewCount: 0,
    mastered: false,
  },
];

// ============================================================
// 苏格拉底对话流（每道题独立对话）
// ============================================================
export const SOCRATIC_FLOWS = {
  1: [
    {
      role: "ai",
      text: "你好！让我们一起来看这道二次函数的题目。首先，你能告诉我这道题考查的是哪个知识点吗？🤔",
    },
    {
      role: "user",
      text: "考查的是二次函数的顶点式",
      options: ["二次函数的顶点式", "二次函数的一般式", "一元二次方程"],
    },
    {
      role: "ai",
      text: "对！二次函数 y = a(x-h)² + k 的顶点式中，(h,k) 是顶点坐标。那题目告诉我们顶点是哪个点呢？",
    },
    {
      role: "user",
      text: "顶点是 (1, 3)",
      options: ["(1, 3)", "(3, 1)", "(-1, 3)"],
    },
    {
      role: "ai",
      text: "很好！现在题目说图像经过点 (2,1)。如果我们把这个点代入 y = a(x-1)² + 3，你会得到什么等式？试着写一下 👇",
    },
    {
      role: "user",
      text: "1 = a(2-1)² + 3，即 1 = a + 3",
      options: ["1 = a(2-1)² + 3", "2 = a(1-1)² + 3", "1 = a(2+1)² + 3"],
    },
    {
      role: "ai",
      text: "完美！那 1 = a·1 + 3，解这个方程 a 等于多少呢？注意移项时的正负号哦 😊",
    },
    {
      role: "user",
      text: "a = 1 - 3 = -2！",
      options: ["a = -2", "a = 2", "a = 4"],
    },
    {
      role: "ai",
      text: '🎉 太棒了！a = -2 才是正确答案！你之前的错误是在移项时忘了变号。记住：移项变号是最容易犯的"表层错误"，多留意就好！\n\n这道题已标记为"已理解"，3天后会再次复习巩固 ✅',
    },
  ],
  2: [
    {
      role: "ai",
      text: "来看这道条件概率的题目！首先，这道题的关键条件是什么？🤔",
    },
    {
      role: "user",
      text: "关键条件是「不放回」取球",
      options: ["不放回取球", "有放回取球", "同时取两球"],
    },
    {
      role: "ai",
      text: '对！"不放回"意味着第一次取出后球的总数会减少。如果第一次已经取出一个红球，袋中还剩几个球？其中几个红球？',
    },
    {
      role: "user",
      text: "还剩4个球，其中2个红球",
      options: ["4球中2红", "5球中2红", "4球中3红"],
    },
    {
      role: "ai",
      text: "没错！那在剩下4个球（2红2白）中取到红球的概率是多少呢？",
    },
    {
      role: "user",
      text: "P = 2/4 = 1/2",
      options: ["1/2", "3/5", "2/5"],
    },
    {
      role: "ai",
      text: '🎉 完全正确！P = 2/4 = 1/2。你之前的错误是把"不放回"当成了"有放回"，用了原始的3/5。条件概率的关键就是——先确定条件改变了什么，再算概率！\n\n这道题已标记为"已理解"，3天后会再次复习巩固 ✅',
    },
  ],
  3: [
    {
      role: "ai",
      text: "我们来看这道牛顿运动定律的题目！物体在光滑斜面上，受到哪些力呢？🤔",
    },
    {
      role: "user",
      text: "受到重力和斜面支持力",
      options: ["重力和支持力", "重力、支持力和摩擦力", "只有重力"],
    },
    {
      role: "ai",
      text: "对！光滑斜面意味着没有摩擦力。那重力沿斜面方向的分量怎么算呢？需要用到什么三角函数？",
    },
    {
      role: "user",
      text: "沿斜面分量 = mg·sinθ",
      options: ["mg·sinθ", "mg·cosθ", "mg·tanθ"],
    },
    {
      role: "ai",
      text: "完美！根据牛顿第二定律 F = ma，那 mg·sinθ = ma，消去 m 后 a 等于多少？",
    },
    {
      role: "user",
      text: "a = g·sin30° = 10 × 0.5 = 5 m/s²",
      options: ["5 m/s²", "10 m/s²", "8.66 m/s²"],
    },
    {
      role: "ai",
      text: '🎉 正确！a = g·sin30° = 5 m/s²，而不是直接用 g = 10。你之前的错误是没有对重力进行分解。记住：斜面问题一定要先分解重力！画受力图是关键第一步。\n\n这道题已标记为"已理解"，3天后会再次复习巩固 ✅',
    },
  ],
  4: [
    {
      role: "ai",
      text: "来看这道定语从句的题目！The book _____ cover is red belongs to Mary. 首先，空格后面的 \"cover\" 和 \"book\" 是什么关系？🤔",
    },
    {
      role: "user",
      text: "cover 是 book 的封面，是所属关系",
      options: ["所属关系（书的封面）", "并列关系", "修饰关系"],
    },
    {
      role: "ai",
      text: '很好！"the book\'s cover"（书的封面），这是一个所属关系。在定语从句中，表示"……的"应该用哪个关系代词？',
    },
    {
      role: "user",
      text: "应该用 whose",
      options: ["whose", "which", "that"],
    },
    {
      role: "ai",
      text: 'whose cover = the cover of which = 这本书的封面。那完整的句子应该怎么读？',
    },
    {
      role: "user",
      text: "The book whose cover is red belongs to Mary.",
      options: [
        "The book whose cover is red...",
        "The book which cover is red...",
        "The book that cover is red...",
      ],
    },
    {
      role: "ai",
      text: '🎉 完全正确！whose 在定语从句中表示所属关系，相当于 "of which the" 或 "of whom the"。你之前用 which 是因为混淆了 which 和 whose 的用法——which 代替先行词本身，而 whose 修饰后面的名词表示"谁的"。\n\n这道题已标记为"已理解"，3天后会再次复习巩固 ✅',
    },
  ],
};

// ============================================================
// 各科知识点掌握数据
// ============================================================
export const KNOWLEDGE_DATA = {
  数学: [
    { name: "导数", mastery: 38, total: 4, errors: 3, trend: "down" },
    { name: "二次函数", mastery: 45, total: 8, errors: 4, trend: "down" },
    { name: "概率统计", mastery: 55, total: 6, errors: 3, trend: "up" },
    { name: "立体几何", mastery: 62, total: 5, errors: 2, trend: "stable" },
    { name: "三角函数", mastery: 78, total: 10, errors: 2, trend: "up" },
    { name: "数列", mastery: 85, total: 7, errors: 1, trend: "up" },
  ],
  英语: [
    { name: "定语从句", mastery: 52, total: 6, errors: 3, trend: "down" },
    { name: "虚拟语气", mastery: 60, total: 5, errors: 2, trend: "stable" },
    { name: "完形填空", mastery: 75, total: 8, errors: 2, trend: "up" },
    { name: "阅读理解", mastery: 88, total: 10, errors: 1, trend: "up" },
    { name: "写作表达", mastery: 82, total: 4, errors: 1, trend: "up" },
  ],
  物理: [
    { name: "牛顿定律", mastery: 42, total: 7, errors: 4, trend: "down" },
    { name: "电磁感应", mastery: 48, total: 5, errors: 3, trend: "down" },
    { name: "动量守恒", mastery: 58, total: 6, errors: 3, trend: "stable" },
    { name: "万有引力", mastery: 72, total: 4, errors: 1, trend: "up" },
    { name: "机械能", mastery: 80, total: 8, errors: 2, trend: "up" },
  ],
  语文: [
    { name: "文言文翻译", mastery: 65, total: 5, errors: 2, trend: "stable" },
    { name: "诗词鉴赏", mastery: 78, total: 6, errors: 1, trend: "up" },
    { name: "现代文阅读", mastery: 85, total: 8, errors: 1, trend: "up" },
    { name: "作文审题", mastery: 92, total: 4, errors: 0, trend: "up" },
  ],
};

// ============================================================
// 复习任务数据
// ============================================================
export const REVIEW_TASKS = [
  {
    time: "08:00",
    task: "复习：二次函数顶点式（3题）",
    type: "review",
    urgent: true,
    detail:
      "这些题目你在2天前做错过，根据艾宾浩斯遗忘曲线，现在正处于记忆快速衰退期，是最佳复习时机。AI会用苏格拉底式引导提问帮你重新回忆解题思路，而非简单重复答案。",
  },
  {
    time: "12:30",
    task: "巩固：条件概率基础练习（2题）",
    type: "practice",
    urgent: false,
    detail:
      "你已经初步理解条件概率的概念，现在需要通过变式练习加深理解。题目难度会根据你的正确率动态调整——答对则提升难度，答错则回到基础题巩固。",
  },
  {
    time: "18:00",
    task: "阅读：《微信读书》推荐章节",
    type: "reading",
    urgent: false,
    detail:
      "微信读书根据你的薄弱知识点推荐了《高中数学思维方法》第5章：二次函数的图像与性质。阅读约15分钟即可，配合书中的例题加深理解。",
  },
  {
    time: "21:00",
    task: "测验：本周错题随机抽测（5题）",
    type: "test",
    urgent: true,
    detail:
      "从本周所有错题中随机抽取5道进行限时测验，全面检验复习效果。全部正确即可将对应题目标记为「已掌握」，错误的题目将重新进入复习队列。",
  },
];
