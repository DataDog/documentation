---
algolia:
  tags:
  - grok
  - grok parser
  - logs parsing
  - Extracting Attributes
  - Remapping attributes
  - parsing
aliases:
- /ja/logs/processing/processors/
description: Grok プロセッサーを使用してログをパースする
further_reading:
- link: /logs/log_configuration/pipelines
  tag: よくあるご質問
  text: Datadog パイプラインの検出
- link: /logs/logging_without_limits/
  tag: よくあるご質問
  text: Logging without Limits*
- link: /logs/explorer/
  tag: よくあるご質問
  text: ログの調査方法
- link: https://www.youtube.com/watch?v=OztSU3JzfC8&list=PLdh-RwQzDsaM9Sq_fi-yXuzhmE7nOlqLE&index=4&t=245s
  tag: ビデオ
  text: 'ヒントとコツ: 小売エンドポイントからログにビジネスデータを追加'
title: プロセッサー
---
概要

<div class="alert alert-info">このドキュメントで説明しているプロセッサーは、クラウドベースのログ環境に特化しています。オンプレミスのログをパース、構造化、強化するには、<a href="https://docs.datadoghq.com/observability_pipelines/processors/">Observability Pipelines</a>を参照してください。

プロセッサーは[パイプライン][1]の中で実行され、データ構造化アクションを完了し、ログを豊かにする属性を生成します。

{{< img src="logs/log_configuration/processor/processor_overview.png" alt="プロセッサー" style="width:100%" >}}

[ログコンフィギュレーション設定][1]では、[Grok パーサー](#grok-parser)や[日付リマッパー](#remapper)などのプロセッサーを設定して、ログの属性を抽出、作成、再マッピングし、ファセット検索を充実させることができます。

注:

 構造化ログは有効な形式で送信する必要があります。構造にパースに無効な文字が含まれている場合は、[mask_sequences][2] 機能を使用して、これらを Agent レベルで削除する必要があります。

-ベストプラクティスとして、パイプライン毎のプロセッサー数は最大 20 で使用することが推奨されます。

##grok パーサー

メッセージ全体や未加工のイベントの特定の属性をパースするためのカスタム Grok ルールを作成できます。ベストプラクティスとして、Grok パーサーは 10 のパース規則に制限してください。Grok の構文とパース規則に関する詳細は、[パース][10] を参照してください。

{{< img src="/logs/processing/processors/define_parsing_rules_syntax_suggestions.png" alt="UI 内の Grok パーサー構文の提案" style="width:90%;" >}}

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** ページ][1]で Grok プロセッサーを定義します。Grok パース規則を設定するには

1. **Parse my logs1.**1. をクリックして、パイプラインを流れるログに基づいて 3 つのパース規則セットを自動生成します。
   **注**: この機能を使用するには、対応するログがインデックスされ、実際に流入している必要があります。除外フィルターを一時的に無効にするか、サンプリングダウンして、ログを検出することができます。
1. **ログサンプル**: 最大 5 つのサンプルログ (各 5000 文字まで) を追加して、パース規則をテストします。
1. **パース規則の定義**: ルールエディターでパース規則を記述します。ルールを定義すると、Grok パーサーにより構文支援が提供されます。
    **マッチャーの提案**: ルール名の後に `%{` を入力してください。利用可能なマッチャー（`word`、`integer`、`ip`、`date`など）を含むドロップダウンが表示されます。リストからマッチャーを選択して、ルールに挿入します。<br>
     ```
     MyParsingRule %{
     ```
   - ****- **フィルターの提案******: `:``:``:` を使用してフィルターを追加すると、選択したマッチャーに対応するフィルターがドロップダウンに表示されます。
1. **ルールのテスト**: サンプルをクリックして選択すると、パース規則に照らして評価が開始され、画面の下部に結果が表示されます。すべてのサンプルにはステータス（`match`または`no match`）が表示され、Grok パーサーのパース規則のいずれかがサンプルに一致するかどうかが強調表示されます。

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

次の Grok パーサー JSON ペイロードで [Datadog ログパイプライン API エンドポイント][1] を使用します。

```json
{
  "type": "grok-parser",
  "name": "Parsing Log message",
  "is_enabled": true,
  "source": "message",
  "samples": ["sample log 1", "sample log 2"],
  "grok": {"support_rules": "<SUPPORT_RULES>", "match_rules": "<MATCH_RULES>"}
}
```

|||パラメーター|||型|||必須|||説明|||
|----------------------|------------------|----------|---------------------------------------------------------|
| `type`               | 文字列           | はい      | プロセッサーのタイプ。                                 |
| `name`               | 文字列           | いいえ       | プロセッサーの名前。                                 |
| `is_enabled`         | ブール値          | いいえ       | プロセッサーが有効になっているかどうか。既定値: |
| `source`             | 文字列           | はい      | パースするログ属性の名前。既定値:|
| `samples`            | 文字列の配列 | いいえ       | この Grok パーサーのサンプルログのリスト（最大 5）。    |
| `grok.support_rules` | 文字列           | はい      | grok パーサーのサポート規則のリスト。            |
| `grok.match_rules`   | 文字列           | はい      | grok パーサーの照合規則のリスト。               |


