import './style.css'
import { profiles } from './data/profiles.js'
import { roles, roleOrder } from './data/roles.js'
import {
  dimensionMeta,
  dimensionOrder,
  responseLabels,
  skipAnswerLabel,
  skipAnswerValue,
} from './data/dimensions.js'
import { buildCrossRoleInsight, evaluateRoleResult } from './data/relations.js'
import { questionBanks } from './data/questions/index.js'

const avatarBase = `${import.meta.env.BASE_URL}avatars/`
const storageKey = 'game-workstyle-compass-v2-history'
const app = document.querySelector('#app')

const state = {
  screen: 'intro',
  selectedRole: null,
  current: 0,
  answers: [],
}

function avatarUrl(profile) {
  return `${avatarBase}${profile.avatar.file}`
}

function getQuestions() {
  return state.selectedRole ? questionBanks[state.selectedRole] : []
}

function readHistory() {
  try {
    const raw = JSON.parse(localStorage.getItem(storageKey)) || {}
    return Object.fromEntries(
      Object.entries(raw).filter(([, entry]) => entry?.version === 2 && entry?.dimensionScores),
    )
  } catch {
    return {}
  }
}

function writeHistory(history) {
  localStorage.setItem(storageKey, JSON.stringify(history))
}

function getCurrentResult() {
  return evaluateRoleResult(state.selectedRole, state.answers, getQuestions())
}

function saveCurrentResult(result) {
  const history = readHistory()
  history[state.selectedRole] = {
    ...result,
    completedAt: new Date().toISOString(),
    answers: state.answers,
  }
  writeHistory(history)
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
      <section class="intro-panel">
        <div class="intro-copy">
          <p class="eyebrow">Game Workstyle Compass</p>
          <h1>选一个项目身份，看看你更适合什么样的游戏开发工作感</h1>
          <p class="lead">从客户端、服务器、策划、运营、美术、测试六个位置出发，测一测你在项目里最容易被什么样的工作内容点燃。</p>
          <div class="role-grid">
            ${roleOrder.map((roleKey) => {
              const role = roles[roleKey]
              const done = history[roleKey]
              const topDimension = done?.topDimensionKey ? dimensionMeta[done.topDimensionKey].title : '开始测试'
              return `
                <button class="role-card ${done ? 'completed' : 'pending'}" data-role="${roleKey}">
                  <span>${role.icon}</span>
                  <b>${role.name}</b>
                  <small>${role.badge}</small>
                  <em>${done ? `查看结果 · ${topDimension}` : '开始测试'}</em>
                </button>
              `
            }).join('')}
          </div>
        </div>
        <div class="intro-side">
          <div class="hero-panel">
            <p class="eyebrow">测试方式</p>
            <h2>按直觉选就好，没有标准答案</h2>
            <div class="dimension-chip-grid">
              ${dimensionOrder.map((key) => `
                <span>${dimensionMeta[key].title}</span>
              `).join('')}
            </div>
            <p>每道题都是一句很具体的项目判断。你可以直接选更像自己的那一侧，如果两边都不贴，就跳过。</p>
          </div>
          <div class="dashboard-panel">
            <div class="dashboard-head">
              <p class="eyebrow">Role Progress</p>
              <b>${Object.keys(history).length} / ${roleOrder.length} 已完成</b>
              <small>${Object.keys(history).length >= 2 ? '跨身份画像已可查看' : '完成两个身份后解锁跨身份画像'}</small>
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
                    <small>${done ? dimensionMeta[done.topDimensionKey]?.title || '信息不足' : '待测试'}</small>
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
  const role = roles[state.selectedRole]
  const answer = state.answers[state.current]
  const answeredCount = state.answers.filter((item) => item !== null && item !== undefined).length
  const progress = ((state.current + 1) / questions.length) * 100
  const canProceed = answer !== null && answer !== undefined

  app.innerHTML = `
    <main class="app-shell">
      <section class="quiz-layout">
        <aside class="status-panel">
          <p class="eyebrow">${role.badge}</p>
          <strong>${state.current + 1}<span> / ${questions.length}</span></strong>
          <div class="progress"><i style="width: ${progress}%"></i></div>
          <p>${answeredCount} 题已有选择</p>
        </aside>
        <section class="question-panel">
          <div class="question-head">
            <p class="question-count">成为${role.name}后，判断这句话和你有多接近</p>
            <h2>${question.text}</h2>
            <small class="question-caption">这是一个工作风格判断，没有标准答案。</small>
          </div>
          <div class="scale-strip" role="group" aria-label="作答选项">
            ${responseLabels.map((label, index) => `
              <button class="scale-option ${answer === index ? 'active' : ''}" data-answer="${index}">
                <span>${index + 1}</span>
                <b>${label}</b>
              </button>
            `).join('')}
          </div>
          <div class="skip-row">
            <button class="skip-option ${answer === skipAnswerValue ? 'active' : ''}" data-skip="true">
              ${skipAnswerLabel}
            </button>
          </div>
          <div class="actions">
            <button class="secondary" data-action="home">换身份</button>
            <button class="secondary" data-action="prev" ${state.current === 0 ? 'disabled' : ''}>上一题</button>
            <button class="primary" data-action="next" ${canProceed ? '' : 'disabled'}>${state.current === questions.length - 1 ? '查看结果' : '下一题'}</button>
          </div>
        </section>
      </section>
    </main>
  `
}

