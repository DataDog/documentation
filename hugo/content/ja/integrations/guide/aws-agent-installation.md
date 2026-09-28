---
description: 各ホストへの接続やホストごとのスクリプトの実行を行うことなく、AWS インテグレーションから直接 Amazon EC2 インスタンスに Datadog
  Agent をインストールして管理します。
further_reading:
- link: https://docs.datadoghq.com/integrations/guide/aws-agent-installation-technical-reference/
  tag: ドキュメント
  text: AWS インテグレーションを介した Agent のインストールの仕組み
- link: https://docs.datadoghq.com/integrations/amazon_web_services/
  tag: ドキュメント
  text: AWS インテグレーション
- link: https://docs.datadoghq.com/integrations/guide/aws-manual-setup/
  tag: ドキュメント
  text: AWS マニュアルセットアップガイド
- link: https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: ドキュメント
  text: クラウドインスタンスに Datadog Agent をインストールする理由
- link: https://docs.datadoghq.com/agent/fleet_automation/
  tag: ドキュメント
  text: Fleet Automation
- link: https://docs.datadoghq.com/agent/configuration/
  tag: ドキュメント
  text: Agent 構成
private: true
title: AWS インテグレーションからの Datadog Agent のインストール
---
## 概要 {#overview}

[AWS インテグレーション][1] は、ホストには何もインストールせずに、Amazon CloudWatch からメトリクス、イベント、ログを収集します。Datadog Agent をインストールすると、ホストレベルのメトリクス、分散トレース (APM)、ライブプロセス、詳細なログなど、CloudWatch だけでは提供できない AWS ワークロード内部からのテレメトリが追加されます。

各ホストへの接続やホストごとのスクリプトの実行を行うことなく、Datadog から直接 Amazon EC2 インスタンスに Datadog Agent をデプロイできます。AWS インテグレーションのセットアップ時、またはセットアップ後はいつでも Agent のインストールを有効にできます。

Amazon EKS はサポートされていません。

## 前提条件 {#prerequisites}

開始する前に、以下を確認してください。

