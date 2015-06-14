class CreateJourneys < ActiveRecord::Migration
  def change
    create_table :journeys do |t|
      t.integer :user_id
      t.integer :trip_id
      t.datetime :created_at

      t.timestamps null: false
    end
  end
end
