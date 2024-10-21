const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    task2: "./src/task2/script.js",
    task3: "./src/task3/script.js",
    task4: "./src/task4/script.js",
  },
  output: {
    filename: "[name].[contenthash].bundle.js", // [name] подставит имя entry 
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]", 
              outputPath: "assets", 
              publicPath: "/assets", 
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "task2_index.html", 
      template: "src/task2/task2_index.html",
      chunks: ["task2"], 
    }),
    new HtmlWebpackPlugin({
      filename: "task3_index.html", 
      template: "src/task3/task3_index.html",
      chunks: ["task3"], 
    }),
    new HtmlWebpackPlugin({
      filename: "task4_index.html", 
      template: "src/task4/task4_index.html",
      chunks: ["task4"], 
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/assets", to: "assets" }, // Копируем src/assets в dist/assets
      ],
    }),
  ],
  devServer: {
    static: "./dist",
    hot: true,
    open: true,
  },
};
