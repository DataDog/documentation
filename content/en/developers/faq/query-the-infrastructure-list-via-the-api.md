---
title: Query the Infrastructure List via the API
kind: faq
---

More advanced Datadog users may sometimes want to use [the API][1] to query general data about their infrastructure--the kind of data that you can find in your [infrastructure list][2] or the [host map][3]. You can do this via an API GET request on the `reports/v2/overview` endpoint.

## Overview 

This endpoint takes the following required parameters:

* **api_key**: string. Your Datadog API key
* **application_key**: string. Your Datadog Application key

By default, this endpoint queries all the data in your infrastructure list, which can be a very large response indeed. You can use any of the following optional parameters to filter down the content that you receive:

* **tags**: string. A comma-delimited list of what host tags you want to filter down by (uses AND logic; returns data only for those hosts that have all these tags associated with them)
* **hostnames[]**: list of strings. A list of those specific hostnames you want to query data from
* **with_apps**: boolean. If true, displays the applications(integrations) that are associated with a given host.
with_mute_status: boolean. If true, displays whether the host is muted by a downtime or not
* **with_sources**: boolean. If true, returns a list of sources from which metrics are reported for this host. For example, you might see 'aws', or 'agent', or 'azure' in this list.
* **with_aliases**: boolean. If true, displays aliases for this host. Here is information about aliases and what they are.
* **with_meta**: boolean. If true, includes metadata about the host with things like disk information/ IP addresses/ etc

The response to this API call is in JSON.

## Examples

If, for example, you wanted to query general data from all your hosts that include the env:prod and role:elasticsearch tag, you could make the following API call with Python's requests library:

```python
import requests
s = requests.session()
s.params = {
    'api_key': 'YOUR_API_KEY',
    'application_key': 'YOUR_APPLICATION_KEY',
    'tags': 'env:prod,role:elasticsearch'
}
infra_link = 'https://app.datadoghq.com/reports/v2/overview'
infra_content = s.request(
    method='GET', url=infra_link, params=s.params
).text
```

Alternatively, if you wanted to query the same data for only hosts with hostnames "A", "B", and "C", you could make the following API call:

```python
import requests
s = requests.session()
s.params = {
    'api_key': 'YOUR_API_KEY',
    'application_key': 'YOUR_APPLICATION_KEY',
    'hostnames[]': ['A', 'B', 'C']
}
infra_link = 'https://app.datadoghq.com/reports/v2/overview'
infra_content = s.request(
    method='GET', url=infra_link, params=s.params
).text
```

[1]: /api
[2]: https://app.datadoghq.com/infrastructure
[3]: https://app.datadoghq.com/infrastructure/map
