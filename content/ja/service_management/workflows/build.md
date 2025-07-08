---
algolia:
  tags:
  - ワークフロー
  - workflows/
  - ワークフローの自動化
aliases:
- /ja/workflows/build
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: Documentation
  text: Workflow Automation を始める
- link: /service_management/workflows/actions_catalog
  tag: ドキュメント
  text: アクションカタログで利用可能なアクションを参照する
- link: /security/cloud_security_management/workflows
  tag: ドキュメント
  text: Workflow Automation によるセキュリティワークフローの自動化
title: ワークフローの構築
---

You can create workflows or edit existing workflows from the [Workflow Automation][1] page. The page lists information about existing workflows, such as the workflow's owner, the trigger type, the dates that each workflow was last modified and executed, and whether the workflow is published or not.
- Hover over a workflow for the options to delete, clone, or edit the permissions for the workflow.
- 自分が作成したワークフローだけを表示したい場合は、**My workflows** をトグルします。

## ブループリントからワークフローを構築

1. Click the [**Blueprints**][5] tab.
1. 必要に応じて、検索バーを使用して、名前、カテゴリー、インテグレーションでブループリントのリストを絞り込むことができます。
1. 使用したいブループリントを探し、クリックします。ワークフローキャンバスが表示されます。
1. **Create From Blueprint** をクリックします。ワークフローキャンバスが更新され、新しく作成されたワークフローが表示されます。
1. Enter a new name and description for the workflow.
1. Optionally, select or enter tags you'd like to apply to the workflow. For more information on Datadog tags, see [Getting Started with Tags][7].
1. Optionally, select any related [services][8] to apply to the workflow.
1. Optionally, select [teams][9] to associate with the workflow. If a team doesn't exist, you can enter a name to create it.
1. Click **Save** to apply your changes.
1. 更新が必要なワークフローステップには、感嘆符が表示されます。修正したい各ワークフローステップをクリックし、**Configure** タブの空白フィールドを埋めます。
1. ワークフローの修正が完了したら、**Run** をクリックしてワークフローをテストします。
1. ワークフローを公開する準備ができたら、**Publish** をクリックします。公開されたワークフローは、ワークフローの実行に基づいてコストが発生します。詳細は、[Datadog の料金ページ][4]を参照してください。

## Create a workflow with AI

何から始めたらよいかわからない場合は、AI でワークフローを自動生成することができます。ワークフローを生成するには

1. [Workflow Automation][1] ページから、**New Workflow** をクリックします。
1. Click **<i class="icon-bits-ai"></i> Build with Bits AI**.
1. ワークフローの詳細を入力します。使用するインテグレーションとアクションを指定します。
1. 上向き矢印 (**↑**) をクリックしてアプリを作成します。

## カスタムワークフローの作成

To create a workflow, click **New workflow** on the [Workflow Automation][1] page.

To configure your workflow:
1. In the workflow configuration panel, enter a **Name** for your workflow.
1. Optionally, select or enter tags you'd like to apply to the workflow. For more information on Datadog tags, see [Getting Started with Tags][7].
1. Optionally, select any related [services][8] to apply to the workflow.
1. Optionally, select [teams][9] to associate with the workflow. If a team doesn't exist, you can enter a name to create it.
1. ワークフローで入力または出力パラメーターを使用する場合は、それらを入力してください。
1. Click **Save** to apply your changes.

If you're not sure about your workflow configuration, you can return to the panel later by clicking anywhere on the workflow canvas.

### ワークフロービルダーでワークフローを構築する

