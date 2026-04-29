# gameProgramerTest

本仓库已配置 GitHub Pages 自动部署（GitHub Actions）。

## 本地运行

```bash
npm install
npm run dev
```

默认开发地址通常为：`http://localhost:5173`。

## 构建命令

```bash
npm run build
```

构建产物目录：`dist/`。

## 部署说明

- 工作流文件：`.github/workflows/deploy.yml`
- 触发条件：推送到 `main` 或 `master` 分支（以及手动触发）
- 部署地址：<https://kongxiangzhouye.github.io/gameProgramerTest/>

> 若仓库默认分支不是 `main`，请将工作流中的触发分支改为实际默认分支。

## 前端路由与 404 fallback

对于前端 SPA 路由，工作流在构建后会执行：

```bash
cp dist/index.html dist/404.html
```

这样在 GitHub Pages 刷新深链接时，会回退到 `index.html`，避免 404。

## 题库维护说明

建议约定以下维护流程：

1. 在独立的数据文件（如 `src/data/questions.json`）中维护题库。
2. 每次修改题库后，本地运行 `npm run build` 验证构建通过。
3. 提交并推送到默认分支（`main` 或 `master`），由 GitHub Actions 自动部署。
4. 部署后访问线上地址抽检题目展示与路由。
