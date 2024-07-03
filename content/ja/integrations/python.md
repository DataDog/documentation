---
categories:
- languages
- log collection
- tracing
custom_kind: インテグレーション
dependencies: []
description: Collect metrics, traces, logs, and profile data from your Python applications.
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
public_title: Datadog-Python Integration
short_description: Collect metrics, traces, logs, and profile data from your Python
  applications.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

The Python integration allows you to collect and monitor your Python application logs, traces, and custom metrics.

## セットアップ

### Metric collection

See the dedicated documentation for [collecting Python custom metrics with DogStatsD][1].

### Trace collection

See the dedicated documentation for [instrumenting your Python application][2] to send its traces to Datadog.

### Log collection

_Available for Agent v6.0+_

See the dedicated documentation on how to [setup Python log collection][3] to forward your logs to Datadog.

### Profile collection

See the dedicated documentation for [enabling the Python profiler][4]. 

## トラブルシューティング

Need help? Contact [Datadog support][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/developers/dogstatsd/?tab=python
[2]: https://docs.datadoghq.com/ja/tracing/setup/python/
[3]: https://docs.datadoghq.com/ja/logs/log_collection/python/
[4]: https://docs.datadoghq.com/ja/profiler/enabling/python/
[5]: https://docs.datadoghq.com/ja/help/