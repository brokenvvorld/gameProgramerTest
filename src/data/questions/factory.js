import { typeKeys } from '../profiles.js'

export const stages = ['prototype', 'pipeline', 'content', 'testing', 'launch', 'retrospective']

const stageLabels = {
  prototype: '原型与核心体验',
  pipeline: '资产、工具、数据和协作管线',
  content: '内容扩展与玩法生长',
  testing: '测试、性能、可读性和平衡',
  launch: '上线、活动、稳定性和日常维护',
  retrospective: '复盘、归档、下一项目倾向',
}

/** 六级量表：完全 A → 完全 B；中间档为线性插值，故「居中」近似无倾向。 */
export const spectrumStepLabels = ['完全 A', '较为 A', '稍微 A', '稍微 B', '较为 B', '完全 B']

function emptyScores() {
  return Object.fromEntries(typeKeys.map((key) => [key, 0]))
}

export function mergeScores(a, b, weightB) {
  const w = Math.min(1, Math.max(0, weightB))
  const out = emptyScores()
  typeKeys.forEach((key) => {
    const va = a[key] || 0
    const vb = b[key] || 0
    out[key] = va * (1 - w) + vb * w
  })
  return out
}

/** 两极 [文案A, scoresA]、[文案B, scoresB] → 六级选项（分数在两端间线性插值） */
export function expandSpectrumOption(poleA, poleB) {
  const [labelA, scoresA] = poleA
  const [labelB, scoresB] = poleB
  return spectrumStepLabels.map((stepLabel, index) => {
    const t = index / (spectrumStepLabels.length - 1)
    return {
      text: stepLabel,
      scores: mergeScores(scoresA, scoresB, t),
    }
  })
}

export function createQuestions(rows) {
  return rows.map(([stage, text, poles]) => {
    const [labelA] = poles[0]
    const [labelB] = poles[1]
    return {
      stage,
      category: stageLabels[stage],
      text: `${text}\n\nA：${labelA}\nB：${labelB}`,
      options: expandSpectrumOption(poles[0], poles[1]),
    }
  })
}

const optionSets = [
  [
    ['让玩家自然读懂路线、氛围和目标', { narrativeAdventure: 3, openWorldRpg: 1 }],
    ['让世界、成长和任务状态能互相接住', { openWorldRpg: 3, strategySimulation: 1 }],
    ['让输入、命中和胜负反馈足够直接', { competitiveShooter: 3, actionFighting: 1 }],
    ['让一局很快开始、很快反馈、很快再来', { casualPuzzleMobile: 3, sportsRacing: 1 }],
  ],
  [
    ['把多人房间、掉线和队伍状态先跑顺', { coopSurvival: 3, competitiveShooter: 1 }],
    ['把数值、规则和资源流向先理清楚', { strategySimulation: 3, cardCollection: 1 }],
    ['把角色、技能、稀有度和养成节奏接起来', { cardCollection: 3, openWorldRpg: 1 }],
    ['把创作、分享、房间和社交入口做得轻松', { sandboxSocial: 3, casualPuzzleMobile: 1 }],
  ],
  [
    ['增加支线、谜题、场景演出和探索惊喜', { narrativeAdventure: 3, openWorldRpg: 1 }],
    ['增加武器、点位、对抗规则和排行榜刺激', { competitiveShooter: 3, sportsRacing: 1 }],
    ['增加敌群、资源压力、建造和合作目标', { coopSurvival: 3, strategySimulation: 1 }],
    ['增加连招、Boss、训练反馈和动作上限', { actionFighting: 3, sportsRacing: 1 }],
  ],
  [
    ['先看玩家在哪些剧情点迷路或漏线索', { narrativeAdventure: 3 }],
    ['先看延迟、命中热区、胜率和异常对局', { competitiveShooter: 3 }],
    ['先看经济循环、AI 决策和数值失控点', { strategySimulation: 3 }],
    ['先看关卡失败率、奖励点击和日常留存', { casualPuzzleMobile: 2, cardCollection: 1 }],
  ],
  [
    ['确保存档、任务、地图切换和关键触发稳定', { narrativeAdventure: 2, openWorldRpg: 2 }],
    ['确保登录、匹配、排队、房间和同步链路稳定', { competitiveShooter: 2, coopSurvival: 2 }],
    ['确保活动、奖励、卡池、支付和补偿链路跑通', { cardCollection: 3, casualPuzzleMobile: 1 }],
    ['确保 UGC、审核、分享和热门列表不会堵住', { sandboxSocial: 3 }],
  ],
  [
    ['保留叙事、关卡、镜头和探索路线经验', { narrativeAdventure: 3, openWorldRpg: 1 }],
    ['保留联机、匹配、回放和稳定性经验', { competitiveShooter: 2, coopSurvival: 2 }],
    ['保留数值、经济、活动和长期内容经验', { strategySimulation: 2, cardCollection: 2 }],
    ['保留手感、判定、速度和挑战节奏经验', { actionFighting: 2, sportsRacing: 2 }],
  ],
]

