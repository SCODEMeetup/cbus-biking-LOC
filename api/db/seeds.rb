# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Report.create([{ lat: 39.98460665, long: -82.91922267, reason: 'crash' },
               { lat: 39.95800777, long: -82.97354855, reason: 'road conditions' },
               { lat: 39.86176882, long: -83.17015774, reason: 'traffic' },
               { lat: 39.920211, long: -82.832104, reason: 'construction' },
               { lat: 39.9311316, long: -82.9646174, reason: 'safety' }])
