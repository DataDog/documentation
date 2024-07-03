---
aliases:
- /ja/graphing/functions/smoothing/
title: Smoothing
---

## 自動スムーズ

| 関数       | 説明                                                           | 例                        |
| :----          | :-------                                                              | :---------                     |
| `autosmooth()` | メトリクスのトレンドを維持しつつ自動的にノイズを除去します。 | `autosmooth(<METRIC_NAME>{*})` |

`autosmooth()` 関数は、自動的に選択されたスパンで移動平均を適用し、トレンドを維持しつつ時系列を滑らかにします。この例では、関数が最適なスパンを選択して時系列を滑らかにしています。

{{< img src="dashboards/functions/smoothing/autosmooth_illustration.png" alt="イラストレーションを自動スムーズ" style="width:80%;">}}

`avg by` などの `group by` クエリで使用すると、すべての時系列で同じスパンが適用されます。同じグラフ内の複数のメトリクスで使用された場合、メトリクスの時系列それぞれが最適に滑らかになるように、異なるスパンを選択できます。

アルゴリズムは、[ASAP アルゴリズム][1]の派生型です。詳細については、この[ブログ記事][2]を参照してください。

`autosmooth()` 関数はモニターでは使用できません。スパンは動的に選択されるため、関数を適用した結果が分刻みで変化し、しきい値設定が困難になり、不規則なアラート動作につながる可能性があります。

## 指数加重移動平均 (EWMA)

### EWMA 3

| 関数   | 説明                                                         | 例                    |
| :----      | :-------                                                            | :---------                 |
| `ewma_3()` | 3 スパンの指数加重移動平均を計算します。 | `ewma_3(<METRIC_NAME>{*})` |

注: スパン値はデータポイントの数です。したがって、`ewma_3()` は、最後の 3 つのデータポイントを使用して平均を計算します。

例:

メトリクス `10 + x%10 {*}` は、10 から 1 ずつ増え、データポイントが 10 個になると 10 に戻ります。これに対して、`ewma3(10 + x%10 {*})` は次のようなグラフになります。

{{< img src="dashboards/functions/smoothing/ewma3.png" alt="EWMA3" style="width:80%;">}}

### EWMA 5

| 関数   | 説明                                                         | 例                    |
| :----      | :-------                                                            | :---------                 |
| `ewma_5()` | 5 スパンの指数加重移動平均を計算します。 | `ewma_5(<METRIC_NAME>{*})` |

注: スパン値はデータポイントの数です。したがって、`ewma_5()` は、最後の 5 つのデータポイントを使用して平均を計算します。

例:

メトリクス `10 + x%10 {*}` は、10 から 1 ずつ増え、データポイントが 10 個になると 10 に戻ります。これに対して、`ewma5(10 + x%10 {*})` は次のようなグラフになります。

{{< img src="dashboards/functions/smoothing/ewma5.png" alt="EWMA5" style="width:80%;">}}

### Ewma 7

| 関数   | 説明                                                         | 例                    |
| :----      | :-------                                                            | :---------                 |
| `ewma_7()` | 7 スパンの指数加重移動平均を計算します。 | `ewma_7(<METRIC_NAME>{*})` |

注: スパン値はデータポイントの数です。したがって、`ewma_7()` は、最後の 7 つのデータポイントを使用して平均を計算します。

### EWMA 10

| 関数    | 説明                                                          | 例                     |
| :----       | :-------                                                             | :---------                  |
| `ewma_10()` | 10 スパンの指数加重移動平均を計算します。 | `ewma_10(<METRIC_NAME>{*})` |

注: スパン値はデータポイントの数です。したがって、`ewma_10()` は、最後の 10 つのデータポイントを使用して平均を計算します。

例:

メトリクス `10 + x%10 {*}` は、10 から 1 ずつ増え、データポイントが 10 個になると 10 に戻ります。これに対して、`ewma10(10 + x%10 {*})` は次のようなグラフになります。

{{< img src="dashboards/functions/smoothing/ewma10.png" alt="EWMA10" style="width:80%;">}}

### EWMA 20

| 関数    | 説明                                                          | 例                     |
| :----       | :-------                                                             | :---------                  |
| `ewma_20()` | 20 スパンの指数加重移動平均を計算します。 | `ewma_20(<METRIC_NAME>{*})` |

