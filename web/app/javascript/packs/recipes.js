import React from "react"
import { AppRegistry } from "react-native"

import App from "Recipes"

AppRegistry.registerComponent("App", () => App)
AppRegistry.runApplication("App", {
  rootTag: document.getElementById("react-root"),
})
