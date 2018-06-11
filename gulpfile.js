var gulp = require("gulp");
var webserver = require("gulp-webserver");
var less = require("gulp-less");
var minjs = require("gulp-uglify");
var mincss = require("gulp-minify-css");
var sequence = require("gulp-sequence");

gulp.task("server", function() {
    gulp.src("./src")
        .pipe(webserver({
            port: 8081,
            host: "localhost",
            livereload: true,
            middleware: function(req, res, next) {
                next();
            }
        }))
});

gulp.task("minjs", function() {
    gulp.src("./src/js/*.js")
        .pipe(minjs())
        .pipe(gulp.dest("./src/bulid/js"));
});

gulp.task("nCss", function() {
    gulp.src("./src/css/*.less")
        .pipe(less())
        .pipe(gulp.dest("./src/css"))
        .pipe(mincss("style.min.css"))
        .pipe(gulp.dest("./src/bulid/css"));
})

gulp.watch("./src/css/*.less", ["nCss"]);
gulp.watch("./src/js/*.js", ["minjs"]);

gulp.task("default", function(cb) {
    sequence("server", ["minjs", "nCss"], cb);
});