import Parser from 'rss-parser';
import Async from 'async';
import {log, logSuccess, logWarn} from './log';

// require('dotenv').config({multiline: true});

interface RssConfig {
    [key: string]: string;
}

let rssConfig: RssConfig = {};
try {
    rssConfig = JSON.parse(process.env.RSS_CONFIG || '{}');
} catch (e) {}

const fetchFeed = async (rss: string) => {
    const parser = new Parser({
        headers: {
            'User-Agent':
                'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
        }
    });

    try {
        const feed = await parser.parseURL(rss);
        if (feed) {
            logSuccess('成功 RSS: ' + rss);
            return feed;
        }
    } catch (e) {}

    logWarn('失败 RSS: ' + rss);
    return true;
};

export default async (rssItem: {title: string, rss: string | string[]}) => {
    let rssArray = rssItem.rss;

    if (typeof rssArray === 'string') {
        rssArray = [rssArray];
    }

    const envRss = rssConfig[rssItem.title];

    if (envRss) {
        rssArray.unshift(envRss);
    }

    const tasks = rssArray.map((rss) => {
        return (callback: (err?: any, res?: any) => void) => {
            (async () => {
                const feed = await fetchFeed(rss);

                if (feed === true) {
                    callback(true);
                } else {
                    callback(null, feed);
                }
            })();
        };
    });

    log('开始 RSS: ' + rssItem.title);

    return new Promise((resolve) => {
        Async.tryEach(tasks, (err, res) => {
            log('完成 RSS: ' + rssItem.title);
            resolve(err ? null : res);
        });
    });
};
