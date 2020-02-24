module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      navigateFallback: '/index.html',
      runtimeCaching: [
        {
          urlPattern: new RegExp('^https://ishu-chat-room.herokuapp.com/v1/graphql'),
          handler: 'networkFirst',
          options: {
            networkTimeoutSeconds: 20,
            cacheName: 'api-cache',
            cacheableResponse: {
              statuses: [0, 200]
            },
          }
        },
        {
          urlPattern: new RegExp('^https://ishu-chat-room.herokuapp.com/v1/graphql'),
          handler: 'networkOnly',
          options: {
            backgroundSync: {
              name: 'request-queue',
              options: {
                maxRetentionTime: 60 * 60,
              }
            }
          }
        }
      ]
    }
  }
}