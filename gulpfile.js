process.env.DISABLE_NOTIFIER = true;

var elixir = require('laravel-elixir'),
    path = require('path'),
    webpack = require('webpack');

require('laravel-elixir-livereload');
require('laravel-elixir-webpack-ex');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {

    /**
     * Sass
     **/
    mix.sass('app.scss');

    /**
     * Scripts webpack bundling and copying
     **/
    mix.webpack({
        vendor: 'vendor.ts',
        app: 'main.ts'
    }, {
        debug: true,
        devtool: 'source-map',
        resolve: {
            extensions: ['', '.ts', '.js']
        },
        module: {
            preLoaders: [
                {
                    test: /\.ts$/,
                    loader: 'tslint-loader',
                    exclude: /node_modules/
                }
            ],
            loaders: [
                {
                    test: /\.ts$/,
                    loader: 'awesome-typescript-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.html$/, loader: 'raw-loader'
                }
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({
                '__decorate': 'typescript-decorate',
                '__extends': 'typescript-extends',
                '__param': 'typescript-param',
                '__metadata': 'typescript-metadata'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                filename: 'vendor.js',
                minChunks: Infinity
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'app',
                filename: 'app.js',
                minChunks: 4,
                chunks: [
                    'app'
                ]
            }),
            /*new webpack.optimize.UglifyJsPlugin({
             compress: {
             warnings: false
             },
             minimize: true,
             mangle: false
             })*/
        ],
        tslint: {
            emitErrors: false,
            failOnHint: false,
            resourcePath: 'resources/assets/typescript'
        }
    }, 'public/js', 'resources/assets/typescript');

    mix.version([ 'js/app.js', 'js/vendor.js', 'css/app.css' ]);

    /**
     * LiveReload
     **/
    mix.livereload([
        'public/css/**/*',
        'public/fonts/**/*',
        'public/js/**/*'
    ]);
});