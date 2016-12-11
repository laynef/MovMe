const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
   entry: "./app/Root.jsx",
   output: {
        filename: "public/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass')
            },
            { 
                test: /node_modules[\\\/]auth0-lock[\\\/].*\.js$/, 
                loaders: [ 'transform-loader/cacheable?brfs', 'transform-loader/cacheable?packageify' ]
            },
            { 
                test: /node_modules[\\\/]auth0-lock[\\\/].*\.ejs$/, 
                loader: 'transform-loader/cacheable?ejsify'
            },
            { 
                test: /\.json$/, 
                loader: 'json'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('public/main.css', { allChunks: true })
    ],
    transforms: [
        function(file) {
            return through(function(buf) {
                this.queue(buf.split("").map(function(s) {
                    return String.fromCharCode(127-s.charCodeAt(0));
                }).join(""));
            }, function() { this.queue(null); });
        }
    ]
}
