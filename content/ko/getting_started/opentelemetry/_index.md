---
further_reading:
- link: https://opentelemetry.io/docs/
  tag: OpenTelemetry
  text: OpenTelemetry 설명서
- link: /opentelemetry
  tag: 설명서
  text: Datadog OpenTelemetry 설명서
- link: /tracing/trace_collection/custom_instrumentation/otel_instrumentation
  tag: 설명서
  text: OpenTelemetry로 커스텀 계측
- link: https://www.datadoghq.com/blog/opentelemetry-runtime-metrics-datadog
  tag: 블로그
  text: Datadog 애플리케이션 성능 모니터링(APM)의 OTel 계측 앱에서 런타임 메트릭 모니터링
- link: https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/
  tag: 블로그
  text: OTel 계측 애플리케이션에서 트레이스와 Datadog RUM 이벤트 연결
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter
  tag: 블로그
  text: Datadog 익스포터를 사용해 메트릭, 트레이스를 OpenTelemetry 컬렉터에서 Datadog으로 전송합니다.
- link: https://www.datadoghq.com/blog/opentelemetry-logs-datadog-exporter
  tag: 블로그
  text: Datadog 익스포터를 사용하여 OpenTelemetry 컬렉터에서 로그를 전달합니다.
kind: 설명서
title: Datadog에서 OpenTelemetry 시작하기
---


## 개요

[OpenTelemetry][11]는 소프트웨어 애플리케이션에서 관측성 데이터를 수집 및 라우팅할 목적으로 표준화된 프로토콜 및 툴을 IT 팀에 제공해 드리는 오픈 소스 관측성 프레임워크입니다. OpenTelemetry는 애플리케이션 관측성 데이터(메트릭, 로그, 트레이스) 계측, 생성, 수집, 내보내기 분석을 위한 일관된 형식을 제공하여, 플랫폼을 모니터링하여 분석 및 통찰을 얻도록 도와드립니다.

본 지침에서는 [OpenTelemetry 애플리케이션 샘플][12]을 설정하여 OpenTelemetry SDK, OpenTelemetry 컬렉터, [Datadog 내보내기][14] 기능으로 Datadog으로 관측성 데이터를 전송하는 방법을 설명합니다. 아울러, Datadog UI에서 해당 데이터를 탐색하는 방법도 알아봅니다.

다음 지침을 따르세요.

