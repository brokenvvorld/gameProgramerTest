import './style.css'
import { profiles, typeKeys } from './data/profiles.js'
import { roles, roleOrder } from './data/roles.js'
import { roleProfiles } from './data/roleProfiles.js'
import { buildCrossRoleInsight } from './data/relations.js'
import { questionBanks } from './data/questions/index.js'

const avatarBase = `${import.meta.env.BASE_URL}avatars/`
const storageKey = 'game-type-compass-role-history-v2'
const app = document.querySelector('#app')

const state = {
  screen: 'intro',
  selectedRole: null,
  current: 0,
  answers: [],
  activeQuestions: [],
}

const QUESTION_LIMIT = 36

const personalityNotes = {
  narrativeAdventure: {
    code: '氛围感知型',
    firstLook: '你像会在地图边角停下来听风声的人。比起立刻冲向胜利，你更在意过程有没有让人记住。',
    instinct: '你天然会注意情绪、路线、暗示、场景里的小线索，以及玩家有没有被温柔地带进故事。',
    teamVibe: '别人会觉得你有点慢热，但你经常能发现“这里差一点感觉”的地方。',
    hook: '让你上头的通常不是数值爆炸，而是某个地点、某段演出、某个刚好出现的瞬间。',
  },
  openWorldRpg: {
    code: '世界拼图型',
    firstLook: '你像会把一堆系统摆在桌上，然后开始想它们能不能互相咬合的人。',
    instinct: '你天然会注意成长、探索、任务、装备、地图和玩家绕路时出现的意外收获。',
    teamVibe: '别人会觉得你脑子里总有一张看不见的大地图。',
    hook: '让你上头的是“这里还能去”“这个角色还能养”“这条路线还能试”。',
  },
  competitiveShooter: {
    code: '即时反馈型',
    firstLook: '你像会在零点几秒的反馈里判断一局游戏有没有灵魂的人。',
    instinct: '你天然会注意输入、命中、延迟、公平、信息差和输赢是否让人服气。',
    teamVibe: '别人会觉得你很敏锐，尤其是手感、节奏和对抗里的不舒服，你很难假装没看见。',
    hook: '让你上头的是一次干净的命中、一次翻盘、一次“我还能更准”的念头。',
  },
  coopSurvival: {
    code: '混乱协作型',
    firstLook: '你像会一边看资源够不够，一边观察队友有没有开始自然分工的人。',
    instinct: '你天然会注意压力、资源、队友位置、敌人威胁和一局里会不会长出故事。',
    teamVibe: '别人会觉得你很适合处理有点乱但很好玩的局面。',
    hook: '让你上头的是大家临时配合、险些翻车、最后居然活下来的那种瞬间。',
  },
  strategySimulation: {
    code: '规则推演型',
    firstLook: '你像看到一个规则就会忍不住想它影响第二个、第三个规则的人。',
    instinct: '你天然会注意循环、产出、消耗、AI、单位克制和系统会不会自己长出变化。',
    teamVibe: '别人会觉得你看东西很有结构感，也很容易被一张表格点燃。',
    hook: '让你上头的是“这套方案终于跑通了”和“我好像还能优化一点”。',
  },
  casualPuzzleMobile: {
    code: '轻快循环型',
    firstLook: '你像会把一个按钮按起来都调得很开心的人。',
    instinct: '你天然会注意第一口体验、反馈密度、失败成本、奖励节奏和玩家会不会轻松再来。',
    teamVibe: '别人会觉得你很会把复杂东西变轻，把小反馈变可爱。',
    hook: '让你上头的是短、顺、脆，几秒钟就能让人明白“这个我会”。',
  },
  cardCollection: {
    code: '角色收集型',
    firstLook: '你像会认真给每个角色留一个登场机会的人。',
    instinct: '你天然会注意角色差异、稀有度、养成、阵容、活动和玩家为什么喜欢某个人。',
    teamVibe: '别人会觉得你对“吸引力”很敏感，知道什么东西会让人想留下来慢慢养。',
    hook: '让你上头的是抽到、养成、组队、变强，以及角色被好好展示出来。',
  },
  sportsRacing: {
    code: '节奏挑战型',
    firstLook: '你像会为了 0.1 秒差异反复跑同一圈的人。',
    instinct: '你天然会注意速度、物理、排名、练习反馈和目标是否足够清楚。',
    teamVibe: '别人会觉得你很重视清晰的规则和可比较的进步。',
    hook: '让你上头的是再快一点、再稳一点、再漂亮一点冲过终点。',
  },
  actionFighting: {
    code: '操作回声型',
    firstLook: '你像会认真感受每一下输入有没有重量的人。',
    instinct: '你天然会注意判定、硬直、取消、连招、受击反馈和 Boss 节奏。',
    teamVibe: '别人会觉得你对“爽不爽”特别诚实，动作里一点虚的东西都逃不过你。',
    hook: '让你上头的是打出漂亮连段、读懂敌人动作、终于过掉那个难点。',
  },
  sandboxSocial: {
    code: '规则舞台型',
    firstLook: '你像会把工具递给玩家，然后等他们自己玩出花的人。',
    instinct: '你天然会注意创作、分享、房间、好友、低压力互动和规则能不能变成笑点。',
    teamVibe: '别人会觉得你很适合做舞台，而不是规定每个人必须怎么演。',
    hook: '让你上头的是朋友一起玩、玩家自己创造、一个简单规则突然变得很好笑。',
  },
}

