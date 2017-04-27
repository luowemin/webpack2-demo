var express = require('express'), request = require('request');
var app = express();
// 数据源的域名端口
var targetDomain = 'http://wx.wgmf.com';
//var targetDomain = 'http://app.wgmf.com';
//var targetDomain = 'http://192.168.2.116:8081/';

var apis = [];// 数据源路径
apis.push('/wechat-shop-back');
apis.push('/wechat-shop-back2');
apis.push('/wechat-propagate-back');
apis.push('/crmserver');
apis.push('/base-data-service');
apis.push('/wechat-operation-back');
apis.push('/wechat-health-test-back');
apis.push('/app');
apis.push('/qiniu');
apis.push('/webstat');
apis.push('/app-saler');
apis.push('/promotion');
apis.push('/wechat-shop-internal');
apis.push('/wechat-game-back');

app.use('/wechat-html', express.static('../dist'));// 前端应用网页路径名

apis.forEach(function(item){// 数据源代理
	app.use(item, function(req, res) {
		var url = targetDomain + item + req.url;
		console.log(url);
		req.pipe(request(url)).pipe(res);
	});
});
app.listen(process.env.PORT || 80);