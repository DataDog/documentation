---
title: Query the Infrastructure List via the API
kind: guide
aliases:
  - /developers/faq/query-the-infrastructure-list-via-the-api
---

More advanced Datadog users may sometimes want to use [the API][1] to query general data about their infrastructure—the kind of data that you can find in your [infrastructure list][2] or the [host map][3]. You can do this via an API GET request on the `reports/v2/overview` endpoint.

## Overview

This endpoint takes the following required parameters:

* **api_key**: string; your Datadog API key.
* **application_key** strying; your Datadog application key.

By default, this endpoint queries all the data in your infrastructure list, which can be a very large response indeed. You can use any of the following optional parameters to filter down the content that you receive:

* **tags**: string; a comma-delimited list of what host tags you want to filter down by (uses AND logic; returns data only for those hosts that have _all_ of these tags associated with them).
* **hostnames[]**: list of strings; a list of the specific hostnames you want to query data from.
* **with_apps**: Boolean; if true, displays the applications (integrations) that are associated with a given host.
* **with_mute_status**: Boolean; if true, displays whether the host is muted by a downtime or not.
* **with_sources**: Boolean; if true, returns a list of sources from which metrics are reported for this host. For example, you might see 'aws', 'agent', or 'azure' in this list.
* **with_aliases**: Boolean; if true, displays aliases for this host.
* **with_meta**: Boolean; if true, includes metadata about the host with things like disk information, IP addresses, etc.

The response to this API call is in JSON.

## Examples

If, for example, you want to query general data from all your hosts that include the `env:prod` and `role:elasticsearch` tag, you can make the following API call with Python's `requests` library:

```python
import requests
s = requests.session()
s.params = {
  'api_key': 'DATADOG_API_KEY',
  'application_key': 'YOUR_APPLICATION_KEY',
  'tags': 'env:prod,role:elasticsearch'
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

[1]: /api
[2]: https://app.datadoghq.com/infrastructure
[3]: https://app.datadoghq.com/infrastructure/map
