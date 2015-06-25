class SharedTripsController < ApplicationController
  def index
    @trips = Trip.all
  end
  
end
