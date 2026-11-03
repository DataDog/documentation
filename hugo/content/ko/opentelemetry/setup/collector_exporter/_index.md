---
aliases:
- /ko/opentelemetry/setup/collector_exporter/oss_setup/
- /ko/opentelemetry/setup/collector_exporter/community_collector/
- /ko/opentelemetry/setup/collector_exporter/pure_otlp_collector/
- /ko/opentelemetry/setup/collector_exporter/install/
- /ko/opentelemetry/collector_exporter/
description: OpenTelemetry Collector와 OTLP를 사용하여 Datadog으로 OpenTelemetry 데이터 전송
further_reading:
- link: https://opentelemetry.io/docs/collector/
  tag: 외부 사이트
  text: Collector 설명서
- link: /opentelemetry/config/log_collection
  tag: 설명서
  text: 로그 수집 설정
- link: /opentelemetry/config/collector_batch_memory
  tag: 설명서
  text: 메모리 제한 구성
- link: /opentelemetry/config/otlp_receiver
  tag: 설명서
  text: OTLP 수신기 활성화
- link: /opentelemetry/setup/ddot_collector/install/
  tag: 설명서
  text: DDOT Collector 설치(권장)
- link: /opentelemetry/compatibility/
  tag: 설명서
  text: 기능 호환성
- link: https://www.datadoghq.com/architecture/opentelemetry-collector-in-kubernetes/
  tag: 아키텍처 센터
  text: Kubernetes의 OpenTelemetry Collector
site_support_id: opentelemetry_collector_otlp_export
title: OpenTelemetry Collector 설정
---
## 개요 {#overview}

OpenTelemetry Collector를 사용하여 Datadog으로 트레이스, 메트릭, 로그를 전송하세요. 이 페이지의 구성은 OpenTelemetry Collector Contrib 배포판 v0.154.0에서 테스트되었으며, 다음 주요 구성 요소를 포함하는 OTLP 기반 텔레메트리 파이프라인을 사용합니다.

- **OTLP HTTP 익스포터**: Datadog의 OTLP 수집 엔드포인트로 텔레메트리를 전송합니다.
- **스팬 메트릭 커넥터**: 트레이스 데이터에서 RED(Rate, Error, Duration) 메트릭을 생성하여 Service Catalog 및 Service Page와 같은 APM 기능을 지원합니다.
- **리소스 탐지 프로세서**: 호스트 및 클라우드 리소스 속성을 탐지하며, Datadog은 이러한 속성을 호스트 이름 확인 및 태깅에 사용합니다.
- **Datadog 확장 프로그램**: Fleet Automation을 위해 Collector의 구성을 Datadog에 보고합니다. 텔레메트리 데이터는 내보내지 않습니다.

직접 관리하는 Collector를 위한 권장 설정입니다. Datadog이 유지 관리하고 지원하는 Collector 배포판을 원하시면 대신 [Datadog Distribution of OTel Collector(DDOT)][12]를 사용하세요.

{{< img src="/opentelemetry/setup/oss-collector.png" alt="OpenTelemetry SDK는 OTLP 데이터를 OpenTelemetry Collector로 전송하고, Collector는 이를 OTLP HTTP를 통해 Datadog으로 내보냅니다." style="width:100%;" >}}

이 페이지의 구성은 [에이전트 배포 패턴][10]을 사용합니다. 각 호스트 또는 Kubernetes 노드에서 하나의 Collector가 실행되며 해당 호스트나 노드의 워크로드로부터 텔레메트리를 수신합니다. 게이트웨이 배포의 경우 OpenTelemetry [게이트웨이 배포 패턴][11]을 참조하세요. 다중 Collector 환경에서의 테일링 기반 샘플링과 같은 상태 저장 처리를 위해서는 트레이스의 모든 스팬을 동일한 Collector로 라우팅하는 게이트웨이 아키텍처가 필요합니다.

클러스터 전체의 Kubernetes 메트릭 및 Kubernetes Explorer에 대해서는 [Kubernetes 메트릭][13]을 참조하세요.

<div class="alert alert-info">이미 Datadog Exporter와 Datadog Connector를 사용 중이신가요? <a href="/opentelemetry/setup/collector_exporter/datadog_exporter/">Datadog Exporter 및 Connector 구성</a>을 참조하세요.</div>

## 전제 조건 {#prerequisites}

이 설정은 베어 메탈, VM, Docker 및 Kubernetes를 지원합니다. 지원되는 관리형 Kubernetes 배포에는 Amazon EKS(Auto Mode 포함), Google GKE(Standard 및 Autopilot), Azure AKS(Automatic 포함)가 포함됩니다.

이 설정은 ECS Fargate, EKS Fargate 또는 AWS Lambda와 같은 서버리스 또는 작업 기반 컨테이너 런타임을 지원하지 않습니다. 지원되는 Datadog 기능은 **OTel SDK + Upstream OpenTelemetry Collector** 아래의 [기능 호환성 표][7]를 참조하세요.

- [OpenTelemetry Collector Contrib][1] v0.154.0 이상
- [Datadog API 키][2]
- [Datadog 사이트][3](예: `datadoghq.com` 또는 `datadoghq.eu`)

## 설치 및 구성 {#install-and-configure}

### 1. OpenTelemetry Collector를 다운로드합니다.{#1-download-the-opentelemetry-collector}

[릴리스 페이지][100]에서 OpenTelemetry Collector Contrib 배포의 최신 릴리스를 다운로드합니다.

### 2. Collector를 구성하고 배포합니다. {#2-configure-and-deploy-the-collector}

사용 중인 환경에 맞는 탭을 선택합니다.

{{< tabs >}}
{{% tab "호스트" %}}

호스트(베어 메탈 또는 VM)에서 직접 실행되는 컨테이너화되지 않은 Collector의 경우, `collector.yaml`이라는 이름의 파일을 생성하고 이 구성을 사용합니다.

