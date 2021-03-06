var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var inject = require('gulp-inject');
var jade = require( 'gulp-jade' );

var paths = {
  sass: ['./scss/**/*.scss'],
  jade: ['./jade/**/*.jade'],
  modules: ['./www/app/**/**/*.js'],
  javascript: [
      './www/app/**/**/*.js',
      '!./www/app/app.module.js'
  ],
  css: [
      //'./www/**/*.css',
      './www/css/*.css',
      '!./www/css/ionic.app*.css'
  ]
};

gulp.task( 'default', ['sass', 'jade'] );

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task( 'jade', function (done) {
  gulp.src( paths.jade )
    .pipe( jade() )
    .pipe( gulp.dest( './www/app/' ) )
    .on( 'end', done );
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch( paths.jade, ['jade'] );
  gulp.watch(paths.modules, ['index']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('index', function(){
     return gulp.src('./www/index.html')
         .pipe(inject(
             gulp.src(paths.javascript,
                 {read: false}), {relative: true}))
         .pipe(gulp.dest('./www'))
         .pipe(inject(
             gulp.src(paths.css,
                 {read: false}), {relative: true}))
         .pipe(gulp.dest('./www'));
 });