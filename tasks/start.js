'use strict';

const childProcess = require('child_process');
const electron = require('electron');
const gulp = require('gulp');

function getApp(arg) {
    if(Array.isArray(arg))
        arg = ['.'].concat(arg);
    else
        arg = ['.'];

    return function app(done) {
        childProcess.spawn(electron, arg, {
            stdio: 'inherit'
        }).on('close', function () {
            process.exit();
            done();
        });
    };
}

gulp.task('start', gulp.series('build', gulp.parallel('watch', getApp())));

gulp.task('start-debug', gulp.series('build', gulp.parallel('watch', getApp(["-dev", "--debugger", "--debug-process"]))));