function renderDimensionBars(scoreMap) {
  return `
    <div class="dimension-bars">
      ${dimensionOrder.map((key) => {
        const score = scoreMap[key]
        const width = score === null ? 0 : score
        return `
          <article class="dimension-bar-card">
            <div>
              <b>${dimensionMeta[key].title}</b>
              <span>${score === null ? '信息不足' : `${score}%`}</span>
            </div>
            <i><span style="width:${width}%"></span></i>
          </article>
        `
      }).join('')}
    </div>
  `
}

function renderProjectFlavorCards(types) {
  return `
    <div class="flavor-grid">
      ${types.map((item) => {
        const profile = profiles[item.key]
        return `
          <article class="flavor-card">
            <img src="${avatarUrl(profile)}" alt="${profile.avatar.alt}" />
            <div>
              <b>${profile.title}</b>
              <small>${item.score}%</small>
              <p>${profile.subtitle}</p>
            </div>
          </article>
        `
      }).join('')}
    </div>
  `
}

function renderResult() {
  const result = getCurrentResult()
  saveCurrentResult(result)
  const role = roles[state.selectedRole]
  const topMeta = result.topDimensionKey ? dimensionMeta[result.topDimensionKey] : null
  const secondMeta = result.secondDimensionKey ? dimensionMeta[result.secondDimensionKey] : null
  const weakestMeta = result.weakestDimensionKey ? dimensionMeta[result.weakestDimensionKey] : null

  app.innerHTML = `
    <main class="app-shell">
      <section class="result-layout">
        <section class="result-main">
          <div class="result-hero no-avatar">
            <div class="role-badge">${role.icon}</div>
            <div>
              <p class="eyebrow">${role.name}身份结果</p>
              <h1>${result.title}</h1>
              <p class="result-subtitle">${result.subtitle}</p>
            </div>
          </div>

          <div class="personality-card">
            <p>这次最明显的方向</p>
            <h2>${topMeta ? topMeta.title : '信息不足'}</h2>
            <span>${result.confidenceText}。${result.blendText}</span>
            <div class="personality-grid">
              <article>
                <b>最强倾向在说什么</b>
                <small>${result.topNarrative}</small>
              </article>
              <article>
                <b>第二倾向怎么补充</b>
                <small>${secondMeta ? result.secondNarrative : '当前第二倾向的信息还不够稳。'}</small>
              </article>
              <article>
                <b>相对不那么牵动你的</b>
                <small>${weakestMeta ? result.weakestNarrative : '当前还看不出明确的相对弱项。'}</small>
              </article>
            </div>
          </div>

          <section class="section-block narrative-block">
            <p class="section-label">详细描述</p>
            <div class="narrative-copy">
              <p>${result.storyLead}</p>
              <p>${result.storyWorkPattern}</p>
              <p>${result.storyProjectFit}</p>
            </div>
          </section>

          <div class="analysis-grid">
            <article>
              <h3>身份视角</h3>
              <p>${role.description}</p>
            </article>
            <article>
              <h3>最强倾向摘要</h3>
              <p>${topMeta ? topMeta.summary : '先补充更多有效回答。'}</p>
            </article>
            <article>
              <h3>当前有效回答</h3>
              <p>${result.answeredCount} 题有效，${result.skippedCount} 题跳过，跳过率 ${result.skipRate}%。</p>
            </article>
            <article>
              <h3>结果怎么读</h3>
              <p>${result.blendText}</p>
            </article>
          </div>

          <section class="section-block">
            <p class="section-label">六种工作偏好概览</p>
            ${renderDimensionBars(result.dimensionScores)}
          </section>

          <section class="section-block">
            <p class="section-label">你可能会更喜欢的项目类型</p>
            <p class="section-copy">如果把你放进不同类型的项目里，你大概率会更容易对这些方向来感觉。</p>
            ${renderProjectFlavorCards(result.recommendedTypes)}
          </section>

          <div class="actions">
            <button class="secondary" data-action="review">回看题目</button>
            <button class="secondary" data-action="restart-role">重测本身份</button>
            <button class="secondary" data-action="home">换身份再测</button>
            <button class="primary" data-action="share">生成分享图</button>
          </div>
          <p class="share-status" aria-live="polite"></p>
        </section>

        <aside class="rank-panel">
          <p class="eyebrow">结果摘要</p>
          <div class="focus-list">
            ${[result.topDimension, result.secondDimension, result.weakestDimension].filter(Boolean).map((item, index) => `
              <article class="${index === 2 ? 'soft' : ''}">
                <b>${index === 0 ? '最强倾向' : index === 1 ? '第二倾向' : '相对较弱'} · ${dimensionMeta[item.key].title}</b>
                <span>${item.score}%</span>
              </article>
            `).join('')}
          </div>
          <div class="side-note">
            <b>提示</b>
            <small>${result.confidenceText}</small>
          </div>
        </aside>
      </section>
    </main>
  `
}

