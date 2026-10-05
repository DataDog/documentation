---
code_lang: windows
code_lang_weight: 5
further_reading:
- link: /opentelemetry/setup/ddot_collector/custom_components
  tag: 설명서
  text: Datadog Agent와 함께 사용자 지정 OpenTelemetry 구성 요소 사용하기
title: Windows에 DDOT Collector를 설치하기
type: multi-code-lang
---
## 개요 {#overview}

이 가이드에 따라 Windows 기반 베어메탈 호스트 및 가상 머신에 Datadog Distribution of OpenTelemetry (DDOT) Collector를 설치하세요.

## 요구 사항 {#requirements}

이 가이드를 완료하려면 다음이 필요합니다.

**Datadog 계정**:
1. Datadog 계정이 없는 경우 [Datadog 계정을 생성][1]합니다.
1. [Datadog API 키][2]를 확인하거나 생성합니다.

**소프트웨어**:
- 지원되는 Windows 버전(Windows Server 2016 이상 또는 Windows 10 이상). 자세한 내용은 [지원되는 플랫폼][14]을 참조하세요.

**네트워크**:

{{% otel-network-requirements %}}

## Datadog Agent와 OpenTelemetry Collector 설치 {#install-the-datadog-agent-with-opentelemetry-collector}

<div class="alert alert-info">이 설치는 Datadog SDK + DDOT 및 OpenTelemetry SDK + DDOT 구성 모두에 필요합니다. Datadog SDK는 OpenTelemetry API를 구현하지만, OTLP 메트릭 및 로그를 처리하고 전달하기 위해서는 여전히 DDOT Collector가 필요합니다.</div>

### 설치 {#installation}

Windows 호스트에 DDOT Collector를 설치하려면 다음 MSI 명령을 사용하세요.

```powershell
$p = Start-Process -Wait -PassThru msiexec -ArgumentList '/qn /i "https://windows-agent.datadoghq.com/datadog-agent-7-latest.amd64.msi" /log C:\Windows\SystemTemp\install-datadog.log APIKEY="<DATADOG_API_KEY>" SITE="{{< region-param key="dd_site" >}}" DD_OTELCOLLECTOR_ENABLED=true'
if ($p.ExitCode -ne 0) {
  Write-Host "msiexec failed with exit code $($p.ExitCode) please check the logs at C:\Windows\SystemTemp\install-datadog.log" -ForegroundColor Red
}
```

이 명령은 핵심 Datadog Agent 패키지와 함께 실행되는 DDOT Collector를 모두 설치합니다.

**참고**: Agent v7.78 이상 버전의 경우, Datadog Agent가 호스트에 이미 설치되어 있다면 DDOT Collector를 별도로 설치할 수 있습니다. **관리자 권한으로 실행한 PowerShell 세션**에서 다음 명령을 실행하세요.

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" otel install
```

### 유효성 검사 {#validation}

설치를 확인하려면 Agent의 [상태 명령][3]을 실행하세요.

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
```

설치에 성공하면 다음과 같은 Agent 정보로 시작하는 Agent 상태 보고서가 반환됩니다.

```text
====================
Agent (v7.x.x)
====================
  Status date: 2025-08-22 18:35:17.449 UTC (1755887717449)
  Agent start: 2025-08-22 18:16:27.004 UTC (1755886587004)
  Pid: 2828211
  Go Version: go1.24.6
  Python Version: 3.12.11
  Build arch: amd64
  Agent flavor: agent
  FIPS Mode: not available
  Log Level: info
```

OpenTelemetry 정보가 포함된 {{< ui >}}OTel Agent{{< /ui >}} 상태 섹션도 표시됩니다.

```text
==========
OTel Agent
==========

  Status: Running
  Agent Version: 7.x.x
  Collector Version: v0.129.0

  Receiver
  ==========================
    Spans Accepted: 0
    Metric Points Accepted: 1055
    Log Records Accepted: 0

  Exporter
  ==========================
    Spans Sent: 0
    Metric Points Sent: 1055
    Log Records Sent: 0
```

## Datadog Agent 구성 {#configure-the-datadog-agent}

### DDOT Collector를 활성화 {#enable-the-ddot-collector}
Datadog Agent 구성 파일은 `C:\ProgramData\Datadog\datadog.yaml`에 자동으로 설치됩니다. 설치 프로그램은 DDOT Collector를 활성화하기 위해 `C:\ProgramData\Datadog\datadog.yaml`에 다음 구성 설정을 추가합니다.

{{< code-block lang="yaml" filename="datadog.yaml" collapsible="true" >}}
otelcollector:
  enabled: true
agent_ipc:
  port: 5009
  config_refresh_interval: 60
{{< /code-block >}}

DDOT는 기본적으로 OpenTelemetry Collector를 포트 4317(grpc) 및 4318(http)에 자동으로 바인딩합니다.

### (필요시) 추가 Datadog 기능 활성화 {#optional-enable-additional-datadog-features}

