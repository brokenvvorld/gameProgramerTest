import { createQuestions } from './factory.js'

const texts = {
  prototype: ['第一张概念图，你最想先定？', '粗模阶段最不能缺？', '第一版角色出现时，重点是？', '场景还没细化时，先看？', '视觉 Demo 最该让人记住？'],
  pipeline: ['美术规范先写？', '资产命名先管？', '和客户端交接先约定？', '特效模板先做？', '版本资源最怕？'],
  content: ['新角色先设计？', '新场景先强调？', '新活动包装先抓？', '皮肤扩展先守住？', '大量内容最怕？'],
  testing: ['视觉可读性先看？', '玩家说看不清，你先查？', '性能压力来自？', '截图验收重点？', '战斗画面最怕？'],
  launch: ['上线前视觉最怕？', '首发宣传图先保？', '活动更新先保？', '玩家截图最希望出现？', '版本频繁时先稳？'],
  retrospective: ['复盘最想保留？', '下次最想复用？', '规范里最该补？', '如果重来先做？', '最想听到反馈？'],
}

const sets = [
  [['场景光影、镜头和环境叙事', { narrativeAdventure: 3 }], ['世界地貌、地标和探索轮廓', { openWorldRpg: 3 }], ['角色剪影、技能色彩和稀有感', { cardCollection: 3 }], ['按钮、方块和奖励动效的愉快感', { casualPuzzleMobile: 3 }]],
  [['敌我识别、枪口火光和地图标识', { competitiveShooter: 3 }], ['怪物轮廓、资源图标和营地氛围', { coopSurvival: 3 }], ['单位图标、建筑层级和信息可读性', { strategySimulation: 3 }], ['赛车速度线、赛道标识和冲线镜头', { sportsRacing: 3 }]],
  [['动作姿态、受击反馈和 Boss 压迫感', { actionFighting: 3 }], ['UGC 素材、头像框和广场封面', { sandboxSocial: 3 }], ['剧情道具、表情和小演出', { narrativeAdventure: 3 }], ['装备外观、地图区域和世界事件', { openWorldRpg: 3 }]],
  [['卡面、立绘和抽卡演出', { cardCollection: 3 }], ['消除反馈、关卡主题和奖励弹窗', { casualPuzzleMobile: 3 }], ['竞技皮肤、击败特效和赛季包装', { competitiveShooter: 3 }], ['派对道具、表情和分享图', { sandboxSocial: 3 }]],
  [['“这个角色我想抽”', { cardCollection: 3 }], ['“这个地方我想截图”', { narrativeAdventure: 2, openWorldRpg: 1 }], ['“这招看起来太爽了”', { actionFighting: 3 }], ['“这张图适合发给朋友”', { sandboxSocial: 3 }]],
]

export const artQuestions = createQuestions(
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
