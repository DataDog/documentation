---
aliases:
- /ja/integrations/observability_pipelines/vector_configurations/
further_reading:
- link: /observability_pipelines/working_with_data/
  tag: ドキュメント
  text: Vector を使ったデータ操作
- link: https://vector.dev/releases/
  tag: ドキュメント
  text: Vector の新リリースをチェックする
- link: https://vector.dev/docs/reference/configuration/sources/datadog_agent/
  tag: ドキュメント
  text: Vector のソースとなる Datadog Agent
- link: /observability_pipelines/integrations/integrate_vector_with_datadog/
  tag: ドキュメント
  text: Vector にデータを送信するための Datadog Agent の構成
kind: ドキュメント
title: Vector の構成
---

## 概要

Vector の構成は、ログ、メトリクス、トレースを収集し、変換し、任意のソースから任意の宛先にルーティングすることができます。Vector はコンフィギュレーションファイルを使って構成し、YAML、TOML、JSON をサポートします。主な構成要素は、ソース、トランスフォーム、シンクの 3 つです。

## サンプルソースを設定する

[ソースコンポーネント][1]は、Vector が可観測性データソースからどのようにデータを収集し、または受信するかを定義します。

コンフィギュレーションファイル (例: `vector.toml`) を作成します。そして、以下のソースの例を追加します。

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
sources:
  generate_syslog:
    type: demo_logs
    format: syslog
    count: 100
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[sources.generate_syslog]
   type = "demo_logs"
   format = "syslog"
   count = 100
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
"sources": {
    "generate_syslog": {
      "type": "demo_logs",
      "format": "syslog",
      "count": 100
    }
}
```

{{% /tab %}}
{{< /tabs >}}

この `source` コンポーネントは `generate_syslog` という一意の ID を持っています。こ一意の ID は `sink` コンポーネントでデータを変換してルーティングする際に重要です。

`type` は、Vector 構成が可観測性データを収集するソースの種類です。この例では `demo_logs` ソースを使用しています。このソースは、さまざまな形式のイベントの種類をシミュレートできるように、サンプルログデータを作成します。`format` オプションは `demo_logs` ソースに対して、どのタイプのログを出力するかを指定します (この場合、Syslog フォーマット)。`count` オプションは `demo_logs` ソースに対して、何行のログを出力するかを指定します。

サポートされているすべてのソースは、[ソースドキュメント][1]をご覧ください。

## トランスフォームの例を設定する

次の例を使用して、`demo_logs` ソースから収集したデータを操作する[トランスフォームコンポーネント][2]を定義します。

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  remap_syslog:
    inputs:
      - generate_syslog
    type: remap
    source: |2
        structured = parse_syslog!(.message)
        . = merge(., structured)
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.remap_syslog]
   inputs = ["generate_syslog" ]
   type = "remap"
   source = '''
     structured = parse_syslog!(.message)
     . = merge(., structured)
'''
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
"transforms": {
    "remap_syslog": {
      "inputs": [
        "generate_syslog"
      ],
      "type": "remap",
      "source": "  structured = parse_syslog!(.message)\n  . = merge(., structured)\n"
    }
  }
```

{{% /tab %}}
{{< /tabs >}}

この `transforms.remap_syslog` コンポーネントでは、`inputs` オプションが `generate_syslog` に設定されており、先に定義した `generate_syslog` ソースからイベントを受信することになります。このトランスフォームのコンポーネントタイプは `remap` です。

`source` には、Vector が受け取る各イベントに適用する再マッピング変換のリストが含まれています。この例では、`parse_syslog` という 1 つの処理のみを実行していますが、複数の処理を追加することもできます。

`parse_syslog` 関数は `message` という単一のフィールドを受け取ります。このフィールドには、`generate_syslog` ソースで生成された Syslog イベントが格納されています。この関数は Syslog フォーマットのメッセージの内容をパースして、構造化イベントとして出力します。

この変換例は、ログ、メトリクス、およびトレースを形成し変換するための Vector の能力のほんの一部を紹介するものです。サンプリング、フィルター、リッチ化など、サポートされているすべての変換については、[トランスフォームのドキュメント][2]を参照してください。

## シンクの例を設定する

`transform` コンポーネントでパースされたデータを、次の[シンク][3]の例を使って、宛先にルーティングします。

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
sinks:
  emit_syslog:
    inputs:
      - remap_syslog
    type: console
    encoding:
      codec: json
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[sinks.emit_syslog]
inputs = [ "remap_syslog" ]
type = "console"

  [sinks.emit_syslog.encoding]
  codec = "json"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
"sinks": {
    "emit_syslog": {
      "inputs": [
        "remap_syslog"
      ],
      "type": "console",
      "encoding": {
        "codec": "json"
      }
    }
}
```

{{% /tab %}}
{{< /tabs >}}

この `sink` (または宛先) コンポーネントは `emit_syslog` という ID を持ちます。`inputs` オプションは、`remap_syslog` トランスフォームによって生成されたイベントをこのシンクで処理することを指定します。`encoding` オプションは、イベントを JSON フォーマットで出力するようにシンクに指示します。

サポートされているすべてのシンクについては、[シンクのドキュメント][3]を参照してください。

## ここまでのまとめ

ソース、トランスフォーム、シンクの 3 つの基本コンポーネントが揃えば、これで Vector のコンフィギュレーションファイルは完成です。

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
sources:
  generate_syslog:
    type: demo_logs
    format: syslog
    count: 100
transforms:
  remap_syslog:
    inputs:
      - generate_syslog
    type: remap
    source: |2
        structured = parse_syslog!(.message)
        . = merge(., structured)

sinks:
  emit_syslog:
    inputs:
      - remap_syslog
    type: console
    encoding:
      codec: json
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[sources.generate_syslog]
type = "demo_logs"
format = "syslog"
count = 100

[transforms.remap_syslog]
inputs = [ "generate_syslog" ]
type = "remap"
source = '''
  structured = parse_syslog!(.message)
  . = merge(., structured)
'''

[sinks.emit_syslog]
inputs = [ "remap_syslog" ]
type = "console"

  [sinks.emit_syslog.encoding]
  codec = "json"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "sources": {
    "generate_syslog": {
      "type": "demo_logs",
      "format": "syslog",
      "count": 100
    }
  },
  "transforms": {
    "remap_syslog": {
      "inputs": [
        "generate_syslog"
      ],
      "type": "remap",
      "source": "  structured = parse_syslog!(.message)\n  . = merge(., structured)\n"
    }
  },
  "sinks": {
    "emit_syslog": {
      "inputs": [
        "remap_syslog"
      ],
      "type": "console",
      "encoding": {
        "codec": "json"
      }
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

この構成をコンパイルして実行するには、以下のコマンドを実行します。

```
vector --config ./<configuration_filename>
```

設定に成功すると、パースされたデモログが JSON 形式で出力されます。

## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://vector.dev/docs/reference/configuration/sources/
[2]: https://vector.dev/docs/reference/configuration/transforms/
[3]: https://vector.dev/docs/reference/configuration/sinks/