'use strict';

const gulp = require('gulp');
var exec = require('gulp-exec');
var wait = require('gulp-wait');
var mocha = require('gulp-mocha');
var request = require('request');
var spawn = require('child_process').spawn;

gulp.task('tests', () => {
    // spawn(__dirname + '/tests/server/start_server.js')
    return exec('node utility/new_user.js UserUser PassPass testing')
        .pipe(gulp.src('tests/test.js'))
        .pipe(mocha())
        .pipe(exec('node tests/server/clean_db.js'))
});