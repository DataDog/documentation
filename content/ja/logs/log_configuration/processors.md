---
aliases:
- /ja/logs/processing/processors/
description: Grok プロセッサーを使用してログをパースする
further_reading:
- link: /logs/log_configuration/pipelines
  tag: ドキュメント
  text: Datadog のパイプライン
- link: /logs/logging_without_limits/
  tag: ドキュメント
  text: Logging without Limits*
- link: /logs/explorer/
  tag: ドキュメント
  text: ログの調査方法
kind: documentation
title: プロセッサー
---

## 概要

プロセッサーは[パイプライン][1]の中で実行され、データ構造化アクションを完了し、ログを豊かにする属性を生成します。

{{< img src="logs/log_configuration/processor/processor_overview.png" alt="プロセッサー" style="width:100%" >}}

[ログコンフィギュレーション設定][1]で、[Grok パーサー](#grok-parser) や [日付リマッパー](#remapper) などの処理系を設定して、ログの属性を抽出・作成・再マッピングし、ファセット検索を充実させることが可能です。

**注**:

- 構造化ログは有効な形式で送信する必要があります。構造にパースに無効な文字が含まれている場合は、[mask_sequences][2] 機能を使用して、これらを Agent レベルで削除する必要があります。

- ベストプラクティスとして、パイプライン毎のプロセッサー数は最大 20 で使用することが推奨されます。

## Grok パーサー

メッセージ全体や未加工のイベントの特定の属性をパースするためのカスタム Grok ルールを作成できます。詳細については、[パースのセクション][2]を参照してください。ベストプラクティスとして、Grok プロセッサー毎のパース規則は最大 10 で使用することが推奨されます。

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** ページ][1]で Grok プロセッサーを定義します。

{{< img src="logs/log_configuration/processor/grok_parser.png" alt="Grok Parser" style="width:80%;" >}}

**Parse my logs** をクリックして、基底のパイプラインを流れるログの 3 つのパースルールのセットを始動させます。そこから属性の名前を絞り込み、必要に応じて他のタイプのログに新しいルールを追加します。この機能を使用するには、対応するログがインデックス化され、実際に流入している必要があります。除外フィルターを一時的に無効にするか、サンプリングして、これを機能させることができます。

サンプルをクリックして選択すると、パースルールに対する評価が開始され、結果が画面の下に表示されます。

プロセッサーには最大 5 つのサンプルを保存できます。各サンプルの長さは最大 5000 文字となります。すべてのサンプルについて、Grok パーサーのパース規則のいずれかがそのサンプルに一致するかどうかのステータス (`match` または `no match`) を確認することができます。

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
| `name`               | 文字列           | ✕       | プロセッサーの名前。                                  |
| `is_enabled`         | Boolean          | ✕       | プロセッサーが有効になっているかどうか。デフォルト: `false`。  |
| `source`             | 文字列           | はい      | パースするログ属性の名前。デフォルト: `message`。 |
| `samples`            | 文字列の配列 | ✕       | この Grok パーサーのサンプルログのリストです（最大 5）。     |
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

ログにこのリストにない属性の日付がある場合は、ログ日付リマッパープロセッサーを使用して、その日付属性を公式のログタイムスタンプとして定義してください。

<div class="alert alert-info">
認識される日付の形式は、<a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>、<a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (ミリ秒エポック形式)</a>、および <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a> です。
</div>

ログに上記の形式に準拠したタイムスタンプがない場合、grok プロセッサーを使用してタイムスタンプからエポックタイムを抽出し、新しい属性に変換します。日付リマッパーは新しく定義された属性を使用します。

Datadog でカスタム日付と時間形式をパースする方法については、[日付のパース][3]を参照してください。

**注**:

* ログイベントは過去 18 時間、未来の 2 時間まで送信が可能です。
* ISO 8601-1:2019 では、基本フォーマットは `T[hh][mm][ss]`、拡張フォーマットは `T[hh]:[mm]:[ss]` です。それ以前のバージョンでは、どちらのフォーマットでも T (時刻を表す) が省略されています。
* ログにデフォルトの属性が含まれず、独自の日付属性も定義していない場合、Datadog は、ログを受信した日付をタイムスタンプとします。
* 複数のログ日付リマッパープロセッサーがパイプライン内の特定のログに適用された場合は、(パイプラインの順序で) 最後のプロセッサーが考慮されます。

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** ページ][1]でログ日付リマッパープロセッサーを定義します。

