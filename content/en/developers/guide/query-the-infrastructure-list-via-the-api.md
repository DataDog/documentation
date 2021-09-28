---
title: Query the Infrastructure List with the API
kind: guide
aliases:
  - /developers/faq/query-the-infrastructure-list-via-the-api
---

If you're a more advanced Datadog user, you may want to use [the API][1] to query general data about infrastructure—the kind of data that you can find in your [infrastructure list][2] or the [host map][3]. You can do this with an API GET request on the [api/v1/hosts][4] endpoint.

## Examples

If, for example, you want to query general data from all your hosts that include the `env:prod` and `role:elasticsearch` tag, you can make the following API call with Python's `requests` library:

```python
import requests
s = requests.session()
s.params = {
  'api_key': '<DATADOG_API_KEY>',
  'application_key': '<YOUR_APPLICATION_KEY>',
  'filter': 'env:prod,role:elasticsearch'
}
infra_link = 'https://app.datadoghq.com/api/v1/hosts'
infra_content = s.request(
  method='GET', url=infra_link, params=s.params
).json()
```

To iterate over all the hosts in your infrastructure, use the following:

```python
import requests
def iterate_all_hosts():
  s = requests.session()
  s.params = {
    'api_key': '<DATADOG_API_KEY>',
    'application_key': '<YOUR_APPLICATION_KEY>',
    'include_muted_hosts_data': False,
    'include_hosts_metadata': False,
    'start': 0
  }
  infra_link = 'https://app.datadoghq.com/api/v1/hosts?count=1000'
  while True:
    response = s.request(method='GET', url=infra_link, params=s.params).json()
    for host in response['host_list']:
        yield host
    if response['total_returned'] == 0:
        return
    s.params['start'] += response['total_returned']

for host in iterate_all_hosts():
    print(host['host_name'])
```

[1]: /api/
[2]: https://app.datadoghq.com/infrastructure
[3]: https://app.datadoghq.com/infrastructure/map
[4]: https://docs.datadoghq.com/api/v1/hosts/
