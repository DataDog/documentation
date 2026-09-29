from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

test_id = '<SYNTHETICS_TEST_PUBLIC_ID>'

initialize(**options)

api.Synthetics.get_test(id=test_id)