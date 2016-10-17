var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var templateCache = require('gulp-angular-templatecache');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var minifyCSS = require('gulp-minify-css');
var runSequence = require('run-sequence');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

// 配置项
var paths = {
	build: 'www',
	src_js: ['static/js/src/**/*.js'],
	src_img: ['static/img/**/*'],
	src_font: ['static/lib/ionic/fonts/*.*'],
	src_template: ['static/js/src/**/*.html'],
	src_index_html: "static/index.html"
};

// 默认任务
gulp.task('default', ['build', 'watch']);

// 压缩所有相关文件
gulp.task('build', function (){
	runSequence(
		"minifyJs", "minifyImg", "copyFont",
		"templatecache", "useref")
});
// js 合并压缩
gulp.task('minifyJs', function (done){
	 gulp.src(paths.src_js)
		.pipe(concat('main.js'))
		.pipe(gulp.dest(paths.build))
		//.pipe(uglify())
		//.pipe(rename('main.min.js'))
		//.pipe(gulp.dest(paths.build))
		.on('end', done)
		;
});
// 图片压缩
gulp.task('minifyImg', function (done){
	 gulp.src(paths.src_img)
		.pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true })))
		.pipe(gulp.dest(paths.build + "/img"))
		.on('end', done)
		;
});
// 拷贝字体文件
gulp.task('copyFont', function (done){
	 gulp.src(paths.src_font)
		.pipe(gulp.dest(paths.build + "/fonts"))
		.on('end', done)
		;
});
// 模板文件压缩
gulp.task('templatecache', function (done) {
	gulp.src(paths.src_template)
		.pipe(templateCache({standalone:true}))
		.pipe(gulp.dest(paths.build))
		.on('end', done)
		;
});
// 将页面中引用的文件合并并压缩
gulp.task('useref', function (done) {
	gulp.src(paths.src_index_html)
		.pipe(gulpIf('*.css', minifyCSS()))
		.pipe(gulpIf('*.js', uglify()))
		.pipe(useref())
		.pipe(gulp.dest(paths.build))
		.on('end', done)
		;
});
// 监控
gulp.task('watch', ['minify', 'templatecache'], function() {
	gulp.watch(paths.src_js, ['minify']);
	gulp.watch(paths.src_template, ['minify']);
	gulp.watch(paths.src_img, ['minify']);
});
// 清空发布
gulp.task('clean', function () {
	gulp.src(paths.build, {read: false}).pipe(clean());
});
