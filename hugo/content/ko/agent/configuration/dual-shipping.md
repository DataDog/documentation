---
aliases:
- /ko/agent/guide/dual-shipping
description: Datadog Agent를 구성하여 메트릭, 로그, 트레이스를 여러 Datadog 조직에 동시에 전송하세요.
further_reading:
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: 블로그
  text: DDOT 게이트웨이를 통해 OpenTelemetry 파이프라인을 중앙에서 관리 및 제어
- link: /agent/configuration/network/
  tag: 가이드
  text: 네트워크 트래픽
- link: /observability_pipelines/
  tag: 설명서
  text: Observability Pipelines를 사용하여 로그를 외부 대상으로 전송하세요.
title: 이중 전송
---
<div class="alert alert-warning">
여러 Datadog 조직으로 데이터를 전송하는 경우 이중 전송(dual shipping)이 청구에 영향을 줄 수 있습니다. 이 구성의 영향에 대한 자세한 내용은 <a href="/help/">Datadog 지원 팀</a>에 문의하세요.
</div>

## 개요 {#overview}

이 가이드는 여러 Datadog 조직 및 사이트로 다양한 유형의 데이터(예: APM, 로그, Cluster Agent 메트릭)를 이중 전송하는 Agent 구성 예제를 제공합니다. Datadog 사이트에 대한 자세한 내용은 [Datadog 사이트 시작하기][3]를 참조하세요.

**참고**: 로그를 이중 전송하거나 서로 다른 로깅 공급업체, 클라우드 스토리지 또는 SIEM 공급자 간에 로그 트래픽을 분할하려면 [Observability Pipelines][1]를 사용하세요.

네트워크 트래픽 대상의 전체 목록은 [네트워크 트래픽][2]을 참조하세요.

## 메트릭 및 서비스 체크 {#metrics-and-service-checks}

YAML 구성을 `datadog.yaml`에 추가하거나 적절한 환경 변수를 사용하여 Agent를 실행할 수 있습니다.

### YAML 구성 {#yaml-configuration}

Agent 버전이 6.17 이상 또는 7.17 이상이어야 합니다.

`datadog.yaml`에서:

```yaml
additional_endpoints:
  "https://app.{{< region-param key="dd_site">}}":
  - apikey2
  - apikey3
  "https://app.<DD_SITE>": # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
  - apikey4
```

### 환경 변수 구성 {#environment-variable-configuration}

Agent 버전이 6.18 이상 또는 7.18 이상이어야 합니다.

```bash
DD_ADDITIONAL_ENDPOINTS='{\"https://app.{{< region-param key="dd_site">}}\": [\"apikey2\", \"apikey3\"], \"https://app.<DD_SITE>\": [\"apikey4\"]}' # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
```

## APM {#apm}

### YAML 구성 {#yaml-configuration-1}

에이전트 버전 >= 6.7.0을 요청합니다.

`datadog.yaml`에서:

```yaml
apm_config:
  [...]
  additional_endpoints:
    "https://trace.agent.{{< region-param key="dd_site">}}":
    - apikey2
    - apikey3
    "https://trace.agent.<DD_SITE>": # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
    - apikey4
```

### 환경 변수 구성 {#environment-variable-configuration-1}

Agent 버전이 6.19 이상 또는 7.19 이상이어야 합니다.

```bash
DD_APM_ADDITIONAL_ENDPOINTS='{\"https://trace.agent.{{< region-param key="dd_site">}}\": [\"apikey2\", \"apikey3\"], \"https://trace.agent.<DD_SITE>\": [\"apikey4\"]}' # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
```

## Continuous Profiler {#continuous-profiler}

### YAML 구성 {#yaml-configuration-2}

에이전트 버전 >= 6.7.0을 요청합니다.

`datadog.yaml`에서:

```yaml
apm_config:
  [...]
  profiling_additional_endpoints:
    "https://intake.profile.{{< region-param key="dd_site">}}/api/v2/profile":
    - apikey2
    - apikey3
    "https://intake.profile.<DD_SITE>/api/v2/profile": # Replace "<DD_SITE>" with your Datadog site parameter (for example, datadoghq.eu).
    - apikey4
```

