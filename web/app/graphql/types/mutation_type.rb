class Types::MutationType < Types::BaseObject
  field :add_recipe, mutation: Mutations::AddRecipe
  field :delete_recipe, mutation: Mutations::DeleteRecipe
  field :update_recipe, mutation: Mutations::UpdateRecipe

end

