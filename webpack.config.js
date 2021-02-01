const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const webpack = require("webpack");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const isDev = process.env.NODE_ENV === "development";

module.exports = {
  entry: "./src/js/script.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { importLoaders: 2 } },
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico|svg)$/i,

        use: [
          {
            loader: "file-loader",
            options: {
              name: "./images/[name].[ext]",

              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,

        loader: "file-loader?name=./vendor/fonts/[name].[ext]",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default"],
      },
      canPrint: true,
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: "./src/index.html",
      filename: "index.html", // имя выходного файла, то есть того, что окажется в папке dist после сборки
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