1. OpenTelemetry API로 [애플리케이션을 계측](#instrumenting-the-application)합니다.
2. Datadog으로 관측성 데이터를 전송하려면 [애플리케이션을 설정](#configuring-the-application)합니다.
3. 통합 서비스 태깅으로 [관측성 데이터를 상호 연결](#correlating-observability-data)합니다.
4. [애플리케이션을 실행](#running-the-application)하여 관측성 데이터를 생성합니다.
5. Datadog UI에서 [관측성 데이터 탐색](#exploring-observability-data-in-Datadog)을 클릭합니다.

## 필수 요건

본 지침을 따르려면 다음 요건이 필요합니다.

1. 계정이 없는 경우 [Datadog 계정][1]을 생성합니다.
2. 다음과 같이 Datadog API 키를 설정합니다.
   a. [Datadog API 키][2]를 검색 또는 생성합니다.  
   b. 다음과 같이 Datadog API 키를 환경 변수로 내보냅니다.
    {{< code-block lang="sh" >}}
export DD_API_KEY=<Your API Key>
{{< /code-block >}}
3. 샘플 [캘린더][12] 애플리케이션을 다운로드합니다.
   a. 다음과 같이 `opentelemetry-examples` 리포지토리를 장치에 복제합니다.
    {{< code-block lang="sh" >}}
git clone https://github.com/DataDog/opentelemetry-examples.git
{{< /code-block >}} 
   b. `/calendar` 디렉토리로 이동합니다.
    {{< code-block lang="sh" >}}
cd opentelemetry-examples/apps/rest-services/java/calendar
{{< /code-block >}}  
4. [Docker Compose][3]를 설치합니다.
5. (옵션) Linux를 사용하여 인프라스트럭처 메트릭을 전송합니다.

캘린더 애플리케이션은 OpenTelemetry 도구로 메트릭, 로그, 트레이스를 생성 및 수집합니다. 다음 단계에서는 본 관측성 데이터를 Datadog로 불러오는 방법을 설명합니다. 

## 애플리케이션 계측

캘린더 샘플 애플리케이션은 다음과 같이 일부 [계측]되어 있습니다[15].

1. `./src/main/java/com/otel/controller/CalendarController.java` 위치의 메인 `CalendarController.java` 파일로 이동합니다.
2. 다음 코드는 OpenTelemetry API를 사용하여 `getDate()`를 계측합니다.

   {{< code-block lang="java" disable_copy="true" filename="CalendarController.java" >}}
private String getDate() {
  Span span = GlobalOpenTelemetry.getTracer("calendar").spanBuilder("getDate").startSpan();
  try (Scope scope = span.makeCurrent()) {
   ...
  } finally {
    span.end();
  }
}
{{< /code-block >}}  

캘린더 애플리케이션을 실행하면 `getDate()` 호출이 [트레이스][8] 및 스팬(span)을 생성합니다.

## 애플리케이션 설정

### OTLP 리시버

캘린더 애플리케이션은 OpenTelemetry SDK에서 OpenTelemetry 컬렉터의 [OpenTelemetry 프로토콜(OTLP) 리시버][10]로 데이터를 전송하도록 미리 설정되어 있습니다.

1. `./src/main/resources/otelcol-config.yaml`에 위치한 컬렉터 설정 파일로 이동합니다.
2. 다음 코드는 OTLP 리시버를 설정하여 메트릭, 트레이스, 로그를 수신합니다.

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

### Datadog 익스포터

Datadog 익스포터는 OTLP 리시버로 수집한 데이터를 Datadog 백엔드로 전송합니다.

1. `otelcol-config.yaml` 파일로 이동합니다.
2. 다음 코드로 Datadog 익스포터를 설정하여 Datadog에 관측성 데이터를 전송합니다.

   {{< code-block lang="yaml" filename="otelcol-config.yaml" collapsible="true" disable_copy="true" >}}
exporters:
  datadog:
    traces:
      span_name_as_resource_name: true
      trace_buffer: 500
    hostname: "otelcol-docker"
    api:
      key: ${DD_API_KEY}
      site: datadoghq.com

connectors:
    datadog/connector:

service:
  pipelines:
    metrics:
      receivers: [otlp, datadog/connector] # <- 이 줄을 업데이트하세요.
      exporters: [datadog]
    traces:
      exporters: [datadog, datadog/connector]
    logs:
      exporters: [datadog]
{{< /code-block >}}  
3. `exporters.datadog.api.site`을 [Datadog 사이트][16]로 설정합니다. 그렇지 않은 경우 기본값은 US1입니다.

본 설정으로 Datadog 익스포터는 런타임 메트릭, 트레이스, 로그를 Datadog으로 전송할 수 있으나, 인프라스트럭처 메트릭을 전송하려면 추가 설정이 필요합니다.

### OpenTelemetry 컬렉터

본 예시에서는 인프라스트럭처 메트릭을 전송하는 OpenTelemetry 컬렉터를 설정합니다.

<div class="alert alert-info">OpenTelemetry 컬렉터에서 Datadog으로 인프라스트럭처 메트릭을 전송하려면 Linux를 사용해야 합니다. 이는 도커(Docker) 통계 리시버의 제한 사항입니다.</div>

컨테이너 메트릭을 수집하려면 Datadog 익스포터의 [도커(Docker) 통계 리시버][5]를 다음과 같이 설정합니다.

1. `otel-config.yaml`의 `receivers` 섹션에 다음 `docker_stats` 블록을 추가합니다.

   {{< code-block lang="yaml" filename="otelcol-config.yaml" collapsible="true" disable_copy="true" >}}
receivers:
      otlp:
        protocols:
          grpc:
            endpoint: 0.0.0.0:4317
          http:
            endpoint: 0.0.0.0:4318
      # 다음 블록을 추가합니다.
      docker_stats: 
        endpoint: unix:///var/run/docker.sock # 기본값입니다. Docker 소켓 경로가 아니라면 올바른 경로로 업데이트합니다.
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

2. 다음 `docker_stats`을 포함하도록 `service.pipelines.metrics.receivers`을 업데이트합니다.

   {{< code-block lang="yaml" filename="otelcol-config.yaml" collapsible="true" disable_copy="true" >}}
service:
  pipelines:
    metrics:
      receivers: [otlp, datadog/connector, docker_stats] # <- 이 줄을 업데이트합니다.
{{< /code-block >}}

본 설정으로 캘린더 애플리케이션이 컨테이너 메트릭을 Datadog으로 전송하여 Datadog에서 데이터를 탐색할 수 있도록 합니다.

### OTLP로 관측성 데이터 전송하기

캘린더 애플리케이션은 로그백 설정의 OpenTelemetry 로그 익스포터를 사용하여 OpenTelemetry 레이어 프로세서(OTLP)를 통해 로그를 전송합니다.

1. `/src/main/resources/logback.xml`에 위치한 캘린더 애플리케이션의 로그백 XML 설정 파일로 이동합니다.
2. 다음 코드는 `OpenTelemetry` 어펜더를 정의합니다.

   {{< code-block lang="xml" filename="logback.xml" collapsible="true" disable_copy="true" >}}
<appender name="OpenTelemetry" class="io.opentelemetry.instrumentation.logback.appender.v1_0.OpenTelemetryAppender">
    <immediateFlush>true</immediateFlush>
    <captureExperimentalAttributes>true</captureExperimentalAttributes>
    <captureKeyValuePairAttributes>true</captureKeyValuePairAttributes>
  </appender>
{{< /code-block >}}

3. `<appender-ref ref="OpenTelemetry"/>` 라인은 다음과 같은 루트 레벨 설정의 `OpenTelemetry` 어펜더를 참조합니다.

   {{< code-block lang="xml" filename="logback.xml" collapsible="true" disable_copy="true" >}}
<root level="INFO">
  <appender-ref ref="console"/>
  <appender-ref ref="OpenTelemetry"/>
</root>
{{< /code-block >}}

아울러, 환경 변수는 다음과 같이 OpenTelemetry 환경을 설정하여 로그, 메트릭, 트레이스를 내보냅니다.

1. `./deploys/docker/docker-compose-otel.yml`에 위치한 캘린더 애플리케이션의 Docker Compose 파일로 이동합니다.
2. `OTEL_LOGS_EXPORTER=otlp` 설정으로 로그를 OTLP와 함께 전송할 수 있습니다.
3. `OTEL_EXPORTER_OTLP_ENDPOINT=http://otelcol:4317` 설정으로 메트릭 및 트레이스를 OTLP와 함께 전송할 수 있습니다.

## 관측성 데이터 상호 연관성

[통합 서비스 태깅][6]은 Datadog의 관측성 데이터를 연결하여 메트릭, 트레이스, 로그를 일관된 태그로 탐색할 수 있도록 도와드립니다.

캘린더 애플리케이션은 다음과 같이 통합 서비스 태깅으로 미리 설정되어 있습니다.

1. `./deploys/docker/docker-compose-otel.yml`에 위치한 캘린더 애플리케이션의 Docker Compose 파일로 이동합니다.
2. 다음 코드는 애플리케이션 트레이스와 다른 관측성 데이터를 상호 연관시킵니다.

   {{< code-block lang="yaml" filename="docker-compose-otel.yml" collapsible="true" disable_copy="true" >}}
environment:
  - OTEL_SERVICE_NAME=calendar-otel
  - OTEL_RESOURCE_ATTRIBUTES=deployment.environment=docker,host.name=otelcol-docker
{{< /code-block >}}

## 애플리케이션 실행

관측성 데이터를 생성하여 Datadog으로 전달하려면 OpenTelemetry SDK로 캘린더 애플리케이션을 실행합니다.

1. `calendar/` 폴더에서 애플리케이션을 실행합니다.

   {{< code-block lang="sh" >}}
docker compose -f deploys/docker/docker-compose-otel.yml up
{{< /code-block >}}
   본 명령으로 OpenTelemetry 컬렉터 및 캘린더 서비스를 사용하여 도커(Docker) 컨테이너를 생성합니다.

2. 캘린더 애플리케이션이 정확하게 실행되고 있는지 테스트하려면 다른 터미널 창에서 다음 명령을 실행합니다.

   {{< code-block lang="sh" >}}
curl localhost:9090/calendar 
{{< /code-block >}}

3. 다음과 같은 응답을 수신했는지 확인합니다.

   {{< code-block lang="sh" >}}
{"date":"2022-12-30"}
{{< /code-block >}}

4. `curl` 명령을 여러 번 실행하여 최소 트레이스 하나 이상을 Datadog 백엔드로 내보냅니다.

   <div class="alert alert-info">캘린더 애플리케이션은 확률적 샘플러 프로세서를 사용하므로, 애플리케이션을 통해 전송된 트레이스 중 30%만 대상 백엔드에 도달하게 됩니다.</div>

캘린더 애플리케이션을 호출할 때마다 메트릭, 트레이스, 로그는 OpenTelemetry 컬렉터(Collector)로 전달된 다음 Datadog 익스포터로 전달되고 마지막으로 Datadog 백엔드로 전달됩니다. 

## Datadog에서 관측성 데이터 탐색하기

Datadog UI를 사용하여 캘린더 애플리케이션의 관측성 데이터를 탐색하세요.

**참고**: 트레이스 데이터가 표시되는 데 몇 분 정도 걸릴 수 있습니다.

### 런타임 및 인프라스트럭처 메트릭

런타임 및 인프라스트럭처 메트릭을 확인하여 애플리케이션, 호스트, 컨테이너 및 프로세스의 성능을 시각화, 모니터링 및 측정합니다.

1. **애플리케이션 성능 모니터링(APM)** > **서비스 카탈로그**로 이동합니다.
2. `calendar-otel` 서비스 위로 마우스를 올려 **전체 페이지**를 선택합니다.
3. 하단 패널을 스크롤하여 선택합니다.

   * CPU 및 메모리 사용량 등의 도커(Docker) 컨테이너 메트릭을 확인하려면 **인프라스트럭처 메트릭**을 선택합니다.
   * 힙(heap) 사용량 및 스레드 카운트와 같은 런타임 메트릭을 확인하려면 **JVM 메트릭**을 선택합니다.

   {{< img src="/getting_started/opentelemetry/infra_and_jvm.png" alt="캘린더 애플리케이션용 인프라스트럭처 메트릭 및 JVM 런타임 메트릭 보기" style="width:90%;" >}}

### 로그

로그를 확인하여 애플리케이션 및 시스템 작동 문제를 모니터링 및 해결하세요.

1. **로그**로 이동합니다.
2. 목록에 다른 로그가 있다면 **검색** 필드에 `@service.name:calendar-otel `을 추가하여 캘린더 애플리케이션 로그만 표시되도록 합니다.
2. 자세한 내용을 보려면 목록에서 로그를 선택하세요.

{{< img src="/getting_started/opentelemetry/logs.png" alt="캘린더 애플리케이션용 로그 보기" style="width:90%;" >}}

### 트레이스

트레이스 및 스팬(span) 보기에서 애플리케이션 처리 요청의 상태 및 성능을 확인하세요.

1. **애플리케이션 성능 모니터링(APM)** > **트레이스**로 이동합니다.
2. 필터 메뉴에서 **서비스** 섹션을 찾아 `calendar-otel` 패싯을 선택하면 `calendar-otel` 트레이스가 모두 표시됩니다.

   {{< img src="/getting_started/opentelemetry/traces.png" alt="캘린더 애플리케이션용 트레이스 보기" style="width:90%;" >}}

3. [`calendar-otel` 트레이스 탐색하기][8]. 

   시작하려면 트레이스를 클릭하여 트레이스 사이드 패널을 열어 트레이스와 해당 스팬(span)에 대한 자세한 내용을 확인하세요. 예를 들어, [플레임 그래프][9]는 캘린더 실행 경로의 각 구성 요소에 소요된 시간을 캡처합니다.

   {{< img src="/getting_started/opentelemetry/flame_graph.png" alt="캘린더 어플리케이션 트레이스용 플레임 그래프 보기" style="width:90%;" >}}

4. 하단 패널에서 **인프라스트럭처**, **메트릭** 또는 **로그**를 선택하여 트레이스를 다른 관측성 데이터와 상호 연관시킬 수 있습니다.

   {{< img src="/getting_started/opentelemetry/trace_logs_correlation.png" alt="캘린더 애플리케이션 트레이스를 로그와 상호 연관시키기" style="width:90%;" >}}


## 참고 자료

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
[14]: /ko/opentelemetry/collector_exporter/
[15]: /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[16]: /ko/getting_started/site/