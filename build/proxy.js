var express = require('express'), request = require('request');
var app = express();

app.use('/wechat-html', express.static('../src/main/webapp'));// 前端应用网页路径名

app.listen(process.env.PORT || 80);