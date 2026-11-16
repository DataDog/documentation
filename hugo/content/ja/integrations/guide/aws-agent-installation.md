---
description: 各ホストに接続したり各関数を再デプロイしたりすることなく、AWS インテグレーションから直接 Amazon EC2 インスタンスと AWS
  Lambda 関数をインスツルメントできます。
further_reading:
- link: https://docs.datadoghq.com/integrations/guide/aws-agent-installation-technical-reference/
  tag: ドキュメント
  text: AWS インテグレーションを介した Datadog インスツルメンテーションの仕組み
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
- link: https://docs.datadoghq.com/serverless/aws_lambda/
  tag: ドキュメント
  text: AWS Lambda 向け Serverless Monitoring
- link: https://docs.datadoghq.com/serverless/aws_lambda/configuration/
  tag: ドキュメント
  text: AWS Lambda 向け Serverless Monitoring の構成
- link: https://docs.datadoghq.com/serverless/aws_lambda/instrumentation/
  tag: ドキュメント
  text: AWS Lambda のインスツルメンテーション
- link: https://docs.datadoghq.com/serverless/aws_lambda/troubleshooting/
  tag: ドキュメント
  text: AWS Lambda モニタリングのトラブルシューティング
- link: https://docs.datadoghq.com/account_management/workload_identity_federation/
  tag: ドキュメント
  text: ワークロードアイデンティティフェデレーション
private: true
title: AWS インテグレーションを通じて Datadog インスツルメンテーションをインストールする
---
## 概要 {#overview}

[AWS インテグレーション][1] は、リソースには何もインストールせずに、Amazon CloudWatch からメトリクス、イベント、ログを収集します。Datadog インスツルメンテーションは、ホストレベルのメトリクス、分散トレース (APM)、ライブプロセス、詳細なログなど、CloudWatch だけでは提供できない AWS ワークロード内部からのテレメトリデータを収集します。

各ホストに接続したり、各関数を再デプロイしたりすることなく、Datadog から直接 AWS ワークロードをインスツルメントできます。AWS インテグレーションのセットアップ時、またはセットアップ後はいつでもインスツルメンテーションを有効にできます。

## サポートされているワークロード {#supported-workloads}

| ワークロード | Datadog がインストールするもの |
|---|---|
| Amazon EC2 インスタンス | Datadog Agent |
| AWS Lambda 関数 | Datadog Lambda 拡張機能、およびサポートされているランタイムの場合は、関数のランタイムと一致する Datadog トレースレイヤー |

Amazon EKS はサポートされていません。Lambda 関数については、Datadog では別の製品としてリモートインスツルメンテーションも提供しています。どちらを使用するか判断するには、次のセクションを参照してください。

<div class="alert alert-warning">Lambda 関数は、1 つの Datadog インスツルメンテーション製品でのみ管理できます。Datadog は、リモートインスツルメンテーションですでに管理されている関数、およびユーザー自身がインスツルメントした関数をスキップします。</div>

## AWS インテグレーションとリモートインスツルメンテーションの選択 {#choose-between-the-aws-integration-and-remote-instrumentation}

Datadog では、Lambda 関数を自分で再デプロイすることなくインスツルメンテーションを追加する方法を 2 つ提供しています。

このガイドで説明する - **AWS インテグレーションを介したインスツルメンテーション**は、すべて Datadog から管理します。Datadog は、CloudFormation スタックによって作成された AWS インテグレーション IAM ロールを使用して関数を更新し、お客様のアカウントにコンピューティングリソースをデプロイしません。
- **[リモートインスツルメンテーション][9]**では、Datadog インスツルメンター関数 `datadog-remote-instrumenter` をお客様自身のアカウントにデプロイします。その関数がインスツルメンテーションを適用し、その状態を維持します。

どちらも同じ Datadog Lambda 拡張機能とトレーシングレイヤーを追加し、Datadog の外部で変更されたインスツルメンテーションを復元します。これらは、処理の実行場所、関数の選択方法、およびインストールする内容が異なります。

