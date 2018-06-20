class CreateIngredients < ActiveRecord::Migration[5.2]
  def change
    create_table :ingredients, id: :uuid do |t|
      t.string :title, null: false, index: true
      t.integer :position, null: false, index: true
      t.references :recipe, foreign_key: { on_delete: :cascade }, type: :uuid, null: false

      t.timestamps
    end
  end
end
