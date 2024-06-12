---
categories:
- languages
- log collection
- tracing
dependencies: []
description: Python アプリケーションからメトリクス、トレース、ログを収集。
doc_link: https://docs.datadoghq.com/integrations/python/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/tracing-async-python-code/
  tag: ブログ
  text: Datadog APM による非同期 Python のトレーシング
- link: https://www.datadoghq.com/blog/python-logging-best-practices/
  tag: ブログ
  text: Python ログの収集、カスタマイズ、一元化方法
git_integration_title: python
has_logo: true
integration_id: python
integration_title: Python
integration_version: ''
is_public: true
manifest_version: '1.0'
name: python
public_title: Datadog-Python インテグレーション
short_description: Python アプリケーションからメトリクス、トレース、ログを収集。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Python インテグレーションを利用して、Python アプリケーションのログ、トレース、カスタムメトリクスを収集および監視できます。

## 計画と使用

### メトリクスの収集

[DogStatsD を使用した Python カスタムメトリクスの収集][1]に関するドキュメントを参照してください。

### トレースの収集

トレースを Datadog に送信するには、[Python アプリケーションのインスツルメンテーション][2]に関するドキュメントを参照してください。

### 収集データ

_Agent v6.0 以上で使用可能_

ログを Datadog に転送するには、[Python ログ収集のセットアップ][3]方法に関するドキュメントを参照してください。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/developers/dogstatsd/?tab=python
[2]: https://docs.datadoghq.com/ja/tracing/setup/python/
[3]: https://docs.datadoghq.com/ja/logs/log_collection/python/
[4]: https://docs.datadoghq.com/ja/help/