var gulp = require('gulp'),
	imgMin = require('gulp-imagemin'),
	uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint'),
	scss = require('gulp-sass');

gulp.task('imgmin', function () {
    gulp.src('src/img/**/*.{png,jpg,gif,ico}')
        .pipe(imgMin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('js',function(){
	gulp.src('src/js/*.js')
		.pipe(jshint())
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('css', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(scss().on('error', scss.logError))
    .pipe(gulp.dest('./dist/css'));
});