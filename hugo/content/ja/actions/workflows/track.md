---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
aliases:
- /ja/service_management/workflows/track
description: ダッシュボード、監査証跡、イベント管理、および使用属性を使用して、ワークフローのアクティビティ、メトリクス、およびコストを監視することができます。
disable_toc: false
further_reading:
- link: /actions/workflows/build
  tag: ドキュメント
  text: ワークフローの構築
- link: /account_management/audit_trail/
  tag: ドキュメント
  text: Datadog Audit Trail
- link: /account_management/billing/usage_attribution/
  tag: ドキュメント
  text: 使用属性
title: ワークフローを追跡する
---
{{< site-region region="gov2" >}}
<div class="alert alert-info">選択した Datadog サイト ({{< region-param key=dd_site_name >}}) で、Workflow Automation はプレビュー版です。</div>
{{< /site-region >}}

このページでは、さまざまな種類のワークフローアクティビティとワークフローコストを追跡する方法について説明します。

## すぐに使えるダッシュボード{#out-of-the-box-dashboard}

Workflows Overview ダッシュボードにより、Datadog のワークフローと実行の概要を把握できます。ダッシュボードを見つけるには、[Dashboard list][2] に移動して [{{< ui >}}Workflows Overview{{< /ui >}}] を検索します。

{{< img src="actions/workflows/workflows-dashboard.png" alt="Workflows Overview ダッシュボード" style="width:80%;" >}}


## Audit Trail でワークフローの編集と実行を表示する {#view-workflow-edits-and-runs-in-audit-trail}

Audit Trail でワークフローの編集と実行を表示することができます。

たとえば、誰がワークフローを編集したかを確認するには、次のようにします。

1. ワークフローから、右上隅にある <i class="icon-cog-2"></i> **(歯車)** をクリックし、[{{< ui >}}View audit events{{< /ui >}}] をクリックします。<br>ワークフローにフィルタリングされたAudit Trail 検索が開きます。
1. 左側の [{{< ui >}}Core{{< /ui >}}] フィルターの下で、[{{< ui >}}Action{{< /ui >}}] を展開します。
1. [{{< ui >}}Modified{{< /ui >}}] にカーソルを合わせ、[{{< ui >}}Only{{< /ui >}}] をクリックすると、ワークフローの編集のみを表示するように結果がフィルタリングされます。[<br>{{< ui >}}User ID{{< /ui >}}] 列に、各編集を実行したユーザーのユーザー名が表示されます。


## 実行について通知する{#notify-about-runs}

組み込みのワークフロー通知の使用方法については、[ワークフロー通知][3]を参照してください。


## Datadog モニターでワークフローメトリクスを追跡する{#track-workflow-metrics-with-a-datadog-monitor}

Datadog モニターを使用して、さまざまなワークフローメトリクスを追跡できます。

利用可能なメトリクスのリストは次の通りです。

| メトリクス | 説明 |
| ------ | ----------- |
| `datadog.workflows.count`                      | 削除されていないワークフローの数。                      |
| `datadog.workflows.executions.started`         | 開始されたワークフローインスタンスの数。  |
| `datadog.workflows.executions.completed`       | 完了したワークフローインスタンスの数。     |
| `datadog.workflows.steps.executions.started`   | 開始されたワークフローインスタンスステップの数。  |
| `datadog.workflows.steps.executions.completed` | 完了したワークフローインスタンスステップの数。|

一日のワークフロー実行数が特定のしきい値を超えているかどうかを追跡するモニターを作成するには、次の手順を実行します。

1. [[New Monitor][4]] に移動し、[{{< ui >}}Metric{{< /ui >}}] モニタータイプを選択します。
1. [{{< ui >}}Define the metric{{< /ui >}}] の [{{< ui >}}a{{< /ui >}}] に、`datadog.workflows.executions.started` と入力します。
1. _オプションとして_、モニターを特定のワークフローに制限するには、[{{< ui >}}from{{< /ui >}}] に `workflow_id:[WORKFLOW-ID]` と入力します。`[WORKFLOW-ID]` はワークフローの ID で置き換えます。
1. [{{< ui >}}Evaluation Details{{< /ui >}}] に、次の値を指定します。
    - {{< ui >}}Evaluate the{{< /ui >}}: `sum`
    - {{< ui >}}Of the query over the{{< /ui >}}: `last 1 day`.
1. [{{< ui >}}Set alert conditions{{< /ui >}}] に {{< ui >}}above{{< /ui >}} を選択し、アラートのしきい値と警告のしきい値を入力します。たとえば、[{{< ui >}}Alert threshold{{< /ui >}}] に `200`、[{{< ui >}}Warning threshold{{< /ui >}}] に `150` を入力できます。
1. [{{< ui >}}Configure notifications & automations{{< /ui >}}] でワークフローに名前を付け、メッセージテキストを入力します。たとえば、次のようなメッセージテキストを使用できます。

    {{< code-block lang="none" >}}@slack-alert-channel

{{#is_warning}}
Workflow has executed {{warn_threshold}} times in the last day; manual action might be needed to avoid alerting.
{{/is_warning}}
{{#is_alert}}
Workflow has executed {{threshold}} times in the last day, which is our budget threshold for workflows. We should unpublish the workflow to avoid any more automatic executions for the day.
{{/is_alert}}
{{< /code-block >}}
1. [{{< ui >}}Create{{< /ui >}}] をクリックします。


## Event Manager でワークフローイベントを表示する {#view-workflow-events-in-event-manager}

[Event Manager][5] を使用すると、`source:workflow_automation` でフィルタリングしてワークフローの開始イベントと完了イベントを表示できます。

特定のワークフローのイベントを表示するには、[{{< ui >}}Search facets{{< /ui >}}] ボックスで `workflow.workflow_id` を検索します。特定の ID セットを選択して、それらのワークフローのイベントのみを表示することができます。

また、[{{< ui >}}Status{{< /ui >}}] で出力をフィルタリングして、`info`、`warn`、または `error` メッセージのみを表示することもできます。


## 使用属性でワークフローの課金状況を追跡する{#track-workflow-billing-in-usage-attribution}

<div class="alert alert-danger">
使用属性は、Enterprise プランに含まれる高度な機能です。その他のプランをご利用の場合にこの機能をリクエストするには、アカウント担当者または <a href="mailto:success@datadoghq.com">success@datadoghq.com</a> にご連絡ください。
</div>

ワークフロー実行の課金状況を追跡するには、次の手順を実行します。

1. [Usage Attribution][6] ページにアクセスします。
1. 左側の [{{< ui >}}Products{{< /ui >}}] で {{< ui >}}Workflow Executions{{< /ui >}} を検索します。
1. {{< ui >}}Workflow Executions{{< /ui >}} にカーソルを合わせ、[{{< ui >}}Only{{< /ui >}}] をクリックして、ワークフローのみの使用属性を表示します。


## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>ご質問やフィードバックがある場合は、[Datadog Community Slack][1] の **#workflows** チャンネルにご参加ください。


[1]: https://chat.datadoghq.com/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: /ja/actions/workflows/build/#workflow-notifications
[4]: https://app.datadoghq.com/monitors/create
[5]: https://app.datadoghq.com/event/explorer?query=source%3Aworkflow_automation
[6]: https://app.datadoghq.com/billing/usage-attribution