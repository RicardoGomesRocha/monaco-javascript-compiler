const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './index.ts',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.ttf$/,
                use: ['file-loader']
            },
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },

        ]
    },
    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['.tsx', '.ts', '.js', '.json']
    },
    plugins: [
        new MonacoWebpackPlugin({
            languages: ['typescript', 'javascript', 'css']
        }),
        new CopyPlugin({
            patterns: [{
                from: "package.json",
                to: ""
            }],
        })
    ],
    watch: true
};