# 和泉金属工業 — 企业官网 & CMS

React + Vite 前台，Hono + tRPC 后台。**默认使用 SQLite 单文件数据库**，无需安装 MySQL。

## 环境要求

- Node.js 20+

## 快速开始（无需 MySQL）

```bash
cd app
npm install

# 可选：复制环境变量（不复制也会用默认 SQLite 路径）
cp .env.local.example .env

# 创建表结构（dev 脚本会自动执行，也可手动）
npm run db:push

npm run dev
```

首次启动会自动：

1. 创建 `data/izk.db`（SQLite 文件）
2. 创建默认管理员 **admin / admin**
3. 若数据库为空，导入默认产品与站点内容

浏览器打开：

- 前台：http://localhost:3000/#/
- **管理登录**：http://localhost:3000/#/login
- 管理后台：http://localhost:3000/#/admin

## 数据存在哪？

| 文件 | 内容 |
|------|------|
| `data/izk.db` | 管理员、产品、CMS 文案、设置（可用 SQLite 工具查看） |
| `shared/cms-defaults.ts` | 代码里的**初始默认数据**（仅首次导入用） |
| `public/uploads/` | 后台上传的图片 |

备份后台数据：复制 `data/izk.db` 即可。

## GitHub Pages 说明

`*.github.io` **仍无法登录**（没有 Node 服务器）。要公网后台请部署到 Render 等（见根目录 `render.yaml`）。

## 生产构建

```bash
npm run build
npm run start
```

## 安全提示

上线前请修改默认管理员密码，并设置足够长的 `APP_SECRET`。
