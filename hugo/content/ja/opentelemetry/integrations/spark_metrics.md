---
further_reading:
- link: /opentelemetry/setup/collector_exporter/
  tag: ドキュメント
  text: OpenTelemetry Collector のセットアップ
title: Apache Spark メトリクス
---
## 概要 {#overview}

{{< img src="/opentelemetry/collector_exporter/spark_metrics.png" alt="Spark ダッシュボードでの OpenTelemetry Apache Spark メトリクス" style="width:100%;" >}}

[Apache Spark receiver][1] は、[Spark Overview][4] ダッシュボードに表示される Apache Spark メトリクスを収集します。

詳細については、[Apache Spark receiver][1] に関する OpenTelemetry プロジェクトのドキュメントを参照してください。

## セットアップ {#setup}

この例では、OpenTelemetry Collector Contrib v0.154.0 のコンポーネント識別子を使用しています。他のバージョンやディストリビューションの場合は、そのディストリビューションがサポートする識別子を使用します。以前のバージョンでは、このレシーバーの名前は `apachespark` です。

Apache Spark receiver は、実行中の Spark アプリケーションがその Web UI ポートで提供する REST API を読み取ります。

Collector 構成に以下の行を追加し、`endpoint` を Spark アプリケーションの Web UI のアドレスに設定します。

```yaml
receivers:
  apache_spark:
    endpoint: http://localhost:4040
```

構成のメトリクスパイプラインの `receivers` リストに `apache_spark` を追加します。すでにそのパイプラインにあるプロセッサーはそのまま維持します。Datadog OTLP メトリクスインテークはデルタメトリクスのみを受け付けますが、このレシーバーは累積合計を生成するため、パイプラインには `cumulativetodelta` が必要です。[推奨される Collector セットアップ][3]にはそれが含まれています。

すべての構成オプションについては、[Apache Spark receiver のドキュメント][1]を参照してください。

## 収集データ {#data-collected}

{{< mapping-table resource="apachespark.csv">}}

OpenTelemetry と Datadog のメトリクス名の完全なマッピングについては、[OpenTelemetry メトリクスマッピング][2]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/apachesparkreceiver
[2]: /ja/opentelemetry/guide/metrics_mapping/
[3]: /ja/opentelemetry/setup/collector_exporter/
[4]: https://app.datadoghq.com/screen/integration/95/spark---overview