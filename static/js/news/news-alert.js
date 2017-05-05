// news-alert模块
define(function(require, exports, module){
	var $=require("jquery");

	var newsAlert={
		init:function(){
			alert("我是news-alert模块");
		}
	};
	exports.newsAlert=newsAlert;
});