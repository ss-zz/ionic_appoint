var gulp = require('gulp');
var debug = require('gulp-debug');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');

var paths = {
	js_src: ['www/js/src/**/*.js'],
	js_build: 'www/js/build'
};

// gulp.task('default', ['sass']);
gulp.task('default', ['watch']);

//js 合并压缩
gulp.task('minify', function (){
	 return gulp.src(paths.js_src)
		.pipe(concat('main.js'))
		.pipe(gulp.dest(paths.js_build))
		.pipe(debug({title: 'file:'}))
		.pipe(uglify())
		.pipe(rename('main.min.js'))
		.pipe(gulp.dest(paths.js_build));
});
gulp.task('watch', function() {
	gulp.watch(paths.js_src, ['minify']);
});
//清空发布
gulp.task('clean', function () {
	gulp.src(paths.js_build, {read: false}).pipe(clean());
});

gulp.task('install', ['git-check'], function() {
	return bower.commands.install()
		.on('log', function(data) {
			gutil.log('bower', gutil.colors.cyan(data.id), data.message);
		});
});

gulp.task('git-check', function(done) {
	if (!sh.which('git')) {
		console.log(
			'	' + gutil.colors.red('Git is not installed.'),
			'\n	Git, the version control system, is required to download Ionic.',
			'\n	Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
			'\n	Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
		);
		process.exit(1);
	}
	done();
});
