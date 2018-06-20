const { environment } = require("@rails/webpacker")

environment.config.merge({
  resolve: {
    alias: {
      "react-native$": "react-native-web",
    },
  },
})

module.exports = environment
