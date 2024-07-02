---
title: What is the granularity of my graphs? Am I seeing raw data or aggregates on my graph?
aliases:
    - /graphing/faq/what-is-the-granularity-of-my-graphs-am-i-seeing-raw-data-or-aggregates-on-my-graph
    - /dashboards/faq/what-is-the-granularity-of-my-graphs-am-i-seeing-raw-data-or-aggregates-on-my-graph
---

Datadog のグラフは一般的に、送信された元の値ではなく、ローカル集計を表示します。

## 理由

データは 1 秒単位で保存されますが、表示時にデータを集計することができます。

1 週間のタイムウィンドウをグラフ化する場合、数十万個の値をブラウザに送信する必要があります。このような点数のすべてを、画面の一部を占めるウィジェットでグラフ化できるわけではありません。このような理由から、データは集計され、限られた数のポイントをブラウザに送信してグラフを描画します。

たとえば、'lines' (折れ線グラフ) を表示する 1 日ビューの場合、データポイントは 5 分ごとに 1 つです。Datadog のバックエンドは、1 日を 288 個の 5 分バケットにスライスします。各バケットでは、すべてのデータが 1 つの値にまとめられます。たとえば、07:00 というタイムスタンプでグラフに描画されたデータポイントは、実際にはその日の 07:00:00 から 07:05:00 までの間に送信されたすべてのデータポイントの総計です。

デフォルトでは、ロールアップ集計はすべての実測値を平均して計算されるため、[拡大するとグラフが滑らかになる][1]という傾向があります。

## 何ができるのですか？

データ集計は、大きなタイムウィンドウを見る限り、ソースが 1 つであろうと 1000 個であろうと行う必要があります。

しかし、[ロールアップ関数][2]を使うことで、この集計をコントロールすることができます。

* .rollup(max)/ .rollup(min) は、各ポイントを、それが表すデータの X 分のローカル MAXIMUM/MINIMUM にします。
* .rollup(avg) はデフォルト値です: グラフの各ポイントは、それが表すデータの X 分の AVERAGE 値です
* .rollup(sum) は、X 分間に送信されたすべての値の SUM を計算します
* .rollup(avg,60) は、グラフのポイントが 1 分平均であることなどを定義します

**注**: Datadog のバックエンドは、時間間隔の数を最大 300 個に抑えようとします。そのため、2 か月のタイムウィンドウに対して rollup(60) を行っても、要求した 1 分の粒度は得られません。

## 例
{{< img src="metrics/guide/graph_granularity.png" alt="graph_granularity" >}}

上のグラフは、過去 2 時間の棒グラフです。グラフには 1 分ごとに 1 つのデータポイントが表示されます。これらは送信された実際の値ではなく、ローカル集計であり、それぞれが 1 分間のメトリクスデータを表しています。

## 実際に送信されたデータを見ることはできるのでしょうか？

はい、十分に拡大すると、グラフは元の値を表示します。例えば、Datadog Agent は、〜15 秒ごとにデータを送信しています。45 分 (またはそれ以下) のタイムウィンドウを見ると、値が集計されていません。

[1]: /dashboards/faq/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs/
[2]: /dashboards/functions/rollup/
