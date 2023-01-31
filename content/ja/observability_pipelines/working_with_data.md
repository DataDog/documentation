---
aliases:
- /ja/integrations/observability_pipelines/working_with_data/
further_reading:
- link: https://vector.dev/docs/reference/configuration/transforms/aws_ec2_metadata/
  tag: ドキュメント
  text: AWS EC2 インスタンスが発するメタデータのパース
- link: https://vector.dev/docs/reference/configuration/transforms/lua/
  tag: ドキュメント
  text: Lua でイベントを変更する
- link: https://vector.dev/docs/reference/configuration/transforms/tag_cardinality_limit/
  tag: ドキュメント
  text: カーディナリティの爆発を防ぐために、メトリクスのタグのカーディナリティを制限する
- link: https://vector.dev/docs/reference/configuration/transforms/log_to_metric/
  tag: ドキュメント
  text: ログをメトリクスイベントに変換する
- link: https://vector.dev/docs/reference/configuration/transforms/metric_to_log/
  tag: ドキュメント
  text: メトリクスをログイベントに変換する
- link: https://vector.dev/docs/reference/configuration/transforms/geoip/
  tag: ドキュメント
  text: GeoIP メタデータでイベントをリッチ化する
- link: https://vector.dev/guides/level-up/csv-enrichment-guide/
  tag: ドキュメント
  text: CSV エンリッチメントを使用して、データにさらなるコンテクストを提供する
- link: /observability_pipelines/integrations/integrate_vector_with_datadog/
  tag: ドキュメント
  text: Vector にデータを送信するための Datadog Agent の構成
- link: /observability_pipelines/vector_configurations/
  tag: ドキュメント
  text: Vector の構成の詳細
kind: ドキュメント
title: データを活用する
---

## 概要

Vector は観測可能性データを整形し、変換することができます。Logging without Limits™ パイプラインと同様に、一連の Vector `transform` コンポーネントで構成される Vector パイプラインを構成することができます。これらの変換により、ビルトインの型安全性でデータの解析、構造化、リッチ化を行うことができます。

## Vector Remap Language によるデータのリマップ

Vector Remap Language (VRL) は、観測可能性データ (ログやメトリクス) を変換するために設計された、式指向のドメイン特化型言語です。観測可能性のユースケースに合わせたシンプルな構文と[組み込み関数][1]を特徴としています。

Vector Remap Language は、Vector の `remap` 変換でサポートされています。

リマップ変換は単一のイベントに作用し、それらを変換したり、ルーティングやフィルターのための条件を指定するために使用できます。VRL は次のような方法で使用することができます。

- [配列][2]、[文字列][3]などのデータ型を操作する。
- [コーデック][4]を使って値をエンコード、デコードする。
- 値を[暗号化][5]、[復号化][6]する。
- データ型を別のデータ型に[変換][7]する (例えば、整数から文字列に変換する)。
- [syslog の値を読み取り可能な値に変換][8]する。
- [エンリッチメントテーブル][9]を使用して値をリッチ化する。
- [IP 値を操作する][10]。
- カスタムルール (grok、regex など) や既成の関数 (syslog、apache、VPC フローログなど) を使って値を[パース][11]する。
- イベントの[メタデータ][12]と[パス][13]を操作する。

VRL 組み込み関数の一覧は、[VRL 関数リファレンス][1]を参照してください。

まず始めに、`source` フィールドに VRL プログラムを含む基本的なリマップ変換の例を以下に示します。

