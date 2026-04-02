---
aliases:
- /ja/monitors/monitor_types/
- /ja/monitors/create/types/
- /ja/monitors/create/#monitor-types
- /ja/monitors/create/
description: モニターの種類
further_reading:
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知
- link: /monitors/manage/
  tag: ドキュメント
  text: モニターの管理
- link: https://www.datadoghq.com/blog/datadog-github-deployment-protection-rules/
  tag: ブログ
  text: GitHub Deployment Protection Rules と Datadog で品質チェックの失敗を検出する
- link: https://learn.datadoghq.com/courses/getting-started-monitors
  tag: ラーニングセンター
  text: Datadog モニターを作成、構成、使用して、問題を未然に防ぐ
title: モニターの種類
---

{{< whatsnext desc="モニターの種類を選択してください:">}}
{{< nextlink href="/monitors/types/host" >}}<strong>Host</strong>: 1 つ以上のホストが Datadog にデータを送信しているかを確認します。{{< /nextlink >}}
{{< nextlink href="/monitors/types/metric" >}}<strong>Metric</strong>: メトリクスの値をユーザー定義のしきい値と比較します。{{< /nextlink >}}
{{< nextlink href="/monitors/types/anomaly" >}}<strong>Anomaly</strong>: 過去のデータに基づいて、メトリクスの異常な動作を検出します。{{< /nextlink >}}
{{< nextlink href="/monitors/types/apm" >}}<strong>APM</strong>:APM メトリクスの監視やクエリのトレースを行います。{{< /nextlink >}}
{{< nextlink href="/monitors/types/audit_trail" >}}<strong>Audit Trail</strong>: 指定した種類の監査ログが、一定期間内にユーザー定義のしきい値を超えた場合にアラートを発します。{{< /nextlink >}}
{{< nextlink href="/monitors/types/change-alert" >}}<strong>Change Alert</strong>: 一定期間における絶対値または相対値の変化がユーザー定義のしきい値を超えた場合にアラートします。{{< /nextlink >}}
{{< nextlink href="/monitors/types/ci" >}}<strong>CI</strong>: Datadog で収集した CI パイプラインおよびテストデータを監視します。{{< /nextlink >}}
{{< nextlink href="/monitors/types/cloud_cost" >}}<strong>Cloud Cost</strong>: クラウドプラットフォームに関連するコストの変化を監視します。{{< /nextlink >}}
{{< nextlink href="/monitors/types/composite" >}}<strong>Composite</strong>: 複数のモニターを組み合わせた式でアラートを発します。{{< /nextlink >}}
{{< nextlink href="/monitors/types/database_monitoring" >}}<strong>Database Monitoring</strong>: Datadog によって収集されたクエリの実行および実行計画のデータを監視します。{{< /nextlink >}}
{{< nextlink href="/monitors/types/error_tracking" >}}<strong>Error Tracking</strong>: Datadog で収集したアプリケーションの問題を監視します。{{< /nextlink >}}
{{< nextlink href="/monitors/types/event" >}}<strong>Event</strong>: Datadog が収集したイベントを監視します。{{< /nextlink >}}
{{< nextlink href="/monitors/types/forecasts" >}}<strong>Forecast</strong>: あるメトリクスがしきい値を超えると予測される場合にアラートを発します。{{< /nextlink >}}
{{< nextlink href="/monitors/types/integration" >}}<strong>Integration</strong>: 特定のインテグレーションのメトリクス値や正常性ステータスを監視します。{{< /nextlink >}}
{{< nextlink href="/monitors/types/process" >}}<strong>Live Process</strong>: ホスト上で 1 つまたは複数のプロセスが実行されているかどうかを確認します。{{< /nextlink >}}
{{< nextlink href="/monitors/types/log" >}}<strong>Logs</strong>: 指定した種類のログが、一定期間内にユーザー定義のしきい値を超えた場合にアラートを発します。{{< /nextlink >}}
{{< nextlink href="/monitors/types/network" >}}<strong>Network</strong>: TCP/HTTP エンドポイントのステータスを確認します。{{< /nextlink >}}
{{< nextlink href="/monitors/types/cloud_network_monitoring" >}}<strong>Cloud Network Monitoring</strong>: ネットワークトラフィックに対してアラートを設定します。{{< /nextlink >}}
{{< nextlink href="/monitors/types/netflow" >}}<strong>NetFlow</strong>: NetFlow 対応デバイスからのフローレコードを監視します。{{< /nextlink >}}
{{< nextlink href="/monitors/types/outlier" >}}<strong>Outlier</strong>: あるグループのメンバーが他のメンバーとは異なる行動をとった場合にアラートを発します。{{< /nextlink >}}
{{< nextlink href="/monitors/types/process_check" >}}<strong>Process Check</strong>: process.up のサービスチェックで生成されるステータスを監視します。{{< /nextlink >}}
{{< nextlink href="/monitors/types/real_user_monitoring" >}}<strong>Real User Monitoring</strong>: Datadog で収集した実ユーザーのデータを監視します。{{< /nextlink >}}
{{< nextlink href="/monitors/types/service_check" >}}<strong>Service Check</strong>: 任意のカスタムチェックのステータスを監視します。{{< /nextlink >}}
{{< nextlink href="/monitors/types/slo" >}}<strong>SLO Alerts</strong>: SLO のエラーバジェットとバーンレートを監視します。{{< /nextlink >}}
{{< nextlink href="/monitors/types/synthetic_monitoring" >}}<strong>Synthetic Monitoring</strong>: Synthetic テストモニターを使用します。{{< /nextlink >}}
{{< nextlink href="/monitors/types/watchdog" >}}<strong>Watchdog</strong>: Watchdog が異常な動作を検出した際に通知を受け取ります。{{< /nextlink >}}
{{< /whatsnext >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}