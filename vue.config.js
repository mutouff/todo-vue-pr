const TerserPlugin = require("terser-webpack-plugin")
const isProdution = process.env.NODE_ENV === 'production'

//CommonJS规范：node模块有module变量，表示当前模块，其exporrts属性是对外的接口
module.exports = {
    productionSourceMap: false,
    lintOnSave: false,
    devServer: {
        port: 8080,
        proxy:{
            '/api':{
                target: "http://192.168.1.54:8080",
                changeOrigin: true,
                ws: false
            }
        }
    },
    configureWebpack: {
        optimization: {
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        format: {
                            comments: /@license/i,
                        },
                    },
                    extractComments: {
                        condition: "some",
                        banner: (licenseFile) => {
                            return `License info can be found in ${licenseFile}`
                        }
                    }
                })
            ]
        }
    }
}