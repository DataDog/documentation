---
aliases:
- /ko/tracing/setup_overview/open_standards/otel_collector_datadog_exporter/
- /ko/tracing/trace_collection/open_standards/otel_collector_datadog_exporter/
- /ko/opentelemetry/otel_collector_datadog_exporter/
- /ko/opentelemetry/collector_exporter/
- /ko/opentelemetry/collector_exporter/otel_collector_datadog_exporter
description: OpenTelemetry 데이터를 OpenTelemetry 컬렉터 및 Datadog 익스포터로 전송하기
further_reading:
- link: https://opentelemetry.io/docs/collector/
  tag: 외부 사이트
  text: 컬렉터 설명서
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/
  tag: 블로그
  text: Datadog 익스포터를 사용해 메트릭, 트레이스, 로그를 OpenTelemetry 컬렉터에서 Datadog으로 전송합니다.
- link: /opentelemetry/integrations/datadog_extension/
  tag: 설명서
  text: Fleet Automation에서 컬렉터 구성을 검사할 수 있도록 Datadog 확장 활성화
title: OpenTelemetry Collector 설정
---
## 개요 {#overview}

OpenTelemetry Collector를 사용하면 애플리케이션의 텔레메트리 데이터를 공급업체 중립적인 방식으로 수집, 처리 및 내보낼 수 있습니다. [Datadog Exporter][1] 및 [Datadog Connector][29]와 함께 구성하면 Datadog Agent 없이도 트레이스, 로그 및 메트릭을 Datadog으로 보낼 수 있습니다.

- **Datadog Exporter**: OpenTelemetry SDK에서 수집한 트레이스, 메트릭 및 로그 데이터를 Datadog으로 전송합니다(Datadog Agent 불필요).
- **Datadog Connector**: 수집된 스팬 데이터에서 트레이스 메트릭을 계산합니다.

{{< img src="/opentelemetry/setup/otel-collector.png" alt="다이어그램: 코드의 OpenTelemetry SDK가 OTLP를 통해 Datadog 익스포터를 사용하여 OpenTelemetry Collector를 실행 중인 호스트로 데이터를 보내고, 여기에서 Datadog의 Observability Platform으로 전달됩니다." style="width:100%;" >}}

<div class="alert alert-info">이 설정에서 지원되는 Datadog 기능을 보려면 <b>전체 OpenTelemetry</b>의</div> <a href="/opentelemetry/compatibility/">기능 호환성 표</a>를 참조하세요.

## 설치 및 구성 {#install-and-configure}

### 1 - OpenTelemetry Collector 다운로드 {#1-download-the-opentelemetry-collector}

OpenTelemetry Collector Contrib 배포판의 최신 릴리스를 [프로젝트의 리포지토리][3]에서 다운로드합니다.

### 2 - Datadog Exporter 및 Datadog Connector 구성 {#2-configure-the-datadog-exporter-and-connector}

Datadog Exporter 및 Datadog Connector를 사용하려면 [OpenTelemetry Collector 구성][4]에서 구성합니다.

1. 이름이 `collector.yaml`인 구성 파일을 만듭니다.
1. 시작하기 위해 다음 예제 파일을 사용합니다.
1. Datadog API 키를 `DD_API_KEY` 환경 변수로 설정합니다.

{{% otel-endpoint-note %}}

<div class="alert alert-warning">현재 AWS EKS Fargate는 OpenTelemetry Collector를 지원하는 환경이 아닙니다. EKS Fargate에 Collector를 배포하면 인프라 호스트 과금이 부정확하게 계산될 수 있습니다.</div>

