---
title: Rate Limiting
type: apicontent
order: 4
external_redirect: '/api/#rate-limiting'
---
## Rate Limiting

一部の API エンドポイントでは、レートが制限されています。一定の時間内に所定のリクエスト数を超過すると、エラーが返されます。

レート制限がある API エンドポイントについては、ヘッダーが返されるので、制限にどの程度近づいているかを知ることができます。また、制限を超えた場合は、このヘッダーを確認して、いつ再試行できるかを判断できます。

デフォルトのレート制限を増加させたい場合は、[Datadog のサポートチームにお問い合わせください][1]。

API レート制限ポリシーについて

* Datadog は、データポイント/メトリクスの送信に対して**レート制限を設けていません** (メトリクスの送信レートの処理方法については、[メトリクスのセクション][2]を参照してください)。制限に達したかどうかは、お客様の契約に基づく[カスタムメトリクス][3]の数量によって決まります。
* メトリクスの**取得**のレート制限値は、`100`/時間/Organization です。
* イベント送信のレート制限値は、`1000`/集計/日/Organization です。集計は、類似のイベントのグループです。
* [query_batch API][4] および [Log Query API][5] 呼び出しのレート制限値は、`300`/時間/Organization です。これは、オンデマンドで増やすことができます。
* [graph_snapshot API][6] 呼び出しのレート制限値は、`60`/時間/Organization です。これは、オンデマンドで増やすことができます。
* [ログ構成 API][7] のレート制限値は、`6000`/分/Organization です。これは、オンデマンドで増やすことができます。

[1]: /ja/help
[2]: /ja/api/#metrics
[3]: /ja/developers/metrics/custom_metrics
[4]: /ja/api/#query-timeseries-points
[5]: /ja/api/?lang=bash#get-a-list-of-logs
[6]: /ja/api/#graphs
[7]: /ja/api/?lang=bash#logs