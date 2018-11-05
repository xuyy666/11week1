/*
 * @Author: 徐园园 
 * @Date: 2018-11-05 09:31:29 
 * @Last Modified by: 徐园园
 * @Last Modified time: 2018-11-05 09:53:47
 */
//引入文件
// 9.代码规范，有对应的注释（10分）
var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');
var fs = require('fs');
var path = require('path');
var url = require('url');
var uglify = require('gulp-uglify'); //压缩js
var devcss = require('gulp-clean-css'); //压缩css
// 1.正确书写gulp配置文件（10分）
//起服务
// 7.正确启动gulp服务器，可预览生成的项目（10）
gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: 9090,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (req.url === '/favicon.ico') {
                    res.end('');
                    return false;
                }
                if (pathname === '/api/list') {

                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
});
// 5.实现scss的编译工功能（10分）
gulp.task('sass', function() {
        return gulp.src('./src/scss/*.scss')
            .pipe(sass())
            .pipe(uglify())
            .pipe(gulp.dest('./src/css'))
    })
    // 6.实现自动监听源文件变化的功能（10分）
gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('sass'))
})

gulp.task('dev', gulp.series('sass', 'server', 'watch'));



// 7.正确启动gulp服务器，可预览生成的项目（10）
// 3.使用gulp对源文件进行打包，并输出至项服务器目录（dist）
//压缩js
gulp.task('devCss', function() {
    return gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist'))
});

gulp.task()