module.exports = {
  plugins: {
    autoprefixer: {},
    // https://blog.csdn.net/qq_31393401/article/details/82354879
    "postcss-px-to-viewport": {
      "viewportWidth": 750,
      "minPixelValue": 1
    }
  }
};
