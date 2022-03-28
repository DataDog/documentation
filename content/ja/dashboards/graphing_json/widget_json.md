---
aliases:
- /ja/graphing/graphing_json/widget_json/
further_reading:
- link: /dashboards/graphing_json/
  tag: ドキュメント
  text: JSON を使用したダッシュボードの構築
- link: /dashboards/graphing_json/request_json/
  tag: ドキュメント
  text: リクエスト JSON スキーマ
kind: documentation
title: ウィジェット JSON スキーマ
---

GUI エディターの詳細については、[グラフエディター][1]に関するドキュメントを参照してください。

## Y 軸スキーマ

Datadog の Y 軸コントロールには以下の機能があります。

*   Y 軸を特定の範囲にクリップします。
*   割合または絶対値を指定して、系列をフィルタリングします。
*   Y 軸の目盛を線形目盛から対数、平方根、または指数目盛に変更します。

スキーマは次のとおりです。

```text
AXIS_SCHEMA = {
    "type": "object",
    "properties": {
        "scale":        {"type": "string"},
        "min":          {"type": "string"},
        "max":          {"type": "string"},
        "include_zero": {"type": "boolean"}
    },
    "additionalProperties": false
}
```

| パラメーター      | 種類    | 説明                                                                                           | デフォルト  |
|----------------|---------|-------------------------------------------------------------------------------------------------------|----------|
| `scale`        | string  | 目盛のタイプを指定します。使用可能な値: `linear`、`log`、`sqrt`、`pow##` (例: `pow2`、`pow0.5`..)  | `linear` |
| `min`          | string  | Y 軸に表示する最小値を指定します。数値を指定します。`auto` にすると、デフォルト動作になります。     | `auto`   |
| `max`          | string  | Y 軸に表示する最大値を指定します。数値を指定します。`auto` にすると、デフォルト動作になります。 | `auto`   |
| `include_zero` | Boolean |                                                                                                       |          |

## イベントスキーマ

Datadog から取得した任意のイベントを重ねて表示できます。一般的な `events` の書式は次のとおりです。

```text
EVENTS_SCHEMA = {
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "q": {"type": "string"},
        },
        "required": ["q"],
        "additionalProperties": false
    }
}
```

クエリ構文の詳細については、[イベントストリームのドキュメント][2]を参照してください。

### 例

ホスト X とタグ Y のイベントを表示する場合は、次のとおりです。

```text
"events": [
  {
    "q": "host:X tags:Y"
  }
]
```

すべてのエラーを表示する場合は、次のとおりです。

```text
"events": [
  {
    "q": "status:error"
  }
]
```

## マーカースキーマ

マーカーを使用すると、視覚的な条件付き書式をグラフに追加できます。`markers` の書式は次のとおりです。

```text
MARKERS_SCHEMA = {
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "value":        {"type": "string"},
            "display_type": {"type": "string"},
            "label":        {"type": "string"}
        },
        "required": ["value"],
        "additionalProperties": false
    }
}
```

| パラメーター      | 種類   | 説明                                                                                                           |
|----------------|--------|-----------------------------------------------------------------------------------------------------------------------|
| `value`        | string | 適用する値。単一の値 `y = 15` または値の範囲 `0 < y < 10` を設定できます。                                      |
| `display_type` | string | 次の組み合わせです。<br>- 重大度: `error`、`warning`、`ok`、`info` <br> - 線の種類: `dashed`、`solid`、`bold` |
| `label`        | string | マーカーに重ねて表示するラベル。                                                                                     |

### 例:

マーカーの例を示します。

{{< img src="dashboards/graphing_json/markers.png" alt="マーカー" style="width:80%;">}}

上のマーカーには、以下の構成が適用されています。

```text
{ (...)
  "widgets": [
    {
      "definition": {
        "markers": [
          {
            "display_type": "ok dashed",
            "label": "OK",
            "value": "0 < y < 50"
          },
          {
            "display_type": "error dashed",
            "label": "ALERT",
            "value": "y > 80"
          },
          {
            "display_type": "warning dashed",
            "label": "WARNING",
            "value": "50 < y < 80"
          }
        ],
        "requests": [(...)],
        "title": "CPU with markers",
        "type": "timeseries"
      },
(...)
},
```

## 条件付き書式スキーマ

条件付き書式を使用すると、データに適用されたルールに応じて、ウィジェットのコンテンツや背景の色を設定できます。

```text
CONDITIONAL_FORMATS_SCHEMA = {
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "comparator":      {"enum": [">", ">=", "<", "<="]},
            "value":           {"type": "number"},
            "palette":         {"enum": ["blue","custom_bg","custom_image","custom_text","gray_on_white","green","green_on_white","grey","orange","red","red_on_white","white_on_gray","white_on_green","white_on_red","white_on_yellow","yellow_on_white",
            ]},
            "custom_bg_color": {"type": "string"},
            "custom_fg_color": {"type": "string"},
            "image_url":       {"type": "string", "format": "uri"},
        },
        "required": ["comparator", "value", "palette"],
        "additionalProperties": false
    }
}
```

| パラメーター         | 種類   | 説明                                                                                                                                                                                                                                                             |
|-------------------|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `comparator`      | enum   | 適用するコンパレーター: `>`、`>=`、`<`、`<=`                                                                                                                                                                                                                       |
| `value`           | double | コンパレーターに対する値。                                                                                                                                                                                                                                               |
| `palette`         | string | 適用するカラーパレット。`blue`、`custom_bg`、`custom_image`、`custom_text`、`gray_on_white`、`green`、`green_on_white`、`grey`、`orange`、`red`、`red_on_white`、`white_on_gray`、`white_on_green`、`white_on_red`、`white_on_yellow`、`yellow_on_white` のいずれか。 |
| `custom_bg_color` | string | 背景に適用するカラーパレット。使用できる値は palette と同じです。                                                                                                                                                                                             |
| `custom_fg_color` | string | 前景に適用するカラーパレット。使用できる値は palette と同じです。                                                                                                                                                                                             |
| `image_url`       | string | 背景に画像を表示します。                                                                                                                                                                                                                                    |
## 時間スキーマ

利用できるタイムフレームは使用しているウィジェットに依存しますが、一般的な `time` の書式は次のとおりです。

```text
TIME_SCHEMA = {
    "type": "object",
    "properties": {
        "live_span": {"enum": [
            '1m',
            '5m',
            '10m',
            '15m',
            '30m',
            '1h',
            '4h',
            '1d',
            '2d',
            '1w',
            '1mo',
            '3mo',
            '6mo',
            '1y',
            'alert'
        ]}
    },
    "additionalProperties": false
}
```

| パラメーター   | 種類   | 説明                                                                                                                                                                                                                                                                                                                                                                                                    |
|-------------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `live_span` | string | タイムフレーム値を表す短い名前。以下の値があります。<br> -`1m`: 1 分<br> -`5m`: 5 分<br> -`10m`: 10 分<br> -`15m`: 15 分<br> -`30m`: 30 分<br> -`1h`: 1 時間<br> -`4h`: 4 時間<br> -`1d`: 1 日<br> -`2d`: 2 日<br> -`1w`: 1 週間<br> -`1mo`: 1 か月<br> -`3mo`: 3 か月<br> -`6mo`: 6 か月<br> -`1y`: 1 年<br> -`alert`: `alert_graph` ウィジェットでのみ使用 |

### 例

10 分のタイムフレームが必要な場合、次のように使用します。

```text
"time": {
  "live_span": "10m"
}
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/querying/#graphing-editor
[2]: /ja/events/