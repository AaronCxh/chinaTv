const gulp = require("gulp");
const useref = require("gulp-useref");
const rev = require("gulp-rev");
const revplace = require("gulp-rev-replace");
const clean = require("gulp-clean");
const filter = require("gulp-filter");
const uglify = require("gulp-uglify");
const csso = require("gulp-csso");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
var paths = {
    sass: ['./scss/main.scss'],
};


gulp.task("build", function() {
  var indexHtmlFilter = filter(['**/*', '!**/*.html'], { restore: true });
  var cssFilter = filter("**/*.css", { restore: true });
  var jsFilter = filter("**/*.js", { restore: true });
  return gulp.src(['**/*.html'])
      .pipe(useref())
      .pipe(jsFilter)
      .pipe(uglify())
      .pipe(jsFilter.restore)
      .pipe(cssFilter)
      .pipe(csso())
      .pipe(cssFilter.restore)
      .pipe(indexHtmlFilter)
      .pipe(rev())
      .pipe(indexHtmlFilter.restore)
      .pipe(revplace())
      .pipe(gulp.dest('./build'));
})



gulp.task("sass",function(){
    gulp.src(paths.sass)
    .pipe(sass())
    .on("error",sass.logError)
    .pipe( postcss([require('precss'),require('autoprefixer')({browsers: ["last 7 versions","IE >= 8"]})]))    
    .pipe( csso())
    .pipe(gulp.dest("./css"))
})
gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
});
gulp.task("default",["css","testImagemin"])
