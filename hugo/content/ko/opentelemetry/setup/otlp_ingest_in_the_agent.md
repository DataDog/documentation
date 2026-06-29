---
aliases:
- /ko/tracing/setup_overview/open_standards/otlp_ingest_in_the_agent/
- /ko/tracing/trace_collection/open_standards/otlp_ingest_in_the_agent/
- /ko/opentelemetry/otlp_ingest_in_the_agent/
- /ko/opentelemetry/interoperability/otlp_ingest_in_the_agent/
description: Datadog Agent를 통해 OTLP 트레이스 데이터 수집
further_reading:
- link: https://www.datadoghq.com/about/latest-news/press-releases/datadog-announces-opentelemetry-protocol-support/
  tag: 블로그
  text: Agent의 OTLP 수집
- link: /metrics/open_telemetry/otlp_metric_types
  tag: 설명서
  text: OTLP 메트릭 유형
- link: /opentelemetry/runtime_metrics/
  tag: 설명서
  text: OpenTelemetry 런타임 메트릭
title: Datadog Agent에 의한 OTLP 수집
---
OTLP Ingest in the Agent는 [OpenTelemetry SDK][1]로 계측된 애플리케이션에서 Datadog Agent로 직접 텔레메트리 데이터를 전송하는 기능입니다. Datadog Agent는 6.32.0 및 7.32.0 버전부터 gRPC 또는 HTTP를 통해 OTLP 트레이스 및 [OTLP 메트릭][2]을 수집할 수 있습니다. Datadog Agent는 6.48.0 및 7.48.0 버전부터 gRPC 또는 HTTP를 통해 OTLP 로그를 수집할 수 있습니다.

OTLP Ingest in the Agent를 사용하면 Datadog Agent의 observability 기능을 활용할 수 있습니다. OpenTelemetry SDK로 계측된 애플리케이션의 데이터는 App and API Protection, Continuous Profiler, 그리고 Ingestion Rules와 같은 일부 Datadog 독점 제품에서는 사용할 수 없습니다. [일부 언어에서는 OpenTelemetry Runtime Metrics도 지원됩니다][10].

{{< img src="/opentelemetry/setup/dd-agent-otlp-ingest.png" alt="다이어그램: OpenTelemetry SDK는 OTLP 프로토콜을 통해 Datadog Exporter가 있는 수집기로 데이터를 전송하며, 이는 Datadog 플랫폼으로 전달됩니다." style="width:100%;" >}}

<div class="alert alert-info">이 설정에서 지원되는 Datadog 기능을 보려면 <a href="/opentelemetry/compatibility/">기능 호환성 표</a>의 <b>OTel to Datadog Agent(OTLP)</b> 항목을 참조하세요.</div>

## 초기 설정 {#initial-setup}

시작하려면 먼저 OpenTelemetry SDK로 [애플리케이션을 계측][3]합니다. 그런 다음, OTLP 형식으로 텔레메트리 데이터를 Datadog Agent로 내보냅니다. 구성 방법은 서비스가 배포된 인프라의 종류에 따라 다르며, 아래 페이지에 설명되어 있습니다. 최신 OTLP 버전과의 호환성을 목표로 하지만, OTLP Ingest in the Agent 기능이 모든 OTLP 버전을 지원하는 것은 아닙니다. Datadog Agent와 호환되는 OTLP 버전은 OpenTelemetry 수집기의 OTLP 수신기가 지원하는 버전과 동일합니다. 정확한 지원 버전은 Agent의 `go.mod` 파일에 지정된 `go.opentelemetry.io/collector` 버전을 확인하세요.

Agent에 계측을 전송하는 방법은 OpenTelemetry 계측 설명서를 참조하세요. 아래에 설명된 `receiver` 섹션은 [ OpenTelemetry 수집기의 OTLP 수신기 구성 스키마][5]를 따릅니다.

<div class="alert alert-warning">지원되는 설정은 OpenTelemetry 데이터를 생성하는 각 호스트에 수집용 Agent를 배포하는 방식입니다. OpenTelemetry 텔레메트리를 수집기나 계측된 앱이 실행되는 호스트에서 다른 호스트의 Agent로 보내는 방식은 지원되지 않습니다. 다만 수집기나 SDK 계측 앱과 Agent가 동일 호스트에 있다면 여러 파이프라인을 설정할 수 있습니다.</div>

## Datadog Agent에서의 OTLP 수집 활성화 {#enabling-otlp-ingestion-on-the-datadog-agent}

