---
aliases:
- /ko/agent/guide/dual-shipping
further_reading:
- link: /agent/configuration/network/
  tag: 가이드
  text: 네트워크 트래픽
title: 이중 전달
---

<div class="alert alert-danger">
데이터를 Datadog 조직 여러 곳에 보내는 경우 이중 전달 때문에 요금에 영향을 미칠 수 있습니다. 이 설정이 어떤 영향을 미치는 지에 대한 자세한 내용은 <a href="/help/">Datadog 지원팀</a>에 문의하세요.
</div>

## 개요

데이터를 두 개 이상의 대상, 예를 들어 두 번째 Datadog 조직 또는 다른 내부 인프라스트럭처로 보내려는 경우 추가 엔드포인트로 데이터를 보내도록 에이전트를 설정할 수 있습니다. 여러 엔드포인트 또는 API 키로 다양한 종류의 데이터를 보내도록 에이전트를 설정하려면 아래 설정을 사용합니다.

네트워크 트래픽 대상의 전체 목록은 [네트워크 트래픽][1]을 참고하세요.

## 메트릭 및 서비스 점검

`datadog.yaml`에 YAML 설정을 추가하거나 적절한 환경 변수를 사용하여 에이전트를 시작할 수 있습니다.

### YAML 설정

에이전트 버전 >= 6.17 또는 7.17이 필요합니다.

`datadog.yaml`에서 다음을 실행하세요.

```yaml
additional_endpoints:
  "https://app.datadoghq.com":
  - apikey2
  - apikey3
  "https://app.datadoghq.eu":
  - apikey4
```

### 환경 변수 설정

에이전트 버전 >= 6.18 또는 7.18이 필요합니다.

```bash
DD_ADDITIONAL_ENDPOINTS='{\"https://app.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://app.datadoghq.eu\": [\"apikey4\"]}'
```

## APM

### YAML 설정

에이전트 버전 >= 6.7.0을 요청합니다.

`datadog.yaml`에서 다음을 실행하세요.
```yaml
apm_config:
  [...]
  additional_endpoints:
    "https://trace.agent.datadoghq.com":
    - apikey2
    - apikey3
    "https://trace.agent.datadoghq.eu":
    - apikey4
```

### 환경 변수 구성

에이전트 버전 >= 6.19 or 7.19이 필요합니다.

```bash
DD_APM_ADDITIONAL_ENDPOINTS='{\"https://trace.agent.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://trace.agent.datadoghq.eu\": [\"apikey4\"]}'
```

## 지속적인 프로파일러

### YAML 구성

에이전트 버전 >= 6.7.0이 필요합니다.

`datadog.yaml`에서 다음을 실행합니다.

```yaml
apm_config:
  [...]
  profiling_additional_endpoints:
    "https://intake.profile.datadoghq.com/api/v2/profile":
    - apikey2
    - apikey3
    "https://intake.profile.datadoghq.eu/api/v2/profile":
    - apikey4
```

### 환경 변수 구성

에이전트 버전 >= 6.19 or 7.19이 필요합니다.

```bash
DD_APM_PROFILING_ADDITIONAL_ENDPOINTS='{\"https://intake.profile.datadoghq.com/api/v2/profile\": [\"apikey2\", \"apikey3\"], \"https://intake.profile.datadoghq.eu/api/v2/profile\": [\"apikey4\"]}'
```

**참고:** 연속적인 프로파일러 제품에 엔드포인트를 추가하는 것은 최선형으로 전달됩니다.
* 주요 엔드포인트의 우선 순위가 가장 높습니다. 추가 엔드포인트 업로드는 주요 엔드포인트 업로드가 성공적으로 완료된 후에만 처리됩니다.
* 추가 엔드포인트 응답은 프로파일러로 다시 전달되지 않습니다. 추가 엔드포인트로 전달되는 동안 발생한 모든 오류는 에이전트 오류 로그에 기록됩니다.

## 실시간 프로세스

### YAML 설정

에이전트 버전 >= 6.4.0이 필요합니다.

`datadog.yaml`에서 다음을 실행합니다.
```yaml
process_config:
  [...]
  additional_endpoints:
    "https://process.datadoghq.com":
    - apikey2
    - apikey3
    "https://process.datadoghq.eu":
    - apikey4
```

### 환경 변수 구성

