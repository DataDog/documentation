---
aliases:
- /ja/monitors/monitor_types/
- /ja/monitors/create/types/
description: モニターの作成
further_reading:
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知
- link: /monitors/manage/
  tag: ドキュメント
  text: モニターの管理
kind: documentation
title: モニターの作成
---

## 概要

Datadog でモニターを作成するには

1. **Monitors** > **New Monitor** の順に移動します。
2. アラートを出したいテレメトリーの種類に対応する[モニタータイプ](#monitor-types)を選択します。
3. [モニターを構成します][1]。

プログラムでモニターを作成するには、[Datadog API][2] または[コミュニティが維持するライブラリ][3]を参照してください。

## モニターのエクスポートとインポート

モニターのステータスページから、モニターの定義を含む JSON ファイルをダウンロードすることができます。設定歯車 (右上) をクリックし、メニューから **Export** を選択します。

メインナビゲーションで *Monitors --> New Monitor --> Import* を選択して、Datadog に [JSON モニター定義をインポート][4]します。

## モニターの種類

{{< whatsnext desc="モニタータイプを選択します:">}}
{{< nextlink href="/monitors/create/types/host" >}}<u>Host</u>: 1 つ以上のホストが Datadog にレポートされているかどうかを確認します。{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/metric" >}}<u>Metric</u>: メトリクスの値をユーザー定義のしきい値と比較します。{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/anomaly" >}}<u>Anomaly</u>: 過去のデータに基づいて、メトリクスの異常な動作を検出します。{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/apm" >}}<u>APM</u>:APM メトリクスの監視やクエリのトレースを行います。{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/audit_logs" >}}<u>Audit Logs</u>: 指定した種類の監査ログが、一定期間内にユーザー定義のしきい値を超えた場合にアラートを発します。{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/ci" >}}<u>CI</u>: Datadog で収集した CI パイプラインとテストのデータを監視します。{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/composite" >}}<u>Composite</u>: 複数のモニターを組み合わせた式でアラートを発します。{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/custom_check" >}}<u>Custom Check</u>: 任意のカスタムチェックのステータスを監視します。{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/error_tracking" >}}<u>Error Tracking</u>: Datadog で収集したアプリケーションの問題を監視します。{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/event" >}}<u>Event</u>: Datadog が収集したイベントを監視します。{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/forecasts" >}}<u>Forecast</u>: あるメトリクスがしきい値を超えると予測される場合にアラートを発します。{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/integration" >}}<u>Integration</u>: 特定のインテグレーションからメトリクス値やヘルスステータスをモニターします。{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/process" >}}<u>Live Process</u>: ホスト上で 1 つまたは複数のプロセスが実行されているかどうかを確認します。{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/log" >}}<u>Logs</u>: 指定した種類のログが、一定期間内にユーザー定義のしきい値を超えた場合にアラートを発します。{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/network" >}}<u>Network</u>: TCP/HTTP エンドポイントのステータスを確認します。{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/outlier" >}}<u>Outlier</u>: あるグループのメンバーが他のメンバーとは異なる行動をとった場合に警告を発します。{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/process_check" >}}<u>Process Check</u>: process.up のサービスチェックで生成されるステータスを見ます。{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/real_user_monitoring" >}}<u>Real User Monitoring</u>: Datadog で収集した実ユーザーのデータを監視します。{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/slo" >}}<u>SLO Alerts</u>: SLO のエラーバジェットとバーンレートを監視します。{{< /nextlink >}}
{{< nextlink href="/synthetics/guide/synthetic-test-monitors" >}}<u>Synthetic Monitoring</u>: Synthetic テスト実行からメトリクスの値やテストのステータスを監視します。{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/watchdog" >}}<u>Watchdog</u>: Watchdog が異常な動作を検出した際に通知を受けます。{{< /nextlink >}}
{{< /whatsnext >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/create/configuration
[2]: /ja/api/v1/monitors/
[3]: /ja/developers/community/libraries/#managing-monitors
[4]: https://app.datadoghq.com/monitors#create/import