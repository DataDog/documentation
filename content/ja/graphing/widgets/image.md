---
title: イメージウィジェット
kind: documentation
description: Datadog のダッシュボードにイメージまたは gif 画像を含める
further_reading:
  - link: graphing/dashboards/screenboard/
    tag: Documentation
    text: Screenboard
  - link: graphing/graphing_json/
    tag: Documentation
    text: JSON を使用したダッシュボードの構築
---
イメージウィジェットを使用すると、ダッシュボードにイメージを埋め込むことができます。イメージには、PNG、JPG、またはアニメーション GIF を使用できます。

{{< img src="graphing/widgets/image/image.mp4" alt="Image" video="true" responsive="true" width="80%" >}}

## セットアップ

{{< img src="graphing/widgets/image/image_setup.png" alt="Image setup" responsive="true" style="width:80%;">}}

1. イメージの URL を入力します。
2. 外観を選択します。
    * Zoom image to cover whole tile (タイル全体を覆うようにイメージを拡大縮小)
    * Fit image on tile (イメージをタイル内に収める)
    * Center image on tile (イメージをタイルの中心に配置する)

## API

イメージウィジェットの[ウィジェット JSON スキーマ定義][1]は次のとおりです。

```
IMAGE_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["image"]},
        "url": {"type": "string"},
        "sizing": {"enum": ["zoom", "fit", "center"]},
        "margin": {"enum": ["small", "large"]}
    },
    "required": ["type", "url"],
    "additionalProperties": false
}
```

| パラメーター  | タイプ            | 必須 | 説明                                                                                                                                                  |
| ------     | -----           | -----    | -----                                                                                                                                                        |
| `type`| string|はい|ウィジェットのタイプ。イメージウィジェットには `image` を使用します。|
|`url`|string|はい|イメージの URL|
|`sizing`|string|いいえ|ウィジェット内のイメージのサイズ変更方法。有効な値は、`zoom`、`fit`、`center` です。
|`margin`|string|いいえ|イメージ周囲のマージンのサイズ。有効な値は `small` または `large` です。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/graphing/graphing_json/widget_json