---
aliases:
- /ja/agent/guide/dual-shipping
description: Datadog Agent を構成して、メトリクス、ログ、トレースを複数の Datadog 組織に同時に送信します。
further_reading:
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: ブログ
  text: DDOT ゲートウェイを使用して、OpenTelemetry パイプラインを一元管理する
- link: /agent/configuration/network/
  tag: ガイド
  text: ネットワークトラフィック
- link: /observability_pipelines/
  tag: ドキュメント
  text: Observability Pipelines を使用してログを外部の宛先に送信する
title: デュアルシッピング
---
<div class="alert alert-warning">
複数の Datadog 組織にデータを送信している場合、デュアルシッピングは請求に影響を与える可能性があります。この構成の影響について詳しくは、<a href="/help/">Datadog サポート</a>にお問い合わせください。
</div>

## 概要 {#overview}

このガイドでは、さまざまな種類のデータ (APM、ログ、Cluster Agent メトリクスなど) を複数の Datadog 組織やサイトにデュアルシッピングするための Agent 構成例を紹介します。Datadog サイトの詳細については、[Datadog サイトの概要][3] を参照してください。

**注**: ログをデュアルシッピングする場合、またはログトラフィックを異なるログベンダー、クラウドストレージ、SIEM プロバイダー間で分割する場合は、[Observability Pipelines][1] を使用してください。

ネットワークトラフィックの送信先の完全なリストについては、[ネットワークトラフィック][2] を参照してください。

## メトリクスとサービスチェック {#metrics-and-service-checks}

YAML 構成を `datadog.yaml` に追加するか、適切な環境変数で Agent を起動します。

### YAML 構成 {#yaml-configuration}

Agent バージョン 6.17 または 7.17 以上が必要です。

`datadog.yaml` で、次のようにします。

```yaml
additional_endpoints:
  "https://app.{{< region-param key="dd_site">}}":
  - apikey2
  - apikey3
  "https://app.<DD_SITE>": # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
  - apikey4
```

### 環境変数の構成 {#environment-variable-configuration}

Agent バージョン 6.18 または 7.18 以上が必要です。

```bash
DD_ADDITIONAL_ENDPOINTS='{\"https://app.{{< region-param key="dd_site">}}\": [\"apikey2\", \"apikey3\"], \"https://app.<DD_SITE>\": [\"apikey4\"]}' # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
```

## APM {#apm}

### YAML 構成 {#yaml-configuration-1}

Agent バージョン 6.7.0 以上が必要です。

`datadog.yaml` で、次のようにします。

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

### 環境変数の構成 {#environment-variable-configuration-1}

Agent バージョン 6.19 または 7.19 以上が必要です。

```bash
DD_APM_ADDITIONAL_ENDPOINTS='{\"https://trace.agent.{{< region-param key="dd_site">}}\": [\"apikey2\", \"apikey3\"], \"https://trace.agent.<DD_SITE>\": [\"apikey4\"]}' # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
```

## Continuous Profiler {#continuous-profiler}

### YAML 構成 {#yaml-configuration-2}

Agent バージョン 6.7.0 以上が必要です。

`datadog.yaml` で、次のようにします。

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

### 環境変数の構成 {#environment-variable-configuration-2}

Agent バージョン 6.19 または 7.19 以上が必要です。

```bash
DD_APM_PROFILING_ADDITIONAL_ENDPOINTS='{\"https://intake.profile.{{< region-param key="dd_site">}}/api/v2/profile\": [\"apikey2\", \"apikey3\"], \"https://intake.profile.<DD_SITE>/api/v2/profile\": [\"apikey4\"]}' # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
```

**注:** Continuous Profiler 製品の追加エンドポイントへのアップロードは、ベストエフォート型配信で行われます。
* メインエンドポイントが最も優先されます。追加のエンドポイントへのアップロードは、メインエンドポイントへのアップロードが正常に完了した後にのみ処理されます。
* 追加エンドポイントからの応答は、プロファイラーに転送されません。追加エンドポイントへの配信中に発生したエラーは、Agent のエラーログに記録されます。

## Live Processes {#live-processes}

### YAML 構成 {#yaml-configuration-3}

Agent バージョン 6.4.0 以上が必要です。

`datadog.yaml` で、次のようにします。

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

### 環境変数の構成 {#environment-variable-configuration-3}

Agent バージョン 6.20 または 7.20 以上が必要です。

