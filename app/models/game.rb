class Game < ActiveRecord::Base
  # Remember to create a migration!
  has_many :matches
  mas_many :users, through: :matches
end
