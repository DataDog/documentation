---
title: ログストリームウィジェット
kind: documentation
description: Datadog のダッシュボードにフィルター処理したログストリームを表示する
aliases:
  - /ja/graphing/widgets/log_stream/
further_reading:
  - link: /dashboards/screenboards/
    tag: ドキュメント
    text: スクリーンボード
  - link: /dashboards/graphing_json/
    tag: ドキュメント
    text: JSON を使用したダッシュボードの構築
---
ログストリームは、定義したクエリと一致するログフローを表示します。

{{< img src="dashboards/widgets/log_stream/log_stream.png" alt="ログストリーム" >}}

## セットアップ

### コンフィギュレーション

{{< img src="dashboards/widgets/log_stream/log_stream_setup.gif" alt="ログストリームのセットアップ"  style="width:80%;">}}

[ログクエリ][1]を入力してログストリームを絞り込みます。

### オプション

#### 列

[ファセット][2]と[メジャー][3]の値を列で表示します。

#### グローバルタイム

スクリーンボードの場合にのみ、ウィジェットがカスタムタイムフレームを持つか、スクリーンボードのグローバルタイムフレームを持つかを選択します。

#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

{{< img src="dashboards/widgets/options/title.png" alt="ウィジェットのタイトル"  style="width:80%;">}}

オプションで、サイズと配置を定義できます。

## API

ログストリームウィジェットの[ウィジェット JSON スキーマ定義][3]は次のとおりです。

```text
LOG_STREAM_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["log_stream"]},
        "logset": {"type": "string"},
        "indexes": {"type": "array", "items": {"type": "string"}},
        "query": {"type": "string"},
        "columns": {"type": "array", "items": {"type": "string"}},
        "title": {"type": "string"},
        "title_size": {"type": "string"},
        "title_align": {"enum": ["center", "left", "right"]},
        "time": TIME_SCHEMA
    },
    "required": ["type"],
    "additionalProperties": false
}
```

| パラメーター             | 種類    | 必須 | 説明                                                                                |
|-----------------------|---------|----------|--------------------------------------------------------------------------------------------|
| `type`                | 文字列  | 〇      | ウィジェットのタイプ。ログストリームウィジェットには `log_stream` を使用します。                            |
| `logset`              | 文字列  | ✕       | (非推奨) 代わりに 'indexes' を使用してください。ストリーム内でクエリを実行するためのインデックス ID。            |
| `indexes`             | 配列   | ✕       | ストリーム内でクエリを実行するためのインデックス名の配列。すべてのインデックスを一度にクエリするには、`[]` を使用します。       |
| `query`               | 文字列  | ✕       | ログストリームを絞り込むクエリ。                                                        |
| `columns`             | 配列   | ✕       | ウィジェットに表示する列。                                                      |
| `show_date_column`    | Boolean | ✕       | 日付列を表示するかどうか。                                                    |
| `show_message_column` | Boolean | ✕       | メッセージ列を表示するかどうか。                                                 |
| `message_display`     | 文字列  | ✕       | 表示するログ行の量。                                                        |
| `sort`                | オブジェクト  | ✕       | 並べ替える列と順序。                                                           |
| `title`               | 文字列  | ✕       | ウィジェットのタイトル。                                                                   |
| `title_size`          | 文字列  | ✕       | タイトルのサイズ。                                                                     |
| `title_align`         | 文字列  | ✕       | タイトルの配置方法。有効な値は `center`、`left`、`right` です。             |
| `time`                | オブジェクト  | ✕       | ウィジェットの時間設定。詳細については、[時間 JSON スキーマに関するドキュメント][4]を参照してください。 |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/explorer/search/
[2]: /ja/logs/explorer/facets/
[3]: /ja/dashboards/graphing_json/widget_json/
[4]: /ja/dashboards/graphing_json/widget_json/#time-schema