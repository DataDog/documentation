---
title: モニターサマリーウィジェット
kind: documentation
description: Datadog のすべてのモニターまたはクエリに基づく一部のモニターの概要を表示する
further_reading:
  - link: graphing/dashboards/screenboard/
    tag: Documentation
    text: Screenboard
  - link: graphing/graphing_json/
    tag: Documentation
    text: JSON を使用したダッシュボードの構築
---
モニターサマリーウィジェットは、Datadog のすべてのモニターまたはクエリに基づく一部のモニターの概要を表示します。

{{< img src="graphing/widgets/monitor_summary/monitor_summary.png" alt="monitor summary " >}}

## セットアップ

{{< img src="graphing/widgets/monitor_summary/monitor_summary_setup.png" alt="monitor summary setup"  style="width:80%;">}}

### コンフィグレーション

1. 一部のモニターを対象としてモニターサマリーウィジェットを表示する場合は、[モニタークエリ][1]を入力します。
2. モニターステータスタイプごとのモニター数 (`count`) のみ表示するか、モニターの全リスト (`list`) を表示するか、またはその両方 (`both`) を表示するかを選択します。

## オプション
#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

{{< img src="graphing/widgets/options/title.png" alt="Widget title"  style="width:80%;">}}

オプションで、サイズと配置を定義できます。

## API

モニターサマリーウィジェットの[ウィジェット JSON スキーマ定義][2]は次のとおりです。

```
MANAGE_STATUS_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["manage_status"]},
        "query": {"type": "string"},
        "display_format": {"enum": ["counts", "countsAndList", "list"]},
        "color_preference": {"enum": ["background", "text"]},
        "hide_zero_counts": {"type": "boolean"},
        "title": {"type": "string"},
        "title_size": {"type": "string"},
        "title_align": {"enum": ["center", "left", "right"]}
    },
    "required": ["type", "query"],
    "additionalProperties": false
}
```

| パラメーター  | タイプ            | 必須 | 説明                                                                                                                                                  |
| ------     | -----           | -----    | -----                                                                                                                                                        |
| `type`| string|はい|ウィジェットのタイプ。モニターサマリーウィジェットには `manage_status` を使用します。|
|`query`|string|はい|モニターの絞り込みに使用するクエリ|
|`display_format`|string|いいえ|ウィジェットに何を表示するかを指定します。有効な値は `counts`、`countsAndList`、`list` です。
|`color_preference`|string|いいえ|ウィジェットで使用する色。有効な値は `background` または `text` です。
|`hide_zero_counts`|Boolean|いいえ|カウントが 0 でも表示するかどうか|
|`title`|string|いいえ|ウィジェットのタイトル|
|`title_size`|string|いいえ|タイトルのサイズ|
|`title_align`|string|いいえ|タイトルの配置方法。有効な値は `center`、`left`、`right` です。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/manage_monitor
[2]: /ja/graphing/graphing_json/widget_json