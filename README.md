# ionic_mobile

ionic 版本mobile(未完全升级)

# 开发相关

## 相关命令

* gulp watch

	开发时使用，用于监控js/css等文件的压缩合并。（注意：此命令执行后若js改变后无法压缩成功，命令会报错并自动结束。需要调整js并重新执行命令。）

* gulp build

	构建前使用，生成合并之后的文件(生成www目录，并生成相关文件)。

* ionic serve

	开发时使用，用于在浏览器中进行调试。

* npm install

	安装nodejs插件(node_modules目录)。

* ionic state restore

	恢复ionic项目状态，重新安装插件(plugins目录)。

* ionic platform add ios[android]

	添加对应的平台。

* ionic run android/ios

	在模拟器或者真机中调试,可选参数(--livereload --consolelogs)

* ionic build ios[android]

	平台打包。

* adb devices

	列出可用android设备

* adb logcat

	进入android日志打印控制台

* adb install apk

	给android设备安装应用


# 注意事项

* www目录需要手动生成。参考gulp build命令。
* cordova插件查询地址： http://cordova.apache.org/plugins/?q=service&platforms=cordova-android%2Ccordova-ios 。
* 新项目若打包报插件失败，可将plugins、node_modules目录删除，然后先后执行 *npm install*、*ionic state restore* 命令重新安装插件。
* 若因网络问题依赖包无法下载，可安装淘宝镜像【npm install -g cnpm --registry=https://registry.npm.taobao.org 】。然后使用cnpm安装，参考https://npm.taobao.org/ 。
* 安装插件请添加 --save或者 --save-dev参数。

# 完成流程样例-仅限当前框架开发方式

## 环境依赖

* nodejs安装
* ionic环境。(npm install -g ionic)
* android sdk【android版本开发】
* 待定【ios版本开发】

## 样例一【浏览器中访问效果、开发】

* 启动api服务端。
* 下载ionic项目源代码。
* 安装依赖包、添加环境。
	* npm install 【安装node模块】
	* ionic state restore 【安装ionic插件】
	* ionic platform add ios[android] 【添加环境】

* 修改代理地址【ionic.project文件中path、proxyUrl属性】。（解决浏览器跨域访问问题）
* 在项目根目录执行【gulp build(演示)/gulp build watch(开发)】。（压缩并生成相关文件-必须）
* 在项目根目录执行【ionic serve】。（在浏览器中查看效果）

## 样例二【android版本打包】

* 下载ionic项目源代码。
* 参考【样例一】安装依赖包、添加环境部分。
* 修改api服务端的访问地址。【static/js/src/app.js文件中SERVER_URL_PRE地址。注意：修改代理地址无效】
* 在项目根目录执行【gulp build】。
* 在项目根目录执行【ionic build android】。（会在根目录下platforms目录中对应平台下生成apk安装包。）

## 样例三【web版本打包】

* 下载ionic项目源代码。
* 参考【样例一】安装依赖包、添加环境部分。
* 修改api服务端的访问地址。【static/js/src/app.js文件中SERVER_URL_PRE地址。注意：修改代理地址无效】
* 在项目根目录执行【gulp build】。
* 直接将生成的www目录拷贝发布即可。

