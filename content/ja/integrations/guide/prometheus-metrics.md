---
aliases:
- /ja/integrations/faq/how-to-collect-metrics-with-sql-stored-procedure/
further_reading:
- link: /integrations/openmetrics/
  tag: Documentation
  text: Learn about the OpenMetrics integration
- link: /agent/kubernetes/prometheus/
  tag: Documentation
  text: Kubernetes Prometheus and OpenMetrics metrics collection
title: Mapping Prometheus Metrics to Datadog Metrics
---

## 概要

このページでは、Prometheus や OpenMetrics のチェックメトリクスが、既存の Datadog のメトリクスタイプにどのようにマッピングされるかを説明します。

## Prometheus および OpenMetrics メトリクスのタイプ

* `counter`: 単調に増加するカウンターで表される、累積的なメトリクス。値は増加するか、0 にリセットされるかのどちらかとなります。
* `gauge`: 無作為に増減する単一の数値を表すメトリクス。
* `histogram`: 観察結果のサンプルを抽出し、構成可能なバケットの中でカウントします。また、観察されたすべての値の合計を提示します。
* `summary`: `histogram` と同様に観察結果のサンプルを抽出し、観察されたすべての値の合計を提示します。また、スライド式のタイムウィンドウの中で構成可能な量を計算します。

## Datadog メトリクスにおける Prometheus/OpenMetrics メトリクスのマッピング方法

詳細は、[OpenMetrics メトリクスタイプ][2]および [Datadog メトリクスタイプ][3]を参照してください。

{{< tabs >}}
{{% tab "最新バージョン" %}}


| メトリクスタイプ | OpenMetrics | Datadog | 
| --- | --- | --- |
| [カウンター][110] | `counter` | `count` |
| [ゲージ][111] | `gauge` | `gauge` |
| [ヒストグラム][112] | `_count`、`_sum`、`_bucket` | ヒストグラムの `_count`、`_sum`、および `_bucket` の各値はそれぞれ Datadog の `count` 型にマッピングされ、それぞれの名前に `.count`、`.sum`、および `.bucket` というサフィックスが含まれます。 |
| [サマリー][113] | `_count`、`_sum`、`_created` | `_count` と `_sum` の値は Datadog の `count` 型にマップされ、それぞれ `.count` と `.sum` というサフィックスが名前に含まれます。分位数サンプルは `.quantile` というサフィックスを持つ `gauge` 型のメトリクスにマッピングされます。 | 

### Histogram

[Prometheus/OpenMetrics `histogram`][104] の場合、ヒストグラムの `_count`、`_sum`、`_bucket` 値はそれぞれ Datadog の `count` 型にマッピングされ、名前にはそれぞれ `.count`、`.sum`、`.bucket` というサフィックスが含まれます。

パラメーター `histogram_buckets_as_distributions` が `true` の場合、`_bucket` サンプルは Datadog の `distribution` に集計されます。[Datadog のディストリビューションメトリクス][108]は [DDSketch アルゴリズム][109]に基づいており、分位数などのより高度な統計的集計が可能です。詳細は、Datadog エンジニアリングブログの [OpenMetrics とディストリビューションメトリクスに関する投稿][105]を参照してください。

`collect_counters_with_distributions` を使うと、 `_count` と `_sum` の値を `count` としてディストリビューションと一緒に送ることができます。


### サマリー

[Prometheus/OpenMetrics `summary`][107] の場合、`_count` と `_sum` の値は Datadog の `count` 型にマップされ、それぞれ `.count` と `.sum` というサフィックスが名前に含まれます。分位数サンプルは `.quantile` というサフィックスを持つ `gauge` 型のメトリクスにマッピングされます。

