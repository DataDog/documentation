---
aliases:
- /ja/security/cloud_security_management/setup/agentless_scanning/quick_start
- /ja/security/cloud_security_management/setup/agentless_scanning/cloudformation
- /ja/security/cloud_security_management/setup/agentless_scanning/terraform
- /ja/security/cloud_security_management/setup/agentless_scanning/azure_resource_manager
- /ja/security/cloud_security_management/guide/agentless_aws_integration
- /ja/security/cloud_security_management/guide/agentless_terraform
further_reading:
- link: /security/cloud_security_management/setup
  tag: ドキュメント
  text: Cloud Security のセットアップ
- link: /security/cloud_security_management/agentless_scanning
  tag: ドキュメント
  text: Cloud Security Agentless スキャン
- link: /security/cloud_security_management/setup/agentless_scanning/update
  tag: ドキュメント
  text: Agentless スキャンの更新
- link: /security/cloud_security_management/troubleshooting/agentless_scanning
  tag: ドキュメント
  text: Agentless スキャンのトラブルシューティング
title: Agentless スキャンの有効化
---
Agentless スキャンは、Datadog Agent をインストールすることなく、クラウドインフラストラクチャー内に存在する脆弱性を可視化します。Agentless スキャンは完全にご自身のインフラストラクチャー内で実行され、Datadog に送信するデータを最小限に抑え、機密データをご利用の環境内に保持します。スキャナーはクラウドアカウント内で実行されるため、標準の[クラウドプロバイダーコスト][20]が適用されます。詳細については、[Agentless スキャンの概要][12]を参照してください。

セットアップには、クラウドアカウントごとに約 30 分かかります。

1. 以下の前提条件を確認します。
1. クラウドプロバイダーとデプロイ方法を選択します。
1. クラウドアカウントでテンプレートを起動します。
1. Datadog でスキャン結果を確認します。

## 前提条件 {#prerequisites}

Agentless スキャンをセットアップする前に、以下の前提条件が満たされていることを確認します。

- **Remote Configuration**: Agentless スキャナーにスキャンの指示を送信するには、Datadog 組織で [Remote Configuration][3] が有効になっている必要があります。
- **[API キーとアプリケーションキー][1]**:
  - スキャナーがスキャン結果を Datadog に報告するためには、Remote Configuration が有効な {{< ui >}}API key{{< /ui >}} が必要です。
  - Datadog API を通じてスキャン機能を有効にするには、`Integrations Manage` または `Org Management` の権限を持つ {{< ui >}}Application key{{< /ui >}} が必要です。
- **クラウド権限**: Agentless スキャンインスタンスがホスト、ホストイメージ、コンテナレジストリ、および関数をスキャンするには、特定の権限が必要です。Datadog は、透明性を確保するために以下に記載されている権限をインストール中に自動的に適用します。<br><br>
  {{< collapse-content title="AWS スキャン権限" level="h3" >}}
  <p>スキャン権限:</p>
  <ul>
    <li><code>ebs:GetSnapshotBlock</code></li>
    <li><code>ebs:ListChangedBlocks</code></li>
    <li><code>ebs:ListSnapshotBlocks</code></li>
    <li><code>ec2:CopySnapshot</code></li>
    <li><code>ec2:CreateSnapshot</code></li>
    <li><code>ec2:CreateTags</code></li>
    <li><code>ec2:DeleteSnapshot</code></li>
    <li><code>ec2:DeregisterImage</code></li>
    <li><code>ec2:DescribeImages</code></li>
    <li><code>ec2:DescribeSnapshots</code></li>
    <li><code>ec2:DescribeVolumes</code></li>
    <li><code>ecr:BatchGetImage</code></li>
    <li><code>ecr:GetAuthorizationToken</code></li>
    <li><code>ecr:GetDownloadUrlForLayer</code></li>
    <li><code>kms:CreateGrant</code></li>
    <li><code>kms:Decrypt</code></li>
    <li><code>kms:DescribeKey</code></li>
    <li><code>lambda:GetFunction</code></li>
    <li><code>lambda:GetLayerVersion</code></li>
  </ul>
  <p>機密データスキャン (DSPM) が有効になっている場合のみ:</p>
  <ul>
    <li><code>kms:GenerateDataKey</code></li>
    <li><code>s3:GetObject</code></li>
    <li><code>s3:ListBucket</code></li>
  </ul>
  {{< /collapse-content >}}

  {{< collapse-content title="Azure スキャン権限" level="h3" >}}
  <ul>
    <li><code>Microsoft.Compute/virtualMachines/read</code></li>
    <li><code>Microsoft.Compute/virtualMachines/instanceView/read</code></li>
    <li><code>Microsoft.Compute/virtualMachineScaleSets/read</code></li>
    <li><code>Microsoft.Compute/virtualMachineScaleSets/instanceView/read</code></li>
    <li><code>Microsoft.Compute/virtualMachineScaleSets/virtualMachines/read</code></li>
    <li><code>Microsoft.Compute/virtualMachineScaleSets/virtualMachines/instanceView/read</code></li>
    <li><code>Microsoft.Compute/disks/read</code></li>
    <li><code>Microsoft.Compute/disks/beginGetAccess/action</code></li>
    <li><code>Microsoft.Compute/disks/endGetAccess/action</code></li>
    <li><code>Microsoft.Compute/galleries/images/versions/read</code></li>
    <li><code>Microsoft.ContainerRegistry/registries/pull/read</code></li>
    <li><code>Microsoft.ContainerRegistry/registries/repositories/content/read</code> (データアクション)</li>
    <li><code>Microsoft.Web/sites/read</code></li>
    <li><code>Microsoft.Web/sites/publish/Action</code></li>
  </ul>
  {{< /collapse-content >}}

  {{< collapse-content title="GCP スキャン権限" level="h3" >}}
  <ul>
    <li><code>compute.disks.create</code></li>
    <li><code>compute.disks.createSnapshot</code></li>
    <li><code>compute.disks.delete</code></li>
    <li><code>compute.disks.get</code></li>
    <li><code>compute.disks.setLabels</code></li>
    <li><code>compute.disks.use</code></li>
    <li><code>compute.globalOperations.get</code></li>
    <li><code>compute.images.get</code></li>
    <li><code>compute.instances.attachDisk</code></li>
    <li><code>compute.instances.detachDisk</code></li>
    <li><code>compute.snapshots.create</code></li>
    <li><code>compute.snapshots.get</code></li>
    <li><code>compute.snapshots.list</code></li>
    <li><code>compute.snapshots.delete</code></li>
    <li><code>compute.snapshots.setLabels</code></li>
  </ul>
  {{< /collapse-content >}}

