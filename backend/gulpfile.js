'use strict';

const gulp = require('gulp');
var exec = require('gulp-spawn');
var mocha = require('gulp-mocha');

var new_user = require('./utility/new_user');

gulp.task('tests', () => {
    new_user('UserUser', 'PassPass');
    return gulp.src('tests/test.js')
        .pipe(mocha());
});