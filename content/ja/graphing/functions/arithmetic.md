---
title: 算術演算
kind: documentation
---

## 絶対値

| 関数 | 説明                             | 例                 |
| :----    | :-------                                | :---------              |
| `abs()`  | メトリクスの絶対値をグラフ化します。 | `abs(<METRIC_NAME>{*})` |

この正弦波時系列 `sin{*}` を

{{< img src="graphing/functions/arithmetic/sinus.png" alt="Sinus function" responsive="true" style="width:80%;">}}

次の `abs(sin{*})` に変換します。

{{< img src="graphing/functions/arithmetic/sinus_abs.png" alt="Sinus function with abs" responsive="true" style="width:80%;">}}

## 対数

### log2

| 関数 | 説明                               | 例                  |
| :----    | :-------                                  | :---------               |
| `log2()` | メトリクスの底 2 の対数をグラフ化します。 | `log2(<METRIC_NAME>{*})` |

例:

データポイントごとに 1 ずつ増えるメトリクス `x{*}` があるとすると、`log2(x{*})` は次のようなグラフになります。

{{< img src="graphing/functions/arithmetic/log2.png" alt=" log2 function" responsive="true" style="width:80%;">}}

### log10

| 関数  | 説明                                | 例                   |
| :----     | :-------                                   | :---------                |
| `log10()` | メトリクスの底 10 の対数をグラフ化します。 | `log10(<METRIC_NAME>{*})` |

例:

データポイントごとに 1 ずつ増えるメトリクス `x{*}` があるとすると、`log10(x{*})` は次のようなグラフになります。

{{< img src="graphing/functions/arithmetic/log10.png" alt="log10 function" responsive="true" style="width:80%;">}}

## 累積合計

| 関数   | 説明                                                          | 例                    |
| :----      | :-------                                                             | :---------                 |
| `cumsum()` | 可視のタイムウィンドウに対するメトリクスの累積合計をグラフ化します。 | `cumsum(<METRIC_NAME>{*})` |

例:

値 `1` の定数であるメトリクス `const_1{*}` があるとすると、`cumsum(const_1{*})` は次のようなグラフになります。

{{< img src="graphing/functions/arithmetic/cumsum.png" alt="cum sum function with abs" responsive="true" style="width:80%;">}}

## Integral

| 関数     | 説明                       | 例                             |
| :----        | :-------                          | :---------                          |
| `integral()` | メトリクスの積分をグラフ化します。 | `integral(<METRIC_NAME>{*})` |

**注**: Datadog の `integral()` は、特定のメトリクスの可視のタイムウィンドウにおける、すべての隣接ポイントペアの `[時間増分] x [値増分]` の累積合計です。

{{< img src="graphing/functions/arithmetic/integral.png" alt="integral function with abs" responsive="true" style="width:80%;">}}

## その他の関数

{{< whatsnext desc="Consult the other available functions:" >}}
    {{< nextlink href="/graphing/functions/algorithms" >}}アルゴリズム: メトリクスに異常値や外れ値の検出機能を実装します。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/count" >}}カウント: メトリクスの 0 以外または null 以外の値をカウントします。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/interpolation" >}}補間: メトリクスにデフォルト値を挿入または設定します。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rank" >}}ランク: メトリクスの一部のみを選択します。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rate" >}}レート: メトリクスに対してカスタム微分係数を計算します。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/regression" >}}回帰: メトリクスに何らかの機械学習関数を適用します。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rollup" >}}ロールアップ: メトリクスに使用される元ポイントの数を制御します。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/smoothing" >}}スムーシング: メトリクスの変動を滑らかにします。{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/timeshift" >}}タイムシフト: メトリクスのデータポイントをタイムラインに沿って移動させます。{{< /nextlink >}}
{{< /whatsnext >}}
