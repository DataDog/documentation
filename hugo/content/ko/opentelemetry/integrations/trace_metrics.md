---
aliases:
- /ko/opentelemetry/collector_exporter/trace_metrics/
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: 설명서
  text: 컬렉터 시작하기
- link: /opentelemetry/ingestion_sampling/
  tag: 설명서
  text: OpenTelemetry를 사용한 수집 샘플링
- link: /opentelemetry/guide/service_entry_spans_mapping/
  tag: 설명서
  text: 서비스 엔트리 스팬에 OpenTelemetry 시맨틱 규칙 매핑
title: 트레이스 메트릭
---
## 개요 {#overview}

{{< img src="/opentelemetry/collector_exporter/trace_metrics.png" alt="OpenTelemetry의 APM 메트릭" style="width:100%;" >}}

Datadog APM은 요청률, 오류, 지속 시간(RED)을 측정하는 트레이스 메트릭을 사용하여 Catalog, Service Page, Resource Page 및 `trace.*` 메트릭을 기반으로 구축된 모든 기능을 지원합니다.

이 페이지에서는 [업스트림 OpenTelemetry Collector][1]와 같이 OTLP 데이터를 Datadog으로 보내는 설정을 다룹니다. [DDOT Collector][4] 또는 [Datadog Exporter 및 Connector][6]를 사용하는 경우, Datadog Connector가 트레이스 메트릭을 계산합니다. DDOT SDK(OpenTelemetry 모드의 Datadog SDK)에 대해서는 [트레이스 메트릭 외삽 설정 및 최소 버전][3]을 참조하세요.

## 소스 선택 {#choose-a-source}

세 가지 소스에서 트레이스 메트릭을 계산할 수 있습니다. Datadog은 `span_metrics` 커넥터를 권장합니다.