[101]: https://prometheus.io/docs/concepts/metric_types/#gauge
[102]: https://prometheus.io/docs/concepts/metric_types/#counter
[103]: /ja/metrics/custom_metrics/agent_metrics_submission/?tab=count#monotonic_count
[104]: https://prometheus.io/docs/concepts/metric_types/#histogram
[105]: https://www.datadoghq.com/blog/whats-next-monitoring-kubernetes/#distribution-metrics
[107]: https://prometheus.io/docs/concepts/metric_types/#counter
[108]: /ja/metrics/distributions/
[109]: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/
[110]: https://prometheus.io/docs/concepts/metric_types/#gauge
[111]: https://prometheus.io/docs/concepts/metric_types/#counter
[112]: /ja/integrations/guide/prometheus-metrics/?tab=latestversion#histogram
[113]: /ja/integrations/guide/prometheus-metrics/?tab=latestversion#summary

{{% /tab %}}
{{% tab "レガシーバージョン" %}}
### Counter

デフォルトでは、[Prometheus/OpenMetrics `counter`][101] は Datadog の `count` にマッピングされます。

ただし、パラメーター `send_monotonic_counter` が `false` の場合、このメトリクスは `gauge` として送信されます。

### Gauge

[Prometheus/OpenMetrics の `gauge`][103] は Datadog の `gauge` にマッピングされます。

### Histogram

[Prometheus/OpenMetrics `histogram`][104] の場合、ヒストグラムの `_count`、`_sum` 値はそれぞれ Datadog の `gauge` 型にマッピングされ、名前にはそれぞれ `.count`、`.sum` というサフィックスが含まれます。

`send_histograms_buckets` パラメーターが `true` の場合、`_bucket` サンプルが `.bucket` サフィックス付きで Datadog に送信され、デフォルトで Datadog の `gauge` にマッピングされます。

`send_distribution_counts_as_monotonic` パラメーターを `true` に設定すると、代わりに `_count` と `_bucket` メトリクスを `count` 型として送信します。`send_distribution_sums_as_monotonic` を設定すると、`_sum` メトリクスも同じようになります。

パラメーター `send_distribution_buckets` が `true` の場合、`_bucket` サンプルは Datadog の `distribution` に集計されます。[Datadog のディストリビューションメトリクス][108]は [DDSketch アルゴリズム][107]に基づいており、分位数などのより高度な統計的集計が可能です。詳細は、Datadog エンジニアリングブログの [OpenMetrics とディストリビューションメトリクスに関する投稿][106]を参照してください。


### サマリー

[Prometheus/OpenMetrics `summary`][105] の場合、デフォルトで `_count` と `_sum` の値は Datadog の `gauge` 型にマップされ、それぞれ `.count` と `.sum` というサフィックスが名前に含まれます。分位数サンプルは `.quantile` というサフィックスを持つ `gauge` 型のメトリクスにマッピングされます。

`send_distribution_counts_as_monotonic` パラメーターを `true` に設定すると、代わりに `_count` と `_sum` メトリクスを `count` 型として送信します。`send_distribution_sums_as_monotonic` を設定すると、`_sum` メトリクスも同じようになります。

[101]: https://prometheus.io/docs/concepts/metric_types/#counter
[102]: /ja/metrics/custom_metrics/agent_metrics_submission/?tab=count#monotonic_count
[103]: https://prometheus.io/docs/concepts/metric_types/#gauge
[104]: https://prometheus.io/docs/concepts/metric_types/#histogram
[105]: https://prometheus.io/docs/concepts/metric_types/#summary
[106]: https://www.datadoghq.com/blog/whats-next-monitoring-kubernetes/#distribution-metrics
[107]: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/
[108]: /ja/metrics/distributions/

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">すべての <code>count</code> メトリクスは、Agent によって<em>単調カウント</em>として処理されます。つまり、Agent は連続する生の値の差を実際に送信します。詳細については、<a href="/metrics/custom_metrics/agent_metrics_submission/?tab=count#monotonic_count">メトリクス送信: カスタム Agent チェック</a>を参照してください。</div>

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/kubernetes/prometheus/
[2]: https://github.com/OpenObservability/OpenMetrics/blob/main/specification/OpenMetrics.md#metric-types
[3]: /ja/metrics/types/