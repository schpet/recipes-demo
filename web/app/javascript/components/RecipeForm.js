import React, { Component } from "react"
import { StyleSheet, Text, View, TextInput } from "react-native"

import Button from "../ui/Button"
import Card from "../ui/Card"
import theme from "../ui/theme"

const INITIAL_STATE = {
  title: "",
  instructions: "",
  ingredients: [],
  newIngredient: "",
}

class RecipeForm extends Component {
  state = INITIAL_STATE

  render() {
    const { title, instructions, ingredients, newIngredient } = this.state

    return (
      <Card>
        <Text accessibilityRole="label" style={styles.label}>
          Title
        </Text>
        <TextInput
          value={title}
          onChangeText={title => this.setState({ title })}
          style={styles.input}
        />

        <Text accessibilityRole="label" style={styles.label}>
          Ingredients
        </Text>

        {ingredients.map((ingredient, i) => (
          <View key={i} style={styles.ingredient}>
            <Text style={styles.number}>- </Text>
            <TextInput key={i} value={ingredient} style={styles.input} />
          </View>
        ))}

        <View style={styles.ingredient}>
          <TextInput
            value={newIngredient}
            style={styles.input}
            onChangeText={text => this.setState({ newIngredient: text })}
            onSubmitEditing={this.handleAddNewIngredient}
            blurOnSubmit={false}
          />
          <Button
            onPress={this.handleAddNewIngredient}
            style={styles.addIngredient}
          >
            +
          </Button>
        </View>

        <Text accessibilityRole="label" style={styles.label}>
          Instructions
        </Text>
        <TextInput
          value={instructions}
          onChangeText={instructions => this.setState({ instructions })}
          style={styles.input}
        />


        <Button onPress={this.handleSubmit}>Add Recipe</Button>
      </Card>
    )
  }

  handleSubmit = () => {
    const { title, instructions, ingredients, newIngredient } = this.state

    const allIngredients = newIngredient
      ? [...ingredients, newIngredient]
      : ingredients

    this.props.onSubmit({
      title,
      instructions,
      ingredients: allIngredients.map((text, i) => ({
        title: text,
        position: i,
      })),
    })

    this.setState(INITIAL_STATE)
  }

  handleAddNewIngredient = () => {
    this.setState(state => ({
      ingredients: [...state.ingredients, state.newIngredient],
      newIngredient: "",
    }))
  }
}

const styles = StyleSheet.create({
  label: {
    padding: theme.space[2],
    fontWeight: theme.fontWeights.bold,
  },
  input: {
    marginLeft: theme.space[2],
    marginRight: theme.space[2],
    paddingTop: theme.space[2],
    paddingBottom: theme.space[2],
    borderBottomColor: theme.colors.green,
    borderBottomWidth: theme.borderWidths[1],
    flex: 1,
  },
  number: {
    paddingLeft: theme.space[2],
  },
  ingredient: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.space[2],
  },
  addIngredient: {
    alignSelf: "flex-end",
  },
})

export default RecipeForm
