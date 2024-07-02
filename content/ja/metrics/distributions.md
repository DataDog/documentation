---
title: Distributions
description: Compute global percentiles across your entire dataset.
aliases:
  - /developers/faq/characteristics-of-datadog-histograms/
  - /graphing/metrics/distributions/
further_reading:
  - link: /metrics/custom_metrics/dogstatsd_metrics_submission/
    tag: Documentation
    text: Using Distributions in DogStatsD
---
## 概要

ディストリビューションは、フラッシュ間隔の間に複数のホストから送信された値を集計して、インフラストラクチャー全体の統計的分布を測定するメトリクスタイプです。

グローバルディストリビューションは、サービスのような論理的オブジェクトを、基礎となるホストから独立してインスツルメントします。Agent 側で集計する[ヒストグラム][1]とは異なり、グローバルディストリビューションはフラッシュインターバルの間に収集した全ての生データを送信し、集計は Datadog の [DDSketch データ構造][2]を使ってサーバー側で行われます。

ディストリビューションは、他のメトリクスタイプ (カウント、レート、ゲージ、ヒストグラム) では提供されない、強化されたクエリー機能および構成オプションを提供します。
* **パーセンタイル集計の計算**: ディストリビューションは、生の非集計データを表す DDSketch データ構造として保存され、すべてのホストの生データに対してグローバルに正確なパーセンタイル集計 (p50、p75、p90、p95、p99 または任意のパーセンタイル (小数点以下 2 桁まで)) を計算することが可能です。パーセンタイル集計を有効にすると、以下のような高度なクエリ機能を利用できます。

  * **任意の時間枠における単一パーセンタイル値**:

     _"私のアプリケーションの 99.9 パーセンタイルのロード時間は、この 1 週間でどうなったか？"_

  * **Standard deviation over any timeframe**:

     _"What is the standard deviation (stddev) of my application's CPU consumption over the past month?"_

  * **メトリクスモニターのパーセンタイルしきい値**:

    _"私のアプリケーションの p95 のリクエストレイテンシーが過去 5 分間に 200 ms を超えたら警告を出す。"_

  * **しきい値クエリ**:

    _"私のサービスへのリクエストの 95% が 5 秒以内に完了する 30 日間の SLO を定義したい。"_


* **タグ付けのカスタマイズ**: この機能を使用すると、ホストレベルの詳細度を必要としない場合にカスタムメトリクスのタグ付けスキームを制御することができます (チェックアウトサービスの毎秒トランザクションなど)。

実装の詳細については、[開発ツールのセクション][1]を参照してください。

**注:** ディストリビューションは新しいメトリクスタイプであるため、Datadog への送信時に新しいメトリクス名の下でインスツルメンテーションを行う必要があります。

## 高度なクエリ機能の有効化

Like other metric types, such as `gauges` or `histograms`, distributions have the following aggregations available: `count`, `min`, `max`, `sum`, and `avg`. Distributions are initially tagged the same way as other metrics, with custom tags set in code. They are then resolved to host tags based on the host that reported the metric. 

However, you can enable advanced query functionality such as the calculation of globally accurate percentile aggregations for all queryable tags on your distribution on the Metrics Summary page. This provides aggregations for `p50`, `p75`, `p90`, `p95`, and `p99` or any user-defined percentile of your choosing (with up to two decimal points such as 99.99). Enabling advanced queries also unlocks threshold queries and standard deviation.

{{< img src="metrics/distributions/metric_detail_enable_percentiles.mp4" alt="メトリクス詳細パネルの高度のセクションにある構成をクリックして、高度なパーセンタイルとしきい値クエリ機能を有効にするユーザー" video=true width=80% >}}

After electing to apply percentile aggregations on a distribution metric, these aggregations are automatically available in the graphing UI:

