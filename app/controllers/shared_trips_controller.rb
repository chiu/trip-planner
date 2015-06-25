class SharedTripsController < ApplicationController

 def index

  @trips = Trip.all
  render layout: false

end


def send_invitations

  @users = User.all
   render layout: false

end

end