<div class="alert alert-warning">이 기능을 활성화하면 추가 비용이 발생할 수 있습니다. 진행하기 전에 <a href="https://www.datadoghq.com/pricing/">가격 페이지</a>를 확인하고 고객 성공 관리자와 상담하세요.</div>

사용 가능한 옵션의 전체 목록은 `C:\ProgramData\Datadog\datadog.yaml.example`의 모든 항목에 주석이 달린 참조 파일을 참조하세요. 또는 GitHub의 [Windows용 Agent 구성 파일 예시][12]를 참조하세요.

추가 Datadog 기능을 활성화할 때는 Datadog 환경 변수에 의존하지 말고 Datadog 또는 OpenTelemetry Collector 구성 파일을 사용하세요.

## OpenTelemetry Collector 구성 {#configure-the-opentelemetry-collector}

설치 프로그램은 시작점으로 사용할 수 있는 OpenTelemetry Collector 샘플 구성을 `C:\ProgramData\Datadog\otel-config.yaml`에 제공합니다.

{{% collapse-content title="설치 시 제공되는 샘플 otel-config.yaml 파일" level="p" %}}
설치 시 `otel-config.yaml` 샘플은 다음과 같이 표시됩니다.
{{< code-block lang="yaml" filename="otel-config.yaml" collapsible="true" >}}
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: "otelcol"
          scrape_interval: 60s
          static_configs:
            - targets: ["0.0.0.0:8888"]
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
exporters:
  debug:
    verbosity: detailed
  datadog:
    api:
      key: <DATADOG_API_KEY>
      site: <DATADOG_SITE>
    sending_queue:
      batch:
        flush_timeout: 10s
processors:
  infraattributes:
    cardinality: 2
  cumulativetodelta:
connectors:
  datadog/connector:
    traces:
      compute_top_level_by_span_kind: true
      peer_tags_aggregation: true
      compute_stats_by_span_kind: true
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [infraattributes]
      exporters: [datadog, datadog/connector]
    metrics:
      receivers: [otlp, datadog/connector, prometheus]
      processors: [infraattributes, cumulativetodelta]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      processors: [infraattributes]
      exporters: [datadog]
{{< /code-block >}}
{{% /collapse-content %}}

#### 주요 구성 요소 {#key-components}

텔레메트리 데이터를 Datadog으로 전송하기 위해 다음 구성 요소가 정의되어 있습니다.

{{< img src="/opentelemetry/embedded_collector/components-3.jpg" alt="Agent 배포 패턴을 나타내는 다이어그램" style="width:100%;" >}}

##### Datadog 커넥터 {#datadog-connector}

[Datadog 커넥터][4]는 Datadog APM 트레이스 메트릭을 계산합니다.

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
connectors:
  datadog/connector:
    traces:
{{< /code-block >}}

##### Datadog 익스포터 {#datadog-exporter}

[Datadog 익스포터][5]는 트레이스, 메트릭 및 로그를 Datadog으로 내보냅니다.

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
exporters:
  datadog:
    api:
      key: <DATADOG_API_KEY>
      site: <DATADOG_SITE>
    sending_queue:
      batch:
        flush_timeout: 10s
{{< /code-block >}}

**참고**: `key`가 지정되지 않았거나 시크릿으로 설정된 경우, 또는 `site`가 지정되지 않은 경우 시스템은 핵심 Agent 구성의 값을 사용합니다. 기본적으로 핵심 Agent는 사이트를 `datadoghq.com`(US1)으로 설정합니다.

##### Prometheus 수신기 {#prometheus-receiver}

[Prometheus 수신기][6]는 메트릭 파이프라인을 위해 OpenTelemetry Collector에서 상태 메트릭을 수집합니다.

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: "otelcol"
          scrape_interval: 60s
          static_configs:
            - targets: ["0.0.0.0:8888"]
{{< /code-block >}}

자세한 내용은 [Collector 상태 메트릭][11] 설명서를 참조하세요.

## Datadog으로 텔레메트리 전송 {#send-your-telemetry-to-datadog}

텔레메트리 데이터를 Datadog으로 전송하려면 다음 단계를 따르세요.