| 側面 | AWS インテグレーションを介したインスツルメンテーション | リモートインスツルメンテーション |
|---|---|---|
| ワークロード | Amazon EC2 インスタンスおよび AWS Lambda 関数 | AWS Lambda 関数 |
| アカウント内で実行されるもの | Datadog のコンピューティングリソースは使用しません。Datadog は、CloudFormation スタックによって作成された AWS インテグレーション IAM ロールを使用して AWS API を呼び出します。| インスツルメンター Lambda 関数 |
| セットアップの範囲 | AWS アカウントごとに 1 つの CloudFormation スタック | アカウントおよびリージョンごとに 1 つの CloudFormation スタック |
| 関数の選択 | 関数属性でクエリを記述するか、特定の関数を選択するか、または対象となるすべての関数を追加します。保存前に、Datadog が一致したセットを表示します。| 論理演算子を使用して、関数名やタグに基づくターゲティングルールを記述します。|
| 後から一致した関数 | ルールを保存した後に作成されたか、タグの変更後に一致し始めたかにかかわらず、自動的にインスツルメントされます。| ターゲティングルールに一致した時点で自動的にインスツルメントされます。|
| レイヤーバージョン | Datadog が選択および更新します。| ユーザーが設定し、変更するまでそのまま維持されます。|
| インスツルメントされた関数の認証方法 | [ワークロードアイデンティティフェデレーション][16] を使用し、関数に Datadog API キーを設定する必要はありません。| Remote Configuration が有効な Datadog API キーを使用します。|
| Datadog の権限 | Hosts Read と Agent Install| サーバーレス AWS インスツルメンテーションの読み取りおよび書き込み|
| インスツルメンテーションの削除 | Datadog から削除します。| そのリージョンの CloudFormation スタックを削除します。|

どちらの製品も、お客様のアカウントに CloudFormation スタックをデプロイします。リモートインスツルメンテーション用のスタックは、CloudTrail トレイルとそれをサポートするリソースも作成します。変更イベントを Datadog に送信する EventBridge リソースなど、本ガイドのスタックが作成するリソースについては、[AWS インテグレーションを介した Datadog インスツルメンテーションの仕組み][6] を参照してください。

EC2 インスタンスと Lambda 関数の両方を 1 か所からインスツルメントしたい場合や、リージョン、ランタイム、メモリサイズで関数リストを絞り込みたい場合は、AWS インテグレーションを介したインスツルメンテーションを使用します。

`DD_TAGS` のタグに基づいて照合したい場合や、関数に適用するレイヤーバージョンを設定して固定しておきたい場合は、リモートインスツルメンテーションを使用します。どちらの製品も、AWS リソースタグに基づいて照合できます。

## 前提条件 {#prerequisites}

すべてのワークロードについて、以下を確認してください。

