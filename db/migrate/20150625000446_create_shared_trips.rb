class CreateSharedTrips < ActiveRecord::Migration
  def change
    create_table :shared_trips do |t|
      t.references :trip, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true
      t.integer :shared_id

      t.timestamps null: false
    end
  end
end
