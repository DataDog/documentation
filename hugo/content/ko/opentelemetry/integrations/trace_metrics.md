---
aliases:
- /ko/opentelemetry/collector_exporter/trace_metrics/
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: 문서
  text: 컬렉터 시작하기
- link: /opentelemetry/guide/service_entry_spans_mapping/
  tag: 문서
  text: OpenTelemetry 시맨틱 규칙을 Service-entry 스팬에 매핑
title: 트레이스 메트릭
---
## 개요 {#overview}

{{< img src="/opentelemetry/collector_exporter/trace_metrics.png" alt="OpenTelemetry의 APM 메트릭" style="width:100%;" >}}

히트, 오류, 기간 등 APM 통계를 전송하려면 [`span_metrics` 커넥터][1]를 설정하세요. Collector가 수신한 모든 스팬에서 메트릭을 계산하도록 sampling processor보다 앞에 connector를 구성하세요.

DDOT SDKs (OpenTelemetry 모드의 Datadog SDKs)에 대해서는 [트레이스 메트릭 외삽 설정 및 최소 버전][3]을 참조하세요.

## 설정 {#setup}

[권장 컬렉터 설정][1]에서 환경을 선택하고 해당 `span_metrics` 커넥터 블록 전체를 사용하세요. Datadog이 호스트 태그, 피어 서비스, 작업 이름 및 리소스 이름을 도출하는 데 사용하는 모든 차원을 유지하세요.

## 수집되는 데이터 {#data-collected}

[트레이스 메트릭][2]을 확인하세요.

## 전체 설정 예시 {#full-example-configuration}

전체 작동 예시 파일은 [`opentelemetry-examples` 리포지토리][5]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/opentelemetry/setup/collector_exporter/#span-metrics-connector
[2]: /ko/tracing/metrics/metrics_namespace/
[3]: /ko/opentelemetry/ingestion_sampling/#trace-metric-extrapolation-for-datadog-sdks
[5]: https://github.com/DataDog/opentelemetry-examples/tree/be842bc1447337c32f2d6265612232932a6cdbfd/configurations/opentelemetry-collector