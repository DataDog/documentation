---
title: API からのインフラストラクチャーリストのクエリ
kind: ガイド
aliases:
  - /ja/developers/faq/query-the-infrastructure-list-via-the-api
---
上級の Datadog ユーザーは、[API][1] を使用して、ユーザーのインフラストラクチャーに関する一般データを問い合わせることができます。問い合わせることができるのは、[インフラストラクチャーリスト][2]や[ホストマップ][3]に表示されるデータです。それには、`reports/v2/overview` エンドポイントに対して API GET リクエストを行います。

## 概要

このエンドポイントには、以下のパラメーターが必要です。

* **api_key**: 文字列。Datadog API キー。
* **application_key**: 文字列。Datadog アプリケーションキー。

デフォルトでは、このエンドポイントはインフラストラクチャーリスト内のすべてのデータを問い合わせるため、応答が非常に大きくなります。以下のオプションパラメーターを使用して、受け取るコンテンツを絞り込むことができます。

* **tags**: 文字列。どのホストタグを使用して絞り込むかを記載したカンマ区切りのリスト (AND 論理を使用。すなわち、すべてのタグに該当するホストのデータだけが返されます)。
* **hostnames[]**: 文字列のリスト。データを問い合わせるホスト名のリスト。
* **with_apps**: ブール値。true の場合は、ホストに関連付けられたアプリケーション (インテグレーション) が表示されます。
* **with_mute_status**: ブール値。true の場合は、ホストがダウンタイムによってミュートされているかどうかが表示されます。
* **with_sources**: ブール値。true の場合は、ホストのメトリクスが報告されるソースのリストが返されます。たとえば、'aws'、'agent'、'azure' がリストに示されます。
* **with_aliases**: ブール値。true の場合は、ホストのエイリアスが表示されます。
* **with_meta**: ブール値。true の場合は、ホストのディスク情報、IP アドレスなどのメタデータが含まれます。

この API 呼び出しへの応答は JSON 形式です。

## 例

たとえば、`env:prod` および `role:elasticsearch` タグを含むすべてのホストに一般データを問い合わせる場合は、Python の `requests` ライブラリを使用して、以下のような API 呼び出しを作成します。

```python
import requests
s = requests.session()
s.params = {
  'api_key': 'DATADOG_API_キー',
  'application_key': 'アプリケーションキー',
  'tags': 'env:prod,role:elasticsearch'
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
    'api_key': '<DATADOG_API_キー>',
    'application_key': '<アプリケーションキー>',
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