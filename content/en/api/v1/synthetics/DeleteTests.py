from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

test_ids = ['<SYNTHETICS_TEST_PUBLIC_ID_1>','<SYNTHETICS_TEST_PUBLIC_ID_2>']

initialize(**options)

api.Synthetics.delete_test(id=test_ids)
