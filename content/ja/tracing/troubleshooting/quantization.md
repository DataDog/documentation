---
further_reading:
- link: /tracing/trace_collection/custom_instrumentation/
  tag: ドキュメント
  text: カスタムインスツルメンテーション
- link: /tracing/configure_data_security/#scrub-sensitive-data-from-your-spans
  tag: ドキュメント
  text: スパン内のタグを置換する
- link: /tracing/trace_collection/library_config/
  tag: ドキュメント
  text: トレーシングライブラリの構成
title: APM データの量子化
---

## 概要

Datadog は取り込み時に、[スパン][1]や[リソース][2]の名前に含まれるランダムなグローバルユニーク ID (GUID) や数値 ID、クエリパラメーター値などの APM データに対して_量子化_を適用しています。その結果、正規化により、これらのスパンやリソースは分析目的上同じであるため、グループ化され、これらのランダムなパターンに起因する名前汚染を削減します。

リソース名やスパン名に含まれる特定のパターンを、以下の静的文字列に置き換えます。
- GUID: `{guid}`
- 数値 ID (英数字以外の文字で囲まれた 6 桁以上の数字、または文字列の末尾にあるもの): `{num}`
- クエリパラメーター値: `{val}`

これらの置き換えは以下に影響します。
- トレースメトリクス名、
- これらのメトリクスのリソース名タグ、
- 取り込まれたすべてのスパンのリソース名とスパン名。

### 量子化の例

例えば、_スパン名_が `find_user_2461685a_80c9_4d9e_85e9_a3b0e9e3ea84` の場合、それは `find_user_{guid}` に改名され、結果としてトレースメトリクスは次のようになります。
- `trace.find_user_guid`
- `trace.find_user_guid.hits`
- `trace.find_user_guid.errors`
- `trace.find_user_guid.duration`
- `trace.find_user_guid.apdex` (サービスに Apdex が構成されている場合)

トレース検索でこれらのスパンを検索するには、クエリは `operation_name:"find_user_{guid}"` となります。

もし、_リソース名_が `SELECT ? FROM TABLE temp_128390123` であった場合、それは `SELECT ? FROM TABLE temp_{num}` に改名され、そのメトリクス正規化タグは `resource_name:select_from_table_temp_num` になります。

トレース検索でこれらのスパンを検索するには、クエリは `resource_name:"SELECT ? FROM TABLE temp_{num}"` となります。

## デフォルトの量子化を避けるためのインスツルメンテーションの変更

**注**: インスツルメンテーションまたは Agent の上流でスパンとリソース名を変更すると、新しいメトリクスとタグが生成されます。量子化されたデータに対してクエリを使用する場合、それらのクエリは新しい名前で動作するように更新する必要があります。

### コード内インスツルメンテーション

アプリケーションがエージェントレスで動作している場合、またはコード内でより直接的にインスツルメンテーションを変更したい場合は、スパン名とリソース名のカスタム構成を作成する方法について、[アプリケーションのランタイムのトレーサードキュメント][3]を参照してください。

### Agent の構成

YAML の構成オプション `replace_tags` を使用すると、Go に準拠した正規表現で独自の置換文字列を設定することができます。

```yaml
apm_config:
  replace_tags:
    # スパン名の末尾の数値 ID を "x" に置き換える。
    - name: "span.name"
      pattern: "get_id_[0-9]+"
      repl: "get_id_x"
    # リソースパスの数値 ID を置き換える。
    - name: "resource.name"
      pattern: "/users/[0-9]+/"
      repl: "/users/{user_id}/"
```

また、環境変数 `DD_APM_REPLACE_TAGS` に、JSON 文字列を値として指定することもできます。

```bash
export DD_APM_REPLACE_TAGS = '[{"name": "span.name", "pattern": "get_id_[0-9]+", "repl": "get_id_x"}, {...}, ...]'
```



{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/glossary/#spans
[2]: /ja/tracing/glossary/#resources
[3]: /ja/tracing/trace_collection/custom_instrumentation/