| 소스 | 샘플링 동작 | 청구 |
|---|---|---|
| [`span_metrics` 커넥터](#use-the-span_metrics-connector)(권장) | Collector가 수신하는 모든 스팬에서 메트릭을 계산합니다. 커넥터를 모든 샘플링 프로세서 앞에 배치하세요. | APM에 포함되어 있습니다. |
| [SDK의 HTTP 메트릭](#use-http-metrics-from-the-sdk) | SDK가 내보내기 전에 모든 요청을 집계하므로 스팬 샘플링의 영향을 받지 않습니다. | 트레이스 메트릭에 사용되는 속성은 APM에 포함되어 있습니다. 원시 HTTP 메트릭은 삭제하지 않는 한 [사용자 지정 메트릭][7]으로 청구됩니다. |
| [Datadog 수집으로 전송된 스팬](#compute-trace-metrics-in-the-datadog-intake) | 수집이 수신하는 스팬에서만 메트릭을 계산합니다. 모든 트래픽을 포함하려면 샘플링되지 않은 스팬을 전송하세요. | APM에 포함되어 있습니다. |

`span_metrics` 커넥터와 함께 HTTP 메트릭을 사용하지 마세요. 이렇게 하면 Datadog이 두 소스 모두에서 트레이스 메트릭을 계산하게 됩니다.

## span_metrics 커넥터 사용 {#use-the-span-metrics-connector}

[권장 Collector 설정][1]에서 환경을 선택하고 해당 `span_metrics` 커넥터 블록 전체를 사용하세요. Datadog이 호스트 태그, 피어 서비스, 작업 이름 및 리소스 이름을 도출하는 데 사용하는 모든 차원을 유지하세요.

Collector가 수신하는 모든 스팬에서 메트릭을 계산하도록 커넥터를 모든 샘플링 프로세서 앞에 배치하세요.

[게이트웨이 배포][8]에서는 각 업스트림 Collector에 자체 `span_metrics` 커넥터를 제공하세요. 이미 샘플링된 스팬을 수신하는 게이트웨이는 과소 집계된 메트릭을 생성합니다.

## SDK의 HTTP 메트릭 사용 {#use-http-metrics-from-the-sdk}

Datadog은 OpenTelemetry SDK가 내보내는 [HTTP 메트릭][9]에서 트레이스 메트릭을 계산할 수 있습니다. 이 소스에는 다음과 같은 제한 사항이 있습니다.

- 모든 언어 SDK가 HTTP 메트릭을 내보내는 것은 아닙니다.
- HTTP 메트릭에는 RPC, 데이터베이스 또는 메시징 스팬에 해당하는 메트릭이 없습니다.
- OpenTelemetry 사양에서는 `http.server.request.duration` 및 `http.client.request.duration`만 안정적입니다.

이 소스를 사용하려면 [`dd-otel-metric-config` 헤더][10]에서 `trace_metrics.instrumentation_metrics_calc`를 `true`로 설정하세요. 원시 HTTP 메트릭을 유지하거나 삭제하려면 `raw_instrumentation_metrics_drop`을 설정하세요.

다음 표에서는 각 조합의 결과를 보여줍니다. 두 필드 모두 기본값은 `false`입니다.

| `trace_metrics.instrumentation_metrics_calc` | `raw_instrumentation_metrics_drop` | 결과 |
|---|---|---|
| `true` | `true` | HTTP 메트릭이 카디널리티가 낮은 트레이스 메트릭을 지원합니다. Datadog이 원시 HTTP 메트릭을 삭제하므로 사용자 지정 메트릭으로 요금이 청구되지 않습니다. |
| `true` | `false` | HTTP 메트릭이 트레이스 메트릭을 지원합니다. 또한 Datadog이 카디널리티가 완전한 원시 HTTP 메트릭을 사용자 지정 메트릭으로 유지합니다. 이를 자체 대시보드 및 모니터에서 사용할 수 있습니다. |
| `false` | `true` | `raw_instrumentation_metrics_drop`은 `trace_metrics.instrumentation_metrics_calc`가 `true`일 때만 적용되므로 효과가 없습니다. Datadog이 카디널리티가 완전한 원시 HTTP 메트릭을 사용자 지정 메트릭으로 유지합니다. 트레이스 메트릭을 지원하지 않고 삭제하려면 Collector에서 필터링하거나 SDK에서 해제하세요. |
| `false` | `false` | Datadog이 카디널리티가 완전한 원시 HTTP 메트릭을 사용자 지정 메트릭으로 유지합니다. |

## Datadog 수집에서 트레이스 메트릭 계산 {#compute-trace-metrics-in-the-datadog-intake}

Datadog은 기본적으로 OTLP 트레이스 수집으로 전송된 트레이스에 대한 트레이스 메트릭을 계산하지 않습니다. 전송하는 스팬에서 트레이스 메트릭을 계산하려면 트레이스를 전송하는 익스포터에서 `compute_stats` 헤더를 `true`로 설정하세요. 예시는 [OTLP 수집으로 트레이스 전송][11]을 참조하세요.

## 수집되는 데이터 {#data-collected}

[트레이스 메트릭][2]을 참조하세요.

## 전체 예시 구성 {#full-example-configuration}

전체 작동 예시 파일은 [`opentelemetry-examples` 리포지토리][5]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/opentelemetry/setup/collector_exporter/#span-metrics-connector
[2]: /ko/tracing/metrics/metrics_namespace/
[3]: /ko/opentelemetry/ingestion_sampling/#trace-metric-extrapolation-for-datadog-sdks
[4]: /ko/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/#datadog-connector
[5]: https://github.com/DataDog/opentelemetry-examples/tree/be842bc1447337c32f2d6265612232932a6cdbfd/configurations/opentelemetry-collector
[6]: /ko/opentelemetry/setup/collector_exporter/datadog_exporter/
[7]: /ko/metrics/custom_metrics/
[8]: https://opentelemetry.io/docs/collector/deploy/gateway/
[9]: https://opentelemetry.io/docs/specs/semconv/http/http-metrics/
[10]: /ko/opentelemetry/setup/collector_exporter/#dd-otel-metric-config-header
[11]: /ko/opentelemetry/setup/otlp_ingest/traces/