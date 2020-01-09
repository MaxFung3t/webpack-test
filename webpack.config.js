const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //该插件将CSS提取到单独的文件中
const HtmlWebpackPlugin = require('html-webpack-plugin'); //自动引入打包生成得js
const { CleanWebpackPlugin } = require("clean-webpack-plugin");  //清除打包后的文件夹多余的文件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); //压缩单独的css文件
const PurifyCSSPlugin = require('purifycss-webpack'); //css优化去重复无效代码
const glob = require('glob'); //css优化

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/index.js'), //打包的入口文件地址
    output: {
        path: path.resolve(__dirname, './dist'), //bundle 生成(emit)到哪里
        filename: 'bundle.js' //生成 bundle 的名称
    },
    plugins: [ //plugins 插件用于执行范围包括，从打包优化和压缩，一直到重新定义环境中的变量
        new MiniCssExtractPlugin({
            filename: '[name].[hash:6].css' //生成css名字，6位数的hash数
        }),
        new CleanWebpackPlugin(),
        new OptimizeCssAssetsWebpackPlugin(),
        new HtmlWebpackPlugin({
            minify: {
                collapseWhitespace: true, //清除空格
                removeAttributeQuotes: true, //清除多余引号
                removeComments: true //删除注释

            },
            title: 'OutputManagement',
            template: path.resolve(__dirname, './src/index.html'), //要打包的html文件路径
            filename: 'index.html' //要打包的文件夹名字
        }),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, './src/*.html')),
        })
    ],
    module: {
        rules: [
            // loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）
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
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
                exclude: /node_modules/ //去除不必要的构建
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
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
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
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