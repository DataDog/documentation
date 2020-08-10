---
title: APM 使用量の表示とアラート
kind: documentation
---
Datadog では、お客様のニーズに合うさまざまな料金プランを用意しています。詳細については、[料金プランのページ][1]を参照してください。
APM および分散型トレーシングの請求の仕組みについては、[APM 料金][2]の APM ドキュメントをお読みください。

## 使用量ページ

アカウントの管理者である場合、72 時間ごとに更新される[使用量ページ][3]を使用して、アカウントの使用量を表示できます。

| メトリクス         | 説明                                                                              |
|----------------|------------------------------------------------------------------------------------------|
| APM ホスト      | 当月全時間のすべての個別 APM ホストの 99 パーセンタイル値を表示します。 |
| Analyzed Span | 当月全時間のインデックス化されたすべての Analyzed Span の合計を表示します。         |
| Fargate タスク  | 当月全時間のすべての Fargate タスク数の平均を表示します。              |

## APM ホストにアラートを設定する

コードデプロイによってトレースを送信するホストの数が増大した場合にアラートを取得するには、APM ホストカウントにモニターを設定します。インフラストラクチャーの任意のスコープ（`prod`、`availablity-zone` など）のホストボリュームが予期せず増大している場合、通知を受け取ります。

{{< img src="tracing/faq/apm_host_monitor.mp4" alt="分析ビュー" video="true"  style="width:90%;">}}

1. Monitors -> New Monitor に移動します
2. `datadog.apm.host_instance` で[新しいメトリクスモニター][4]を設定します
3. 警告またはエラーとするレートを定義します。
4. わかりやすい通知を定義します。たとえば、「この環境のホストのボリュームが大きすぎて、割り当てられたしきい値を超えました。APM が有効なホストの数を減らしてください。」とします。

## Analyzed Span にアラートを設定する

コードデプロイによって Analyzed Span のスパイクが発生した場合にアラートを取得するには、Analyzed Span に [App Analytics モニター][5]を設定します。インフラストラクチャーの任意のスコープ（`service`、`availability-zone` など）の Analyzed Span ボリュームが予期せず増大している場合は、いつでも通知を受け取ります。

1. APM の [App Analytics ビュー][6]に移動します
2. `env` を選択します（`*` を選択できます）
3. `count` を選択します（`*` を選択できます）
4. Export -> Export to Monitor を選択します
5. 警告またはエラーとする Analyzed Span のボリュームレートを定義します。
6. わかりやすい通知を定義します。たとえば、「このサービスの Analyzed Span のボリュームが大きすぎます。追加の除外フィルターを定義するか、フィルターレートを上げて制御下に戻してください。」とします。

Analyzed Span のフィルタリングと使用量の制御の詳細については、[こちら][7]を参照してください。

[1]: https://www.datadoghq.com/pricing
[2]: /ja/account_management/billing/apm_distributed_tracing/
[3]: https://app.datadoghq.com/account/usage
[4]: https://app.datadoghq.com/monitors#create/metric
[5]: /ja/monitors/monitor_types/apm/?tab=traceanalytics#monitor-creation
[6]: https://app.datadoghq.com/apm/search/analytics
[7]: /ja/account_management/billing/usage_control_apm/