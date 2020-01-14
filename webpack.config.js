const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //该插件将CSS提取到单独的文件中
const HtmlWebpackPlugin = require('html-webpack-plugin'); //自动引入打包生成得js
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //清除打包后的文件夹多余的文件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); //压缩单独的css文件
const PurifyCSSPlugin = require('purifycss-webpack'); //css优化去重复无效代码
const glob = require('glob'); //css优化
const webpack = require('webpack'); //设定环境变量的问题
const apiConfig = require('./config/api');
const VueLoaderPlugin = require('vue-loader/lib/plugin') //配置vue-loader
const config = {
    entry: path.resolve(__dirname, './src/index.js'), //打包的入口文件地址
    output: {
        path: path.resolve(__dirname, './dist'), //bundle 生成(emit)到哪里
        filename: 'bundle.js' //生成 bundle 的名称
    },
    devServer: {
        contentBase: path.join(__dirname, "./dist"), // 开服务器的根路径,和output同目录
        historyApiFallback: true, //这个配置属性是用来应对返回404页面时定向到特定页面用的，任意的 404 响应都可能需要被替代为 index.html
        // host: '0.0.0.0', //设置服务器的主机号，默认是localhost
        port: 7000, //输出端口号
        // inline: true, //实时刷新 package.json文件scripts dev中添加--inline后可以不需要添加
        hot: true, //热替换功能 即不刷新页面，只对于修改的部分进行调整。默认是不设置就是会刷新页面
        // compress: true, //这是一个布尔型的值，当它被设置为true的时候对所有的服务器资源采用gzip压缩
        // overlay: true, //用于在浏览器输出编译错误的，默认是关闭的，需要手动打开
        // stats: "errors-only", //这个配置属性用来控制编译的时候shell上的输出内容，因为我们并不需要所有的内容，而只是需要部分的如errors等
        open: true, // 自动打开浏览器
        // proxy: {
        //     "/api": {
        //         target: "http://localhost:3000",
        //         pathRewrite: { "^/api": "" }
        //     }
        // } //重定向是解决跨域的好办法，当后端的接口拥有独立的API，而前端想在同一个domain下访问接口的时候，可以通过设置proxy实现。
        //一个 “/api/users”地址的请求将被重定向到”http://10.10.10.10:3000/api/users“,如果不希望”api”在传递中被传递过去，可以使用rewrite的方式实现。
    },
    // 1、source-map：产生文件，产生行列
    // devtool: 'source-map',
    // 2、eval-source-map：不产生文件，产生行类
    //devtool: 'eval-source-map',
    // 3、cheap-source-map：产生文件，不产生列
    //devtool: 'cheap-module-source-map',
    // 4、cheap-module-eval-source-map：不产生文件，不产生列
    // devtool :'source-map', //更容易地追踪错误和警告,方便在浏览器看见编译之前的代码，而非编译之后的
    plugins: [ //plugins 插件用于执行范围包括，从打包优化和压缩，一直到重新定义环境中的变量
        new webpack.DefinePlugin({
            'SERVICE_URL': JSON.stringify('https://dev.example.com'),
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            },
            API_CONFIG: JSON.stringify(apiConfig)
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash:6].css' //生成css名字，6位数的hash数
        }),
        new CleanWebpackPlugin(),
        new OptimizeCssAssetsWebpackPlugin(),
        // 热加载
        new webpack.HotModuleReplacementPlugin(), //热替换，需要搭配devServer的hot:true热更新去使用
        // 处理报错信息
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            minify: {
                collapseWhitespace: true, //清除空格
                removeAttributeQuotes: true, //清除多余引号
                removeComments: true //删除注释

            },
            title: 'OutputManagement',
            template: path.resolve(__dirname, './src/index.html'), //要打包的html文件路径
            filename: 'index.html' //打包后输出的文件
        }),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, './src/*.html')),
        }),
        new VueLoaderPlugin() //引入vue-loader
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
                use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
                exclude: /node_modules/ //去除不必要的构建
            },
            {
                test: /\.less$/,
                use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
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
            },
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ],
                exclude: /node_modules/
            }
        ]
    }
}

module.exports = config;