# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150620064132) do

  create_table "journeys", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "trip_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "trips", force: :cascade do |t|
    t.string   "title"
    t.datetime "start_time"
    t.datetime "end_time"
    t.text     "description"
    t.string   "trip_image_url"
    t.string   "origin_lat"
    t.string   "origin_lng"
    t.string   "dest_lat"
    t.string   "dest_lng"
    t.boolean  "hotel"
    t.boolean  "food"
    t.boolean  "entertainment"
    t.boolean  "monument"
    t.boolean  "nature"
    t.boolean  "camping"
    t.integer  "radius"
    t.boolean  "public"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.text     "start_from"
    t.text     "go_to"
    t.integer  "user_id"
  end

  add_index "trips", ["user_id"], name: "index_trips_on_user_id"

  create_table "users", force: :cascade do |t|
    t.string   "username"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "waypoints", force: :cascade do |t|
    t.string   "lat"
    t.string   "lng"
    t.integer  "trip_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "waypoints", ["trip_id"], name: "index_waypoints_on_trip_id"

end
