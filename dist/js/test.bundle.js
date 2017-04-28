webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(12);
var html = __webpack_require__(13);
var dom = document.getElementById('com-loading');
if (!dom) {
	dom = document.createElement('div');
	dom.id = 'com-loading';
	dom.style.display = "none";
}
dom.innerHTML = html;
document.body.appendChild(dom);
module.exports = {
	show: function show() {
		dom.style.display = "block";
	},
	hide: function hide() {
		dom.style.display = "none";
	}
};

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery, vue) {

__webpack_require__(7);
__webpack_require__(5);
//require('lib/bootstrap/js/bootstrap');
var $ = jQuery;
var load = __webpack_require__(2);
var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
var idNum = 1;
var view = new vue({
	el: "#app",
	data: function data() {
		return {
			list: [],
			curItem: {},
			name: "",
			sex: "",
			phone: "",
			curPage: 1,
			pageSize: 5
		};
	},
	created: function created() {
		// TODO获取列表数据
		var list = [];
		for (var i = 0; i < 20; i++) {
			list.push({
				id: idNum,
				name: "test" + i,
				sex: i % 2 ? 'man' : 'woman',
				phone: '13168028932'
			});
			idNum++;
		}
		this.list = list;
	},

	watch: {
		curItem: function curItem(n, o) {
			this.name = n.name;
			this.phone = n.phone;
			this.sex = n.sex;
		}
	},
	computed: {
		vailPhone: function vailPhone() {
			var phone = this.phone;
			if (phone) {
				return reg.test(phone);
			} else {
				return true;
			}
		},
		totalPage: function totalPage() {
			var size = this.pageSize;
			var totalItems = this.list.length;
			return Math.ceil(totalItems / size);
		},
		canPre: function canPre() {
			return this.curPage > 1;
		},
		canNext: function canNext() {
			return this.curPage < this.totalPage;
		}
	},
	methods: {
		showLoading: function showLoading() {
			load.show();
			setTimeout(function () {
				load.hide();
			}, 3000);
		},
		showList: function showList() {
			var size = this.pageSize;
			var start = (this.curPage - 1) * size;
			var end = this.curPage * size;
			return this.list.slice(start, end);
		},
		prePage: function prePage() {
			if (this.canPre) {
				this.curPage--;
			}
		},
		nextPage: function nextPage() {
			if (this.canNext) {
				this.curPage++;
			}
		},
		goPage: function goPage(page) {
			this.curPage = page;
		},
		addItem: function addItem() {
			$('#myModal').modal('show');
		},
		modifyItem: function modifyItem(item) {
			this.curItem = item;
			$('#myModal').modal('show');
		},
		deleteItem: function deleteItem(item) {
			var flag = confirm('确定删除吗？');
			if (!flag) return;
			var list = this.list.filter(function (si) {
				return si.id !== item.id;
			});
			this.list = list;
		},
		saveOrModify: function saveOrModify() {
			var phone = this.phone;
			if (!this.vailPhone) {
				return;
			}
			var name = this.name;
			var sex = this.sex;
			var item = {
				name: name,
				sex: sex,
				phone: phone,
				id: idNum
			};
			var hasId = this.curItem.id;
			if (hasId) {
				//修改
				var list = this.list.map(function (si) {
					if (si.id === hasId) {
						item.id = hasId;
						return item;
					} else {
						return si;
					}
				});
				console.log(list);
				this.list = list;
			} else {
				//添加
				this.list.push(item);
			}
			this.curItem = {};
			idNum++;
			$('#myModal').modal('hide');
		}
	}
});

$('#myModal').on('hide.bs.modal', function () {
	view.curItem = {};
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(0)))

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = "<div class=\"loading_cell\">\r    <div class=\"loading_card\">\r        <span class=\"dots-loader\"></span>\r    </div>\r</div>\r"

/***/ })
],[11]);
//# sourceMappingURL=test.bundle.js.map?v=1aa3e48cb7dbcde63a1b