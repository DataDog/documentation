---
title: プロセッサー
kind: documentation
description: Grok プロセッサーを使用してログをパースする
further_reading:
  - link: /logs/processing/pipelines/
    tag: Documentation
    text: Datadog のパイプライン
  - link: /logs/logging_without_limits/
    tag: Documentation
    text: 無制限のログ
  - link: /logs/explorer/
    tag: Documentation
    text: ログの調査方法
---
## 概要

{{< img src="logs/processing/processors/processing_overview.png" alt="プロセッサー" >}}

[プロセッサー][1]は、[パイプライン][2]の内部で実行し、ログに対してデータ構造化アクション ([属性の再マップ][3]、[Grok パース][4]など) を完了します。

**注**: 構造化ログは有効な形式で送信する必要があります。構造にパースに無効な文字が含まれている場合は、[mask_sequences][5] 機能を使用して、これらを Agent レベルで削除する必要があります。

ベストプラクティスとして、パイプライン毎のプロセッサー数は最大 20 で使用することが推奨されます。

## Grok パーサー

メッセージ全体や[未加工のイベントの特定の属性][1]をパースするためのカスタム Grok ルールを作成できます。詳細については、[パースのセクション][3]を参照してください。ベストプラクティスとして、Grok プロセッサー毎のパース規則は最大 10 で使用することが推奨されます。

{{< tabs >}}
{{% tab "UI" %}}

[Datadog ログ構成ページ][1]で、Grok プロセッサープロセッサーを定義します。

{{< img src="logs/processing/processors/parser.png" alt="パース"  style="width:80%;" >}}

プロセッサーには最大 5 つのサンプルを保存できます。各サンプルの長さは最大 5000 文字となります。すべてのサンプルについて、Grok パーサーのパース規則のいずれかがそのサンプルに一致するかどうかのステータス (`match` または `no match`) を確認することができます。サンプルをクリックで選択するとパース規則との照合が行われ、結果が画面の下に表示されます。

**Parse my logs** をクリックして、基底のパイプラインを流れるログの 3 つのパースルールのセットを始動させます。そこから属性の名前を微調整し、必要に応じて他のタイプのログに新しいルールを追加します。この機能を使用するには、対応するログがインデックス化され、実際に流入している必要があります。除外フィルターを一時的に無効にするか、サンプリングして、これを機能させることができます。

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

次の Grok パーサー JSON ペイロードで [Datadog ログパイプライン API エンドポイント][1]を使用します。

```json
{
  "type": "grok-parser",
  "name": "ログメッセージをパース",
  "is_enabled": true,
  "source": "message",
  "samples": ["sample log 1", "sample log 2"],
  "grok": {"support_rules": "<サポート規則>", "match_rules": "<照合規則>"}
}
```

| パラメーター            | タイプ             | 必須 | 説明                                             |
|----------------------|------------------|----------|---------------------------------------------------------|
| `type`               | 文字列           | はい      | プロセッサーのタイプ。                                  |
| `name`               | 文字列           | いいえ       | プロセッサーの名前。                                  |
| `is_enabled`         | Boolean          | いいえ       | プロセッサーが有効になっているかどうか。デフォルト: `false`。  |
| `source`             | 文字列           | はい      | パースするログ属性の名前。デフォルト: `message`。 |
| `samples`            | 文字列の配列 | いいえ       | この Grok パーサーのサンプルログのリストです（最大 5）。     |
| `grok.support_rules` | 文字列           | はい      | grok パーサーのサポート規則のリスト。             |
| `grok.match_rules`   | 文字列           | はい      | grok パーサーの照合規則のリスト。               |


