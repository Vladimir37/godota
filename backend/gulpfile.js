'use strict';

const gulp = require('gulp');
var exec = require('gulp-exec');
var mocha = require('gulp-mocha');
var request = require('request');
var spawn = require('child_process').spawn;

gulp.task('tests', () => {
    return exec('node utility/new_user.js UserUser PassPass testing')
        .pipe(gulp.src('tests/test.js'))
        .pipe(mocha())
        .pipe(exec('node tests/server/clean_db.js'))
});