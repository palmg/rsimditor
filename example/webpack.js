const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool: 'source-map',
    context: path.resolve(__dirname),
    entry: {
        bundle: './index.js',
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, "./"),
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: {presets: ['es2015', 'stage-0', 'react']}
            }],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function () {
                            return [
                                require('autoprefixer')()
                            ];
                        }
                    }
                }
            ]
        }, {
            test: /\.(png|jpg|svg)$/,
            use: ['url-loader?limit=25000']
        }, {
            test: /\.json$/,
            use: ['json-loader']
        }, {
            test: /\.html$/,
            use: ['html-loader?minimize=false']
        }, {
            test: /\.(eot|woff|ttf)$/,
            use: ['file-loader']}]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            filename: '[name][chunkhash:8].js', //开启webpack-dev-server后无法使用chunkHash，至webpack3.0依然未修复该问题
            children: true
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, './index.html'),
            template: path.resolve(__dirname, './index.tpl.html'),
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            __scrollOverImgOptions: '{"onOff": true, "scrollDom": "box-1"}'
        })
    ]
}
