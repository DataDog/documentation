---
title: DogStatsD Data Aggregation
description: Learn how the DogStatsD server aggregates your data before sending it to Datadog
aliases:
    - /developers/faq/data-aggregation-with-dogstatsd-threadstats
further_reading:
    - link: developers/dogstatsd
      tag: Documentation
      text: Introduction to DogStatsD
    - link: developers/libraries
      tag: Documentation
      text: Official and Community created API and DogStatsD client libraries
---

Datadog の DogStatsD は、StatsD プロトコルを、いくつか固有の機能を追加して実装します。DogStatsD を使用すると、アプリケーションコードのメトリクス送信や監視を、コードをブロックせずに行うことができます。データはアプリケーションから UDP を通じてローカルの（Datadog Agent に組み込まれた） [DogStatsD サーバー][2]に送信され、そこで集計されてから、Datadog の API エンドポイントに送られます。[DogStatsD のセットアップについてはこちらを参照してください][2]。

この記事では、データを集計する理由と、その方法について説明します。

## メトリクスを集計する理由

データを集計することによって、一定の時間を必要とする API 呼び出しの回数を減らし、パフォーマンスを向上させることができます。

たとえば、[COUNT メトリクス][3]が短時間に 1,000 回（1 回につき 1 ずつ）インクリメントされるとします。DogStatsD サーバーは API 呼び出しを 1,000 回行うのではなく、集計して数回だけ呼び出します。ライブラリは状況に応じて（以下を参照）、たとえば 1,000 の値を持つデータポイントを 1 つ送信することもあれば、累積値が 1,000 である複数のデータポイントを送信することもあります。

## DogStatsD サーバーで集計が行われる方法

[DogStatsD][2] は 10 秒の_フラッシュ間隔_を使用します。10 秒ごとに、[DogStatsD][2] は前回のフラッシュ以降に受信したすべてのデータをチェックし、同じメトリクス名で同じタグを持つすべての値を 1 つの値に集計します。

**注**: StatsD プロトコルの場合、StatsD クライアントはメトリクスにタイムスタンプを付けて送信しません。タイムスタンプはフラッシュ時に追加されます。したがって、10:00:10 にフラッシュが発生する場合、（Datadog Agent に組み込まれた）[DogStatsD][2] サーバーは、10:00:00 から 10:00:10 の間に受信したすべてのデータを 1 つのデータポイントに集計し、10:00:00 のタイムスタンプを付けます。

## メトリクスタイプごとの集計規則

同じフラッシュ間隔の間に受信するすべての値を集計して送信される値は、[メトリクスのタイプ][4]によって次のように異なります。

| メトリクスタイプ       | フラッシュ間隔ごとに行われる集計方法                                                 |
|-------------------|-----------------------------------------------------------------------------------------------|
| [GAUGE][5]        | 最後に受信したデータポイントが送信されます。                                                        |
| [COUNT][3]        | 受信したすべてのデータポイントの合計が送信されます。                                                   |
| [HISTOGRAM][6]    | 受信したすべてのデータポイントの最小、最大、合計、平均、95 パーセンタイル、カウント、および中央値が送信されます。 |
| SET               | 一意なデータポイントの数が送信されます。                                                   |
| [DISTRIBUTION][7] | グローバルな分布として集計します。                                                           |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/dogstatsd/
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: /metrics/types/?tab=count#metric-types
[4]: /metrics/types/
[5]: /metrics/types/?tab=gauge#metric-types
[6]: /metrics/types/?tab=histogram#metric-types
[7]: /metrics/types/?tab=distribution#metric-types
