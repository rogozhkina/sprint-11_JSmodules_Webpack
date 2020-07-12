// webpack.config.js

// подключаем path к конфигу вебпак
const path = require("path");

// переписали точку выхода, используя утилиту path
module.exports = {
  entry: { main: "./src/index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
};
