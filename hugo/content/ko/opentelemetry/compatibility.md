---
disable_sidebar: false
further_reading:
- link: /opentelemetry/troubleshooting/
  tag: 설명서
  text: OpenTelemetry 문제 해결
title: Datadog과 OpenTelemetry 호환성
---
## 개요 {#overview}

Datadog은 전체 OpenTelemetry(OTel) 구현부터 OpenTelemetry와 Datadog 구성 요소를 함께 사용하는 하이브리드 구성까지 다양한 사용 사례에 대응할 수 있도록 여러 가지 설정 옵션을 제공합니다. 이 페이지에서는 다양한 설정과 지원되는 Datadog 제품 및 기능 간의 호환성을 설명하여 필요에 가장 적합한 구성을 선택할 수 있도록 지원합니다.

## 설정 {#setups}

Datadog은 OpenTelemetry 사용을 위한 여러 가지 구성을 지원합니다. 이러한 구성의 주된 차이점은 SDK(OpenTelemetry 또는 Datadog)와 텔레메트리 데이터를 처리하고 전달하는 데 사용하는 Collector의 선택입니다.

| 설정 유형                                           | API                     | SDK         | Collector/Agent                               |
|------------------------------------------------------|-------------------------|-------------|-----------------------------------------------|
| [**Datadog SDK + DDOT (권장)**][29]           | Datadog API 또는 OTel API | Datadog SDK | Datadog Distribution of OTel Collector (DDOT) |
| [**OTel SDK + DDOT**][29]                            | OTel API                | OTel SDK    | Datadog Distribution of OTel Collector (DDOT) |
| [**OTel SDK + OTLP OTel Collector**][7]         | OTel API                | OTel SDK    | OTLP OTel Collector                      |
| [**Direct OTLP Ingest**][28]                         | OTel API                | OTel SDK    | N/A (직접 Datadog 엔드포인트로 전송)              |

## 기능 호환성 {#feature-compatibility}

다음 표는 다양한 설정 간 기능 호환성을 나타냅니다.

| 기능 | Datadog SDK + DDOT (권장) | OTel SDK + DDOT | OTel SDK + OTLP OTel Collector | Direct OTLP Ingest |
|---|---|---|---|---|
| [Cloud SIEM][18] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [상호 연계된 트레이스, 메트릭, 로그][19] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [분산 트레이싱][27] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Agent Observability][38] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [런타임 메트릭][23] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [스팬 링크][25] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [트레이스 메트릭][26] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}<br>({{< tooltip text="Sampled" tooltip="Datadog에 도달하는 스팬을 기준으로 계산되며, 구성한 OTel 측 샘플링이 반영됩니다." >}}) |
| [Database Monitoring][14](DBM) | {{< X >}} | {{< X >}} |  |  |
| [인프라 호스트 목록][30] | {{< X >}} | {{< X >}} | {{< X >}} |  |
| [Cloud Network Monitoring][21](CNM) | {{< X >}} | {{< X >}} | | |
| [Kubernetes 모니터링][20] | {{< X >}} | {{< X >}} | {{< X >}} | |
| [Live Container Monitoring][46] | {{< X >}} | {{< X >}} | | |
| [Live Processes][16] | {{< X >}} | {{< X >}} | | |
| [Universal Service Monitoring][17](USM) | {{< X >}} | {{< X >}} | | |
| [App and API Protection][11](AAP) | {{< X >}} | | | |
| [Continuous Profiler][12] | {{< X >}} | | | |
| [Data Observability: Jobs Monitoring][13](DJM) | {{< X >}} | | | |
| [Data Streams Monitoring][15](DSM) | {{< X >}} | | {{< tooltip text="N/A" tooltip="OTel은 DSM 기능을 제공하지 않습니다." >}} | {{< tooltip text="N/A" tooltip="OTel은 DSM 기능을 제공하지 않습니다." >}} |
| [Real User Monitoring][22](RUM) | {{< X >}} | | | |
| [소스 코드 통합][24] | {{< X >}} | | | |

## API 지원 {#api-support}

