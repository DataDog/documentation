---
title: アラート値ウィジェット
kind: documentation
description: システムで定義されているモニター内のメトリクスの現在値をグラフ化する
further_reading:
  - link: graphing/dashboards/screenboard/
    tag: Documentation
    text: Screenboard
  - link: graphing/dashboards/timeboard/
    tag: Documentation
    text: Timeboards
  - link: graphing/graphing_json/
    tag: Documentation
    text: JSON を使用したダッシュボードの構築
---
アラート値は、システムで定義されているモニター内のメトリクスの現在値を表示するクエリ値です。

{{< img src="graphing/widgets/alert_value/alert_value.png" alt="Alert Value" responsive="true">}}

## セットアップ
{{< img src="graphing/widgets/alert_value/alert_value_setup.png" alt="Alert Value Setup" responsive="true" style="width:80%;">}}

### コンフィグレーション

1. これまでに作成したモニターから、グラフ化するモニターを選択します。
2. 表示に使用する書式を選択します。
    * 未処理の値
    * 小数点以下 0/1/2/3 桁
3. 表示する単位を選択します。
    * `Automatic`
    * `/s`: 毎秒
    * `b`: ビット
    * `B`: バイト
    * `Custom`

### オプション
#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

{{< img src="graphing/widgets/options/title.png" alt="Widget title" responsive="true" style="width:80%;">}}

オプションで、サイズと配置を定義できます。

## API

アラート値ウィジェット専用の[ウィジェット JSON スキーマ定義][1]は次のとおりです。

≪```
ALERT_VALUE_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["alert_value"]},
        "alert_id": {"type": "string"},
        "precision": {"type": "integer"},
        "unit": {"type": "string"},
        "text_size": {"type": "string"},
        "text_align": {"enum": ["left", "center", "right"]},
        "title": {"type": "string"}
    },
    "required": ["type", "alert_id"],
    "additionalProperties": false
}
```≫

| パラメーター  | タイプ            | 必須 | 説明                                                                                                                                                  |
| ------     | -----           | -----    | -----                                                                                                                                                        |
| `type`     | string          | はい      | ウィジェットのタイプ。アラート値ウィジェットには `alert_value` を使用します。|
| `alert_id`     | string          | はい      | ウィジェットで使用するアラートの ID|
| `precision`| integer| いいえ| 小数点以下の表示桁数。定義されない場合は、未処理の値が使用されます。|
| `unit`| string| いいえ| 値と共に表示する単位|
| `text_size`| string| いいえ| ウィジェット内の値のサイズ|
| `text_align`| string| いいえ| ウィジェット内の値の配置方法。有効な値は `left`、`center`、`right` です。|
|`title`|string|いいえ|ウィジェットのタイトル|

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/graphing/graphing_json/widget_json