// ## Globals
var argv = require('minimist')(process.argv.slice(2));
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var lazypipe = require('lazypipe');
var merge = require('merge-stream');
var cssNano = require('gulp-cssnano');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var manifest = require('./src/manifest.json');
var hash = require('gulp-hash');
var del = require('del');

// asset manifest is a json object containing paths to dependencies
var path = manifest.paths;

// `project` - paths to first-party assets.
// - `project.js` - Array of first-party JS assets.
// - `project.css` - Array of first-party CSS assets.
var project = {
  "fonts": ["src/fonts/**/*"],
  "images": ["src/images/**/*"],
  "js": [],
  "css": [],
  "globs": []
};

// build dependencies and globs
for (var fileName in manifest.dependencies) {
  if (fileName.indexOf('.js') > -1) {
    project["js"] = project["js"].concat(manifest.dependencies[fileName]["files"]);
  }
  if (fileName.indexOf('.css') > -1) {
    project["css"] = project["css"].concat(manifest.dependencies[fileName]["files"]);
  }
  var fileNameArray = fileName.split(".");
  project.globs.push(
    {
      "type": fileNameArray[fileNameArray.length - 1],
      "name": fileName,
      "globs": manifest.dependencies[fileName]["vendor"].concat(manifest.dependencies[fileName]["files"])
    }
  );
}


// CLI options
var enabled = {
  // Enable static asset revisioning when `--production`
  rev: false,
  // Disable source maps when `--production`
  maps: false,
  // Fail styles task on error when `--production`
  failStyleTask: true,
  // Fail due to JSHint warnings only when `--production`
  failJSHint: true,
  // Strip debug statments from javascript when `--production`
  stripJSDebug: false,
  // hash static?
  hashStatic: true
};

// Path to the compiled assets manifest in the dist directory
var revManifest = path.dist + 'assets.json';

// ## Reusable Pipelines
// See https://github.com/OverZealous/lazypipe

// ### CSS processing pipeline
// Example
// ```
// gulp.src(cssFiles)
//   .pipe(cssTasks('main.css')
//   .pipe(gulp.dest(path.dist + 'styles'))
// ```
var cssTasks = function (filename) {
  del(["static/css/**/*"]);
  return lazypipe()
    .pipe(function () {
      return gulpif(!enabled.failStyleTask, plumber());
    })
    .pipe(function () {
      return gulpif('*.scss', sass({
        outputStyle: 'nested', // libsass doesn't support expanded yet
        precision: 10,
        includePaths: ['.'],
        errLogToConsole: !enabled.failStyleTask
      }));
    })
    .pipe(concat, filename)
    .pipe(autoprefixer, {
      browsers: [
        'last 2 versions',
        'last 2 Safari versions',
        'android 4',
        'opera 12'
      ]
    })
    .pipe(function () {
      return gulpif(argv.production, cssNano({
        safe: true
      }));
    })
    .pipe(function () {
      return gulpif(enabled.hashStatic, hash())
    })();
};

// ### JS processing pipeline
// Example
// ```
// gulp.src(jsFiles)
//   .pipe(jsTasks('main.js')
//   .pipe(gulp.dest(path.dist + 'scripts'))
// ```
var jsTasks = function (filename) {
  del(["static/js/**/*"]);
  return lazypipe()
    .pipe(concat, filename)
    .pipe(function () {
      return gulpif(argv.production, uglify({compress: {'drop_debugger': true}}));
    })
    .pipe(function () {
      return gulpif(enabled.hashStatic, hash())
    })();
};

// ### Write to rev manifest
// If there are any revved files then write them to the rev manifest.
// See https://github.com/sindresorhus/gulp-rev
var writeToManifest = function (directory) {
  return lazypipe()
    .pipe(gulp.dest, path.dist + directory)
    .pipe(browserSync.stream, {match: '**/*.{js,css}'})();
};

// ## Gulp tasks
// Run `gulp -T` for a task summary

// ### Styles
// `gulp styles` - Compiles, combines, and optimizes project CSS.
// By default this task will only log a warning if a precompiler error is
// raised. If the `--production` flag is set: this task will fail outright.
gulp.task('styles', function () {
  var merged = merge();
  for (var i in project["globs"]) {
    var dep = project["globs"][i];
    if (dep["type"] == 'css') {
      var cssTasksInstance = cssTasks(dep.name);
      if (!enabled.failStyleTask) {
        cssTasksInstance.on('error', function (err) {
          console.error(err.message);
          this.emit('end');
        });
      }
      merged.add(gulp.src(dep.globs, {base: 'scss'})
        .pipe(cssTasksInstance));
    }
  }
  return merged
    .pipe(writeToManifest('css'))
    .pipe(hash.manifest("css.json"))
    .pipe(gulp.dest("data/manifests"));
});

// ### Scripts
// `gulp scripts` - Runs JSHint then compiles, combines, and optimizes project JS.
gulp.task('scripts', function () {
  var merged = merge();
  for (var i in project["globs"]) {
    var dep = project["globs"][i];
    if (dep["type"] == 'js') {
      merged.add(
        gulp.src(dep.globs, {base: 'js'})
          .pipe(jsTasks(dep.name))
      );
    }
  }
  return merged
    .pipe(writeToManifest('js'))
    .pipe(hash.manifest("js.json"))
    .pipe(gulp.dest("data/manifests"));
});

// ### JSHint
// `gulp jshint` - Lints configuration JSON and project JS.
gulp.task('jshint', function () {
  return gulp.src([
    'gulpfile.js'
  ].concat(project.js))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(gulpif(enabled.failJSHint, jshint.reporter('fail')));
});


// IMAGES
gulp.task("images", function () {
  del(["static/images/**/*"]);
  gulp.src("src/images/**/*")
    .pipe(gulpif(enabled.hashStatic, hash()))
    .pipe(gulp.dest("static/images"))
    .pipe(hash.manifest("images.json"))
    .pipe(gulp.dest("data/manifests"))
});


// ### Clean
// `gulp clean` - Deletes the build folder entirely.
gulp.task('clean', require('del').bind(null, [path.dist]));

// ### Watch
// `gulp watch` - Use BrowserSync to proxy your dev server and synchronize code
// changes across devices. Specify the hostname of your dev server at
// `manifest.config.devUrl`. When a modification is made to an asset, run the
// build step for that asset and inject the changes into the page.
// See: http://www.browsersync.io
gulp.task('watch', function () {
  // browserSync.init({
  //   files: ['{lib,templates}/**/*.php', '*.php'],
  //   proxy: config.devUrl,
  //   snippetOptions: {
  //     whitelist: ['/wp-admin/admin-ajax.php'],
  //     blacklist: ['/wp-admin/**']
  //   }
  // });
  gulp.watch([path.source + 'scss/**/*'], ['styles']);
  gulp.watch([path.source + 'js/**/*'], ['scripts']);
  gulp.watch([path.source + 'images/**/*'], ['images']);
});

// ### Build
// `gulp build` - Run all the build tasks but don't clean up beforehand.
// Generally you should be running `gulp` instead of `gulp build`.
gulp.task('build', function (callback) {
  runSequence(
    'styles',
    'scripts',
    'images',
    callback);
});

// ### Gulp
// `gulp` - Run a complete build. To compile for production run `gulp --production`.
gulp.task('default', function () {
  gulp.start('build');
});
