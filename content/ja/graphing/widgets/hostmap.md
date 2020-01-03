---
title: ホストマップウィジェット
kind: documentation
description: Datadog のホストマップをダッシュボードに表示する
further_reading:
  - link: graphing/dashboards/timeboard/
    tag: Documentation
    text: Timeboards
  - link: graphing/dashboards/screenboard/
    tag: Documentation
    text: Screenboard
  - link: graphing/graphing_json/
    tag: Documentation
    text: JSON を使用したダッシュボードの構築
---
ホストマップは、[メインインフラストラクチャーの Host Map][1] メニューから使用できるホストマップと同じ可視化機能を使用して、一部のホストのメトリクスをグラフ化します。

{{< img src="graphing/widgets/hostmap/hostmap.png" alt="Host Map"  >}}

## セットアップ

{{< img src="graphing/widgets/hostmap/hostmap_setup.png" alt="Host Map Setup"  >}}

### コンフィグレーション

ホストマップウィジェットの構成は、メインの[ホストマップページ][1]で行います。

1. `hosts` と `containers` のどちらを表示するかを選択します。
2. `Filter by`: 表示するホスト/コンテナを選択します。
3. `Group by`: ホスト/コンテナを 1 つまたは複数のタグで集計します。
4. ホストマップの要素の挿入に使用するメトリクスを選択します。
5. オプション: ホストマップの要素のサイズ設定に使用するメトリクスを選択します。
6. オプション: `min` および `max` カラーパレット値を使用してカラーパレットを定義します。

### オプション
#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

{{< img src="graphing/widgets/options/title.png" alt="Widget title"  style="width:80%;">}}

オプションで、サイズと配置を定義できます。

## API


ホストマップウィジェットの[ウィジェット JSON スキーマ定義][2]は次のとおりです。

```
HOSTMAP_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["hostmap"]},
        "requests":       {
            "type": "object",
            "properties": {
                'fill': REQUEST_SCHEMA,
                'size': REQUEST_SCHEMA
            },
            "anyOf": [
                {"required": ["fill"]},
                {"required": ["size"]}
            ],
            "additionalProperties": false
        },
        "node_type":       {"enum": ["host", "container"]},
        "no_metric_hosts": {"type": "boolean"},
        "no_group_hosts":  {"type": "boolean"},
        "group":           {"type": "array", "items": {"type": "string"}},
        "scope":           {"type": "array", "items": {"type": "string"}},
        "style":           {
            "type": "object",
            "properties": {
                "palette":      {"type": "string"},
                "palette_flip": {"type": "boolean"},
                "fill_min":     {"type": "string"},
                "fill_max":     {"type": "string"}
            },
            "additionalProperties": false
        },
        "title": {"type": "string"}
    },
    "required": ["type", "requests"],
    "additionalProperties": false
}
```

| パラメーター            | タイプ             | 必須 | 説明                                                                                                                      |
| ------               | -----            | -----    | --------                                                                                                                         |
| `type`               | string           | はい      | ウィジェットのタイプ。ホストマップウィジェットには `hostmap` を使用します。                                                                       |
| `requests.fill`      | string           | はい/いいえ   | マップの挿入に使用されるクエリ。`REQUEST_SCHEMA` の作成方法については、[リクエスト JSON スキーマに関するドキュメント][3]を参照してください。 |
| `requests.size`      | string           | はい/いいえ   | マップのサイズ設定に使用されるクエリ。`REQUEST_SCHEMA` の作成方法については、[リクエスト JSON スキーマに関するドキュメント][3]を参照してください。 |
| `node_type`          | string             | いいえ       | マップで使用するノードタイプ。有効な値は `host` または `container` です。                                                 |
| `no_metric_hosts`    | Boolean          | いいえ       | メトリクスがないホストを表示するかどうか。                                                                                       |
| `no_group_hosts`     | Boolean          | いいえ       | 該当するグループがないホストを表示するかどうか。                                                                             |
| `group`              | 文字列の配列 | いいえ       | グループ化の基準にするタグプレフィックスのリスト。                                                                                                |
| `scope`              | 文字列の配列 | いいえ       | マップの絞り込みに使用されるタグのリスト。                                                                                             |
| `style.palette`      | string           | いいえ       | ウィジェットに適用するカラーパレット。                                                                                            |
| `style.palette_flip` | Boolean          | いいえ       | パレットの色調を反転させるかどうか。                                                                                               |
| `style.fill_min`     | string           | いいえ       | マップの彩色に使用する最小値。                                                                                               |
| `style.fill_max`     | string           | いいえ       | マップの彩色に使用する最大値。                                                                                               |



## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/graphing/infrastructure/hostmap
[2]: /ja/graphing/graphing_json/widget_json
[3]: /ja/graphing/graphing_json/request_json