function avatarUrl(profile) {
  return `${avatarBase}${profile.avatar.file}`
}

function getQuestions() {
  return state.activeQuestions
}

function pickQuestions(roleKey) {
  const source = questionBanks[roleKey] || []
  if (source.length <= QUESTION_LIMIT) return source
  const step = source.length / QUESTION_LIMIT
  return Array.from({ length: QUESTION_LIMIT }, (_, index) => source[Math.floor(index * step)])
}

function readHistory() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || {}
  } catch {
    return {}
  }
}

function writeHistory(history) {
  localStorage.setItem(storageKey, JSON.stringify(history))
}

function getRankings(roleKey = state.selectedRole, answers = state.answers) {
  const questions = roleKey === state.selectedRole ? getQuestions() : pickQuestions(roleKey)
  const scores = Object.fromEntries(typeKeys.map((key) => [key, 0]))
  answers.forEach((answerIndex, questionIndex) => {
    const answer = questions[questionIndex]?.options[answerIndex]
    if (!answer) return
    Object.entries(answer.scores).forEach(([key, value]) => {
      scores[key] += value
    })
  })
  return Object.entries(scores)
    .map(([key, score]) => ({
      key,
      score: Math.round(score * 10) / 10,
      ...profiles[key],
      role: roleProfiles[roleKey][key],
    }))
    .sort((a, b) => b.score - a.score)
}

function getScoreMap(rankings) {
  return Object.fromEntries(rankings.map((item) => [item.key, item.score]))
}

function getStageScores(roleKey = state.selectedRole, answers = state.answers) {
  const questions = roleKey === state.selectedRole ? getQuestions() : pickQuestions(roleKey)
  return answers.reduce((acc, answerIndex, questionIndex) => {
    const question = questions[questionIndex]
    const answer = question?.options[answerIndex]
    if (!question || !answer) return acc
    acc[question.stage] =
      (acc[question.stage] || 0) +
      Math.round(Object.values(answer.scores).reduce((sum, score) => sum + score, 0) * 10) / 10
    return acc
  }, {})
}

function openStoredResult(roleKey) {
  const history = readHistory()
  const saved = history[roleKey]
  if (!saved) {
    startRole(roleKey)
    return
  }
  state.screen = 'result'
  state.selectedRole = roleKey
  state.current = 0
  state.answers = saved.answers
  state.activeQuestions = pickQuestions(roleKey)
  render()
}

function saveCurrentResult(rankings) {
  const history = readHistory()
  history[state.selectedRole] = {
    roleKey: state.selectedRole,
    topKey: rankings[0].key,
    secondKey: rankings[1]?.key,
    score: rankings[0].score,
    scores: getScoreMap(rankings),
    stageScores: getStageScores(),
    answers: state.answers,
    completedAt: new Date().toISOString(),
  }
  writeHistory(history)
}

function getRecommendedRoleKeys(history, currentRoleKey) {
  const configured = roles[currentRoleKey].recommendRoles
  const untested = roleOrder.filter((roleKey) => !history[roleKey] && roleKey !== currentRoleKey)
  return [...configured, ...untested]
    .filter((roleKey, index, list) => roleKey !== currentRoleKey && list.indexOf(roleKey) === index)
    .slice(0, 2)
}

