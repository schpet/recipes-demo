class Types::IngredientType < Types::BaseObject
  field :id, ID, null: false
  field :title, String, null: false
  field :recipe, Types::RecipeType, null: true
end
