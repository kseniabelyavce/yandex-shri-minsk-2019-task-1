'use strict';

const { src, dest, watch, parallel, lastRun } = require('gulp');

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');

// Minify HTML
function html() {
  return src('src/*.html')
    .pipe(
      htmlmin({
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeOptionalTags: true
      })
    )
    .pipe(dest('./'));
}

// Minify CSS
function css() {
  return src('./src/css/*.css')
    .pipe(
      postcss([
        autoprefixer([
          'ie >= 10',
          'ie_mob >= 10',
          'ff >= 30',
          'chrome >= 34',
          'safari >= 7',
          'opera >= 23',
          'ios >= 7',
          'android >= 4.4',
          'bb >= 10'
        ])
      ])
    )
    .pipe(cssnano())
    .pipe(concat('all.min.css'))
    .pipe(dest('./css'));
}

// Minify Images
function img() {
  return src('src/img/**/*', { since: lastRun(img) })
    .pipe(
      imagemin({
        progressive: true,
        interlaced: true
      })
    )
    .pipe(dest('./img'));
}

watch('src/*.html', html);
watch('src/css/**/*', css);
watch('src/img/**/*', img);

exports.default = parallel(img, css, html);
