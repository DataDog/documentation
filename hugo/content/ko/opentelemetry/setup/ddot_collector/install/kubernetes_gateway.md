---
code_lang: kubernetes_gateway
code_lang_weight: 2
further_reading:
- link: /opentelemetry/setup/ddot_collector/custom_components
  tag: 설명서
  text: Datadog Agent와 함께 사용자 지정 OpenTelemetry 구성 요소 사용하기
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: 블로그
  text: DDOT 게이트웨이를 통해 OpenTelemetry 파이프라인을 중앙에서 관리 및 제어
- link: https://www.datadoghq.com/blog/otel-gateway-topology-view/
  tag: 블로그
  text: Datadog Fleet Automation을 통해 OTel 게이트웨이 문제 해결
- link: https://opentelemetry.io/docs/collector/deployment/gateway/
  tag: OpenTelemetry
  text: 'Collector 배포: 게이트웨이'
- link: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/loadbalancingexporter
  tag: OpenTelemetry
  text: 로드 밸런싱 익스포터
- link: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/tailsamplingprocessor
  tag: OpenTelemetry
  text: 테일 샘플링 프로세서
title: Kubernetes에서 DDOT Collector를 게이트웨이 형태로 설치
type: multi-code-lang
---
<div class="alert alert-info">
이 가이드에서는 사용자가 DDOT Collector를 DaemonSet으로 배포하는 방법을 잘 알고 있다고 가정합니다. 자세한 내용은 <a href="/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset">Kubernetes에서 DDOT Collector를 DaemonSet으로 설치</a>를 참조하세요.
</div>

## 개요 {#overview}

OpenTelemetry Collector는 여러 방식으로 배포할 수 있습니다. *DaemonSet* 패턴은 핵심 Datadog Agent와 함께 모든 Kubernetes 노드에서 Collector 인스턴스를 실행하는 일반적인 배포 방식입니다.

{{< img src="opentelemetry/embedded_collector/ddot_daemonset.png" alt="OpenTelemetry Collector DaemonSet 패턴의 아키텍처 다이어그램입니다. Kubernetes 클러스터는 3개의 노드를 포함하고 있습니다. 각 노드에서 OpenTelemetry로 계측된 애플리케이션이 로컬 Agent DaemonSet으로 OTLP 데이터를 전송합니다. 그런 다음 Agent DaemonSet은 해당 데이터를 Datadog 백엔드로 직접 전달합니다." style="width:100%;" >}}

[게이트웨이][6] 패턴은 중앙 집중식 독립형 Collector 서비스를 사용하는 추가 배포 옵션을 제공합니다. 이 게이트웨이 계층에서는 데이터를 Datadog과 같은 하나 이상의 백엔드로 내보내기 전에 테일링 기반 샘플링, 집계, 필터링, 라우팅 등의 작업을 수행할 수 있습니다. 이는 관측 가능성 정책을 관리하고 강제 적용하기 위한 중앙 지점 역할을 합니다.

{{< img src="opentelemetry/embedded_collector/ddot_gateway_diagram.png" alt="OpenTelemetry Collector 게이트웨이 패턴의 아키텍처 다이어그램입니다. 애플리케이션은 각 노드에서 실행 중인 로컬 DDOT DaemonSet으로 OTLP 데이터를 전송합니다. DaemonSet은 해당 데이터를 중앙 로드 밸런서로 전달하고, 로드 밸런서는 별도의 DDOT 게이트웨이 포드 배포로 이를 분산합니다. 그런 다음 게이트웨이 포드는 텔레메트리 데이터를 Datadog으로 전송합니다." style="width:100%;" >}}

게이트웨이를 활성화하는 경우:
1.  Kubernetes 배포(`<RELEASE_NAME>-datadog-otel-agent-gateway-deployment`)는 독립형 **게이트웨이 Collector 포드를 관리합니다.**
2.  Kubernetes 서비스(`<RELEASE_NAME>-datadog-otel-agent-gateway`)는 게이트웨이 포드를 노출하고 로드 밸런싱을 제공합니다.
3.  기존 **DaemonSet Collector 포드**는 기본적으로 텔레메트리 데이터를 Datadog으로 직접 보내는 대신 게이트웨이 서비스로 보내도록 구성됩니다.

게이트웨이 배포에서는 텔레메트리가 게이트웨이에 도달하기 전에 호스트 정보를 첨부하세요. 권장되는 호스트 이름 구성은 [호스트 이름 및 태깅][12]을 참조하세요.

## 요구 사항 {#requirements}

시작하기 전에 다음 사항을 준비합니다.

* **Datadog 계정**:
    * [Datadog 계정][1]
    * Datadog[API 키][2]
