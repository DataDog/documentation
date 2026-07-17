---
algolia:
  tags:
  - opentelemetry
  - open telemetry
  - otel
aliases:
- /ko/tracing/setup_overview/open_standards/
- /ko/opentelemetry/interoperability/
cascade:
  algolia:
    rank: 70
further_reading:
- link: /opentelemetry/compatibility/
  tag: 설명서
  text: 기능 호환성
- link: /opentelemetry/instrument/
  tag: 설명서
  text: 애플리케이션 계측
- link: /opentelemetry/setup/
  tag: 설명서
  text: 데이터를 Datadog에 전송
- link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
  tag: 블로그
  text: Datadog과 OpenTelemetry의 파트너십
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: 블로그
  text: W3C 트레이스 컨텍스트의 도움을 받아 OpenTelemetry 계측된 앱 모니터링하기
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/
  tag: 블로그
  text: Datadog 익스포터를 사용해 메트릭, 트레이스를 OpenTelemetry 컬렉터에서 Datadog으로 전송합니다.
- link: https://www.datadoghq.com/blog/opentelemetry-logs-datadog-exporter/
  tag: 블로그
  text: Datadog 익스포터를 사용하여 OpenTelemetry 컬렉터에서 로그를 전달합니다.
- link: https://www.datadoghq.com/about/latest-news/press-releases/datadog-announces-opentelemetry-protocol-support/
  tag: 블로그
  text: Agent의 OTLP 수집
- link: https://www.datadoghq.com/blog/aws-opentelemetry-lambda-layer-datadog/
  tag: 블로그
  text: AWS의 OpenTelemetry용 관리형 Lambda Layer에 관해 자세히 알아보기
- link: https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/
  tag: 블로그
  text: OpenTelemetry 계측 애플리케이션에서 트레이스와 Datadog RUM 이벤트 연결
- link: https://www.datadoghq.com/blog/opentelemetry-runtime-metrics-datadog/
  tag: 블로그
  text: Datadog 애플리케이션 성능 모니터링(APM)으로 OTel 계측 앱에서 런타임 메트릭 모니터링
- link: https://www.datadoghq.com/blog/otel-deployments/
  tag: 블로그
  text: OpenTelemetry 배포를 선택하는 방법
- link: https://learn.datadoghq.com/courses/otel-with-datadog
  tag: 학습 센터
  text: OpenTelemetry with Datadog 개요
- link: https://learn.datadoghq.com/courses/understanding-opentelemetry
  tag: 학습 센터
  text: OpenTelemetry의 이해
title: Datadog의 OpenTelemetry
---
{{< learning-center-callout hide_image="true" header="학습 센터에서 \"OTel with Datadog 개요\" 수강해 보기er" btn_title="지금 등록" btn_url="https://learn.datadoghq.com/courses/otel-with-datadog">}}
  OpenTelemetry에서 Datadog으로 메트릭, 트레이스, 로그를 내보내도록 구성하고, 플랫폼에서 수집된 데이터를 둘러보는 방법을 알아보세요.
{{< /learning-center-callout >}}

## 개요 {#overview}

[OpenTelemetry][1](OTel)는 텔레메트리 데이터를 수집 및 라우팅하는 표준화된 프로토콜을 제공합니다. Datadog은 기존 Datadog 인프라를 사용하든, 벤더 중립적 설정을 선호하든 관계없이 OpenTelemetry 계측 애플리케이션에서 텔레메트리 데이터를 수집하고 분석하는 여러 가지 방법을 지원합니다.

### OpenTelemetry with Datadog을 사용해야 하는 이유 {#why-opentelemetry-with-datadog}

Datadog은 소스와 관계없이 모든 애플리케이션 텔레메트리에 대한 고급 관측 가능성을 제공합니다. Datadog은 OpenTelemetry를 지원함으로써 다음과 같은 이점을 제공합니다.

- **유연성 및 선택**: 표준화된 계측을 사용하면서 기술이 발전할 필요성에 맞춰 자유롭게 조정할 선택권을 유지합니다.
- **포괄적인 언어 지원**: 기술 스택 전체에서 애플리케이션을 일관되게 모니터링합니다.
- **통합 계측**: 시스템 전반에서 계측에 대한 한 가지 접근 방식을 유지합니다.
- **강력한 분석**: OpenTelemetry의 표준화를 Datadog의 강력한 분석, 시각화, 경보 기능과 결합합니다.

