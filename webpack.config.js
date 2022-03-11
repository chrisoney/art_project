const path = require('path');

module.exports = {
  context: __dirname,
  entry: "./js/main.js",
  output: {
    path: path.resolve(__dirname, ''),
    filename: "bundle.js"
  },
  resolve: {
    extensions: ["", ".js"]
  },
  watchOptions: {
    aggregateTimeout: 1000,
  },
  watch: true
}