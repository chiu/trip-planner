class CreateWaypoints < ActiveRecord::Migration
  def change
    create_table :waypoints do |t|
      t.string :lat
      t.string :lng
      t.references :trip, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
