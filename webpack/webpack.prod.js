const merge = require("webpack-merge");
const basic = require("./webpack.config");

module.exports = merge(basic, {
  mode: "production",
});
