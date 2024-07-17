---
categories:
- languages
- log collection
- tracing
custom_kind: integration
dependencies: []
description: Send custom metrics from your Ruby applications with Datadog client libraries.
doc_link: https://docs.datadoghq.com/integrations/ruby/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-rails-with-datadog/
  tag: Blog
  text: Monitoring Rails applications with Datadog
- link: https://www.datadoghq.com/blog/managing-rails-logs-with-datadog/
  tag: Blog
  text: Collecting and monitoring Rails logs with Datadog
- link: https://www.datadoghq.com/blog/managing-rails-application-logs/
  tag: Blog
  text: How to collect, customize, and manage Rails application logs
git_integration_title: ruby
has_logo: true
integration_id: ruby
integration_title: Ruby
integration_version: ''
is_public: true
manifest_version: '1.0'
name: ruby
public_title: Datadog-Ruby インテグレーション
short_description: Datadog クライアントライブラリを使用して Ruby アプリケーションからカスタムメトリクスを送信。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Ruby インテグレーションを利用して、Ruby アプリケーションのログ、トレース、カスタムメトリクスを収集および監視できます。

## Setup

### メトリクスの収集

[DogStatsD を使用した Ruby カスタムメトリクスの収集][1]に関するドキュメントを参照してください。

### トレースの収集

トレースを Datadog に送信するには、[Ruby アプリケーションのインスツルメンテーション][2]に関するドキュメントを参照してください。

### 収集データ

**Agent v6.0 以上で使用可能**

ログを Datadog に転送するには、[Ruby ログ収集のセットアップ][3]方法に関するドキュメントを参照してください。

### プロファイルの収集

See the dedicated documentation for [enabling the Ruby profiler][4].

## Troubleshooting

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/developers/dogstatsd/?tab=ruby
[2]: https://docs.datadoghq.com/ja/tracing/setup/ruby/
[3]: https://docs.datadoghq.com/ja/logs/log_collection/ruby/
[4]: https://docs.datadoghq.com/ja/profiler/enabling/ruby/
[5]: https://docs.datadoghq.com/ja/help/