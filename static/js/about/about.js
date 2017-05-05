define(function(require, exports, module){
	// 每个页面都必须的jquery公共模块 和main模块
	var $=require("jquery");
	var mainObj=require("main");
	mainObj.main.init(); 

	var about={
		init:function(){
			var aboutAlertObj=require("about-alert");
			aboutAlertObj.aboutAlert.init();
			alert("测试about");
		}
	};
	about.init();
	exports.about=about;
});