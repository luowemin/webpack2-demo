webpackJsonp([1],{

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(vue) {

__webpack_require__(4);
__webpack_require__(6);
//import { Button, Select } from 'element-ui';
//import vue from 'vue/dist/vue.common.js';

var state = {

	msg: "hello word",
	value: '',
	options: [{
		value: '选项1',
		label: '黄金糕'
	}, {
		value: '选项2',
		label: '双皮奶'
	}, {
		value: '选项3',
		label: '蚵仔煎'
	}, {
		value: '选项4',
		label: '龙须面'
	}, {
		value: '选项5',
		label: '北京烤鸭'
	}]
};
var view = new vue({
	el: "#app",
	data: function data() {
		return {
			curView: "menu1",
			percapita: '',
			name: '',
			category: '',
			categorys: [],
			address: '',
			businessHours: ''
		};
	},

	methods: {
		go: function go(hash) {
			location.hash = hash;
		},
		saveData: function saveData() {
			console.log('save data');
		}
	}

});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[10]);
//# sourceMappingURL=app.bundle.js.map?v=1aa3e48cb7dbcde63a1b