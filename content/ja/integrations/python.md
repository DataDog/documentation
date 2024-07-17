---
categories:
- languages
- log collection
- tracing
custom_kind: integration
dependencies: []
description: Collect metrics, traces, logs, and profile data from your Python applications.
doc_link: https://docs.datadoghq.com/integrations/python/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/tracing-async-python-code/
  tag: Blog
  text: Tracing asynchronous Python code with Datadog APM
- link: https://www.datadoghq.com/blog/python-logging-best-practices/
  tag: Blog
  text: How to collect, customize, and centralize Python logs
git_integration_title: python
has_logo: true
integration_id: python
integration_title: Python
integration_version: ''
is_public: true
manifest_version: '1.0'
name: python
public_title: Datadog-Python インテグレーション
short_description: Collect metrics, traces, logs, and profile data from your Python
  applications.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Python インテグレーションを利用して、Python アプリケーションのログ、トレース、カスタムメトリクスを収集および監視できます。

## Setup

### メトリクスの収集

[DogStatsD を使用した Python カスタムメトリクスの収集][1]に関するドキュメントを参照してください。

### トレースの収集

トレースを Datadog に送信するには、[Python アプリケーションのインスツルメンテーション][2]に関するドキュメントを参照してください。

### 収集データ

_Agent v6.0 以上で使用可能_

ログを Datadog に転送するには、[Python ログ収集のセットアップ][3]方法に関するドキュメントを参照してください。

### プロファイルの収集

See the dedicated documentation for [enabling the Python profiler][4]. 

## Troubleshooting

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/developers/dogstatsd/?tab=python
[2]: https://docs.datadoghq.com/ja/tracing/setup/python/
[3]: https://docs.datadoghq.com/ja/logs/log_collection/python/
[4]: https://docs.datadoghq.com/ja/profiler/enabling/python/
[5]: https://docs.datadoghq.com/ja/help/