---
aliases:
- /ja/graphing/functions/smoothing/
description: 自動スムーズ、指数加重移動平均、中央値フィルター、および重み付けの各関数を使用して、メトリクスデータのノイズを低減します。
title: スムーシング
---
## 自動スムーズ {#autosmooth}

| 関数       | 説明                                                           | 例                        |
| :----          | :-------                                                              | :---------                     |
| `autosmooth()` | メトリクスのトレンドを維持しつつ自動的にノイズを除去します。| `autosmooth(<METRIC_NAME>{*})` |

`autosmooth()` 関数は、自動的に選択されたスパンで移動平均を適用します。トレンドを維持しながら時系列をスムーズにします。この例では、関数が時系列をスムーズにするための最適なスパンを選択しています。

{{< img src="dashboards/functions/smoothing/autosmooth_illustration.png" alt="自動スムーズの図解" style="width:80%;">}}

`avg by` のような `group by` クエリで使用する場合、すべての時系列に同じスパンが適用されます。同じグラフ内の複数のメトリクスに使用した場合、各メトリクスの時系列を最適にスムーズにするために、異なるスパンが選択されることがあります。

アルゴリズムは、[ASAP アルゴリズム][1] の派生型です。詳細については、この [ブログ記事][2] を参照してください。

`autosmooth()` 関数はモニターでは使用できません。スパンは動的に選択されるため、関数を適用した結果が分刻みで変化し、しきい値設定が困難になり、不規則なアラート動作につながる可能性があります。

## 指数加重移動平均 {#exponentially-weighted-moving-average}

### Ewma 1 {#ewma-1}

| 関数   | 説明                                                         | 例                    |
| :----      | :-------                                                            | :---------                 |
| `ewma_1()` | スパンが 1 の指数加重移動平均を計算します。 | `ewma_1(<METRIC_NAME>{*})` |

### Ewma 3 {#ewma-3}

| 関数   | 説明                                                         | 例                    |
| :----      | :-------                                                            | :---------                 |
| `ewma_3()` | スパンが 3 の指数加重移動平均を計算します。 | `ewma_3(<METRIC_NAME>{*})` |

注: スパン値は、系列のデータの加重平均経過時間の 2 倍です。したがって `ewma_3()` は、3 日間のローリング平均に相当します。

例:

メトリクス `10 + x%10 {*}` が 10 から 1 ずつ増え、データポイントが 10 個になると 10 に戻る場合、`ewma3(10 + x%10 {*})` は次のようなグラフになります。

{{< img src="dashboards/functions/smoothing/ewma3.png" alt="EWMA3" style="width:80%;">}}

### Ewma 5 {#ewma-5}

| 関数   | 説明                                                         | 例                    |
| :----      | :-------                                                            | :---------                 |
| `ewma_5()` | スパンが 5 の指数加重移動平均を計算します。 | `ewma_5(<METRIC_NAME>{*})` |

注: スパン値は、系列のデータの加重平均経過時間の 2 倍です。したがって `ewma_5()` は、5 日間のローリング平均に相当します。

例:

メトリクス `10 + x%10 {*}` が 10 から 1 ずつ増え、10 個のデータポイントの後に 10 に戻る場合、`ewma5(10 + x%10 {*})` は次のようなグラフになります。

{{< img src="dashboards/functions/smoothing/ewma5.png" alt="EWMA5" style="width:80%;">}}

### Ewma 7 {#ewma-7}

| 関数   | 説明                                                         | 例                    |
| :----      | :-------                                                            | :---------                 |
| `ewma_7()` | スパンが 7 の指数加重移動平均を計算します。 | `ewma_7(<METRIC_NAME>{*})` |

注: スパン値は、系列のデータの加重平均経過時間の 2 倍です。したがって `ewma_7()` は、7 日間のローリング平均に相当します。

### Ewma 10 {#ewma-10}

| 関数    | 説明                                                          | 例                     |
| :----       | :-------                                                             | :---------                  |
| `ewma_10()` | スパンが 10 の指数加重移動平均を計算します。 | `ewma_10(<METRIC_NAME>{*})` |

注: スパン値は、系列のデータの加重平均経過時間の 2 倍です。したがって `ewma_10()` は、10 日間のローリング平均に相当します。

例:

メトリクス `10 + x%10 {*}` が 10 から 1 ずつ増え、10 個のデータポイントの後に 10 に戻る場合、`ewma10(10 + x%10 {*})` は次のようなグラフになります。

{{< img src="dashboards/functions/smoothing/ewma10.png" alt="EWMA10" style="width:80%;">}}

### Ewma 20 {#ewma-20}