### 환경 변수 구성 {#environment-variable-configuration-2}

Agent 버전이 6.19 이상 또는 7.19 이상이어야 합니다.

```bash
DD_APM_PROFILING_ADDITIONAL_ENDPOINTS='{\"https://intake.profile.{{< region-param key="dd_site">}}/api/v2/profile\": [\"apikey2\", \"apikey3\"], \"https://intake.profile.<DD_SITE>/api/v2/profile\": [\"apikey4\"]}' # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
```

**참고:** Continuous Profiler 제품에 대한 추가 엔드포인트로의 업로드는 가능한 범위 내에서 전송됩니다.
* 메인 엔드포인트의 우선순위가 가장 높습니다. 추가 엔드포인트로의 업로드는 메인 엔드포인트로의 업로드가 성공적으로 완료된 후에만 처리됩니다.
* 추가 엔드포인트의 응답은 프로파일러로 다시 전달되지 않습니다. 추가 엔드포인트로 전달하는 동안 발생하는 모든 오류는 Agent 오류 로그에 기록됩니다.

## Live Processes {#live-processes}

### YAML 구성 {#yaml-configuration-3}

Agent 버전이 6.4.0 이상이어야 합니다.

`datadog.yaml`에서:

```yaml
process_config:
  [...]
  additional_endpoints:
    "https://process.{{< region-param key="dd_site">}}":
    - apikey2
    - apikey3
    "https://process.<DD_SITE>": # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
    - apikey4
```

### 환경 변수 구성 {#environment-variable-configuration-3}

Agent 버전이 6.20 이상 또는 7.20 이상이어야 합니다.

```bash
DD_PROCESS_ADDITIONAL_ENDPOINTS='{\"https://process.{{< region-param key="dd_site">}}\": [\"apikey2\", \"apikey3\"], \"https://process.<DD_SITE>\": [\"apikey4\"]}' # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
```

## Cluster Agent 메트릭 {#cluster-agent-metrics}

Kubernetes State Metrics Core와 같은 Cluster Agent 메트릭을 추가 엔드포인트로 보내도록 Agent를 구성하세요.

### HELM 구성 {#helm-configuration}
Datadog `values.yaml`에서:

```yaml
clusterAgent:
  env:
    - name: DD_ADDITIONAL_ENDPOINTS
      value: '{"https://app.{{< region-param key="dd_site">}}": ["apikey2"]}'
```
### Cluster Agent 메트릭 공급자 {#cluster-agent-metrics-provider}

자동 크기 조정이 장애 발생 시에도 안정적으로 작동하도록 하려면 이중 전송된 데이터를 사용하여 여러 Datadog 리전에 대해 HPA용 메트릭 쿼리를 실행하도록 Cluster Agent를 구성하세요. 여러 엔드포인트를 사용하여 Datadog Cluster Agent 매니페스트를 구성하세요.

{{< code-block lang="yaml" filename="cluster-agent-deployment.yaml" collapsible="true" >}}
external_metrics_provider:
  endpoints:
  - api_key: <DATADOG_API_KEY>
    app_key: <DATADOG_APP_KEY>
    url: https://app.<DD_SITE>
  - api_key: <DATADOG_API_KEY>
    app_key: <DATADOG_APP_KEY>
    url: https://app.<DD_SITE>
{{< /code-block >}}

## 오케스트레이터 {#orchestrator}

### HELM 구성 {#helm-configuration-1}
Datadog `values.yaml`에서:

```yaml
agents:
  customAgentConfig:
    process_config:
      additional_endpoints:
        "https://process.{{< region-param key="dd_site">}}":
        - apikey2
    orchestrator_explorer:
      orchestrator_additional_endpoints:
        "https://orchestrator.{{< region-param key="dd_site">}}":
        - apikey3

clusterAgent:
...
  datadog_cluster_yaml:
    orchestrator_explorer:
      orchestrator_additional_endpoints:
        "https://orchestrator.<DD_SITE>": # Replace <DD_SITE> with your Datadog site parameter (for example, ddog-gov.com).
        - apikey4
```

