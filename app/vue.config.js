const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    publicPath: './',
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: true,
    // 开启 CSS source maps?
    css:{
        sourceMap: true,
    },
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"))
            .set("assets", resolve("src/assets"))
            .set("components", resolve("src/components"))
            .set("utils", resolve("src/utils"))
            .set("mixin", resolve("src/mixin"))
    }
};