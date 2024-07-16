---
aliases:
- /ja/integrations/faq/how-to-collect-metrics-with-sql-stored-procedure/
further_reading:
- link: https://www.datadoghq.com/blog/sql-server-metrics/#create-a-stored-procedure-to-generate-and-collect-metrics
  tag: ブログ
  text: メトリクスを生成および収集するストアドプロシージャを作成する
- link: /integrations/mysql/
  tag: Documentation
  text: Datadog-MySQL インテグレーション
- link: /agent/kubernetes/prometheus/
  tag: Documentation
  text: Kubernetes Prometheus および OpenMetrics メトリクスの収集
title: Datadog メトリクスにおける Prometheus メトリクスのマッピング
---

Datadog の Prometheus または OpenMetrics チェックをお使いの場合に、これらのメトリクスが既存の Datadog メトリクスタイプにどのようにマッピングされるかをご説明します。

詳細は、[Kubernetes Prometheus および OpenMetrics メトリクスの収集][1]を参照してください。

## Prometheus および OpenMetrics メトリクスのタイプ

* `counter`: 単調に増加するカウンターで表される、累積的なメトリクス。値は増加するか、0 にリセットされるかのどちらかとなります。
* `gauge`: 無作為に増減する単一の数値を表すメトリクス。
* `histogram`: 観察結果のサンプルを抽出し、構成可能なバケットの中でカウントします。また、観察されたすべての値の合計を提示します。
* `summary`: histogram と同様に観察結果のサンプルを抽出し、観察されたすべての値の合計を提示します。また、スライド式のタイムウィンドウの中で構成可能な量を計算します。

## Datadog メトリクスにおける Prometheus/OpenMetrics メトリクスのマッピング方法

詳細は、[Datadog メトリクスタイプ][2]を参照してください。

### Counter

デフォルトでは、[Prometheus/OpenMetrics の `counter`][3] はDatadog の `monotonic_count` にマッピングされます。

ただし、パラメーター `send_monotonic_counter` が `false` の場合、このメトリクスは `gauge` として送信されます。[単調カウンターの詳細についてはこちらを参照してください][4]。

### Gauge

[Prometheus/OpenMetrics の `gauge`][5] は Datadog の `gauge` にマッピングされます。

### Histogram

[Prometheus/OpenMetrics の `histogram`][6] については、histogram の `_count` と `_sum` の値がそれぞれ Datadog の `gauge` にマッピングされます。

パラメーター `collect_histogram_buckets` が `true` の場合、それぞれの `_bucket` 値もまた Datadog の `gauge` にマッピングされます。

パラメーター `send_distribution_buckets` が `true` の場合、それぞれの `_bucket` は Datadog の `distribution` にマッピングされます。Prometheus/OpenMetrics の histogram データは Datadog のディストリビューションメトリクスに変換され、Datadog で Kubernetes のメトリクスをパーセンタイルとして監視できるようになります。Datadog のディストリビューションメトリクスは [DDSketch アルゴリズム][7]に基づいています。詳しくは、関連する Datadog の [OpenMetrics とディストリビューションメトリクスに関するブログ記事][8]を参照してください。

**注**: OpenMetrics v2 の場合、代わりに `collect_counters_with_distributions` を使用してください。

パラメーター `send_distribution_counts_as_monotonic` が `true` の場合、`_count` で終わる各メトリクスは `monotonic_count` として送信されます。[単調カウンターについての詳細はこちらを参照してください][4]。

### Summary

[Prometheus/OpenMetrics の `summary`][9] については、summary の `_count` および `_sum` の値がそれぞれ Datadog の `count` にマッピングされます。

パラメーター `send_distribution_buckets` が `true` の場合は、histogram がディストリビューションに変換され、それぞれの `_bucket` が `distribution` タグを使用してフェッチされます。

パラメーター `send_distribution_counts_as_monotonic` が `true` の場合、`_count` で終わる各メトリクスは `monotonic_count` として送信されます。[単調カウンターについての詳細はこちらを参照してください][4]。

[1]: /ja/agent/kubernetes/prometheus/
[2]: /ja/metrics/types/
[3]: https://prometheus.io/docs/concepts/metric_types/#counter
[4]: /ja/metrics/custom_metrics/agent_metrics_submission/?tab=count#monotonic-count
[5]: https://prometheus.io/docs/concepts/metric_types/#gauge
[6]: https://prometheus.io/docs/concepts/metric_types/#histogram
[7]: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/
[8]: https://www.datadoghq.com/blog/whats-next-monitoring-kubernetes/#distribution-metrics
[9]: https://prometheus.io/docs/concepts/metric_types/#summary