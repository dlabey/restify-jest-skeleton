'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var watch = require('gulp-watch');

gulp.task('develop', function () {
  var sources = [
    './helpers/**/*.js',
    './mappers/**/*.js',
    './plugins/**/*.js',
    './services/**/*.js',
    './v1/**/*.js',
    './gulpfile.js'
  ];

  nodemon({
    script: './v1/server.js',
      ext: 'html js css',
      env: {
        'NODE_ENV': 'development'
      }
  }).on('restart', function () {
      console.log("Restarting 'develop'...");
  });

  return gulp.src(sources)
    .pipe(watch(sources))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
