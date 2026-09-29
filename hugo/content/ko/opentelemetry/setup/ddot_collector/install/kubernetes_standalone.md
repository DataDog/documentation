---
description: OpenTelemetry Operator 또는 Helm 차트를 사용하여 Kubernetes에 독립형 Datadog Distribution
  of OpenTelemetry(DDOT) Collector를 배포하세요.
further_reading:
- link: /opentelemetry/setup/ddot_collector/custom_components
  tag: 설명서
  text: DDOT에서 사용자 지정 OpenTelemetry 구성 요소 사용
title: Kubernetes DaemonSet로 독립형 DDOT Collector 설치
---
{{< callout header="false" btn_hidden="true" >}}
OpenTelemetry 도구를 사용하여 독립형 DDOT Collector를 설치하는 기능은 미리 보기로 제공되고 있습니다.
{{< /callout >}}

## 개요 {#overview}

이 가이드에 따라 OpenTelemetry Operator 또는 Helm 차트를 사용하여 Datadog Distribution of OpenTelemetry(DDOT) Collector를 배포하세요.

<div class="alert alert-info">
  <strong>추가 OpenTelemetry 구성 요소가 필요하신가요?</strong> 기본 패키지에 포함된 구성 요소 외에 추가 구성 요소가 필요한 경우 <a href="/opentelemetry/setup/ddot_collector/custom_components">사용자 지정 OpenTelemetry 구성 요소 사용</a>을 참조하여 DDOT의 기능을 확장하세요. 기본적으로 포함되는 구성 요소 목록은 <a href="/opentelemetry/agent/#opentelemetry-collector-components">OpenTelemetry Collector 구성 요소</a>를 참조하세요.
</div>

## 요구 사항 {#requirements}

이 가이드를 완료하려면 다음이 필요합니다.

**Datadog 계정**:
1. Datadog 계정이 없는 경우 [Datadog 계정 생성][1] 단계를 진행합니다.
1. [Datadog API 키][2]를 찾거나 생성합니다.

**소프트웨어**:
다음을 머신에 설치하고 구성합니다.

- Kubernetes 클러스터(v1.29 이상)
- [Helm(v4 이상)][54]
- [kubectl][5]

**네트워크**:
| 프로토콜 | 전송 | 포트 |
|:---------|:----------|-----:|
| gRPC     | TCP       | 4317 |
| HTTP     | TCP       | 4318 |

## Datadog Distribution of OpenTelemetry Collector 설치 {#install-the-datadog-distribution-of-the-opentelemetry-collector}

### 설치 방법 선택 {#select-installation-method}

다음 설치 방법 중 하나를 선택합니다.

- [OpenTelemetry Operator][55]: OTel Collector 설정을 자동으로 조정하고 유지 관리하는 [Kubernetes 네이티브][56] 접근 방식입니다.
- [Helm 차트][4]: OTel Collector를 배포하는 간단한 방법입니다.

{{< tabs >}}
{{% tab "Operator" %}}
### OpenTelemetry Operator 설치 {#install-the-opentelemetry-operator}

[OpenTelemetry Operator Helm 차트][1]를 사용하여 클러스터에 OpenTelemetry Operator를 설치할 수 있습니다.

```shell
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm repo update
helm install opentelemetry-operator open-telemetry/opentelemetry-operator   \
     --set "manager.createRbacPermissions=true"                             \
     --set "manager.collectorImage.repository=datadog/ddot-collector"       \
     --set "manager.collectorImage.tag={{< version key="agent_version" >}}"
```

{{% site-region region="gov,gov2" %}}
<div class="alert alert-info">
FED의 경우 태그를 설정( <code>{{< version key="agent_version" >}}-fips</code> )하여 FIPS 규정 준수 DDOT 이미지를 사용합니다.
<a href="/agent/configuration/fips-compliance/">FIPS 규정 준수</a>를 참조하세요.
</div>
{{% /site-region %}}

[1]: https://github.com/open-telemetry/opentelemetry-helm-charts/blob/main/charts/opentelemetry-operator/README.md
{{% /tab %}}
{{% tab "Helm" %}}
### OpenTelemetry Helm 리포지토리 추가 {#add-the-opentelemetry-helm-repository}

