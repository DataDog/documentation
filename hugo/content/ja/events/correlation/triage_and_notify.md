---
aliases:
- /ja/service_management/events/correlation/triage_and_notify/
further_reading:
- link: events/correlation/
  tag: ドキュメント
  text: イベント相関について
title: トリアージと通知
---
{{< img src="events/correlation/triage/triage.png" alt="[event] (イベント) サイドパネル付きのケース詳細ページ。ケースから相関イベントを調査し、関連するメトリクスを分析します" style="width:100%;" >}}

Event Management は関連イベントを相関させ、それらを単一の作業項目に自動的に統合します。関連するログ、関連するメトリクス、およびアラートを監視するモニターのすべてのコンテキストを取り込み、一箇所で問題のトリアージとトラブルシューティングを行います。

[Correlation][1] (相関) ページから、分析するパターンを見つけ、同じ行の末尾にある [{{< ui >}}Triage Work Items{{< /ui >}}] (作業項目のトリアージ) をクリックします。ページ上部の [{{< ui >}}Work Management{{< /ui >}}] (作業管理) をクリックして、[Work Management][2] で相関イベントを含むすべてのワークアイテムを表示することもできます。Datadog は関連するメトリクスとログを取り込むため、すべての関連データを一箇所にまとめて問題のトラブルシューティングを行うことができます。

## Event Management 作業項目{#event-management-work-item}

| 機能 | 説明 | 
| ------  | ----------- | 
| 優先度 | 相関アラートの最も高い優先度 |
| 属性 | 相関イベントからのタグ。ユーザーによる更新はエンジンによって上書きされません |
| ステータス | システムによって自動的に管理され、ユーザーによる更新はシステムによって上書きされます。作業項目は、基盤となるすべてのアラートが復旧すると自動的に解決済になり、最大生存時間期間内にいずれかのアラートが再トリガーされると自動的に再度未解決になります |
| 削除 | アラートのチェックボックスを選択して、不要なアラートを削除できます。削除されたアラートが再度相関付けされることはありません |
| エンリッチされたアラート | 一部の作業項目は、Datadog がインフラストラクチャーに基づいて関連があると判断したインテリジェントなアラートを用いて自動的にエンリッチされます。エンリッチされたアラートは、作業項目の属性、優先度、およびステータスには影響しません |


Work Management の操作の詳細については、[Work Management のドキュメント][5]を参照してください。

### 調査 {#investigation}
1. 作業項目の概要から、[{{< ui >}}Investigation{{< /ui >}}] (調査) をクリックします
1. [{{< ui >}}Correlations{{< /ui >}}] (相関) セクションでは、アラートとイベントを一覧表示できます。
1. 任意のアラートまたはイベントをクリックすると、アラートのコンテキストで関連するメトリクスやログがすべて表示されます
1. (オプション) 作業項目に関連しないアラートやイベントを削除したい場合は、選択して除外します
1. [{{< ui >}}Related Metrics{{< /ui >}}] (関連メトリクス) セクションでは、すべての関連メトリクスを比較したり、タグでグループ化したりできます。


## 通知またはチケットの作成 {#create-a-notification-or-ticket}

相関イベントを用いて、1 つのグループに対して 1 つの通知を設定できます。そのため、20 件の通知と調査すべき 20 件の潜在的な問題の代わりに、1 つの作業項目と 1 つの通知で済ませることができます。[Work Management Projects] (Work Management プロジェクト) ページですべてのアラートを統合します。Work Management では、通知をグループ化する方法がいくつかあります。

### チケット発行 {#ticketing}

[{{< ui >}}Project Settings{{< /ui >}}] (プロジェクト設定) ページで、プロジェクトの通知先となる統合を設定します。Datadog は、手動および自動のチケット作成と双方向同期を行う以下のものとの統合をサポートしています。
- ServiceNow
- Jira

設定方法の詳細については、[Work Management 設定][3] のドキュメントを参照してください。

## 通知 {#notifications}

Work Management では、設定されたクエリに基づいて作業項目がグループ化されて_表示_されます。このクエリに一致する作業項目が作成されたときの通知を設定できます。Datadog は [{{< ui >}}Pagerduty{{< /ui >}}]、[{{< ui >}}Email{{< /ui >}}]、[{{< ui >}}Webhook{{< /ui >}}]、[{{< ui >}}Microsoft Teams{{< /ui >}}]、および [{{< ui >}}Slack{{< /ui >}}] をサポートしています。ビューの作成方法については、[Work Management ビュー][4] のドキュメントを参照してください。

**注**: 複数の通知を削除するには、基盤となるモニターを再設定する必要があります。モニターイベントをグループ化しても、個々の通知はミュートされません。


[1]: https://app.datadoghq.com/event/correlation
[2]: https://app.datadoghq.com/work?query=status%3AOPEN%20creation_source%3AEVENT_MANAGEMENT&page=1&page-size=25&sort=created_at
[3]: /ja/incident_response/work_management/settings#set-up-integrations
[4]: /ja/incident_response/work_management/view_and_manage#create-a-view
[5]: /ja/incident_response/work_management/view_and_manage