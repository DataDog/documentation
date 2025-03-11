---
aliases:
- /ko/opentelemetry/collector_exporter/trace_metrics/
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: 설명서
  text: 컬렉터(Collector) 시작하기
- link: /opentelemetry/guide/service_entry_spans_mapping/
  tag: 설명서
  text: OpenTelemetry 시맨틱 규칙을 Service-entry 스팬에 매핑
title: 트레이스 메트릭
---

<div class="alert alert-info">
<a href="/opentelemetry/guide/service_entry_spans_mapping/">OpenTelemetry 시맨틱 규칙을  Service-entry 스팬에 매핑</a>하는 기능은 현재 공개 베타 버전이며 OpenTelemetry 스팬에서 생성된 트레이스 메트릭에 대한 개선 사항이 포함되어 있습니다.
</div>

## 개요

{{< img src="/opentelemetry/collector_exporter/trace_metrics.png" alt="OpenTelemetry의 APM 메트릭" style="width:100%;" >}}

히트, 오류, 기간 등 APM 통계를 전송하려면 [Datadog Connector][1]를 설정하세요.

자세한 내용은 [Datadog Connector][1]에 대한 OpenTelemetry 프로젝트 설명서를 참조하세요.

## 설정

컬렉터(Collector) 설정 에 다음 줄을 추가합니다:

```yaml
processors:
  probabilistic_sampler:
    sampling_percentage: 20
connectors:
    # "datadog" 커넥터 정의 및 추가 구성을 추가합니다.
    datadog/connector:
exporters:
  datadog:
    api:
      key: ${env:DD_API_KEY}
service:
  pipelines:
   traces:
     receivers: [otlp]
     processors: [batch]
     exporters: [datadog/connector]
   traces/2:
     receivers: [datadog/connector]
     processors: [batch, probabilistic_sampler]
     exporters: [datadog]
  metrics:
    receivers: [datadog/connector]
    processors: [batch]
    exporters: [datadog]
```

## 수집한 데이터

[트레이스 메트릭][2]을 확인하세요 .

## 전체 예제 설정

Datadog 내보내기를 사용한 전체 작업 예제 구성은 [`trace-metrics.yaml`][3]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector
[2]: /ko/tracing/metrics/metrics_namespace/
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/trace-metrics.yaml