Helm 리포지토리에 OpenTelemetry 리포지토리를 추가하려면 다음을 실행하세요.

```shell
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm repo update
```

{{% /tab %}}
{{< /tabs >}}

### Datadog API 키 설정 {#set-up-datadog-api-key}

1. Datadog [API 키][2]를 가져옵니다.
1. 오른쪽에서 선택한 **DATADOG SITE**(현재 값: **{{< region-param key="dd_site_name" >}}**)가 [Datadog 사이트][52]와 일치하는지 확인합니다.
1. API 키를 Kubernetes 시크릿으로 저장합니다.
   ```shell
   kubectl create secret generic datadog-secret \
     --from-literal api-key=<DD_API_KEY>        \
     --from-literal site={{< region-param key="dd_site" >}}
   ```
   Replace `<DD_API_KEY>` with your actual Datadog API key.

### Configure the OTel Collector 

{{< tabs >}}
{{% tab "Operator" %}}
OTel Operator를 배포한 후 Collector 배포를 트리거하는 `OpenTelemetryCollector` 리소스를 생성하세요.

1. `node-collector.yaml` 파일을 사용하여 `OpenTelemetryCollector` DaemonSet 구성을 지정합니다.

{{< code-block lang="yaml" filename="node-collector.yaml" collapsible="true" >}}
apiVersion: opentelemetry.io/v1beta1
kind: OpenTelemetryCollector
metadata:
  name: node-collector
spec:
  # Deploy 1 instance per node, that will collect telemetry from that node's pods
  mode: daemonset
  command: ['otel-agent', 'run'] # Will no longer be necessary from 7.82.0 onwards
  config:
    exporters:
      datadog:
        api:
          key: ${env:DD_API_KEY}
          site: ${env:DD_SITE}
        sending_queue:
          batch:
            flush_timeout: 10s
    service:
      telemetry:
        resource:
          k8s.cluster.name: ${env:K8S_CLUSTER_NAME}
  env:
    - name: DD_API_KEY
      valueFrom:
        secretKeyRef:
          key: api-key
          name: datadog-apikey
    - name: DD_SITE
      valueFrom:
        secretKeyRef:
          key: site
          name: datadog-apikey
    - name: DD_OTELCOLLECTOR_CONVERTER_FEATURES
      value: datadog,pprof,zpages,prometheus,infraattributes
    - name: K8S_CLUSTER_NAME
      value: <CLUSTER_NAME>
    # vvv Will no longer be necessary from 7.83.0 onwards vvv
    - name: DD_OTEL_STANDALONE
      value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    # vvv Will no longer be necessary from 7.82.0 onwards vvv
    - name: DD_OTELCOLLECTOR_ENABLED
      value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
{{< /code-block >}}

`<CLUSTER_NAME>`을 클러스터 이름으로 바꿉니다.

2. 원하는 모든 신호에 대해 OTLP 수신기와 Datadog 익스포터를 추가합니다. 애플리케이션 포드가 동일한 노드에서 실행 중인 Collector 인스턴스에 도달할 수 있도록 `hostPort`를 통해 노드에서 OTLP 포트를 게시합니다.

{{< code-block lang="yaml" filename="node-collector.yaml" collapsible="true" >}}
# [...]
spec:
  # [...]
  # Publish the OTLP ports on the node's network interface
  ports:
    - name: otlp-grpc
      port: 4317
      protocol: TCP
      hostPort: 4317
    - name: otlp-http
      port: 4318
      protocol: TCP
      hostPort: 4318
  config:
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: 0.0.0.0:4317
          http:
            endpoint: 0.0.0.0:4318
    # [...]
    service:
      # [...]
      pipelines:
        logs:
          receivers: ['otlp']
          exporters: ['datadog']
        metrics:
          receivers: ['otlp']
          exporters: ['datadog']
        traces:
          receivers: ['otlp']
          exporters: ['datadog']
{{< /code-block >}}

3. (선택 사항) 추가 기능을 활성화합니다.

<div class="alert alert-warning">이 기능을 활성화하면 추가 비용이 발생할 수 있습니다. 진행하기 전에 <a href="https://www.datadoghq.com/pricing/">가격 페이지</a>를 검토하고 고객 성공 관리자와 상담하세요.</div>

