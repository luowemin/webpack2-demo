require('./style.css');
let html = require('./view.html');
let dom = document.getElementById('com-toast');
if(!dom){
	dom = document.createElement('div');
	dom.id = 'com-toast';
	dom.class = "v-toast";
}
dom.innerHTML = html;
document.body.appendChild(dom);
module.exports = {
	toast(msg){
		dom.innerHTML = `<span>{{msg}}</span>`;
	}
}