---
aliases:
- /ja/actions/connections/aws_integration/
- /ja/actions/connections/integration_connections/
description: 既存の Datadog インテグレーションの資格情報を使用して、ワークフローやアプリでのアクションを認証します。
disable_toc: false
further_reading:
- link: /actions/connections/
  tag: ドキュメント
  text: 接続の資格情報の詳細はこちら
title: インテグレーションコネクション
---
## 概要 {#overview}

インテグレーションコネクションを使用すると、Datadog インテグレーションにすでに構成されている資格情報を Datadog Workflows および Actions で使用できます。これにより、アクションごとに個別のコネクションを構成する必要がなくなり、外部サービスへのアクセスが簡素化されます。

## サポートされているユースケース {#supported-use-cases}

インテグレーションコネクションは以下でサポートされています。

- **ServiceNow**: 既存の ServiceNow インテグレーションインスタンスの資格情報を使用して、ServiceNow アクションを実行します。
- **AWS**: 既存の AWS インテグレーションアカウントの資格情報を使用して、サポートされている読み取り専用の AWS アクションを実行します。サポートされている AWS アクションと権限の詳細については、[AWS インテグレーションコネクション](#aws-integration-connections)を参照してください。

その他のインテグレーションや操作については、[コネクションを作成][2] してください。

## 構成 {#configuration}

開始する前に、インテグレーションがアクティブであること、および使用するインテグレーションアカウントまたはインスタンスの編集権限があることを確認してください。

次の例では、ServiceNow インテグレーションコネクションを構成します。サポートされている AWS アクションについても、[AWS の追加要件](#aws-integration-connections)に従い、同様の一般的なプロセスを実行できます。

### 1. インテグレーション権限を構成する {#1-configure-integration-permissions}

ServiceNow インテグレーションインスタンスの {{< ui >}}Executor{{< /ui >}} 権限を構成するには、以下の手順を実行します。

1. Datadog で、[**Integrations**][4] に移動します。
1. {{< ui >}}ServiceNow{{< /ui >}} インテグレーションをクリックします。
1. アクションの実行に使用する ServiceNow インスタンスを選択します。
1. {{< ui >}}Set Permissions{{< /ui >}} をクリックします。
    - {{< ui >}}Set Permissions{{< /ui >}} ボタンではなく {{< ui >}}Request Edit Access{{< /ui >}} ボタンが表示されている場合は、Datadog 組織の管理者に連絡し、インスタンスのエディターとして追加してもらいます。
1. ユーザー、チーム、または組織を選択し、{{< ui >}}Add{{< /ui >}} をクリックします。
1. {{< ui >}}People with access{{< /ui >}} で、{{< ui >}}Executor{{< /ui >}} 権限を選択します。
1. {{< ui >}}Save{{< /ui >}} をクリックします。

### 2. アクションにインテグレーションを追加する {#2-add-the-integration-to-an-action}

1. [Workflow Automation][5] で、編集するワークフローをクリックします。
1. ServiceNow アクションを追加します。
1. 構成ペインで {{< ui >}}Connection{{< /ui >}} ドロップダウンをクリックし、{{< ui >}}Existing ServiceNow Integrations{{< /ui >}} までスクロールします。
1. 前のステップで構成した ServiceNow インスタンスを選択します。
1. {{< ui >}}Save{{< /ui >}} をクリックします。

## AWS インテグレーションコネクション {#aws-integration-connections}

Datadog Workflows and Actions は、既存の Datadog AWS インテグレーション資格情報を使用して、AWS 環境で読み取り専用の操作を実行できます。Datadog は、Amazon EC2、RDS、S3 モニタリングなどのインテグレーションと同じ AWS 認証情報を使用して、サポートされている読み取り専用アクションを安全に実行します。

環境内で AWS アクションを実行するには、次の 2 つの方法があります。

- [`ViewOnlyAccess` 権限][1] ポリシーで許可されている読み取り専用アクションを実行するには、Datadog AWS インテグレーションを使用します。
- [`ViewOnlyAccess` 権限][1] に含まれていない操作については、特定の権限を持つ専用の AWS IAM ロールにリンクされたカスタム AWS コネクションを使用します。

### サポートされている AWS アクション {#supported-aws-actions}

例:

- AWS リソース (`ListECSClusters`、`DescribeInstances`、`GetBucketPolicy` など) の一覧表示または記述
- AWS サービス (`GetFunctionConfiguration` や `ListSecrets` など) からの構成またはメタデータの読み取り
- リソースタグ、メトリクス、またはログの検査

その他の AWS アクションについては、代わりに [専用コネクション][2] を使用してください。

### AWS 要件 {#aws-requirements}

AWS インテグレーションコネクションでアクションを正常に実行するには、以下の手順に従います。

- ロールの委任用に構成された AWS インテグレーション IAM ロールには、`ecs:ListClusters` など、目的の操作に必要な権限が必要です。
- 選択されるアクションは読み取り専用でなければなりません。`Put*`、`Delete*`、`Update*` などの書き込みまたは変更アクションはサポートされておらず、実行時に失敗します。
- アクションを実行するユーザー、チーム、または組織は、Datadog の AWS インテグレーションアカウントに対する明示的な {{< ui >}}Executor{{< /ui >}} 権限を持っている必要があります。

<div class="alert alert-info">
Datadog AWS インテグレーションを使用したアクションの実行は、<a href="/integrations/guide/aws-manual-setup/?tab=roledelegation" target="_blank">ロールの委任</a>を通じて Datadog AWS インテグレーションをセットアップしたユーザーのみが利用できます。さらに、<a href="https://docs.aws.amazon.com/aws-managed-policy/latest/reference/ViewOnlyAccess.html" target="_blank">ViewOnlyAccess 権限</a>に基づく操作は許可されていますが、Datadog AWS インテグレーションに関連付けられた IAM ロールに必要な権限がない場合があります。問題が発生した場合は、ロールに正しい権限があることを確認してください。
</div>

AWS インテグレーションコネクションを構成する前に、以下を確認してください。

- AWS インテグレーションがターゲット AWS アカウントに対して有効であり、Datadog が AWS インテグレーションの問題を検出していないこと。AWS インテグレーションをまだ設定していない場合は、[AWS インテグレーションの設定ガイド][6] に従ってください。
- インテグレーションに関連付けられた IAM ロールに、`ecs:ListClusters` などの必要な操作に対する権限があること。
- 使用する AWS アカウントの権限を編集するアクセス権があること。

AWS インテグレーションアカウントの {{< ui >}}Executor{{< /ui >}} 権限を構成するには、[構成手順](#1-configure-integration-permissions)に従い、ServiceNow ではなく {{< ui >}}Amazon Web Services{{< /ui >}} インテグレーションと関連する AWS アカウントを選択します。

アクションに AWS インテグレーションを追加するには、以下の手順を実行します。

1. [Workflow Automation][5] で、編集するワークフローをクリックします。
1. {{< ui >}}List ECS Clusters{{< /ui >}} などの AWS アクションを追加します。
1. 構成ペインで {{< ui >}}Connection{{< /ui >}} ドロップダウンをクリックし、{{< ui >}}Existing AWS Integrations{{< /ui >}} までスクロールします。
1. 構成した AWS アカウントを選択します。
1. {{< ui >}}Save{{< /ui >}} をクリックします。

[1]: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/ViewOnlyAccess.html
[2]: /ja/actions/connections/#create-a-connection
[4]: https://app.datadoghq.com/integrations
[5]: https://app.datadoghq.com/workflow
[6]: /ja/integrations/amazon-web-services/#setup