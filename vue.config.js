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
        },
        '/dianying/cities': {
          target: 'https://m.maoyan.com/',
          // ws: true,
          changeOrigin: true
        },
        '/geoip/':{
          target: 'https://api.asilu.com/',
          // ws: true,
          changeOrigin: true
        }
      }
    }
  }
  