* **소프트웨어**:
    * Kubernetes 클러스터(v1.29 이상) EKS Fargate 및 GKE Autopilot은 지원되지 않습니다.
    * [Helm][3] (v3 이상).
    * Datadog Helm 차트 버전 3.160.1 이상 또는 Datadog Operator 버전 1.23.0 이상
    * [kubectl][4].
* **네트워크**:
  {{% otel-network-requirements %}}

## 설치 및 구성 {#installation-and-configuration}

이 가이드에서는 Datadog Operator 또는 Helm 차트를 사용하여 DDOT Collector 게이트웨이를 구성하는 방법을 설명합니다.

<div class="alert alert-info">이 설치는 Datadog SDK + DDOT 및 OpenTelemetry SDK + DDOT 구성 모두에 필요합니다. Datadog SDK는 OpenTelemetry API를 구현하지만, OTLP 메트릭 및 로그를 처리하고 전달하기 위해서는 여전히 DDOT Collector가 필요합니다.</div>

다음 설치 방법 중 하나를 선택합니다.

- **Datadog Operator**: Kubernetes 네이티브 방식으로 Datadog 설정을 자동으로 조정하고 유지 관리합니다. 사용자 지정 리소스 상태에 배포 상태, 상태 정보 및 오류를 보고하며, 상위 수준 구성 옵션을 통해 구성 오류의 위험을 줄입니다.
- **Helm 차트**: Datadog Agent를 배포하는 간단한 방법입니다. 버전 관리, 롤백 및 템플릿 기능을 제공하므로 일관되고 더 쉽게 재현 가능한 배포가 가능합니다.

### Datadog Operator 또는 Helm 설치 {#install-the-datadog-operator-or-helm}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator를 설치하지 않았다면, Datadog Operator Helm 차트를 사용하여 클러스터에 설치할 수 있습니다.

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
helm install datadog-operator datadog/datadog-operator
```

자세한 내용은 [Datadog Operator 설명서][1]를 참조하세요.

[1]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/

{{% /tab %}}
{{% tab "Helm" %}}

Datadog Helm 리포지토리를 추가하지 않았다면, 지금 추가하세요.

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

Helm 구성 옵션에 대한 자세한 내용은 [Datadog Helm 차트 README][1]를 참조하세요.

[1]: http://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md

{{% /tab %}}
{{< /tabs >}}

### DaemonSet를 통해 게이트웨이 배포 {#deploying-the-gateway-with-a-daemonset}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

시작하려면 `DatadogAgent` 리소스에서 게이트웨이 및 DaemonSet Collector를 모두 활성화합니다. 이는 가장 일반적인 설정입니다.

`datadog-agent.yaml`라는 파일을 생성합니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    # Enable the Collector in the Agent DaemonSet
    otelCollector:
      enabled: true

    # Enable the standalone Gateway Deployment
    otelAgentGateway:
      enabled: true

  override:
    otelAgentGateway:
      # Number of replicas
      replicas: 3
      # Control placement of gateway pods
      nodeSelector:
        gateway: "true"
```

구성을 적용합니다.

```shell
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

시작하려면 `values.yaml` 파일에서 게이트웨이 및 DaemonSet Collector를 모두 활성화합니다. 이는 가장 일반적인 설정입니다.

```yaml
# values.yaml
targetSystem: "linux"
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  # Enable the Collector in the Agent Daemonset
  otelCollector:
    enabled: true

# Enable the standalone Gateway Deployment
otelAgentGateway:
  enabled: true
  replicas: 3
  nodeSelector:
    # Example selector to place gateway pods on specific nodes
    gateway: "true"
```

{{% /tab %}}
{{< /tabs >}}

이 경우, DaemonSet Collector는 OTLP 데이터를 게이트웨이의 Kubernetes 서비스로 전송하는 기본 구성을 사용합니다.

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
exporters:
  debug:
    verbosity: detailed
  otlphttp:
    endpoint: http://<release>-datadog-otel-agent-gateway:4318
    tls:
      insecure: true
    sending_queue:
      batch:
        flush_timeout: 10s
processors:
  infraattributes:
    cardinality: 2
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
      exporters: [otlphttp, datadog/connector]
    metrics:
      receivers: [otlp, datadog/connector]
      processors: [infraattributes]
      exporters: [otlphttp]
    logs:
      receivers: [otlp]
      processors: [infraattributes]
      exporters: [otlphttp]
```

게이트웨이 Collector는 서비스 포트에서 수신 대기하고, Datadog으로 데이터를 전송하는 기본 구성을 사용합니다.

