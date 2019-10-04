---
title: ログストリームウィジェット
kind: documentation
description: Datadog のダッシュボードにフィルター処理したログストリームを表示する
further_reading:
  - link: graphing/dashboards/screenboard/
    tag: Documentation
    text: Screenboard
  - link: graphing/graphing_json/
    tag: Documentation
    text: JSON を使用したダッシュボードの構築
---
ログストリームは、定義したクエリと一致するログフローを表示します。

{{< img src="graphing/widgets/log_stream/log_stream.png" alt="Log stream" responsive="true">}}

## セットアップ
### コンフィグレーション

{{< img src="graphing/widgets/log_stream/log_stream_setup.png" alt="Log stream setup" responsive="true" style="width:80%;">}}

ログストリームを絞り込むための[ログクエリ][1]を入力します。

### オプション
#### 列

[ファセット][2]と[メジャー][3]の値を列に表示します。

#### グローバルタイム

スクリーンボードの場合にのみ、ウィジェットがカスタムタイムフレームを持つか、スクリーンボードのグローバルタイムフレームを持つかを選択します。

#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

{{< img src="graphing/widgets/options/title.png" alt="Widget title" responsive="true" style="width:80%;">}}

オプションで、サイズと配置を定義できます。

## API

ログストリームウィジェットの[ウィジェット JSON スキーマ定義][4]は次のとおりです。

```
LOG_STREAM_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["log_stream"]},
        "logset": {"type": "string"},
        "query": {"type": "string"},
        "columns": {"type": "array", "items": {"type": "string"}},
        "title": {"type": "string"},
        "title_size": {"type": "string"},
        "title_align": {"enum": ["center", "left", "right"]},
        "time": TIME_SCHEMA
    },
    "required": ["type", "logset"],
    "additionalProperties": false
}
```

| パラメーター  | タイプ            | 必須 | 説明                                                                                                                                                  |
| ------     | -----           | -----    | -----                                                                                                                                                        |
| `type`| string|はい|ウィジェットのタイプ。ログストリームウィジェットには `log_stream` を使用します。|
|`logset`|string|はい|ストリームで使用するログセット|
|`query`|string|いいえ|ログストリームの絞り込みに使用するクエリ|
|`columns`|array|いいえ|ウィジェットに表示する列|
|`title`|string|いいえ|ウィジェットのタイトル|
|`title_size`|string|いいえ|タイトルのサイズ|
|`title_align`|string|いいえ|タイトルの配置方法。有効な値は `center`、`left`、`right` です。
|`time`|object|いいえ|ウィジェットの時間設定。`TIME_SCHEMA` の作成方法については、[時間 JSON スキーマに関するドキュメント][5]を参照してください。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/explorer/search
[2]: /ja/logs/explorer/?tab=facets#setup
[3]: /ja/logs/explorer/?tab=measures#setup
[4]: /ja/graphing/graphing_json/widget_json
[5]: /ja/graphing/graphing_json/widget_json/#time-schema