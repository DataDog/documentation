---
categories:
- languages
- log collection
- tracing
custom_kind: インテグレーション
dependencies: []
description: Datadog クライアントライブラリを使用して Ruby アプリケーションからカスタムメトリクスを送信。
doc_link: https://docs.datadoghq.com/integrations/ruby/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-rails-with-datadog/
  tag: ブログ
  text: Datadog を使用した Rails アプリケーションの監視
- link: https://www.datadoghq.com/blog/managing-rails-logs-with-datadog/
  tag: ブログ
  text: Datadog を使用した Rails ログの収集および監視
- link: https://www.datadoghq.com/blog/managing-rails-application-logs/
  tag: ブログ
  text: Rails アプリケーションログを収集、カスタマイズ、管理する方法
git_integration_title: ruby
has_logo: true
integration_id: ruby
integration_title: Ruby
integration_version: ''
is_public: true
manifest_version: '1.0'
name: ruby
public_title: Datadog-Ruby Integration
short_description: Send custom metrics from your Ruby applications with Datadog client
  libraries.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

The Ruby integration allows you to collect and monitor your Ruby application logs, traces, and custom metrics.

## セットアップ

### Metric collection

See the dedicated documentation for [collecting Ruby custom metrics with DogStatsD][1].

### Trace collection

See the dedicated documentation for [instrumenting your Ruby application][2] to send its traces to Datadog.

### Log collection

*Available for Agent v6.0+*

See the dedicated documentation on how to [setup Ruby log collection][3] to forward your logs to Datadog.

### Profile collection

See the dedicated documentation for [enabling the Ruby profiler][4].

## トラブルシューティング

Need help? Contact [Datadog support][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/developers/dogstatsd/?tab=ruby
[2]: https://docs.datadoghq.com/ja/tracing/setup/ruby/
[3]: https://docs.datadoghq.com/ja/logs/log_collection/ruby/
[4]: https://docs.datadoghq.com/ja/profiler/enabling/ruby/
[5]: https://docs.datadoghq.com/ja/help/