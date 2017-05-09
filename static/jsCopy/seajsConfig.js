(function(){
	var jsV=document.getElementsByTagName("script");
	var v=jsV[0].getAttribute("src").split("?")[1];
	var staticGlobalPathEle=document.getElementById("staticGlobalPathEle");
	if(staticGlobalPathEle.length>0){
		var staticGlobalPath=
	}
	seajs.config({
		paths: {
		  'globalPath': 'https://185389903.github.io/demo/static/dist/js'
		},
	 	alias: { 
	 		// 库模块，如果没有经过模块化的插件一定要用require.async异步加载
	 		'jquery': 'globalPath/libs/jquery/jquery.min',
	 		"jqueryCookie":"globalPath/libs/jquery/jqueryCookie/jquery.cookie",
	 		"main":"globalPath/main",


	 		'index':"globalPath/index/index",
	 		'index-alert':"globalPath/index/alert",
	 		'index-nav':"globalPath/index/nav",
	 		

	 		"news":"globalPath/news/news",
	 		"news-alert":"globalPath/news/news-alert",


	 		"about":"globalPath/about/about",
	 		"about-alert":"globalPath/about/about-alert"
	 	},
	 	map: [
		    [ /^(.*\.(?:css|js))(.*)$/i, '$1?'+v ]
		] 
	});
})();