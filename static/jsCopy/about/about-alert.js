// news-alert模块
define(function(require, exports, module){
	var $=require("jquery");

	var aboutAlert={
		init:function(){
			alert("我是about-alert模块");
		}
	};
	exports.aboutAlert=aboutAlert;
});