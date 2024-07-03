---
aliases:
- /ja/integrations/observability_pipelines/guide/control_log_volume_and_size/
- /ja/observability_pipelines/guide/control_log_volume_and_size/
further_reading:
- link: /observability_pipelines/legacy/working_with_data/
  tag: Documentation
  text: Working with data using Observability Pipelines
- link: /observability_pipelines/legacy/configurations/
  tag: Documentation
  text: Learn more about Observability Pipelines configurations
title: (LEGACY) Control Log Volume and Size
---

## 概要

組織の規模が大きくなるとログの量が増えるため、下流のサービス (ログ管理ソリューション、SIEM など) で取り込みやインデックスを作成するコストも増加します。このガイドでは、観測可能性パイプラインの変換を使用してログ量を削減し、ログのサイズを切り詰めて、データがインフラストラクチャーやネットワークから離れる前にコストを管理する方法を説明します。

## 前提条件
- [観測可能性パイプラインワーカーをインストール、構成し][1]、ソースからデータを収集し、宛先にルーティングしている。
- [観測可能性パイプラインの構成の基本][2]に精通している。

## ログ量を管理するために変換を使用する

可観測性パイプラインにおいて、変換はパイプラインを流れるログであるイベントを変更するアクションを実行します。

### イベントの重複排除

[重複排除変換][3]を使用して、パイプラインを通過するデータのコピーを削除するには、構成に次のコンポーネントを追加します。

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: dedupe
    inputs:
      - my-source-or-transform-id
    cache: null
    fields: null
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.my_transform_id]
type = "dedupe"
inputs = [ "my-source-or-transform-id" ]
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "dedupe",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "cache": null,
      "fields": null
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

観測可能性パイプラインワーカーは、重複排除されたイベントを追跡するために、すべてのイベントに一意の識別子を割り当てます。`cache` オプションは、将来的に重複したデータをチェックするために、最近のイベントをキャッシュすることができます。`fields` オプションは、イベントが重複しているかどうかを判断するためにどのフィールドを使用するかをリストアップします。

### イベントの絞り込み

[フィルター変換][4]は、特定の条件を満たす特定のログのみをパイプラインのコンポーネントを通過させたい場合に使用します。例えば、それらの条件は、ログが含まれている場所となります。

- `env` のような特定のタグ。
- 特定のフィールドの値、例えば `status` フィールドは `400` でなければなりません。

そのような場合は、[Datadog Processing Language (DPL) / Vector Remap Language (VRL)][5] または [Datadog Log Search 構文][6]を使用して条件を設定するログをフィルタリングするための[フィルター変換][4]を含むコンポーネントを挿入してください。条件に一致しないログはドロップされます。

以下の例では、フィルター変換と DPL/VRL を使って、`status` が `500` のログのみを送信しています。

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: filter
    inputs:
      - my-source-or-transform-id
    condition: 
      type: "vrl"
      source: ".status == 500"
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.my_transform_id]
type = "filter"
inputs = [ "my-source-or-transform-id" ]

  [transforms.my_transform_id.condition]
  type = "vrl"
  source = ".status == 500"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "filter",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "condition": {
        "type": "vrl",
        "source": ".status == 500"
        }
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

### サンプルログ

CDN のログなど、大量に送られてくるデータやノイズを多く含むデータを分析する場合、すべてのログを送信先に送ることは不要です。代わりに、[サンプル変換][7]を使って、統計的に有意な分析を行うために必要なログのみを送信します。

`exclude` フィールドは、サンプリングするイベントを除外し、DPL/VRL や Datadog Log Search 構文もサポートします。以下の例では、`rate` で設定された 10 イベントごとにサンプリングする構成を示しています。

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: sample
    inputs:
      - my-source-or-transform-id
    exclude: 
       type: "datadog_search"
       source: "*stack"
    rate: 10
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.my_transform_id]
type = "sample"
inputs = [ "my-source-or-transform-id" ]
rate = 10

  [transforms.my_transform_id.exclude]
  type = "datadog_search"
  source = "*stack"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "sample",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "exclude": {
        "type": "datadog_search",
        "source": "*stack"
      },
      "rate": 10
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

