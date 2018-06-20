class Recipe < ApplicationRecord
  has_many :ingredients, -> { order(position: :asc) }

  accepts_nested_attributes_for :ingredients

  validates :title, presence: true
end
