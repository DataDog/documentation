---
title: ホストマップウィジェット
kind: documentation
description: Datadog のホストマップをダッシュボードに表示する
aliases:
  - /ja/graphing/widgets/hostmap/
further_reading:
  - link: /dashboards/timeboards/
    tag: ドキュメント
    text: Timeboards
  - link: /dashboards/screenboards/
    tag: ドキュメント
    text: スクリーンボード
  - link: /dashboards/graphing_json/
    tag: ドキュメント
    text: JSON を使用したダッシュボードの構築
---
ホストマップウィジェットは、メインの[ホストマップ][1]ページから利用できる同じ視覚化機能を使用して、ホスト全体のあらゆるメトリクスをグラフ化します。

{{< img src="dashboards/widgets/hostmap/hostmap.png" alt="ホストマップ"  >}}

## セットアップ

{{< img src="dashboards/widgets/hostmap/hostmap_setup.png" alt="ホストマップの設定"  >}}

### コンフィギュレーション

ホストマップウィジェットの構成は、メインの[ホストマップページ][1]に似ています。

1. **Type**: `hosts` と `containers` のどちらを表示するかを選択します。
2. **Filter by**: 表示するホストまたはコンテナを選択します。
3. **Group by**: ホストまたはコンテナを 1 つまたは複数のタグで集計します。
4. **Fill by**: ホストまたはコンテナマップの要素を塗りつぶすメトリクスを選択します。
5. **Size by** (オプション): ホストまたはコンテナマップの要素のサイズを決定するメトリクスを選択します。
6. **Palette** (オプション): カラーパレットを選択します。
7. **Values** (オプション): カラーパレットの塗りつぶしの最小および最大値を定義します。

**注**: ホストマップウィジェットではフリーテキスト検索は使用できません。

### オプション

#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

{{< img src="dashboards/widgets/options/title.png" alt="ウィジェットのタイトル"  style="width:80%;">}}

オプションで、サイズと配置を定義できます。

## API

ホストマップウィジェットの[ウィジェット JSON スキーマ定義][2]は次のとおりです。

```text
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

| パラメーター            | 種類             | 必須 | 説明                                                                                                                      |
|----------------------|------------------|----------|----------------------------------------------------------------------------------------------------------------------------------|
| `type`               | string           | はい      | ウィジェットのタイプ。ホストマップウィジェットには `hostmap` を使用します。                                                                           |
| `requests.fill`      | string           | はい/いいえ   | マップの挿入に使用されるクエリ。`REQUEST_SCHEMA` の作成方法については、[リクエスト JSON スキーマに関するドキュメント][3]を参照してください。 |
| `requests.size`      | string           | はい/いいえ   | マップのサイズ設定に使用されるクエリ。`REQUEST_SCHEMA` の作成方法については、[リクエスト JSON スキーマに関するドキュメント][3]を参照してください。 |
| `node_type`          | string           | いいえ       | マップで使用するノードタイプ。有効な値は `host` または `container` です。                                                |
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

[1]: /ja/infrastructure/hostmap/
[2]: /ja/dashboards/graphing_json/widget_json/
[3]: /ja/dashboards/graphing_json/request_json/