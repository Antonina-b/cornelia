const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

const cssFiles = [
    '.node_modules/normalize.css/normalize.css'
]

gulp.task('sass', function(){
    return gulp.src('./scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('all.css'))
        .pipe(autoprefixer({
            cascade: true
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
})

gulp.task('watch', function(){
    browserSync.init({
		server: {
			baseDir: './'
		}
        //tunnel: true
	});

    gulp.watch('./scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch('./*.html', browserSync.reload);
})