
const { src, dest, watch, series  } = require('gulp');
const uglifycss = require('gulp-uglifycss');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const log = require("fancy-log");
const browserSync = require('browser-sync').create();

// BrowserSync (callback)
function startbrowsersync(done){
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        port: 3000
    });
    done();
}
// BrowserSync Reload (callback)
function browserSyncReload() {
    browserSync.reload;
}

function build_css() {
    return src('src/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({browsers: ['cover 99.5%'],cascade: false}))
    .pipe(uglifycss({"uglyComments": true}))
    .pipe(rename('style.css'))
    .pipe(dest('dist/'))
    .pipe(browserSync.stream());
}

function build_html() {
    return src('src/*.html')
    .pipe(dest('dist/'))
    .pipe(browserSync.stream());
}

function serve() {

    watch('src/*.scss', { events: 'change' }, function(done) {
        build_css();
        browserSyncReload();
        done();
    });

    watch('src/*.html', { events: 'change' }, function(done) {
        build_html();
        browserSyncReload();
        done();
    });

}

exports.default = series(startbrowsersync, serve);

