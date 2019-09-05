---
title: アラートグラフウィジェット
kind: documentation
description: システムで定義されているモニターの現在のステータスをグラフ化する
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
アラートグラフは、システムで定義されているモニターの現在のステータスを表示する時系列グラフです。

{{< img src="graphing/widgets/alert_graph/alert_graph.png" alt="Alert Graph" responsive="true">}}

## セットアップ

{{< img src="graphing/widgets/alert_graph/alert_graph_setup.png" alt="Alert Graph Setup" responsive="true" style="width:80%;">}}

### コンフィグレーション

1. これまでに作成したモニターから、グラフ化するモニターを選択します。
2. タイムフレームを選択します。
3. 次のいずれかの可視化方法を選択します。
    * Timeseries
    * Toplist

### オプション
#### 表示設定

{{< img src="graphing/widgets/options/display_preferences.png" alt="Display preferences" responsive="true" style="width:80%;">}}

##### グローバルタイム

スクリーンボードの場合にのみ、ウィジェットがカスタムタイムフレームを持つか、スクリーンボードのグローバルタイムフレームを持つかを選択します。

##### 凡例

Show legend on graph を使用して、ウィジェットの凡例の表示/非表示を切り替えます。オプションで、表示するエントリ数を選択できます。

#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

{{< img src="graphing/widgets/options/title.png" alt="Widget title" responsive="true" style="width:80%;">}}

オプションで、サイズと配置を定義できます。

## API

アラートグラフウィジェット専用の[ウィジェット JSON スキーマ定義][1]は次のとおりです。

≪```
ALERT_GRAPH_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["alert_graph"]},
        "alert_id": {"type": "string"},
        "viz_type": {"enum": ["timeseries", "toplist"]},
        "title": {"type": "string"}
    },
    "required": ["type", "alert_id", "viz_type"],
    "additionalProperties": false
}
```≫

| パラメーター  | タイプ            | 必須 | 説明                                                                                                                                                  |
| ------     | -----           | -----    | -----                                                                                                                                                        |
| `type`     | string          | はい      | ウィジェットのタイプ。アラートグラフウィジェットには `alert_graph` を使用します。|
| `alert_id`     | string          | はい      | ウィジェットで使用するアラートの ID|
|`viz_type`|string|はい|アラートグラフを時系列とトップリストのどちらとして表示するかを指定します。有効な値は `timeseries` または `toplist` です。
|`title`|string|いいえ|ウィジェットのタイトル|

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/graphing/graphing_json/widget_json