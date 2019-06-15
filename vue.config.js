const path = require('path')

module.exports = {
  publicPath: '/jhzhps', // 基本路径
  outputDir: 'dist', // 输出文件目录
  lintOnSave: false, // eslint-loader 是否在保存的时候检查
  // configureWebpack: (config) => {
  //   Object.assign(config, {
  //     // 开发生产共同配置
  //     resolve: {
  //       alias: {
  //         '@': path.resolve(__dirname, './src'),
  //         '@c': path.resolve(__dirname, './src/components'),
  //         '@p': path.resolve(__dirname, './src/pages')
  //       } // 别名配置
  //     }
  //   })
  // }
}