---
title: ログの使用量の監視
kind: ガイド
further_reading:
  - link: /logs/processing/
    tag: ドキュメント
    text: ログの処理方法
  - link: /logs/processing/parsing/
    tag: ドキュメント
    text: パースの詳細
---
このガイドでは、推定使用量メトリクスを利用してログ使用量を監視する方法を説明します。以下の各ステップについて解説していきます。

* 推定使用量メトリクスの有効化
* トラフィックの予期せぬスパイクにアラートを生成
* インデックス化ログの予算しきい値に近づくとアラートを生成
* すぐに使えるログ管理の使用量ダッシュボードをインポート

## 予期せぬスパイクにアラートを生成

### 推奨ログ使用量メトリクスを有効にする

[推奨ログ使用量メトリクス][1]を有効にして、取得したログ数、取得したバイト数、インデックス化されたログ数の追跡を開始します。[Generate Metrics][2] ページに移動して、ログ使用量メトリクスを有効化します (このメトリクスは無料で利用でき、15 か月間保存できます)。

{{< img src="logs/processing/logs_to_metrics/estimated_usage_metrics.png" alt="推奨使用量メトリクス" responsive="true" style="width:80%;">}}

[異常検知モニター][3]でメトリクスを活用する方法については、下記を参照してください。

**注**: [Metric Summary ページ][4]の `datadog.estimated_usage.logs.ingested_bytes` の単位は `Byte` に設定することを推奨しています。

{{< img src="logs/guide/logs_estimated_bytes_unit.png" alt="Metric 単位の定義"  style="width:70%;">}}

### 異常検知モニター

インデックス化ログの予期せぬスパイクに対してアラートを受け取れるように異常検知モニターを設定するには、以下の手順に従います。

1. [新規の異常検知モニターを作成します][5]。
2. `datadog.estimated_usage.logs.ingested_events` メトリクスを選択します。
3. `from` セクションに `datadog_is_excluded:false` を追加します (取得したログではなく、インデックス化されたログを監視するため)
4. **group by** に `service` タグと `datadog_index` タグを追加します (インデックスで特定のサービスがスパイクした場合、またはログの送信が停止した場合に通知を受け取るため)
5. 使用状況に一致するアラート条件を設定します (例: 評価ウィンドウ、予測範囲外の回数など)
6. 実行可能な指示を記述した通知メッセージを設定します。

{{< img src="logs/guide/anomaly_usage_notification.png" alt=" 異常検知通知の例"  style="width:70%;">}}

コンテキストリンクを含む通知の例

```text
インデックスで予期せぬ数のログがインデックス化されています {{datadog_index.name}}

1. [このサービスのログパターンをチェックします](https://app.datadoghq.com/logs/patterns?from_ts=1582549794112&live=true&to_ts=1582550694112&query=service%3A{{service.name}})
2. [ノイズの多いパターンに除外フィルターを追加します](https://app.datadoghq.com/logs/pipelines/indexes)
```

## 推定使用量ダッシュボード

ログ使用量メトリクスから、推定使用量ダッシュボードを作成して、Datadog 全体のログ管理使用量を監視することもできます。以下はそのダッシュボードの例です。

{{< img src="logs/guide/log_usage_dashboard.png" alt="ログ推定使用量ダッシュボード"  style="width:70%;">}}

**リマインダー**: このダッシュボードで使用されるメトリクスは推定であるため、正式な請求対象の数値とは異なる場合があります。

このダッシュボードをインポートするには、[推定使用量ダッシュボードの JSON 定義][6]をコピーして、新しいダッシュボードとして貼り付けます。または、新しいダッシュボードの右上隅にある設定歯車メニューの `Import Dashboard JSON` オプションを使用します。

## インデックス化されたログを固定しきい値で監視

インフラストラクチャーのスコープ (`service`、`availability-zone` など) でインデックス化されたログが予期せず増大している場合に通知を受け取ります。

1. [Datadog Log Explorer][7] ビューに移動します。
2. 監視する量を示す[検索クエリ][8]を作成します。そのインデックスのすべてのログを監視するには、クエリを空白のままにします。
3. **Export to monitor** をクリックします。
4. **警告**または**エラー**とするレートを定義します。
5. わかりやすい通知を定義します。例: `このサービスのボリュームが大きすぎます。追加の除外フィルターを定義するか、サンプリングレートを上げて制御下に戻してください。`

{{< img src="logs/guide/example_notification.png" alt=" 通知例"  style="width:70%;">}}

### 1 日の割り当て数に達したインデックスへのアラート

また、[インデックスに 1 日の割り当てを設定][9]して、ログが 1 日の規定数よりも多くインデックス化されることを防ぐことも可能です。この場合、Datadog では上記のモニターを過去 24 時間以内にこの割り当ての 80% に達したらアラートが発信されるようセットアップすることを推奨しています。
1 日の割り当て数に達すると、イベントが生成されます。この際に通知を受信するよう、モニターをセットアップします。

{{< img src="logs/guide/daily_quota_monitor.png" alt="1 日の割り当て数をモニター"  style="width:70%;">}}

Slack で受信する通知の例:

{{< img src="logs/guide/daily_quota_notification.png" alt="1 日の割り当て数に関する通知"  style="width:70%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/logs_to_metrics/#recommended-usage-metrics
[2]: https://app.datadoghq.com/logs/pipelines/generate-metrics
[3]: /ja/monitors/monitor_types/anomaly/
[4]: https://app.datadoghq.com/metric/summary?filter=datadog.estimated_usage.logs.ingested_bytes&metric=datadog.estimated_usage.logs.ingested_bytes
[5]: https://app.datadoghq.com/monitors#create/anomaly
[6]: /resources/json/estimated_log_usage_dashboard_configuration.json
[7]: https://app.datadoghq.com/logs
[8]: /ja/logs/explorer/search/
[9]: /ja/logs/indexes/#set-daily-quota