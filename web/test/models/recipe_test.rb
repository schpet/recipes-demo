require 'test_helper'
class RecipeTest < ActiveSupport::TestCase
  test "#ingredients_attributes" do
    recipe = Recipe.new
    recipe.ingredients_attributes = [
      { title: "2 cloves garlic", position: 0 },
      { title: "1\" knob ginger", position: 0 },
    ]

    assert_equal recipe.ingredients.size, 2
    assert_equal recipe.ingredients[0].title, "2 cloves garlic"
    assert_equal recipe.ingredients[1].title, "1\" knob ginger"
  end

  test "saving" do
    recipe = Recipe.new
    recipe.title = "Tasty thing"
    recipe.instructions = "do the thing!!!"
    recipe.ingredients_attributes = [
      { title: "2 cloves garlic", position: 0 },
      { title: "1\" knob ginger", position: 0 },
    ]

    assert recipe.save!
  end
end
