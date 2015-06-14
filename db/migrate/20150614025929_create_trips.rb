class CreateTrips < ActiveRecord::Migration
  def change
    create_table :trips do |t|
      t.string :title
      t.datetime :start_time
      t.datetime :end_time
      t.text :description
      t.string :trip_image_url
      t.string :origin_lat
      t.string :origin_lng
      t.string :dest_lat
      t.string :dest_lng
      t.boolean :hotel
      t.boolean :food
      t.boolean :entertainment
      t.boolean :monument
      t.boolean :nature
      t.boolean :camping
      t.integer :radius
      t.boolean :public


      t.timestamps null: false
    end
  end
end