[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## ログ日付リマッパー

Datadog はログを受信すると、以下のデフォルトの属性のいずれかの値を使用してタイムスタンプを付けます。

* `timestamp`
* `date`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `published_date`

このリストにない属性にログの日付が入っている場合は、ログ日付リマッパープロセッサーを使用して、その日付属性を公式のログタイムスタンプとして定義してください。

<div class="alert alert-info">
認識される日付の形式は、<a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>、<a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (ミリ秒エポック形式)</a>、および <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a> です。
</div>


**注**:

* **過去 18 時間および未来 2 時間までのログイベントを送信できます**。
* ログにデフォルトの属性が含まれず、独自の日付属性も定義していない場合、Datadog は、ログを受信した日付をタイムスタンプとします。
* 複数のログ日付リマッパープロセッサーがログに適用された場合は、(パイプラインの順序で) 最初のプロセッサーだけが考慮されます。

{{< tabs >}}
{{% tab "UI" %}}

[Datadog ログ構成ページ][1]で、ログ日付リマッパープロセッサーを定義します。

{{< img src="logs/processing/processors/log_date_remapper.png" alt="ログ日付リマッパー"  style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

次のログ日付リマッパー JSON ペイロードで [Datadog ログパイプライン API エンドポイント][1]を使用します。

```json
{
    "type": "date-remapper",
    "name": "<ソース属性> を公式のログ日付として定義",
    "is_enabled": false,
    "sources": ["<ソース属性_1>"]
}
```

| パラメーター    | タイプ             | 必須 | 説明                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | 文字列           | はい      | プロセッサーのタイプ。                                |
| `name`       | 文字列           | いいえ       | プロセッサーの名前。                                |
| `is_enabled` | Boolean          | いいえ       | ロセッサーが有効になっているかどうか。デフォルト: `false`。 |
| `sources`    | 文字列の配列 | はい      | ソース属性の配列。                           |

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## ログステータスリマッパー

いくつかの属性を公式ステータスとして割り当てる場合は、このプロセッサーを使用します。次のログを例にします。

{{< img src="logs/processing/processors/log_pre_severity.png" alt=" ログ事前重大度 "  style="width:40%;">}}

変換すると次のようになります。

{{< img src="logs/processing/processors/log_post_severity_bis.png" alt=" ログ事後重大度ビス"  style="width:40%;" >}}

受信したステータス値は、次のようにマップされます。

* 整数値 (0 から 7) は、[Syslog の重大度標準][6]にマップされます
* **emerg** または **f** で始まる文字列 (大文字と小文字の区別なし) は、**emerg (0)** にマップされます
* **a** で始まる文字列 (大文字と小文字の区別なし) は、**alert (1)** にマップされます
* **c** で始まる文字列 (大文字と小文字の区別なし) は、**critical (2)** にマップされます
* **e** で始まる文字列 (大文字と小文字の区別なし) で `emerg` に一致しないものは、**error (3)** にマップされます
* **w** で始まる文字列 (大文字と小文字の区別なし) は、**warning (4)** にマップされます
* **n** で始まる文字列 (大文字と小文字の区別なし) は、**notice (5)** にマップされます
* **i** で始まる文字列 (大文字と小文字の区別なし) は、**info (6)** にマップされます
* **d**、**trace**、または **verbose** で始まる文字列 (大文字と小文字の区別なし) は、**debug (7)** にマップされます
* **o** または **s** で始まる文字列または **OK** か **Success**に一致する文字列 (大文字と小文字の区別なし) は、**OK** にマップされます
* 他はすべて、**info (6)** にマップされます

**注**: 複数のログステータスリマッパープロセッサーがログに適用された場合は、(パイプラインの順序で) 最初のプロセッサーだけが考慮されます。

{{< tabs >}}
{{% tab "UI" %}}

[Datadog ログ構成ページ][1]で、ログステータスリマッパープロセッサーを定義します。

{{< img src="logs/processing/processors/severity_remapper_processor_tile.png" alt="重大度リマッパープロセッサータイル"  style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

次のログステータスリマッパー JSON ペイロードで [Datadog ログパイプライン API エンドポイント][1]を使用します。

```json
{
   "type": "status-remapper",
   "name": " <ソース属性> を公式のログ日付として定義",
   "is_enabled": true,
   "sources": ["<ソース属性>"]
}
```

| パラメーター    | タイプ             | 必須 | 説明                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | 文字列           | はい      | プロセッサーのタイプ。                                |
| `name`       | 文字列           | いいえ       | プロセッサーの名前。                                |
| `is_enabled` | Boolean          | いいえ       | ロセッサーが有効になっているかどうか。デフォルト: `false`。 |
| `sources`    | 文字列の配列 | はい      | ソース属性の配列。                           |

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## サービスリマッパー

いくつかの属性を公式サービスとして割り当てる場合は、このプロセッサーを使用します。

**注**: 複数のサービスリマッパープロセッサーがログに適用された場合は、(パイプラインの順序で) 最初のプロセッサーだけが考慮されます。

{{< tabs >}}
{{% tab "UI" %}}

[Datadog ログ構成ページ][1]で、ログサービスリマッパープロセッサーを定義します。

{{< img src="logs/processing/processors/service_remapper_processor_tile.png" alt="サービスリマッパープロセッサータイル"  style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

次のログサービスリマッパー JSON ペイロードで [Datadog ログパイプライン API エンドポイント][1]を使用します。

```json
{
   "type": "service-remapper",
   "name": "<ソース属性> を公式のログサービスとして定義",
   "is_enabled": true,
   "sources": ["<ソース属性>"]
}
```

| パラメーター    | タイプ             | 必須 | 説明                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | 文字列           | はい      | プロセッサーのタイプ。                                |
| `name`       | 文字列           | いいえ       | プロセッサーの名前。                                |
| `is_enabled` | Boolean          | いいえ       | ロセッサーが有効になっているかどうか。デフォルト: `false`。 |
| `sources`    | 文字列の配列 | はい      | ソース属性の配列。                           |

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## ログメッセージリマッパー

メッセージは Datadog における重要な属性です。メッセージはログエクスプローラーのメッセージ列に表示され、メッセージに対して全文検索を行うことができます。いくつかの属性を公式ログメッセージとして定義するには、このプロセッサーを使用します。

複数のログメッセージリマッパープロセッサーがログに適用された場合は、(パイプラインの順序で) 最初のプロセッサーだけが考慮されます。

{{< tabs >}}
{{% tab "UI" %}}

[Datadog ログ構成ページ][1]で、ログメッセージリマッパープロセッサーを定義します。

{{< img src="logs/processing/processors/message_processor.png" alt="メッセージプロセッサー"  style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

次のログメッセージリマッパー JSON ペイロードで [Datadog ログパイプライン API エンドポイント][1] を使用します。

```json
{
   "type": "message-remapper",
   "name": "<ソース属性> を公式のログメッセージとして定義",
   "is_enabled": true,
   "sources": ["msg"]
}
```

| パラメーター    | タイプ             | 必須 | 説明                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | 文字列           | はい      | プロセッサーのタイプ。                                |
| `name`       | 文字列           | いいえ       | プロセッサーの名前。                                |
| `is_enabled` | Boolean          | いいえ       | ロセッサーが有効になっているかどうか。デフォルト: `false`。 |
| `sources`    | 文字列の配列 | はい      | ソース属性の配列。デフォルト: `msg`。            |

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## リマッパー

リマッパープロセッサーは、ソース属性またはタグを別のターゲット属性またはタグに再マップします。次のログを例にします。

{{< img src="logs/processing/processors/attribute_pre_remapping.png" alt="属性の事前再マッピング "  style="width:40%;">}}

変換すると次のようになります。

{{< img src="logs/processing/processors/attribute_post_remapping.png" alt="属性の事後再マッピング "  style="width:40%;">}}

タグ/属性名の制約については、[タグ付けのドキュメント][7]に説明があります。ターゲットタグ/属性名では `:` および `,` を使用できないため、さらにいくつかの制約が適用されます。

リマッパーのターゲットが属性の場合、リマッパーは値を新しい型（`String`、`Integer`、`Double`）への変換を試みることができます。型変換できない場合、元の型が保持されます（注、`Double` の小数点は `.` を使用します）。 

{{< tabs >}}
{{% tab "UI" %}}

[Datadog ログ構成ページ][1]で、リマッパープロセッサーを定義します。たとえば、ここでは `user` を `user.firstname` に再マップします。

{{< img src="logs/processing/processors/attribute_remapper_processor_tile.png" alt="属性リマッパープロセッサータイル"  style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

次のリマッパー JSON ペイロードで [Datadog ログパイプライン API エンドポイント][1]を使用します。

```json
{
  "type": "attribute-remapper",
  "name": "<SOURCE_ATTRIBUTE> を <TARGET_ATTRIBUTE> へ再マップ",
  "is_enabled": true,
  "source_type": "attribute",
  "sources": ["<SOURCE_ATTRIBUTE>"],
  "target": "<TARGET_ATTRIBUTE>",
  "target_type": "tag",
  "target_format": "integer",
  "preserve_source": false,
  "override_on_conflict": false
}
```

| パラメーター              | タイプ             | 必須 | 説明                                                                    |
|------------------------|------------------|----------|--------------------------------------------------------------------------------|
| `type`                 | 文字列           | はい      | プロセッサーのタイプ。                                                         |
| `name`                 | 文字列           | いいえ       | プロセッサーの名前。                                                         |
| `is_enabled`           | Boolean          | いいえ       | ロセッサーが有効になっているかどうか。デフォルト: `false`。                          |
| `source_type`          | 文字列           | いいえ       | ソースがログの `attribute` または `tag` のどちらであるかを定義します。デフォルト: `attribute`。 |
| `sources`              | 文字列の配列 | はい      | ソース属性またはタグの配列。                                             |
| `target`               | 文字列           | はい      | ソースの再マップ先になる最終的な属性またはタグの名前。                           |
| `target_type`          | 文字列           | いいえ       | ターゲットがログの `attribute` または `tag` のどちらであるかを定義します。デフォルト: `attribute`。    |
| `target_format`        | 文字列           | いいえ       | 属性値を別の型にキャストするかを定義します。可能な値には、`auto`、`string`、`long`、`integer` があり、デフォルトは `auto` です。`auto` に設定するとキャストは適用されません。  |
| `preserve_source`      | Boolean          | いいえ       | 再マップされたソース要素を削除または維持します。デフォルト: `false`。               |
| `override_on_conflict` | Boolean          | いいえ       | ターゲット要素が既に設定されている場合に上書きするかどうか。デフォルト: `false`。            |

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## URL パーサー

このプロセッサーは URL からクエリパラメーターなどの重要なパラメーターを抽出します。これをセットアップすると、次の属性が生成されます。

{{< img src="logs/processing/processors/url_processor.png" alt="URL プロセッサー"  style="width:80%;" >}}

{{< tabs >}}
{{% tab "UI" %}}

[Datadog ログ構成ページ][1]で、URL パーサープロセッサーを定義します。

{{< img src="logs/processing/processors/url_processor_tile.png" alt="URL プロセッサータイル"  style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

```json
{
    "type": "url-parser",
    "name": "http.url 属性から URL をパース",
    "is_enabled": true,
    "sources": ["http.url"],
    "target": "http.url_details"
}
```

| パラメーター    | タイプ             | 必須 | 説明                                                                                                          |
|--------------|------------------|----------|----------------------------------------------------------------------------------------------------------------------|
| `type`       | 文字列           | はい      | プロセッサーのタイプ。                                                                                               |
| `name`       | 文字列           | いいえ       | プロセッサーの名前。                                                                                               |
| `is_enabled` | Boolean          | いいえ       | ロセッサーが有効になっているかどうか。デフォルト: `false`。                                                                |
| `sources`    | 文字列の配列 | いいえ       | ソース属性の配列。デフォルト:  `http.url`                                                                      |
| `target`     | 文字列           | はい      | `sources` から抽出されたすべての詳細を含む親属性の名前。デフォルト: `http.url_details`。 |

{{% /tab %}}
{{< /tabs >}}

## ユーザーエージェントパーサー

ユーザーエージェントパーサーは、User-Agent 属性から OS、ブラウザ、デバイスなどのユーザーデータを抽出します。このパーサーは、Google Bot、Yahoo Slurp、Bing などの主要なボットを認識します。これをセットアップすると、次の属性が生成されます。

{{< img src="logs/processing/processors/useragent_processor.png" alt="ユーザーエージェントプロセッサー"  style="width:80%;">}}

**注**: エンコードされた User-Agent がログに含まれている場合 (IIS ログなど) は、パースの前に **URL をデコードする**ようにプロセッサーを構成してください。

{{< tabs >}}
{{% tab "UI" %}}

[Datadog ログ構成ページ][1]で、ユーザーエージェントプロセッサーを定義します。

{{< img src="logs/processing/processors/useragent_processor_tile.png" alt="ユーザーエージェントプロセッサータイル"  style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

次のユーザーエージェントパーサー JSON ペイロードで [Datadog ログパイプライン API エンドポイント][1]を使用します。

```json
{
    "type": "user-agent-parser",
    "name": "<ソース属性> をパースしてすべてのユーザーエージェント情報を抽出",
    "is_enabled": true,
    "sources": ["http.useragent"],
    "target": "http.useragent_details",
    "is_encoded": false
}
```

| パラメーター    | タイプ             | 必須 | 説明                                                                                                                 |
|--------------|------------------|----------|-----------------------------------------------------------------------------------------------------------------------------|
| `type`       | 文字列           | はい      | プロセッサーのタイプ。                                                                                                      |
| `name`       | 文字列           | いいえ       | プロセッサーの名前。                                                                                                      |
| `is_enabled` | Boolean          | いいえ       | プロセッサーが有効になっているかどうか。デフォルト: `false`。                                                                      |
| `sources`    | 文字列の配列 | いいえ       | ソース属性の配列。デフォルト: `http.useragent`。                                                                      |
| `target`     | 文字列           | はい      | `sources` から抽出されたすべての詳細を含む親属性の名前。デフォルト: `http.useragent_details`。 |
| `is_encoded` | Boolean          | いいえ       | ソース属性が URL エンコードされているかどうかを定義します。デフォルト: `false`。                                                     |

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## カテゴリプロセッサー

指定された検索クエリに一致するログに、新しい属性 (新しい属性の名前にはスペースまたは特殊文字を含まない) を追加するには、カテゴリプロセッサーを使用します。
複数のカテゴリを使用すると、1 つの分析ビューに複数のグループが作成されます (複数の URL グループ、マシングループ、環境、応答時間バケットなど)。

**注**:

* このクエリの構文は [ログエクスプローラー][8]検索バーで使用されているものです。クエリはファセットか否かに関わらず、任意のログ属性またはタグで実行できます。クエリ内でワイルドカードを使用することも可能です。
* ログは、プロセッサークエリのいずれかと一致した時点で停止します。1 つのログが複数のクエリに一致する可能性がある場合は、クエリが正しい順序になっていることを確認してください。
* カテゴリ名は一意でなければなりません。
* カテゴリプロセッサーを定義したら、 [ログステータスリマッパー][9]を使用してカテゴリをログステータスにマップします。

{{< tabs >}}
{{% tab "UI" %}}

[Datadog ログ構成ページ][1]で、カテゴリプロセッサーを定義します。たとえば、Web アクセスログをステータスコード範囲に基づいて分類 (応答コード 200 ～ 299 の場合は「OK」、応答コード 300 ～ 399 の場合は「通知」など) するには、次のプロセッサーを追加します。

{{< img src="logs/processing/processors/category_processor.png" alt="カテゴリープロセッサー"  style="width:80%;" >}}

このプロセッサーは、以下の結果を生成します。

{{< img src="logs/processing/processors/category_processor_result.png" alt="カテゴリープロセッサー結果"  style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

次のカテゴリプロセッサー JSON ペイロードで [Datadog ログパイプライン API エンドポイント][1]を使用します。

```json
{
  "type": "category-processor",
  "name": "<ターゲット属性> 属性にカスタム値を割り当て",
  "is_enabled": true,
  "categories": [
    {"filter": {"query": "<クエリ_1>"}, "name": "<割り当て値_1>"},
    {"filter": {"query": "<クエリ_2>"}, "name": "<割り当て値_2>"}
  ],
  "target": "<ターゲット属性>"
}
```

| パラメーター    | タイプ            | 必須 | 説明                                                                                                |
|--------------|-----------------|----------|------------------------------------------------------------------------------------------------------------|
| `type`       | 文字列          | はい      | プロセッサーのタイプ。                                                                                     |
| `name`       | 文字列          | いいえ       | プロセッサーの名前。                                                                                     |
| `is_enabled` | Boolean         | いいえ       | ロセッサーが有効になっているかどうか。デフォルト: `false`。                                                      |
| `categories` | オブジェクトの配列 | はい      | フィルターと名前の配列。フィルターはログに一致するかどうかを識別し、名前はログにカスタム値を割り当てるために使用されます。 |
| `target`     | 文字列          | はい      | 一致するカテゴリによって値が定義されるターゲット属性の名前。                              |

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## 算術演算プロセッサー

ログに、指定された式の結果を含む新しい属性 (新しい属性の名前にはスペースまたは特殊文字を含まない) を追加するには、算術演算プロセッサーを使用します。
これを使用して、異なる単位を持つ異なる時間属性を 1 つの属性に再マップしたり、同じログ内の複数の属性に対して演算を行うことができます。

式には、括弧および基本的な算術演算子 `-`、`+`、`*`、`/` を使用できます。

デフォルトでは、属性がない場合は計算がスキップされます。「Replace missing attribute by 0」を選択すると、属性値がない場合は自動的に 0 を挿入して、常に計算が行われます。
属性値がないとは、ログ属性内に見つからない場合、または数値に変換できない場合です。

**注**:

* 演算子 `-` は、属性名にも使用されるため、式内ではスペースで区切る必要があります。
* ターゲット属性が既に存在している場合は、式の結果で上書きされます。
* 結果は小数第 9 位に丸められます。たとえば、式の結果が `0.1234567891` の場合、実際に属性に格納される値は `0.123456789` になります。
* 測定単位の拡張が必要な場合は、 [スケールフィルター][10]を参照してください。

{{< tabs >}}
{{% tab "UI" %}}

[Datadog ログ構成ページ][1]で、算術演算プロセッサーを定義します。

{{< img src="logs/processing/processors/arithmetic_processor.png" alt="算術演算プロセッサー"  style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

次の算術演算プロセッサー JSON ペイロードで [Datadog ログパイプライン API エンドポイント][1]を使用します。

```json
{
    "type": "arithmetic-processor",
    "name": "<プロセッサー名>",
    "is_enabled": true,
    "expression": "<算術演算>",
    "target": "<ターゲット属性>",
    "is_replace_missing": false
}
```

| パラメーター            | タイプ    | 必須 | 説明                                                                                                                                  |
|----------------------|---------|----------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `type`               | 文字列  | はい      | プロセッサーのタイプ。                                                                                                                       |
| `name`               | 文字列  | いいえ       | プロセッサーの名前。                                                                                                                       |
| `is_enabled`         | Boolean | いいえ       | プロセッサーが有効になっているかどうか。デフォルト: `false`。                                                                                       |
| `expression`         | 文字列  | はい      | 1 つ以上のログ属性間の算術演算。                                                                                     |
| `target`             | 文字列  | はい      | 算術演算の結果を格納する属性の名前。                                                                  |
| `is_replace_missing` | Boolean | いいえ       | `true` の場合は、`expression` 内の欠落している属性をすべて 0 に置き換えます。`false` の場合は、属性が欠落していると演算をスキップします。デフォルト: `false`。 |

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## ストリングビルダープロセッサー

ログに、指定されたテンプレートの結果を含む新しい属性 (スペースまたは特殊文字を含まない) を追加するには、ストリングビルダープロセッサーを使用します。
これを使用して、異なる属性や生文字列を 1 つの属性に集約することができます。

このテンプレートは生テキストとブロックに `%{属性パス}` 構文 を組み合わせた形で定義されます。

**注**:

* このプロセッサーでは、ブロック内に値または値の配列を持つ属性のみしか使用できません ([UI セクション](?tab=ui#string-builder-processor) の例をご参照ください) 。
* 属性 (オブジェクトまたはオブジェクトの配列) が使用できない場合、その属性を空の文字列に置換するか、操作自体をスキップするかを選択することができます。
* ターゲット属性が既に存在する場合、その属性はテンプレートの結果で上書きされます。
* テンプレートの結果は 256 文字以内に収める必要があります。

{{< tabs >}}
{{% tab "UI" %}}

[Datadog ログ構成ページ][1]で、ストリングビルダープロセッサーを定義します。

{{< img src="logs/processing/processors/stringbuilder_processor.png" alt="ストリングビルダープロセッサー"  style="width:80%;">}}

**例**

次のログと組み合わせます。

```json
{
  "http": {
    "method": "GET",
    "status_code": 200,
    "url": "https://app.datadoghq.com/users"
  },
  "array_ids": [123, 456, 789],
  "array_users": [
    {"first_name": "John", "last_name": "Doe"},
    {"first_name": "Jack", "last_name": "London"}
  ]
}
```

テンプレート `リクエスト %{http.method} %{http.url} に対する応答 %{http.status_code}` を利用して結果を得ることができます。

```text
リクエスト GET https://app.datadoghq.com/users に対する応答 200
```

**オブジェクト**:

ログの例では、`http` はオブジェクトであるためブロックでは使用できませんが (`%{http}` は失敗)、`%{http.method}`、`%{http.status_code}`、または `%{http.url}` であれば対応する値を取得できます。

**配列**:

ブロックは、値の配列または配列内の特殊な属性に使用できます。ログの例ではブロック `%{array_ids}` を追加することで次の値を取得しています:

```text
123,456,789
```

`%{array_users}` はオブジェクトリストのため戻り値はありません。
しかし、`%{array_users.first_name}` は次のように配列に含まれる `first_name` のリストを返します:

```text
John,Jack
```

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

次のストリングビルダープロセッサー JSON ペイロードで [Datadog ログパイプライン API エンドポイント][1]を使用します。

```json
{
    "type": "string-builder-processor",
    "name": "<プロセッサー名>",
    "is_enabled": true,
    "template": "<ストリングビルダーテンプレート>",
    "target": "<ターゲット属性>",
    "is_replace_missing": true
}
```

| パラメーター            | タイプ    | 必須 | 説明                                                                                                                                       |
|----------------------|---------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`               | 文字列  | 〇      | プロセッサーのタイプ。                                                                                                                            |
| `name`               | 文字列  | ✕       | プロセッサーの名前。                                                                                                                            |
| `is_enabled`         | Boolean | ✕       | プロセッサーが有効になっているかどうかを示します。デフォルトは `false` です。                                                                                          |
| `template`           | 文字列  | 〇      | 1 つまたは複数の属性と生テキストを使用した数式です。                                                                                               |
| `target`             | 文字列  | 〇      | テンプレートの結果を含む属性名です。                                                                               |
| `is_replace_missing` | Boolean | ✕       | `true` の場合は、`template` 内の欠落している属性をすべて空の文字列に置き換えます。`false` の場合 (デフォルト) は、属性が欠落していると演算をスキップします。 |

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## GeoIP パーサー

GeoIP パーサーは IP アドレスの属性を読み取り、ターゲット属性パスに含まれる大陸、国、都道府県 (州)、都市名などの情報を抽出します。

{{< tabs >}}
{{% tab "UI" %}}

{{< img src="logs/processing/processors/geoip_processor.png" alt="GeoIP プロセッサー"  style="width:80%;">}}

<mrk mid="459" mtype="seg"/><mrk mid="460" mtype="seg"/>

以下にて、GeoIP パーサーが抽出する位置情報の例をご覧いただけます。この例では `network.client.ip` 属性から情報を抽出し、`network.client.geoip` 属性に保存しています。

{{< img src="logs/processing/processors/geoip_example.png" alt="GeoIP 例"  style="width:60%;">}}

**注**: 

[1]: https://www.maxmind.com
{{% /tab %}}
{{% tab "API" %}}

次の Geo-IP パーサー JSON ペイロードで [Datadog ログパイプライン API エンドポイント][1]を使用します。

```json
{
    "type": "geo-ip-parser",
    "name": "network.client.ip 属性から位置情報のエレメントをパース",
    "is_enabled": true,
    "sources": ["network.client.ip"],
    "target": "network.client.geoip"
}
```

| パラメーター    | タイプ             | 必須 | 説明                                                                                                               |
|--------------|------------------|----------|---------------------------------------------------------------------------------------------------------------------------|
| `type`       | 文字列           | はい      | プロセッサーのタイプ。                                                                                                    |
| `name`       | 文字列           | いいえ       | プロセッサーの名前。                                                                                                    |
| `is_enabled` | Boolean          | いいえ       | ロセッサーが有効になっているかどうか。デフォルト: `false`。                                                                     |
| `sources`    | 文字列の配列 | いいえ       | ソース属性の配列。デフォルト: `network.client.ip`                                                                  |
| `target`     | 文字列           | はい      | `sources` から抽出されたすべての詳細を含む親属性の名前。デフォルト:  `network.client.geoip`  |

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## ルックアッププロセッサー

ルックアッププロセッサーを使用して、ログ属性と、[エンリッチメントテーブル (ベータ版)][11] またはプロセッサーのマッピングテーブル内に保存されている視認可能な値のマッピングを定義します。
たとえば、ルックアッププロセッサーで内部のサービス ID をマップし、読んで意味の通るサービス名を割り当てることができます。
また、このプロセッサーで本番環境に接続を試みた MAC アドレスと盗難に遭ったマシンのリストを照合し、接続元をチェックすることも可能です。

{{< tabs >}}
{{% tab "UI" %}}

{{< img src="logs/processing/processors/lookup_processor.png" alt="ルックアッププロセッサー"  style="width:80%;">}}

このプロセッサーでは以下のアクションを実行可能です。

* 現在のログにソース属性が含まれていないかを確認する。
* ソース属性の値がマッピングテーブルに存在するかをチェックする。
  * 存在する場合、テーブルにターゲット属性を作成し、対応する値を割り当てる。
  * (オプション) マッピングテーブルに値が存在しない場合、デフォルト値でターゲット属性を作成する。

マッピングテーブルには、エンリッチメントテーブルを選択する、手動で `source_key,target_value` のリストを入力する、または CSV ファイルをアップロードすることで値を入力できます。

マッピングテーブルのサイズ上限は 100Kb です。この制限はプラットフォーム上のすべてのルックアッププロセッサーに適用されますが、エンリッチメントテーブルはより大容量のファイルサイズをサポートしています。

{{% /tab %}}
{{% tab "API" %}}

次のルックアッププロセッサー JSON ペイロードで [Datadog ログパイプライン API エンドポイント][1]を使用します。

```json
{
  "type": "lookup-processor",
  "name": "<プロセッサー名>",
  "is_enabled": true,
  "source": "<ソース属性>",
  "target": "<ターゲット属性>",
  "lookup_table": ["key1,value1", "key2,value2"],
  "default_lookup": "<デフォルトターゲット値>"
}
```

| パラメーター        | タイプ             | 必須 | 説明                                                                                                                                                              |
|------------------|------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`           | 文字列           | はい      | プロセッサーのタイプ。                                                                                                                                                   |
| `name`           | 文字列           | いいえ       | プロセッサーの名前。                                                                                                                                                   |
| `is_enabled`     | Boolean          | はい      | プロセッサーが有効になっているかどうかを示します。デフォルトは `false` です。                                                                                                                     |
| `source`         | 文字列           | はい      | ルックアップを実行する際に使用したソース属性です。                                                                                                                             |
| `target`         | 文字列           | はい      | マッピングリスト内 (マッピングリスト内で見つからない場合は `default_lookup` ) の対応する値を含む属性名です。                                |
| `lookup_table`   | 文字列の配列 | はい      | ソース属性値とそれに関連するターゲット属性値のマッピングテーブルです。[ "source_key1,target_value1", "source_key2,target_value2" ] のような形式で示されます。 |
| `default_lookup` | 文字列           | いいえ       | リスト上にソースの値がない場合、ターゲット属性に設定する値です。                                                                                          |

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## トレースリマッパー

アプリケーショントレースとログの間の関連付けを改善する方法は 2 つあります。

1. [トレース ID をアプリケーションログに挿入する方法][12]のドキュメントを参照してください。セットアップの大半は、ログのインテグレーションによってデフォルトで行われます。

2. トレースリマッパープロセッサーを使用して、トレース ID として関連付けられるログ属性を定義します。

{{< tabs >}}
{{% tab "UI" %}}

[Datadog ログ構成ページ][1]で、トレースリマッパープロセッサーを定義します。次のように、プロセッサータイルでトレース ID 属性パスを入力します。

{{< img src="logs/processing/processors/trace_processor.png" alt="トレース ID プロセッサー"  style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

次のトレースリマッパー JSON ペイロードで [Datadog ログパイプライン API エンドポイント][1]を使用します。

```json
{
   "type": "trace-id-remapper",
   "name": "dd.trace_id を、このログに関連する公式のトレース ID として定義",
   "is_enabled": true,
   "sources": ["dd.trace_id"]
}
```

| パラメーター    | タイプ             | 必須 | 説明                                            |
|--------------|------------------|----------|--------------------------------------------------------|
| `type`       | 文字列           | はい      | プロセッサーのタイプ。                                 |
| `name`       | 文字列           | いいえ       | プロセッサーの名前。                                 |
| `is_enabled` | Boolean          | いいえ       | プロセッサーが有効になっているかどうか。デフォルト: `false`。 |
| `sources`    | 文字列の配列 | いいえ       | ソース属性の配列。デフォルト: `dd.trace_id`。    |

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/processing/parsing/#advanced-settings
[2]: /ja/logs/processing/pipelines/
[3]: /ja/logs/processing/parsing/
[4]: /ja/logs/processing/processors/?tab=ui#grok-parser
[5]: https://docs.datadoghq.com/ja/agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs
[6]: https://en.wikipedia.org/wiki/Syslog#Severity_level
[7]: /ja/logs/guide/log-parsing-best-practice/
[8]: /ja/logs/search_syntax/
[9]: /ja/logs/processing/processors/?tab=ui#log-status-remapper
[10]: /ja/logs/processing/parsing/?tab=filter#matcher-and-filter
[11]: /ja/logs/guide/enrichment-tables/
[12]: /ja/tracing/connect_logs_and_traces/