---
title: フリーテキストウィジェット
kind: documentation
description: スクリーンボードにテキストを表示する
aliases:
  - /ja/graphing/widgets/free_text/
further_reading:
  - link: /dashboards/screenboards/
    tag: ドキュメント
    text: スクリーンボード
  - link: /dashboards/graphing_json/
    tag: ドキュメント
    text: JSON を使用したダッシュボードの構築
---
フリーテキストは、[スクリーンボード][1]に見出しを追加できるウィジェットです。

ダッシュボード全体の目的を示すためによく使用されます。

{{< img src="dashboards/widgets/free_text/free_text.png" alt="フリーテキスト" >}}

## セットアップ

{{< img src="dashboards/widgets/free_text/free_text_setup.png" alt="フリーテキストのセットアップ"  style="width:80%;">}}

### コンフィギュレーション

1. 表示するテキストを入力します。
2. テキストの書式を選択します。

## API

フリーテキストウィジェットの[ウィジェット JSON スキーマ定義][2]は次のとおりです。

```text
FREE_TEXT_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["free_text"]},
        "text": {"type": "string"},
        "color": {"type": "string"},
        "font_size": {"type": "string"},
        "text_align": {"enum": ["center", "left", "right"]}
    },
    "required": ["type", "text"],
    "additionalProperties": false
}
```

| パラメーター    | 種類   | 必須 | 説明                                                                             |
|--------------|--------|----------|-----------------------------------------------------------------------------------------|
| `type`       | string | はい      | ウィジェットのタイプ。フリーテキストウィジェットには `free_text` を使用します。                            |
| `text`       | string | はい      | 表示するテキスト                                                                         |
| `color`      | string | いいえ       | テキストの色                                                                       |
| `font_size`  | string | いいえ       | テキストのサイズ                                                                        |
| `text_align` | string | いいえ       | ウィジェットにテキストを配置する方法。有効な値は `center`、`left`、`right` です。 |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/screenboard/
[2]: /ja/dashboards/graphing_json/widget_json/