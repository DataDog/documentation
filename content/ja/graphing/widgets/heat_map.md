---
title: ヒートマップウィジェット
kind: documentation
description: 特定のメトリクスの時系列ヒートマップを構築する
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
ヒートマップ可視化機能は、多数のタグ (hosts など) に対して集計されたメトリクスを表示します。特定の値を持つホストが多いほど、四角形の色が濃く表示されます。

この可視化機能は、1 つのメトリクスクエリのみを表示します。追加のクエリは無視されます。

**注**: この可視化で外れ値の検出を行うことはできません。

{{< img src="graphing/widgets/heat_map/heat_map.png" alt="Heat Map" >}}

## セットアップ

{{< img src="graphing/widgets/heat_map/heat_map_setup.png" alt="Heat Map setup"  style="width:80%;">}}

### コンフィグレーション

通常どおりにメトリクスクエリを構成します。この可視化タイプは、メトリクスが `host` ごとなどの複数のタグキーに対して集計される場合にのみ有用です。

`avg`/`max`/`min`/`sum by` のコントロールで選択を行い、関連付けられているタグのデータを表示します。

### オプション
#### イベントオーバーレイ

関連するシステムからイベントを追加して、グラフにさらにコンテキストを追加できます。たとえば、GitHub のコミットイベント、Jenkins のデプロイイベント、Docker の作成イベントなどを追加できます。**Event Overlays** セクションを展開して、イベントを表示するためのクエリを入力します。[イベントストリーム][1]と同じクエリ書式を使用してください。以下に例を示します。

| クエリ                       | 説明                                                |
|-----------------------------|------------------------------------------------------------|
| `sources:jenkins`           | Jenkins ソースから取得されたすべてのイベントを表示します。                  |
| `tag:role:web`              | タグ `role:web` が付いたすべてのイベントを表示します。                  |
| `tags:$<TEMPLATE_VARIABLE>` | 選択された[テンプレート変数][2]から取得されたすべてのイベントを表示します。 |

#### Y 軸コントロール

Y 軸コントロールは、UI または JSON エディターから使用できます。以下を実行できます。

* Y 軸を特定の範囲にクリップできます。
* パーセンテージしきい値または絶対しきい値に基づいて Y 軸の境界を自動的に変更できます。このしきい値をグラフの両端 (下側と上側) の一方に適用することで、「外れ値」系列を除外できます。
* Y 軸の目盛を線形から対数、累乗、または平方根に変更できます。

Y 軸の目盛を変更するには、Y-Axis Controls ボタンを展開します。

使用できる構成オプションは、次のとおりです。

| オプション                | 必須 | 説明                                                                                                                                                                                                       |
|-----------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Min`/`Max`           | いいえ       | Y 軸に表示する最小値または最大値、またはその両方を指定します。数値または `Auto` (デフォルト値を使用) を指定します。                                                                                                   |
| `Scale`               | いいえ       | 目盛のタイプを指定します。使用可能な値:<br>- linear: 線形目盛 (デフォルト)<br>- log: 対数目盛<br>- pow: 2 の累乗目盛 (2 はデフォルトです。JSON で変更できます)<br>- sqrt: 平方根目盛 |
| `Always include zero` | いいえ       | 常に 0 を含めるか、軸をデータの範囲に合わせるかを指定します。デフォルトは、常に 0 を含めます。                                                                                                                     |

**注**: 対数関数には負の値を適用できないため、Datadog の対数目盛は、値の符号がすべて同じ (すべて正またはすべて負) の場合にのみ機能します。そうでない場合は、空のグラフが返されます。

## API

ヒートマップウィジェットの[ウィジェット JSON スキーマ定義][3]は次のとおりです。

```
HEATMAP_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["heatmap"]},
        "requests": {
            "type":     "array",
            "items":    REQUEST_SCHEMA,
            "minItems": 1,
            "maxItems": 1
        },
        "yaxis":  AXIS_SCHEMA,
        "events": EVENTS_SCHEMA,
        "title": {"type": "string"}
    },
    "required": ["type", "requests"],
    "additionalProperties": false
}
```

| パラメーター  | タイプ            | 必須 | 説明                                                                                                                                                  |
| ------     | -----           | -------- | -----                                                                                                                                                        |
| `type`     | string          | はい      | ウィジェットのタイプ。ヒートマップウィジェットには `heatmap` を使用します。                                                                                                       |
| `requests` | オブジェクトの配列 | はい      | ウィジェットに表示する 1 つの `request` オブジェクトの配列。`REQUEST_SCHEMA` の作成方法については、[リクエスト JSON スキーマに関するドキュメント][4]を参照してください。 |
| `yaxis`    | object          | いいえ       | Y 軸コントロールのオプション。`<AXIS_SCHEMA>` の作成方法については、[Y 軸 JSON スキーマに関するドキュメント][5]を参照してください。                                   |
| `events`   | object          | いいえ       | イベントオーバーレイコントロールのオプション。`<EVENTS_SCHEMA>` の作成方法については、[イベント JSON スキーマに関するドキュメント][6]を参照してください。                           |
| `title`    | string          | いいえ       | ウィジェットのタイトル。                                                                                                                                        |


`requests` オブジェクトでは、以下のプロパティも使用できます。

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

[1]: /ja/graphing/event_stream
[2]: /ja/graphing/dashboards/template_variables
[3]: /ja/graphing/graphing_json/widget_json
[4]: /ja/graphing/graphing_json/request_json
[5]: /ja/graphing/graphing_json/widget_json/#y-axis-schema
[6]: /ja/graphing/graphing_json/widget_json/#events-schema