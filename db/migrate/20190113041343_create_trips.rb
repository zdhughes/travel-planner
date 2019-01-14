class CreateTrips < ActiveRecord::Migration[5.2]
  def change
    create_table :trips do |t|
      t.string :title
      t.string :begins
      t.string :ends
      t.boolean :airfare_booked
      t.boolean :hotel_booked
      t.boolean :work_calendar_updated
      t.string :notes

      t.timestamps
    end
  end
end