```yaml
receivers:
  otlp:
    protocols:
      http:
        endpoint: 0.0.0.0:4318
      grpc:
        endpoint: 0.0.0.0:4317
  # The hostmetrics receiver is required to get correct infrastructure metrics in Datadog.
  hostmetrics:
    collection_interval: 10s
    scrapers:
      paging:
        metrics:
          system.paging.utilization:
            enabled: true
      cpu:
        metrics:
          system.cpu.utilization:
            enabled: true
      disk:
      filesystem:
        metrics:
          system.filesystem.utilization:
            enabled: true
      load:
      memory:
      network:
      processes:
  # The prometheus receiver scrapes metrics needed for the OpenTelemetry Collector Dashboard.
  prometheus:
    config:
      scrape_configs:
      - job_name: 'otelcol'
        scrape_interval: 10s
        static_configs:
        - targets: ['0.0.0.0:8888']

  filelog:
    include_file_path: true
    poll_interval: 500ms
    include:
      - /var/log/**/*example*/*.log

processors:
  batch:
    send_batch_max_size: 100
    send_batch_size: 10
    timeout: 10s

connectors:
  datadog/connector:

exporters:
  datadog/exporter:
    api:
      site: {{< region-param key="dd_site" >}}
      key: ${env:DD_API_KEY}

service:
  pipelines:
    metrics:
      receivers: [hostmetrics, prometheus, otlp, datadog/connector]
      processors: [batch]
      exporters: [datadog/exporter]
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog/connector, datadog/exporter]
    logs:
      receivers: [otlp, filelog]
      processors: [batch]
      exporters: [datadog/exporter]
```

이 기본 구성에서는 HTTP 및 gRPC를 통해 OTLP 데이터를 수신할 수 있으며, [Batch Processor][5]를 설정합니다.

Datadog Exporter의 구성 옵션에 대한 전체 목록은 [완전히 문서화된 예제 구성 파일][8]을 참조하세요. 배포에 따라 `api::site` 및 `host_metadata` 설정과 같은 옵션이 추가로 필요할 수 있습니다.

#### 배치 프로세서 구성 {#batch-processor-configuration}

개발 환경이 아닌 경우 배치 프로세서는 필수입니다. 정확한 구성은 특정 워크로드와 신호 유형에 따라 다릅니다.

Datadog의 수집 한도에 따라 배치 프로세서를 구성합니다.

- 트레이스 수집: 3.2MB
- 로그 수집: [압축 해제 기준 5MB][6]
- 메트릭 V2 수집: [500KB 또는 압축 해제 후 5MB][7]

배치 프로세서에서 너무 많은 텔레메트리 데이터를 묶으면 `413 - Request Entity Too Large` 오류가 발생할 수 있습니다.

### 3 - 애플리케이션 구성 {#3-configure-your-application}

트레이스에 대한 더 나은 메타데이터를 얻고 Datadog과 원활하게 통합하려면 다음을 따르세요.

- **리소스 탐지기 사용**: 사용 중인 언어 SDK에서 리소스 탐지기를 제공하면 컨테이너 정보를 리소스 속성으로 추가합니다. 예를 들어, Go에서는 [`WithContainer()`][9] 리소스 옵션을 사용하세요.

- **[Unified Service Tagging][10]** 적용: unified service tagging에 필요한 적절한 리소스 속성이 애플리케이션에 구성되어 있는지 확인합니다. 이를 통해 Datadog 텔레메트리를 서비스 이름, 배포 환경 및 서비스 버전 태그와 연결할 수 있습니다. 애플리케이션은 OpenTelemetry 시맨틱 규칙에 따라 다음 태그를 설정해야 합니다. `service.name`, `deployment.environment` 및 `service.version`.

### 4 - 애플리케이션의 로거 구성 {#4-configure-the-logger-for-your-application}

{{< img src="logs/log_collection/otel_collector_logs.png" alt="호스트, 컨테이너, 또는 애플리케이션의 데이터가 Collector의 파일로그 수신기로 전송되고 Collector의 Datadog Explorer가 Datadog 백엔드로 데이터를 전송하는 흐름을 보여주는 다이어그램" style="width:100%;">}}

OpenTelemetry SDK의 로깅 기능은 아직 완전히 지원되지 않으므로(자세한 내용은 [OpenTelemetry 문서][11]의 해당 언어별 설명 참조), Datadog은 애플리케이션에서 표준 로깅 라이브러리를 사용할 것을 권장합니다. 애플리케이션에서 적절한 로거를 설정하려면 언어별 [로그 수집 설명서][12]를 따르세요. Datadog에서는 [사용자 지정 파싱 규칙][13]이 필요하지 않도록 로깅 라이브러리를 설정하여 로그를 JSON으로 출력하는 것을 권장합니다.

