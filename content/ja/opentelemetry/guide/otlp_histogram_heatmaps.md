---
further_reading:
- link: /metrics/open_telemetry/otlp_metric_types
  tag: Documentation
  text: OTLP Metric Types
- link: /opentelemetry/
  tag: Documentation
  text: OpenTelemetry Support in Datadog
title: Visualizing OTLP Histograms as heatmaps
---

## 概要

OpenTelemetry Protocol (OTLP) は、OTLP ヒストグラムの送信をサポートしています。このメトリクスは、合計、カウント、最小、最大などの集計統計情報を提供することによって、一連の測定値に関する情報を圧縮するタイプです。OTLP ヒストグラムは、これらの測定値のうち、ユーザーが構成可能なバケットに該当するものがどれだけあるかをカウントします。

このページの手順を踏むことで、Datadog でこのデータタイプを[ヒートマップ][5]として可視化することができます。

**注**: 関連する OTLP Exponential Histogram タイプは、ディストリビューションに変換されるため、ヒートマップとして表示することも可能です。ディストリビューションについては、[専用のディストリビューションのページ][4]をお読みください。

## セットアップ

このガイドでは、すでに [OpenTelemetry のメトリクスを Datadog に送信するための機能的なセットアップ][1]があることを前提に説明します。

### OpenTelemetry SDK の構成

OpenTelemetry SDK からメトリクスを生成する場合は、以下の手順で構成してください。

1. [デルタ一時性を持つ OTLP ヒストグラムを送信している SDK を構成します][2]。これにより、ヒートマップウィジェットで最小値と最大値が利用可能になります。
2. 集計から[デフォルトのバケット境界][3]をオーバーライドしたい場合にチェックします。**注**: バケットを追加するごとに、別のカスタムメトリクスとみなされます。

他のソースからのメトリクスは、可能であれば、最小値と最大値のフィールドが設定されたデルタ OTLP ヒストグラムとして提供されていることを確認します。

### Datadog Exporter または Datadog Agent の構成

Datadog Exporter または Datadog Agent で、ヒストグラムモードを設定し、集計メトリクスを有効にします。

{{< tabs >}}
{{% tab "Datadog Exporter (OpenTelemetry Collector)" %}}

Datadog Exporter の `collector.yaml` ファイルで、ヒストグラムモードを `counters` に構成し、`send_aggregation_metrics` フラグで集計メトリクスを有効にします。

```yaml
exporters:
  datadog:
    metrics:
      histograms:
        mode: counters
        send_aggregation_metrics: true
```

**注**: `send_aggregation_metrics` は Datadog Exporter v0.75.0 から利用可能です。それ以前のバージョンを使用している場合、代わりに `send_count_sum_metrics` フラグを使用してください。以前のバージョンでは、最小値と最大値が欠落しています。

{{% /tab %}}
{{% tab "Datadog Agent" %}}

`otlp_config` セクションで、ヒストグラムモードを `counters` に構成し、`send_aggregation_metrics` フラグで集計メトリクスを有効にします。

```yaml
otlp_config:
  metrics:
    histograms:
      mode: counters
      send_aggregation_metrics: true
```

**注**: `send_aggregation_metrics` は Datadog Agent v6.45.0/v7.45.0 から利用可能です。それ以前のバージョンを使用している場合、代わりに `send_count_sum_metrics` フラグを使用してください。以前のバージョンでは、最小値と最大値が欠落しています。

{{% /tab %}}
{{< /tabs >}}


### ヒートマップウィジェットの構成

[ヒートマップウィジェット][5]は、Datadog Exporter または Datadog Agent によって生成された `<YOUR METRIC NAME>.bucket` メトリクスのセットを使用し、それぞれが異なるヒストグラムバケットに対応しています。ヒストグラムをヒートマップとして可視化するには

1. 可視化するメトリクスとして、`<YOUR METRIC NAME>.bucket` を選択します。
2. メニューの `distributions of` から `pre-binned data` を選択します。

OTLP ヒストグラムをヒートマップウィジェットとして確認できるようになりました。

## OpenMetrics の互換性

[Datadog Agent OpenMetrics チェック][6]は、あらかじめビン化されたデータヒートマップウィジェットオプションとも互換性があります。OpenTelemetry に変換せずに直接 OpenMetrics チェックにメトリクスを送信したい場合は、インスタンスで `collect_histogram_buckets` フラグと `non_cumulative_histogram_buckets` フラグを有効にすると、データが互換性を持った形で Datadog に送信されるようになります。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/opentelemetry/otel_metrics
[2]: /ja/opentelemetry/guide/otlp_delta_temporality
[3]: https://opentelemetry.io/docs/reference/specification/metrics/sdk/#explicit-bucket-histogram-aggregation
[4]: /ja/metrics/distributions
[5]: /ja/dashboards/widgets/heatmap
[6]: /ja/integrations/openmetrics