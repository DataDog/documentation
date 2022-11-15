---
aliases:
- /ja/agent/vector_aggregation/
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/observability_pipelines/integrate_vector_with_datadog.md
further_reading:
- link: /logs/
  tag: ドキュメント
  text: Datadog ログ管理の詳細はこちら
- link: /agent/proxy/
  tag: ドキュメント
  text: プロキシを使用するよう Agent を構成する
- link: https://vector.dev/docs/
  tag: ドキュメント
  text: Vector ドキュメント
- link: /integrations/observability_pipelines/vector_configurations/
  tag: ドキュメント
  text: Vector の構成の詳細
- link: /integrations/observability_pipelines/working_with_data/
  tag: ドキュメント
  text: Vector を使ったデータ操作
kind: documentation
title: Vector と Datadog のインテグレーション
---

## 概要

Vector は Datadog と統合し、Datadog Agent からログとメトリクスを集計し、収集したテレメトリーを Datadog にルーティングします。

データは次のような経路で流れます:
`Datadog Agent -> Vector -> Datadog`

Vector を使用して Datadog Agent から観測可能性データを収集する前に、以下が必要です。

- [Datadog Agent v6.35+ または v7.35+ がインストールされていること][1]。
- [Vector がインストールされていること][2]。
- [Vector の構成に関する基本的な理解][3]があること。

## Datadog Agent と環境のセットアップ

