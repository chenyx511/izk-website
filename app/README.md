# 和泉金属工業 — 企业官网 & CMS

React + Vite 前台，Hono + tRPC + MySQL 后台。管理端使用账号密码登录（默认 `admin` / `admin`，首次启动自动创建）。

## 环境要求

- Node.js 20+
- MySQL 8+

## 快速开始

```bash
cd app
cp .env.example .env
# 编辑 .env，填写 DATABASE_URL 与 APP_SECRET

npm install
npm run db:push    # 同步数据库表结构
npm run db:seed    # 导入默认内容与产品（可选，推荐）

npm run dev        # http://localhost:3000
```

- 前台：`/#/`
- 管理登录：`/#/login`（默认账号 admin / admin）
- 管理后台：`/#/admin`

## 生产构建

```bash
npm run build
npm run start
```

## 主要能力

| 模块 | 说明 |
|------|------|
| 认证 | 服务端 scrypt 密码哈希 + HttpOnly Cookie 会话 |
| 内容 CMS | 图片、联系方式等可配置字段（`site_content`） |
| 产品 | 完整产品模型（规格、特点、多语言字段等） |
| 设置 | 站点模板等（`site_settings`） |
| 上传 | `POST /api/upload`（需登录，图片存于 `public/uploads`） |

## 安全提示

上线前请务必：

1. 修改默认管理员密码
2. 将 `APP_SECRET` 设为足够长的随机字符串
3. 使用 HTTPS，确保 Cookie `secure` 生效
