---
aliases:
- /ko/opentelemetry/collector_exporter/trace_metrics/
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: 설명서
  text: 컬렉터 시작하기
- link: /opentelemetry/guide/service_entry_spans_mapping/
  tag: 설명서
  text: OpenTelemetry 시맨틱 규칙을 Service-entry 스팬에 매핑
title: 트레이스 메트릭
---
## 개요 {#overview}

{{< img src="/opentelemetry/collector_exporter/trace_metrics.png" alt="OpenTelemetry의 APM 메트릭" style="width:100%;" >}}

히트, 오류, 기간 등 APM 통계를 전송하려면 [`span_metrics` 커넥터][1]를 설정하세요. 트레이스 메트릭이 샘플링되지 않은 트래픽을 나타내도록 모든 샘플링 프로세서 이전에 트레이스를 수신하도록 커넥터를 구성하세요.

## 설정 {#setup}

[권장 컬렉터 설정][1]에서 환경을 선택하고 해당 `span_metrics` 커넥터 블록 전체를 사용하세요. Datadog이 호스트 태그, 피어 서비스, 작업 이름 및 리소스 이름을 도출하는 데 사용하는 모든 차원을 유지하세요.

## 수집된 데이터 {#data-collected}

[트레이스 메트릭][2]을 확인하세요.

## 전체 설정 예시 {#full-example-configuration}

전체 작동 예시 파일은 [`opentelemetry-examples` 리포지토리][5]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/opentelemetry/setup/collector_exporter/#span-metrics-connector
[2]: /ko/tracing/metrics/metrics_namespace/
[5]: https://github.com/DataDog/opentelemetry-examples/tree/be842bc1447337c32f2d6265612232932a6cdbfd/configurations/opentelemetry-collector