- **CloudFormation へのアクセス**: ターゲット AWS アカウントで CloudFormation スタックを承認できること。インスツルメンテーションによってアカウントにスタックがデプロイされるため、そのスタックをレビューして作成するための権限がユーザー (またはチームメンバー) に必要です。必要な権限とその理由については、[必要な AWS 権限](#required-aws-permissions)セクションを参照してください。
- **Datadog の権限**: インスツルメンテーションルールを表示するには、**Hosts Read** 権限が必要です。ルールを作成、編集、または削除するには、**Agent Install** 権限が必要です。

### Amazon EC2 インスタンス {#amazon-ec2-instances}

- **SSM Agent**: [AWS Systems Manager (SSM) Agent][2] がターゲットインスタンスにすでに存在している必要があります。Datadog は SSM を介して Agent をインストールしますが、SSM Agent 自体をインストールすることはできません。そのため、SSM Agent が含まれていないカスタム AMI から構築されたインスタンスは対象外となります。Datadog がこれらのインスタンスにフラグを付けるため、これらのインスタンスに対処できます。
- **サポートされているプラットフォーム**: Linux (x86_64 および arm64) および Windows (x86_64)。macOS および Windows (arm64) はサポートされていません。

### AWS Lambda 関数 {#aws-lambda-functions}

- **リソース収集**: AWS インテグレーションで [リソース収集][10] が有効になっている必要があります。Datadog はこれを使用して関数を一覧表示し、ルールがどの関数に一致するかをプレビューします。
- **AWS パーティション**: 関数は商用 `aws` パーティション内にある必要があります。AWS GovCloud または AWS China パーティション内の関数はサポートされていません。これは、Lambda インスツルメンテーションが [ワークロードアイデンティティフェデレーション][16] を介して認証を行いますが、この方式ではこれらのパーティションがサポートされていないためです。
- **パッケージタイプ**: 関数は Zip パッケージタイプを使用する必要があります。コンテナイメージ関数はサポートされていません。これは、Datadog インスツルメンテーションが Lambda レイヤーとして配布されており、コンテナイメージ関数ではそれを使用できないためです。
- **アーキテクチャ**: 関数は、`x86_64` または `arm64` のいずれか単一のアーキテクチャを使用する必要があります。
- **Lambda@Edge**: 関数は Lambda@Edge 関数であってはなりません。Datadog は、レプリカとそれらが複製する関数の両方を除外します。
- **レイヤー数**: AWS では、関数に使用できるレイヤーは 5 つまでに制限されています。Datadog は 2 つのレイヤー (OS のみのランタイムの場合は 1 つ) を追加するため、関数には既存のレイヤーに加えてそれらを追加できる余地が必要です。
- **サポート対象のランタイム**:

  | ランタイム | バージョン |
  |---|---|
  | Node.js | 16.x、18.x、20.x、22.x、24.x、26.x|
  | Python | 3.8、3.9、3.10、3.11、3.12、3.13、3.14|
  | Ruby | 3.2、3.3、3.4、4.0|
  | Java | 8 (`java8` および `java8.al2`)、11、17、21、25 |
  | .NET | 6、8、10|
  | OS のみ | `provided.al2` および `provided.al2023` (拡張レイヤーのみ、トレーシングレイヤーなし)|

Datadog は、これらの条件を満たさない関数をルールプレビューで対象外としてマークするため、ルールを適用する前に除外される関数を確認できます。

## 必要な AWS 権限 {#required-aws-permissions}

{{% aws-agent-installation %}}

以下のセクションでは、すべてのワークロードに共通する権限と、各ワークロードに固有の権限を一覧表示します。

### 変更通知の権限 {#change-notification-permissions}

これらの権限により、Datadog は AWS リソースの変更に対応できます。これらはすべてのワークロードに適用されます。

| 権限 | Datadog がこの権限を必要とする理由 |
|---|---|
| `events:PutRule`、`events:PutTargets`、`events:DescribeRule`、`events:ListTargetsByRule`、`events:RemoveTargets`、`events:DeleteRule` | Datadog がリソースの変更に対応できるように、変更通知を設定するため |
| `iam:GetRole`、`iam:PassRole` | EventBridge クロスリージョンロールを読み取り、渡します。両方とも `datadog-eventbridge-cross-region-role` ロールに制限されており、`iam:PassRole` はさらに EventBridge サービスに制限されています。|

### Amazon EC2 の権限 {#amazon-ec2-permissions}

| 権限 | Datadog がこの権限を必要とする理由 |
|---|---|
| `ec2:DescribeInstances` | インスタンスを検索し、ルール (状態、タグ、OS、アーキテクチャ) に一致するインスタンスをチェックするため |
| `ssm:DescribeInstanceInformation` | Datadog がなんらかの処理を行う前に、SSM Agent が実行されていることを確認するため |
| `ssm:GetDocument`、`ssm:CreateDocument`、`ssm:UpdateDocument`、`ssm:UpdateDocumentDefaultVersion` | インストールスクリプトをアカウントで公開し、最新の状態に保つため |
| `ssm:SendCommand`、`ssm:ListCommandInvocations` | インストールを実行し、完了したことを確認するため|
| `secretsmanager:DescribeSecret`、`secretsmanager:CreateSecret` | コマンドで渡されないように、API キーを保存するため |
| `iam:CreateRole`、`iam:CreateInstanceProfile`、`iam:AddRoleToInstanceProfile`、`iam:AttachRolePolicy`、`iam:PutRolePolicy`、`iam:PassRole`、`ec2:AssociateIamInstanceProfile`、および一致する`Get` と`List` による読み取り| インスタンスに IAM ロールが付与されていない場合に備えて、必要な最小限のアクセス権をインスタンスに付与するため (Systems Manager から到達可能であり、独自の API キーシークレットを読み取り可能)|
| `iam:Detach*`、`iam:Delete*`、`iam:RemoveRoleFromInstanceProfile`、`ec2:Disassociate*`、`ec2:DescribeIamInstanceProfileAssociations` | アンインストール時に、上記の各リソースをクリーンに削除するため |
| `ecs:ListClusters`、`ecs:ListContainerInstances` | Amazon Elastic Container Service (ECS) コンテナインスタンスを認識し、Datadog がそれらをスキップするようにするため (これらのインスタンスはクラスターレベルで処理されます) |

`iam:CreateRole` と `iam:PassRole` は、最も機密性の高い権限です。`iam:CreateRole` はアカウント内の `datadog-ec2-instrumenter/datadog-ssm-*` と一致するロール名に制限されており、`iam:PassRole` はさらに Amazon EC2 サービスに制限されています。

### AWS Lambda の権限 {#aws-lambda-permissions}

| 権限 | Datadog がこの権限を必要とする理由 |
|---|---|
| `lambda:ListFunctions` | アカウントおよびリージョン内の関数を検索します。|
| `cloudfront:ListDistributions` | Datadog がスキップできるように Lambda@Edge 関数を識別します。|
| `lambda:GetFunctionConfiguration`、`lambda:ListTags` | 関数の構成とタグを読み取り、どの関数がルールに一致するかを確認します。|
| `lambda:UpdateFunctionConfiguration` | Datadog レイヤーと環境変数を追加し、アンインストール時にそれらを削除します。|
| `lambda:GetLayerVersion` | 関数更新時に送信されるすべてのレイヤー (変更されていないユーザー独自のレイヤーを含む) を承認する必要があるという AWS の要件を満たします。|

Lambda インスツルメンテーションには、Secrets Manager、Systems Manager、または IAM の書き込み権限は必要ありません。関数の読み取りと更新は、お客様自身のアカウント内の Lambda 関数に制限されます。

## 仕組み {#how-it-works}

インスツルメンテーションは**インスツルメンテーションルール**に基づいています。これは、AWS アカウントと、対象とするリソースを記述するクエリを組み合わせたものです。Datadog はクエリを評価し、お客様のアカウント内の対象リソースをそれぞれインスツルメントし、その状態を維持します。

1. 対象リソースを指定するクエリを作成するか、特定のリソースを選択するか、または対象となるすべてのリソースを追加します。
1. Datadog はお客様のアカウント内のリソースに対してルールを評価し、対象となるリソースを記録します。
1. Datadog は各対象リソースをインスツルメントします。EC2 の場合は AWS Systems Manager を介して Agent をインストールし、Lambda の場合は Datadog レイヤーと環境変数を関数に追加します。
1. Datadog は対象リソースがインスツルメントされた状態を維持し、欠落したインスツルメンテーションを再インストールし、失敗した処理を再試行します。

初回セットアップ時に、CloudFormation スタックを 1 回承認します。その後、Datadog からインスツルメンテーションが自動的に実行されるため、新たに CloudFormation テンプレートを起動する必要はありません。

Datadog が作成する AWS リソース、インスツルメンテーションのメカニズム、Datadog がインスツルメンテーションを維持する仕組みなど、技術およびセキュリティの詳細については、[AWS インテグレーションを介した Datadog インスツルメンテーションの仕組み][6] を参照してください。

{{< img src="integrations/amazon_web_services/aws-agent-installation-how-it-works.png" alt="AWS Agent インストールプロセスのフローチャート。Datadog 内で発生するステップと、AWS アカウント内で実行されるステップを示しています。" style="width:70%;" >}}

<!-- TODO(DOCS-14545): the "How it works" diagram shows the EC2 flow only. Add a Lambda equivalent (or a workload-agnostic version) before publish. -->

### ルールによるリソースの一致方法を選択する{#choose-how-your-rule-matches-resources}

Datadog は時間の経過とともにルールを再評価するため、記述したクエリによって、インフラストラクチャーの変更に伴ってカバレッジがどのように動作するかが決まります。

**リソースが出現した時点でカバーする**には、インフラストラクチャーにすでに存在するタグと属性 (`env:prod` など) で一致させます。一致するリソースはすべてインスツルメントされます。これには、ルールを保存した後に作成または再タグ付けされたリソースも含まれます。これは、ルールを更新せずに、新しく一致したリソースを自動的に監視する場合に使用します。

**固定セットをカバーする**には、リソースリストからリソースを個別に選択します。ルールは選択したリソースのみに一致するため、後で出現したリソースは追加されません。

**固定セットが大きすぎて個別に選択できない場合**は、`datadog:true`のように管理しているタグで一致させます。このタグは、インスツルメント対象とするリソースにのみ適用してください。これより、タグを変更したときにのみカバレッジが変化するため、どのリソースがカバー対象となるかは Infrastructure as Code によって決まります。

<div class="alert alert-warning">
カバレッジは双方向で機能します。リソースがルールに一致しなくなった場合、Datadog はそのリソースからインスツルメンテーションを削除します。したがって、AWS でタグを変更すると、Datadog でルールを編集していなくても、リソースの監視が解除される可能性があります。
</div>

### ルールとタグのベストプラクティス {#best-practices-for-rules-and-tags}

**チームが所有するタグで一致させる。**他のチームが管理しているタグにルールが一致する場合、そのチームは Datadog を開くことなく、タグを付け直すことで監視を追加または解除できます。タグとルールを同じ所有者が管理することで、その決定を、決定を下した担当者の手元に残しておくことができます。

**通常の運用中に変更されるタグは使用しない。**環境の昇格、デプロイ、またはオートスケーリングテンプレートに伴って変更されるタグによって、リソースがカバー対象から除外または含められることがあります。リソースの存続期間に安定している属性に基づいて一致させます。

**ルールをアカウントの完全な構成として扱う。**各 AWS アカウントには、リソースタイプごとに 1 つのルールがあります。編集を行うたびに、既存のカバレッジに追加されるのではなく、そのリソースタイプのすべてのカバレッジのスコープが再設定されます。保存する前に、一致するリソースを確認してください。

**除外を使用して例外を設定する。**スキップしたいリソースが広範なルールのカバー対象となっている場合は、個別に選択したリストに切り替えるのではなく、そのルールからそれらのリソースを除外してください。除外することで、ルールを読みやすい状態に保ち、他のすべてのリソースに対する自動カバレッジを維持できます。

## Datadog が Lambda 関数に対して行う変更 {#what-datadog-changes-on-a-lambda-function}

Datadog は既存のレイヤーと環境変数を保持します。Node.js および Python 関数では、Datadog はハンドラーを Datadog ハンドラーにリダイレクトし、元のハンドラーを環境変数に保持します。Datadog は変更内容を正確に記録するため、アンインストールすると元の構成に復元されます。Datadog が行う特定のレイヤー、環境変数、およびハンドラーの変更については、テクニカルリファレンスの [Datadog が関数に対して行う変更][17] を参照してください。

**Datadog API キーは関数に書き込まれません。**拡張機能は [ワークロードアイデンティティフェデレーション][16] を通じて関数自体の実行ロールで認証を行うため、Lambda インスツルメンテーションのために Datadog 認証情報がアカウントに保存されることはありません。Datadog がこの認証を自動的にセットアップするため、構成する必要はありません。

拡張機能が収集する内容を調整するには、関数で標準の Datadog 環境変数を設定します。完全な一覧については、[AWS Lambda 向け Serverless Monitoring の構成][14] を参照してください。インスツルメンテーションが収集する内容と、それによって有効になる Lambda 監視機能については、[AWS Lambda 向け Serverless Monitoring][13] を参照してください。

## Datadog インスツルメンテーションのインストール {#install-datadog-instrumentation}

インスツルメントするリソースをどの程度制御するかに応じて、2 つのエントリーポイントからインスツルメンテーションを開始できます。

- **AWS インテグレーションセットアップ (対象となるすべてのリソースにインスツルメント)**: [AWS インテグレーションをセットアップ][5] する際に、ログやリソースの収集とともに表示される [AWS インテグレーションページ][7] で、インスツルメンテーションのトグルを有効にします。次に、必要なワークロードを選択します。Datadog は、それらのワークロードの対象となるすべてのリソースをインスツルメントし、対象のリソースが出現するたびに継続してインスツルメントします。
- **Fleet Automation (特定のリソースをインスツルメント)**: いつでも [AWS Install Agents ページ][8] を開き、目的のリソースを選択できます。

<!-- TODO(DOCS-14545): per AWS team, surfacing the install flow in the main AWS setup flow for non-first-time users is still rolling out; confirm it's live before publish. -->

インスツルメンテーションのトグルはセットアップ中に表示され、ワークロードセレクターには **EC2 インスタンス**、**Lambda 関数**、および **EKS クラスター** が一覧表示されます。**EC2 インスタンス** と **Lambda 関数** のみが選択可能です。

{{< img src="integrations/amazon_web_services/aws-agent-installation-setup-toggle.png" alt="AWS セットアップの [Install the Datadog Agent] (Datadog Agent のインストール) ステップ。インストールトグルが有効になっており、ホスト (EC2) ワークロードトグルがオンになっています。" style="width:80%;" >}}

<!-- TODO(DOCS-14545): the setup-toggle screenshot predates the Lambda workload. Recapture it showing EC2 Instances, Lambda Functions, and EKS Clusters (Coming Soon) before publish. -->

[AWS Install Agents] (AWS エージェントのインストール) ページからインストールするには、次のようにします。

1. インスツルメンテーションするワークロードとして **EC2 インスタンス**または **Lambda 関数** を選択します。
1. 対象リソースを指定するクエリを記述するか、特定のリソースをリストから選択するか、または対象となるすべてのリソースを追加します。Lambda の場合、リージョン、ランタイム、メモリサイズでリストを絞り込むことができます。
1. 一致するリソースのプレビューを確認します。Datadog がインスツルメントできないリソースは、その理由とともに対象外として表示されます。
1. 生成された CloudFormation スタックを確認し、AWS に進んで作成します。Datadog は、これについて一度のみ確認を求めます。
1. Datadog に戻ります。インスツルメンテーションは自動的に進行し、リソースがインスツルメントされると Datadog が進捗状況を報告します。

<!-- TODO(DOCS-14545): add resource-selection / Manage Agents page screenshot (AWS Install Agents page) — setup-toggle screenshot added. -->

## インスツルメンテーションの確認{#verify-instrumentation}

インスツルメンテーション完了後:

- **EC2**: 新しくインストールされた Agent が [インフラストラクチャーリスト][3] とホストマップに表示されます。Fleet Automation の [Fleet View] (フリートビュー) に、同じ Agent が一覧表示されます。
- **Lambda**: インスツルメンテーションされた関数が [Serverless][11] ページに表示され、そのトレースが [APM][12] に表示されます。関数がインスツルメンテーションされているにもかかわらずテレメトリが届かない場合は、[AWS Lambda モニタリングのトラブルシューティング][15] を参照してください。

<!-- TODO(DOCS-14545): add expected time-to-data once confirmed. -->

## インスツルメントされたリソースの管理 {#manage-instrumented-resources}

Fleet Automation の [[AWS Install Agents] (AWS エージェントのインストール) ページ][8] を使用して、AWS インテグレーションを介してインスツルメントしたリソースを管理します。

このページから、次のことができます。

- インスツルメントされたリソースとそのステータスを表示します。
- AWS 環境内の新しいリソースにインスツルメントします。
- 監視が不要になったリソースからインスツルメンテーションを削除します。

ルールが唯一のソースとなります。カバレッジを停止するには、ルールを更新してください。対象のリソースからインスツルメンテーションを自分で削除した場合、Datadog はそれを復元します。EC2 の場合、[Fleet Automation][4] を使用して Agent の構成とバージョンアップグレードを管理します。Lambda の場合、Datadog はレイヤーバージョンを自動的に更新します。

## Datadog インスツルメンテーションの削除 {#remove-datadog-instrumentation}

インスツルメンテーションを削除するには、ルールからリソースを削除するか、ルールのクエリを編集するか、ルールを削除してください。ルールを削除すると、そのルールが対象としていたすべてのリソースからインスツルメンテーションが削除されます。

- **EC2**: Datadog は、各インスタンスに対して作成した Datadog Agent と IAM ロールまたはインスタンスプロファイルを削除します。
- **Lambda**: Datadog は追加したレイヤーを削除し、関数が以前保持していた環境変数とハンドラーを復元します。自分で追加したレイヤーと環境変数はそのまま残ります。

## トラブルシューティング {#troubleshooting}

### EC2 インスタンスに SSM Agent が存在していない{#the-ssm-agent-is-not-present-on-an-ec2-instance}

EC2 への Agent のインストールは AWS Systems Manager (SSM) Agent に依存していますが、Datadog はこの Agent をインストールできません。Datadog は、カスタム AMI から構築されたインスタンスを含め、SSM Agent がないすべてのインスタンスに対象外としてフラグを付けます。インスタンスに SSM Agent をインストールしてから、再試行してください。AWS ドキュメントの [SSM Agent の使用][2] を参照してください。

### 権限または IAM エラーが発生する {#a-permission-or-iam-error-occurs}

権限が不足しているためにインスツルメンテーションを完了できない場合、Datadog は新しい権限を必要とする CloudFormation リソースへのリンクを含む通知を表示します。既存のスタックを更新して、[必要な権限](#required-aws-permissions)を付与してください。新しいスタックを作成する必要はありません。

### Lambda 関数はすでにインスツルメント済みとしてスキップされる {#a-lambda-function-is-skipped-as-already-instrumented}

Datadog は、Datadog レイヤー、Datadog ハンドラー、または Datadog が適用していない Datadog 環境変数が含まれている関数をスキップします。これらの関数をスキップすることで、レイヤーと構成の競合を防ぎます。代わりに AWS インテグレーションから関数を管理するには、既存の Datadog インスツルメンテーションを関数から削除します。その後、Datadog は自動的に関数をインスツルメントします。

[リモートインスツルメンテーション][9] によって管理されている関数もスキップされ、Datadog はどちらが適用されるかを通知します。関数は、1 つの Datadog インスツルメンテーション製品によってのみ管理できます。

### Lambda 関数がレイヤー制限を超える {#a-lambda-function-exceeds-the-layer-limit}

AWS では、関数に使用できるレイヤーは最大 5 つに制限されており、Datadog は 2 つのレイヤー (OS 専用ランタイムの場合は 1 つ) を追加します。インスツルメンテーションによって制限を超えるほど関数にすでにレイヤーが含まれている場合、Datadog はそれを報告し、再試行せずに停止します。空きを確保するために、関数からレイヤーを 1 つ削除してください。その後、Datadog は自動的に関数をインスツルメントします。

### Lambda 関数が Datadog 以外の実行ラッパーを使用している {#a-lambda-function-uses-a-non-datadog-execution-wrapper}

Java および .NET のインスツルメンテーションは `AWS_LAMBDA_EXEC_WRAPPER` を設定します。関数がすでにその変数に Datadog ラッパー以外の値を設定している場合、Datadog はそのラッパーを上書きせず、関数をスキップします。AWS インテグレーションを介して関数をインスツルメントするには、関数からカスタムラッパーを削除します。関数に独自のラッパーが必要な場合は、代わりに自分でインスツルメントします。[AWS Lambda のインスツルメンテーション][18] を参照してください。

### Lambda 関数が対象外として表示される {#a-lambda-function-appears-as-ineligible}

Datadog は、関数が [Lambda の前提条件](#aws-lambda-functions)を満たしていない場合に、その関数を対象外としてマークします。最も一般的な理由は、コンテナイメージのパッケージタイプ、サポートされていないランタイムまたはアーキテクチャ、商用 `aws` パーティション外の関数、および Lambda@Edge 関数です。Lambda@Edge レプリカおよびそれらが複製する関数は、どちらも除外されます。

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
[9]: https://docs.datadoghq.com/ja/serverless/aws_lambda/remote_instrumentation/
[10]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#resource-collection
[11]: https://app.datadoghq.com/functions
[12]: https://app.datadoghq.com/apm/traces
[13]: https://docs.datadoghq.com/ja/serverless/aws_lambda/
[14]: https://docs.datadoghq.com/ja/serverless/aws_lambda/configuration/
[15]: https://docs.datadoghq.com/ja/serverless/aws_lambda/troubleshooting/
[16]: https://docs.datadoghq.com/ja/account_management/workload_identity_federation/
[17]: https://docs.datadoghq.com/ja/integrations/guide/aws-agent-installation-technical-reference/#what-datadog-changes-on-a-function
[18]: https://docs.datadoghq.com/ja/serverless/aws_lambda/instrumentation/