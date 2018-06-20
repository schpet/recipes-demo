if (process.env.NODE_ENV === "development") {
  module.exports = require("./config.dev")
} else {
  module.exports = require("./config.prod")
}
