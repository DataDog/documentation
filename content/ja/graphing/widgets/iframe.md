---
title: Iframe ウィジェット
kind: documentation
description: Datadog のダッシュボードに iframe を含める
further_reading:
  - link: graphing/dashboards/screenboard/
    tag: Documentation
    text: Screenboard
  - link: graphing/graphing_json/
    tag: Documentation
    text: JSON を使用したダッシュボードの構築
---
Iframe ウィジェットを使用すると、他の Web ページの一部をダッシュボードに埋め込むことができます。

## セットアップ

{{< img src="graphing/widgets/iframe/iframe_setup.png" alt="Iframe setup"  style="width:80%;">}}

iframe 内に表示するページの URL を入力します。HTTPS URL を使用しない場合は、セキュリティで保護されていないコンテンツを許可するようにブラウザを設定する必要があります。

## API

iframe ウィジェットの[ウィジェット JSON スキーマ定義][1]は次のとおりです。

```
IFRAME_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["iframe"]},
        "url": {"type": "string"},
    },
    "required": ["type", "url"],
    "additionalProperties": false
}
```

| パラメーター  | タイプ            | 必須 | 説明                                                                                                                                                  |
| ------     | -----           | -----    | -----                                                                                                                                                        |
| `type`| string|はい|ウィジェットのタイプ。iframe ウィジェットには `iframe` を使用します。|
|`url`|string|はい|iframe の URL|

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/graphing/graphing_json/widget_json