### 환경 변수 구성 {#environment-variable-configuration-4}

```bash
DD_ORCHESTRATOR_EXPLORER_ORCHESTRATOR_ADDITIONAL_ENDPOINTS='{\"https://orchestrator.{{< region-param key="dd_site">}}\": [\"apikey2\", \"apikey3\"], \"https://orchestrator.<DD_SITE>\": [\"apikey4\"]}' # Replace <DD_SITE> with your Datadog site parameter (for example, ddog-gov.com).
```

## CI Visibility {#ci-visibility}

### YAML 구성 {#yaml-configuration-4}

Agent 버전이 6.38 이상 또는 7.38 이상이어야 합니다.

`datadog.yaml`에서:

```yaml
evp_proxy_config:
  [...]
  additional_endpoints:
    "https://<VERSION>-app.agent.{{< region-param key="dd_site">}}":
    - apikey2
    - apikey3
    "https://<VERSION>-app.agent.<DD_SITE>":  # Replace <VERSION> and <DD_SITE> with your Agent version and Datadog site parameter (for example, 7-38-0 and datadoghq.eu).
    - apikey4
```

### 환경 변수 구성 {#environment-variable-configuration-5}

```bash
DD_EVP_PROXY_CONFIG_ADDITIONAL_ENDPOINTS='{\"https://<VERSION>-app.agent.{{< region-param key="dd_site">}}\": [\"apikey2\", \"apikey3\"], \"https://<VERSION>-app.agent.<DD_SITE>\": [\"apikey4\"]}'  # Replace <VERSION> and <DD_SITE> with your Agent version and Datadog site parameter (for example, 7-38-0 and datadoghq.eu).
```

## 로그 {#logs}

여러 Datadog 조직으로 로그를 이중 전송하려면 Agent를 사용하세요. 로그를 Datadog 및 외부 대상으로 보내려면 [Observability Pipelines][2]를 사용하세요.

TCP는 Agent 버전이 6.6 이상이어야 합니다.<br/>
HTTPS는 Agent 버전이 6.13 이상이어야 합니다.

### YAML 구성 {#yaml-configuration-5}
`datadog.yaml`에서:

```yaml
logs_config:
  force_use_http: true
  additional_endpoints:
  - api_key: "apiKey2"
    Host: "agent-http-intake.logs.{{< region-param key="dd_site">}}"
    Port: 443
    is_reliable: true
```

### 환경 변수 구성 {#environment-variable-configuration-6}

Agent 버전이 6.18 이상 또는 7.18 이상이어야 합니다.

```bash
DD_LOGS_CONFIG_FORCE_USE_HTTP=true
DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"agent-http-intake.logs.{{< region-param key="dd_site">}}\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Database Monitoring {#database-monitoring}

### YAML 구성 {#yaml-configuration-6}

Agent 버전이 6.29 이상 또는 7.29 이상이어야 합니다.

`datadog.yaml`에서:

```yaml
database_monitoring:
  samples:
    force_use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "dbm-metrics-intake.{{< region-param key="dd_site">}}"
      Port: 443
      is_reliable: true
  activity:
    force_use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "dbquery-intake.{{< region-param key="dd_site">}}"
      Port: 443
      is_reliable: true
  metrics:
    force_use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "dbm-metrics-intake.{{< region-param key="dd_site">}}"
      Port: 443
      is_reliable: true
```

### 환경 변수 구성 {#environment-variable-configuration-7}

```bash
DD_DATABASE_MONITORING_SAMPLES_USE_HTTP=true
DD_DATABASE_MONITORING_SAMPLES_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"dbm-metrics-intake.{{< region-param key="dd_site">}}\", \"Port\": 443, \"is_reliable\": true}]"
DD_DATABASE_MONITORING_ACTIVITY_USE_HTTP=true
DD_DATABASE_MONITORING_ACTIVITY_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"dbquery-intake.{{< region-param key="dd_site">}}\", \"Port\": 443, \"is_reliable\": true}]"
DD_DATABASE_MONITORING_METRICS_USE_HTTP=true
DD_DATABASE_MONITORING_METRICS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"dbm-metrics-intake.{{< region-param key="dd_site">}}\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## 네트워크 장치 {#network-devices}

