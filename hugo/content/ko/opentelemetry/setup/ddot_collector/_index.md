---
aliases:
- /ko/opentelemetry/agent/
further_reading:
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: 블로그
  text: Datadog LLM Observability는 OpenTelemetry GenAI 시맨틱 규칙을 기본적으로 지원합니다.
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: 블로그
  text: DDOT 게이트웨이를 통해 OpenTelemetry 파이프라인을 중앙에서 관리 및 제어
- link: https://www.datadoghq.com/blog/datadog-distribution-otel-collector/
  tag: 블로그
  text: DDOT Collector를 사용하여 OpenTelemetry와 Datadog 통합
- link: https://learn.datadoghq.com/courses/using-ddot
  tag: 학습 센터
  text: Datadog OpenTelemetry Collector 배포판 사용하기
title: Datadog OpenTelemetry Collector 배포판
---
{{< callout btn_hidden="true" >}}
DDOT Collector for Kubernetes는 현재 <strong>정식 출시</strong> 상태입니다. 아래의 <a href="#get-started">지침</a>을 따라 시작할 수 있습니다.
<br><br>
Linux 기반의 베어 메탈 호스트와 가상 머신에 DDOT Collector를 배포하는 것은 현재 <strong>미리보기 상태</strong>입니다. 시작하려면 <a href="/opentelemetry/setup/ddot_collector/install/linux">Linux 설명서</a>를 따르세요.
{{< /callout >}}

## 개요 {#overview}

Datadog Distribution of OpenTelemetry(DDOT) Collector는 OpenTelemetry(OTel)의 유연성과 Datadog의 종합적인 관측성 기능을 결합한 오픈 소스 솔루션입니다. 이 통합 솔루션에는 다음이 포함됩니다.

