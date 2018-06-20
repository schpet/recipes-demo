fetch("http://localhost:3000/graphql", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: `
      {
        recipes(limit: 5) {
          title
          instructions
          ingredients {
            title
          }
        }
      }
    `,
  }),
})
  .then(response => response.json())
  .then(json => console.log(json))

var query = `
mutation addRecipe($input: RecipeInputType!) {
  addRecipe(input: $input) {
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

fetch("http://localhost:3000/graphql", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: `
      mutation addRecipe($input: RecipeInputType!) {
        addRecipe(input: $input) {
          id
          title
          instructions
          ingredients {
            id
            title
          }
        }
      }
    `,
    variables: {
      input: {
        title: "Basic Vinaigrette",
        instructions: `
          add the vinegar, mustard, and salt to a bowl and mix.
          slowly add in the olive oil while whisking.",
        `,
        ingredients: [
          { title: "1 part vinegar", position: 0 },
          { title: "quarter part mustard", position: 1 },
          { title: "3 parts olive oil", position: 2 },
        ],
      },
    },
  }),
})
  .then(response => response.json())
  .then(json => console.log(json))
