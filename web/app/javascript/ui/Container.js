import React from "react"
import { StyleSheet, View } from "react-native"

export default props => <View style={styles.container} {...props} />

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
})
