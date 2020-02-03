require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

new_status = 'paused'
test_id = <SYNTHETICS_TEST_PUBLIC_ID>

dog.start_pause_synthetics_test('test_id' => test_id, 'new_status'=> new_status)