| 関数    | 説明 | 例 |
| :----       | :-------    | :------ |
| `ewma()`    | デフォルトのスパンである 20 で指数加重移動平均を計算します。 | `ewma(<METRIC_NAME>{*})` |
| `ewma_20()` | スパンが 20 の指数加重移動平均を計算します。 | `ewma_20(<METRIC_NAME>{*})` |

`ewma()` と `ewma_20()` は同じように機能します。

注: スパン値は、系列のデータの加重平均経過時間の 2 倍です。したがって、`ewma()` と `ewma_20()` は 20 日間のローリング平均に相当します。

例:

メトリクス `10 + x%10 {*}` が 10 から 1 ずつ増え、10 個のデータポイントの後に 10 に戻る場合、`ewma20(10 + x%10 {*})` は次のようなグラフになります。

{{< img src="dashboards/functions/smoothing/ewma20.png" alt="EWMA20" style="width:80%;">}}

## 中央値 {#median}

### Median 3 {#median-3}

| 関数     | 説明 | 例 |
| :----        | :-------    | :------ |
| `median()`   | デフォルトのスパン 3 のローリング中央値。 | `median(<METRIC_NAME>{*})` |
| `median_3()` | スパン 3 のローリング中央値。 | `median_3(<METRIC_NAME>{*})` |

`median()` と `median_3()` は同じように機能します。

注: スパン値はデータポイントの数です。したがって、`median()` と `median_3()` は、最後の 3 つのデータポイントを使用して中央値を計算します。

### Median 5 {#median-5}

| 関数     | 説明                      | 例                      |
| :----        | :-------                         | :---------                   |
| `median_5()` | スパン 5 のローリング中央値。 | `median_5(<METRIC_NAME>{*})` |

注: スパン値はデータポイントの数です。したがって、`median_5()` は、最後の 5 つのデータポイントを使用して中央値を計算します。

### Median 7 {#median-7}

| 関数     | 説明                      | 例                      |
| :----        | :-------                         | :---------                   |
| `median_7()` | スパン 7 のローリング中央値。 | `median_7(<METRIC_NAME>{*})` |

注: スパン値はデータポイントの数です。したがって、`median_7()` は、最後の 7 つのデータポイントを使用して中央値を計算します。

### Median 9 {#median-9}

| 関数     | 説明                      | 例                      |
| :----        | :-------                         | :---------                   |
| `median_9()` | スパン 9 のローリング中央値。 | `median_9(<METRIC_NAME>{*})` |

注: スパン値はデータポイントの数です。したがって、`median_9()` は、最後の 9 つのデータポイントを使用して中央値を計算します。

## 重み付け {#weighted}
<div class="alert alert-info">Weighted() は、 <code>SUM BY</code> ゲージタイプのメトリクスをクエリする場合にのみ使用できます。</div>

| 関数       | 説明                                                           | 例                        |
| :----          | :-------                                                              | :---------                     |
| `weighted()`   | 一過性タグの適切な重み付けを維持したまま、ノイズを自動的に除去します。| `sum:(<GAUGE_METRIC_NAME>{*}).weighted()` |

`weighted()` 関数は、人工的なスパイクを防ぐために、ゲージメトリクスを空間で合計する際に、一過性で変化するタグの値の短命な寿命を考慮します。

この関数は、以下の両方の条件を満たす場合、ゲージメトリクスに関するクエリに自動的に付加されます。
1. このメトリクスには、Metrics Summary にも指定されている規則的で一定の送信間隔があります。
2. メトリクスは `SUM by` で集計されます (例: `sum: mygaugemetric{*}`)

ここでは、不正確なスパイクを持つ元のクエリ (紫) と、適切に重み付け計算されたクエリ (緑) のグラフの例を示します。

{{< img src="dashboards/functions/smoothing/weighted.png" alt="weighted 修飾子の有無によるクエリを比較したグラフの例" style="width:80%;">}}

weighted() 修飾子の詳細については、[weighted() の仕組み][3] を参照してください。

## その他の関数 {#other-functions}

{{< whatsnext desc="他の利用可能な関数については、以下を参照してください。" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithmic: メトリクスに対して異常または外れ値の検出を実装します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Arithmetic: メトリクスに対して算術演算を実行します。 {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Count: メトリクスのゼロ以外、NULL 以外の値をカウントします。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusion: メトリクスの特定の値を除外します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation: メトリクスの値を補完するか、デフォルト値を設定します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Rank: メトリクスのサブセットのみを選択します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Rate: メトリクスに対してカスタム微分係数を計算します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Regression: メトリクスに何らかの機械学習関数を適用します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Rollup: メトリクスで使用される生データのポイント数を制御します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Timeshift: タイムラインに沿ってメトリクスデータポイントをシフトします。{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://github.com/stanford-futuredata/ASAP
[2]: https://www.datadoghq.com/blog/auto-smoother-asap
[3]: /ja/dashboards/guide/how-weighted-works