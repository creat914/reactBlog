const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
const {
    HotModuleReplacementPlugin
} = require('webpack')
const {
    VueLoaderPlugin
} = require('vue-loader')
const resolve = dir => path.resolve(__dirname, dir);
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
        filename: "[name]/js/[name].[chunkhash].js",
        path: path.resolve(__dirname, "dist"),
        chunkFilename: "[name].[chunkhash].js"
    },
    optimization:{
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    priority: -20,
                    chunks: "all"
                }
            }
        }
    },
    // optimization: {
    //     runtimeChunk: "single",
    //     splitChunks: {
    //         minChunks: 3,
    //         cacheGroups: {
    //             commonjs: {
    //                 chunks: 'initial',
    //                 minChunks: 2,
    //                 maxInitialRequests: 5,
    //                 minSize: 0
    //             },
    //             vendor: {
    //                 test: /node_modules/,
    //                 chunks: 'initial',
    //                 name: 'vendor',
    //                 priority: 10,
    //                 enforce: true
    //             }
    //         }
    //     }
    // },
    plugins: [
        new HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            title: "mobile-blog",
            template: "./src/mobile/mobile.html",
            filename: 'mobile/mobileHtml.html',
            inject: "body",
            chunks: ["mobile"]
        }),
        new htmlWebpackPlugin({
            title: "pc-blog",
            template: "./src/pc/pc.html",
            filename: 'pc/pcHtml.html',
            inject: "body",
            chunks: ["pc"]
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name]/css/[name].[chunkhash:8].css",
            chunkFilename: "[id].[chunkhash:8].css"
        })
    ],
    module: {
        rules: [{
                test: /\.(png|svg|jpe?g)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: '[path]/[name].[hash:7].[ext]',
                        fallback: 'file-loader',  // 当超过8192byte时，会回退使用file-loader
                        context: path.resolve(__dirname, './src'),//过滤掉[path]的相对路径
                        publicPath: '../'
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|mp3|mp4)$/,
                loader: 'file-loader'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders:2
                        }
                    },
                    'postcss-loader'
                ]
            }, {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders:3
                        }
                    },
                    'postcss-loader',
                    'less-loader',
                    {
                        loader: 'style-resources-loader',
                        options: {
                            patterns: path.resolve(__dirname, 'src/theme.less')
                        }
                    }
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
                            [require.resolve('@babel/preset-env'), {
                                modules: false
                            }]
                        ],
                        plugins: [["@babel/plugin-transform-runtime",{
                            "corejs": 3 // 指定 runtime-corejs 的版本，目前有 2 3 两个版本
                        }]],
                        cacheDirectory: true,
                        exclude: /node_modules/
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    resolve: {
        alias: {
            '@': resolve('src'),
            '@pc': resolve('src/pc'),
            '@mobile': resolve('src/mobile')
        }
    },
}
