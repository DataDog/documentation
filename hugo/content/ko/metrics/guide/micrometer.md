---
further_reading:
- link: https://docs.micrometer.io/micrometer/reference/implementations/otlp.html
  tag: 외부 사이트
  text: Micrometer OTLP
- link: https://docs.micrometer.io/micrometer/reference/implementations/prometheus.html
  tag: 외부 사이트
  text: Micrometer Prometheus
title: Micrometer로 메트릭 전송하기
---

## 개요

[Micrometer][1]는 벤더 중립형 인터페이스로, 이를 이용해 메트릭에 접근해 여러 차원 전반에서 메트릭을 분석할 수 있습니다. Java Spring Boot 애플리케이션과 함께 메트릭 전송용 추상화 계층으로 사용됩니다.

Micrometer는 Datadog과 통합하는 다양한 방법을 제공합니다. 이 가이드에서는 Agent를 사용해 메트릭을 Datadog으로 전송하는 Datadog 권장 옵션을 설명합니다.

## OpenTelemetry

Datadog Agent의 OpenTelemetry Protocol(OTLP) 수집 기능으로 Datadog Agent의 가시성을 활용할 수 있습니다.

{{< whatsnext desc="다음 문서에서 설명한 설정을 참조하세요." >}}
    {{< nextlink href="/opentelemetry/otlp_ingest_in_the_agent/" >}}Datadog Agent로 OTLP 수집{{< /nextlink >}}
{{< /whatsnext >}}

## Prometheus 및 OpenMetrics

Prometheus 또는 OpenMetrics 통합으로 애플리케이션 메트릭을 Datadog에 전송합니다. 

{{< whatsnext desc="다음 문서에서 설명한 설정을 참조하세요." >}}
    {{< nextlink href="/integrations/guide/prometheus-host-collection/#overview" >}}호스트에서 Prometheus 및 OpenMetrics 메트릭 수집{{< /nextlink >}}
    {{< nextlink href="/containers/kubernetes/prometheus/?tab=kubernetesadv2" >}}Kubernetes Prometheus 및 OpenMetrics 메트릭 수집{{< /nextlink >}}
    {{< nextlink href="/containers/docker/prometheus/?tab=standard" >}}Docker Prometheus 및 OpenMetrics 메트릭 수집{{< /nextlink >}}
{{< /whatsnext >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://micrometer.io/