import { dimensionMeta, dimensionOrder, skipAnswerValue } from './dimensions.js'
import { profiles, typeKeys } from './profiles.js'
import { roles } from './roles.js'

const typeDimensionWeights = {
  narrativeAdventure: { immersionCraft: 0.46, stabilityOwnership: 0.18, systemDepth: 0.12, contentGrowth: 0.08, socialCreation: 0.06, momentToMoment: 0.1 },
  openWorldRpg: { systemDepth: 0.3, immersionCraft: 0.26, contentGrowth: 0.2, stabilityOwnership: 0.11, momentToMoment: 0.08, socialCreation: 0.05 },
  competitiveShooter: { momentToMoment: 0.48, stabilityOwnership: 0.19, socialCreation: 0.1, systemDepth: 0.1, contentGrowth: 0.05, immersionCraft: 0.08 },
  coopSurvival: { socialCreation: 0.3, stabilityOwnership: 0.2, momentToMoment: 0.15, contentGrowth: 0.14, immersionCraft: 0.11, systemDepth: 0.1 },
  strategySimulation: { systemDepth: 0.46, contentGrowth: 0.2, stabilityOwnership: 0.15, momentToMoment: 0.09, immersionCraft: 0.05, socialCreation: 0.05 },
  casualPuzzleMobile: { contentGrowth: 0.28, momentToMoment: 0.22, immersionCraft: 0.18, stabilityOwnership: 0.14, systemDepth: 0.09, socialCreation: 0.09 },
  cardCollection: { contentGrowth: 0.34, immersionCraft: 0.16, socialCreation: 0.15, systemDepth: 0.14, stabilityOwnership: 0.11, momentToMoment: 0.1 },
  sportsRacing: { momentToMoment: 0.46, stabilityOwnership: 0.15, immersionCraft: 0.1, socialCreation: 0.05, systemDepth: 0.09, contentGrowth: 0.05 },
  actionFighting: { momentToMoment: 0.5, stabilityOwnership: 0.15, immersionCraft: 0.1, systemDepth: 0.1, socialCreation: 0.08, contentGrowth: 0.07 },
  sandboxSocial: { socialCreation: 0.46, contentGrowth: 0.15, immersionCraft: 0.14, stabilityOwnership: 0.1, momentToMoment: 0.09, systemDepth: 0.06 },
}

function toPercent(total, count) {
  if (!count) return null
  return Math.round((((total / count) - 1) / 5) * 100)
}

function clampPercent(value) {
  return Math.max(0, Math.min(100, Math.round(value)))
}

function sortDimensions(scoreMap) {
  return dimensionOrder
    .map((key) => ({ key, score: scoreMap[key] }))
    .filter((item) => item.score !== null)
    .sort((a, b) => b.score - a.score)
}

function describeBlend(gap) {
  if (gap >= 18) return '第一倾向非常明确'
  if (gap >= 10) return '前后顺序比较清楚'
  if (gap >= 5) return '第一倾向明显，但第二倾向也很强'
  return '前两个方向非常接近，更适合读成混合型'
}

function describeConfidence(answeredCount, totalQuestions) {
  if (answeredCount === 0) return '有效回答不足'
  const ratio = answeredCount / Math.max(1, totalQuestions)
  if (ratio >= 0.88) return '结果置信度较高'
  if (ratio >= 0.68) return '结果可读，但有一定保留'
  return '跳过较多，结果更适合看成方向提示'
}

function dimensionNarrative(score, meta) {
  if (score === null) return '这一轴当前信息不足。'
  if (score >= 68) return meta.high
  if (score >= 42) return meta.middle
  return meta.low
}

function roleStyleLead(roleName, topMeta, secondMeta, gap) {
  if (!topMeta) return `${roleName}这次给出的信息还不够多，暂时还看不出特别稳定的工作偏好。`
  if (!secondMeta) return `当你成为${roleName}后，你最容易被「${topMeta.title}」相关的工作内容牵住。`
  if (gap >= 15) {
    return `当你成为${roleName}后，你这次表现出很鲜明的「${topMeta.title}」倾向。你进入这个身份时，通常会先被这类工作内容点燃，而且这种偏好比其他方向明显更稳定。`
  }
  if (gap >= 8) {
    return `当你成为${roleName}后，你最先亮起来的是「${topMeta.title}」，但旁边的「${secondMeta.title}」也贴得很近。你不是单线条的人，更像是先从一个方向进入，再自然把另一个方向一起带上。`
  }
  return `当你成为${roleName}后，你这次最明显的两个方向是「${topMeta.title}」和「${secondMeta.title}」。它们离得很近，所以你的结果更像一种混合气质，而不是只被单一类型的工作内容牵着走。`
}