### ログをメトリクスに変換する

時間の経過とともに振る舞いを理解したいシナリオでは、一連のログよりも、イベントのデータポイントに関連するメトリクスが有用です。ログがパイプラインを流れるとき、[ログからメトリクスへの変換][8]を使用して、特定のタグに基づいてメトリクスを生成することによって、ログの量を削減することができます。

4 種類のメトリクスを生成することができます。

- カウンター: 特定のタグを持つログのインスタンス数をカウントするのに便利です。カウントを増やしたり、ゼロに戻したりすることができます。
- ディストリビューション: サンプリングされた値の分布を表します。サマリーやヒストグラムの生成に便利です。
- ゲージ: 任意に上下できる単一の数値を表します。頻繁に変動する値を追跡するのに便利です。
- セット: 一意な値を配列にまとめます。一意の IP アドレスを収集する場合などに便利です。

以下の例では、`counter` メトリクスを生成するための構成を示しています。`metrics` はイベントに追加するキーと値のペアを定義します。

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: log_to_metric
    inputs:
      - my-source-or-transform-id
    metrics:
      - type: counter
        field: status
        name: response_total
        namespace: service
        tags:
          status: "{{status}}"
          host: "{{host}}"
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.my_transform_id]
type = "log_to_metric"
inputs = [ "my-source-or-transform-id" ]

  [[transforms.my_transform_id.metrics]]
  type = "counter"
  field = "status"
  name = "response_total"
  namespace = "service"

    [transforms.my_transform_id.metrics.tags]
    status = "{{status}}"
    host = "{{host}}"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "log_to_metric",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "metrics": [
        {
          "type": "counter",
          "field": "status",
          "name": "response_total",
          "namespace": "service",
          "tags": {
            "status": "{{status}}",
            "host": "{{host}}"
          }
        }
      ]
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

上記の構成で以下のようなログが流れた場合

```
{
  "log": {
    "host": "10.22.11.222",
    "message": "Sent 200 in 54.2ms",
    "status": 200
  }
}
```

以下のメトリクスが生成されます。

```
{"metric":{"counter":{"value":1},"kind":"incremental","name":"response_total","namespace":"service","tags":{"host":"10.22.11.222","status":"200"}}}]

```

### 複数のイベントを 1 つのログに折りたたむ

場合によっては、複数のログを 1 つのログに統合することも可能です。このように、ログ量を削減するもう一つの方法は、複数のログを 1 つのログに統合することです。複数のログを 1 つにまとめるには、[縮小変換][9]を使用します。

以下の例では、縮小変換の構成を使用して、複数の Ruby ログの例外イベントを統合しています。

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: reduce
    inputs:
      - my-source-or-transform-id
    group_by:
      - host
      - pid
      - tid
    merge_strategies:
      message: concat_newline
    starts_when: match(string!(.message), r'^[^\\s]')
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.my_transform_id]
type = "reduce"
inputs = [ "my-source-or-transform-id" ]
group_by = [ "host", "pid", "tid" ]
starts_when = "match(string!(.message), r'^[^\\s]')"

[transforms.my_transform_id.merge_strategies]
  message = "concat_newline"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "reduce",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "group_by": [
        "host",
        "pid",
        "tid"
      ],
      "merge_strategies": {
        "message": "concat_newline"
      },
      "starts_when": "match(string!(.message), r'^[^\\s]')"
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

縮小変換では、`group_by` はイベントをグループ化するために使用するフィールドの順序付きリストです。この例では、イベントは `host`、`pid`、`tid` フィールドでグループ化されています。

`merge_strategies` は、フィールド名とカスタム統合戦略の対応表です。各値を配列に追加する `array` や、すべての数値を加算する `sum` など、さまざまな統合戦略が存在します。この例では、`concat_newline` を使用して、各文字列の値を連結し、改行で区切ります。

