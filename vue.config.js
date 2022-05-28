const publicPath = {
  staging: 'https://ms.babyquip.com:4000',
  test: '/',
  production: '/',
  development: '/'
}

module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 4005, // CHANGE YOUR PORT HERE!
    https: false,
    hotOnly: false
  },
  publicPath: publicPath[process.env.NODE_ENV]
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       // Add .env variable to sass then use in the sass files
  //       additionalData: `$cloudFrontUrl: "${process.env.VUE_APP_AMAZONS3_CLOUDFRONTURL}/partner_modern";`
  //     }
  //   }
  // }
}
