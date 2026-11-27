---
aliases:
- /ko/opentelemetry/agent/
description: DDOT Collector는 Datadog이 빌드하고 지원하는 OpenTelemetry Collector입니다. Datadog
  Agent 사용 여부와 관계없이 OpenTelemetry 도구를 사용하여 Kubernetes에 배포하세요.
further_reading:
- link: https://learn.datadoghq.com/courses/using-ddot
  tag: 학습 센터
  text: Datadog OpenTelemetry Collector 배포판 사용하기
- link: https://www.datadoghq.com/blog/boomi-observability-opentelemetry-datadog/
  tag: 블로그
  text: OpenTelemetry 및 Datadog으로 Boomi 통합 흐름을 계측하고 모니터링하기
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: 블로그
  text: Datadog LLM Observability에서 OpenTelemetry GenAI 시맨틱 규칙 기본 지원하기
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: 블로그
  text: DDOT 게이트웨이를 통해 OpenTelemetry 파이프라인을 중앙에서 관리 및 제어하기
- link: https://www.datadoghq.com/blog/datadog-distribution-otel-collector/
  tag: 블로그
  text: DDOT Collector를 사용하여 OpenTelemetry와 Datadog 통합하기
- link: https://www.datadoghq.com/architecture/monitoring-kubernetes-with-datadog-distribution/
  tag: 아키텍처 센터
  text: Datadog Distribution of the OpenTelemetry (DDOT) Collector를 사용한 Kubernetes
    모니터링
title: DDOT Collector
---
{{< callout header="false" btn_hidden="true" >}}
DDOT Collector는 미리 보기로 제공되고 있습니다.
{{< /callout >}}

## 개요 {#overview}

Datadog OpenTelemetry (DDOT) Collector는 Datadog이 빌드하고 유지 관리하는 OpenTelemetry Collector의 오픈 소스 배포판입니다. 표준 OpenTelemetry 구성을 사용하여 텔레메트리를 수집, 처리 및 라우팅하는 데 사용하세요. Datadog Agent는 필요하지 않습니다.

{{< img src="/opentelemetry/setup/otel-ddot-collector.png" alt="Datadog SDK 또는 OpenTelemetry SDK로 계측된 애플리케이션은 OTLP를 DDOT Collector로 보내고, DDOT Collector는 Datadog Exporter를 사용하여 텔레메트리를 Datadog으로 보냅니다. Agent가 필요한 기능을 위해 선택적으로 Datadog Agent를 함께 실행할 수 있습니다." style="width:100%;" >}}

