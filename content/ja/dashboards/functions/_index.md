---
title: 関数
kind: documentation
aliases:
  - /ja/examples/
  - /ja/examples/aws-metrics/
  - /ja/examples/month_before/
  - /ja/examples/graphing-functions/
  - /ja/examples/day_before/
  - /ja/examples/json-editing/
  - /ja/examples/nginx-metrics/
  - /ja/examples/dashboards/
  - /ja/examples/hour_before/
  - /ja/examples/os-metrics/
  - /ja/examples/week_before/
  - /ja/examples/cassandra-metrics/
  - /ja/graphing/miscellaneous/functions
  - /ja/graphing/miscellaneous/
  - /ja/getting_started/from_the_query_to_the_graph
  - /ja/graphing/miscellaneous/from_the_query_to_the_graph
  - /ja/graphing/functions/
---
## 概要

グラフエディターの `Formula` ボックスを使って関数をクエリに適用することができます。ほとんどの関数は最終段階 ([時間][1]および[空間集計][2]後) で適用されます。

{{< whatsnext desc="関数の種類を選択します。" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}アルゴリズム: 異常値や外れ値の検出機能を実装します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}算術: 算術演算を実行します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}カウント: 0 以外または null 以外の値をカウントします。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}補間: デフォルト値を挿入または設定します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}ランク: メトリクスの一部のみを選択します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}レート: メトリクスに対してカスタム微分係数を計算します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}回帰: 何らかの機械学習関数を適用します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}ロールアップ: 使用される元ポイントの数を制御します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}スムーシング: メトリクスの変動を抑制します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}タイムシフト: メトリクスのデータポイントをタイムラインに沿って移動させます。{{< /nextlink >}}
{{< /whatsnext >}}


[1]: /ja/metrics/introduction/#time-aggregation
[2]: /ja/metrics/introduction/#space-aggregation