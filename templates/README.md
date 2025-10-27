<div align="center"><img width="100" src="https://avatars.githubusercontent.com/u/30330837?s=400&u=1cd6e7c560308a159cf25295d652e375924ddf7e&v=4" style="border-radius: 50%;" /><h1>NorthSeaCoder</h1>
每天定时抓取感兴趣的前端技术文章，并推送到 GitHub 方便查看
<p>🌱 聚焦前端工程化 · ⚙️ 热衷自动化脚本 · 🧰 持续整理优质前端内容</p>
</div>

## 我的 GitHub 数据

<div align="center" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem;">
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

<div align="center" style="margin: 1rem 0;">
  <a href="https://github.com/vn7n24fzkq/github-profile-summary-cards">
    <img alt="Profile Summary" src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=northseacoder&theme=github" />
  </a>
</div>

## 项目参考
- [front-end-rss](https://github.com/ChanceYu/front-end-rss);

- [CaoMeiYouRen](https://github.com/CaoMeiYouRen/CaoMeiYouRen);

- [auto-green](https://github.com/justjavac/auto-green);

##

:alarm_clock: 更新时间: <%= obj.currentDate %>，:rocket: 更新条数: +<%= obj.newData.length %>， ![](/assets/dot.png) 表示有更新，[文章分类](/TAGS.md)

## 文章来源
<ul style="columns: 2; -webkit-columns: 2; -moz-columns: 2; padding: 0; margin: 0; list-style: none;">
<% _.each(obj.linksJson, function(e){ var rssTitle = obj.formatTitle(e.title); %>
  <li style="break-inside: avoid; padding: 0.35rem 0;">
    <a href="#<%= rssTitle.toLowerCase() %>"><%= rssTitle %></a><% if (e.title in obj.newData.rss){ %> ![](/assets/dot.png)<% } %>
  </li>
<% }) %>
</ul>

## 文章链接
<div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: stretch;">
<% _.each(obj.linksJson, function(e){ var rssTitle = obj.formatTitle(e.title); %>
  <div style="flex: 1 1 320px; min-width: 280px; max-width: 420px;">
    <details open>
      <summary id="<%= rssTitle.toLowerCase() %>">
       <%= rssTitle %>
      </summary>

<% _.each(e.items.slice(0,20), function(item, index){ var itemTitle = obj.formatTitle(item.title); %>
      - [<%= item.date %>-<%= itemTitle %>](<%= item.link %>) <% if (e.title in obj.newData.rss && item.link in obj.newData.links){ %>![](/assets/new.png) <% } %>
<% }) %>
      - [......【查看更多】......](/category/details/<%= e.title %>.md)

      <div align="right"><a href="#文章来源">⬆ &nbsp;返回顶部</a></div>
    </details>
  </div>
<% }) %>
</div>
