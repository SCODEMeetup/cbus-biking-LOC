# frozen_string_literal: true

module Api
  # Exposes the Report location and reason data
  class ReportsController < ApplicationController
    before_action :set_report, only: %i[show destroy]
    before_action :set_headers

    # GET reports/:id
    def show
      render json: @report
    end

    def index
      render json: Report.all
    end

    # POST /reports
    def create
      @report = Report.new(report_params)
      if @report.save
        render json: @report, status: :created,
               location: api_report_url(@report)
      else
        render json: @report.errors, status: :unprocessable_entity
      end
    end

    # DELETE reports/:id
    def destroy
      return unless @report

      @report.destroy
    end

    def set_report
      @report = Report.find_by(id: params[:id])
    end

    def set_headers
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, DELETE, GET'
      headers['Access-Control-Request-Method'] = '*'
    end

    def report_params
      params.require(:report).permit(:lat, :long, :reason)
    end
  end
end
