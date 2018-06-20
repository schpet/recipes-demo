class Mutations::DeleteRecipe < Mutations::BaseMutation
  null true

  argument :id, ID, required: true
  field :recipe, Types::RecipeType, null: true
  field :errors, [Types::UserError], null: false

  def resolve(id:)
    recipe = Recipe.destroy(id)

    {
      recipe: recipe,
      errors: convert_errors(recipe.errors)
    }
  end
end