```yaml
receivers:
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
      key: ${env:DD_API_KEY}
    sending_queue:
      batch:
        flush_timeout: 10s
processors:
extension:
  datadog:
    api:
      key: ${env:DD_API_KEY}
    deployment_type: gateway
service:
  pipelines:
    traces:
      receivers: [otlp]
      exporters: [datadog]
    metrics:
      receivers: [otlp]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      exporters: [datadog]
```

<div class="alert alert-tip">
<strong>Helm 사용자:</strong> 구성 <code>otelAgentGateway.affinity</code> 또는 <code>otelAgentGateway.nodeSelector</code> 포드 배치를 제어하고, <code>otelAgentGateway.replicas</code> 게이트웨이 크기를 조정합니다.<br>
<strong>Operator 사용자:</strong> <code>override.otelAgentGateway.affinity</code>, <code>override.otelAgentGateway.nodeSelector</code>및 <code>override.otelAgentGateway.replicas</code> 해당 설정에서 사용합니다.</div>

### 독립형 게이트웨이 배포 {#deploying-a-standalone-gateway}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

기존에 배포한 DaemonSet이 있는 경우, 다른 구성 요소를 비활성화하여 게이트웨이를 독립적으로 배포할 수 있습니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog-gateway
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelAgentGateway:
      enabled: true

  override:
    otelAgentGateway:
      # Number of replicas
      replicas: 3
      # Control placement of gateway pods
      nodeSelector:
        gateway: "true"

    # Disable the Agent DaemonSet
    nodeAgent:
      disabled: true
    # Disable the Cluster Agent
    clusterAgent:
      disabled: true
```

게이트웨이 배포 후, 기존 DaemonSet Collector의 구성을 업데이트하여 데이터를 새 게이트웨이 서비스 엔드포인트(예: `http://datadog-gateway-otel-agent-gateway:4318`)로 전송해야 합니다.

{{% /tab %}}
{{% tab "Helm" %}}

기존에 배포한 DaemonSet이 있는 경우, 게이트웨이를 독립적으로 배포할 수 있습니다.

```yaml
# values.yaml
targetSystem: "linux"
fullnameOverride: "gw-only"
agents:
  enabled: false
clusterAgent:
  enabled: false
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
otelAgentGateway:
  enabled: true
  replicas: 3
  nodeSelector:
    gateway: "true"
```

게이트웨이 배포 후, 기존 DaemonSet Collector의 구성을 업데이트하여 데이터를 새 게이트웨이 서비스 엔드포인트(예: `http://gw-only-otel-agent-gateway:4318`)로 전송해야 합니다.

{{% /tab %}}
{{< /tabs >}}

### Collector 구성 사용자 지정 {#customizing-collector-configurations}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

ConfigMap을 사용하여 게이트웨이 Collector 구성을 사용자 지정할 수 있습니다. 사용자 지정 구성을 통해 ConfigMap을 생성합니다.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: otel-gateway-config
data:
  otel-gateway-config.yaml: |
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: "0.0.0.0:4317"
          http:
            endpoint: "0.0.0.0:4318"
    exporters:
      datadog:
        api:
          key: ${env:DD_API_KEY}
      sending_queue:
        batch:
          flush_timeout: 10s
    service:
      pipelines:
        traces:
          receivers: [otlp]
          exporters: [datadog]
        metrics:
          receivers: [otlp]
          exporters: [datadog]
        logs:
          receivers: [otlp]
          exporters: [datadog]
```

그런 다음 `DatadogAgent` 리소스에서 참조하세요.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelAgentGateway:
      enabled: true
      # Reference the custom ConfigMap
      config:
        configMap:
          name: otel-gateway-config

  override:
    otelAgentGateway:
      replicas: 3
```

다중 항목 ConfigMap 또는 인라인 구성에 대해서는 [DatadogAgent 예시][1]를 참조하세요.

[1]: https://github.com/DataDog/datadog-operator/tree/main/examples/datadogagent

{{% /tab %}}
{{% tab "Helm" %}}

`datadog.otelCollector.config` 및 `otelAgentGateway.config` 값을 사용하여 각각 DaemonSet 및 게이트웨이 Collector의 기본 구성을 재정의할 수 있습니다.

```yaml
# values.yaml
targetSystem: "linux"
fullnameOverride: "my-gw"
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  # Enable and configure the DaemonSet Collector
  otelCollector:
    enabled: true
    config: |
      receivers:
        otlp:
          protocols:
            grpc:
              endpoint: "localhost:4317"
      exporters:
        otlp:
          endpoint: http://my-gw-otel-agent-gateway:4317
          tls:
            insecure: true
      service:
        pipelines:
          traces:
            receivers: [otlp]
            exporters: [otlp]
          metrics:
            receivers: [otlp]
            exporters: [otlp]
          logs:
            receivers: [otlp]
            exporters: [otlp]

# Enable and configure the gateway Collector
otelAgentGateway:
  enabled: true
  replicas: 3
  nodeSelector:
    gateway: "true"
  ports:
    - containerPort: 4317
      name: "otel-grpc"
  config: |
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: "0.0.0.0:4317"
    exporters:
      datadog:
        api:
          key: ${env:DD_API_KEY}
        sending_queue:
          batch:
            flush_timeout: 10s
    service:
      pipelines:
        traces:
          receivers: [otlp]
          exporters: [datadog]
        metrics:
          receivers: [otlp]
          exporters: [datadog]
        logs:
          receivers: [otlp]
          exporters: [datadog]
```

