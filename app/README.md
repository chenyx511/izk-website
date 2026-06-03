# 和泉金属工業 — 企业官网 & CMS

React + Vite 前台，Hono + tRPC + MySQL 后台。管理端使用账号密码登录（默认 `admin` / `admin`，首次启动自动创建）。

## 环境要求

- Node.js 20+
- MySQL 8+（可用下方 Docker 一键启动）

## 无法在 GitHub Pages 登录？

`*.github.io` **只有静态页面，没有后端 API**，所以登录一定会失败（与用户名无关）。

请任选其一：

| 方式 | 适合 | 结果 |
|------|------|------|
| **A. 本地开发** | 马上试用后台 | `http://localhost:3000/#/login` |
| **B. Render 部署** | 公网可登录的后台 | 获得 `https://xxx.onrender.com/#/login` |

默认管理员：**用户名 `admin`，密码 `admin`**（不是其他账号）。

---

## A. 本地快速开始（推荐）

### 1. 启动 MySQL（Docker）

```bash
cd app
docker compose up -d
# 等待约 15 秒，直到 mysql 健康
```

没有 Docker 时，请自行安装 MySQL 并创建数据库 `izk_site`。

### 2. 配置环境变量

```bash
cp .env.local.example .env
# 或手动创建 .env，内容见 .env.local.example
```

### 3. 安装依赖并初始化数据库

```bash
npm install
npm run db:push
npm run db:seed
```

### 4. 启动

```bash
npm run dev
```

浏览器打开：

- 前台：http://localhost:3000/#/
- **管理登录**：http://localhost:3000/#/login → `admin` / `admin`
- 管理后台：http://localhost:3000/#/admin

登录成功后请在「账号设置」中修改默认密码。

---

## B. 部署到 Render（公网完整后台）

1. 注册 https://render.com ，用 GitHub 连接仓库 `chenyx511/izk-website`
2. 新建 **Web Service**，根目录选 `app`，Build：`npm install && npm run build`，Start：`npm run start`
3. 在 Render 新建 **MySQL**，把 **Internal Database URL** 填到环境变量 `DATABASE_URL`
4. 添加环境变量 `APP_SECRET`（随机长字符串）
5. 部署完成后，打开 Render Shell 执行：

```bash
npm run db:push
npm run db:seed
```

6. 访问 `https://你的服务名.onrender.com/#/login`，使用 `admin` / `admin` 登录

仓库根目录的 `render.yaml` 可作 Blueprint 参考。

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
