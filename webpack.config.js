module.exports = {
    context: __dirname + '/frontend',
    entry:   {
        index: ['./index']
    },
    devtool: 'inline-source-map',
    output:  {
        path:       __dirname + '/public/script',
        publicPath: '/script',
        filename:   '[name].js'
    },

    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015','react', 'stage-0']
            }
        }]
    },
    devServer: {
        // hot:true,
        contentBase:__dirname + '/public',
        host: 'localhost', // default
        port: 3000, // default
        historyApiFallback: true
    }
};