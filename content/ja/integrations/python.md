---
categories:
  - languages
  - log collection
ddtype: ライブラリ
dependencies: []
description: Datadogpy で Python アプリケーションからのカスタムメトリクスをインスツルメントします。
doc_link: 'https://docs.datadoghq.com/integrations/python/'
further_reading:
  - link: 'https://www.datadoghq.com/blog/tracing-async-python-code/'
    tag: ブログ
    text: Datadog APM による非同期 Python のトレーシング
git_integration_title: python
has_logo: true
integration_title: Python
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: python
public_title: Datadog-Python インテグレーション
short_description: Datadogpy で Python アプリケーションからのカスタムメトリクスをインスツルメントします。
version: '1.0'
---
## 概要
Python インテグレーションを使用すると、Python アプリケーションに数行のコードを追加することで、カスタムメトリクスを監視できます。たとえば、ページビューや関数呼び出しの回数を返すメトリクスです。

## セットアップ

Datadog は、Python アプリケーションメトリクスの実装を支援するライブラリを提供しています。詳細については、[GitHub][1] でライブラリを参照してください。

### インストール

次のように、pip から Datadog Python ライブラリをインストールします。

```
pip install datadog
```

### メトリックの収集

Python インテグレーションでは、すべてのメトリクスが[カスタムメトリクス][2]です。カスタムメトリクスの収集の詳細については、以下を参照してください。

* [メトリクスの開発者ガイド][3]
* [datadogpy][1] リポジトリ内のドキュメント
* [API ドキュメント][4]

以下に、Datadog API を使用してコードをインスツルメントする例を示します。

```python

from datadog import initialize

options = {
    'api_key':'<YOUR_DD_API_KEY>',
    'app_key':'<YOUR_DD_APP_KEY>'
}

initialize(**options)

# Datadog REST API クライアントを使用します
from datadog import api

title = "Something big happened!"
text = 'And let me tell you all about it here!'
tags = ['version:1', 'application:web']

api.Event.create(title=title, text=text, tags=tags)
```

以下に、DogStatsD クライアントを使用してコードを実装する例を示します。

```python
# DogStatsd 用の Python クライアント Statsd を使用します
from datadog import statsd

statsd.increment('whatever')
statsd.gauge('foo', 42)
```

以下に、ThreadStats を使用してコードをインスツルメントする例を示します。

```python
# ThreadStats は、Datadog REST API を使用してメトリクスを収集およびフラッシュする別のツールです
from datadog import ThreadStats
stats = ThreadStats()
stats.start()
stats.increment('home.page.hits')
```

### トレースの収集

[Python アプリケーションのトレーシング][5]に関する Datadog のドキュメントを参照してください。

### ログの収集

**Agent v6.0 以上で使用可能**

[Python ログ収集][6]に関する Datadog のドキュメントを参照してください。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

## その他の参照先

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadogpy
[2]: https://docs.datadoghq.com/ja/developers/metrics/custom_metrics
[3]: https://docs.datadoghq.com/ja/developers/metrics
[4]: https://docs.datadoghq.com/ja/api/?lang=python
[5]: https://docs.datadoghq.com/ja/tracing/setup/python
[6]: https://docs.datadoghq.com/ja/logs/log_collection/python
[7]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}