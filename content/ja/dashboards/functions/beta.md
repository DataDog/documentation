---
title: ベータ関数
aliases:
  - /ja/graphing/functions/beta/
---
ベータ関数は、クエリ用 JSON を直接編集することによって使用できます。

## ローリング平均

| 関数          | 説明                                    | 例                           |
|-------------------|------------------------------------------------|-----------------------------------|
| `rollingavg_5()`  | 5 スパンのローリング平均を計算します。  | `rollingavg_5(system.load.1{*})`  |
| `rollingavg_13()` | 13 スパンのローリング平均を計算します。 | `rollingavg_13(system.load.1{*})` |
| `rollingavg_21()` | 21 スパンのローリング平均を計算します。 | `rollingavg_21(system.load.1{*})` |
| `rollingavg_29()` | 29 スパンのローリング平均を計算します。 | `rollingavg_29(system.load.1{*})` |

## その他の関数

{{< whatsnext desc="他に利用できる関数を参照します。" >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}算術: メトリクスに対して算術演算を実行します。{{< /nextlink >}}
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