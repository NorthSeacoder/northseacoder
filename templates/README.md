<%
var totalSources = obj.linksJson.length;
var totalArticles = _.reduce(obj.linksJson, function(sum, source) { return sum + (source.items ? source.items.length : 0); }, 0);
var updatedSources = Object.keys(obj.newData.rss || {}).length;
var formatNumber = function(num) {
    if (num === undefined || num === null) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
var latestArticles = [];
if (obj.newData && obj.newData.length) {
    obj.linksJson.forEach(function(source) {
        (source.items || []).forEach(function(item) {
            if (item.link in obj.newData.links) {
                latestArticles.push({
                    date: item.date,
                    title: obj.formatTitle(item.title),
                    link: item.link,
                    source: obj.formatTitle(source.title)
                });
            }
        });
    });
    latestArticles = _.sortBy(latestArticles, function(article) {
        return -new Date(article.date).getTime();
    }).slice(0, 6);
}
%>
<a id="top"></a>
<div align="center">
  <img width="116" src="https://avatars.githubusercontent.com/u/30330837?s=400&u=1cd6e7c560308a159cf25295d652e375924ddf7e&v=4" style="border-radius: 50%;" />
  <h1>NorthSeaCoder</h1>
  <p>每天定时抓取感兴趣的前端技术文章，并推送到 GitHub 方便查看</p>
  <p>🌱 聚焦前端工程化 · ⚙️ 热衷自动化脚本 · 🧰 持续整理优质前端内容</p>
  <p>
    <a href="./TAGS.md">📚 分类总览</a> ·
    <a href="./RSS_CONFIG.md">⚙️ RSS 配置指南</a> ·
    <a href="https://github.com/northseacoder">🌐 更多项目</a>
  </p>
  <p>
    <img src="https://img.shields.io/badge/Front-end%20Engineering-1f6feb?style=for-the-badge" alt="Front-end Engineering" />
    <img src="https://img.shields.io/badge/Automation%20Scripts-0d1117?style=for-the-badge&logo=githubactions&logoColor=white" alt="Automation Scripts" />
    <img src="https://img.shields.io/badge/Content%20Curation-182642?style=for-the-badge&logo=rss&logoColor=orange" alt="Content Curation" />
  </p>
</div>

<br/>

<div align="center" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1.25rem; margin: 2rem 0;">
  <a href="https://github.com/anuraghazra/github-readme-stats">
    <img alt="Top Langs" src="https://github-readme-stats.vercel.app/api/top-langs/?username=northseacoder&layout=compact&theme=default&langs_count=8&hide_border=true" style="height: 170px; border-radius: 12px;" />
  </a>
  <a href="https://github.com/anuraghazra/github-readme-stats">
    <img alt="GitHub Stats" src="https://github-readme-stats.vercel.app/api?username=northseacoder&show_icons=true&include_all_commits=true&hide_rank=false&hide_border=true" style="height: 170px; border-radius: 12px;" />
  </a>
  <a href="https://github.com/DenverCoder1/github-readme-streak-stats">
    <img alt="GitHub Streak" src="https://streak-stats.demolab.com?user=northseacoder&locale=zh_Hans&date_format=%5BY.%5Dm.%5Dd&hide_border=true" style="height: 170px; border-radius: 12px;" />
  </a>
</div>

<div align="center" style="margin: 2rem 0;">
  <a href="https://github.com/vn7n24fzkq/github-profile-summary-cards">
    <img alt="Profile Summary" src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=northseacoder&theme=github&hide_border=true" style="max-width: 920px; width: 100%; border-radius: 16px;" />
  </a>
</div>

<div align="center" style="margin-bottom: 2.5rem;">
  <a href="https://github.com/Ashutosh00710/github-readme-activity-graph">
    <img alt="Activity Graph" src="https://github-readme-activity-graph.vercel.app/graph?username=northseacoder&theme=github-compact&hide_border=true&area=true" style="max-width: 920px; width: 100%; border-radius: 16px;" />
  </a>
</div>

## ⚡ 数据快照

<table>
  <tr>
    <td align="center">
      <h3>📚 <%= formatNumber(totalArticles) %>+</h3>
      <p>累计收录前端优质文章</p>
    </td>
    <td align="center">
      <h3>🛰 <%= formatNumber(totalSources) %></h3>
      <p>实时监听 RSS 源</p>
    </td>
    <td align="center">
      <h3>🚀 +<%= formatNumber(obj.newData.length) %></h3>
      <p>本次新增内容</p>
    </td>
    <td align="center">
      <h3>🆕 <%= formatNumber(updatedSources) %></h3>
      <p>本轮有更新的订阅源</p>
    </td>
  </tr>
</table>

<% if (latestArticles.length) { %>
## 🌟 最近更新亮点

> 已从 <strong><%= formatNumber(updatedSources) %></strong> 个来源筛选最新的 <strong><%= formatNumber(latestArticles.length) %></strong> 条内容

<% _.each(latestArticles, function(article){ %>
- **<%= article.date %>** · [<%= article.title %>](<%= article.link %>) _(来自 <%= article.source %>)_
<% }) %>

<% } %>

## 🧠 技术关注 & 仓库价值

- 🚀 构建自动化抓取流水线，保障前端资讯高频更新
- 🧭 关注工程化、性能优化、体验设计等核心议题
- 🧱 借助标签体系和分类页，快速定位专项知识
- 🛠️ 提供配置示例，方便扩展个性化信息源

## 🔗 项目参考

- [front-end-rss](https://github.com/ChanceYu/front-end-rss)：最初的灵感来源
- [CaoMeiYouRen](https://github.com/CaoMeiYouRen/CaoMeiYouRen)：样式与自动化参考
- [auto-green](https://github.com/justjavac/auto-green)：GitHub Actions 自动化实践

## ⚙️ 配置说明

- 默认从 [`data/rss.json`](./data/rss.json) 读取 RSS 订阅配置
- 支持通过环境变量 `RSS_FEEDS` / `RSS_CONFIG` 覆盖，详见 [RSS 配置说明](./RSS_CONFIG.md)

> ⏰ 更新时间: <%= obj.currentDate %> · 🚀 本次新增: +<%= obj.newData.length %> · ![](/assets/dot.png) 表示有更新 · [文章分类](./TAGS.md)

## 文章来源

<div align="center" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem; margin: 1.25rem 0 2rem;">
<% _.each(obj.linksJson, function(e){
  var rssTitle = obj.formatTitle(e.title);
%>
  <a href="#<%= rssTitle.toLowerCase() %>" style="padding: 0.45rem 0.9rem; border: 1px solid #d0d7de; border-radius: 999px; text-decoration: none; color: inherit; font-weight: 500; background: #f6f8fa;">
    <%= rssTitle %><% if (e.title in obj.newData.rss){ %> <img src="/assets/dot.png" alt="本次有更新" style="vertical-align: middle; margin-left: 0.25rem; width: 12px; height: 12px;" /><% } %>
  </a>
<% }) %>
</div>

## 文章链接

<% _.each(obj.linksJson, function(e){
  var rssTitle = obj.formatTitle(e.title);
%>
<details<% if (e.title in obj.newData.rss){ %> open<% } %>>
<summary id="<%= rssTitle.toLowerCase() %>">
  <strong><%= rssTitle %></strong><% if (e.title in obj.newData.rss){ %> <img src="/assets/dot.png" alt="本次有更新" /><% } %>
</summary>
<p></p>

<% _.each(e.items.slice(0,20), function(item){
  var itemTitle = obj.formatTitle(item.title);
%>
- **<%= item.date %>** - [<%= itemTitle %>](<%= item.link %>)<% if (e.title in obj.newData.rss && item.link in obj.newData.links){ %> <img src="/assets/new.png" alt="NEW" /><% } %>
<% }) %>

<div align="right">
<a href="/category/details/<%= e.title %>.md">查看更多</a> | <a href="#top">⬆ 返回顶部</a>
</div>
</details>

<% }) %>
