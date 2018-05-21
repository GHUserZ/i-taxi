//cnpm insatll gulp gulp.spritesmith gulp-sass gulp-minify-css --save-dev
var gulp=require("gulp"),
    spritesmith=require('gulp.spritesmith'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-minify-css');
//合并雪碧图
gulp.task('sprites', function () {
    return gulp.src('img/smallIcon/*.png')//需要合并的图片地址
        .pipe(spritesmith({
            imgName: 'img/xhxt_sprite.png',//保存合并后图片的地址
            cssName: 'sass/common/icon.scss',//保存合并后对于css样式的地址
            padding:5,//合并时两个图片的间距
            algorithm: 'top-down',//注释1
            cssTemplate:function (data) {
                var arr=[];
                data.sprites.forEach(function (sprite) {
                    arr.push(" .u_icon_"+sprite.name+
                    "{" +
                    "background-image: url('"+sprite.escaped_image+"');"+
                    "background-position: "+sprite.px.offset_x+"  "+sprite.px.offset_y+";"+
                    "width:"+sprite.px.width+";"+
                    "height:"+sprite.px.height+";"+
                    "}\n");
                });
                return arr.join("");
               }
        }))
        .pipe(gulp.dest(''));
});
gulp.task("sass", function() {
    return gulp.src("sass/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(cssmin({compatibility: 'ie9',keepBreaks:true}))
        .pipe(gulp.dest("css"));
});
gulp.task('watch',function(){
    gulp.watch('sass/**/*.scss',['sass']);
    gulp.watch('img/smallIcon/*.png',['sprites'])
})
