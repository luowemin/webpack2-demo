require('./style.css');
let html = require('./view.html');
let dom = document.getElementById('com-loading');
if(!dom){
	dom = document.createElement('div');
	dom.id = 'com-loading';
	dom.style.display = "none";
}
dom.innerHTML = html;
document.body.appendChild(dom);
module.exports = {
	show(){
		dom.style.display = "block";
	},
	hide(){
		dom.style.display = "none";
	}
}