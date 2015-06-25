class Trip < ActiveRecord::Base
  # attr_accessible :waypoints_attributes
  has_many :waypoints
  belongs_to :user
  has_many :users
  has_one :new_waypoint, class_name: 'Waypoint'

  has_many :shared_trips, class_name:'SharedTrip'
  accepts_nested_attributes_for :new_waypoint
  accepts_nested_attributes_for :shared_trips

end