{{% otel-infraattributes-prereq %}}

<div class="alert alert-info">
를 설정하는 경우 <code>fullnameOverride</code>게이트웨이의 Kubernetes 서비스 이름은 다음과 같이 변경됩니다. <code><fullnameOverride>-otel-agent-gateway</code>에 정의된 포트가 <code>otelAgentGateway.ports</code> 이 서비스에서 노출됩니다. 해당 포트가 게이트웨이의 OTLP 수신기 구성 및 DaemonSet의 OTLP 익스포터 구성과 일치하는지 확인하세요.
</div>

{{% /tab %}}
{{< /tabs >}}

예시 구성에서는 간소화를 위해 보안되지 않은 TLS를 사용합니다. TLS를 활성화하려면 [OTel configtls 지침][7]을 따르세요.

### 고급 구성 옵션 {#advanced-configuration-options}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator는 `override.otelAgentGateway` 아래에 OTel Agent 게이트웨이의 추가 구성 옵션을 제공합니다(**NOT** `features.otelAgentGateway` `featureGates` 제외).

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelAgentGateway:
      enabled: true

      # Feature gates for OTel collector (feature-specific configuration)
      featureGates: "telemetry.UseLocalHostAsDefaultMetricsAddress"

  override:
    otelAgentGateway:
      # Number of replicas
      replicas: 3

      # Node selector for pod placement
      nodeSelector:
        kubernetes.io/os: linux
        gateway: "true"

      # Affinity configuration
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 100
            podAffinityTerm:
              labelSelector:
                matchExpressions:
                - key: app
                  operator: In
                  values:
                  - datadog-otel-agent-gateway
              topologyKey: kubernetes.io/hostname

      # Tolerations for tainted nodes
      tolerations:
      - key: "dedicated"
        operator: "Equal"
        value: "otel-gateway"
        effect: "NoSchedule"

      # Priority class for scheduling
      priorityClassName: high-priority

      # Environment variables
      env:
      - name: OTEL_LOG_LEVEL
        value: "info"

      # Environment variables from ConfigMaps or Secrets
      envFrom:
      - configMapRef:
          name: otel-gateway-config

      # Custom image (optional)
      image:
        name: ddot-collector
        tag: "{{< version key="ddot_gateway_version" >}}"
        pullPolicy: IfNotPresent

      # Pod-level security context
      securityContext:
        runAsUser: 1000
        runAsGroup: 1000
        fsGroup: 1000

      # Configure resources
      containers:
        otel-agent:
          resources:
            requests:
              cpu: 200m
              memory: 512Mi
            limits:
              cpu: 500m
              memory: 1Gi

      # Additional labels and annotations
      labels:
        team: observability
      annotations:
        prometheus.io/scrape: "true"
```

사용 가능한 모든 옵션에 대한 전체 내용은 [DatadogAgent v2alpha1 구성 설명서][1]를 참조하세요.

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md

{{% /tab %}}
{{% tab "Helm" %}}

Helm 기반 배포의 경우, 이러한 고급 구성 옵션 다수를 `values.yaml` 파일의 `otelAgentGateway` 섹션에서 직접 설정할 수 있습니다. 전체 내용은 [Datadog Helm 차트 README][1]를 참조하세요.

[1]: http://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md

{{% /tab %}}
{{< /tabs >}}

## 고급 사용 사례 {#advanced-use-cases}

### 로드 밸런싱 익스포터를 사용한 테일링 샘플링 {#tail-sampling-with-the-load-balancing-exporter}

게이트웨이의 주요 사용 사례는 테일링 기반 샘플링입니다. 특정 트레이스에 대한 모든 스팬을 동일한 게이트웨이 포드에서 처리하려면, DaemonSet Collector에서 **로드 밸런싱 익스포터**를 사용합니다. 이 익스포터는 `traceID`과 같은 키를 기반으로 스팬을 일관성 있게 라우팅합니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

DaemonSet Collector는 `loadbalancing` 익스포터를 통해 구성되며, 이는 Kubernetes 서비스 리졸버를 사용하여 게이트웨이 포드를 검색하고 데이터를 해당 포드로 라우팅합니다. 게이트웨이 Collector는 `tail_sampling` 프로세서를 사용하여 Datadog으로 내보내기 전에 정의된 정책을 바탕으로 트레이스를 샘플링합니다.

**참고**: 로드 밸런싱 익스포터의 k8s 리졸버에는 RBAC 권한이 필요합니다.

로드 밸런싱 익스포터를 사용하는 DaemonSet Collector 구성에 필요한 ConfigMap을 생성합니다.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: otel-daemonset-config
data:
  otel-config.yaml: |
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: "localhost:4317"
    exporters:
      loadbalancing:
        routing_key: "traceID"
        protocol:
          otlp:
            tls:
              insecure: true
        resolver:
          k8s:
            service: datadog-otel-agent-gateway
            ports:
              - 4317
    service:
      pipelines:
        traces:
          receivers: [otlp]
          exporters: [loadbalancing]
```