{{< tabs >}}
{{% tab "호스트" %}}

OTLP 수집은 기본적으로 꺼져 있으며, `datadog.yaml` 파일 구성을 업데이트하거나 환경 변수를 구성하여 활성화할 수 있습니다. 다음 `datadog.yaml` 구성은 기본 포트에서 엔드포인트를 활성화합니다. 활성화되면, 메트릭 및 트레이스 수집은 기본적으로 켜져 있습니다. 로그 수집은 예기치 않은 로그 과금을 방지하기 위해 기본적으로 비활성화되어 있습니다.

{{% otel-endpoint-note %}}

gRPC의 경우, 기본 포트 4317:

```yaml
otlp_config:
  receiver:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
  logs:
    enabled: false
```
HTTP의 경우, 기본 포트 4318:

```yaml
otlp_config:
  receiver:
    protocols:
      http:
        endpoint: 0.0.0.0:4318
  logs:
    enabled: false
```

또는 환경 변수를 통해 포트를 제공하여 엔드포인트를 구성할 수 있습니다.

- gRPC의 경우(`localhost:4317`): `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT`
- HTTP의 경우(`localhost:4318`): `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT`

이 설정은 코어 Agent와 트레이스 Agent 프로세스 모두에 전달해야 합니다. 컨테이너화된 환경에서 실행 중인 경우, 서버가 로컬 인터페이스 외부에서도 접근 가능하도록 `localhost` 대신 `0.0.0.0`을 사용하세요.

이 기능에 대해 gRPC와 HTTP 중 하나를 선택하여 구성할 수 있습니다. 여기 [두 가지에 대한 구성을 보여주는 예제 애플리케이션][1]이 있습니다.

[1]: https://gist.github.com/gbbr/4a54dd02d34ad05e694952e0a02e1c67
{{% /tab %}}
{{% tab "Docker" %}}

1. [Datadog Docker Agent 설정][1]을 따릅니다.

2. Datadog Agent 컨테이너의 경우, 다음 엔드포인트 환경 변수를 설정하고 해당 포트를 노출합니다.
   - gRPC의 경우: `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT`를 `0.0.0.0:4317`로 설정하고 포트 `4317`을 노출합니다.
   - HTTP의 경우: `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT`을 `0.0.0.0:4318`로 설정하고 포트 `4318`을 노출합니다.

<div class="alert alert-danger">
<strong>알려진 문제</strong>: Agent 7.61.0 버전 이상에서는 Docker 환경에서 OTLP 수집 파이프라인이 시작되지 않으며 다음과 같은 오류가 발생할 수 있습니다. <code>Error running the OTLP ingest pipeline: failed to register process metrics: process does not exist</code>.<br><br>
영향을 받는 버전을 사용 중인 경우, 다음의 해결 방법 중 하나를 사용할 수 있습니다.<br><br>
1. Agent Dcoker 컨테이너에서 환경 변수 <code>HOST_PROC</code> 를 <code>/proc</code> 로 설정합니다.<br>
2. Agent Docket 컨테이너에서 <code>/proc/:/host/proc/:ro</code> 를 <code>volumes</code> 에서 제거합니다.<br>
3. Agent Dcoker 컨테이너에서 <code>pid</code> 를 <code>host</code> 로 설정합니다.<br><br>
이 구성은 <code>docker</code> 명령 또는 Docker Compose 파일을 통해 적용할 수 있습니다.</div>

[1]: /ko/agent/docker/
{{% /tab %}}
{{% tab "Datadog Operator" %}}

1.  [Kubernetes Agent 설정][1]을 따라 기본 설치를 진행합니다.

2.  Operator의 `datadog-agent.yaml` 매니페스트에서 원하는 프로토콜(gRPC 또는 HTTP)을 활성화합니다.

    gRPC의 경우:
    ```yaml
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      # (...)
      features:
        otlp:
          receiver:
            protocols:
              grpc:
                enabled: true
    ```
    
    For HTTP:
    ```yaml
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      # (...)
      features:
        otlp:
          receiver:
            protocols:
              http:
                enabled: true
    ```

{{% k8s-operator-redeploy %}}

이렇게 하면 기본 포트(OTLP/gRPC: `4317`, OTLP/HTTP: `4318`)에서 각 프로토콜이 활성화됩니다. 메트릭 및 트레이스는 기본적으로 활성화되어 있습니다.

[1]: /ko/agent/kubernetes/
{{% /tab %}}
{{% tab "Helm" %}}

