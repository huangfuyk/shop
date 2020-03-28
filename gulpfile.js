const gulp = require("gulp");
const cssmin = require("gulp-cssmin");
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const htmlmin = require("gulp-htmlmin");

const clean = require("gulp-clean");
const webserver = require("gulp-webserver");

const sass = require("gulp-sass-china");
// static的批量转存
function copyFileFn(){
    return gulp.src("./src/static/**/*")
            .pipe(gulp.dest("./dist/static"))
}
exports.copyFile = copyFileFn;

// 处理css的指令：压缩，添加兼容前缀
function cssFn(){
    return gulp.src("./src/css/**/*")
            .pipe(autoprefixer("last 2 version","safari 5","ie 8","ie 9","opera 12.1","ios 6","android 4"))
            .pipe(cssmin())
            .pipe(gulp.dest("./dist/css"))
}
exports.css = cssFn;

// sass文件的处理
function sassFn(){
    return gulp.src("./src/sass/**/*")
            .pipe(sass())
            // .pipe(autoprefixer("last 2 version","safari 5","ie 8","ie 9","opera 12.1","ios 6","android 4"))
            // .pipe(cssmin())
            .pipe(gulp.dest("./dist/css"))
}
exports.sass = sassFn;


// 处理js的指令：ES6编译ES5，压缩
function jsFn(){
    return gulp.src("./src/js/**/*")
        .pipe(babel({
            presets:["@babel/env"]
        }))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js"))
}
exports.js = jsFn;

// 处理html的指令：压缩
function htmlFn(){
    return gulp.src("./src/pages/**/*")
        .pipe(htmlmin({
            removeEmptyAttributes:true,
            collapseWhitespace:true
        }))
        .pipe(gulp.dest("./dist/pages"))
}
exports.html = htmlFn;


// 删除文件：慎用！
// 定义功能：
// function cleanFn(){
//     return gulp.src('./dist')
//         .pipe(clean())
// }
// 暴露指令
// exports.clean = cleanFn;

function indexFn(){
    return gulp.src("./src/index.html")
            .pipe(gulp.dest("./dist/"))
}
exports.index = indexFn;

// 定义服务器功能
function serverFn(){
    return gulp.src("./dist")
        .pipe(webserver({
            host:"localhost",
            port:"8888",
            livereload:true,
            open:"./index.html",
            proxies:[{
                // source属性用来表示，代理之后的地址
                // 在前端的ajax内，直接请求：http://localhost:3000/abc
                source:"/abc",
                // target属性用来标志要代理的跨域地址
                target:"https://wanandroid.com/wxarticle/chapters/json"
            }]
        }))
}
// 暴露指令
exports.server = serverFn;

// 暴露批量执行指令后，单独的还需要暴露么？
// 按需使用，万一将来只需要使用其中一个呢

exports.htmlJsCssStatic = gulp.parallel(htmlFn,jsFn,cssFn,copyFileFn,indexFn);


// 还没实现自动化构建项目
// 手动执行，编译和转存
// 手动打开

// 自动，只需要考虑代码，不需要随时考虑环境

// 监听所有文件，只要有文件发生改变了，执行对应功能

function watchAllFn(qwe){
    gulp.watch("./src/index.html",indexFn);
    gulp.watch("./src/css/**/*",cssFn);
    gulp.watch("./src/es6/**/*",jsFn);
    gulp.watch("./src/pages/**/*",htmlFn);
    gulp.watch("./src/static/**/*",copyFileFn);
    gulp.watch("./src/sass/**/*",sassFn);

    // qwe();
}

exports.watchAll = watchAllFn;

// 思考：
    // 开了watch没法开server
    // 开了server没法开watch
    // 怎么办？

    // 批量执行！
    
// exports.qwe = gulp.parallel(watchAllFn,serverFn);

exports.all = gulp.series(
    
    gulp.parallel(htmlFn,jsFn,cssFn,copyFileFn,indexFn,sassFn)
    
    ,

    gulp.parallel(watchAllFn,serverFn)

    );


// gulp中如果需要执行多个指令功能，需要给每个指令功能释放结束信号，如何释放？
    // 1.return 流 对象
    // 2.功能函数身上默认接收一个参数，这个参数是一个函数，执行这个函数，释放结束信号

// gulp官方文档中建议，最好释放结束信号


// sass文件的处理
// function sassFn(){
//     return gulp.src("./ganjinmai/sass/**/*")
//             .pipe(sass())
//             .pipe(gulp.dest("./server/css"))
// }
// exports.sass = sassFn;

// function watchSassFn(){
//     return gulp.watch("./ganjinmai/sass/**/*",sassFn);
// }
// exports.watchSass = watchSassFn;