에이전트 버전 >= 6.20 or 7.20이 필요합니다.

```bash
DD_PROCESS_ADDITIONAL_ENDPOINTS='{\"https://process.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://process.datadoghq.eu\": [\"apikey4\"]}'
```

## 클러스터 에이전트 메트릭

Kubernetes 상태 메트릭 코어와 같은 클러스터 에이전트 메트릭을 추가 엔드포인트로 보내도록 에이전트를 설정합니다.

### HELM 구성
Datadog `values.yaml`에서 다음을 실행합니다.
```yaml
clusterAgent:
  env:
    - name: DD_ADDITIONAL_ENDPOINTS
      value: '{"https://app.datadoghq.com": ["apikey2"]}'
```
### 클러스터 에이전트 메트릭 공급자

자동 크기 조정이 실패하지 않도록 하려면 Datadog 리전 여러 곳에 데이터를 이중 전달할 경우에도 HPA 메트릭 쿼리가 실행되도록 클러스터 에이전트를 구성하세요. 여러 엔드포인트에 Datadog 클러스터 에이전트 매니페스트를 구성하세요.

{{< code-block lang="yaml" filename="cluster-agent-deployment.yaml" collapsible="true" >}}
external_metrics_provider:
  endpoints:
  - api_key: <DATADOG_API_KEY>
    app_key: <DATADOG_APP_KEY>
    url: https://app.datadoghq.eu
  - api_key: <DATADOG_API_KEY>
    app_key: <DATADOG_APP_KEY>
    url: https://app.datadoghq.com
{{< /code-block >}}

## 오케스트레이터

### HELM 구성
Datadog `values.yaml`에서 다음을 실행하세요.
```yaml
agents:
  customAgentConfig:
    process_config:
      additional_endpoints:
        "https://process.datadoghq.com":
        - apikey2
    orchestrator_explorer:
      orchestrator_additional_endpoints:
        "https://orchestrator.datadoghq.com":
        - apikey2 

clusterAgent:
...
  datadog_cluster_yaml:
    orchestrator_explorer:
      orchestrator_additional_endpoints:
        "https://orchestrator.ddog-gov.com":
        - apikey2 
```


### 환경 변수 구성

```bash
DD_ORCHESTRATOR_EXPLORER_ORCHESTRATOR_ADDITIONAL_ENDPOINTS='{\"https://orchestrator.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://orchestrator.datadoghq.eu\": [\"apikey4\"]}'
```

## CI 가시성

### YAML 구성

에이전트 버전 >= 6.38 or 7.38이 필요합니다.

`datadog.yaml`에서 다음을 실행하세요.
```yaml
evp_proxy_config:
  [...]
  additional_endpoints:
    "https://<VERSION>-app.agent.datadoghq.com":
    - apikey2
    - apikey3
    "https://<VERSION>-app.agent.datadoghq.eu":
    - apikey4
```

### 환경 변수 구성

```bash
DD_EVP_PROXY_CONFIG_ADDITIONAL_ENDPOINTS='{\"https://<VERSION>-app.agent.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://<VERSION>-app.agent.datadoghq.eu\": [\"apikey4\"]}'
```

## 로그

TCP을 사용하려면 에이전트 버전 > = 6.6이 필요합니다.<br/>
HTTPS을 사용하려면 에이전트 버전 >= 6.13이 필요합니다.

### YAML 구성
`datadog.yaml`에서 다음을 실행합니다.
```yaml
logs_config:
  use_http: true
  additional_endpoints:
  - api_key: "apiKey2"
    Host: "agent-http-intake.logs.datadoghq.com"
    Port: 443
    is_reliable: true
```

### 환경 변수 구성

에이전트 버전 >= 6.18 or 7.18이 필요합니다.

```bash
DD_LOGS_CONFIG_USE_HTTP=true
DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"agent-http-intake.logs.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## 데이터베이스 모니터링

### YAML 구성

에이전트 버전 >= 6.29 or 7.29이 필요합니다.

`datadog.yaml`에서 다음을 실행합니다.
```yaml
database_monitoring:
  samples:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "dbm-metrics-intake.datadoghq.com"
      Port: 443
      is_reliable: true
  activity:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "dbquery-intake.datadoghq.com"
      Port: 443
      is_reliable: true
  metrics:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "dbm-metrics-intake.datadoghq.com"
      Port: 443
      is_reliable: true