Collector를 시작하기 전에 `DD_API_KEY` 및 `DD_SITE` 환경 변수를 설정합니다.

```yaml
receivers:
  # Receive telemetry from OpenTelemetry-instrumented applications
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  # Collect host system metrics (CPU, memory, disk, network); populates the Infrastructure List
  host_metrics:
    collection_interval: 10s
    scrapers:
      cpu:
        metrics:
          system.cpu.utilization:
            enabled: true
          system.cpu.physical.count:
            enabled: true
          system.cpu.logical.count:
            enabled: true
          system.cpu.frequency:
            enabled: true
      memory:
        metrics:
          system.memory.limit:
            enabled: true
      paging:
        metrics:
          system.paging.utilization:
            enabled: true
          system.paging.usage:
            enabled: true
      disk: {}
      filesystem:
        metrics:
          system.filesystem.utilization:
            enabled: true
      load: {}
      network: {}
      processes: {}

processors:
  # Detect host and cloud resource attributes for hostname resolution and tagging
  resource_detection:
    detectors: [env, system]
    timeout: 2s
    override: true # Disable if incoming attributes (especially host.name) are verified correct
  # Convert cumulative metrics to delta temporality for Datadog
  cumulativetodelta: {}

connectors:
  # Separate trace processing from sampling so span metrics are computed on all traces
  forward/traces_sample: {}
  # Generate RED (Rate, Error, Duration) metrics from traces for APM
  span_metrics:
    aggregation_temporality: AGGREGATION_TEMPORALITY_DELTA
    add_resource_attributes: true
    histogram:
      exponential: {}
      unit: s
    dimensions:
      ## Unified Service Tagging
      - name: deployment.environment.name
      - name: service.version
      - name: http.response.status_code
      ## Container tags
      - name: container.id
      ## Host name inference
      - name: aws.ecs.launchtype
      - name: aws.ecs.task.arn
      - name: cloud.provider
      - name: cloud.account.id
      - name: host.id
      - name: host.name
      - name: k8s.node.name
      - name: k8s.cluster.name
      - name: azure.resourcegroup.name
      ## Peer service inference
      - name: aws.s3.bucket
      - name: db.namespace
      - name: messaging.destination.name
      - name: messaging.system
      - name: server.address
      ## Operation name inference
      - name: operation.name
      - name: http.request.method
      - name: http.method
      - name: db.system
      - name: messaging.operation
      - name: rpc.system
      - name: rpc.service
      - name: faas.invoked_provider
      - name: faas.invoked_name
      - name: faas.trigger
      - name: graphql.operation.type
      - name: network.protocol.name
      ## Resource name inference
      - name: resource.name
      - name: http.route
      - name: messaging.destination
      - name: rpc.method
      - name: graphql.operation.name
      - name: db.statement
      - name: db.query.text

exporters:
  # Send telemetry to Datadog's OTLP intake endpoints
  otlp_http:
    endpoint: https://otlp.${env:DD_SITE}
    headers:
      dd-api-key: ${env:DD_API_KEY}
      # Map resource attributes and instrumentation scope metadata to Datadog metric tags
      dd-otel-metric-config: >-
        {
        "resource_attributes_as_tags": true,
        "instrumentation_scope_metadata_as_tags": true
        }
    compression: zstd
    compression_params:
      level: 3 # Must be set explicitly for zstd; the default uses the lowest compression level
    sending_queue:
      batch:
        sizer: bytes
        min_size: 2097152 # Start flushing batches at 2MiB (2 * 1024 * 1024)
        max_size: 4194304 # Split large batches at 4MiB (4 * 1024 * 1024)

extensions:
  # Report Collector configuration to Datadog for Fleet Automation
  datadog:
    api:
      site: ${env:DD_SITE}
      key: ${env:DD_API_KEY}
    deployment_type: daemonset

service:
  extensions:
    - datadog
  pipelines:
    logs:
      receivers: [otlp]
      processors: [resource_detection]
      exporters: [otlp_http]
    metrics:
      receivers: [otlp, host_metrics]
      processors: [resource_detection, cumulativetodelta]
      exporters: [otlp_http]
    traces:
      receivers: [otlp]
      processors: [resource_detection]
      exporters: [forward/traces_sample, span_metrics]
    traces/sample:
      receivers: [forward/traces_sample]
      # Add sampling processors here (for example, tail_sampling) before exporting traces
      exporters: [otlp_http]
    metrics/span_metrics:
      receivers: [span_metrics]
      exporters: [otlp_http]
  telemetry:
    # Route Collector self-monitoring metrics through its own pipelines
    metrics:
      readers:
        - periodic:
            exporter:
              otlp:
                protocol: http/protobuf
                endpoint: http://localhost:4318
```

클라우드 관련 환경의 경우 적절한 리소스 탐지 탐지기를 추가합니다.
- **Amazon EC2**: `detectors: [ec2, env, system]`
- **Google Cloud**: `detectors: [gcp, env, system]`
- **Azure**: `detectors: [azure, env, system]`

시스템에 대한 추가 메타데이터를 수집하는 선택적 구성은 [전체 구성 파일][500]을 참조하세요.

[500]: https://github.com/DataDog/opentelemetry-examples/tree/be842bc1447337c32f2d6265612232932a6cdbfd/configurations/opentelemetry-collector

Collector를 실행합니다.

```shell
DD_SITE={{< region-param key="dd_site" >}} DD_API_KEY=<YOUR_API_KEY> \
  otelcol-contrib --config collector.yaml
```

{{% /tab %}}

{{% tab "Docker" %}}

컨테이너화된 Collector의 경우, `collector.yaml`이라는 이름의 파일을 생성하고 이 구성을 사용하세요. `host_metrics` 수신기는 `/hostfs`에 호스트 파일 시스템을 마운트해야 합니다.

Collector를 시작하기 전에 다음 환경 변수를 설정합니다.

