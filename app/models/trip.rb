class Trip < ActiveRecord::Base
  # has_many :journeys
  has_many :waypoints
  # has_many :users, through: :journeys
  belongs_to :user

accepts_nested_attributes_for :waypoints

end
