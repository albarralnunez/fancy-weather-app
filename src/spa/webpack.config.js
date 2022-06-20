const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
        ]
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"]
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "index.bundle.js"
    },
    devServer: {
        proxy: { // proxy URLs to backend development server
            '/api': 'http://backend:8083',
            secure: false,
            changeOrigin: true,
            logLevel: 'debug'
        },
        port: 8085,
        static: path.resolve(__dirname, "./dist"),
    },
    plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],

};