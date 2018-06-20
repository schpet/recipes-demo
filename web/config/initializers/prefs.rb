Rails.application.config.active_record.schema_format = :sql

Rails.application.config.generators do |g|
  # g.fixture_replacement :factory_bot, dir: "spec/factories"
  g.assets false
  g.helper false
  g.orm :active_record, primary_key_type: :uuid
end