{{< tabs >}}
{{% tab "YAML" %}}

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

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.modify]
type = "remap"
inputs = ["previous_component_id"]
source = '''
  del(.user_info)
  .timestamp = now()
'''
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "modify": {
      "type": "remap",
      "inputs": [
        "previous_component_id"
      ],
      "source": "  del(.user_info)\n  .timestamp = now()\n"
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

この例では、`type` フィールドに `remap` 変換が設定されています。`inputs` フィールドは、先に定義した `previous_component_id` ソースからイベントを受け取る場所を定義します。`source` フィールドの最初の行は、`.user_info` フィールドを削除します。規模が大きくなると、フィールドを削除することは、イベントのペイロードを減らし、下流のサービスにかける費用を削減するために特に有効です。

2 行目は `.timestamp` フィールドとその値をイベントに追加し、この変換を通過するすべてのイベントのコンテンツを変更します。

詳しくは、[VRL リファレンス][14]、[Vector 構成][15]をご覧ください。

## データのパース

VRL の高度な利用例として、パース処理を紹介します。以下のスニペットは、JSON 形式の HTTP ログイベントです。

```
"{\"status\":200,\"timestamp\":\"2021-03-01T19:19:24.646170Z\",\"message\":\"SUCCESS\",\"username\":\"ub40fan4life\"}"
```

以下の構成では、VRL を使用して、以下を行うことでログイベントを変更します。

- 生の文字列を JSON にパースする。
- 時刻を UNIX タイムスタンプに再フォーマットする。
- ユーザー名フィールドを削除する。
- メッセージを小文字に変換する。

{{< tabs >}}
{{% tab "YAML" %}}

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

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.parse_syslog_id]
type = "remap"
inputs = ["previous_component_id"]
source = '''
   . = parse_json!(string!(.message))
   .timestamp = to_unix_timestamp(to_timestamp!(.timestamp))
   del(.username)
   .message = downcase(string!(.message))
'''
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "parse_syslog_id": {
      "type": "remap",
      "inputs": [
        "previous_component_id"
      ],
      "source": "   . = parse_json!(string!(.message))\n   .timestamp = to_unix_timestamp(to_timestamp!(.timestamp))\n   del(.username)\n   .message = downcase(string!(.message))\n"
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

この構成では、次のように返されます。

```
{
  "message": "success",
  "status": 200,
  "timestamp": 1614626364
}
```

## データのサンプリング、削減、フィルター、集計

下流のサービスに配信される観測可能性データの量を減らすために、サンプリング、削減、フィルター、集計などの変換が一般的に行われています。Vector は、データ量をコントロールするための様々な方法を提供します。

- 指定された条件に基づき、構成可能なレートで[イベントをサンプリング][16]する。
- 複数のイベントを 1 つのイベントに[縮小してまとめる][17]。
- 不要なフィールドを削除する。
- イベントを[複製][18]する。
- 一連の条件に基づいて、[イベントをフィルターする][19]。
- 定義されたインターバルウィンドウに基づいて、[複数のメトリクスイベントを 1 つのメトリクスイベントに集計][20]する。
- [メトリクスをログに変換する][21]。

これらの変換の使用例については、[ログ容量とサイズの制御][22]を参照してください。

## データのルーティング

もうひとつよく使われる変換に `route` があります。これは、指定した条件に基づいてイベントのストリームを複数のサブストリームに分割することができるものです。これは、観測可能性データを異なる宛先に送ったり、ユースケースに応じてデータのストリームを異なるように操作する必要がある場合に便利です。

以下のスニペットは、`level` フィールドの値に基づいて、異なる宛先にルーティングしたいログの例です。

```
{
  "logs": {
    "kind": "absolute",
    “level”: “info”,
    "name": "memory_available_bytes",
    "namespace": "host",
    "tags": {}
  }
}
```

`level` の値に基づいてルーティングを行うには、以下の構成例を参照してください。

{{< tabs >}}
{{% tab "YAML" %}}

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

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.splitting_logs_id]
type = "route"
inputs = [ "my-source-or-transform-id" ]

  [transforms.splitting_logs_id.route]
  debug = '.level == "debug"'
  info = '.level == "info"'
  warn = '.level == "warn"'
  error = '.level == "error"'
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "route",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "route": {
        "debug": ".level == \"debug\"",
        "info": ".level == \"info\"",
        "warn": ".level == \"warn\"",
        "error": ".level == \"error\""
      }
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

