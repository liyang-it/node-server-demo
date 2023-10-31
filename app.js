const express = require('express');

// 引入外部路由文件
const appRouter = require('./router/appRouter')
const adminRouter = require('./router/adminRouter')
const app = express();
const port = 8080;

app.use(express.json());

// 注册路由, 注册的路由模块接口访问都需要加上 注册路由的前缀
app.use('/app', appRouter)
app.use('/admin', adminRouter)

// 处理 / 根请求
app.get('/', (req, res) => {

    const filePath = __dirname + '/public/pages/index.html';

    res.sendFile(filePath);
});

// 处理 GET 请求 /get ，参数 a，并且返回 a参数值
app.get('/get', (req, res) => {
    const { a } = req.query;
    res.send(a);
});

// 处理 POST 请求 /post，接受 JSON 参数并返回相同的 JSON 参数
app.post('/post', (req, res) => {
    const jsonData = req.body;
    res.json(jsonData);
});

app.listen(port, () => {
    console.log(`node服务已启动 端口号为： ${port}`);
});