[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

ログ日付リマッパー

Datadog はログを受信すると、次のデフォルト属性のいずれかの値を使用してタイムスタンプを付けます。

* `timestamp`
* `date`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `published_date`

ログにこのリストにない属性の日付がある場合は、ログ日付リマッパープロセッサーを使用して、その日付属性を公式のログタイムスタンプとして定義してください。

<div class="alert alert-info">
認識された日付形式は、<a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a><a href="https://en.wikipedia.org/wiki/Unix_time"></a>、</a><a href="https://www.ietf.org/rfc/rfc3164.txt"></a>UNIX (ミリ秒 EPOCH 形式)</a></a>、および RFC3164 です。
</div>

ログに上記の形式に準拠したタイムスタンプがない場合、Grok プロセッサーを使用してタイムスタンプからエポックタイムを抽出し、新しい属性に変換します。日付リマッパーは新しく定義された属性を使用します。

Datadog でカスタム日付と時間形式をパースする方法については、[日付のパース][3] を参照してください。

**注:**

ログイベントは過去 18 時間、未来の 2 時間まで送信が可能です。
*ISO 8601-1:2019 に基づく基本形式は `T[hh][mm][ss]` で、拡張形式は `T[hh]:[mm]:[ss]` です。以前のバージョンでは、両方の形式で T (時間を表す) が省略されていました。
*ログにデフォルトの属性が含まれず、独自の日付属性も定義していない場合、Datadog は、ログを受信した日付をタイムスタンプとします。
*複数のログ日付リマッパープロセッサーがパイプライン内の特定のログに適用された場合は、(パイプラインの順序で) 最後のプロセッサーが考慮されます。

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** ページ][1]でログ日付リマッパープロセッサーを定義します。

{{< img src="logs/log_configuration/processor/date_remapper.png" alt="日付属性の定義" style="width:80%;" >}}

