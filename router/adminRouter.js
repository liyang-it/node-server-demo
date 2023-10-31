// 这个路由文件主要处理 admin 端接口服务
const express = require('express');
const admin = express.Router();

admin.get('/login', (req, res) => {
    res.send('admin 端请求登录')
});

// 导出路由模块
module.exports = admin