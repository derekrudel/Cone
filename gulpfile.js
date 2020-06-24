var gulp = require("gulp")
var browserSync = require('browser-sync').create()
var webpack = require('webpack-stream')

gulp.task("html", function () {
    return gulp.src("src/*.html")
        .pipe(gulp.dest("dist"))
})

gulp.task("js", function () {
    return gulp.src("src/js/*")
        .pipe(
            webpack({
                devtool: 'source-map',
                mode: 'production',
                output: {
                    filename: 'app.js'

                }
            })
        )
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream())
})

gulp.task("watch", function () {

    browserSync.init({
        server: {
            baseDir: "dist"
        }
    })

    gulp.watch("src/js/*", gulp.series(["js"]))

    gulp.watch("src/*.html", gulp.series(["html"]))
        .on('change', browserSync.reload)



})

gulp.task("default", gulp.series(["html", "js", "watch"]))