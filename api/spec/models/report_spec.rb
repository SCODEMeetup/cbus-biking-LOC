# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Report, type: :model do
  before(:all) do
    @report = create(:report)
  end

  it 'is valid with valid attributes' do
    expect(@report).to be_valid
  end
end