function roleWorkPattern(topMeta, secondMeta, weakestMeta) {
  const first = topMeta ? `你在项目里往往会先注意和「${topMeta.title}」有关的部分。` : '你这次的优先关注点还不够明显。'
  const second = secondMeta
    ? `接着，${secondMeta.title}会补上你做判断时的第二层依据，让你不只是看眼前，也会顺手顾到另一边。`
    : '目前还看不出特别稳定的第二层判断依据。'
  const third = weakestMeta
    ? `相对来说，「${weakestMeta.title}」不是最先点燃你的部分，所以你可能不会第一时间从这里进入一个项目。`
    : '相对较弱的方向当前还不够稳定。'
  return `${first}${second}${third}`
}

function roleProjectFit(roleName, typeTitles, topMeta) {
  if (!typeTitles.length) return `${roleName}这次还看不出很明确的项目偏好。`
  const [first, second, third] = typeTitles
  return `如果把你放进不同类型的项目里，你大概率会更容易对「${first}」先来感觉。${second ? `「${second}」也会比较容易牵住你，` : ''}${third ? `而「${third}」则像是你愿意继续往里走的第三种方向。` : '这已经能勾出你当前比较有感觉的项目轮廓。'}${topMeta ? ` 这通常和你对「${topMeta.title}」的敏感度有关。` : ''}`
}

function crossLead(topMeta, secondMeta, gap, count) {
  if (!topMeta) return `你已经测了 ${count} 个身份，但当前还看不出一个特别稳定的共同方向。`
  if (!secondMeta) return `跨过不同身份来看，你最稳定的共同点是「${topMeta.title}」。`
  if (gap >= 15) {
    return `把 ${count} 个身份叠在一起看，你最稳定的共同点是「${topMeta.title}」。不管你把自己放到哪个岗位上，这类工作内容都会更容易反复把你吸过去。`
  }
  if (gap >= 8) {
    return `把 ${count} 个身份叠在一起看，「${topMeta.title}」是最稳定的一条线，但「${secondMeta.title}」也跟得很近。你的跨身份画像不是单点爆发，而是两个方向一起构成了重心。`
  }
  return `把 ${count} 个身份叠在一起看，你的结果更像「${topMeta.title}」和「${secondMeta.title}」并排站着。你在不同岗位里的关注点会变，但最容易被点燃的范围大致落在这两边。`
}

function crossWorkPattern(topMeta, secondMeta, weakestMeta) {
  const first = topMeta ? `这说明你看项目时，最容易先从「${topMeta.title}」进入。` : '这次跨身份结果还不够集中。'
  const second = secondMeta
    ? `而「${secondMeta.title}」会让你在不同岗位之间保留一种相似的第二判断标准。`
    : '第二层判断标准暂时还不够稳定。'
  const third = weakestMeta
    ? `相对来说，「${weakestMeta.title}」不会那么早抓住你，所以它更像是后续才会被你慢慢补上的部分。`
    : '相对较弱的方向目前还不够清楚。'
  return `${first}${second}${third}`
}

function crossProjectFit(typeTitles) {
  if (!typeTitles.length) return '当前还看不出很稳定的跨身份项目偏好。'
  const [first, second, third] = typeTitles
  return `如果从更大的项目画像来读，你们这组结果最容易对「${first}」先来感觉。${second ? `「${second}」会是紧跟着的第二种可能，` : ''}${third ? `而「${third}」像是会在继续深入后慢慢显出吸引力的方向。` : '这已经足够形成一条比较明确的项目偏好线。'}`
}

export function rankProjectTypes(dimensionScores) {
  return typeKeys
    .map((typeKey) => {
      const weighted = Object.entries(typeDimensionWeights[typeKey]).reduce((sum, [dimension, weight]) => {
        const base = dimensionScores[dimension] ?? 50
        return sum + base * weight
      }, 0)
      return {
        key: typeKey,
        title: profiles[typeKey].title,
        avatar: profiles[typeKey].avatar,
        subtitle: profiles[typeKey].subtitle,
        score: clampPercent(weighted),
      }
    })
    .sort((a, b) => b.score - a.score)
}

