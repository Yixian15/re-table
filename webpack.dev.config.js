const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ForkTSCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/App.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@Table': path.resolve(__dirname, './src/Table')
    },
    extensions: [
      '.js', '.jsx', '.ts', '.tsx'
    ]
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: true,
              modules: {
                mode: 'local',
                localIdentName: '[local]-[hash:base64:5]'
              },
              localsConvention: 'camelCaseOnly'
            }
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                strictMath: true
              },
            },
          },
        ],
      }
    ]
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new htmlWebpackPlugin({
      template: 'assets/index.html'
    }),
    new ForkTSCheckerWebpackPlugin()
  ],
};