function render() {
  if (state.screen === 'intro') renderIntro()
  if (state.screen === 'quiz') renderQuestion()
  if (state.screen === 'result') renderResult()
  if (state.screen === 'crossResult') renderCrossResult()
}

function renderIntro() {
  const history = readHistory()
  app.innerHTML = `
    <main class="app-shell intro-shell">
      <section class="intro-panel role-intro-panel">
        <div class="intro-copy">
          <p class="eyebrow">Game Type Compass</p>
          <h1>先选择你的项目身份</h1>
          <p class="lead">选择一个身份，看看你在这个位置上更像哪类游戏开发气质。</p>
          <div class="role-grid">
            ${roleOrder.map((roleKey) => {
              const role = roles[roleKey]
              const done = history[roleKey]
              return `
                <button class="role-card ${done ? 'completed' : 'pending'}" data-role="${roleKey}">
                  <span>${role.icon}</span>
                  <b>${role.name}</b>
                  <small>${role.badge}</small>
                  <em>${done ? `查看结果 · ${profiles[done.topKey].title}` : '开始测试'}</em>
                </button>
              `
            }).join('')}
          </div>
        </div>
        <div class="type-console">
          <div class="role-dashboard">
            <div class="role-dashboard-head">
              <p class="eyebrow">Role Results</p>
              <b>${Object.keys(history).length} / ${roleOrder.length} 已解锁</b>
              <small>${Object.keys(history).length >= 2 ? '跨身份画像已可查看' : '完成两个身份后生成跨身份画像'}</small>
              <button class="dashboard-action" data-action="cross-report" ${Object.keys(history).length < 2 ? 'disabled' : ''}>
                ${Object.keys(history).length >= 2 ? '查看跨身份画像' : '至少完成 2 个身份'}
              </button>
            </div>
            <div class="role-status-grid">
              ${roleOrder.map((roleKey) => {
                const role = roles[roleKey]
                const done = history[roleKey]
                return `
                  <div class="role-status ${done ? 'done' : ''}">
                    <span>${role.icon}</span>
                    <b>${role.shortName}</b>
                    <small>${done ? profiles[done.topKey].title : '待测试'}</small>
                  </div>
                `
              }).join('')}
            </div>
          </div>
        </div>
      </section>
    </main>
  `
}

function renderQuestion() {
  const questions = getQuestions()
  const question = questions[state.current]
  const progress = ((state.current + 1) / questions.length) * 100
  const answered = state.answers.filter((answer) => answer !== null).length
  const role = roles[state.selectedRole]
  app.innerHTML = `
    <main class="app-shell">
      <section class="quiz-layout">
        <aside class="status-panel">
          <p class="eyebrow">${role.badge}</p>
          <strong>${state.current + 1}<span> / ${questions.length}</span></strong>
          <div class="progress"><i style="width: ${progress}%"></i></div>
          <p>${answered} 题已选择</p>
        </aside>
        <section class="question-panel">
          <div class="question-head">
            <p class="question-count">作为${role.name}，你在 A / B 之间站哪一档？ · 第 ${state.current + 1} 题</p>
            <h2 class="question-stem">${question.text}</h2>
          </div>
          <div class="options options-spectrum">
            ${question.options.map((option, index) => `
              <button class="option option-spectrum ${state.answers[state.current] === index ? 'active' : ''}" data-answer="${index}">
                <span>${index + 1}</span>
                ${option.text}
              </button>
            `).join('')}
          </div>
          <div class="actions">
            <button class="secondary" data-action="home">换身份</button>
            <button class="secondary" data-action="prev" ${state.current === 0 ? 'disabled' : ''}>上一道</button>
          </div>
        </section>
      </section>
    </main>
  `
}

