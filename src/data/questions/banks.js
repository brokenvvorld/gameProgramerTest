import { dimensionOrder } from '../dimensions.js'

function item(text, keyedDirection, tags, optionalPromptGroup) {
  return { text, keyedDirection, tags, optionalPromptGroup, weight: 1 }
}

function createRoleBank(roleKey, groups) {
  return dimensionOrder.flatMap((dimension) =>
    groups[dimension].map((entry, index) => ({
      id: `${roleKey}-${dimension}-${index + 1}`,
      role: roleKey,
      dimension,
      text: entry.text,
      keyedDirection: entry.keyedDirection,
      weight: entry.weight,
      tags: entry.tags,
      optionalPromptGroup: entry.optionalPromptGroup,
    })),
  )
}

export const questionBanks = {
  client: createRoleBank('client', {
    systemDepth: [
      item('我更愿意先把输入、状态和反馈之间的规则关系梳顺，再继续堆表现。', 'positive', ['规则', '交互'], 'client-system-core'),
      item('只要画面先热闹起来，底层交互逻辑晚一点收也没关系。', 'reverse', ['表现', '推进'], 'client-system-core'),
      item('当一个界面功能开始变多时，我会本能地想拆清状态、优先级和边界。', 'positive', ['UI', '状态'], 'client-system-ui'),
      item('我做客户端功能时，很少因为规则之间会不会互相打架而停下来重想结构。', 'reverse', ['结构', '边界'], 'client-system-ui'),
    ],
    momentToMoment: [
      item('哪怕玩法还粗糙，我也会先在意移动、视角和按下去那一下顺不顺。', 'positive', ['手感', '输入'], 'client-moment-feel'),
      item('如果一段操作只是稍微有点拖泥带水，我通常不会特别想去抠它。', 'reverse', ['节奏', '操作'], 'client-moment-feel'),
      item('我很容易被命中反馈、受击停顿、镜头回声这类即时细节吸住注意力。', 'positive', ['命中', '反馈'], 'client-moment-combat'),
      item('只要结果能出来，我一般不会因为实时反馈不够利落而反复调整。', 'reverse', ['结果导向', '反馈'], 'client-moment-combat'),
    ],
    contentGrowth: [
      item('我会自然去想这个客户端表现以后怎么持续接更多关卡、角色或活动。', 'positive', ['扩展', '版本'], 'client-content-scale'),
      item('只要当前一版能跑通，我通常不会太早考虑后面会不会越长越重。', 'reverse', ['当前版本', '扩展'], 'client-content-scale'),
      item('当一个功能要长期运营时，我会更在意它是否方便以后反复换皮和复用。', 'positive', ['复用', '运营'], 'client-content-ops'),
      item('我不太会因为一个系统以后能不能长出很多内容而对它更有兴趣。', 'reverse', ['兴趣', '长期'], 'client-content-ops'),
    ],
    immersionCraft: [
      item('我会在意镜头、动线、触发和场景氛围有没有把玩家自然带进那个世界。', 'positive', ['镜头', '氛围'], 'client-immersion-world'),
      item('只要功能清楚可用，场景里的情绪连贯感对我通常不是第一位。', 'reverse', ['功能', '情绪'], 'client-immersion-world'),
      item('角色出现的方式、互动时机和画面节奏，会显著影响我对实现质量的判断。', 'positive', ['角色', '节奏'], 'client-immersion-scene'),
      item('我很少因为一个场景“差一点感觉”就想回头重新抠客户端表现。', 'reverse', ['场景', '打磨'], 'client-immersion-scene'),
    ],
    socialCreation: [
      item('我做客户端时会主动想：玩家怎么更顺地组队、标记、分享或一起整活。', 'positive', ['组队', '分享'], 'client-social-flow'),
      item('房间氛围和玩家之间怎么互相看见，通常不会特别牵动我做界面的方式。', 'reverse', ['房间', '界面'], 'client-social-flow'),
      item('如果一个功能能让玩家更容易表达自己，我会更愿意把它做得顺手。', 'positive', ['表达', '个性化'], 'client-social-expression'),
      item('比起给玩家留创作空间，我更常把客户端看成固定流程的承载层。', 'reverse', ['创作', '流程'], 'client-social-expression'),
    ],
    stabilityOwnership: [
      item('我会本能地担心资源加载、状态错乱、兼容性和低端机表现会不会在后面翻车。', 'positive', ['风险', '兼容'], 'client-stability-risk'),
      item('只要当前设备上跑得还行，我通常不会太早被后续稳定性问题牵走注意力。', 'reverse', ['当前设备', '稳定'], 'client-stability-risk'),
      item('一个功能做完后，我会在意它以后排查、回归和交接是否足够省事。', 'positive', ['维护', '交接'], 'client-stability-maintain'),
      item('我不太会因为某个实现以后可能难排查，就想现在先多做一点收口。', 'reverse', ['排查', '收口'], 'client-stability-maintain'),
    ],
  }),
  server: createRoleBank('server', {
    systemDepth: [
      item('我会被状态流、规则依赖和数据关系是否自洽这件事本身吸引。', 'positive', ['状态', '规则'], 'server-system-core'),
      item('只要接口先通了，底层模型稍微拧巴一点通常也能后面再说。', 'reverse', ['接口', '模型'], 'server-system-core'),
      item('面对变复杂的玩法，我第一反应常常是先把服务端边界和职责切清。', 'positive', ['边界', '职责'], 'server-system-split'),
      item('我很少因为系统之间未来可能互相牵连，就提前改动现有结构。', 'reverse', ['未来扩展', '结构'], 'server-system-split'),
    ],
    momentToMoment: [
      item('延迟、同步时机和一来一回的现场反馈，会强烈影响我对服务端质量的感觉。', 'positive', ['同步', '延迟'], 'server-moment-sync'),
      item('只要最终状态一致，过程里的实时回声差一点对我通常影响不大。', 'reverse', ['一致性', '回声'], 'server-moment-sync'),
      item('我会很在意一局对战里“这一秒发生了什么”能不能被准确表达和追溯。', 'positive', ['对局', '追溯'], 'server-moment-battle'),
      item('我不太会因为对局中的即时秩序感不够利落，就想回头重新梳链路。', 'reverse', ['秩序感', '链路'], 'server-moment-battle'),
    ],
    contentGrowth: [
      item('我会自然想到一套服务端规则以后能不能稳稳接住更多赛季、活动或养成。', 'positive', ['赛季', '养成'], 'server-content-scale'),
      item('当前版本能上线就好，后面怎么越长越大通常不会太早成为我的判断重心。', 'reverse', ['上线', '扩展'], 'server-content-scale'),
      item('如果一个后台能力能持续支撑新内容接入，我会更愿意把它打磨完整。', 'positive', ['后台', '扩展'], 'server-content-ops'),
      item('我不太会因为某套数据结构更适合长期内容膨胀，就对它更有偏好。', 'reverse', ['数据结构', '长期'], 'server-content-ops'),
    ],
    immersionCraft: [
      item('即使在服务端视角，我也会在意任务状态、世界事件和行为逻辑有没有托住沉浸感。', 'positive', ['任务', '世界状态'], 'server-immersion-world'),
      item('只要逻辑正确，玩家感不感觉世界连续，通常不会成为我特别强的驱动力。', 'reverse', ['逻辑', '连续感'], 'server-immersion-world'),
      item('我会注意服务端规则有没有破坏剧情节奏、探索意图或角色出现方式。', 'positive', ['剧情', '探索'], 'server-immersion-scene'),
      item('我很少因为“这段体验不够像一个世界”而想调整服务端实现。', 'reverse', ['世界感', '实现'], 'server-immersion-scene'),
    ],
    socialCreation: [
      item('我会主动考虑房间、队伍、邀请、分享和玩家互相影响的链路是不是顺的。', 'positive', ['房间', '邀请'], 'server-social-room'),
      item('比起玩家之间会发生什么，我更常把服务端看成纯状态托管。', 'reverse', ['托管', '关系'], 'server-social-room'),
      item('如果一个系统能让玩家更容易共创、协作或互相带动，我会更愿意支持它。', 'positive', ['共创', '协作'], 'server-social-ugc'),
      item('UGC、社交传播和广场氛围通常不会明显改变我对服务端工作的兴趣。', 'reverse', ['UGC', '传播'], 'server-social-ugc'),
    ],
    stabilityOwnership: [
      item('我会天然盯住坏档、错账、重复发奖、重连异常这类上线后最难救火的问题。', 'positive', ['错账', '重连'], 'server-stability-risk'),
      item('只要功能能跑，我通常不会太早被那些低概率事故牵着走。', 'reverse', ['功能', '事故'], 'server-stability-risk'),
      item('我会在实现时顺手考虑监控、排查、补偿和交接是不是够稳。', 'positive', ['监控', '补偿'], 'server-stability-maintain'),
      item('一个方案就算以后维护会麻烦一点，也未必会让我现在就想重做。', 'reverse', ['维护', '重做'], 'server-stability-maintain'),
    ],
  }),
  design: createRoleBank('design', {
    systemDepth: [
      item('我很容易被规则之间能否互相推动、互相制约这件事本身吸引。', 'positive', ['规则', '制约'], 'design-system-core'),
      item('只要主题和目标先站住，规则内部是否足够严整可以稍后再补。', 'reverse', ['主题', '规则'], 'design-system-core'),
      item('当玩法开始变复杂时，我会主动去拆依赖、边界和长线结构。', 'positive', ['边界', '结构'], 'design-system-scale'),
      item('我不太会因为一个系统后续扩起来可能互相打架，就提前改题。', 'reverse', ['扩展', '改题'], 'design-system-scale'),
    ],
    momentToMoment: [
      item('我会很在意玩家按下去这一秒有没有马上读懂、马上感到有回声。', 'positive', ['读懂', '回声'], 'design-moment-feedback'),
      item('只要大循环成立，局内每一下的即时反馈不够利落，我通常也能接受。', 'reverse', ['大循环', '即时反馈'], 'design-moment-feedback'),
      item('手感、胜负反馈和现场节奏，会显著影响我判断一个玩法是否成立。', 'positive', ['手感', '节奏'], 'design-moment-combat'),
      item('我很少因为一局里的即时压迫感还不够到位，就反复回头调规则。', 'reverse', ['压迫感', '调规则'], 'design-moment-combat'),
    ],
    contentGrowth: [
      item('我会自然去想这个玩法以后怎么长出版本目标、养成空间和回访理由。', 'positive', ['版本', '回访'], 'design-content-growth'),
      item('只要首轮体验成立，后面内容能不能持续滚大通常不会先卡住我。', 'reverse', ['首轮体验', '滚大'], 'design-content-growth'),
      item('一个系统如果更容易接活动、赛季和长期追求，我会更偏爱它。', 'positive', ['赛季', '活动'], 'design-content-liveops'),
      item('我不太会因为某套规则更适合长期运营，就提高对它的兴趣。', 'reverse', ['长期运营', '兴趣'], 'design-content-liveops'),
    ],
    immersionCraft: [
      item('我会在意目标、节奏、场景和叙事有没有把玩家自然送进那个体验里。', 'positive', ['目标', '叙事'], 'design-immersion-flow'),
      item('比起世界感和情绪连贯，我通常更愿意优先保证机制先跑起来。', 'reverse', ['世界感', '机制'], 'design-immersion-flow'),
      item('我会被“这一段为什么有感觉”这种氛围和节奏问题牵住很久。', 'positive', ['氛围', '节奏'], 'design-immersion-tone'),
      item('一个玩法就算世界味道薄一点，只要规则好玩，我通常不会太介意。', 'reverse', ['玩法', '世界味道'], 'design-immersion-tone'),
    ],
    socialCreation: [
      item('我会主动想玩家怎么协作、怎么互相影响、怎么把内容带回给别人。', 'positive', ['协作', '传播'], 'design-social-loop'),
      item('我设计玩法时，通常不会优先去想玩家之间会不会长出关系。', 'reverse', ['关系', '玩法'], 'design-social-loop'),
      item('如果一个系统能给玩家更多表达、共创或整活空间，我会更愿意保留它。', 'positive', ['表达', '共创'], 'design-social-ugc'),
      item('比起给玩家留舞台，我更常把项目看成一套固定解法。', 'reverse', ['舞台', '固定解法'], 'design-social-ugc'),
    ],
    stabilityOwnership: [
      item('我会本能地担心规则漏洞、边界行为、错配流程和后续维护负担。', 'positive', ['漏洞', '边界'], 'design-stability-risk'),
      item('只要创意够亮，后面会不会难测难维护通常不会先拦住我。', 'reverse', ['创意', '维护'], 'design-stability-risk'),
      item('我会在设计阶段就考虑复盘、调参、协作和版本落地是不是够顺。', 'positive', ['调参', '落地'], 'design-stability-maintain'),
      item('一个方案就算以后上线收口会辛苦一点，也未必让我现在就收窄它。', 'reverse', ['收口', '方案'], 'design-stability-maintain'),
    ],
  }),
  operation: createRoleBank('operation', {
    systemDepth: [
      item('我会关心活动、奖励和回流规则之间有没有形成一套能自洽的系统。', 'positive', ['活动', '奖励'], 'ops-system-core'),
      item('只要活动话题够亮，底层规则是不是足够严整通常可以后面再补。', 'reverse', ['话题', '规则'], 'ops-system-core'),
      item('面对越来越多的运营内容，我会主动去想哪些链路该先标准化。', 'positive', ['标准化', '链路'], 'ops-system-scale'),
      item('我不太会因为规则关系越来越复杂，就想先回头梳结构。', 'reverse', ['复杂度', '结构'], 'ops-system-scale'),
    ],
    momentToMoment: [
      item('我会在意玩家进入活动、领取奖励和完成目标时那一刻的反馈是否干脆。', 'positive', ['领取', '反馈'], 'ops-moment-flow'),
      item('只要最终数据好看，过程中的即时体验不够顺，我通常也能接受。', 'reverse', ['数据', '即时体验'], 'ops-moment-flow'),
      item('我会被“玩家这一局现在是不是想马上再来一次”这种现场信号吸引。', 'positive', ['再来一局', '现场信号'], 'ops-moment-retention'),
      item('比起当下的一口体验，我通常更少被即时节奏问题强烈牵动。', 'reverse', ['节奏', '体验'], 'ops-moment-retention'),
    ],
    contentGrowth: [
      item('我会自然想到一个版本后面还能怎么继续长出任务、活动和回流理由。', 'positive', ['版本', '回流'], 'ops-content-growth'),
      item('只要这次更新能打响，后面接不接得住长期节奏通常不会先卡住我。', 'reverse', ['更新', '长期节奏'], 'ops-content-growth'),
      item('如果一个系统能持续产出活动主题和运营抓手，我会对它更有感觉。', 'positive', ['抓手', '持续产出'], 'ops-content-liveops'),
      item('我不太会因为一个设计更适合长线运营，就明显提高对它的评价。', 'reverse', ['长线运营', '评价'], 'ops-content-liveops'),
    ],
    immersionCraft: [
      item('我会在意世界事件、版本主题和宣发语气有没有真的把玩家带进氛围。', 'positive', ['主题', '氛围'], 'ops-immersion-theme'),
      item('只要活动能跑，整体世界味道薄一点对我通常不是核心问题。', 'reverse', ['活动', '世界味道'], 'ops-immersion-theme'),
      item('一个版本有没有记忆点、有没有情绪起伏，会显著影响我对它的判断。', 'positive', ['记忆点', '情绪'], 'ops-immersion-memory'),
      item('我很少因为活动包装“不够有感觉”就想回头重做运营表达。', 'reverse', ['包装', '表达'], 'ops-immersion-memory'),
    ],
    socialCreation: [
      item('我会本能地想：这个版本能不能让玩家带朋友回来、发图、讨论或一起玩。', 'positive', ['朋友', '讨论'], 'ops-social-loop'),
      item('我做运营方案时，通常不会把玩家之间能否互相带动放在特别前面。', 'reverse', ['互相带动', '运营'], 'ops-social-loop'),
      item('如果一个功能能让社群更容易长内容和话题，我会更愿意推它。', 'positive', ['社群', '话题'], 'ops-social-community'),
      item('比起让玩家自己创造传播点，我更常依赖固定活动节奏来推动热度。', 'reverse', ['传播点', '活动节奏'], 'ops-social-community'),
    ],
    stabilityOwnership: [
      item('我会天然担心活动开关、补偿链路、日历配置和玩家信任会不会一起出事。', 'positive', ['补偿', '配置'], 'ops-stability-risk'),
      item('只要节奏够快、话题够热，背后的运营风险通常不会先压住我。', 'reverse', ['节奏', '风险'], 'ops-stability-risk'),
      item('我很在意一套运营方案上线后是否方便监控、复盘和长期维护。', 'positive', ['监控', '复盘'], 'ops-stability-maintain'),
      item('一个活动就算收口会比较累，只要前面够亮眼，我也未必会先收窄它。', 'reverse', ['收口', '亮眼'], 'ops-stability-maintain'),
    ],
  }),
  art: createRoleBank('art', {
    systemDepth: [
      item('我会在意一套视觉规范、资产层级和演出规则是否足够成体系。', 'positive', ['规范', '层级'], 'art-system-core'),
      item('只要单张图或单个角色够亮眼，整体规则松一点通常也能接受。', 'reverse', ['亮眼', '规范'], 'art-system-core'),
      item('当资源越来越多时，我会主动想命名、模板和交付边界该怎么先稳住。', 'positive', ['命名', '交付'], 'art-system-pipeline'),
      item('我不太会因为一个资源体系以后扩起来会乱，就提前重做组织方式。', 'reverse', ['资源体系', '组织'], 'art-system-pipeline'),
    ],
    momentToMoment: [
      item('我会很在意一招打出去、一个按钮按下去、一个镜头切过去那一刻有没有回声。', 'positive', ['按钮', '镜头'], 'art-moment-feedback'),
      item('只要整体风格成立，局内即时反馈不够利落对我通常不是最刺眼的问题。', 'reverse', ['整体风格', '反馈'], 'art-moment-feedback'),
      item('动作节拍、受击质感和速度感，会显著影响我判断画面是不是成立。', 'positive', ['动作', '速度'], 'art-moment-combat'),
      item('我很少因为某个瞬间“打得不够爽”就反复回头磨同一段表现。', 'reverse', ['打击感', '打磨'], 'art-moment-combat'),
    ],
    contentGrowth: [
      item('我会自然去想一套视觉方案以后是否方便持续接角色、皮肤、活动和主题。', 'positive', ['皮肤', '主题'], 'art-content-scale'),
      item('只要首发内容好看，后面能不能长期扩展通常不会先左右我。', 'reverse', ['首发', '扩展'], 'art-content-scale'),
      item('如果一个资源方案更适合长期更新和批量生产，我会更偏爱它。', 'positive', ['批量生产', '更新'], 'art-content-pipeline'),
      item('我不太会因为一套包装更适合长线内容节奏，就提高对它的兴趣。', 'reverse', ['包装', '长线'], 'art-content-pipeline'),
    ],
    immersionCraft: [
      item('我很容易被场景气质、角色登场方式和镜头里的情绪完整度牵住。', 'positive', ['场景', '情绪'], 'art-immersion-tone'),
      item('只要信息够清楚，画面是不是特别有世界感，对我不一定是第一位。', 'reverse', ['信息', '世界感'], 'art-immersion-tone'),
      item('一个地点能不能让人记住、一段演出能不能留下余味，会强烈影响我的判断。', 'positive', ['地点', '演出'], 'art-immersion-memory'),
      item('我很少因为画面“还差一点氛围”就想回头重新抠整体表达。', 'reverse', ['氛围', '表达'], 'art-immersion-memory'),
    ],
    socialCreation: [
      item('我会主动考虑头像、外观、表情和分享素材能不能让玩家更愿意表达自己。', 'positive', ['头像', '表达'], 'art-social-expression'),
      item('玩家之间怎么互相看见彼此，通常不会特别牵动我做视觉选择。', 'reverse', ['彼此看见', '视觉'], 'art-social-expression'),
      item('如果一个项目有更多广场、房间或 UGC 场景，我会更想给它留舞台感。', 'positive', ['广场', 'UGC'], 'art-social-stage'),
      item('比起让玩家拿去传播和再创作，我更常把美术看成纯展示层。', 'reverse', ['传播', '再创作'], 'art-social-stage'),
    ],
    stabilityOwnership: [
      item('我会在意资源规范、可读性、性能和多版本交付会不会在后面一起出问题。', 'positive', ['规范', '性能'], 'art-stability-risk'),
      item('只要眼前效果够好，后面维护成本高一点通常不会先把我劝退。', 'reverse', ['效果', '维护'], 'art-stability-risk'),
      item('一个视觉方案如果更方便验收、复用和交接，我会更放心把它铺大。', 'positive', ['验收', '复用'], 'art-stability-maintain'),
      item('我不太会因为某套表现以后难维护，就现在先收一收视觉野心。', 'reverse', ['维护', '野心'], 'art-stability-maintain'),
    ],
  }),
  qa: createRoleBank('qa', {
    systemDepth: [
      item('我会很自然地去想一套规则背后还有哪些依赖、边界和连锁影响没被看见。', 'positive', ['依赖', '边界'], 'qa-system-core'),
      item('只要主流程先能走通，规则内部是不是足够严整通常不会先卡住我。', 'reverse', ['主流程', '规则'], 'qa-system-core'),
      item('面对复杂功能时，我会本能地先把状态分支和组合情况拆开来看。', 'positive', ['状态', '组合'], 'qa-system-coverage'),
      item('我不太会因为一个系统未来扩展后会更难测，就提前建议调整结构。', 'reverse', ['扩展', '结构'], 'qa-system-coverage'),
    ],
    momentToMoment: [
      item('我会特别在意输入、节奏、命中和操作回声里那些“一下子不对”的地方。', 'positive', ['输入', '命中'], 'qa-moment-feel'),
      item('只要结果数据没问题，局内手感稍微别扭一点通常不会特别抓我。', 'reverse', ['结果', '手感'], 'qa-moment-feel'),
      item('一局里现场反馈是否清楚、是否让人服气，会强烈影响我对质量的判断。', 'positive', ['反馈', '公平'], 'qa-moment-combat'),
      item('我很少因为实时反馈不够利落，就把它当成特别重要的问题去追。', 'reverse', ['反馈', '优先级'], 'qa-moment-combat'),
    ],
    contentGrowth: [
      item('我会自然想到一个系统以后内容越长越多时，哪里最容易先出问题。', 'positive', ['长期', '风险'], 'qa-content-scale'),
      item('只要当前版本能过，后面内容膨胀后的可维护性通常不会先牵走我。', 'reverse', ['当前版本', '膨胀'], 'qa-content-scale'),
      item('如果一个功能注定要长期接活动和新内容，我会更想先把回归路径想清。', 'positive', ['回归', '活动'], 'qa-content-regression'),
      item('我不太会因为某套设计更适合长线扩展，就明显提高对它的关注度。', 'reverse', ['长线扩展', '关注'], 'qa-content-regression'),
    ],
    immersionCraft: [
      item('我会在意玩家是否在错误的触发、提示或镜头节奏里被打断了沉浸感。', 'positive', ['触发', '提示'], 'qa-immersion-flow'),
      item('只要逻辑正确，体验是不是有世界味道，对我通常不是主要切入点。', 'reverse', ['逻辑', '世界味道'], 'qa-immersion-flow'),
      item('剧情节拍、场景意图和表现连贯性出了问题，我通常会很快注意到。', 'positive', ['剧情', '连贯'], 'qa-immersion-tone'),
      item('我很少因为“这段感觉不对”这种氛围问题，而认真追它的复现与影响。', 'reverse', ['氛围', '复现'], 'qa-immersion-tone'),
    ],
    socialCreation: [
      item('我会主动想组队、邀请、分享、UGC 和房间互动里最容易翻车的关系链。', 'positive', ['邀请', 'UGC'], 'qa-social-flow'),
      item('玩家之间怎么互相影响，通常不会明显改变我测试时的关注重点。', 'reverse', ['互相影响', '重点'], 'qa-social-flow'),
      item('如果一个系统会让玩家自己创造内容，我会更自然地去找极端玩法和边界。', 'positive', ['创造内容', '边界'], 'qa-social-ugc'),
      item('比起玩家整活空间，我更常把测试重点放在固定流程里。', 'reverse', ['整活', '固定流程'], 'qa-social-ugc'),
    ],
    stabilityOwnership: [
      item('我会天然被坏档、错账、偶现异常、维护成本和复盘沉淀这类问题牵住。', 'positive', ['坏档', '复盘'], 'qa-stability-risk'),
      item('只要问题不容易大面积爆发，我通常不会太早把它抬到前面。', 'reverse', ['低概率', '优先级'], 'qa-stability-risk'),
      item('我会在意一个问题有没有足够清楚的复现、定位、回归和交接路径。', 'positive', ['复现', '回归'], 'qa-stability-maintain'),
      item('一个问题就算以后可能反复回来，只要现在影响不大，也未必会让我死盯。', 'reverse', ['复发', '影响'], 'qa-stability-maintain'),
    ],
  }),
}
