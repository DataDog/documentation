require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

slo_ids = ['<YOUR_SLO_ID>']
dog.can_delete_service_level_objective(slo_ids)