function renderResult() {
  const rankings = getRankings()
  saveCurrentResult(rankings)
  const history = readHistory()
  const top = rankings[0]
  const role = roles[state.selectedRole]
  const roleResult = top.role
  const note = personalityNotes[top.key]
  const maxScore = Math.max(...rankings.map((item) => item.score), 1)
  const related = rankings.slice(1, 4)

  app.innerHTML = `
    <main class="app-shell">
      <section class="result-layout">
        <section class="result-main">
          <div class="result-hero">
            <img class="result-avatar" src="${avatarUrl(top)}" alt="${top.avatar.alt}" />
            <div>
              <p class="eyebrow">${role.name}身份结果</p>
              <h1>${roleResult.title}</h1>
              <p class="persona">${roleResult.persona}</p>
              <p class="result-subtitle">${roleResult.subtitle}</p>
            </div>
          </div>
          <div class="personality-card">
            <p>你的简单画像</p>
            <h2>${note.code}</h2>
            <span>${note.firstLook}</span>
            <div class="personality-grid">
              <article><b>你会先看见</b><small>${note.instinct}</small></article>
              <article><b>别人眼中的你</b><small>${note.teamVibe}</small></article>
              <article><b>最容易上头</b><small>${note.hook}</small></article>
            </div>
          </div>
          <div class="analysis-grid">
            <article><h3>你的身份气质</h3><p>${roleResult.temperament}</p></article>
            <article><h3>你会在意的细节</h3><p>${roleResult.details}</p></article>
            <article><h3>适合的游戏味道</h3><p>${roleResult.vibe}</p></article>
            <article><h3>容易被吸引的项目</h3><p>${roleResult.attractedTo}</p></article>
          </div>
          <div class="meta-group">
            <p>代表性关键词</p>
            <div class="trait-list">${top.traits.map((trait) => `<span>${trait}</span>`).join('')}</div>
          </div>
          <div class="meta-group">
            <p>推荐试玩的游戏</p>
            <div class="game-recommendations">
              ${top.recommendedGames.map(([name, reason]) => `
                <article><b>${name}</b><span>${reason}</span></article>
              `).join('')}
            </div>
          </div>
          <div class="actions">
            <button class="secondary" data-action="review">回看题目</button>
            <button class="secondary" data-action="restart-role">重测本身份</button>
            <button class="secondary" data-action="home">换身份再测</button>
            <button class="primary" data-action="share">生成分享图</button>
          </div>
          <p class="share-status" aria-live="polite"></p>
        </section>
        <aside class="rank-panel">
          <p class="eyebrow">倾向雷达</p>
          <ul>
            ${rankings.map((item) => `
              <li>
                <div><b>${item.title}</b><span>${item.score}</span></div>
                <i style="width: ${(item.score / maxScore) * 100}%"></i>
              </li>
            `).join('')}
          </ul>
        </aside>
      </section>
    </main>
  `
}

function renderCrossResult() {
  const history = readHistory()
  const insight = buildCrossRoleInsight(history, roles, profiles, typeKeys)
  if (!insight) {
    state.screen = 'intro'
    render()
    return
  }
  const crossNote = personalityNotes[insight.topTypes[0].key]

  app.innerHTML = `
    <main class="app-shell">
      <section class="cross-layout">
        <section class="result-main cross-main">
          <p class="eyebrow">Cross Role Report</p>
          <h1>${insight.resultTitle}</h1>
          <div class="personality-card">
            <p>你的跨身份画像</p>
            <h2>${crossNote.code}</h2>
            <span>${crossNote.firstLook}</span>
            <div class="personality-grid">
              <article><b>跨身份共同点</b><small>${crossNote.instinct}</small></article>
              <article><b>切换身份后</b><small>${insight.roleDifference}</small></article>
              <article><b>最容易被点燃</b><small>${crossNote.hook}</small></article>
            </div>
          </div>
          <div class="relation-panel">
            <p>跨身份综合结果 · ${insight.axisTitle}</p>
            <div class="relation-summary">
              <b>${insight.completedCount} 个身份 · ${insight.totalAnswers} 道题</b>
              <span>${insight.overview}</span>
            </div>
            <div class="relation-type-row">
              ${insight.topTypes.map((item) => `<span>${item.title}<b>${item.score}</b></span>`).join('')}
            </div>
            <div class="analysis-grid relation-analysis-grid">
              <article><h3>核心偏好</h3><p>${insight.corePreference}</p></article>
              <article><h3>轴线结构</h3><p>${insight.axisRead}</p></article>
              <article><h3>身份差异</h3><p>${insight.roleDifference}</p></article>
              <article><h3>阶段信号</h3><p>${insight.stageRead}</p></article>
              <article><h3>结果稳定性</h3><p>${insight.stability}</p></article>
              <article><h3>继续补全</h3><p>${insight.nextProbe}</p></article>
            </div>
            <div class="role-breakdown">
              ${insight.roleCards.map((card) => `
                <article>
                  <b>${card.roleName}</b>
                  <span>${card.topType} · ${card.topScore}</span>
                  <small>次倾向：${card.secondType} · ${card.secondScore}，${card.read}；高信号阶段：${card.stage}</small>
                </article>
              `).join('')}
            </div>
          </div>
          <div class="actions">
            <button class="secondary" data-action="home">回到主界面</button>
            <button class="primary" data-action="share-cross">生成分享图</button>
          </div>
          <p class="share-status" aria-live="polite"></p>
        </section>
      </section>
    </main>
  `
}

