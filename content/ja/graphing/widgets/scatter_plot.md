---
title: 散布図ウィジェット
kind: documentation
description: 2 つのメトリクスとそれぞれの集計を使用して、選択したスコープをグラフ化する
further_reading:
  - link: graphing/dashboards/timeboard/
    tag: Documentation
    text: Timeboards
  - link: graphing/graphing_json/
    tag: Documentation
    text: JSON を使用したダッシュボードの構築
---
散布図可視化機能では、2 つのメトリクスに対し、それぞれの集計を使用して、選択したスコープをグラフ化できます。

{{< img src="graphing/widgets/scatterplot/scatterplot.png" alt="Scatter Plot" >}}

## セットアップ

{{< img src="graphing/widgets/scatterplot/scatterplot_setup.png" alt="Scatter Plot Setup"  style="width:80%;">}}

### コンフィグレーション

1. X 軸と Y 軸それぞれのメトリクスと集計を選択します。
2. 散布図の各ポイントのスコープ (`host`、`service`、`app`、`region` など) を定義します。
3. オプション: color-by タグを有効にします。
4. オプション: X 軸および Y 軸コントロールを設定します。

## オプション

#### グローバルタイム

スクリーンボードの場合にのみ、ウィジェットがカスタムタイムフレームを持つか、スクリーンボードのグローバルタイムフレームを持つかを選択します。

#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

{{< img src="graphing/widgets/options/title.png" alt="Widget title"  style="width:80%;">}}

オプションで、サイズと配置を定義できます。

## API

散布図ウィジェットの[ウィジェット JSON スキーマ定義][1]は次のとおりです。

```
SCATTERPLOT_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["scatterplot"]},
        "requests": {
            "type": "object",
            "properties": {
                "x": REQUEST_SCHEMA,
                "y": REQUEST_SCHEMA
            },
            "required": ["x", "y"],
            "additionalProperties": false
        },
        "xaxis": AXIS_SCHEMA,
        "yaxis": AXIS_SCHEMA,
        "color_by_groups": {"type": "array", "items": {"type": "string"}},
        "title": {"type": "string"}
    },
    "required": ["type", "requests"],
    "additionalProperties": false
}
```

| パラメーター         | タイプ            | 必須 | 説明                                                                                                                                        |
| ------            | -----           | -----    | --------                                                                                                                                           |
| `type`            | string          | はい      | ウィジェットのタイプ。散布図ウィジェットには `scatterplot` を使用します。                                                                                        |
| `requests`        | object          | はい      | ウィジェットで表示する `requests` オブジェクト。`REQUEST_SCHEMA` の作成方法については、[リクエスト JSON スキーマに関するドキュメント][2]を参照してください。 |
| `yaxis`           | object          | いいえ       | Y 軸コントロールのオプション。`AXIS_SCHEMA` の作成方法については、[Y 軸 JSON スキーマに関するドキュメント][3]を参照してください。                           |
| `xaxis`           | object          | いいえ       | Y 軸コントロールのオプション。`AXIS_SCHEMA` の作成方法については、[X 軸 JSON スキーマに関するドキュメント][3]を参照してください。                           |
| `color_by_groups` | 文字列の配列 | いいえ       | 色分けに使用されるグループのリスト。                                                                                                                    |
| `title`           | string          | いいえ       | ウィジェットのタイトル。                                                                                                                              |

`request` オブジェクトでは、以下のプロパティも使用できます。

```json
{
  "aggregator": {"enum": ["avg", "last", "max", "min", "sum"]}
}
```

| パラメーター    | タイプ  | 必須 | 説明                                                                                  |
| ------       | ----- | -------- | ----                                                                                         |
| `aggregator` | string  | いいえ       | リクエストに使用される集計関数。有効な値は `avg`、`last`、`max`、`min`、`sum` です。 |


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/graphing/graphing_json/widget_json
[2]: /ja/graphing/graphing_json/request_json
[3]: /ja/graphing/graphing_json/widget_json/#y-axis-schema