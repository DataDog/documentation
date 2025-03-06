---
further_reading:
- link: service_management/events/correlation/
  tag: ドキュメント
  text: イベントの相関付けについて
title: トリアージと通知
---

{{< img src="service_management/events/correlation/triage/triage.png" alt="イベントのサイドパネルが表示されたケース詳細ページ。ケースから相関されたイベントを調査し、関連メトリクスを分析する" style="width:100%;" >}}

Event Management は、関連するイベントを相関付けして自動的に単一のケースにまとめます。関連ログ、関連メトリクス、アラートモニターなど、関連情報をすべて取り込み、1 つの場所でインシデントをトリアージ (振り分けと優先度付け) し、トラブルシュートを行うことができます。

[Correlation][1] ページから、分析したいパターンを探し、同じ行の末尾にある **Triage Cases** をクリックします。あるいは、ページ上部の **Case Management** をクリックすると、[Case Management][2] で相関されたイベントが含まれるすべてのケースを表示できます。Datadog は関連するメトリクスやログを取り込み、関連データを一元的に利用しながら問題をトラブルシュートできるようにします。

## Event Management Case

{{< img src="service_management/events/correlation/triage/event_management_case_detail.png" alt="ケースの詳細ページ - 概要" style="width:100%;" >}}


| 機能 | 説明 | 
| ------  | ----------- | 
| 優先度 | 相関されたアラートの中で最も高い優先度 |
| 属性 | 相関されたイベントからのタグ。ユーザーによる更新はエンジンにより上書きされません |
| ステータス | システムによって自動的に管理されます。ユーザーによるステータス更新はシステムによって上書きされます。すべての元となるアラートが復旧するとケースは自動的に解決され、最大アライブ時間 (生存期間) 内にアラートが再度トリガーされると自動的に再オープンされます。 |
| Deletion | アラートのチェックボックスを選択して、不要なアラートを削除できます。削除されたアラートは再度相関されることはありません |
| Enriched Alerts | 一部のケースでは、Datadog がインフラストラクチャー情報に基づき関連していると判断したインテリジェントアラートが自動的に追加されます。これらのアラートはケースの属性、優先度、ステータスには影響しません |


ケース管理における操作の詳細については、[Case Management のドキュメント][5]を参照してください。

### 調査
1. ケースの Overview (概要) 画面で、**Investigation** をクリックします。
1. Correlations セクションでは、アラートとイベントの一覧を確認できます。
1. 任意のアラートまたはイベントをクリックすると、アラートの文脈で関連するメトリクスやログをすべて参照できます。
1. (オプション) ケースに関連しないアラートやイベントを削除したい場合は選択して除外します。
1. Related Metrics セクションでは、すべての関連メトリクスを比較したり、タグでグループ化したりできます。


## 通知またはチケットの作成

相関されたイベントを利用すると、グループごとに 1 つの通知を設定できます。そのため、20 件の通知と 20 件の潜在的なインシデントを調査する代わりに、単一のケースと 1 件の通知ですべてをまとめて管理できます。Case Management のプロジェクトページでアラートを一括して扱うことが可能です。Case Management で通知をグルーピングする方法はいくつかあります。

### チケット発行

Project Settings ページで、プロジェクトが通知を送信する先のインテグレーションを設定します。Datadog は以下のインテグレーションをサポートしており、手動・自動でのチケット作成と双方向同期が可能です。
- ServiceNow
- Jira

設定方法の詳細については、[Case Management Settings][3] のドキュメントを参照してください。

## 通知

ケース管理では、views (ビュー) を使って構成されたクエリに基づきケースをグループ化できます。特定のクエリにマッチするケースが作成された際に通知を行うよう設定できます。Datadog は **Pagerduty**、**Email**、**Webhook**、**Microsoft Teams**、**Slack** に対応しています。ビューの作成方法については [Case Management Views][4] のドキュメントを参照してください。

**注**: 重複する通知を削除するには、ベースとなるモニターを再設定する必要があります。モニターイベントをグルーピングしても、個別の通知がミュート (抑制) されるわけではありません。


[1]: https://app.datadoghq.com/event/correlation
[2]: https://app.datadoghq.com/cases?query=status%3AOPEN%20creation_source%3AEVENT_MANAGEMENT&page=1&page-size=25&sort=created_at
[3]: /ja/service_management/case_management/settings#set-up-integrations
[4]: /ja/service_management/case_management/view_and_manage#create-a-view
[5]: /ja/service_management/case_management/view_and_manage