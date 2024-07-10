---
further_reading:
- link: /metrics/open_telemetry/otlp_metric_types
  tag: 설명서
  text: OTLP 메트릭 유형
- link: /opentelemetry/
  tag: 설명서
  text: Datadog의 OpenTelemetry 지원
title: OTLP 히스토그램을 히트맵으로 시각화
---

## 개요

OTLP(OpenTelemetry Protocol)는 OTLP 히스토그램 전송을 지원합니다. OTLP 히스토그램은 합계, 개수, 최솟값, 최댓값과 같은 집계 통계를 제공하여 측정 세트를 압축한 메트릭 유형입니다. 또한 이와 같은 측정 수치 중 사용자가 구성할 수 버킷에 해당하는 개수는 얼마나 되는지 측정합니다.

이 데이터 유형은 Datadog에서 [히트맵][5]으로 시각화할 수 있습니다. 이 페이지의 다음 단계를 따르세요.

**참고**: 관련 OTLP 지수 히스토그램 유형은 분산으로 전환되기 때문에 히트맵으로 표시할 수 있습니다. [전용 분산 페이지][4]에서 분산에 대해 자세히 알아보세요.

## 설정

이 가이드에서는 [OpenTelemetry 메트릭을 Datadog로 전송하는 설정][1]이 되어 있다고 가정합니다.

### OpenTelemetry SDK 구성

OpenTelemetry SDK로 메트릭을 생성중인 경우 다음 단계를 따라 구성하세요.

1. [OTLP 히스토그램을 전송하는 SDK를 델타 시간성으로 구성][2]하세요. 이렇게 하면 히트맵 위젯에서 최솟값과 최댓값을 사용할 수 있습니다.
2. 내 집계에서 [기본 버킷 경계][3]를 재정의할 것인지 결정하세요. **참고**: 각 추가 버킷을 별도의 커스텀 메트릭으로 취급합니다.

다른 소스에서 오는 메트릭의 경우 최솟값과 최댓값 필드가 설정된 OTLP 히스토그램 형식인지 확인해야 합니다.

### Datadog Exporter 또는 Datadog 에이전트 구성

Datadog Exporter나 Datadog 에이전트에서 히스토그램 모드를 설정하고 집계 메트릭을 활성화하세요.

{{< tabs >}}
{{% tab "Datadog Exporter(OpenTelemetry Collector)" %}}

Datadog Exporter의 `collector.yaml` 파일에서 히스토그램 모드를 `counters`로 구성하고 `send_aggregation_metrics` 플래그로 집계 메트릭을 활성화하세요.

```yaml
exporters:
  datadog:
    metrics:
      histograms:
        mode: counters
        send_aggregation_metrics: true
```

**참고**: `send_aggregation_metrics`의 경우 Datadog Exporter v0.75.0부터 사용할 수 있습니다. 이전 버전을 사용 중일 경우에는 대신 `send_count_sum_metrics`을 사용하세요. 이전 버전에서는 최솟값과 최댓값이 누락되어 있습니다.

{{% /tab %}}
{{% tab "Datadog 에이전트" %}}

`otlp_config` 섹션에서 히스토그램 모드를 `counters`로 구성하고 `send_aggregation_metrics` 플래그로 집계 메트릭을 활성화하세요.

```yaml
otlp_config:
  metrics:
    histograms:
      mode: counters
      send_aggregation_metrics: true
```

**참고**: `send_aggregation_metrics`의 경우 Datadog 에이전트 v6.45.0/v7.45.0부터 사용할 수 있습니다. 이전 버전을 사용 중일 경우에는 대신 `send_count_sum_metrics`을 사용하세요. 이전 버전에서는 최솟값과 최댓값이 누락되어 있습니다.

{{% /tab %}}
{{< /tabs >}}


### 히트맵 위젯 구성

[히트맵 위젯][5]은 Datadog Exporter나 Datadg 에이전트에서 생성한 `<YOUR METRIC NAME>.bucket` 메트릭 세트를 사용하며, 각 위젯이 다른 히스토그램 버킷을 나타냅니다. 히스토그램을 히트맵으로 시각화하려면 다음을 따르세요.

1. `<YOUR METRIC NAME>.bucket`를 시각화할 메트릭으로 선택하세요.
2. `distributions of` 메뉴에서 `pre-binned data`를 선택하세요.

이제 OTLP 히스토그램을 히트맵 위젯에서 볼 수 있습니다.

## OpenMetric 호환

[Datadog 에이전트 OpenMetrics 점검][6]은 사전 범주화 데이터 히트맵 위젯 옵션과도 호환됩니다. OpenTelemetry로 전환할 필요 없이 바로 OpenMetrics 점검으로 메트릭을 전송하고 싶을 경우 인스턴스에서 `collect_histogram_buckets`와 `non_cumulative_histogram_buckets` 플래그를 활성화하여 데이터가 호환 가능한 상태로 Datadog로 전송되도록 해야 합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/opentelemetry/otel_metrics
[2]: /ko/opentelemetry/guide/otlp_delta_temporality
[3]: https://opentelemetry.io/docs/reference/specification/metrics/sdk/#explicit-bucket-histogram-aggregation
[4]: /ko/metrics/distributions
[5]: /ko/dashboards/widgets/heatmap
[6]: /ko/integrations/openmetrics