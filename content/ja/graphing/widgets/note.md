---
title: ノート &amp; リンクウィジェット
kind: documentation
description: スクリーンボードにテキストを表示する
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
ノート &amp; リンクウィジェットは、[フリーテキストウィジェット][1]に似ていますが、より多くの書式オプションを利用できます。

## セットアップ

{{< img src="graphing/widgets/note/using_link_note_widget.gif" alt="Notes and links widget setup"   style="width:80%;">}}

1. 表示したいテキストを入力します。マークダウンがサポートされています。
2. テキストサイズとノートの背景色を選択します。
3. ポインターの位置を選択します。

## API

ノートウィジェットの[ウィジェット JSON スキーマ定義][2]は次のとおりです。

```
NOTE_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["note"]},
        "content": {"type": "string"},
        "background_color": {"type": "string"},
        "font_size": {"type": "string"},
        "text_align": {"enum": ["center", "left", "right"]}
        "show_tick": {"type": "boolean"},
        "tick_pos": {"type": "string"},
        "tick_edge": {"enum": ["bottom", "left", "right", "top"]}
    },
    "required": ["type", "content"],
    "additionalProperties": false
}
```

| パラメーター  | 型            | 必須 | 説明                                                                                                                                                  |
| ------     | -----           | -----    | -----                                                                                                                                                        |
| `type`     | string          | はい      | ウィジェットのタイプ。ノートウィジェットには `note` を使用します。|
|`content`|string|はい|ノートのコンテンツ|
|`background_color`|string|いいえ|ノートの背景色|
|`font_size`|string|いいえ|テキストのサイズ|
|`text_align`|string|いいえ|ウィジェットにテキストを配置する方法。有効な値は `center`、`left`、`right` です。
|`show_tick`|Boolean|いいえ|目盛を表示するかどうか
|`tick_pos`|string|いいえ|辺上の目盛を配置する位置
|`tick_edge`|string|いいえ|4 辺のうち、目盛を表示する辺。有効な値は `bottom`、`left`、`right`、`top` です。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/graphing/widgets/free_text
[2]: /ja/graphing/graphing_json/widget_json