테일 샘플링을 통한 게이트웨이 Collector 구성에 필요한 ConfigMap을 생성합니다.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: otel-gateway-tailsampling-config
data:
  otel-gateway-config.yaml: |
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: "0.0.0.0:4317"
    processors:
      tail_sampling:
        decision_wait: 10s
        policies:
          # Add your sampling policies here
          - name: sample-errors
            type: status_code
            status_code:
              status_codes: [ERROR]
          - name: sample-slow-traces
            type: latency
            latency:
              threshold_ms: 1000
    connectors:
      datadog/connector:
    exporters:
      datadog:
        api:
          key: ${env:DD_API_KEY}
    service:
      pipelines:
        traces/sample:
          receivers: [otlp]
          processors: [tail_sampling]
          exporters: [datadog]
        traces:
          receivers: [otlp]
          exporters: [datadog/connector]
        metrics:
          receivers: [datadog/connector]
          exporters: [datadog]
```

DatadogAgent 구성 적용하기:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelCollector:
      enabled: true
      # Reference the custom DaemonSet config
      config:
        configMap:
          name: otel-daemonset-config
      # RBAC permissions for the k8s resolver
      rbac:
        create: true

    otelAgentGateway:
      enabled: true
      # Reference the custom gateway config
      config:
        configMap:
          name: otel-gateway-tailsampling-config

  override:
    otelAgentGateway:
      replicas: 3
```

엔드포인트에 액세스하기 위한 DaemonSet용 ClusterRole을 생성합니다.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: otel-collector-k8s-resolver
rules:
- apiGroups: [""]
  resources: ["endpoints"] # for v0.139.0 and before
  verbs: ["get", "watch", "list"]
