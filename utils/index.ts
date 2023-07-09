/*
 * @Author: mengpeng
 * @Date: 2023-07-09 10:28:54
 * @Last Modified by: mengpeng 
 * @Last Modified time: 2023-07-09 14:23:51 
 */

import qs from 'query-string';

export const isSameLink = (link, compare) => {
    link = link.replace(/&amp/g, '&');
    compare = compare.replace(/&amp/g, '&');

    const oLink = qs.parseUrl(link);
    const oCompare = qs.parseUrl(compare);
    const reWx = /mp\.weixin\.qq\.com/;

    if (reWx.test(oLink.url) && reWx.test(oCompare.url)) {
        return oLink.query.sn === oCompare.query.sn && oLink.query.mid === oCompare.query.mid;
    } else {
        return link === compare;
    }
};

export const formatTitle = (title) => {
    const reg = /<|>|&/g;
    const tag = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;'
    };
    return title
        .replace('<![CDATA[', '')
        .replace(']]>', '')
        .replace(/[\[\]\(\)]/g, '')
        .replace(/\s+/g, '-')
        .replace(reg, (match) => tag[match]);
};
