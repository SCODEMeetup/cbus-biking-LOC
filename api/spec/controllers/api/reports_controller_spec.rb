# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::ReportsController, type: :request do
  it 'returns all reports' do
    create_list(:report, 10)
    get '/api/reports'
    expect(JSON.parse(response.body).size).to eq(10)
    expect(response.status).to eq 200
  end

  it 'shows a report' do
    report = create(:report)
    get '/api/reports/' + report.id.to_s
    response_body = JSON.parse(response.body)
    expect(response_body['id']).to eq report.id
    expect(response.status).to eq 200
  end

  it 'creates a report with valid params' do
    valid_params = { 'lat' => '41.333', 'long' => '-80.231',
                     'reason' => 'crash', 'report' =>
                     { 'lat' => '41.333', 'long' => '-80.231',
                       'reason' => 'crash' } }
    post '/api/reports', params: valid_params
    expect(response.content_type).to eq('application/json; charset=utf-8')
    expect(response.status).to eq(201)
  end

  it 'does not create a report with missing params' do
    post '/api/reports', params: { 'lat' => '41.333', 'long' =>
                                   '-80.231', 'reason' => 'crash' }
    expect(response.content_type).to eq('application/json; charset=utf-8')
    response_body = JSON.parse(response.body)
    expect(response_body['status']).to eq('error')
    expect(response.status).to eq(400)
  end

  it 'deletes a report' do
    report = create(:report)
    delete '/api/reports/' + report.id.to_s
    expect(response.status).to eq(204)
  end
end
