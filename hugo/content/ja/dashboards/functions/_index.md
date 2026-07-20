---
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
description: Datadog ダッシュボードや視覚化でメトリクスクエリの結果を変更するために数学的および統計的関数を適用します。
further_reading:
- link: /metrics/#querying-metrics
  tag: ドキュメント
  text: メトリクスのクエリ
title: 関数
---
## 概要 {#overview}

関数は、メトリッククエリの結果が視覚化するためにどのように返されるかを変更することができます。ほとんどの関数は、メトリクスクエリの結果が返された後に適用されますが、関数はクエリが行われる前にパラメーターを変更することもできます。

例えば、ロールアップ関数は、結果が返される前にクエリの時間集計を変更します。また、算術関数は、メトリクスクエリの返される結果に変更を加えます。メトリクスのクエリについて詳しくは、[メトリクス][3]ページを参照してください。さまざまな関数の詳細については、[関数の種類](#function-types)を参照してください。

## 関数を追加する {#add-a-function}

グラフエディターの Add Function `Σ` アイコンをクリックして関数をクエリに適用することができます。ほとんどの関数は[時間][1]および[スペース集計][2]後に適用されます。

{{< img src="dashboards/functions/sigmaaddingfunctions.png" alt="Add Function の Capital Sigma シンボル" style="width:100%;" >}}

## 関数の種類 {#function-types}

{{< whatsnext desc="関数の種類を選択します。" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}アルゴリズム: 異常または外れ値の検出を実装します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}算術演算: 算術演算を実行します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}カウント: non-zero または non-null の値をカウントします。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}除外: メトリクスの特定の値を除外します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}補間: デフォルト値を入力または設定します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}ランク: メトリクスのサブセットのみを選択します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}レート: メトリクスに対してカスタム微分係数を計算します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}回帰: 機械学習関数を適用します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}ロールアップ: 使用する生データポイントの数を制御します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}スムージング: メトリクスの変動をスムーズにします。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/telemetry_source" >}}テレメトリソース: メトリクスデータのテレメトリソースを選択します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}タイムシフト: タイムラインに沿ってメトリクスデータポイントをシフトします。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/beta" >}}ベータ: メトリクスのローリング平均を計算します。{{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/metrics/#time-aggregation
[2]: /ja/metrics/#space-aggregation
[3]: /ja/metrics/#anatomy-of-a-metric-query