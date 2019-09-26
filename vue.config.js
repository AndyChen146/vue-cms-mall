const path = require('path')
const webpack = require('webpack')

module.exports = {
    // 基本路径
    publicPath: '/',
    assetsDir: './',
    // 输出文件目录
    outputDir: './src/bulid',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: () => {},
    // configureWebpack: () => {},
    configureWebpack: {
        externals: {
            'AMap': 'AMap'
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                // Popper: ['popper.js', 'default']
            })
        ]
    },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    // webpack-dev-server 相关配置
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        // 设置代理
        proxy: {
            // '/api': {
            //   target: 'http://192.168.1.115:8080/'
            // },
            // '/uaa': {
            //   target: 'http://192.168.1.115:8080/'
            // },
            // '/basicdata': {
            //   target: 'http://192.168.1.115:8080/'
            // },
            // '/record': {
            //   target: 'http://192.168.1.115:8080/'
            // },
            // '/jobseeker': {
            //   target: 'http://192.168.1.115:8080/'
            // },
            // '/v3': {
            //   target: 'https://restapi.amap.com/'
            // }
            '/api': {
                target: 'http://192.168.1.119:8008/'
            },
            '/set': {
                target: 'http://api.hotking.com/'
            },
            '/product': {
                target: 'http://api.hotking.com/'
            },
            '/category': {
                target: 'http://api.hotking.com/'
            },
            '/brand': {
                target: 'http://api.hotking.com/'
            },
            '/system': {
                target: 'http://api.hotking.com/'
            },
            '/album': {
                target: 'http://api.hotking.com/'
            },
            '/access': {
                target: 'http://api.hotking.com/'
            },

        },
        before: app => {}
    },
    // 第三方插件配置
    // pluginOptions: {
    // },
    // 通过 Babel 显式转译一个依赖
    // transpileDependencies: [],
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    // vueLoader: {},
    // css相关配置
    // css: {
    //   // 是否使用css分离插件 ExtractTextPlugin
    //   extract: true,
    //   // 开启 CSS source maps?
    //   sourceMap: false,
    //   // css预设器配置项
    //   loaderOptions: {},
    //   // 启用 CSS modules for all css / pre-processor files.
    //   modules: false
    // },
    // 是否启用dll
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
    // dll: false,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    // pwa: {},
}