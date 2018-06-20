import React, { Component } from "react"
import gql from "graphql-tag"
import { Query, Mutation } from "react-apollo"

import { StyleSheet, Text, ScrollView } from "react-native"

import Recipe from "../components/Recipe"
import RecipeForm from "../components/RecipeForm"

import Container from "../ui/Container"
import Button from "../ui/Button"
import theme from "../ui/theme"

const GET_RECIPES = gql`
  query recipes($offset: Int = 0, $limit: Int = 5) {
    recipes(offset: $offset, limit: $limit) {
      id
      title
      instructions
      ingredients {
        id
        title
      }
    }
  }
`

const Dashboard = () => (
  <Query query={GET_RECIPES}>
    {({ loading, error, data, fetchMore }) => {
      if (loading) return <Text style={styles.message}>Loading...</Text>
      if (error) return <Text style={styles.message}>{`⚠️ ${error}`}</Text>

      return (
        <DashboardView
          recipes={data.recipes}
          onFetchMore={() => {
            fetchMore({
              variables: { offset: data.recipes.length },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev

                return {
                  ...prev,
                  recipes: [...prev.recipes, ...fetchMoreResult.recipes],
                }
              },
            })
          }}
        />
      )
    }}
  </Query>
)

const DashboardView = ({ recipes, onFetchMore }) => (
  <ScrollView style={styles.container}>
    <AddRecipe />

    {recipes.map(recipe => (
      <RecipeWithDelete recipe={recipe} key={recipe.id} />
    ))}

    <Button onPress={onFetchMore}>Load More</Button>
  </ScrollView>
)

const DELETE_RECIPE = gql`
  mutation deleteRecipe($id: ID!) {
    deleteRecipe(input: { id: $id }) {
      recipe {
        id
      }
      errors {
        message
      }
    }
  }
`

const RecipeWithDelete = ({ recipe }) => (
  <Mutation
    key={recipe.id}
    mutation={DELETE_RECIPE}
    update={(cache, { data: { deleteRecipe: { recipe } } }) => {
      const { recipes } = cache.readQuery({ query: GET_RECIPES })
      cache.writeQuery({
        query: GET_RECIPES,
        data: {
          recipes: recipes.filter(r => r.id !== recipe.id),
        },
      })
    }}
  >
    {(deleteRecipe, { data, loading, error }) => (
      <React.Fragment>
        <Recipe
          key={recipe.id}
          recipe={recipe}
          onDelete={() => deleteRecipe({ variables: { id: recipe.id } })}
        />
        {loading && <Text>Deleting...</Text>}
        {error && <Text>Error Please try again</Text>}
      </React.Fragment>
    )}
  </Mutation>
)

const ADD_RECIPE = gql`
  mutation addRecipe($input: AddRecipeInput!) {
    addRecipe(input: $input) {
      recipe {
        id
        title
        instructions
        ingredients {
          id
          title
        }
      }

      errors {
        path
        message
      }
    }
  }
`

const AddRecipe = () => (
  <Mutation
    mutation={ADD_RECIPE}
    update={(cache, { data: { addRecipe: { recipe, errors } } }) => {
      if (errors) return

      const { recipes } = cache.readQuery({ query: GET_RECIPES })

      cache.writeQuery({
        query: GET_RECIPES,
        data: { recipes: [recipe, ...recipes] },
      })
    }}
  >
    {(addRecipe, { data, loading, error }) => (
      <React.Fragment>
        {data &&
          data.addRecipe.errors.map(({ message, path }, i) => (
            <Text key={i} style={styles.error}>
              {path.join(".")} {message}
            </Text>
          ))}

        <RecipeForm
          onSubmit={recipe => addRecipe({ variables: { input: recipe } })}
        />
        {loading && <Text>Loading...</Text>}
        {error && <Text>Error - Please try again</Text>}
      </React.Fragment>
    )}
  </Mutation>
)

const styles = StyleSheet.create({
  message: {
    marginTop: 80,
    marginLeft: 10,
    marginRight: 10,
  },
  container: {
    marginTop: theme.space[5],
    marginBottom: theme.space[5],
  },
  error: {
    color: theme.colors.red,
  },
})

export default Dashboard