Datadog Agent から Datadog にログやメトリクスを収集、変換、ルーティングするためには、Vector を設定する前に [Datadog Agent](#datadog-agent-configuration) を構成する必要があります。Kubernetes を使用している場合は、Vector を設定する前に [Kubernetes](#kubernetes-configuration) も構成する必要があります。

### Datadog Agent 構成

#### Vector にログを送信する

Vector にログを送信するには、Agent のコンフィギュレーションファイルである `datadog.yaml` を以下で更新してください。

```yaml
vector:
  logs.enabled: true
  # Vector 側で TLS/SSL が有効になっている場合、プロトコルを https に調整します
  logs.url: "http://<VECTOR_HOST>"

```

#### Vector にメトリクスを送信する

メトリクスを送信するには、`datadog.yaml` ファイルを以下のように更新します。

```yaml
vector:
  metrics.enabled: true
  # Vector 側で TLS/SSL が有効になっている場合、プロトコルを https に調整します
  metrics.url: "http://<VECTOR_HOST>"
```

`VECTOR_HOST` は Vector が動作しているシステムのホスト名で、Vector の `datadog_agent` ソースがリッスンしている TCP ポートも含まれている必要があります。

#### Docker を使用する

Docker を使用している場合は、Agent のコンフィギュレーションファイル `datadog.yaml` に以下を追加します。

```
-e DD_VECTOR_METRICS_URL=http://<VECTOR_HOST>:<VECTOR_PORT>
-e DD_VECTOR_METRICS_ENABLED=true
-e DD_VECTOR_LOGS_URL=http://<VECTOR_HOST>:<VECTOR_PORT>
-e DD_VECTOR_LOGS_ENABLED=true
```

### Kubernetes 構成

Datadog の公式 Helm チャートを使用し、`agents.customAgentConfig` の値に [Agent 構成設定](#datadog-agent-configuration)を追加します。

**注:** `agents.customAgentConfig` を考慮するためには `agent.useConfigMap` を `true` に設定しなければなりません。

Datadog Helm チャートの詳細については、[Kubernetes ドキュメント][4]を参照してください。

Vector では、Datadog のログソースがあらかじめ設定された[データ集計用公式チャート][5]を提供しています。Helm を使用した Vector のインストールについては[公式の Vector ドキュメント][6]を参照してください。

Vector のチャートには、`values.yaml` ファイルの `customConfig` フィールドを使用して、任意の有効な Vector の構成を保持することができます。`datadog_logs` を有効にするには、これらの [Vector 構成](#vector-configurations)をそのまま Vector チャート構成に含めることができます。

## Vector の構成

Vector で処理されるすべてのデータに適用可能なすべての構成パラメーターと変換については、[Vector ドキュメント][7]を参照してください。

### ソース構成

Datadog Agent からデータを受信するには、Vector に [datadog_agent ソース][8]を構成します。

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
sources:
  datadog_agents:
    type: datadog_agent
    address: "[::]:8080"
    multiple_outputs: true # メトリクスとログを自動的に分離するには
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
sources:
  datadog_agents:
    type: datadog_agent
    address: '[::]:8080'
    multiple_outputs: true
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "sources": {
    "datadog_agents": {
      "type": "datadog_agent",
      "address": "[::]:8080",
      "multiple_outputs": true
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

### ベクター固有のタグを追加する

Datadog Agent から Vector に送信されるログやメトリクスは、[データを活用する][9]で説明するように操作やフォーマットすることが可能です。Datadog API を使用してログを送信する場合は、[Datadog の予約属性][10]を参照してください。

Vector は、[代替ソース][11]からログやメトリクスを直接収集することも可能です。その際、サードパーティーのログには適切なタグ付けがされていない場合があります。[タグの追加][13]、ソースやサービス値の追加には、[Vector Remap Language][12] をご利用ください。

#### ログ管理

Datadog にログを送信する際に、特定の Vector タグを含めることができます。これらのタグを追加することは、Vector に移行する場合に便利です。この例では、Datadog に送信されるすべてのログに Vector のホストでタグを付けます。

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
remap_logs_for_datadog:
  type: remap
  inputs:
        - datadog_agents
  source: |
  # 受信した .ddtags フィールドをパースし、含まれるタグに簡単にアクセスできるようにします
    .ddtags = parse_key_value!(.ddtags, key_value_delimiter: ":" field_delimiter: ",")
    .ddtags.sender = "vector"
    .ddtags.vector_aggregator = get_hostname!()

  # Datadog のタグを `datadog_logs` シンクの文字列として再エンコードします
    .ddtags = encode_key_value(.ddtags, key_value_delimiter: ":", field_delimiter: ",")

  # Datadog Agent は、取り込み時にストリップされる "status" フィールドを渡します
    del(.status)
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[remap_logs_for_datadog]
type = "remap"
inputs = [ "datadog_agents" ]
source = """
# 受信した .ddtags フィールドをパースし、含まれるタグにより簡単にアクセスできるようにします
  .ddtags = parse_key_value!(.ddtags, key_value_delimiter: ":", field_delimiter: ",")
  .ddtags.sender = "vector"
  .ddtags.vector_aggregator = get_hostname!()
# Datadog のタグを `datadog_logs` シンクの文字列として再エンコードします
  .ddtags = encode_key_value(.ddtags, key_value_delimiter: ":", field_delimiter: ",")
# Datadog Agent は、取り込み時にストリップされる 'status' フィールドを渡します
  del(.status)
"""
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "remap_logs_for_datadog": {
    "type": "remap",
    "inputs": [
      "datadog_agents"
    ],
    "source":
"# 受信した .ddtags フィールドをパースし、含まれるタグにより簡単にアクセスできるようにします
.ddtags = parse_key_value!(.ddtags, key_value_delimiter: \":\", field_delimiter: \",\")
.ddtags.sender = \"vector\"\n.ddtags.vector_aggregator = get_hostname!()

# Datadog のタグを `datadog_logs` シンクの文字列として再エンコードします
.ddtags = encode_key_value(.ddtags, key_value_delimiter: \":\", field_delimiter: \",\")

# Datadog Agent は、取り込み時にストリップされる \"status\" フィールドを渡します
del(.status)"

  }
}

```

{{% /tab %}}
{{< /tabs >}}

これらのタグは、Vector がデータを送信したかどうかを検証するために使用することができます。具体的には、Vector に移行する場合、これらのタグを属性として使用し、データが正しく移行されたかどうかを判断します。

**注:** この構成の `del(.status)` は、Datadog Agent によって `ERROR` に分類されたコンテナログを処理します。このステータスは通常、ログの取り込みエンドポイントによって取り除かれますが、Vector は Agent から生のペイロードを受け取るため、Vector 自身がこの処理を実行する必要があります。

#### メトリクス

同様に、Vector の特定タグを使用して Datadog にメトリクスを送信するには、次の例を参照してください。

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
remap_metrics_for_datadog:
  type: remap
  inputs:
    - some_input_id
  source: |
    .tags.sender = "vector"
    .tags.vector_aggregator = get_hostname!()
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[remap_metrics_for_datadog]
type = "remap"
inputs = [ "some_input_id" ]
source = """
    .tags.sender = "vector"
    .tags.vector_aggregator = get_hostname!()
"""
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "remap_metrics_for_datadog": {
    "type": "remap",
    "inputs": [
      "some_input_id"
    ],
    "source":
       .tags.sender = "vector"
       .tags.vector_aggregator = get_hostname!()
  }
}
```

{{% /tab %}}
{{< /tabs >}}


### シンクの構成

#### ログ管理

Datadog にログを送信するには、Vector に少なくとも 1 つの [datadog_logs シンク][14]が構成されている必要があります。以下の例を参照してください。

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
sinks:
  log_to_datadog:
    type: datadog_logs
    inputs:
       - remap_logs_for_datadog
    default_api_key: "${DATADOG_API_KEY}"
    encoding:
      codec: json
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[sinks.log_to_datadog]
type = "datadog_logs"
inputs = [ "remap_logs_for_datadog" ]
default_api_key = "${DATADOG_API_KEY}"

  [sinks.log_to_datadog.encoding]
  codec = "json"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "sinks": {
    "log_to_datadog": {
      "type": "datadog_logs",
      "inputs": [
        "remap_logs_for_datadog"
      ],
      "default_api_key": "${DATADOG_API_KEY}",
      "encoding": {
        "codec": "json"
      }
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

#### メトリクス

同様に Datadog にメトリクスを送信するには、Vector に少なくとも 1 つの [datadog_metrics シンク][15]が構成されている必要があります。以下の例を参照してください。

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
sinks:
  metrics_to_datadog:
    type: datadog_metrics
    inputs:
       - tag_metrics
    default_api_key: "${DATADOG_API_KEY_ENV_VAR}"
    compression: gzip
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
sinks:
  metrics_to_datadog:
    type: datadog_metrics
    inputs:
      - tag_metrics
    default_api_key: '${DATADOG_API_KEY_ENV_VAR}'
   compression: gzip
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "sinks": {
    "metrics_to_datadog": {
      "type": "datadog_metrics",
      "inputs": [
        "tag_metrics"
      ],
      "default_api_key": "${DATADOG_API_KEY_ENV_VAR}",
    compression: gzip
   }
  }
}
```

{{% /tab %}}
{{< /tabs >}}


## Vector の高度な構成

### ディスクバッファ

Datadog は、データ損失を防ぐためにディスクバッファを有効にすることを推奨しています。Vector は[ディスクバッファ][16]を使用して、送信されるデータが急増したり、下流のサービスがプレッシャーを送り返しているときに、データが失われないようにします。 シンクレベルでのバッファの設定については、以下の構成を参照してください。

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
sinks:
  metrics_to_datadog:
    type: datadog_metrics
    inputs:
       - tag_metrics
    default_api_key: "${DATADOG_API_KEY_ENV_VAR}"
    compression: gzip
    buffer:
         type: disk
         max_size: 309237645312
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[sinks.metrics_to_datadog]
type = "datadog_metrics"
inputs = [ "some_input_id" ]
default_api_key = "${DATADOG_API_KEY_ENV_VAR}"
compression = "gzip"

  [sinks.metrics_to_datadog.buffer]
  type = "disk"
  max_size = 309_237_645_312

```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "sinks": {
    "metrics_to_datadog": {
      "type": "datadog_metrics",
      "inputs": [
        "tag_metrics"
      ],
      "default_api_key": "${DATADOG_API_KEY_ENV_VAR}",
    compression: gzip,
    “buffer”: {
         “type”: “disk”
         “max_size”: 309237645312
     }
   }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

#### ディスクスペース

ディスクスペースは、vCPU * あたり少なくとも 36 GiB をプロビジョニングする必要があります。8 vCPU の推奨に従うと、288 GiB のディスクスペース (10 MiB * 60 秒 * 60 分 * 8 vCPU) をプロビジョニングし、メトリクス用に 48 GiB、ログ用に 240 GiB を割り当てることになります。Vector インスタンスにボリュームを追加して、Helm チャートのバッファを保持することができます。

{{< tabs >}}
{{% tab "AWS" %}}

```
vector:
  persistence:
    enabled: true
    storageClassName: "io2"
    accessModes:
      - ReadWriteOnce
    size: 288Gi
```

{{% /tab %}}
{{% tab "Azure" %}}

```
vector:
  persistence:
    enabled: true
    storageClassName: "default"
    accessModes:
      - ReadWriteOnce
    size: 288Gi
```

{{% /tab %}}
{{% tab "GKE" %}}

```json
vector:
  persistence:
    enabled: true
    storageClassName: "premium-rwo"
    accessModes:
      - ReadWriteOnce
    size: 288Gi
```

{{% /tab %}}
{{< /tabs >}}

[アーキテクトバッファ][17]の詳細を参照してください。

## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/basic_agent_usage/?tabs=agentv6v7
[2]: /ja/integrations/observability_pipelines/setup/#install-vector
[3]: /ja/integrations/observability_pipelines/vector_configurations/
[4]: /ja/agent/kubernetes/?tab=helm
[5]: https://github.com/timberio/helm-charts/tree/master/charts/vector-aggregator
[6]: https://vector.dev/docs/setup/installation/package-managers/helm/
[7]: https://vector.dev/docs/reference/configuration/
[8]: https://vector.dev/docs/reference/configuration/sources/datadog_agent/
[9]: /ja/integrations/observability_pipelines/working_with_data
[10]: /ja/logs/log_configuration/attributes_naming_convention/#reserved-attributes
[11]: /ja/integrations/observability_pipelines/integrations/#sources
[12]: https://vector.dev/docs/reference/vrl/
[13]: /ja/getting_started/tagging
[14]: https://vector.dev/docs/reference/configuration/sinks/datadog_logs/
[15]: https://vector.dev/docs/reference/configuration/sinks/datadog_metrics/
[16]: https://vector.dev/docs/about/concepts/#buffers
[17]: https://vector.dev/docs/setup/going-to-prod/architecting/#buffering-data