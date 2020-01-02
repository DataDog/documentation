---
title: イベントストリームウィジェット
kind: documentation
description: イベントストリームからイベントを絞り込んで表示する
further_reading:
  - link: graphing/dashboards/screenboard/
    tag: Documentation
    text: Screenboard
  - link: graphing/graphing_json/
    tag: Documentation
    text: JSON を使用したダッシュボードの構築
---
イベントストリームは、[イベントストリームビュー][1]に表示されるイベントストリームのウィジェット版です。

注: **このウィジェットには、直近の 100 イベントだけが表示されます**。

{{< img src="graphing/widgets/event_stream/event_stream.png" alt="event stream" >}}

## セットアップ

{{< img src="graphing/widgets/event_stream/event_stream_setup.png" alt="event stream setup"  style="width:80%;">}}

### コンフィグレーション

1. [検索クエリ][1]を入力して、イベントストリームを絞り込みます。
2. スクリーンボードの場合にのみ、ウィジェットがカスタムタイムフレームを持つか、スクリーンボードのグローバルタイムフレームを持つかを選択します。
3. Size パラメーターを使用して、イベントタイトルのみを表示するか、イベント本文全体を表示するかを選択します。

### オプション
#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

{{< img src="graphing/widgets/options/title.png" alt="Widget title"  style="width:80%;">}}

オプションで、サイズと配置を定義できます。


## API

イベントストリームウィジェット専用の[ウィジェット JSON スキーマ定義][2]は次のとおりです。

```
EVENT_STREAM_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["event_stream"]},
        "query": {"type": "string"},
        "event_size": {"enum": ["s", "l"]},
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
| `type`| string|はい|ウィジェットのタイプ。イベントストリームウィジェットには `event_stream` を使用します。|
|`query`|string|はい|イベントストリームの絞り込みに使用するクエリ|
|`event_size`|string|いいえ|イベントの表示に使用するサイズ (小または大)。有効な値は `s` または `l` です。
|`title`|string|いいえ|ウィジェットのタイトル|
|`title_size`|string|いいえ|タイトルのサイズ|
|`title_align`|string|いいえ|タイトルの配置方法。有効な値は `center`、`left`、`right` です。
|`time`|object|いいえ|ウィジェットの時間設定。`TIME_SCHEMA` の作成方法については、[時間 JSON スキーマに関するドキュメント][3]を参照してください。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/graphing/event_stream
[2]: /ja/graphing/graphing_json/widget_json
[3]: /ja/graphing/graphing_json/widget_json/#time-schema