function startRole(roleKey) {
  const questions = pickQuestions(roleKey)
  state.screen = 'quiz'
  state.selectedRole = roleKey
  state.current = 0
  state.activeQuestions = questions
  state.answers = Array(questions.length).fill(null)
  render()
}

function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + width, y, x + width, y + height, radius)
  ctx.arcTo(x + width, y + height, x, y + height, radius)
  ctx.arcTo(x, y + height, x, y, radius)
  ctx.arcTo(x, y, x + width, y, radius)
  ctx.closePath()
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 3) {
  const chars = [...text]
  const lines = []
  let line = ''
  chars.forEach((char) => {
    const next = `${line}${char}`
    if (ctx.measureText(next).width > maxWidth && line) {
      lines.push(line)
      line = char
    } else {
      line = next
    }
  })
  if (line) lines.push(line)
  if (lines.length > maxLines) {
    lines.length = maxLines
    lines[maxLines - 1] = `${lines[maxLines - 1].slice(0, -1)}…`
  }
  lines.forEach((lineText, index) => ctx.fillText(lineText, x, y + index * lineHeight))
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = src
  })
}

function canvasToBlob(canvas) {
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
}

async function copyShareImage(result, rankings, insight) {
  const canvas = document.createElement('canvas')
  canvas.width = 1200
  canvas.height = 1600
  const ctx = canvas.getContext('2d')
  const image = await loadImage(avatarUrl(result))
  const role = roles[state.selectedRole]
  const roleResult = result.role

  ctx.fillStyle = '#e8edf3'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
  bg.addColorStop(0, '#f8fafc')
  bg.addColorStop(0.62, '#e6f0ef')
  bg.addColorStop(1, '#fff6dc')
  ctx.fillStyle = bg
  roundedRect(ctx, 80, 80, 1040, 1440, 42)
  ctx.fill()
  ctx.strokeStyle = 'rgba(28, 42, 62, 0.14)'
  ctx.lineWidth = 3
  ctx.stroke()

  ctx.fillStyle = '#2d6d73'
  ctx.font = '800 30px "Microsoft YaHei", sans-serif'
  ctx.fillText('GAME TYPE COMPASS', 140, 170)
  ctx.fillStyle = '#101827'
  ctx.font = '900 56px "Microsoft YaHei", sans-serif'
  ctx.fillText(`${role.name}身份结果`, 140, 250)

  ctx.save()
  roundedRect(ctx, 140, 320, 330, 330, 48)
  ctx.clip()
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(140, 320, 330, 330)
  ctx.drawImage(image, 140, 320, 330, 330)
  ctx.restore()

  ctx.fillStyle = '#ffffff'
  roundedRect(ctx, 510, 320, 550, 330, 28)
  ctx.fill()
  ctx.fillStyle = '#193f4a'
  ctx.font = '900 34px "Microsoft YaHei", sans-serif'
  ctx.fillText(roleResult.persona, 552, 385)
  ctx.fillStyle = '#101827'
  ctx.font = '900 52px "Microsoft YaHei", sans-serif'
  wrapText(ctx, roleResult.title, 552, 470, 455, 62, 2)
  ctx.fillStyle = '#4d5b70'
  ctx.font = '500 29px "Microsoft YaHei", sans-serif'
  wrapText(ctx, roleResult.subtitle, 552, 585, 450, 42, 2)

  ctx.fillStyle = '#101827'
  ctx.font = '900 36px "Microsoft YaHei", sans-serif'
  ctx.fillText('像这样的你', 140, 750)
  ctx.fillStyle = '#4d5b70'
  ctx.font = '500 30px "Microsoft YaHei", sans-serif'
  wrapText(ctx, roleResult.temperament, 140, 815, 900, 46, 4)

  ctx.fillStyle = '#101827'
  ctx.font = '900 32px "Microsoft YaHei", sans-serif'
  ctx.fillText('代表性关键词', 140, 1040)
  result.traits.forEach((trait, index) => {
    const x = 140 + index * 250
    ctx.fillStyle = '#edf5f5'
    roundedRect(ctx, x, 1075, 218, 62, 31)
    ctx.fill()
    ctx.strokeStyle = '#bfd2d4'
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fillStyle = '#193f4a'
    ctx.font = '800 26px "Microsoft YaHei", sans-serif'
    ctx.fillText(trait, x + 28, 1115)
  })

  ctx.fillStyle = '#101827'
  ctx.font = '900 32px "Microsoft YaHei", sans-serif'
  ctx.fillText(insight ? '跨身份画像' : '推荐继续测', 140, 1240)
  ctx.fillStyle = '#4d5b70'
  ctx.font = '500 28px "Microsoft YaHei", sans-serif'
  wrapText(ctx, insight ? insight.shareLine : '再换一个身份测，会看到同一游戏类型的另一面。', 140, 1295, 860, 42, 2)

  ctx.fillStyle = 'rgba(255, 255, 255, 0.72)'
  roundedRect(ctx, 120, 1460, 960, 44, 22)
  ctx.fill()
  ctx.fillStyle = '#6d4a0f'
  ctx.font = '800 24px "Microsoft YaHei", sans-serif'
  ctx.fillText(`常见平台：${result.platforms.join(' / ')}`, 145, 1490)
  ctx.fillStyle = '#65758c'
  ctx.font = '500 20px "Microsoft YaHei", sans-serif'
  ctx.textAlign = 'right'
  ctx.fillText('生成自：你适合开发什么类型的游戏？', 1055, 1490)
  ctx.textAlign = 'left'

  const blob = await canvasToBlob(canvas)
  if (!blob) throw new Error('图片生成失败')
  if (!navigator.clipboard || !window.ClipboardItem) throw new Error('当前浏览器不支持直接复制图片')
  await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
}

