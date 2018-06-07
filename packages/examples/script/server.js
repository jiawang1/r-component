const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = require('../config/webpack.config');

new WebpackDevServer(webpack(config)).listen('8012', err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Listening at localhost:${baseConfig.webpackDevServerPort}`);
  }
});
