---
aliases:
- /ja/integrations/observability_pipelines/working_with_data/
- /ja/observability_pipelines/working_with_data/
further_reading:
- link: /observability_pipelines/legacy/setup/
  tag: ドキュメント
  text: 観測可能性パイプラインを設定する
- link: /observability_pipelines/legacy/reference/transforms/#awsec2metadata
  tag: ドキュメント
  text: AWS EC2 インスタンスが発するメタデータのパース
- link: /observability_pipelines/legacy/reference/transforms/#lua
  tag: ドキュメント
  text: Lua でイベントを変更する
- link: /observability_pipelines/legacy/reference/transforms/#logtometric
  tag: ドキュメント
  text: ログをメトリクスイベントに変換する
- link: /observability_pipelines/legacy/configurations/
  tag: ドキュメント
  text: 観測可能性パイプラインの構成の詳細
title: (レガシー) データの操作
---

## 概要

Observability Pipelines を使用すると、可観測性データを形成および変換できます。Logging without Limits™ パイプラインと同様に、一連の変換コンポーネントで構成される Observability Pipelines のパイプラインを構成できます。これらの変換により、型安全性が保証された状態で、データをパース、構造化、拡充することができます。

## データをリマップする

[`remap` 変換][1]は、イベントを変更したり、イベントのルーティングやフィルタリングの条件を指定できます。`remap` 変換では、Datadog Processing Language (DPL) または Vector Remap Language (VRL) を使用して、配列や文字列の操作、値のエンコードおよびデコード、値の暗号化および復号化などが可能です。詳細は [Datadog Processing Language][2] を参照し、DPL の組み込み関数の完全なリストについては [DPL 関数リファレンス][3]を参照してください。

### 基本的な `remap` 構成例

まずは、`source` フィールドに DPL/VRL プログラムが含まれる基本的な `remap` 変換の YAML 構成例を見てみましょう。

```yaml
transforms:
  modify:
    type: remap
    inputs:
      - previous_component_id
    source: |2
        del(.user_info)
        .timestamp = now()
```

この例では、`type` フィールドが `remap` 変換に設定されています。`inputs` フィールドは、以前に定義された `previous_component_id` ソースからイベントを受け取る場所を定義します。`source` フィールドの最初の行は、`.user_info` フィールドを削除します。大規模な環境では、フィールドを削除することはイベントのペイロードを削減し、下流のサービスへのコスト削減に特に有用です。

2 行目は `.timestamp` フィールドとその値をイベントに追加し、この変換を通過するすべてのイベントのコンテンツを変更します。

## データのパース

パースは、DPL/VRL のより高度なユースケースを提供します。

### パースの例

#### ログイベントの例

以下のスニペットは、JSON 形式の HTTP ログイベントです。

```
"{\"status\":200,\"timestamp\":\"2021-03-01T19:19:24.646170Z\",\"message\":\"SUCCESS\",\"username\":\"ub40fan4life\"}"
```
#### 構成例

以下の YAML 構成例では、DPL/VRL を使用してログイベントを次のように変更します。

- 生の文字列を JSON にパースする。
- 時刻を UNIX タイムスタンプに再フォーマットする。
- ユーザー名フィールドを削除する。
- message を小文字に変換する。

```yaml
transforms:
  parse_syslog_id:
    type: remap
    inputs:
      - previous_component_id
    source: |2
         . = parse_json!(string!(.message))
         .timestamp = to_unix_timestamp(to_timestamp!(.timestamp))
         del(.username)
         .message = downcase(string!(.message))
```

#### 構成の出力

この構成は以下を返します。

```
{
  "message": "success",
  "status": 200,
  "timestamp": 1614626364
}
```

## データのサンプリング、削減、フィルター、集計

下流のサービスに配信される観測可能性データの量を減らすために、サンプリング、削減、フィルター、集計などの変換が一般的に行われています。観測可能性パイプラインは、データ量をコントロールするための様々な方法を提供します。

