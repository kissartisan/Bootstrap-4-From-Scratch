const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

var bootstrapPath = 'node_modules/bootstrap/scss/bootstrap.scss';
var bootstrapDest = 'src/scss/*.scss';

// Compile SASS and inject it in the browser
gulp.task('sass', function() {
    return gulp.src([bootstrapPath, bootstrapDest])
               .pipe(sass())
               .pipe(gulp.dest('src/css'))
               .pipe(browserSync.stream());
});

// Compile JS and move it in the SRC folder
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
                     'node_modules/jquery/dist/jquery.min.js',
                     'node_modules/popper.js/dist/umd/popper.min.js'])
                .pipe(gulp.dest('src/js'))
                .pipe(browserSync.stream());
});

// Wach and serve SASS
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./src"
    });

    gulp.watch([bootstrapPath, bootstrapDest], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});


// Move fonts folder to src/fonts
gulp.task('fonts', function() {
    return gulp.src('node_modules/font-awesome/fonts/*')
               .pipe(gulp.dest('src/fonts'));
});


// Move CSS folder to src/css
gulp.task('fa', function() {
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
               .pipe(gulp.dest('src/css'));
});

gulp.task('default', ['js', 'serve', 'fa', 'fonts']);