#### 파일로그 수신기 구성 {#configure-the-filelog-receiver}

[연산자][14]를 사용하여 파일로그 수신기를 구성합니다. 예를 들어, `checkoutservice` 서비스가 `/var/log/pods/services/checkout/0.log`에 로그를 기록하고 있다면, 샘플 로그는 다음과 같을 수 있습니다.

```
{"level":"info","message":"order confirmation email sent to \"jack@example.com\"","service":"checkoutservice","span_id":"197492ff2b4e1c65","timestamp":"2022-10-10T22:17:14.841359661Z","trace_id":"e12c408e028299900d48a9dd29b0dc4c"}
```

filelog 구성 예시:

```
filelog:
   include:
     - /var/log/pods/**/*checkout*/*.log
   start_at: end
   poll_interval: 500ms
   operators:
     - id: parse_log
       type: json_parser
       parse_from: body
     - id: trace
       type: trace_parser
       trace_id:
         parse_from: attributes.trace_id
       span_id:
         parse_from: attributes.span_id
   attributes:
     ddtags: env:staging
```

- `include`: 수신기가 테일링하는 파일 목록
- `start_at: end`: 새로 기록되는 내용 수집
- `poll_internal`: 폴링 빈도 설정
- Operator:
    - `json_parser`: JSON 로그를 구문 분석합니다. 기본적으로, filelog receiver는 각 로그 라인을 로그 레코드로 변환하며, 이는 로그의 [데이터 모델][15]의 `body`입니다. 그런 다음, `json_parser`는 JSON 본문을 데이터 모델의 속성으로 변환합니다.
    - `trace_parser`: 로그에서 `trace_id`와 `span_id`를 추출하여 Datadog에서 로그와 트레이스의 상관관계를 지을 수 있습니다.

#### OpenTelemetry의 `service.name` 속성을 로그의 `service`service{#remap-otels-servicename-attribute-to-service-for-logs} 필드로 재매핑

Datadog Exporter 버전 0.83.0 이상에서는 OpenTelemtry 로그의 `service` 필드가 [OpenTelemtry 시맨틱 규칙][25]의 `service.name` 값으로 채워집니다. 그러나 `service.name`는 Datadog의 로그 전처리에서 기본 [서비스 속성][26]으로 사용되지 않습니다.

로그의 `service` 필드를 올바르게 채우려면 [로그 서비스 리매퍼 프로세서][27]를 설정하여 `service.name`을 로그의 서비스 정보 소스로 지정할 수 있습니다.

{{% collapse-content title="선택 사항: Kubernetes 사용" level="h4" %}}

<div class="alert alert-warning">현재 AWS EKS Fargate는 OpenTelemetry Collector를 지원하는 환경이 아닙니다. EKS Fargate에 Collector를 배포하면 인프라 호스트 과금이 부정확하게 계산될 수 있습니다.</div>

Kubernetes 인프라에서 OpenTelemetry Collector와 Datadog Exporter를 배포하는 방법은 여러 가지가 있습니다. 파일로그 수신기가 작동하려면 [Agent/DaemonSet 배포][16] 방식이 권장됩니다.

컨테이너화된 환경에서 애플리케이션은 `stdout` 또는 `stderr`에 로그를 기록합니다. Kubernetes는 로그를 수집하여 표준 위치에 기록합니다. 파일로그 수신기를 위해 호스트 노드의 위치를 수집기에 마운트해야 합니다. 아래는 로그 전송에 필요한 마운트가 포함된 [확장 예제][17]입니다.

