const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app){
    app.use(
        '/back',
        createProxyMiddleware({
            target: 'http://34.64.50.137:8080',
            changeOrigin: true,
            pathRewrite: {
                '^/back': '',
            },
        }))
    app.use(
        '/riot',
        createProxyMiddleware({
            target: 'https://kr.api.riotgames.com',
            changeOrigin: true,
            pathRewrite: {
                '^/riot': '',
            },
        }))
}