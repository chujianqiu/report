let config = require('./config/'+process.env.VUE_APP_ENV+'.env');
module.exports = {
  publicPath: config.PUBLIC_PATH,
  outputDir: "dist" + config.PUBLIC_PATH,
  productionSourceMap: false,
  configureWebpack: config => {
    // 生产环境取消 console.log
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
}
