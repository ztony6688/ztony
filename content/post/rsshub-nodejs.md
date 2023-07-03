---
title: "Rsshub Nodejs"
date: 2023-07-03T08:55:33+08:00
draft: false
ShowToc: true # 开启 Table Of Content 功能
TocOpen: true # 展开 Table Of Content
---

## 閱讀 Rsshub 腳本

> Rsshub Github 腳本 lib > v2

https://github.com/DIYgod/RSSHub/tree/master/lib/v2

## 具備 Javascript 語法閱讀能力

> bilibili 視頻

https://www.bilibili.com/video/BV1PV411d7XV/

> youtube 視頻

https://www.youtube.com/watch?v=Vp_iIft0XNI&list=PLliocbKHJNwvbitOJ73M04PUoJae79kEg

## Rsshub bilibili 腳本代碼

- https://space.bilibili.com/402806710/video?tid=0&page=1&keyword=&order=pubdate

- 学渣弱小智:402806710
- 
```js
const got = require('@/utils/got');
const cache = require('./cache');
const utils = require('./utils');

module.exports = async (ctx) => {
    const uid = ctx.params.uid;
    const disableEmbed = ctx.params.disableEmbed;
    const cookie = await cache.getCookie(ctx);
    const verifyString = await cache.getVerifyString(ctx);
    const [name, face] = await cache.getUsernameAndFaceFromUID(ctx, uid);

    await got(`https://space.bilibili.com/${uid}/video?tid=0&page=1&keyword=&order=pubdate`, {
        headers: {
            Referer: `https://space.bilibili.com/${uid}/`,
            Cookie: cookie,
        },
    });
    const params = utils.addVerifyInfo(`mid=${uid}&ps=30&tid=0&pn=1&keyword=&order=pubdate&platform=web&web_location=1550101&order_avoided=true`, verifyString);
    const response = await got(`https://api.bilibili.com/x/space/wbi/arc/search?${params}`, {
        headers: {
            Referer: `https://space.bilibili.com/${uid}/video?tid=0&page=1&keyword=&order=pubdate`,
            Cookie: cookie,
        },
    });
    const data = response.data;

    ctx.state.data = {
        title: `${name} 的 bilibili 空间`,
        link: `https://space.bilibili.com/${uid}`,
        description: `${name} 的 bilibili 空间`,
        logo: face,
        icon: face,
        item:
            data.data &&
            data.data.list &&
            data.data.list.vlist &&
            data.data.list.vlist.map((item) => ({
                title: item.title,
                description: `${item.description}${!disableEmbed ? `<br><br>${utils.iframe(item.aid)}` : ''}<br><img src="${item.pic}">`,
                pubDate: new Date(item.created * 1000).toUTCString(),
                link: item.created > utils.bvidTime && item.bvid ? `https://www.bilibili.com/video/${item.bvid}` : `https://www.bilibili.com/video/av${item.aid}`,
                author: name,
                comments: item.comment,
            })),
    };
};
```
## 搭建 NodeJs 環境 運行腳本模塊