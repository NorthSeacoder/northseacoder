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

<ul style="columns: 2; -webkit-columns: 2; -moz-columns: 2; padding: 0; margin: 1rem 0; list-style: none;">
<% _.each(obj.linksJson, function(e){ var rssTitle = obj.formatTitle(e.title); %>
  <li style="break-inside: avoid; padding: 0.5rem 0;">
    <a href="#<%= rssTitle.toLowerCase() %>"><%= rssTitle %></a><% if (e.title in obj.newData.rss){ %> ![](/assets/dot.png)<% } %>
  </li>
<% }) %>
</ul>

## 文章链接

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.75rem; align-items: start;">
<% _.each(obj.linksJson, function(e){ var rssTitle = obj.formatTitle(e.title); %>
  <div style="border: 1px solid #e5e7eb; border-radius: 12px; padding: 1rem 1.25rem; background: #f9fafb;">
    <details open>
      <summary id="<%= rssTitle.toLowerCase() %>" style="font-weight: 600; font-size: 1.05rem; display: flex; align-items: center; gap: 0.5rem;">
        <span><%= rssTitle %></span>
        <% if (e.title in obj.newData.rss){ %>
          <img src="/assets/dot.png" alt="本次有更新" style="height: 14px; width: 14px;" />
        <% } %>
      </summary>

      <div style="margin-top: 0.75rem; display: flex; flex-direction: column; gap: 0.75rem;">
        <ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem;">
<% _.each(e.items.slice(0,20), function(item){ var itemTitle = obj.formatTitle(item.title); %>
          <li style="display: flex; gap: 0.75rem; align-items: baseline;">
            <time style="font-family: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; font-size: 0.82rem; color: #6b7280; min-width: 88px;">
              <%= item.date %>
            </time>
            <a href="<%= item.link %>" style="flex: 1; color: #0366d6; text-decoration: none;">
              <%= itemTitle %>
            </a>
            <% if (e.title in obj.newData.rss && item.link in obj.newData.links){ %>
              <img src="/assets/new.png" alt="NEW" style="height: 22px;" />
            <% } %>
          </li>
<% }) %>
        </ul>

        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem;">
          <a href="/category/details/<%= e.title %>.md" style="color: #2563eb; text-decoration: none;">查看更多</a>
          <a href="#文章来源" style="color: #2563eb; text-decoration: none;">⬆ &nbsp;返回顶部</a>
        </div>
      </div>
    </details>
  </div>
<% }) %>
</div>
