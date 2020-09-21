# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    resources :reports, only: %i[index show create destroy]
    resources :incident_types
    resources :incident_severities
  end
end