1. If your workflow requires a trigger, click **Add Trigger**. For more information, see [Trigger a Workflow][3].
1. Click **Add Step** to start adding steps to your workflow.
1. 検索バーを使ってアクションを検索するか、インテグレーションとその関連アクションをブラウズして、探しているアクションを見つけます。アクションをクリックすると、ワークフローキャンバスのステップに追加されます。
1. ワークフローキャンバスでステップをクリックすると、そのステップを構成したり、出力やコンテキスト変数を表示したりすることができます。出力やコンテキスト変数の詳細については、[コンテキスト変数](#context-variables)を参照してください。
1. After you've configured the step, click either the AI icon <i class="icon-bits-ai"></i> or the plus icon (**+**) to add another step, or save the workflow if you're done.
1. ワークフローを公開する準備ができたら、**Publish** をクリックします。公開されたワークフローは、ワークフローの実行に基づいてコストが発生します。詳細は、[Datadog の料金ページ][4]を参照してください。

ワークフロー上のステップをクリックすることで、いつでも編集することができます。ワークフロー上のステップをクリックしてドラッグすると、ステップを並べ替えることができます。

## Test a step

To ensure a step functions as desired without having to run the entire workflow, you can test the step independently.

To test a workflow step:
1. Click **Test** in the step **Inputs** section.
1. Optionally, adjust the step configuration. If your step uses output variables from a previous step, enter some hardcoded test data for the step to use.
1. Click **Test** to test the action.
1. When you're finished testing the step, click **Use in configuration** to use your new configuration in the workflow, or close the screen to return to the workflow without saving your test configuration.

Testing is not available for branching and logic actions. To test a JavaScript function or expression action that uses output variables from a previous step, comment out the variables in your code and replace them with test data. For more information, see [Testing expressions and functions][6].

## ワークフローの公開

スケジュールされたワークフローおよびトリガーされたワークフローは、公開するまで自動的にトリガーされません。ワークフローを公開するには、ワークフローのページから **Publish** をクリックします。

公開されたワークフローは、ワークフローの実行に基づいてコストが発生します。詳細は、[Datadog の料金ページ][4]を参照してください。

## コンテキスト変数

有用なワークフローを作成するためには、あるステップから別のステップにデータを渡したり、ワークフローのトリガーソースからのデータで動作するステップを構成することが必要になることがあります。このようなデータ補間は、コンテキスト変数で行うことができます。

- **ワークフロー変数**は、現在のワークフローに関する情報を提供します。
    - `WorkflowName`: ワークフローの名前。
    - `WorkflowId`: ワークフローの ID。
    - `InstanceId`: ワークフローの実行インスタンスの ID。
- 一部のステップには**ステップ出力変数**が組み込まれており、そのステップからワークフロー内の後続のステップにデータを渡すことができるようになっています。
- **トリガー変数**は、トリガーとなるイベントによってワークフローに渡されます。
- **ソースオブジェクト変数**は、トリガーとなるイベントによってワークフローに渡されます。

各ステップの **Context Variables** タブには、そのステップで利用可能なすべてのコンテキスト変数のマップが表示されます。

{{< img src="service_management/workflows/context-variables4.png" alt="Context Variables タブ" >}}

二重中括弧 (`{{`) で囲んで、ステップ内のコンテキスト変数にアクセスします。コンテキスト変数内のフィールドにアクセスするには、[ハンドルバー式構文][2]を使います。

### ステップ出力変数

ステップによっては、ワークフロー内の後続のステップで利用可能な出力を作成するものもあります。構文 `Steps.<step_name>.<variable>` を使ってステップ変数にアクセスします。例えば、GitHub のプルリクエストステータスステップ (`Get_pull_request_status`) からプルリクエストステータス変数 (`state`) を取得するには、次のコンテキスト変数を使用します。

```
{{ Steps.Get_pull_request_status.state }}
```

探している変数がわからない場合、Datadog は入力中に既存のステップの出力を提案します。また、[Context Variables](#context-variables) タブで利用可能な変数のリストを参照することもできます。

{{< img src="service_management/workflows/step-outputs1.png" alt="Datadog は、入力中に既存のステップの出力を提案します。" style="width:100%;" >}}

### 入力パラメーター

Input parameters are immutable key-value pairs that you can use to pass data into a workflow. You can use input parameters in workflows that:
- ダッシュボードなどから手動でトリガーされる。
- モニターやセキュリティシグナル通知ルールなどのメンショントリガーを使用する。

入力パラメーターを追加するには
1. ワークフローキャンバスをクリックします。
1. **Input Parameters** の横にある **+** アイコンをクリックします。
1. パラメーターのパラメーター名、データタイプ、説明を追加します。表示名はパラメーター名から自動的に生成されます。カスタマイズする場合は、**Use custom display name** ボックスをチェックします。表示名はパラメーターの読みやすい名前であり、パラメーター名はワークフローのステップでパラメーターを参照するために使用されます。
1. オプションで、パラメーターのデフォルト値を追加します。デフォルト値を追加した場合、パラメーターは実行時にオプションとなります。

ステップ内の入力パラメーターを参照するには、`{{ Trigger.<parameter name>}}` という構文を使用します。例えば、`user` という名前の入力パラメーターを参照するには、`{{Trigger.user}}` を使用します。

{{< img src="service_management/workflows/input-parameter2.png" alt="入力パラメーターをステップに追加すると、自動的にワークフローに追加される" style="width:100%;">}}

**Input Parameters** セクションには、既存のすべての入力パラメーターの名前とカウンターが表示されます。カウンターにカーソルを合わせると、そのパラメーターを使用しているステップを確認できます。

暗黙の入力パラメーター (ワークフロー内に存在しないパラメーター) を追加するには、ワークフローのステップに `{{ Trigger.<parameter name> }}` 構文を使用して入力します。次にワークフローを保存すると、パラメーターを明示的パラメーターに変換するためのダイアログが表示されます。ワークフローのトリガーについて詳しくは、[ワークフローのトリガー][3]を参照してください。

既存の入力パラメーターを探している場合は、`{{ Trigger.` と入力して、候補として表示されるかどうかを確認します。また、[Context Variables](#context-variables) タブで利用可能なパラメーターの一覧を確認することもできます。

### ソースオブジェクト変数

ソースオブジェクト変数は、トリガーイベントのプロパティで、実行時に解決されます。ワークフローで利用可能な変数は、ワークフローインスタンスを開始したトリガーのタイプに依存します。例えば、ワークフローインスタンスがモニターによってトリガーされた場合、モニター ID 変数は `{{Source.monitor.id}}` を使って利用することができます。もし、ワークフローがセキュリティシグナル検出または通知ルールによってトリガーされた場合、シグナル ID は `{{Source.securitySignal.id}}` を使用して利用可能です。

ソースオブジェクトのすべての変数が Context Variables タブに表示されます。

{{< img src="service_management/workflows/context-variables-tab-source-object-variables.png" alt="Context Variables タブのソースオブジェクト変数" >}}

## Workflow notifications

You can configure your workflow to send you a notification on success or failure. The following integrations are supported:
- Slack
- Microsoft Teams
- PagerDuty
- Email

To add a notification:
1. In the workflow configuration panel, scroll down to the **Notifications** section.
1. To add a notification if the workflow succeeds:
   1. Click the plus (`+`) icon next to **Notify on success**.
   1. Select the integration that you want to use for notifications.
   1. Complete the required fields for the specified integration.
   1. **Save** をクリックしてワークフローを保存します。
1. To add a notification if the workflow fails:
   1. Click the plus (`+`) icon next to **Notify on failure**.
   1. Select the integration that you want to use for notifications.
   1. Complete the required fields for the specified integration.
   1. **Save** をクリックしてワークフローを保存します。

## Error handling

You can specify the number of times you want your workflow to retry a failed step, and at what interval, before moving on to an optional error path. If no error path is present, the workflow terminates after all retries are exhausted.

### Retries

To configure retries for a step:
1. ワークフローキャンバスのステップをクリックします。
1. In the **Retries** section, adjust the **Interval** and **Max retries** values.
1. ワークフローを保存して、変更を適用します。 

### Add an error path

You can add an error path for the workflow to follow if it encounters an error.

To add an error path:
1. Hover over the step where you'd like to add an error path.
1. Click and drag the **Error path** icon to place a new error path on the canvas.
1. Select a workflow step to add to the error path.
1. After configuring your step, you can add more steps to an error path and even merge your error path back into the main workflow path.
1. When you're done configuring your error path steps, click **Save** to apply your changes.

{{< img src="service_management/workflows/error-path1.mp4" alt="Add an error path to your workflow" video=true >}}

## Wait until condition

Some actions allow you to add a condition that must be met before a workflow can mark a step as complete and continue.

To add a condition:
1. ワークフローキャンバスのステップをクリックします。
1. In the **Wait until condition** section, use the dropdown to select a preconfigured condition, or select **Configure custom wait condition** and build your own conditional.
   - The list of available preconfigured conditions depends on the action.
   - Conditional statement variables can be either a String, a Number, a Boolean, or a step output variable.
   - Only the current step's output variables can be used in a custom conditional statement.
1. Enter a maximum wait time for the workflow. If the condition is not met in time, the step fails.

{{< img src="service_management/workflows/wait-until-condition.png" alt="An example of wait until condition" style="width:100%;" >}}

## JSON でワークフローを編集する

ワークフローのページで **Edit JSON Spec** をクリックすると、JSON でワークフローを編集することができます。また、JSON エディターでは、以下のことが可能です。
- **Format JSON**: JSON を美しくします。
- **Export JSON**: ワークフローをダウンロードします。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#workflows** channel on the [Datadog Community Slack][10].

[1]: https://app.datadoghq.com/workflow
[2]: https://handlebarsjs.com/guide/expressions.html#expressions
[3]: /ja/service_management/workflows/trigger
[4]: https://www.datadoghq.com/pricing/?product=workflow-automation#products
[5]: https://app.datadoghq.com/workflow/blueprints
[6]: /ja/service_management/workflows/actions_catalog/generic_actions/#testing-expressions-and-functions
[7]: /ja/getting_started/tagging/
[8]: /ja/glossary/#service
[9]: /ja/account_management/teams/
[10]: https://datadoghq.slack.com/