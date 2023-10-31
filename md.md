
@[toc](Node跨域 Node静态页面 部署vercel express模块化开发 使用 node.js 简单搭建Web服务 使用node简单搭建后端服务 使用node搭建服务 部署Vercel 部署vercel express模块化开发)

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

# 6、接口按路由分模块

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

![在这里插入图片描述](https://img-blog.csdnimg.cn/74d425586e1f4646b835497d044832c7.png)

在 `app.js` 主入口中注册路由
```js
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

启动测试 访问 `/app`，`/admin` 可以看到两个都生效了
![在这里插入图片描述](https://img-blog.csdnimg.cn/b8367a4694934e93bb360898c322d932.png)


![在这里插入图片描述](https://img-blog.csdnimg.cn/db82fdd32273497fa846433fec249029.png)

# 7、跨域设置
安装跨域插件 [官方文档](https://github.com/expressjs/cors)
```cmd
npm install cors
```

在 `app.js` 中引用, 这里要注意 `app.use()`代码一定要放在 `require()` 下面，否则可能会出现不生效，使用其他插件也是一样要注意
```js
// 跨域支持 官方文档：https://github.com/expressjs/cors
const cors = require('cors')

// 开启所有请求都支持跨域
app.use(cors())
```

# 8、静态页面处理
创建 `public` 或者 `src`目录文件夹，随便取什么名字都可以，我这边html文件放在了 `public/pages/` 下面

此时文件结构：
![在这里插入图片描述](https://img-blog.csdnimg.cn/ce11254f630747c8b1a7acbb44d6b8b9.png)

编写访问 `index.html` 的路由，我这边图简单直接 `app.js` 中的  `/` 根路由访问` index.html`文件,也比较合理

```js
// 处理 / 根请求
app.get('/', (req, res) => {

    const filePath = __dirname + '/public/pages/index.html';

    res.sendFile(filePath);
});
```

完整 `app.js`
```js
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

```

访问 `/` 测试 已经生效
![在这里插入图片描述](https://img-blog.csdnimg.cn/35b60fc6a9d547278ec7453ce805d625.png)

# 8、部署 vercel
首先得准备一个 Vercel账户，这个就不讲解了

电脑全局安装 Vercel脚手架

```java
 npm install -g vercel
```

登录 Vercel
```java
vercel login
```

在 `node.js`项目根目录创建 `vercel.json` 文件, 这个文件的内容基本是固定，如果部署出现 404，请检查 `/app 或者 /admin` 路由注册是否正常
```json
{
    "version": 2,
    "builds": [
        {
            "src": "app.js",
            "use": "@vercel/node"
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest": "app.js"
        }
    ]
}
```
此时目录结构：

![在这里插入图片描述](https://img-blog.csdnimg.cn/ab1e0c0f560747afa42820b549dc3f6c.png)

将当前项目 预览部署到 Vercel中, 在 node.js项目根目录执行以下命令, 部署完成之后会给一个预览地址和部署地址，
```java
vercel
```

将当前项目 预览部署到 Vercel 正式环境中中, 在 node.js项目根目录执行以下命令, 部署完成之后会给一个正式地址和部署地址
```java
vercel --prod
```
到这里内容就全部结束了， 附上 [demo地址]()
