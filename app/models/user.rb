class User < ActiveRecord::Base
  
  has_secure_password
  
  has_many :journeys
  has_many :trips
end
