---
aliases:
- /ja/opentelemetry/collector_exporter/trace_metrics/
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: ドキュメント
  text: コレクターの概要
- link: /opentelemetry/guide/service_entry_spans_mapping/
  tag: ドキュメント
  text: OpenTelemetry セマンティック規約をサービスエントリーのスパンにマッピングする
title: トレースメトリクス
---

## 概要

{{< img src="/opentelemetry/collector_exporter/trace_metrics.png" alt="OpenTelemetry の APM メトリクス" style="width:100%;" >}}

ヒット、エラー、期間などの APM 統計情報を送信するには、[Datadog Connector][1] をセットアップします。

詳しくは、OpenTelemetry プロジェクトドキュメントの [Datadog Connector][1] を参照してください。

## セットアップ

Collector の構成に以下の行を追加します。

```yaml
processors:
  probabilistic_sampler:
    sampling_percentage: 20
connectors:
    # "datadog" コネクタ定義と構成を追加します
    datadog/connector:
exporters:
  datadog:
    api:
      key: ${env:DD_API_KEY}
service:
  pipelines:
   traces:
     receivers: [otlp]
     processors: [batch]
     exporters: [datadog/connector]
   traces/2:
     receivers: [datadog/connector]
     processors: [batch, probabilistic_sampler]
     exporters: [datadog]
  metrics:
    receivers: [datadog/connector]
    processors: [batch]
    exporters: [datadog]
```

## データ収集

[トレースメトリクス][2]を参照してください。

## 完全な構成例

Datadog Exporter を用いた実際に動作する構成の完全な例については、[`trace-metrics.yaml`][3] を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector
[2]: /ja/tracing/metrics/metrics_namespace/
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/trace-metrics.yaml