```
apiVersion: apps/v1
metadata:
  name: otel-agent
  labels:
    app: opentelemetry
    component: otel-collector
spec:
  template:
    metadata:
      labels:
        app: opentelemetry
        component: otel-collector
    spec:
      containers:
        - name: collector
          command:
            - "/otelcol-contrib"
            - "--config=/conf/otel-agent-config.yaml"
          image: otel/opentelemetry-collector-contrib:0.71.0
          env:
            - name: POD_IP
              valueFrom:
                fieldRef:
                  fieldPath: status.podIP
            # The k8s.pod.ip is used to associate pods for k8sattributes
            - name: OTEL_RESOURCE_ATTRIBUTES
              value: "k8s.pod.ip=$(POD_IP)"
          ports:
            - containerPort: 4318 # default port for OpenTelemetry HTTP receiver.
              hostPort: 4318
            - containerPort: 4317 # default port for OpenTelemetry gRPC receiver.
              hostPort: 4317
            - containerPort: 8888 # Default endpoint for querying metrics.
          volumeMounts:
            - name: otel-agent-config-vol
              mountPath: /conf
            - name: varlogpods
              mountPath: /var/log/pods
              readOnly: true
            - name: varlibdockercontainers
              mountPath: /var/lib/docker/containers
              readOnly: true
      volumes:
        - name: otel-agent-config-vol
          configMap:
            name: otel-agent-conf
            items:
              - key: otel-agent-config
                path: otel-agent-config.yaml
        # Mount nodes log file location.
        - name: varlogpods
          hostPath:
            path: /var/log/pods
        - name: varlibdockercontainers
          hostPath:
            path: /var/lib/docker/containers
```

{{% /collapse-content %}}

## 기본 제공 Datadog Exporter 구성 {#out-of-the-box-datadog-exporter-configuration}

OpenTelemetry Collector Contrib 프로젝트의 [`exporter/datadogexporter/examples` 폴더][31]에서 Datadog Exporter의 기본 제공 구성 작업 예제를 찾을 수 있습니다. 전체 구성 예제 파일 [`ootb-ec2.yaml`][30]을 참조하세요. **참고**: 이 예제는 EC2 호스트에서 직접 실행되는 애플리케이션을 위한 것입니다. 컨테이너화된 애플리케이션에 대해서는 [배포 설명서][33]를 참조하세요.

다음 구성 요소 각각을 필요에 맞게 구성하세요.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/collector_exporter/otlp_receiver/" >}}OTLP 수신기{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/hostname_tagging/" >}}호스트 이름 및 태그{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/collector_batch_memory/" >}}배치 및 메모리 설정{{< /nextlink >}}
{{< /whatsnext >}}

## Fleet Automation에서 수집기 구성 검증 {#validate-your-collector-configurations-in-fleet-automation}

Datadog 확장을 활성화하여 Fleet Automation에서 OpenTelemetry Collector 구성을 검사하고 문제를 해결하세요. 

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[3]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest
[4]: https://opentelemetry.io/docs/collector/configuration/
[5]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/batchprocessor/README.md
[6]: /ko/api/latest/logs/
[7]: /ko/api/latest/metrics/#submit-metrics
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml
[9]: https://pkg.go.dev/go.opentelemetry.io/otel/sdk/resource#WithContainer
[10]: /ko/getting_started/tagging/unified_service_tagging/
[11]: https://opentelemetry.io/docs/instrumentation/
[12]: /ko/logs/log_collection/?tab=host
[13]: /ko/logs/log_configuration/parsing/
[14]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/pkg/stanza/docs/operators
[15]: https://opentelemetry.io/docs/reference/specification/logs/data-model/
[16]: https://opentelemetry.io/docs/collector/deployment/#agent
[17]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml
[25]: https://opentelemetry.io/docs/specs/semconv/resource/#service
[26]: /ko/logs/log_configuration/pipelines/?tab=service#service-attribute
[27]: /ko/logs/log_configuration/processors/service_remapper/
[28]: /ko/opentelemetry/schema_semantics/hostname/
[29]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector
[30]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/ootb-ec2.yaml
[31]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/
[32]: /ko/opentelemetry/compatibility/
[33]: /ko/opentelemetry/collector_exporter/deployment