export function evaluateRoleResult(roleKey, answers, questions) {
  const totals = Object.fromEntries(dimensionOrder.map((key) => [key, 0]))
  const counts = Object.fromEntries(dimensionOrder.map((key) => [key, 0]))
  const coverage = Object.fromEntries(dimensionOrder.map((key) => [key, 0]))
  let answeredCount = 0
  let skippedCount = 0

  questions.forEach((question) => {
    coverage[question.dimension] += 1
  })

  answers.forEach((answerValue, index) => {
    const question = questions[index]
    if (!question || answerValue === null || answerValue === undefined) return
    if (answerValue === skipAnswerValue) {
      skippedCount += 1
      return
    }

    const rawScore = Number(answerValue) + 1
    if (Number.isNaN(rawScore)) return
    const adjusted = question.keyedDirection === 'reverse' ? 7 - rawScore : rawScore
    totals[question.dimension] += adjusted * (question.weight || 1)
    counts[question.dimension] += question.weight || 1
    answeredCount += 1
  })

  const dimensionScores = Object.fromEntries(
    dimensionOrder.map((key) => [key, toPercent(totals[key], counts[key])]),
  )

  const dimensionCoverage = Object.fromEntries(
    dimensionOrder.map((key) => [key, coverage[key] ? Math.round((counts[key] / coverage[key]) * 100) : 0]),
  )

  const sortedDimensions = sortDimensions(dimensionScores)
  const topDimension = sortedDimensions[0] || null
  const secondDimension = sortedDimensions[1] || null
  const weakestDimension = [...sortedDimensions].reverse()[0] || null
  const gap = topDimension && secondDimension ? topDimension.score - secondDimension.score : 0
  const recommendedTypes = rankProjectTypes(dimensionScores).slice(0, 3)
  const role = roles[roleKey]
  const confidenceText = describeConfidence(answeredCount, questions.length)
  const topMeta = topDimension ? dimensionMeta[topDimension.key] : null
  const secondMeta = secondDimension ? dimensionMeta[secondDimension.key] : null
  const weakestMeta = weakestDimension ? dimensionMeta[weakestDimension.key] : null
  const typeTitles = recommendedTypes.map((item) => item.title)

  return {
    version: 2,
    roleKey,
    roleName: role.name,
    answeredCount,
    skippedCount,
    totalQuestions: questions.length,
    skipRate: Math.round((skippedCount / Math.max(1, questions.length)) * 100),
    dimensionScores,
    dimensionCoverage,
    topDimensionKey: topDimension?.key || null,
    secondDimensionKey: secondDimension?.key || null,
    weakestDimensionKey: weakestDimension?.key || null,
    recommendedTypes,
    shareLine: topMeta
      ? `${role.name} · ${topMeta.title} ${topDimension.score}%`
      : `${role.name} · 结果信息不足`,
    title: topMeta ? `${role.name}的${topMeta.resultTitle}` : `${role.name}结果信息不足`,
    subtitle: topMeta ? `${topMeta.summary}${secondMeta ? ` 第二倾向更接近 ${secondMeta.title}。` : ''}` : '需要更多有效回答才能形成稳定判断。',
    confidenceText,
    blendText: topMeta && secondMeta
      ? `${topMeta.title}领先 ${secondMeta.title} ${gap} 分，${describeBlend(gap)}。`
      : '当前有效回答不足，先把它看成一次方向探索。',
    topNarrative: topMeta ? dimensionNarrative(topDimension.score, topMeta) : '你这次跳过较多，建议补充更多有效回答后再看结果。',
    secondNarrative: secondMeta ? dimensionNarrative(secondDimension.score, secondMeta) : '第二倾向信息不足。',
    weakestNarrative: weakestMeta ? dimensionNarrative(weakestDimension.score, weakestMeta) : '当前还看不出明显的相对弱项。',
    storyLead: roleStyleLead(role.name, topMeta, secondMeta, gap),
    storyWorkPattern: roleWorkPattern(topMeta, secondMeta, weakestMeta),
    storyProjectFit: roleProjectFit(role.name, typeTitles, topMeta),
    topDimension,
    secondDimension,
    weakestDimension,
  }
}

