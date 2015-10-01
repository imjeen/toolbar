# 侧边栏

## overview

相对于独立的侧边栏，是通过javascript生成到文档中的，已经独立于后台。其中涉及到的站点跨域问题，最终都是通过`JSONP`解决的。而这里着重基于前端的开发，于是通过`nodejs`环境简单搭建本地服务请求，`expressjs` web框架是一个快速开发和解决请求和响应的不二之选。

服务端使用EJS模板引擎，数据存放于json文件中，这些数据有后台提供，是前后台接洽和遵循的数据接口。
而客户端使用underscore模板引擎，脚本源文件编码遵循CommonJs规范，等同于nodejs编码风格，并通过browserify预编源代码；样式是通过LESS预编译语言编写。这里使用gulp构建工具来辅助完成一些常规的任务：预编译脚本和样式，以及文件的实时监听。

注意： 伪造的json数据无任何实际意义，所以这些数据只是为了展示而用。

## env

window环境下确认安装nodejs，以及包管理器bower。bower的安装:

	npm install -g bower

## init

初始化可以在win系统下双击 `init.sh` 文件即可，过程之中可能出错，如 `gulp-less` 安装失败，可以再次重新安装即可。

安装项目依赖的所有包(到node_modules目录中)：

	npm install

安装客户端依赖包(到public/js/bower_components目录中)：

	bower install

## useage

初始化后，脚本和样式同时编译到开发和发布环境的目录中：dev和dist。

	gulp all

或者单独编译脚本和样式： gulp js 和 gulp less

对文件的监听任务为： gulp watch

当然相应的资源引用地址也要相应的变化，这里需手动更改服务端的视图模块(见view目录)。这些视图目前只是辅助开发和调试，没有实质的作用。

最后在根目录（server.js文件所在目录）开启本地服务器（默认80端口）：
	
	node server.js 或者 PORT=80 node server.js

那么在本地可以看到 http://localhost/ 页面。注意确保这里的localhost没有在hosts文件中被重定向。

## req and res

服务端数据存放于 config/data/ 目录中，以json的格式存在，有后台提供或前后台商定，其中数据是伪造的。由路由 config/router.js 读取json文件并控制请求和响应。这在开发初期是很重要的，当后台API无法提供数据或必要条件的数据时，前端可以提前模拟出数据进行开发和调试。

而真正要发送请求后台服务器，那么相应的URL应该被改为对应的远程服务器响应地址。主要对应在public/script/toolbar/_config.js文件中更改。

## resource

- nodejs
- express
- EJS
- bower
- underscore
- gulp
