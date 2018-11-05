/*
 * @Author: 徐园园 
 * @Date: 2018-11-05 09:31:29 
 * @Last Modified by:   徐园园 
 * @Last Modified time: 2018-11-05 09:31:29 
 */

var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');
var fs = require('fs');
var path = require('path');
var url = require('url');
// 1.正确书写gulp配置文件（10分）
//起服务
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

gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})

gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('sass'))
})

gulp.task('dev', gulp.series('sass', 'server', 'watch'))