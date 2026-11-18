---
aliases:
- /ja/opentelemetry/collector_exporter/trace_metrics/
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: ドキュメント
  text: Collector の使用を開始する
- link: /opentelemetry/guide/service_entry_spans_mapping/
  tag: ドキュメント
  text: OpenTelemetry セマンティック規約をサービスエントリスパンにマッピングする
title: トレースメトリクス
---
## 概要 {#overview}

{{< img src="/opentelemetry/collector_exporter/trace_metrics.png" alt="OpenTelemetry からの APM メトリクス" style="width:100%;" >}}

ヒット数、エラー数、処理時間などの APM 統計を送信するには、[`span_metrics` コネクタ][1]を設定します。Collector が受信したすべてのスパンからのメトリクスをコネクタに計算させるには、すべてのサンプリングプロセッサーより前にコネクタを構成してください。

DDOT SDK (OpenTelemetry モードの Datadog SDK) については、[トレースメトリクスの外挿設定と最小バージョン][3]を参照してください。

## セットアップ {#setup}

[推奨される Collector 設定][1]で該当する環境を選択し、その `span_metrics` コネクタブロック全体を使用します。そのすべてのディメンションを保持してください。Datadog はこれらを使用して、ホストタグ、ピアサービス、オペレーション名、リソース名を導出します。

## 収集されるデータ {#data-collected}

[トレースメトリクス][2]を参照してください。

## 完全な構成の例 {#full-example-configuration}

動作する完全なサンプルファイルについては、[`opentelemetry-examples` リポジトリ][5]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/opentelemetry/setup/collector_exporter/#span-metrics-connector
[2]: /ja/tracing/metrics/metrics_namespace/
[3]: /ja/opentelemetry/ingestion_sampling/#trace-metric-extrapolation-for-datadog-sdks
[5]: https://github.com/DataDog/opentelemetry-examples/tree/be842bc1447337c32f2d6265612232932a6cdbfd/configurations/opentelemetry-collector