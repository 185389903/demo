define(function(require, exports, module){
	// 每个页面都必须的jquery公共模块 和main模块
	var $=require("jquery");
	var mainObj=require("main");
	mainObj.main.init()
	// 同步载入模块
	var navObj=require("index-nav");
	navObj.nav.init();

	var index={
		init:function(){
			console.log($("body").html());

			// 异步载入模块
			require.async("index-alert",function(param){
				param.alert.init();
			});

			// 异步加载jquery插件
			require.async("jqueryCookie",function(){
				// jquery插件异步加载完毕后可以直接使用
				$.cookie("name","txp");
			});
			var data=[
				{
					price:10,
					name:"商品1"
				},{
					price:20,
					name:"商品1"
				}
			];
			$.each(data,function(item,index){
				console.log(item,index);
			});
		}
	};
	index.init();
	exports.index=index;
});