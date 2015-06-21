class TripsController < ApplicationController
def index
  @trips = Trip.all
end

def front_page
  @trip = Trip.new
end



def show
  @trip = Trip.find(params[:id])
end

def new
  @trip = Trip.new
waypoint = @trip.waypoints.build
end

def edit

# @new_waypoint_note = Waypoint.new
#   @trip = Trip.find(params[:id])
#   @trip.new_waypoint_note.build

# @trip = Trip.find(params[:id])
# @trip.waypoints.build


@trip = Trip.find(params[:id])
@trip.build_new_waypoint
end

def create
  @trip = Trip.new(trip_params)
# @trip.user_id = current_user.id
@trip.user_id = current_user.id
# @trip.user_id = current_user.id

if @trip.save
  redirect_to(@trip)
else
  render :new
end
end

def save
  @trip.user_id = current_user.id
end

def update
  @trip = Trip.find(params[:id])

  if @trip.update_attributes(trip_params)
    redirect_to trip_path(@trip)
  else
    render :edit
  end
end

def destroy
#     @trip = Trip.find(params[:id])
#     @trip.destroy

@trip = Trip.last
redirect_to trip_path(@trip)
end

protected

def trip_params
  params.require(:trip).permit(
    :title, :start_time, :end_time, :description, :trip_image_url, :origin_lat, :origin_lng, :dest_lat, :dest_lng, :hotel, :food, :entertainment, :monument, :nature, :camping, :radius, :public, :start_from, :go_to, :original_id, :user_id
    )
end
end