async function copyCrossShareImage(insight) {
  const canvas = document.createElement('canvas')
  canvas.width = 1200
  canvas.height = 1600
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#e8edf3'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
  bg.addColorStop(0, '#f8fafc')
  bg.addColorStop(0.62, '#e6f0ef')
  bg.addColorStop(1, '#fff6dc')
  ctx.fillStyle = bg
  roundedRect(ctx, 80, 80, 1040, 1440, 42)
  ctx.fill()
  ctx.strokeStyle = 'rgba(28, 42, 62, 0.14)'
  ctx.lineWidth = 3
  ctx.stroke()

  ctx.fillStyle = '#2d6d73'
  ctx.font = '800 30px "Microsoft YaHei", sans-serif'
  ctx.fillText('CROSS ROLE REPORT', 140, 170)
  ctx.fillStyle = '#101827'
  ctx.font = '900 58px "Microsoft YaHei", sans-serif'
  wrapText(ctx, insight.resultTitle, 140, 250, 900, 70, 2)

  ctx.fillStyle = '#ffffff'
  roundedRect(ctx, 140, 430, 920, 150, 28)
  ctx.fill()
  ctx.fillStyle = '#193f4a'
  ctx.font = '900 32px "Microsoft YaHei", sans-serif'
  ctx.fillText(`${insight.completedCount} 个身份 · ${insight.totalAnswers} 道题`, 180, 485)
  ctx.fillStyle = '#4d5b70'
  ctx.font = '500 27px "Microsoft YaHei", sans-serif'
  wrapText(ctx, insight.overview, 180, 535, 820, 40, 2)

  ctx.fillStyle = '#101827'
  ctx.font = '900 34px "Microsoft YaHei", sans-serif'
  ctx.fillText('综合类型分布', 140, 680)
  insight.topTypes.slice(0, 4).forEach((item, index) => {
    const x = 140 + index * 235
    ctx.fillStyle = '#edf5f5'
    roundedRect(ctx, x, 715, 210, 82, 18)
    ctx.fill()
    ctx.strokeStyle = '#bfd2d4'
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fillStyle = '#193f4a'
    ctx.font = '800 22px "Microsoft YaHei", sans-serif'
    wrapText(ctx, item.title, x + 18, 750, 160, 26, 1)
    ctx.fillStyle = '#6d4a0f'
    ctx.font = '900 28px "Microsoft YaHei", sans-serif'
    ctx.fillText(String(item.score), x + 18, 785)
  })

  const blocks = [
    ['核心偏好', insight.corePreference],
    ['轴线结构', insight.axisRead],
    ['身份差异', insight.roleDifference],
    ['阶段信号', insight.stageRead],
  ]
  blocks.forEach(([title, text], index) => {
    const x = index % 2 === 0 ? 140 : 610
    const y = index < 2 ? 880 : 1120
    ctx.fillStyle = '#ffffff'
    roundedRect(ctx, x, y, 450, 190, 22)
    ctx.fill()
    ctx.fillStyle = '#101827'
    ctx.font = '900 28px "Microsoft YaHei", sans-serif'
    ctx.fillText(title, x + 28, y + 48)
    ctx.fillStyle = '#4d5b70'
    ctx.font = '500 23px "Microsoft YaHei", sans-serif'
    wrapText(ctx, text, x + 28, y + 88, 390, 34, 3)
  })

  ctx.fillStyle = 'rgba(255, 255, 255, 0.72)'
  roundedRect(ctx, 120, 1460, 960, 44, 22)
  ctx.fill()
  ctx.fillStyle = '#65758c'
  ctx.font = '500 22px "Microsoft YaHei", sans-serif'
  ctx.fillText('生成自：你适合开发什么类型的游戏？', 145, 1490)

  const blob = await canvasToBlob(canvas)
  if (!blob) throw new Error('图片生成失败')
  if (!navigator.clipboard || !window.ClipboardItem) throw new Error('当前浏览器不支持直接复制图片')
  await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
}

