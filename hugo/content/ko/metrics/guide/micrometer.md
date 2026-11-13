---
description: OpenTelemetry, Prometheus 또는 OpenMetrics를 사용하여 Micrometer에서 Datadog으로
  애플리케이션 메트릭을 전송하십시오.
further_reading:
- link: https://docs.micrometer.io/micrometer/reference/implementations/otlp.html
  tag: 외부 사이트
  text: Micrometer OTLP
- link: https://docs.micrometer.io/micrometer/reference/implementations/prometheus.html
  tag: 외부 사이트
  text: Micrometer Prometheus
title: Micrometer로 메트릭 전송하기
---
## 개요 {#overview}

[Micrometer][1]은 메트릭에 액세스하여 해당 차원 전반에서 분석할 수 있도록 지원하는 벤더 중립적 인터페이스입니다. 메트릭을 제출하기 위한 추상화 계층으로 Java Spring Boot 애플리케이션과 함께 자주 사용됩니다.

Micrometer는 Datadog과 통합하는 다양한 방법을 제공합니다. 이 가이드에서는 Agent를 사용하여 Datadog으로 메트릭을 전송할 때 Datadog이 권장하는 옵션을 설명합니다.

## OpenTelemetry {#opentelemetry}

Datadog Agent의 OpenTelemetry Protocol (OTLP) 수집 기능을 사용하면 Datadog Agent의 관측성 기능을 활용할 수 있습니다.

{{< whatsnext desc="다음 문서에 설명된 구성을 참조하십시오:" >}}
    {{< nextlink href="/opentelemetry/otlp_ingest_in_the_agent/" >}}Agent의 OTLP 엔드포인트 설정{{< /nextlink >}}
{{< /whatsnext >}}

## Prometheus 및 OpenMetrics {#prometheus-and-openmetrics}

Prometheus 또는 OpenMetrics Integrations를 사용하여 애플리케이션 메트릭을 Datadog으로 전송하십시오. 

{{< whatsnext desc="다음 문서에 설명된 구성을 참조하십시오:" >}}
    {{< nextlink href="/integrations/guide/prometheus-host-collection/#overview" >}}호스트에서 Prometheus 및 OpenMetrics 메트릭 수집{{< /nextlink >}}
    {{< nextlink href="/containers/kubernetes/prometheus/?tab=kubernetesadv2" >}}Kubernetes Prometheus 및 OpenMetrics 메트릭 수집{{< /nextlink >}}
    {{< nextlink href="/containers/docker/prometheus/?tab=standard" >}}Docker Prometheus 및 OpenMetrics 메트릭 수집{{< /nextlink >}}
{{< /whatsnext >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://micrometer.io/