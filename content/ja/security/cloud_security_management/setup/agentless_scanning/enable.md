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
  text: Cloud Security における Agentless Scanning
- link: /security/cloud_security_management/setup/agentless_scanning/update
  tag: ドキュメント
  text: Agentless Scanning の更新
- link: /security/cloud_security_management/troubleshooting/agentless_scanning
  tag: ドキュメント
  text: Agentless Scanning のトラブルシューティング
title: Agentless Scanning の有効化
---

Agentless Scanning では、Datadog Agent をインストールしなくても、クラウド インフラストラクチャ内の脆弱性を可視化できます。Agentless Scanning はお客様のインフラストラクチャ内で完結して動作し、Datadog に送信するデータは最小限に抑えつつ、機微データはお客様の環境内に留めます。スキャナーはクラウド アカウント内で動作するため、通常の [クラウド プロバイダーのコスト][20] が発生します。詳しくは、[Agentless Scanning の概要][12] を参照してください。

セットアップは、クラウド アカウントごとにおおむね 30 分で完了します:

1. 以下の前提条件を確認する
1. 使用するクラウド プロバイダーとデプロイ方法を選ぶ
1. クラウド アカウントでテンプレートを起動する
1. Datadog でスキャン結果を確認する

## 前提条件

Agentless Scanning を設定する前に、次の前提条件を満たしていることを確認してください。

- **Remote Configuration**: Agentless スキャナーにスキャン指示を送るには、Datadog 組織で [Remote Configuration][3] を有効にしておく必要があります。
- **[API とアプリケーション キー][1]**:
  - Datadog にスキャン結果を送信するには、Remote Configuration が有効な **API キー** が必要です。
  - Datadog API 経由でスキャン機能を有効にするには、**Integrations Manage** または **Org Management** のいずれかの権限を持つ **アプリケーション キー** が必要です。
- **クラウド権限**: Agentless Scanning のインスタンスには、ホスト、ホスト イメージ、コンテナ レジストリ、関数をスキャンするための権限が必要です。透明性を確保するために以下へ一覧を示していますが、Datadog はこれらの権限をインストール時に自動で設定します。<br><br>
  {{< collapse-content title="AWS スキャン権限" level="h5" >}}
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
    <li><code>ec2:DescribeSnapshotAttribute</code></li>
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
  <p>Sensitive Data Scanning (DSPM) を有効にしている場合のみ:</p>
  <ul>
    <li><code>kms:GenerateDataKey</code></li>
    <li><code>s3:GetObject</code></li>
    <li><code>s3:ListBucket</code></li>
  </ul>
  {{< /collapse-content >}}

  {{< collapse-content title="Azure スキャン権限" level="h5" >}}
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
    <li><code>Microsoft.ContainerRegistry/registries/pull/read</code></li>
  </ul>
  {{< /collapse-content >}}

  {{< collapse-content title="GCP スキャン権限" level="h5" >}}
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

## セットアップ

何個のアカウント、どのリージョンにスキャナーを配置するかを含むデプロイ構成の考え方については、[Agentless Scanning のデプロイ][2] を参照してください。

利用できるセットアップ方法を確認するには、クラウド プロバイダーを選択してください。複数のクラウド プロバイダーで Agentless Scanning を導入する場合は、各プロバイダーごとに個別にセットアップを完了してください。

{{< tabs >}}
{{% tab "AWS" %}}

### セットアップ方法を選ぶ

