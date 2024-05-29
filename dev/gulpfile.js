/* common
=========================== */
const gulp = require("gulp"); //gulp本体
const debug = require("gulp-debug");//処理中のファイルをログ表示
const browserSync = require("browser-sync"); //ブラウザの立ち上げ_リロード
const mmq = require("gulp-merge-media-queries"); //メディアクエリを一つにまとめる
const rename = require("gulp-rename"); //圧縮ファイルの名前を(.min) 変更 →webページの表示速度を向上させる為

/* scss
=========================== */
const sass = require("gulp-sass")(require("sass")); //"sass"でDart Sassを使用できる様にする。 Dart SassはSass公式が推奨 @use構文などが使える
const postcss = require("gulp-postcss");      //ベンダープレフィックス自動付与
const autoprefixer = require("autoprefixer"); //ベンダープレフィックス自動付与
const cssSorter = require("css-declaration-sorter"); //cssのプロパティの順番を並び替える
const cleanCss = require("gulp-clean-css"); //cssファイルの圧縮
const notify = require("gulp-notify"); // エラー発生時のアラート出力
const plumber = require("gulp-plumber"); // エラーが発生しても強制終了させない

function compileSass() {
  return gulp
  .src("./src/assets/sass/**/*.scss")
  .pipe(sass())
  .pipe(postcss([autoprefixer(), cssSorter()]))
  .pipe(mmq())
  .pipe(gulp.dest("../public/assets/css/"))
  // .pipe(gulp.dest("../assets/css"))
  .pipe(cleanCss())
  .pipe(
    rename({
      suffix: ".min",
    })
  )
  .pipe(gulp.dest("../public/assets/css/"));
  // .pipe(gulp.dest("../assets/css/"));
}

/* html
=========================== */
const htmlBeautify = require("gulp-html-beautify"); //フォーマットされたHTML見栄えを整える

function formatHTML() {
  return gulp
    .src("./src/**/*.html")
    .pipe( htmlBeautify({
        indent_size: 2,
        indent_with_tabs: true,
      })
    )
    .pipe(gulp.dest("../public/"));
}

/* javaScript
=========================== */
const uglify = require("gulp-uglify"); //jsファイルの圧縮

function minJS() {
  return gulp
  .src("./src/assets/js/**/*.js")
  .pipe(gulp.dest("../public/assets/js/"))
  // .pipe(gulp.dest("../assets/js/"))
  .pipe(uglify())
  .pipe(
    rename({
        suffix: ".min",
      })
    )
    .pipe(gulp.dest("../public/assets/js/"));
    // .pipe(gulp.dest("../assets/js/"));
  }

/* img
=========================== */
function copyImage() {
  return gulp.src("./src/assets/img/**/*")
  .pipe(gulp.dest("../public/assets/img/"));
  // .pipe(gulp.dest("../assets/img/"));
}

/* Fonts
=========================== */
function watchFonts() {
  return gulp.src("./src/assets/fonts/**/*")
  .pipe(gulp.dest("../public/assets/fonts/"))
  // .pipe(gulp.dest("../assets/fonts/"))
}

/* watch
    ファイルの変更を検知したら、browserReloadでreloadメソッドを呼び出す
    watch('監視するファイル',処理)
    series 順番に実行
=========================== */
function watch(done) {
  gulp.watch("./src/assets/sass/**/*.scss", gulp.series(compileSass, browserReload));
  gulp.watch("./src/assets/js/**/*.js", gulp.series(minJS, browserReload));
  gulp.watch("./src/assets/img/**/*", gulp.series(copyImage, browserReload));
  gulp.watch("./src/assets/fonts/**/*", gulp.series(watchFonts, browserReload));
  gulp.watch("./src/**/*.html", gulp.series(formatHTML, browserReload)); // php 開発時にはこちらをコメントアウトする
  // gulp.watch("../**/*.php", browserReload); // php開発時にコメントアウトを外す
  done();
}

/* ローカルサーバ立ち上げ
=========================== */
function browserInit() {
  browserSync.init({
    server: {
      baseDir: "../public",
    },
    // proxy: "http://konohadev.local/" // local でWordPressを作成する時にドメインを変更する必要あり！
    // proxy: "example.wp",// ローカルにある「Site Domain」に合わせる
    // notify: false,// ブラウザ更新時に出てくる通知を非表示にする
    // open: "external",// ローカルIPアドレスでサーバを立ち上げる
  });
}

/* 自動リロード
=========================== */
function browserReload(done) {
  browserSync.reload();
  done();
}

/* npx gulp dev で起動
=========================== */
exports.compileSass = compileSass;
exports.formatHTML = formatHTML;
exports.minJS = minJS;
exports.watch = watch;
exports.browserInit = browserInit;
exports.dev = gulp.parallel(watch, browserInit);
exports.build = gulp.parallel(formatHTML, minJS, compileSass, copyImage, watchFonts);
// exports.build = gulp.parallel(minJS, compileSass, copyImage, watchFonts);

