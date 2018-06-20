class Types::QueryType < Types::BaseObject
  # TODO refactor this into classes?

  field :recipe, Types::RecipeType, description: "Find a Recipe by ID", null: true do
    argument :id, ID, required: true
  end

  def recipe(id:)
    Recipe.find(id)
  end

  field(
    :recipes,
    [Types::RecipeType, null: true],
    description: "Get the latest recipes",
    null: true
  ) do
    argument :limit, Integer, required: true
    argument :offset, Integer, required: false
  end

  def recipes(limit:, offset: 0)
    Recipe.order(created_at: :desc).includes(:ingredients).offset(offset).limit(limit)
  end

  # http://graphql-ruby.org/queries/mutations.html
end