- `DD_API_KEY` 및 `DD_SITE`
- `OTEL_RESOURCE_ATTRIBUTES`: Collector는 컨테이너 내부에서 호스트 정보를 탐지할 수 없으므로 여기에 호스트 정보를 제공합니다(예: `host.name=<YOUR_HOST_NAME>`).

```yaml
receivers:
  # Receive telemetry from OpenTelemetry-instrumented applications
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  # Collect host system metrics (CPU, memory, disk, network); populates the Infrastructure List
  # root_path maps to the host filesystem mounted at /hostfs
  host_metrics:
    root_path: /hostfs
    collection_interval: 10s
    scrapers:
      cpu:
        metrics:
          system.cpu.utilization:
            enabled: true
          system.cpu.physical.count:
            enabled: true
          system.cpu.logical.count:
            enabled: true
          system.cpu.frequency:
            enabled: true
      memory:
        metrics:
          system.memory.limit:
            enabled: true
      paging:
        metrics:
          system.paging.utilization:
            enabled: true
          system.paging.usage:
            enabled: true
      disk: {}
      filesystem:
        metrics:
          system.filesystem.utilization:
            enabled: true
      load: {}
      network: {}
      processes: {}

processors:
  # Detect host and cloud resource attributes for hostname resolution and tagging
  resource_detection:
    detectors: [env]
    timeout: 2s
    override: true # Disable if incoming attributes (especially host.name) are verified correct
  # Convert cumulative metrics to delta temporality for Datadog
  cumulativetodelta: {}

connectors:
  # Separate trace processing from sampling so span metrics are computed on all traces
  forward/traces_sample: {}
  # Generate RED (Rate, Error, Duration) metrics from traces for APM
  span_metrics:
    aggregation_temporality: AGGREGATION_TEMPORALITY_DELTA
    add_resource_attributes: true
    histogram:
      exponential: {}
      unit: s
    dimensions:
      ## Unified Service Tagging
      - name: deployment.environment.name
      - name: service.version
      - name: http.response.status_code
      ## Container tags
      - name: container.id
      ## Host name inference
      - name: aws.ecs.launchtype
      - name: aws.ecs.task.arn
      - name: cloud.provider
      - name: cloud.account.id
      - name: host.id
      - name: host.name
      - name: k8s.node.name
      - name: k8s.cluster.name
      - name: azure.resourcegroup.name
      ## Peer service inference
      - name: aws.s3.bucket
      - name: db.namespace
      - name: messaging.destination.name
      - name: messaging.system
      - name: server.address
      ## Operation name inference
      - name: operation.name
      - name: http.request.method
      - name: http.method
      - name: db.system
      - name: messaging.operation
      - name: rpc.system
      - name: rpc.service
      - name: faas.invoked_provider
      - name: faas.invoked_name
      - name: faas.trigger
      - name: graphql.operation.type
      - name: network.protocol.name
      ## Resource name inference
      - name: resource.name
      - name: http.route
      - name: messaging.destination
      - name: rpc.method
      - name: graphql.operation.name
      - name: db.statement
      - name: db.query.text

exporters:
  # Send telemetry to Datadog's OTLP intake endpoints
  otlp_http:
    endpoint: https://otlp.${env:DD_SITE}
    headers:
      dd-api-key: ${env:DD_API_KEY}
      # Map resource attributes and instrumentation scope metadata to Datadog metric tags
      dd-otel-metric-config: >-
        {
        "resource_attributes_as_tags": true,
        "instrumentation_scope_metadata_as_tags": true
        }
    compression: zstd
    compression_params:
      level: 3 # Must be set explicitly for zstd; the default uses the lowest compression level
    sending_queue:
      batch:
        sizer: bytes
        min_size: 2097152 # Start flushing batches at 2MiB (2 * 1024 * 1024)
        max_size: 4194304 # Split large batches at 4MiB (4 * 1024 * 1024)

extensions:
  # Report Collector configuration to Datadog for Fleet Automation
  datadog:
    api:
      site: ${env:DD_SITE}
      key: ${env:DD_API_KEY}
    deployment_type: daemonset

service:
  extensions:
    - datadog
  pipelines:
    logs:
      receivers: [otlp]
      processors: [resource_detection]
      exporters: [otlp_http]
    metrics:
      receivers: [otlp, host_metrics]
      processors: [resource_detection, cumulativetodelta]
      exporters: [otlp_http]
    traces:
      receivers: [otlp]
      processors: [resource_detection]
      exporters: [forward/traces_sample, span_metrics]
    traces/sample:
      receivers: [forward/traces_sample]
      # Add sampling processors here (for example, tail_sampling) before exporting traces
      exporters: [otlp_http]
    metrics/span_metrics:
      receivers: [span_metrics]
      exporters: [otlp_http]
  telemetry:
    # Route Collector self-monitoring metrics through its own pipelines
    metrics:
      readers:
        - periodic:
            exporter:
              otlp:
                protocol: http/protobuf
                endpoint: http://localhost:4318
```

Collector와 애플리케이션 컨테이너가 공유할 Docker 네트워크를 생성하거나 기존 네트워크를 사용하세요.

```shell
docker network create otel
```

Collector를 해당 네트워크에 연결하고 호스트 파일 시스템을 마운트한 상태로 실행하세요.

```shell
docker run \
    --name otelcol \
    --network otel \
    -p 4317:4317 \
    -p 4318:4318 \
    -e DD_API_KEY \
    -e DD_SITE \
    -e OTEL_RESOURCE_ATTRIBUTES \
    -v /:/hostfs:ro \
    -v $(pwd)/collector.yaml:/etc/otelcol-contrib/config.yaml \
    otel/opentelemetry-collector-contrib:0.154.0 \
    --config /etc/otelcol-contrib/config.yaml
```

{{% /tab %}}

{{% tab "Kubernetes" %}}