Datadog SDK는 다양한 언어로 OpenTelemetry 트레이스, 메트릭 및 로그 API를 지원합니다. 아래 표에서 원하는 언어를 찾아 설정 가이드 및 지원 세부 정보를 확인하세요.

| 언어 | 트레이스 API | 메트릭 API | 로그 API |
| :--- | :---: | :---: | :---: |
| [.NET][31] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Python][32] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Node.js][33] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Java][34] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Go][35] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Ruby][36] | {{< X >}} | Alpha | {{< X >}} |
| [PHP][37] | {{< X >}} | {{< X >}} | {{< X >}} |

## 자세히 알아보기 {#more-details}

### Agent Observability {#agent-observability}

[생성형 AI 속성](https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-spans/)이 포함된 OpenTelemetry 트레이스는 자동으로 Agent Observability 트레이스로 변환됩니다. 이 변환을 비활성화하려면 [Agent Observability 변환 비활성화][38]를 참조하세요.

### 런타임 메트릭 {#runtime-metrics}

- **Datadog SDK 설정**: DogStatsD(UDP 포트 8125)를 사용하여 [런타임 메트릭][23]을 전송합니다. Datadog Agent에서 DogStatsD가 활성화되어 있는지 확인하세요.
- **OpenTelemetry SDK 설정**: [OpenTelemetry 런타임 메트릭][1] 사양을 따르며 일반적으로 OTLP(포트 4317/4318)를 사용하여 전송됩니다.

### Real User Monitoring(RUM) {#real-user-monitoring-rum}

전체 RUM 기능을 활성화하려면 [지원되는 헤더를 삽입][2]하여 RUM과 트레이스를 연계해야 합니다.

### Cloud Network Monitoring(CNM) {#cloud-network-monitoring-cnm}

스팬 수준 또는 엔드포인트 수준 모니터링은 지원되지 **않습니다**.

자세한 내용은 [Cloud Network Monitoring 설정][3]을 참조하세요.

### 소스 코드 통합 {#source-code-integration}

OpenTelemetry 설정에서 지원되지 않는 언어를 사용하는 경우, [텔레메트리 태깅을 구성][5]하여 데이터를 특정 커밋에 연결합니다.

## 지원 수준 {#support-levels}

Datadog은 OpenTelemetry 구성 요소 및 구성에 대해 다양한 수준의 지원을 제공합니다.

- **Datadog 지원 구성 요소**: Datadog이 소유한 구성 요소, 예를 들어 [Datadog Connector][39], [Datadog Exporter][40], [Infra Attribute Processor][41] 등입니다. 이러한 구성 요소는 Datadog에서 유지 관리하고, 정기적으로 업데이트되며, 버그 수정 및 기능 개선이 우선적으로 적용됩니다.

- **커뮤니티 지원 구성 요소**: 기본적으로 [DDOT Collector에 포함된][42] OpenTelemetry 구성 요소입니다. Datadog은 이러한 구성 요소의 안전, 안정성 및 호환성을 보장할 수 있도록 지원합니다.

- **사용자 지정 구성 요소**: 기본적으로 포함되지 않는 OpenTelemetry 구성 요소 또는 구성, 예를 들어 [사용자 지정 Collector 구성 요소][43] 또는 [지원되지 않는 런타임 계측][44] 등입니다. Datadog이 출발점으로 삼을 지침과 설명서를 제공하지만, 이러한 구성 요소의 기능을 직접 지원하지는 않습니다. 사용자 지정 구성 요소에 문제가 있는 경우 [OpenTelemetry 커뮤니티][45] 또는 구성 요소 유지 관리 담당자에게 문의하세요.

## 플랫폼 및 환경 지원 {#platform-and-environment-support}

OpenTelemetry Collector는 많은 환경에 배포할 수 있지만, 일부 플랫폼에는 구체적인 제한이나 지원 요구 사항이 있습니다.

