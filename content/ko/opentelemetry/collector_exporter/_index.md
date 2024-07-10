---
aliases:
- /ko/tracing/setup_overview/open_standards/otel_collector_datadog_exporter/
- /ko/tracing/trace_collection/open_standards/otel_collector_datadog_exporter/
- /ko/opentelemetry/otel_collector_datadog_exporter/
description: OpenTelemetry 데이터를 OpenTelemetry 컬렉터 및 Datadog 익스포터로 전송하기
further_reading:
- link: https://opentelemetry.io/docs/collector/
  tag: OpenTelemetry
  text: 컬렉터 설명서
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/
  tag: 블로그
  text: Datadog 익스포터를 사용해 메트릭, 트레이스, 로그를 OpenTelemetry 컬렉터에서 Datadog으로 전송합니다.
- link: https://www.datadoghq.com/blog/hivemq-opentelemetry-monitor-iot-applications/
  tag: 블로그
  text: HiveMQ와 OpenTelemetry를 사용하여 Datadog에서 IoT 애플리케이션을 모니터링합니다.
- link: /metrics/open_telemetry/otlp_metric_types
  tag: 설명서
  text: OTLP 메트릭 유형
title: OpenTelemetry 컬렉터 및 Datadog 익스포터
---

## 개요

OpenTelemetry 컬렉터는 수많은 프로세스가 생성하는 원격 측정 데이터를 수집하고 내보내기 위한 밴더 중립적 에이전트 프로세스입니다. OpenTelemetry 컬렉터용 [Datadog 익스포터][1]를 사용하면 트레이스, 메트릭, 로그 데이터를 OpenTelemetry SDK에서 Datadog으로 전송할 수 있습니다(Datadog 에이전트 없이 가능). 지원하는 모든 언어에서 작동하며, [OpenTelemetry 트레이스 데이터를 애플리케이션 로그와 연결][2]할 수 있습니다.

{{< img src="metrics/otel/datadog_exporter.png" alt="애플리케이션 계측 라이브러리, 클라우드 통합, 기타 모니터링 솔루션 (예: Prometheus) -> OpenTelemetry 컬렉터 내부 Datadog 익스포터 -> Datadog" style="width:100%;">}}

## 컬렉터 사용

다음 문서에서는 컬렉터를 배포 및 설정하는 방법을 설명합니다.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/collector_exporter/deployment/" >}}배포{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/configuration/" >}}설정{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/integrations/" >}}통합{{< /nextlink >}}
{{< /whatsnext >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[2]: /ko/tracing/other_telemetry/connect_logs_and_traces/opentelemetry