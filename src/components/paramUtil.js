module.exports = {
	setCookie(name,value,days){//cookie键值是由domain,path,name三个参数唯一决定的，expires是cookie保存的时间
		var exdate=new Date();
		exdate.setDate(exdate.getTime()+(days*1000*60*60*24));
		var expires = days ? "" : ";expires="+exdate.toGMTString();
		var domain = ";domain="+location.host+";path=/";
		document.cookie = name+ "=" +encodeURI(value) + expires + domain;
	},
	getCookie(name){
		var value = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
		return decodeURI(value ? value.pop() : '');
	},
	clearCookie(name){
		if(name){
			this.setCookie(name, "", -1);
		}else{
			document.cookie = "";
		}
	},
	getURLParam(name,search){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var search = search || window.location.search.substr(1);
	    var r = search.match(reg);
	    if(r){
	    	return decodeURI(r[2]);
	    }
	    return null;
	}
}
