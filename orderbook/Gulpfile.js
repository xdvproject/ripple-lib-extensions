var gulp = require('gulp');
var webpack = require('webpack-stream');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var pkg = require('./package.json');
var name = 'ripple-orderbook-' + pkg.version;

gulp.task('build', function() {
  return gulp.src('./dist/npm/index.js')
  .pipe(webpack({
    output: {
      library: 'rippleOrderbook',
      filename: name + '.js'
    },
    module: {
      loaders: [{
        test: /\.json/,
        loader: 'json-loader'
      }]
    }
  }))
  .pipe(gulp.dest('./dist/web/'));
});

gulp.task('build-min', ['build'], function() {
  return gulp.src('./dist/web/' + name + '.js')
  .pipe(uglify())
  .pipe(rename(name + '.min.js'))
  .pipe(gulp.dest('./dist/web/'));
});


gulp.task('default', ['build-min']);
