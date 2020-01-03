---
title: イベントタイムラインウィジェット
kind: documentation
description: イベントストリームのタイムラインをウィジェットに表示する
further_reading:
  - link: graphing/dashboards/screenboard/
    tag: Documentation
    text: Screenboard
  - link: graphing/graphing_json/
    tag: Documentation
    text: JSON を使用したダッシュボードの構築
---
イベントタイムラインは、[イベントストリームビュー][1]の上部に表示されるタイムラインのウィジェット版です。

{{< img src="graphing/widgets/event_timeline/event_timeline.png" alt="Event timeline example" responsive="true" >}}

## セットアップ

{{< img src="graphing/widgets/event_timeline/event_timeline_setup.png" alt="Event timeline example" responsive="true" style="width:80%;">}}

### コンフィグレーション

1. [検索クエリ][1]を入力して、イベントストリームを絞り込みます。
2. スクリーンボードの場合にのみ、ウィジェットがカスタムタイムフレームを持つか、スクリーンボードのグローバルタイムフレームを持つかを選択します。

### オプション
#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

{{< img src="graphing/widgets/options/title.png" alt="Widget title" responsive="true" style="width:80%;">}}

オプションで、サイズと配置を定義できます。


## API

イベントタイムラインウィジェット専用の[ウィジェット JSON スキーマ定義][2]は次のとおりです。

```
EVENT_TIMELINE_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["event_timeline"]},
        "query": {"type": "string"},
        "title": {"type": "string"},
        "title_size": {"type": "string"},
        "title_align": {"enum": ["center", "left", "right"]}
        "time": TIME_SCHEMA
    },
    "required": ["type", "query"],
    "additionalProperties": false
}
```

| パラメーター  | タイプ            | 必須 | 説明                                                                                                                                                  |
| ------     | -----           | -----    | -----                                                                                                                                                        |
| `type`| string|はい|ウィジェットのタイプ。イベントタイムラインウィジェットには `event_timeline` を使用します。|
|`query`|string|はい|イベントタイムラインの絞り込みに使用するクエリ|
|`title`|string|いいえ|ウィジェットのタイトル|
|`title_size`|string|いいえ|タイトルのサイズ|
|`title_align`|string|いいえ|タイトルの配置方法。有効な値は `center`、`left`、`right` です。
|`time`|object|いいえ|ウィジェットの時間設定。`TIME_SCHEMA` の作成方法については、[時間 JSON スキーマに関するドキュメント][3]を参照してください。



## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/graphing/event_stream
[2]: /ja/graphing/graphing_json/widget_json
[3]: /ja/graphing/graphing_json/widget_json/#time-schema