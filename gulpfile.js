var gulp = require('gulp');
// 文件合并
var concat = require('gulp-concat');
// 重命名
var rename = require('gulp-rename');
// js混淆
var uglify = require('gulp-uglify');
// 清除目录
var clean = require('gulp-clean');
// angularjs模板缓存
var templateCache = require('gulp-angular-templatecache');
// 页面引用文件合并
var useref = require('gulp-useref');
// if判断
var gulpIf = require('gulp-if');
// css压缩
var cleanCss = require('gulp-clean-css');
// 顺序执行任务
var runSequence = require('run-sequence');
// 图片压缩
var imagemin = require('gulp-imagemin');
// 缓存
var cache = require('gulp-cache');
// 自动添加angularjs依赖注入
var ngAnnotate = require('gulp-ng-annotate');
// 清除调试信息
var stripDebug = require('gulp-strip-debug');
// 打压缩包
var zip = require('gulp-zip');

// 配置项
var paths = {
	build: 'www',
	pub: 'pub',
	src_js: ['static/js/src/**/*.js'],
	src_css: ['static/css/**/*.css'],
	src_img: ['static/img/**/*'],
	src_pub: ['static/pub/**/*'],
	src_font: ['static/lib/ionic/fonts/*.*'],
	src_template: ['static/js/src/**/*.html'],
	src_index_html: 'static/index.html',
	www_temp: ['www/app.min.js', 'www/templates.js']
};

// 默认任务
gulp.task('default', ['build']);

// 压缩所有相关文件
gulp.task('build', function (){
	gulp.src(paths.src_pub)
		.pipe(gulp.dest(paths.build + "/pub"));
	return runSequence(
		"minifyJs", "minifyImg", "copyFont",
		"templatecache", "useref", 'cleanTemp');
});
// js 合并压缩
gulp.task('minifyJs', function (done){
	return gulp.src(paths.src_js)
		.pipe(ngAnnotate())
		.pipe(stripDebug())
		.pipe(uglify({outSourceMap: false}))
		.pipe(concat('app.min.js'))
		.pipe(gulp.dest(paths.build))
		;
});
// 图片压缩
gulp.task('minifyImg', function (done){
	return gulp.src(paths.src_img)
		.pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true })))
		.pipe(gulp.dest(paths.build + "/img"))
		;
});
// 拷贝字体文件
gulp.task('copyFont', function (done){
	return gulp.src(paths.src_font)
		.pipe(gulp.dest(paths.build + "/fonts"))
		;
});
// 模板文件压缩
gulp.task('templatecache', function (done) {
	return gulp.src(paths.src_template)
		.pipe(templateCache({standalone:true}))
		.pipe(gulp.dest(paths.build))
		;
});
// 将页面中引用的文件合并并压缩
gulp.task('useref', function (done) {
	return gulp.src(paths.src_index_html)
		.pipe(useref())
		.pipe(gulpIf('*.css', cleanCss()))
		.pipe(gulp.dest(paths.build))
		;
});
// 监控
gulp.task('watch', function() {
	gulp.watch(paths.src_js, ['build']);
	gulp.watch(paths.src_template, ['build']);
	gulp.watch(paths.src_img, ['build']);
	gulp.watch(paths.src_index_html, ['build']);
});
// 清空发布
gulp.task('clean', function () {
	return gulp.src(paths.build, {read: false})
		.pipe(clean());
});
// 删除临时文件-自定义
gulp.task('cleanTemp', function () {
	return gulp.src(paths.www_temp, {read: false})
		.pipe(clean());
});
// www目录压缩
gulp.task('zip', function () {
	return gulp.src(paths.build + "/**/*")
		.pipe(zip('www.zip'))
		.pipe(gulp.dest(paths.pub))
		;
});
// web方式发布
gulp.task('pub', function () {
	return runSequence(
		"minifyJs", "minifyImg", "copyFont",
		"templatecache", "useref", 'cleanTemp', 'zip');
});
