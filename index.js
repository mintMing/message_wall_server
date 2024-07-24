const express = require("express");
const path = require("path");
const ejs = require("ejs");
const config = require("./config/default");
const corsConfig = require("./config/cors");
const apiVersionMiddleware = require("./middlewares/apiVersion");

const app = express();

app.use(corsConfig);

// 前端获取去后端静态路径
app.use(express.static(__dirname + "/dist"));
app.use(express.static(__dirname + "/data"));

app.engine("html", ejs.__express); // 注册模板引擎
app.set("view engine", "html"); // 设置默认的模板引擎

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 解析URL编码的请求体

app.use(apiVersionMiddleware);

require("./routes/index")(app);
require("./routes/files")(app);

app.listen(config.port, () => {
    console.log(`端口：${config.port} 已启动。`);
});