## セットアップ {#setup}

デプロイメントの構成方法 (スキャナーをデプロイするアカウント数やリージョン数など) については、[Agentless スキャンのデプロイ][2]を参照してください。

クラウドプロバイダーを選択して、利用可能なセットアップ方法を確認してください。複数のクラウドプロバイダーで Agentless スキャンをセットアップしている場合は、各プロバイダーのセットアップを個別に完了してください。

{{< tabs >}}
{{% tab "AWS" %}}

### セットアップを選択する {#choose-your-setup}

- **Datadog を初めて利用する場合**: [Cloud Security の紹介][2]ページで、{{< ui >}}Get Started with Cloud Security{{< /ui >}} をクリックしてから、{{< ui >}}Quick Start{{< /ui >}} をクリックします。Quick Start は、AWS CloudFormation を使用し、すべての Cloud Security 機能をあらかじめ有効にした状態で Agentless スキャンをデプロイするガイド付きセットアップフローです。これは、Cloud Security Management をまだセットアップしていない組織でのみ利用可能です。
- **Datadog 内の単一の AWS アカウント**: [CloudFormation](#aws-cloudformation-setup) または [Terraform](#aws-terraform-setup) を使用します。マルチリージョンデプロイメントには Terraform が推奨されます。
- **複数のアカウントを持つ AWS 組織**: [CloudFormation StackSet](#aws-cloudformation-stackset-setup) を使用して、すべてのメンバーアカウントでスキャン機能をデプロイします。
- **AWS Organizations を使用しない複数のアカウント**: アカウントごとに [CloudFormation](#aws-cloudformation-setup) または [Terraform](#aws-terraform-setup) のセットアップを繰り返します。

{{% collapse-content title="CloudFormation" level="h4" id="aws-cloudformation-setup" %}}
すでに Datadog と統合されている AWS アカウントがあり、Agentless スキャンを有効にする場合、または新しい AWS アカウントを追加する場合は、CloudFormation を使用します。

#### 新しい AWS アカウント {#new-aws-account}

1. [Cloud Security のセットアップ][1]ページで、{{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}AWS{{< /ui >}} をクリックします。
1. AWS セクションの下部で、{{< ui >}}Add AWS accounts by following these steps{{< /ui >}} をクリックします。{{< ui >}}Add New AWS Account(s){{< /ui >}} ダイアログが表示されます。
1. {{< ui >}}Add a Single AWS Account{{< /ui >}} および {{< ui >}}CloudFormation{{< /ui >}} のオプションを選択します。
1. CloudFormation スタックを作成する AWS リージョンを選択します。
1. [Remote Configuration][3] が有効になっている API キーを選択します。
1. クラウドストレージの {{< ui >}}Sensitive Data Scanner{{< /ui >}} を有効にするかどうかを選択します。これにより、Amazon S3 リソース内の機密データが自動的にカタログ化および分類されます。
1. {{< ui >}}Launch CloudFormation Template{{< /ui >}} をクリックします。新しいウィンドウが開き、AWS CloudFormation 画面が表示されます。提供される CloudFormation テンプレートを使用してスタックを作成します。テンプレートには、Agentless スキャナーのデプロイと管理に必要な IAM 権限が含まれています。

#### 既存の AWS アカウント {#existing-aws-account}

1. [Cloud Security のセットアップ][1]ページで、{{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}AWS{{< /ui >}} をクリックします。
1. Agentless スキャナーをデプロイする AWS アカウントをクリックします。サイドパネルが開きます。
1. {{< ui >}}Features{{< /ui >}} タブで、{{< ui >}}Configure Agentless Scanning{{< /ui >}} または {{< ui >}}Manage{{< /ui >}} をクリックして、Agentless スキャンのセットアップモーダルを開きます。
1. {{< ui >}}How would you like to set up Agentless Scanning?{{< /ui >}} セクションで、{{< ui >}}CloudFormation{{< /ui >}} を選択します。
1. CloudFormation スタックに対応する AWS リージョンを選択します。
1. [Remote Configuration][3] が有効になっている API キーを選択します。
1. Datadog が生成する新しいアプリケーションキーをコピーします。
1. 次のいずれかを選択します。
   - 既存のスキャナーを使用し、使用するスキャナーを選択してください。
   - 新しいスキャナーをデプロイします。
1. 有効にする機能を切り替えます ({{< ui >}}Agentless Vulnerability Management{{< /ui >}} または {{< ui >}}Sensitive Data Scanning for Cloud Storage{{< /ui >}} など)。
1. {{< ui >}}Launch CloudFormation Template{{< /ui >}} をクリックします。新しいウィンドウが開き、AWS CloudFormation 画面が表示されます。提供される CloudFormation テンプレートを使用してスタックを作成します。
1. {{< ui >}}Done{{< /ui >}} をクリックします。

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[3]: /ja/remote_configuration

{{% /collapse-content %}}
{{% collapse-content title="CloudFormation StackSet (マルチアカウント)" level="h4" id="aws-cloudformation-stackset-setup" %}}

複数のアカウントを持つ AWS Organizations の場合、CloudFormation StackSet を使用して、すべてのメンバーアカウントで Agentless スキャンの委任ロールをデプロイします。このアプローチにより、オンボーディングが自動化され、AWS Organization に追加される新しいアカウントが構成されます。

このセットアップにより、AWS Organization 全体または特定の Organizational Units (OU) において[クロスアカウントスキャン](/security/cloud_security_management/setup/agentless_scanning/deployment_methods)に必要な委任ロールがデプロイされます。まず、[CloudFormation](#aws-cloudformation-setup) または [Terraform](#aws-terraform-setup) を使用して中央スキャンアカウントで Agentless スキャンをセットアップします。その後、StackSet をデプロイして残りのアカウントを構成します。

#### 前提条件 {#prerequisites-1}

- AWS 管理アカウントへのアクセス
- [AWS Organizations による信頼できるアクセス](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-enable-trusted-access.html)が CloudFormation StackSets で有効になっている必要があります
- Agentless スキャンがすでに構成されている中央スキャンアカウント ([上記を参照](#aws-cloudformation-setup))

#### StackSet をデプロイする {#deploy-the-stackset}

1. AWS 管理アカウントにログインし、{{< ui >}}CloudFormation{{< /ui >}} > {{< ui >}}StackSets{{< /ui >}} に移動します。
1. {{< ui >}}Create StackSet{{< /ui >}} をクリックします。
1. {{< ui >}}Service-managed permissions{{< /ui >}} を選択します。
1. {{< ui >}}Specify template{{< /ui >}} で、{{< ui >}}Amazon S3 URL{{< /ui >}} を選択し、次の URL を入力します。
   ```
   https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/v4.22.1/datadog_agentless_delegate_role_stackset.yaml
   ```
1. {{< ui >}}StackSet name{{< /ui >}} を入力します (例: `DatadogAgentlessScanningStackSet`)。
1. {{< ui >}}ScannerInstanceRoleARN{{< /ui >}} パラメーターを構成します。これは、Agentless スキャナーインスタンスにアタッチされている IAM ロールの ARN です。
      <div class="alert alert-danger"> <code>ScannerInstanceRoleARN</code> はスキャナーインスタンスロールの正確な ARN でなければなりません (例:<code>arn:aws:iam::123456789012:role/DatadogAgentlessScannerRole</code>)。ルート ARN (例: <code>arn:aws:iam::123456789012:root</code> ) の使用は機能しません。</div>
      <p> <code>ScannerInstanceRoleARN</code> は、委任ロール (ターゲットアカウントで作成 )とスキャナーインスタンス (中央アカウントですでに実行中) との間の信頼関係を確立します。これにより、次のようなクロスアカウントスキャンが可能になります。</p>
      <ul>
        <li>スキャナーはアカウント 4 で実行されます。</li>
        <li>委任ロールはアカウント 1、2、3 に存在します (StackSet を通じてデプロイ)。</li>
        <li>スキャナーは委任ロールを引き受け、それらのアカウントのリソースをスキャンします。</li>
      </ul>
1. {{< ui >}}Deployment targets{{< /ui >}} を設定して、AWS Organization 全体または特定の OU でデプロイします。
1. {{< ui >}}Automatic deployment{{< /ui >}} を有効にして、AWS Organization に追加された新しいアカウントを構成します。
1. デプロイメントの単一のリージョンを選択します (IAM ロールはグローバルであり、アカウントごとに 1 回だけデプロイする必要があります)。
1. StackSet を確認して送信します。

StackSet がデプロイされると、メンバーアカウントは中央スキャナーアカウントからクロスアカウントスキャンを許可するように構成されます。
{{% /collapse-content %}}
{{% collapse-content title="Terraform" level="h4" id="aws-terraform-setup" %}}

[Terraform Datadog Agentless Scanner モジュール](https://github.com/DataDog/terraform-module-datadog-agentless-scanner)は、Datadog Agentless スキャナーをインストールするための再利用可能な構成を提供します。Terraform は、マルチリージョン環境で推奨されるデプロイ方法です。リージョンごとに 1 つのスキャナーをデプロイするため、クロスリージョンネットワークコストを回避できます。デプロイメントトポロジ―を選択する際のガイダンスについては、[Agentless スキャンのデプロイ](/security/cloud_security_management/setup/agentless_scanning/deployment_methods)を参照してください。マルチリージョン構成を含む使用例については、GitHub リポジトリの[サンプルディレクトリ](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples)を参照してください。

#### 新しい AWS アカウント {#new-aws-account-1}

1. [Cloud Security のセットアップ][1]ページで、{{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}AWS{{< /ui >}} をクリックします。
1. AWS セクションの下部で、{{< ui >}}Add AWS accounts by following these steps{{< /ui >}} をクリックします。{{< ui >}}Add New AWS Account(s){{< /ui >}} ダイアログが表示されます。
1. {{< ui >}}Add a Single AWS Account{{< /ui >}} および {{< ui >}}Manually{{< /ui >}} のオプションを選択します。
1. [Datadog Agentless スキャナーモジュール][2]をインストールするための手順に従います。
1. {{< ui >}}I confirm that the Datadog IAM Role has been added to the AWS Account{{< /ui >}} チェックボックスを選択します。
1. {{< ui >}}AWS Account ID{{< /ui >}} および {{< ui >}}AWS Role Name{{< /ui >}} を入力します。
1. {{< ui >}}Save{{< /ui >}} をクリックします。

#### 既存の AWS アカウント {#existing-aws-account-1}

1. [Cloud Security のセットアップ][1]ページで、{{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}AWS{{< /ui >}} をクリックします。
1. Agentless スキャナーをデプロイする AWS アカウントをクリックして、サイドパネルを開きます。
1. {{< ui >}}Features{{< /ui >}} タブで、{{< ui >}}Configure Agentless Scanning{{< /ui >}} または {{< ui >}}Manage{{< /ui >}} をクリックして、Agentless スキャンのセットアップモーダルを開きます。
1. {{< ui >}}How would you like to set up Agentless Scanning?{{< /ui >}} セクションで、{{< ui >}}Terraform{{< /ui >}} を選択します。
1. [Datadog Agentless スキャナーモジュール][2]をインストールするための手順に従います。
1. {{< ui >}}I confirm the Datadog Agentless Scanner was installed using Terraform{{< /ui >}} チェックボックスを選択します。
1. {{< ui >}}Done{{< /ui >}} をクリックします。

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md

{{% /collapse-content %}}

上記のいずれかのセットアップ方法を完了した後、[設定を確認](#verify-your-setup)します。

[2]: https://app.datadoghq.com/security/csm/
[3]: /ja/remote_configuration

{{% /tab %}}

{{% tab "Azure" %}}

### セットアップを選択する {#choose-your-setup-1}

- **Azure 新規顧客**: まず [Datadog Azure インテグレーション](https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=azure)をセットアップしてから、Agentless スキャンを有効にします。
- **既存の統合済み Azure サブスクリプション**: [Cloud Shell](#azure-cloud-shell-setup) (推奨)、[Azure Resource Manager](#azure-resource-manager-setup)、または [Terraform](#azure-terraform-setup) を使用します。
- **複数のサブスクリプション**: 反復可能なマルチサブスクリプションデプロイメントには [Cloud Shell](#azure-cloud-shell-setup) を使用します。[Terraform](#azure-terraform-setup) は独自のインフラストラクチャーをコードとして管理する場合にも利用できます。

<div class="alert alert-info">Azure サブスクリプションを Datadog にまだ接続していない場合は、まず <a href="https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=azure">Azure インテグレーションをセットアップ</a>してください。</div>

{{% collapse-content title="Cloud Shell" level="h4" id="azure-cloud-shell-setup" %}}
Azure Cloud Shell を使用して、Azure サブスクリプションの Agentless スキャンをセットアップします。この方法では、[セットアップスクリプト](https://github.com/DataDog/integrations-management/tree/main/azure/agentless)がダウンロードされます。このスクリプトは [Azure の Terraform Datadog Agentless スキャナーモジュール](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/azure#readme)をラップするため、Terraform を直接管理する必要はありません。実行する前にスクリプトを確認できます。

1. Cloud Shell で使用する ID に必要な Azure 権限があることを確認します。

   - **スキャナーサブスクリプション**において、ID にはロール割り当ての書き込みおよびリソース作成を許可するロール (**Owner** など) が必要です。
   - **各スキャン対象サブスクリプション**において、ID にはスキャナーのマネージド ID にディスクのスナップショット作成と読み取りに必要な権限を付与できるよう `Microsoft.Authorization/roleAssignments/write` 権限を付与するロール (**User Access Administrator** または **Owner** など) が必要です。

   生成されたコマンドを実行する前に、Azure でセットアップスクリプトが行うことを確認してください。

   - **Terraform ステート**: デフォルトでは、**スキャナー**サブスクリプション内に Azure ストレージアカウントが作成されます。代わりにスキャナーのリソースグループ内の既存のストレージアカウントを再利用するには、コマンドを実行する前に `TF_STATE_STORAGE_ACCOUNT` を設定します。この変数が設定されている場合、スクリプトは新しいアカウントを作成しません。
   - **リソースプロバイダー**: 可能な場合は、スキャナーサブスクリプションに次のリソースプロバイダーを登録します。`Microsoft.Compute`、`Microsoft.Network`、`Microsoft.ManagedIdentity`、`Microsoft.Storage`、`Microsoft.KeyVault`、`Microsoft.Authorization`。
1. [Cloud Security のセットアップ](https://app.datadoghq.com/security/configuration/csm/setup)ページで、{{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}Azure{{< /ui >}} をクリックします。
1. Agentless スキャナーをデプロイする Azure サブスクリプションをクリックします。サイドパネルが開きます。
1. {{< ui >}}Features{{< /ui >}} タブで、{{< ui >}}Configure Agentless Scanning{{< /ui >}} または {{< ui >}}Manage{{< /ui >}} をクリックして、Agentless スキャンのセットアップモーダルを開きます。
1. {{< ui >}}How would you like to set up Agentless Scanning?{{< /ui >}} セクションで、{{< ui >}}Cloud Shell{{< /ui >}} を選択します。
1. [Remote Configuration](/remote_configuration) が有効になっている {{< ui >}}API key{{< /ui >}} を選択します。アプリケーションキーが自動的に生成されます。
1. スキャンする {{< ui >}}Azure subscriptions{{< /ui >}} を選択します。
1. スキャナーを構成します。
   - すでにスキャナーがデプロイされている場合は、{{< ui >}}use an existing scanner{{< /ui >}} (推奨) または {{< ui >}}deploy a new scanner{{< /ui >}} を選択できます。
   - {{< ui >}}deploy a new scanner{{< /ui >}} を選択する場合は、{{< ui >}}scanner subscription{{< /ui >}} (選択されたサブスクリプションのいずれかでなければなりません) および {{< ui >}}scanner locations{{< /ui >}} (Azure リージョン、最大 4 つ) を選択します。Datadog では、ホストが 150 を超えるすべてのリージョンにスキャナーをデプロイすることを推奨しています。
1. {{< ui >}}Copy command{{< /ui >}} をクリックして生成されたコマンドをコピーし、{{< ui >}}Open Azure Cloud Shell{{< /ui >}} をクリックして [Azure Cloud Shell](https://shell.azure.com) を開きます。コマンドを確認して実行します。このスクリプトは、[Azure の Terraform Datadog Agentless スキャナーモジュール](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/azure#readme)を適用して、選択したサブスクリプションと場所でスキャナーをデプロイおよび構成します。
1. コマンドが完了したら、Datadog セットアップページに戻り、{{< ui >}}Done{{< /ui >}} をクリックします。
{{% /collapse-content %}}
{{% collapse-content title="Azure Resource Manager" level="h4" id="azure-resource-manager-setup" %}}
Azure Resource Manager テンプレートを使用して Agentless スキャナーをデプロイします。このテンプレートには、Agentless スキャナーのデプロイと管理に必要なロール定義が含まれています。

#### 新しい Azure サブスクリプション {#new-azure-subscription}

<div class="alert alert-info"><a href="/integrations/guide/azure-manual-setup/?tab=azurecli">Datadog Azure インテグレーション</a>がセットアップされていることを確認します。</div>

{{% csm-agentless-azure-resource-manager %}}

#### 既存の Azure サブスクリプション {#existing-azure-subscription}

{{% csm-agentless-azure-resource-manager %}}

{{% /collapse-content %}}
{{% collapse-content title="Terraform" level="h4" id="azure-terraform-setup" %}}

[Terraform Datadog Agentless Scanner モジュール](https://github.com/DataDog/terraform-module-datadog-agentless-scanner)は、Datadog Agentless スキャナーをインストールするための再利用可能な構成を提供します。デプロイメントトポロジ―を選択する際のガイダンスについては、[Agentless スキャンのデプロイ](/security/cloud_security_management/setup/agentless_scanning/deployment_methods)を参照してください。使用例については、GitHub リポジトリの[サンプルディレクトリ](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples)を参照してください。

1. [Cloud Security のセットアップ](https://app.datadoghq.com/security/configuration/csm/setup)ページで、{{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}Azure{{< /ui >}} をクリックします。
1. Agentless スキャナーをデプロイする Azure サブスクリプションをクリックします。サイドパネルが開きます。
1. {{< ui >}}Features{{< /ui >}} タブで、{{< ui >}}Configure Agentless Scanning{{< /ui >}} または {{< ui >}}Manage{{< /ui >}} をクリックして、Agentless スキャンのセットアップモーダルを開きます。
1. {{< ui >}}How would you like to set up Agentless Scanning?{{< /ui >}} セクションで、{{< ui >}}Terraform{{< /ui >}} を選択します。
1. [Datadog Agentless スキャナーモジュール](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/azure#readme)をインストールするための手順に従います。
1. {{< ui >}}Done{{< /ui >}} をクリックします。

{{% /collapse-content %}}

上記のいずれかのセットアップ方法を完了した後、[設定を確認](#verify-your-setup)します。

{{% /tab %}}

{{% tab "GCP" %}}

### セットアップを選択する {#choose-your-setup-2}

- **GCP の新規顧客**: まず [GCP インテグレーションをセットアップ][25]してから、Agentless スキャンを有効にします。
- **既存の統合済み GCP プロジェクト**: [Cloud Shell](#gcp-cloud-shell-setup) (推奨) または [Terraform](#gcp-terraform-setup) を使用します。

<div class="alert alert-info">GCP プロジェクトを Datadog にまだ接続していない場合は、まず <a href="https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=gcp">GCP インテグレーションをセットアップ</a>してください。</div>

{{% collapse-content title="Cloud Shell" level="h4" id="gcp-cloud-shell-setup" %}}
Google Cloud Shell を使用して、GCP プロジェクトの Agentless スキャンをセットアップします。この方法では、[GCP の Terraform Datadog Agentless スキャナーモジュール](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme)をラップする[セットアップスクリプト](https://github.com/DataDog/integrations-management/tree/main/gcp/agentless)がダウンロードされるため、Terraform を直接管理する必要はありません。実行する前にスクリプトを確認できます。

1. 必要な GCP 権限があることを確認します。

   - **スキャナープロジェクト**では、Cloud Shell で使用する ID に **Owner** または同等の権限が必要です。
   - **ストレージ**: スキャナープロジェクトに Terraform ステートを保存するストレージを作成する権限、または `TF_STATE_BUCKET` で指定する既存のバケットを使用する権限が必要です (例: `roles/storage.admin`、または `storage.buckets.create`、`storage.buckets.get`、および `storage.buckets.update` の権限)。

   生成されたコマンドを実行する前に、GCP でセットアップスクリプトが行うことを確認してください。

   - **Terraform ステート**: デフォルトでは**スキャナー**プロジェクトで GCS バケットを作成します。既存のバケットを再利用するには、コマンドを実行する前に `TF_STATE_BUCKET` を設定します。その変数が設定されている場合、スクリプトはバケットを作成しません。
   - {{< ui >}}Setting up Terraform state storage{{< /ui >}} で 403 エラーが発生した場合は、トラブルシューティングガイドの [GCP: ステートバケットの作成に失敗しました][26]を参照してください。

1. [Cloud Security のセットアップ](https://app.datadoghq.com/security/configuration/csm/setup)ページで、{{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}GCP{{< /ui >}} をクリックします。
1. Agentless スキャナーをデプロイする GCP プロジェクトをクリックします。サイドパネルが開きます。
1. {{< ui >}}Features{{< /ui >}} タブで、{{< ui >}}Configure Agentless Scanning{{< /ui >}} または {{< ui >}}Manage{{< /ui >}} をクリックして、Agentless スキャンのセットアップモーダルを開きます。
1. {{< ui >}}How would you like to set up Agentless Scanning?{{< /ui >}} セクションで、{{< ui >}}Cloud Shell{{< /ui >}} を選択します。
1. [Remote Configuration](/remote_configuration) が有効になっている {{< ui >}}API key{{< /ui >}} を選択します。アプリケーションキーが自動的に生成されます。
1. スキャンする {{< ui >}}GCP projects{{< /ui >}} を選択します。
1. スキャナーを構成します。
   - すでにスキャナーがデプロイされている場合は、{{< ui >}}use an existing scanner{{< /ui >}} (推奨) または {{< ui >}}deploy a new scanner{{< /ui >}} を選択できます。
   - {{< ui >}}deploy a new scanner{{< /ui >}} を選択する場合は、{{< ui >}}scanner project{{< /ui >}} (選択されたプロジェクトのいずれかでなければなりません) と {{< ui >}}scanner regions{{< /ui >}} を選択します。Datadog では、ホストが 150 を超えるすべてのリージョンにスキャナーをインストールすることを推奨しています。
1. {{< ui >}}Copy command{{< /ui >}} をクリックして生成されたコマンドをコピーし、{{< ui >}}Open Google Cloud Shell{{< /ui >}} をクリックして [Google Cloud Shell](https://ssh.cloud.google.com/cloudshell) を開きます。コマンドを確認して実行します。このスクリプトは、[GCP の Terraform Datadog Agentless スキャナーモジュール](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme)を適用して、選択したプロジェクトおよびリージョンでスキャナーをデプロイおよび構成します。
1. コマンドが完了したら、Datadog セットアップページに戻り、{{< ui >}}Done{{< /ui >}} をクリックします。

[26]: /ja/security/cloud_security_management/troubleshooting/agentless_scanning#gcp-failed-to-create-state-bucket-storagebucketscreate-403
{{% /collapse-content %}}
{{% collapse-content title="Terraform" level="h4" id="gcp-terraform-setup" %}}
[Terraform Datadog Agentless Scanner モジュール](https://github.com/DataDog/terraform-module-datadog-agentless-scanner)は、Datadog Agentless スキャナーをインストールするための再利用可能な構成を提供します。デプロイメントトポロジ―を選択する際のガイダンスについては、[Agentless スキャンのデプロイ](/security/cloud_security_management/setup/agentless_scanning/deployment_methods)を参照してください。使用例については、GitHub リポジトリの[サンプルディレクトリ](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples)を参照してください。

1. [Cloud Security のセットアップ](https://app.datadoghq.com/security/configuration/csm/setup)ページで、{{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}GCP{{< /ui >}} をクリックします。
1. Agentless スキャナーをデプロイする GCP プロジェクトをクリックします。サイドパネルが開きます。
1. {{< ui >}}Features{{< /ui >}} タブで、{{< ui >}}Configure Agentless Scanning{{< /ui >}} または {{< ui >}}Manage{{< /ui >}} をクリックして、Agentless スキャンのセットアップモーダルを開きます。
1. {{< ui >}}How would you like to set up Agentless Scanning?{{< /ui >}} セクションで、{{< ui >}}Terraform{{< /ui >}} を選択します。
1. [Datadog Agentless スキャナーモジュール](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme)をインストールするための手順に従います。
1. {{< ui >}}Done{{< /ui >}} をクリックします。
{{% /collapse-content %}}

上記のいずれかのセットアップ方法を完了した後、[設定を確認](#verify-your-setup)します。

[25]: https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=gcp

{{% /tab %}}
{{< /tabs >}}

## セットアップを確認する{#verify-your-setup}

セットアップ完了後、Agentless スキャンが最初の結果を生成するまでには時間がかかります。最初のスキャンサイクルが完了するまで約 30 分かかります。

<div class="alert alert-info">2 時間経過しても結果が表示されない場合は、<a href="/security/cloud_security_management/troubleshooting/agentless_scanning">Agentless スキャンのトラブルシューティングガイド</a>を参照してください。</div>

スキャン結果は以下の場所で確認できます。

- **ホストおよびコンテナの脆弱性について**: [Cloud Security Vulnerabilities Explorer][15]。Agentless スキャンによって検出された脆弱性のみを表示するには、検索バーでフィルター `origin:"Agentless scanner"` を使用します。
- **Lambda の脆弱性について**: [Code Security (SCA) Explorer][16]。
- **機密データの検出結果について**: [Sensitive Data Scanner][17]。

## スキャンからリソースを除外する {#exclude-resources-from-scans}

特定のホスト、コンテナ、または関数をスキャンから除外するには、[リソース評価フィルター](/security/cloud_security_management/guide/resource_evaluation_filters)を参照してください。

## Agentless スキャンを無効にする {#disable-agentless-scanning}

{{< tabs >}}
{{% tab "AWS" %}}
1. [Cloud Security のセットアップ][10]ページで、{{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}AWS{{< /ui >}} をクリックします。
1. 必要な場合は、フィルターを使用して Agentless スキャンを停止するアカウントを検索します。アカウントをクリックして、その設定が含まれるサイドパネルを開きます。
1. {{< ui >}}Features{{< /ui >}} タブの {{< ui >}}Requires setup of the Agentless Scanners:{{< /ui >}} で、トグルをオフに切り替えます。

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "Azure" %}}
1. [Cloud Security のセットアップ][10]ページで、{{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}Azure{{< /ui >}} をクリックします。
1. Agentless スキャンを無効にするサブスクリプションが含まれているテナントを展開します。サブスクリプションをクリックして、その設定が含まれるサイドパネルを開きます。
1. {{< ui >}}Features{{< /ui >}} タブの {{< ui >}}Requires setup of the Agentless Scanners:{{< /ui >}} で、トグルをオフに切り替えます。

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "GCP" %}}
1. [Cloud Security のセットアップ][10]ページで、{{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}GCP{{< /ui >}} をクリックします。
1. Agentless スキャンを無効にするプロジェクトが含まれているアカウントを展開します。プロジェクトをクリックして、その設定が含まれるサイドパネルを開きます。
1. {{< ui >}}Features{{< /ui >}} タブの {{< ui >}}Requires setup of the Agentless Scanners:{{< /ui >}} で、トグルをオフに切り替えます。

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{< /tabs >}}

## Agentless スキャンをアンインストールする {#uninstall-agentless-scanning}

Agentless スキャンのインストールに使用したデプロイ方法を選択します。

{{< tabs >}}
{{% tab "Terraform" %}}
Agentless スキャンをアンインストールするには、Terraform コードからスキャナーモジュールを削除します。詳細については、[Terraform モジュール][9]のドキュメントを参照してください。

[9]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md#uninstall

{{% /tab %}}

{{% tab "AWS CloudFormation" %}}
Agentless スキャンをアンインストールするには、AWS コンソールにログインし、Agentless スキャン用に作成された CloudFormation スタックを削除します (サブスタック名はパターン `DatadogIntegration-DatadogAgentlessScanning-...` に従います)。
{{% /tab %}}

{{% tab "GCP Cloud Shell" %}}
Google Cloud Shell を使用してセットアップした Agentless スキャンをアンインストールするには、インストール時に使用したセットアップコマンドを実行し、末尾の `deploy` を `destroy` に置き換えます。例:

```text
curl -sSL "<CLOUD_SHELL_SCRIPT_URL>" -o gcp_agentless_setup.pyz && \
DD_API_KEY="<DD_API_KEY>" \
DD_APP_KEY="<DD_APP_KEY>" \
DD_SITE="<DD_SITE>" \
SCANNER_PROJECT="<SCANNER_PROJECT>" \
SCANNER_REGIONS="<SCANNER_REGIONS>" \
PROJECTS_TO_SCAN="<PROJECTS>" \
python3 gcp_agentless_setup.pyz destroy
```

コマンドを実行する前に、[セットアップスクリプトソース][21]を確認できます。

[21]: https://github.com/DataDog/integrations-management/tree/main/gcp/agentless
{{% /tab %}}

{{% tab "Azure Cloud Shell" %}}
Azure Cloud Shell を使用してセットアップした Agentless スキャンをアンインストールするには、インストール時に使用したセットアップコマンドを実行し、末尾の `deploy` を `destroy` に置き換えます。例:

```text
curl -sSL "<CLOUD_SHELL_SCRIPT_URL>" -o azure_agentless_setup.pyz && \
DD_API_KEY="<DD_API_KEY>" \
DD_APP_KEY="<DD_APP_KEY>" \
DD_SITE="<DD_SITE>" \
SCANNER_SUBSCRIPTION="<SCANNER_SUBSCRIPTION>" \
python3 azure_agentless_setup.pyz destroy
```

destroy コマンドは `terraform destroy` を実行し、以前に構成された各サブスクリプションの Datadog における Agentless スキャンオプションを無効にし、API キーを保持する Key Vault を削除する前に確認を求めます。リソースグループと Terraform ステートストレージアカウントはデフォルトで保持されます。スクリプトはそれらの手動削除手順を表示します。

コマンドを実行する前に、[セットアップスクリプトソース][22]を確認できます。

[22]: https://github.com/DataDog/integrations-management/tree/main/azure/agentless
{{% /tab %}}

{{% tab "Azure Resource Manager" %}}
Agentless スキャンをアンインストールするには、Azure サブスクリプションにログインします。Agentless スキャナーの専用リソースグループを作成した場合は、このリソースグループを以下の Azure のロール定義とともに削除してください。
  - Datadog Agentless スキャナーロール
  - Datadog Agentless スキャナー委任ロール

専用リソースグループを使用しなかった場合は、手動でスキャナーリソースを削除する必要があります。これらのリソースは、タグ `Datadog:true` および `DatadogAgentlessScanner:true` で識別できます。
{{% /tab %}}
{{< /tabs >}}

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/api-app-keys/
[2]: /ja/security/cloud_security_management/setup/agentless_scanning/deployment_methods
[3]: /ja/remote_configuration
[12]: /ja/security/cloud_security_management/agentless_scanning
[20]: /ja/security/cloud_security_management/agentless_scanning#cloud-service-provider-cost
[15]: https://app.datadoghq.com/security/csm/vm
[16]: https://app.datadoghq.com/security/code-security/sca
[17]: https://app.datadoghq.com/sensitive-data-scanner/storage