- apiGroups: ["discovery.k8s.io"]
  resources: ["endpointslices"] # for v0.140.0 and after
  verbs: ["get", "watch", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: otel-collector-k8s-resolver
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: otel-collector-k8s-resolver
subjects:
- kind: ServiceAccount
  name: datadog-agent
  namespace: default
```

<div class="alert alert-warning">
샘플링 이전에 모든 트레이스를 대상으로 APM 통계를 100% 계산하려면, <code>datadog/connector</code> 는 프로세서 없이 <code>tail_sampling</code> 별도의 파이프라인에서 실행됩니다. Connector는 DaemonSet 또는 게이트웨이 계층에서 실행할 수 있습니다.
</div>

{{% /tab %}}
{{% tab "Helm" %}}

아래 구성에서:

1.  DaemonSet Collector(`datadog.otelCollector`)는 `loadbalancing` 익스포터를 통해 구성되며, 이는 Kubernetes 서비스 리졸버를 사용하여 게이트웨이 포드를 검색하고 데이터를 해당 포드로 라우팅합니다.
2.  게이트웨이 Collector(`otelAgentGateway`)는 `tail_sampling` 프로세서를 사용하여 Datadog으로 내보내기 전에 정의된 정책을 바탕으로 트레이스를 샘플링합니다.

```yaml
# values.yaml
targetSystem: "linux"
fullnameOverride: "my-gw"
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  otelCollector:
    enabled: true
    # RBAC permissions are required for the k8s resolver in the loadbalancing exporter
    rbac:
      create: true
      rules:
        - apiGroups: [""]
          resources: ["endpoints"] # for v0.139.0 and before
          verbs: ["get", "watch", "list"]
        - apiGroups: ["discovery.k8s.io"]
          resources: ["endpointslices"] # for v0.140.0 and after
          verbs: ["get", "watch", "list"]
    config: |
      receivers:
        otlp:
          protocols:
            grpc:
              endpoint: "localhost:4317"
      exporters:
        loadbalancing:
          routing_key: "traceID"
          protocol:
            otlp:
              tls:
                insecure: true
          resolver:
            k8s:
              service: my-gw-otel-agent-gateway
              ports:
                - 4317
      service:
        pipelines:
          traces:
            receivers: [otlp]
            exporters: [loadbalancing]

otelAgentGateway:
  enabled: true
  replicas: 3
  ports:
    - containerPort: 4317
      name: "otel-grpc"
  config: |
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: "0.0.0.0:4317"
    processors:
      tail_sampling:
        decision_wait: 10s
        policies: <Add your sampling policies here>
    connectors:
      datadog/connector:
    exporters:
      datadog:
        api:
          key: ${env:DD_API_KEY}
    service:
      pipelines:
        traces/sample:
          receivers: [otlp]
          processors: [tail_sampling]
          exporters: [datadog]
        traces:
          receivers: [otlp]
          exporters: [datadog/connector]
        metrics:
          receivers: [datadog/connector]
          exporters: [datadog]
```

<div class="alert alert-warning">
샘플링 이전에 모든 트레이스를 대상으로 APM 통계를 100% 계산하려면, <code>datadog/connector</code> 는 프로세서 없이 <code>tail_sampling</code> 별도의 파이프라인에서 실행됩니다. Connector는 DaemonSet 또는 게이트웨이 계층에서 실행할 수 있습니다.
</div>

{{% /tab %}}
{{< /tabs >}}

### 사용자 지정 Collector 이미지 사용 {#using-a-custom-collector-image}

게이트웨이에서 사용자 지정 수집기 이미지를 사용하려면 이미지 리포지토리와 태그를 지정합니다. 사용자 지정 이미지 빌드 방법에 대한 지침은 [사용자 지정 OpenTelemetry 구성 요소 사용][5]을 참조하세요.

<div class="alert alert-info">
<strong>참고: </strong>Datadog Operator는 다음과 같은 이미지 이름 형식을 지원합니다.
<ul>
  <li><code>name</code> - 이미지 이름(예: <code>ddot-collector</code>)</li>
  <li><code>name:tag</code> - 태그가 지정된 이미지 이름(예: <code>ddot-collector:{{% version key="ddot_gateway_version" %}}</code>)</li>
  <li><code>registry/name:tag</code> - 전체 이미지 참조(예: <code>gcr.io/datadoghq/ddot-collector:{{% version key="ddot_gateway_version" %}}</code>)</li>
</ul>
이 <code>registry/name</code> 형식(이름 필드에 태그가 없는 경우)은 별도의 필드 사용 시 <strong>지원되지 않습니다</strong> <code>tag</code> . 태그가 지정된 전체 이미지 참조를 필드에 포함하거나, <code>name</code> 별도의 필드를 사용하는 이미지 이름을 <code>tag</code> 사용합니다.
</div>

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelAgentGateway:
      enabled: true

  override:
    otelAgentGateway:
      image:
        name: <YOUR REPO>:<IMAGE TAG>
```

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
# values.yaml
targetSystem: "linux"
agents:
  enabled: false
clusterAgent:
  enabled: false
otelAgentGateway:
  enabled: true
  image:
    repository: <YOUR REPO>
    tag: <IMAGE TAG>
    doNotCheckTag: true
  ports:
    - containerPort: "4317"
      name: "otel-grpc"
  config: | <YOUR CONFIG>
```

{{% /tab %}}
{{< /tabs >}}

### Horizontal Pod Autoscaler(HPA)를 통한 자동 확장 활성화 {#enable-autoscaling-with-horizontal-pod-autoscaler-hpa}

DDOT Collector 게이트웨이는 Kubernetes Horizontal Pod Autoscaler(HPA) 기능을 통한 자동 확장을 지원합니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

**참고**: Datadog Operator는 HPA 리소스를 직접 관리하지 않습니다. HPA 리소스를 별도로 생성하고, OTel Agent Gateway 배포를 대상으로 지정하도록 구성해야 합니다.

HPA 리소스를 생성합니다.

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: datadog-otel-agent-gateway-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: datadog-otel-agent-gateway
  minReplicas: 2
  maxReplicas: 10
  metrics:
  # Aim for high CPU utilization for higher throughput
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 80
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 30
    scaleDown:
      stabilizationWindowSeconds: 60
```

리소스 요청/제한(HPA에 필요)을 통해 DatadogAgent 구성을 적용합니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelAgentGateway:
      enabled: true

  override:
    otelAgentGateway:
      replicas: 4  # Initial replicas, HPA will override based on metrics
      containers:
        otel-agent:
          resources:
            requests:
              cpu: 200m
              memory: 512Mi
            limits:
              cpu: 500m
              memory: 1Gi
```

{{% /tab %}}
{{% tab "Helm" %}}

HPA를 활성화하려면 `otelAgentGateway.autoscaling`을 구성합니다.

```yaml
# values.yaml
targetSystem: "linux"
agents:
  enabled: false
clusterAgent:
  enabled: false
otelAgentGateway:
  enabled: true
  ports:
    - containerPort: "4317"
      name: "otel-grpc"
  config: | <YOUR CONFIG>
  replicas: 4  # 4 replicas to begin with and HPA may override it based on the metrics
  autoscaling:
    enabled: true
    minReplicas: 2
    maxReplicas: 10
    metrics:
      # Aim for high CPU utilization for higher throughput
      - type: Resource
        resource:
          name: cpu
          target:
            type: Utilization
            averageUtilization: 80
    behavior:
      scaleUp:
        stabilizationWindowSeconds: 30
      scaleDown:
        stabilizationWindowSeconds: 60
```

{{% /tab %}}
{{< /tabs >}}

리소스 메트릭(CPU 또는 메모리), 사용자 지정 메트릭(Kubernetes Pod 또는 Object)이나 외부 메트릭을 자동 확장 입력으로 활용할 수 있습니다. 리소스 메트릭의 경우 [Kubernetes 메트릭 서버][9]가 클러스터에서 실행 중인지 확인하세요. 사용자 지정/외부 메트릭의 경우 [Datadog Cluster Agent 메트릭 공급자][10] 구성을 고려합니다.

### 다중 계층 게이트웨이 배포{#deploying-a-multi-layer-gateway}

고급 시나리오의 경우, 여러 게이트웨이 계층을 배포해 처리 체인을 생성할 수 있습니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

최종 계층부터 역순으로 각 계층을 별도의 `DatadogAgent` 리소스로 배포합니다.

1.  **계층 1 배포(최종 계층):** 이 계층은 계층 2로부터 수신해 Datadog으로 내보냅니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog-gw-layer-1
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelAgentGateway:
      enabled: true
      config:
        configMap:
          name: gw-layer-1-config

  override:
    otelAgentGateway:
      replicas: 3
      nodeSelector:
        gateway: "gw-node-1"

    nodeAgent:
      disabled: true
    clusterAgent:
      disabled: true
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: gw-layer-1-config
data:
  otel-gateway-config.yaml: |
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: "0.0.0.0:4317"
    exporters:
      datadog:
        api:
          key: ${env:DD_API_KEY}
    service:
      pipelines:
        traces:
          receivers: [otlp]
          exporters: [datadog]
        metrics:
          receivers: [otlp]
          exporters: [datadog]
        logs:
          receivers: [otlp]
          exporters: [datadog]
```

2.  **계층 2 배포(중간 계층):** 이 계층은 DaemonSet으로부터 수신해 계층 1로 내보냅니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog-gw-layer-2
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelAgentGateway:
      enabled: true
      config:
        configMap:
          name: gw-layer-2-config

  override:
    otelAgentGateway:
      replicas: 3
      nodeSelector:
        gateway: "gw-node-2"

    nodeAgent:
      disabled: true
    clusterAgent:
      disabled: true
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: gw-layer-2-config
data:
  otel-gateway-config.yaml: |
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: "0.0.0.0:4317"
    exporters:
      otlp:
        endpoint: http://datadog-gw-layer-1-otel-agent-gateway:4317
        tls:
          insecure: true
    service:
      pipelines:
        traces:
          receivers: [otlp]
          exporters: [otlp]
        metrics:
          receivers: [otlp]
          exporters: [otlp]
        logs:
          receivers: [otlp]
          exporters: [otlp]
```

3.  **DaemonSet 배포:** 계층 2로 내보내도록 DaemonSet을 구성합니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelCollector:
      enabled: true
      config:
        configMap:
          name: daemonset-layer2-config
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: daemonset-layer2-config
data:
  otel-config.yaml: |
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: "localhost:4317"
    exporters:
      otlp:
        endpoint: http://datadog-gw-layer-2-otel-agent-gateway:4317
        tls:
          insecure: true
    service:
      pipelines:
        traces:
          receivers: [otlp]
          exporters: [otlp]
        metrics:
          receivers: [otlp]
          exporters: [otlp]
        logs:
          receivers: [otlp]
          exporters: [otlp]
```

{{% /tab %}}
{{% tab "Helm" %}}

최종 계층부터 역순으로 각 계층을 별도의 Helm 릴리스로 배포합니다.

1.  **계층 1 배포(최종 계층):** 이 계층은 계층 2로부터 수신해 Datadog으로 내보냅니다.

    ```yaml
    # layer-1-values.yaml
    targetSystem: "linux"
    fullnameOverride: "gw-layer-1"
    agents:
      enabled: false
    clusterAgent:
      enabled: false
    otelAgentGateway:
      enabled: true
      replicas: 3
      nodeSelector:
        gateway: "gw-node-1"
      ports:
        - containerPort: "4317"
          hostPort: "4317"
          name: "otel-grpc"
      config: |
        receivers:
          otlp:
            protocols:
              grpc:
                endpoint: "0.0.0.0:4317"
        exporters:
          datadog:
            api:
              key: <API Key>
        service:
          pipelines:
            traces:
              receivers: [otlp]
              exporters: [datadog]
            metrics:
              receivers: [otlp]
              exporters: [datadog]
            logs:
              receivers: [otlp]
              exporters: [datadog]
    ```

2.  **계층 2 배포(중간 계층):** 이 계층은 DaemonSet으로부터 수신해 계층 1로 내보냅니다.

    ```yaml
    # layer-2-values.yaml
    targetSystem: "linux"
    fullnameOverride: "gw-layer-2"
    agents:
      enabled: false
    clusterAgent:
      enabled: false
    otelAgentGateway:
      enabled: true
      replicas: 3
      nodeSelector:
        gateway: "gw-node-2"
      ports:
        - containerPort: "4317"
          hostPort: "4317"
          name: "otel-grpc"
      config: |
        receivers:
          otlp:
            protocols:
              grpc:
                endpoint: "0.0.0.0:4317"
        exporters:
          otlp:
            endpoint: http://gw-layer-1-otel-agent-gateway:4317
            tls:
              insecure: true
        service:
          pipelines:
            traces:
              receivers: [otlp]
              exporters: [otlp]
            metrics:
              receivers: [otlp]
              exporters: [otlp]
            logs:
              receivers: [otlp]
              exporters: [otlp]
    ```

3.  **DaemonSet 배포:** 계층 2로 내보내도록 DaemonSet을 구성합니다.

    ```yaml
    # daemonset-values.yaml
    targetSystem: "linux"
    datadog:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
      otelCollector:
        enabled: true
        config: |
          receivers:
            otlp:
              protocols:
                grpc:
                  endpoint: "localhost:4317"
          exporters:
            otlp:
              endpoint: http://gw-layer-2-otel-agent-gateway:4317
              tls:
                insecure: true
          service:
            pipelines:
              traces:
                receivers: [otlp]
                exporters: [otlp]
              metrics:
                receivers: [otlp]
                exporters: [otlp]
              logs:
                receivers: [otlp]
                exporters: [otlp]
    ```

{{% /tab %}}
{{< /tabs >}}

## Fleet Automation에서 게이트웨이 포드 확인하기{#view-gateway-pods-on-fleet-automation}

DDOT Collector 게이트웨이는 기본적으로 [Datadog 확장][11]을 포함하고 있습니다. 이 확장 기능은 Collector 빌드 정보 및 구성을 Datadog으로 내보내므로, Infrastructure Monitoring 및 Fleet Automation에서 텔레메트리 파이프라인을 모니터링할 수 있습니다.

게이트웨이 포드 확인하기

1. {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Fleet Automation{{< /ui >}}로 이동합니다.

  {{< img src="opentelemetry/embedded_collector/fleet_automation2.png" alt="DDOT 게이트웨이 포드를 제시하는 Fleet Automation 페이지" style="width:100%;" >}}

2. 게이트웨이 포드를 선택해 자세한 빌드 정보와 실행 중인 Collector 구성을 확인합니다.

  {{< img src="opentelemetry/embedded_collector/fleet_automation3.png" alt="단일 DDOT 게이트웨이 포드의 Collector 구성을 보여주는 Fleet Automation 페이지" style="width:100%;" >}}

## 알려진 제한 사항 {#known-limitations}

  * **시작 경합 상태**: DaemonSet과 게이트웨이를 동일한 릴리스로 배포 시, 게이트웨이 서비스가 준비되기 전에 DaemonSet 포드가 시작되면서 초기 연결 오류 로그가 발생할 수 있습니다. OTLP 익스포터는 자동으로 재시도하므로, 이 로그는 무시해도 안전합니다. 또는 게이트웨이를 먼저 배포하고 준비가 완료될 때까지 대기하다가 DaemonSet을 배포합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://helm.sh
[4]: https://kubernetes.io/docs/tasks/tools/#kubectl
[5]: /ko/opentelemetry/setup/ddot_collector/custom_components
[6]: https://opentelemetry.io/docs/collector/deployment/gateway/
[7]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/config/configtls
[9]: http://github.com/kubernetes-sigs/metrics-server
[10]: /ko/containers/guide/cluster_agent_autoscaling_metrics/?tab=helm
[11]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/extension/datadogextension
[12]: /ko/opentelemetry/config/hostname_tagging/#collector-exporting-through-a-gateway