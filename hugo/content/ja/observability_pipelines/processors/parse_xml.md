---
description: XML 解析プロセッサーを使用して XML データをパースし、処理して送信先に送る方法を学びます。
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: ブログ
  text: Observability Pipelines を使用して AI アプリから ClickHouse および Datadog に OTel データをルーティングする
- link: https://www.datadoghq.com/blog/observability-pipelines-mssp
  tag: ブログ
  text: Datadog Observability Pipelines で MSSP のログ収集と集計を簡素化する
- link: https://www.datadoghq.com/blog/observability-pipelines-parsing-xml-logs/
  tag: ブログ
  text: Observability Pipelines で XML ログの収集と処理を簡素化する
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: XML 解析プロセッサー
---
{{< product-availability >}}

## 概要 {#overview}

このプロセッサーは Extensible Markup Language (XML) をパースし、データを処理してさまざまな送信先に送信できるようにします。XML は、構造化データを保存および転送するために使用されるログ形式です。ツリーのような構造で構成されており、ネストされた情報を表現し、タグと属性を使用してデータを定義します。たとえば、次の XML データではタグ (`<recipe>`、`<type>`、`<name>`) のみを使用しており、属性はありません。

```xml
<recipe>
    <type>pasta</type>
    <name>Carbonara</name>
</recipe>
```

次の XML の例では、タグ `recipe` に属性 `type` があります。

```xml
<recipe>
    <recipe type="pasta">
    <name>Carbonara</name>
</recipe>
```

次の画像は、XML 形式の Windows イベント 4625 のログと、それをパースして JSON 形式で出力した同じログを示しています。XML ログをパースすることで、ログイベントのサイズが約 30% 削減されています。

{{< img src="observability_pipelines/processors/xml-side-by-side.png" alt="XML ログとそれをパースした JSON 形式のログ" style="width:80%;" >}}

## セットアップ {#setup}

このプロセッサーをセットアップするには:

1. {{< ui >}}filter query{{< /ui >}}を定義します。詳細については、[ログ検索構文][1]を参照してください。
   - フィルターに一致するログのみが処理されます。
   - フィルタークエリに一致するかどうかに関係なく、すべてのログがパイプラインの次のステップに送信されます。
1. XML をパースするログフィールドへのパスを入力します。サブフィールドを照合するには、パス表記 `<OUTER_FIELD>.<INNER_FIELD>` を使用します。下記の[パス表記の例](#path-notation-example-parse-xml)を参照してください。
1. 必要に応じて、`Enter text key` フィールドに、XML 属性が付加されたときにテキストノードに使用するキー名を入力します。[テキストキーの例](#text-key-example)を参照してください。フィールドを空のままにすると、`value` がキー名として使用されます。
1. 必要に応じて、属性が存在しない場合でもテキストキーを使用してオブジェクト内にテキストを格納する場合は {{< ui >}}Always use text key{{< /ui >}} を選択します。
1. 必要に応じて、XML 属性を含める場合は {{< ui >}}Include XML attributes{{< /ui >}} をオンに切り替えます。その後、使用する属性プレフィックスを追加するかどうかを選択できます。[属性プレフィックスの例](#attribute-prefix-example)を参照してください。フィールドを空のままにすると、元の属性キーが使用されます。
1. 必要に応じて、データ型を数値、ブール値、または null に変換するかどうかを選択します。
    - {{< ui >}}Numbers{{< /ui >}} が選択されている場合、数値が整数および浮動小数点数としてパースされます。
    - {{< ui >}}Booleans{{< /ui >}} が選択されている場合、`true` および `false` がブール値としてパースされます。
    - {{< ui >}}Nulls{{< /ui >}} が選択されている場合、文字列 `null` が null としてパースされます。

### パス表記の例 {#path-notation-example-parse-xml}

{{% observability_pipelines/path_notation %}}

{{% observability_pipelines/path_notation_dots %}}

### [Always use text key] (常にテキストキーを使用する) の例 {#always-use-text-key-example}

{{< ui >}}Always use text key{{< /ui >}} が選択されている場合に、テキストキーがデフォルト (`value`) で、次の XML があるとします。

```xml
<recipe>
    <recipe type="pasta">
    <name>Carbonara</name>
</recipe>
```

この XML は次のように変換されます。

```json
{
    "recipe": {
        "type": "pasta",
        "value": "Carbonara"
        }
}
```

### テキストキーの例 {#text-key-example}

キーが `text` で、次の XML があるとします。

```xml
<recipe>
    <recipe type="pasta">
    <name>Carbonara</name>
</recipe>
```

この XML は次のように変換されます。

```json
{
    "recipe": {
        "type": "pasta",
        "text": "Carbonara"
        }
}
```

### 属性プレフィックスの例 {#attribute-prefix-example}

{{< ui >}}Include XML attributes{{< /ui >}} を有効にすると、属性が各 XML 属性にプレフィックスとして追加されます。たとえば、属性プレフィックスが `@` で、次の XML があるとします。

```xml
<recipe type="pasta">Carbonara</recipe>
```

この場合、JSON に次のように変換されます。

```json
{
    "recipe": {
        "@type": "pasta",
        "<text key>": "Carbonara"
        }
}
```

## ヘルスメトリクス {#health-metrics}

すべてのプロセッサーから出力される[コンポーネントメトリクス][2]および[プロセッサーバッファメトリクス][3]については、[Pipelines 使用状況メトリクス][4]のドキュメントを参照してください。解析プロセッサーのメトリクスでフィルタリングまたはグループ化するには、タグ `component_type:parse` を使用します。

[1]: /ja/observability_pipelines/search_syntax/logs/
[2]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[3]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[4]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}