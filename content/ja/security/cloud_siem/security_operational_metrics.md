---
disable_toc: false
further_reading:
- link: security/cloud_siem/investigate_security_signals
  tag: ドキュメント
  text: Cloud SIEM Security Signals の調査
- link: getting_started/dashboards
  tag: ドキュメント
  text: ダッシュボードの使用開始
- link: getting_started/monitors
  tag: ドキュメント
  text: モニターの使用開始
- link: metrics/summary/
  tag: ドキュメント
  text: Metrics Summary について詳しく知る
title: セキュリティ オペレーショナル メトリクス
---

## 概要

Cloud SIEM は、クラウド環境に対するセキュリティ脅威への対応および解決におけるチームの有効性を判断するためのセキュリティ オペレーショナル メトリクスを提供します。これらのメトリクスは、デフォルトの [Cloud SIEM ダッシュボード][1] に表示され、Cloud SIEM の [週次ダイジェスト レポート][2] でも送信されます。また、これらのメトリクス用のダッシュボードやモニターを作成することもできます。

{{< img src="security/security_monitoring/secops_metrics.png" alt="Cloud SIEM Overview ダッシュボードの セキュリティ オペレーショナル メトリクス セクション" style="width:100%;" >}}

## オペレーショナル メトリクス

``datadog.security.siem_signal.time_to_detect``
: **名前**: Time to Detect (TTD)
: **説明**: 一致するログがトリガーされてからシグナルが生成されるまでの時間 (秒)。
: **メトリクス タイプ**: [DISTRIBUTION][3]

``datadog.security.siem_signal.time_to_acknowledge``
: **名前**: Time to Acknowledge (TTA)
: **説明**: シグナルがトリガーされてからそのシグナルの調査が開始されるまでの時間 (秒)。
: **メトリクス タイプ**: [DISTRIBUTION][3]

``datadog.security.siem_signal.time_to_resolve``
: **名前**: Time to Resolve (TTR)
: **説明**: 検知の通知を受けてからシグナルをクローズするまでに要した時間 (秒)。
: **メトリクス タイプ**: [DISTRIBUTION][3]

## メトリクスの計算方法

TTD、TTA、TTR の各メトリクスは、以下のタイムスタンプに基づいて計算されます。

1. セキュリティ シグナルをトリガーするログのタイムスタンプ (`T0`)
1. シグナルが生成されたタイムスタンプ (`T1`)
1. シグナル ステータスが `under_review` に変更されたタイムスタンプ (`T2`)
1. シグナル ステータスが `archived` に変更されたタイムスタンプ (`T3`)

| メトリクス                                                                                | 計算方法 |
| ------------------------------------------------------------------------------------- | ---------------------------- |
| Time to Detect (TTD)<br>``datadog.security.siem_signal.time_to_detect``           | `T1 - T0`                    |
| Time to Acknowledge (TTA)<br>``datadog.security.siem_signal.time_to_acknowledge`` | `T2 - T1`                    |
| Time to Resolve (TTR)<br>``datadog.security.siem_signal.time_to_resolve``         | `T3 - T1`                    |

## メトリクスの探索、可視化、モニタリング

[Metrics Summary][3] を使用して、オペレーショナル メトリクスのメタデータやタグを確認できます。また、これらのメトリクスを使用しているダッシュボード、ノートブック、モニター、SLO も確認できます。

タグを使用してメトリクスを特定のチーム、ソース、環境でフィルタリングし、必要に応じてそれらのメトリクスの [ダッシュボード][5] を作成してデータを可視化したり、[モニター][6] を作成してメトリクスが指定したしきい値を超えた際にアラートを受け取ったりできます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30378/cloud-siem-overview
[2]: https://app.datadoghq.com/security/configuration/reports
[3]: /ja/metrics/types/?tab=distribution#metric-types
[4]: https://app.datadoghq.com/metric/summary?filter=datadog.security.siem&window=604800
[5]: /ja/getting_started/dashboards/
[6]: /ja/getting_started/monitors/