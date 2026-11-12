---
description: OpenTelemetry 메트릭, 트레이스, 로그를 Datadog으로 전송하도록 샘플 애플리케이션을 구성하세요.
further_reading:
- link: https://opentelemetry.io/docs/
  tag: 외부 사이트
  text: OpenTelemetry 설명서
- link: /opentelemetry
  tag: 문서
  text: Datadog OpenTelemetry 설명서
- link: /tracing/trace_collection/custom_instrumentation/otel_instrumentation
  tag: 문서
  text: OpenTelemetry로 사용자 지정 계측
- link: https://www.datadoghq.com/blog/opentelemetry-runtime-metrics-datadog
  tag: 블로그
  text: Datadog APM의 OTel 계측 앱에서 런타임 메트릭 모니터링
- link: https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/
  tag: 블로그
  text: OTel 계측 애플리케이션에서 트레이스와 Datadog RUM 이벤트 연결
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter
  tag: 블로그
  text: Datadog Exporter를 사용해 메트릭, 트레이스를 OpenTelemetry 컬렉터에서 Datadog으로 전송하기
- link: https://www.datadoghq.com/blog/opentelemetry-logs-datadog-exporter
  tag: 블로그
  text: Datadog Exporter를 사용하여 OpenTelemetry Collector에서 로그 전달하기
title: Datadog에서 OpenTelemetry 시작
---
{{< learning-center-callout header="학습 센터에서 'OpenTelemetry의 이해' 확인하기" btn_title="지금 등록" btn_url="https://learn.datadoghq.com/courses/understanding-opentelemetry" hide_image="false" >}}
  OpenTelemetry의 기능과 이점, 주요 구성 요소 및 OTel과 Datadog이 함께 작동하는 방식을 포함하여 OpenTelemetry의 기본 사항을 알아보세요.
{{< /learning-center-callout >}}

## 개요 {#overview}

[OpenTelemetry][11]는 소프트웨어 애플리케이션에서 관측 가능성 데이터를 수집하고 라우팅하기 위한 표준화된 프로토콜과 도구를 IT 팀에 제공하는 오픈 소스 관측 가능성 프레임워크입니다. OpenTelemetry는 모니터링 플랫폼에서 분석하고 통찰력을 얻기 위해 애플리케이션 관측 가능성 데이터(즉, 메트릭, 로그, 트레이스)를 계측하고 {{< tooltip text="instrumenting" tooltip="계측은 애플리케이션에 코드를 추가하여 트레이스, 메트릭 및 로그와 같은 관측 가능성 데이터를 Datadog에 캡처하고 보고하는 프로세스입니다.">}}생성하고, 수집하고, 내보낼 수 있도록 일관된 형식을 제공합니다.

본 지침에서는 [OpenTelemetry 애플리케이션 샘플][12]을 구성하여 OpenTelemetry SDK, OpenTelemetry Collector, [Datadog Exporter][14] 기능으로 Datadog으로 관측 가능성 데이터를 전송하는 방법을 설명합니다. 또한 본 지침에서는 Datadog UI에서 해당 데이터를 탐색하는 방법을 보여줍니다.

<div class="alert alert-info">본 지침은 Datadog Exporter와 Datadog Connector를 사용합니다. 새 컬렉터 구성의 경우, Datadog은 <a href="/opentelemetry/setup/collector_exporter/">OpenTelemetry Collector 설정</a>의 OTLP 파이프라인을 권장합니다.</div>

다음 지침을 따르세요.

