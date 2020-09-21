# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::IncidentSeveritiesController, type: :request do
  it 'returns all incident types' do
    10.times.map do
      create(:incident_severity)
    end
    get '/api/incident_severities'
    expect(JSON.parse(response.body).size).to eq(10)
    expect(response.status).to eq 200
  end

  it 'shows an incident type' do
    incident_severity = create(:incident_severity)
    get '/api/incident_severities/' + incident_severity.id.to_s
    response_body = JSON.parse(response.body)
    expect(response_body['id']).to eq incident_severity.id
    expect(response.status).to eq 200
  end

  it 'creates a incident_severity with valid params' do
    valid_params =
      { description: 'lorem ispso ...',
        incident_severity: { description: 'lorem ipso ...' } }
    post '/api/incident_severities', params: valid_params
    expect(response.content_type).to eq('application/json; charset=utf-8')
    expect(response.status).to eq(201)
  end

  it 'does not create a incident_severity with missing params' do
    post '/api/incident_severities', params: {}
    expect(response.content_type).to eq('application/json; charset=utf-8')
    response_body = JSON.parse(response.body)
    expect(response_body['message']).to include('param is missing')
    expect(response.status).to eq(404)
  end

  it 'deletes an incident_severity' do
    incident_severity = create(:incident_severity)
    delete '/api/incident_severities/' + incident_severity.id.to_s
    expect(response.status).to eq(204)
  end

  it 'updates an incident_severity' do
    incident_severity = create(:incident_severity)
    update_params =
      { description: 'description modified',
        incident_severity: { description: 'description modified' } }
    put '/api/incident_severities/' + incident_severity.id.to_s,
        params: update_params
    incident_severity.reload
    expect(incident_severity.description).to eq(update_params[:description])
    expect(response.status).to eq(204)
  end

  it 'returns error message when incident_severity is not found in database' do
    get '/api/incident_severities/404'
    incident_severity_response = JSON.parse(response.body)
    expect(incident_severity_response['status']).to eq(404)
    expect(incident_severity_response['error']).to eq('record_not_found')
    expect(incident_severity_response['message']).not_to be(nil)
  end

  it 'returns error message if deleting record dependent on reports' do
    incident_type = create(:incident_type)
    incident_severity = create(:incident_severity)
    create(:report, incident_type_id: incident_type.id,
                            incident_severity_id: incident_severity.id)

    delete '/api/incident_severities/' + incident_severity.id.to_s

    incident_severity_response = JSON.parse(response.body)
    expect(incident_severity_response['status']).to eq(409)
    expect(incident_severity_response['error']).to eq('conflict')
    expect(incident_severity_response['message']).not_to be(nil)
  end
end
