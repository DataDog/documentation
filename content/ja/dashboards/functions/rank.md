---
aliases:
- /ja/graphing/functions/rank/
title: Rank
---

## トップ

| 関数 | 説明               | 例                                              |
| :----    | :-------                  | :---------                                           |
| `top()`  | トップ n 個の要素をグラフ化します。 | `top(<METRIC_NAME>{*}, <LIMIT_TO>, '<BY>', '<DIR>')` |

`top()` 関数は 3 つのパラメーターを持ちます。

* `LIMIT_TO`: 表示される系列の数。以下から選択します。
    - `5`
    - `10`
    - `25`
    - `50`
    - `100`
* `BY`: 集計方法。以下から選択します。
    - `max`: すべてのメトリクス値の最大値。
    - `mean`: すべてのメトリクス値の平均値。
    - `min`: すべてのメトリクス値の最小値。
    - `sum`: すべてのメトリクス値の合計。
    - `last`: 最後のメトリクス値。
    - `l2norm`: 時系列の[ノルム][1]を使用して (常に正の値)、系列をランク付けします。
    - `area`: グラフの曲線の下の符号付き面積。負の場合もあります。

* `DIR`: ランク付けの方向。以下のいずれかを選択します。
    - `asc`: 結果を昇順でランク付けします。
    - `desc`: 結果を降順でランク付けします。

`top()` メソッドには、便宜的に次の形式の関数も用意されています。これらは、入力として 1 つの系列リストを受け取ります。

`[top, bottom][5, 10, 15, 20]_[mean, min, max, last, area, l2norm][2]`

たとえば、`bottom10_min()` は、`min` メトリクスを使用して、下位の値 10 の系列を取得します。

## その他の関数

{{< whatsnext desc="他に利用できる関数を参照します。" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}アルゴリズム: メトリクスに異常値や外れ値の検出機能を実装します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}算術: メトリクスに対して算術演算を実行します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}カウント: メトリクスの 0 以外または null 以外の値をカウントします。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}除外: メトリクスの特定の値を除外します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}補間: メトリクスにデフォルト値を挿入または設定します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}レート: メトリクスに対してカスタム微分係数を計算します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}回帰: メトリクスに何らかの機械学習関数を適用します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}ロールアップ: メトリクスに使用される元ポイントの数を制御します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}スムーシング: メトリクスの変動を滑らかにします。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}タイムシフト: メトリクスのデータポイントをタイムラインに沿って移動させます。{{< /nextlink >}}
{{< /whatsnext >}}


[1]: http://en.wikipedia.org/wiki/Norm_(mathematics)