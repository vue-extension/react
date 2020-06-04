const path = require("path");

module.exports = {
  outputDir: "dist",

  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV !== "production",
  chainWebpack: config => {
    config.module
      .rule("tsx")
      .use("ts-loader")
      .loader("ts-loader")
      .tap(options => {
        return Object.assign(options || {}, { allowTsInNodeModules: true });
      });
  },

  configureWebpack: {
    resolve: {
      extensions: [".ts", ".tsx"],
      modules: [
        path.resolve(__dirname, "./src"),
        path.resolve(__dirname, "./node_modules")
      ],
      alias: {
        "lodash-es": "lodash",
        react$: "@/vext-react/index.ts",
        vue$: "vue/dist/vue.esm.js"
      }
    }
  }
};