{{< img src="metrics/distributions/graph_percentiles.mp4" alt="ディストリビューションメトリクスの集計" video=true" >}}

パーセンタイル集計は、他の様々なウィジェットやアラートで使用することができます。
* **任意の時間枠における単一パーセンタイル値**:

   _"私のアプリケーションの 99.9 パーセンタイルのリクエスト期間は、この 1 週間でどうなったか？"_

{{< img src="metrics/distributions/percentile_qvw.jpg" alt="単一のメトリクスの 99.99 パーセンタイル集計の単一値 (7.33s) を表示するクエリ値ウィジェット" style="width:80%;">}}

* **メトリクスモニターのパーセンタイルしきい値**
  _"私のアプリケーションの p95 のリクエストレイテンシーが過去 5 分間に 200 ms を超えたら警告を出す。"_

{{< img src="metrics/distributions/percentile_monitor.jpg" alt="モニターのアラート条件にドロップダウンで設定できるパーセンタイルしきい値" style="width:80%;">}}

### しきい値クエリ

<div class="alert alert-warning">
しきい値クエリは公開ベータ版です。 
</div>

Enabling DDSketch-calculated globally-accurate percentiles on your distribution metrics unlocks threshold queries where you can count the number of raw distribution metric values if they exceed or fall below a numerical threshold. You can use this functionality to count the number of errors or violations compared to an anomalous numerical threshold on dashboards. Or you can also use threshold queries to define SLOs like "95% of requests were completed in under 10 seconds over the past 30 days". 

パーセンタイルのディストリビューションのしきい値クエリでは、メトリクスの送信前にしきい値を事前に定義する必要がなく、Datadog でしきい値を柔軟に調整することができます。

しきい値クエリを使用するには:

1. Metrics Summary ページで、ディストリビューションメトリクスのパーセンタイルを有効にします。
2. "count values..." アグリゲーターを使用して、選択したディストリビューションメトリクスをグラフ化します。
3. しきい値と比較演算子を指定します。

{{< img src="metrics/distributions/threshold_queries.mp4" video=true alt="カウント値集計ツールで可視化されている時系列グラフで、しきい値が 8 秒以上であるもの" style="width:80%;" >}}

同様に、しきい値クエリを使用してメトリクスベースの SLO を作成することができます。
1. Metrics Summary ページで、ディストリビューションメトリクスのパーセンタイルを有効にします。
2. Create a new Metric-Based SLO and define the numerator as the number of "good" events with a query on your chosen distribution metric using the "count values..." aggregator.
3. しきい値と比較演算子を指定します。
{{< img src="metrics/distributions/threshold_SLO.jpg" alt="SLO のしきい値クエリ" style="width:80%;">}}

## タグ付けのカスタマイズ

ディストリビューションには、ホストレベルの詳細度が意味を持たない場合にメトリクスへのタグ付けを制御する機能があります。タグのコンフィギュレーションは維持したいタグの_許可リスト_になります。

タグ付けをカスタマイズするには:

1. Metrics Summary テーブルでカスタムディストリビューションのメトリクス名をクリックし、メトリクス詳細のサイドパネルを開きます。
2. **Manage Tags** ボタンをクリックして、タグコンフィギュレーションモーダルを開きます。
3. **Custom...** タブをクリックして、クエリ用に維持したいタグをカスタマイズします。

**Note**: The exclusion of tags is not supported in the allowlist-based customization of tags. Adding tags starting with `!` is not accepted.

{{< img src="metrics/distributions/dist_manage.jpg" alt="Manage Tags ボタンでディストリビューションにタグを構成する" style="width:80%;">}}

## 監査イベント
Any tag configuration or percentile aggregation changes create an event in the [event explorer][3]. This event explains the change and displays the user that made the change.

If you created, updated, or removed a tag configuration on a distribution metric, you can see examples with the following event search:
```text
https://app.datadoghq.com/event/stream?tags_execution=and&per_page=30&query=tags%3Aaudit%20status%3Aall%20priority%3Aall%20tag%20configuration
```

パーセンタイル集計をディストリビューションメトリクスに追加または削除した場合、次のイベント検索の例を見ることができます。
```text
https://app.datadoghq.com/event/stream?tags_execution=and&per_page=30&query=tags%3Aaudit%20status%3Aall%20priority%3Aall%20percentile%20aggregations
```

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /metrics/types/
[2]: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/
[3]: https://app.datadoghq.com/event/explorer
