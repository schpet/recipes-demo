class Types::IngredientInputType < Types::BaseInputObject
  graphql_name "IngredientInputType"
  description "Properties for modifying a Ingredient"

  argument :title, String, description: "Title of the ingredient", required: true

  argument :position, Integer, description: "Position of ingredient", required: true
end
