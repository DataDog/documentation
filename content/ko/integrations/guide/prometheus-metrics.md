---
aliases:
- /ko/integrations/faq/how-to-collect-metrics-with-sql-stored-procedure/
further_reading:
- link: /integrations/openmetrics/
  tag: 설명서
  text: OpenMetrics 통합에 대해 알아보기
- link: /agent/kubernetes/prometheus/
  tag: 설명서
  text: 쿠버네티스 Prometheus 및 OpenMetrics 메트릭 수집
title: 프로메테우스 메트릭을 데이터독 메트릭에 매핑하기
---

## 개요

이 페이지는 Prometheus 또는 OpenMetrics 점검 메트릭이 기존 Datadog 메트릭 유형에 매핑되는 방식을 소개합니다.

## Prometheus 및 OpenMetrics 메트릭 유형

* `counter`: 단조롭게 증가하는 단일 카운터로 표시되는 누적 메트릭. 값은 증가하거나 0으로 재설정됩니다.
* `gauge`: 임의로 증가하거나 감소할 수 있는 단일 숫자 값을 나타내는 메트릭.
* `histogram`: 관찰 결과를 샘플링하고 구성 가능한 버킷에서 계산하며 관찰된 모든 값의 합계도 제공합니다.
* `summary`: `histogram`과 유사하게 관찰값을 샘플링하고, 관찰된 모든 값의 합계를 제공하며 슬라이딩 시간 창에 걸쳐 구성 가능한 양을 계산합니다.

## Prometheus/OpenMetrics 메트릭이 Datadog 메트릭에 매핑되는 방식

자세한 내용은 [OpenMetrics 메트릭 유형][2] 및 [Datadog 메트릭 유형][3]을 참조하세요.

{{< tabs >}}
{{% tab "최신 버전" %}}


| 메트릭 종류 | OpenMetrics | Datadog | 
| --- | --- | --- |
| [counter][110] | `counter` | `count` |
| [gauge][111] | `gauge` | `gauge` |
| [histogram][112] | `_count`, `_sum`, `_bucket` | `_count`, `_sum` 히스토그램의 `_bucket`값은 Datadog의 `count` 유형에 매핑되며, 각각 `.count`, `.sum`, `.bucket`이라는 접미사가 포함됩니다. |
| [summary][113] | `_count`, `_sum`, `_created` | `_count` 및 `_sum` 값은 Datadog의 `count` 유형에 매핑되며 각각 `.count`, `.sum`이라는 접미사가 이름에 포함됩니다. 분위수 샘플은 `.quantile` 접미사가 포함된 `gauge` 유형의 메트릭에 매핑됩니다. | 

### Histogram

[Prometheus/OpenMetrics `histogram`][104]의 경우 히스토그램의 `_count`, `_sum`, `_bucket` 값은 각각 Datadog의 `count` 유형에 매핑되며 이름에 `.count`, `.sum`, `.bucket`이라는 접미사가 이름에 포함됩니다.

`histogram_buckets_as_distributions` 파라미터가 `true`면 `_bucket` 샘플은 Datadog `distribution`으로 집계됩니다. [Datadog 분포 메트릭][108]은 [DDSketch 알고리즘][109]을 기반으로 하며 분위수와 같은 보다 고급 통계 집계를 허용합니다. 자세한 내용은 Datadog 엔지니어링 블로그 [OpenMetrics 및 분포 메트릭에 대한 게시물][105]을 참조하세요.

`collect_counters_with_distributions`를 사용하면 `_count` 및 `_sum`의 값을 분포와 함께 `count`로 보낼 수 있습니다.


### 요약

[Prometheus/OpenMetrics `summary`][107]의 경우 `_count` 및 `_sum` 값은 Datadog의 `count` 유형에 매핑되고 각각 이름에 `.count` 및 `.sum` 접미사가 포함됩니다. 분위수 샘플은 `.quantile` 접미사가 있는 `gauge` 유형의 메트릭에 매핑됩니다.

