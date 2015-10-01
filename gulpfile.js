'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
// var sourcemaps = require('gulp-sourcemaps');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var browserify = require('browserify');
var stringify = require('stringify');
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer');

gulp.task('less',function(){
	return gulp.src('./public/less/*.less')
		// .pipe(sourcemaps.init({loadMaps: true}))
		.pipe(less())
		// .pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./public/dev'))
		// .pipe(sourcemaps.init({loadMaps: false}))
		.pipe(minifyCSS({compatibility: 'ie7'}))
		.pipe(rename({ extname: '.min.css' }))
		.pipe(gulp.dest('./public/dist'))

		
});

gulp.task('js',function(){

	var b = browserify({
		entries: './public/js/toolbar.js',
		debug: true
	});

	return b.transform(stringify({
			extensions: ['.html'],
			minify: true,
			minifier: {
				extensions: ['.html'],
				options: {
					removeComments: true,
					collapseWhitespace: true,
				}
			}
		 }))
		.bundle()
		.pipe(source('toolbar.js'))
		.pipe(buffer())
		.pipe(gulp.dest('./public/dev'))
		.pipe(uglify())
		.pipe(rename({ extname: '.min.js' }))
		.pipe(gulp.dest('./public/dist'));
});

gulp.task('all',['less','js']);

gulp.task('watch',function(){

	gulp.watch('./public/less/**/*.less',['less'])
		.on('change',function(e){
			console.log('file ' + e.path + ' was ' + e.type + ', running tasks...');
		});

	gulp.watch(['./public/js/**/*','./public/template/**/*.html'],['js'])
		.on('change',function(e){
			console.log('file ' + e.path + ' was ' + e.type + ', running tasks...');
		});

});

gulp.task('help',function(){
	var taskArray = Object.keys(gulp.tasks);
	for(var a in taskArray){
		console.log('$ gulp ', taskArray[a]);
	}
});