- **OpenTelemetry 도구 사용**: OpenTelemetry Operator 또는 Helm 차트를 사용하여 Kubernetes에 Collector를 배포하세요.
- **파이프라인 구성**: [Datadog SDKs][67], OpenTelemetry SDKs 및 기타 소스로부터 텔레메트리를 수신하세요. 데이터를 처리하고 Datadog 및 기타 목적지로 라우팅하세요.
- **포함된 구성 요소로 시작**: 이 페이지에 있는 [OpenTelemetry](#opentelemetry-collector-components) 및 [Datadog 구성 요소](#datadog-components)의 선별된 세트를 사용하세요.
- **문제 해결 지원 받기**: Datadog 지원 팀이 Datadog에서 지원하는 구성 요소에 대한 문제 해결을 제공합니다. 커뮤니티 및 사용자 지정 구성 요소에 대한 지원 범위는 [지원 수준][57]을 참조하세요.

Agent가 필요한 기능을 위해 Collector와 함께 Datadog Agent를 실행할 수 있습니다. Agent와 함께 실행되는 OpenTelemetry Collector에 대해서는 [Agent의 Collector][69]를 참조하세요. Kubernetes 이외의 플랫폼에서는 [업스트림 OpenTelemetry Collector][68] 또는 [Datadog Agent][64]를 사용하세요.

## 시작 {#get-started}

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/kubernetes/" >}}
    <h3>Install the DDOT Collector on Kubernetes</h3>
    Deploy and configure the Collector yourself, with the OpenTelemetry Operator or the Collector Helm chart.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/migrate/upstream_to_ddot_collector/" >}}
    <h3>Migrate from the upstream Collector</h3>
    Already run the upstream OpenTelemetry Collector? Switch it to the DDOT Collector by changing its image.
    {{< /nextlink >}}
{{< /whatsnext >}}

## 포함된 구성 요소 {#included-components}

DDOT Collector에는 이 섹션에 나열된 OpenTelemetry Collector 구성 요소가 포함되어 있습니다. Agent의 Collector를 다른 구성 요소와 함께 빌드하려면 [Agent의 Collector에 구성 요소 추가][2]를 참조하세요.

### 지원 수준 {#support-levels}

Datadog, 커뮤니티 및 사용자 정의 구성 요소 지원에 대한 자세한 내용은 호환성 페이지의 [지원 수준][57]을 참조하세요.

### OpenTelemetry Collector 구성 요소 {#opentelemetry-collector-components}

기본적으로 DDOT Collector에는 이러한 구성 요소가 포함되어 있습니다. 이 목록은 DDOT 7.85와 일치합니다. 업스트림 구성 요소는 [DDOT 7.85.3 매니페스트][11]에도 나열되어 있습니다. 매니페스트에는 Datadog이 별도로 빌드하는 Datadog Exporter 및 Datadog Connector가 나열되어 있지 않습니다.

{{% collapse-content title="리시버" level="p" %}}

- [dockerstatsreceiver][58] (버전 7.56.0부터 사용 가능)
- [filelogreceiver][16]
- [fluentforwardreceiver][17]
- [hostmetricsreceiver][18]
- [httpcheckreceiver][73] (버전 7.85.0부터 사용 가능)
- [jaegerreceiver][19]
- [k8sclusterreceiver][70]
- [k8seventsreceiver][74] (버전 7.85.0부터 사용 가능)
- [k8sobjectsreceiver][59] (버전 7.56.0부터 사용 가능)
- [kafkareceiver][75] (버전 7.85.0부터 사용 가능)
- [kubeletstatsreceiver][60] (버전 7.56.0부터 사용 가능)
- [otlpreceiver][20]
- [podmanreceiver][61] (버전 7.56.0부터 사용 가능)
- [prometheusreceiver][21]
- [receivercreator][22]
- [zipkinreceiver][23]
- [nopreceiver][24]

{{% /collapse-content %}}

{{% collapse-content title="프로세서" level="p" %}}

- [attributesprocessor][25]
- [batchprocessor][26]
- [cumulativetodeltaprocessor][27]
- [deltatorateprocessor][76] (버전 7.85.0부터 사용 가능)
- [filterprocessor][28]
- [groupbyattrsprocessor][29]
- [k8sattributesprocessor][30]
- [memorylimiterprocessor][31]
- [probabilisticsamplerprocessor][32]
- [resourcedetectionprocessor][33]
- [resourceprocessor][34]
- [tailsamplingprocessor][36]
- [transformprocessor][37]

`routingprocessor`는 버전 7.71.0에서 제거되었습니다. 대신 [routingconnector][56]를 사용하세요.

{{% /collapse-content %}}

{{% collapse-content title="익스포터" level="p" %}}

- [datadogexporter][38]
- [debugexporter][39]
- [loadbalancingexporter][55]
- [otlpexporter][40]
- [otlphttpexporter][41]
- [nopexporter][43]

{{% /collapse-content %}}

{{% collapse-content title="커넥터" level="p" %}}

- [countconnector][71]
- [datadogconnector][44]
- [routingconnector][56](버전 7.68.0부터 사용 가능)
- [spanmetricsconnector][45]

{{% /collapse-content %}}

{{% collapse-content title="확장 프로그램" level="p" %}}

- [datadogextension][62] (버전 7.72.0부터 사용 가능)
- [healthcheckextension][46]
- [k8sleaderelector][72]
- [observer][47]
- [pprofextension][48]
- [storage/filestorage][63] (버전 7.56.0부터 사용 가능)
- [zpagesextension][49]

{{% /collapse-content %}}

### Datadog 구성 요소 {#datadog-components}

표준 OpenTelemetry 구성 요소 외에도, Datadog은 다음과 같은 사용자 지정 구성 요소를 제공하고 유지 관리합니다.

{{% collapse-content title="Datadog 구성 요소" level="p" %}}

- [Infrastructure Attribute Processor][50]: 포드 또는 포드 내 컨테이너에서 전송되는 OTLP 텔레메트리(메트릭, 트레이스, 로그)에 [Kubernetes 태그][53]를 할당하는 OpenTelemetry 프로세서 구성 요소입니다. Datadog은 이러한 태그를 사용하여 텔레메트리와 Kubernetes 인프라를 상호 연결합니다. `service`, `env`, `version` 설정 방법은 [unified service tagging][54]을 참조하세요.

- [Converter][51]: 사용자 제공 구성을 향상시키는 OpenTelemetry 변환기 구성 요소입니다. API를 제공하여 원본 구성과 향상된 구성을 모두 반환하며, 오류를 줄이기 위해 알려진 구성 오류를 자동으로 검사합니다.


{{% /collapse-content %}}

DDOT Collector와 Agent의 Collector 모두 [DD Flare Extension][52]을 포함합니다. Agent의 Collector를 사용하면 이 확장 프로그램이 Collector의 진단 정보를 Agent flare에 추가합니다.

## OpenTelemetry Collector 버전 {#opentelemetry-collector-versions}

각 DDOT 릴리스에는 다음 OpenTelemetry Collector 버전이 포함되어 있습니다.

| DDOT 버전 | 베타 버전 | 안정 버전 |
|--------------|--------------|----------------|
| 7.85.x       | v0.159.0     | v1.65.0        |
| 7.84.x       | v0.159.0     | v1.65.0        |
| 7.83.x       | v0.158.0     | v1.64.0        |
| 7.82.x       | v0.155.0     | v1.61.0        |
| 7.81.x       | v0.154.0     | v1.60.0        |

{{% collapse-content title="이전 버전" level="p" %}}

| DDOT 버전 | 베타 버전 | 안정 버전 |
|--------------|--------------|----------------|
| 7.80.x       | v0.152.0     | v1.58.0        |
| 7.79.x       | v0.150.0     | v1.56.0        |
| 7.78.x       | v0.147.0     | v1.53.0        |
| 7.77.x       | v0.145.0     | v1.51.0        |
| 7.76.x       | v0.144.0     | v1.50.0        |
| 7.75.x       | v0.142.0     | v1.48.0        |
| 7.74.x       | v0.140.0     | v1.46.0        |
| 7.73.x       | v0.138.0     | v1.44.0        |
| 7.72.x       | v0.136.0     | v1.42.0        |
| 7.71.x       | v0.133.0     | v1.39.0        |
| 7.70.x       | v0.131.0     | v1.37.0        |
| 7.69.x       | v0.129.0     | v1.35.0        |

{{% /collapse-content %}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /ko/opentelemetry/setup/ddot_collector/custom_components
[11]: https://github.com/DataDog/datadog-agent/blob/7.85.3/comp/otelcol/collector-contrib/impl/manifest.yaml
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
[58]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/dockerstatsreceiver/README.md
[59]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/k8sobjectsreceiver/README.md
[60]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/kubeletstatsreceiver/README.md
[61]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/podmanreceiver/README.md
[62]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/datadogextension/README.md
[63]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/storage/filestorage/README.md
[64]: /ko/opentelemetry/setup/agent/
[67]: /ko/opentelemetry/instrument/dd_sdks/otlp_trace_export/
[68]: /ko/opentelemetry/setup/collector_exporter/
[69]: /ko/opentelemetry/setup/agent/#agents-collector
[70]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/k8sclusterreceiver/README.md
[71]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/countconnector/README.md
[72]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/k8sleaderelector/README.md
[73]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/httpcheckreceiver/README.md
[74]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/k8seventsreceiver/README.md
[75]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/kafkareceiver/README.md
[76]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/deltatorateprocessor/README.md