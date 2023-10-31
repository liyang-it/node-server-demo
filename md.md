@[toc](部署vercel express模块化开发 使用 node.js 简单搭建Web服务 使用node简单搭建后端服务 使用node搭建服务 部署Vercel 部署vercel express模块化开发)

# 1、初始化项目
例如项目名为 `node-server-demo`

```cmd
mkdir node-server-demo
```
进入 `node-server-demo` 文件夹内，初始化 `package.json`文件

```cmd
cd node-server-demo
```
初始化 `package.json`文件

```cmd
npm init -y
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/3ca7ea28e47e4df2b2e7b6537caca61b.png)
# 2、安装 Express.js  Web 服务框架
```yml
npm install express
```
# 3、创建 app.js 主入口文件, 并且实现 GET、POST请求
```js
const express = require('express');
const app = express();

// 服务端口号
const port = 8080;

app.use(express.json());

// 处理 GET 请求 / 返回 hello 
app.get('/', (req, res) => {
    res.send('hello');
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

```

# 4、启动服务

```cmd
node app.js
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/8bceced137864a63b9c539d5a6e13207.png)
# 5、请求测试
请求测试，使用 postman或者 apifox

`GET` 请求
![在这里插入图片描述](https://img-blog.csdnimg.cn/d33ed574a390468286147ed8c65cfcf8.png)
`POST` 请求

![在这里插入图片描述](https://img-blog.csdnimg.cn/139101f4e5304720854d77adcd3fba96.png)


到这里 node 简单搭建服务端就完成 ,

## 6、接口按路由分模块

 **全部接口写在 app.js中不好维护，臃肿**，实际开发肯定是要分模块的
 
假设现在有两个路由模块：

* `appRouter.js` 专门处理 app 端接口服务
* `adminRouter.js` 专门处理 admin 端接口服务



创建 `router` 文件夹 存放 对应路由文件

`appRouter.js` 路由文件内容

```js
// 这个路由文件主要处理 app 端接口服务

const express = require('express');
const app = express.Router();

app.get('/login', (req, res) => {
	res.send('app 端请求登录')
});

// 导出路由模块
module.exports = app
```

`adminRouter.js` 路由文件内容

```js
// 这个路由文件主要处理 admin 端接口服务

const express = require('express');
const admin = express.Router();

admin.get('/login', (req, res) => {
	res.send('admin 端请求登录')
});

// 导出路由模块
module.exports = admin
```

此时文件目录对照：






