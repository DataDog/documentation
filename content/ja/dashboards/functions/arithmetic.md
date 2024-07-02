---
title: Arithmetic
aliases:
    - /graphing/functions/arithmetic/
---

## 絶対値

| 関数 | 説明                             | 例                 |
| :----    | :-------                                | :---------              |
| `abs()`  | メトリクスの絶対値をグラフ化します。 | `abs(<METRIC_NAME>{*})` |

変換するのは、この正弦波時系列 `sin{*}` です。 

{{< img src="dashboards/functions/arithmetic/sinus.png" alt="Sinus 関数" style="width:80%;">}}

次の `abs(sin{*})` に変換します。

{{< img src="dashboards/functions/arithmetic/sinus_abs.png" alt="abs を使用した Sinus 関数" style="width:80%;">}}

## 対数

### ログベース 2

| 関数 | 説明                               | 例                  |
| :----    | :-------                                  | :---------               |
| `log2()` | メトリクスの底 2 の対数をグラフ化します。 | `log2(<METRIC_NAME>{*})` |

例:

データポイントごとに 1 ずつ増えるメトリクス `x{*}` があるとすると、`log2(x{*})` は次のようなグラフになります。

{{< img src="dashboards/functions/arithmetic/log2.png" alt=" log2 関数" style="width:80%;">}}

### ログベース 10

| 関数  | 説明                                | 例                   |
| :----     | :-------                                   | :---------                |
| `log10()` | メトリクスの底 10 の対数をグラフ化します。 | `log10(<METRIC_NAME>{*})` |

例:

データポイントごとに 1 ずつ増えるメトリクス `x{*}` があるとすると、`log10(x{*})` は次のようなグラフになります。

{{< img src="dashboards/functions/arithmetic/log10.png" alt="log10 関数" style="width:80%;">}}

## 累積合計

| 関数   | 説明                                                          | 例                    |
| :----      | :-------                                                             | :---------                 |
| `cumsum()` | 可視のタイムウィンドウに対するメトリクスの累積合計をグラフ化します。 | `cumsum(<METRIC_NAME>{*})` |

例:

値 `1` の定数であるメトリクス `const_1{*}` があるとすると、`cumsum(const_1{*})` は次のようなグラフになります。

{{< img src="dashboards/functions/arithmetic/cumsum.png" alt="abs を使用した累計関数" style="width:80%;">}}

## モニターの累積和

累積和関数は視覚的な関数であるため、モニタークエリでは避ける必要があります。ダッシュボードやノートブックで使用する場合、ポイントは選択したタイムフレームに基づく値を反映することになります。モニターでは、どのタイムフレームを使用するかという感覚がないため、これはモニターではうまく反映されません。

その代わり、モニター評価期間中に[累積タイムウィンドウ][1]を構成してください。

## Integral

| 関数     | 説明                       | 例                             |
| :----        | :-------                          | :---------                          |
| `integral()` | メトリクスの積分をグラフ化します。 | `integral(<METRIC_NAME>{*})` |

**注**: Datadog の `integral()` は、特定のメトリクスの可視のタイムウィンドウにおける、すべての隣接ポイントペアの `[時間増分] x [値増分]` の累積合計です。

{{< img src="dashboards/functions/arithmetic/integral.png" alt="abs を使用した積分関数"  style="width:80%;">}}

## その他の関数

{{< whatsnext desc="他に利用できる関数を参照します。" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}アルゴリズム: メトリクスに異常値や外れ値の検出機能を実装します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}カウント: メトリクスの 0 以外または null 以外の値をカウントします。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}除外: メトリクスの特定の値を除外します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}補間: メトリクスにデフォルト値を挿入または設定します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}ランク: メトリクスの一部のみを選択します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}レート: メトリクスに対してカスタム微分係数を計算します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}回帰: メトリクスに何らかの機械学習関数を適用します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}ロールアップ: メトリクスに使用される元ポイントの数を制御します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}スムーシング: メトリクスの変動を滑らかにします。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}タイムシフト: メトリクスのデータポイントをタイムラインに沿って移動させます。{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /monitors/configuration/?tab=thresholdalert#cumulative-time-windows
