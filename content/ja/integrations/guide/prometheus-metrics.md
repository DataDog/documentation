---
title: Datadog メトリクスにおける Prometheus メトリクスのマッピング
kind: ガイド
aliases:
  - /ja/integrations/faq/how-to-collect-metrics-with-sql-stored-procedure/
further_reading:
  - link: 'https://www.datadoghq.com/blog/sql-server-metrics/#create-a-stored-procedure-to-generate-and-collect-metrics'
    tag: ブログ
    text: メトリクスを生成および収集するストアドプロシージャを作成する
  - link: /integrations/mysql/
    tag: Documentation
    text: Datadog-MySQL インテグレーション
---
Datadog の Prometheus または OpenMetrics チェックをお使いの場合に、これらのメトリクスが既存の Datadog メトリクスタイプにどのようにマッピングされるかをご説明します。

## Prometheus および OpenMetrics メトリクスのタイプ

* `counter`: 単調に増加するカウンターで表される、累積的なメトリクス。値は増加するか、0 にリセットされるかのどちらかとなります。
* `gauge`: 無作為に増減する単一の数値を表すメトリクス。
* `histogram`: 観察結果のサンプルを抽出し、構成可能なバケットの中でカウントします。また、観察されたすべての値の合計を提示します。
* `summary`: histogram と同様に観察結果のサンプルを抽出し、観察されたすべての値の合計を提示します。また、スライド式のタイムウィンドウの中で構成可能な量を計算します。

## Datadog メトリクスにおける Prometheus/OpenMetrics メトリクスのマッピング方法

Datadog のメトリクスタイプの詳細については、[Datadog メトリクスタイプのドキュメント][1]を参照してください。

### Counter

デフォルトでは、[Prometheus/OpenMetrics の `counter`][2] はDatadog の `gauge` にマッピングされます。

しかし、パラメーター `send_monotonic_counter` が `true` の場合、このメトリクスは `monotonic_counter` として送信されます。[単調カウンターについての詳細はこちらを参照してください][8]。

### Gauge

[Prometheus/OpenMetrics の `gauge`][3] は Datadog の `gauge` にマッピングされます。

### Histogram

[Prometheus/OpenMetrics の `histogram`][4] については、histogram の `_count` および `_sum` の値がそれぞれ Datadog の `gauge` にマッピングされます。

パラメーター `send_histograms_buckets` が `true` の場合、それぞれの `_bucket` 値もまた Datadog の `gauge` にマッピングされます。

パラメーター `send_distribution_buckets` が `true` の場合、それぞれの `_bucket` は Datadog の `distribution` にマッピングされます。Prometheus/OpenMetrics の histogram データは Datadog のディストリビューションメトリクスに変換され、Datadog で Kubernetes のメトリクスをパーセンタイルとして簡単に監視できるようになります。Datadog のディストリビューションメトリクスは [DDSketch アルゴリズム][5] に基づいています。詳しくは、関連する Datadog の [OpenMetrics とディストリビューションメトリクスについてのブログ記事][6]を参照してください。

パラメーター `send_distribution_counts_as_monotonic` が `true` の場合、`_count` で終わる各メトリクスは `monotonic_count` として送信されます。[単調カウンターについての詳細はこちらを参照してください][8]。

### Summary

[Prometheus/OpenMetrics の `summary`][7] については、summary の `_count` および `_sum` の値がそれぞれ Datadog の `gauge` にマッピングされます。

パラメーター `send_distribution_buckets` が `true` の場合は、histogram がディストリビューションに変換され、それぞれの `_bucket` が `distribution` タグを使用してフェッチされます。

パラメーター `send_distribution_counts_as_monotonic` が `true` の場合、`_count` で終わる各メトリクスは `monotonic_count` として送信されます。[単調カウンターについての詳細はこちらを参照してください][8]。

[1]: /ja/developers/metrics/types/
[2]: https://prometheus.io/docs/concepts/metric_types/#counter
[3]: https://prometheus.io/docs/concepts/metric_types/#gauge
[4]: https://prometheus.io/docs/concepts/metric_types/#histogram
[5]: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/
[6]: https://www.datadoghq.com/blog/whats-next-monitoring-kubernetes/#distribution-metrics
[7]: https://prometheus.io/docs/concepts/metric_types/#summary
[8]: /ja/developers/metrics/agent_metrics_submission/?tab=count#monotonic-count