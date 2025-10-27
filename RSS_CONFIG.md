# RSS 订阅源配置说明

## 配置方式

本项目支持三种方式配置 RSS 订阅源，按优先级从高到低排列：

### 1. 完全使用环境变量配置（最高优先级）

通过 `RSS_FEEDS` 环境变量配置所有 RSS 订阅源。

**优点**：
- 完全灵活，可以动态配置所有订阅源
- 适合在不同环境使用不同的订阅源配置
- 不需要修改代码仓库中的配置文件

**格式**：JSON 数组

**示例**：
```bash
export RSS_FEEDS='[
  {
    "title": "Node-Weekly",
    "rss": "https://cprss.s3.amazonaws.com/nodeweekly.com.xml"
  },
  {
    "title": "JavaScript-Weekly",
    "rss": "https://cprss.s3.amazonaws.com/javascriptweekly.com.xml"
  },
  {
    "title": "Frontend-Focus",
    "rss": "https://cprss.s3.amazonaws.com/frontendfoc.us.xml"
  }
]'
```

### 2. 覆盖特定订阅源（中等优先级）

通过 `RSS_CONFIG` 环境变量覆盖特定订阅源的 URL。

**优点**：
- 保持大部分配置不变，只修改个别订阅源
- 可以为某个订阅源指定备用 URL

**格式**：JSON 对象，key 为订阅源标题，value 为新的 RSS URL

**示例**：
```bash
export RSS_CONFIG='{
  "Node-Weekly": "https://alternative-url.com/node-weekly.xml",
  "阮一峰的网络日志": "https://backup-url.com/ruanyifeng.xml"
}'
```

### 3. 使用配置文件（默认方式）

如果没有设置以上环境变量，系统会自动从 `./data/rss.json` 文件读取配置。

**优点**：
- 简单直接，适合固定配置
- 易于管理和版本控制

**文件位置**：`./data/rss.json`

**格式示例**：
```json
[
  {
    "title": "Node-Weekly",
    "rss": "https://cprss.s3.amazonaws.com/nodeweekly.com.xml"
  },
  {
    "title": "JavaScript-Weekly",
    "rss": "https://cprss.s3.amazonaws.com/javascriptweekly.com.xml"
  }
]
```

## RSS 配置项说明

每个 RSS 订阅源包含以下字段：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | ✅ | 订阅源标题，用于标识和展示 |
| `rss` | string \| string[] | ✅ | RSS Feed URL，支持单个或多个备用 URL |

**多个备用 URL 示例**：
```json
{
  "title": "Node-Weekly",
  "rss": [
    "https://primary-url.com/feed.xml",
    "https://backup-url.com/feed.xml"
  ]
}
```

系统会按顺序尝试每个 URL，直到成功获取到内容。

## 使用场景

### 场景 1：本地开发

本地开发时使用配置文件：
```bash
npm start
```

### 场景 2：GitHub Actions

在 `.github/workflows/main.yml` 中设置环境变量：
```yaml
- name: Run RSS Fetch
  env:
    RSS_FEEDS: ${{ secrets.RSS_FEEDS }}
  run: npm start
```

然后在 GitHub Repository Settings > Secrets 中添加 `RSS_FEEDS` 变量。

### 场景 3：覆盖特定订阅源

保持大部分配置不变，只修改个别订阅源：
```bash
export RSS_CONFIG='{"阮一峰的网络日志":"https://backup-url.com/feed.xml"}'
npm start
```

### 场景 4：Docker 部署

在 `docker-compose.yml` 中配置：
```yaml
services:
  rss-fetcher:
    image: your-image
    environment:
      - RSS_FEEDS=[{"title":"Node-Weekly","rss":"https://..."}]
```

或使用 `.env` 文件：
```bash
docker run --env-file .env your-image
```

## 配置优先级总结

```
RSS_FEEDS 环境变量（完全替换）
    ↓
RSS_CONFIG 环境变量（部分覆盖）
    ↓
./data/rss.json 文件（默认配置）
```

## 注意事项

1. **JSON 格式**：环境变量中的 JSON 必须是有效的 JSON 字符串，注意转义引号
2. **title 匹配**：`RSS_CONFIG` 中的 key 必须与配置中的 `title` 完全匹配（包括大小写）
3. **备用 URL**：如果配置了多个 RSS URL，系统会依次尝试，直到成功
4. **日志输出**：运行时会显示使用的配置来源（环境变量或文件）

## 测试配置

可以通过以下命令测试配置是否正确：

```bash
# 测试完整环境变量配置
RSS_FEEDS='[{"title":"Test","rss":"https://example.com/feed.xml"}]' npm start

# 测试覆盖配置
RSS_CONFIG='{"Node-Weekly":"https://alternative.com/feed.xml"}' npm start

# 测试默认配置
npm start
```
