---
title: Query the Infrastructure List with the API

aliases:
  - /developers/faq/query-the-infrastructure-list-via-the-api
  - /developers/guide/query-the-infrastructure-list-via-the-api/
---

If you're a more advanced Datadog user, you may want to use [the API][1] to query general data about infrastructure—the kind of data that you can find in your [infrastructure list][2] or the [host map][3]. You can do this with an API GET request on the [api/v1/hosts][4] endpoint.

## Examples

If, for example, you want to query general data from all your hosts that include the `env:prod` and `role:elasticsearch` tags, use the `tag:` prefix for an exact match. You can make the following API call with Python's `requests` library:

```python
import requests
s = requests.session()
s.params = {
  'api_key': '<DATADOG_API_KEY>',
  'application_key': '<YOUR_APPLICATION_KEY>',
  'filter': 'tag:env:prod,tag:role:elasticsearch'
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

## Filter syntax

The `filter` parameter takes one or more terms, separated by spaces or commas. A host must match all terms.

| Term | Matches | Example |
|---|---|---|
| `<text>` | Partial, case-insensitive match on host name, alias, tags, apps, and Agent metadata. Text shorter than 3 characters only matches a field that is exactly that text. | `web-prod` |
| `tag:<key>:<value>` | Hosts with that exact tag | `tag:env:prod` |
| `field:apps:<app>` | Hosts running that app | `field:apps:nginx` |
| `field:metadata_platform:<value>` | Hosts with that platform. The same syntax works for `metadata_agent_version`, `metadata_machine`, and `metadata_processor`, for example `field:metadata_machine:<value>`. | `field:metadata_platform:linux` |
| `exists:tag:<key>` | Hosts that have a tag with that key | `exists:tag:team` |
| `exists:field:<field>` | Hosts with a non-empty value for that field | `exists:field:metadata_platform` |
| `!<term>` | Excludes hosts that match the term | `!tag:env:staging` |

Filters do not support `AND`, `OR`, or `NOT` keywords or `*` wildcards. To look up a single host, filter on its full host name and check `name`, `host_name`, and `aliases` in the response. A search with no match returns an empty `host_list`, not a `404`.

[1]: /api/
[2]: https://app.datadoghq.com/infrastructure
[3]: https://app.datadoghq.com/infrastructure/map
[4]: https://docs.datadoghq.com/api/v1/hosts/
