class Trip < ActiveRecord::Base
# attr_accessible :waypoints_attributes
has_many :waypoints
belongs_to :user
has_many :journeys
# has_many :users, through: :journeys
has_many :users, through: :participants
# participants is join table with one column is trip id, other column is user id. 


has_one :new_waypoint, class_name: 'Waypoint'
accepts_nested_attributes_for :new_waypoint

end



