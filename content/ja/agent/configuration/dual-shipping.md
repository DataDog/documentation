---
aliases:
- /ja/agent/guide/dual-shipping
further_reading:
- link: /agent/configuration/network/
  tag: Guide
  text: Network Traffic
title: Dual Shipping
---

<div class="alert alert-danger">
複数の Datadog 組織にデータを送信している場合、デュアルシッピングは請求に影響を与える可能性があります。この構成の影響について詳しくは、<a href="/help/">Datadog サポート</a>にお問い合わせください。
</div>

## 概要

If you wish to send data to more than one destination, such as a second Datadog organization, you can configure the Agent to send data to additional endpoints. To set up the Agent to send different kinds of data to multiple endpoints or API keys, use the configurations below.

For a full list of network traffic destinations, see [Network Traffic][1].

## Metrics and service checks

YAML 構成を `datadog.yaml` に追加するか、適切な環境変数で Agent を起動します。

### YAML 構成

Requires Agent version >= 6.17 or 7.17.

`datadog.yaml` で:

```yaml
additional_endpoints:
  "https://app.datadoghq.com":
  - apikey2
  - apikey3
  "https://app.datadoghq.eu":
  - apikey4
```

### 環境変数コンフィギュレーション

Requires Agent version >= 6.18 or 7.18.

```bash
DD_ADDITIONAL_ENDPOINTS='{\"https://app.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://app.datadoghq.eu\": [\"apikey4\"]}'
```

## APM

### YAML 構成

Agent のバージョン 6.7.0 以上が必要です。

`datadog.yaml` で:
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

### 環境変数コンフィギュレーション

Requires Agent version >= 6.19 or 7.19.

```bash
DD_APM_ADDITIONAL_ENDPOINTS='{\"https://trace.agent.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://trace.agent.datadoghq.eu\": [\"apikey4\"]}'
```

## Continuous Profiler

### YAML 構成

Agent のバージョン 6.7.0 以上が必要です。

`datadog.yaml` で:

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

### 環境変数コンフィギュレーション

Requires Agent version >= 6.19 or 7.19.

```bash
DD_APM_PROFILING_ADDITIONAL_ENDPOINTS='{\"https://intake.profile.datadoghq.com/api/v2/profile\": [\"apikey2\", \"apikey3\"], \"https://intake.profile.datadoghq.eu/api/v2/profile\": [\"apikey4\"]}'
```

**注:** Continuous Profiler 製品の追加エンドポイントへのアップロードは、ベストエフォート型配信で行われます。
* メインエンドポイントが最も優先されます。追加のエンドポイントへのアップロードは、メインエンドポイントへのアップロードが正常に完了した後にのみ処理されます。
* 追加エンドポイントからの応答は、プロファイラーに転送されません。追加エンドポイントへの配信中に発生したエラーは、Agent のエラーログに記録されます。

## ライブプロセス

### YAML 構成

Requires Agent version >= 6.4.0.

`datadog.yaml` で:
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

### 環境変数コンフィギュレーション

Requires Agent version >= 6.20 or 7.20.

```bash
DD_PROCESS_ADDITIONAL_ENDPOINTS='{\"https://process.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://process.datadoghq.eu\": [\"apikey4\"]}'
```

## Cluster Agent metrics

Configure the Agent to send Cluster Agent metrics, such as Kubernetes State Metrics Core, to additional endpoints.

### HELM 構成
Datadog `values.yaml` で:
```yaml
clusterAgent:
  env:
    - name: DD_ADDITIONAL_ENDPOINTS
      value: '{"https://app.datadoghq.com": ["apikey2"]}'
```
### Cluster Agent metrics provider

To ensure autoscaling is resilient to failure, configure the Cluster Agent to run your metric queries for the HPA against your multiple Datadog regions with dual-shipped data. Configure the Datadog Cluster Agent manifest with several endpoints:

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

## オーケストレーター

### HELM 構成
Datadog `values.yaml` で:
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


### 環境変数コンフィギュレーション