```bash
DD_PROCESS_ADDITIONAL_ENDPOINTS='{\"https://process.{{< region-param key="dd_site">}}\": [\"apikey2\", \"apikey3\"], \"https://process.<DD_SITE>\": [\"apikey4\"]}' # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
```

## Cluster Agent メトリクス {#cluster-agent-metrics}

Kubernetes State Metrics Core などの Cluster Agent メトリクスを追加のエンドポイントに送信するように Agent を構成します。

### HELM 構成 {#helm-configuration}
Datadog `values.yaml`:

```yaml
clusterAgent:
  env:
    - name: DD_ADDITIONAL_ENDPOINTS
      value: '{"https://app.{{< region-param key="dd_site">}}": ["apikey2"]}'
```
### Cluster Agent メトリクスプロバイダー {#cluster-agent-metrics-provider}

オートスケーリングの耐障害性を確保するために、HPA のメトリクスクエリを複数の Datadog リージョンに対して実行し、デュアルシッピングを行うように Cluster Agent を構成します。Datadog Cluster Agent マニフェストを複数のエンドポイントで構成します。

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

## オーケストレーター {#orchestrator}

### HELM 構成 {#helm-configuration-1}
Datadog `values.yaml`:

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

### 環境変数の構成 {#environment-variable-configuration-4}

```bash
DD_ORCHESTRATOR_EXPLORER_ORCHESTRATOR_ADDITIONAL_ENDPOINTS='{\"https://orchestrator.{{< region-param key="dd_site">}}\": [\"apikey2\", \"apikey3\"], \"https://orchestrator.<DD_SITE>\": [\"apikey4\"]}' # Replace <DD_SITE> with your Datadog site parameter (for example, ddog-gov.com).
```

## CI Visibility {#ci-visibility}

### YAML 構成 {#yaml-configuration-4}

Agent 6.38 または 7.38 以上が必要です。

`datadog.yaml` で、次のようにします。

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

### 環境変数の構成 {#environment-variable-configuration-5}

```bash
DD_EVP_PROXY_CONFIG_ADDITIONAL_ENDPOINTS='{\"https://<VERSION>-app.agent.{{< region-param key="dd_site">}}\": [\"apikey2\", \"apikey3\"], \"https://<VERSION>-app.agent.<DD_SITE>\": [\"apikey4\"]}'  # Replace <VERSION> and <DD_SITE> with your Agent version and Datadog site parameter (for example, 7-38-0 and datadoghq.eu).
```

## ログ {#logs}

複数の Datadog 組織にログをデュアルシッピングする場合は、Agent を使用します。ログを Datadog および外部の宛先に送信する場合は、[Observability Pipelines][2] を使用します。

TCP には Agent バージョン 6.6 以上が必要です。<br/>
HTTPS には Agent バージョン 6.13 以上が必要です。

### YAML 構成 {#yaml-configuration-5}
`datadog.yaml` で、次のようにします。

```yaml
logs_config:
  force_use_http: true
  additional_endpoints:
  - api_key: "apiKey2"
    Host: "agent-http-intake.logs.{{< region-param key="dd_site">}}"
    Port: 443
    is_reliable: true
```

### 環境変数の構成 {#environment-variable-configuration-6}

Agent 6.18 または 7.18 以上が必要です。

```bash
DD_LOGS_CONFIG_FORCE_USE_HTTP=true
DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"agent-http-intake.logs.{{< region-param key="dd_site">}}\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Database Monitoring {#database-monitoring}

### YAML 構成 {#yaml-configuration-6}

Agent 6.29 または 7.29 以上が必要です。

`datadog.yaml` で、次のようにします。

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

### 環境変数の構成 {#environment-variable-configuration-7}

```bash
DD_DATABASE_MONITORING_SAMPLES_USE_HTTP=true
DD_DATABASE_MONITORING_SAMPLES_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"dbm-metrics-intake.{{< region-param key="dd_site">}}\", \"Port\": 443, \"is_reliable\": true}]"
DD_DATABASE_MONITORING_ACTIVITY_USE_HTTP=true
DD_DATABASE_MONITORING_ACTIVITY_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"dbquery-intake.{{< region-param key="dd_site">}}\", \"Port\": 443, \"is_reliable\": true}]"
DD_DATABASE_MONITORING_METRICS_USE_HTTP=true
DD_DATABASE_MONITORING_METRICS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"dbm-metrics-intake.{{< region-param key="dd_site">}}\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## ネットワークデバイス {#network-devices}

