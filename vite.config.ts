import { defineConfig } from 'vite'

export default defineConfig({
  // 使用相对路径，避免部署在子路径根 URL 与配置不一致时 JS/CSS 404 导致白屏
  base: './',
})
