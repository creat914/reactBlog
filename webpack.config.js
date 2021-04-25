const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const {HotModuleReplacementPlugin} = require('webpack')
const {VueLoaderPlugin} = require('vue-loader')
module.exports = {
    devServer: {
        hot: true,
        compress: true,
        contentBase: path.join(__dirname, 'dist')
    },
    entry: {
        mobile: './src/mobile/main',
        pc: './src/pc/main.js'
    },
    output: {
        filename: "js/[name]/[name].bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            title: "mobile-blog",
            template: "./src/mobile/mobile.html",
            filename: 'mobileHtml.html',
            inject: "body",
            chunks: ["mobile"]
        }),
        new htmlWebpackPlugin({
            title: "pc-blog",
            template: "./src/pc/pc.html",
            filename: 'pcHtml.html',
            inject: "body",
            chunks: ["pc"]
        }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [{
            test: /\.css/,
            use: [
                'style-loader',
                'css-loader'

            ]
        }, {
            test: /\.less/,
            use: [
                'style-loader',
                'css-loader',
                'less-loader'
            ]
        },
            {
                test: /\.js$/, //配置要处理的文件格式，一般使用正则表达式匹配
                use: {
                    loader: 'babel-loader', //使用的加载器名称
                    options: { //babel的配置参数，可以写在.babelrc文件里也可以写在这里
                        babelrc: false,
                        presets: [
                            require.resolve('@babel/preset-react'),
                            [require.resolve('@babel/preset-env'), {modules: false}]
                        ],
                        cacheDirectory: true
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }]
    }
}