1.  [Kubernetes Agent 설정][1]을 따라 기본 설치를 진행합니다.

2.  Helm의 `datadog-values.yaml` 파일에서 원하는 프로토콜(gRPC 또는 HTTP)을 활성화합니다.

    gRPC의 경우:
    ```yaml
    datadog:
      # (...)
      otlp:
        receiver:
          protocols:
            grpc:
              enabled: true
    ```

    For HTTP:
    ```yaml
    datadog:
      # (...)
      otlp:
        receiver:
          protocols:
            http:
              enabled: true
    ```

{{% k8s-helm-redeploy %}}

이렇게 하면 기본 포트(OTLP/gRPC: `4317`, OTLP/HTTP: `4318`)에서 각 프로토콜이 활성화됩니다. 메트릭 및 트레이스는 기본적으로 활성화되어 있습니다.

[1]: /ko/agent/kubernetes/
{{% /tab %}}
{{% tab "수동(Daemonset)" %}}

1.  [수동 Kubernetes 설치 가이드][1]를 따라 기본 설치를 진행합니다..

2.  다음 환경 변수를 `trace-agent` 컨테이너와 핵심 `agent` 컨테이너 모두에 구성합니다.

    gRPC의 경우:
    ```yaml
    name: DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT # enables gRPC receiver on port 4317
    value: "0.0.0.0:4317"
    ```

    For HTTP:
    ```yaml
    name: DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT # enables HTTP receiver on port 4318
    value: "0.0.0.0:4318"
    ```

3. 컨테이너 포트 4317 또는 4318을 핵심 `agent` 컨테이너의 호스트 포트에 매핑합니다.

    gRPC의 경우:
    ```yaml
    ports:
      - containerPort: 4317
        hostPort: 4317
        name: traceportgrpc
        protocol: TCP
    ```

    For HTTP
    ```yaml
    ports:
      - containerPort: 4318
        hostPort: 4318
        name: traceporthttp
        protocol: TCP
    ```

[1]: /ko/containers/guide/kubernetes_daemonset/
{{% /tab %}}
{{% tab "AWS Lambda" %}}

AWS Lambda 및 Datadog에서 OpenTelemetry를 사용하는 방법에 대한 자세한 지침은 다음과 같습니다.

- OpenTelemetry로 Lambda 함수를 계측하기
- Datadog SDK 내에서 OpenTelemetry API 지원 사용하기
- OpenTelemetry 트레이스를 Datadog Lambda Extension으로 보내기

Serverless 설명서에서 [AWS Lambda 및 OpenTelemetry][100]를 참조하세요.

[100]: /ko/serverless/aws_lambda/opentelemetry/
{{% /tab %}}
{{< /tabs >}}

### OTLP 로그 수집 활성화 {#enabling-otlp-logs-ingestion}

OTLP 로그 수집은 예기치 않은 과금을 방지하기 위해 기본적으로 비활성화되어 있습니다. 활성화하려면 로그 수집과 OTLP 로그 수집을 모두 명시적으로 활성화해야 합니다.

{{< tabs >}}
{{% tab "호스트" %}}

1. [Host Agent 로그 수집 설정][7]을 따라 로그 수집을 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

2. `otlp_config.logs.enabled`를 true로 설정합니다.

   ```yaml
   otlp_config:
     logs:
       enabled: true
   ```

[7]: /ko/agent/logs/
{{% /tab %}}
{{% tab "Docker" %}}

Datadog Agent 컨테이너에서 다음 환경 변수를 설정합니다.

- `DD_LOGS_ENABLED=true`
- `DD_OTLP_CONFIG_LOGS_ENABLED=true`

{{% /tab %}}
{{% tab "Datadog Operator" %}}

`datadog-agent.yaml` 파일

```yaml
spec:
  # (...)
  features:
    otlp:
      #(... enable gRPC or HTTP ingestion...)
    logCollection:
      enabled: true
  override:
    nodeAgent:
      containers:
        agent:
          env:
            - name: DD_OTLP_CONFIG_LOGS_ENABLED
              value: "true"
```

{{% k8s-operator-redeploy %}}

{{% /tab %}}
{{% tab "Helm" %}}

`datadog-values.yaml` 파일:

```yaml
datadog:
  # (...)
  otlp:
    #(... enable gRPC or HTTP ingestion...)
    logs:
      enabled: true
  logs:
    enabled: true
```

{{% k8s-helm-redeploy %}}

{{% /tab %}}
{{% tab "수동(Daemonset)" %}}

