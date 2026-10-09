---
description: OpenTelemetry 데이터를 OpenTelemetry Collector 및 Datadog Exporter로 전송하기
further_reading:
- link: /opentelemetry/setup/ddot_collector/install/
  tag: 설명서
  text: DDOT Collector 설치(권장)
- link: /opentelemetry/compatibility/
  tag: 설명서
  text: 기능 호환성
- link: https://www.datadoghq.com/architecture/opentelemetry-collector-in-kubernetes/
  tag: 아키텍처 센터
  text: Kubernetes의 OpenTelemetry Collector
title: OpenTelemetry Collector 설치 및 구성
---
## 개요 {#overview}

이 페이지에서는 텔레메트리 데이터를 Datadog으로 전송하기 위한 독립형 OpenTelemetry Collector 설치 및 구성 가이드를 제공합니다.

이 방법은 OpenTelemetry 오픈 소스 커뮤니티의 OTel Collector 배포판을 사용하려는 사용자나 다른 설정에서 제공하지 않는 고급 처리 기능이 필요한 사용자에게 가장 적합합니다. 대부분의 사용 사례에서는 [Datadog Distribution of OTel Collector (DDOT)][1]를 권장합니다.

## 설정 {#setup}

시작하려면 OpenTelemetry Collector를 설치한 다음 Datadog Exporter로 구성합니다. 이 가이드는 보다 구체적인 구성 주제로 넘어가기 전에 필요한 초기 설정을 안내합니다.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/install" >}}
    <h3>Install and Configure the Collector</h3>
    Follow the initial setup steps to get a Collector running with the Datadog Exporter.
    {{< /nextlink >}}
{{< /whatsnext >}}

## 구성 {#configuration}

Collector를 실행한 후 이 가이드를 활용하여 텔레메트리 데이터를 수집하고 보강하는 데 필요한 특정 수신기 및 프로세서를 구성합니다.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/deploy" >}}
    <h3>Deploy the Collector</h3>
    Learn how to run the Collector in various environments, including on a host, in Docker, or as a DaemonSet or Gateway in Kubernetes.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/hostname_tagging" >}}
    <h3>Configure Hostname and Tagging</h3>
    Use resource detection and Kubernetes attributes processors to ensure proper hostname resolution and apply critical tags for correlating telemetry in Datadog.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/log_collection" >}}
    <h3>Set up Log Collection</h3>
    Configure the filelog receiver to collect logs from files and forward them to Datadog, enabling unified logs, metrics, and traces.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/otlp_receiver" >}}
    <h3>Enable the OTLP Receiver</h3>
    Configure the OTLP receiver to accept traces, metrics, and logs from your OpenTelemetry-instrumented applications over gRPC or HTTP.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/collector_batch_memory" >}}
    <h3>Tune Batch and Memory Settings</h3>
    Optimize your Collector's performance and resource consumption by configuring the batch processor and memory limiter.
    {{< /nextlink >}}
{{< /whatsnext >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/opentelemetry/setup/ddot_collector/install/