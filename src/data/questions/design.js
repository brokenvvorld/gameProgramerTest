import { createQuestions } from './factory.js'

const stems = {
  prototype: ['最早的玩法原型，你先验证？', '第一局结束后，玩家最好记住？', '规则还很少时，你最想看？', '如果要砍掉一个复杂系统，你保留？', '试玩反馈里你最关心？'],
  pipeline: ['配置表先整理？', '关卡模板先支持？', '和程序对需求时先说清？', '数值调试工具先要？', '版本需求池先分类？'],
  content: ['新内容先加？', '第二层乐趣来自？', '玩家熟练后给什么变化？', '中期版本最该补？', '长期内容靠什么续？'],
  testing: ['内测数据先看？', '玩家看不懂时先改？', '平衡会先讨论？', '失败率异常先查？', '录像里最值得暂停的是？'],
  launch: ['上线前最该锁定？', '首发活动先保护？', '第一周最该调？', '玩家变多后最怕？', '赛季节奏先排？'],
  retrospective: ['复盘最想保留？', '下个项目先复用？', '文档最该写清？', '如果重来先做？', '最想听到反馈？'],
}

const options = [
  [['玩家能自然进入故事和场景目标', { narrativeAdventure: 3 }], ['玩家能自由探索和成长', { openWorldRpg: 3 }], ['玩家能快速理解胜负和对抗', { competitiveShooter: 3 }], ['玩家能一局轻松再来', { casualPuzzleMobile: 3 }]],
  [['资源压力和队友分工', { coopSurvival: 3 }], ['经济循环和策略推演', { strategySimulation: 3 }], ['角色收集和阵容构筑', { cardCollection: 3 }], ['操作练习和挑战上限', { actionFighting: 2, sportsRacing: 1 }]],
  [['支线、谜题和演出变化', { narrativeAdventure: 3 }], ['装备、Build 和世界事件', { openWorldRpg: 3 }], ['武器、地图和赛季目标', { competitiveShooter: 3 }], ['UGC 规则和好友玩法', { sandboxSocial: 3 }]],
  [['关卡失败率和新手流失', { casualPuzzleMobile: 3 }], ['胜率、热区和击败分布', { competitiveShooter: 3 }], ['产出消耗和单位克制', { strategySimulation: 3 }], ['抽取价值和活动参与', { cardCollection: 3 }]],
  [['主线情绪点稳定出现', { narrativeAdventure: 3 }], ['匹配、公平和赛季奖励', { competitiveShooter: 3 }], ['日常、活动和回访目标', { cardCollection: 2, casualPuzzleMobile: 2 }], ['房间、分享和社区挑战', { sandboxSocial: 3 }]],
  [['玩家记住一个地点', { narrativeAdventure: 3 }], ['玩家讨论一套打法', { strategySimulation: 2, openWorldRpg: 1 }], ['玩家喊朋友再来一局', { coopSurvival: 2, sandboxSocial: 1 }], ['玩家为了操作进步练习', { actionFighting: 2, sportsRacing: 2 }]],
]

export const designQuestions = createQuestions(
  Object.entries(stems).flatMap(([stage, texts], stageIndex) =>
    texts.flatMap((text, index) => {
      const opts = options[(stageIndex + index) % options.length]
      return [
        [stage, text, [opts[0], opts[1]]],
        [stage, `${text} · 对照二`, [opts[2], opts[3]]],
      ]
    }),
  ),
)
