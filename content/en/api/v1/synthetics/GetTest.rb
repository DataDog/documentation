require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

test_id = '<SYNTHETICS_TEST_PUBLIC_ID>'

dog = Dogapi::Client.new(api_key, app_key)

dog.get_synthetics_test('test_id'  => test_id)