### YAML 구성 {#yaml-configuration-7}

Agent 버전이 6.29 이상 또는 7.29 이상이어야 합니다.

`datadog.yaml`에서:

```yaml
network_devices:
  metadata:
    force_use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "ndm-intake.{{< region-param key="dd_site">}}"
      Port: 443
      is_reliable: true
  snmp_traps:
    forwarder:
      force_use_http: true
      additional_endpoints:
      - api_key: "apiKey2"
        Host: "ndm-intake.{{< region-param key="dd_site">}}"
        Port: 443
        is_reliable: true
  netflow:
    forwarder:
      force_use_http: true
      additional_endpoints:
      - api_key: "apiKey2"
        Host: "ndm-intake.{{< region-param key="dd_site">}}"
        Port: 443
        is_reliable: true
```

### 환경 변수 구성 {#environment-variable-configuration-8}

```bash
DD_NETWORK_DEVICES_METADATA_USE_HTTP=true
DD_NETWORK_DEVICES_METADATA_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"ndm-intake.{{< region-param key="dd_site">}}\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Network Path {#network-path}

### YAML 구성 {#yaml-configuration-8}

Agent 버전이 6.55 이상 또는 7.55 이상이어야 합니다.

`datadog.yaml`에서:

```yaml
network_path:
  forwarder:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "netpath-intake.{{< region-param key="dd_site">}}"
      Port: 443
      is_reliable: true
```

### 환경 변수 구성 {#environment-variable-configuration-9}

```bash
DD_NETWORK_PATH_FORWARDER_USE_HTTP=true
DD_NETWORK_PATH_FORWARDER_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"netpath-intake.{{< region-param key="dd_site">}}\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Cloud Security Misconfigurations {#cloud-security-misconfigurations}

### YAML 구성 {#yaml-configuration-9}

`datadog.yaml`에서:

```yaml
compliance_config:
  endpoints:
    force_use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      host: "cspm-intake.{{< region-param key="dd_site">}}.:443"
      is_reliable: true
```

### 환경 변수 구성 {#environment-variable-configuration-10}

```bash
DD_COMPLIANCE_CONFIG_ENDPOINTS_USE_HTTP=true
DD_COMPLIANCE_CONFIG_ENDPOINTS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"host\": \"cspm-intake.{{< region-param key="dd_site">}}.:443\", \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Workload Protection {#workload-protection}

### YAML 구성 {#yaml-configuration-10}
`datadog.yaml`에서:

```yaml
runtime_security_config:
  endpoints:
    force_use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      host: "cws-intake.{{< region-param key="dd_site">}}.:443"
      is_reliable: true
```

### 환경 변수 구성 {#environment-variable-configuration-11}

```bash
DD_RUNTIME_SECURITY_CONFIG_ENDPOINTS_USE_HTTP=true
DD_RUNTIME_SECURITY_CONFIG_ENDPOINTS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"host\": \"cws-intake.{{< region-param key="dd_site">}}.:443\", \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Kubernetes에서의 이중 전송 {#dual-shipping-in-kubernetes}

{{< tabs >}} {{% tab "Helm" %}}

[Datadog Agent Helm 차트][1]를 사용하는 경우, configmap으로 이러한 설정을 구성할 수 있습니다. `values.yaml`에서 `useConfigMap: true`를 설정하고
`customAgentConfig`에 관련 설정을 추가합니다.

