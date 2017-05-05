# demo
pc版本号解决方案

源目录分为:
node_modules (这个不用讲)
src (假设后台存放的所有模板文件，不管目录怎么签到怎么拆分)
static (静态文件)
gulpfile.js 打包配置文件
package.json 插件安装表文件



<pre>开发时打包会生成
node_modules (这个不变)
dist (运行gulp时生成的和src对比的副本，为了监听源文件的更改 有针对性的版本号更新，提高打包速度)
src (这个后台模板源文件里用到的img css js会自动添加版本号)
static (静态文件)
	|
	|————css（打包less文件生成的目录 发布和开发时都可用的css目录文件css，编译打包时会更新css背景图片版本号）
	|	|
	|	 ——————————global(公共css main)
	|	|
	|	 ——————————other(其他一对一页面css)
	|
	|————dist/js(打包后的js目录,目录结构和js源文件一样，打包自动生成，发布时和开发时都可使用的目录文件)
	|
	|————img (静态图片资源存放目录)
	|
	|————js (js源文件开发时编码工作，会自动监听js变化改动自动针对改动的js进行打包压缩部署到dist/js目录)
	|
	|————jsCopy (运行gulp时生成的js副本，为了监听单独js的改变正对性的打包压缩，提高打包速度)
	|
	|____less (编码时less源文件，会自动监听改变自动编译到发布目录css)

gulpfile.js 打包配置文件
package.json 插件安装表文件

git提交代码时只提交以下目录下的文件即可

src目录
static
	|
	|————css目录
	|
	|————dist/js目录
	|
	|————img目录

特别注意的是开发时和发布时记得更改static/js/seajsConfig.js配置文件里的路劲必须指向静态资源存放js的总目录
seajs下的模块依赖会在这个配置下寻找依赖路劲，避免使用相对路径，因为目录结构复杂，不如这样简单粗暴。
paths: {
  'globalPath': 'http://127.0.0.1:8020/www/gulp-twig-test/static/dist/js'
}
</pre>
