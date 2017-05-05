// 公共模块
define(function(require, exports, module){
	var $=require("jquery");
	var main={
		init:function(){
			alert("公共模块js");
		}
	};
	exports.main=main;
});