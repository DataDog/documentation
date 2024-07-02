---
title: Connections
description: Workflow connections
further_reading:
- link: /getting_started/workflow_automation/
  tag: Documentation
  text: Getting Started with Workflow Automation
algolia:
  tags: [workflow, workflows/, workflow automation]
aliases:
- /workflows/connections
- /workflows/setup
disable_toc: false
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では Workflow Automation はサポートされていません。</div>
{{< /site-region >}}

ワークフローのアクションは、外部のソフトウェアシステムと接続するため、対応するインテグレーションに対して、Datadog アカウントの認証が必要になる場合があります。ワークフローは、認証を必要とするすべてのワークフローアクションが Datadog アカウントの身元を確認できる場合にのみ、正常に実行することができます。Datadog に権限を付与する際には、セキュリティのベストプラクティスに従い、ワークフローの実行に必要な権限のみを付与するようにします。

ワークフローアクションは、2 つの方法で認証することができます。
- インテグレーションタイルで構成された資格情報および権限
- 接続の資格情報

## インテグレーションタイルの資格情報

以下の Datadog インテグレーションタイルで設定した資格情報やアカウント認証は、Workflow Automation の対応するアクションに自動的に伝搬されます。
- Jira
- PagerDuty
- Slack
- GitHub

[Datadog インテグレーション][6]の説明に従って、インテグレーションタイルを構成します。

設定する必要があるインテグレーションが上記に記載されていない場合は、接続資格情報を設定します。

## 接続の資格情報

Workflow connections extend your installed integrations to give you control over workflow step authentication. Use connection credentials to authenticate a [generic action][8] or any action for which the integration tile does not offer authentication. For a list of integrations that use the integration tile for authentication, see the [Integration tile credentials](#integration-tile-credentials) section. Connection credentials are only available for use within the Workflow Automation and App Builder products.

接続は、以下のユースケース例に対応しています。
- 必要なインテグレーションが、ビルトイン接続では利用でない場合。
- カスタムアクションを認証したい場合。例えば、独自のサービスで HTTP アクションを使用する必要があります。
- The permissions needed are not supported by the integration, such as write permissions on AWS.
- 特定のワークフローへのユーザーのアクセスを制限するなど、きめ細かなアクセス制御を行いたい場合。

### 接続セキュリティへの配慮

接続を作成する前に、必要なタスクを実行するために必要な権限を考え、そのタスクを実行するために必要な権限のみを接続に付与します。さらに、接続は、その接続を使用する必要がある人だけに制限される必要があります。

Where possible, use granular connections for different workflows. For example, if you have a workflow that writes to an Amazon S3 bucket, and a workflow that terminates Amazon EC2 instances, do not use the same connection for both workflows. Instead, create two respective connections, each corresponding to an IAM role with limited scope.

## 接続の使用

### 接続の表示

1. [Workflow Automation ページ][2]から、右上の **Connections** をクリックします。[接続リスト][3]が表示されます。
1. 一行をクリックすると、接続の詳細が表示されます。

### 接続の作成

接続を確立するためには、以下の情報が必要です。
- 接続先 (製品名、URL など)
- 認証方法 (API キー、ユーザー名/パスワード、oauth など)

接続を作成するには
1. [接続リスト][3]に移動します。
1. 右上の **New Connection** ボタンをクリックします。**New Connection** ダイアログボックスが表示されます。
1. アイコンをクリックして、インテグレーションスキーマを選択します。
1. 該当するフィールドを入力します。**Create** をクリックします。

または、ワークフローページから接続を追加します。
1. [Workflow Automation リスト][9]に移動します。
1. 資格情報を追加する必要があるアクションを含むワークフローを選択します。ワークフロービルダーが表示されます。
1. ワークフローの視覚化で、資格情報を追加する必要のあるアクションをクリックします。右側のパネルには、アクションの詳細が表示されます。
1. **Configure** タブの下にある **Connection** のドロップダウンを探し、**+** のアイコンをクリックします。
1. **New Connection** ダイアログボックスで、接続に名前を付け、必要な認証の詳細を入力します。
1. **Save** をクリックします。

The example below shows the **New Connection** dialog box for the OpenAI connection. Each connection requires different authentication information. The OpenAI connection requires a valid Connection Name and API Token.

{{< img src="service_management/new-connection.png" alt="The New Connection dialog box for the OpenAI connection" >}}

### 接続の編集

1. [接続リスト][3]に移動します。
1. 編集したい接続にカーソルを合わせます。右側に、**Edit**、**Permissions**、**Delete** のアイコンが表示されます。
1. 鉛筆 (**Edit**) アイコンをクリックします。ダイアログボックスが表示されます。
1. 変更したいフィールドを更新します。
1. **Save** をクリックします。

### 接続の削除

1. [接続リスト][3]に移動します。
1. 削除したい接続にカーソルを合わせます。右側に、**Edit**、**Permissions**、**Delete** のアイコンが表示されます。
1. ゴミ箱 (**Delete**) のアイコンをクリックします。"Are you sure?” のテキストが表示されます。
1. **Delete** を選択します。

### 接続の利用を制限する

接続の利用を制限する方法については、［アクセス・認証］[4]を参照してください。

## HTTP 接続

To connect to an arbitrary service, use the HTTP connection type. For authentication options and setup instructions, see [HTTP action][10].

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#workflows** channel on the [Datadog Community Slack][11].

[1]: /service_management/workflows/actions_catalog/generic_actions/
[2]: https://app.datadoghq.com/workflow
[3]: https://app.datadoghq.com/workflow/connections
[4]: /service_management/workflows/access/#restrict-connection-use
[6]: /integrations/
[8]: /service_management/workflows/actions_catalog/generic_actions/
[9]: https://app.datadoghq.com/workflow
[10]: /service_management/workflows/actions/http/
[11]: https://datadoghq.slack.com/