[101]: https://prometheus.io/docs/concepts/metric_types/#gauge
[102]: https://prometheus.io/docs/concepts/metric_types/#counter
[103]: /ko/metrics/custom_metrics/agent_metrics_submission/?tab=count#monotonic_count
[104]: https://prometheus.io/docs/concepts/metric_types/#histogram
[105]: https://www.datadoghq.com/blog/whats-next-monitoring-kubernetes/#distribution-metrics
[107]: https://prometheus.io/docs/concepts/metric_types/#counter
[108]: /ko/metrics/distributions/
[109]: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/
[110]: https://prometheus.io/docs/concepts/metric_types/#gauge
[111]: https://prometheus.io/docs/concepts/metric_types/#counter
[112]: /ko/integrations/guide/prometheus-metrics/?tab=latestversion#histogram
[113]: /ko/integrations/guide/prometheus-metrics/?tab=latestversion#summary

{{% /tab %}}
{{% tab "레거시 버전" %}}
### Counter

기본적으로 [Prometheus/OpenMetrics `counter`][101]는 Datadog의 `count`에 매핑됩니다.

그러나 `send_monotonic_counter` 파라미터가 `false`인 경우, 이 메트릭은 `gauge`로 전송됩니다.

### 게이지

[Prometheus/OpenMetrics `gauge`][103]는 Datadog의 `gauge`에 매핑됩니다.

### Histogram

[Prometheus/OpenMetrics `histogram`][104]의 경우 히스토그램의 `_count` 및 `_sum` 값은 각각 Datadog의 `gauge` 유형에 매핑되고 이름에 `.count` 및 `.sum` 접미사가 포함됩니다.

`send_histograms_buckets` 파라미터가 `true`인 경우 `_bucket` 샘플은 `.bucket`이라는 접미사와 함께 Datadog에 전송되며, 기본적으로 Datadog의 `gauge`에 매핑됩니다.

`send_distribution_counts_as_monotonic` 파라미터를 `true`로 설정하면 `_count` 및 `_bucket` 메트릭이 대신 `count` 유형으로 전송됩니다. `send_distribution_sums_as_monotonic`을 설정하면 `_sum` 메트릭에 대해 동일하게 적용됩니다.

`send_distribution_buckets` 파라미터가 `true`면 `_bucket` 샘플은 Datadog `distribution`으로 집계됩니다. [Datadog 분포 메트릭][108]은 [DDSketch 알고리즘][107]을 기반으로 하며 분위수와 같은 보다 고급 통계 집계를 허용합니다. 자세한 내용은 Datadog 엔지니어링 블로그 [OpenMetrics 및 분포 메트릭에 대한 게시물][106]를 참조하세요.


### 요약

[Prometheus/OpenMetrics `summary`][105]의 경우 `_count`및 `_sum` 값은 기본적으로 Datadog의 `gauge` 유형에 매핑되고 각각 이름에 `.count` 및 `.sum` 접미사가 포함됩니다. 분위수 샘플은 `.quantile` 접미사가 있는 `gauge` 유형의 메트릭에 매핑됩니다.

`send_distribution_counts_as_monotonic` 파라미터를 `true`로 설정하면 `_count` 및 `_sum` 메트릭은 대신 `count` 유형으로 전송됩니다. `send_distribution_sums_as_monotonic`을 설정하면 `_sum` 메트릭에 대해 동일하게 적용됩니다.

[101]: https://prometheus.io/docs/concepts/metric_types/#counter
[102]: /ko/metrics/custom_metrics/agent_metrics_submission/?tab=count#monotonic_count
[103]: https://prometheus.io/docs/concepts/metric_types/#gauge
[104]: https://prometheus.io/docs/concepts/metric_types/#histogram
[105]: https://prometheus.io/docs/concepts/metric_types/#summary
[106]: https://www.datadoghq.com/blog/whats-next-monitoring-kubernetes/#distribution-metrics
[107]: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/
[108]: /ko/metrics/distributions/

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">모든 <code>count</code> 메트릭은 Agent에 의해 <em>monotonic counts</em>로 처리되며, 이는 Agent가 실제로 연속적인 원시 값 간의 차이를 전송한다는 것을 의미합니다. 자세한 내용은 <a href="/metrics/custom_metrics/agent_metrics_submission/?tab=count#monotonic_count">메트릭 제출: 커스텀 Agent 점검</a>에서 확인하세요.</div>

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/kubernetes/prometheus/
[2]: https://github.com/OpenObservability/OpenMetrics/blob/main/specification/OpenMetrics.md#metric-types
[3]: /ko/metrics/types/