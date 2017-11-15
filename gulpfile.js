'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var pkg = require("./package.json");
var browserSync = require('browser-sync').create();
var png = require('imagemin-pngquant');
var extReplace = require('gulp-ext-replace');
var iconfontCss = require('gulp-iconfont-css-and-template');
var iconfont = require('gulp-iconfont');
var cache = require('gulp-cache');
var path = require('path');
var fs = require('fs')
var handlebars = require('handlebars');
var handhtml = require('gulp-handlebars-html')(handlebars);
// var mockServer  = require('gulp-mock-server');
var svgSymbols = require('gulp-svg-symbols');

var yeoman = {
    app: "app",
    dist: "dist",
    sass: 'sass'
};

// svgmin
gulp.task('svgmin', function() {
    gulp.src('svg/**/*.svg')
        .pipe(cache(
            $.svgmin({
                plugins: [{
                    cleanupIDs: {
                        prefix: '',
                        minify: true
                    },
                    js2svg: {
                        pretty: true
                    }
                }]
            })
        ))
        .pipe(gulp.dest('sss'));
});

// iconfont
gulp.task('iconfont', function() {
    gulp.src(['svg/**/*.svg'])
        .pipe(iconfontCss({
            glyphs: null,
            fontName: 'blfont',
            cssClass: 'iconfont',
            cssTargetPath: './icons.css'
        }))
        .pipe(iconfont({
            fontName: 'blfont',
            formats: ['ttf']
        }))
        .pipe(gulp.dest('sass/tobe/fonts2'));
});


// 监测文件改动并自动刷新
gulp.task('server', ['compass'], function() {
    browserSync.init({
        server: {
            baseDir: ['.tmp', yeoman.app, 'lib']
        },
        port: 8000
    });
});

gulp.task('watch', function() {
    gulp.watch(yeoman.sass + "/**/*.scss", ['compass']);
    gulp.watch(yeoman.app + "/**/*", ['hbs','filehtml','samplehtml']);
    //gulp.watch(yeoman.app + '/components/**/*', ['hbs']);
	//gulp.watch(yeoman.app + "/**/*", []);
    //gulp.watch(yeoman.app + '/components/**/*', ['filehtml']);
	//gulp.watch(yeoman.app + "/**/*", []);
    //gulp.watch(yeoman.app + '/components/**/*', ['samplehtml']);
    gulp.watch([yeoman.app + '/js/**/*.js', yeoman.app + '/css/**/*']).on('change', browserSync.reload);
});


