import { defineConfig } from 'vite'

// GitHub Pages「项目站」为 https://<user>.github.io/<repo>/，必须使用 /<repo>/ 作为 base。
// 若用相对 base './'，用户打开 .../repo（无尾部斜杠）时 ./assets/... 会解析到 .../assets/... 而 404 白屏。
const pagesRepo = process.env.GITHUB_PAGES_BASE
const base = pagesRepo ? `/${pagesRepo}/` : '/'

export default defineConfig({
  base,
})
