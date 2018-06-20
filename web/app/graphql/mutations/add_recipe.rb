class Mutations::AddRecipe < Mutations::BaseMutation
  null true

  field :recipe, Types::RecipeType, null: true

  field :errors, [Types::UserError], null: false

  argument :title, String, description: "Title of the recipe.", required: true

  argument :instructions, String, description: "Instructions to make the recipe.", required: true

  argument :ingredients, [Types::IngredientInputType, null: true], description: "Recipe ingredients", required: false

  def resolve(title:, instructions:, ingredients:[])
    recipe = Recipe.create(
      title: title,
      instructions: instructions,
      ingredients_attributes: ingredients.map(&:to_h)
    )

    {
      recipe: recipe,
      errors: convert_errors(recipe.errors)
    }
  end
end
