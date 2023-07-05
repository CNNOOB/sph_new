const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap:false,//build时不生成map文件
  transpileDependencies: true,  //兼容ie
  lintOnSave:false , //关闭语法检查
  devServer: {
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
      },
    },
  },
})
