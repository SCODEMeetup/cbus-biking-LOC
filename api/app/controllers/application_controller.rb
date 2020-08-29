# frozen_string_literal: true

# Application controllers inherit from this
class ApplicationController < ActionController::API
  rescue_from ActionController::ParameterMissing do
    render json: { status: 'error', code: 400, message: 'Missing Parameter' }
    response.status = 400
  end
end