app.addEventListener('click', async (event) => {
  const roleButton = event.target.closest('[data-role]')
  const answerButton = event.target.closest('[data-answer]')
  const actionButton = event.target.closest('[data-action]')

  if (roleButton) {
    openStoredResult(roleButton.dataset.role)
    return
  }

  if (answerButton) {
    const questions = getQuestions()
    state.answers[state.current] = Number(answerButton.dataset.answer)
    if (state.current === questions.length - 1) {
      state.screen = 'result'
    } else {
      state.current += 1
    }
    render()
    return
  }

  if (!actionButton) return
  const action = actionButton.dataset.action

  if (action === 'home') {
    state.screen = 'intro'
    render()
  }
  if (action === 'cross-report') {
    state.screen = 'crossResult'
    render()
  }
  if (action === 'prev' && state.current > 0) {
    state.current -= 1
    render()
  }
  if (action === 'review') {
    state.screen = 'quiz'
    state.current = 0
    render()
  }
  if (action === 'restart-role') {
    startRole(state.selectedRole)
  }
  if (action === 'share') {
    const status = document.querySelector('.share-status')
    actionButton.disabled = true
    status.textContent = '正在生成分享图...'
    try {
      const rankings = getRankings()
      const insight = buildCrossRoleInsight(readHistory(), roles, profiles, typeKeys)
      await copyShareImage(rankings[0], rankings, insight)
      status.textContent = '分享图已复制到剪切板'
    } catch (error) {
      status.textContent = error.message || '生成失败，请稍后再试'
    } finally {
      actionButton.disabled = false
    }
  }
  if (action === 'share-cross') {
    const status = document.querySelector('.share-status')
    actionButton.disabled = true
    status.textContent = '正在生成跨身份分享图...'
    try {
      const insight = buildCrossRoleInsight(readHistory(), roles, profiles, typeKeys)
      await copyCrossShareImage(insight)
      status.textContent = '跨身份分享图已复制到剪切板'
    } catch (error) {
      status.textContent = error.message || '生成失败，请稍后再试'
    } finally {
      actionButton.disabled = false
    }
  }
})

render()