```bash
DD_ORCHESTRATOR_EXPLORER_ORCHESTRATOR_ADDITIONAL_ENDPOINTS='{\"https://orchestrator.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://orchestrator.datadoghq.eu\": [\"apikey4\"]}'
```

## CI Visibility

### YAML 構成

Requires Agent >= 6.38 or 7.38.

`datadog.yaml` で:
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

### 環境変数コンフィギュレーション

```bash
DD_EVP_PROXY_CONFIG_ADDITIONAL_ENDPOINTS='{\"https://<VERSION>-app.agent.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://<VERSION>-app.agent.datadoghq.eu\": [\"apikey4\"]}'
```

## Logs

TCP requires Agent version >= 6.6.<br/>
HTTPS requires Agent version >= 6.13.

### YAML 構成
`datadog.yaml` で:
```yaml
logs_config:
  use_http: true
  additional_endpoints:
  - api_key: "apiKey2"
    Host: "agent-http-intake.logs.datadoghq.com"
    Port: 443
    is_reliable: true
```

### 環境変数コンフィギュレーション

Requires Agent >= 6.18 or 7.18.

```bash
DD_LOGS_CONFIG_USE_HTTP=true
DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"agent-http-intake.logs.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Database Monitoring

### YAML 構成

Requires Agent >= 6.29 or 7.29.

`datadog.yaml` で:
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

### 環境変数コンフィギュレーション

```bash
DD_DATABASE_MONITORING_SAMPLES_USE_HTTP=true
DD_DATABASE_MONITORING_SAMPLES_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"dbm-metrics-intake.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
DD_DATABASE_MONITORING_ACTIVITY_USE_HTTP=true
DD_DATABASE_MONITORING_ACTIVITY_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"dbquery-intake.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
DD_DATABASE_MONITORING_METRICS_USE_HTTP=true
DD_DATABASE_MONITORING_METRICS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"dbm-metrics-intake.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Network Devices

### YAML 構成

Requires Agent >= 6.29 or 7.29.

`datadog.yaml` で:
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

### 環境変数コンフィギュレーション

```bash
DD_NETWORK_DEVICES_METADATA_USE_HTTP=true
DD_NETWORK_DEVICES_METADATA_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"ndm-intake.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Cloud Security Management Misconfigurations

### YAML 構成

`datadog.yaml` で:
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

### 環境変数コンフィギュレーション

```bash
DD_COMPLIANCE_CONFIG_ENDPOINTS_USE_HTTP=true
DD_COMPLIANCE_CONFIG_ENDPOINTS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://<VERSION>-app.agent.datadoghq.eu\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Cloud Security Management Threats

### YAML 構成
`datadog.yaml` で:
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

### 環境変数コンフィギュレーション

```bash
DD_RUNTIME_SECURITY_CONFIG_ENDPOINTS_USE_HTTP=true
DD_RUNTIME_SECURITY_CONFIG_ENDPOINTS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://<VERSION>-app.agent.datadoghq.eu\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Kubernetes のデュアルシッピング

If you're using the [Datadog Agent Helm chart][2], you must configure these settings with a configmap. In the `values.yaml`, set `useConfigMap: true`
and add the relevant settings to `customAgentConfig`.

```yaml
# agents.useConfigMap -- Configures a configmap to provide the agent configuration. Use this in combination with the `agents.customAgentConfig` parameter.
  useConfigMap:  true

  # agents.customAgentConfig -- Specify custom contents for the datadog agent config (datadog.yaml)
  ## ref: https://docs.datadoghq.com/agent/configuration/agent-configuration-files/?tab=agentv6
  ## ref: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
  ## Note the `agents.useConfigMap` needs to be set to `true` for this parameter to be taken into account.
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

If you're using the [Datadog Agent operator][3], similarly, you can set the `agent.customConfig.configData` key. All configurable keys are documented in [v1][4] and [v2][5].

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/configuration/network/
[2]: https://github.com/DataDog/helm-charts
[3]: https://github.com/DataDog/datadog-operator
[4]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v1alpha1.md
[5]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md