- **CloudFormation へのアクセス**: ターゲット AWS アカウントで CloudFormation スタックを承認できること。インストールによってアカウントにスタックがデプロイされるため、そのスタックをレビューして作成するための権限がユーザー (またはチームメンバー) に必要です。必要な権限とその理由については、[必要な AWS 権限](#required-aws-permissions)セクションを参照してください。
- **SSM Agent**: [AWS Systems Manager (SSM) Agent][2] がターゲットインスタンスにすでに存在している必要があります。Datadog は SSM を介して Agent をインストールしますが、SSM Agent 自体をインストールすることはできません。そのため、SSM Agent が含まれていないカスタム AMI から構築されたインスタンスは対象外となります。Datadog がこれらのインスタンスにフラグを付けるため、これらのインスタンスに対処できます。
- **サポートされているプラットフォーム**: Linux (x86_64 および arm64) および Windows (x86_64)。macOS および Windows (arm64) はサポートされていません。

## 必要な AWS 権限 {#required-aws-permissions}

{{% aws-agent-installation %}}

Datadog は、これらの各権限を特定のタスクに使用します。

| 権限 | Datadog がこの権限を必要とする理由 |
|---|---|
| `ec2:DescribeInstances` | インスタンスを検索し、ルール (状態、タグ、OS、アーキテクチャ) に一致するインスタンスをチェックするため |
| `ssm:DescribeInstanceInformation` | Datadog が何らかの処理を行う前に、SSM Agent が実行されていることを確認するため |
| `ssm:GetDocument`、`ssm:CreateDocument`、`ssm:UpdateDocument`、`ssm:UpdateDocumentDefaultVersion` | インストールスクリプトをアカウントで公開し、最新の状態に保つため |
| `ssm:SendCommand`、`ssm:ListCommandInvocations` | インストールを実行し、完了したことを確認するため|
| `secretsmanager:DescribeSecret`、`secretsmanager:CreateSecret` | コマンドで渡されないように、API キーを保存するため |
| `iam:CreateRole`、`iam:CreateInstanceProfile`、`iam:AddRoleToInstanceProfile`、`iam:AttachRolePolicy`、`iam:PutRolePolicy`、`iam:PassRole`、`ec2:AssociateIamInstanceProfile`、および一致する`Get` と`List` による読み取り| インスタンスに IAM ロールが付与されていない場合に備えて、必要な最小限のアクセス権をインスタンスに付与するため (Systems Manager から到達可能であり、独自の API キーシークレットを読み取り可能)|
| `iam:Detach*`、`iam:Delete*`、`iam:RemoveRoleFromInstanceProfile`、`ec2:Disassociate*`、`ec2:DescribeIamInstanceProfileAssociations` | アンインストール時に、上記の各リソースをクリーンに削除するため |
| `ecs:ListClusters`、`ecs:ListContainerInstances` | Amazon Elastic Container Service (ECS) コンテナインスタンスを認識し、Datadog がそれらをスキップするようにするため (これらのインスタンスはクラスターレベルで処理されます) |
| `events:PutRule`、`events:PutTargets`、`events:RemoveTargets`、`events:DeleteRule` | Datadog がインスタンスの変更に対応できるように、変更通知を設定するため |

`iam:CreateRole` と `iam:PassRole` は、最も機密性の高い権限です。`iam:CreateRole` はアカウント内の `datadog-ec2-instrumenter/datadog-ssm-*` と一致するロール名に制限されており、`iam:PassRole` はさらに Amazon EC2 サービスに制限されています。

## 仕組み {#how-it-works}

Agent のインストールは**インストールルール**に基づいています。これは、AWS アカウントと、カバーする EC2 インスタンスを記述するクエリを組み合わせたものです。Datadog は時間の経過とともにルールを再チェックし、AWS アカウント内の条件に一致する各インスタンスに Agent をインストールします。

1. ユーザーがカバーする EC2 インスタンスを選択するか、対象となるすべてのインスタンスを含めます。
1. Datadog が、ユーザーの選択内容によってカバーされるインスタンスを特定します。
1. Datadog が AWS Systems Manager を介してカバー対象の各インスタンスに Agent をインストールし、不足している IAM 構成を自動的に追加します。
1. Datadog が時間の経過とともにルールを再チェックします。後でルールに一致するインスタンスは、新しく起動されたか新しくタグ付けされたかにかかわらず、自動的にインスツルメントされます。

初回セットアップ時に、CloudFormation スタックを 1 回承認します。その後、Datadog からインストールが自動的に実行されるため、インストールごとに新しい CloudFormation テンプレートを起動する必要はありません。

Datadog が作成する AWS リソース、インストールメカニズム、Datadog によりインスタンスのカバーが維持される仕組みなど、技術的詳細およびセキュリティに関する詳細については、[AWS インテグレーションからの Agent インストールの仕組み][6] を参照してください。

{{< img src="integrations/amazon_web_services/aws-agent-installation-how-it-works.png" alt="AWS Agent インストールプロセスのフローチャート。Datadog 内で発生するステップと、AWS アカウント内で実行されるステップを示しています。" style="width:70%;" >}}

### ルールによるインスタンスの一致方法を選択する {#choose-how-your-rule-matches-instances}

Datadog は時間の経過とともにルールを再チェックするため、記述したクエリによって、インフラストラクチャーの変更に伴うカバレッジの動作が決まります。

**インスタンスが出現した時点でカバーする**には、インフラストラクチャーにすでに存在するタグと属性 (`env:prod` など) で一致させます。一致するインスタンスはすべてインスツルメントされます。これには、ルールを保存した後に起動または再タグ付けされたインスタンスも含まれます。これは、ルールを更新せずに、新しく一致したインスタンスを自動的に監視する場合に使用します。

**固定セットをカバーする**には、リソースリストからインスタンスを個別に選択します。ルールは選択したインスタンスのみに一致するため、後で出現したインスタンスは追加されません。

**固定セットが大きすぎて個別に選択できない場合**は、`datadog:true`のように管理しているタグで一致させます。このタグは、インスツルメント対象とするインスタンスにのみ適用してください。これにより、タグを変更したときにのみカバレッジが変化するため、どのインスタンスがカバー対象となるかは Infrastructure as Code が決定します。

<div class="alert alert-warning">
カバレッジは双方向で機能します。インスタンスがルールに一致しなくなると、Datadog はそのインスタンスから Agent をアンインストールします。したがって、AWS でタグを変更すると、Datadog でルールを編集していなくても、インスタンスの監視が解除される可能性があります。
</div>

### ルールとタグのベストプラクティス {#best-practices-for-rules-and-tags}

**チームが所有するタグで一致させる。**他のチームが管理しているタグにルールが一致する場合、そのチームは Datadog を開くことなく、タグを付け直すことで監視を追加または解除できます。タグとルールを同じ所有者が管理することで、その決定を、決定を下した担当者の手元に残しておくことができます。

**通常の運用中に変更されるタグは使用しない。**環境の昇格、デプロイ、またはオートスケーリングテンプレートに伴って変更されるタグによって、インスタンスがカバー対象から除外または含められることがあります。インスタンスの存続期間に安定している属性に基づいて一致させます。

**ルールをアカウントの完全な構成として扱う。**各 AWS アカウントには、リソースタイプごとに 1 つのルールがあります。編集を行うたびに、既存のカバレッジに追加されるのではなく、そのリソースタイプのすべてのカバレッジのスコープが再設定されます。保存する前に、一致するインスタンスを確認してください。

**除外を使用して例外を設定する。**スキップしたいインスタンスが広範なルールのカバー対象となっている場合は、個別に選択したリストに切り替えるのではなく、そのルールからそれらのインスタンスを除外してください。除外することで、ルールを読みやすい状態に保ち、他のすべてのリソースに対する自動カバレッジを維持できます。

## Agent のインストール {#install-the-agent}

インスツルメントするインスタンスをどの程度制御するかに応じて、2 つのエントリーポイントから Agent のインストールを開始できます。

- **AWS インテグレーションセットアップ (対象となるすべてのインスタンスにインストール)**: [AWS インテグレーションをセットアップ][5] する際に、ログやリソースの収集とともに表示される [AWS インテグレーションページ][7] で、Agent インストールのトグルを有効にします。Agent は、対象となるすべての EC2 インスタンスにインストールされます。
- **Fleet Automation (特定のインスタンスへのインストール)**: いつでも [[AWS Install Agents] (AWS エージェントのインストール) ページ][8] を開き、必要な特定の EC2 インスタンスを選択できます。

<!-- TODO(DOCS-14545): per AWS team, surfacing the Agent install flow in the main AWS setup flow for non-first-time users is still rolling out; confirm it's live before publish. -->

セットアップ中に Agent インストールのトグルが表示されます。

{{< img src="integrations/amazon_web_services/aws-agent-installation-setup-toggle.png" alt="AWS セットアップの [Install the Datadog Agent] (Datadog Agent のインストール) ステップ。インストールトグルが有効になっており、ホスト (EC2) ワークロードトグルがオンになっています。" style="width:80%;" >}}

[AWS Install Agents] (AWS エージェントのインストール) ページからインストールするには、次のようにします。

1. 対象となるすべてのインスタンスを含めるか、リソースリストから特定の EC2 インスタンスを選択します。
1. 生成された CloudFormation スタックを確認し、AWS に進んで作成します。Datadog は、これについて一度だけ確認を求めます。
1. Datadog に戻ります。インストールは自動的に進行し、Agent がオンラインになると Datadog が進行状況を報告します。

<!-- TODO(DOCS-14545): add resource-selection / Manage Agents page screenshot (AWS Install Agents page) — setup-toggle screenshot added. -->

## インストールの検証 {#verify-the-installation}

インストールが完了すると次のようになります。

- 新しくインストールされた Agent が [インフラストラクチャーリスト][3] とホストマップに表示されます。
- Fleet Automation の [Fleet View] (フリートビュー) に、同じ Agent が一覧表示されます。

<!-- TODO(DOCS-14545): add expected time-to-data once confirmed. -->

## インストールした Agent の管理 {#manage-installed-agents}

Fleet Automation の [[AWS Install Agents] (AWS エージェントのインストール) ページ][8] を使用して、AWS インテグレーションを介してインストールした Agent を管理します。

このページから、次のことができます。

- インストールされている Agent とそのステータスを表示します。
- AWS 環境内の新しいインスタンスに Agent をインストールします。
- 監視が不要になったインスタンスから Agent をアンインストールします。

カバレッジを停止するには、インスタンスがルールに一致しなくなるようにそのルールを更新します。カバー対象のインスタンスから Agent を手動で削除した場合、Datadog は Agent を再インストールします。[Fleet Automation][4] を使用して Agent の構成とバージョンアップグレードを管理します。

## トラブルシューティング {#troubleshooting}

### EC2 インスタンスに SSM Agent が存在していない {#the-ssm-agent-is-not-present-on-an-ec2-instance}

EC2 への Agent のインストールは AWS Systems Manager (SSM) Agent に依存していますが、Datadog はこの Agent をインストールできません。Datadog は、カスタム AMI から構築されたインスタンスを含め、SSM Agent がないすべてのインスタンスに対象外としてフラグを付けます。インスタンスに SSM Agent をインストールしてから、再試行してください。AWS ドキュメントの [SSM Agent の使用][2] を参照してください。

### 権限または IAM エラーが発生する {#a-permission-or-iam-error-occurs}

権限が不足しているためにインストールを完了できない場合、Datadog は新しい権限を必要とする CloudFormation リソースへのリンクを含む通知を表示します。既存のスタックを更新して、[必要な権限](#required-aws-permissions)を付与してください。新しいスタックを作成する必要はありません。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/systems-manager/latest/userguide/ssm-agent.html
[3]: https://app.datadoghq.com/infrastructure
[4]: https://docs.datadoghq.com/ja/agent/fleet_automation/
[5]: https://docs.datadoghq.com/ja/getting_started/integrations/aws/
[6]: https://docs.datadoghq.com/ja/integrations/guide/aws-agent-installation-technical-reference/
[7]: https://app.datadoghq.com/integrations/amazon-web-services
[8]: https://app.datadoghq.com/fleet/install-agent/latest?platform=aws