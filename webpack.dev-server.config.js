const path = require('path');

// Common configuration attributes
module.exports = {
    entry: {
        bundle: "./demo/index.js",
        // d3: "node_modules/d3",
        // react: "node_modules/react",
        // react_dom: "node_modules/react-dom",
        // react_faux_dom: "node_modules/react-faux-dom",
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].js",
        library: "[name]",
        libraryTarget: "var",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        modules: [
            __dirname + '/',
            "node_modules",
        ]
    },

    module: {
        rules: [
            { test: /\.jsx?$/, use: [{
                loader: "babel-loader",
            }]},

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            // { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        // "d3": 'd3',
        // "react": 'react',
        // "react-dom": 'react_dom',
        // "react-faux-dom": 'react_faux_dom',
    },

    devServer: {
        contentBase: path.join(__dirname, '/demo'),
        compress: true,
        port: 9000,
        host: '0.0.0.0',
    },
};
