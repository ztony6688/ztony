///////////////////
// JavaScript 文件使用 UTF-8 编码
///////////////////
//<meta charset="UTF-8"></meta>
///////////////////
// 基本輸出
///////////////////
console.log("Node.js 輸出函數,等於 python print() 函數");

var mystring =  "自定義變量 mystring 並且賦值 最終打印變量內容";

console.log(mystring);
///////////////////
// 堵塞代碼
///////////////////
function updb(){
    var start = new Date().getTime();
    while (new Date().getTime() < start + 3000);
}
updb();
console.log("這是時間戳:" + new Date().getTime());
console.log("上面跑完才順序輸出下面命令");
console.log("這段代碼是一個流程,面向過程編程,堵塞代碼");
console.log("分割線" + "=========");
///////////////////
// 非堵塞代碼
///////////////////
function updb2(done){
    setTimeout(() => {
        done();
    }, 3000);
}
updb2(function () {
    console.log("休眠 3 秒,完成任務");
});
console.log("由於非堵塞,這段代碼會先輸出");
///////////////////
// 簡單的 web 服務器
///////////////////
const http = require('http');

const hostname =  '127.0.0.1';
const port = 3000;

const server = http.createServer((req,res) => {
    res.statusCode = 200;
    res.setHeader('content-Type', 'text/html')
    res.end('<meta charset="UTF-8"></meta>\n<title>首頁</title><h1>我是一號標題</h1>\n<h2>下面是列表</h2>\n<li>列表 1</li>\n<li>列表 2</li>\n<li>列表 3</li>');
});

server.listen(port,hostname,() => {
    console.log(`點擊鏈接打開網頁 >>> http://${hostname}:${port}/\n 按control + C 停止 web 服務` );
});
