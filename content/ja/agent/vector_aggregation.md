---
title: Vector を使用して複数の Agent を集計する
kind: documentation
further_reading:
  - link: /logs/
    tag: ドキュメント
    text: ログの収集
  - link: /agent/proxy/
    tag: ドキュメント
    text: プロキシを使用するよう Agent を構成する
  - link: 'https://vector.dev/docs/'
    tag: ドキュメント
    text: Vector ドキュメント
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

- サポート対象となるのはログの集計のみです。
- Vector は他のソースから直接ログを収集することができます。その際、サードパーティのログには適切なタグ付けがされていない場合があります。[タグ][8]、ソース、またはサービスの値を追加するには、[Vector Remap Language][9] を使用すると便利です。

## コンフィギュレーション

### Agent の構成
Vector にログを送信するには、Agent のコンフィギュレーションファイル、`datadog.yaml` を更新します。
サポート対象となるのはログのデータタイプのみです。`datadog.yaml` ファイルで以下の値を更新してください。

```yaml
logs_config:
  logs_dd_url: "<VECTOR_HOST>:<VECTOR_PORT>"
  logs_no_ssl: true # TLS/SSL が Vector 側で有効化されていない場合
  use_http: true # Vector `datadog_logs` ソースは HTTP のみをサポートします
```

`VECTOR_HOST` は Vector を実行しているシステムのホスト名で、`VECTOR_PORT` は
Vector `datadog_logs` ソースをリッスンしている TCP ポートです。

### Vector のコンフィギュレーション
Datadog Agent からログを受信するには、Vector に[datadog_logs source][10] を設定します。
Datadog にログを送信するには、Vector に少なくとも 1 つの [datadog_logs sink][11] を設定する必要があります。

Vector での処理中にログに適用できるコンフィギュレーションパラメーターや変換の一覧については、
公式の [Vector ドキュメント][12]を参照してください。

ここでは、Vector Remap Language を使ってすべてのログにタグを追加するコンフィギュレーションの例をご紹介します。

```yaml
sources:
  datadog_agents:
    type: datadog_logs
    address: "[::]:8080" # 上記の <VECTOR_PORT> をここで使用するポート値に設定

transforms:
  add_tags:
    type: remap
    inputs:
      - datadog_agents
    source: |
      .ddtags = .ddtags + ",sender:vector"

sinks:
  to_datadog:
    type: datadog_logs
    inputs:
       - add_tags
    default_api_key: "${DATADOG_API_KEY_ENV_VAR}"
    encoding:
      codec: json
```

### Kubernetes を使用する

公式の Datadog チャートを使用して、上記の [Agent コンフィギュレーション](#agent-configuration)を
`agents.customAgentConfig` 値に追加します。**注**: `agents.customAgentConfig` を考慮するために、
`agent.useConfigMap` を `true` に設定する必要があります。

Datadog Helm チャートの詳細については、[Kubernetes ドキュメント][13]を参照してください。

Vector では、Datadog のログソースがあらかじめ設定された[データ集計用公式チャート][14]を提供しています。
Helm を使用した Vector のインストールについては
[公式の Vector ドキュメント][15]を参照してください。

Datadog にログを送信するには、Vector のコンフィギュレーションに `datadog_logs` シンクを追加する必要があります。
Vector のチャートでは、`customConfig` フィールドを使用して、`values.yaml` ファイル内の任意の有効な Vector のコンフィギュレーションを保持することができます。
`datadog_logs` を有効にするには、[Vector のコンフィギュレーション](#vector-configuration)で
説明したものと同様の設定を直接 Vector のチャートのコンフィギュレーションに含めることができます。

## Vector で Datadog ログを操作する

Vector に送信されたログを活用すれば、ログ変換を行う [Vector Remap Language][3] など、Vector の全機能を利用することができます。
Datadog Agent から送信されたログは、Vectorに到達すると期待される形式のスキーマで構造化されます。また
Datadog API に直接ログを送信する場合は [API ドキュメント][16]に記載のスキーマの詳細説明を参照してください。

Vector が他のソースから収集したログは[高度な機能を使用して強化][8]することができます。VRL でこれらのログを調整し、
期待されるスキーマに従って関連するフィールドにデータを入力します。

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
[10]: https://vector.dev/docs/reference/configuration/sources/datadog_logs/
[11]: https://vector.dev/docs/reference/configuration/sinks/datadog_logs/
[12]: https://vector.dev/docs/reference/configuration/
[13]: /ja/agent/kubernetes/?tab=helm
[14]: https://github.com/timberio/vector/tree/master/distribution/helm/vector-aggregator
[15]: https://vector.dev/docs/setup/installation/package-managers/helm/
[16]: api/latest/logs/#send-logs