`route` フィールドの各行では、ルート識別子を定義し、その後に `route` のフィルターを表す論理条件を定義します。この `route` の最終結果は、他のコンポーネントから `<transform_name>.<route_id>` という名前で入力として参照することができます。

例えば、`level` フィールドの値が `warn` と `error` のログを Datadog にルーティングしたい場合、以下の例を参照してください。

{{< tabs >}}
{{% tab "YAML" %}}

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

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[sinks.my_sink_id]
type = "datadog_logs"
inputs = [ "splitting_logs_id.warn", "splitting_logs_id.error" ]
default_api_key = "${DATADOG_API_KEY_ENV_VAR}"
compression = "gzip"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "sinks": {
    "my_sink_id": {
      "type": "datadog_logs",
      "inputs": [
        "splitting_logs_id.warn",
        "splitting_logs_id.error"
      ],
      "default_api_key": "${DATADOG_API_KEY_ENV_VAR}",
      "compression": "gzip"
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

詳しくは、[ルート変換のドキュメント][23]をご覧ください。

## データのスロットル

下流のサービスは、ボリュームが急増したときに圧倒されることがあり、その結果、データがドロップされることがあります。このシナリオから保護するために `throttle` 変換を使用し、ユーザーに使用量のクォータを強制します。`throttle` 変換は、トポロジーを通過するログをレート制限します。次の `throttle` 変換の構成例を参照してください。

{{< tabs >}}
{{% tab "YAML" %}}

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

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.my_transform_id]
type = "throttle"
inputs = [ "my-source-or-transform-id" ]
threshold = 100
window_secs = 1
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "throttle",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "exclude": null,
      "threshold": 100,
      "window_secs": 1
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

`threshold` フィールドは、与えられたバケットに許可されるイベント数を定義します。`window_secs` は、設定されたしきい値が適用される時間枠を定義します。この構成例では、コンポーネントが 1 秒間に 100 個以上のイベントを受信すると、それ以降のイベントはすべて削除されます。

## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://vector.dev/docs/reference/vrl/functions/
[2]: https://vector.dev/docs/reference/vrl/functions/#array-functions
[3]: https://vector.dev/docs/reference/vrl/functions/#string-functions
[4]: https://vector.dev/docs/reference/vrl/functions/#codec-functions
[5]: https://vector.dev/docs/reference/vrl/functions/#encrypt
[6]: https://vector.dev/docs/reference/vrl/functions/#decrypt
[7]: https://vector.dev/docs/reference/vrl/functions/#coerce-functions
[8]: https://vector.dev/docs/reference/vrl/functions/#convert-functions
[9]: https://vector.dev/docs/reference/vrl/functions/#enrichment-functions
[10]: https://vector.dev/docs/reference/vrl/functions/#ip-functions
[11]: https://vector.dev/docs/reference/vrl/functions/#parse-functions
[12]: https://vector.dev/docs/reference/vrl/functions/#event-functions
[13]: https://vector.dev/docs/reference/vrl/functions/#path-functions
[14]: https://vector.dev/docs/reference/vrl/#reference
[15]: /ja/observability_pipelines/vector_configurations
[16]: https://vector.dev/docs/reference/configuration/transforms/sample/
[17]: https://vector.dev/docs/reference/configuration/transforms/reduce/
[18]: https://vector.dev/docs/reference/configuration/transforms/dedupe/
[19]: https://vector.dev/docs/reference/configuration/transforms/filter/
[20]: https://vector.dev/docs/reference/configuration/transforms/aggregate/
[21]: https://vector.dev/docs/reference/configuration/transforms/metric_to_log/
[22]: /ja/observability_pipelines/guide/control_log_volume_and_size/
[23]: https://vector.dev/docs/reference/configuration/transforms/route/