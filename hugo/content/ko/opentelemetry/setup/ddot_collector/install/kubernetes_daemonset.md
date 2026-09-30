---
aliases:
- /ko/opentelemetry/agent/install_agent_with_collector
- /ko/opentelemetry/setup/ddot_collector/install/kubernetes
code_lang: kubernetes_daemonset
code_lang_weight: 1
further_reading:
- link: /opentelemetry/setup/ddot_collector/custom_components
  tag: 설명서
  text: Datadog Agent와 함께 사용자 지정 OpenTelemetry 구성 요소 사용
title: Kubernetes DaemonSet으로 DDOT Collector 설치
type: multi-code-lang
---
## 개요 {#overview}

이 가이드는 Helm 또는 Datadog Operator를 사용하여 Kubernetes DaemonSet으로 Datadog Distribution of OpenTelemetry(DDOT) Collector를 배포하는 방법을 설명합니다.

<div class="alert alert-info">
  <strong>추가 OpenTelemetry 구성 요소가 필요하신가요?</strong> 기본 패키지에 포함된 구성 요소 외에 추가 구성 요소가 필요한 경우 Datadog Agent 기능을 확장하기 위해 <a href="/opentelemetry/setup/ddot_collector/custom_components">사용자 지정 OpenTelemetry 구성 요소 사용</a>을 참조하세요. 기본적으로 포함되는 구성 요소 목록은 <a href="/opentelemetry/agent/#opentelemetry-collector-components">OpenTelemetry Collector 구성 요소</a>를 참조하세요.
</div>

## 요구 사항 {#requirements}

이 가이드를 완료하려면 다음이 필요합니다.

**Datadog 계정**:
1. [Datadog 계정이 없는 경우 생성][1]합니다.
1. [Datadog API 키][2]를 확인하거나 생성합니다.

**소프트웨어**:
다음을 시스템에 설치하고 구성합니다.

- Kubernetes 클러스터(v1.29 이상)
- [Helm(v3 이상)][54]
- [kubectl][5]

**네트워크**: {{% otel-network-requirements %}}

## Datadog Agent와 OpenTelemetry Collector 설치 {#install-the-datadog-agent-with-opentelemetry-collector}

<div class="alert alert-info">이 설치는 Datadog SDK + DDOT 및 OpenTelemetry SDK + DDOT 구성 모두에 필요합니다. Datadog SDK는 OpenTelemetry API를 구현하지만, OTLP 메트릭 및 로그를 처리하고 전달하기 위해서는 여전히 DDOT Collector가 필요합니다.</div>

### 설치 방법 선택 {#select-installation-method}

다음 설치 방법 중 하나를 선택합니다.

- [Datadog Operator][55]: [Kubernetes 네이티브][56] 방식으로 Datadog 설정을 자동으로 조정하고 유지 관리합니다. 사용자 지정 리소스 상태에 배포 상태, 상태 정보 및 오류를 보고하며, 상위 수준 구성 옵션을 통해 구성 오류의 위험을 줄입니다.
- [Helm 차트][4]: Datadog Agent를 배포하는 간단한 방법입니다. 버전 관리, 롤백 및 템플릿 기능을 제공하므로 일관되고 더 쉽게 재현 가능한 배포가 가능합니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
### Datadog Operator 설치 {#install-the-datadog-operator}

