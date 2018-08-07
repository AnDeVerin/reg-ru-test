const { join, resolve } = require('path');
const { createReadStream } = require('fs');

const webpack = require('webpack');

const HtmlPlugin = require('html-webpack-plugin');
const HtmlTemplatePlugin = require('html-webpack-template');

module.exports = {
  context: __dirname,

  entry: join(__dirname, 'src/index.js'),

  output: join(__dirname, 'public/bundle.js'),

  resolve: {
    modules: [resolve('./src/'), resolve('./node_modules')],
  },

  module: {
    rules: [
      // {
      //     test: /\.vue$/,
      //     use: 'vue-loader',
      // },
      {
        test: /\.html$/,
        use: 'raw-loader',
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader', // inject CSS to page
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS modules
          },
          {
            loader: 'postcss-loader', // Run post css actions
            /* eslint-disable */
            options: {
              ident: 'postcss',
              plugins: () => [require('precss'), require('autoprefixer')]
            }
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },

  plugins: [
    new HtmlPlugin({
      filename: 'index.html',
      template: HtmlTemplatePlugin,
      inject: false,
      mobile: true,
      appMountId: 'app'
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${process.env.NODE_ENV}"`
      }
    })
  ],

  devServer: {
    contentBase: './public/',
    hot: true,
    port: 9000,
    setup(app) {
      app.get('/api/tiles', (req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        createReadStream(join(process.cwd(), 'api/tiles.json'), { encoding: 'utf-8' }).pipe(res);
      });
    }
  }
};