* **AWS EKS Fargate**: 이 환경은 **현재 지원되지 않으며** OpenTelemetry Collector와 함께 사용하면 인프라 호스트 요금이 잘못 청구될 수 있습니다. 공식 지원은 향후 릴리스에서 제공될 예정입니다. [Collector 설정 가이드][7]에서 최신 정보를 참조하세요.

## 모범 사례 {#best-practices}

Datadog과 OpenTelemetry를 함께 사용하는 경우, Datadog은 다음 모범 사례를 따라 최적의 성능을 보장하고 잠재적 문제를 방지하도록 권장합니다.

- **혼합 계측 사용 지양**: 대부분의 경우 동일한 애플리케이션에서 Datadog SDK와 OpenTelemetry SDK를 함께 사용하지 마세요. 정의되지 않은 동작을 초래할 수 있습니다.
  - **예외**: Python과 같은 일부 언어 지원의 경우 Datadog SDK와 OpenTelemetry SDK를 모두 설치해야 합니다.
  - 항상 해당 언어에 맞는 [언어별 계측 설명서][8]를 따르고, 올바르게 지원되는 설정을 사용하고 있는지 확인하세요.
- **동일한 호스트에서 Agent 및 별도의Collector 사용 지양**: 동일한 호스트에서 Datadog Agent와 별도의 OpenTelemetry Collector를 실행하지 마세요. 문제가 발생할 수 있습니다. 단, 동일한 플릿에 속한 다른 호스트에서는 Agent와 Collector를 실행할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/opentelemetry/integrations/runtime_metrics/
[2]: /ko/real_user_monitoring/correlate_with_other_telemetry/apm/
[3]: /ko/network_monitoring/cloud_network_monitoring/setup/
[4]: /ko/infrastructure/process/
[5]: /ko/integrations/guide/source-code-integration/?tab=go#configure-telemetry-tagging
[6]: /ko/opentelemetry/interoperability/otlp_ingest_in_the_agent/
[7]: /ko/opentelemetry/collector_exporter/
[8]: /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[9]: /ko/opentelemetry/agent
[10]: /ko/tracing/trace_collection/
[11]: /ko/security/application_security/
[12]: /ko/profiler/
[13]: /ko/data_jobs/
[14]: /ko/opentelemetry/correlate/dbm_and_traces/
[15]: /ko/data_streams/
[16]: /ko/infrastructure/process/
[17]: /ko/universal_service_monitoring/
[18]: /ko/security/cloud_siem/
[19]: /ko/opentelemetry/correlate/
[20]: /ko/containers/monitoring/kubernetes_explorer/
[21]: /ko/network_monitoring/performance/
[22]: /ko/opentelemetry/correlate/rum_and_traces/?tab=browserrum#opentelemetry-support
[23]: /ko/tracing/metrics/runtime_metrics/
[24]: /ko/integrations/guide/source-code-integration/
[25]: /ko/tracing/trace_collection/span_links/
[26]: /ko/tracing/metrics/metrics_namespace/
[27]: /ko/tracing/trace_collection/
[28]: /ko/opentelemetry/setup/agentless
[29]: /ko/opentelemetry/setup/ddot_collector
[30]: /ko/infrastructure/list/
[31]: /ko/opentelemetry/instrument/api_support/dotnet/
[32]: /ko/opentelemetry/instrument/api_support/python/
[33]: /ko/opentelemetry/instrument/api_support/nodejs/
[34]: /ko/opentelemetry/instrument/api_support/java/
[35]: /ko/opentelemetry/instrument/api_support/go/
[36]: /ko/opentelemetry/instrument/api_support/ruby/
[37]: /ko/opentelemetry/instrument/api_support/php/
[38]: /ko/llm_observability/instrument/otel_instrumentation/
[39]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/datadogconnector/README.md
[40]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/README.md
[41]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/otlp/components/processor/infraattributesprocessor#readme
[42]: /ko/opentelemetry/setup/ddot_collector/#opentelemetry-collector-components
[43]: /ko/opentelemetry/setup/ddot_collector/custom_components
[44]: /ko/opentelemetry/guide/instrument_unsupported_runtimes
[45]: https://opentelemetry.io/community/
[46]: /ko/containers/