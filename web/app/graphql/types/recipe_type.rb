class Types::RecipeType < Types::BaseObject
  field :id, ID, null: true
  field :title, String, null: false
  field :instructions, String, null: false
  field :ingredients, [Types::IngredientType, null: true], null: true
end
