var gulp = require("gulp");
var uglify = require("gulp-uglify"); // for normal js
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var cleanCss = require("gulp-clean-css");

gulp.task("compactJS", function () {
  return new Promise(function (resolve, reject) {
    console.log("compactJS");
    resolve();
  });
});

gulp.task("build-css", () => {
  return (
    gulp
      .src("public/styles/style.css")
      //.pipe(concat("app.css"))
      .pipe(cleanCss())
      .pipe(rename({ suffix: ".min" })) // เพิ่ม .min ต่อท้ายไฟล์
      .pipe(gulp.dest("public/styles"))
  );
});

gulp.task("build-app-css", () => {
  return (
    gulp
      .src("public/styles/app.css")
      //.pipe(concat("app.css"))
      .pipe(cleanCss())
      .pipe(rename({ suffix: ".min" })) // เพิ่ม .min ต่อท้ายไฟล์
      .pipe(gulp.dest("public/styles"))
  );
});

gulp.task("js", function () {
  return gulp
    .src("public/js/app.js") // ไฟล์ที่ต้องการ uglify() //./src/admin/main.js  ../static/js/*.js
    .pipe(uglify()) // สั่ง execute uglify()
    .pipe(rename({ suffix: ".min" })) // เพิ่ม .min ต่อท้ายไฟล์
    .pipe(gulp.dest("public/js")); // โฟลเดอร์ที่ต้องการเซฟ //../static/js/
});

gulp.task("watch", function () {
  gulp.watch("public/styles/*.css", gulp.series("build-css"));
});

//gulp.task('default', ['watch']);
//gulp.task('all', ['js', 'watch']);

gulp.task("default", gulp.series("build-css", "watch"));

gulp.task("css", gulp.series("build-css", "build-app-css"));
