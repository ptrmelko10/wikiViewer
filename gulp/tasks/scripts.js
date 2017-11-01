// Include Gulp
var gulp = require('gulp');

// JS Plugins
var webpack = require('webpack');

gulp.task('scripts', function(callback) {
  webpack(require('../../webpack.config.js'), function(err, stats) {
    if(err) {
      console.log(err.toString());
    }

    console.log(stats.toString());
    callback(); //lets gulp know webpack has completed.
  });
});
