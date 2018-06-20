class Types::RecipeInputType < Types::BaseInputObject
  graphql_name "RecipeInputType"
  description "Properties for modifying a Recipe"

  argument :title, String, description: "Title of the recipe.", required: true

  argument :instructions, String, description: "Instructions to make the recipe.", required: true

  argument :ingredients, [Types::IngredientInputType, null: true], description: "Recipe ingredients", required: false
end
