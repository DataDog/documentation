---
description: Datadog アラートによってトリガーされるエンドツーエンドプロセスを自動化します。Jira や Slack と連携するワークフローを作成し、問題解決を迅速化します。
further_reading:
- link: https://www.datadoghq.com/blog/automate-end-to-end-processes-with-datadog-workflows/
  tag: ブログ
  text: Datadog Workflows でエンドツーエンドのプロセスを自動化し、イベントに迅速に対応する
- link: /actions/workflows/access_and_auth/
  tag: ドキュメント
  text: アクセスと認証
- link: /security/cloud_security_management/workflows/
  tag: ドキュメント
  text: セキュリティワークフローの自動化
title: Workflow Automation を始める
---
## 概要 {#overview}

Workflow Automation を使用すると、Datadog アラートやセキュリティシグナルに応じて、エンドツーエンドの処理を自動化できます。Workflow Automation はリアルタイムのオブザーバビリティデータを活用しており、問題の迅速な解決や、システムの可用性とセキュリティのプロアクティブな維持を可能にします。

このガイドに従って、モニターアラートによってトリガーされるカスタムワークフローを作成してください。トリガーされると、ワークフローは Jira でタスクを作成し、Jira チケットへのリンクを Slack に通知します。このガイドでは、ワークフローのステップ間でデータを渡す方法、ワークフローの保存と公開、ワークフローの実行履歴の表示について説明します。

## 前提条件 {#prerequisites}

開始する前に、[Datadog アカウント][1]に Jira および Slack インテグレーションがインストールされている必要があります。インストール手順については、[Slack][2] および [Jira インテグレーション][3]のドキュメントを参照してください。

Jira および Slack のインテグレーションタイルで設定したアカウントの資格情報や認証は、Workflow Automation の Jira および Slack アクションに自動的に反映されます。一部のインテグレーションでは、認証のために追加の構成が必要です。詳しくは、[コネクション][4]を参照してください。

## ワークフローを構築する {#build-the-workflow}

### モニタートリガーを使用するワークフローを作成する {#create-a-workflow-with-a-monitor-trigger}
ワークフローは、モニターやセキュリティシグナルなどのアラート、スケジュール、または手動でトリガーできます。このケースでは、モニタートリガーを使用するワークフローを作成します。

ワークフローを作成する:
1. [{{< ui >}}Workflow Automation{{< /ui >}}][5] ページから、{{< ui >}}New Workflow{{< /ui >}} をクリックします。
1. ワークフローの名前と説明を入力します。このワークフローの例では、次の名前と説明を使用します。<br>
   名前: `Create a Jira Ticket`。<br>
   説明: `Create a Jira issue and Slack notification when there is a monitor alert`。

モニターを追加して構成する:
1. ワークフローキャンバスで {{< ui >}}Add Trigger{{< /ui >}} をクリックし、{{< ui >}}Monitor{{< /ui >}} を選択します。
1. {{< ui >}}Configure{{< /ui >}} タブで、`@workflow-` の横にワークフローの一意の ID を入力します。`Create-Jira-Ticket`。<br>
   ワークフローハンドルは常に `@workflow-` で始まります。後でこのハンドルを使用してワークフローをモニター通知に接続します。
1. {{< ui >}}Save{{< /ui >}} をクリックしてワークフローを保存します。

{{< img src="/getting_started/workflow_automation/trigger1.png" alt="ワークフローのトリガー">}}

### Jira および Slack アクションを追加する {#add-the-jira-and-slack-actions}
Jira ステップを追加して構成する:
1. ワークフローキャンバスで、{{< ui >}}\+{{< /ui >}} アイコンをクリックします。
1. Jira アクションを検索し、{{< ui >}}Create issue{{< /ui >}} を選択します。
1. ワークフローキャンバスで、{{< ui >}}Create issue{{< /ui >}} ステップをクリックします。
1. {{< ui >}}Configure{{< /ui >}} タブで、{{< ui >}}Jira Account{{< /ui >}} を選択します。アカウントは、Jira インテグレーションタイルの {{< ui >}}Accounts{{< /ui >}} セクションにある Jira URL に対応している必要があります。
1. ワークフローが作成する Jira の問題の {{< ui >}}Project{{< /ui >}} および {{< ui >}}Issue type{{< /ui >}} を入力します。
1. コンテキスト変数を使用してワークフローをトリガーするモニターからデータを渡し、Jira の問題の {{< ui >}}Summary{{< /ui >}} および {{< ui >}}Description{{< /ui >}} を入力します。ステップ内でコンテキスト変数にアクセスするには、二重中括弧 (`{{`) で囲みます。<br><br>
   以下の説明例では、ソース、トリガー、およびワークフローの変数を使用して次を渡します。
   - モニターアラートをトリガーしたソース
   - 影響を受けたモニターへのリンク
   - ワークフロー名およびワークフロー ID

   ```
   The CPU usage is above the 95% threshold for {{ Trigger.hostname }}

   調査 - すべてのワークフロー実行を表示するには、この Datadog ダッシュボードを参照してください。
   https://app.datadoghq.com/dash/integration/workflow_automation?refresh_mode=sliding&from_ts=1698164453793&to_ts=1698168053793&live=true

   この Jira の問題を作成したワークフローは次のとおりです。
   {{ WorkflowName }} :{{ WorkflowId }}

   このワークフローをトリガーしたモニターはこちらから確認できます。{{ Source.url }}
   ```

   For more information on context variables, see [Context variables][6].

1. Test the Jira action by clicking {{< ui >}}Test{{< /ui >}} in the {{< ui >}}Configure{{< /ui >}} tab. Testing the action creates a real Jira ticket.
1. Click {{< ui >}}Save{{< /ui >}} to save your workflow.

