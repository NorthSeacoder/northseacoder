<div align="center"><img width="100" src="https://avatars.githubusercontent.com/u/30330837?s=400&u=1cd6e7c560308a159cf25295d652e375924ddf7e&v=4" style="border-radius: 50%;" /><h1>NorthSeaCoder</h1>
每天定时抓取感兴趣的前端技术文章，并推送到 GitHub 方便查看
<p>🌱 聚焦前端工程化 · ⚙️ 热衷自动化脚本 · 🧰 持续整理优质前端内容</p>
</div>

<br/>

<div align="center" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1.5rem; margin: 2rem 0;">
  <a href="https://github.com/anuraghazra/github-readme-stats">
    <img alt="Top Langs" src="https://github-readme-stats.vercel.app/api/top-langs/?username=northseacoder" style="height: 160px;" />
  </a>
  <a href="https://github.com/anuraghazra/github-readme-stats">
    <img alt="GitHub Stats" src="https://github-readme-stats.vercel.app/api?username=northseacoder" style="height: 160px;" />
  </a>
  <a href="https://github.com/DenverCoder1/github-readme-streak-stats">
    <img alt="GitHub Streak" src="https://streak-stats.demolab.com?user=northseacoder&locale=zh_Hans&date_format=%5BY.%5Dm.%5Dd" style="height: 160px;" />
  </a>
</div>

<div align="center" style="margin: 2rem 0;">
  <a href="https://github.com/vn7n24fzkq/github-profile-summary-cards">
    <img alt="Profile Summary" src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=northseacoder&theme=github" />
  </a>
</div>

<br/>

## 项目参考
- [front-end-rss](https://github.com/ChanceYu/front-end-rss);

- [CaoMeiYouRen](https://github.com/CaoMeiYouRen/CaoMeiYouRen);

- [auto-green](https://github.com/justjavac/auto-green);

## 配置说明
- 默认从 [`data/rss.json`](./data/rss.json) 读取 RSS 订阅配置
- 支持通过环境变量 `RSS_FEEDS` / `RSS_CONFIG` 覆盖，详见 [RSS 配置说明](./RSS_CONFIG.md)

##

:alarm_clock: 更新时间: <%= obj.currentDate %>，:rocket: 更新条数: +<%= obj.newData.length %>， ![](/assets/dot.png) 表示有更新，[文章分类](/TAGS.md)

## 文章来源

<% _.each(obj.linksJson, function(e){ var rssTitle = obj.formatTitle(e.title); %>
- [<%= rssTitle %>](#<%= rssTitle.toLowerCase() %>)<% if (e.title in obj.newData.rss){ %> ![](/assets/dot.png)<% } %>
<% }) %>

## 文章链接

<% _.each(obj.linksJson, function(e){ var rssTitle = obj.formatTitle(e.title); %>
<details open>
<summary id="<%= rssTitle.toLowerCase() %>">
  <strong><%= rssTitle %></strong><% if (e.title in obj.newData.rss){ %> <img src="/assets/dot.png" alt="本次有更新" /><% } %>
</summary>
<p></p>

<% _.each(e.items.slice(0,20), function(item){ var itemTitle = obj.formatTitle(item.title); %>
- **<%= item.date %>** - [<%= itemTitle %>](<%= item.link %>)<% if (e.title in obj.newData.rss && item.link in obj.newData.links){ %> <img src="/assets/new.png" alt="NEW" /><% } %>
<% }) %>

<div align="right">
<a href="/category/details/<%= e.title %>.md">查看更多</a> | <a href="#文章来源">⬆ 返回顶部</a>
</div>
</details>

<% }) %>