// 编译sass
gulp.task('compass', function() {
    return gulp.src([yeoman.sass + "/**/*.scss", "!sass/tobe/**/_*.scss", "!sass/compents/css/*.scss", "!sass/old/**/*.scss"])
        .pipe($.plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe($.compass({
            css: yeoman.app + '/css',
            sass: yeoman.sass,
            image: yeoman.sass,
            style: 'compressed'
        }))
        .pipe($.autoprefixer({
            browsers: ['> 5%', 'Last 4 versions', 'Firefox >= 20', 'iOS 7', 'Android >= 4.0'],
            cascade: true
        }))
        .pipe(gulp.dest(yeoman.app + '/css'))
        .pipe(browserSync.reload({ stream: true }))

});

// 编写组件编译sass
gulp.task('doc-sass', function() {
    return gulp.src([yeoman.sass + "/cs-components.scss"])
        .pipe($.plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe($.compass({
            css: "app/compents/css",
            sass: "sass",
            image: yeoman.sass,
            comments: false,
            sourcemap: true
        }))
        .pipe(gulp.dest(yeoman.app + "/compents/css"))
});

// 生产
gulp.task('compass-pro', function() {
    return gulp.src(yeoman.sass + "/**/*.scss")
        .pipe($.plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe($.compass({
            css: yeoman.dist + '/css',
            sass: yeoman.sass,
            image: yeoman.sass,
            style: 'compressed',
            comments: false,
            sourcemap: false,
            environment: 'production'
        }))
        .pipe($.plumber.stop())
        .pipe($.autoprefixer({
            browsers: ['> 5%', 'Last 4 versions', 'Firefox >= 20', 'iOS 7', 'Android >= 4.0'],
            remove: true
        }))
        .pipe(gulp.dest(yeoman.dist + '/css'));
});
// image压缩
gulp.task('images', function() {
    gulp.src([yeoman.app + '/css/i/**/*'])
        .pipe(cache(
            $.imagemin({
                optimizationLevel: 4, //类型：Number  默认：3  取值范围：0-7（优化等级）
                progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
                interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
                multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
                use: [png()]
            })
        ))
        .pipe(gulp.dest(yeoman.dist + '/css/i'));
});
gulp.task('images-min', function() {
    gulp.src([yeoman.app + '/images/**/*'])
        .pipe(cache(
            $.imagemin({
                optimizationLevel: 4, //类型：Number  默认：3  取值范围：0-7（优化等级）
                progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
                interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
                multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
                use: [png()]
            })
        ))
        .pipe(gulp.dest(yeoman.dist + '/images'));
});

gulp.task('js', function() {
    gulp.src([yeoman.app + '/js/**/*.js'])
        .pipe(gulp.dest(yeoman.dist + '/js'))
});

// html
gulp.task('html', function() {
    gulp.src([yeoman.app + '/*.html', yeoman.app + '/chenp/*.html', '!./' + yeoman.app + '/widget/**/*.html'])
        .pipe($.fileInclude({
            prefix: '@@',
            basepath: 'app/',
            context: {
                rightWordBool: false,
                requirejs: "js/config"
            }
        }))
        .pipe(gulp.dest(yeoman.dist))
});

// svg symbols
gulp.task('sprites', ['svgmin'], function() {
    return gulp.src('blsvgmin/*.svg')
        .pipe(svgSymbols({
            fontSize: 16
        }))
        .pipe(gulp.dest('assets'));
});

// gulp-file-include
gulp.task('widget', function() {
    gulp.src([yeoman.app + '/*.html', yeoman.app + '/chenp/*.html', '!./' + yeoman.app + '/widget/**/*.html', yeoman.app + '/assembly/file/*.html', yeoman.app + '/assembly/sample/*.html'])
        .pipe($.fileInclude({
            prefix: '@@',
            basepath: 'app/',
            context: {
                rightWordBool: false,
                requirejs: "js/config"
            }
        }))
        .pipe(gulp.dest('.tmp'))
});

//测试handerbars模板 by whc 20170427
//-----demo registerHelper-s所有的registerHelper放在这里
handlebars.registerHelper('addKey', function(index) {
    return index + 1;
});
//-----------
gulp.task('hbs', function() {
    return gulp.src([yeoman.app + '/*.html'])
        .pipe($.plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe($.data(function(file) {
            var fileName = path.basename(file.path, '.html');
            try {
                var filejson = fs.readFileSync(yeoman.app + '/json/' + fileName + '.json');
            } catch(e) {
                throw 'not find '+yeoman.app + '/json/' + fileName + '.json';
            }
                
            

            //   return Object.assign(JSON.parse(fs.readFileSync(yeoman.app+'/' + fileName + '.json')),{　　　　　　
            //     gl: JSON.parse(fs.readFileSync(yeoman.app+'/components'+ '/global.json'))              
            // })
            //console.log(filejson);
            return Object.assign(JSON.parse(fs.readFileSync(yeoman.app + '/json/' + fileName + '.json')))
        }))
        .pipe(handhtml($.data, {
            allowedExtensions: ['hbs'],
            //指定包含模板路径
            partialsDirectory: [yeoman.app + '/components']
        }))
        .pipe($.plumber.stop())
        .pipe(gulp.dest('.tmp'))
        .pipe(browserSync.stream());
});

// filehtml
gulp.task('filehtml', function() {
    gulp.src([yeoman.app + '/assembly/file/*.html'])
        .pipe($.plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe($.data(function(file) {
            var fileName = path.basename(file.path, '.html');
            try {
                var filejson = fs.readFileSync(yeoman.app + '/json/assembly/file/' + fileName + '.json');
            } catch(e) {
                throw 'not find '+yeoman.app + '/json/assembly/file/' + fileName + '.json';
            }
                
            

            //   return Object.assign(JSON.parse(fs.readFileSync(yeoman.app+'/' + fileName + '.json')),{　　　　　　
            //     gl: JSON.parse(fs.readFileSync(yeoman.app+'/components'+ '/global.json'))              
            // })
            //console.log(filejson);
            return Object.assign(JSON.parse(fs.readFileSync(yeoman.app + '/json/assembly/file/' + fileName + '.json')))
        }))
        .pipe(handhtml($.data, {
            allowedExtensions: ['filehtml'],
            //指定包含模板路径
            partialsDirectory: [yeoman.app + '/components']
        }))
        .pipe($.plumber.stop())
        .pipe(gulp.dest('.tmp/assembly/file'))
        .pipe(browserSync.stream());
});

// samplehtml
gulp.task('samplehtml', function() {
    gulp.src([yeoman.app + '/assembly/sample/*.html'])
        .pipe($.plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe($.data(function(file) {
            var fileName = path.basename(file.path, '.html');
            try {
                var filejson = fs.readFileSync(yeoman.app + '/json/assembly/sample/' + fileName + '.json');
            } catch(e) {
                throw 'not find '+yeoman.app + '/json/assembly/sample/' + fileName + '.json';
            }
            //   return Object.assign(JSON.parse(fs.readFileSync(yeoman.app+'/' + fileName + '.json')),{　　　　　　
            //     gl: JSON.parse(fs.readFileSync(yeoman.app+'/components'+ '/global.json'))              
            // })
            //console.log(filejson);
            return Object.assign(JSON.parse(fs.readFileSync(yeoman.app + '/json/assembly/sample/' + fileName + '.json')))
        }))
        .pipe(handhtml($.data, {
            allowedExtensions: ['samplehtml'],
            //指定包含模板路径
            partialsDirectory: [yeoman.app + '/components']
        }))
        .pipe($.plumber.stop())
        .pipe(gulp.dest('.tmp/assembly/sample'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['compass', 'watch', 'server', 'hbs', 'filehtml', 'samplehtml']);
gulp.task('build', ['compass-pro', 'images', 'js', 'images-min', 'hbs', 'filehtml', 'samplehtml']);
