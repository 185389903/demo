var gulp=require('gulp');
var replace = require('gulp-replace');
var changed = require('gulp-changed');
var less = require('gulp-less');
var minifycss = require('gulp-minify-css');
var concat  = require('gulp-concat');
var uglify  = require('gulp-uglify');
var codeLength = 8;
var code = '';
// 初始生成的对比的目录,初始生成可能比较慢。
var DEST = 'dist';
var SRC="./src/";
var DIR="./src/**/*.html";
var STATIC_SRC="./static/css/";
var STATIC_DIR="./static/css/**/*.css";
var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z');
function randomCode(){
	code='';
	for(var i = 0; i < codeLength; i++){
	    //设置随机数范围,这设置为0 ~ 36
	     var index = Math.floor(Math.random()*36);
	     //字符串拼接 将每次随机的字符 进行拼接
	     code += random[index]; 
	}	
	return code+new Date().getTime();
}
var REGConfig={
	js:/(\.js){1}\?*(v)*=*([0-9a-zA-Z]|\.|_)*/g,
	png:/(\.png){1}\?*(v)*=*([0-9a-zA-Z]|\.|_)*/g,
	jpg:/(\.jpg){1}\?*(v)*=*([0-9a-zA-Z]|\.|_)*/g,
	gif:/(\.gif){1}\?*(v)*=*([0-9a-zA-Z]|\.|_)*/g,
	css:/(\.css){1}\?*(v)*=*([0-9a-zA-Z]|\.|_)*/g,
	twigChange:function(DIR,SRC,DEST){
		var ts=this;
		var code=randomCode();
		gulp.src(DIR)     //该任务针对的文件
	    // 初始生成文件，和源文件相同一开始，和源文件对比目录
	    .pipe(changed(DEST))
	    .pipe(replace(ts.js,'.js?v='+code))      //该任务调用的模块
	    .pipe(replace(ts.png,'.png?v='+code))      //该任务调用的模块
	    .pipe(replace(ts.jpg,'.jpg?v='+code))      //该任务调用的模块
	    .pipe(replace(ts.gif,'.gif?v='+code))      //该任务调用的模块
	    .pipe(replace(ts.css,'.css?v='+code))      //该任务调用的模块

	    // 源文件源目录输出
		.pipe(gulp.dest(SRC))

		// 更改文件后再次生成最新文件到DEST目录中，如果再次修改"./page/"下的文件会和DEST目录下的进行对比，有改动的文件生成替换
		.pipe(gulp.dest(DEST))	
	},
	twigRelease:function(DIR,SRC,DEST){
		var ts=this;
		var code=randomCode();
		gulp.src(DIR)     //该任务针对的文件
	    .pipe(replace(ts.js,'.js?v='+code))      //该任务调用的模块
	    .pipe(replace(ts.png,'.png?v='+code))      //该任务调用的模块
	    .pipe(replace(ts.jpg,'.jpg?v='+code))      //该任务调用的模块
	    .pipe(replace(ts.gif,'.gif?v='+code))      //该任务调用的模块
	    .pipe(replace(ts.css,'.css?v='+code))      //该任务调用的模块

	    // 源文件源目录输出
		.pipe(gulp.dest(SRC))
	},
	staticV:function(STATIC_DIR,STATIC_SRC){
		var ts=this;
		var code=randomCode();
		gulp.src(STATIC_DIR)     //该任务针对的文件
	    .pipe(replace(ts.png,'.png?v='+code))      //该任务调用的模块
	    .pipe(replace(ts.jpg,'.jpg?v='+code))      //该任务调用的模块
	    .pipe(replace(ts.gif,'.gif?v='+code))      //该任务调用的模块

	    // 源文件源目录输出
		.pipe(gulp.dest(STATIC_SRC))
	},

	jsCFun:function(){
		var ts=this;
		gulp.src("static/js/**/*.js")
	    .pipe(changed(jsCopy))
	    .pipe(gulp.dest(jsCopy))
	    .pipe(uglify({
	    	mangle:true,
	    	mangle: {except: ['require' ,'exports' ,'module' ,'$']}
	    }))
	    .pipe(gulp.dest("./static/dist/js/"))
	    .on("end",twigV);
	}
};

gulp.task("twigWatch",function(){
	REGConfig.twigChange(DIR,SRC,DEST);
});
function twigV(){
	gulp.watch('./src/**/*.html',['twigWatch']);
	// 每次git pull下来的文件进行针对性补全副本
	REGConfig.twigChange(DIR,SRC,DEST);
}
var jsCopy="./static/jsCopy";
gulp.task("jsC",function(){
	REGConfig.jsCFun();
});	
gulp.task("watch",function(){
	// 每次重启gulp watch命令时会给模板twig初始化一个最新的版本好给.js .png .jpg .gif .css
	REGConfig.twigRelease(DIR,SRC,DEST);

	// 每次重启运行gulp watch命令时会监听twig做出改变的文件进行.js .png .jpg .gif .css进行版本更新
	// 模板做出改变的第一次会生成一个和源文件模板一样的目录结构进行对比文件修改差异进行针对性的版本替换提高构建速度
	REGConfig.jsCFun();

	// js的监听改变事实打包到发布目录dist
	gulp.watch('static/js/**/*.js',['jsC']);

	/*
		less监听改变事实打包到发布目录 
		statc/css/global/main.css (公共css)  
		statc/css/other/*.css (其他页面一对一针对css)

		less源文件目录static/less

		并且最终发布的css里运用的图片会更新版本号！
	*/
	gulp.watch('static/less/global/*.less',['mainLess']);
    gulp.watch('static/less/other/*.less',['staticLessCompile']);
});


// 实时改变实时替换版本
/* gulp.task('watch',function(){
 	gulp.watch(DIR,function(){
	 	REGConfig.twigChange(DIR,SRC,DEST);
 	});
});
*/
// 开发时使用,为了增加打包速度，但是版本号不同意，针对更改过的文件增加最新版本号
gulp.task("twig",function(){
 	REGConfig.twigChange(DIR,SRC,DEST);
});

// 发布时打包这个生成统一版本号
gulp.task("twigRelease",function(){
 	REGConfig.twigRelease(DIR,SRC,DEST);
});

// css 图片替换版本
gulp.task("staticCss",function(){
 	REGConfig.staticV(STATIC_DIR,STATIC_SRC);
});
function cssimgV(){
	REGConfig.staticV(STATIC_DIR,STATIC_SRC);
}
gulp.task('staticLessCompile',function(){

    return gulp.src('static/less/other/*.less')

    // 调用less插件编译less文件
    .pipe(less())

    // 压缩css
    .pipe(minifycss())

    // 输出到指定目录
    .pipe(gulp.dest('static/css/other/'))

    .on("end",cssimgV)

});
gulp.task('mainLess',function(){

    return gulp.src('static/less/global/main.less')

    // 调用less插件编译less文件
    .pipe(less())

    // 压缩css
    .pipe(minifycss())

    .pipe(concat("main.css"))

    // 输出到指定目录
    .pipe(gulp.dest('static/css/global/'))
    .on("end",cssimgV)

});
// less发生变化时时打包 时时替换css里面img版本
gulp.task('watchLess', function () {
    gulp.watch('static/less/global/*.less',['mainLess']);
    gulp.watch('static/less/other/*.less',['staticLessCompile']);
});