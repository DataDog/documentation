---
further_reading:
- link: https://micrometer.io/docs/registry/otlp
  tag: 마이크로미터
  text: 마이크로미터 OTLP
- link: https://micrometer.io/docs/registry/prometheus
  tag: 마이크로미터
  text: 마이크로미터 프로메테우스(Prometheus)
kind: 가이드
title: 마이크로미터(Micrometer)를 사용한 메트릭 전송
---

## 개요

[마이크로미터][1]는 벤더 독립적 인터페이스로, 메트릭에 액세스하여 다양한 차원에서 분석할 수 있는 기능을 제공합니다. 주로 메트릭 제출을 위해 추상화 레이어로 자바(Java) 스프링 부트(Spring Boot) 애플리케이션과 함께 사용됩니다.

마이크로미터는 Datadog와 통합할 수 있는 다양한 방법을 제공합니다. 이 가이드는 에이전트를 사용해 Datadog에 메트릭을 전송하는 Datadog 권장 방법에 대해 간략히 설명합니다.

## 패싯

Datadog 에이전트의 OTLP(OpenTelemetry Protocol) 수집을 통해 Datadog 에이전트의 관측 가능성 기능을 활용할 수 있습니다.

{{< whatsnext desc="다음 설명서에 간략히 설명된 설정 참조:" >}}
    {{< nextlink href="/opentelemetry/otlp_ingest_in_the_agent/" >}}Datadog 에이전트의 OTLP 수집{{< /nextlink >}}
{{< /whatsnext >}}

## 프로메테우스 및 개방형메트릭(OpenMetrics)

프로메테우스나 개방형메트릭 통합을 사용해 애플리케이션 메트릭을 Datadog에 전송합니다.

{{< whatsnext desc="다음 설명서에 설명된 설정 참조:" >}}
    {{< nextlink href="/integrations/guide/prometheus-host-collection/#overview" >}}호스트에서 프로메테우스와 개방형 메트릭을 사용한 메트릭 수집{{< /nextlink >}}
    {{< nextlink href="/containers/kubernetes/prometheus/?tab=kubernetesadv2" >}}쿠버네티스(Kubernetes) 프로메테우스 및 개방형메트릭을 사용한 메트릭 수집{{< /nextlink >}}
    {{< nextlink href="/containers/docker/prometheus/?tab=standard" >}}도커(Docker) 프로메테우스 및 개방형메트릭을 사용한 메트릭 수집{{< /nextlink >}}
{{< /whatsnext >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://micrometer.io/