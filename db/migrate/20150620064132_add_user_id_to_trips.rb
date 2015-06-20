class AddUserIdToTrips < ActiveRecord::Migration
  def change
    add_reference :trip, :user, index: true
  end
end
