---
aliases:
- /ja/security/cloud_security_management/workflows
further_reading:
- link: /security/cloud_security_management
  tag: ドキュメント
  text: Cloud Security
- link: /service_management/workflows/
  tag: ドキュメント
  text: Workflow Automation
products:
- icon: cloud-security-management
  name: ワークロード保護
  url: /security/workload_protection/
- icon: cloud-security-management
  name: Cloud Security Misconfigurations
  url: /security/cloud_security_management/misconfigurations/
- icon: cloud-security-management
  name: Cloud Security Identity Risks
  url: /security/cloud_security_management/identity_risks/
site_support_id: workflows
title: Workflow Automation によるセキュリティワークフローの自動化
---

{{< product-availability >}}

[Datadog Workflow Automation][1] は、インフラストラクチャーや各種ツールに接続するアクションを組み合わせてワークフローを構築することで、エンド ツー エンドのプロセスを一元的に管理し、自動化できるようにします。

[Cloud Security][2] と Workflow Automation を組み合わせれば、セキュリティ関連のワークフローも自動化できます。たとえば、[インタラクティブな Slack メッセージから公開 Amazon S3 バケットへのアクセスをブロックする](#block-access-to-aws-s3-bucket-via-slack) ワークフローや、[Jira issue を自動作成してチームに割り当てる](#automatically-create-and-assign-a-jira-issue) ワークフローを作成できます。

## トリガーとソースの仕組みを理解する

Workflow Automation では、ワークフローを手動または自動でトリガーできます。本記事のサンプル ワークフローは、サイド パネルで **Actions** > **Run Workflow** ボタンをクリックして手動でトリガーしています。

ワークフローをトリガーする際は、トリガー イベントのソース ID をワークフロー内の次のステップへ引き渡す必要があります。本記事の例では、トリガー イベントは新しいセキュリティ ファインディングです。どちらの例でも、ソース ID はワークフローの初期ステップで [ソース オブジェクト変数][7] を使って指定しています。

## ワークフローの構築

ワークフローを構築するには、すぐに使えるブループリントからあらかじめ構成されたフローを使用することも、カスタムワークフローを作成することもできます。ワークフローの作成方法の詳細については、[Workflow Automation のドキュメント][3]を参照してください。

### Slack 経由で Amazon S3 バケットへのアクセスをブロックする

この例では、公開 Amazon S3 バケットが検出されたときにインタラクティブな Slack メッセージを送信するリメディエーション ワークフローを作成します。**Approve** または **Reject** をクリックすると、S3 バケットへのアクセスを自動的にブロックするか、対応を行わないかを選択できます。

**注**: このワークフローを構築するには、[Slack インテグレーション][5]を構成する必要があります。

1. [Workflow Automation ページ][4]で、**New Workflow** をクリックします。
1. **Add Trigger** > **Security** をクリックします。ワークフローを実行するには、事前に Security トリガーが必要です。
1. ワークフローの名前を入力し、**Save** をクリックします。

#### セキュリティ誤構成の取得

セキュリティ誤構成を取得してワークフローに渡すには、**Get security finding** アクションを使用します。このアクションは `{{ Source.securityFinding.id }}` ソースオブジェクト変数を使用して、[**Get a finding**][8] API エンドポイントから誤構成の詳細を取得します。

1. **Add Step** をクリックして、ワークフローに最初のステップを追加します。
1. **Get security finding** アクションを検索して選択し、ワークフローキャンバスにステップとして追加します。
1. ワークフローキャンバスのステップをクリックして構成します。
1. **Finding ID** には、`{{ Source.securityFinding.id }}` を入力します。
1. **Save** をクリックしてワークフローを保存します。

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
    - **Prompt text**: Slack メッセージで選択ボタンの直上に表示されるテキストです。例: "Would you like to block public access for `{{ Steps.Get_security_finding.resource }}` in region `{{ Steps.GetRegion.data }}`?"

##### ワークフローの承認

1. ワークフローキャンバスの **Approve** の下にあるプラス (`+`) アイコンをクリックして、別のステップを追加します。
2. Amazon S3 の **Block Public Access** アクションを検索し、ワークフロー キャンバスにステップとして追加します。
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

この例では、セキュリティ ファインディングが検出されたときに Jira issue を作成し、適切なチームへ割り当てる自動チケット ルーティング ワークフローを作成します。

**注**: このワークフローを構築するには、[Jira インテグレーション][6]を構成する必要があります。

1. [Workflow Automation ページ][4]で、**New Workflow** をクリックします。
1. **Add Trigger** > **Security** をクリックします。ワークフローを実行するには、事前に Security トリガーが必要です。
1. ワークフローの名前を入力し、**Save** をクリックします。

#### セキュリティ所見を取得する

ファインディングを取得してワークフローへ渡すには、**Get security finding** アクションを使用します。このアクションは、`{{ Source.securityFinding.id }}` というソース オブジェクト変数を使い、[**Get a finding**][8] API エンドポイントからファインディングの詳細を取得します。

1. **Add Step** をクリックして、ワークフローに最初のステップを追加します。
1. **Get security finding** アクションを検索して選択し、ワークフローキャンバスにステップとして追加します。
1. ワークフローキャンバスのステップをクリックして構成します。
1. **Security ID** に `{{ Source.securityFinding.id }}` を入力します。

#### Jira アクションの追加

1. ワークフローキャンバスのプラス (`+`) アイコンをクリックして、別のステップを追加します。
2. Jira の **Create issue** アクションを検索し、ワークフロー キャンバスにステップとして追加します。
3. ワークフローキャンバスのステップをクリックし、以下の情報を入力します。
    - **Jira account**: Jira アカウントの URL。
    - **Project**: `{{ Source.securityFinding.tags_value.team }}`
    - **Summary**: `{{ Source.securityFinding.rule.name }}`
4. **Save** をクリックします。

## ワークフローをトリガーする

既存のワークフローは、誤構成またはアイデンティティ リスクのエクスプローラーからトリガーできるほか、サイド パネルでリソースを開いているときにも実行できます。
- エクスプローラーでは、リソースにカーソルを合わせ、表示された **Actions** のドロップダウンをクリックしてから、**Run workflow** をクリックします。
  {{< img src="security/cspm/run_workflow_explorer.png" alt="Misconfigurations Explorer からリソースに対してワークフローを実行する" style="width:100%;" >}}
- サイド パネルの **Next Steps** セクションで **Run Workflow** をクリックし、実行するワークフローを選択します。
  {{< img src="security/cspm/run_workflow_next_steps.png" alt="サイド パネルの Next Steps セクションからワークフローを実行する" style="width:30%;" >}}

実行できるワークフローの一覧に表示するには、ワークフローに Security トリガーが含まれている必要があります。ワークフローによっては、インシデントの詳細や重大度、影響を受けた S3 バケット名、またはアラートを送信する Slack チャンネルなど、追加の入力パラメーターを入力する必要がある場合があります。

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