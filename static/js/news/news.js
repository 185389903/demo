define(function(require, exports, module){
	// 每个页面都必须的jquery公共模块 和main模块
	var $=require("jquery");
	var mainObj=require("main");
	mainObj.main.init();
	
	var news={
		init:function(){
			var newsObJ=require("news-alert");
			newsObJ.newsAlert.init();
		}
	};
	news.init();
	exports.news=news;
});