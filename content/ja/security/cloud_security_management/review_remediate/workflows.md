---
aliases:
- /ja/security/cloud_security_management/workflows
further_reading:
- link: /security/cloud_security_management
  tag: ドキュメント
  text: 検索構文
- link: /service_management/workflows/
  tag: ドキュメント
  text: Workflow Automation
title: Workflow Automation によるセキュリティワークフローの自動化
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では Cloud Security Management Misconfigurations はサポートされていません。</div>
{{< /site-region >}}

[Datadog ワークフローオートメーション][1]では、インフラストラクチャーやツールに接続するアクションで構成されるワークフローを構築することで、エンドツーエンドのプロセスをオーケストレーションし、自動化することができます。

[Cloud Security Management (CSM)][2] で Workflow Automation を使って、セキュリティ関連のワークフローを自動化します。例えば、[対話型の Slack メッセージ経由で公開 Amazon S3 バケットへのアクセスをブロックする](#block-access-to-aws-s3-bucket-via-slack)ことや、[自動的に Jira 課題を作成してチームに割り当てる](#automatically-create-and-assign-a-jira-issue) ことを可能にするワークフローを作成できます。

## トリガーとソースの仕組みを理解する

Workflow Automation では、モニター、セキュリティシグナル、またはカスタムスケジュールから手動または自動的にワークフローをトリガーすることができます。本記事のワークフロー例では、サイドパネルの **Actions** > **Run Workflow** ボタンをクリックすることで、ワークフローが手動でトリガーされています。

ワークフローをトリガーするとき、トリガーイベントのソース ID をワークフローの次のステップに渡さなければなりません。この記事の例では、トリガーイベントは新しいセキュリティの所見です。どちらの場合も、ソース ID はワークフローの最初のステップで[ソースオブジェクト変数][7]を使用して指定されます。

## ワークフローの構築

ワークフローを構築するには、すぐに使えるブループリントからあらかじめ構成されたフローを使用することも、カスタムワークフローを作成することもできます。ワークフローの作成方法の詳細については、[Workflow Automation のドキュメント][3]を参照してください。
### Slack 経由で Amazon S3 バケットへのアクセスをブロックする

この例では、公開 Amazon S3 バケットが検出されたときに、対話型の Slack メッセージを送信する修復ワークフローを作成します。**Approve** または **Reject** をクリックすることで、S3 バケットへのアクセスを自動的にブロックしたり、措置を取らないことを選択することができます。

**注**: このワークフローを構築するには、[Slack インテグレーション][5]を構成する必要があります。

1. [Workflow Automation ページ][4]で、**New Workflow** をクリックします。
2. ワークフローの名前を入力します。
3. トリガーに **Manual** を選択し、**Create** をクリックします。
4. ワークフロービルダーを使ってワークフローにステップを追加するには **Add a step to get started** をクリックします。または、JSON エディターを使用してワークフローを構築するには **Edit JSON Spec** をクリックします。

#### セキュリティ誤構成の取得

セキュリティ誤構成を取得してワークフローに渡すには、**Get security finding** アクションを使用します。このアクションは `{{ Source.securityFinding.id }}` ソースオブジェクト変数を使用して、[**Get a finding**][8] API エンドポイントから誤構成の詳細を取得します。

1. **Add a step to get started** をクリックして、ワークフローに最初のステップを追加します。
2. **Get security finding** アクションを検索して選択し、ワークフローキャンバスにステップとして追加します。
3. ワークフローキャンバスのステップをクリックして構成します。
4. **Finding ID** には、`{{ Source.securityFinding.id }}` を入力します。

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
    - **Prompt text**: Slack メッセージの選択ボタンのすぐ上の表示テキスト。例: "リージョン `{{ Steps.GetRegion.data }}` で `{{ Steps.Get_security_finding.resource }}` のパブリックアクセスをブロックしますか？"

##### ワークフローの承認

1. ワークフローキャンバスの **Approve** の下にあるプラス (`+`) アイコンをクリックして、別のステップを追加します。
2. Amazon S3 の **Block Public Access** アクションを検索して選択し、ワークフローキャンバスにステップとして追加します。
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

この例では、セキュリティの所見が検出されたときに、Jira 課題を作成し、適切なチームに割り当てる自動的なチケットルーティングワークフローを作成します。

**注**: このワークフローを構築するには、[Jira インテグレーション][6]を構成する必要があります。

1. [Workflow Automation ページ][4]で、**New Workflow** をクリックします。
2. ワークフローの名前を入力します。
3. トリガーに **Manual** を選択し、**Create** をクリックします。
4. ワークフロービルダーを使ってワークフローにステップを追加するには **Add a step to get started** をクリックします。または、JSON エディターを使用してワークフローを構築するには **Edit JSON Spec** をクリックします。

#### セキュリティ問題を取得する

所見を取得してワークフローに渡すには、**Get security finding** アクションを使用します。このアクションは `{{ Source.securityFinding.id }}` ソースオブジェクト変数を使用して、[**Get a finding**][8] API エンドポイントから所見の詳細を取得します。

1. **Add a step to get started** をクリックして、ワークフローに最初のステップを追加します。
2. **Get security finding** アクションを検索して選択し、ワークフローキャンバスにステップとして追加します。
3. ワークフローキャンバスのステップをクリックして構成します。
4. **Security ID** には、`{{ Source.securityFinding.id }}` を入力します。

#### JS 関数の追加

次に、JavaScript データ変換関数アクションをキャンバスに追加し、所見のタグからチーム名を返すように構成します。

1. ワークフローキャンバスのプラス (`+`) アイコンをクリックして、別のステップを追加します。
2. **JS Function** アクションを検索して選択し、ワークフローキャンバスにステップとして追加します。
3. ワークフローキャンバスのステップをクリックし、スクリプトエディターに以下を貼り付けます。
   {{< code-block lang="javascript" >}}
    // 所見タグからチーム情報を取得します
    // トリガーやステップのデータにアクセスするには `$` を使用します。
    // Lodash にアクセスするには `_` を使用します。
    // https://lodash.com/ を参照してください。

    let tags = $.Steps.Get_security_finding.tags

    let team = tags.filter(t => t.includes('team:'))
    if(region.length == 1){
        return team[0].split(':')[1]
    } else {
        return '';
    }
    {{< /code-block >}}

#### Jira アクションの追加

1. ワークフローキャンバスのプラス (`+`) アイコンをクリックして、別のステップを追加します。
2. **Create issue Jira** アクションを検索して選択し、ワークフローキャンバスにステップとして追加します。
3. ワークフローキャンバスのステップをクリックし、以下の情報を入力します。
    - **Jira account**: Jira アカウントの URL。
    - **Project**: `{{ Steps.GetTeamInfo.data }}`
    - **Summary**: `{{ Steps.Get_security_finding.rule.name }}`
4. **Save** をクリックします。

## ワークフローをトリガーする

所見、誤構成、リソースの各サイドパネルから既存のワークフローをトリガーできます。

サイドパネルで、**Actions** > **Run Workflow** をクリックし、実行するワークフローを選択します。ワークフローによっては、インシデントの詳細や重大度、影響を受ける S3 バケット名、アラートの送信先 Slack チャンネルなど、追加の入力パラメーターを入力する必要がある場合があります。

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