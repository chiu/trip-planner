class AddStartFromAndGoToTrips < ActiveRecord::Migration
  def change
    add_column :trips, :start_from, :text
    add_column :trips, :go_to, :text
  end
end
