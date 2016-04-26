/**
 * Created by numminorihsf on 26.04.16.
 */
'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel')({
  presets: ['es2015']
});

gulp.task('default', function() {
  return new Promise(function(res, rej) {
    gulp.src(['src/**/*'], {base: 'src'})
      .pipe(babel)
      .pipe(gulp.dest('build/'))
      .on('end', res).on('error', rej);
  });
});
