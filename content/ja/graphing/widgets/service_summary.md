---
title: サービスサマリーウィジェット
kind: documentation
description: 選択されたサービスのグラフをスクリーンボードに表示する
further_reading:
  - link: graphing/dashboards/screenboard/
    tag: Documentation
    text: Screenboard
  - link: graphing/graphing_json/
    tag: Documentation
    text: JSON を使用したダッシュボードの構築
---
サービスサマリーは、選択された[サービス][1]のグラフをスクリーンボードに表示します。

{{< img src="graphing/widgets/service_summary/service_summary.png" alt="service summary" >}}

## セットアップ

{{< img src="graphing/widgets/service_summary/service_summary_setup.png" alt="service summary setup"  style="width:80%;">}}

### コンフィグレーション

1. [環境][2]と[サービス][1]を選択します。
2. ウィジェットのサイズを選択します。
3. 表示する情報を選択します。
    * Hits
    * Errors
    * Latency
    * Breakdown
    * Distribution
    * Resource
4. タイムフレーム、およびグラフの表示に使用する列数を選択して、表示設定を行います。
5. グラフのタイトルを入力します。


## API

サービスサマリーウィジェットの[ウィジェット JSON スキーマ定義][2]は次のとおりです。

```
TRACE_SERVICE_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["trace_service"]},
        "env": {"type": "string"},
        "service": {"type": "string"},
        "span_name": {"type": "string"},
        "show_hits": {"type": "boolean"},
        "show_errors": {"type": "boolean"},
        "show_latency": {"type": "boolean"},
        "show_breakdown": {"type": "boolean"},
        "show_distribution": {"type": "boolean"},
        "show_resource_list": {"type": "boolean"},
        "size_format": {"enum": ["small", "medium", "large"]},
        "display_format": {"enum": ["one_column", "two_column", "three_column"]},
        "title": {"type": "string"},
        "title_size": {"type": "string"},
        "title_align": {"enum": ["center", "left", "right"]},
        "time": TIME_SCHEMA
    },
    "required": ["type", "env", "service", "span_name"],
    "additionalProperties": false
}
```

| パラメーター  | タイプ            | 必須 | 説明                                                                                                                                                  |
| ------     | -----           | -----    | -----                                                                                                                                                        |
| `type`| string|はい|ウィジェットのタイプ。サービスサマリーウィジェットには `trace_service` を使用します。|
|`env`|string|はい|APM 環境|
|`service`|string|はい|APM サービス|
|`span_name`|string|はい|APM スパン名|
|`show_hits`|Boolean|いいえ|ヒットメトリクスを表示するかどうか|
|`show_errors`|Boolean|いいえ|エラーメトリクスを表示するかどうか|
|`show_latency`|Boolean|いいえ|レイテンシーメトリクスを表示するかどうか|
|`show_breakdown`|Boolean|いいえ|レイテンシーブレークダウンを表示するかどうか|
|`show_distribution`|Boolean|いいえ|レイテンシーディストリビューションを表示するかどうか|
|`show_resource_list`|Boolean|いいえ|リソースリストを表示するかどうか|
|`size_format`|string|いいえ|ウィジェットのサイズ。有効な値は `small`、`medium`、`large` です。
|`display_format`|string|いいえ|表示する列数。有効な値は `one_column`、`two_column`、`three_column` です。
|`title`|string|いいえ|ウィジェットのタイトル|
|`title_size`|string|いいえ|タイトルのサイズ|
|`title_align`|string|いいえ|タイトルの配置方法。有効な値は `center`、`left`、`right` です。
|`time`|object|いいえ|ウィジェットの時間設定。`TIME_SCHEMA` の作成方法については、[時間 JSON スキーマに関するドキュメント][3]を参照してください。
## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/visualization/service
[2]: /ja/tracing/send_traces
[3]: /ja/graphing/graphing_json/widget_json/#time-schema