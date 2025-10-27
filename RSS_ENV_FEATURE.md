# RSS 环境变量配置功能说明

## 功能概述

现在 RSS 订阅源支持三种配置方式，按优先级从高到低：

1. **RSS_FEEDS** 环境变量（完全替换）- 最高优先级
2. **RSS_CONFIG** 环境变量（部分覆盖）- 中等优先级  
3. **data/rss.json** 文件（默认配置）- 最低优先级

## 实现原理

### 代码修改

在 `index.ts` 中添加了 `loadRssConfig()` 函数：

```typescript
const loadRssConfig = (): RssItem[] => {
    // 优先从环境变量 RSS_FEEDS 读取
    if (process.env.RSS_FEEDS) {
        try {
            const rssFeeds = JSON.parse(process.env.RSS_FEEDS);
            if (Array.isArray(rssFeeds)) {
                log('从环境变量 RSS_FEEDS 加载配置');
                return rssFeeds as RssItem[];
            }
            log('环境变量 RSS_FEEDS 格式应为数组，使用默认配置文件');
        } catch (e) {
            log('环境变量 RSS_FEEDS 解析失败，使用默认配置文件');
        }
    }
    
    // 如果环境变量不存在，从文件读取
    log('从配置文件加载 RSS 配置');
    return fs.readJsonSync(RSS_PATH);
};
```

### 已有功能（utils/fetch.ts）

原有代码已支持 `RSS_CONFIG` 环境变量覆盖特定订阅源：

```typescript
let rssConfig: RssConfig = {};
try {
    rssConfig = JSON.parse(process.env.RSS_CONFIG || '{}');
} catch (e) {}

// 在获取 RSS 时，优先使用环境变量中配置的 URL
const envRss = rssConfig[rssItem.title];
if (envRss) {
    rssArray.unshift(envRss);
}
```

## 使用场景

### 场景 1：本地开发
```bash
# 使用默认配置
npm start
```

### 场景 2：测试特定 RSS 源
```bash
# 只抓取一个源进行测试
RSS_FEEDS='[{"title":"Node-Weekly","rss":"https://cprss.s3.amazonaws.com/nodeweekly.com.xml"}]' npm start
```

### 场景 3：临时替换失效的源
```bash
# 阮一峰的博客如果失效，使用备用地址
RSS_CONFIG='{"阮一峰的网络日志":"https://backup-url.com/feed.xml"}' npm start
```

### 场景 4：GitHub Actions 中使用密钥
```yaml
- name: Fetch RSS
  env:
    RSS_FEEDS: ${{ secrets.RSS_FEEDS }}
  run: npm start
```

### 场景 5：Docker 部署
```yaml
services:
  rss:
    image: rss-fetcher
    environment:
      - RSS_FEEDS=${RSS_FEEDS}
```

## 特性

✅ **向后兼容**：如果不设置环境变量，默认从 `data/rss.json` 读取
✅ **优先级清晰**：RSS_FEEDS > RSS_CONFIG > rss.json
✅ **错误处理**：JSON 解析失败时自动回退到默认配置
✅ **日志输出**：清晰显示使用的配置来源
✅ **类型安全**：添加了类型检查，确保 RSS_FEEDS 为数组格式

## 新增文件

1. **`.env.example`** - 环境变量配置示例
2. **`RSS_CONFIG.md`** - 详细的配置说明文档
3. **`USAGE_EXAMPLE.md`** - 使用示例和常见问题
4. **`RSS_ENV_FEATURE.md`** - 功能说明（本文件）

## 测试结果

```bash
# 测试 1: 默认配置
$ npm start
2025-10-27 06:50:08 - 从配置文件加载 RSS 配置  ✅

# 测试 2: 使用 RSS_FEEDS
$ RSS_FEEDS='[{"title":"Node-Weekly","rss":"..."}]' npm start
2025-10-27 06:48:24 - 从环境变量 RSS_FEEDS 加载配置  ✅

# 测试 3: 使用 RSS_CONFIG  
$ RSS_CONFIG='{"Node-Weekly":"..."}' npm start
2025-10-27 06:48:33 - 从配置文件加载 RSS 配置  ✅
（RSS_CONFIG 在 fetch.ts 中处理，会优先使用配置的 URL）
```

## 优势

1. **灵活性**：可以在不修改代码的情况下改变订阅源配置
2. **安全性**：敏感的 RSS URL 可以保存在环境变量或密钥中
3. **便捷性**：CI/CD 环境中可以使用不同的配置
4. **可扩展性**：未来可以轻松添加更多配置选项
5. **兼容性**：完全向后兼容，现有用户无需修改任何配置

## 下一步可能的优化

- [ ] 支持从远程 URL 加载配置
- [ ] 添加配置校验和格式化工具
- [ ] 支持配置热更新
- [ ] 添加配置缓存机制
