# ionic_appoint

ionic版本appoint

# 开发相关

## 相关命令

* gulp watch

	开发时使用，用于监控js/css等文件的压缩合并。（注意：此命令执行后若js改变后无法压缩成功，命令会报错并自动结束。需要调整js并重新执行命令。）

* gulp minify

	构建前使用，生成合并之后的文件。

* ionic serve --lab

	开发时使用，用于在浏览器中进行调试。

* npm install

	安装插件。

* ionic platform add ios[android]

	添加对应的平台。

* ionic run android/ios

	在模拟器或者真机中调试

* ionic build

	平台打包。

* adb devices

	列出可用android设备

* adb logcat

	进入android日志打印控制台

* adb install apk

	给android设备安装应用


# 注意事项

* www/js/build目录中文件需要手动生成。参考gulp minify命令。
* cordova插件查询地址： http://cordova.apache.org/plugins/?q=service&platforms=cordova-android%2Ccordova-ios
