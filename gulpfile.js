var gulp = require('gulp');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var gutil = require('gulp-util');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var jsMin = require('gulp-minify');

var destination = 'release';

gulp.task('default', ['scripts', 'styles', 'watch']);

gulp.task('scripts', function() {
    gulp.src([
    		'src/ts/classes/*.ts',
    		'src/ts/app.ts'
    	])
        .pipe(ts({
            noImplicitAny: true,
            out: 'app.js'
        }))
	    .pipe(jsMin({
	    	ext: {
	            src:'.js',
	            min:'.min.js'
        }
	    }))
	    .pipe(gulp.dest(destination));
});

gulp.task('styles', function () {
	gulp.src([
		'src/scss/app.scss'
	])
		.pipe(sass({
			style: 'expanded',
			importer: require('npm-sass').importer
		}))
    		.on('error', gutil.log)
    	.pipe(cleanCSS())
		.pipe(gulp.dest(destination));

});

gulp.task('watch', function () {
    // Endless stream mode 
    watch('src/ts/**/*',
    	{ ignoreInitial: false },
		function () {
        	gulp.start('scripts');
    	}
    );
    watch('src/scss/**/*',
    	{ ignoreInitial: false },
		function () {
        	gulp.start('styles');
    	}
    );
});