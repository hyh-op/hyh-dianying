module.exports = {
    devServer: {
      proxy: {
        '/ajax': {
          target: 'https://m.maoyan.com/',
          // ws: true,
          changeOrigin: true
        },
        /* '/foo': {
                  target: '<other_url>'
              } */
        '/apollo': {
          target: 'https://i.maoyan.com/',
          // ws: true,
          changeOrigin: true
        },
        '/api/mtrade/mmcs/cinema': {
          target: 'https://m.maoyan.com/',
          // ws: true,
          changeOrigin: true
        }
      }
    }
  }
  