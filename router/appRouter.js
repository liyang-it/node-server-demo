// 这个路由文件主要处理 app 端接口服务

const express = require('express');
const app = express.Router();

app.get('/login', (req, res) => {
	res.send('app 端请求登录')
});

// 导出路由模块
module.exports = app