1. [OpenTelemetry API를 사용하여 애플리케이션을 계측](#instrumenting-the-application)합니다.
2. [애플리케이션을 구성](#configuring-the-application)하여 Datadog으로 관측 가능성 데이터를 전송합니다.
3. [관측 가능성 데이터를 Unified Service Tagging으로 상호 연관](#correlating-observability-data)시킵니다.
4. [애플리케이션을 실행](#running-the-application)하여 관측 가능성 데이터를 생성합니다.
5. [Datadog UI에서 관측 가능성 데이터를 탐색](#exploring-observability-data-in-datadog)합니다.

## 전제 조건 {#prerequisites}

이 가이드를 완료하려면 다음이 필요합니다.

1. 계정이 없는 경우 [Datadog 계정을 생성][1]합니다.
2. Datadog API 키를 설정합니다.
   1. [Datadog API 키][2]를 확인하거나 생성합니다.
   2. Datadog API 키를 환경 변수로 내보냅니다.
    {{< code-block lang="sh" >}}
export DD_API_KEY=<Your API Key>
{{< /code-block >}}
3. 샘플 [캘린더][12] 애플리케이션을 다운로드합니다.
   1. `opentelemetry-examples` 리포지토리를 장치에 복제합니다.
    {{< code-block lang="sh" >}}
git clone https://github.com/DataDog/opentelemetry-examples.git
{{< /code-block >}}
   2. `/calendar` 디렉터리로 이동합니다.
    {{< code-block lang="sh" >}}
cd opentelemetry-examples/apps/rest-services/java/calendar
{{< /code-block >}}
4. [Docker Compose][3]를 설치합니다.
5. (옵션) Linux를 사용하여 인프라 메트릭을 전송합니다.

캘린더 애플리케이션은 OpenTelemetry 도구를 사용하여 메트릭, 로그, 트레이스를 생성하고 수집합니다. 다음 단계에서는 이 관측 가능성 데이터를 Datadog으로 가져오는 방법을 설명합니다.

## 애플리케이션 계측 {#instrumenting-the-application}

캘린더 샘플 애플리케이션은 다음과 같이 일부 [계측]되어 있습니다[15].

1. 다음 위치에 있는 메인 `CalendarService.java` 파일로 이동합니다. `./src/main/java/com/otel/service/CalendarService.java`
2. 다음 코드는 OpenTelemetry 주석과 API를 사용하여 `getDate()`를 계측합니다.

   {{< code-block lang="java" disable_copy="true" filename="CalendarService.java" >}}
@WithSpan(kind = SpanKind.CLIENT)
public String getDate() {
    Span span = Span.current();
    span.setAttribute("peer.service", "random-date-service");
    ...
}
{{< /code-block >}}

캘린더 애플리케이션을 실행하면 `getDate()` 호출이 [트레이스][8] 및 스팬을 생성합니다.

## 애플리케이션 구성 {#configuring-the-application}

### OTLP 수신기 {#otlp-receiver}

캘린더 애플리케이션은 OpenTelemetry SDK에서 OpenTelemetry Collector의 [OpenTelemetry 프로토콜(OTLP) 수신기][10]로 데이터를 전송하도록 미리 구성되어 있습니다.

1. 다음 위치에 있는 OpenTelemetry Collector 구성 파일로 이동합니다. `./src/main/resources/otelcol-config.yaml`
2. 다음 코드는 OTLP 수신기를 구성하여 메트릭, 트레이스, 로그를 수신합니다.

    {{< code-block lang="yaml" filename="otelcol-config.yaml" collapsible="true" disable_copy="true" >}}
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
...
service:
  pipelines:
    traces:
      receivers: [otlp]
    metrics:
      receivers: [otlp]
    logs:
      receivers: [otlp]
{{< /code-block >}}

### Datadog Exporter {#datadog-exporter}

Datadog Exporter는 OTLP 수신기로 수집한 데이터를 Datadog 백엔드로 전송합니다.

1. `otelcol-config.yaml` 파일로 이동합니다.
2. 다음 코드로 Datadog Exporter를 구성하여 Datadog에 관측 가능성 데이터를 전송합니다.

   {{< code-block lang="yaml" filename="otelcol-config.yaml" collapsible="true" disable_copy="true" >}}
exporters:
  datadog:
    traces:
      compute_stats_by_span_kind: true
      trace_buffer: 500
    hostname: "otelcol-docker"
    api:
      key: ${DD_API_KEY}
      site: datadoghq.com

connectors:
    datadog/connector:
      traces:
        compute_stats_by_span_kind: true

service:
  pipelines:
    metrics:
      receivers: [otlp, datadog/connector] # <- update this line
      exporters: [datadog]
    traces:
      exporters: [datadog, datadog/connector]
    logs:
      exporters: [datadog]
{{< /code-block >}}
3. `exporters.datadog.api.site`를 [Datadog 사이트][16]로 설정합니다. 그렇지 않으면 기본값은 US1입니다.

이 구성을 통해 Datadog Exporter는 런타임 메트릭, 트레이스, 로그를 Datadog으로 전송할 수 있습니다. 하지만 인프라 메트릭을 전송하려면 추가 구성이 필요합니다.

### OpenTelemetry Collector {#opentelemetry-collector}

본 예시에서는 인프라 메트릭을 전송하는 OpenTelemetry Collector를 구성합니다.

<div class="alert alert-info">OpenTelemetry Collector에서 Datadog으로 인프라 메트릭을 전송하려면 Linux를 사용해야 합니다. 이는 Docker Stats 수신기의 제한 사항입니다.</div>

컨테이너 메트릭을 수집하려면 OpenTelemetry Collector에서 [Docker Stats 수신기][5]를 다음과 같이 구성합니다.

1. `otel-config.yaml`의 `receivers` 섹션에 `docker_stats` 블록을 추가합니다.

   {{< code-block lang="yaml" filename="otelcol-config.yaml" collapsible="true" disable_copy="true" >}}
receivers:
      otlp:
        protocols:
          grpc:
            endpoint: 0.0.0.0:4317
          http:
            endpoint: 0.0.0.0:4318
      # add the following block
      docker_stats:
        endpoint: unix:///var/run/docker.sock # default; if this is not the Docker socket path, update to the correct path
        metrics:
          container.network.io.usage.rx_packets:
            enabled: true
          container.network.io.usage.tx_packets:
            enabled: true
          container.cpu.usage.system:
            enabled: true
          container.memory.rss:
            enabled: true
          container.blockio.io_serviced_recursive:
            enabled: true
          container.uptime:
            enabled: true
          container.memory.hierarchical_memory_limit:
            enabled: true
{{< /code-block >}}

2. `service.pipelines.metrics.receivers`를 업데이트하여 `docker_stats`를 포함시킵니다.

   {{< code-block lang="yaml" filename="otelcol-config.yaml" collapsible="true" disable_copy="true" >}}
service:
  pipelines:
    metrics:
      receivers: [otlp, datadog/connector, docker_stats] # <- update this line
{{< /code-block >}}

본 구성으로 캘린더 애플리케이션이 컨테이너 메트릭을 Datadog으로 전송하여 Datadog에서 데이터를 탐색할 수 있도록 합니다.

### OTLP로 관측 가능성 데이터 전송 {#sending-observability-data-with-otlp}

캘린더 애플리케이션은 Logback 구성의 OpenTelemetry 로그 익스포터를 사용하여 OpenTelemetry 레이어 프로세서(OTLP)를 통해 로그를 전송합니다.

1. 캘린더 애플리케이션의 Logback XML 구성 파일(`/src/main/resources/logback.xml`)로 이동합니다.
2. 다음 코드는 `OpenTelemetry` 어펜더를 정의합니다.

   {{< code-block lang="xml" filename="logback.xml" collapsible="true" disable_copy="true" >}}
<appender name="OpenTelemetry" class="io.opentelemetry.instrumentation.logback.appender.v1_0.OpenTelemetryAppender">
    <immediateFlush>true</immediateFlush>
    <captureExperimentalAttributes>true</captureExperimentalAttributes>
    <captureKeyValuePairAttributes>true</captureKeyValuePairAttributes>
  </appender>
{{< /code-block >}}

3. `<appender-ref ref="OpenTelemetry"/>` 라인은 루트 레벨 구성에서 `OpenTelemetry` 어펜더를 참조합니다.

   {{< code-block lang="xml" filename="logback.xml" collapsible="true" disable_copy="true" >}}
<root level="INFO">
  <appender-ref ref="console"/>
  <appender-ref ref="OpenTelemetry"/>
</root>
{{< /code-block >}}

아울러, 환경 변수는 다음과 같이 OpenTelemetry 환경을 설정하여 로그, 메트릭, 트레이스를 내보냅니다.

1. 캘린더 애플리케이션의 Docker Compose 파일(`./deploys/docker/docker-compose-otelcol.yml`)로 이동합니다.
2. `OTEL_EXPORTER_OTLP_ENDPOINT=http://otelcol:4317` 구성을 사용하여 OTLP로 메트릭, 트레이스 및 로그를 전송할 수 있습니다.

## 관측 가능성 데이터 상호 연관성 {#correlating-observability-data}

[Unified Service Tagging][6]은 Datadog의 관측 가능성 데이터를 연결하여 메트릭, 트레이스, 로그를 일관된 태그로 탐색할 수 있도록 도와드립니다.

캘린더 애플리케이션은 다음과 같이 Unified Service Tagging으로 미리 설정되어 있습니다.

1. 캘린더 애플리케이션의 Docker Compose 파일(`./deploys/docker/docker-compose-otelcol.yml`)로 이동합니다.
2. 다음 코드는 애플리케이션 트레이스와 다른 관측 가능성 데이터를 상호 연관시킵니다.

   {{< code-block lang="yaml" filename="docker-compose-otelcol.yml" collapsible="true" disable_copy="true" >}}
environment:
  - OTEL_SERVICE_NAME=calendar-otel
  - OTEL_RESOURCE_ATTRIBUTES=deployment.environment=docker,host.name=otelcol-docker,service.version=<IMAGE_TAG>
{{< /code-block >}}

## 애플리케이션 실행 {#running-the-application}

관측 가능성 데이터를 생성하여 Datadog으로 전달하려면 OpenTelemetry SDK로 캘린더 애플리케이션을 실행합니다.

1. `calendar/` 폴더에서 애플리케이션을 실행합니다.

   {{< code-block lang="sh" >}}
docker compose -f deploys/docker/docker-compose-otelcol.yml up
{{< /code-block >}}
   본 명령으로 OpenTelemetry Collector 및 캘린더 서비스를 사용하여 Docker 컨테이너를 생성합니다.

2. 캘린더 애플리케이션이 정확하게 실행되고 있는지 테스트하려면 다른 터미널 창에서 다음 명령을 실행합니다.

   {{< code-block lang="sh" >}}
curl localhost:9090/calendar
{{< /code-block >}}

3. 다음과 같은 응답을 수신했는지 확인합니다.

   {{< code-block lang="sh" >}}
{"date":"2022-12-30"}
{{< /code-block >}}

4. `curl` 명령을 여러 번 실행하여 최소 1개 이상의 트레이스를 Datadog 백엔드로 내보냅니다.

   <div class="alert alert-info">캘린더 애플리케이션은 확률적 샘플러 프로세서를 사용하므로, 애플리케이션을 통해 전송된 트레이스 중 30%만 대상 백엔드에 도달하게 됩니다.</div>

캘린더 애플리케이션을 호출할 때마다 메트릭, 트레이스, 로그는 OpenTelemetry Collector로 전달된 다음 Datadog Exporter로 전달되고 마지막으로 Datadog 백엔드로 전달됩니다.

## Datadog에서 관측 가능성 데이터 탐색 {#exploring-observability-data-in-datadog}

Datadog UI를 사용하여 캘린더 애플리케이션의 관측 가능성 데이터를 탐색하세요.

**참고**: 트레이스 데이터가 표시되는 데 몇 분 정도 걸릴 수 있습니다.

### 런타임 및 인프라 메트릭 {#runtime-and-infrastructure-metrics}

런타임 및 인프라 메트릭을 확인하여 애플리케이션, 호스트, 컨테이너 및 프로세스의 성능을 시각화, 모니터링 및 측정합니다.

1. {{< ui >}}APM{{< /ui >}} > {{< ui >}}Catalog{{< /ui >}}로 이동합니다.
2. `calendar-otel` 서비스 위에 마우스를 올리고 {{< ui >}}Full Page{{< /ui >}}를 선택합니다.
3. 하단 패널로 스크롤하여 다음을 선택합니다.

   * {{< ui >}}Infrastructure Metrics{{< /ui >}}를 선택하여 Docker 컨테이너 메트릭(예: CPU 및 메모리 사용량)을 확인합니다.
   * {{< ui >}}JVM Metrics{{< /ui >}}를 선택하여 런타임 메트릭(예: 힙 사용량 및 스레드 카운트)을 확인합니다.

   {{< img src="/getting_started/opentelemetry/infra_and_jvm2.png" alt="캘린더 애플리케이션의 인프라 메트릭 및 JVM 런타임 메트릭 보기" style="width:90%;" >}}

### 로그 {#logs}

로그를 조회하여 애플리케이션 및 시스템 운영을 모니터링하고 문제를 해결하세요.

1. {{< ui >}}Logs{{< /ui >}}로 이동합니다.
2. 목록에 다른 로그가 있는 경우, `@service.name:calendar-otel `을 {{< ui >}}Search for{{< /ui >}} 필드에 추가하여 캘린더 애플리케이션의 로그만 확인합니다.
2. 목록에서 로그를 선택하여 자세한 내용을 확인합니다.

{{< img src="/getting_started/opentelemetry/logs2.png" alt="캘린더 애플리케이션의 로그 보기" style="width:90%;" >}}

### 트레이스 {#traces}

트레이스와 스팬을 조회하여 애플리케이션 처리 요청의 상태 및 성능을 확인하세요.

1. {{< ui >}}APM{{< /ui >}} > {{< ui >}}Traces{{< /ui >}}로 이동합니다.
2. 필터 메뉴에서 {{< ui >}}Service{{< /ui >}} 섹션을 찾고 `calendar-otel` 패싯을 선택하여 모든 `calendar-otel` 트레이스를 표시합니다.

   {{< img src="/getting_started/opentelemetry/traces2.png" alt="캘린더 애플리케이션의 트레이스 보기" style="width:90%;" >}}

3. [`calendar-otel` 트레이스를 탐색][8]합니다.

   시작하려면 트레이스를 클릭하여 트레이스 사이드 패널을 열고 트레이스 및 해당 스팬에 대한 자세한 내용을 확인하세요. 예를 들어, [플레임 그래프][9]는 캘린더 실행 경로의 각 구성 요소에서 소요된 시간을 캡처합니다.

   {{< img src="/getting_started/opentelemetry/flame_graph2.png" alt="캘린더 애플리케이션 트레이스에 대한 플레임 그래프 보기" style="width:90%;" >}}

4. 하단 패널에서 {{< ui >}}Infrastructure{{< /ui >}}, {{< ui >}}Metrics{{< /ui >}} 또는 {{< ui >}}Logs{{< /ui >}}를 선택하여 트레이스를 다른 관측 가능성 데이터와 상호 연관시킬 수 있습니다.

   {{< img src="/getting_started/opentelemetry/trace_logs_correlation.png" alt="캘린더 애플리케이션 트레이스를 로그와 상호 연관시킵니다." style="width:90%;" >}}


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://docs.docker.com/compose/install/
[4]: /ko/opentelemetry/collector_exporter/
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/dockerstatsreceiver/
[6]: /ko/getting_started/tagging/unified_service_tagging/
[7]: https://app.datadoghq.com/services
[8]: /ko/tracing/glossary/#trace
[9]: https://www.datadoghq.com/knowledge-center/distributed-tracing/flame-graph/
[10]: /ko/opentelemetry/collector_exporter/otlp_receiver/
[11]: https://opentelemetry.io/
[12]: https://github.com/DataDog/opentelemetry-examples/tree/main/apps/rest-services/java/calendar
[13]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[14]: /ko/opentelemetry/setup/collector_exporter/datadog_exporter/
[15]: /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[16]: /ko/getting_started/site/