이미 OpenTelemetry를 사용 중이든 도입을 고려 중이든, Datadog에서 각자의 니즈에 맞는 유연한 옵션을 제공합니다.

### 주요 의사 결정 {#key-decisions}

OpenTelemetry with Datadog를 사용할 때 내려야 하는 중요한 결정이 두 가지 있습니다.

- [애플리케이션을 계측할 방법](#instrument-your-applications)
- [데이터를 Datadog로 보낼 방법](#send-opentelemetry-data-to-datadog)

이러한 선택에 따라 사용 가능한 기능이 달라집니다. 예를 들어 OpenTelemetry API를 Datadog SDK와 함께 사용하면 OpenTelemetry SDK만 사용할 때보다 더 많은 Datadog 기능에 액세스할 수 있습니다.

자세한 내용은 [기능 호환성][9]을 참조하세요.

## 애플리케이션 계측 {#instrument-your-applications}

OpenTelemetry와 Datadog으로 애플리케이션을 계측하는 방법은 여러 가지입니다. 접근 방식마다 제공하는 기능의 종류나 벤더 중립성 수준이 각기 다릅니다.

- **전체 OpenTelemetry**: OpenTelemetry SDK 및 API를 사용하여 벤더 중립적 설정을 이용합니다.
- **OpenTelemetry API**: OpenTelemetry API를 Datadog의 SDK 구현과 함께 사용합니다.
- **OpenTelemetry 계측 라이브러리**: Datadog의 관측 가능성을 더 많은 프레임워크 및 기술로 확장합니다.

자세한 내용은 [애플리케이션 계측][8]을 참조하세요.

## OpenTelemetry 데이터를 Datadog에 보내기 {#send-opentelemetry-data-to-datadog}

애플리케이션과 서비스를 OpenTelemetry 라이브러리로 계측하는 경우, Datadog으로 트레이스, 메트릭, 로그 데이터를 가져오는 방법을 선택할 수 있습니다.

<div class="alert alert-info"><strong>어느 설정이 적합한지 잘 모르시겠습니까?</strong><br> <a href="/opentelemetry/compatibility/">기능 호환성</a> 표를 참조해 어느 Datadog 기능이 지원되는지 알아보세요.</div>

### 옵션 1: Datadog Agent를 DDOT Collector와 함께 사용(권장) {#option-1-use-the-datadog-agent-with-ddot-collector-recommended}

{{< img src="/opentelemetry/setup/ddot-collector-2.png" alt="Datadog Agent에 임베드된 DDOT Collector의 아키텍처 개요입니다." style="width:100%;" >}}

**권장 대상**: OTel 벤더 중립성과 Datadog 에코시스템 혁신 요소를 둘 다 얻고자 하는 사용자(아래의 예 참조):

- Fleet Automation
- Live Container Monitoring
- Kubernetes Explorer
- Live Processes
- Cloud Network Monitoring
- Universal Service Monitoring
- {{< translate key="integration_count" >}}+ Datadog 통합

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/" >}}Datadog Agent를 DDOT Collector와 함께 사용하는 방법 자세히 알아보기{{< /nextlink >}}
{{< /whatsnext >}}

### 옵션 2: OpenTelemetry Collector 사용{#option-2-use-the-opentelemetry-collector}

{{< img src="/opentelemetry/setup/otel-collector.png" alt="다이어그램: 코드의 OpenTelemetry SDK가 OTLP를 통해 Datadog 익스포터를 사용하여 OpenTelemetry Collector를 실행 중인 호스트로 데이터를 보내고, 여기에서 Datadog의 Observability Platform으로 전달됩니다." style="width:100%;" >}}

**권장 대상**: 완전한 벤더 중립적 설정을 원하는 신규 또는 기존 OTel 사용자.

- OpenTelemetry 데이터를 Datadog으로 보내는 데 완전한 벤더 중립성
- 테일링 기반 샘플링 및 데이터 변환과 같은 유연한 구성 옵션

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/" >}}OTel Collector 사용에 관해 자세히 알아보기{{< /nextlink >}}
{{< /whatsnext >}}

### 추가 설정 옵션 {#additional-setup-options}

직접 OTLP 수집과 같은 기타 설정 옵션은 [데이터를 Datadog에 전송][7]을 참조하세요.

## 추가 자료{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[7]: /ko/opentelemetry/setup
[8]: /ko/opentelemetry/instrument/
[9]: /ko/opentelemetry/compatibility/