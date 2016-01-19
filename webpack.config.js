module.exports = {
    entry: "./main.js",
    output: {
        filename: "./bundle.js"
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exlude: /node_modules/,
                plugins: ['transform-runtime'],
                query: {
                    "presets": ["es2015"]
                }
            }
        ]
    }
};