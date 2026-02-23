---
further_reading:
- link: service_management/events/
  tag: ドキュメント
  text: イベント管理
title: Status Events
---

<div class="alert alert-info">Status Events は <a href="/monitors/status/status_page">暫定の Monitor Status Page</a> の一部です。従来のステータス ページを使用している場合は、<a href="/monitors/status/status_legacy">Status Page (Legacy)</a> のドキュメントを参照してください。</div>

## 概要

{{< img src="/monitors/status/status_page_event_details.png" alt="イベントの詳細が表示された Monitor ステータス ページ" style="width:100%;" >}}

お使いの Monitor で生成されたすべてのイベントは、Monitor のステータス ページに表示され、グループ名、イベント種別、タイムスタンプが表示されます。Event timeline にも、ダウンタイムや監査証跡のイベントが含まれます。

各イベントごとに、Quick Actions にアクセスしたり、ダッシュボードやログなどの関連アセットを表示したりできます。

## Event details セクション

関連するタグやアクションを含む、各イベントの詳細を確認するには:

1. Monitor ステータス ページで、**Event timeline** までスクロールします。
2. タイムライン内のイベントをクリックして、イベントの詳細を表示します。

Event details を活用して Monitor アラートを理解し、根本原因を特定します。この情報は対応者のワークフローを支援し、進行中の状況を把握するのに役立ちます。

### 復旧に向けてアクションを実行

Quick Actions を使うと、ステータス ページから離れずにアクションを起こせます。コンテキストが自動的に追加されるため、対応者の時間を節約できます。

| アクション | 説明 |
| :---- | :---- |
| Mute  | Monitor アラートをミュートするための [ダウンタイム][1] を作成します。 |
| Resolve | 次回の評価まで Monitor のステータスを `OK` に一時的に設定します。 |
| Declare Incident | Monitor アラートを [Incident Management][2] でエスカレーションします。 |
| Create Case | Datadog を離れずにこのアラート調査を追跡するための [ケース][3] を作成します。 |
| Run Workflow | あらかじめ定義されたスニペットを用いて [Workflow][4] Automation を実行し、緩和アクションを実行します。 |

### Resolve

ステータス ページの [Header][5] または Event details セクションから、Monitor アラートを解決できます。Event details セクションから解決した場合は、選択したイベントに関連するグループのみに影響します。一方、Header から解決すると、アラート内のすべてのグループが解決され、Monitor のステータスが `OK` (全グループ) に設定されます。

現在のデータが `ALERT` 状態に相当するために Monitor がアラート発報中の場合、`resolve` を使用すると、状態は一時的に `ALERT` から `OK` に切り替わり、その後 `ALERT` に戻ります。したがって、`resolve` はアラートを承認したり、Datadog に無視させたりする目的ではありません。

データが断続的に報告される場合、Monitor を手動で解決するのが有効です。たとえば、アラートがトリガーされた後に Monitor がデータの受信を停止し、アラート条件を評価できず `OK` 状態に復帰できないことがあります。このような場合は、`resolve` 機能、または `Automatically resolve monitor after X hours` により、Monitor を `OK` 状態に戻せます。

**代表的なユース ケース**: エラーがないと指標が生成されないタイプの Monitor (`aws.elb.httpcode_elb_5xx`、または、エラーがある場合にのみエラーを報告するあなたのコード内の任意の DogStatsD カウンター)。

## Event troubleshooting セクション

{{< img src="/monitors/status/events/event_troubleshooting.png" alt="Dependency Map の例を含む Event troubleshooting" style="width:100%;" >}}

各イベントに対して、対応者がアラートのコンテキストを素早く理解できるよう、トラブルシューティング情報にアクセスできます。

| トラブルシューティング コンポーネント     | 説明    |
| ---  | ----------- |
| Dependency Map | サービス タグが使用可能な場合 (Monitor タグとして、またはグループ内)、依存関係のステータスを示す Dependency Map にアクセスできます。 |
| Change Tracking | サービス タグが使用可能な場合 (Monitor タグとして、またはグループ内)、あなたのサービスとその依存関係に関連する変更の一覧にアクセスできます。サポートされる変更の種類や設定要件の詳細は、[Change Tracking][6] のドキュメントを参照してください。 |


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/downtimes/?tab=bymonitorname
[2]: /ja/service_management/incident_management/
[3]: /ja/service_management/case_management/
[4]: /ja/service_management/workflows/trigger/#trigger-a-workflow-from-a-monitor
[5]: /ja/monitors/status/status_page/#header
[6]: /ja/change_tracking