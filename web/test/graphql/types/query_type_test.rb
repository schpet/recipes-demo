require 'test_helper'

class QueryTypeTest < ActiveSupport::TestCase
  test "recipe" do
    results = RailsGraphqlRecipesSchema.execute(<<~GQL)
      {
        recipe(id: #{recipes(:chana_masala).id.inspect}) {
          title
          ingredients {
            title
          }
        }
      }
    GQL

    refute results["errors"]
    recipe = results.dig("data", "recipe")

    assert_equal "Chana Masala", recipe.dig("title")
    assert_match /garlic/, recipe.dig("ingredients", 0, "title")
    assert_match /ginger/, recipe.dig("ingredients", 1, "title")
  end

  test "recipes" do
    results = RailsGraphqlRecipesSchema.execute(<<~GQL)
      {
        recipes(limit: 2) {
          title
          ingredients {
            title
          }
        }
      }
    GQL

    refute results["errors"]

    recipes = results.dig("data", "recipes")

    assert_equal 2, recipes.size
    assert_equal "Chana Masala", recipes.dig(0, "title")
  end

  test "addRecipe" do
    assert_difference "Recipe.count" do
      results = RailsGraphqlRecipesSchema.execute(<<~GQL)
        mutation {
          addRecipe(
            input: {
              title: "Enchiladas",
              instructions: "fry tortillas, dip in salsa, wrap fillings and heat"
            }
          ) {
            recipe {
              title
              instructions
            }
          }
        }
      GQL

      refute results["errors"]
      recipe = results.dig("data", "addRecipe", "recipe")

      assert_equal "Enchiladas", recipe.dig("title")
      assert_match /^fry tortillas/, recipe.dig("instructions")
    end
  end

  test "addRecipe with validation error" do
    results = RailsGraphqlRecipesSchema.execute(<<~GQL)
      mutation {
        addRecipe(
          input: {
            title: "",
            instructions: "uh oh"
          }
        ) {
          recipe {
            title
            instructions
          }
          errors {
            path
            message
          }
        }
      }
    GQL

    refute results["errors"]
    errors = results.dig("data", "addRecipe", "errors")

    assert_equal errors, [
      {
        "path"=>["attributes", "title"],
        "message"=>"can't be blank"
      }
    ]
  end

  test "updateRecipe" do
    results = RailsGraphqlRecipesSchema.execute(<<~GQL)
      mutation {
        updateRecipe(
          input: {
            id: #{recipes(:chana_masala).id.inspect},
            title: "Easy Chana Masala",
            instructions: "Combine and heat"
          }
        ) {
          recipe {
            title
            instructions
          }

          errors {
            message
          }
        }
      }
    GQL

    refute results["errors"]
    assert_equal results.dig("data", "updateRecipe", "errors").size, 0
    recipe = results.dig("data", "updateRecipe", "recipe")

    assert_equal "Easy Chana Masala", recipe.dig("title")
    assert_equal "Combine and heat", recipe.dig("instructions")
  end

  test "updateRecipe with ingredient updating" do
    results = RailsGraphqlRecipesSchema.execute(<<~GQL)
      mutation {
        updateRecipe(
          input: {
            id: #{recipes(:chana_masala).id.inspect},
            title: "Easy Chana Masala",
            instructions: "Combine and heat",
            ingredients: [
              {
                title: "Bag of tasty bite",
                position: 0
              },
              {
                title: "Steamed rice",
                position: 1
              }
            ]
          }
        ) {
          recipe {
            title
            instructions
            ingredients {
              title
            }
          }
        }
      }
    GQL

    recipe = results.dig("data", "updateRecipe", "recipe")

    refute results["errors"]
    assert_equal "Easy Chana Masala", recipe.dig("title")
    assert_equal "Combine and heat", recipe.dig("instructions")
  end

  test "deleteRecipe deletes a recipe" do
    assert_equal Recipe.where(id: recipes(:chana_masala).id).count, 1
    results = RailsGraphqlRecipesSchema.execute(<<~GQL)
      mutation {
        deleteRecipe(
          input: {
            id: #{recipes(:chana_masala).id.inspect}
          }
        ) {
          recipe { id }
          errors {
            message
          }
        }
      }
    GQL

    id = results.dig("data", "deleteRecipe", "recipe", "id")

    refute results["errors"]
    assert_equal results.dig("data", "deleteRecipe", "errors").size, 0
    assert_equal recipes(:chana_masala).id, id
    assert_equal Recipe.where(id: recipes(:chana_masala).id).count, 0
  end
end
