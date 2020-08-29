# frozen_string_literal: true

FactoryBot.define do
  factory :report do
    lat { Faker::Address.latitude }
    long { Faker::Address.longitude }
    reason { Faker::Quote.singular_siegler }
  end
end
