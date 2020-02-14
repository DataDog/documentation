from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)

new_status = 'paused'
test_id = '<SYNTHETICS_TEST_PUBLIC_ID>'

api.Synthetics.start_or_pause_test(id=id, new_status=test_id)