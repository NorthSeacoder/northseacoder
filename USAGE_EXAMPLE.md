# RSS 环境变量配置示例

## 快速开始

### 方法 1：使用默认配置（推荐）

直接运行，使用 `data/rss.json` 中的配置：

```bash
npm start
```

### 方法 2：完全自定义所有 RSS 源

使用 `RSS_FEEDS` 环境变量替换所有订阅源：

```bash
# 单行方式
RSS_FEEDS='[{"title":"Node-Weekly","rss":"https://cprss.s3.amazonaws.com/nodeweekly.com.xml"},{"title":"JavaScript-Weekly","rss":"https://cprss.s3.amazonaws.com/javascriptweekly.com.xml"}]' npm start

# 多行方式（bash）
export RSS_FEEDS='[
  {
    "title": "Node-Weekly",
    "rss": "https://cprss.s3.amazonaws.com/nodeweekly.com.xml"
  },
  {
    "title": "JavaScript-Weekly",
    "rss": "https://cprss.s3.amazonaws.com/javascriptweekly.com.xml"
  }
]'
npm start
```

### 方法 3：覆盖特定 RSS 源

使用 `RSS_CONFIG` 环境变量只覆盖部分订阅源：

```bash
# 覆盖单个源
RSS_CONFIG='{"Node-Weekly":"https://alternative-url.com/feed.xml"}' npm start

# 覆盖多个源
RSS_CONFIG='{"Node-Weekly":"https://url1.com/feed.xml","阮一峰的网络日志":"https://url2.com/feed.xml"}' npm start
```

### 方法 4：使用 .env 文件

1. 复制示例文件：
```bash
cp .env.example .env
```

2. 编辑 `.env` 文件：
```env
RSS_FEEDS='[{"title":"Node-Weekly","rss":"https://..."}]'
```

3. 运行（需要安装 dotenv 包）：
```bash
npm start
```

## GitHub Actions 配置示例

在 `.github/workflows/main.yml` 中：

```yaml
name: Update RSS Feed

on:
  schedule:
    - cron: '0 */12 * * *'  # 每12小时运行一次
  workflow_dispatch:

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Fetch RSS feeds
        env:
          RSS_FEEDS: ${{ secrets.RSS_FEEDS }}
          # 或使用 RSS_CONFIG
          # RSS_CONFIG: ${{ secrets.RSS_CONFIG }}
        run: npm start
      
      - name: Commit changes
        run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add .
          git commit -m "Update RSS feeds" || exit 0
          git push
```

然后在 GitHub Repository Settings → Secrets and variables → Actions 中添加：
- Secret name: `RSS_FEEDS`
- Secret value: 你的 JSON 配置

## Docker 配置示例

### docker-compose.yml

```yaml
version: '3'
services:
  rss-fetcher:
    build: .
    environment:
      - RSS_FEEDS=[{"title":"Node-Weekly","rss":"https://..."}]
    volumes:
      - ./data:/app/data
```

### 使用 .env 文件

```bash
docker run --env-file .env your-image-name
```

## 配置验证

测试配置是否生效：

```bash
# 查看日志输出
npm start

# 输出示例：
# 2025-10-27 06:47:56 - 从环境变量 RSS_FEEDS 加载配置  ← 使用环境变量
# 或
# 2025-10-27 06:47:56 - 从配置文件加载 RSS 配置  ← 使用文件配置
```

## 常见问题

### Q: JSON 格式错误怎么办？

A: 确保 JSON 格式正确，可以使用在线 JSON 验证工具检查。注意：
- 字段名和字符串值必须用双引号
- 不能有尾随逗号
- 在 bash 中使用单引号包裹整个 JSON

### Q: 如何添加多个备用 URL？

A: 将 `rss` 字段设为数组：

```json
{
  "title": "Node-Weekly",
  "rss": [
    "https://primary-url.com/feed.xml",
    "https://backup-url.com/feed.xml"
  ]
}
```

系统会依次尝试，直到成功。

### Q: RSS_FEEDS 和 RSS_CONFIG 可以同时使用吗？

A: 可以，但 `RSS_FEEDS` 优先级更高。如果设置了 `RSS_FEEDS`，`RSS_CONFIG` 会被忽略。

### Q: 如何在 Windows 中设置环境变量？

A: 
```powershell
# PowerShell
$env:RSS_FEEDS='[{"title":"Node-Weekly","rss":"https://..."}]'
npm start

# CMD
set RSS_FEEDS=[{"title":"Node-Weekly","rss":"https://..."}]
npm start
```

## 更多信息

详细配置说明请参考：[RSS_CONFIG.md](./RSS_CONFIG.md)
