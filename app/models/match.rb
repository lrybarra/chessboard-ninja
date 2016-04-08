class Match < ActiveRecord::Base
  validates_presence_of :game_id, :user_id, :has_won?

  belongs_to :user
  belongs_to :game

end
