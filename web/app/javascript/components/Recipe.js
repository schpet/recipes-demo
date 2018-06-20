import React from "react"
import { StyleSheet, Text, View } from "react-native"

import Card from "../ui/Card"
import Button from "../ui/Button"
import theme from "../ui/theme"

export default ({
  recipe: { id, title, instructions, ingredients },
  onDelete,
}) => (
  <Card>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.ingredientsTitle}>Ingredients:</Text>
    <View style={styles.ingredientList}>
      {ingredients.map(({ id, title }) => (
        <Text key={id} style={styles.ingredient}>
          - {title}
        </Text>
      ))}
    </View>
    <Text style={styles.instructions}>{instructions}</Text>
    <Button onPress={onDelete} style={styles.delete}>
      &times;
    </Button>
  </Card>
)

const styles = StyleSheet.create({
  title: {
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  instructions: {
    fontStyle: "italic",
    padding: 10,
  },
  ingredientList: {
    padding: 10,
  },
  ingredientsTitle: {
    padding: 10,
    paddingBottom: 0,
  },
  ingredient: {
    paddingBottom: 5,
  },
  delete: {
    alignSelf: "flex-end",
    backgroundColor: theme.colors.red,
  },
})
