import React from "react"
import { StyleSheet, View } from "react-native"

export default props => <View style={styles.card} {...props} />

const styles = StyleSheet.create({
  card: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    margin: 10,
  },
})
