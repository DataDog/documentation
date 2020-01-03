---
title: 変化ウィジェット
kind: documentation
description: 選択した期間中の値の変化をグラフ化する
further_reading:
  - link: graphing/dashboards/timeboard/
    tag: Documentation
    text: Timeboards
  - link: graphing/dashboards/screenboard/
    tag: Documentation
    text: Screenboard
  - link: graphing/graphing_json/
    tag: Documentation
    text: JSON を使用したダッシュボードの構築
  - link: graphing/graphing_json/widget_json
    tag: Documentation
    text: ウィジェット JSON スキーマ
  - link: graphing/graphing_json/request_json
    tag: Documentation
    text: リクエスト JSON スキーマ
---
変化グラフは、選択された期間中の値の変化を表示します。

{{< img src="graphing/widgets/change/change.png" alt="Change graph" >}}

## セットアップ

{{< img src="graphing/widgets/change/change_setup.png" alt="Change graph Setup"  style="width:80%;">}}

### コンフィグレーション

1. グラフ化するメトリクスを選択します。
2. 集計関数を選択します。
3. オプション: ウィジェットのコンテキストを選択します。
4. 集計をタグキー (`host`、`service` など) ごとに分解します。
5. 「比較対象」期間を以下から選択します。
    * an hour before (1 時間前)
    * a day before (1 日前)
    * a week before (1 週間前)
    * a month before (1 か月前)
6. 2 つの期間の間の相対的 (`relative`) 変化と絶対的 (`absolute`) 変化のどちらを表示するかを選択します。
7. 結果の順位付けに以下のどの基準を使用するかを選択します。
    * `change`
    * `name`
    * `present value`
    * `past value`
8. 増加 (`increases`) と減少 (`decreases`) のどちらが望ましい変化かを指定します。望ましい変化は緑で、望ましくない変化は赤でハイライトされます。
9. オプション: 現在の値を表示します。

### オプション
#### 表示設定

{{< img src="graphing/widgets/options/display_preferences.png" alt="Display preferences"  style="width:80%;">}}

##### グローバルタイム

スクリーンボードの場合にのみ、ウィジェットがカスタムタイムフレームを持つか、スクリーンボードのグローバルタイムフレームを持つかを選択します。

###### 凡例

Show legend on graph を使用して、ウィジェットの凡例の表示/非表示を切り替えます。オプションで、表示するエントリ数を選択できます。

#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

{{< img src="graphing/widgets/options/title.png" alt="Widget title"  style="width:80%;">}}

オプションで、サイズと配置を定義できます。

## API

変化ウィジェット専用の[ウィジェット JSON スキーマ定義][1]は次のとおりです。

```
CHANGE_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["change"]},
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

| パラメーター  | タイプ            | 必須 | 説明                                                                                                                                                  |
| ------     | -----           | -------- | -----                                                                                                                                                        |
| `type`     | string          | はい      | ウィジェットのタイプ。変化ウィジェットには `change` を使用します。                                                                                                       |
| `requests` | オブジェクトの配列 | はい      | ウィジェットに表示する 1 つの `request` オブジェクトの配列。`REQUEST_SCHEMA` の作成方法については、[リクエスト JSON スキーマに関するドキュメント][2]を参照してください。 |
| `title`    | string          | いいえ       | ウィジェットのタイトル。                                                                                                                                        |


`request` オブジェクトでは、以下のプロパティも使用できます。

```json
{
    "change_type":   {"enum": ["absolute", "relative"]},
    "compare_to":    {"enum": ["hour_before", "day_before", "week_before", "month_before"]},
    "increase_good": {"type": "boolean"},
    "order_by":      {"enum": ["change", "name", "present", "past"]},
    "order_dir":     {"enum": ["asc", "desc"]},
    "show_present":  {"type": "boolean"}
}
```

| パラメーター       | タイプ    | 必須 | 説明                                                                                                                    |
| ------          | -----   | -----    | --------                                                                                                                       |
| `change_type`   | string    | いいえ       | 絶対的変化または相対的変化を表示します。有効な値は `absolute` または `relative` です。                                       |
| `compare_to`    | string    | いいえ       | 変化の比較に使用するタイムフレーム。有効な値は `hour_before`、`day_before`、`week_before`、`month_before` です。 |
| `increase_good` | Boolean | いいえ       | 増加を望ましい変化として表示するかどうか。                                                                                              |
| `order_by`      | string    | いいえ       | 順位付けの基準。有効な値は `change`、`name`、`present`、`past` です。                                                |
| `order_dir`     | string    | いいえ       | 順位付けの方向。有効な値は `asc` または `desc` です。                                                                        |
| `show_present`  | Boolean | いいえ       | 現在の値を表示するかどうか。                                                                                             |
## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/graphing/graphing_json/widget_json
[2]: /ja/graphing/graphing_json/request_json