핵심 Agent 컨테이너에서 다음 환경 변수를 설정합니다.

```yaml
- name: DD_LOGS_ENABLED
  value: "true"
- name: DD_OTLP_CONFIG_LOGS_ENABLED
  value: "true"
```

자세한 내용은 [DaemonSet을 통한 로그 수집][8]을 참조하세요.

[8]: /ko/containers/guide/kubernetes_daemonset/#log-collection
{{% /tab %}}
{{< /tabs >}}

Datadog Agent에는 이 외에도 다양한 환경 변수와 설정이 지원됩니다. 전체 구성 목록은 [구성 템플릿][6]을 참조하세요.

## OpenTelemetry 트레이스, 메트릭 및 로그를 Datadog Agent로 보내기 {#sending-opentelemetry-traces-metrics-and-logs-to-datadog-agent}

Datadog Agent에서 OTLP 수집을 활성화한 후, OpenTelemetry로 계측된 애플리케이션을 구성하여 Agent의 OTLP 엔드포인트로 텔레메트리 데이터를 내보내야 합니다. **애플리케이션** 환경에 `OTEL_EXPORTER_OTLP_ENDPOINT` 환경 변수를 설정하여 데이터를 Agent로 전달합니다. 이 구성을 하지 않으면 Agent의 OTLP 수신기가 활성화되어 있어도 애플리케이션은 텔레메트리 데이터를 Agent로 전송하지 않습니다.

{{< tabs >}}
{{% tab "호스트" %}}
애플리케이션의 환경에서 `OTEL_EXPORTER_OTLP_ENDPOINT` 환경 변수를 설정합니다.

gRPC의 경우:

```shell
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317"
```

HTTP의 경우:

```shell
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4318"
```
{{% /tab %}}

{{% tab "Docker" %}}
1. 애플리케이션 컨테이너의 경우, `OTEL_EXPORTER_OTLP_ENDPOINT` 환경 변수를 Datadog Agent 컨테이너를 가리키도록 설정합니다. 예를 들면 다음과 같습니다.

   ```
   OTEL_EXPORTER_OTLP_ENDPOINT=http://<datadog-agent>:4318
   ```

2. 두 컨테이너는 동일한 브리지 네트워크에 정의되어야 하며, Docker Compose를 사용하면 자동으로 처리됩니다. 그렇지 않으면 [Docker 애플리케이션 추적][1]의 Docker 예제를 따라 올바른 포트로 브리지 네트워크를 설정합니다.

[1]: /ko/agent/docker/apm/#docker-network
{{% /tab %}}

{{% tab "Kubernetes" %}}
애플리케이션 배포 파일에서 OpenTelemetry 클라이언트가 트레이스를 전송할 엔드포인트를 `OTEL_EXPORTER_OTLP_ENDPOINT` 환경 변수를 사용하여 구성합니다.

gRPC의 경우:

```yaml
env:
 - name: HOST_IP
   valueFrom:
     fieldRef:
       fieldPath: status.hostIP
 - name: OTEL_EXPORTER_OTLP_ENDPOINT
   value: "http://$(HOST_IP):4317" # sends to gRPC receiver on port 4317
```

HTTP의 경우:

```yaml
env:
 - name: HOST_IP
   valueFrom:
     fieldRef:
       fieldPath: status.hostIP
 - name: OTEL_EXPORTER_OTLP_ENDPOINT
   value: "http://$(HOST_IP):4318" # sends to HTTP receiver on port 4318
```
**참고**: 사용자 지정 메트릭에 대한 컨테이너 태그를 강화하려면 OTLP 메트릭이 생성되는 애플리케이션 코드에서 적절한 리소스 속성을 설정해야 합니다. 예를 들어, `container.id` 리소스 속성을 포드의 UID로 설정합니다.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">트레이스를 전송하기 위한 엔드포인트를 구성할 때는 OTLP 라이브러리에서 요구하는 올바른 경로를 사용해야 합니다. 일부 라이브러리는 <code>/v1/traces</code> 경로로 트레이스를 전송하도록 요구하는 반면 일부 라이브러리는 루트 경로 <code>/</code>를 사용합니다.</div>

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/
[2]: /ko/metrics/open_telemetry/otlp_metric_types/
[3]: https://opentelemetry.io/docs/concepts/instrumenting/
[4]: https://github.com/DataDog/datadog-agent/blob/main/CHANGELOG.rst
[5]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/receiver/otlpreceiver/config.md
[6]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
[10]: /ko/opentelemetry/runtime_metrics/