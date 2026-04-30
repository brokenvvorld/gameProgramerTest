import { createQuestions } from './factory.js'

export const clientQuestions = createQuestions([
  ['prototype', '第一个可玩版本里，你最想先把哪种手感跑顺？', [
    ['镜头跟随、交互提示和场景触发都不打架', { narrativeAdventure: 3, openWorldRpg: 1 }],
    ['移动、开火、受击和命中反馈一按就有回应', { competitiveShooter: 3, actionFighting: 1 }],
  ]],
  ['prototype', '第一个可玩版本里，你最想先把哪种手感跑顺？ · 对照二', [
    ['点击、拖拽、合成和奖励弹出都轻快', { casualPuzzleMobile: 3 }],
    ['建造、拾取、背包和队友标记不卡手', { coopSurvival: 3 }],
  ]],
  ['prototype', '临时资源还很粗糙时，你会先保护哪一块体验？', [
    ['玩家能看懂自己该往哪里走', { narrativeAdventure: 3 }],
    ['角色动作和技能释放别有迟钝感', { actionFighting: 3 }],
  ]],
  ['prototype', '临时资源还很粗糙时，你会先保护哪一块体验？ · 对照二', [
    ['UI 按钮和状态变化要清楚', { casualPuzzleMobile: 2, cardCollection: 1 }],
    ['地图加载和远近景切换不要突然断片', { openWorldRpg: 3 }],
  ]],
  ['prototype', '你会先给 Demo 接哪种调试显示？', [
    ['交互范围、触发器和镜头点位', { narrativeAdventure: 3 }],
    ['延迟、命中盒、弹道和帧率', { competitiveShooter: 3 }],
  ]],
  ['prototype', '你会先给 Demo 接哪种调试显示？ · 对照二', [
    ['资源刷新、怪物仇恨和队友位置', { coopSurvival: 3 }],
    ['关卡步数、奖励弹窗和失败节点', { casualPuzzleMobile: 3 }],
  ]],
  ['prototype', '如果只允许先优化一个输入设备，你会选？', [
    ['手柄的移动、震动和镜头控制', { sportsRacing: 2, actionFighting: 2 }],
    ['键鼠瞄准、切枪和快捷键反馈', { competitiveShooter: 3 }],
  ]],
  ['prototype', '如果只允许先优化一个输入设备，你会选？ · 对照二', [
    ['触屏点击、滑动和误触处理', { casualPuzzleMobile: 3, cardCollection: 1 }],
    ['多人房间里的快捷沟通和标记', { coopSurvival: 2, sandboxSocial: 2 }],
  ]],
  ['prototype', '第一版场景跑起来后，哪个问题最让你想立刻修？', [
    ['玩家走到边界时镜头穿帮', { narrativeAdventure: 2, openWorldRpg: 2 }],
    ['开火命中了但反馈慢半拍', { competitiveShooter: 3 }],
  ]],
  ['prototype', '第一版场景跑起来后，哪个问题最让你想立刻修？ · 对照二', [
    ['按钮文字和奖励弹窗挤在一起', { casualPuzzleMobile: 3 }],
    ['角色连招过程中被动画卡住', { actionFighting: 3 }],
  ]],
  ['pipeline', '资源越来越多时，你最想先整理哪条客户端管线？', [
    ['场景触发、镜头动画和剧情表现', { narrativeAdventure: 3 }],
    ['角色动作、特效、受击和技能表现', { actionFighting: 2, cardCollection: 2 }],
  ]],
  ['pipeline', '资源越来越多时，你最想先整理哪条客户端管线？ · 对照二', [
    ['武器表现、命中特效和地图标识', { competitiveShooter: 3 }],
    ['关卡 UI、奖励动效和移动端适配', { casualPuzzleMobile: 3 }],
  ]],
  ['pipeline', '你会先做哪种编辑器预览？', [
    ['在编辑器里直接看任务触发和演出顺序', { narrativeAdventure: 3 }],
    ['实时看角色技能、稀有度特效和卡面状态', { cardCollection: 3 }],
  ]],
  ['pipeline', '你会先做哪种编辑器预览？ · 对照二', [
    ['预览房间 UI、邀请流程和 UGC 卡片', { sandboxSocial: 3 }],
    ['预览赛道镜头、速度线和冲线反馈', { sportsRacing: 3 }],
  ]],
  ['pipeline', '客户端和服务器对接口时，你最想先约定清楚？', [
    ['任务状态、存档点和地图切换', { openWorldRpg: 3, narrativeAdventure: 1 }],
    ['命中、伤害、回滚和结算归属', { competitiveShooter: 3 }],
  ]],
  ['pipeline', '客户端和服务器对接口时，你最想先约定清楚？ · 对照二', [
    ['房间、掉线重连和队友同步', { coopSurvival: 3 }],
    ['活动、卡池、奖励和补偿展示', { cardCollection: 3 }],
  ]],
  ['pipeline', '为了减少返工，你最想给美术一个什么规范？', [
    ['场景碰撞、可交互物和镜头遮挡规范', { narrativeAdventure: 2, openWorldRpg: 2 }],
    ['角色动作切分、特效挂点和受击方向', { actionFighting: 3 }],
  ]],
  ['pipeline', '为了减少返工，你最想给美术一个什么规范？ · 对照二', [
    ['技能演出、立绘尺寸和卡面层级', { cardCollection: 3 }],
    ['车辆材质、赛道标识和转播镜头层级', { sportsRacing: 3 }],
  ]],
  ['pipeline', '版本变多后，你最想自动检查什么？', [
    ['资源引用丢失和场景触发断链', { narrativeAdventure: 3 }],
    ['低端机帧率、内存和包体增量', { casualPuzzleMobile: 3, cardCollection: 1 }],
  ]],
  ['pipeline', '版本变多后，你最想自动检查什么？ · 对照二', [
    ['地图碰撞、出生点和命中配置', { competitiveShooter: 3 }],
    ['UGC 模板、缩略图和分享预览', { sandboxSocial: 3 }],
  ]],
  ['content', '加新内容时，你最愿意先接哪类表现？', [
    ['一段新的环境演出和支线触发', { narrativeAdventure: 3 }],
    ['一个新英雄的技能表现和命中反馈', { competitiveShooter: 2, cardCollection: 2 }],
  ]],
  ['content', '加新内容时，你最愿意先接哪类表现？ · 对照二', [
    ['一批新关卡的目标、失败和奖励表现', { casualPuzzleMobile: 3 }],
    ['一个新 Boss 的动作、预警和受击反馈', { actionFighting: 3 }],
  ]],
  ['content', '内容膨胀后，你最想避免哪种客户端灾难？', [
    ['开放世界加载到处卡一下', { openWorldRpg: 3 }],
    ['特效太多导致对抗中看不清', { competitiveShooter: 2, actionFighting: 2 }],
  ]],
  ['content', '内容膨胀后，你最想避免哪种客户端灾难？ · 对照二', [
    ['活动入口和红点把首页挤爆', { cardCollection: 2, casualPuzzleMobile: 2 }],
    ['玩家作品太多但预览加载很慢', { sandboxSocial: 3 }],
  ]],
  ['content', '新玩法要快速迭代，你更喜欢哪种接入方式？', [
    ['配置驱动关卡，不用每次改代码', { casualPuzzleMobile: 3, strategySimulation: 1 }],
    ['组件化交互物，能拼探索场景', { narrativeAdventure: 2, openWorldRpg: 2 }],
  ]],
  ['content', '新玩法要快速迭代，你更喜欢哪种接入方式？ · 对照二', [
    ['统一技能表现框架，角色可快速扩展', { cardCollection: 2, actionFighting: 2 }],
    ['房间规则和 UI 模板能自由组合', { sandboxSocial: 3 }],
  ]],
  ['content', '玩家玩熟后，客户端最该增强哪种新鲜感？', [
    ['新的场景氛围和镜头段落', { narrativeAdventure: 3 }],
    ['新的操作技巧和反馈层次', { actionFighting: 3, sportsRacing: 1 }],
  ]],
  ['content', '玩家玩熟后，客户端最该增强哪种新鲜感？ · 对照二', [
    ['新的赛季界面、击败展示和外观', { competitiveShooter: 3 }],
    ['新的收集展示、角色入场和养成动效', { cardCollection: 3 }],
  ]],
  ['content', '你最愿意长期维护哪类内容表现？', [
    ['地图探索和任务演出', { openWorldRpg: 3 }],
    ['多人大厅和赛季界面', { competitiveShooter: 3 }],
  ]],
  ['content', '你最愿意长期维护哪类内容表现？ · 对照二', [
    ['活动、卡池和角色展示', { cardCollection: 3 }],
    ['创作工具和作品广场', { sandboxSocial: 3 }],
  ]],
  ['testing', '内测时客户端最该先看哪类数据？', [
    ['玩家在哪些场景卡住或漏交互', { narrativeAdventure: 3 }],
    ['帧率、延迟、命中反馈和输入延迟', { competitiveShooter: 3 }],
  ]],
  ['testing', '内测时客户端最该先看哪类数据？ · 对照二', [
    ['触屏误触、加载时长和弱网恢复', { casualPuzzleMobile: 3 }],
    ['战斗动作取消、受击和 Boss 预警可读性', { actionFighting: 3 }],
  ]],
  ['testing', '有人说看不懂，你会先查？', [
    ['目标提示和镜头引导是否明显', { narrativeAdventure: 3 }],
    ['敌我识别、弹道方向和击败信息', { competitiveShooter: 3 }],
  ]],
  ['testing', '有人说看不懂，你会先查？ · 对照二', [
    ['资源产出、单位状态和 UI 层级', { strategySimulation: 3 }],
    ['卡牌技能、稀有度和阵容信息', { cardCollection: 3 }],
  ]],
  ['testing', '性能突然掉下去，你会先怀疑？', [
    ['大地图流式加载和 NPC 数量', { openWorldRpg: 3 }],
    ['粒子、命中特效和复杂动作状态', { actionFighting: 2, competitiveShooter: 2 }],
  ]],
  ['testing', '性能突然掉下去，你会先怀疑？ · 对照二', [
    ['UI 列表、活动图和卡面资源', { cardCollection: 2, casualPuzzleMobile: 2 }],
    ['玩家作品缩略图和广场刷新', { sandboxSocial: 3 }],
  ]],
  ['testing', '你最想让测试提供哪种附件？', [
    ['带时间点的录像和操作路径', { narrativeAdventure: 2, actionFighting: 2 }],
    ['网络环境、延迟曲线和回放文件', { competitiveShooter: 3 }],
  ]],
  ['testing', '你最想让测试提供哪种附件？ · 对照二', [
    ['机型、包体版本和资源加载日志', { casualPuzzleMobile: 3 }],
    ['房间号、玩家作品 ID 和审核状态', { sandboxSocial: 3 }],
  ]],
  ['testing', '修完 bug 后，你最想先回归哪条路径？', [
    ['新手引导到第一个存档点', { narrativeAdventure: 3 }],
    ['匹配到结算的一整局', { competitiveShooter: 3 }],
  ]],
  ['testing', '修完 bug 后，你最想先回归哪条路径？ · 对照二', [
    ['打开活动、领奖、失败重试', { casualPuzzleMobile: 2, cardCollection: 2 }],
    ['创建房间、邀请好友、分享作品', { sandboxSocial: 3 }],
  ]],
  ['launch', '上线前最后一天，你最怕客户端哪块翻车？', [
    ['存档、场景切换和关键剧情触发', { narrativeAdventure: 2, openWorldRpg: 2 }],
    ['登录后进大厅、匹配和结算界面', { competitiveShooter: 3 }],
  ]],
  ['launch', '上线前最后一天，你最怕客户端哪块翻车？ · 对照二', [
    ['活动入口、支付返回和奖励弹窗', { cardCollection: 3 }],
    ['低端机发热、闪退和包体过大', { casualPuzzleMobile: 3 }],
  ]],
  ['launch', '首周热修时，你最希望改动集中在哪？', [
    ['文案、提示和镜头参数', { narrativeAdventure: 3 }],
    ['UI 配置、活动图和奖励展示', { cardCollection: 2, casualPuzzleMobile: 2 }],
  ]],
  ['launch', '首周热修时，你最希望改动集中在哪？ · 对照二', [
    ['武器反馈、准星和击败信息', { competitiveShooter: 3 }],
    ['UGC 模板、广场展示和分享卡片', { sandboxSocial: 3 }],
  ]],
  ['launch', '玩家量突然上来，你最先盯？', [
    ['加载排队和进图稳定性', { openWorldRpg: 2, competitiveShooter: 1 }],
    ['大厅、房间和队伍列表刷新', { coopSurvival: 2, sandboxSocial: 2 }],
  ]],
  ['launch', '玩家量突然上来，你最先盯？ · 对照二', [
    ['商城、活动和奖励弹窗表现', { cardCollection: 3 }],
    ['排行榜、回放和赛事页面', { sportsRacing: 2, competitiveShooter: 1 }],
  ]],
  ['launch', '活动版本频繁更新，你想把哪块做成模板？', [
    ['活动页、奖励领取和倒计时', { casualPuzzleMobile: 2, cardCollection: 2 }],
    ['赛季任务、通行证和外观展示', { competitiveShooter: 3 }],
  ]],
  ['launch', '活动版本频繁更新，你想把哪块做成模板？ · 对照二', [
    ['世界事件入口和任务提示', { openWorldRpg: 2, coopSurvival: 1 }],
    ['玩家作品专题和推荐位', { sandboxSocial: 3 }],
  ]],
  ['launch', '上线后最让你放心的反馈是？', [
    ['“这个地方走起来很舒服”', { narrativeAdventure: 3 }],
    ['“枪和移动都很跟手”', { competitiveShooter: 3 }],
  ]],
  ['launch', '上线后最让你放心的反馈是？ · 对照二', [
    ['“点起来很顺，不累”', { casualPuzzleMobile: 3 }],
    ['“连招终于不卡手了”', { actionFighting: 3 }],
  ]],
  ['retrospective', '复盘时你最想沉淀哪类客户端经验？', [
    ['镜头、触发、存档和探索动线', { narrativeAdventure: 3 }],
    ['大地图加载、任务状态和资源管理', { openWorldRpg: 3 }],
  ]],
  ['retrospective', '复盘时你最想沉淀哪类客户端经验？ · 对照二', [
    ['命中反馈、延迟表现和回放工具', { competitiveShooter: 3 }],
    ['UI 模板、活动入口和移动适配', { casualPuzzleMobile: 2, cardCollection: 1 }],
  ]],
  ['retrospective', '下个项目你最想复用哪套基础？', [
    ['交互组件和演出时间线', { narrativeAdventure: 3 }],
    ['技能表现和动作状态机', { actionFighting: 2, cardCollection: 2 }],
  ]],
  ['retrospective', '下个项目你最想复用哪套基础？ · 对照二', [
    ['大厅、房间和同步表现', { competitiveShooter: 2, coopSurvival: 2 }],
    ['创作工具和作品预览', { sandboxSocial: 3 }],
  ]],
  ['retrospective', '交接文档里你最想写清楚？', [
    ['哪些表现由配置控制，哪些必须改代码', { strategySimulation: 1, casualPuzzleMobile: 2 }],
    ['角色动作、特效和技能事件怎么对齐', { actionFighting: 3 }],
  ]],
  ['retrospective', '交接文档里你最想写清楚？ · 对照二', [
    ['联机状态和 UI 状态怎么排查', { competitiveShooter: 2, coopSurvival: 2 }],
    ['资源加载、卸载和包体规则', { openWorldRpg: 2, cardCollection: 1 }],
  ]],
  ['retrospective', '如果重来一次，你会更早做什么？', [
    ['自动化资源检查', { casualPuzzleMobile: 1, cardCollection: 2 }],
    ['性能预算和低端机基线', { openWorldRpg: 1, competitiveShooter: 2 }],
  ]],
  ['retrospective', '如果重来一次，你会更早做什么？ · 对照二', [
    ['调试面板和录像回放', { competitiveShooter: 2, actionFighting: 1 }],
    ['UI 模板和组件库', { casualPuzzleMobile: 2, sandboxSocial: 1 }],
  ]],
  ['retrospective', '项目结束那天，哪句评价最像奖励？', [
    ['“这个场景我还记得。”', { narrativeAdventure: 3 }],
    ['“操作很准，输赢服气。”', { competitiveShooter: 3 }],
  ]],
  ['retrospective', '项目结束那天，哪句评价最像奖励？ · 对照二', [
    ['“这个角色出场真好看。”', { cardCollection: 3 }],
    ['“朋友做的图我一眼就能打开。”', { sandboxSocial: 3 }],
  ]],
])