[공식 OpenTelemetry Collector Helm 차트][102]를 사용하여 Collector를 DaemonSet으로 Kubernetes에 배포하세요. 예시 값 파일은 차트 v0.147.1에서 테스트되었으며, Collector 버전을 v0.154.0으로 고정하고 필수 마운트, 환경 변수, RBAC 리소스 및 포트 노출을 설정합니다.

클러스터 메트릭을 수집하거나 Kubernetes 리소스 데이터를 Kubernetes Explorer로 보내려면 DaemonSet과 함께 클러스터 Collector를 배포하세요. [Kubernetes 메트릭][13]을 참조하세요.

1. Datadog API 키를 사용하여 Kubernetes 시크릿을 생성합니다.

   ```shell
   kubectl create secret generic datadog-secrets --from-literal=api-key='<YOUR_API_KEY>'
   ```

1. OpenTelemetry Helm 리포지토리를 추가합니다.

   ```shell
   helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
   ```

1. 환경에 맞는 예시 값 파일을 다운로드하여 `values.yaml`로 저장합니다. Datadog 사이트가 `datadoghq.com`이 아닌 경우 설치하기 전에 `values.yaml`에서 `DD_SITE` 값을 업데이트합니다.

   | 환경 | 값 파일 |
   |---|---|
   | Kubernetes(비클라우드) | [`daemonset.yaml`][103] |
   | Amazon EKS | [`daemonset-eks.yaml`][104] |
   | Amazon EKS Auto Mode | [`daemonset-eks-auto.yaml`][105] |
   | Google GKE | [`daemonset-gke.yaml`][106] |
   | Google GKE Autopilot | [`daemonset-gke-autopilot.yaml`][107] |
   | Azure AKS | [`daemonset-aks.yaml`][108] |
   | Azure AKS Automatic | [`daemonset-aks-automatic.yaml`][109] |

   Amazon EKS에서는 값 파일이 필요한 AWS 측 설정을 구성할 수 없습니다. Helm 외부에서 다음을 적용합니다.

   - **Amazon EKS**: `ec2` 및 `eks` 탐지기는 컨테이너 내부에서 IMDS 엔드포인트에 액세스해야 합니다. 노드 시작 템플릿 또는 계정 설정에서 IMDS 토큰 홉 제한을 2로 설정합니다.
   - **Amazon EKS Auto Mode**: `eks` 탐지기에는 Collector에 `EC2:DescribeInstances` 권한이 있는 IAM 역할을 할당하는 포드 ID 연결이 필요합니다.

1. Collector를 설치합니다.

   ```shell
   helm install otelcol open-telemetry/opentelemetry-collector --version 0.147.1 --values values.yaml
   ```

[102]: https://github.com/open-telemetry/opentelemetry-helm-charts/tree/opentelemetry-collector-0.147.1/charts/opentelemetry-collector
[103]: https://github.com/DataDog/opentelemetry-examples/blob/be842bc1447337c32f2d6265612232932a6cdbfd/configurations/opentelemetry-collector/helm-values/daemonset.yaml
[104]: https://github.com/DataDog/opentelemetry-examples/blob/be842bc1447337c32f2d6265612232932a6cdbfd/configurations/opentelemetry-collector/helm-values/daemonset-eks.yaml
[105]: https://github.com/DataDog/opentelemetry-examples/blob/be842bc1447337c32f2d6265612232932a6cdbfd/configurations/opentelemetry-collector/helm-values/daemonset-eks-auto.yaml
[106]: https://github.com/DataDog/opentelemetry-examples/blob/be842bc1447337c32f2d6265612232932a6cdbfd/configurations/opentelemetry-collector/helm-values/daemonset-gke.yaml
[107]: https://github.com/DataDog/opentelemetry-examples/blob/be842bc1447337c32f2d6265612232932a6cdbfd/configurations/opentelemetry-collector/helm-values/daemonset-gke-autopilot.yaml
[108]: https://github.com/DataDog/opentelemetry-examples/blob/be842bc1447337c32f2d6265612232932a6cdbfd/configurations/opentelemetry-collector/helm-values/daemonset-aks.yaml
[109]: https://github.com/DataDog/opentelemetry-examples/blob/be842bc1447337c32f2d6265612232932a6cdbfd/configurations/opentelemetry-collector/helm-values/daemonset-aks-automatic.yaml

{{% /tab %}}

{{% tab "Kubernetes 매니페스트 참조" %}}

이 탭은 자체 Kubernetes 매니페스트를 유지 관리하는 사용자를 위한 구성 참조입니다. 필수 포드 사양, 마운트, 환경 변수, RBAC 리소스 및 포트 노출을 포함하는 실행 가능한 설치의 경우 **Kubernetes** 탭을 사용하세요.

