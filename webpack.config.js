const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    filename: "sort-everything.min.js",
    path: path.resolve(__dirname, "lib")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["babel-preset-env"],
            plugins: ["transform-object-rest-spread"]
          }
        }
      }
    ]
  }
};
