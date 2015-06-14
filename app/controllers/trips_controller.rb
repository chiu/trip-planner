class TripsController < ApplicationController

      root to: "home#index"
      
      def index
        @trips = Trip.all
      end

      def show
        @trip = Trip.find(params[:id])
      end

      def new
        @trip = Trip.new
      end

      def edit
        @trip = Trip.find(params[:id])
      end

      def create
        @trip = Trip.new(trip_params)

        if @trip.save
          redirect_to trips_path
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
          :title, :start_time, :end_time, :description, :trip_image_url
        )
      end

    end