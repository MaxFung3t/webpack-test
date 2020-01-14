# webpack-test
webpack搭建vue开发环境

*   `npm i`安装依赖
    
*   `npm run dll`构建出不需打包的vendor包
    
*   `npm run build`构建打包
    

entry 入口文件

output 出口文件名及路径

webpack-dev-server可以开启本地服务器，或者设置proxy代理

source-map 可以生成.map文件，方便调试

mode取值development或者production，production模式下js会自动压缩

loader与plugin

*   html-webpack-plugin 可以将打包后的资源自动引入到html中
    
*   style-loader css-loader可以支持css模块
    
*   sass-loader node-sass 可以支持sass
    
*   less-loader 可以支持less
    
*   postcss-loader autoprefixer 可以支持自动加css前缀
    
*   mini-css-extract-plugin 或者 extract-text-webpack-plugin可以支持css从js中抽离
    
*   optimize-css-assets-webpack-plugin 可以压缩css
    
*   purify-css purifycss-webpack 可以去除无用的css
    
*   babel-loader @babel/core 可以支持es6语法
    
*   @babel/preset-env 是根据浏览器或者运行环境来将es6转化成es5，比如根据browserslist
    
*   补充说明1：@babel/polyfill 是对es6降级es5的一个垫片，是对babel-loader的补充，但是会污染全局，不能按需引入，不建议这种方式
    
*   补充说明2：@babel/runtime @babel/plugin-transform-runtime也是对es6降级es5的一个垫片，可以按需引入，模块化加载，不污染全局，推荐使用
    
*   file-loader 或者 url-loader可以支持引入文件
    
*   file-loader不支持小文件转化为base64格式，但是可以为文件名添加hash值，url-loader可以支持小文件转化为base64格式，这两个可以搭配使用
    
*   vue-loader vue-template-compiler 可以支持编译.vue文件
    
*   clean-webpack-plugin 可以清除打包后的文件夹
    
*   webpack.HotModuleReplacementPlugin webpack自带的热替换plugin与devServer的hot:true结合使用，使页面可以不刷新
