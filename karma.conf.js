module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        coverageReporter: {
            dir: 'tmp/coverage/',
            reporters: [
                {type: 'html'}
            ]
        },
        files: [
            './src/**/*.spec.js'
        ],
        preprocessors: {
            './src/**/*.spec.js': ['webpack']
        },
        frameworks: ['mocha', 'sinon-chai'],
        reporters: ['progress', 'coverage'],
        webpack: {
            mode: 'development',
            module: {
                rules: [
                    {
                        test: /\.js$/i,
                        exclude: /(node_modules)/,
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            }
        },
        webpackMiddleware: {
            noInfo: true
        }
    });
};