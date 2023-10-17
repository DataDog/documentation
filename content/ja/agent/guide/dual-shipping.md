---
further_reading:
- link: /agent/guide/network/
  tag: ガイド
  text: ネットワークトラフィック
kind: ガイド
title: デュアルシッピング
---

<div class="alert alert-danger">
複数の Datadog 組織にデータを送信している場合、デュアルシッピングは請求に影響を与える可能性があります。この構成の影響について詳しくは、<a href="/help/">Datadog サポート</a>にお問い合わせください。
</div>

## 概要

2 つ目の Datadog 組織や他の内部インフラストラクチャーなど、複数の宛先にデータを送信したい場合、追加のエンドポイントにデータを送信するように Agent を構成することができます。複数のエンドポイントまたは API キーに異なる種類のデータを送信するように Agent を設定するには、以下の構成を使用します。

ネットワークトラフィックの宛先は、[ネットワークトラフィック][1]を参照してください。

## メトリクスとサービスチェック

YAML 構成を `datadog.yaml` に追加するか、適切な環境変数で Agent を起動します。

### YAML 構成

Agent バージョン >= 6.17 または 7.17 が必要です。

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

Agent バージョン >= 6.18 または 7.18 が必要です。

```bash
DD_ADDITIONAL_ENDPOINTS='{\"https://app.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://app.datadoghq.eu\": [\"apikey4\"]}'
```

## APM

### YAML 構成

Agent バージョン >= 6.7.0 が必要です。

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

Agent バージョン >= 6.19 または 7.19 が必要です。

```bash
DD_APM_ADDITIONAL_ENDPOINTS='{\"https://trace.agent.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://trace.agent.datadoghq.eu\": [\"apikey4\"]}'
```

## Continuous Profiler

### YAML 構成

Agent バージョン >= 6.7.0 が必要です。

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

Agent バージョン >= 6.19 または 7.19 が必要です。

```bash
DD_APM_PROFILING_ADDITIONAL_ENDPOINTS='{\"https://intake.profile.datadoghq.com/api/v2/profile\": [\"apikey2\", \"apikey3\"], \"https://intake.profile.datadoghq.eu/api/v2/profile\": [\"apikey4\"]}'
```

**注:** Continuous Profiler 製品の追加エンドポイントへのアップロードは、ベストエフォート型配信で行われます。
* メインエンドポイントが最も優先されます。追加のエンドポイントへのアップロードは、メインエンドポイントへのアップロードが正常に完了した後にのみ処理されます。
* 追加エンドポイントからの応答は、プロファイラーに転送されません。追加エンドポイントへの配信中に発生したエラーは、Agent のエラーログに記録されます。

## ライブプロセス

### YAML 構成

Agent バージョン >= 6.4.0 が必要です。

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

Agent バージョン >= 6.20 または 7.20 が必要です。

```bash
DD_PROCESS_ADDITIONAL_ENDPOINTS='{\"https://process.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://process.datadoghq.eu\": [\"apikey4\"]}'
```

## オーケストレーター

### HELM 構成
Datadog `values.yaml` で:
```yaml
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

## CI Visibility （CI/CDの可視化）

### YAML 構成

Agent >= 6.38 または 7.38 が必要です。

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

## ログ管理

TCP には Agent バージョン >= 6.6 が必要です。<br/>
HTTPS には Agent バージョン >= 6.13 が必要です。

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

Agent >= 6.18 または 7.18 が必要です。

```bash
DD_LOGS_CONFIG_USE_HTTP=true
DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"agent-http-intake.logs.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## データベース モニタリング

### YAML 構成

Agent >= 6.29 または 7.29 が必要です。

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

Agent >= 6.29 または 7.29 が必要です。

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

[Datadog Agent Helm チャート](https://github.com/DataDog/helm-charts)を使用している場合、これらの設定を configmap で構成する必要があります。`values.yaml` で `useConfigMap: true` を設定し、`customAgentConfig` に該当の設定を追加します。

```yaml
# agents.useConfigMap -- Agent 構成を提供するために、configmap を構成します。これは `agents.customAgentConfig` パラメーターと組み合わせて使用します。
  useConfigMap:  true

  # agents.customAgentConfig -- Datadog Agent 構成 (datadog.yaml) のカスタムコンテンツを指定します。 
  ## ref: https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6
  ## ref: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
  ## このパラメーターを考慮するには `agents.useConfigMap` が `true` に設定されている必要があることに注意してください。
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

[Datadog Agent オペレーター][1]を使用している場合は、同様に、`agent.customConfig.configData` キーを設定することができます。全ての構成可能キーは [v1][2] と [v2][3] で文書化されています。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/guide/network/
[1]: https://github.com/DataDog/datadog-operator
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v1alpha1.md
[3]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md