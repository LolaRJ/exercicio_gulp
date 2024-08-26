const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

// Função para comprimir imagens
function comprimeImagens() {
    return gulp.src('./source/images/*', { encoding: false }) // Dica do aluno para compressao de imagens
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
}

// Função para comprimir arquivos JavaScript
function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/scripts'));
}

// Função para compilar SASS
function compilaSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError)) // Adiciona captura de erro
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}

// Exporta as tarefas individualmente
exports.comprimeImagens = comprimeImagens;
exports.comprimeJavaScript = comprimeJavaScript;
exports.compilaSass = compilaSass;

// Exporta a tarefa padrão
exports.default = function() {
    gulp.watch('./source/images/*', { ignoreInitial: false }, gulp.series(comprimeImagens));
    gulp.watch('./source/scripts/*.js', { ignoreInitial: false }, gulp.series(comprimeJavaScript));
    gulp.watch('./source/styles/*.scss', { ignoreInitial: false }, gulp.series(compilaSass));
};