### YAML 構成 {#yaml-configuration-7}

Agent 6.29 または 7.29 以上が必要です。

`datadog.yaml` で、次のようにします。

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

### 環境変数の構成 {#environment-variable-configuration-8}

```bash
DD_NETWORK_DEVICES_METADATA_USE_HTTP=true
DD_NETWORK_DEVICES_METADATA_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"ndm-intake.{{< region-param key="dd_site">}}\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Network Path {#network-path}

### YAML 構成 {#yaml-configuration-8}

Agent 6.55 または 7.55 以上が必要です。

`datadog.yaml` で、次のようにします。

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

### 環境変数の構成 {#environment-variable-configuration-9}

```bash
DD_NETWORK_PATH_FORWARDER_USE_HTTP=true
DD_NETWORK_PATH_FORWARDER_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"netpath-intake.{{< region-param key="dd_site">}}\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Cloud Security の誤構成 {#cloud-security-misconfigurations}

### YAML 構成 {#yaml-configuration-9}

`datadog.yaml` で、次のようにします。

```yaml
compliance_config:
  endpoints:
    force_use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      host: "cspm-intake.{{< region-param key="dd_site">}}.:443"
      is_reliable: true
```

### 環境変数の構成 {#environment-variable-configuration-10}

```bash
DD_COMPLIANCE_CONFIG_ENDPOINTS_USE_HTTP=true
DD_COMPLIANCE_CONFIG_ENDPOINTS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"host\": \"cspm-intake.{{< region-param key="dd_site">}}.:443\", \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Workload Protection {#workload-protection}

### YAML 構成 {#yaml-configuration-10}
`datadog.yaml` で、次のようにします。

```yaml
runtime_security_config:
  endpoints:
    force_use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      host: "cws-intake.{{< region-param key="dd_site">}}.:443"
      is_reliable: true
```

### 環境変数の構成 {#environment-variable-configuration-11}

```bash
DD_RUNTIME_SECURITY_CONFIG_ENDPOINTS_USE_HTTP=true
DD_RUNTIME_SECURITY_CONFIG_ENDPOINTS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"host\": \"cws-intake.{{< region-param key="dd_site">}}.:443\", \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Kubernetes のデュアルシッピング {#dual-shipping-in-kubernetes}

{{< tabs >}} {{% tab "Helm" %}}

[Datadog Agent Helm チャート][1] を使用している場合、これらの設定を configmap で構成できます。`values.yaml` で、`useConfigMap: true` を設定し、
関連する設定を `customAgentConfig` に追加します。

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

`ConfigMap` 内のクリアテキストで API キーを公開しないようにするため、環境変数の構成を使用して Kubernetes シークレットを参照することもできます。メトリクスを追加リージョンに送信する例を以下に示します。

1. このガイドの環境変数構成値を使用して Kubernetes シークレットを作成します。
    ```bash
    kubectl create -n <DATADOG AGENT NAMESPACE> secret generic dual-shipping --from-literal metrics='{"https://app.<DD_SITE>": ["apikey4"]}' # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
    ```
2. 構成内でこのシークレットを参照するには、[Helm チャートパラメーター][2] `datadog.env` または `datadog.envFrom` を使用します。
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

[Datadog Agent オペレーター][1] を使用している場合は、`[key].customConfigurations.[key].configData` [オーバーライド][2] キーを設定してこれらの設定を行うことができます。以下の例では、ノード Agent の `datadog.yaml` 構成ファイルを置き換えて、メトリクスとログを追加リージョンに送信します。

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

`ConfigMap` 内のクリアテキストで API キーを公開しないようにするため、環境変数の構成を使用して Kubernetes シークレットを参照することもできます。メトリクスを追加リージョンに送信する例を以下に示します。

1. このガイドの環境変数構成値を使用して Kubernetes シークレットを作成します。
    ```bash
    kubectl create -n <DATADOG AGENT NAMESPACE> secret generic dual-shipping --from-literal metrics='{"https://app.<DD_SITE>": ["apikey4"]}'  # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
    ```
2. 構成内でこのシークレットを参照するには、`[key].env` パラメーターを使用します。
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

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/observability_pipelines/
[2]: /ja/agent/configuration/network/
[3]: /ja/getting_started/site/#access-the-datadog-site