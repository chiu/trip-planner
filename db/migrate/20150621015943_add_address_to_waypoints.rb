class AddAddressToWaypoints < ActiveRecord::Migration
  def change
    add_column :waypoints, :address, :string
  end
end