```

### 환경 변수 구성

```bash
DD_DATABASE_MONITORING_SAMPLES_USE_HTTP=true
DD_DATABASE_MONITORING_SAMPLES_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"dbm-metrics-intake.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
DD_DATABASE_MONITORING_ACTIVITY_USE_HTTP=true
DD_DATABASE_MONITORING_ACTIVITY_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"dbquery-intake.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
DD_DATABASE_MONITORING_METRICS_USE_HTTP=true
DD_DATABASE_MONITORING_METRICS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"dbm-metrics-intake.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## 네트워크 장치

### YAML 구성

에이전트 버전 >= 6.29 or 7.29가 필요합니다.

`datadog.yaml`에서 다음을 실행합니다.
```yaml
network_devices:
  metadata:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "ndm-intake.datadoghq.com"
      Port: 443
      is_reliable: true
  snmp_traps:
    forwarder:
      use_http: true
      additional_endpoints:
      - api_key: "apiKey2"
        Host: "ndm-intake.datadoghq.com"
        Port: 443
        is_reliable: true
  netflow:
    forwarder:
      use_http: true
      additional_endpoints:
      - api_key: "apiKey2"
        Host: "ndm-intake.datadoghq.com"
        Port: 443
        is_reliable: true
```

### 환경 변수 구성

```bash
DD_NETWORK_DEVICES_METADATA_USE_HTTP=true
DD_NETWORK_DEVICES_METADATA_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"ndm-intake.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## 클라우드 보안 관리 설정이 잘못되었을 경우

### YAML 구성

`datadog.yaml`에서 다음을 실행합니다.
```yaml
compliance_config:
  endpoints:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "https://<VERSION>-app.agent.datadoghq.eu"
      Port: 443
      is_reliable: true
```

### 환경 변수 구성

```bash
DD_COMPLIANCE_CONFIG_ENDPOINTS_USE_HTTP=true
DD_COMPLIANCE_CONFIG_ENDPOINTS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://<VERSION>-app.agent.datadoghq.eu\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## 클라우드 보안 관리 위협

### YAML 구성
`datadog.yaml`에서 다음을 실행합니다.
```yaml
runtime_security_config:
  endpoints:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "https://<VERSION>-app.agent.datadoghq.eu"
      Port: 443
      is_reliable: true
```

### 환경 변수 구성

```bash
DD_RUNTIME_SECURITY_CONFIG_ENDPOINTS_USE_HTTP=true
DD_RUNTIME_SECURITY_CONFIG_ENDPOINTS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://<VERSION>-app.agent.datadoghq.eu\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Kubernetes 이중 전달

[Datadog 에이전트 Helm 차트]를 사용하는 경우 이 설정을 configmap으로 구성해야 합니다. `values.yaml`에서 `useConfigMap: true`로 설정하고 `customAgentConfig`에 관련 설정을 추가하세요.

```yaml
# agents.useConfigMap -- Configures a configmap을 구성해 에이전트 구성을 제공. `agents.customAgentConfig` 파라미터와 함께 이 조합을 사용하세요.
  useConfigMap:  true

  # agents.customAgentConfig -- Datadog 에이전트 config의 커스텀 내용 지정(datadog.yaml)
  ## ref: https://docs.datadoghq.com/agent/configuration/agent-configuration-files/?tab=agentv6
  ## ref: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
  ## 이 파라미터에서는 `agents.useConfigMap`을 `true`로 설정해야 적용됩니다.
  customAgentConfig:
    additional_endpoints:
      "https://app.datadoghq.com":
      - apikey2
      - apikey3
      "https://app.datadoghq.eu":
      - apikey4

    logs_config:
      use_http: true
      additional_endpoints:
      - api_key: "apiKey2"
        Host: "{{< region-param key=agent_http_endpoint >}}"
        Port: 443
        is_reliable: true
```

[Datadog 에이전트 운영자][3]를 사용하는 경우에도 `agent.customConfig.configData` 키를 설정할 수 있습니다. 구성 가능한 모든 키를 보려면 [v1][4]와 [v2][5] 설명서를 참고하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/configuration/network/
[2]: https://github.com/DataDog/helm-charts
[3]: https://github.com/DataDog/datadog-operator
[4]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v1alpha1.md
[5]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md