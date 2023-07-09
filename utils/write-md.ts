/*
 * @Author: mengpeng
 * @Date: 2023-07-09 14:09:01
 * @Last Modified by: mengpeng 
 * @Last Modified time: 2023-07-09 14:40:34 
 */

import dayjs from 'dayjs';
import fs from 'fs-extra';
import _ from 'underscore';
import {formatTitle} from './index';

const getNowDate = () => dayjs().format('YYYY-MM-DD HH:mm:ss');

const handleREADME = async (newData, linksJson) => {
    let content = fs.readFileSync('./templates/README.md');
    let compiled = _.template(content.toString());
    const currentDate = getNowDate();
    content = compiled({
        newData,
        linksJson,
        currentDate,
        formatTitle: formatTitle
    });

    fs.writeFileSync('./README.md', content, 'utf-8');
};
const handleTags = (newData, linksJson) => {
    const currentDate = getNowDate();
    let tags = fs.readJsonSync('./data/tags.json');

    tags.forEach((tag, i) => {
        tags[i].items = [];

        linksJson.forEach((o) => {
            o.items.forEach((item) => {
                if (!item.rssTitle && new RegExp(tag.keywords, 'gi').test(item.title)) {
                    item.rssTitle = o.title;
                    tags[i].items.push(item);
                }
            });
        });

        // details/tags/file.md
        let detailTpl = fs.readFileSync('./templates/DETAILS.md').toString();
        let detailCompiled = _.template(detailTpl);
        const filename = tag.filename + '.md';

        const detailContent = detailCompiled({
            currentDate,
            formatTitle: formatTitle,
            title: tags[i].tag,
            keywords: tags[i].keywords,
            items: tags[i].items
        });

        fs.writeFileSync(`./category/tags/${filename}`, detailContent, 'utf-8');
    });

    let content = fs.readFileSync('./templates/TAGS.md');
    let compiled = _.template(content.toString());

    content = compiled({
        currentDate,
        formatTitle: formatTitle,
        tags
    });

    fs.writeFileSync('./TAGS.md', content, 'utf-8');
};

const handleDetails = (newData, linksJson)=>{
    const currentDate = getNowDate()
  let content = fs.readFileSync('./templates/DETAILS.md').toString()
  let compiled = _.template(content)

  linksJson.forEach((source) => {
    if (source.title in newData.rss) {
      source.currentDate = currentDate
      source.formatTitle = formatTitle

      content = compiled(source)

      let filename = source.title.replace(/[\\\/]/g, '')
      filename += '.md'

      fs.writeFileSync(`./category/details/${filename}`, content, 'utf-8')
    }
  })
}
export default async (newData, linksJson) => {
    await handleREADME(newData, linksJson);
    handleTags(newData, linksJson);
    handleDetails(newData, linksJson);
};
