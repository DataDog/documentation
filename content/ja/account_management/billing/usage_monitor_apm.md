---
title: View and Alert on APM Usage
---

Datadog では、お客様のニーズに合うさまざまな料金プランを用意しています。詳細については、[料金プランのページ][1]を参照してください。
APM および分散型トレーシングの請求の仕組みについては、[APM 料金][2]の APM ドキュメントをお読みください。

## 使用量ページ

アカウントの管理者である場合、24 時間ごとに更新される[使用量ページ][3]を使用して、アカウントの使用量を表示できます。

| ディメンション          | 説明                                                                                    |
|--------------------|------------------------------------------------------------------------------------------------|
| APM ホスト          | 当月全時間のすべての個別 APM ホストの 99 パーセンタイル値を表示します。       |
| APM Fargate タスク  | 当月の 5 分間における個別 Fargate タスクの平均を表示します。   |
| Ingested Span     | 当月に取り込まれたスパンからの取り込みバイトの合計を表示します。                      |
| Indexed Span      | 当月にインデックス化されたスパンの合計を表示します。                                   |

各 APM ホストと APM Fargate タスクは、取り込まれたボリュームとインデックス化されたボリュームの割り当てを付与します。
- 取り込みスパン: APM ホストあたり 150 GB の取り込みスパン、APM Fargate タスクあたり 10 GB の取り込みスパン。
- インデックス化スパン: APM ホストあたり 1M のインデックス化スパン、APM Fargate タスクあたり 65k スパンのインデックス化スパン。

## 取り込み/インデックス化されたボリュームに基づくアラートの設定

### 取り込みバイトのアラート設定

取り込みスパンの使用量が APM ホストや APM Fargate タスクから付与される割り当ての範囲内に収まるように、月間の使用量が割り当てに近づいたときにアラートが出るようにモニターを設定します。

1. [メトリクスの監視][8]を作成します。
2. メトリクスクエリに `datadog.estimated_usage.apm.ingested_bytes` を入力します。
3. モニターの評価ウィンドウを `current month (MTD)` と定義します。これにより、モニターは月単位の使用量を見ることができるようになります。累積タイムウィンドウについては、[モニター][9]のドキュメントで詳しく説明しています。
4. 取り込みボリュームが割り当ての 80% または 90% に達したときに警告するための **Alert threshold** とオプションの **Warning threshold** を定義します。
5. モニターの名前を入力します。取り込みボリュームが多くなったときに、チームにアラートを送るための通知を定義します。

{{< img src="account_management/billing/monitor_usage_apm.png" alt="メトリクスクエリとして datadog.estimated_usage.apm.ingested_bytes を表示するメトリクスモニターの構成ページ" width="80%" >}}

取り込みボリュームを効果的に減らすには、この[ガイド][7]または[取り込みの仕組み][10]のドキュメントを参照してください。

### インデックス化スパンのアラート設定

同様に、インデックス化スパンの予算が一定の範囲内に収まるようにアラートを設定することもできます。`datadog.estimated_usage.apm.indexed_spans` メトリクスを使用してメトリクスモニターを作成し、月間のインデックス化スパンボリュームが定義されたしきい値を超えたときにアラートを受け取ることができます。

インデックス化スパンの数を減らすには、保持フィルターの構成を確認してください。保持フィルターについては、[トレース保持][11]のドキュメントで詳しく説明しています。

[1]: https://www.datadoghq.com/pricing
[2]: /ja/account_management/billing/apm_distributed_tracing/
[3]: https://app.datadoghq.com/account/usage
[4]: https://app.datadoghq.com/monitors#create/metric
[5]: /ja/monitors/types/apm/?tab=traceanalytics#monitor-creation
[6]: https://app.datadoghq.com/apm/traces?viz=timeseries
[7]: /ja/tracing/guide/trace_ingestion_volume_control/
[8]: https://app.datadoghq.com/monitors/create/metric
[9]: /ja/monitors/configuration/?tab=thresholdalert#cumulative-time-windows
[10]: /ja/tracing/trace_pipeline/ingestion_mechanisms/
[11]: /ja/tracing/trace_pipeline/trace_retention/