{{< code-block lang="yaml" filename="node-collector.yaml" collapsible="true" >}}
spec:
  config:
    receivers:
      host_metrics:
        collection_interval: 15s
        scrapers:
          cpu: {}
          load: {}
          memory: {}
          network: {}
          disk: {}
      kubelet_stats:
        auth_type: serviceAccount
        collection_interval: 15s
        endpoint: ${env:K8S_NODE_NAME}:10250
        node: ${env:K8S_NODE_NAME}
        metric_groups:
          - pod
          - container
          - volume
    processors:
      infraattributes:
        cardinality: 2
      resource/add-cluster-name:
        attributes:
          - key: k8s.cluster.name
            value: ${env:K8S_CLUSTER_NAME}
            action: upsert
    connectors:
      datadog/connector:
        traces:
          compute_top_level_by_span_kind: true
          peer_tags_aggregation: true
          compute_stats_by_span_kind: true
    extensions:
      health_check:
        endpoint: "${env:K8S_POD_IP}:13133"
    # [...]
    service:
      # [...]
      extensions: ['health_check']
      pipelines:
        logs:
          # [...]
          processors: ['resource/add-cluster-name', 'infraattributes']
        metrics:
          receivers: ['host_metrics', 'otlp', 'kubelet_stats', 'datadog/connector']
          processors: ['resource/add-cluster-name', 'infraattributes']
          # [...]
        traces:
          # [...]
          processors: ['resource/add-cluster-name', 'infraattributes']
          exporters: ['datadog', 'datadog/connector']
  env:
    # [...]
    - name: K8S_POD_IP
      valueFrom:
        fieldRef:
          apiVersion: v1
          fieldPath: status.podIP
    # K8S_NODE_NAME is added automatically by the operator
{{< /code-block >}}

4. (선택 사항) 노드의 파일 시스템에서 컨테이너 로그를 수집합니다.

<div class="alert alert-warning">로그 수집을 활성화하면 추가 비용이 발생할 수 있습니다. 진행하기 전에 <a href="https://www.datadoghq.com/pricing/">가격 페이지</a>를 검토하고 고객 성공 관리자와 상담하세요.</div>

`filelog` 수신기는 노드에서 컨테이너 로그를 읽습니다. Operator가 호스트 경로를 자동으로 마운팅하지 않으므로 로그 디렉터리를 읽기 전용 볼륨으로 추가합니다.

