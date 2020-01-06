from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)

# Add tags to a host
hostname='<YOUR_HOSTNAME>'
hosts = api.Hosts.search(q='hosts:')

for host in hosts['host_list']:
    if host['name'] == hostname:
        api.Tag.create(host['name'], tags=['<KEY>:<VALUE>'])
