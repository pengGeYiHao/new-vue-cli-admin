'use strict'
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}


// module.exports = {
//     css: {
//       modules: true
//     },
//     configureWebpack: config => {
//       if (process.env.NODE_ENV === 'production') {
//         // mutate config for production...
//       } else {
//         // mutate for development...
//       }
//     },
//     chainWebpack: config => {
//         config.module
//         .rule('vue')
//         .use('vue-loader')
//             .loader('vue-loader')
//             .tap(options => {
//             // modify the options...
//             return options
//             })
//     }
// }
module.exports = {
    // 基本路径  
    baseUrl: '/',
    // 输出文件目录  
    outputDir: 'dist',
    // 静态资源嵌套的目录
    assetsDir:'admin_static',
    // eslint-loader 是否在保存的时候检查  
    lintOnSave: true,
    // use the full build with in-browser compiler?  
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only  
    // compiler: false,  
    // webpack配置  
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md  
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // mutate config for production...
        } else {
            // mutate for development...
            // config.resolve = {
            //     extensions: ['.js', '.vue', '.json'],
            //     alias: {
            //         '@': resolve('src'),
            //     }
            // }
        }
    },
    configureWebpack: () => { },
    // vue-loader 配置项  
    // https://vue-loader.vuejs.org/en/options.html  
    // vueLoader: {},  
    // 生产环境是否生成 sourceMap 文件  
    productionSourceMap: true,
    // css相关配置  
    css: {
        // 是否使用css分离插件 ExtractTextPlugin  
        extract: true,
        // 开启 CSS source maps?  
        sourceMap: false,
        // css预设器配置项  
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.  
        modules: false
    },
    // use thread-loader for babel & TS in production build  
    // enabled by default if the machine has more than 1 cores  
    parallel: require('os').cpus().length > 1,
    // 是否启用dll  
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode  
    // dll: false,  
    // PWA 插件相关配置  
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa  
    pwa: {},
    // webpack-dev-server 相关配置  
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8000,
        https: false,
        hotOnly: false,
        // proxy: {
        //     '/newadmin': {
        //         target: 'http://10.10.1.22:8080',
        //         pathRewrite: {
        //             '^/newadmin': '/newadmin'
        //         }
        //     },
        //     '/admin': {
        //         target: 'http://10.10.1.22:8080',
        //         pathRewrite: {
        //             '^/admin': '/admin'
        //         }
        //     }
        // }, // 设置代理  
        before: app => { }
    },
    // 第三方插件配置  
    pluginOptions: {
        // ...  
    }
}