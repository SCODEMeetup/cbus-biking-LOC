# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::ReportsController, type: :request do
  it 'returns all reports' do
    10.times.map do
      incident_type = create(:incident_type)
      incident_severity = create(:incident_severity)
      create(:report, incident_type_id: incident_type.id,
                       incident_severity_id: incident_severity.id)
    end
    get '/api/reports'
    expect(JSON.parse(response.body).size).to eq(10)
    expect(response.status).to eq 200
  end

  it 'shows a report' do
    incident_type = create(:incident_type)
    incident_severity = create(:incident_severity)
    report = create(:report, incident_type_id: incident_type.id,
                             incident_severity_id: incident_severity.id)
    get '/api/reports/' + report.id.to_s
    response_body = JSON.parse(response.body)
    expect(response_body['id']).to eq report.id
    expect(response.status).to eq 200
  end

  it 'creates a report with valid params' do
    incident_type = create(:incident_type)
    incident_severity = create(:incident_severity)
    valid_params =
      { 'lat' => '41.333', 'long' => '-80.231',
        'incident_datetime' => Time.now.utc.iso8601,
        'incident_text' => 'lorem ipso...',
        'incident_type_id' => incident_type.id,
        'incident_severity_id' => incident_severity.id,
        'report' => { 'lat' => '41.333', 'long' => '-80.231',
                      'incident_datetime' => Time.now.utc.iso8601,
                      'incident_text' => 'lorem ipso...',
                      'incident_type_id' => incident_type.id,
                      'incident_severity_id' => incident_severity.id } }
    post '/api/reports', params: valid_params
    expect(response.content_type).to eq('application/json; charset=utf-8')
    expect(response.status).to eq(201)
  end

  it 'does not create a report with missing params' do
    post '/api/reports', params: {}
    expect(response.content_type).to eq('application/json; charset=utf-8')
    response_body = JSON.parse(response.body)
    expect(response_body['message']).to include('param is missing')
    expect(response.status).to eq(404)
  end

  it 'deletes a report' do
    incident_type = create(:incident_type)
    incident_severity = create(:incident_severity)
    report = create(:report, incident_type_id: incident_type.id,
                             incident_severity_id: incident_severity.id)
    delete '/api/reports/' + report.id.to_s
    expect(response.status).to eq(204)
  end

  it 'returns error message when report is not found in database' do
    get '/api/reports/404'
    event_date_response = JSON.parse(response.body)
    expect(event_date_response['status']).to eq(404)
    expect(event_date_response['error']).to eq('record_not_found')
    expect(event_date_response['message']).not_to be(nil)
  end
end
