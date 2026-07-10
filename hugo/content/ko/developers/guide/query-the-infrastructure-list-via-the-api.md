---
aliases:
- /ko/developers/faq/query-the-infrastructure-list-via-the-api
title: API를 사용한 인프라스트럭처 목록 쿼리
---

고급 Datadog 사용자는 [API][1]을 사용하여 [인프라스트럭처 목록][2] 또는 [호스트 맵][3]에서 찾을 수 있는 인프라스트럭처 일반 데이터를 쿼리할 수 있습니다. [api/v1/hosts][4] 엔드포인트에서 API GET 요청을 사용하여 이 작업을 수행할 수 있습니다.

## 예시

예를 들어 `env:prod` 및 `role:elasticsearch`태그를 포함하는 모든 호스트에서 일반 데이터를 쿼리하려면 파이썬(Python)의 `requests`라이브러리를 사용하여 다음 API 호출을 수행할 수 있습니다:

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

인프라스트럭처의 모든 호스트에 대해 반복하려면 다음을 사용하세요:

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

[1]: /ko/api/
[2]: https://app.datadoghq.com/infrastructure
[3]: https://app.datadoghq.com/infrastructure/map
[4]: https://docs.datadoghq.com/ko/api/v1/hosts/