{{< img src="logs/log_configuration/processor/date_remapper_example.png" alt="ログエクスプローラーサイドパネルの日時" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

次のログ日付リマッパー JSON ペイロードで [Datadog ログパイプライン API エンドポイント][1] を使用します。

```json
{
  "type": "date-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official Date of the log",
  "is_enabled": false,
  "sources": ["<SOURCE_ATTRIBUTE_1>"]
}
```

|||パラメーター|||型|||必須|||説明|||
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | 文字列           | はい      | プロセッサーのタイプ。                               |
| `name`       | 文字列           | いいえ       | プロセッサーの名前。                               |
| `is_enabled` | ブール値          | いいえ       | プロセッサーが有効になっているかどうか。既定値:|
| `sources`    | 文字列の配列 | はい      | ソース属性の配列。                           |

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

ログステータスリマッパー

ステータスリマッパープロセッサーを使用して、ログに公式なステータスとして属性を割り当てます。たとえば、ステータスリマッパーを使用してログにログ重大度レベルを付加します。

受信したステータス値は、次のようにマップされます。

整数値 (0 から 7) は、[Syslog の重大度標準][4]にマップされます
**emerg** または **f** で始まる文字列 (大文字と小文字の区別なし) は、**emerg (0)** にマップされます
**a** で始まる文字列 (大文字と小文字の区別なし) は、**alert (1)** にマップされます
**c** で始まる文字列 (大文字と小文字の区別なし) は、**critical (2)** にマップされます
**err** で始まる文字列 (大文字と小文字の区別なし) は、**error (3)** にマップされます
**w** で始まる文字列 (大文字と小文字の区別なし) は、**warning (4)** にマップされます
**n** で始まる文字列 (大文字と小文字の区別なし) は、**notice (5)** にマップされます
**i** で始まる文字列 (大文字と小文字の区別なし) は、**info (6)** にマップされます
**d**、**t**、**v**、**trace**、または **verbose** で始まる文字列 (大文字と小文字の区別なし) は、**debug (7)** にマップされます
**o** または **s** で始まる文字列または **OK** か **Success**に一致する文字列 (大文字と小文字の区別なし) は、**OK** にマップされます
他はすべて、**info (6)** にマップされます

**注**: 複数のログステータスリマッパープロセッサーがパイプライン内のログに適用された場合は、パイプラインの順序で最初のプロセッサーのみが考慮されます。さらに、ログに一致するすべてのパイプラインにおいて、(適用可能なパイプラインの中で) 最初に検出されたステータスリマッパーのみが適用されます。

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** ページ][1]でログステータスリマッパープロセッサーを定義します。

{{< img src="logs/log_configuration/processor/severity_remapper.png" alt="ログ重大度のリマッピング" style="width:60%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

次のログステータスリマッパー JSON ペイロードで [Datadog ログパイプライン API エンドポイント][1] を使用します。

```json
{
  "type": "status-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official status of the log",
  "is_enabled": true,
  "sources": ["<SOURCE_ATTRIBUTE>"]
}
```

|||パラメーター|||型|||必須|||説明|||
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | 文字列           | はい      | プロセッサーのタイプ。                               |
| `name`       | 文字列           | いいえ       | プロセッサーの名前。                               |
| `is_enabled` | ブール値          | いいえ       | プロセッサーが有効になっているかどうか。既定値:|
| `sources`    | 文字列の配列 | はい      | ソース属性の配列。                           |

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

service-remapper

サービスリマッパープロセッサーは、ログに 1 つまたは複数の属性を正式なサービスとして割り当てます。

**注**: 複数のサービスリマッパープロセッサーがパイプライン内の特定のログに適用された場合は、(パイプラインの順序で) 最初のプロセッサーだけが考慮されます。

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** ページ][1]でログサービスリマッパープロセッサーを定義します。

{{< img src="logs/log_configuration/processor/service_remapper.png" alt="サービスリマッパープロセッサー" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

次のログサービスリマッパー JSON ペイロードで [Datadog ログパイプライン API エンドポイント][1] を使用します。

```json
{
  "type": "service-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official log service",
  "is_enabled": true,
  "sources": ["<SOURCE_ATTRIBUTE>"]
}
```

|||パラメーター|||型|||必須|||説明|||
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | 文字列           | はい      | プロセッサーのタイプ。                               |
| `name`       | 文字列           | いいえ       | プロセッサーの名前。                               |
| `is_enabled` | ブール値          | いいえ       | プロセッサーが有効になっているかどうか。既定値:|
| `sources`    | 文字列の配列 | はい      | ソース属性の配列。                           |

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

ログメッセージリマッパー

`message` は Datadog の重要な属性です。その値は、ログエクスプローラーの **コンテンツ** 列に表示され、ログのコンテキストを提供します。検索バーを使用して、ログメッセージによってログを探すことができます。

ログメッセージリマッパープロセッサーを使用して、1 つ以上の属性を公式のログメッセージとして定義します。属性が存在しない場合や代替が利用可能な場合に備えて、2 つ以上の属性を定義します。例えば、定義されたメッセージ属性が `attribute1`、`attribute2`、`attribute3` で、`attribute1` が存在しない場合、`attribute2` が使用されます。同様に、`attribute2` が存在しない場合、`attribute3` が使用されます。

メッセージ属性を定義するには、まず [ストリングビルダープロセッサー](#string-builder-processor)を使用して、使用したい属性ごとに新しい文字列属性を作成します。次に、ログメッセージリマッパーを使用して、文字列属性をメッセージとしてリマップします。

**注**: 複数のログメッセージリマッパープロセッサーがパイプライン内の特定のログに適用された場合は、(パイプラインの順序で) 最初のプロセッサーだけが考慮されます。

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** ページ][1]でログメッセージリマッパープロセッサーを定義します。

{{< img src="logs/log_configuration/processor/message_processor.png" alt="メッセージプロセッサー" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

次のログメッセージリマッパー JSON ペイロードで [Datadog ログパイプライン API エンドポイント][1] を使用します。

```json
{
  "type": "message-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official message of the log",
  "is_enabled": true,
  "sources": ["msg"]
}
```

|||パラメーター|||型|||必須|||説明|||
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | 文字列           | はい      | プロセッサーのタイプ。                               |
| `name`       | 文字列           | いいえ       | プロセッサーの名前。                               |
| `is_enabled` | ブール値          | いいえ       | プロセッサーが有効になっているかどうか。既定値:|
| `sources`    | 文字列の配列 | はい      | ソース属性の配列。既定値:

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

リマッパー

リマッパープロセッサーは、1 つ以上のソース属性またはタグを異なるターゲット属性またはタグにリマップします。たとえば、`user` 属性を `firstname` にリマップして、ログエクスプローラーでログデータを正規化できます。

リマッパーのターゲットが属性である場合、プロセッサーは値を新しい型 (`String`、`Integer`、または `Double`) にキャストすることもできます。キャストが失敗した場合、元の値と型は保持されます。

**注**: `Double` 値の小数点区切りは `.` でなければなりません。

###### 命名の制約

`:` および `,` の文字は、ターゲット属性またはタグ名に使用できません。さらに、タグ名と属性名は、[属性とエイリアス][5] に記載されている規則に従う必要があります。

###予約済み属性

リマッパープロセッサーは、**Datadog の予約済み属性をリマップするために使用することはできません**。
- `host` 属性はリマップできません。
-次の属性は専用のリマッパープロセッサーを必要とし、一般的なリマッパーでリマップすることはできません。属性のいずれかをリマップするには、対応する専門のリマッパーまたはプロセッサーを使用してください。
   ログメッセージリマッパー
   service-remapper
   ログステータスリマッパー
   ログ日付リマッパー
   トレースリマッパー
   スパンリマッパー

{{< tabs >}}
{{% tab "UI" %}}

[******Pipelines****** ページ][1] でリマッパープロセッサーを定義します。たとえば、`user` を `user.firstname` にリマップします。

{{< img src="logs/log_configuration/processor/remapper.png" alt="属性リマッパープロセッサー" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

次のリマッパー JSON ペイロードで [Datadog ログパイプライン API エンドポイント][1] を使用します。

```json
{
  "type": "attribute-remapper",
  "name": "Remap <SOURCE_ATTRIBUTE> to <TARGET_ATTRIBUTE>",
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

|||パラメーター|||型|||必須|||説明|||
|------------------------|------------------|----------|--------------------------------------------------------------------------------|
| `type`                 | 文字列           | はい      | プロセッサーのタイプ。                                                        |
| `name`                 | 文字列           | いいえ      | プロセッサーの名前。                                                        |
| `is_enabled`           | ブール値          | いいえ      | プロセッサーが有効になっているかどうか。既定値:                         |
| `source_type`          | 文字列           | いいえ      | ソースがログ `attribute` からのものであるか `tag` どうかを定義します。既定値:|
| `sources`              | 文字列の配列 | はい      | ソース属性またはタグの配列                                             |
| `target`               | 文字列           | はい      | ソースの再マップ先になる最終的な属性またはタグの名前。                          |
| `target_type`          | 文字列           | いいえ      | ターゲットがログ `attribute` か `tag` かを定義します。既定値:   |
| `target_format`        | 文字列           | いいえ      | 属性値を別の型にキャストするかどうかを定義します。可能な値: `auto`、`string`、または `integer`。既定値:`auto` に設定されている場合、キャストは適用されません。 |
| `preserve_source`      | ブール値          | いいえ      | リマップされたソース要素を削除するか維持します。既定値:              |
| `override_on_conflict` | ブール値          | いいえ      | ターゲット要素が既に設定されている場合に上書きするかどうか。既定値:

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

url-parser

URL パーサープロセッサーは、URL からクエリパラメーターなどの重要なパラメーターを抽出します。これをセットアップすると、次の属性が生成されます。

{{< img src="logs/processing/processors/url_processor.png" alt="URLプロセッサー" style="width:80%;" >}}

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** ページ][1]で URL パーサープロセッサーを定義します。

{{< img src="logs/processing/processors/url_processor.png" alt="URLプロセッサータイル" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

```json
{
  "type": "url-parser",
  "name": "Parse the URL from http.url attribute.",
  "is_enabled": true,
  "sources": ["http.url"],
  "target": "http.url_details"
}
```

|||パラメーター|||型|||必須|||説明|||
|--------------|------------------|----------|----------------------------------------------------------------------------------------------------------------------|
| `type`       | 文字列           | はい      | プロセッサーのタイプ。                                                                                              |
| `name`       | 文字列           | いいえ       | プロセッサーの名前。                                                                                              |
| `is_enabled` | ブール値          | いいえ       | プロセッサーが有効になっているかどうか。既定値:                                                               |
| `sources`    | 文字列の配列 | いいえ       | ソース属性の配列。既定値:                                                                     |
| `target`     | 文字列           | はい      | `sources` から抽出されたすべての詳細を含む親属性の名前。既定値:

{{% /tab %}}
{{< /tabs >}}

user-agent-parser

ユーザーエージェントパーサープロセッサーは、`useragent` 属性を取得し、OS、ブラウザ、デバイス、およびその他のユーザーデータを抽出します。これをセットアップすると、次の属性が生成されます。

{{< img src="logs/processing/processors/useragent_processor.png" alt="ユーザーエージェントプロセッサー" style="width:80%;">}}

**注**: エンコードされたユーザーエージェントがログに含まれている場合 (IIS ログなど) は、パースの前に **URL をデコードする**ようにプロセッサーを構成してください。

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** ページ][1]でユーザーエージェントプロセッサーを定義します。

{{< img src="logs/log_configuration/processor/useragent_processor.png" alt="ユーザーエージェントプロセッサータイル" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

次のユーザーエージェントパーサー JSON ペイロードで [Datadog ログパイプライン API エンドポイント][1]を使用します。

```json
{
  "type": "user-agent-parser",
  "name": "Parses <SOURCE_ATTRIBUTE> to extract all its User-Agent information",
  "is_enabled": true,
  "sources": ["http.useragent"],
  "target": "http.useragent_details",
  "is_encoded": false
}
```

|||パラメーター|||型|||必須|||説明|||
|--------------|------------------|----------|-----------------------------------------------------------------------------------------------------------------------------|
| `type`       | 文字列           | はい      | プロセッサーのタイプ。                                                                                                     |
| `name`       | 文字列           | いいえ       | プロセッサーの名前。                                                                                                     |
| `is_enabled` | ブール値          | いいえ       | プロセッサーが有効になっているかどうか。既定値:                                                                     |
| `sources`    | 文字列の配列 | いいえ       | ソース属性の配列。既定値:                                                                     |
| `target`     | 文字列           | はい      | `sources` から抽出されたすべての詳細を含む親属性の名前。既定値:|
| `is_encoded` | ブール値          | いいえ       | ソース属性が URL エンコードされているかどうかを定義します。既定値:

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

category-processor

カテゴリプロセッサーを使用して、提供された検索クエリに一致するログに新しい属性 (新しい属性名にスペースや特殊文字を含まない) を追加します。次に、カテゴリを使用して分析ビューのグループを作成します (たとえば、URL グループ、マシングループ、環境、応答時間バケットなど)。

注:

* クエリの構文は、[ログエクスプローラー][6] の検索バーのものです。このクエリは、ファセットであるかどうかにかかわらず、任意のログ属性またはタグに対して実行できます。また、クエリ内でワイルドカードを使用することもできます。
** ログがプロセッサークエリのいずれかに一致すると、処理が停止します。ログが複数のクエリに一致する可能性がある場合は、適切に順序付けされていることを確認してください。
*カテゴリ名は一意でなければなりません。
*カテゴリプロセッサーを定義したら、 [ログステータスリマッパー][9]を使用してカテゴリをログステータスにマップします。

{{< tabs >}}
{{% tab "UI" %}}

[ ******Pipelines****** ページ][1] でカテゴリプロセッサーを定義します。たとえば、ステータスコードの範囲値 (`"OK" for a response code between 200 and 299, "Notice" for a response code between 300 and 399, ...`) に基づいてウェブアクセスログを分類するには、このプロセッサーを追加します:

{{< img src="logs/log_configuration/processor/category_processor.png" alt="カテゴリプロセッサー" style="width:80%;" >}}

このプロセッサーは、次のような結果をもたらします。

{{< img src="logs/log_configuration/processor/category_processor_result.png" alt="カテゴリプロセッサーの結果" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

次のカテゴリプロセッサー JSON ペイロードで [Datadog ログパイプライン API エンドポイント][1] を使用します。

```json
{
  "type": "category-processor",
  "name": "Assign a custom value to the <TARGET_ATTRIBUTE> attribute",
  "is_enabled": true,
  "categories": [
    {"filter": {"query": "<QUERY_1>"}, "name": "<VALUE_TO_ASSIGN_1>"},
    {"filter": {"query": "<QUERY_2>"}, "name": "<VALUE_TO_ASSIGN_2>"}
  ],
  "target": "<TARGET_ATTRIBUTE>"
}
```

|||パラメーター|||型|||必須|||説明|||
|--------------|-----------------|----------|------------------------------------------------------------------------------------------------------------|
| `type`       | 文字列          | はい      | プロセッサーのタイプ。                                                                                    |
| `name`       | 文字列          | いいえ       | プロセッサーの名前。                                                                                    |
| `is_enabled` | ブール値         | いいえ       | プロセッサーが有効になっているかどうか。既定値:
| `categories` | オブジェクトの配列 | はい      | ログに一致するかどうかを識別するフィルターの配列と、ログにカスタム値を割り当てるための対応する `name`。|
| `target`     | 文字列          | はい      | 一致するカテゴリによって値が定義されるターゲット属性の名前。                              |

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

arithmetic-processor

算術演算プロセッサーを使用して、提供された式の結果を持つ新しい属性 (新しい属性名にスペースや特殊文字を含まない) をログに追加します。これは、異なる単位の異なる時間属性を単一の属性にリマップしたり、同じログ内の属性に対して演算を行ったりします。

算術演算プロセッサーの式には、括弧および基本的な算術演算子 `-`、`+`、`*`、`/` を使用できます。

デフォルトでは、属性が欠落している場合、計算はスキップされます。*欠落している属性を 0 で置き換える*を選択すると、計算が確実に行われるように、欠落している属性値に自動的に 0 が入力されます。

注:

ログの属性にない場合、または数値に変換できない場合、属性が見つからないと表示されることがあります。
*演算子 `-` を使用する場合、`start-time` のような属性名ではダッシュが含まれている場合があるため、その前後にスペースを付加してください。たとえば、次の式は `-` 演算子の前後にスペースを含める必要があります: `(end-time - start-time) / 1000`。
*ターゲット属性が既に存在している場合は、式の結果で上書きされます。
** 結果は少数第 9 位までで切り上げられます。たとえば、式の結果が `0.1234567891` の場合、属性に格納される実際の値は `0.123456789` です。
*測定単位の拡張が必要な場合は、[スケールフィルターを使用してください。

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** ページ][1]で算術演算プロセッサーを定義します。

{{< img src="logs/log_configuration/processor/arithmetic_processor.png" alt="算術演算プロセッサー" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

次の算術演算プロセッサー JSON ペイロードで [Datadog ログパイプライン API エンドポイント][1] を使用します。

```json
{
  "type": "arithmetic-processor",
  "name": "<PROCESSOR_NAME>",
  "is_enabled": true,
  "expression": "<ARITHMETIC_OPERATION>",
  "target": "<TARGET_ATTRIBUTE>",
  "is_replace_missing": false
}
```

|||パラメーター|||型|||必須|||説明|||
|----------------------|---------|----------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `type`               | 文字列  | はい      | プロセッサーのタイプ。                                                                                                                      |
| `name`               | 文字列  | いいえ       | プロセッサーの名前。                                                                                                                      |
| `is_enabled`         | ブール値 | いいえ       | プロセッサーが有効になっているかどうか。既定値:                                                                                      |
| `expression`         | 文字列  | はい      | 1 つ以上のログ属性間の算術演算。                                                                                    |
| `target`             | 文字列  | はい      | 算術演算の結果を格納する属性の名前。                                                                 |
| `is_replace_missing` | ブール値 | いいえ       | `true` の場合、`expression` のすべての欠損属性を 0 に置き換え、`false` 属性が欠損している場合は操作をスキップします。既定値:

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

string-builder-processor

ストリングビルダープロセッサーを使用して、提供されたテンプレートの結果を持つ新しい属性 (スペースや特殊文字を含まない) をログに追加します。これにより、異なる属性や生の文字列を単一の属性に集約できます。

このテンプレートは生テキストとブロックに `%{attribute_path}` 構文を組み合わせた形で定義されます。

注:

このプロセッサーでは、ブロック内に値または値の配列を持つ属性のみしか使用できません (以下の UI セクションの例をご参照ください)。
*属性 (値または値の配列) が使用できない場合、その属性を空の文字列に置換するか、操作自体をスキップするかを選択することができます。
*ターゲット属性が既に存在する場合、その属性はテンプレートの結果で上書きされます。
*テンプレートの結果は 256 文字以内に収める必要があります。

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** ページ][1]でストリングビルダープロセッサーを定義します。

{{< img src="logs/log_configuration/processor/stringbuilder_processor.png" alt="ストリングビルダープロセッサー" style="width:80%;">}}

次のログを使用して、テンプレート `Request %{http.method} %{http.url} was answered with response %{http.status_code}` が結果を返します。たとえば、次のとおりです。


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

次のように返します。

```text
Request GET https://app.datadoghq.com/users was answered with response 200
```

**注**: `http` はオブジェクトであり、ブロック内で使用することはできません (`%{http}` 失敗)、一方で `%{http.method}`、`%{http.status_code}`、または `%{http.url}` は対応する値を返します。ブロックは、値の配列または配列内の特定の属性に対して使用できます。

*例えば、ブロック `%{array_ids}` を追加すると、次のように返されます:

   ```text
   123,456,789
   ```

* `%{array_users}` はオブジェクトのリストであるため、何も返しません。しかし、`%{array_users.first_name}` は配列に含まれる `first_name` のリストを返します:

  ```text
  John,Jack
  ```

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

次のストリングビルダープロセッサー JSON ペイロードで [Datadog ログパイプライン API エンドポイント][1] を使用します。

```json
{
  "type": "string-builder-processor",
  "name": "<PROCESSOR_NAME>",
  "is_enabled": true,
  "template": "<STRING_BUILDER_TEMPLATE>",
  "target": "<TARGET_ATTRIBUTE>",
  "is_replace_missing": true
}
```

|||パラメーター|||型|||必須|||説明|||
|----------------------|---------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`               | 文字列  | はい      | プロセッサーのタイプ。                                                                                                                           |
| `name`               | 文字列  | いいえ       | プロセッサーの名前。                                                                                                                           |
| `is_enabled`         | Boolean | いいえ | プロセッサーが有効になっているかどうか。デフォルトは `false` です。                                                                                         |
| `template`           | 文字列 | はい | 1 つまたは複数の属性と生テキストを使用した数式です。                                                                                              |
| `target`             | 文字列 | はい | テンプレートの結果を含む属性の名前です。                                                                              |
| `is_replace_missing` | Boolean | いいえ | `true` の場合、`template` のすべての欠落した属性を空の文字列に置き換えます。`false` の場合、欠落した属性に対する操作をスキップします。既定値:

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

GeoIP パーサー

GeoIP パーサーは、IP アドレスの属性を受け取り、対象の属性パスに大陸、国、小区域、または都市情報 (利用可能な場合) を抽出します。

{{< tabs >}}
{{% tab "UI" %}}

{{< img src="logs/log_configuration/processor/geoip_processor.png" alt="GeoIP プロセッサー" style="width:80%;">}}

ほとんどの要素には `name` と `iso_code` (または大陸の場合は `code`) 属性が含まれています。`subdivision` は、アメリカ合衆国の「州」やフランスの「県」など、国が使用する最初のレベルの細分化です。

例えば、geoIP パーサーは `network.client.ip` 属性から位置を抽出し、それを `network.client.geoip` 属性に格納します:

{{< img src="logs/log_configuration/processor/geoip_example_blurred.png" alt="GeoIP の例" style="width:60%;">}}

{{% /tab %}}
{{% tab "API" %}}

次の GeoIP パーサー JSON ペイロードで [Datadog ログパイプライン API エンドポイント][1] を使用します。

```json
{
  "type": "geo-ip-parser",
  "name": "Parse the geolocation elements from network.client.ip attribute.",
  "is_enabled": true,
  "sources": ["network.client.ip"],
  "target": "network.client.geoip"
}
```

|||パラメーター|||型|||必須|||説明|||
|--------------|------------------|----------|---------------------------------------------------------------------------------------------------------------------------|
| `type`       | 文字列           | はい      | プロセッサーのタイプ。                                                                                                   |
| `name`       | 文字列           | いいえ       | プロセッサーの名前。                                                                                                   |
| `is_enabled` | ブール値          | いいえ       | プロセッサーが有効になっているかどうか。既定値:                                                                    |
| `sources`    | 文字列の配列 | いいえ       | ソース属性の配列。既定値:                                                                 |
| `target`     | 文字列           | はい      | `sources` から抽出されたすべての詳細を含む親属性の名前。既定値:

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

lookup-processor

ルックアッププロセッサーを使用して、ログ属性と [Reference Table][7] またはプロセッサーマッピングテーブルに保存された人間が読める値との間のマッピングを定義することができます。

たとえば、ルックアッププロセッサーを使用して、内部サービス ID を人間が読めるサービス名にマッピングすることができます。また、本番環境への接続を試みた MAC アドレスが、盗まれたマシンのリストに含まれているかどうかの確認にも使用できます。

{{< tabs >}}
{{% tab "UI" %}}

ルックアッププロセッサーは、次の動作を行います。

現在のログにソース属性が含まれていないかを確認する。
*ソース属性の値がマッピングテーブルに存在するかをチェックする。
  存在する場合、テーブルにターゲット属性を作成し、対応する値を割り当てる。
  * (オプション) マッピングテーブルに値が存在しない場合、`fallbackValue` フィールドに設定されたデフォルトのフォールバック値でターゲット属性を作成します。手動で `source_key,target_value` ペアのリストを入力するか、**手動マッピング** タブで CSV ファイルをアップロードすることができます。

    {{< img src="logs/log_configuration/processor/lookup_processor_manual_mapping.png" alt="ルックアッププロセッサー" style="width:80%;">}}

    The size limit for the mapping table is 100Kb. This limit applies across all Lookup Processors on the platform. However, Reference Tables support larger file sizes.

  *** (オプション) マッピングテーブルに値が存在しない場合、参照テーブルの値でターゲット属性を作成する。[**Reference Table******] (参照テーブル) タブで [参照テーブル][101] の値を選択できます。

    {{< img src="logs/log_configuration/processor/lookup_processor_reference_table.png" alt="ルックアッププロセッサー"
    style="width:80%;">}}


[101]: /ja/integrations/guide/reference-tables/

{{% /tab %}}
{{% tab "API" %}}

次のルックアッププロセッサー JSON ペイロードで [Datadog ログパイプライン API エンドポイント][1] を使用します。

```json
{
  "type": "lookup-processor",
  "name": "<PROCESSOR_NAME>",
  "is_enabled": true,
  "source": "<SOURCE_ATTRIBUTE>",
  "target": "<TARGET_ATTRIBUTE>",
  "lookup_table": ["key1,value1", "key2,value2"],
  "default_lookup": "<DEFAULT_TARGET_VALUE>"
}
```

|||パラメーター|||型|||必須|||説明|||
|------------------|------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`           | 文字列           | はい      | プロセッサーのタイプ。                                                                                                                                                  |
| `name`           | 文字列           | いいえ       | プロセッサーの名前。                                                                                                                                                  |
| `is_enabled`     | Boolean | はい | プロセッサーが有効になっているかどうか。既定値:                                                                                                                    |
| `source`         | 文字列 | はい | ルックアップを実行する際に使用したソース属性です。                                                                                                                            |
| `target`         | 文字列 | はい | マッピングリスト内 (マッピングリスト内で見つからない場合は `default_lookup`) の対応する値を含む属性名です。                               |
| `lookup_table`   | 文字列の配列 | はい | ソース属性値とそれに関連するターゲット属性値のマッピングテーブルです。[ "source_key1,target_value1", "source_key2,target_value2" ] のような形式で示されます。|
| `default_lookup` | 文字列 | いいえ | リスト上にソースの値がない場合、ターゲット属性に設定する値です。

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

トレースリマッパー

アプリケーショントレースとログ間の関連付けを定義する方法は 2 つあります。

1. [アプリケーションログにトレース ID を挿入する方法][8] についてのドキュメントを参照してください。ログインテグレーションは、デフォルトで残りのすべてのセットアップ手順を自動的に処理します。

2.トレースリマッパープロセッサーを使用して、トレース ID として関連付けられるログ属性を定義します。

{{< tabs >}}
{{% tab "UI" %}}

[******Pipelines******ページ][1] でトレースリマッパープロセッサーを定義します。プロセッサータイルにトレース ID 属性パスを次のように入力します。

{{< img src="logs/log_configuration/processor/trace_processor.png" alt="トレース ID プロセッサー" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

次のトレースリマッパー JSON ペイロードで [Datadog ログパイプライン API エンドポイント][1] を使用します。

```json
{
  "type": "trace-id-remapper",
  "name": "Define dd.trace_id as the official trace id associate to this log",
  "is_enabled": true,
  "sources": ["dd.trace_id"]
}
```

|||パラメーター|||型|||必須|||説明|||
|--------------|------------------|----------|--------------------------------------------------------|
| `type`       | 文字列           | はい      | プロセッサーのタイプ。                                |
| `name`       | 文字列           | いいえ       | プロセッサーの名前。                                |
| `is_enabled` | ブール値          | いいえ       | プロセッサーが有効になっているかどうか。既定値:|
| `sources`    | 文字列の配列 | いいえ       | ソース属性の配列。既定値:

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

**注**: ログまたは UI のログ属性には、トレース ID およびスパン ID は表示されません。

##スパンリマッパー

アプリケーションスパンとログ間の関連付けを定義する方法は 2 つあります。

1. [アプリケーションログにスパン ID を挿入する方法][8] についてのドキュメントを参照してください。ログインテグレーションは、デフォルトで残りのすべてのセットアップ手順を自動的に処理します。

2.スパンリマッパープロセッサーを使用して、ログ属性を関連付けられた Span ID として定義します。

{{< tabs >}}
{{% tab "UI" %}}

[******Pipelines****** ページ][1] でスパンリマッパープロセッサーを定義します。プロセッサータイルにスパン ID 属性パスを次のように入力します。

{{< img src="logs/log_configuration/processor/span_id_remapper.png" alt="スパン ID プロセッサー" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

[Datadog ログパイプライン API エンドポイント][1] を使用して、次のスパンリマッパー用 JSON ペイロードを指定します。

```json
{
  "type": "span-id-remapper",
  "name": "Define dd.span_id as the official span id associate to this log",
  "is_enabled": true,
  "sources": ["dd.span_id"]
}
```

|||パラメーター|||型|||必須|||説明|||
|--------------|------------------|----------|--------------------------------------------------------|
| `type`       | 文字列           | はい      | プロセッサーのタイプ。                                |
| `name`       | 文字列           | いいえ       | プロセッサーの名前。                                |
| `is_enabled` | ブール値          | いいえ       | このプロセッサーが有効かどうかを示します。既定値:|
| `sources`    | 文字列の配列 | いいえ       | ソース属性の配列。既定値:

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

**注**: ログまたは UI のログ属性には、トレース ID およびスパン ID は表示されません。

##配列プロセッサー

配列プロセッサーを使用すると、ログ内の JSON 配列から値を抽出、集計、または変換できます。

サポートされる操作には次のものがあります。

**一致する要素から値を抽出**
**配列の長さを計算**
**配列に値を追加**

各操作は専用のプロセッサーを通して設定します。

[**Pipelines** ページ][1]で配列プロセッサーを定義してください。


###一致する要素から値を選択

条件に一致するオブジェクトが配列内にある場合、そのオブジェクトから特定の値を抽出します。

{{< tabs >}}
{{% tab "UI" %}}

{{< img src="logs/log_configuration/processor/array_processor_select_value.png" alt="配列プロセッサー: 要素から値を選択" style="width:80%;" >}}

**例: 入力データ**:

```json
{
  "httpRequest": {
    "headers": [
      {"name": "Referrer", "value": "https://example.com"},
      {"name": "Accept", "value": "application/json"}
    ]
  }
}
```

**設定手順:**

- **配列のパス**: `httpRequest.headers`
"Condition": {
- **値を抽出する**: `value`
- **対象属性**: `referrer`

**結果**

```json
{
  "httpRequest": {
    "headers": [...]
  },
  "referrer": "https://example.com"
}
```

{{% /tab %}}
{{% tab "API" %}}

次の配列プロセッサー JSON ペイロードで [Datadog ログパイプライン API エンドポイント][1] を使用します。

```json
{
  "type": "array-processor",
  "name": "Extract Referrer URL",
  "is_enabled": true,
  "operation" : {
    "type" : "select",
    "source": "httpRequest.headers",
    "target": "referrer",
    "filter": "name:Referrer",
    "value_to_extract": "value"
  }
}
```

|||パラメーター|||型|||必須|||説明|||
|--------------|------------------|----------|---------------------------------------------------------------|
| `type`       | 文字列           | はい      | プロセッサーのタイプ。                                       |
| `name`       | 文字列           | いいえ       | プロセッサーの名前。                                       |
| `is_enabled` | ブール値          | いいえ       | プロセッサーが有効かどうか。既定値:       |
| `operation.type`  | 文字列      | はい      | 配列プロセッサー操作のタイプ。                           |
| `operation.source`  | 文字列    | はい      | 選択したい配列のパス。                   |
| `operation.target`  | 文字列    | はい      | 対象属性。                                            |
| `operation.filter`  | 文字列    | はい      | 配列要素に一致する式。最初の一致する要素が選択されます。|
| `operation.value_to_extract`  | 文字列 | はい | 選択した要素で読み取る属性。                  |

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

配列の長さ

配列の要素数を計算します。

{{< tabs >}}
{{% tab "UI" %}}

{{< img src="logs/log_configuration/processor/array_processor_length.png" alt="配列プロセッサー: 長さ" style="width:80%;" >}}

**例: 入力データ**:

```json
{
  "tags": ["prod", "internal", "critical"]
}
```

**設定手順:**

- **配列属性**: `tags`
- **対象属性**: `tagCount`

**結果**

```json
{
  "tags": ["prod", "internal", "critical"],
  "tagCount": 3
}
```
{{% /tab %}}
{{% tab "API" %}}

次の配列プロセッサー JSON ペイロードで [Datadog ログパイプライン API エンドポイント][1] を使用します。

```json
{
  "type": "array-processor",
  "name": "Compute number of tags",
  "is_enabled": true,
  "operation" : {
    "type" : "length",
    "source": "tags",
    "target": "tagCount"
  }
}
```

|||パラメーター|||型|||必須|||説明|||
|---------------------|-----------|----------|---------------------------------------------------------------|
| `type`              | 文字列    | はい      | プロセッサーのタイプ。                                       |
| `name`              | 文字列    | いいえ       | プロセッサーの名前。                                       |
| `is_enabled`        | ブール値   | いいえ       | プロセッサーが有効かどうか。既定値:       |
| `operation.type`    | 文字列    | はい      | 配列プロセッサー操作のタイプ。                           |
| `operation.source`  | 文字列    | はい      | 長さを抽出する配列のパス。                  |
| `operation.target`  | 文字列    | はい      | ターゲット属性。                                             |

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

配列への追加

ログ内のターゲット配列属性の末尾に属性値を追加します。

**注**: ターゲット配列属性がログに存在しない場合は、自動的に作成されます。


{{< tabs >}}
{{% tab "UI" %}}

{{< img src="logs/log_configuration/processor/array_processor_append.png" alt="配列プロセッサー: 追加" style="width:80%;" >}}

**例: 入力データ**:

```json
{
  "network": {
    "client": {
      "ip": "198.51.100.23"
    }
  },
  "sourceIps": ["203.0.113.1"]
}

```
**設定手順:**

- **追加する属性**: `"network.client.ip"`
- **追加する配列属性**: `sourceIps`

**結果**

```json
{
  "network": {
    "client": {
      "ip": "198.51.100.23"
    }
  },
  "sourceIps": ["203.0.113.1", "198.51.100.23"]
}
```
{{% /tab %}}
{{% tab "API" %}}

次の配列プロセッサー JSON ペイロードで [Datadog ログパイプライン API エンドポイント][1] を使用します。

```json
{
  "type": "array-processor",
  "name": "Append client IP to sourceIps",
  "is_enabled": true,
  "operation" : {
    "type" : "append",
    "source": "network.client.ip",
    "target": "sourceIps"
  }
}
```

|||パラメーター|||型|||必須|||説明|||
|------------------------------|------------|----------|--------------------------------------------------------------------|
| `type`                       | 文字列     | はい      | プロセッサーのタイプ。                                            |
| `name`                       | 文字列     | いいえ       | プロセッサーの名前。                                            |
| `is_enabled`                 | ブール値    | いいえ       | プロセッサーが有効になっているかどうか。既定値:            |
| `operation.type`             | 文字列     | はい      | 配列プロセッサー操作のタイプ。                                |
| `operation.source`           | 文字列     | はい      | 追加する属性。                                              |
| `operation.target`           | 文字列     | はい      | 追加する配列属性。                                     |
| `operation.preserve_source`  | ブール値    | いいえ      | リマッピング後に元のソースを保持するかどうか。既定値:

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

###### デコーダープロセッサー

{{< site-region region="gov" >}}
<div class="alert alert-warning">デコーダープロセッサーは、選択した <a href="/getting_started/site">Datadog サイト</a> では利用できません。{{< region-param key="dd_site_name" >}}この機能が必要な場合は、<a href="/help/">Datadog サポート</a> にお問い合わせください。</div>
{{< /site-region >}}

デコーダープロセッサーは、バイナリからテキストにエンコードされた文字列フィールド (Base64 や Hex/Base16 など) を元の表現に変換します。これにより、データはそのネイティブコンテキストで解釈されます。たとえば、UTF-8 文字列、ASCII コマンド、または数値 (16 進数文字列から派生した整数など) として解釈されます。デコーダープロセッサーは、エンコードされたコマンド、特定のシステムからのログ、または脅威アクターによって使用される回避技術を分析するのに特に役立ちます。

**注:**

 切り捨てられた文字列: プロセッサーは、必要に応じてトリミングまたはパディングを行うことで、部分的に切り捨てられた Base64/Base16 文字列を適切に処理します。

-16 進数形式: 16 進数入力は、文字列 (UTF-8) または整数にデコードできます。

-失敗処理: (無効な入力のため) デコードに失敗した場合、プロセッサーは変換をスキップし、ログは変更されません。

{{< tabs >}}
{{% tab "UI" %}}

1. ソース属性を設定: エンコードされた文字列を含む属性パスを指定します (例: `encoded.base64`)。
2.ソースエンコーディングを選択: ソースのバイナリからテキストへのエンコーディングを選択します: `base64` または `base16/hex`。
2.`Base16/Hex` : 出力形式を選択: `string (UTF-8)` または `integer`。
3.3. ターゲット属性を設定: デコードされた結果を保存する属性パスを入力します。

{{< img src="logs/log_configuration/processor/decoder-processor.png" alt="デコーダープロセッサー: 追加" style="width:80%;" >}}

{{% /tab %}}
{{< /tabs >}}

###### 脅威インテリジェンスプロセッサー

脅威インテリジェンスプロセッサーを追加して、特定の侵害指標 (IoC) キー (IP アドレスなど) を使用し、テーブルに照らしてログを評価します。一致が見つかった場合、ログはテーブルからの関連する脅威インテリジェンス (TI) 属性で強化され、検出・調査・対応が向上します。

詳細については、[脅威インテリジェンス][9] を参照してください。

#### OCSF プロセッサー

OCSF プロセッサーを使用して、[Open Cybersecurity Schema Framework (OCSF)][11] に従ってセキュリティログを正規化します。OCSF プロセッサーを使用すると、ログ属性を OCSF スキーマクラスおよびそれに対応する属性 (列挙 (ENUM) 属性など) にリマップするカスタムマッピングを作成できます。

このプロセッサーでは、次のことが可能です。

 ソースログ属性を OCSF ターゲット属性にマッピングする
 特定の数値を持つ ENUM 属性を設定する
- 異なる OCSF ターゲットイベントクラスのためのサブパイプラインを作成する
- OCSF リマップの前にログを前処理する

詳細なセットアップ手順、設定例、およびトラブルシューティングガイダンスについては、[OCSF プロセッサー][12] を参照してください。

##参考資料

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits は Datadog, Inc. の商標です。

[1]: /ja/logs/log_configuration/pipelines/
[2]: /ja/agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs
[3]: /ja/logs/log_configuration/parsing/?tab=matchers#parsing-dates
[4]: https://en.wikipedia.org/wiki/Syslog#Severity_level
[5]: /ja/logs/log_configuration/attributes_naming_convention/
[6]: /ja/logs/search_syntax/
[7]: /ja/integrations/guide/reference-tables/
[8]: /ja/tracing/other_telemetry/connect_logs_and_traces/
[9]: /ja/security/threat_intelligence/
[10]: /ja/logs/log_configuration/parsing/?tab=matchers
[11]: /ja/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/
[12]: /ja/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/ocsf_processor/