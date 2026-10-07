---
description: ステータスページで、クイックアクション、イベント詳細、トラブルシューティングツールなどのモニターイベントを表示し、管理します。
further_reading:
- link: events/
  tag: ドキュメント
  text: Event Management
title: ステータスイベント
---
<div class="alert alert-info">ステータスイベントは、<a href="/monitors/status/status_page">暫定的なモニターステータスページ</a>に含まれます。従来のステータスページをご利用の場合は、<a href="/monitors/status/status_legacy">ステータスページ (レガシー)</a> のドキュメントを参照してください。</div>

## 概要 {#overview}

{{< img src="/monitors/status/status_page_event_details.png" alt="イベント詳細が表示されているモニターステータスページ" style="width:100%;" >}}

モニターによって生成されたすべてのイベントが、モニターのステータスページに表示され、グループ名、イベントタイプ、タイムスタンプが示されます。イベントタイムラインには、ダウンタイムイベントや監査証跡イベントも含まれます。

各イベントについて、クイックアクションにアクセスしたり、ダッシュボードやログなどの関連アセットを表示したりすることができます。

## [Event details] (イベント詳細) セクション {#event-details-section}

関連付けられているタグやアクションなど、個々のイベントの詳細情報を確認するには、次のようにします。

1. モニターのステータスページから、[{{< ui >}}Event timeline{{< /ui >}}] (イベントタイムライン) まで下にスクロールします。
2. タイムライン内のイベントをクリックすると、イベントの詳細が表示されます。

イベント詳細を使用して、モニターアラートを把握し、根本原因を特定します。この情報は、対応者のワークフローをサポートし、現状を把握するために役立ちます。

### 修復アクションの実行 {#take-action-to-remediate}

クイックアクションを使用すると、ステータスページから直接アクションを実行できます。コンテキストが自動的に追加されるので、対応者の作業時間短縮になります。

| アクション | 説明 |
| :---- | :---- |
| {{< ui >}}Mute{{< /ui >}}  | モニターアラートをミュートするための [ダウンタイム][1] を作成します。|
| {{< ui >}}Resolve{{< /ui >}} | 次回の評価まで、モニターのステータスを一時的に `OK` に設定します。|
| {{< ui >}}Declare Incident{{< /ui >}} | [Incident Management][2] を使用してモニターアラートをエスカレーションします。|
| {{< ui >}}Create Work Item{{< /ui >}} | Datadog から移動せずに、このアラートに関する調査を追跡するための [作業項目][3] を作成します。|
| {{< ui >}}Run Workflow{{< /ui >}} | 事前定義されたスニペットを使用して [Workflow][4] Automation を実行し、緩和アクションを実行します。|

### 解決 {#resolve}

ステータスページの [ヘッダー][5] または [Event details] (イベント詳細) セクションからモニターアラートを解決できます。[Event details] セクションから解決した場合は選択したイベントに関連するグループのみに影響しますが、ヘッダーから解決した場合はアラート内のすべてのグループが解決され、モニターのステータスが `OK` (すべてのグループ) に設定されます。

現在のデータが `ALERT` 状態に該当するためにモニターからアラートが生成されている場合は、`resolve` を使用すると、状態が一時的に `ALERT` から `OK` に変更された後、`ALERT` に戻ります。したがって、`resolve` はアラートを確認するためや、Datadog にアラートを無視するよう指示するためには使用できません。

データが断続的に報告される場合は、モニターを手動で解決すると役立ちます。たとえば、アラートがトリガーされた後、モニターがデータの受信を停止したために、アラート条件を評価して `OK` 状態に戻れなくなる場合があります。そのような場合は、`resolve` 機能または [{{< ui >}}Automatically resolve monitor after X hours{{< /ui >}}] (X 時間後に自動的にモニターを解決する) を使用すると、モニターが `OK` 状態に戻ります。

**典型的なユースケース**: エラーがない場合は生成されないエラーメトリクスに基づくモニター (`aws.elb.httpcode_elb_5xx`、または、_エラーがある場合にのみ_エラーを報告するコード内の DogStatsD カウンタ)。

## イベントのトラブルシューティングセクション {#event-troubleshooting-section}

{{< img src="/monitors/status/events/event_troubleshooting.png" alt="依存関係マップの例を使用したイベントのトラブルシューティング" style="width:100%;" >}}

対応者は各イベントのトラブルシューティング情報にアクセスして、アラートのコンテキストを迅速に理解することができます。

| トラブルシューティングコンポーネント     | 説明    |
| ---  | ----------- |
| {{< ui >}}Dependency Map{{< /ui >}} | サービスタグがモニタータグとして、またはグループ内で使用可能な場合は、依存関係のステータスを示す依存関係マップにアクセスできます。|
| {{< ui >}}Change Tracking{{< /ui >}} | サービスタグがモニタータグとして、またはグループ内で使用可能な場合は、サービスとその依存関係に関連する変更のリストにアクセスできます。サポートされている変更の具体的な種類とセットアップ要件の詳細については、[Change Tracking][6] のドキュメントを参照してください。|


## 関連資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/downtimes/?tab=bymonitorname
[2]: /ja/incident_response/incident_management/
[3]: /ja/incident_response/work_management/
[4]: /ja/actions/workflows/trigger/#trigger-a-workflow-from-a-monitor
[5]: /ja/monitors/status/status_page/#header
[6]: /ja/change_tracking