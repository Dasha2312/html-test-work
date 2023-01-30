let preprocessor = 'sass'; // Preprocessor (sass, scss, less, styl)

const { src, dest, parallel, series, watch } = require('gulp');
const sass           = require('gulp-sass')(require('sass'));
const cleancss       = require('gulp-clean-css');
const concat         = require('gulp-concat');
const browserSync    = require('browser-sync').create();
const uglify         = require('gulp-uglify-es').default;
const autoprefixer   = require('gulp-autoprefixer');
var minifyHTML       = require('gulp-minify-html');
var changed          = require('gulp-changed');
var rename           = require('gulp-rename');
const fileinclude    = require('gulp-file-include');

// Local Server
function browsersync() {
    browserSync.init({
        server: { baseDir: 'dist/' },
        startPath: "index.html",
        notify: false,
        // online: false, // Work offline without internet connection
    })
}

// Custom Styles

function styles() {
    return src(['src/style/main.scss'])
    .pipe(eval(preprocessor)())
    .pipe(concat('app.min.css'))
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
    .pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream())
}

//HTML

function html() {
    return src(['src/views/*.html', 'src/index.html'], { allowEmpty: true })
    // .pipe(changed('src/blocks/**/*.{htm,html}'))
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(minifyHTML())
    .pipe(rename({dirname: ''}))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

//Libraries CSS
function css() {
    return src([
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/flatpickr/dist/flatpickr.css',
        'node_modules/flatpickr/dist/themes/material_blue.css',
        'src/js/libs/select2/select2.css',
        'src/js/libs/select2-customSelectionAdapter-master/select2.customSelectionAdapter.css',
        
    ])
    //.pipe(eval(preprocessor)())
    .pipe(concat('libs.min.css'))
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
    .pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream())
}

// Scripts & JS Libraries
function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
        'node_modules/flatpickr/dist/flatpickr.js',
        'src/js/libs/select2/select2.js',
        'src/js/libs/select2-customSelectionAdapter-master/select2.customSelectionAdapter.js',
        
        'src/js/main.js'
    ])
    .pipe(concat('scripts.min.js'))
    .pipe(uglify()) // Minify JS (opt.)
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream())
}

//Images
function img() {
    return src(['src/img/**/*.*', 'src/img/*.*'])
    .pipe(dest('dist/img'))
}

// Watching
function startwatch() {
    watch('src/**/*.scss', parallel('styles'));
    watch(['src/**/*.js'], parallel('scripts'));
    watch(['src/img/*.*', 'src/img/**/*.*'], parallel('img'));
    watch(['src/components/**/*.html', 'src/views/*.html'], parallel('html'));
}

exports.browsersync = browsersync;
exports.assets      = series(styles, scripts);
exports.css         = css;
exports.img         = img;
exports.html        = html;
exports.styles      = styles;
exports.scripts     = scripts;
exports.default     = parallel(html, styles, scripts, img, css, browsersync, startwatch);
