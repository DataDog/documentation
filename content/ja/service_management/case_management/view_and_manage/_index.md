---
further_reading:
- link: service_management/case_management/settings
  tag: ドキュメント
  text: ケース設定
kind: ドキュメント
title: ケースの表示と管理
---

## 概要

{{< img src="/service_management/case_management/view_and_manage/view_and_manage_overview_cropped.png" alt="Case Management page showing view of all cases, option to select status, and view assigned members" style="width:100%;" >}}

[Case Management ページ][1]では、ケースを作成日、ステータス、優先度で並べ替えることができます。デフォルトでは、ケースは作成日順に並べ替えられます。

プロジェクト内のケースを一括編集するには、チェックボックスを使用して 1 つ以上のケースを選択します。その後、ドロップダウンメニューを使用して、ステータス管理、割り当て、アーカイブなどのアクションを一括して実行します。ケースを別のプロジェクトに移動すると、ケースには新しいケース ID が割り当てられます。古いケースの URL は新しいケースにリダイレクトされません。

## キーボードショートカット
以下のキーボードショートカットを使用すると、素早くナビゲーションを行うことができます。

| アクション              | ショートカット       |
| ------------------  | ----------     |
| 上に移動             | `↑` または `K`     |
| 下に移動           | `↓` または `J`     |
| ケースを選択         | `X`            |
| 選択したケースを表示  | `Enter` または `O` |
| ケースの作成       | `C`            |
| ステータスを設定          | `S`            |
| ユーザーに割り当てる      | `A`            |
| 優先度を設定        | `P`            |
| プロジェクトへ移動     | `V`            |
| アーカイブ/アーカイブ解除 | `E`            |

## ケースを検索

プロジェクト内では、以下でケースを検索できます。
- **属性キーと値のペア**: 例えば、Event Correlation パターンから作成されたすべてのケースを見つけるには、`creation_source:Event Management` を検索します。個々のイベントから作成されたケースを見つけるには、`creation_source:Event` を検索します。
- **タイトル**: 検索語を二重引用符で囲みます。例えば、タイトルに "kubernetes pods" という用語を含むすべてのケースを見つけるには、`"kubernetes pods."` を検索します。

より複雑なクエリを作成するには、大文字と小文字を区別するブール演算子 `AND`、`OR`、`-` (除外) を使用できます。例えば、`priority:(P2 OR P3)` は優先度が `P2` または `P3` のケースを返します。

さらに、左上のグローバル検索バーを使用して、すべてのプロジェクトでケースを検索できます。

## ビューの作成

**ビュー**とは、保存されたクエリフィルターのことで、これを使用することでケースのリストを自分に最も関係のあるものに絞り込むことができます。プロジェクトには、オープン、進行中、クローズ、アーカイブ済みのステータスごとにデフォルトのビューがあります。さらに、自分に割り当てられたケースと自分が作成したケースのデフォルトビューがあります。

カスタムビューを作成するには
1. プロジェクト内から **Add View** を選択します。
1. ビューに名前をつけます。
1. 検索ボックスで、クエリを入力します。プレビューが更新され、現在の検索クエリに一致するケースが表示されます。
1. (Optional) Send a notification with third-party tools such as Slack, Microsoft Teams, PagerDuty, or Webhooks. Click **+ Add Recipient Type** and select from the pre-configured channels or recipients. See [Create notifications and tickets ][2] to learn more about the available tools and options.
1. Click **Save view**.

## Case details

{{< img src="/service_management/case_management/view_and_manage/case_details_overview.png" alt="Case detail view of an example case that was escalated" style="width:100%;" >}}

The Case Details page acts as the single source of truth on what is going on with the investigation. Each case has the following properties: 

Status
: All cases default to open upon creation. As you progress through the case, you can change it to in progress and closed. Type `S` to change the status of a case. 

Priority
: By default, a priority is not defined. You can set the priority of the case to P1 - Critical, P2 - High, P3 - Medium, P4 - Low, P5 - Info. Type `P` to set the priority of a case. 

Assignee
: Unassigned by default. To assign it to a user, type `A`. To assign it to yourself, type `I`. 

Attributes
: Adding attributes allow for organization and filtering. By default, all cases have the following attributes: team, datacenters, services, environments, and versions. 

Archiving
: Archiving a case removes it from searches. Type `E` to archive a case.

Activity timeline
: Each case automatically creates an activity timeline to capture real-time updates to status, assignee, priority, signals, and any comments added. If you're tagged in a comment, you receive an email. Type `M` to add a comment and `Cmd + Enter` to submit it.

## Take action

Use Case Management to gather information, context, and resources to determine the proper action to take. This includes further investigation, escalating to an incident, or closing out a case.

From an individual case:
- [Create an investigative notebook][3]: Gather investigation information and collaborate with your team members.
- [Declare an incident][4]: Escalate a case to an incident and kick off your incident response process. 
- Manually create a Jira issue: Use `Shift + J` to create a Jira issue. For more information on how to configure automatic Jira issue creation and bidirectional synchronization, see the [Settings][5] documentation. 
- Manually create a ServiceNow incident: Use `Shift + N` to create a ServiceNow incident. 
- [Meet on CoScreen][6]: Share screens for collaborative debugging 
- Close out the case: Let the team know that no further action is needed. Update the status of the case to closed.

## Case Analytics

{{< img src="/service_management/case_management/view_and_manage/view_and_manage_case_analytics.png" alt="Graph editor showing the cases options selected as a data source" style="width:100%;" >}}

Case Analytics is a queryable data source for aggregated case statistics. You can query these analytics in a variety of graph widgets in both [Dashboards][7] and [Notebooks][3] to analyze team productivity and identify patterns in issues. 

The following widgets support Case Analytics: timeseries, top list, query value, table, tree map, pie chart, change, and list. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cases
[2]: /ja/service_management/case_management/create_notifications_and_third_party_tickets
[3]: /ja/notebooks/
[4]: /ja/service_management/incident_management/#describing-the-incident
[5]: /ja/service_management/case_management/settings/#jira
[6]: /ja/coscreen/
[7]: https://docs.datadoghq.com/ja/dashboards/