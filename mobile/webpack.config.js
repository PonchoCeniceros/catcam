const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
const copyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.index.js'
    },
    plugins: [
        new htmlPlugin({template: './src/index.html'}),
        new copyPlugin({
            patterns: [
              { from: 'src/models/*.onnx', to: '[name][ext]' },
              { from: 'node_modules/onnxruntime-web/dist/*.wasm', to: '[name][ext]' },
            ],
        }),
    ],
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: {loader: 'babel-loader'},
            exclude: /node_modules/
        },{
            test: /\.css$/,
            use: [
              'style-loader',
              { loader: 'css-loader', options: { importLoaders: 1 } },
              'postcss-loader',
            ],
        }]
    },
    mode: 'production'
}

