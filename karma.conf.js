module.exports = function (config) {
    config.set({
        browsers: ['Chrome'],
        files: [
            './src/**/*.spec.js'
        ],
        preprocessors: {
            './src/**/*.spec.js': ['webpack']
        },
        frameworks: ['mocha', 'sinon-chai'],
        reporters: ['mocha'],
        webpack: {
            mode: 'development',
            module: {
                rules: [
                    {
                        test: /\.(js)$/,
                        exclude: /(node_modules)/,
                        loader: 'babel-loader'
                    }
                ]
            }
        },
        webpackMiddleware: {
            noInfo: true
        }
    });
};