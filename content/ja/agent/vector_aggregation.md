---
further_reading:
- link: /logs/
  tag: ドキュメント
  text: ログの収集
- link: /agent/proxy/
  tag: ドキュメント
  text: プロキシを使用するよう Agent を構成する
- link: https://vector.dev/docs/
  tag: ドキュメント
  text: Vector ドキュメント
kind: documentation
title: Vector を使用して複数の Agent を集計する
---

## 概要

Datadog Agent は [Vector][1] と組み合わせて使用することができます。このシナリオでは、Agent が Vector に
データを送信し、そこで複数のアップストリーム Agent からのデータ集計を行います。

`Agents -> Vector -> Datadog`

Vector はデータを Datadog および他の宛先に送信する前に処理することができるため、このシナリオは
[プロキシ][2]を使用する場合とは異なります。Vector の機能は次の通りです。

* [ログのパース、構造化、強化][3]
* [サンプリング][4]を通じたコスト削減
* ネットワークから送信される前の機密データおよび [PII の編集][5]
* [ログからメトリクスを導出][6]し、コスト効果の高い分析を実行
* [複数の宛先へのルーティング][7]

**注**:

- サポート対象となるのはログとメトリクスの集計のみです。
- Vector は他のソースから直接ログとメトリクスを収集することができます。その際、サードパーティのログには適切なタグ付けがされていない場合があります。[タグ][8]、ソース、またはサービスの値を追加するには、[Vector Remap Language][9] を使用すると便利です。

## コンフィギュレーション

### Agent の構成

この構成には、Datadog Agent のバージョン 6.35 または 7.35 が必要です。

Vector にログを送信するには、Agent のコンフィギュレーションファイルである `datadog.yaml` を更新してください。

```yaml
vector:
  logs.enabled: true
  # Vector 側で TLS/SSL が有効になっている場合、プロトコルを https に調整します
  logs.url: "http://<VECTOR_HOST>:<VECTOR_PORT>"
# Vector の v0.17.0 以前のバージョンを使用している場合は、以下の行をコメント解除します
# logs_config.use_v2_api: false
```

メトリクスについては、`datadog.yaml`ファイル内の以下の値を更新します。

```yaml
vector:
  metrics.enabled: true
  # Vector 側で TLS/SSL が有効になっている場合、プロトコルを https に調整します
  metrics.url: "http://<VECTOR_HOST>:<VECTOR_PORT>"
```

`VECTOR_HOST` は Vector を実行しているシステムのホスト名で、`VECTOR_PORT` は Vector `datadog_agent` ソースをリッスンしている TCP ポートです。

### Docker コンフィギュレーション

Docker を使用している場合は、Agent のコンフィギュレーションファイルに以下を追加します。

```
-e DD_VECTOR_METRICS_URL=http://<VECTOR_HOST>:<VECTOR_PORT>
-e DD_VECTOR_METRICS_ENABLED=true
-e DD_VECTOR_LOGS_URL=http://<VECTOR_HOST>:<VECTOR_PORT>
-e DD_VECTOR_LOGS_ENABLED=true
```

### Vector のコンフィギュレーション
Datadog Agent からログやメトリクスを受信するには、Vector に [datadog_agent source][10] を構成します。Datadog にログを送信するには、Vector に少なくとも 1 つの [datadog_logs sink][11] を構成する必要があります。同様に、Datadog にメトリクスを送信するには、Vector に少なくとも 1 つの [datadog_metrics シンク][12]が構成されている必要があります。

Vector での処理中にログに適用できるコンフィギュレーションパラメーターや変換の一覧については、公式の [Vector ドキュメント][13]を参照してください。

ここでは、Vector Remap Language を使ってすべてのログとメトリクスにタグを追加するコンフィギュレーションの例をご紹介します。

