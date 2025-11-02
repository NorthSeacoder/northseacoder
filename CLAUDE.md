# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

**NorthSeaCoder** 是一个自动化 RSS 订阅聚合器，专门收集前端技术文章并生成 Markdown 文档。项目每天通过 GitHub Actions 自动抓取多个 RSS 源的新文章，去重后更新 README.md、TAGS.md 和分类页面。

## 开发命令

### 常用命令

```bash
# 安装依赖
yarn

# 运行主程序（开发模式）
npm start

# 使用 commitizen 提交代码（符合 conventional commits 规范）
npm run cz

# 生成 changelog
npm run cl
```

### 运行环境

- **Node.js 版本**: 18.x
- **包管理器**: Yarn 或 npm
- **运行环境**: 使用 `esno` 运行 TypeScript（无需编译）

## 项目架构

### 核心流程

1. **RSS 抓取** (`index.ts`):
   - 从配置文件中读取 RSS 订阅源
   - 并发抓取所有 RSS 源
   - 与本地缓存 `data/links.json` 对比去重
   - 识别新文章

2. **Markdown 生成** (`utils/write-md.ts`):
   - 更新 README.md（首页展示）
   - 更新 TAGS.md（标签分类页）
   - 生成 `category/details/*.md`（各 RSS 源的详细页面）

3. **自动化执行** (`.github/workflows/ci.yml`):
   - 每天 00:30 和 18:30 执行
   - 自动提交并推送更新

### 主要文件结构

```
├── index.ts                    # 入口文件，编排 RSS 抓取和生成流程
├── utils/
│   ├── fetch.ts               # RSS 抓取器，使用 rss-parser
│   ├── write-md.ts            # Markdown 文件生成器
│   ├── log.ts                 # 日志工具（success/info/warn）
│   └── index.ts               # 工具函数（isSameLink, formatTitle）
├── data/
│   ├── rss.json               # RSS 订阅源配置
│   ├── links.json             # 文章缓存（去重依据）
│   └── tags.json              # 标签配置
├── templates/
│   ├── README.md              # README 模板
│   ├── TAGS.md                # 标签页模板
│   └── DETAILS.md             # 分类详情页模板
├── category/
│   ├── tags/                  # 标签分类页面
│   └── details/               # RSS 源详情页面
└── .github/workflows/ci.yml   # GitHub Actions 自动化配置
```

## 配置管理

### RSS 订阅源配置

支持三种配置方式（优先级从高到低）：

1. **环境变量 RSS_FEEDS**（完全替换配置）
   ```json
   RSS_FEEDS='[{"title":"Node-Weekly","rss":"https://..."}]'
   ```

2. **环境变量 RSS_CONFIG**（覆盖特定订阅源）
   ```json
   RSS_CONFIG='{"Node-Weekly":"https://alternative-url.com"}'
   ```

3. **配置文件 data/rss.json**（默认方式）
   ```json
   [
     {"title": "Node-Weekly", "rss": "https://..."},
     {"title": "JavaScript-Weekly", "rss": "https://..."}
   ]
   ```

### 订阅源数据结构

```typescript
{
  title: string,           // 订阅源名称
  rss: string | string[]   // RSS URL，支持多个备用地址
}
```

### 环境变量示例

参考 `.env.example` 文件：
- `RSS_FEEDS`: 完整的 RSS 配置数组
- `RSS_CONFIG`: 需要覆盖的特定订阅源对象

## 核心功能

### URL 去重逻辑 (`utils/index.ts:isSameLink`)

- **常规链接**: 直接比较完整 URL
- **微信文章**: 特殊处理 `mp.weixin.qq.com`，通过 `sn` 和 `mid` 参数匹配
- 自动处理 `&amp;` 转义问题

### RSS 抓取策略 (`utils/fetch.ts`)

- 使用 `rss-parser` 解析 RSS
- 支持配置多个备用 URL，失败时自动切换
- 设置移动端 User-Agent 避免反爬
- 使用 `Async.tryEach` 尝试所有可用源

### Markdown 生成策略 (`utils/write-md.ts`)

1. **README.md**: 根据模板生成首页，展示所有来源的最新文章
2. **TAGS.md**: 根据标签配置生成分类页面
3. **category/details**: 为每个有更新的 RSS 源生成详情页

使用 `underscore.template` 进行模板渲染。

## 自动化流程

### GitHub Actions 工作流 (`.github/workflows/ci.yml`)

```yaml
on:
  schedule:
    - cron: '30 0,18 * * *'  # 每天 00:30 和 18:30 执行

jobs:
  update-readme:
    # 1. 检出代码
    # 2. 设置 Node.js 18
    # 3. 安装依赖
    # 4. 运行 npm start
    # 5. 提交并推送变更（仅当有更新时）
```

## 依赖项

### 主要依赖

- **rss-parser**: RSS 解析器
- **dayjs**: 日期处理
- **fs-extra**: 文件系统操作
- **chalk**: 终端彩色输出
- **underscore**: 模板引擎
- **async**: 异步控制
- **query-string**: URL 解析
- **esno**: TypeScript 执行器

### 开发依赖

- **commitizen**: 规范化提交工具
- **conventional-changelog-cli**: 自动生成 changelog
- **@types/***: TypeScript 类型定义

## 数据流

```
┌─────────────┐
│  RSS 配置   │──┐
└─────────────┘  │
                 ▼
┌─────────────────────────────────────────┐
│           index.ts (主流程)              │
│                                         │
│  1. 加载配置 → 2. 并发抓取 → 3. 去重     │
│  → 4. 更新缓存 → 5. 生成文档             │
└─────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│         utils/write-md.ts               │
│  ┌─────────┐ ┌──────────┐ ┌──────────┐  │
│  │ README  │ │  TAGS.md │ │ 详情页   │  │
│  └─────────┘ └──────────┘ └──────────┘  │
└─────────────────────────────────────────┘
```

## 开发要点

1. **TypeScript ES 模块**: 项目使用 `"type": "module"`，可直接运行 `.ts` 文件
2. **去重缓存**: 首次运行会创建 `data/links.json`，后续基于此去重
3. **模板渲染**: 所有输出文件均通过模板生成，避免直接修改
4. **环境优先级**: 环境变量 > 配置文件
5. **提交规范**: 使用 conventional commits（`npm run cz`）

## 注意事项

1. **微信链接处理**: WeChat 文章需特殊处理，不直接匹配 URL
2. **备用 RSS**: 每个订阅源可配置多个 URL，系统会自动尝试
3. **文件编码**: 生成的文件使用 UTF-8 编码
4. **日期格式**: 统一使用 `YYYY-MM-DD`
5. **自动提交**: 只有当有新内容时才提交，避免无效 commit
