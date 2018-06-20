class CreateRecipes < ActiveRecord::Migration[5.2]
  def change
    enable_extension 'pgcrypto'
    create_table :recipes, id: :uuid do |t|
      t.string :title, null: false
      t.text :instructions, null: false

      t.timestamps
    end
  end
end