```yaml
sources:
  datadog_agents:
    type: datadog_agent
    # ここで使用するポート値には、上記の <VECTOR_PORT> を設定する必要があります
    address: "[::]:8080"
   multiple_outputs: true # メトリクスとログを自動的に分離するために

transforms:
  tag_logs:
    type: remap
    inputs:
      - datadog_agents.logs
    source: |
      # ここで `!` の省略形は `string` 関数で使用され、
      # .ddtags が "string" でない場合はエラーになります。
      # .ddtags フィールドは、常に文字列であることが期待されます。
      .ddtags = string!(.ddtags) + ",sender:vector"
  tag_metrics:
    type: remap
    inputs:
      - datadog_agents.metrics
    source: |
      .tags.sender = "vector"

sinks:
  log_to_datadog:
    type: datadog_logs
    inputs:
       - tag_logs
    default_api_key: "${DATADOG_API_KEY_ENV_VAR}"
    encoding:
      codec: json
  metrics_to_datadog:
    type: datadog_metrics
    inputs:
       - tag_metrics
    default_api_key: "${DATADOG_API_KEY_ENV_VAR}"
```

### Kubernetes を使用する

公式の Datadog チャートを使用して、上記の [Agent コンフィギュレーション](#agent-configuration)を `agents.customAgentConfig` 値に追加します。**注**: `agents.customAgentConfig` を考慮するために、`agent.useConfigMap` を `true` に設定する必要があります。

Datadog Helm チャートの詳細については、[Kubernetes ドキュメント][14]を参照してください。

Vector では、Datadog のログソースがあらかじめ設定された[データ集計用公式チャート][15]を提供しています。Helm を使用した Vector のインストールについては[公式の Vector ドキュメント][16]を参照してください。

Datadog にログを送信するには、Vector の構成に `datadog_logs` シンクを追加する必要があります。同様に、Datadog にメトリクスを送信するには、`datadog_metrics` シンクを Vector の構成に追加する必要があります。Vector のチャートには、`values.yaml` ファイルの `customConfig` フィールドを使用して、任意の有効な Vector の構成を保持することができます。`datadog_logs` を有効にするには、[Vector の構成](#vector-configuration)で説明したのと同じ種類の構成を、そのまま Vector のチャートの構成に含めることができます。

## Vector で Datadog のログとメトリクスを操作する

Vector に送信されたログやメトリクスは、変換のための [Vector Remap Language][3] を含むベクターの全機能の恩恵を受けることができます。

Datadog Agent から送信されたログは、Vector が受信すると、期待されるスキーマを使用して構造化されます。Datadog API を使用してログを送信する場合、完全なスキーマの説明については、[API ドキュメント][17]を参照してください。

Vector が他のソースから収集したログとメトリクスは[高度な機能を使用して強化][8]することができます。VRL でログとメトリクスを調整し、期待されるスキーマに従って関連するフィールドにデータを入力します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://vector.dev/
[2]: /ja/agent/proxy
[3]: https://vector.dev/docs/reference/configuration/transforms/remap/
[4]: https://vector.dev/docs/reference/configuration/transforms/sample/
[5]: https://vector.dev/docs/reference/vrl/functions/#redact
[6]: https://vector.dev/docs/reference/configuration/transforms/log_to_metric/
[7]: https://vector.dev/docs/reference/configuration/transforms/route/
[8]: /ja/getting_started/tagging
[9]: https://vector.dev/docs/reference/vrl/
[10]: https://vector.dev/docs/reference/configuration/sources/datadog_agent/
[11]: https://vector.dev/docs/reference/configuration/sinks/datadog_logs/
[12]: https://vector.dev/docs/reference/configuration/sinks/datadog_metrics/
[13]: https://vector.dev/docs/reference/configuration/
[14]: /ja/agent/kubernetes/?tab=helm
[15]: https://github.com/timberio/helm-charts/tree/master/charts/vector-aggregator
[16]: https://vector.dev/docs/setup/installation/package-managers/helm/
[17]: /ja/api/latest/logs/#send-logs