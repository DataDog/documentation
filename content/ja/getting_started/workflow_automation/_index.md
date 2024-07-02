---
further_reading:
- link: https://www.datadoghq.com/blog/automate-end-to-end-processes-with-datadog-workflows/
  tag: ブログ
  text: Datadog Workflows でエンドツーエンドプロセスを自動化し、イベントに迅速に対応する
- link: /service_management/workflows/access/
  tag: ドキュメント
  text: アクセスと認証
- link: /security/cloud_security_management/workflows/
  tag: ドキュメント
  text: セキュリティワークフローの自動化
title: Workflow Automation を始める
---

## 概要

Workflow Automation を使用すると、Datadog のアラートやセキュリティシグナルに対応してエンドツーエンドのプロセスを自動化することができます。Workflow Automation は、リアルタイムの観測可能性データによって駆動されるため、問題を迅速に解決し、システムの可用性とセキュリティをプロアクティブに維持することができます。

このガイドに従って、モニターアラートによってトリガーされるカスタムワークフローを作成します。トリガーされると、ワークフローは Jira でタスクを作成し、Jira チケットへのリンクを含む通知を Slack に送信します。このガイドでは、ワークフローのあるステップから別のステップへのデータの渡し方、ワークフローの保存と公開、ワークフローの実行履歴の表示について説明します。

## 前提条件

始める前に、[Datadog アカウント][1]に Jira と Slack のインテグレーションをインストールする必要があります。インストール手順については、[Slack][2] と [Jira インテグレーション][3]のドキュメントを参照してください。

Jira と Slack のインテグレーションタイルでセットアップしたアカウント資格情報と認証は、Workflow Automation の Jira と Slack のアクションに自動的に反映されます。インテグレーションによっては、認証のための追加構成が必要です。詳細については、[接続][4] を参照してください。

## ワークフローの構築

### モニタートリガーによるワークフローの作成
ワークフローのトリガーは、モニターやセキュリティシグナルなどのアラート、 スケジュール、または手動で行うことができます。この場合、モニタートリガーによるワークフローを作成します。

ワークフローを作成します。
1. **[Workflow Automation][5]** ページから、**New Workflow** をクリックします。
1. ワークフローの名前と説明を入力します。ワークフローの例では、以下の名前と説明を使用しています。<br>
   名前: `Create a Jira Ticket`<br>
   説明: `Create a Jira issue and Slack notification when there is a monitor alert`

モニターを追加して構成します。
1. ワークフローキャンバスで、**Add Trigger** をクリックし、**Monitor, Incident, or Security Signal** を選択します。
1. **Configure** タブの `@workflow-` の横に、ワークフローの一意の ID `Create-Jira-Ticket` を入力します。<br>
   ワークフローハンドルは常に `@workflow-` で始まります。後で、このハンドルを使用して、ワークフローをモニター通知に接続します。
1. **Save** をクリックして、ワークフローを保存します。

{{< img src="/getting_started/workflow_automation/trigger1.png" alt="ワークフローのトリガー">}}

### Jira と Slack のアクションを追加する
Jira ステップを追加して構成します。
1. ワークフローキャンバスで、**+** アイコンをクリックします。
1. Jira アクションを検索し、**Create issue** を選択します。
1. ワークフローキャンバスで、**Create issue** ステップをクリックします。
1. **Configure** タブで、**Jira Account** を選択します。アカウントは、Jira インテグレーションタイルの **Accounts** セクションにある Jira URL に対応している必要があります。
1. ワークフローが作成する Jira 課題の **Project** と **Issue type** を入力します。
1. ワークフローのトリガーとなるモニターからのデータを渡すためにコンテキスト変数を使用して、Jira 課題の **Summary** と **Description** を入力します。二重中括弧 (`{{`) で囲むことで、ステップ内のコンテキスト変数にアクセスできます。<br><br>
   以下の記述例では、ソース、トリガー、ワークフロー変数を使用して、以下を伝達します。
   - モニターアラートのトリガーとなったソース
   - 影響を受けたモニターへのリンク
   - ワークフロー名、ワークフロー ID

   ```
   The CPU usage is above the 95% threshold for {{ Trigger.hostname }}

   Please investigate - see this Datadog Dashboard to view all workflow executions:
   https://app.datadoghq.com/dash/integration/workflow_automation?refresh_mode=sliding&from_ts=1698164453793&to_ts=1698168053793&live=true.

   The workflow that created this Jira issue is
   {{ WorkflowName }} : {{ WorkflowId }}

   The monitor that triggered the workflow can be found here: {{ Source.url }}
   ```

   コンテキスト変数の詳細については、**[コンテキスト変数][6]**を参照してください。

1. Jira アクションをテストするには、**Configure** タブの **Test** をクリックします。アクションをテストすると、実際の Jira チケットが作成されます。
1. **Save** をクリックして、ワークフローを保存します。

