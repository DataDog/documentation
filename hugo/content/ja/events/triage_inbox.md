---
aliases:
- /ja/service_management/events/triage_inbox/
further_reading:
- link: /events/ingest/
  tag: ドキュメント
  text: イベントを Datadog に送信する
- link: /events/correlation/
  tag: ドキュメント
  text: イベント相関について詳しく学ぶ
- link: https://www.datadoghq.com/blog/datadog-event-management/
  tag: ブログ
  text: AIOps を活用した Event Management により、アラートの集約、相関付け、対応を迅速化する
site_support_id: case_management
title: Event Management トリアージインボックス
---
## 概要{#overview}

Datadog Event Management の[トリアージインボックス][4]は、あらゆるソースからの関連イベントを実用的な作業項目に統合することで、インシデント対応を簡素化します。この一元化されたビューにより、ノイズが低減され、チームはより効率的にトリアージ、調査、および連携を行えるようになります。カスタマイズ可能な保存済みビューを使用すると、優先度の高い作業項目に集中し、関連付けられたアラート、関連する変更、テレメトリをすべて 1 か所で確認できます。

## 作業項目のトリアージと調査{#triaging-and-investigating-work-items}

作業項目のトリアージと調査は、受信した作業項目を並べ替え、フィルタリング、管理できるトリアージインボックスから始まります。Datadog の利用有無にかかわらずチームメンバーと連携し、対応を調整できます。さらに、必要に応じて作業項目の優先順位付け、担当者の割り当て、調査、エスカレーションを行い、迅速な解決を推進します。

{{< img src="/events/triage_inbox/event_mgmt_inbox.mp4" alt="Event Management インボックス、優先度による並べ替え、ステータスと優先度の変更を強調表示する機能" video=true >}}

## はじめに{#getting-started}

1. [{{< ui >}}Event Management{{< /ui >}} > {{< ui >}}Triage Inbox{{< /ui >}}][4] に移動します。
2. 左側のパネルからプロジェクトを選択すると、{{< ui >}}Open{{< /ui >}}、{{< ui >}}In Progress{{< /ui >}}、{{< ui >}}Closed{{< /ui >}}、{{< ui >}}Archived{{< /ui >}} などの標準的なステータスビューが表示されます。
3. 表示設定アイコンを使用して、{{< ui >}}split view{{< /ui >}} (作業項目の詳細な調査用) または {{< ui >}}table view{{< /ui >}} (作業項目の一括確認および列の設定用) のいずれかを選択します。{{< ui >}}Sort By{{< /ui >}} ドロップダウンを使用してインボックスの並び順をカスタマイズします。オプションには、{{< ui >}}Priority{{< /ui >}}、{{< ui >}}Created at{{< /ui >}}、または {{< ui >}}Last Updated{{< /ui >}} があります。[{{< ui >}}Save{{< /ui >}}] をクリックすると、カスタマイズしたインボックス設定を保存して次回以降も利用できます。
5. トリアージ中に、作業項目カード上で直接ステータス、優先度、担当者を更新できます。
6. 左側の作業項目プロジェクトパネルと Datadog ナビゲーションバーを折りたたむことで、画面の表示領域を広く確保できます。
7. 作業項目カードの**アラート**数にカーソルを合わせると、関連するアラートをプレビューできます。

## 次のステップ{#next-steps}

作業項目のトリアージや調査の方法を理解できたら、これらのツールを使用してチームと[コラボレーション](#collaborate-and-integrate)し、根本原因に対して[アクション](#take-action)し、対応作業の効率化を図りましょう。

## コラボレーションと統合{#collaborate-and-integrate}

右側の分割ビューサイドパネルでは、以下の操作を実行できます。

- {{< ui >}}Tag and comment{{< /ui >}}: ユーザーをタグ付けしたりメモを追加したりして、作業項目のタイムラインでチームメイトとコラボレーションします。
- {{< ui >}}Send notifications{{< /ui >}}: Slack、Microsoft Teams、メール、または Webhook を使用して関係者にアラートします。
- {{< ui >}}Escalate issues{{< /ui >}}: [Incident Management][1]、[On-Call][2]、[Workflow Automation][3]、またはサードパーティツールを使用して、インシデントをトリガーするか、オンコールの担当者を呼び出します。
- {{< ui >}}Sync with external tools{{< /ui >}}: Jira および ServiceNow のレコードを同期させ、外部の関係者に最新情報を提供します。

   {{< img src="/events/triage_inbox/event_mgmt_inbox_right_hand_panel.png" alt="Escalate ドロップダウンが強調表示されている Event Management Inbox の右側パネル" style="width:100%;" >}}

## アクション{#take-action}

- {{< ui >}}Mark root cause{{< /ui >}}: 不具合の原因となった変更などの関連イベントを、根本原因として特定しマークします。
- {{< ui >}}Run workflows{{< /ui >}}: 修復ランブックを手動で実行するか、[Work Item Automation Rules][5]を使用して条件付きでトリガーします。
- {{< ui >}}Merge work items{{< /ui >}}: 関連する作業項目を結合して、調査を効率化します。
- {{< ui >}}Split work items{{< /ui >}}: 個別の調査が必要なアラートを分離します。

**注**: 作業項目内のすべてのアラートが解決されると、システムは自動的にその作業項目をクローズします。また、作業項目を手動で解決済みとしてマークすることも可能です。

## 関連資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/incident_response/incident_management/
[2]: /ja/incident_response/on-call/
[3]: /ja/actions/workflows/
[4]: https://app.datadoghq.com/event/correlation
[5]: /ja/incident_response/work_management/automation_rules/