{{< img src="logs/log_configuration/processor/date_remapper.png" alt="日付属性の定義" style="width:80%;" >}}

{{< img src="logs/log_configuration/processor/date_remapper_example.png" alt="ログエクスプローラーのサイドパネルに表示される日付と時間" style="width:80%;" >}}

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
| `is_enabled` | Boolean          | いいえ       | プロセッサーが有効になっているかどうか。デフォルト: `false`。 |
| `sources`    | 文字列の配列 | はい      | ソース属性の配列。                           |

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## ログステータスリマッパー

ログに公式なステータスとして属性を割り当てるには、ステータスリマッパープロセッサーを使用します。例えば、ステータスリマッパーを使用して、ログに重大度レベルを追加します。

{{< img src="logs/processing/processors/log_post_severity_bis.png" alt="リマップ後のログの重大度" style="width:40%;" >}}

受信したステータス値は、次のようにマップされます。

* 整数値 (0 から 7) は、[Syslog の重大度標準][4]にマップされます
* **emerg** または **f** で始まる文字列 (大文字と小文字の区別なし) は、**emerg (0)** にマップされます
* **a** で始まる文字列 (大文字と小文字の区別なし) は、**alert (1)** にマップされます
* **c** で始まる文字列 (大文字と小文字の区別なし) は、**critical (2)** にマップされます
* **e** で始まる文字列 (大文字と小文字の区別なし) で `emerg` に一致しないものは、**error (3)** にマップされます
* **w** で始まる文字列 (大文字と小文字の区別なし) は、**warning (4)** にマップされます
* **n** で始まる文字列 (大文字と小文字の区別なし) は、**notice (5)** にマップされます
* **i** で始まる文字列 (大文字と小文字の区別なし) は、**info (6)** にマップされます
* **d**、**t**、**v**、**trace**、または **verbose** で始まる文字列 (大文字と小文字の区別なし) は、**debug (7)** にマップされます
* **o** または **s** で始まる文字列または **OK** か **Success**に一致する文字列 (大文字と小文字の区別なし) は、**OK** にマップされます
* 他はすべて、**info (6)** にマップされます

**注**: 複数のログステータスリマッパープロセッサーがパイプライン内の特定のログに適用された場合は、(パイプラインの順序で) 最初のプロセッサーだけが考慮されます。

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** ページ][1]でログステータスリマッパープロセッサーを定義します。

{{< img src="logs/log_configuration/processor/severity_remapper.png" alt="ログ重大度リマッピング" style="width:60%;" >}}

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
| `name`       | 文字列           | ✕       | プロセッサーの名前。                                |
| `is_enabled` | Boolean          | ✕       | プロセッサーが有効になっているかどうか。デフォルト: `false`。 |
| `sources`    | 文字列の配列 | はい      | ソース属性の配列。                           |

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## サービスリマッパー

サービスリマッパープロセッサーは、ログに 1 つまたは複数の属性を正式なサービスとして割り当てます。

**注**: 複数のサービスリマッパープロセッサーがパイプライン内の特定のログに適用された場合は、(パイプラインの順序で) 最初のプロセッサーだけが考慮されます。

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** ページ][1]でログサービスリマッパープロセッサーを定義します。

{{< img src="logs/log_configuration/processor/service_remapper.png" alt="サービスリマッパープロセッサー" style="width:80%;" >}}

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
| `name`       | 文字列           | ✕       | プロセッサーの名前。                                |
| `is_enabled` | Boolean          | ✕       | プロセッサーが有効になっているかどうか。デフォルト: `false`。 |
| `sources`    | 文字列の配列 | はい      | ソース属性の配列。                           |

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## ログメッセージリマッパー

`message` は、Datadog のキー属性です。その値はログエクスプローラーの **Content** 列に表示され、ログのコンテキストを提供します。検索バーを使って、ログメッセージでログを見つけることができます。

ログメッセージリマッパープロセッサーを使用して、1 つまたは複数の属性を公式ログメッセージとして定義します。属性が存在しない可能性があり、代替が可能な場合には、複数の属性を定義します。例えば、定義されたメッセージの属性が `attribute1`、`attribute2`、`attribute3` で、`attribute1` が存在しない場合は `attribute2` が使用されます。同様に、`attribute2` が存在しない場合、`attribute3` が使用されます。

