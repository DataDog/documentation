---
further_reading:
- link: /opentelemetry/instrument/
  tag: 설명서
  text: 애플리케이션 계측
- link: https://www.datadoghq.com/blog/otel-deployments/
  tag: 블로그
  text: OpenTelemetry 배포를 선택하는 방법
- link: https://learn.datadoghq.com/courses/otel-with-datadog
  tag: 학습 센터
  text: OpenTelemetry with Datadog 개요
- link: https://learn.datadoghq.com/courses/using-ddot
  tag: 학습 센터
  text: Datadog OpenTelemetry Collector 배포판 사용하기
title: OpenTelemetry 데이터를 Datadog으로 전송하기
---
이 페이지에서는 OpenTelemetry(OTel) 데이터를 Datadog으로 전송할 수 있는 모든 방법을 설명합니다.

## DDOT Collector (권장) {#ddot-collector-recommended}

Datadog Distribution of OpenTelemetry (DDOT) Collector는 OpenTelemetry (OTel)의 유연성과 Datadog의 종합적인 관측성 기능을 결합한 오픈 소스 솔루션입니다.

이 접근 방식을 사용하면 OpenTelemetry 파이프라인을 완전히 제어할 수 있으며, 다음과 같은 강력한 Datadog Agent 기반 기능도 이용할 수 있습니다.

- Fleet Automation
- Live Container Monitoring
- Kubernetes Explorer
- Live Processes
- Cloud Network Monitoring
- Universal Service Monitoring
- {{< translate key="integration_count" >}}+ Datadog 통합

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/install/" >}}
    <h3>Install the DDOT Collector</h3>
    Follow our guided setup to install the Collector and start sending your OpenTelemetry data to Datadog.
    {{< /nextlink >}}
{{< /whatsnext >}}

## 기타 설정 옵션 {#other-setup-options}

자체 OpenTelemetry Collector 배포판을 실행하거나 비 Kubernetes 환경에서 운영하는 등 특정 사용 사례에 맞는 대체 방법을 사용할 수 있습니다.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/" >}}
    <h3>Upstream OpenTelemetry Collector</h3>
    Best for: Users who manage their own OpenTelemetry Collector or require advanced processing capabilities like tail-based sampling.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/setup/otlp_ingest_in_the_agent" >}}
    <h3>OTLP Ingest in the Agent</h3>
    Best for: Users on platforms other than Kubernetes Linux, or those who prefer a minimal configuration without managing Collector pipelines.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/setup/agentless" >}}
    <h3>Direct OTLP Ingest</h3>
    Best for: Situations requiring direct data transmission to Datadog's intake endpoint without any intermediary components.
    {{< /nextlink >}}
{{< /whatsnext >}}

<div class="alert alert-info"><strong>여전히 어느 설정이 적합한지 잘 모르시겠습니까?</strong><br> <a href="/opentelemetry/compatibility/">기능 호환성</a> 표를 참조해 어느 Datadog 기능이 지원되는지 알아보세요.</div>

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/opentelemetry/setup/agent
[2]: /ko/opentelemetry/setup/collector_exporter/
[3]: /ko/opentelemetry/setup/agentless
[4]: /ko/opentelemetry/ingestion_sampling#tail-based-sampling
[5]: /ko/opentelemetry/agent
[6]: /ko/opentelemetry/setup/otlp_ingest_in_the_agent