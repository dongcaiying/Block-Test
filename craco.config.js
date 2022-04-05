const port = process.env.BLOCKLET_PORT || process.env.PORT || 8080;

module.exports = {
  devServer: {
    port,
    proxy: {
      '/apis': {
        // target: 'http://127.0.0.1:5500/',
        target: 'https://blockchain.info/',
        changeOrigin: true,
        pathRewrite: {
          '^/apis': '',
        },
      },
    },
  },
};