次に、Slack のステップを追加します。
1. ワークフローキャンバスのプラスアイコンをクリックして、別のステップを追加します。
1. Slack を検索し、**Send message** を選択します。
1. **Slack Workspace name** を入力します。
1. **Slack Channel name** を入力します。
1. より便利な Slack 通知を行うには、ステップ出力変数を使用します。ステップ出力変数を使用すると、ワークフローの Jira ステップから Slack ステップにデータを渡すことができます。次のメッセージテキストを使用して、Slack メッセージに Jira 課題キー、モニター名、Jira 課題を含めます。

   ```
   The monitor named {{ Source.monitor.name }} triggered and created a new Jira issue
   {{ Steps.Create_issue.issueKey }}: {{ Steps.Create_issue.issueUrl }}

   The workflow that created this Jira issue is {{ WorkflowName }}
   ```

1. アクションをテストするには、**Configure** タブの **Test** をクリックします。アクションをテストすると、実際の Slack メッセージが作成されます。
1. モニターの通知ドロップダウンにワークフローの名前を表示するには、ワークフローを保存して公開します。ワークフローのページから **Publish** をクリックします。

## ワークフローのテストと公開

<div class="alert alert-info">アクティブな Slack と Jira のアカウントに接続されたワークフローをテストすると、実際の Slack メッセージと Jira チケットが作成されます。</div>

**Save** をクリックし、ワークフローに変更を適用します。次に、手動でワークフローをトリガーしてテストします。

ワークフローを手動でトリガーするには、ワークフローページから **Run** をクリックし、トリガー変数の値を入力します。

{{< img src="/getting_started/workflow_automation/run_workflow.png" alt="ワークフローの手動トリガー" style="width:90%;" >}}

ワークフローを実行すると、Jira チケットが作成され、Slack メッセージが送信されることを確認します。

スケジュールおよびトリガーによるワークフローは、公開するまで自動的にトリガーされません。ワークフローを公開するには、ワークフローのページから **Publish** をクリックします。

## ワークフローをトリガーするモニターの更新

1. Datadog の [Monitors ページ][7]に移動します。
1. ワークフローのトリガーに使用するモニターを検索して編集するか、新しいモニターを作成します。
1. メッセージセクションで、アラート通知にワークフローの完全なメンション名を追加します。メンション名は `@workflow-` で始まります。例えば、`@workflow-Create-Jira-Ticket` です。
    - ワークフローにトリガー変数を渡すには、`@workflow-name(key=value, key=value)` という構文のカンマ区切りリストを使用します。例えば、`@workflow-Create-Jira-Ticket(hostname={{host.name}})` のようになります。
1. ワークフローとこのモニターのすべての通知をテストするには、**Test Notifications** をクリックします。
1. モニターを保存。

{{< img src="/getting_started/workflow_automation/monitor_trigger.png" alt="モニターからワークフローをトリガー">}}

モニターのしきい値に達するたびに、モニターはワークフローの実行をトリガーします。

## 実行履歴

ワークフローをトリガーした後、**Run History** ビューで進捗状況を確認したり、失敗したステッ プをデバッグすることができます。実行されたステップを選択すると、入力、出力、実行コンテキスト、エラーメッセージを確認できます。以下の例は、無効な Jira 構成のために失敗したステップを示しています。

{{< img src="/getting_started/workflow_automation/testing_the_workflow.mp4" alt="ワークフローテストのプレビュー" style="width:100%" video=true >}}

ワークフローを編集するには、**Configuration** をクリックします。実行履歴ビューに戻るには、**Run History** をクリックします。

以前のワークフロー実行のリストや、各実行の成功・失敗を確認するには、初期の実行履歴ビューを使用します。ワークフローキャンバスをクリックすることで、いつでも初期の実行履歴に戻ることができます。

## 考察

モニターがワークフローをトリガーすると、エンジニアリングチームがレビューできるように Jira 課題が作成されます。以下に Jira 課題の例を示します。

{{< img src="/getting_started/workflow_automation/jira_ticket.png" alt="ワークフローから生成される Jira チケット">}}

ワークフローは、Jira 課題とモニターアラートをチームに通知する Slack メッセージも作成します。以下は Slack の通知例です。

{{< img src="/getting_started/workflow_automation/slack-message.png" alt="ワークフローから生成される Slack メッセージ">}}

## 次のステップ

* [アクションカタログ][8]で、利用可能なすべてのワークフローアクションのリストを確認する。
* すぐに使える[ブループリント][9]からワークフローを構築する。
* [HTTP アクション][10]を使用して、任意のエンドポイントにリクエストを行う。
* [データ変換][11]アクションを実装して、ワークフローを流れる情報に対して必要な処理を実行する。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: /ja/integrations/slack/
[3]: /ja/integrations/jira/
[4]: /ja/service_management/workflows/connections/
[5]: https://app.datadoghq.com/workflow
[6]: /ja/workflows/build/#context-variables
[7]: https://app.datadoghq.com/monitors/manage
[8]: /ja/service_management/workflows/actions_catalog/
[9]: /ja/workflows/build
[10]: /ja/service_management/workflows/actions_catalog/generic_actions/#http
[11]: /ja/service_management/workflows/actions_catalog/generic_actions/#data-transformation