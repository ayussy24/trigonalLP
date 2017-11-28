'use strict';

var browserSync   = require('browser-sync'),
    gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    autoprefixer  = require('gulp-autoprefixer'),
    plumber       = require('gulp-plumber'),
    webpack       = require('gulp-webpack'),
    maps          = require('gulp-sourcemaps'),
    imagemin      = require("gulp-imagemin");

gulp.task('sass', function() {
gulp.src("./src/sass/app.scss")
    .pipe(plumber())
    .pipe(maps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .on('error', function(err) {
      console.log(err.message);
    })
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream());
});

gulp.task('webpack',function(){
gulp.src(['./src/javascripts/app.js'])
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest("dist/javascript"))
    .pipe(browserSync.stream());
});

gulp.task('js-watch', ['webpack'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('imagemin', function(){
    return gulp.src('./src/images/*')
    .pipe(imagemin({
    verbose: true,
    progressive: true,
    plugins: [
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({plugins: [{removeViewBox: true}]})
    ]
    }))
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('serve', ['sass','webpack'], function() {
browserSync.init({
    server: "./"
});

gulp.watch(["./src/sass/*.scss","./src/sass/**/*.scss"], ['sass']);
gulp.watch(["./src/javascripts/app.js","./src/javascripts/lib/*.js"],["webpack"]);
gulp.watch(["*.html","**/*.html"]).on('change', browserSync.reload);
gulp.watch("./src/images/*", ['imagemin']);
});

gulp.task("default",['serve']);