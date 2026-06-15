---
further_reading:
- link: /service_management/incident_management/incident_settings
  tag: ドキュメント
  text: Incident Settings で通知をカスタマイズする
- link: /monitors/notify/variables/?tab=is_alert
  tag: ドキュメント
  text: モニター通知変数
title: インシデント通知
---

## 概要

インシデントに関するすべてのステークホルダーへの通知は、インシデントの **Notifications タブ** に集約されます。このページから通知を手動で作成し、下書きとして保存し、直接送信できます。該当インシデントに対して[通知ルール][1]から送信された自動通知もこのセクションに表示されます。

## 通知を追加

手動通知を作成するには:
1. インシデントの **Notifications タブ** に移動します。
1. セクション右上の **+ New Notification** ボタンをクリックします。
1. 通知先を入力します。これには、メール、Slack チャネル、PagerDuty ハンドル、Webhook など、Datadog がサポートするあらゆる通知ハンドルを指定できます。
1. [メッセージ テンプレート](#message-template)を選択します。
1. Markdown と `{{` を入力して使用可能なインシデント テンプレート変数を利用し、通知のタイトルとメッセージを編集します。
    - [テンプレート変数][2]はインシデントのプロパティに基づきます。メッセージが送信される前に、すべてのテンプレート変数は、送信時にメッセージで利用可能な参照先プロパティの値に置き換えられます。
1. `{{incident.created}}` 変数を使用してメッセージのタイムゾーンをカスタマイズできます。このテンプレート変数では、タイムゾーンを設定するオプションが表示されます。
1. 通知を送信するか、下書きとして保存します。

## すべての通知を表示

{{< img src="/service_management/incidents/notification/incident_notifications_sent.png" alt="Notifications タブに表示される送信済メッセージの例一覧" style="width:90%;" >}}

インシデントの **Notifications タブ** では、通知が **Drafts** と **Sent** に分類されます。両リストには次の情報が表示されます:
- 通知の (予定された) 受信者
- 通知メッセージおよび送信済みの再通知メッセージの内容
- 通知が最後に更新された日時
- 通知の作成者

**Sent** リストには、通知が手動で送信されたか、[通知ルール](#customizable-rules)によって自動送信されたかも表示されます。自動通知の場合は、トリガーとなったルールが表示されます。

## 通知ルールをカスタマイズする

通知ルールを使用すると、インシデントの条件に基づいてステークホルダーに自動通知できます。一致条件には、インシデントの重大度、影響を受けるサービス、ステータス、根本原因カテゴリ、特定リソース名などがあります。例えば、SEV‑1 インシデントが発生するたびにリーダーシップ チームにメールで自動通知するルールを設定できます。このルールにより、インシデントを宣言する担当者は、シナリオごとに関与すべき相手を把握しておく必要がありません。

新しい通知ルールの設定方法については、[インシデント設定][1]のドキュメントを参照してください。

## メッセージ テンプレート

メッセージ テンプレートは、[手動インシデント通知](#add-a-notification)や自動[通知ルール](#customize-notification-rules)で利用できる、動的かつ再利用可能なメッセージです。`{{incident.severity}}` などのテンプレート変数を使用して、通知対象インシデントの対応する値を動的に挿入します。メッセージ テンプレートは Markdown をサポートしているため、インシデント通知にテキストの書式設定、テーブル、インデント付きリスト、ハイパーリンクを含めることができます。テンプレート変数はメッセージのタイトルと本文の両方で使用できます。

メッセージ テンプレートの作成方法については、[インシデント設定][3]のドキュメントを参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/service_management/incident_management/incident_settings/notification_rules
[2]: /ja/monitors/notify/variables/?tab=is_alert
[3]: /ja/service_management/incident_management/incident_settings/templates