---
categories:
- languages
- log collection
- tracing
custom_kind: インテグレーション
dependencies: []
description: PHP アプリケーションのメトリクス、トレース、ログ、プロファイルデータを収集します。
doc_link: https://docs.datadoghq.com/integrations/php/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-php-performance/
  tag: ブログ
  text: Datadog APM と分散型トレーシングを使用した PHP の監視。
- link: https://www.datadoghq.com/blog/php-logging-guide/
  tag: ブログ
  text: PHP ログを収集、カスタマイズ、分析する方法。
git_integration_title: php
has_logo: true
integration_id: php
integration_title: PHP
integration_version: ''
is_public: true
manifest_version: '1.0'
name: php
public_title: Datadog-PHP Integration
short_description: Collect metrics, traces, logs, and profile data from your PHP applications.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

The Datadog-PHP integration allows you to collect and monitor your PHP application logs, traces, and custom metrics.

## セットアップ

### Metric collection

See the dedicated documentation for [collecting PHP custom metrics with DogStatsD][1].

### Trace collection

See the dedicated documentation for [instrumenting your PHP application][2] to send its traces to Datadog.

### Log collection

*Available for Agent v6.0+*

See the dedicated documentation on how to [setup PHP log collection][3] to forward your logs to Datadog.

### Profile collection

See the dedicated documentation for [enabling the PHP profiler][4].

## トラブルシューティング

Need help? Contact [Datadog support][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/developers/dogstatsd/?tab=php
[2]: https://docs.datadoghq.com/ja/tracing/setup/php/
[3]: https://docs.datadoghq.com/ja/logs/log_collection/php/
[4]: https://docs.datadoghq.com/ja/profiler/enabling/php/
[5]: https://docs.datadoghq.com/ja/help/