---
title: テーブルウィジェット
kind: documentation
aliases:
  - /ja/graphing/widgets/table/
further_reading:
  - link: /ja/dashboards/timeboards/
    tag: ドキュメント
    text: Timeboards
  - link: /ja/dashboards/screenboards/
    tag: ドキュメント
    text: スクリーンボード
  - link: /ja/dashboards/graphing_json/
    tag: ドキュメント
    text: JSON を使用したダッシュボードの構築
---
## 概要

テーブルを、タイムボードとスクリーンボードで可視化できます。タグキーでグループ化されたメトリクスの列が表示されます。たとえば、`system.cpu.system` と `system.cpu.user` が `service` でグループ化されます。

{{< img src="dashboards/widgets/table/table_widget.png" alt="テーブルウィジェット"  style="width:80%;">}}

## セットアップ

### コンフィギュレーション

* グラフを作成するデータを選択します (必要に応じて列を追加してください)。
  * メトリクス: メトリクスクエリの構成については、[グラフ作成方法に関するドキュメント][1]を参照してください。
  * ログイベント: ログイベントクエリの構成については、[ログ検索に関するドキュメント][2]を参照してください。
* メトリクスのエイリアスを設定することで、列ヘッダーの名前を変更できます。
* **Rows** に対して、**Group by** を行うタグキーを選択します。以下の例では `service` の行が表示されます。
* 結果の数の限度を選択します (デフォルトは 10)。
* テーブルを並べ替えるためのメトリクスを選択します (デフォルトは最初の列)。
* オプション: 各列のセルの値に応じて、条件付き書式を構成します。

{{< img src="dashboards/widgets/table/table_setup.png" alt="テーブルのセットアップ"  style="width:80%;">}}

## API

テーブルウィジェットの[ウィジェット JSON スキーマ定義][3]は次のとおりです。

```text
TOPLIST_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["query_table"]},
        "requests": {
            "type":     "array",
            "items":    REQUEST_SCHEMA,
            "minItems": 1,
            "maxItems": 1
        },
        "title": {"type": "string"}
    },
    "required": ["type", "requests"],
    "additionalProperties": false
}
```

| パラメーター  | 型             | 必須 | 説明                                                                                                                                         |
|------------|------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`     | 文字列           | はい      | ウィジェットのタイプ。テーブルウィジェットでは `query_table` を使用します。                                                                                         |
| `requests` | オブジェクトの配列 | はい      | ウィジェットに表示する 1 つの `request` オブジェクトの配列。`REQUEST_SCHEMA` の作成については、[リクエスト JSON スキーマに関するドキュメント][4]を参照してください。 |
| `title`    | 文字列           | いいえ       | ウィジェットのタイトル                                                                                                                                |

### リクエスト

`request` オブジェクトでは、以下のプロパティも使用できます。

```text
{
   "alias": {"type": "string"},
   "aggregator": {"enum": ["avg", "last", "max", "min", "sum"]},
   "limit": {"type": "integer"},
   "order": {"enum": ["asc", "desc"]},
   "conditional_formats": CONDITIONAL_FORMATS_SCHEMA
}
```

| パラメーター             | 型    | 必須 | 説明                                                                                                                                                                                        |
|-----------------------|---------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `alias`               | 文字列  | いいえ       | 列名 (デフォルトはメトリクスの名前)                                                                                                                                                      |
| `aggregator`          | 列挙    | はい      | メトリクスクエリの場合は、これを使用して、タイムフレームの値をテーブルで単一の値にロールアップする方法を定義します。指定可能な値は、`avg`、`last`、`max`、`min`、`sum` です。 |
| `limit`               | 整数 | はい      | メトリクスクエリの場合は、テーブルに表示する行の数です。1 つのリクエストだけで、このプロパティを設定する必要があります。                                                                                          |
| `order`               | 列挙    | はい      | メトリクスクエリの場合は、行の並べ替え順です。`limit` と同じリクエストで設定する必要があります。`desc` または `asc` の値を指定できます。                                                        |
| `conditional_formats` | オブジェクト  | いいえ       | 条件付き書式コントロールのオプション。`CONDITIONAL_FORMATS_SCHEMA` の作成方法については、[条件付き書式 JSON スキーマに関するドキュメント][5]を参照してください。                                    |

#### 複数の列

メトリクスクエリ用に複数の列を取得するには、複数のリクエストオブジェクト (列ごとに 1 つのオブジェクト) が必要になります。ログクエリの場合に必要なのは、`compute` オブジェクトの `multi_compute` 配列を含む 1 つのリクエストオブジェクトだけです。各 `compute` オブジェクトで 1 つの列を取得できます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/querying/#configuring-a-graph
[2]: /ja/logs/explorer/search/#search-syntax
[3]: /ja/dashboards/graphing_json/widget_json
[4]: /ja/dashboards/graphing_json/request_json
[5]: /ja/dashboards/graphing_json/widget_json/#conditional-format-schema