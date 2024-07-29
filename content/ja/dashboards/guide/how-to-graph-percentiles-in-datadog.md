---
title: Datadog でパーセンタイルグラフを作成する方法
aliases:
  - /ja/graphing/faq/how-to-graph-percentiles-in-datadog
  - /ja/graphing/guide/how-to-graph-percentiles-in-datadog
---
## DogStatsD の実装

Datadog では、DogStatsD からヒストグラムメトリクスとしてデータを送信することで、パーセンタイルを取得できます。Agent に組み込まれている [DogStatsD][1] サーバーは、[DogStatsD][1] パケットを受け取り、[データ集計を実行][2]して、最終的にパーセンタイルメトリクスを Datadog に送信します。

この集計は収集側で処理されるため、GUI でグラフ作成機能として使用することはできません。

ヒストグラムデータからは、95 パーセンタイル、50 パーセンタイル、平均値、最大値、カウントを取得できます。

* [DogStatsD の簡単な紹介][1]

* [さまざまなプログラミング言語で使用できる DogStatsD クライアント][3]

### 追加のパーセンタイル

Agent の構成ファイルの「histogram_percentiles」行を使用して、以下のような追加のパーセンタイルを取得できます。

* histogram_percentiles: 0.95, 0.75

[ヒストグラムの詳細][4]

## ローカル集計

ヒストグラムは、Datadog Agent によってホストあたり 10 秒ごとに計算されます。この収集モデルには、メリットとデメリットがあります。

### メリット

* ヒストグラムメトリクスの計算に使用される生データポイントが、Datadog サイトに公開されたり、リレーされることはありません。
* StatsD がすべての集計を処理し、計算されたデータパッケージを Datadog のサーバーに直接送信します。

### デメリット

* 集計データの報告ストリームが 2 つある場合、現時点では、その 2 つのストリームから取得される生データポイントを一緒に集計することはできません。一緒に集計できるのは集計値だけです。
    * 例: すべてのリージョンの `<METRIC_NAME>.avg` から平均を求める場合は、各リージョンの平均ストリーム値を受け取り、平均値の平均が生成されます。

* タグの複雑さが増すような変更を行うと (より具体化するためのタグを追加すると)、ロールアップされたメトリクス可視化機能の動作が変化します。
    * 例: 変更前の `<METRIC_NAME>.avg` (タグなし) は、すべての生ポイントに対して集計を行っていました (StatsD が、すべての生データポイントを受け取って集計してから、1 つのメトリクスストリーム上に送信する)。しかし、US、EU などのリージョンタグを追加すると、StatsD は生データポイントを 2 つのリージョンビンに入れ、それらを集計し、2 つのストリーム上に送信します。つまり、`<METRIC_NAME>.avg` をグラフ化する場合、AVG by * は、1 つのストリームではなく、2 つのストリームに対する集計になります。

[Datadog のヒストグラムの特性については、こちらを参照してください][5]。

[1]: /ja/metrics/dogstatsd_metrics_submission/
[2]: https://github.com/DataDog/dd-agent/blob/master/aggregator.py
[3]: /ja/developers/community/libraries/
[4]: /ja/metrics/types/?tab=histogram#metric-types
[5]: /ja/developers/faq/characteristics-of-datadog-histograms/