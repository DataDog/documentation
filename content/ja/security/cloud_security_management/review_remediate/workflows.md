---
aliases:
- /ja/security/cloud_security_management/workflows
further_reading:
- link: /security/cloud_security_management
  tag: Documentation
  text: Cloud Security Management
- link: /service_management/workflows/
  tag: Documentation
  text: Workflow Automation
products:
- icon: cloud-security-management
  name: CSM Threats
  url: /security/threats/
- icon: cloud-security-management
  name: CSM Misconfigurations
  url: /security/cloud_security_management/misconfigurations/
- icon: cloud-security-management
  name: CSM Identity Risks
  url: /security/cloud_security_management/identity_risks/
title: Automate Security Workflows with Workflow Automation
---

{{< product-availability >}}

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では Workflow Automation はサポートされていません。</div>
{{< /site-region >}}

[Datadog Workflow Automation][1] allows you to orchestrate and automate your end-to-end processes by building workflows made up of actions that connect to your infrastructure and tools.

Use Workflow Automation with [Cloud Security Management (CSM)][2] to automate your security-related workflows. For example, you can create workflows that allow you to [block access to a public Amazon S3 bucket via an interactive Slack message](#block-access-to-aws-s3-bucket-via-slack), or [automatically create a Jira issue and assign it to a team](#automatically-create-and-assign-a-jira-issue).

## トリガーとソースの仕組みを理解する

Workflow Automation allows you to trigger a workflow manually or automatically from a monitor, security signal, or custom schedule. In the example workflows in this article, the workflows are triggered manually by clicking the **Actions** > **Run Workflow** button on the side panels.

When you trigger a workflow, the source ID of the trigger event must be passed on to the next step in the workflow. In the examples in this article, the trigger events are a new security finding. In both cases, the source IDs are specified in the initial step of the workflow using [source object variables][7].

## ワークフローの構築

ワークフローを構築するには、すぐに使えるブループリントからあらかじめ構成されたフローを使用することも、カスタムワークフローを作成することもできます。ワークフローの作成方法の詳細については、[Workflow Automation のドキュメント][3]を参照してください。

### Block access to Amazon S3 bucket via Slack

This example creates a remediation workflow that sends an interactive Slack message when a public Amazon S3 bucket is detected. By clicking **Approve** or **Reject**, you can automatically block access to the S3 bucket or decline to take action.

**注**: このワークフローを構築するには、[Slack インテグレーション][5]を構成する必要があります。

1. [Workflow Automation ページ][4]で、**New Workflow** をクリックします。
1. Enter a name for the workflow and click **Save**.

#### セキュリティ誤構成の取得

セキュリティ誤構成を取得してワークフローに渡すには、**Get security finding** アクションを使用します。このアクションは `{{ Source.securityFinding.id }}` ソースオブジェクト変数を使用して、[**Get a finding**][8] API エンドポイントから誤構成の詳細を取得します。

1. Click **Add Step** to add the first step to your workflow.
1. **Get security finding** アクションを検索して選択し、ワークフローキャンバスにステップとして追加します。
1. ワークフローキャンバスのステップをクリックして構成します。
1. **Finding ID** には、`{{ Source.securityFinding.id }}` を入力します。
1. Click **Save** to save your workflow.

#### JS 関数の追加

次に、JavaScript Data Transformation Function アクションをキャンバスに追加し、誤構成のタグからリージョン名を返すように構成します。

1. ワークフローキャンバスのプラス (`+`) アイコンをクリックして、別のステップを追加します。
2. **JS Function** アクションを検索して選択し、ワークフローキャンバスにステップとして追加します。
3. ワークフローキャンバスのステップをクリックし、スクリプトエディターに以下を貼り付けます。
   {{< code-block lang="javascript" >}}
    // 誤構成タグからリージョン情報を取得します
    // トリガーやステップのデータにアクセスするには `$` を使用します。
    // Lodash にアクセスするには `_` を使用します。
    // https://lodash.com/ を参照してください。

    let tags = $.Steps.Get_security_finding.tags

    let region = tags.filter(t => t.includes('region:'))
    if(region.length == 1){
        return region[0].split(':')[1]
    } else {
        return '';
    }
    {{< /code-block >}}

#### Slack アクションの追加

1. ワークフローキャンバスのプラス (`+`) アイコンをクリックして、別のステップを追加します。
2. Slack の **Make a decision** アクションを検索して選択し、ワークフローキャンバスにステップとして追加します。
3. ワークフローキャンバスのステップをクリックし、以下の情報を入力します。
    - **Workspace**: Slack ワークスペースの名前。
    - **Channel**: Slack メッセージの送信先チャンネル。
    - **Prompt text**: The text that appears immediately above the choice buttons in the Slack message, for example, "Would you like to block public access for `{{ Steps.Get_security_finding.resource }}` in region `{{ Steps.GetRegion.data }}`?"

##### ワークフローの承認

1. ワークフローキャンバスの **Approve** の下にあるプラス (`+`) アイコンをクリックして、別のステップを追加します。
2. Search for the **Block Public Access** action for Amazon S3 and select it to add it as a step on your workflow canvas.
3. ワークフローキャンバスのステップをクリックし、以下の情報を入力します。
    - **Connection**: AWS インテグレーションのワークフロー接続名。
    - **Region**: `{{ Steps.GetRegion.data }}`
    - **Bucket name**: `{{ Steps.Get_security_finding.resource }}`
4. ワークフローキャンバスの **Block public access** ステップの下にあるプラス (`+`) アイコンをクリックして、別のステップを追加します。
5. Slack の **Send message** アクションを検索して選択し、ワークフローキャンバスにステップとして追加します。
3. ワークフローキャンバスのステップをクリックし、以下の情報を入力します。
    - **Workspace**: Slack ワークスペースの名前。
    - **Channel**: Slack メッセージの送信先チャンネル。
    - **Message text**: Slack メッセージに表示されるテキスト。例:
    {{< code-block lang="text" >}}
    S3 バケット `{{ Steps.Get_security_finding.resource }}` は正常にブロックされました。AWS API のレスポンス:
    ```{{ Steps.Block_public_access }}```

    この問題は、次にリソースがスキャンされるときに修正済みとしてマークされます。これには最大で 1 時間程度かかります。
    {{< /code-block >}}

##### 拒否ワークフロー

1. ワークフローキャンバスの **Reject** の下にあるプラス (`+`) アイコンをクリックして、別のステップを追加します。
2. Slack の **Send message** アクションを検索して選択し、ワークフローキャンバスにステップとして追加します。
3. ワークフローキャンバスのステップをクリックし、以下の情報を入力します。
    - **Workspace**: Slack ワークスペースの名前。
    - **Channel**: Slack メッセージの送信先チャンネル。
    - **Message text**: Slack メッセージに表示されるテキスト。例: 「ユーザーはアクションを拒否しました。」
4. **Save** をクリックします。

### Jira 課題の自動作成と割り当て

This example creates an automated ticket routing workflow that creates and assigns a Jira issue to the appropriate team when a security finding is detected.

**注**: このワークフローを構築するには、[Jira インテグレーション][6]を構成する必要があります。

1. [Workflow Automation ページ][4]で、**New Workflow** をクリックします。
1. Enter a name for the workflow and click **Save**.

#### セキュリティ所見を取得する

To retrieve the finding and pass it into the workflow, use the **Get security finding** action. The action uses the `{{ Source.securityFinding.id }}` source object variable to retrieve the finding's details from the [**Get a finding**][8] API endpoint.

1. Click **Add Step** to add the first step to your workflow.
1. **Get security finding** アクションを検索して選択し、ワークフローキャンバスにステップとして追加します。
1. ワークフローキャンバスのステップをクリックして構成します。
1. For **Security ID**, enter `{{ Source.securityFinding.id }}`.

#### Jira アクションの追加

1. ワークフローキャンバスのプラス (`+`) アイコンをクリックして、別のステップを追加します。
2. Search for the **Create issue** Jira action and select it to add it as a step on your workflow canvas.
3. ワークフローキャンバスのステップをクリックし、以下の情報を入力します。
    - **Jira account**: Jira アカウントの URL。
    - **Project**: `{{ Source.securityFinding.tags_value.team }}`
    - **Summary**: `{{ Source.securityFinding.rule.name }}`
4. **Save** をクリックします。

## ワークフローをトリガーする

You can trigger an existing workflow from the finding, misconfiguration, and resource side panels.

In the side panel, click **Actions** > **Run Workflow**, and select a workflow to run. Depending on the workflow, you may be required to enter additional input parameters, such as incident details and severity, the name of the impacted S3 bucket, or the Slack channel you want to send an alert to.

{{< img src="/security/csm/run_workflow_side_panel.png" alt="実行するアクションの一覧が表示されている誤構成サイドパネルの Actions メニュー" width="100%">}}

ワークフロー実行後、サイドパネルに追加情報が表示されます。リンクをクリックすると、ワークフローを表示できます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/service_management/workflows
[2]: /ja/security/cloud_security_management/
[3]: /ja/service_management/workflows/build/
[4]: https://app.datadoghq.com/workflow
[5]: /ja/integrations/slack/
[6]: /ja/integrations/jira/
[7]: /ja/service_management/workflows/build/#source-object-variables
[8]: /ja/api/latest/security-monitoring/#get-a-finding