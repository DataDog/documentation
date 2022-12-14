---
aliases:
- /ja/graphing/functions/rate/
further_reading:
- link: /monitors/guide/alert-on-no-change-in-value/
  tag: ドキュメント
  text: 値に変化がない場合のアラート
kind: documentation
title: レート
---

## 毎秒

| 関数       | 説明                                                | 例                        |
|:---------------|:-----------------------------------------------------------|:-------------------------------|
| `per_second()` | 1 秒あたりのメトリクスの変化の割合をグラフ化します。 | `per_second(<METRIC_NAME>{*})` |

## 毎分

| 関数       | 説明                                                | 例                        |
|:---------------|:-----------------------------------------------------------|:-------------------------------|
| `per_minute()` | 1 分あたりのメトリクスの変化の割合をグラフ化します。 | `per_minute(<METRIC_NAME>{*})` |

## 毎時

| 関数     | 説明                                              | 例                      |
|:-------------|:---------------------------------------------------------|:-----------------------------|
| `per_hour()` | 1 時間あたりのメトリクスの変化の割合をグラフ化します。 | `per_hour(<METRIC_NAME>{*})` |

## 時間の差

| 関数 | 説明                                                    | 例                |
|:---------|:---------------------------------------------------------------|:-----------------------|
| `dt()`   | 送信されたポイント間の時間の差 (秒単位) をグラフ化します。 | `dt(<METRIC_NAME>{*})` |

## 値の差

| 関数 | 説明                    | 例                  |
|:---------|:-------------------------------|:-------------------------|
| `diff()` | メトリクスの差分をグラフ化します。 | `diff(<METRIC_NAME>{*})` |

各インターバルの差をインターバル単位で計算します。例えば、メトリクスが 15 秒間隔でデータポイントを送信した場合、`diff()` 修飾子は 15 秒率で表示します。**注:** この計算は、時間集計を適用した後、空間集計が行われる前に行われます。

## 単調差

| 関数           | 説明                                                                     | 例                            |
|:-------------------|:--------------------------------------------------------------------------------|:-----------------------------------|
| `monotonic_diff()` | `diff()` などのメトリクスの差分をグラフ化します（ただし、差分が正の場合のみ）。 | `monotonic_diff(<メトリクス名>{*})` |

## 微分係数

| 関数       | 説明                                   | 例                        |
|:---------------|:----------------------------------------------|:-------------------------------|
| `derivative()` | メトリクスの微分係数 (diff/dt) をグラフ化します。 | `derivative(<METRIC_NAME>{*})` |

## その他の関数

{{< whatsnext desc="他に利用できる関数を参照します。" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}アルゴリズム: メトリクスに異常値や外れ値の検出機能を実装します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}算術: メトリクスに対して算術演算を実行します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}カウント: メトリクスの 0 以外または null 以外の値をカウントします。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}除外: メトリクスの特定の値を除外します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}補間: メトリクスにデフォルト値を挿入または設定します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}ランク: メトリクスの一部のみを選択します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}回帰: メトリクスに何らかの機械学習関数を適用します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}ロールアップ: メトリクスに使用される元ポイントの数を制御します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}スムーシング: メトリクスの変動を滑らかにします。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}タイムシフト: メトリクスのデータポイントをタイムラインに沿って移動させます。{{< /nextlink >}}
{{< /whatsnext >}}

## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}