`starts_when` はトランザクションの最初のイベントを区別するために使用される条件です。この条件があるイベントに対して `true` に解決されると、前のトランザクションはこのイベントなしでフラッシュされ、新しいトランザクションが開始されます。この例では、`^[^\\s]` 正規表現条件にマッチしない `.message` を持つイベントは、1 つのイベントにまとめられます。

上記の構成で、以下の Ruby の例外ログが渡された場合

```
[{"log":{
    "host":"host-1.hostname.com",
    "message":"foobar.rb:6:in `/': divided by 0(ZeroDivisionError)",
    "pid":1234,
    "tid":5678,
    "timestamp":"2020-10-07T12:33:21.223543Z"}
},
{
"log":{
    "host":"host-1.hostname.com",
    "message":"from foobar.rb:6:in `bar'",
    "pid":1234,
    "tid":5678,
    "timestamp":"2020-10-07T12:33:21.223543Z"}
},
{
"log":{
    "host":"host-1.hostname.com",
    "message":"from foobar.rb:2:in `foo'",
    "pid":1234,
    "tid":5678,
    "timestamp":"2020-10-07T12:33:21.223543Z"}
},
{
"log":{
    "host":"host-1.hostname.com",
    "message":"from foobar.rb:9:in `\u003cmain\u003e'",
    "pid":1234,"tid":5678,
    "timestamp":"2020-10-07T12:33:21.223543Z"}
},
{
"log":{
    "host":"host-1.hostname.com",
    "message":"Hello world, I am a new log",
    "pid":1234,
    "tid":5678,
    "timestamp":"2020-10-07T12:33:22.123528Z"
}}]
```

以下のログが生成されます。

```
[{
"log": {
    "host":"host-1.hostname.com",
    "message":"foobar.rb:6:in `/': divided by 0 (ZeroDivisionError)\n
               from foobar.rb:6:in `bar'\n
               from foobar.rb:2:in `foo'\n
               from foobar.rb:9:in `\u003cmain\u003e'",
    "pid":1234,
    "tid":5678,
    "timestamp":"2020-10-07T12:33:21.223543Z"}
},
{
"log":{
    "host":"host-1.hostname.com",
    "message":"Hello world, I am a new log",
    "pid":1234,
    "tid":5678,
    "timestamp":"2020-10-07T12:33:22.123528Z"
}}]
```

## ログサイズを管理するために変換を使用する

### 不要なフィールドを削除し、ログを切り詰める

ログには不要なフィールドが含まれることがあります。1 日に何テラバイトものデータを処理する場合、不要なフィールドを削除することで、取り込みとインデックス作成を行うログの総数を大幅に削減することができます。

不要なフィールドを削除するには、[DPL/VRL][5] を使ってログデータをリマップします。次の例では、`del` を使って不要なタグを削除しています。

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: remap
    inputs:
      - my-source-or-transform-id
    source: |-
      del(.unecessary_env_field)
      del(.unecessary_service_field)
      del(.unecessary_tag_field)
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.my_transform_id]
type = "remap"
inputs = [ "my-source-or-transform-id" ]
source = """
del(.unecessary_env_field)
del(.unecessary_service_field)
del(.unecessary_tag_field)"""
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "remap",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "source": "del(.unecessary_env_field)\ndel(.unecessary_service_field)\ndel(.unecessary_tag_field)"
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/observability_pipelines/legacy/setup/
[2]: /ja/observability_pipelines/legacy/configurations/
[3]: /ja/observability_pipelines/legacy/reference/transforms/#dedupe
[4]: /ja/observability_pipelines/legacy/reference/transforms/#filter
[5]: /ja/observability_pipelines/legacy/reference/processing_language/
[6]: /ja/logs/explorer/search_syntax/
[7]: /ja/observability_pipelines/legacy/reference/transforms/#sample
[8]: /ja/observability_pipelines/legacy/reference/transforms/#logtometric
[9]: /ja/observability_pipelines/legacy/reference/transforms/#reduce