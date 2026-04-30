import { createQuestions } from './factory.js'

const rows = [
  ['prototype', '第一版服务端先跑通什么，你会比较安心？', [
    ['房间创建、邀请和重连不丢状态', { coopSurvival: 3, sandboxSocial: 1 }],
    ['匹配、开局、击败和结算闭环稳定', { competitiveShooter: 3 }],
  ]],
  ['prototype', '第一版服务端先跑通什么，你会比较安心？ · 对照二', [
    ['任务、存档和地图切换状态可恢复', { openWorldRpg: 3, narrativeAdventure: 1 }],
    ['奖励、背包、卡池和补偿账目准确', { cardCollection: 3 }],
  ]],
  ['prototype', '还没压测前，你最想先证明哪件事？', [
    ['10 人房间状态同步能稳住', { coopSurvival: 3 }],
    ['高频对局消息不会互相踩', { competitiveShooter: 3 }],
  ]],
  ['prototype', '还没压测前，你最想先证明哪件事？ · 对照二', [
    ['资源生产和 AI Tick 能持续跑', { strategySimulation: 3 }],
    ['玩家作品上传后能被正确读取', { sandboxSocial: 3 }],
  ]],
  ['prototype', '你会先给哪条链路加日志？', [
    ['登录、排队和断线重连', { competitiveShooter: 2, coopSurvival: 2 }],
    ['支付、发奖和补偿', { cardCollection: 3 }],
  ]],
  ['prototype', '你会先给哪条链路加日志？ · 对照二', [
    ['任务状态和存档回滚', { narrativeAdventure: 2, openWorldRpg: 2 }],
    ['排行榜、赛程和成绩记录', { sportsRacing: 3 }],
  ]],
  ['prototype', '临时数据库里最不能乱的是？', [
    ['玩家当前位置、任务和背包', { openWorldRpg: 3 }],
    ['房间成员、队伍和掉落归属', { coopSurvival: 3 }],
  ]],
  ['prototype', '临时数据库里最不能乱的是？ · 对照二', [
    ['段位、胜负和异常对局', { competitiveShooter: 3 }],
    ['抽卡记录、稀有度和养成材料', { cardCollection: 3 }],
  ]],
  ['prototype', '第一个服务端工具，你更想做？', [
    ['房间状态查看器', { coopSurvival: 2, sandboxSocial: 2 }],
    ['对局回放和战斗日志查询', { competitiveShooter: 3 }],
  ]],
  ['prototype', '第一个服务端工具，你更想做？ · 对照二', [
    ['经济循环模拟器', { strategySimulation: 3 }],
    ['活动奖励试算器', { cardCollection: 2, casualPuzzleMobile: 1 }],
  ]],
  ['pipeline', '协议开始变多，你会先规范？', [
    ['战斗消息和命中确认', { competitiveShooter: 3 }],
    ['任务、地图和存档字段', { openWorldRpg: 3 }],
  ]],
  ['pipeline', '协议开始变多，你会先规范？ · 对照二', [
    ['活动、奖励和邮件字段', { cardCollection: 3 }],
    ['作品、房间和分享字段', { sandboxSocial: 3 }],
  ]],
  ['pipeline', '配置表上线前，你最想自动校验？', [
    ['掉落概率和奖励上限', { cardCollection: 2, coopSurvival: 1 }],
    ['单位产出、消耗和科技树依赖', { strategySimulation: 3 }],
  ]],
  ['pipeline', '配置表上线前，你最想自动校验？ · 对照二', [
    ['地图点位、模式和胜利条件', { competitiveShooter: 3 }],
    ['每日任务、关卡和体力消耗', { casualPuzzleMobile: 3 }],
  ]],
  ['pipeline', '你最想和客户端约定哪种兜底？', [
    ['延迟和预测失败时怎么回滚', { competitiveShooter: 3 }],
    ['掉线重连后玩家回到哪里', { coopSurvival: 2, openWorldRpg: 2 }],
  ]],
  ['pipeline', '你最想和客户端约定哪种兜底？ · 对照二', [
    ['奖励发放失败怎么补发', { cardCollection: 3 }],
    ['UGC 审核失败怎么提示', { sandboxSocial: 3 }],
  ]],
  ['pipeline', '内部后台先做哪个入口？', [
    ['玩家状态和存档查询', { openWorldRpg: 3 }],
    ['对局异常和封禁查询', { competitiveShooter: 3 }],
  ]],
  ['pipeline', '内部后台先做哪个入口？ · 对照二', [
    ['活动开关和奖励补偿', { cardCollection: 3 }],
    ['作品审核和推荐池', { sandboxSocial: 3 }],
  ]],
  ['pipeline', '多环境发布时，你最怕？', [
    ['测试服配置漏到正式服', { cardCollection: 2, strategySimulation: 1 }],
    ['协议版本和客户端不匹配', { competitiveShooter: 2, coopSurvival: 1 }],
  ]],
  ['pipeline', '多环境发布时，你最怕？ · 对照二', [
    ['数据库迁移影响旧存档', { openWorldRpg: 3 }],
    ['排行榜和赛季时间算错', { sportsRacing: 2, competitiveShooter: 1 }],
  ]],
]

const base = [
  ['content', '新内容接入时，服务端最该先支持？'],
  ['content', '玩家行为开始复杂后，你想扩展？'],
  ['content', '长期版本里最需要抽象成规则的是？'],
  ['content', '新赛季来了，你先加哪类能力？'],
  ['content', '内容越多，越需要守住？'],
  ['testing', '压测第一轮你最关注？'],
  ['testing', '线上偶现问题，你先找？'],
  ['testing', '数据异常时，你先怀疑？'],
  ['testing', '回归测试最不能漏？'],
  ['testing', '监控报警里最刺眼的是？'],
  ['launch', '上线前最后检查？'],
  ['launch', '首发当天最怕？'],
  ['launch', '第一周维护重点？'],
  ['launch', '活动高峰时先看？'],
  ['launch', '玩家变多后最要稳？'],
  ['retrospective', '复盘最想沉淀？'],
  ['retrospective', '下次最想复用？'],
  ['retrospective', '交接最该写清？'],
  ['retrospective', '如果重来会提前做？'],
  ['retrospective', '最想听到哪句反馈？'],
]

const optionSets = [
  [
    ['房间、队伍和掉线恢复', { coopSurvival: 3 }],
    ['匹配、段位和反作弊', { competitiveShooter: 3 }],
    ['经济、产出和消耗', { strategySimulation: 3 }],
    ['活动、卡池和补偿', { cardCollection: 3 }],
  ],
  [
    ['世界状态和任务回滚', { openWorldRpg: 3 }],
    ['排行榜和赛事记录', { sportsRacing: 3 }],
    ['作品上传和审核流转', { sandboxSocial: 3 }],
    ['关卡奖励和日常刷新', { casualPuzzleMobile: 3 }],
  ],
]

base.forEach(([stage, text], index) => {
  const opts = optionSets[index % 2]
  rows.push([stage, text, [opts[0], opts[1]]], [stage, `${text} · 对照二`, [opts[2], opts[3]]])
})

export const serverQuestions = createQuestions(rows)