Next, add the Slack step:
1. Click the plus icon on the workflow canvas to add another step.
1. Search for Slack and select {{< ui >}}Send message{{< /ui >}}.
1. Enter the {{< ui >}}Slack Workspace name{{< /ui >}}.
1. Enter the {{< ui >}}Slack Channel name{{< /ui >}}.
1. For a more useful Slack notification, use step output variables. Step output variables allow you to pass data from the Jira step to the Slack step in your workflow. Use the following message text to include the Jira issue key, the monitor name, and the Jira issue in the Slack message:

   ```
   モニター名 {{ Source.monitor.name }} がトリガーされ、新しい Jira の問題が作成されました。
   {{ Steps.Create_issue.issueKey }}:{{ Steps.Create_issue.issueUrl }}

   この Jira の問題を作成したワークフローは次のとおりです。 {{ WorkflowName }}
   ```

1. To test the action, click {{< ui >}}Test{{< /ui >}} in the {{< ui >}}Configure{{< /ui >}} tab. Testing an action creates a real Slack message.
1. To view your workflow's name in the monitor's notification dropdown, save and publish your workflow. Click {{< ui >}}Publish{{< /ui >}} from the workflow's page.

## Test and publish the workflow 

<div class="alert alert-info">Testing a workflow connected to active Slack and Jira accounts creates actual Slack messages and Jira tickets.</div>

Click {{< ui >}}Save{{< /ui >}} to apply your changes to the workflow. Next, manually trigger the workflow to test it.

To trigger the workflow manually, click {{< ui >}}Run{{< /ui >}} from the workflow page, and enter the values for the trigger variables.

{{< img src="/getting_started/workflow_automation/run_workflow.png" alt="ワークフローを手動でトリガーする" style="width:90%;" >}}

ワークフローを実行すると Jira チケットが作成されて Slack メッセージが送信されることを確認します。

スケジュール設定されたワークフローやトリガーされるワークフローは、公開するまで自動的にはトリガーされません。ワークフローを公開するには、ワークフローのページから {{< ui >}}Publish{{< /ui >}} をクリックします。

## ワークフローをトリガーするモニターを更新する {#update-the-monitor-that-triggers-your-workflow}

1. Datadog の [{{< ui >}}Monitors{{< /ui >}} ページ][7]に移動します。
1. ワークフローのトリガーに使用するモニターを検索して編集するか、新しいモニターを作成します。
1. {{< ui >}}Configure notifications & automations{{< /ui >}} セクションで、{{< ui >}}Add Workflow{{< /ui >}} をクリックします。
1. ワークフローのメンション名 (`@workflow-Create-Jira-Ticket`) を使用してワークフローを検索し、ドロップダウンから選択します。
   - 構文 `@workflow-name(key=value, key=value)` を使用して、カンマ区切りのリストでトリガー変数をワークフローに渡すことができます。例: `@workflow-Create-Jira-Ticket(hostname={{host.name}})`。
1. {{< ui >}}Test Notifications{{< /ui >}} をクリックして、ワークフローとこのモニターのすべての通知をテストします。
1. モニターを保存します。

{{< img src="/getting_started/workflow_automation/monitor_trigger.png" alt="モニターからワークフローをトリガーする">}}

モニターのしきい値に達するたびに、モニターはワークフローの実行をトリガーします。

## 実行履歴 {#run-history}

ワークフローをトリガーした後、その進行状況を確認し、失敗したステップを {{< ui >}}Run History{{< /ui >}} ビューでデバッグできます。実行されたステップを選択して、入力、出力、実行コンテキスト、およびエラーメッセージを確認します。以下の例は、無効な Jira の構成が原因で失敗したステップを示しています。

{{< img src="/getting_started/workflow_automation/testing_the_workflow.mp4" alt="ワークフローテストのプレビュー" style="width:100%" video=true >}}

ワークフローを編集するには、{{< ui >}}Configuration{{< /ui >}} をクリックします。実行履歴ビューに戻るには、{{< ui >}}Run History{{< /ui >}} をクリックします。

以前のワークフロー実行のリストと各実行の成功または失敗を表示するには、最初の実行履歴ビューを使用します。ワークフローキャンバスをクリックすると、いつでも最初の実行履歴に戻ることができます。

## 結論 {#conclusion}

モニターがワークフローをトリガーすると、エンジニアリングチームが確認するための Jira の問題が作成されます。Jira チケットの例を以下に示します。

{{< img src="/getting_started/workflow_automation/jira_ticket.png" alt="ワークフローから生成される Jira チケット">}}

このワークフローでは、Jira の問題とモニターアラートをチームに通知するための Slack メッセージも作成されます。Slack 通知の例を以下に示します。

{{< img src="/getting_started/workflow_automation/slack-message.png" alt="ワークフローから生成される Slack メッセージ">}}

## 次のステップ{#whats-next}

* [Action Catalog][8] で、利用可能なすべてのワークフローアクションのリストを確認します。
* すぐに使える[ブループリント][9]からワークフローを構築します。
* [HTTP アクション][10]を使用して、任意のエンドポイントにリクエストを送信します。
* [データ変換][11]アクションを実装して、ワークフローを流れる情報に必要な操作を実行します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: /ja/integrations/slack/
[3]: /ja/integrations/jira/
[4]: /ja/actions/connections/
[5]: https://app.datadoghq.com/workflow
[6]: /ja/workflows/build/#context-variables
[7]: https://app.datadoghq.com/monitors/manage
[8]: /ja/actions/actions_catalog/
[9]: /ja/workflows/build
[10]: /ja/actions/workflows/actions/#http
[11]: /ja/actions/workflows/actions/#data-transformation