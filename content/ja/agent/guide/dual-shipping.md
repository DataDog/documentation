---
kind: ガイド
title: デュアルシッピング
---

<div class="alert alert-danger">
複数の Datadog 組織にデータを送信している場合、デュアルシッピングは請求に影響を与える可能性があります。この構成の影響について詳しくは、<a href="/help/">Datadog サポート</a>にお問い合わせください。
</div>

## 概要

2 つ目の Datadog 組織や他の内部インフラストラクチャーなど、複数の宛先にデータを送信したい場合、追加のエンドポイントにデータを送信するように Agent を構成することができます。複数のエンドポイントまたは API キーに異なる種類のデータを送信するように Agent を設定するには、次の構成を使用します。


## メトリクス、APM、ライブプロセス、オーケストレーター

YAML 構成を `datadog.yaml` に追加するか、適切な環境変数で Agent を起動します。

{{< tabs >}}

{{% tab "メトリクスとサービスチェック" %}}

### YAML 構成
`datadog.yaml` で:
```yaml
additional_endpoints:
  "https://mydomain.datadoghq.com":
  - apikey2
  - apikey3
  "https://mydomain.datadoghq.eu":
  - apikey4
```

### 環境変数コンフィギュレーション

```bash
DD_ADDITIONAL_ENDPOINTS='{\"https://mydomain.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://mydomain.datadoghq.eu\": [\"apikey4\"]}'
```

{{% /tab %}}

{{% tab "APM" %}}

### YAML 構成
`datadog.yaml` で:
```yaml
apm_config:
  [...]
  additional_endpoints:
    "https://mydomain.datadoghq.com":
    - apikey2
    - apikey3
    "https://mydomain.datadoghq.eu":
    - apikey4

  profiling_additional_endpoints:
    "https://mydomain.datadoghq.com":
    - apikey2
    - apikey3
    "https://mydomain.datadoghq.eu":
    - apikey4
```

### 環境変数コンフィギュレーション

```bash
DD_APM_ADDITIONAL_ENDPOINTS='{\"https://mydomain.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://mydomain.datadoghq.eu\": [\"apikey4\"]}'

DD_APM_PROFILING_ADDITIONAL_ENDPOINTS='{\"https://mydomain.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://mydomain.datadoghq.eu\": [\"apikey4\"]}'
```

{{% /tab %}}

{{% tab "ライブプロセス" %}}

### YAML 構成
`datadog.yaml` で:
```yaml
process_config:
  [...]
  additional_endpoints:
    "https://mydomain.datadoghq.com":
    - apikey2
    - apikey3
    "https://mydomain.datadoghq.eu":
    - apikey4
```

### 環境変数コンフィギュレーション

```bash
DD_PROCESS_ADDITIONAL_ENDPOINTS='{\"https://mydomain.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://mydomain.datadoghq.eu\": [\"apikey4\"]}'
```

{{% /tab %}}

{{% tab "オーケストレーター" %}}

### YAML 構成
`datadog.yaml` で:
```yaml
orchestrator_explorer:
  [...]
  orchestrator_additional_endpoints:
    "https://mydomain.datadoghq.com":
    - apikey2
    - apikey3
    "https://mydomain.datadoghq.eu":
    - apikey4
```

### 環境変数コンフィギュレーション

```bash
DD_ORCHESTRATOR_EXPLORER_ORCHESTRATOR_ADDITIONAL_ENDPOINTS='{\"https://mydomain.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://mydomain.datadoghq.eu\": [\"apikey4\"]}'
```

{{% /tab %}}
{{% /tabs %}} 

## ログ、データベースモニタリング、ネットワークデバイス、CSPM、ランタイムセキュリティ

{{< tabs >}}

{{% tab "ログ" %}}

### YAML 構成
`datadog.yaml` で:
```yaml
logs_config:
  use_http: true
  additional_endpoints:
  - api_key: "apiKey2"
    Host: "https://mydomain.datadoghq.com"
    Port: 443
    is_reliable: true
```

### 環境変数コンフィギュレーション