1. [애플리케이션을 계측](#instrument-the-application)합니다.
2. [애플리케이션 구성](#configure-the-application)
3. [관측 가능성 데이터 상호 연결](#correlate-observability-data)
4. [애플리케이션을 실행](#run-the-application)합니다.

### 애플리케이션 계측 {#instrument-the-application}

[OpenTelemetry API를 사용하여][7] 애플리케이션을 계측하세요.

{{% collapse-content title="OpenTelemetry API로 계측된 애플리케이션 예시" level="p" %}}
예를 들어, 이미 계측이 완료된 [Calendar 샘플 애플리케이션][8]을 사용할 수 있습니다. 다음 코드는 OpenTelemetry 주석 및 API를 사용하여 [CalendarService.getDate()][9] 메서드를 계측합니다.
   {{< code-block lang="java" filename="CalendarService.java" disable_copy="true" collapsible="false" >}}
@WithSpan(kind = SpanKind.CLIENT)
public String getDate() {
    Span span = Span.current();
    span.setAttribute("peer.service", "random-date-service");
    ...
}
{{< /code-block >}}
{{% /collapse-content %}}

### 애플리케이션 구성 {#configure-the-application}

애플리케이션은 동일한 호스트에서 실행 중인 DDOT Collector로 데이터를 전송해야 합니다. 애플리케이션에 `OTEL_EXPORTER_OTLP_ENDPOINT` 환경 변수가 설정되어 있는지 확인하세요.

예시 애플리케이션을 사용하는 경우 [`run-otel-local.sh`][13]에서 필요한 환경 변수를 설정하고 애플리케이션을 실행합니다.
{{< code-block lang="bash" filename="run-otel-local.sh" disable_copy="true" collapsible="true" >}}
export OTEL_METRICS_EXPORTER="otlp"
export OTEL_LOGS_EXPORTER="otlp"
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317"
export OTEL_EXPORTER_OTLP_PROTOCOL="grpc"
{{< /code-block >}}

**참고**: 이 스크립트는 Git for Windows에 포함된 Git Bash에서 실행할 수 있습니다.
### 관측 가능성 데이터 상호 연결 {#correlate-observability-data}

[Unified service tagging][10]은 Datadog의 관측 가능성 데이터를 연결하여 메트릭, 트레이스 및 로그를 일관된 태그로 탐색할 수 있도록 합니다.

베어메탈 환경에서는 OpenTelemetry 리소스 속성 환경 변수를 통해 `env`, `service` 및 `version`을 설정합니다. DDOT Collector는 이러한 태깅 구성을 감지하고 애플리케이션에서 수집한 데이터에 적용합니다.

예시 애플리케이션에서는 `run-otel-local.sh`에서 이 작업을 수행합니다.
{{< code-block lang="bash" filename="run-otel-local.sh" disable_copy="true" collapsible="true" >}}
export OTEL_RESOURCE_ATTRIBUTES="service.name=my-calendar-service,service.version=1.0,deployment.environment.name=otel-test,host.name=calendar-host"
{{< /code-block >}}

### 애플리케이션 실행 {#run-the-application}

환경 변수에 적용한 변경 사항을 반영하려면 애플리케이션을 다시 배포하세요. 업데이트된 구성이 활성화되면 메트릭, 트레이스 및 로그 전반에서 unified service tagging이 완전히 활성화됩니다.

## Datadog에서 관측 가능성 데이터 탐색 {#explore-observability-data-in-datadog}

Datadog을 사용하여 애플리케이션의 관측 가능성 데이터를 확인하세요.

### Fleet Automation {#fleet-automation}

Datadog Agent, DDOT 및 업스트림 OpenTelemetry Collector 구성을 살펴보세요.

{{< img src="/opentelemetry/embedded_collector/fleet_automation.png" alt="Fleet Automation 페이지에서 Agent 및 Collector 구성 검토" style="width:100%;" >}}

### 인프라 모니터링 {#infrastructure-monitoring}

런타임 및 인프라 메트릭을 조회하여 호스트 성능을 시각화, 모니터링 및 측정하세요.

{{< img src="/opentelemetry/embedded_collector/infrastructure.png" alt="Host List에서 런타임 및 인프라 메트릭 조회" style="width:100%;" >}}

### 로그 {#logs}

로그를 조회하여 애플리케이션 및 시스템 운영을 모니터링하고 문제를 해결하세요.

{{< img src="/opentelemetry/embedded_collector/logs.png" alt="Log Explorer에서 로그 조회" style="width:100%;" >}}

### 트레이스 {#traces}

트레이스와 스팬을 조회하여 애플리케이션이 처리하는 요청의 상태 및 성능을 확인하세요. 동일한 트레이스 내에서 인프라 메트릭도 함께 상호 연결되어 표시됩니다.

{{< img src="/opentelemetry/embedded_collector/traces.png" alt="Trace Explorer에서 트레이스 조회" style="width:100%;" >}}

### 런타임 메트릭 {#runtime-metrics}

애플리케이션의 런타임(JVM) 메트릭을 모니터링하세요.

{{< img src="/opentelemetry/embedded_collector/metrics.png" alt="JVM Metrics 대시보드에서 JVM 메트릭 조회" style="width:100%;" >}}

### Collector 상태 메트릭 {#collector-health-metrics}

DDOT Collector의 상태를 모니터링하려면 Collector 메트릭을 조회하세요.

{{< img src="/opentelemetry/embedded_collector/dashboard.png" alt="OTel 대시보드에서 Collector 상태 메트릭 조회" style="width:100%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: /ko/agent/configuration/agent-commands/#agent-status-and-information
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/prometheusreceiver
[7]: /ko/opentelemetry/instrument/api_support
[8]: https://github.com/DataDog/opentelemetry-examples/tree/main/apps/rest-services/java/calendar
[9]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/src/main/java/com/otel/service/CalendarService.java#L27-L48
[10]: /ko/opentelemetry/correlate/
[11]: /ko/opentelemetry/integrations/collector_health_metrics/
[12]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_windows.yaml.example
[13]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/run-otel-local.sh
[14]: /ko/agent/supported_platforms/windows/