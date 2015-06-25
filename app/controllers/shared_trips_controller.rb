class SharedTripsController < ApplicationController

 def index

  @trip = Trip.all
  render layout: false

end



end
