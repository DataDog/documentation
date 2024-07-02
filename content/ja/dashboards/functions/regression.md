---
title: Regression
aliases:
    - /graphing/functions/regression/
---

## ロバスト回帰

| 関数         | 説明                                          | 例                              |
| :----            | :-------                                             | :---------                           |
| `robust_trend()` | Huber 損失を使用して、ロバスト回帰傾向線を求めます。 | `robust_trend(avg:<METRIC_NAME>{*})` |

最も一般的な線形回帰である最小二乗法 (OLS) は、極値ポイントが少数あるだけでも大きな影響を受けがちです。ロバスト回帰も回帰直線を求める方法の 1 つですが、少数の極値からはそれほど強い影響を受けません。例として、次のプロットを見てみます。

{{< img src="dashboards/functions/regression/robust_trend.png" alt="堅牢性傾向" style="width:80%;">}}

元のメトリクスは青い実線で示されています。紫の破線は OLS 回帰線で、黄色の破線がロバスト回帰線です。メトリクスにある短時間のスパイクによって OLS 回帰線はやや上向きになりますが、ロバスト回帰線はこのスパイクを無視し、メトリクスの全体的傾向により的確に沿っています。

## 傾向線

| 関数       | 説明                                                              | 例                            |
| :----          | :-------                                                                 | :---------                         |
| `trend_line()` | メトリクス値に沿う最小二乗法の回帰線を求めます。 | `trend_line(avg:<METRIC_NAME>{*})` |

例:

関数 `sin(x) * x/2 + x`、`trend_line(sin(x) * x/2 + x)` は、次のようになります。

{{< img src="dashboards/functions/regression/trend_line_function.png" alt="傾向線グラフと関数" style="width:80%;">}}

## 区分的定数

| 関数               | 説明                                                                            | 例                                    |
| :----                  | :-------                                                                               | :---------                                 |
| `piecewise_constant()` | 複数の定数値区間で構成される区分的関数でメトリクスを近似します。 | `piecewise_constant(avg:<METRIC_NAME>{*})` |

例:

関数 `x`、`piecewise_constant(x)` は、次のようになります。

{{< img src="dashboards/functions/regression/piecewise_constant.png" alt="区分的定数" style="width:80%;">}}

## その他の関数

{{< whatsnext desc="他に利用できる関数を参照します。" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}アルゴリズム: メトリクスに異常値や外れ値の検出機能を実装します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}算術: メトリクスに対して算術演算を実行します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}カウント: メトリクスの 0 以外または null 以外の値をカウントします。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}除外: メトリクスの特定の値を除外します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}補間: メトリクスにデフォルト値を挿入または設定します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}ランク: メトリクスの一部のみを選択します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}レート: メトリクスに対してカスタム微分係数を計算します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}ロールアップ: メトリクスに使用される元ポイントの数を制御します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}スムーシング: メトリクスの変動を滑らかにします。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}タイムシフト: メトリクスのデータポイントをタイムラインに沿って移動させます。{{< /nextlink >}}
{{< /whatsnext >}}
