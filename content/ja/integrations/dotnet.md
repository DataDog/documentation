---
"categories":
- languages
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Send runtime metrics from your .NET applications with Datadog client libraries."
"doc_link": "https://docs.datadoghq.com/integrations/dotnet/"
"draft": false
"further_reading": []
"git_integration_title": "dotnet"
"has_logo": true
"integration_id": "dotnet"
"integration_title": ".NET"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "dotnet"
"public_title": "Datadog-.NET Integration"
"short_description": "Send runtime metrics from your .NET applications with Datadog client libraries."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

The .NET integration allows you to collect and monitor your .NET application logs, traces, and custom metrics.

## セットアップ

### Metric collection

See the dedicated documentation for [collecting .NET custom metrics with DogStatsD][1].

### Trace collection

See the dedicated documentation for [instrumenting your .NET application][2] to send its traces to Datadog.

### Log collection

_Available for Agent v6.0+_

See the dedicated documentation on how to [setup .NET log collection][3] to forward your logs to Datadog.

### Profile collection

See the dedicated documentation for [enabling the .NET profiler][4].

## 収集データ

### メトリクス
{{< get-metrics-from-git "dotnet" >}}


### イベント

The .NET integration does not include any events.

### サービスチェック

The .NET integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/developers/dogstatsd/?tab=net
[2]: https://docs.datadoghq.com/tracing/setup/dotnet/
[3]: https://docs.datadoghq.com/logs/log_collection/csharp/
[4]: https://docs.datadoghq.com/profiler/enabling/dotnet/
[5]: https://docs.datadoghq.com/help/

