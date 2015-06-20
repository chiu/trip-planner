class Trip < ActiveRecord::Base
  # has_many :journeys
  has_many :waypoints
  # has_many :users, through: :journeys
  belongs_to :user
end
