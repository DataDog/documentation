---
title: 分布ウィジェット
kind: documentation
description: 1 つ以上のタグに対して集計されたメトリクスの分布をグラフ化する
further_reading:
  - link: graphing/dashboards/timeboard/
    tag: Documentation
    text: Timeboards
  - link: graphing/graphing_json/
    tag: Documentation
    text: JSON を使用したダッシュボードの構築
---
分布の可視化は、1 つまたは複数のタグ (hosts など) に対して集計されたメトリクスを表示する方法の 1 つです。[ヒートマップ][1]と異なり、分布グラフの x 軸は時間ではなく数量を表します。

この可視化機能は、1 つのメトリクスクエリのみを表示します。追加のクエリは無視されます。

**注**: この可視化で外れ値の検出を行うことはできません。

{{< img src="graphing/widgets/distribution/distribution.png" alt="Distribution"  >}}

## セットアップ

{{< img src="graphing/widgets/distribution/distribution_setup.png" alt="Distribution"  style="width:80%;">}}

### コンフィグレーション

通常どおりにメトリクスクエリを構成します。この可視化タイプは、メトリクスが `host` ごとなどの複数のタグキーに対して集計される場合にのみ有用です。
`avg`/`max`/`min`/`sum by` のコントロールで選択を行い、関連付けられているタグのデータを表示します。

### オプション
#### 表示設定

{{< img src="graphing/widgets/options/display_preferences.png" alt="Display preferences"  style="width:80%;">}}

##### グローバルタイム

スクリーンボードの場合にのみ、ウィジェットがカスタムタイムフレームを持つか、スクリーンボードのグローバルタイムフレームを持つかを選択します。

##### 凡例

Show legend on graph を使用して、ウィジェットの凡例の表示/非表示を切り替えます。オプションで、表示するエントリ数を選択できます。

#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

{{< img src="graphing/widgets/options/title.png" alt="Widget title"  style="width:80%;">}}

オプションで、サイズと配置を定義できます。

## API

分布ウィジェット専用の[ウィジェット JSON スキーマ定義][2]は次のとおりです。

```
DISTIBUTION_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["distribution"]},
        "requests": {
            "type":     "array",
            "items":    REQUEST_SCHEMA,
            "minItems": 1,
            "maxItems": 1
        },
        "title": {"type": "string"}
    },
    "required": ["type", "requests"],
    "additionalProperties": false
}
```

| パラメーター  | タイプ            | 必須 | 説明                                                                                                                                                  |
| ------     | -----           | -----    | -----                                                                                                                                                        |
| `type`     | string          | はい      | ウィジェットのタイプ。分布ウィジェットには `distribution` を使用します。                                                                                                 |
| `requests` | オブジェクトの配列 | はい      | ウィジェットに表示する 1 つの `request` オブジェクトの配列。`REQUEST_SCHEMA` の作成方法については、[リクエスト JSON スキーマに関するドキュメント][3]を参照してください。 |
| `title`    | string          | いいえ       | ウィジェットのタイトル。                                                                                                                                        |


`request` オブジェクトでは、以下のプロパティも使用できます。

```json
{
    "style": {
        "type": "object",
        "properties": {
            "palette": {"type": "string"},
        },
        "additionalProperties": false
    }
}
```

| パラメーター       | タイプ   | 必須 | 説明                           |
| ------          | -----  | -------- | ----                                  |
| `style.palette` | string | いいえ       | ウィジェットに適用するカラーパレット。 |



## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/graphing/widgets/heat_map
[2]: /ja/graphing/graphing_json/widget_json
[3]: /ja/graphing/graphing_json/request_json