- Datadog에 맞게 성능과 안정성이 최적화된 [OpenTelemetry 구성 요소](#included-components)의 엄선된 세트. 추가 구성 요소를 선택하여 추가할 수 있습니다.
- Datadog Agent의 전체 데이터 수집 및 처리 기능을 통해 원활한 통합과 강력한 모니터링이 가능하며, DDOT Collector를 위한 [Datadog Fleet Automation][9] 지원이 포함됩니다(자세한 내용은 [주요 이점](#key-benefits) 참조).
최고의 온보딩 경험을 제공하도록 설계된 - [맞춤형 Datadog 구성 요소](#custom-datadog-components)

{{< img src="/opentelemetry/setup/ddot-collector-2.png" alt="Datadog Agent에 내장된 DDOT Collector의 아키텍처 개요입니다." style="width:100%;" >}}

## 주요 이점 {#key-benefits}

DDOT Collector는 다음 기능을 제공합니다.

### 포괄적인 관측성 {#comprehensive-observability}

-  {{< translate key="integration_count" >}} 개의 Datadog 통합, [Live Container Monitoring][3], [Cloud Network Monitoring][7] 및 [Universal Service Monitoring][5](eBPF 포함) 등을 열람합니다.
- OpenTelemetry 커뮤니티에서 기여한 통합을 활용하여 OpenTelemetry 프로토콜(OTLP) 기본 형식으로 텔레메트리를 수집합니다.
- Collector의 처리 및 라우팅 기능으로 OTLP 데이터를 제어합니다.

### 간소화된 플릿 관리 {#simplified-fleet-management}

- [Datadog Fleet Automation][9]을 통해 DDOT Collector 플릿을 원격으로 관리합니다.
- 전체 구성, 종속성 및 런타임 환경에 대한 가시성을 확보합니다.
- OTLP 데이터에 대한 즉시 사용 가능한 태깅 보강으로 더 빠르게 온보딩하며, [unified service tagging][1]을 자동으로 활성화합니다.

### 엔터프라이즈 안전성 및 자원 {#enterprise-reliability-and-resources}

- 정기적인 취약성 스캔과 분석을 포함한 Datadog의 강력한 보안 관행의 혜택을 누립니다.
- 온보딩 및 문제 해결을 지원하는 Datadog 글로벌 지원 팀의 도움을 받습니다.

## 포함된 구성 요소 {#included-components}

<div class="alert alert-info">
  <strong>추가 OpenTelemetry 구성 요소가 필요하신가요?</strong> 기본 패키지에 포함된 구성 요소 외에 추가 구성 요소가 필요한 경우 Datadog Agent 기능을 확장하기 위해 <a href="/opentelemetry/setup/ddot_collector/custom_components">사용자 지정 OpenTelemetry 구성 요소 사용</a>을 참조하세요. 기본적으로 포함된 구성 요소 목록은 다음의 <a href="#opentelemetry-collector-components">OpenTelemetry Collector 구성 요소</a> 섹션을 참조하세요.
</div>

### OpenTelemetry Collector 버전 {#opentelemetry-collector-versions}

다음 표는 각 DDOT 릴리스에 포함된 OpenTelemetry Collector 버전을 보여줍니다.

| DDOT 버전 | 베타 버전 | 안정 버전 |
|---|---|---|
| 7.78.0 | v0.147.0 | v1.53.0 |
| 7.77.0 | v0.145.0 | v1.51.1-0.20260205185216-81bc641f26c0 |
| 7.76.0 | v0.144.0 | v1.50.0 |
| 7.75.0 | v0.142.0 | v1.48.0 |
| 7.74.0 | v0.140.0 | v1.46.0 |
| 7.73.0 | v0.138.0 | v1.44.0 |
| 7.72.0 | v0.136.0 | v1.42.0 |
| 7.71.0 | v0.133.0 | v1.39.0 |
| 7.70.0 | v0.131.0 | v1.37.0 |
| 7.69.0 | v0.129.0 | v1.35.0 |

### 지원 수준 {#support-levels}

Datadog, 커뮤니티 및 사용자 정의 구성 요소 지원에 대한 자세한 내용은 호환성 페이지의 [지원 수준][57]을 참조하세요.

### OpenTelemetry Collector 구성 요소 {#opentelemetry-collector-components}

기본적으로 DDOT Collector는 다음 Collector 구성 요소와 함께 제공됩니다. [YAML 형식][11]에서 목록을 볼 수도 있습니다.

{{% collapse-content title="리시버" level="p" %}}

- [filelogreceiver][16]
- [fluentforwardreceiver][17]
- [hostmetricsreceiver][18]
- [jaegerreceiver][19]
- [otlpreceiver][20]
- [prometheusreceiver][21]
- [receivercreator][22]
- [zipkinreceiver][23]
- [nopreceiver][24]

{{% /collapse-content %}}

{{% collapse-content title="프로세서" level="p" %}}

- [attributesprocessor][25]
- [batchprocessor][26]
- [cumulativetodeltaprocessor][27]
- [filterprocessor][28]
- [groupbyattributeprocessor][29]
- [k8sattributesprocessor][30]
- [memorylimiterprocessor][31]
- [probabilisticsamplerprocessor][32]
- [resourcedetectionprocessor][33]
- [resourceprocessor][34]
- routingprocessor(v7.71.0에서 사용 중단 및 제거됨. 대신 [routingconnector][56] 사용)
- [tailsamplingprocessor][36]
- [transformprocessor][37]

{{% /collapse-content %}}

{{% collapse-content title="익스포터" level="p" %}}

- [datadogexporter][38]
- [debugexporter][39]
- [loadbalancingexporter][55]
- [otlpexporter][40]
- [otlphttpexporter][41]
- [sapmexporter][42]
- [nopexporter][43]

{{% /collapse-content %}}

{{% collapse-content title="커넥터" level="p" %}}

- [datadogconnector][44]
- [routingconnector][56](버전 7.68.0부터 사용 가능)
- [spanmetricsconnector][45]

{{% /collapse-content %}}

{{% collapse-content title="확장" level="p" %}}

- [healthcheckextension][46]
- [observer][47]
- [pprofextension][48]
- [zpagesextension][49]

{{% /collapse-content %}}

### 사용자 지정 Datadog 구성 요소 {#custom-datadog-components}

표준 OpenTelemetry 구성 요소 외에도, Datadog은 다음과 같은 사용자 지정 구성 요소를 제공하고 유지 관리합니다.

{{% collapse-content title="Datadog 구성 요소" level="p" %}}

- [Infrastructure Attribute Processor][50]: OpenTelemetry 프로세서 구성 요소로, 포드 내의 개별 컨테이너에서 전송되는 OTLP 텔레메트리(메트릭, 트레이스, 로그)에 [Kubernetes 태그][53]를 자동으로 할당합니다. 이 구성 요소는 Kubernetes 환경 모니터링을 위한 [unified service tagging][54] 및 텔레메트리 상관 분석을 지원합니다.

- [Converter][51]: 사용자 제공 구성을 향상시키는 OpenTelemetry 변환기 구성 요소입니다. API를 제공하여 원본 구성과 향상된 구성을 모두 반환하며, 오류를 줄이기 위해 알려진 구성 오류를 자동으로 검사합니다. 이를 통해 기존 OpenTelemetry Collector 구성이 Datadog Agent와 원활하게 통합할 수 있습니다.

- [DD Flare Extension][52]: 문제 해결을 위해 DDOT Collector와 Agent의 진단 정보를 포함하는 Agent Flare를 생성하는 OpenTelemetry 확장 구성 요소입니다.

{{% /collapse-content %}}

## 시작하기 {#get-started}

Datadog 초보자이든 OpenTelemetry 경험이 있든 관계없이, 다음 가이드를 통해 환경에 맞는 시작 방법을 선택할 수 있습니다.

### 기본 Agent 패키지로 빠르게 시작 {#quick-start-with-the-default-agent-package}

기본 Datadog Agent 패키지에는 대부분의 요구 사항을 충족하도록 설계된 DDOT Collector와 [선별된 OpenTelemetry 구성 요소 세트](#included-components)가 포함되어 있습니다. 이 가이드는 다음과 같은 경우에 적합합니다.

- [포함된 구성 요소](#included-components) 외에 추가 OpenTelemetry 구성 요소 없이 신규 모니터링을 설정하려는 경우
- Datadog Agent 사용 중이고 포함된 구성 요소로 OpenTelemetry 기능을 테스트하려는 경우
- 기본적으로 포함된 구성 요소 외에 추가 구성 요소가 필요하지 않고 OpenTelemetry Collector에서 Datadog Agent로 전환하는 경우
- (선택 사항) 기본 패키지에 제공되는 것 외에 OpenTelemetry 구성 요소가 필요한 경우, [사용자 지정 OpenTelemetry 구성 요소 사용][2]을 따라 Datadog Agent의 기능을 확장할 수 있습니다.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/install/kubernetes" >}}기본 Agent 패키지로 빠르게 시작{{< /nextlink >}}
{{< /whatsnext >}}

### OpenTelemetry Collector에서 Datadog Agent로 마이그레이션 {#migrate-from-opentelemetry-collector-to-datadog-agent}

이 가이드는 기존 OpenTelemetry Collector 설정에서 Datadog Agent로 마이그레이션하는 데 도움을 주며, 추가 OpenTelemetry 구성 요소가 필요한 경우도 포함합니다. 이 가이드는 다음과 같은 경우에 적합합니다.

- 기존 설정을 유지하면서 OpenTelemetry Collector에서 전환하는 경우
- 연속성을 유지하기 위해 기존 OpenTelemetry 구성을 마이그레이션하는 경우
- (선택 사항) 기본 패키지에 제공되는 것 외에 OpenTelemetry 구성 요소가 필요한 경우, [사용자 지정 OpenTelemetry 구성 요소 사용][2]을 따라 Datadog Agent의 기능을 확장할 수 있습니다.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/guide/migrate/ddot_collector" >}}OpenTelemetry Collector에서 Datadog Agent로 마이그레이션{{< /nextlink >}}
{{< /whatsnext >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/tagging/unified_service_tagging/
[2]: /ko/opentelemetry/setup/ddot_collector/custom_components
[3]: /ko/containers/
[4]: /ko/security/sensitive_data_scanner/
[5]: /ko/universal_service_monitoring/
[7]: /ko/network_monitoring/cloud_network_monitoring/
[9]: /ko/agent/fleet_automation/
[11]: https://github.com/DataDog/datadog-agent/blob/main/comp/otelcol/collector-contrib/impl/manifest.yaml
[16]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/filelogreceiver/README.md
[17]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/fluentforwardreceiver/README.md
[18]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/hostmetricsreceiver/README.md
[19]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/jaegerreceiver/README.md
[20]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/receiver/otlpreceiver/README.md
[21]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/prometheusreceiver/README.md
[22]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/receivercreator/README.md
[23]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/zipkinreceiver/README.md
[24]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/receiver/nopreceiver#readme
[25]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/attributesprocessor/README.md
[26]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/batchprocessor/README.md
[27]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/cumulativetodeltaprocessor/README.md
[28]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/filterprocessor/README.md
[29]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/groupbyattrsprocessor/README.md
[30]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/k8sattributesprocessor/README.md
[31]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/memorylimiterprocessor/README.md
[32]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/probabilisticsamplerprocessor/README.md
[33]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/resourcedetectionprocessor/README.md
[34]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/resourceprocessor/README.md
[36]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/tailsamplingprocessor/README.md
[37]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/transformprocessor/README.md
[38]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/README.md
[39]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/debugexporter/README.md
[40]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlpexporter/README.md
[41]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlphttpexporter/README.md
[42]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/sapmexporter/README.md
[43]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/nopexporter/README.md
[44]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/datadogconnector/README.md
[45]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/spanmetricsconnector/README.md
[46]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/healthcheckextension/README.md
[47]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/observer/README.md
[48]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/pprofextension/README.md
[49]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/extension/zpagesextension/README.md
[50]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/otlp/components/processor/infraattributesprocessor#readme
[51]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/converter#readme
[52]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/ddflareextension#readme
[53]: /ko/containers/kubernetes/tag/?tab=datadogoperator#out-of-the-box-tags
[54]: /ko/getting_started/tagging/unified_service_tagging/?tab=kubernetes
[55]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/loadbalancingexporter/README.md
[56]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/routingconnector/README.md
[57]: /ko/opentelemetry/compatibility/#support-levels