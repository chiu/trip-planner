class User < ActiveRecord::Base
  has_many :journeys
  has_many :trips, through: :journeys 
end
