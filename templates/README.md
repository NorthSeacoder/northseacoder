<div align="center"><img width="100" src="/assets/rss.gif" /><h1></h1>
每天定时抓取感兴趣的前端技术文章，并推送到 GitHub 方便查看

</div>

## 项目参考
- [front-end-rss](https://github.com/ChanceYu/front-end-rss);

- [CaoMeiYouRen](https://github.com/CaoMeiYouRen/CaoMeiYouRen);

- [auto-green](https://github.com/justjavac/auto-green);
##
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=northseacoder)](https://github.com/anuraghazra/github-readme-stats)

[![my github stats](https://github-readme-stats.vercel.app/api?username=northseacoder)](https://github.com/anuraghazra/github-readme-stats)


:alarm_clock: 更新时间: <%= obj.currentDate %>，:rocket: 更新条数: +<%= obj.newData.length %>， ![](/assets/dot.png) 表示有更新，[文章分类](/TAGS.md)

## 文章来源
<% _.each(obj.linksJson, function(e){ var rssTitle = obj.formatTitle(e.title); %>
- [<%= rssTitle %>](#<%= rssTitle.toLowerCase() %>)<% if (e.title in obj.newData.rss){ %>![](/assets/dot.png) <% } %>  <% }) %>

## 文章链接
<% _.each(obj.linksJson, function(e){ var rssTitle = obj.formatTitle(e.title); %>
<details open>
<summary id="<%= rssTitle.toLowerCase() %>">
 <%= rssTitle %>
</summary>

<% _.each(e.items.slice(0,20), function(item, index){ var itemTitle = obj.formatTitle(item.title); %>
- [<%= item.date %>-<%= itemTitle %>](<%= item.link %>) <% if (e.title in obj.newData.rss && item.link in obj.newData.links){ %>![](/assets/new.png) <% } %> <% }) %>
- [......【查看更多】......](/details/<%= e.title %>.md)

<div align="right"><a href="#文章来源">⬆ &nbsp;返回顶部</a></div>
</details>
<% }) %>