注: スパン値はデータポイントの数です。したがって、`ewma_20()` は、最後の 20 つのデータポイントを使用して平均を計算します。

例:

メトリクス `10 + x%10 {*}` は、10 から 1 ずつ増え、データポイントが 10 個になると 10 に戻ります。これに対して、`ewma20(10 + x%10 {*})` は次のようなグラフになります。

{{< img src="dashboards/functions/smoothing/ewma20.png" alt="EWMA20" style="width:80%;">}}

## 中央値 

### 中央値 3

| 関数     | 説明                      | 例                      |
| :----        | :-------                         | :---------                   |
| `median_3()` | スパン 3 のローリング中央値。 | `median_3(<METRIC_NAME>{*})` |

注: スパン値はデータポイントの数です。したがって、`median_3()` は、最後の 3 つのデータポイントを使用して中央値を計算します。

### 中央値 5

| 関数     | 説明                      | 例                      |
| :----        | :-------                         | :---------                   |
| `median_5()` | スパン 5 のローリング中央値。 | `median_5(<METRIC_NAME>{*})` |

注: スパン値はデータポイントの数です。したがって、`median_5()` は、最後の 5 つのデータポイントを使用して中央値を計算します。

### 中央値 7

| 関数     | 説明                      | 例                      |
| :----        | :-------                         | :---------                   |
| `median_7()` | スパン 7 のローリング中央値。 | `median_7(<METRIC_NAME>{*})` |

注: スパン値はデータポイントの数です。したがって、`median_7()` は、最後の 7 つのデータポイントを使用して中央値を計算します。

### 中央値 9

| 関数     | 説明                      | 例                      |
| :----        | :-------                         | :---------                   |
| `median_9()` | スパン 9 のローリング中央値。 | `median_9(<メトリクス名>{*})` |

注: スパン値はデータポイントの数です。したがって、`median_9()` は、最後の 9 つのデータポイントを使用して中央値を計算します。

## Weighted 
<div class="alert alert-info">Weighted() は、ゲージタイプのメトリクスで `SUM BY` をクエリする場合にのみ使用できます。</div> 

| 関数       | 説明                                                           | 例                        |
| :----          | :-------                                                              | :---------                     |
| `weighted()`   | 一過性タグの適切な重み付けを維持したまま、ノイズを自動的に除去します。 | `sum:(<GAUGE_METRIC_NAME>{*}).weighted()` |

`weighted()` 関数は、人工的なスパイクを防ぐために、ゲージメトリクスを空間で合計する際に、一過性で変化するタグの値の短命な寿命を考慮します。

この関数は、以下の両方の条件を満たす場合、ゲージメトリクスに関するクエリに自動的に付加されます。
1. このメトリクスは、メトリクスサマリーにも指定されている定期的で一貫した送信間隔を持っています。
2. このメトリクスは `SUM by` で集計されます (例: `sum: mygaugemetric{*}`)

ここでは、不正確なスパイクを持つ元のクエリ (紫) と、適切に重み付け計算されたクエリ (緑) のグラフの例を示します。

{{< img src="dashboards/functions/smoothing/weighted.png" alt="重み付け修飾子を持つクエリと持たないクエリを比較したグラフ例" style="width:80%;">}}

weighted() 修飾子の詳細については、[weighted() の仕組みは？][3]を参照してください。

## その他の関数

{{< whatsnext desc="Consult the other available functions:" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}アルゴリズム: メトリクスに異常値や外れ値の検出機能を実装します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}算術: メトリクスに対して算術演算を実行します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}カウント: メトリクスの 0 以外または null 以外の値をカウントします。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}除外: メトリクスの特定の値を除外します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}補間: メトリクスにデフォルト値を挿入または設定します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}ランク: メトリクスの一部のみを選択します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}レート: メトリクスに対してカスタム微分係数を計算します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}回帰: メトリクスに何らかの機械学習関数を適用します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}ロールアップ: メトリクスに使用される元ポイントの数を制御します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}タイムシフト: メトリクスのデータポイントをタイムラインに沿って移動させます。{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://github.com/stanford-futuredata/ASAP
[2]: https://www.datadoghq.com/blog/auto-smoother-asap
[3]: /ja/dashboards/guide/how-weighted-works