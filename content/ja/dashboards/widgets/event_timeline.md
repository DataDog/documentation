---
title: イベントタイムラインウィジェット
kind: documentation
description: イベントストリームのタイムラインをウィジェットに表示する
aliases:
  - /ja/graphing/widgets/event_timeline/
further_reading:
  - link: /dashboards/screenboards/
    tag: ドキュメント
    text: スクリーンボード
  - link: /dashboards/graphing_json/
    tag: ドキュメント
    text: JSON を使用したダッシュボードの構築
---
イベントタイムラインは、[イベントストリームビュー][1]の上部に表示されるタイムラインのウィジェット版です。

{{< img src="dashboards/widgets/event_timeline/event_timeline.png" alt="イベントのタイムラインの例"  >}}

## セットアップ

{{< img src="dashboards/widgets/event_timeline/event_timeline_setup.png" alt="イベントのタイムラインの例"  style="width:80%;">}}

### コンフィギュレーション

1. [検索クエリ][1]を入力して、イベントストリームを絞り込みます。
2. スクリーンボードの場合にのみ、ウィジェットがカスタムタイムフレームを持つか、スクリーンボードのグローバルタイムフレームを持つかを選択します。

### オプション

#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

{{< img src="dashboards/widgets/options/title.png" alt="ウィジェットのタイトル"  style="width:80%;">}}

オプションで、サイズと配置を定義できます。

## API

イベントタイムラインウィジェット専用の[ウィジェット JSON スキーマ定義][2]は次のとおりです。

```text
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

| パラメーター     | 種類   | 必須 | 説明                                                                                                                |
|---------------|--------|----------|----------------------------------------------------------------------------------------------------------------------------|
| `type`        | string | はい      | ウィジェットのタイプ。イベントタイムラインウィジェットには `event_timeline` を使用します。                                                     |
| `query`       | string | はい      | イベントタイムラインの絞り込みに使用するクエリ                                                                                    |
| `title`       | string | いいえ       | ウィジェットのタイトル                                                                                                        |
| `title_size`  | string | いいえ       | タイトルのサイズ                                                                                                          |
| `title_align` | string | いいえ       | タイトルの配置方法。有効な値は `center`、`left`、`right` です。                                                 |
| `time`        | object | いいえ       | ウィジェットの時間設定。`TIME_SCHEMA` の作成方法については、[時間 JSON スキーマに関するドキュメント][3]を参照してください。 |


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/events/
[2]: /ja/dashboards/graphing_json/widget_json/
[3]: /ja/dashboards/graphing_json/widget_json/#time-schema