{{< code-block lang="yaml" filename="node-collector.yaml" collapsible="true" >}}
spec:
  config:
    receivers:
      filelog:
        include:
          - /var/log/pods/*/*/*.log
        # Exclude the Collector's own logs to avoid a feedback loop
        exclude:
          - /var/log/pods/*_node-collector-collector-*_*/otc-container/*.log
        start_at: end
        include_file_path: true
        include_file_name: false
        retry_on_failure:
          enabled: true
        operators:
          - id: container-parser
            type: container
            max_log_size: 102400
    # [...]
    service:
      # [...]
      pipelines:
        logs:
          receivers: ['otlp', 'filelog']
          # [...]
  # Mount the node's log directories into the Collector pod (read-only)
  volumes:
    - name: varlogpods
      hostPath:
        path: /var/log/pods
    - name: varlibdockercontainers
      hostPath:
        path: /var/lib/docker/containers
  volumeMounts:
    - name: varlogpods
      mountPath: /var/log/pods
      readOnly: true
    - name: varlibdockercontainers
      mountPath: /var/lib/docker/containers
      readOnly: true
{{< /code-block >}}

{{% collapse-content title="완성된 node-collector.yaml 파일" level="p" %}}
`node-collector.yaml` 파일은 다음과 유사해야 합니다.
{{< code-block lang="yaml" filename="node-collector.yaml" collapsible="false" >}}
apiVersion: opentelemetry.io/v1beta1
kind: OpenTelemetryCollector
metadata:
  name: node-collector
spec:
  # Deploy 1 instance per node, that will collect telemetry from that node's pods
  mode: daemonset
  command: ['otel-agent', 'run'] # Will no longer be necessary from 7.82.0 onwards
  # Publish the OTLP ports on the node's network interface
  ports:
    - name: otlp-grpc
      port: 4317
      protocol: TCP
      hostPort: 4317
    - name: otlp-http
      port: 4318
      protocol: TCP
      hostPort: 4318
  config:
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: 0.0.0.0:4317
          http:
            endpoint: 0.0.0.0:4318
      host_metrics:
        collection_interval: 15s
        scrapers:
          cpu: {}
          load: {}
          memory: {}
          network: {}
          disk: {}
      kubelet_stats:
        auth_type: serviceAccount
        collection_interval: 15s
        endpoint: ${env:K8S_NODE_NAME}:10250
        node: ${env:K8S_NODE_NAME}
        metric_groups:
          - pod
          - container
          - volume
      filelog:
        include:
          - /var/log/pods/*/*/*.log
        exclude:
          - /var/log/pods/*_node-collector-collector-*_*/otc-container/*.log
        start_at: end
        include_file_path: true
        include_file_name: false
        retry_on_failure:
          enabled: true
        operators:
          - id: container-parser
            type: container
            max_log_size: 102400
    processors:
      infraattributes:
        cardinality: 2
      resource/add-cluster-name:
        attributes:
          - key: k8s.cluster.name
            value: ${env:K8S_CLUSTER_NAME}
            action: upsert
    connectors:
      datadog/connector:
        traces:
          compute_top_level_by_span_kind: true
          peer_tags_aggregation: true
          compute_stats_by_span_kind: true
    exporters:
      datadog:
        api:
          key: ${env:DD_API_KEY}
          site: ${env:DD_SITE}
        sending_queue:
          batch:
            flush_timeout: 10s
    extensions:
      health_check:
        endpoint: "${env:K8S_POD_IP}:13133"
    service:
      telemetry:
        resource:
          k8s.cluster.name: ${env:K8S_CLUSTER_NAME}
      extensions: ['health_check']
      pipelines:
        logs:
          receivers: ['otlp', 'filelog']
          processors: ['resource/add-cluster-name', 'infraattributes']
          exporters: ['datadog']
        metrics:
          receivers: ['host_metrics', 'otlp', 'kubelet_stats', 'datadog/connector']
          processors: ['resource/add-cluster-name', 'infraattributes']
          exporters: ['datadog']
        traces:
          receivers: ['otlp']
          processors: ['resource/add-cluster-name', 'infraattributes']
          exporters: ['datadog', 'datadog/connector']
  env:
    - name: DD_API_KEY
      valueFrom:
        secretKeyRef:
          key: api-key
          name: datadog-apikey
    - name: DD_SITE
      valueFrom:
        secretKeyRef:
          key: site
          name: datadog-apikey
    - name: DD_OTELCOLLECTOR_CONVERTER_FEATURES
      value: datadog,pprof,zpages,prometheus,infraattributes
    - name: K8S_CLUSTER_NAME
      value: <CLUSTER_NAME>
    - name: K8S_POD_IP
      valueFrom:
        fieldRef:
          apiVersion: v1
          fieldPath: status.podIP
    # K8S_NODE_NAME is added automatically by the operator
    # vvv Will no longer be necessary from 7.83.0 onwards vvv
    - name: DD_OTEL_STANDALONE
      value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    # vvv Will no longer be necessary from 7.82.0 onwards vvv
    - name: DD_OTELCOLLECTOR_ENABLED
      value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  # Mount the node's log directories for the filelog receiver (read-only)
  volumes:
    - name: varlogpods
      hostPath:
        path: /var/log/pods
    - name: varlibdockercontainers
      hostPath:
        path: /var/lib/docker/containers
  volumeMounts:
    - name: varlogpods
      mountPath: /var/log/pods
      readOnly: true
    - name: varlibdockercontainers
      mountPath: /var/lib/docker/containers
      readOnly: true
{{< /code-block >}}

`<CLUSTER_NAME>`을 클러스터 이름으로 바꿉니다.

{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Helm" %}}
YAML 파일을 사용하여 [Collector 차트][1]의 Helm 차트 파라미터를 지정하세요.

1. 비어 있는 `node-collector-values.yaml` 파일을 생성합니다.

```shell
touch node-collector-values.yaml
```

<div class="alert alert-info">지정되지 않은 파라미터에는 <a href="https://github.com/open-telemetry/opentelemetry-helm-charts/blob/main/charts/opentelemetry-collector/values.yaml">values.yaml</a>의 기본값이 사용됩니다.</div>

2. DaemonSet 모드를 선택하고 DDOT를 컬렉터로 사용합니다.

{{< code-block lang="yaml" filename="node-collector-values.yaml" collapsible="true" >}}
mode: daemonset
image:
  repository: datadog/ddot-collector
  tag: {{< version key="agent_version" >}}
ports:
  jaeger-compact:
    enabled: false
  jaeger-grpc:
    enabled: false
  jaeger-thrift:
    enabled: false
  zipkin:
    enabled: false
# Can be removed from 7.82.0 onwards
command:
  name: opt/datadog-agent/embedded/bin/otel-agent
{{< /code-block >}}

{{% site-region region="gov,gov2" %}}
<div class="alert alert-info">FED의 경우 <code>tag: {{< version key="agent_version" >}}-fips</code> 설정을 통해 FIPS 규정 준수 DDOT 이미지를 사용합니다. <a href="/agent/configuration/fips-compliance/">FIPS 규정 준수</a>를 참조하세요.</div>
{{% /site-region %}}

<div class="alert alert-info">Collector Helm 차트는 기본적으로 각 노드에서 OTLP 포트를 게시하므로(<code>hostPort: 4317</code> - gRPC, <code>hostPort: 4318</code> - HTTP) 애플리케이션 포드가 동일한 노드에서 실행 중인 Collector 인스턴스에 도달할 수 있습니다. <a href="#configure-the-application">애플리케이션 구성</a>을 참조하세요.</div>

3. Datadog 익스포터 및 API 키 시크릿을 구성합니다.

{{< code-block lang="yaml" filename="node-collector-values.yaml" collapsible="true" >}}
config:
  exporters:
    datadog:
      api:
        key: ${env:DD_API_KEY}
        site: ${env:DD_SITE}
      sending_queue:
        batch:
          flush_timeout: 10s
extraEnvs:
  - name: DD_API_KEY
    valueFrom:
      secretKeyRef:
        key: api-key
        name: datadog-apikey
  - name: DD_SITE
    valueFrom:
      secretKeyRef:
        key: site
        name: datadog-apikey
  - name: DD_OTELCOLLECTOR_CONVERTER_FEATURES
    value: datadog,pprof,zpages,prometheus,infraattributes
  - name: K8S_CLUSTER_NAME
    value: <CLUSTER_NAME>
    # vvv Will no longer be necessary from 7.83.0 onwards vvv
  - name: DD_OTEL_STANDALONE
    value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    # vvv Will no longer be necessary from 7.82.0 onwards vvv
  - name: DD_OTELCOLLECTOR_ENABLED
    value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
{{< /code-block >}}

`<CLUSTER_NAME>`을 클러스터 이름으로 바꿉니다.

4. 사전 설정을 활성화합니다.

{{< code-block lang="yaml" filename="node-collector-values.yaml" collapsible="true" >}}
presets:
  hostMetrics:
    enabled: true
  kubeletMetrics:
    enabled: true
  logsCollection:
    enabled: true
    includeCollectorLogs: false
{{< /code-block >}}

5. OTLP 수신기를 사용하여 원하는 신호에 대한 파이프라인을 정의합니다.

{{< code-block lang="yaml" filename="node-collector-values.yaml" collapsible="true" >}}
config:
  # [...]
  receivers:
    otlp:
      protocols:
        grpc:
          endpoint: 0.0.0.0:4317
        http:
          endpoint: 0.0.0.0:4318
  service:
    pipelines:
      logs:
        receivers: ['otlp']
        exporters: ['datadog']
      metrics:
        receivers: ['otlp']
        exporters: ['datadog']
      traces:
        receivers: ['otlp']
        exporters: ['datadog']
    telemetry:
      resource:
        k8s.cluster.name: ${env:K8S_CLUSTER_NAME}
{{< /code-block >}}

6. (선택 사항) 추가 Datadog 기능을 활성화합니다.

<div class="alert alert-warning">이 기능을 활성화하면 추가 비용이 발생할 수 있습니다. 진행하기 전에 <a href="https://www.datadoghq.com/pricing/">가격 페이지</a>를 검토하고 고객 성공 관리자와 상담하세요.</div>

{{< code-block lang="yaml" filename="node-collector-values.yaml" collapsible="true" >}}
config:
  # [...]
  processors:
    infraattributes:
      cardinality: 2
    resource/add-cluster-name:
      attributes:
        - key: k8s.cluster.name
          value: ${env:K8S_CLUSTER_NAME}
          action: upsert
  connectors:
    datadog/connector:
      traces:
        compute_top_level_by_span_kind: true
        peer_tags_aggregation: true
        compute_stats_by_span_kind: true
  service:
    pipelines:
      logs:
	    # [...]
        processors: ['resource/add-cluster-name', 'infraattributes']
      metrics:
        receivers: ['otlp', 'datadog/connector']
        processors: ['resource/add-cluster-name', 'infraattributes']
	    # [...]
      traces:
	    # [...]
        processors: ['resource/add-cluster-name', 'infraattributes']
        exporters: ['datadog', 'datadog/connector']
{{< /code-block >}}

{{% collapse-content title="완성된 node-collector-values.yaml 파일" level="p" %}}
`node-collector-values.yaml` 파일은 다음과 유사해야 합니다.
{{< code-block lang="yaml" filename="node-collector-values.yaml" collapsible="false" >}}
mode: daemonset
# vvv To be removed from 7.82.0 onwards vvv
command:
  name: opt/datadog-agent/embedded/bin/otel-agent
# ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
image:
  repository: datadog/ddot-collector
  tag: {{< version key="agent_version" >}}
presets:
  hostMetrics: # Add an hostmetrics receiver to the metrics pipeline
    enabled: true
  kubeletMetrics: # Add a kubeletstats receiver to the metrics pipeline
    enabled: true
  logsCollection: # Add a filelog receiver to the logs pipeline
    enabled: true
    includeCollectorLogs: false
config:
  connectors:
    datadog/connector:
      traces:
        compute_top_level_by_span_kind: true
        peer_tags_aggregation: true
        compute_stats_by_span_kind: true
  exporters:
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
    resource/add-cluster-name:
      attributes:
        - key: k8s.cluster.name
          value: ${env:K8S_CLUSTER_NAME}
          action: upsert
  receivers:
    otlp:
      protocols:
        grpc:
          endpoint: 0.0.0.0:4317
        http:
          endpoint: 0.0.0.0:4318
  service:
    extensions:
      - health_check
    pipelines:
      logs:
        receivers:
          - otlp
        processors:
          - resource/add-cluster-name
          - infraattributes
        exporters:
          - datadog
      metrics:
        receivers:
          - otlp
          - datadog/connector
        processors:
          - resource/add-cluster-name
          - infraattributes
        exporters:
          - datadog
      traces:
        receivers:
          - otlp
        processors:
          - resource/add-cluster-name
          - infraattributes
        exporters:
          - datadog
          - datadog/connector
    telemetry:
      resource:
        k8s.cluster.name: ${env:K8S_CLUSTER_NAME}
extraEnvs:
  - name: DD_API_KEY
    valueFrom:
      secretKeyRef:
        key: api-key
        name: datadog-apikey
  - name: DD_SITE
    valueFrom:
      secretKeyRef:
        key: site
        name: datadog-apikey
  - name: DD_OTELCOLLECTOR_CONVERTER_FEATURES
    value: datadog,pprof,zpages,prometheus,infraattributes
  - name: K8S_CLUSTER_NAME
    value: <CLUSTER_NAME>
    # vvv Will no longer be necessary from 7.83.0 onwards vvv
  - name: DD_OTEL_STANDALONE
    value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    # vvv Will no longer be necessary from 7.82.0 onwards vvv
  - name: DD_OTELCOLLECTOR_ENABLED
    value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
ports:
  jaeger-compact:
    enabled: false
  jaeger-grpc:
    enabled: false
  jaeger-thrift:
    enabled: false
  zipkin:
    enabled: false
{{< /code-block >}}

{{% /collapse-content %}}

[1]: https://github.com/open-telemetry/opentelemetry-helm-charts/blob/main/charts/opentelemetry-collector/README.md
[2]: /ko/getting_started/site/
[3]: /ko/containers/guide/changing_container_registry/
{{% /tab %}}
{{< /tabs >}}

### Collector 배포 {#deploy-the-collector}

{{< tabs >}}
{{% tab "Operator" %}}
`node-collector.yaml` 파일을 적용하여 `OpenTelemetryCollector` 리소스를 생성하세요. Operator는 Collector를 DaemonSet로 배포하여 노드당 하나의 인스턴스를 실행합니다.

```shell
kubectl apply -f node-collector.yaml
```
{{% /tab %}}
{{% tab "Helm" %}}
값 파일을 사용하여 OpenTelemetry Collector 차트를 설치하세요.

```shell
helm install node-collector open-telemetry/opentelemetry-collector -f node-collector-values.yaml
```

이후 변경 사항을 적용하려면 `helm upgrade node-collector open-telemetry/opentelemetry-collector -f node-collector-values.yaml`을 실행하세요.
{{% /tab %}}
{{< /tabs >}}

## DDOT와 함께 코어 Datadog Agent 설치 {#install-the-core-datadog-agent-alongside-ddot}

독립형 DDOT Collector와 동일한 노드에서 코어 Datadog Agent를 실행하려는 경우(예: DDOT가 OTLP 수집을 처리하는 동안 코어 Agent를 통해 인프라 메트릭, APM 또는 로그를 수집하려는 경우) [Datadog Operator][57]를 사용하여 별도로 설치할 수 있습니다.

기본적으로 Datadog Operator Helm 차트는 <code>DatadogAgent</code> 리소스를 Operator가 설치된 네임스페이스에서만 감시합니다(<code>watchNamespaces: []</code>). 만약 <code>DatadogAgent</code> 리소스가 Operator와 다른 네임스페이스에 있는 경우(예: <code>OpenTelemetryCollector</code> 리소스의 네임스페이스와 분리하려는 경우), <code>watchNamespaces</code> 를 <code>DatadogAgent</code> 리소스가 생성된 네임스페이스를 포함하도록 설정하세요.
<pre><code>helm upgrade datadog-operator datadog/datadog-operator \
  -n &lt;OPERATOR_NAMESPACE&gt; \
  --reuse-values \
  --set 'watchNamespaces[0]=&lt;DATADOG_AGENT_NAMESPACE&gt;'
</code></pre>
Operator가 <code>DatadogAgent</code> 리소스가 생성된 네임스페이스를 감시하지 않을 경우, 해당 리소스는 오류, Kubernetes 이벤트, 문제를 나타내는 상태 업데이트 없이 조용히 조정에 실패합니다.

## Datadog으로 텔레메트리 전송 {#send-your-telemetry-to-datadog}

텔레메트리 데이터를 Datadog으로 전송하려면 다음 단계를 따르세요.

1. [애플리케이션 계측](#instrument-the-application)
2. [애플리케이션 구성](#configure-the-application)
3. [관측 가능성 데이터 상호 연결](#correlate-observability-data)
4. [애플리케이션 실행](#run-the-application)

### 애플리케이션 계측 {#instrument-the-application}

[OpenTelemetry API를 사용][12]하여 애플리케이션을 계측합니다.

{{% collapse-content title="OpenTelemetry API로 계측된 예시 애플리케이션" level="p" %}}
예시로 이미 계측이 완료된 [Calendar 샘플 애플리케이션][9]을 사용할 수 있습니다. 다음 코드에서는 OpenTelemetry 주석 및 API를 사용하여 [CalendarService.getDate()][10] 메서드를 계측합니다.
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

애플리케이션 컨테이너는 동일한 노드에서 실행 중인 DDOT Collector로 데이터를 전송해야 합니다. Collector가 `hostPort`를 통해 노드에서 OTLP 포트를 게시하므로 애플리케이션은 노드의 IP 주소(`status.hostIP`)를 통해 로컬 Collector에 도달할 수 있습니다.

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

### 관측 가능성 데이터 상호 연결 {#correlate-observability-data}

[Unified Service Tagging][14]은 Datadog에서 관측 가능성 데이터를 서로 연결하여 일관된 태그로 메트릭, 트레이스 및 로그를 탐색할 수 있도록 해줍니다.

컨테이너화된 환경에서는 OpenTelemetry Resource Attributes 환경 변수를 사용하여 `env`, `service`, `version`을 설정합니다. DDOT Collector는 이러한 태깅 구성을 탐지하고 컨테이너에서 수집한 데이터에 적용합니다.

애플리케이션의 배포 매니페스트에 다음 환경 변수를 추가하세요.

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

### 애플리케이션 실행 {#run-the-application}

배포 매니페스트 변경 사항을 적용하기 위해 애플리케이션을 다시 배포합니다. 업데이트된 구성이 활성화되면 Unified Service Tagging이 메트릭, 트레이스, 로그에 대해 완전히 활성화됩니다.

## Datadog에서 관측 가능성 데이터 살펴보기 {#explore-observability-data-in-datadog}

Datadog을 사용하여 애플리케이션의 관측 가능성 데이터를 살펴볼 수 있습니다.

### Fleet Automation {#fleet-automation}

Collector 구성을 살펴보세요.

{{< img src="/opentelemetry/embedded_collector/fleet_automation.png" alt="Fleet Automation 페이지에서 Collector 구성을 검토하세요." style="width:100%;" >}}

### Live Container Monitoring {#live-container-monitoring}

Live Container Monitoring 기능을 사용하여 컨테이너 상태를 모니터링하세요.

{{< img src="/opentelemetry/embedded_collector/containers.png" alt="Containers 페이지에서 컨테이너 상태를 모니터링하세요." style="width:100%;" >}}

### 인프라 노드 상태 {#infrastructure-node-health}

런타임 및 인프라 메트릭을 조회하여 노드 성능을 시각화, 모니터링 및 측정하세요.

{{< img src="/opentelemetry/embedded_collector/infrastructure.png" alt="Host List에서 런타임 및 인프라 메트릭을 조회하세요." style="width:100%;" >}}

### 로그 {#logs}

로그를 조회하여 애플리케이션 및 시스템 작동 문제를 모니터링 및 해결하세요.

{{< img src="/opentelemetry/embedded_collector/logs.png" alt="Log Explorer에서 로그를 조회하세요." style="width:100%;" >}}

### 트레이스 {#traces}

트레이스와 스팬을 조회하여 애플리케이션이 처리하는 요청의 상태 및 성능을 관찰할 수 있습니다. 동일한 트레이스 내에서 인프라 메트릭도 함께 연관되어 표시됩니다.

{{< img src="/opentelemetry/embedded_collector/traces.png" alt="Trace Explorer에서 트레이스를 조회하세요." style="width:100%;" >}}

### 런타임 메트릭 {#runtime-metrics}

애플리케이션의 런타임(JVM) 메트릭을 모니터링하세요.

{{< img src="/opentelemetry/embedded_collector/metrics.png" alt="JVM Metrics 대시보드에서 JVM 메트릭을 조회하세요." style="width:100%;" >}}

### Collector 상태 메트릭 {#collector-health-metrics}

DDOT Collector의 메트릭을 조회하여 Collector 상태를 모니터링하세요.

{{< img src="/opentelemetry/embedded_collector/dashboard.png" alt="OTel 대시보드에서 Collector 상태 메트릭을 조회하세요." style="width:100%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: https://opentelemetry.io/docs/platforms/kubernetes/helm/collector/
[5]: https://kubernetes.io/docs/tasks/tools/#kubectl
[9]: https://github.com/DataDog/opentelemetry-examples/tree/main/apps/rest-services/java/calendar
[10]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/src/main/java/com/otel/service/CalendarService.java#L27-L48
[12]: /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[14]: /ko/getting_started/tagging/unified_service_tagging
[52]: /ko/getting_started/site/
[54]: https://helm.sh
[55]: https://opentelemetry.io/docs/platforms/kubernetes/operator/
[56]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[57]: /ko/getting_started/containers/datadog_operator/