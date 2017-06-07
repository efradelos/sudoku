/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import webpack from 'webpack';
import { merge } from 'lodash';
import path from 'path';
import AssetsPlugin from 'assets-webpack-plugin';

const DEBUG = !process.argv.includes('--release');

const baseConfig = {
  context: path.resolve(__dirname, '../src'),

  output: {
    path: path.resolve(__dirname, '../dist/public/assets'),
    filename: DEBUG ? '[name].js' : '[name].[chunkhash].js',
    publicPath: '/assets/',
    chunkFilename: DEBUG ? 'js/[name].[id].js' : '[name].[id].[chunkhash].js',
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: [
          `babel-loader?${JSON.stringify({
            cacheDirectory: DEBUG,
            babelrc: false,
            presets: [
              'react',
              'es2015',
              'stage-0',
            ],
            plugins: [
              ...DEBUG ? ['react-hot-loader/babel'] : [],
              'transform-runtime',
              'transform-decorators-legacy',
              ...DEBUG ? [] : [
                'transform-react-remove-prop-types',
                'transform-react-constant-elements',
                'transform-react-inline-elements',
              ],
            ],
          })}`,
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|wav|mp3)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: DEBUG ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
        },
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
    ],
  },

  postcss() {
    return [
      require('postcss-flexbugs-fixes')(),
      require('autoprefixer')({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ],
      }),
    ];
  },

  resolve: {
    root: path.resolve(__dirname, '../src'),
    modulesDirectories: ['node_modules'],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json'],
  },

  cache: DEBUG,
  debug: DEBUG,

  stats: 'minimal',

  plugins: [
    ...DEBUG ? [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()] : [],
  ],
};

const serverConfig = merge({}, baseConfig, {
  entry: {
    server: './server.js',
  },

  output: {
    filename: '../../server.js',
    libraryTarget: 'commonjs2',
  },

  target: 'node',
  devtool: DEBUG ? 'cheap-module-source-map' : 'source-map',
  externals: [
    /^\.\/assets$/,
    (context, request, callback) => {
      const isExternal =
        request.match(/^[@a-z][a-z/.\-0-9]*$/i) &&
        !request.match(/\.(css|less|scss|sss)$/i);
      callback(null, Boolean(isExternal));
    },
  ],

  node: {
    __filename: false,
    __dirname: false,
  },

  plugins: [
    new webpack.DefinePlugin({ 'process.env.BROWSER': false }),
    new webpack.BannerPlugin('require("source-map-support").install();',
      { raw: true, entryOnly: false }),
  ],

});

const clientConfig = merge({}, baseConfig, {
  entry: {
    client: [...DEBUG ? ['react-hot-loader/patch', 'webpack-hot-middleware/client'] : [], './client.js'],
  },

  output: {
    filename: DEBUG ? 'client.js' : 'client.[chunkhash].js',
  },
  target: 'web',
  plugins: [
    new AssetsPlugin({
      path: path.resolve(__dirname, '../dist'),
      filename: 'assets.js',
      processOutput: x => `module.exports = ${JSON.stringify(x, null, 2)};`,
    }),
  ],
  devtool: 'cheap-module-source-map',
});

export { serverConfig, clientConfig };
export default [clientConfig, serverConfig];
