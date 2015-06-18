class TripsController < ApplicationController

# root to: "trips#index"

def index
  @trips = Trip.all
end

def front_page
  @trip = Trip.new
end

def setup
  @trip = Trip.new trip_params
  # same as create but not saving it
  render :new
end


def show
  # @trip = Trip.find(params[:id])
  render :show
end

def new
  @trip = Trip.new
  # @waypoint = Waypoint.new
  # @waypoint.trip_id = params[:id]
end

def edit
  @trip = Trip.find(params[:id])
end

def create
  @trip = Trip.new(trip_params.slice([:start_from, :go_to]))

  if @trip.save
    redirect_to trips_path
    # render :new
  else
    render :new
  end
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
  @trip = Trip.find(params[:id])
  @trip.destroy
  redirect_to trips_path
end

protected

def trip_params
  params.require(:trip).permit(

    :title, :start_time, :end_time, :description, :trip_image_url, :origin_lat, :origin_lng, :dest_lat, :dest_lng, :hotel, :food, :entertainment, :monument, :nature, :camping, :radius, :public, :start_from, :go_to
    )
end
end


