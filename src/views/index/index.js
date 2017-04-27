require('bootstrap/dist/css/bootstrap');
require('./index.css');
//import { Button, Select } from 'element-ui';
//import vue from 'vue/dist/vue.common.js';

var state = {
	
	msg:"hello word",
	value:'',
	options:[{
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
	el:"#app",
	data(){
		return {
			curView:"menu1",
			percapita:'',
			name:'',
			category:'',
			categorys:[],
			address:'',
			businessHours:''
		};
	},
	methods:{
		go(hash){
			location.hash = hash;
		},
		saveData(){
			console.log('save data');
		}
	},
	
});