export function buildCrossRoleInsight(history) {
  const entries = Object.entries(history)
    .map(([roleKey, entry]) => ({ ...entry, roleKey }))
    .filter((entry) => entry.version === 2 && entry.dimensionScores)

  if (entries.length < 2) return null

  const combinedTotals = Object.fromEntries(dimensionOrder.map((key) => [key, 0]))
  const combinedWeights = Object.fromEntries(dimensionOrder.map((key) => [key, 0]))
  let totalAnswered = 0
  let totalSkipped = 0

  entries.forEach((entry) => {
    totalAnswered += entry.answeredCount || 0
    totalSkipped += entry.skippedCount || 0
    dimensionOrder.forEach((dimension) => {
      const score = entry.dimensionScores[dimension]
      const weight = entry.dimensionCoverage?.[dimension] || 0
      if (score === null || weight === 0) return
      combinedTotals[dimension] += score * weight
      combinedWeights[dimension] += weight
    })
  })

  const combinedScores = Object.fromEntries(
    dimensionOrder.map((dimension) => [
      dimension,
      combinedWeights[dimension] ? clampPercent(combinedTotals[dimension] / combinedWeights[dimension]) : null,
    ]),
  )

  const sortedDimensions = sortDimensions(combinedScores)
  const topDimension = sortedDimensions[0]
  const secondDimension = sortedDimensions[1]
  const weakestDimension = [...sortedDimensions].reverse()[0]
  const topMeta = topDimension ? dimensionMeta[topDimension.key] : null
  const secondMeta = secondDimension ? dimensionMeta[secondDimension.key] : null
  const weakestMeta = weakestDimension ? dimensionMeta[weakestDimension.key] : null
  const gap = topDimension && secondDimension ? topDimension.score - secondDimension.score : 0
  const recommendedTypes = rankProjectTypes(combinedScores).slice(0, 4)
  const skipRate = Math.round((totalSkipped / Math.max(1, totalAnswered + totalSkipped)) * 100)
  const typeTitles = recommendedTypes.map((item) => item.title)

  const roleCards = entries.map((entry) => {
    const ranked = sortDimensions(entry.dimensionScores)
    const lead = ranked[0]
    const support = ranked[1]
    return {
      roleKey: entry.roleKey,
      roleName: roles[entry.roleKey].shortName,
      leadTitle: lead ? dimensionMeta[lead.key].title : '信息不足',
      supportTitle: support ? dimensionMeta[support.key].title : '信息不足',
      leadScore: lead?.score ?? null,
      supportScore: support?.score ?? null,
      read: lead && support ? describeBlend(lead.score - support.score) : '有效回答不足',
      confidence: describeConfidence(entry.answeredCount || 0, entry.totalQuestions || 1),
    }
  })

  return {
    resultTitle: topMeta ? `跨身份的${topMeta.resultTitle}` : '跨身份结果信息不足',
    overview: topMeta
      ? `你已经完成 ${entries.length} 个身份、${totalAnswered + totalSkipped} 道题。综合来看，「${topMeta.title}」最稳定，说明多个岗位视角叠在一起后，你最容易被这类工作内容牵动。`
      : `你已经完成 ${entries.length} 个身份，但当前有效回答仍然偏少。`,
    completedCount: entries.length,
    totalAnswers: totalAnswered + totalSkipped,
    totalAnswered,
    totalSkipped,
    skipRate,
    confidenceText: describeConfidence(totalAnswered, totalAnswered + totalSkipped),
    blendText: topMeta && secondMeta
      ? `${topMeta.title}领先 ${secondMeta.title} ${gap} 分，${describeBlend(gap)}。`
      : '跨身份画像仍需要更多有效回答来收敛。',
    axisRead: topMeta ? topMeta.high : '当前信息不足。',
    supportRead: secondMeta ? secondMeta.middle : '第二倾向信息不足。',
    weakRead: weakestMeta ? weakestMeta.low : '相对较弱方向的信息不足。',
    storyLead: crossLead(topMeta, secondMeta, gap, entries.length),
    storyWorkPattern: crossWorkPattern(topMeta, secondMeta, weakestMeta),
    storyProjectFit: crossProjectFit(typeTitles),
    dimensionScores: combinedScores,
    topDimension,
    secondDimension,
    weakestDimension,
    roleCards,
    recommendedTypes,
    shareLine: topMeta
      ? `${entries.length} 个身份 · ${topMeta.title} ${topDimension.score}%`
      : `${entries.length} 个身份 · 信息不足`,
  }
}
