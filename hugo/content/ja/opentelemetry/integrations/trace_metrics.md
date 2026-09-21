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
## 概要 {#overview}

{{< img src="/opentelemetry/collector_exporter/trace_metrics.png" alt="OpenTelemetry からの APM メトリクス" style="width:100%;" >}}

ヒット、エラー、期間などの APM メトリクスを送信するには、[`span_metrics` connector][1] をセットアップします。トレースメトリクスがサンプリングされていないトラフィックを表すように、サンプリングプロセッサの前にすべてのトレースを受信するようコネクタを構成します。

## セットアップ {#setup}

[推奨される Collector セットアップ][1] で環境を選択し、その完全な `span_metrics` コネクタブロックを使用します。Datadog がホストタグ、ピアサービス、オペレーション名、リソース名の導出に使用するすべてのディメンションを保持します。

## 収集データ {#data-collected}

[トレースメトリクス][2]を参照してください。

## 完全な構成例 {#full-example-configuration}

完全に動作する構成ファイルの例については、[`opentelemetry-examples` リポジトリ][5] を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/opentelemetry/setup/collector_exporter/#span-metrics-connector
[2]: /ja/tracing/metrics/metrics_namespace/
[5]: https://github.com/DataDog/opentelemetry-examples/tree/be842bc1447337c32f2d6265612232932a6cdbfd/configurations/opentelemetry-collector