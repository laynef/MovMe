const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
<<<<<<< HEAD
    entry: "./app/Root.jsx",
=======
   entry: "./app/Root.jsx",
>>>>>>> workingBranch
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
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('public/main.css', { allChunks: true })
    ]
}
<<<<<<< HEAD
=======

/* 
gem install sass
gem install bourbon

npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react webpack webpack-dev-server node-sass sass-loader extract-text-webpack-plugin css-loader style-loader

npm install --save  sequelize pg pg-hstore mysql sqlite3 tedious axios react react-dom react-router express body-parser morgan 
*/

>>>>>>> workingBranch
