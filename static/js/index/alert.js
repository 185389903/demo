define(function(require, exports, module){
	var $=require("jquery");
	var alert_={
		init:function(){
			console.log($("img").attr("src"));
			alert("我是专门处理弹框。");
		}
	};
	exports.alert=alert_;
});