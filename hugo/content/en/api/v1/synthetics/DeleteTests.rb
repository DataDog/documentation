require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

test_ids = ['<SYNTHETICS_TEST_PUBLIC_ID_1>','<SYNTHETICS_TEST_PUBLIC_ID_2>']

dog.delete_synthetics_tests('test_ids' => test_ids)