[Datadog Operator Helm 차트][1]를 사용하여 클러스터에 Datadog Operator를 설치할 수 있습니다.

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
helm install datadog-operator datadog/datadog-operator
```

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog-operator/README.md
{{% /tab %}}
{{% tab "Helm" %}}
### Datadog Helm 저장소 추가 {#add-the-datadog-helm-repository}

Datadog 저장소를 Helm 저장소 목록에 추가하려면 다음을 실행합니다.

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

{{% /tab %}}
{{< /tabs >}}

### Datadog API 키 설정 {#set-up-datadog-api-key}

1. Datadog [API 키][2]를 가져옵니다.
1. API 키를 Kubernetes 시크릿으로 저장합니다.
   ```shell
   kubectl create secret generic datadog-secret \
     --from-literal api-key=<DD_API_KEY>
   ```
   `<DD_API_KEY>`를 실제 Datadog API 키로 교체합니다.

### Datadog Agent 구성 {#configure-the-datadog-agent}

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Datadog Operator 배포 후 Kubernetes 클러스터에 Datadog Agent, Cluster Agent 및 Cluster Checks Runner(사용하는 경우)를 배포하는 `DatadogAgent` 리소스를 생성합니다. Datadog Agent는 DaemonSet으로 배포되며 클러스터의 각 노드에서 하나의 포드로 실행됩니다..

1.  `datadog-agent.yaml` 파일을 사용하여 `DatadogAgent` 배포 구성을 지정합니다.

{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="true" >}}
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       clusterName: <CLUSTER_NAME>
       site: <DATADOG_SITE>
       credentials:
         apiSecret:
           secretName: datadog-secret
           keyName: api-key
{{< /code-block >}}

  - `<CLUSTER_NAME>`을 클러스터 이름으로 바꿉니다.
  - `<DATADOG_SITE>`를 [Datadog 사이트][1]로 바꿉니다. 사이트는 현재 선택된 {{< region-param key="dd_site" code="true" >}}입니다(오른쪽에서 올바른 **DATADOG SITE**가 선택되어 있는지 확인).

{{% site-region region="gov,gov2" %}}
<div class="alert alert-info">FED 환경에서는 <code>useFIPSAgent: true</code> ( <code>spec.global</code> 아래 있음)를 설정하여 FIPS 규격 준수 Agent 이미지를 사용합니다. <a href="/agent/configuration/fips-compliance/">FIPS 준수</a>를 참조하세요.</div>
{{% /site-region %}}

2. OpenTelemetry Collector 활성화:

{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="true" >}}
  # Enable Features
  features:
    otelCollector:
      enabled: true
{{< /code-block >}}

Datadog Operator는 기본적으로 OpenTelemetry Collector를 포트 `4317`(이름: `otel-grpc`) 및 `4318`(이름: `otel-http`)에 자동으로 바인딩합니다.

3. (선택 사항) 추가 Datadog 기능 활성화:

<div class="alert alert-warning">이 기능을 활성화하면 추가 비용이 발생할 수 있습니다. 진행하기 전에 <a href="https://www.datadoghq.com/pricing/">가격 페이지</a>를 검토하고 고객 성공 관리자와 상담하세요.</div>

{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="true" >}}
  # Enable Features
  features:
  ...
    apm:
      enabled: true
    orchestratorExplorer:
      enabled: true
    processDiscovery:
      enabled: true
    liveProcessCollection:
      enabled: true
    usm:
      enabled: true
    clusterChecks:
      enabled: true
{{< /code-block >}}

추가 Datadog 기능을 활성화할 때는 Datadog 환경 변수에 의존하지 말고 Datadog 또는 OpenTelemetry Collector 구성 파일을 사용하세요.

**참고**: Operator `v1.22.0`부터 DDOT 컨테이너는 `ddot-collector` 이미지를 사용하며 `-full` Agent 이미지는 사용하지 않습니다.
- 노드 Agent 이미지 태그를 재정의하는 경우 OTel 컨테이너가 스케줄링되도록 `7.67.0` 이상의 태그를 사용해야 합니다(`ddot-collector` 이미지는 `7.67.0` 이상에서만 지원됩니다).
- 이미지에는 `ddot-collector``-full` 변형이 없습니다. `-full` 이미지가 필요한 경우 `spec.override.nodeAgent.image.name`을 전체 Agent 이미지(예: `registry.datadoghq.com/agent:7.72.1-full`)로 설정하세요.

[1]: /ko/getting_started/site
[2]: /ko/containers/guide/changing_container_registry/
{{% /tab %}}
{{% tab "Helm" %}}
[Datadog Agent 차트][1]의 Helm Chart 파라미터를 지정하기 위해 YAML 파일을 사용합니다.

1. 빈 `datadog-values.yaml` 파일 생성:

```shell
touch datadog-values.yaml
```

<div class="alert alert-info">지정하지 않은 파라미터는 <a href="https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml">values.yaml</a>의 기본값을 사용합니다.</div>

2. Datadog API 키 시크릿 구성:

{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  site: <DATADOG_SITE>
  apiKeyExistingSecret: datadog-secret
{{< /code-block >}}

`<DATADOG_SITE>`를 [Datadog 사이트][2]로 설정합니다. 설정하지 않으면 기본값으로 US1 사이트(`datadoghq.com`)가 사용됩니다.

{{% site-region region="gov,gov2" %}}
<div class="alert alert-info">FED 환경에서는 <code>useFIPSAgent: true</code> ( <code>datadog-values.yaml</code> 의 루트에 있음)를 설정하여 FIPS 규격 준수 Agent 이미지를 사용합니다. <a href="/agent/configuration/fips-compliance/">FIPS 준수</a>를 참조하세요.</div>
{{% /site-region %}}

3. OpenTelemetry Collector 활성화 및 필수 포트 구성:

{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  ...
  otelCollector:
    enabled: true
    ports:
      - containerPort: "4317" # default port for OpenTelemetry gRPC receiver.
        hostPort: "4317"
        name: otel-grpc
      - containerPort: "4318" # default port for OpenTelemetry HTTP receiver
        hostPort: "4318"
        name: otel-http
{{< /code-block >}}

컨테이너 포트를 외부 네트워크에 노출하려면 `hostPort`을 설정합니다. 이를 통해 OTLP Exporter가 Datadog Agent가 배치된 노드의 IP 주소를 사용하도록 구성할 수 있습니다.

포트를 노출하고 싶지 않은 경우 Agent 서비스를 사용할 수도 있습니다.
   - 이 경우 <code>hostPort</code> 항목을 <code>datadog-values.yaml</code> 파일에서 제거합니다.
   - 애플리케이션 배포 파일(`deployment.yaml`)에서는 OTLP Exporter가 Agent 서비스를 사용하도록 구성합니다.
      ```yaml
      env:
        - name: OTEL_EXPORTER_OTLP_ENDPOINT
          value: 'http://<SERVICE_NAME>.<SERVICE_NAMESPACE>.svc.cluster.local'
        - name: OTEL_EXPORTER_OTLP_PROTOCOL
          value: 'grpc'
      ```

4. (선택 사항) 추가 Datadog 기능 활성화:

<div class="alert alert-warning">이 기능을 활성화하면 추가 비용이 발생할 수 있습니다. 진행하기 전에 <a href="https://www.datadoghq.com/pricing/">가격 페이지</a>를 검토하고 고객 성공 관리자와 상담하세요.</div>

{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  ...
  apm:
    portEnabled: true
    peer_service_aggregation: true
  orchestratorExplorer:
    enabled: true
  processAgent:
    enabled: true
    processCollection: true
{{< /code-block >}}

추가 Datadog 기능을 활성화할 때는 Datadog 환경 변수에 의존하지 말고 Datadog 또는 OpenTelemetry Collector 구성 파일을 사용하세요.

5. (선택 사항) 포드 레이블을 수집하여 메트릭, 트레이스 및 로그에 연결되는 태그로 사용:

<div class="alert alert-warning">사용자 지정 메트릭은 과금에 영향을 줄 수 있습니다. 자세한 내용은 <a href="https://docs.datadoghq.com/account_management/billing/custom_metrics">사용자 지정 메트릭 과금 페이지</a>를 참조하세요.</div>

{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  ...
  podLabelsAsTags:
    app: kube_app
    release: helm_release
{{< /code-block >}}

{{% collapse-content title="완성된 datadog-values.yaml 파일" level="p" %}}
완성된 `datadog-values.yaml` 파일은 다음과 유사해야 합니다.
{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="false" >}}
datadog:
  site: datadoghq.com
  apiKeyExistingSecret: datadog-secret

  otelCollector:
    enabled: true
    ports:
      - containerPort: "4317"
        hostPort: "4317"
        name: otel-grpc
      - containerPort: "4318"
        hostPort: "4318"
        name: otel-http
  apm:
    portEnabled: true
    peer_service_aggregation: true
  orchestratorExplorer:
    enabled: true
  processAgent:
    enabled: true
    processCollection: true

  podLabelsAsTags:
    app: kube_app
    release: helm_release
   {{< /code-block >}}

{{% /collapse-content %}}

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md
[2]: /ko/getting_started/site/
[3]: /ko/containers/guide/changing_container_registry/
{{% /tab %}}
{{< /tabs >}}

### OpenTelemetry Collector 구성 {#configure-the-opentelemetry-collector}

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Datadog Operator는 시작점으로 사용할 수 있는 샘플 OpenTelemetry Collector 구성을 제공합니다. 이 구성을 수정해야 하는 경우 Datadog Operator는 사용자 지정 Collector 구성을 제공하는 두 가지 방법을 지원합니다.

- **인라인 구성**: 사용자 지정 Collector 구성을 `features.otelCollector.conf.configData` 필드에 직접 추가합니다.
- **ConfigMap 기반 구성**: Collector 구성을 ConfigMap에 저장한 후 `features.otelCollector.conf.configMap` 필드에서 참조합니다. 이 방식은 Collector 구성을 `DatadogAgent` 리소스와 분리하여 관리할 수 있게 해줍니다.

####  인라인 Collector 구성 {#inline-collector-configuration}

아래 예제에서는 Collector 구성이 `features.otelCollector.conf.configData` 파라미터 아래에 직접 정의됩니다.

{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="false" >}}
  ...
  # Enable Features
  features:
    otelCollector:
      enabled: true
      ports:
        - containerPort: 4317
          hostPort: 4317
          name: otel-grpc
        - containerPort: 4318
          hostPort: 4318
          name: otel-http
      conf:
        configData: |-
          receivers:
            prometheus:
              config:
                scrape_configs:
                  - job_name: "otelcol"
                    scrape_interval: 10s
                    static_configs:
                      - targets:
                          - 0.0.0.0:8888
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
                site: ${env:DD_SITE}
              sending_queue:
                batch:
                  flush_timeout: 10s
          processors:
            infraattributes:
              cardinality: 2
          connectors:
            datadog/connector:
              traces:
          service:
            pipelines:
              traces:
                receivers: [otlp]
                processors: [infraattributes]
                exporters: [debug, datadog, datadog/connector]
              metrics:
                receivers: [otlp, datadog/connector, prometheus]
                processors: [infraattributes]
                exporters: [debug, datadog]
              logs:
                receivers: [otlp]
                processors: [infraattributes]
                exporters: [debug, datadog]
{{< /code-block >}}

{{% otel-infraattributes-prereq %}}

이 `DatadogAgent` 리소스가 포함된 `datadog-agent.yaml` 파일을 적용하면 Operator가 Collector 구성을 Agent DaemonSet에 자동으로 마운트합니다.

{{% collapse-content title="인라인 Collector 구성이 포함된 완성된 datadog-agent.yaml" level="p" %}}
인라인 Collector 구성을 포함한 완성된 `datadog-agent.yaml`은 다음과 유사해야 합니다.
{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="false" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  # Enable Features
  features:
    apm:
      enabled: true
    orchestratorExplorer:
      enabled: true
    processDiscovery:
      enabled: true
    liveProcessCollection:
      enabled: true
    usm:
      enabled: true
    clusterChecks:
      enabled: true
    otelCollector:
      enabled: true
      ports:
        - containerPort: 4317
          hostPort: 4317
          name: otel-grpc
        - containerPort: 4318
          hostPort: 4318
          name: otel-http
      conf:
        configData: |-
          receivers:
            prometheus:
              config:
                scrape_configs:
                  - job_name: "datadog-agent"
                    scrape_interval: 10s
                    static_configs:
                      - targets:
                          - 0.0.0.0:8888
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
                site: ${env:DD_SITE}
              sending_queue:
                batch:
                  flush_timeout: 10s
          processors:
            infraattributes:
              cardinality: 2
          connectors:
            datadog/connector:
              traces:
          service:
            pipelines:
              traces:
                receivers: [otlp]
                processors: [infraattributes]
                exporters: [debug, datadog, datadog/connector]
              metrics:
                receivers: [otlp, datadog/connector, prometheus]
                processors: [infraattributes]
                exporters: [debug, datadog]
              logs:
                receivers: [otlp]
                processors: [infraattributes]
                exporters: [debug, datadog]
{{< /code-block >}}
{{% /collapse-content %}}

#### ConfigMap 기반 Collector 구성 {#configmap-based-collector-configuration}

구성이 복잡하거나 자주 변경되는 경우에는 Collector 구성을 ConfigMap에 저장하면 버전 관리가 더 쉬워집니다.

1. Collector 구성이 포함된 ConfigMap 생성:

{{< code-block lang="yaml" filename="configmap.yaml" collapsible="false" >}}
apiVersion: v1
kind: ConfigMap
metadata:
  name: otel-agent-config-map
  namespace: system
data:
  # must be named otel-config.yaml
  otel-config.yaml: |-
    receivers:
      prometheus:
        config:
          scrape_configs:
            - job_name: "datadog-agent"
              scrape_interval: 10s
              static_configs:
                - targets:
                    - 0.0.0.0:8888
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
          site: ${env:DD_SITE}
        sending_queue:
          batch:
            flush_timeout: 10s
    processors:
      infraattributes:
        cardinality: 2
    connectors:
      datadog/connector:
        traces:
    service:
      pipelines:
        traces:
          receivers: [otlp]
          processors: [infraattributes]
          exporters: [debug, datadog, datadog/connector]
        metrics:
          receivers: [otlp, datadog/connector, prometheus]
          processors: [infraattributes]
          exporters: [debug, datadog]
        logs:
          receivers: [otlp]
          processors: [infraattributes]
          exporters: [debug, datadog]
{{< /code-block >}}

<div class="alert alert-danger">ConfigMap 내 Collector 구성 필드 이름은 <code>otel-config.yaml</code>이어야 합니다.</div>

2. `features.otelCollector.conf.configMap` 파라미터를 사용하여 `DatadogAgent` 리소스에서 해당 `otel-agent-config-map` ConfigMap을 참조합니다.
{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="false" >}}
  ...
  # Enable Features
  features:
    otelCollector:
      enabled: true
      ports:
        - containerPort: 4317
          hostPort: 4317
          name: otel-grpc
        - containerPort: 4318
          hostPort: 4318
          name: otel-http
      conf:
        configMap:
          name: otel-agent-config-map
{{< /code-block >}}

Operator는 ConfigMap의 `otel-config.yaml`을 Agent의 OpenTelemetry Collector DaemonSet에 자동으로 마운트합니다.

{{% collapse-content title="ConfigMap에 정의된 Collector 구성이 포함된 완성된 datadog-agent.yaml" level="p" %}}
Collector 구성을 ConfigMap으로 정의한 완성된 `datadog-agent.yaml`은 다음과 유사해야 합니다.
{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="false" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  # Enable Features
  features:
    apm:
      enabled: true
    orchestratorExplorer:
      enabled: true
    processDiscovery:
      enabled: true
    liveProcessCollection:
      enabled: true
    usm:
      enabled: true
    clusterChecks:
      enabled: true
    otelCollector:
      enabled: true
      ports:
        - containerPort: 4317
          hostPort: 4317
          name: otel-grpc
        - containerPort: 4318
          hostPort: 4318
          name: otel-http
      conf:
        configMap:
          name: otel-agent-config-map
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: otel-agent-config-map
  namespace: system
data:
  # must be named otel-config.yaml
  otel-config.yaml: |-
    receivers:
      prometheus:
        config:
          scrape_configs:
            - job_name: "datadog-agent"
              scrape_interval: 10s
              static_configs:
                - targets:
                    - 0.0.0.0:8888
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
          site: ${env:DD_SITE}
        sending_queue:
          batch:
            flush_timeout: 10s
    processors:
      infraattributes:
        cardinality: 2
    connectors:
      datadog/connector:
        traces:
    service:
      pipelines:
        traces:
          receivers: [otlp]
          processors: [infraattributes]
          exporters: [debug, datadog, datadog/connector]
        metrics:
          receivers: [otlp, datadog/connector, prometheus]
          processors: [infraattributes]
          exporters: [debug, datadog]
        logs:
          receivers: [otlp]
          processors: [infraattributes]
          exporters: [debug, datadog]
{{< /code-block >}}
{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Helm" %}}
Datadog Helm 차트는 시작점으로 사용할 수 있는 샘플 OpenTelemetry Collector 구성을 제공합니다. 이 섹션에서는 미리 정의된 파이프라인과 포함된 OpenTelemetry 구성 요소를 설명합니다.

다음은 `otel-config.yaml`에 포함되는 전체 OpenTelemetry Collector 구성입니다.

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: "otelcol"
          scrape_interval: 10s
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
      key: ${env:DD_API_KEY}
      site: ${env:DD_SITE}
    sending_queue:
      batch:
        flush_timeout: 10s
processors:
  infraattributes:
    cardinality: 2
connectors:
  datadog/connector:
    traces:
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [infraattributes]
      exporters: [datadog, datadog/connector]
    metrics:
      receivers: [otlp, datadog/connector, prometheus]
      processors: [infraattributes]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      processors: [infraattributes]
      exporters: [datadog]

{{< /code-block >}}

{{% otel-infraattributes-prereq %}}

{{% /tab %}}
{{< /tabs >}}

#### 주요 구성 요소 {#key-components}

Datadog으로 텔레메트리 데이터를 전송하기 위해 다음 구성 요소가 정의되어 있습니다.

{{< img src="/opentelemetry/embedded_collector/components-3.jpg" alt="Agent 배포 패턴을 나타내는 다이어그램" style="width:100%;" >}}

##### Datadog 커넥터 {#datadog-connector}

[Datadog 커넥터][6]는 Datadog APM 트레이스 메트릭을 계산합니다.

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
connectors:
  datadog/connector:
    traces:
{{< /code-block >}}

##### Datadog 익스포터 {#datadog-exporter}

[Datadog 익스포터][7]는 트레이스, 메트릭 및 로그를 Datadog으로 내보냅니다.

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
exporters:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: ${env:DD_SITE}
    sending_queue:
      batch:
        flush_timeout: 10s
{{< /code-block >}}

**참고**: `key`가 지정되지 않았거나 시크릿으로 설정된 경우 또는 `site`가 지정되지 않은 경우 시스템은 핵심 Agent 구성의 값을 사용합니다. 기본적으로 핵심 Agent는 사이트를 `datadoghq.com`(US1)으로 설정합니다.

##### Prometheus 수신기 {#prometheus-receiver}

[Prometheus 수신기][8]는 메트릭 파이프라인을 위해 OpenTelemetry Collector의 상태 메트릭을 수집합니다.

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: "otelcol"
          scrape_interval: 10s
          static_configs:
            - targets: ["0.0.0.0:8888"]
{{< /code-block >}}

자세한 내용은 [Collector Health Metrics][8] 설명서를 참조하세요.

### OpenTelemetry Collector와 함께 Agent 배포 {#deploy-the-agent-with-the-opentelemetry-collector}

{{< tabs >}}
{{% tab "Datadog Operator" %}}
구성 파일을 사용하여 Datadog Agent를 배포합니다.

```shell
kubectl apply -f datadog-agent.yaml
```

이 작업은 DDOT OpenTelemetry Collector가 포함된 Datadog Agent를 DaemonSet으로 배포합니다. Collector는 [Agent 배포 패턴][1]에 따라 애플리케이션과 동일한 호스트에서 실행됩니다. [Gateway 배포 패턴][2]은 현재 Preview 상태입니다. 설치 방법은 [DDOT Kubernetes Gateway 설치 가이드][3]를 참조하세요.

[1]: https://opentelemetry.io/docs/collector/deployment/agent/
[2]: https://opentelemetry.io/docs/collector/deployment/gateway/
[3]: /ko/opentelemetry/setup/ddot_collector/install/kubernetes_gateway/
{{% /tab %}}
{{% tab "Helm" %}}
Kubernetes 환경에서 OpenTelemetry Collector와 함께 Datadog Agent를 설치하거나 업그레이드하려면 다음 Helm 명령 중 하나를 사용합니다.

- 기본 OpenTelemetry Collector 구성 사용:
   ```shell
   helm upgrade -i <RELEASE_NAME> datadog/datadog -f datadog-values.yaml
   ```

- 사용자 지정 OpenTelemetry Collector 구성 사용:
   ```shell
   helm upgrade -i <RELEASE_NAME> datadog/datadog \
     -f datadog-values.yaml \
     --set-file datadog.otelCollector.config=otel-config.yaml
   ```
   이 명령을 사용하면 자체 `otel-config.yaml` 파일을 지정할 수 있습니다.

`<RELEASE_NAME>`은 사용 중인 Helm 릴리스 이름으로 바꾸세요.

<div class="alert alert-info">배포 과정에서 경고 메시지가 표시될 수 있습니다. 이러한 경고는 무시해도 됩니다.</div>

이 Helm 차트는 OpenTelemetry Collector가 포함된 Datadog Agent를 DaemonSet으로 배포합니다. Collector는 [Agent 배포 패턴][1]에 따라 애플리케이션과 동일한 호스트에 배포됩니다. [Gateway 배포 패턴][2]은 현재 Preview 상태입니다. 설치 방법은 [DDOT Kubernetes Gateway 설치 가이드][3]를 참조하세요.

[1]: https://opentelemetry.io/docs/collector/deployment/agent/
[2]: https://opentelemetry.io/docs/collector/deployment/gateway/
[3]: /ko/opentelemetry/setup/ddot_collector/install/kubernetes_gateway/
{{% /tab %}}
{{< /tabs >}}

{{% collapse-content title="배포 다이어그램" level="p" %}}
{{< img src="/opentelemetry/embedded_collector/deployment-2.png" alt="Agent 배포 패턴을 나타내는 다이어그램" style="width:100%;" >}}
{{% /collapse-content %}}

## Datadog으로 텔레메트리 전송 {#send-your-telemetry-to-datadog}

텔레메트리 데이터를 Datadog으로 전송하려면 다음 단계를 수행합니다.

1. [애플리케이션 계측](#instrument-the-application)
2. [애플리케이션 구성](#configure-the-application)
3. [관측성 데이터 상관관계 설정](#correlate-observability-data)
4. [애플리케이션 실행](#run-the-application)

### 애플리케이션 계측 {#instrument-the-application}

[OpenTelemetry API를 사용][12]하여 애플리케이션을 계측합니다.

{{% collapse-content title="OpenTelemetry API로 계측된 예제 애플리케이션" level="p" %}}
예제로는 이미 계측이 완료된 [Calendar 샘플 애플리케이션][9]을 사용할 수 있습니다. 다음 코드는 OpenTelemetry 주석 및 API를 사용하여 [CalendarService.getDate()][10] 메서드를 계측합니다.
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

애플리케이션 컨테이너는 동일한 호스트에서 실행 중인 DDOT Collector로 데이터를 전송해야 합니다. Collector는 DaemonSet으로 실행되므로 OTLP 엔드포인트로 로컬 호스트를 지정해야 합니다.

`OTEL_EXPORTER_OTLP_ENDPOINT` 환경 변수가 아직 설정되어 있지 않은 경우 애플리케이션의 Deployment 매니페스트 파일에 추가합니다.
   {{< code-block lang="yaml" filename="deployment.yaml" disable_copy="true" collapsible="true" >}}
env:
  ...
  - name: HOST_IP
    valueFrom:
     fieldRef:
        fieldPath: status.hostIP
  - name: OTLP_GRPC_PORT
    value: "4317"
  - name: OTEL_EXPORTER_OTLP_ENDPOINT
    value: 'http://$(HOST_IP):$(OTLP_GRPC_PORT)'
  - name: OTEL_EXPORTER_OTLP_PROTOCOL
    value: 'grpc'
   {{< /code-block >}}

### 관측성 데이터 상관관계 설정 {#correlate-observability-data}

[unified service tagging][14]은 Datadog에서 메트릭, 트레이스 및 로그를 일관된 태그로 연결하여 서로 간에 쉽게 탐색할 수 있도록 해줍니다.

컨테이너화된 환경에서는 OpenTelemetry Resource Attributes 환경 변수를 사용하여 `env`, `service`, `version`을 설정합니다. DDOT Collector는 이러한 태깅 구성을 감지하고 컨테이너에서 수집한 데이터에 자동으로 적용합니다.

애플리케이션의 Deployment 매니페스트에 다음 환경 변수를 추가합니다.

{{< code-block lang="yaml" filename="deployment.yaml" disable_copy="true" collapsible="true" >}}
apiVersion: apps/v1
kind: Deployment
metadata:
  name: <SERVICE>
spec:
  template:
    spec:
      containers:
      - name: <SERVICE>
        env:
          - name: OTEL_SERVICE_NAME
            value: "<SERVICE>"
          - name: OTEL_RESOURCE_ATTRIBUTES
            value: "service.version=<VERSION>,deployment.environment.name=<ENV>"
{{< /code-block >}}

<div class="alert alert-info">또는 <a href="/getting_started/tagging/unified_service_tagging/?tab=kubernetes#configuration">Datadog 전용 Kubernetes 레이블</a>을 사용하여 unified service tagging을 구성할 수도 있습니다. 두 가지 방법을 동시에 사용하지 마세요. 중복 태그가 생성될 수 있습니다.</div>

### 애플리케이션 실행 {#run-the-application}

Deployment 매니페스트 변경 사항을 적용하기 위해 애플리케이션을 다시 배포합니다. 업데이트된 구성이 활성화되면 메트릭, 트레이스 및 로그 전반에서 Unified Service Tagging이 완전히 활성화됩니다.

## Datadog에서 관측성 데이터 탐색하기 {#explore-observability-data-in-datadog}

Datadog을 사용하여 애플리케이션의 관측성 데이터를 확인할 수 있습니다.

### Fleet Automation {#fleet-automation}

Datadog Agent 및 Collector 구성을 확인하세요.

{{< img src="/opentelemetry/embedded_collector/fleet_automation.png" alt="Fleet Automation 페이지에서 Agent 및 Collector 구성을 검토할 수 있습니다." style="width:100%;" >}}

### 실시간 컨테이너 모니터링 {#live-container-monitoring}

Live Container Monitoring 기능을 사용하여 컨테이너 상태를 모니터링합니다.

{{< img src="/opentelemetry/embedded_collector/containers.png" alt="Containers 페이지에서 컨테이너 상태를 확인하세요." style="width:100%;" >}}

### 인프라 노드 상태 {#infrastructure-node-health}

런타임 및 인프라 메트릭을 확인하여 노드 성능을 시각화, 모니터링 및 측정할 수 있습니다.

{{< img src="/opentelemetry/embedded_collector/infrastructure.png" alt="Host List에서 런타임 및 인프라 메트릭을 확인하세요." style="width:100%;" >}}

### 로그 {#logs}

로그를 확인하여 애플리케이션 및 시스템 작동 문제를 모니터링 및 해결하세요.

{{< img src="/opentelemetry/embedded_collector/logs.png" alt="Log Explorer에서 로그를 확인하세요." style="width:100%;" >}}

### 트레이스 {#traces}

트레이스와 스팬을 확인하여 애플리케이션이 처리하는 요청의 상태 및 성능을 관찰할 수 있습니다. 동일한 트레이스 내에서 인프라 메트릭도 함께 연관되어 표시됩니다.

{{< img src="/opentelemetry/embedded_collector/traces.png" alt="Trace Explorer에서 트레이스를 확인하세요." style="width:100%;" >}}

### 런타임 메트릭 {#runtime-metrics}

애플리케이션의 런타임(JVM) 메트릭을 모니터링합니다.

{{< img src="/opentelemetry/embedded_collector/metrics.png" alt="JVM Metrics 대시보드에서 JVM 메트릭을 확인하세요." style="width:100%;" >}}

### Collector 상태 메트릭 {#collector-health-metrics}

DDOT Collector의 상태를 모니터링하기 위해 Collector 메트릭을 확인합니다.

{{< img src="/opentelemetry/embedded_collector/dashboard.png" alt="OTel 대시보드에서 Collector 상태 메트릭을 확인하세요." style="width:100%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md
[5]: https://kubernetes.io/docs/tasks/tools/#kubectl
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/prometheusreceiver
[9]: https://github.com/DataDog/opentelemetry-examples/tree/main/apps/rest-services/java/calendar
[10]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/src/main/java/com/otel/service/CalendarService.java#L27-L48
[11]: https://github.com/DataDog/datadog-agent/blob/386130a34dde43035c814f9a9b08bc72eb20e476/comp/otelcol/collector-contrib/impl/manifest.yaml
[12]: /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[13]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/deploys/calendar/templates/deployment.yaml#L71-L72
[14]: /ko/getting_started/tagging/unified_service_tagging
[15]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/deploys/calendar/templates/deployment.yaml#L75-L83
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
[50]: https://docs.docker.com/engine/install/
[51]: https://github.com/DataDog/datadog-agent/blob/main/comp/otelcol/collector-contrib/impl/manifest.yaml#L7
[52]: /ko/getting_started/site/
[53]: /ko/containers/guide/changing_container_registry/
[54]: https://helm.sh
[55]: /ko/containers/datadog_operator
[56]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[57]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog-operator/README.md