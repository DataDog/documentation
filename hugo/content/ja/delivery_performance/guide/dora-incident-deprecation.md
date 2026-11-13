---
description: 'DORA Metrics におけるインシデントの取り込みとレポート機能の廃止: スケジュール、影響を受けるユーザー、およびインシデントレポートの移行方法。'
further_reading:
- link: /delivery_performance/dora_metrics/change_failure_detection/
  tag: ドキュメント
  text: 変更失敗検出について
- link: /incident_response/incident_management/analytics_and_reporting/
  tag: ドキュメント
  text: Incident Management Analytics でインシデントをレポートする
- link: /delivery_performance/dora_metrics/
  tag: ドキュメント
  text: DORA Metrics について
private: true
title: DORA Metrics におけるインシデントの取り込みとレポート機能の廃止
---
**2026 年 12 月 31 日**以降、DORA Metrics はインシデントデータの取り込みや表示を行わなくなります。また、**2027 年 3 月 31 日**以降、DORA Metrics に保存されているインシデントにアクセスできなくなります。これは以下の項目に影響します。

- DORA Metrics のインシデントビュー
- DORA インシデント API
- [DORA Metrics 設定][1]内の PagerDuty および Datadog インシデントデータソース
- DORA インシデントデータを使用するすべてのダッシュボード、ノートブック、または保存されたクエリ

これは、Change Failure Rate および Failed Deployment Recovery Time の計算方法には影響しません。これらはインシデントイベントではなく、[Change Failure Detection][2] を使用しているためです。

[Datadog Incident Management][3] にインシデントやインシデント履歴がある場合、それらも影響を受けません。DORA Metrics とは独立して、それらを宣言、管理、およびレポートできます。

##  データソース別の対応 {#actions-by-data-source}

必要な対応は、組織が以下のいずれかを使用して DORA Metrics でインシデントデータを送信または取得しているかどうかによって異なります。

- DORA Metrics 設定の **Datadog インシデント**データソース
- DORA Metrics 設定の **PagerDuty** データソース
- **DORA インシデント API** (`POST /api/v2/dora/incident`)

### Datadog インシデントデータソース {#datadog-incidents-data-source}

DORA Metrics 設定の **Datadog インシデント** データソースからのインシデントは、DORA Metrics ではなく Datadog Incident Management に保存されます。インシデント履歴は Incident Management で引き続き利用できるため、2027 年 3 月 31 日のエクスポート期限は適用されません。

ダッシュボード、ノートブック、または保存済みクエリが DORA インシデントデータを参照している場合は、2026 年 12 月 31 日までに [Incident Management Analytics][4] を使用するように更新します。それ以外の場合、対応は不要です。

### PagerDuty データソースまたは DORA インシデント API {#pagerduty-data-source-or-dora-incident-api}

DORA Metrics 設定の **PagerDuty** データソースまたは **DORA インシデント API** からのインシデントは DORA Metrics に保存されるため、両方の日付が適用されます。インシデントのレポートと履歴を保持するには、以下の手順を行います。

1. 2026 年 12 月 31 日まで
   -  インシデント取り込みエンドポイント (`POST /api/v2/dora/incident`) およびインシデント削除エンドポイントへの呼び出しを削除します。
   -  インシデントデータの欠落を防ぐため、進行中のレポートを [ 代替手段 ](#alternatives-for-incident-reporting) のいずれかに移行します。
1. 2027 年 3 月 31 日まで
   - 保持したいインシデント履歴を [インシデントイベント API][5] でエクスポートするか、ダッシュボードデータを CSV としてダウンロードします。
   - DORA インシデントデータを参照するダッシュボード、ノートブック、または保存済みクエリを更新または削除します。

## インシデントレポートの代替手段 {#alternatives-for-incident-reporting}

| インシデントソース | 代わりに使用するもの |
| --- | --- |
| Datadog Incident Management | [Incident Management Analytics][4] |
| PagerDuty | トリガーされたイベントと解決されたイベントをイベントエクスプローラーに取り込む [Datadog PagerDuty インテグレーション][6]。このインシデントは、DORA Metrics の PagerDuty データソースとは別個のものです。|
| API 経由で送信されるカスタムインシデントイベント | クエリやダッシュボード用にイベントをイベントエクスプローラーに送信するための [Datadog イベント API][7]。Datadog でインシデントを宣言および管理するには、[Datadog Incident Management][3] を使用します。|

<div class="alert alert-info">これらの代替手段はインシデントレポートのみをサポートしています。これらは、<a href="/delivery_performance/dora_metrics/change_failure_detection/">Change Failure Detection</a> を使用する DORA 安定性メトリクスには反映されません。</div>

## タイムライン {#timeline}

| 日付 | 変更 |
| --- | --- |
| 2026 年 12 月 31 日 | DORA Metrics でのインシデントの受け入れが停止されます: <br>- インシデントの取り込みおよび削除 API が無効になります。<br>- DORA Metrics の PagerDuty データソースによるインシデントの転送が停止されます。<br>- Datadog インシデントのデータが DORA Metrics に表示されなくなります。<br>この日付より前に取り込まれたインシデントは、2027 年 3 月 31 日まで閲覧およびエクスポートが可能です。Datadog は、[DORA Metrics 設定][1]からインシデント構成を削除します。|
| 2027 年 3 月 31 日 | DORA Metrics を通じて以前に送信されたインシデントは、閲覧やエクスポートができなくなります。|

## ヘルプの入手 {#get-help}

影響の評価やインシデントレポートの更新に関するヘルプが必要な場合は、[Datadog サポート][8]までお問い合わせください。

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/settings/dora
[2]: /ja/delivery_performance/dora_metrics/change_failure_detection/
[3]: /ja/incident_response/incident_management/
[4]: /ja/incident_response/incident_management/analytics_and_reporting/
[5]: /ja/api/latest/dora-metrics/get-a-list-of-incident-events/
[6]: /ja/integrations/pagerduty/
[7]: /ja/api/latest/events/post-an-event/
[8]: /ja/help/