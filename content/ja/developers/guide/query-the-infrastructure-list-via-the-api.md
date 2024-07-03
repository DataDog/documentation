---
aliases:
- /ja/developers/faq/query-the-infrastructure-list-via-the-api
title: Query the Infrastructure List with the API
---

上級の Datadog ユーザーは、[API][1] を使用して、ユーザーのインフラストラクチャーに関する一般データを問い合わせることができます。問い合わせることができるのは、[インフラストラクチャーリスト][2]や[ホストマップ][3]に表示されるデータです。それには、[api/v1/hosts][4] エンドポイントで API GET リクエストを行います。

## 例

たとえば、`env:prod` および `role:elasticsearch` タグを含むすべてのホストに一般データを問い合わせる場合は、Python の `requests` ライブラリを使用して、以下のような API 呼び出しを作成します。

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

インフラストラクチャー内のすべてのホストを反復処理するには、次を使用します。

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

[1]: /ja/api/
[2]: https://app.datadoghq.com/infrastructure
[3]: https://app.datadoghq.com/infrastructure/map
[4]: https://docs.datadoghq.com/ja/api/v1/hosts/