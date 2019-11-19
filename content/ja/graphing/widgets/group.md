---
title: グループウィジェット
kind: documentation
description: 複数のウィジェットを 1 つのタイムボードにグループ化する
further_reading:
  - link: graphing/dashboards/timeboard/
    tag: Documentation
    text: Timeboards
  - link: graphing/graphing_json/
    tag: Documentation
    text: JSON を使用したダッシュボードの構築
---
グループウィジェットを使用すると、類似のグラフを[タイムボード][1]にまとめることができます。各グループにはカスタムヘッダーと 1 つ以上のグラフを含めることができ、折りたたみ可能です。

{{< img src="graphing/widgets/group/group.mp4" alt="Group Widget" video="true" responsive="true" >}}

## セットアップ

グループの右上隅にある歯車アイコンを使用して、グループの名前を選択します。

## API
グループウィジェットの[ウィジェット JSON スキーマ定義][2]は次のとおりです。

```
GROUP_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["group"]},
        "layout_type": {"enum": ["ordered"]},
        "widgets": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "definition": {
                        "oneOf": [WIDGET_DEFINITION]
                    },
                    "id": {"type": "integer"}
                },
                "required": ["definition"],
                "additionalProperties": false
            }
        },
        "title": {"type": "string"}
    },
    "required": ["type", "layout_type", "widgets"],
    "additionalProperties": false
}
```

| パラメーター     | タイプ             | 必須 | 説明                                                                                                                                             |
| ------        | -----            | -------- | -----                                                                                                                                                   |
| `type`        | string           | はい      | ウィジェットのタイプ。グループウィジェットには `group` を使用します。                                                                                                   |
| `widgets`     | オブジェクトの配列 | はい      | グループウィジェットに所属するウィジェットのリスト。`WIDGET_DEFINITION` の作成方法については、[ウィジェット JSON スキーマに関するドキュメント][3]を参照してください。 |
| `layout_type` | string           | はい      | グループのレイアウトタイプ。有効な値は `ordered` です。                                                                                                  |
| `title`       | string           | いいえ       | ウィジェットのタイトル。                                                                                                                                   |


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/graphing/dashboards/timeboard
[2]: /ja/graphing/graphing_json/widget_json
[3]: /ja/graphing/graphing_json/widget_json