```yaml
# agents.useConfigMap -- Configures a configmap to provide the agent configuration. Use this in combination with the `agents.customAgentConfig` parameter.
  useConfigMap:  true

  # agents.customAgentConfig -- Specify custom contents for the datadog agent config (datadog.yaml)
  ## ref: https://docs.datadoghq.com/agent/configuration/agent-configuration-files/?tab=agentv6
  ## ref: https://github.com/DataDog/datadog-agent/tree/main/pkg/config/example
  ## Note the `agents.useConfigMap` needs to be set to `true` for this parameter to be taken into account.
  customAgentConfig:
    additional_endpoints:
      "https://app.<DD_SITE>":  # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.com).
      - apikey2
      - apikey3
      "https://app.<DD_SITE>":  # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
      - apikey4

    logs_config:
      force_use_http: true
      additional_endpoints:
      - api_key: "apiKey2"
        Host: "agent-http-intake.logs.<DD_SITE>" # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.com).
        Port: 443
        is_reliable: true
```

`ConfigMap` 내부에 API 키가 일반 텍스트로 노출되는 것을 방지하려면 환경 변수 구성을 사용하고 Kubernetes 시크릿을 참조할 수도 있습니다. 다음은 추가 리전으로 메트릭을 전송하는 예입니다.

1. 이 가이드의 환경 변수 구성 값을 사용하여 Kubernetes 시크릿을 생성합니다.
    ```bash
    kubectl create -n <DATADOG AGENT NAMESPACE> secret generic dual-shipping --from-literal metrics='{"https://app.<DD_SITE>": ["apikey4"]}' # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
    ```
2. [Helm 차트 파라미터][2] `datadog.env` 또는 `datadog.envFrom`을 사용하여 구성에서 이 시크릿을 참조합니다.
    ```yaml
    datadog:
      [...]
      env:
      - name: DD_ADDITIONAL_ENDPOINTS
        valueFrom:
          secretKeyRef:
            name: dual-shipping
            key: metrics
    ```

[1]: https://github.com/DataDog/helm-charts
[2]: https://github.com/DataDog/helm-charts/blob/e1ec85127de74c8b876eef6a81bb1579d17b49bf/charts/datadog/values.yaml#L563-L578

{{% /tab %}}

{{% tab "Datadog Operator" %}}

[Datadog Agent operator][1]를 사용하는 경우, `[key].customConfigurations.[key].configData` [override][2] 키를 설정하여 이러한 설정을 지정할 수 있습니다. 아래 예시는 노드 Agent의 `datadog.yaml` 구성 파일을 대체하여 메트릭과 로그를 추가 리전으로 전송합니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      customConfigurations:
        datadog.yaml:
          ## Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.com (US1) for `apikey2` and `apikey3`, and datadoghq.eu (EU) for `apikey4`).
          configData: |-
            additional_endpoints:
              "https://app.<DD_SITE>":  
              - apikey2
              - apikey3
              "https://app.<DD_SITE>":  
              - apikey4
            logs_config:
              force_use_http: true
              additional_endpoints:
              - api_key: "apiKey2"
                Host: "agent-http-intake.logs.<DD_SITE>"
                Port: 443
                is_reliable: true
```

`ConfigMap` 내부에 API 키가 일반 텍스트로 노출되는 것을 방지하려면 환경 변수 구성을 사용하고 Kubernetes 시크릿을 참조할 수도 있습니다. 다음은 추가 리전으로 메트릭을 전송하는 예입니다.

1. 이 가이드의 환경 변수 구성 값을 사용하여 Kubernetes 시크릿을 생성합니다.
    ```bash
    kubectl create -n <DATADOG AGENT NAMESPACE> secret generic dual-shipping --from-literal metrics='{"https://app.<DD_SITE>": ["apikey4"]}'  # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
    ```
2. 구성에서 이 시크릿을 참조하려면 `[key].env` 매개변수를 사용합니다.
    ```yaml
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      override:
        nodeAgent:
          env:
          - name: DD_ADDITIONAL_ENDPOINTS
            valueFrom:
              secretKeyRef:
                name: dual-shipping
                key: metrics
    ```

[1]: https://github.com/DataDog/datadog-operator
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md

{{% /tab %}} {{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/observability_pipelines/
[2]: /ko/agent/configuration/network/
[3]: /ko/getting_started/site/#access-the-datadog-site