이 구성은 비클라우드 환경에서 Collector를 DaemonSet으로 실행합니다. 여기에는 Kubernetes 메타데이터로 텔레메트리를 보강하기 위한 `k8s_attributes` 프로세서와 노드, 포드, 컨테이너 및 볼륨 메트릭을 위한 `kubelet_stats` 수신기가 포함됩니다. 관리형 Kubernetes 배포에서는 구성 후 [관리형 Kubernetes 배포](#managed-kubernetes-distributions)에 설명된 변경 사항을 적용합니다.

명시된 경우 Kubernetes downward API를 사용하여 Collector 포드 사양에 다음 환경 변수를 설정합니다.

- `DD_API_KEY` 및 `DD_SITE`
- `K8S_NODE_NAME`: `kubelet_stats` 수신기가 사용하는 Kubernetes 노드의 이름입니다. 이 이름은 `spec.nodeName` 필드에서 설정합니다.
- `MY_POD_IP`: `health_check` 확장 프로그램이 사용하는 포드 IP입니다. 이 IP는 `status.podIP` 필드에서 설정합니다.
- `OTEL_RESOURCE_ATTRIBUTES`: Collector가 컨테이너 내부에서 호스트 이름을 확인할 수 없으므로 여기에 호스트 정보를 제공합니다(예: `k8s.node.name=$(K8S_NODE_NAME)`). `$(VAR)` 구문은 Kubernetes에서 확장하므로 셸이 아닌 포드 사양에서 설정합니다.

`host_metrics` 수신기가 호스트 메트릭을 수집할 수 있도록 `/hostfs`에 호스트 파일 시스템을 마운트합니다.

```yaml
receivers:
  # Receive telemetry from OpenTelemetry-instrumented applications
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  # Collect host system metrics (CPU, memory, disk, network); populates the Infrastructure List
  # root_path maps to the host filesystem mounted at /hostfs
  host_metrics:
    root_path: /hostfs
    collection_interval: 10s
    scrapers:
      cpu:
        metrics:
          system.cpu.utilization:
            enabled: true
          system.cpu.physical.count:
            enabled: true
          system.cpu.logical.count:
            enabled: true
          system.cpu.frequency:
            enabled: true
      memory:
        metrics:
          system.memory.limit:
            enabled: true
      paging:
        metrics:
          system.paging.utilization:
            enabled: true
          system.paging.usage:
            enabled: true
      disk: {}
      filesystem:
        metrics:
          system.filesystem.utilization:
            enabled: true
      load: {}
      network: {}
      processes: {}
  # Collect node, pod, container, and volume metrics from the kubelet
  kubelet_stats:
    collection_interval: 15s
    auth_type: "serviceAccount"
    endpoint: "${env:K8S_NODE_NAME}:10250"
    node: "${env:K8S_NODE_NAME}"
    insecure_skip_verify: true
    metric_groups:
      - node
      - pod
      - container
      - volume

processors:
  # Detect host and cloud resource attributes for hostname resolution and tagging
  resource_detection:
    detectors: [env, system]
    timeout: 2s
    override: true # Disable if incoming attributes (especially host.name) are verified correct
    system:
      resource_attributes:
        host.name:
          enabled: false # Containers report inaccurate host names
  # Convert cumulative metrics to delta temporality for Datadog
  cumulativetodelta: {}
  # Convert selected delta metrics to rates
  deltatorate:
    metrics:
      - k8s.pod.network.io
      - k8s.pod.network.errors
  # Enrich telemetry with Kubernetes pod and container metadata
  k8s_attributes:
    extract:
      otel_annotations: true
      metadata:
        - k8s.node.name
        - k8s.namespace.name
        - service.namespace
        - service.name
        - service.version
        - service.instance.id
        - k8s.deployment.name
        - k8s.replicaset.name
        - k8s.daemonset.name
        - k8s.statefulset.name
        - k8s.cronjob.name
        - k8s.job.name
        - k8s.pod.uid
        - k8s.pod.name
        - container.id
        - k8s.container.name
        - container.image.name
        - container.image.tag
    pod_association:
      - sources:
          - from: resource_attribute
            name: k8s.pod.uid
      - sources:
          - from: resource_attribute
            name: k8s.pod.ip
      - sources:
          - from: resource_attribute
            name: k8s.pod.name
          - from: resource_attribute
            name: k8s.namespace.name
      - sources:
          - from: connection

connectors:
  # Separate trace processing from sampling so span metrics are computed on all traces
  forward/traces_sample: {}
  # Generate RED (Rate, Error, Duration) metrics from traces for APM
  span_metrics:
    aggregation_temporality: AGGREGATION_TEMPORALITY_DELTA
    add_resource_attributes: true
    histogram:
      exponential: {}
      unit: s
    dimensions:
      ## Unified Service Tagging
      - name: deployment.environment.name
      - name: service.version
      - name: http.response.status_code
      ## Container tags
      - name: container.id
      ## Host name inference
      - name: aws.ecs.launchtype
      - name: aws.ecs.task.arn
      - name: cloud.provider
      - name: cloud.account.id
      - name: host.id
      - name: host.name
      - name: k8s.node.name
      - name: k8s.cluster.name
      - name: azure.resourcegroup.name
      ## Peer service inference
      - name: aws.s3.bucket
      - name: db.namespace
      - name: messaging.destination.name
      - name: messaging.system
      - name: server.address
      ## Operation name inference
      - name: operation.name
      - name: http.request.method
      - name: http.method
      - name: db.system
      - name: messaging.operation
      - name: rpc.system
      - name: rpc.service
      - name: faas.invoked_provider
      - name: faas.invoked_name
      - name: faas.trigger
      - name: graphql.operation.type
      - name: network.protocol.name
      ## Resource name inference
      - name: resource.name
      - name: http.route
      - name: messaging.destination
      - name: rpc.method
      - name: graphql.operation.name
      - name: db.statement
      - name: db.query.text

exporters:
  # Send telemetry to Datadog's OTLP intake endpoints
  otlp_http:
    endpoint: https://otlp.${env:DD_SITE}
    headers:
      dd-api-key: ${env:DD_API_KEY}
      # Map resource attributes and instrumentation scope metadata to Datadog metric tags
      dd-otel-metric-config: >-
        {
        "resource_attributes_as_tags": true,
        "instrumentation_scope_metadata_as_tags": true
        }
    compression: zstd
    compression_params:
      level: 3 # Must be set explicitly for zstd; the default uses the lowest compression level
    sending_queue:
      batch:
        sizer: bytes
        min_size: 2097152 # Start flushing batches at 2MiB (2 * 1024 * 1024)
        max_size: 4194304 # Split large batches at 4MiB (4 * 1024 * 1024)

extensions:
  # Required for Kubernetes liveness/readiness probes
  health_check:
    endpoint: ${env:MY_POD_IP}:13133
  # Report Collector configuration to Datadog for Fleet Automation
  datadog:
    api:
      site: ${env:DD_SITE}
      key: ${env:DD_API_KEY}
    deployment_type: daemonset

service:
  extensions:
    - health_check
    - datadog
  pipelines:
    logs:
      receivers: [otlp]
      processors: [k8s_attributes, resource_detection]
      exporters: [otlp_http]
    metrics:
      receivers: [otlp, host_metrics, kubelet_stats]
      processors: [k8s_attributes, resource_detection, cumulativetodelta, deltatorate]
      exporters: [otlp_http]
    traces:
      receivers: [otlp]
      processors: [k8s_attributes, resource_detection]
      exporters: [forward/traces_sample, span_metrics]
    traces/sample:
      receivers: [forward/traces_sample]
      # Add sampling processors here (for example, tail_sampling) before exporting traces
      exporters: [otlp_http]
    metrics/span_metrics:
      receivers: [span_metrics]
      exporters: [otlp_http]
  telemetry:
    # Route Collector self-monitoring metrics through its own pipelines
    metrics:
      readers:
        - periodic:
            exporter:
              otlp:
                protocol: http/protobuf
                endpoint: http://localhost:4318
```

이 구성에는 `pods`, `namespaces`, `nodes`, `nodes/stats` 및 `replicasets`에 대해 `get`, `list` 및 `watch` 권한을 부여하는 ClusterRole에 바인딩된 ServiceAccount가 필요합니다. `k8s_attributes` 프로세서는 포드 메타데이터를 읽고 `kubelet_stats` 수신기는 `nodes/stats`를 읽습니다. RBAC 설정 지침은 [Kubernetes Attributes Processor 설명서][101]를 참조하고 여기 나열된 규칙에 `nodes/stats`를 추가합니다.

#### 관리형 Kubernetes 배포{#managed-kubernetes-distributions}

관리형 Kubernetes 배포에서 이전 구성의 `resource_detection` 프로세서를 사용자 환경에 맞는 변형으로 교체하세요. 클라우드 탐지기가 호스트 정보를 제공하므로 `OTEL_RESOURCE_ATTRIBUTES`를 설정할 필요가 없습니다.

##### Amazon EKS {#amazon-eks}

```yaml
processors:
  resource_detection:
    detectors: [eks, ec2, env, system]
    timeout: 15s
    override: true
    eks:
      resource_attributes:
        k8s.cluster.name: { enabled: true }
    ec2:
      tags: ['^kubernetes\.io/cluster/.*$']
    system:
      resource_attributes:
        host.name:
          enabled: false
```

`ec2` 및 `eks` 탐지기는 컨테이너 내부에서 IMDS 엔드포인트에 액세스해야 합니다. 노드 시작 템플릿 또는 계정 설정에서 IMDS 토큰 홉 제한을 2로 설정합니다. IMDS 지연 시간을 허용할 수 있도록 `timeout`이 `15s`로 상향 조정됩니다.

##### Amazon EKS Auto Mode {#amazon-eks-auto-mode}

```yaml
processors:
  resource_detection:
    detectors: [eks, env, system]
    timeout: 15s
    override: true
    eks:
      resource_attributes:
        k8s.cluster.name: { enabled: true }
        host.id: { enabled: true } # Required for host name inference
        cloud.account.id: { enabled: true }
        cloud.availability_zone: { enabled: true }
        cloud.region: { enabled: true }
        host.image.id: { enabled: true }
        host.type: { enabled: true }
      node_from_env_var: K8S_NODE_NAME
    system:
      resource_attributes:
        host.name:
          enabled: false
```

`eks` 탐지기를 사용하려면 Collector에 `EC2:DescribeInstances` 권한이 있는 IAM 역할을 할당하는 포드 ID 연결이 필요합니다.

##### Google GKE {#google-gke}

```yaml
processors:
  resource_detection:
    detectors: [gcp, env, system]
    timeout: 2s
    override: true
    system:
      resource_attributes:
        host.name:
          enabled: false
```

이전 GKE 버전에서는 `gcp` 탐지기가 호스트 이름을 반환하지 않을 수 있습니다. 이런 경우, `OTEL_RESOURCE_ATTRIBUTES`에 노드 이름을 `host.name`으로 제공합니다.

##### Azure AKS {#azure-aks}

```yaml
processors:
  resource_detection:
    detectors: [aks, azure, env, system]
    timeout: 2s
    override: true
    aks:
      resource_attributes:
        k8s.cluster.name: { enabled: true }
    system:
      resource_attributes:
        host.name:
          enabled: false
```

##### GKE Autopilot 및 AKS Automatic {#gke-autopilot-and-aks-automatic}

이러한 모드에서는 `/hostfs` 마운트나 호스트 포트 사용이 허용되지 않습니다. GKE 또는 AKS `resource_detection` 프로세서를 사용한 후 다음과 같이 추가 변경을 수행합니다.

-  `host_metrics` 수신기를 `receivers` 블록과 `metrics` 파이프라인에서 제거합니다. 노드, 포드, 컨테이너 및 볼륨 메트릭은 여전히 `kubelet_stats` 수신기에서 가져옵니다.
- Collector에서 호스트 포트를 비활성화하고 대신 노드 로컬 서비스를 통해 노출하세요. GKE Autopilot 및 AKS Automatic Helm 값 파일은 이러한 변경 사항을 적용합니다. [애플리케이션 구성](#3-configure-your-application)에 표시된 호스트 IP 대신 해당 Service를 가리키도록 애플리케이션을 설정하세요.

각 환경에 대한 전체 구성 파일은 [`opentelemetry-examples` 리포지토리][501]를 참조하세요.

[101]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/k8sattributesprocessor#role-based-access-control
[501]: https://github.com/DataDog/opentelemetry-examples/tree/be842bc1447337c32f2d6265612232932a6cdbfd/configurations/opentelemetry-collector

{{% /tab %}}
{{< /tabs >}}

### 3. 애플리케이션을 구성합니다. {#3-configure-your-application}

데이터를 Collector로 전송하도록 OpenTelemetry 계측 애플리케이션을 구성합니다. Collector를 가리키도록 `OTEL_EXPORTER_OTLP_ENDPOINT` 환경 변수를 설정합니다.

{{< tabs >}}
{{% tab "호스트" %}}

```shell
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4318"
export OTEL_EXPORTER_OTLP_PROTOCOL="http/protobuf"
```
{{% /tab %}}

{{% tab "Docker" %}}
애플리케이션 컨테이너에 다음 환경 변수를 설정합니다.

```
OTEL_EXPORTER_OTLP_ENDPOINT=http://otelcol:4318
OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
```
여기서는 `docker run` 명령의 `--name otelcol` 값을 사용합니다. 동일한 네트워크(`--network otel`)에서 애플리케이션 컨테이너를 실행합니다. Docker Compose를 사용하는 경우 두 컨테이너가 자동으로 네트워크를 공유하므로 Collector의 서비스 이름을 사용할 수 있습니다.
{{% /tab %}}

{{% tab "Kubernetes" %}}
Helm 값이 호스트 포트를 활성화하는 Kubernetes 환경의 경우, 호스트 IP를 사용하여 엔드포인트를 구성하세요.

```yaml
env:
  - name: HOST_IP
    valueFrom:
      fieldRef:
        fieldPath: status.hostIP
  - name: OTEL_EXPORTER_OTLP_ENDPOINT
    value: "http://$(HOST_IP):4318"
  - name: OTEL_EXPORTER_OTLP_PROTOCOL
    value: "http/protobuf"
```

GKE Autopilot 및 AKS Automatic은 호스트 포트를 허용하지 않습니다. 대신 해당 예시 Helm 값은 노드 로컬 Service를 활성화합니다. `kubectl get services`로 Service 이름을 확인하고 해당 Kubernetes DNS 이름(예: `http://otelcol-opentelemetry-collector:4318`)을 사용하여 엔드포인트를 구성하세요.
{{% /tab %}}
{{< /tabs >}}

애플리케이션의 OpenTelemetry 구성에서 `service.name`, `deployment.environment.name`, `service.version` 리소스 속성을 설정합니다. Datadog은 이러한 속성을 [Unified Service Tagging][4]에 매핑하여 트레이스, 메트릭 및 로그를 상호 연결합니다.

## 설정 확인 {#verify-the-setup}

사용자의 애플리케이션이 Collector로 텔레메트리를 전송한 후 Datadog에 데이터가 나타나는지 확인합니다.

1. Datadog에서 {{< ui >}}APM{{< /ui >}} > {{< ui >}}Services{{< /ui >}}로 이동하여 `service.name`이 나타나는지 확인합니다.
2. {{< ui >}}APM{{< /ui >}} > {{< ui >}}Traces{{< /ui >}}를 열고 서비스를 검색합니다.
3. {{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Infrastructure List{{< /ui >}}로 이동하여 Collector를 실행 중인 호스트가 나타나는지 확인합니다. GKE Autopilot 및 AKS Automatic의 경우 예시 값 파일에서 `host_metrics` 수신기가 생략되어 호스트가 표시되지 않습니다.
4. OTLP를 통해 로그를 전송하는 경우 {{< ui >}}Logs Explorer{{< /ui >}}로 이동하여 서비스 이름을 검색합니다.
5. [Fleet Automation][9]에서 Collector와 해당 구성이 나타나는지 확인합니다.

## 주요 구성 요소 {#key-components}

### 스팬 메트릭 커넥터 {#span-metrics-connector}

`span_metrics` 커넥터는 트레이스 데이터에서 RED 메트릭을 생성합니다. 이러한 메트릭은 Service Catalog, Service Page 및 Resource Page를 포함한 APM 기능을 지원합니다. 이 커넥터는 Datadog이 트레이스에서 호스트 태그, 피어 서비스 및 작업 이름을 계산하도록 지원하는 차원으로 구성됩니다.

[Collector 구성 및 배포](#2-configure-and-deploy-the-collector)의 각 환경별 구성에는 전체 `span_metrics` 커넥터 블록이 포함되어 있습니다. Datadog이 필요한 호스트 태그, 피어 서비스, 작업 이름 및 리소스 이름을 파생할 수 있도록 구성을 조정할 때 모든 차원을 유지하세요.

[전체 구성 파일][5]은 또한 `- glob: container.**`와 같은 glob 패턴으로 컨테이너 태그 차원 그룹을 대체하는 방법을 보여줍니다.

### OTLP HTTP 익스포터 {#otlp-http-exporter}

`otlp_http` 익스포터는 텔레메트리 데이터를 Datadog의 OTLP 수집 엔드포인트로 전송합니다. 주요 구성 세부 정보:

- **엔드포인트**: `https://otlp.<YOUR_DD_SITE>`(트레이스, 로그 및 메트릭용).
- **압축**: `zstd`는 줄어든 대역폭 사용량에 권장됩니다. `zstd`를 사용할 때는 기본값이 가장 낮은 압축 수준을 사용하므로 `compression_params.level`을 명시적으로 설정합니다.
- **배치 처리**: `sending_queue.batch` 설정은 2 MiB에서 플러싱을 시작하고 4 MiB에서는 직렬화된 배치를 분할합니다. 413 응답을 받으면 이러한 크기를 줄이세요.

#### `dd-otel-metric-config` header {#dd-otel-metric-config-header}

`dd-otel-metric-config` 헤더는 Datadog이 OTLP 메트릭을 처리하는 방법을 구성하는 메트릭 요청과 함께 전송되는 JSON 페이로드입니다. `otlp_http` 익스포터의 `headers` 섹션에서 설정하세요.

| 필드 | 유형 | 기본값 | 설명 |
|---|---|---|---|
| `resource_attributes_as_tags` | 불리언 | `false` | OTLP 리소스 속성을 내보낸 메트릭의 Datadog 태그로 전파합니다. |
| `instrumentation_scope_metadata_as_tags` | 불리언 | `false` | OTLP 계측 범위 메타데이터(범위 이름 및 버전)를 내보낸 메트릭의 태그로 전파합니다. |
| `trace_metrics.namespace` | 문자열 | `traces.span.metrics` | 트레이스 파생 메트릭에 적용되는 네임스페이스 접두사입니다. |
| `trace_metrics.instrumentation_metrics_calc` | 불리언 | `false` |  `true`일 때, 지원되는 HTTP 계측 메트릭을 APM 트레이스 메트릭에 사용하도록 라우팅합니다. |
| `raw_instrumentation_metrics_drop` | 불리언 | `false` | `true`일 때 APM 트레이스 메트릭을 위해 라우팅한 후 일반 메트릭 수집에서 원시 HTTP 계측 메트릭을 삭제합니다. `trace_metrics.instrumentation_metrics_calc`가 `true`일 때만 적용됩니다. |

계측 메트릭이 활성화된 예시:

```json
{
  "trace_metrics": {
    "namespace": "myapp.traces",
    "instrumentation_metrics_calc": true
  },
  "raw_instrumentation_metrics_drop": false,
  "resource_attributes_as_tags": true,
  "instrumentation_scope_metadata_as_tags": false
}
```

<div class="alert alert-info">권장되는 OpenTelemetry Collector 구성에서는 <code>span_metrics</code> 커넥터를 사용하여 APM 보기를 구동하는 RED 메트릭을 생성합니다. 여기에서 <code>trace_metrics.instrumentation_metrics_calc</code> 및 <code>raw_instrumentation_metrics_drop</code> 필드는 대신 HTTP 계측 메트릭에서 APM 트레이스 메트릭을 파생하는 설정을 위한 대체 구성을 지원합니다. 이때 <code>instrumentation_metrics_calc</code> 을 <code>span_metrics</code> 커넥터와 함께 활성화하지 마세요. 두 소스 모두에서 트레이스 메트릭을 계산하기 때문입니다.</div>

### 트레이스 전달 커넥터 {#trace-forward-connector}

`forward/traces_sample` 커넥터는 트레이스 처리를 두 개의 파이프라인으로 분할합니다. 첫 번째 파이프라인은 모든 스팬을 `span_metrics` 커넥터로 보내고, 두 번째 파이프라인은 스팬을 Datadog으로 내보냅니다. 두 번째 파이프라인에 샘플링 프로세서를 추가하여 샘플링된 트레이스뿐만 아니라 모든 트레이스에서 트레이스 메트릭이 계산되도록 하세요.

### Datadog 확장 프로그램 {#datadog-extension}

`datadog` 확장 프로그램은 Fleet Automation을 위해 Collector의 구성을 Datadog에 보고합니다. 텔레메트리 데이터는 내보내지 않습니다. 모든 텔레메트리는 OTLP HTTP 익스포터를 통해 흐릅니다. 이 확장 프로그램은 [OpenTelemetry Collector Contrib][1] 프로젝트의 일부이며 API 키 유효성 검사 및 배포 유형 보고를 처리합니다.

### Cumulative-to-delta 프로세서 {#cumulative-to-delta-processor}

`cumulativetodelta` 프로세서는 누적 메트릭을 델타 시간성으로 변환하며, 이는 OpenTelemetry 메트릭에 대한 [Datadog 권장 구성][6]입니다.

### Kubelet 통계 수신기 {#kubelet-stats-receiver}

Kubernetes 배포에서 `kubelet_stats` 수신기는 각 노드의 kubelet에서 노드, 포드, 컨테이너 및 볼륨 메트릭을 수집합니다. `deltatorate` 프로세서는 생성하는 포드 네트워크 메트릭을 비율로 변환합니다.

### 자가 모니터링 텔레메트리 {#self-monitoring-telemetry}

이 구성은 Collector 자체 메트릭을 로컬 OTLP 수신기로 다시 보냅니다(`http://localhost:4318`). 이는 Collector의 내부 메트릭을 자체 파이프라인을 통해 라우팅하여 Datadog으로 내보내기 전에 리소스 속성으로 보강되도록 합니다.

##  OTLP 수집 제한 {#otlp-intake-limits}

Datadog은 OTLP 데이터를 수집할 때 다음 제한을 적용합니다. 제한을 초과하는 데이터는 명시된 대로 거부되거나 삭제됩니다.

**페이로드 크기**
: 각 수집 엔드포인트는 요청당 최대 페이로드 크기를 제한합니다. 제한을 초과하는 요청은 거부되며`HTTP 413 Request Entity Too Large` 응답이 표시됩니다. 413 오류가 발생하면 배치 크기를 줄이거나 더 자주 플러시하여 각 요청이 제한을 넘지 않도록 합니다. 각 엔드포인트의 페이로드 크기 제한은 [수집 제한][8]을 참조하세요.

**히스토그램 버킷 수**
:  각 히스토그램 데이터 포인트는 수집 시 유효성이 검사되며, 버킷당 최대 수(단일 버킷의 관측값 수)는 2,147,483,647(2<sup>31</sup> − 1)입니다. 어떤 버킷이든 이 값을 초과하면 전체 데이터 포인트가 삭제됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib
[2]: /ko/account_management/api-app-keys/
[3]: /ko/getting_started/site/
[4]: /ko/getting_started/tagging/unified_service_tagging/
[5]: https://github.com/DataDog/opentelemetry-examples/tree/be842bc1447337c32f2d6265612232932a6cdbfd/configurations/opentelemetry-collector
[6]: /ko/opentelemetry/guide/otlp_delta_temporality/
[7]: /ko/opentelemetry/compatibility/
[8]: /ko/opentelemetry/setup/otlp_ingest/#intake-limits
[9]: https://app.datadoghq.com/fleet
[10]: https://opentelemetry.io/docs/collector/deploy/agent/
[11]: https://opentelemetry.io/docs/collector/deploy/gateway/
[12]: /ko/opentelemetry/setup/ddot_collector/install/
[13]: /ko/opentelemetry/integrations/kubernetes_metrics/
[100]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest