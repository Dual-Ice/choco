const { src, dest, task, series, watch, parallel } = require("gulp");
const {SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS} = require('./gulp.config');
const env = process.env.NODE_ENV;
const gulpif = require('gulp-if');
const ghPages = require('gulp-gh-pages')

const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const sassGlob = require('gulp-sass-glob');
const px2rem = require('gulp-smile-px2rem');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');

const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');

const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cleanDist = require('gulp-clean');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;


sass.compiler = require('node-sass');


const removedFiles = [
  `${DIST_PATH}/*.js`,
  `${DIST_PATH}/*.css`,
  `${DIST_PATH}/*.html`
]

task('clean', () => {
  return src( removedFiles, { read: false })
    .pipe(cleanDist());
})

task('copy:html', () => {
  return src(`${SRC_PATH}/*.html`)
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
})

task('styles', function () {
  return src([...STYLE_LIBS, `${SRC_PATH}/scss/main.scss`])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat("main.min.scss"))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    // .pipe(px2rem())
    .pipe(gulpif(env === 'prod', autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    })))
    .pipe(gulpif(env === 'prod', gcmq()))
    .pipe(gulpif(env === 'prod', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

task('scripts', () => {
  return src([...JS_LIBS, `${SRC_PATH}/scripts/*.js`])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.js', {newLine: ';'}))
    .pipe(gulpif(env === 'prod', babel({
      presets: ['@babel/env']
    })))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

task('icons', () => {
  return src(`${SRC_PATH}/images/icons/*.svg`)
    .pipe(svgo({
      plugins: [
        {
          removeAttrs: {
            attrs: '(fill|stroke|style|width|height|data.*)'
          }
        }
      ]
    }))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest(`${DIST_PATH}/images/icons`));
});

task('server', () => {
  browserSync.init({
     server: {
         baseDir: `./${DIST_PATH}`
     },
     open: false
 });
});

task('pages', () => {
  return src("./dist/**/*")
    .pipe(ghPages())
})

task('watch', () => {
  watch(`./${SRC_PATH}/scss/**/*.scss`, series('styles'));
  watch(`./${SRC_PATH}/*.html`, series('copy:html'));
  watch(`./${SRC_PATH}/scripts/*.js`, series('scripts'));
// watch(`./${SRC_PATH}/images/icons/*.svg`, series('icons'));
});

task('default', 
  series('clean', 
    parallel('copy:html', 'styles', 'scripts'),
    parallel('watch', 'server')
  )
);

task('build',
  series(
    'clean',
    parallel('copy:html', 'styles', 'scripts')
  )
);

