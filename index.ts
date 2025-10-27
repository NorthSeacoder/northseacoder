import {logSuccess, log} from './utils/log';
import {isSameLink} from './utils';
import fs from 'fs-extra';
import dayjs from 'dayjs';
import fetch from './utils/fetch';

import writemd from './utils/write-md';

interface RssItem {
    title: string;
    rss: string | string[];
}

interface LinkItem {
    title: string;
    items: {
        title: string;
        link: string;
        date: string;
    }[];
}

const RSS_PATH = './data/rss.json';
const LINKS_PATH = './data/links.json';

// 从环境变量或文件中加载 RSS 配置
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

const rssJson: RssItem[] = loadRssConfig();
const linksExist: LinkItem[] = fs.readJsonSync(LINKS_PATH);

const linksJson: LinkItem[] = [];
const newData = {
    length: 0,
    titles: [] as string[],
    rss: {} as Record<string, boolean>,
    links: {} as Record<string, boolean>
};

const tasks = rssJson.map(async (rssItem, rssIndex) => {
    const feed = await fetch(rssItem);
    const items = linksExist.find((el) => el.title === rssItem.title)?.items || [];
    const newItems = (feed?.items || []).reduce((prev, curr) => {
        const exist = items.find((el) => isSameLink(el.link, curr.link));
        if (exist) {
            return prev;
        } else {
            let date = dayjs().format('YYYY-MM-DD');

            try {
                date = dayjs(curr.isoDate).format('YYYY-MM-DD');
            } catch (e) {}

            newData.rss[rssItem.title] = true;
            newData.links[curr.link] = true;

            return [
                ...prev,
                {
                    title: curr.title,
                    link: curr.link,
                    date
                }
            ];
        }
    }, [] as {title: string; link: string; date: string}[]);
    let allItems = items;
    if (newItems.length) {
        logSuccess('更新 RSS: ' + rssItem.title);
        newData.titles.push(rssItem.title);
        newData.length += newItems.length;
        allItems = newItems.concat(items).sort((a, b) => b.date - a.date);
    }
    linksJson[rssIndex] = {
        title: rssItem.title,
        items: allItems
    };
});
await Promise.all(tasks);
if (newData.length) {
    fs.outputJsonSync(LINKS_PATH, linksJson)
    await writemd(newData, linksJson)
  } else {
    logSuccess('无需更新')
  }

// logSuccess(rssJson);
