'use strict';

var gulp = require('gulp')
var gulpsync = require('gulp-sync')(gulp);
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

var stylus = require('gulp-stylus')
var rupture = require('rupture')

var postcss = require('gulp-postcss')
var cssMqpacker = require('css-mqpacker')
var autoprefixer = require('autoprefixer')
var clipPathPolyfill = require('postcss-clip-path-polyfill')
var assets  = require('postcss-assets');
var cssvariables = require('postcss-css-variables');

// image
var imagemin = require('gulp-imagemin')
var pngquant = require('imagemin-pngquant');
var jpegtran = require('imagemin-jpegtran');
var gifsicle = require('imagemin-gifsicle');
var mozjpeg = require('imagemin-mozjpeg');
var svgstore = require('gulp-svgstore')
var svgmin = require('gulp-svgmin')


var webpack = require('webpack-stream')


function onError(err) {
  console.log(err);
  this.emit('end');
}

const path = {
    public: { 
        js: 'public/js/',
        css: 'public/css/',
        html: 'public/',
        img: 'public/img/',
        fonts: 'public/fonts/',
        svg: 'public/svg/'
        
        //js: 'insales-public/media/',
        //css: 'insales-public/media/',
        //html: 'insales-public/',
        //img: 'insales-public/media/',
        //fonts: 'insales-public/media/',
        //svg: 'insales-public/media/'
    },
    src: { 
        js: 'src/js/',
        html: 'src/',
        styl: 'src/styl/',
        img: 'src/img/',
        fonts: 'src/fonts/',
        svg: 'src/svg/'
    },
    watch: { 
        js: 'src/**/*.js',
        html: ['src/*.*', 'src/include/*.*', 'src/pages/*.*'],
        styl: 'src/styl/**/*.styl',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/*.*',
        svg: 'src/svg/*.svg'
    },
    clean: './public',
    root: 'public'
};

gulp.task('connect', function () {
   gulp.watch( path.watch.html, ['html'] )
   gulp.watch( path.watch.styl, ['styl'])
   gulp.watch( path.watch.js, ['js'] )
   gulp.watch( path.watch.img, ['img'] ),
   gulp.watch( path.watch.svg, ['svg'] )
   gulp.watch( path.watch.fonts, ['fonts'] )
   browserSync.init({
      server: {
            baseDir: path.root
        },
      port: 3000,
      open: true,
      notify: false
   });
});

gulp.task('default', gulpsync.sync(['html', 'img', 'svg', 'fonts', 'styl', 'js',  'connect']))

let posthtml = require('gulp-posthtml')
const plugins = [ 
            require('posthtml-include')({ root: `${path.src.html}` }),
            require('posthtml-each')() 
            ]
const options = {}
gulp.task('html', function () {
    gulp.src([path.src.html+'*.*', path.src.html+'include/*.*', path.src.html+'pages/*.*'])
    .pipe(posthtml(plugins, options))
    .pipe(gulp.dest(path.public.html))
    .pipe(reload({stream:true}));
});

gulp.task('styl', function () {
  gulp.src(path.src.styl+'*.styl')
  .pipe(stylus({
     'include css': true,
     use: [rupture()],
  }))
  .on('error', onError)
  .pipe(postcss([
    autoprefixer(),
    clipPathPolyfill(),
    // require('postcss-focus-hover')(),
    // cssvariables({
    //   preserve: true,
    // }),
    cssMqpacker({sort: true}),
    assets({
      loadPaths: ['src/img/'],
      relative: 'src/stylus'
    }),
    // require('postcss-cssnext')(),
    require('cssnano')(),
  ]))
  .on('error', onError)
  .pipe(gulp.dest(path.public.css))
  .pipe(reload({stream:true}));
})

gulp.task('js', function() {
    return gulp.src(path.src.js+'main.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(path.public.js))
    .pipe(reload({stream:true}));
});

gulp.task('img', () => {
    return gulp.src(path.src.img+'**/*.*')
        // .pipe(imagemin([jpegtran({progressive: true}), mozjpeg({progressive: true}), gifsicle()]
        // ))
        .pipe(gulp.dest(path.public.img));
});

gulp.task('svg', function () {
    return gulp
        .src(path.src.svg+'**/*.svg')
        .pipe(svgmin(function (file) {
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: 'icon-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest(path.public.svg));
});


gulp.task('fonts', function() {
    return gulp.src(path.src.fonts+'**/*.*')
    .pipe(gulp.dest(path.public.fonts))
    .pipe(reload({stream:true}));
});