```bash
DD_LOGS_CONFIG_USE_HTTP=true
DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://mydomain.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% /tab %}}

{{% tab "データベースモニタリング" %}}

### YAML 構成
`datadog.yaml` で:
```yaml
database_monitoring:
  samples:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "https://mydomain.datadoghq.com"
      Port: 443
      is_reliable: true
  activity:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "https://mydomain.datadoghq.com"
      Port: 443
      is_reliable: true
  metrics:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "https://mydomain.datadoghq.com"
      Port: 443
      is_reliable: true
```

### 環境変数コンフィギュレーション

```bash
DD_DATABASE_MONITORING_SAMPLES_USE_HTTP=true
DD_DATABASE_MONITORING_SAMPLES_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://mydomain.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
DD_DATABASE_MONITORING_ACTIVITY_USE_HTTP=true
DD_DATABASE_MONITORING_ACTIVITY_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://mydomain.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
DD_DATABASE_MONITORING_METRICS_USE_HTTP=true
DD_DATABASE_MONITORING_METRICS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://mydomain.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% /tab %}}

{{% tab "ネットワークデバイス" %}}

### YAML 構成

`datadog.yaml` で:
```yaml
network_devices:
  metadata:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "https://mydomain.datadoghq.com"
      Port: 443
      is_reliable: true
```

### 環境変数コンフィギュレーション

```bash
DD_NETWORK_DEVICES_METADATA_USE_HTTP=true
DD_NETWORK_DEVICES_METADATA_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://mydomain.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% /tab %}}

{{% tab "CSPM" %}}

### YAML 構成
`datadog.yaml` で:
```yaml
​​compliance_config:
  endpoints:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "https://mydomain.datadoghq.com"
      Port: 443
      is_reliable: true
```

### 環境変数コンフィギュレーション

```bash
DD_​​COMPLIANCE_CONFIG_ENDPOINTS_USE_HTTP=true
DD_​​COMPLIANCE_CONFIG_ENDPOINTS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://mydomain.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% /tab %}}

{{% tab "CWS" %}}

### YAML 構成
`datadog.yaml` で:
```yaml
runtime_security_config:
  endpoints:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "https://mydomain.datadoghq.com"
      Port: 443
      is_reliable: true
```

### 環境変数コンフィギュレーション

```bash
DD_​​RUNTIME_SECURITY_CONFIG_ENDPOINTS_USE_HTTP=true
DD_​​RUNTIME_SECURITY_CONFIG_ENDPOINTS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://mydomain.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% /tab %}}
{{% /tabs %}}

これらの製品からのデータについては、追加のエンドポイントを設定する際に、Agent に使用するトランスポートを伝えるため、明示的に `use_http` を設定する必要があります。追加したすべてのエンドポイントにおいて、同じトランスポート構成が共有されます。

`is_reliable` 設定は、このエンドポイントをプライマリーエンドポイントと同じ優先度で扱うように Agent に指示します。プライマリーエンドポイントは常に信頼性があります。これにより、宛先が利用できなくなった場合でも、データを見逃すことがなくなります。


例えば、`is_reliable: true` でメインのエンドポイントと追加のエンドポイントにデータを送信している場合、一方のエンドポイントが使用不能になると、もう一方のエンドポイントにデータが流れ続けます。両方のエンドポイントが利用できなくなった場合、少なくとも一方のエンドポイントが回復するまで、Agent はデータの読み込みと送信を停止します。これにより、すべてのデータが少なくとも 1 つの信頼できるエンドポイントに到達することが保証されます。

`is_reliable` の設定はデフォルトで `false` になっています。Datadog は `is_reliable` を `true` に設定することを推奨します。信頼性のないエンドポイントは、少なくとも 1 つの信頼性のあるエンドポイントが利用可能な場合にのみデータを送信します。`is_reliable` の値を混在させて、複数のエンドポイントを追加定義することができます。

YAML 構成を `datadog.yaml` に追加するか、適切な環境変数で Agent を起動します。

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
      "https://mydomain.datadoghq.com":
      - apikey2
      - apikey3
      "https://mydomain.datadoghq.eu":
      - apikey4 

    logs_config:
      use_http: true
      additional_endpoints:
      - api_key: "apiKey2"
        Host: "https://mydomain.datadoghq.com"
        Port: 443
        is_reliable: true
```

[Datadog Agent オペレーター](https://github.com/DataDog/datadog-operator)を使用している場合、同様に `agent.customConfig.configData` キーを設定することができます。すべての構成可能なキーは、[ここ](https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.md)で文書化されています。