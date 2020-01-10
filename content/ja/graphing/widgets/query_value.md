---
title: クエリ値ウィジェット
kind: documentation
description: 1 つのメトリクスクエリの集計値を表示する
further_reading:
  - link: graphing/dashboards/screenboard/
    tag: Documentation
    text: Screenboard
  - link: graphing/graphing_json/
    tag: Documentation
    text: JSON を使用したダッシュボードの構築
---
クエリ値は、1 つのメトリクス、APM、またはログクエリの現在の値を表示します。値は条件付き書式 (緑/黄/赤色の背景など) を使用して表示され、値が期待される範囲内にあるかどうかを示します。
クエリ値によって表示される値は、必ずしもある瞬間の測定値を表しているわけではありません。

このウィジェットは、最新の報告値を表示することも、タイムウィンドウ全体のすべてのクエリ値から計算された集計値を表示することもできます。この可視化機能は、小さくてもはっきりとしたインフラストラクチャークエリへのウィンドウを提供します。

{{< img src="graphing/widgets/query_value/query_value.png" alt="Query value widget"  >}}

## セットアップ

{{< img src="graphing/widgets/query_value/query_value_setup.png" alt="Query value widget setup"  style="width:80%;">}}

### コンフィグレーション

1. グラフ化するデータを選択します。
    * メトリクス:  メトリクスクエリの構成については、[グラフ作成方法に関するドキュメント][1]を参照してください。
    * APM イベント: APM イベントクエリの構成については、[トレース検索に関するドキュメント][2]を参照してください。
    * ログイベント: ログイベントクエリの構成については、[ログ検索に関するドキュメント][3]を参照してください。
2. 単位と書式を選択します。
3. オプション: 表示される値に応じて条件付き書式を構成します。

### オプション
#### グローバルタイム

スクリーンボードの場合にのみ、ウィジェットがカスタムタイムフレームを持つか、スクリーンボードのグローバルタイムフレームを持つかを選択します。

#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

{{< img src="graphing/widgets/options/title.png" alt="Widget title"  style="width:80%;">}}

オプションで、サイズと配置を定義できます。

## API

クエリ値ウィジェットの[ウィジェット JSON スキーマ定義][4]は次のとおりです。

```
QUERY_VALUE_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["query_value"]},
        "requests": {
            "type":     "array",
            "items":    REQUEST_SCHEMA,
            "minItems": 1,
            "maxItems": 1
        },
        "autoscale":   {"type": "boolean"},
        "custom_unit": {"type": "string"},
        "precision":   {"type": "integer"},
        "text_align":  {"enum": ["center", "left", "right"]},
        "title":       {"type": "string"}
    },
    "required": ["type", "requests"],
    "additionalProperties": false
}
```

| パラメーター     | タイプ            | 必須 | 説明                                                                                                                                                  |
| ------        | -----           | -----    | --------                                                                                                                                                     |
| `type`        | string          | はい      | ウィジェットのタイプ。クエリ値ウィジェットには `query_value` を使用します。                                                                                                   |
| `requests`    | オブジェクトの配列 | はい      | ウィジェットに表示する 1 つの `request` オブジェクトの配列。`REQUEST_SCHEMA` の作成方法については、[リクエスト JSON スキーマに関するドキュメント][5]を参照してください。 |
| `autoscale`   | Boolean         | いいえ       | オートスケーリングを使用するかどうか。                                                                                                                           |
| `custom_unit` | string          | いいえ       | 選択した単位をウィジェットに表示します。                                                                                                                 |
| `precision`   | integer         | いいえ       | 小数点以下の表示桁数。定義されない場合は、未処理の値が使用されます。                                                                                    |
| `text_align`  | string            | いいえ       | ウィジェット内に値を配置する方法。有効な値は `center`、`left`、`right` です。                                                                      |
| `title`       | string          | いいえ       | ウィジェットのタイトル。                                                                                                                                        |


`request` オブジェクトでは、以下のプロパティも使用できます。

```
{
    "conditional_formats": CONDITIONAL_FORMATS_SCHEMA,
    "aggregator": {"enum": ["avg", "last", "max", "min", "sum"]}
}
```

| パラメーター             | タイプ   | 必須 | 説明                                                                                                                                                     |
| ------                | -----  | -------- | ----                                                                                                                                                            |
| `conditional_formats` | object | いいえ       | 条件付き書式コントロールのオプション。`CONDITIONAL_FORMATS_SCHEMA` の作成方法については、[条件付き書式 JSON スキーマに関するドキュメント][6]を参照してください。 |
| `aggregator`          | enum   | いいえ       | リクエストに使用される集計関数。有効な値は `avg`、`last`、`max`、`min`、`sum` です。                                                                   |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/graphing
[2]: /ja/tracing/search/#search-bar
[3]: https://docs.datadoghq.com/ja/logs/explorer/search/#search-syntax
[4]: /ja/graphing/graphing_json/widget_json
[5]: /ja/graphing/graphing_json/request_json
[6]: /ja/graphing/graphing_json/widget_json/#conditional-format-schema