メッセージ属性を定義するには、まず[ストリングビルダープロセッサー](#string-builder-processor)を使用して、使用したい属性ごとに新しい文字列属性を作成します。次に、ログメッセージリマッパーを使用して、文字列属性をメッセージとして再マッピングします。

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
   "name": "<ソース属性> を公式のログメッセージとして定義",
   "is_enabled": true,
   "sources": ["msg"]
}
```

| パラメーター    | タイプ             | 必須 | 説明                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | 文字列           | はい      | プロセッサーのタイプ。                                |
| `name`       | 文字列           | ✕       | プロセッサーの名前。                                |
| `is_enabled` | Boolean          | ✕       | プロセッサーが有効になっているかどうか。デフォルト: `false`。 |
| `sources`    | 文字列の配列 | はい      | ソース属性の配列。デフォルト: `msg`。            |

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## リマッパー

リマッパープロセッサーは、任意のソース属性やタグを、別のターゲット属性やタグにリマップします。例えば、`user` を `firstname` にリマップして、ログエクスプローラーのログをターゲットにすることができます。

{{< img src="logs/processing/processors/attribute_post_remapping.png" alt="リマップ後の属性" style="width:60%;">}}

タグ/属性名の制約については、[属性とタグのドキュメント][5]に説明があります。いくつかの追加の制約は、`:` や `,` として適用され、ターゲットタグ/属性名では許可されません。

リマッパーのターゲットが属性の場合、リマッパーは値を新しい型（`String`、`Integer`、`Double`）への変換を試みることができます。型変換できない場合、元の型が保持されます。

**注**: `Double` の小数点以下の桁数は `.` である必要があります。

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** ページ][1]で、リマッパープロセッサーを定義します。たとえば、`user` を `user.firstname` に再マップします。

{{< img src="logs/log_configuration/processor/remapper.png" alt="属性リマッパープロセッサー" style="width:80%;" >}}

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
| `name`                 | 文字列           | ✕      | プロセッサーの名前。                                                         |
| `is_enabled`           | Boolean          | ✕      | プロセッサーが有効になっているかどうか。デフォルト: `false`。                          |
| `source_type`          | 文字列           | ✕      | ソースがログの `attribute` または `tag` のどちらであるかを定義します。デフォルト: `attribute`。 |
| `sources`              | 文字列の配列 | はい      | ソース属性またはタグの配列。                                             |
| `target`               | 文字列           | はい      | ソースの再マップ先になる最終的な属性またはタグの名前。                           |
| `target_type`          | 文字列           | ✕      | ターゲットがログの `attribute` または `tag` のどちらであるかを定義します。デフォルト: `attribute`。    |
| `target_format`        | 文字列           | ✕      | 属性値を別の型にキャストするかを定義します。可能な値には、`auto`、`string`、`integer` があり、デフォルトは `auto` です。`auto` に設定するとキャストは適用されません。  |
| `preserve_source`      | Boolean          | ✕      | 再マップされたソース要素を削除または維持します。デフォルト: `false`。               |
| `override_on_conflict` | Boolean          | ✕      | ターゲット要素が既に設定されている場合に上書きするかどうか。デフォルト: `false`。            |

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## URL パーサー

URL パーサープロセッサーは URL からクエリパラメーターなどの重要なパラメーターを抽出します。これをセットアップすると、次の属性が生成されます。

{{< img src="logs/processing/processors/url_processor.png" alt="URL プロセッサー" style="width:80%;" >}}

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** ページ][1]で URL パーサープロセッサーを定義します。

{{< img src="logs/processing/processors/url_processor.png" alt="URL プロセッサータイル" style="width:80%;" >}}

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
| `name`       | 文字列           | ✕       | プロセッサーの名前。                                                                                               |
| `is_enabled` | Boolean          | ✕       | プロセッサーが有効になっているかどうか。デフォルト: `false`。                                                                |
| `sources`    | 文字列の配列 | ✕       | ソース属性の配列。デフォルト: `http.url`。                                                                      |
| `target`     | 文字列           | はい      | `sources` から抽出されたすべての詳細を含む親属性の名前。デフォルト: `http.url_details`。 |

{{% /tab %}}
{{< /tabs >}}

## ユーザーエージェントパーサー

ユーザーエージェントパーサープロセッサーは `useragent` 属性を受け取り、OS、ブラウザ、デバイス、およびその他のユーザーデータを抽出します。設定されると、以下のような属性が生成されます。

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
| `name`       | 文字列           | ✕       | プロセッサーの名前。                                                                                                      |
| `is_enabled` | Boolean          | ✕       | プロセッサーが有効になっているかどうか。デフォルト: `false`。                                                                      |
| `sources`    | 文字列の配列 | ✕       | ソース属性の配列。デフォルト: `http.useragent`。                                                                      |
| `target`     | 文字列           | はい      | `sources` から抽出されたすべての詳細を含む親属性の名前。デフォルト: `http.useragent_details`。 |
| `is_encoded` | Boolean          | ✕       | ソース属性が URL エンコードされているかどうかを定義します。デフォルト: `false`。                                                     |

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## カテゴリプロセッサー

指定された検索クエリに一致するログに、新しい属性 (新しい属性の名前にはスペースまたは特殊文字を含まない) を追加するには、カテゴリプロセッサーを使用します。次に、複数のカテゴリを使用すると、1 つの分析ビューに複数のグループが作成されます (複数の URL グループ、マシングループ、環境、応答時間バケットなど)。

**注**:

* このクエリの構文は[ログエクスプローラー][6]検索バーで使用されているものです。このクエリはファセットか否かに関わらず、任意のログ属性またはタグで実行できます。クエリ内でワイルドカードを使用することも可能です。
* ログは、プロセッサークエリのいずれかと一致した時点で停止します。1 つのログが複数のクエリに一致する可能性がある場合は、クエリが正しい順序になっていることを確認してください。
* カテゴリ名は一意でなければなりません。
* カテゴリプロセッサーを定義したら、[ログステータスリマッパー](#log-status-remapper)を使用してカテゴリをログステータスにマップします。

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** ページ][1]で、カテゴリプロセッサーを定義します。たとえば、Web アクセスログをステータスコード範囲に基づいて分類 (応答コード 200 ～ 299 の場合は「OK」、応答コード 300 ～ 399 の場合は「通知」など) するには、次のプロセッサーを追加します。

{{< img src="logs/log_configuration/processor/category_processor.png" alt="カテゴリプロセッサー" style="width:80%;" >}}

このプロセッサーは、次のような結果をもたらします。

{{< img src="logs/log_configuration/processor/category_processor_result.png" alt="カテゴリプロセッサー結果" style="width:80%;" >}}

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
| `name`       | 文字列          | ✕       | プロセッサーの名前。                                                                                     |
| `is_enabled` | Boolean         | ✕       | プロセッサーが有効になっているかどうか。デフォルト: `false`                                                      |
| `categories` | オブジェクトの配列 | はい      | フィルターと名前の配列。フィルターはログに一致するかどうかを識別し、名前はログにカスタム値を割り当てるために使用されます。 |
| `target`     | 文字列          | はい      | 一致するカテゴリによって値が定義されるターゲット属性の名前。                              |

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## 算術演算プロセッサー

ログに、指定された式の結果を含む新しい属性 (新しい属性の名前にはスペースまたは特殊文字を含まない) を追加するには、算術演算プロセッサーを使用します。これにより、異なる単位を持つ異なる時間属性を 1 つの属性に再マップしたり、同じログ内の複数の属性に対して演算を行ったりします。

算術演算プロセッサーの式には、括弧および基本的な算術演算子 `-`、`+`、`*`、`/` を使用できます。

デフォルトでは、属性がない場合は計算がスキップされます。*Replace missing attribute by 0* を選択すると、属性値がない場合は自動的に 0 を挿入して、常に計算が行われます。

**注**:

* ログの属性にない場合、または数値に変換できない場合、属性が見つからないと表示されることがあります。
* `start-time` のような属性名にはダッシュが含まれることがあるため、演算子 `-` を使用する場合は、その周りにスペースを追加してください。例えば、次の式では `-` 演算子の周りにスペースを入れなければなりません: `(end-time - start-time) / 1000`
* ターゲット属性が既に存在している場合は、式の結果で上書きされます。
* 結果は小数第 9 位に丸められます。たとえば、式の結果が `0.1234567891` の場合、実際に属性に格納される値は `0.123456789` になります。
* 測定単位の拡張が必要な場合は、スケールフィルターを使用してください。

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** ページ][1]で算術演算プロセッサーを定義します。

{{< img src="logs/log_configuration/processor/arithmetic_processor.png" alt="算術演算プロセッサー" style="width:80%;">}}

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
| `name`               | 文字列  | ✕       | プロセッサーの名前。                                                                                                                       |
| `is_enabled`         | Boolean | ✕       | プロセッサーが有効になっているかどうか。デフォルト: `false`。                                                                                       |
| `expression`         | 文字列  | はい      | 1 つ以上のログ属性間の算術演算。                                                                                     |
| `target`             | 文字列  | はい      | 算術演算の結果を格納する属性の名前。                                                                  |
| `is_replace_missing` | Boolean | ✕       | `true` の場合は、`expression` 内の欠落している属性をすべて 0 に置き換えます。`false` の場合は、属性が欠落していると演算をスキップします。デフォルト: `false`。 |

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## ストリングビルダープロセッサー

ログに、指定されたテンプレートの結果を含む新しい属性 (スペースまたは特殊文字を含まない) を追加するには、ストリングビルダープロセッサーを使用します。これを使用して、異なる属性や生文字列を 1 つの属性に集約することができます。

このテンプレートは生テキストとブロックに `%{attribute_path}` 構文を組み合わせた形で定義されます。

**注**:

* このプロセッサーでは、ブロック内に値または値の配列を持つ属性のみしか使用できません (以下の UI セクションの例をご参照ください)。
* 属性 (オブジェクトまたはオブジェクトの配列) が使用できない場合、その属性を空の文字列に置換するか、操作自体をスキップするかを選択することができます。
* ターゲット属性が既に存在する場合、その属性はテンプレートの結果で上書きされます。
* テンプレートの結果は 256 文字以内に収める必要があります。

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** ページ][1]でストリングビルダープロセッサーを定義します。

{{< img src="logs/log_configuration/processor/stringbuilder_processor.png" alt="ストリングビルダープロセッサー" style="width:80%;">}}

以下のようなログがある場合、テンプレート `Request %{http.method} %{http.url} was answered with response %{http.status_code}` を使って、結果を返します。例:


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

以下を返します。

```text
リクエスト GET https://app.datadoghq.com/users に対する応答 200
```

**注**: `http` はオブジェクトであり、ブロック内で使用することはできません (`%{http}` は失敗します)。一方、`%{http.method}`、`%{http.status_code}`、または `%{http.url}` は、対応する値を返します。ブロックは、値の配列や配列内の特定の属性に対して使用することができます。

* 例えば、 `%{array_ids}` というブロックを追加すると、以下のような値が返されます。

   ```text
   123,456,789
   ```

* `%{array_users}` はオブジェクトリストのため戻り値はありません。しかし、`%{array_users.first_name}` は次のように配列に含まれる `first_name` のリストを返します:

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
| `is_replace_missing` | Boolean | ✕       | `true` の場合は、`template` 内の欠落している属性をすべて空の文字列に置き換えます。`false` の場合は、属性が欠落していると演算をスキップします。デフォルト: `false`。 |

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## GeoIP パーサー

geoIP パーサーは、IP アドレスの属性を受け取り、対象の属性パスに大陸、国、小区域、または都市情報 (利用可能な場合) を抽出します。

{{< tabs >}}
{{% tab "UI" %}}

{{< img src="logs/log_configuration/processor/geoip_processor.png" alt="GeoIP プロセッサー" style="width:80%;">}}

ほとんどの要素は `name` と `iso_code` (大陸の場合は `code`) 属性を含んでいます。`subdivision` は国が使用する最初のレベルの細分化で、アメリカ合衆国の場合は "States"、フランスの場合は "Departments" となります。

例えば、geoIP パーサーは `network.client.ip` 属性から位置を抽出し、それを `network.client.geoip` 属性に格納します。

{{< img src="logs/log_configuration/processor/geoip_example_blurred.png" alt="GeoIP 例" style="width:60%;">}}

{{% /tab %}}
{{% tab "API" %}}

次の geoIP パーサー JSON ペイロードで [Datadog ログパイプライン API エンドポイント][1]を使用します。

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
| `name`       | 文字列           | ✕       | プロセッサーの名前。                                                                                                    |
| `is_enabled` | Boolean          | ✕       | プロセッサーが有効になっているかどうか。デフォルト: `false`。                                                                     |
| `sources`    | 文字列の配列 | ✕       | ソース属性の配列。デフォルト: `network.client.ip`。                                                                  |
| `target`     | 文字列           | はい      | `sources` から抽出されたすべての詳細を含む親属性の名前。デフォルト:  `network.client.geoip`。  |

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## ルックアッププロセッサー

ルックアッププロセッサーを使用して、ログ属性と [Reference Table][7] またはプロセッサーマッピングテーブルに保存された人間が読める値との間のマッピングを定義することができます。

たとえば、ルックアッププロセッサーで内部のサービス ID をマップし、読んで意味の通るサービス名を割り当てることができます。また、このプロセッサーで本番環境に接続を試みた MAC アドレスと盗難に遭ったマシンのリストを照合し、接続元をチェックすることが可能です。

{{< tabs >}}
{{% tab "UI" %}}

ルックアッププロセッサーは、以下の動作を行います。

* 現在のログにソース属性が含まれていないかを確認する。
* ソース属性の値がマッピングテーブルに存在するかをチェックする。
  * 存在する場合、テーブルにターゲット属性を作成し、対応する値を割り当てる。
  * オプションとして、マッピングテーブルで値が見つからなかった場合、`fallbackValue` フィールドにデフォルトのフォールバック値を設定したターゲット属性を作成します。**Manual Mapping** タブでは、`source_key,target_value` ペアのリストを手動で入力するか、CSV ファイルをアップロードすることができます。

    {{< img src="logs/log_configuration/processor/lookup_processor_manual_mapping.png" alt="ルックアッププロセッサー" style="width:80%;">}}

    マッピングテーブルのサイズ上限は 100Kb です。この制限はプラットフォーム上のすべてのルックアッププロセッサーに適用されます。しかし、Reference Table はより大容量のファイルサイズをサポートしています。

  * オプションとして、マッピングテーブルで値が見つからない場合は、リファレンステーブルの値でターゲット属性を作成します。[Reference Table][101] の値は、**Reference Table** タブで選択できます。

    {{< img src="logs/log_configuration/processor/lookup_processor_reference_table.png" alt="ルックアッププロセッサー" 
    style="width:80%;">}}


[101]: /ja/integrations/guide/reference-tables/

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
| `name`           | 文字列           | ✕       | プロセッサーの名前。                                                                                                                                                   |
| `is_enabled`     | Boolean          | はい      | プロセッサーが有効になっているかどうか。デフォルト: `false`。                                                                                                                     |
| `source`         | 文字列           | はい      | ルックアップを実行する際に使用したソース属性です。                                                                                                                             |
| `target`         | 文字列           | はい      | マッピングリスト内 (マッピングリスト内で見つからない場合は `default_lookup` ) の対応する値を含む属性名です。                                |
| `lookup_table`   | 文字列の配列 | はい      | ソース属性値とそれに関連するターゲット属性値のマッピングテーブルです。[ "source_key1,target_value1", "source_key2,target_value2" ] のような形式で示されます。 |
| `default_lookup` | 文字列           | ✕       | リスト上にソースの値がない場合、ターゲット属性に設定する値です。                                                                                          |

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## トレースリマッパー

アプリケーショントレースとログの間の関連付けを改善する方法は 2 つあります。

1. [トレース ID をアプリケーションログに挿入する方法][8]のドキュメントを参照してください。セットアップの大半は、ログのインテグレーションによってデフォルトで行われます。

2. トレースリマッパープロセッサーを使用して、トレース ID として関連付けられるログ属性を定義します。

{{< tabs >}}
{{% tab "UI" %}}

[**Pipelines** ページ][1]で、トレースリマッパープロセッサーを定義します。次のように、プロセッサータイルでトレース ID 属性パスを入力します。

{{< img src="logs/log_configuration/processor/trace_processor.png" alt="トレース ID プロセッサー" style="width:80%;">}}

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
| `name`       | 文字列           | ✕       | プロセッサーの名前。                                 |
| `is_enabled` | Boolean          | ✕       | プロセッサーが有効になっているかどうか。デフォルト: `false`。 |
| `sources`    | 文字列の配列 | ✕       | ソース属性の配列。デフォルト: `dd.trace_id`。    |

[1]: /ja/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

**注**: ログまたは UI のログ属性には、トレース ID およびスパン ID は表示されません。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits は Datadog, Inc. の商標です。

[1]: /ja/logs/log_configuration/pipelines/
[2]: /ja/logs/log_configuration/parsing/
[3]: /ja/logs/log_configuration/parsing/?tab=matchers#parsing-dates
[4]: https://en.wikipedia.org/wiki/Syslog#Severity_level
[5]: /ja/logs/log_collection/?tab=host#attributes-and-tags
[6]: /ja/logs/search_syntax/
[7]: /ja/integrations/guide/reference-tables/
[8]: /ja/tracing/other_telemetry/connect_logs_and_traces/