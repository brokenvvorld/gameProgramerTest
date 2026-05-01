export const dimensionOrder = [
  'systemDepth',
  'momentToMoment',
  'contentGrowth',
  'immersionCraft',
  'socialCreation',
  'stabilityOwnership',
]

export const responseLabels = [
  '非常不像我',
  '比较不像我',
  '稍微不像我',
  '稍微像我',
  '比较像我',
  '非常像我',
]

export const skipAnswerValue = 'skip'
export const skipAnswerLabel = '不确定 / 都不适用'

export const dimensionMeta = {
  systemDepth: {
    title: '系统推演',
    shortTitle: '系统',
    resultTitle: '规则结构驱动',
    summary: '你会被规则关系、系统依赖和可推演性吸引，愿意为结构感投入注意力。',
    high: '你倾向先看规则是否咬合、状态是否清晰、扩展后会不会互相牵扯。复杂系统对你不是负担，反而是让项目成立的骨架。',
    middle: '你认可结构的重要性，但不会为了结构感牺牲太多推进速度。只要系统足够支撑当前目标，你就愿意继续往前走。',
    low: '你通常不会把复杂规则本身当成主要驱动力。只要系统能托住体验，你更愿意把注意力放在别的项目要素上。',
  },
  momentToMoment: {
    title: '实时反馈',
    shortTitle: '反馈',
    resultTitle: '即时体验驱动',
    summary: '你更容易被操作手感、节奏变化和当下这一秒的反馈质量点燃。',
    high: '你对输入、命中、节奏、镜头、延迟和操作回声很敏感。只要即时体验不顺，你很难完全忽略它。',
    middle: '你在意实时反馈，但通常会把它和其他目标一起衡量。体验顺滑很重要，只是不是你唯一的判断锚点。',
    low: '你不会总是从手感或即时反馈切入一个项目。只要体验没有明显绊脚，你往往会更关注更长线或更宏观的东西。',
  },
  contentGrowth: {
    title: '内容生长',
    shortTitle: '内容',
    resultTitle: '长期循环驱动',
    summary: '你会自然想到版本延展、养成深度、活动节奏和玩家持续回来的理由。',
    high: '你容易被长期内容、目标递进、养成循环和更新节奏吸引。一个能持续长大的项目，会让你更有投入感。',
    middle: '你会考虑长线内容，但不一定把它放在最前面。只要核心体验站得住，内容生长可以逐步铺开。',
    low: '你通常不会把版本扩张或长期养成当成首要判断标准。比起慢慢滚大，你更在意项目当下是否已经成立。',
  },
  immersionCraft: {
    title: '沉浸营造',
    shortTitle: '沉浸',
    resultTitle: '世界氛围驱动',
    summary: '你容易被世界感、情绪节奏、叙事表达和整体氛围的完整度牵动。',
    high: '你会注意场景气质、镜头动线、叙事铺垫、角色出现方式，以及玩家是否真的被带进那个世界。',
    middle: '你认可氛围和叙事的价值，但通常会把它看成体验的一部分，而不是唯一核心。',
    low: '你不太会优先从氛围、故事或世界感判断项目方向。它们对你重要，但通常需要建立在别的支点之上。',
  },
  socialCreation: {
    title: '协作创造',
    shortTitle: '社交',
    resultTitle: '关系与舞台驱动',
    summary: '你更容易被协作关系、分享传播、房间氛围、UGC 与玩家整活空间吸引。',
    high: '你会自然想到队友之间怎么配合、玩家怎么分享、内容怎么被再创作，以及项目能不能长出关系和场景。',
    middle: '你看得到社交和创造空间的价值，但会把它放在项目整体目标中平衡处理。',
    low: '你通常不会优先从社交关系或玩家创造空间进入一个项目。比起这些部分，你更容易先被别的工作内容牵住。',
  },
  stabilityOwnership: {
    title: '稳定掌控',
    shortTitle: '稳定',
    resultTitle: '风险与收口驱动',
    summary: '你会自然关注边界、风险、上线稳定性、复盘沉淀和长期维护成本。',
    high: '你很在意坏档、错账、异常链路、协作失配和未来维护负担。项目能不能稳稳落地，对你有很强牵引力。',
    middle: '你不会忽略风险和收口，但也不会让它完全压过推进。你更像是在速度与稳妥之间找平衡。',
    low: '你通常不会把风险控制和长期维护当成主要驱动力。只要没有明显警报，你更愿意把精力放在更能点燃你的部分。',
  },
}
