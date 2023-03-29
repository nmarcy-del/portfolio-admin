const Dotenv = require("dotenv-webpack");

module.exports = {
  //...
  plugins: [
    new Dotenv({
      path: "./.env",
      safe: true,
      systemvars: true,
      silent: true,
      defaults: false,
    }),
  ],
};