function renderCrossResult() {
  const insight = buildCrossRoleInsight(readHistory())
  if (!insight) {
    state.screen = 'intro'
    render()
    return
  }

  const topMeta = insight.topDimension ? dimensionMeta[insight.topDimension.key] : null
  const secondMeta = insight.secondDimension ? dimensionMeta[insight.secondDimension.key] : null
  const weakestMeta = insight.weakestDimension ? dimensionMeta[insight.weakestDimension.key] : null

  app.innerHTML = `
    <main class="app-shell">
      <section class="cross-layout">
        <section class="result-main cross-main">
          <p class="eyebrow">Cross Role Report</p>
          <h1>${insight.resultTitle}</h1>

          <div class="personality-card">
            <p>你的跨身份画像</p>
            <h2>${topMeta ? topMeta.title : '信息不足'}</h2>
            <span>${insight.overview}</span>
            <div class="personality-grid">
              <article>
                <b>最强倾向读法</b>
                <small>${insight.axisRead}</small>
              </article>
              <article>
                <b>第二倾向补充</b>
                <small>${secondMeta ? insight.supportRead : '第二倾向信息不足。'}</small>
              </article>
              <article>
                <b>结果稳定度</b>
                <small>${insight.confidenceText}。${insight.blendText}</small>
              </article>
            </div>
          </div>

          <section class="section-block narrative-block">
            <p class="section-label">详细描述</p>
            <div class="narrative-copy">
              <p>${insight.storyLead}</p>
              <p>${insight.storyWorkPattern}</p>
              <p>${insight.storyProjectFit}</p>
            </div>
          </section>

          <div class="analysis-grid">
            <article>
              <h3>已完成身份</h3>
              <p>${insight.completedCount} 个身份，总计 ${insight.totalAnswers} 道题。</p>
            </article>
            <article>
              <h3>当前跳过情况</h3>
              <p>${insight.totalSkipped} 题跳过，整体跳过率 ${insight.skipRate}%。</p>
            </article>
            <article>
              <h3>前两种明显倾向</h3>
              <p>${topMeta ? `${topMeta.title}` : '信息不足'}${secondMeta ? ` 与 ${secondMeta.title}` : ''}构成你当前最稳定的跨身份组合。</p>
            </article>
            <article>
              <h3>相对较弱方向</h3>
              <p>${weakestMeta ? insight.weakRead : '当前还看不出明确的相对弱项。'}</p>
            </article>
          </div>

          <section class="section-block">
            <p class="section-label">跨身份的六种工作偏好</p>
            ${renderDimensionBars(insight.dimensionScores)}
          </section>

          <section class="section-block">
            <p class="section-label">各身份最明显的两个方向</p>
            <div class="role-breakdown">
              ${insight.roleCards.map((card) => `
                <article>
                  <b>${card.roleName}</b>
                  <span>${card.leadTitle}${card.leadScore === null ? '' : ` · ${card.leadScore}%`}</span>
                  <small>第二倾向：${card.supportTitle}${card.supportScore === null ? '' : ` · ${card.supportScore}%`}；${card.read}；${card.confidence}</small>
                </article>
              `).join('')}
            </div>
          </section>

          <section class="section-block">
            <p class="section-label">你们可能更容易来感觉的项目类型</p>
            ${renderProjectFlavorCards(insight.recommendedTypes)}
          </section>

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
  state.screen = 'quiz'
  state.selectedRole = roleKey
  state.current = 0
  state.answers = Array(questionBanks[roleKey].length).fill(null)
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

  lines.forEach((lineText, index) => {
    ctx.fillText(lineText, x, y + index * lineHeight)
  })
}

function canvasToBlob(canvas) {
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
}

function drawBars(ctx, scoreMap, startY) {
  dimensionOrder.forEach((key, index) => {
    const y = startY + index * 88
    const score = scoreMap[key]
    ctx.fillStyle = '#101827'
    ctx.font = '800 28px "Microsoft YaHei", sans-serif'
    ctx.fillText(dimensionMeta[key].title, 140, y)
    ctx.fillStyle = '#65758c'
    ctx.font = '700 24px "Microsoft YaHei", sans-serif'
    ctx.fillText(score === null ? '信息不足' : `${score}%`, 980, y)
    ctx.fillStyle = '#dbe4ec'
    roundedRect(ctx, 140, y + 18, 860, 18, 9)
    ctx.fill()
    if (score !== null) {
      ctx.fillStyle = '#193f4a'
      roundedRect(ctx, 140, y + 18, Math.max(18, (score / 100) * 860), 18, 9)
      ctx.fill()
    }
  })
}

async function copyRoleShareImage(result) {
  const canvas = document.createElement('canvas')
  canvas.width = 1200
  canvas.height = 1600
  const ctx = canvas.getContext('2d')
  const role = roles[result.roleKey]
  const topMeta = result.topDimensionKey ? dimensionMeta[result.topDimensionKey] : null

  ctx.fillStyle = '#e8edf3'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
  bg.addColorStop(0, '#f8fafc')
  bg.addColorStop(1, '#e4efef')
  ctx.fillStyle = bg
  roundedRect(ctx, 72, 72, 1056, 1456, 36)
  ctx.fill()

  ctx.fillStyle = '#2d6d73'
  ctx.font = '800 30px "Microsoft YaHei", sans-serif'
  ctx.fillText('GAME WORKSTYLE COMPASS', 132, 150)
  ctx.fillStyle = '#101827'
  ctx.font = '900 60px "Microsoft YaHei", sans-serif'
  wrapText(ctx, result.title, 132, 240, 860, 72, 2)

  ctx.fillStyle = '#193f4a'
  roundedRect(ctx, 132, 310, 94, 94, 24)
  ctx.fill()
  ctx.fillStyle = '#ffffff'
  ctx.font = '900 48px "Microsoft YaHei", sans-serif'
  ctx.fillText(role.icon, 162, 372)
  ctx.fillStyle = '#4d5b70'
  ctx.font = '700 30px "Microsoft YaHei", sans-serif'
  ctx.fillText(`${role.name}身份`, 250, 360)
  ctx.font = '500 26px "Microsoft YaHei", sans-serif'
  wrapText(ctx, result.subtitle, 250, 404, 760, 38, 2)

  ctx.fillStyle = '#ffffff'
  roundedRect(ctx, 132, 470, 936, 210, 28)
  ctx.fill()
  ctx.fillStyle = '#101827'
  ctx.font = '900 34px "Microsoft YaHei", sans-serif'
  ctx.fillText('这次最明显的方向', 172, 530)
  ctx.font = '900 44px "Microsoft YaHei", sans-serif'
  ctx.fillText(topMeta ? topMeta.title : '信息不足', 172, 596)
  ctx.fillStyle = '#4d5b70'
  ctx.font = '500 26px "Microsoft YaHei", sans-serif'
  wrapText(ctx, result.topNarrative, 172, 644, 860, 38, 3)

  ctx.fillStyle = '#101827'
  ctx.font = '900 34px "Microsoft YaHei", sans-serif'
  ctx.fillText('六种工作偏好', 132, 780)
  drawBars(ctx, result.dimensionScores, 840)

  ctx.fillStyle = '#101827'
  ctx.font = '900 34px "Microsoft YaHei", sans-serif'
  ctx.fillText('你可能会更喜欢的项目类型', 132, 1380)
  result.recommendedTypes.forEach((item, index) => {
    const x = 132 + index * 300
    ctx.fillStyle = '#ffffff'
    roundedRect(ctx, x, 1418, 268, 72, 18)
    ctx.fill()
    ctx.fillStyle = '#193f4a'
    ctx.font = '800 22px "Microsoft YaHei", sans-serif'
    wrapText(ctx, item.title, x + 18, 1452, 190, 28, 1)
    ctx.fillStyle = '#6d4a0f'
    ctx.font = '900 24px "Microsoft YaHei", sans-serif'
    ctx.fillText(`${item.score}%`, x + 18, 1482)
  })

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
  bg.addColorStop(1, '#e4efef')
  ctx.fillStyle = bg
  roundedRect(ctx, 72, 72, 1056, 1456, 36)
  ctx.fill()

  ctx.fillStyle = '#2d6d73'
  ctx.font = '800 30px "Microsoft YaHei", sans-serif'
  ctx.fillText('CROSS ROLE REPORT', 132, 150)
  ctx.fillStyle = '#101827'
  ctx.font = '900 60px "Microsoft YaHei", sans-serif'
  wrapText(ctx, insight.resultTitle, 132, 240, 860, 72, 2)

  ctx.fillStyle = '#4d5b70'
  ctx.font = '500 28px "Microsoft YaHei", sans-serif'
  wrapText(ctx, insight.overview, 132, 330, 900, 42, 3)

  ctx.fillStyle = '#101827'
  ctx.font = '900 34px "Microsoft YaHei", sans-serif'
  ctx.fillText('跨身份工作偏好', 132, 500)
  drawBars(ctx, insight.dimensionScores, 560)

  ctx.fillStyle = '#101827'
  ctx.font = '900 34px "Microsoft YaHei", sans-serif'
  ctx.fillText('各身份最强倾向', 132, 1120)
  insight.roleCards.slice(0, 6).forEach((card, index) => {
    const x = 132 + (index % 2) * 470
    const y = 1160 + Math.floor(index / 2) * 104
    ctx.fillStyle = '#ffffff'
    roundedRect(ctx, x, y, 420, 78, 18)
    ctx.fill()
    ctx.fillStyle = '#193f4a'
    ctx.font = '800 24px "Microsoft YaHei", sans-serif'
    ctx.fillText(card.roleName, x + 16, y + 32)
    ctx.fillStyle = '#101827'
    ctx.font = '700 22px "Microsoft YaHei", sans-serif'
    ctx.fillText(card.leadTitle, x + 16, y + 62)
    ctx.fillStyle = '#65758c'
    ctx.font = '700 20px "Microsoft YaHei", sans-serif'
    ctx.fillText(card.leadScore === null ? '信息不足' : `${card.leadScore}%`, x + 336, y + 62)
  })

  const blob = await canvasToBlob(canvas)
  if (!blob) throw new Error('图片生成失败')
  if (!navigator.clipboard || !window.ClipboardItem) throw new Error('当前浏览器不支持直接复制图片')
  await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
}

app.addEventListener('click', async (event) => {
  const roleButton = event.target.closest('[data-role]')
  const answerButton = event.target.closest('[data-answer]')
  const skipButton = event.target.closest('[data-skip]')
  const actionButton = event.target.closest('[data-action]')

  if (roleButton) {
    const roleKey = roleButton.dataset.role
    const history = readHistory()
    if (history[roleKey]) {
      state.screen = 'result'
      state.selectedRole = roleKey
      state.current = 0
      state.answers = history[roleKey].answers || Array(questionBanks[roleKey].length).fill(null)
      render()
      return
    }
    startRole(roleKey)
    return
  }

  if (answerButton) {
    state.answers[state.current] = Number(answerButton.dataset.answer)
    if (state.current === getQuestions().length - 1) {
      state.screen = 'result'
    } else {
      state.current += 1
    }
    render()
    return
  }

  if (skipButton) {
    state.answers[state.current] = skipAnswerValue
    if (state.current === getQuestions().length - 1) {
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

  if (action === 'next') {
    const answer = state.answers[state.current]
    if (answer === null || answer === undefined) return
    if (state.current === getQuestions().length - 1) {
      state.screen = 'result'
    } else {
      state.current += 1
    }
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
      await copyRoleShareImage(getCurrentResult())
      status.textContent = '分享图已复制到剪贴板'
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
      const insight = buildCrossRoleInsight(readHistory())
      await copyCrossShareImage(insight)
      status.textContent = '跨身份分享图已复制到剪贴板'
    } catch (error) {
      status.textContent = error.message || '生成失败，请稍后再试'
    } finally {
      actionButton.disabled = false
    }
  }
})

render()