const prompts = {
  prototype: [
    '刚开始搭原型时，你最想先验证哪种感觉？',
    '第一版能跑起来后，你会优先盯哪一块？',
    '给同事试玩前，你最希望它已经像个游戏的地方是？',
    '如果只能先打磨一个核心瞬间，你会选？',
    '原型里最不能糊弄过去的体验是？',
  ],
  pipeline: [
    '项目结构开始成形，你会先整理哪条管线？',
    '资源和配置越来越多，你最想先规范什么？',
    '你会先做哪种内部小工具让大家少踩坑？',
    '跨身份协作开始变多，你最想把哪件事说清楚？',
    '版本迭代变快后，你会先稳住哪条链路？',
  ],
  content: [
    '内容开始扩展时，你最想加哪类变化？',
    '玩法第二层乐趣要出现了，你更想推哪一边？',
    '玩家开始熟悉规则后，你想给他们什么新鲜感？',
    '如果要做一批新内容，你更愿意围绕什么组织？',
    '中期版本最需要长出来的东西是？',
  ],
  testing: [
    '第一次大规模测试，你最想先看哪类信号？',
    '有人反馈有点看不懂，你会先排查什么？',
    '性能或稳定性开始告警，你会先盯哪里？',
    '平衡和体验不稳时，你更相信哪类证据？',
    '测试报告里最让你坐直的内容是？',
  ],
  launch: [
    '上线前最后一轮检查，你最想确认什么？',
    '首发当天最怕哪条链路出问题？',
    '上线后的第一周，你最愿意维护哪种日常？',
    '如果玩家突然变多，你最希望哪块最稳？',
    '版本活动开始滚动后，你最关心什么？',
  ],
  retrospective: [
    '复盘时，你最想保留哪种项目味道？',
    '下个项目从零开始，你最想复用哪套经验？',
    '归档文档里，你最想把哪件事写清楚？',
    '如果别人接手项目，你最想提醒他注意什么？',
    '项目结束那天，你最想听到哪句反馈？',
  ],
}

export function buildRoleQuestions(roleName, angleWords) {
  return stages.flatMap((stage, stageIndex) =>
    prompts[stage].flatMap((prompt, promptIndex) => {
      const set = optionSets[(stageIndex + promptIndex) % optionSets.length]
      const base = `${roleName}视角：${prompt}${angleWords[stage][promptIndex]}`
      const pairs = [
        [set[0], set[1]],
        [set[2], set[3]],
      ]
      return pairs.map(([poleA, poleB], pairIndex) => {
        const [labelA] = poleA
        const [labelB] = poleB
        const suffix = pairIndex === 0 ? '' : ' · 对照二'
        return {
          stage,
          category: stageLabels[stage],
          text: `${base}${suffix}\n\nA：${labelA}\nB：${labelB}`,
          options: expandSpectrumOption(poleA, poleB),
        }
      })
    }),
  )
}
