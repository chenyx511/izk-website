# 和泉金属工業 — 企业官网

[和泉金属](app/) 企业官网与 CMS，技术栈：React + Vite + Hono + tRPC + MySQL。

## 本地开发（无需 MySQL，使用 SQLite 文件）

```bash
cd app && npm install && npm run db:push && npm run dev
```

登录 http://localhost:3000/#/login ，账号 **admin / admin**。详见 [app/README.md](app/README.md)。

## GitHub

- **源码仓库**：推送至 `chenyx511/izk-website`
- **GitHub Pages**（仅静态前台预览）：推送 `main` 分支后自动部署  
  - 首页：`https://chenyx511.github.io/izk-website/`  
  - 管理登录：`https://chenyx511.github.io/izk-website/#/login`（不要用 `/login`，会 404）  
  - 管理后台：`https://chenyx511.github.io/izk-website/#/admin`  
  - 说明：Pages **无后端 API**，登录/CMS 在 Pages 上不可用，需完整部署（见下）

## 完整部署（含管理后台）

GitHub Pages 无法运行 API 与数据库。推荐：

1. 在 [Render](https://render.com) 连接本仓库，使用根目录 `render.yaml`
2. 配置 `DATABASE_URL`（Render MySQL 或外部 MySQL）
3. 执行 `npm run db:push` 与 `npm run db:seed`（Render Shell 或本地连生产库）

也可自建 VPS：`npm run build && npm run start`。
