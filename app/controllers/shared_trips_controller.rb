class SharedTripsController < ApplicationController


  before_filter :load_trip


  def index
    @shared_trips = SharedTrip.where(trip_id: params[:trip_id])
    @trips = Trip.all
    @users = User.all
# @users = User.all
# @users = SharedTrip.users
# Client.where(first_name: 'Lifo')


# @user_array = []


# @shared_trips.each do |shared_trip| 
#   @user_array.push(shared_trip.)
# end


render layout: false

end


def new

  @users = User.all
# @trip = Trip.find(params[:trip_id])
@shared_trip = SharedTrip.new
render layout: false

end


def create
# @shared_trip = SharedTrip.new(shared_trip_params)
# @shared_trip.user_id = params[:user_id]
# @shared_trip.trip_id = params[:trip_id]
# @shared_trip.user_id = params[:user_id]

@shared_trip = @trip.shared_trips.build(shared_trip_params)

if @shared_trip.save
  redirect_to trip_shared_trips_path
else
  render :new
end
end

protected
def load_trip
  @trip = Trip.find(params[:trip_id])

end
def shared_trip_params
  params.require(:shared_trip).permit(
    :shared_id, :user_id, :trip_id
    )
end

end
