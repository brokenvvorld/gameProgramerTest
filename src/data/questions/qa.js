import { createQuestions } from './factory.js'

const texts = {
  prototype: ['最早开测，你先冲哪条路？', '第一版最可能藏 bug 的是？', '如果只能写一组用例，你写？', '玩家乱操作时先测？', 'Demo 交付前最怕？'],
  pipeline: ['测试用例先分类？', '提单模板先要求？', '自动化先覆盖？', '版本回归先守？', '跨部门信息先补？'],
  content: ['新内容最该先测？', '组合爆炸从哪开始？', '新手和老玩家都要测什么？', '活动内容最怕？', '长期版本最该留意？'],
  testing: ['内测当天先看？', '偶现问题先收集？', '玩家说不公平先查？', '数据和录像冲突时？', '最优先级问题是？'],
  launch: ['上线前最后一轮先跑？', '首发当天最怕？', '第一周最该盯？', '活动开关最怕？', '高峰时先测？'],
  retrospective: ['复盘最想沉淀？', '下次先复用？', '文档最该补？', '如果重来先做？', '最想听到哪句？'],
}

const sets = [
  [['主线、存档、触发和场景边界', { narrativeAdventure: 3 }], ['开放世界边界、任务状态和背包', { openWorldRpg: 3 }], ['匹配、命中、结算和反作弊', { competitiveShooter: 3 }], ['房间、掉线、掉落和队友状态', { coopSurvival: 3 }]],
  [['经济循环、AI 决策和胜利条件', { strategySimulation: 3 }], ['关卡失败、奖励领取和弱网恢复', { casualPuzzleMobile: 3 }], ['抽卡、养成、补偿和活动材料', { cardCollection: 3 }], ['排行榜、赛道和回放成绩', { sportsRacing: 3 }]],
  [['动作判定、硬直、取消和 Boss 预警', { actionFighting: 3 }], ['UGC 上传、审核、分享和房间规则', { sandboxSocial: 3 }], ['剧情分支和提示遗漏', { narrativeAdventure: 3 }], ['地图加载和资源刷取', { openWorldRpg: 3 }]],
  [['崩溃、卡死、坏档和错账', { openWorldRpg: 1, cardCollection: 2 }], ['延迟、回滚和异常击败', { competitiveShooter: 3 }], ['奖励错发和活动时间错误', { cardCollection: 3 }], ['玩家作品导致的异常状态', { sandboxSocial: 3 }]],
  [['“幸好这个上线前测出来了”', { cardCollection: 1, openWorldRpg: 1, competitiveShooter: 1 }], ['“这个复现步骤太清楚了”', { strategySimulation: 1, coopSurvival: 1, sandboxSocial: 1 }], ['“这个手感问题终于定位了”', { actionFighting: 2, sportsRacing: 1 }], ['“这个新手卡点被抓到了”', { casualPuzzleMobile: 2, narrativeAdventure: 1 }]],
]

export const qaQuestions = createQuestions(
  Object.entries(texts).flatMap(([stage, list], stageIndex) =>
    list.flatMap((text, index) => {
      const opts = sets[(stageIndex + index) % sets.length]
      return [
        [stage, text, [opts[0], opts[1]]],
        [stage, `${text} · 对照二`, [opts[2], opts[3]]],
      ]
    }),
  ),
)
