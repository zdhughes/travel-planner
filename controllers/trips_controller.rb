class TripsController < ApplicationController
  def index
    trips = Trip.order("created_at DESC")
    render json: trips
  end

  def create
    trip = Trip.create(trip_param)
    render json: trip
  end

  def update
    trip = Trip.find(params[:id])
    trip.update_attributes(trip_param)
    render json: trip
  end

  def destroy
    trip = Trip.find(params[:id])
    trip.destroy
    head :no_content, status: :ok
  end

  private
  def trip_param
    params.require(:trip).permit(:title, :begins, :ends, :airfare_booked, :hotel_booked, :work_calendar_updated, :notes)
  end
end
