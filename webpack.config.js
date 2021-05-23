const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
// const TerserPlugin = require("terser-webpack-plugin");
const {
    HotModuleReplacementPlugin
} = require("webpack");
const {
    VueLoaderPlugin
} = require("vue-loader");
const resolve = (dir) => path.resolve(__dirname, dir);
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    mode: 'development',
    devServer: {
        hot: true,
        openPage: "pc/pcHtml.html",
        compress: false,
        open: true,
        port: 8090,
        contentBase: path.join(__dirname, "dist"),
        proxy: {
            '/': {
                target: 'http://192.168.31.181:8089',
                changeOrigin:true
                // pathRewrite: {
                //     '^/proxy': ''
                // }
            },
            // '/api': 'http://127.0.0.1:8088'
        }
    },
    entry: {
        mobile: "./src/mobile/main",
        pc: "./src/pc/main.js",
    },
    output: {
        filename: "[name]/js/[name].[chunkhash].js",
        path: path.resolve(__dirname, "dist"),
        chunkFilename: "[name].[chunkhash].js"
    },
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vendors: {
                    name: "chunk-vendors",
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                reactBase: {
                    test: (module) => {
                        return /react|react-router-dom|react-dom/.test(module.context);
                    }, // 直接使用 test 来做路径匹配，抽离react相关代码
                    name: "reactBase",
                    priority: -2,
                },
                vueBase: {
                    test: (module) => {
                        return /vue|vue-router|vuex/.test(module.context);
                    }, // 直接使用 test 来做路径匹配，抽离vue相关代码
                    name: "vueBase",
                    priority: -1,
                },
                // ,
                common: {
                    name: "chunk-common",
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                }
            },
        },
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        // new BundleAnalyzerPlugin(),
        new htmlWebpackPlugin({
            title: "pc-blog",
            template: "./src/pc/pc.html",
            filename: "pc/pcHtml.html",
            inject: "body",
            chunks: ["pc", "reactBase", "chunk-vendors", "chunk-common"],
        }),
        new htmlWebpackPlugin({
            title: "mobile-blog",
            template: "./src/mobile/mobile.html",
            filename: "mobile/mobileHtml.html",
            inject: "body",
            chunks: [
                "mobile",
                "vueBase",
                "elementPlus",
                "chunk-vendors",
                "chunk-common"
            ],
        }),
        // ,
        // new MiniCssExtractPlugin({
        //     filename: "[name]/css/[name].[chunkhash:16].css",
        //     chunkFilename: "[name].[id].[chunkhash:16].css"
        // })
    ],
    module: {
        rules: [{
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|mp3|mp4|ttf)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[path]/[name].[hash:16].[ext]",
                        context: path.resolve(__dirname, "./src"), //过滤掉[path]的相对路径
                        publicPath: "../",
                        esModule: false, // 这里设置为false
                    },
                }, ],
            },
            {
                test: /\.(png|svg|jpe?g)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 8192,
                        name: "[path]/[name].[hash:16].[ext]",
                        fallback: "file-loader", // 当超过8192byte时，会回退使用file-loader
                        context: path.resolve(__dirname, "./src"), //过滤掉[path]的相对路径
                        publicPath: "../",
                        esModule: false,
                    },
                }, ],
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    //   MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2
                        },
                    },
                    "postcss-loader",
                ],
            },
            // {
            //   test: /\.module\.less$/,
            //   include:/\/src\/pc\/style/,
            //   use: [
            //     "style-loader",
            //     // MiniCssExtractPlugin.loader,
            //     {
            //       loader: "css-loader",
            //       options: {
            //         importLoaders: 3,
            //         modules: {
            //           mode: 'local',
            //           localIdentName: '[name]-[local]-[hash:base64:5]'
            //         }
            //       },
            //     },
            //     "postcss-loader",
            //     "less-loader"
            //   ],
            // },
            {
                test: /\.less$/,
                exclude: path.resolve(__dirname, 'src/pc/style'),
                use: [
                    "style-loader",
                    // MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 3
                        },
                    },
                    "postcss-loader",
                    "less-loader",
                    {
                        loader: "style-resources-loader",
                        options: {
                            patterns: path.resolve(__dirname, "src/theme.less"),
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                include: path.resolve(__dirname, 'src/pc/style'),
                use: [
                    "style-loader",
                    // MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 3,
                            modules: {
                                mode: 'local',
                                localIdentName: '[name]-[local]-[hash:base64:5]'
                            }
                        },
                    },
                    "postcss-loader",
                    "less-loader",
                    {
                        loader: "style-resources-loader",
                        options: {
                            patterns: path.resolve(__dirname, "src/theme.less"),
                        },
                    },
                ],
            },

            {
                test: /\.js$/, //配置要处理的文件格式，一般使用正则表达式匹配
                use: {
                    loader: "babel-loader", //使用的加载器名称
                    options: {
                        //babel的配置参数，可以写在.babelrc文件里也可以写在这里
                        babelrc: false,
                        presets: [
                            require.resolve("@babel/preset-react"),
                            [
                                require.resolve("@babel/preset-env"),
                                {
                                    modules: false,
                                },
                            ],
                        ],
                        plugins: [
                            [
                                "@babel/plugin-transform-runtime",
                                {
                                    corejs: 3, // 指定 runtime-corejs 的版本，目前有 2 3 两个版本
                                },
                            ],
                        ],
                        cacheDirectory: true,
                        exclude: /node_modules/,
                    },
                },
            },
        ],
    },
    resolve: {
        alias: {
            "@": resolve("src"),
            "@pc": resolve("src/pc"),
            "@mobile": resolve("src/mobile"),
        },
        fallback: {
            buffer: require.resolve("buffer/"),
        },
    },
};
// buffer: require.resolve('buffer/'),
// util: require.resolve('util/'),
// stream: require.resolve('stream-browserify/'),
// vm: require.resolve('vm-browserify')
// crypto: require.resolve('crypto-browserify'),
// path: require.resolve('path-browserify'),
// url: require.resolve('url'),