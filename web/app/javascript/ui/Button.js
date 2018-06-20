import React from "react"
import { TouchableHighlight, View, Text, StyleSheet } from "react-native"
import theme from "./theme"

export default ({ children, style, ...rest }) => (
  <TouchableHighlight accessibilityRole="button" {...rest}>
    <View style={[styles.button, style]}>
      <Text style={styles.buttonText}>{children}</Text>
    </View>
  </TouchableHighlight>
)

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.green,
    padding: theme.space[2],
    margin: theme.space[2],
    borderRadius: theme.radii[2],
  },

  buttonText: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
  },
})
