from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

test_id = '<SYNTHETICS_TEST_PUBLIC_ID>'
result_id = '<TEST_RESULT_ID>'

initialize(**options)

api.Synthetics.get_result(id=test_id, result_id=result_id)
