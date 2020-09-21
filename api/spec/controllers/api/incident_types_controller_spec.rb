# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::IncidentTypesController, type: :request do
  it 'returns all incident types' do
    10.times.map do
      create(:incident_type)
    end
    get '/api/incident_types'
    expect(JSON.parse(response.body).size).to eq(10)
    expect(response.status).to eq 200
  end

  it 'shows an incident type' do
    incident_type = create(:incident_type)
    get '/api/incident_types/' + incident_type.id.to_s
    response_body = JSON.parse(response.body)
    expect(response_body['id']).to eq incident_type.id
    expect(response.status).to eq 200
  end

  it 'creates a incident_type with valid params' do
    valid_params =
      { description: 'lorem ispso ...',
        incident_type: { description: 'lorem ipso ...' } }
    post '/api/incident_types', params: valid_params
    expect(response.content_type).to eq('application/json; charset=utf-8')
    expect(response.status).to eq(201)
  end

  it 'does not create a incident_type with missing params' do
    post '/api/incident_types', params: {}
    expect(response.content_type).to eq('application/json; charset=utf-8')
    response_body = JSON.parse(response.body)
    expect(response_body['message']).to include('param is missing')
    expect(response.status).to eq(404)
  end

  it 'deletes an incident_type' do
    incident_type = create(:incident_type)
    delete '/api/incident_types/' + incident_type.id.to_s
    expect(response.status).to eq(204)
  end

  it 'updates an incident_type' do
    incident_type = create(:incident_type)
    update_params =
      { description: 'description modified',
        incident_type: { description: 'description modified' } }
    put '/api/incident_types/' + incident_type.id.to_s, params: update_params
    incident_type.reload
    expect(incident_type.description).to eq(update_params[:description])
    expect(response.status).to eq(204)
  end

  it 'returns error message when incident_type is not found in database' do
    get '/api/incident_types/404'
    incident_type_response = JSON.parse(response.body)
    expect(incident_type_response['status']).to eq(404)
    expect(incident_type_response['error']).to eq('record_not_found')
    expect(incident_type_response['message']).not_to be(nil)
  end

  it 'returns error message if deleting record dependent on reports' do
    incident_type = create(:incident_type)
    incident_severity = create(:incident_severity)
    create(:report, incident_type_id: incident_type.id,
                    incident_severity_id: incident_severity.id)

    delete '/api/incident_types/' + incident_type.id.to_s

    incident_type_response = JSON.parse(response.body)
    expect(incident_type_response['status']).to eq(409)
    expect(incident_type_response['error']).to eq('conflict')
    expect(incident_type_response['message']).not_to be(nil)
  end
end
