var webpack = require('webpack');
var path = require('path');

module.exports = [{
    entry: {
        app: './src/cassandra/app.js'
    },
    output: {
        filename: 'public/build/cassandra/bundle.js',
        sourceMapFilename: 'public/build/cassandra/bundle.map'
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    devtool: '#source-map',
    watch: true,
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015']
            }
        }]
    }
}, {
    entry: {
        detail_book: './src/cassandra/layout/detail_book.js'
    },
    output: {
        filename: 'public/build/cassandra/detail_book.js',
        sourceMapFilename: 'public/build/cassandra/detail_book.map'
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    devtool: '#source-map',
    watch: true,
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015']
            }
        }]
    }
},
{
    entry: {
        detail_book: './src/cassandra/layout/detail_author.js'
    },
    output: {
        filename: 'public/build/cassandra/detail_author.js',
        sourceMapFilename: 'public/build/cassandra/detail_author.map'
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    devtool: '#source-map',
    watch: true,
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015']
            }
        }]
    }
},
{
    entry: {
        detail_book: './src/cassandra/layout/detail_store.js'
    },
    output: {
        filename: 'public/build/cassandra/detail_store.js',
        sourceMapFilename: 'public/build/cassandra/detail_store.map'
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    devtool: '#source-map',
    watch: true,
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015']
            }
        }]
    }
}, {
    entry: {
        app: './src/mysql/app.js'
    },
    output: {
        filename: 'public/build/mysql/bundle.js',
        sourceMapFilename: 'public/build/mysql/bundle.map'
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    devtool: '#source-map',
    watch: true,
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015']
            }
        }]
    }
}, {
    entry: {
        app: './src/mysql/layout/detail_store.js'
    },
    output: {
        filename: 'public/build/mysql/detail_store.js',
        sourceMapFilename: 'public/build/mysql/detail_store.map'
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    devtool: '#source-map',
    watch: true,
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015']
            }
        }]
    }
}, {
    entry: {
        app: './src/mysql/layout/detail_author.js'
    },
    output: {
        filename: 'public/build/mysql/detail_author.js',
        sourceMapFilename: 'public/build/mysql/detail_author.map'
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    devtool: '#source-map',
    watch: true,
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015']
            }
        }]
    }
}, {
    entry: {
        app: './src/mysql/layout/detail_book.js'
    },
    output: {
        filename: 'public/build/mysql/detail_book.js',
        sourceMapFilename: 'public/build/mysql/detail_book.map'
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    devtool: '#source-map',
    watch: true,
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015']
            }
        }]
    }
}]