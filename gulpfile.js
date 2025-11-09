// Імпорт необхідних модулів
const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin'); // ✅ тепер знову стабільна версія

// ---------- ТАСКИ ----------

// HTML
const htmlTask = () => {
    return src('app/html/**/*.html')
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
};

// SCSS
const scssTask = () => {
    return src('app/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream());
};

// JS
const jsTask = () => {
    return src('app/js/**/*.js')
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream());
};

// IMG
const imgTask = () => {
    return src('app/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}', {encoding: false})
        .pipe(imagemin()) // стиснення без втрати якості
        .pipe(dest('dist/img'))
        .pipe(browserSync.stream());
};

// СЕРВЕР І СПОСТЕРЕЖЕННЯ
const serve = () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
        notify: false
    });

    watch('app/html/**/*.html', htmlTask);
    watch('app/scss/**/*.scss', scssTask);
    watch('app/js/**/*.js', jsTask);
    watch('app/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}', imgTask);
};

//ЕКСПОРТ ТАСКІВ
exports.default = series(
    parallel(htmlTask, scssTask, jsTask, imgTask),
    serve
);
