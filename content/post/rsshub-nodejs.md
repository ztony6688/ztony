---
title: "Rsshub Nodejs"
date: 2023-07-03T08:55:33+08:00
draft: false
ShowToc: true # 开启 Table Of Content 功能
TocOpen: true # 展开 Table Of Content
---

## 閱讀 Rsshub 腳本
## 進入代碼倉庫 https://github.com/ztony6688/ztony/
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

- Node.js 官網 https://nodejs.org/zh-cn/
- 小馬課件 https://github.com/komavideo/LearnNodeJS.git
- `git submodule add --depth=1 https://github.com/komavideo/LearnNodeJS.git .`
- Node.js 版本管理 nvm
  - `brew install nvm`
  - `brew cleanup nvm`
  - `vim ~/.zshrc`

---
```bash
  [ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
  [ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
```
---

```bash
Please note that upstream has asked us to make explicit managing
nvm via Homebrew is unsupported by them and you should check any
problems against the standard nvm install method prior to reporting.

You should create NVM's working directory if it doesn't exist:
  mkdir ~/.nvm

Add the following to your shell profile e.g. ~/.profile or ~/.zshrc:
  export NVM_DIR="$HOME/.nvm"
  [ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
  [ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion

You can set $NVM_DIR to any location, but leaving it unchanged from
/usr/local/Cellar/nvm/0.39.3 will destroy any nvm-installed Node installations
upon upgrade/reinstall.

Type `nvm help` for further information.
==> Summary
🍺  /opt/homebrew/Cellar/nvm/0.39.3: 9 files, 190.6KB
==> Running `brew cleanup nvm`...
Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
```
---

## nvm  Node.js 版本管理器

-  查看版本 `nvm --version`
-  可安裝版本查詢 `nvm ls-remote`
-  列表太長加過濾 `nvm ls-remot|grep v12`
-  安裝指定版本 `nvm install v18.16.1`
-  查看所有版本 `nvm ls`
-  使用指定版本 `nvm use v18.16.1`
-  設置默認版本 `nvm alias default v18.16.1`

## npm && npx包管理工具

### 小馬課程 交互式體驗

- 進入終端交互 ` node `
- 終端交互打印 `console.log("Node.js 輸出函數,等於 python print() 函數")`
- 查看幫助 `.help`
- 退出終端交互 `.exit`
- 寫個簡單腳本 
---
```bash
mkdir My-Node.js
cd My-Node.js
touch base.js
vim base.js
```
---
```javascript
console.log("Node.js 輸出函數,等於 python print() 函數");

var mystring =  "自定義變量 mystring 並且賦值 最終打印變量內容";

console.log(mystring);
```
---
- 粘貼上面代碼
- 執行腳本 `node base.js` 


### 小馬課程 堵塞 && 非堵塞

- 堵塞 && 非堵塞
- 並發 && 線程

```javascript
///////////////////
// 堵塞代碼
///////////////////
function updb(){
    var start = new Date().getTime();
    while (new Date().getTime() < start + 3000);
}
updb();
console.log(new Date().getTime());
console.log("上面跑完才順序輸出下面命令");
console.log("這段代碼是一個流程,面向過程編程,堵塞代碼");
console.log("分割線" + "=" * 30);
///////////////////
// 非堵塞代碼
///////////////////
function updb2(done){
    setTimeout = (() => {done();},3000);
}
updb2(function (){
    console.log("最後輸出,完成任務");
});
console.log("由於非堵塞,這段代碼會先輸出");
```

### 小馬課程 簡單 web 服務器

- Node.js 內置的 `http` 模塊
- `res.end()`輸出 html 代碼需要聲明 ``
- 實戰代碼
```javascript
const http = require('http');

const hostname =  '127.0.0.1';
const port = 3000;

const server = http.creatServer((req,res) => {
    res.statusCode = 200;
    res.setHeader('content-Type', 'text/html')
    res.end('<meta charset="UTF-8"></meta>\n<h1>我是一號標題</h1>\n<h2>下面是列表</h2>\n<li>列表 1</li>\n<li>列表 2</li>\n<li>列表 3</li>');
});

server.listen(port,hostname,() => {
    console.log(`點擊鏈接打開網頁 >>> http://${hostname}:${port}/`);
});

```
### 小馬課程 引用外部 js 文件

- 建立 config.js 並引用
- 使用 server.js 引用 config.js

```javascript
//////////////
// config.js
/////////////
const config = {
    hostname : "127.0.0.1";
    port : 3000
};
//////////////
// 導包語句
/////////////
const config = require(./config.js).config;

// 調用 config.hostname