- 供給された条件と構成可能なレートに基づいて[イベントをサンプリング][4]する。
- 複数のイベントを単一のイベントに[削減および統合][5]する。
- 不要なフィールドを削除する。
- イベントを[重複排除][6]する。
- 一連の条件に基づいて[イベントをフィルタリング][7]する。
- 複数のメトリクスイベントを定義された間隔ウィンドウに基づいて単一のメトリクスイベントに[集約][8]する。

これらの変換の使用方法の例については、[ログのボリュームとサイズの制御][10]を参照してください。

## データのルーティング

もう一つのよく使われる変換は `route` で、指定された条件に基づいてイベントのストリームを複数のサブストリームに分割できます。これは、可観測性データを異なる宛先に送信する必要がある場合や、ユースケースに基づいてデータのストリームを異なる方法で操作する必要がある場合に有用です。

### 異なる宛先へのルーティングの例

#### ログの例

以下のスニペットは、`level` フィールドの値に基づいて異なる宛先にルーティングしたいログの例です。

```
{
  "logs": {
    "kind": "absolute",
    "level": "info,
    "name": "memory_available_bytes",
    "namespace": "host",
    "tags": {}
  }
}
```

#### 構成例

以下の YAML 構成例は、`level` の値に基づいてデータをルーティングします。

```yaml
transforms:
  splitting_logs_id:
    type: route
    inputs:
      - my-source-or-transform-id
    route:
      debug: .level == "debug"
      info: .level == "info"
      warn: .level == "warn"
      error: .level == "error"
```

`route` フィールドの各行は、ルート識別子の後に、その `route` のフィルターを表す論理条件を定義します。この `route` の最終結果は、他のコンポーネントが `<transform_name>.<route_id>` という名前で入力として参照できます。

例えば、`level` フィールドの値が `warn` と `error` のログを Datadog にルーティングしたい場合、以下の例を参照してください。

```yaml
sinks:
  my_sink_id:
    type: datadog_logs
    inputs:
      - splitting_logs_id.warn
      - splitting_logs_id.error
    default_api_key: '${DATADOG_API_KEY_ENV_VAR}'
    compression: gzip
```

詳細については、[`route` 変換リファレンス][11]を参照してください。

## データのスロットル

下流のサービスは、ボリュームの急増時に過負荷になることがあり、データがドロップされる可能性があります。`throttle` 変換を使用して、このシナリオから保護し、ユーザーの使用量クォータを強制できます。`throttle` 変換は、トポロジーを通過するログのレートを制限します。

### スロットルの構成例

以下の YAML 構成例は、`throttle` 変換のものです。

```yaml
transforms:
  my_transform_id:
    type: throttle
    inputs:
      - my-source-or-transform-id
    exclude: null
    threshold: 100
    window_secs: 1
```

`threshold` フィールドは、特定のバケットに許可されるイベントの数を定義します。`window_secs` は、構成されたしきい値が適用される時間枠を定義します。この構成例では、コンポーネントが 1 秒間に 100 を超えるイベントを受信すると、それ以降の追加イベントはドロップされます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/observability_pipelines/legacy/reference/transforms/#remap
[2]: /ja/observability_pipelines/legacy/reference/processing_language/
[3]: /ja/observability_pipelines/legacy/reference/processing_language/functions/
[4]: /ja/observability_pipelines/legacy/reference/transforms/#sample
[5]: /ja/observability_pipelines/legacy/reference/transforms/#reduce
[6]: /ja/observability_pipelines/legacy/reference/transforms/#dedupe
[7]: /ja/observability_pipelines/legacy/reference/transforms/#filter
[8]: /ja/observability_pipelines/legacy/reference/transforms/#aggregate
[9]: /ja/observability_pipelines/legacy/reference/transforms/#metrictolog
[10]: /ja/observability_pipelines/legacy/guide/control_log_volume_and_size/
[11]: /ja/observability_pipelines/legacy/reference/transforms/#route