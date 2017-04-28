var express = require('express'), request = require('request');
var app = express();

app.use('/wechat-html', express.static('../dist'));// 前端应用网页路径名

app.listen(process.env.PORT || 80);