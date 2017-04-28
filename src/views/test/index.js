require('./index.css');
require('lib/bootstrap/css/bootstrap');
//require('lib/bootstrap/js/bootstrap');
var $ = jQuery;
var load = require('components/loading');
var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
var idNum = 1;
var view = new vue({
	el:"#app",
	data(){
		return {
			list:[],
			curItem:{},
			name:"",
			sex:"",
			phone:"",
			curPage:1,
			pageSize:5
		};
	},
	created(){
		// TODO获取列表数据
		var list = [];
		for(var i=0;i<20;i++){
			list.push({
				id:idNum,
				name:"test"+i,
				sex:i%2?'man':'woman',
				phone:'13168028932'
			});
			idNum++;
		}
		this.list = list;
	},
	watch:{
		curItem(n,o){
			this.name = n.name;
			this.phone = n.phone;
			this.sex = n.sex;
		}
	},
	computed:{
		vailPhone(){
			var phone = this.phone;
			if(phone){
				return reg.test(phone);
			}else{
				return true;
			}
		},
		totalPage(){
			var size = this.pageSize;
			var totalItems = this.list.length;
			return Math.ceil(totalItems/size);
		},
		canPre(){
			return this.curPage > 1;
		},
		canNext(){
			return this.curPage <this.totalPage;
		}
	},
	methods:{
		showLoading(){
			load.show();
			setTimeout(function(){
				load.hide();
			},3000);
		},
		showList(){
			var size = this.pageSize;
			var start = (this.curPage - 1)*size;
			var end = this.curPage*size;
			return this.list.slice(start,end);
		},
		prePage(){
			if(this.canPre){
				this.curPage--;
			}
		},
		nextPage(){
			if(this.canNext){
				this.curPage++;
			}
		},
		goPage(page){
			this.curPage = page;
		},
		addItem(){
			$('#myModal').modal('show');
		},
		modifyItem(item){
			this.curItem = item;
			$('#myModal').modal('show');
		},
		deleteItem(item){
			var flag = confirm('确定删除吗？');
			if(!flag) return;
			var list = this.list.filter(function(si){
				return si.id !== item.id;
			});
			this.list = list;
		},
		saveOrModify(){
			var phone = this.phone;
			if(!this.vailPhone){
				return;
			}
			var name = this.name;
			var sex = this.sex;
			var item = {
				name:name,
				sex:sex,
				phone:phone,
				id:idNum
			};
			var hasId = this.curItem.id;
			if(hasId){//修改
				var list = this.list.map(function(si){
					if(si.id === hasId){
						item.id = hasId;
						return item;
					}else{
						return si;
					}
				});
				console.log(list);
				this.list = list;
			}else{//添加
				this.list.push(item);
			}
			this.curItem = {};
			idNum++;
			$('#myModal').modal('hide');
		}
	}
});

$('#myModal').on('hide.bs.modal',function(){
	view.curItem = {};
});