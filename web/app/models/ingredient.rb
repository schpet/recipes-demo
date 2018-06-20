class Ingredient < ApplicationRecord
  belongs_to :recipe, required: false

  validates :title, presence: true
  validates :position, presence: true, strict: true
end
