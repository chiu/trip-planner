class WaypointsController < ApplicationController
skip_before_action :verify_authenticity_token
before_filter :load_trip
respond_to :json

  def index
    # @waypoints = Waypoint.all
    # json Waypoint.all
    @waypoints = Waypoint.where(trip_id: params[:trip_id])
    render json: @waypoints
  end

  def show
    @waypoint = Waypoint.find(params[:id])
  end

  def new
    @waypoint = Waypoint.new
  # @waypoint = Waypoint.new
end

def edit
  @waypoint = Waypoint.find(params[:id])
end

# def create
#   @waypoint = Waypoint.new(waypoint_params)

#   if @waypoint.save
#     # redirect_to waypoints_path
#     render :new
#   else
#     render :new
#   end
# end

def create
  @waypoint = @trip.waypoints.build(waypoint_params)
    # @waypoint.user_id = current_user.id

    if @waypoint.save
      redirect_to @trip, notice: "Review created successfully"
    else
      render :new
    end
  end



  def update
    @waypoint = Waypoint.find(params[:id])

    if @waypoint.update_attributes(waypoint_params)
      redirect_to waypoint_path(@waypoint)
    else
      render :edit
    end
  end

  def destroy
    @waypoint = Waypoint.find(params[:id])
    @waypoint.destroy
    redirect_to waypoints_path
  end

  protected

  def load_trip
    @trip = Trip.find(params[:trip_id])
  end

  def waypoint_params
    params.require(:waypoint).permit(
      :lat, :lng, :trip_id, :created_at, :updated_at, :address,
      )
  end



end