- **Datadog を初めて使う場合**: [Cloud Security の概要][2] ページで **Get Started with Cloud Security** をクリックし、続けて **Quick Start** をクリックします。Quick Start は、Cloud Security の機能をあらかじめ有効にした状態で、AWS CloudFormation を使って Agentless Scanning をデプロイするガイド付きのセットアップ フローです。Cloud Security Management をまだセットアップしていない組織でのみ利用できます。
- **Datadog に単一の AWS アカウントを登録している場合**: [CloudFormation](#aws-cloudformation-setup) または [Terraform](#aws-terraform-setup) を使用します。マルチ リージョン デプロイには Terraform を推奨します。
- **複数アカウントの AWS Organizations 環境の場合**: [CloudFormation StackSet](#aws-cloudformation-stackset-setup) を使用して、すべてのメンバー アカウントにスキャン機能をデプロイします。
- **AWS Organizations を使わずに複数アカウントを運用している場合**: 各アカウントごとに、[CloudFormation](#aws-cloudformation-setup) または [Terraform](#aws-terraform-setup) のセットアップを個別に繰り返します。

{{% collapse-content title="CloudFormation" level="h3" id="aws-cloudformation-setup" %}}
Datadog と連携済みの AWS アカウントで Agentless Scanning を有効にしたい場合、または新しい AWS アカウントを追加したい場合は、CloudFormation を使用します。

#### 新しい AWS アカウント

1. [Cloud Security のセットアップ][1] ページで、**Cloud Integrations** > **AWS** をクリックします。
1. AWS セクションの下部で **Add AWS accounts by following these steps** をクリックします。**Add New AWS Account(s)** ダイアログが表示されます。
1. CloudFormation スタックを作成する AWS リージョンを選択します。
1. [Remote Configuration][3] が有効な API キーを選択します。
1. Cloud Storage 向けに **Sensitive Data Scanner** を有効にするかどうかを選択します。これにより、Amazon S3 リソース内の機微データが自動でカタログ化・分類されます。
1. **Launch CloudFormation Template** をクリックします。AWS CloudFormation 画面を表示する新しいウィンドウが開きます。表示された CloudFormation テンプレートを使ってスタックを作成してください。このテンプレートには、Agentless スキャナーのデプロイと管理に必要な IAM 権限が含まれています。

#### 既存の AWS アカウント

1. [Cloud Security のセットアップ][1] ページで、**Cloud Integrations** > **AWS** をクリックします。
1. Agentless スキャナーをデプロイしたい AWS アカウントをクリックすると、サイド パネルが開きます。
1. **Features** タブで、**Configure Agentless Scanning** または **Manage** をクリックし、Agentless Scanning Setup モーダルを開きます。
1. **How would you like to set up Agentless Scanning?** セクションで、**CloudFormation** を選択します。
1. [Remote Configuration][3] が有効な API キーを選択します。
1. **Vulnerability Management** や **Sensitive Data Scanner** など、有効にしたい機能を選択します。
1. **Launch CloudFormation Template** をクリックします。AWS CloudFormation 画面を表示する新しいウィンドウが開きます。表示された CloudFormation テンプレートを使ってスタックを作成してください。
1. **Done** をクリックします。

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[3]: /ja/remote_configuration

{{% /collapse-content %}}
{{% collapse-content title="CloudFormation StackSet (マルチ アカウント)" level="h3" id="aws-cloudformation-stackset-setup" %}}

複数アカウントを含む AWS Organizations では、CloudFormation StackSet を使って、すべてのメンバー アカウントに Agentless Scanning 用の委任ロールをデプロイします。この方法を使うと、オンボーディングを自動化でき、新たに AWS Organization に追加されたアカウントにも設定を反映できます。

このセットアップでは、AWS Organization 全体、または特定の Organizational Unit (OU) に対して、[クロス アカウント スキャン](/security/cloud_security_management/setup/agentless_scanning/deployment_methods) に必要な委任ロールをデプロイします。まず、中央のスキャン用アカウントで [CloudFormation](#aws-cloudformation-setup) または [Terraform](#aws-terraform-setup) を使って Agentless Scanning を設定し、その後 StackSet をデプロイして残りのアカウントを構成します。

#### 前提条件

1. AWS management account へアクセスできること。
1. CloudFormation StackSets 用に [Trusted Access with AWS Organizations](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-enable-trusted-access.html) が有効になっていること。
1. 中央のスキャン用アカウントで Agentless Scanning の設定がすでに完了していること (上記参照)。

#### StackSet をデプロイする

1. AWS management account にログインし、**CloudFormation** > **StackSets** に移動します。
1. **Create StackSet** をクリックします。
1. **Service-managed permissions** を選択します。
1. **Specify template** で **Amazon S3 URL** を選択し、次の URL を入力します:
   ```
   https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/v4.3.1/datadog_agentless_delegate_role_stackset.yaml
   ```
1. **StackSet name** を入力します (たとえば `DatadogAgentlessScanningStackSet`)。
1. Agentless スキャナー インスタンスに関連付けられた IAM ロールの ARN である **ScannerInstanceRoleARN** パラメーターを設定します。
      <div class="alert alert-danger"><code>ScannerInstanceRoleARN</code> には、スキャナー インスタンス ロールの正確な ARN を指定する必要があります (例: <code>arn:aws:iam::123456789012:role/DatadogAgentlessScannerRole</code>)。<code>arn:aws:iam::123456789012:root</code> のような root ARN を指定しても動作しません。</div>
      <p><code>ScannerInstanceRoleARN</code> は、委任ロール (対象アカウント側で作成) と、スキャナー インスタンス (中央アカウントですでに稼働中) の間に信頼関係を確立します。これにより、次のようなクロス アカウント スキャンが可能になります:</p>
      <ul>
        <li>The scanner runs in Account 4.</li>
        <li>The delegate role exists in Accounts 1, 2, 3 (deployed through the StackSet).</li>
        <li>The scanner assumes the delegate roles to scan resources in those accounts.</li>
      </ul>
1. **Deployment targets** では、AWS Organization 全体に展開するか、特定の OU のみに展開するかを設定します。
1. 新しく AWS Organization に追加されたアカウントにも自動で設定を反映させるには、**Automatic deployment** を有効にします。
1. デプロイ先として **single region** を選択します (IAM ロールはグローバル リソースのため、アカウントごとに 1 回だけデプロイすれば十分です)。
1. 内容を確認し、StackSet を送信します。

StackSet のデプロイが完了すると、メンバー アカウント側で、中央スキャナー アカウントからのクロス アカウント スキャンを許可する設定が反映されます。
{{% /collapse-content %}}
{{% collapse-content title="Terraform" level="h3" id="aws-terraform-setup" %}}

[Terraform Datadog Agentless Scanner モジュール](https://github.com/DataDog/terraform-module-datadog-agentless-scanner) は、Datadog Agentless スキャナーを導入するための再利用可能な構成を提供します。Terraform は、マルチ リージョン環境で推奨されるデプロイ方法です。リージョンごとに 1 台のスキャナーを配置するため、クロス リージョンのネットワーク コストを回避できます。どのデプロイ トポロジーを選ぶべきかについては、[Agentless Scanning のデプロイ](/security/cloud_security_management/setup/agentless_scanning/deployment_methods) を参照してください。マルチ リージョン構成を含む利用例は、GitHub リポジトリの [examples ディレクトリ](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples) を参照してください。

#### 新しい AWS アカウント

1. [Cloud Security のセットアップ][1] ページで、**Cloud Integrations** > **AWS** をクリックします。
1. AWS セクションの下部で **Add AWS accounts by following these steps** をクリックします。**Add New AWS Account(s)** ダイアログが表示されます。
1. **Choose a method for adding your AWS account** で、**Manually** を選択します。
1. [Datadog Agentless Scanner モジュール][2] のインストール手順に従います。
1. **I confirm that the Datadog IAM Role has been added to the AWS Account** チェック ボックスを選択します。
1. **AWS Account ID** と **AWS Role Name** を入力します。
1. **Save** をクリックします。

#### 既存の AWS アカウント

1. [Cloud Security のセットアップ][1] ページで、**Cloud Integrations** > **AWS** をクリックします。
1. Agentless スキャナーをデプロイしたい AWS アカウントをクリックして、サイド パネルを開きます。
1. **Features** タブで、**Configure Agentless Scanning** または **Manage** をクリックし、Agentless Scanning Setup モーダルを開きます。
1. **How would you like to set up Agentless Scanning?** セクションで、**Terraform** を選択します。
1. [Datadog Agentless Scanner モジュール][2] のインストール手順に従います。
1. **I confirm the Terraform module is installed** チェック ボックスを選択します。
1. **Done** をクリックします。

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md

{{% /collapse-content %}}

上記のいずれかのセットアップ方法を完了したら、[セットアップを確認](#verify-your-setup) してください。

[2]: https://app.datadoghq.com/security/csm/
[3]: /ja/remote_configuration

{{% /tab %}}

{{% tab "Azure" %}}

### セットアップ方法を選ぶ
- **新しい Azure サブスクリプション**: [Azure Resource Manager](#azure-resource-manager-setup) (推奨) または [Terraform](#azure-terraform-setup) を使用します。
- **既存の Azure サブスクリプション**: [Azure Resource Manager](#azure-resource-manager-setup) または [Terraform](#azure-terraform-setup) を使用します。
- **複数のサブスクリプション**: 繰り返し適用しやすいマルチ サブスクリプション デプロイには、[Terraform](#azure-terraform-setup) を使用します。

{{% collapse-content title="Azure Resource Manager" level="h3" id="azure-resource-manager-setup" %}}
Azure Resource Manager テンプレートを使って Agentless スキャナーをデプロイします。このテンプレートには、Agentless スキャナーのデプロイと管理に必要なロール定義が含まれています。

#### 新しい Azure サブスクリプション

<div class="alert alert-info"><a href="/integrations/guide/azure-manual-setup/?tab=azurecli">Datadog Azure integration</a> が設定済みであることを確認してください。</div>

{{% csm-agentless-azure-resource-manager %}}

#### 既存の Azure サブスクリプション

{{% csm-agentless-azure-resource-manager %}}

{{% /collapse-content %}}
{{% collapse-content title="Terraform" level="h3" id="azure-terraform-setup" %}}

[Terraform Datadog Agentless Scanner モジュール](https://github.com/DataDog/terraform-module-datadog-agentless-scanner) は、Datadog Agentless スキャナーを導入するための再利用可能な構成を提供します。どのデプロイ トポロジーを選ぶべきかについては、[Agentless Scanning のデプロイ](/security/cloud_security_management/setup/agentless_scanning/deployment_methods) を参照してください。利用例については、GitHub リポジトリの [examples ディレクトリ](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples) を確認してください。

1. [Cloud Security のセットアップ](https://app.datadoghq.com/security/configuration/csm/setup) ページで、**Cloud Integrations** > **Azure** をクリックします。
1. Agentless スキャナーをデプロイするサブスクリプションが含まれるテナントを展開します。
1. Agentless スキャナーをデプロイしたい Azure サブスクリプションの **Enable** ボタンをクリックします。
1. **Vulnerability Scanning** をオンにします。
1. **How would you like to set up Agentless Scanning?** セクションで、**Terraform** を選択します。
1. [Datadog Agentless Scanner モジュール](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/azure#readme) のインストール手順に従います。
1. **Done** をクリックします。

{{% /collapse-content %}}

上記のいずれかのセットアップ方法を完了したら、[セットアップを確認](#verify-your-setup) してください。

{{% /tab %}}

{{% tab "GCP" %}}

### セットアップ方法を選ぶ

- **新しく GCP を利用する場合**: まず [GCP integration をセットアップ][25] し、その後 Agentless Scanning を有効にします。
- **Datadog と統合済みの既存 GCP プロジェクト**: [Cloud Shell](#gcp-cloud-shell-setup) (推奨) または [Terraform](#gcp-terraform-setup) を使用します。

<div class="alert alert-info">まだ GCP プロジェクトを Datadog に接続していない場合は、先に <a href="https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=gcp">GCP integration をセットアップ</a> してください。</div>

{{% collapse-content title="Cloud Shell" level="h3" id="gcp-cloud-shell-setup" %}}
Google Cloud Shell を使って、GCP プロジェクト向けに Agentless Scanning をセットアップします。この方法では、[GCP 向け Terraform Datadog Agentless Scanner モジュール](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme) をラップした [セットアップ スクリプト](https://github.com/DataDog/integrations-management/tree/main/gcp/agentless) をダウンロードするため、Terraform を直接管理する必要はありません。実行前にスクリプト内容を確認することもできます。

**必須の GCP 権限**: Cloud Shell で使用する ID には、スキャナー プロジェクトに対する **Owner** または同等の権限が必要です。このスクリプトは Terraform state 用の GCS バケットを作成するため、そのプロジェクトに対する **Storage** 権限も必要です (例: `roles/storage.admin`、または `storage.buckets.create` / `storage.buckets.get` / `storage.buckets.update`)。また、`TF_STATE_BUCKET` 環境変数に既存バケット名を設定すれば、Terraform state 用に既存のバケットを再利用できます。その場合、スクリプトは新しいバケットを作成しません。"Setting up Terraform state storage" で 403 エラーが表示された場合は、トラブルシューティング ガイドの [GCP: Failed to create state bucket][26] を参照してください。

1. [Cloud Security のセットアップ](https://app.datadoghq.com/security/configuration/csm/setup) ページで、**Cloud Integrations** > **GCP** をクリックします。
1. Agentless スキャナーをデプロイしたいプロジェクトを含むアカウントを展開します。
1. Agentless スキャナーをデプロイしたい GCP プロジェクトの **Enable** ボタンをクリックします。**Vulnerability Scanning** モーダルが開きます。
1. **How would you like to set up Agentless Scanning?** セクションで、**Cloud Shell** を選択します。
1. [Remote Configuration](/remote_configuration) が有効な **API キー** を選択します。アプリケーション キーは自動生成されます。
1. スキャン対象の **GCP projects** を選択します。
1. スキャナーを設定します:
   - すでにスキャナーをデプロイ済みの場合は、**use an existing scanner** (推奨) または **deploy a new scanner** を選択できます。
   - 新しいスキャナーをデプロイする場合は、Scanner project を選択します (選択済みプロジェクトのいずれかである必要があります)。150 台を超えるホストがある各リージョンにスキャナーを配置することを推奨します。
1. 生成されたコマンドをコピーするには **Copy command** をクリックし、[Google Cloud Shell](https://ssh.cloud.google.com/cloudshell) を開くには **Open Google Cloud Shell** をクリックします。内容を確認してからコマンドを実行してください。このスクリプトは [GCP 向け Terraform Datadog Agentless Scanner モジュール](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme) を適用し、選択したプロジェクトとリージョンにスキャナーをデプロイして構成します。
1. コマンドの実行が完了したら、Datadog のセットアップ ページに戻り、**Done** をクリックします。
{{% /collapse-content %}}
{{% collapse-content title="Terraform" level="h3" id="gcp-terraform-setup" %}}
[Terraform Datadog Agentless Scanner モジュール](https://github.com/DataDog/terraform-module-datadog-agentless-scanner) は、Datadog Agentless スキャナーを導入するための再利用可能な構成を提供します。どのデプロイ トポロジーを選ぶべきかについては、[Agentless Scanning のデプロイ](/security/cloud_security_management/setup/agentless_scanning/deployment_methods) を参照してください。利用例については、GitHub リポジトリの [examples ディレクトリ](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples) を確認してください。

1. [Cloud Security のセットアップ](https://app.datadoghq.com/security/configuration/csm/setup) ページで、**Cloud Integrations** > **GCP** をクリックします。
1. Agentless スキャナーをデプロイしたいプロジェクトを含むアカウントを展開します。
1. Agentless スキャナーをデプロイしたい GCP プロジェクトの **Enable** ボタンをクリックします。
1. **Vulnerability Scanning** をオンにします。
1. [Datadog Agentless Scanner モジュール](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme) のインストール手順に従います。
1. **Done** をクリックします。
{{% /collapse-content %}}

上記のいずれかのセットアップ方法を完了したら、[セットアップを確認](#verify-your-setup) してください。

[25]: https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=gcp
[26]: /ja/security/cloud_security_management/troubleshooting/agentless_scanning#gcp-failed-to-create-state-bucket-storagebucketscreate-403

{{% /tab %}}
{{< /tabs >}}

## セットアップを確認する

セットアップ完了後、Agentless Scanning の初回結果が表示されるまでには少し時間がかかります。最初のスキャン サイクルの完了には、おおよそ 30 分かかります。

<div class="alert alert-info">2 時間経っても結果が表示されない場合は、<a href="/security/cloud_security_management/troubleshooting/agentless_scanning">Agentless Scanning のトラブルシューティング ガイド</a> を参照してください。</div>

スキャン結果は次の場所で確認できます:

- **ホストおよびコンテナの脆弱性**: [Cloud Security Vulnerabilities Explorer][15]。Agentless Scanning によって検出された脆弱性だけを表示するには、検索バーでフィルター `origin:"Agentless scanner"` を使用します。
- **Lambda の脆弱性**: [Code Security (SCA) Explorer][16]。
- **機微データの検出結果**: [Sensitive Data Scanner][17]。

## スキャン対象からリソースを除外する

特定のホスト、コンテナ、関数をスキャン対象から除外する方法については、[Resource Evaluation Filters](/security/cloud_security_management/guide/resource_evaluation_filters) を参照してください。

## Agentless Scanning を無効にする

{{< tabs >}}
{{% tab "AWS" %}}
1. [Cloud Security のセットアップ][10] ページで、**Cloud Integrations** > **AWS** をクリックします。
1. 必要に応じてフィルターを使い、Agentless Scanning を停止したいアカウントを見つけます。そのアカウントをクリックして、設定が表示されるサイド パネルを開きます。
1. **Features** タブで、**Configure Agentless Scanning** または **Manage** をクリックし、Agentless Scanning Setup モーダルを開きます。
1. **How would you like to set up Agentless Scanning?** の下で、**Terraform** をクリックします。
1. **Enable Features** の下で、**Enable Agentless Vulnerability management** の横にあるトグルをオフにします。
1. **Done** をクリックします。

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "Azure" %}}
1. [Cloud Security のセットアップ][10] ページで、**Cloud Integrations** > **Azure** をクリックします。
1. 対象のサブスクリプションが属するテナントを見つけ、サブスクリプション一覧を展開して、Agentless Scanning を無効化したいサブスクリプションを確認します。
1. **Enabled** ラベルの横にある **Edit** ボタン ({{< img src="security/csm/setup/edit-button.png" alt="Edit" inline="true" style="width:24px;">}}) をクリックし、**Vulnerability Scanning** モーダルを開きます。
1. **Vulnerability Scanning** の横にあるトグルをオフにします。
1. **Done** をクリックします。

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "GCP" %}}
1. [Cloud Security のセットアップ][10] ページで、**Cloud Integrations** > **GCP** をクリックします。
1. Agentless Scanning を無効にしたいプロジェクトを含むアカウントを展開します。
1. **Enabled** ラベルの横にある **Edit** ボタン ({{< img src="security/csm/setup/edit-button.png" alt="Edit" inline="true" style="width:24px;">}}) をクリックし、**Vulnerability Scanning** モーダルを開きます。
1. **Vulnerability Scanning** の横にあるトグルをオフにします。
1. **Done** をクリックします。

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{< /tabs >}}

## Uninstall Agentless ScanningAgentless Scanning をアンインストールする

Agentless Scanning のインストールに使用したデプロイ方法を選択してください:

{{< tabs >}}
{{% tab "Terraform" %}}
Agentless Scanning をアンインストールするには、Terraform コードからスキャナー モジュールを削除します。詳しくは、[Terraform module][9] のドキュメントを参照してください。

[9]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md#uninstall

{{% /tab %}}

{{% tab "AWS CloudFormation" %}}
Agentless Scanning をアンインストールするには、AWS コンソールにログインし、Agentless Scanning 用に作成した CloudFormation スタックを削除します (サブ スタック名は `DatadogIntegration-DatadogAgentlessScanning-...` という形式です)。
{{% /tab %}}

{{% tab "GCP Cloud Shell" %}}
Google Cloud Shell を使ってセットアップした Agentless Scanning をアンインストールするには、インストール時に使用したものと同じセットアップ コマンドを再度実行し、末尾の `deploy` を `destroy` に置き換えます。例:

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

コマンドを実行する前に、[セットアップ スクリプトのソース][21] を確認できます。

[21]: https://github.com/DataDog/integrations-management/tree/main/gcp/agentless
{{% /tab %}}

{{% tab "Azure Resource Manager" %}}
Agentless Scanning をアンインストールするには、Azure サブスクリプションにログインします。Agentless スキャナー専用のリソース グループを作成している場合は、そのリソース グループとあわせて次の Azure ロール定義も削除してください:
  - Datadog Agentless Scanner Role
  - Datadog Agentless Scanner Delegate Role

専用のリソース グループを使用していない場合は、`Datadog:true` と `DatadogAgentlessScanner:true` のタグを手がかりにスキャナー リソースを特定し、手動で削除する必要があります。
{{% /tab %}}
{{< /tabs >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/api-app-keys/
[2]: /ja/security/cloud_security_management/setup/agentless_scanning/deployment_methods
[3]: /ja/remote_configuration
[12]: /ja/security/cloud_security_management/agentless_scanning
[20]: /ja/security/cloud_security_management/agentless_scanning#cloud-service-provider-cost
[15]: https://app.datadoghq.com/security/csm/vm
[16]: https://app.datadoghq.com/security/code-security/sca
[17]: https://app.datadoghq.com/sensitive-data-scanner/storage