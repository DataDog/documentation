---
"categories":
- languages
- tracing
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Send runtime metrics from your Go applications with Datadog client libraries."
"doc_link": "https://docs.datadoghq.com/integrations/go/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/go-logging/"
  "tag": Blog
  "text": How to collect, standardize, and centralize Golang logs
- "link": "https://www.datadoghq.com/blog/go-memory-metrics/"
  "tag": Blog
  "text": Go memory metrics demystified
"git_integration_title": "go"
"has_logo": true
"integration_id": "go"
"integration_title": "Go"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "go"
"public_title": "Datadog-Go Integration"
"short_description": "Send runtime metrics from your Go applications with Datadog client libraries."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

The Go integration allows you to collect and monitor your Go application logs, traces, and custom metrics.

## セットアップ

### Metric collection

See the dedicated documentation for [collecting Go custom metrics with DogStatsD][1].

### Trace collection

See the dedicated documentation for [instrumenting your Go application][2] to send its traces to Datadog.

### Log collection

_Available for Agent v6.0+_

See the dedicated documentation on how to [setup Go log collection][3] to forward your logs to Datadog.

### Profile collection

See the dedicated documentation for [enabling the Go profiler][4].

## 収集データ

### メトリクス
{{< get-metrics-from-git "go" >}}


### イベント

The Go integration does not include any events.

### サービスチェック

The Go integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/developers/dogstatsd/?tab=go
[2]: https://docs.datadoghq.com/tracing/setup/go/
[3]: https://docs.datadoghq.com/logs/log_collection/go/
[4]: https://docs.datadoghq.com/profiler/enabling/go/
[5]: https://docs.datadoghq.com/help/

