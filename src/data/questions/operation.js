import { createQuestions } from './factory.js'

const stageTexts = {
  prototype: ['还没上线时，你先判断它有没有？', '第一批玩家进来后，你最想观察？', '如果要做预热，你会抓？', 'Demo 传播点最像？', '早期社群最该聊？'],
  pipeline: ['活动配置先规范？', '公告和素材先准备？', '数据看板先做？', '补偿流程先跑？', '版本日历先排？'],
  content: ['新版本主打？', '活动奖励围绕？', '玩家回流靠？', '社区话题靠？', '长期运营先养？'],
  testing: ['灰度时先看？', '评论区异常先查？', '活动数据先比？', '玩家投诉集中在？', '留存波动先怀疑？'],
  launch: ['首发最该保证？', '第一天最怕？', '第一周最该推？', '高峰时先盯？', '节日活动先看？'],
  retrospective: ['复盘最想留下？', '下次活动先复用？', '玩家画像最有用？', '如果重来先准备？', '最想看到反馈？'],
}

const optionSets = [
  [['能被截图传播的场景或角色', { narrativeAdventure: 2, cardCollection: 1 }], ['能反复挑战的对局目标', { competitiveShooter: 3 }], ['能每天回来领和推进的奖励', { casualPuzzleMobile: 2, cardCollection: 2 }], ['能拉朋友一起玩的房间规则', { sandboxSocial: 3 }]],
  [['赛季任务、段位和外观', { competitiveShooter: 3 }], ['卡池、角色活动和养成材料', { cardCollection: 3 }], ['世界事件和合作目标', { coopSurvival: 2, openWorldRpg: 1 }], ['排行榜、赛事和限时挑战', { sportsRacing: 3 }]],
  [['日留、关卡失败率和奖励领取', { casualPuzzleMobile: 3 }], ['活动参与、付费和补偿领取', { cardCollection: 3 }], ['匹配时长、在线峰值和胜率', { competitiveShooter: 3 }], ['分享、创作和社区互动', { sandboxSocial: 3 }]],
  [['主线完成和剧情讨论', { narrativeAdventure: 3 }], ['探索进度和版本回流', { openWorldRpg: 3 }], ['经济策略和长线目标', { strategySimulation: 3 }], ['队友招募和合作故事', { coopSurvival: 3 }]],
  [['“我又回来打了一局”', { competitiveShooter: 2, sportsRacing: 1 }], ['“这次活动奖励挺香”', { cardCollection: 2, casualPuzzleMobile: 1 }], ['“这个房间适合朋友局”', { sandboxSocial: 3 }], ['“这个世界又更新了”', { openWorldRpg: 3 }]],
]

export const operationQuestions = createQuestions(
  Object.entries(stageTexts).flatMap(([stage, texts], stageIndex) =>
    texts.flatMap((text, index) => {
      const opts = optionSets[(stageIndex + index) % optionSets.length]
      return [
        [stage, text, [opts[0], opts[1]]],
        [stage, `${text} · 对照二`, [opts[2], opts[3]]],
      ]
    }),
  ),
)
