class WaypointsController < ApplicationController



def index
  @waypoints = Waypoint.all
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

def create
  @waypoint = Waypoint.new(waypoint_params)

  if @waypoint.save
    # redirect_to waypoints_path
    render :new
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

def waypoint_params
  params.require(:waypoint).permit(
        :lat, :lng, :trip_id, :created_at, :updated_at, 
    )
end
end
