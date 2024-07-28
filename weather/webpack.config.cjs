const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    contentScript: "./src/content/index.tsx",
    background: "./src/background/index.tsx",
    installed: "./src/installed/index.tsx",
    popup: "./src/popup/index.tsx",
  },
  mode: "production",
  target: "web",
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
              "@babel/preset-typescript",
            ],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        exclude: /node_modules/,
      },
      {
        exclude: /node_modules/,
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, "src", "popup", "index.html"),
      filename: "popup.html",
      chunks: ["popup"],
      cache: false,
    }),
    new HTMLPlugin({
      template: path.join(__dirname, "src", "installed", "index.html"),
      filename: "installed.html",
      chunks: ["installed"],
      cache: false,
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve("manifest.json"), to: path.resolve("dist") },
        { from: path.resolve("images"), to: path.resolve("dist/images") },
      ],
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
};
