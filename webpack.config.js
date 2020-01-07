const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //该插件将CSS提取到单独的文件中

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[hash:6].css' //对应css名字，6位数的hash数
        }),
    ],
    module: {
        rules: [
            // style-loader 将 JS 字符串生成为 style 节点
            // css-loader 将 CSS 转化成 CommonJS 模块
            // sass-loader 将 Sass 编译成 CSS
            // less-loader 将 Less 编译成 CSS
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
                exclude: /node_modules/ //去除不必要的构建
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader','postcss-loader','sass-loader'],
                exclude: /node_modules/ //去除不必要的构建
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'postcss-loader','less-loader'],
                exclude: /node_modules/ //去除不必要的构建
            },
            {
                test: /\.(png|jpeg|jpg|gif|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 11024,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[hash:6].[ext]'
                            }
                        }
                    }
                }],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-transform-runtime'
                        ]
                    }
                },
                exclude: /node_modules/
            }
        ]
    }
}