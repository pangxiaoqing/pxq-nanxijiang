'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const assetsPublicPath = '/encdata-ticket/'
module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/ticket':{
        // target:'http://10.4.136.187:8144',
        // target:'http://10.4.136.115:8144',
        // target:'http://tgx.enn.cn/encdata-sunshine/',
        // target:'http://genius.enn.cn/ticket/',
        // target:'http://travel.enn.cn/ticket/',
        // target:'http://10.4.140.92:8080',

        target:'http://10.4.136.187:8101',
        // target:'http://10.4.136.187:9001',
        // target:'http://10.4.137.92:8101',
        // target:'http://10.4.136.120:8102',
        
        
        // target:'http://tgx.enn.cn',
        // target:'http://10.38.128.83:8144',
        changeOrigin: true,
        pathRewrite: {
          '^/ticket': '/ticket'
        }
      }
    },

    // Various Dev Server settings
    // host: '10.4.136.193', // can be overwritten by process.env.HOST
    host: '10.4.137.106', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath:assetsPublicPath,

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
