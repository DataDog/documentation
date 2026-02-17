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
  text: クラウド セキュリティのセットアップ
- link: /security/cloud_security_management/agentless_scanning
  tag: ドキュメント
  text: クラウド セキュリティのエージェントレス スキャン
title: エージェントレス スキャンの有効化
---

エージェントレス スキャンは、Datadog Agent をインストールしなくても、クラウド インフラ内に存在する脆弱性を可視化できます。エージェントレス スキャンの機能や仕組みの詳細は、[エージェントレス スキャン][12] ドキュメントを参照してください。

## 前提条件

エージェントレス スキャンをセットアップする前に、次の前提条件を満たしていることを確認してください:

- **Remote Configuration**: Datadog がエージェントレス スキャナーに (どのクラウド リソースをスキャンするかなどの) 情報を送信できるようにするために、[Remote Configuration][3] が必要です。
- **API とアプリケーション キー**:
  - スキャナーがスキャン結果を Datadog にレポートするには、Remote Configuration が有効な API キーが必要です。
  - Datadog API 経由でスキャン機能を有効化するには、**Integrations Manage** または **Org Management** の権限を持つアプリケーション キーが必要です。
- **クラウド権限**: エージェントレス スキャン インスタンスがホスト、ホスト イメージ、コンテナ レジストリ、関数をスキャンするには、所定の権限が必要です。これらの権限はインストールの一環として自動的に適用され、必要なスキャンを実行するための最小限の権限に厳密に絞り込まれています (最小特権の原則に準拠)。<br><br>
  {{< collapse-content title="AWS スキャン権限" level="h5" >}}
  <p>スキャンに必要な権限:</p>
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
  <p>Sensitive Data Scanning (DSPM) が有効な場合のみ:</p>
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

<div class="alert alert-danger">エージェントレス スキャナーの実行には追加コストが発生します。安定した 12 時間ごとのスキャンを維持しつつコストを最適化するため、Datadog では既定のテンプレートとして <a href="#terraform-setup">Terraform によるエージェントレス スキャン</a> のセットアップを推奨します。</div>

エージェントレス スキャンを有効化するには、次のいずれかのワークフローを使用します:

### クイック スタート

新規ユーザー向けのクイック スタート ワークフローでは、クラウド セキュリティを効率よくセットアップでき、AWS リソースの監視をすぐに開始できます。設定は AWS CloudFormation を使用して自動化されます。

{{% collapse-content title="クイック スタート セットアップ ガイド" level="h4" id="quick-start-setup" %}}
新規ユーザー向けのクイック スタート ワークフローでは、クラウド セキュリティを効率よくセットアップでき、AWS リソースの監視をすぐに開始できます。設定は AWS CloudFormation で自動化され、クイック スタートには次のクラウド セキュリティ機能が含まれます: Misconfigurations, Identity Risks (CIEM), Vulnerability Management

<div class="alert alert-info">この記事では、AWS CloudFormation を使用してエージェントレス スキャンをセットアップする新規ユーザー向けクイック スタート ワークフローの手順を説明します。
既存ユーザーで新しい AWS アカウントを追加したい場合、または統合済みの AWS アカウントでエージェントレス スキャンを有効化したい場合は、次の手順を参照してください:
<a href="#terraform-setup">Terraform</a> または <a href="#aws-cloudformation-setup">AWS CloudFormation</a>。</div>

<div class="alert alert-danger">エージェントレス スキャナーの実行には追加コストが発生します。安定した 12 時間ごとのスキャンを維持しつつコストを最適化するため、Datadog では既定のテンプレートとして <a href="#terraform-setup">Terraform によるエージェントレス スキャン</a> のセットアップを推奨します。</div>

<div class="alert alert-danger">クラウド ストレージ向けの Sensitive Data Scanner は Limited Availability です。参加するには <a href="https://www.datadoghq.com/private-beta/data-security">Request Access</a> から申請してください。</div>

##### インストール

1. [クラウド セキュリティ 入門][4] ページで、**Get Started with Cloud Security** をクリックします。
1. **Quick Start** をクリックします。**Features** ページが表示され、エージェントレス スキャンの Quick Start に含まれる機能が一覧で確認できます。
1. 続行するには **Start Using Cloud Security** をクリックします。
1. CloudFormation スタックを作成する AWS リージョンを選択します。
1. Remote Configuration が設定済みの API キーを選択します。選択した API キーで Remote Configuration が無効な場合は、そのキーに対して Remote Configuration が自動的に有効化されます。
1. クラウド ストレージ向けに **Sensitive Data Scanner** を有効化するかどうかを選択します。有効化すると、Amazon S3 リソース内の機密データが自動的にカタログ化・分類されます。
1. **Launch CloudFormation Template** をクリックします。新しいウィンドウが開き、AWS CloudFormation の画面が表示されます。提供される CloudFormation テンプレートを使ってスタックを作成します。このテンプレートには、エージェントレス スキャナーをデプロイして管理するために必要な IAM 権限が含まれます。

##### CloudFormation スタックの更新

Datadog では、新機能やバグ修正をリリースに合わせて取り込めるよう、CloudFormation スタックを定期的に更新することを推奨しています。更新するには、次の手順に従ってください:
1. AWS コンソールにログインし、CloudFormation Stacks ページに移動します。
2. **DatadogIntegration-DatadogAgentlessScanning-...** の CloudFormation サブ スタックを選択し、**Update** をクリックしてから **Update nested stack** をクリックします。
3. **Replace existing template** をクリックします。
4. 次の S3 URL: `https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/<VERSION>/datadog_agentless_scanning.yaml` で、`<VERSION>` を [aws_quickstart/version.txt][14] に記載のバージョンに置き換えます。その URL を **Amazon S3 URL** フィールドに貼り付けます。
5. 以降のページは変更せずに進むため、**Next** をクリックして数ページ進めたら、フォームを送信します。

{{% /collapse-content %}}

<br />

### Terraform

[Terraform Datadog エージェントレス スキャナー モジュール][6] は、AWS、Azure、GCP 向けの Datadog エージェントレス スキャナーをインストールするための、シンプルで再利用可能な構成を提供します。

{{% collapse-content title="Terraform セットアップ ガイド" level="h4" id="terraform-setup" %}}
すでに [Cloud Security をセットアップ][10] 済みで、新しいクラウド アカウントを追加したい場合、または統合済みの既存クラウド アカウントで [エージェントレス スキャン][1] を有効化したい場合は、Terraform、[AWS CloudFormation][2]、[Azure Resource Manager][5] のいずれかを利用できます。この記事では Terraform を使う方法を詳しく説明します。

<div class="alert alert-info">Cloud Security を初めてセットアップする場合は、AWS CloudFormation を使用してエージェントレス スキャンを有効化する <a href="#quick-start-setup">クイック スタート ワークフロー</a> に従うこともできます。</div>

{{< tabs >}}
{{% tab "新しい AWS アカウント" %}}

1. [Cloud Security Setup][1] ページで、**Cloud Integrations > AWS** をクリックします。
1. AWS セクションの下部で、**Add AWS accounts by following these steps** をクリックします。**Add New AWS Account(s)** ダイアログが表示されます。
1. **Choose a method for adding your AWS account** の下で、**Manually** を選択します。
1. [Datadog エージェントレス スキャナー モジュール][2] のインストール手順に従います。
1. **I confirm that the Datadog IAM Role has been added to the AWS Account** チェック ボックスを選択します。
1. **AWS Account ID** と **AWS Role Name** を入力します。
1. **Save** をクリックします。

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-datadog-agentless-scanner/blob/main/README.md

{{% /tab %}}

{{% tab "既存の AWS アカウント" %}}

1. [Cloud Security Setup][1] ページで、**Cloud Integrations > AWS** をクリックします。
1. エージェントレス スキャナーをデプロイしたい AWS アカウントの **Edit scanning** ボタン ({{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}}) をクリックします。
1. **Enable Resource Scanning** はすでにオンになっているはずです。オフの場合は **Enable Resource Scanning** をオンに切り替えます。
1. **How would you like to set up Agentless Scanning?** セクションで、**Terraform** を選択します。
1. [Datadog エージェントレス スキャナー モジュール][2] のインストール手順に従います。
1. **I confirm the Terraform module is installed** チェック ボックスを選択します。
1. **Done** をクリックします。

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-datadog-agentless-scanner/blob/main/README.md

{{% /tab %}}

{{% tab "既存の Azure アカウント" %}}

1. [Cloud Security Setup][1] ページで、**Cloud Integrations > Azure** をクリックします。
1. エージェントレス スキャナーをデプロイしたいサブスクリプションを含むテナントを展開します。
1. エージェントレス スキャナーをデプロイする Azure アカウントの **Enable** ボタンをクリックします。
1. **Vulnerability Scanning** をオンに切り替えます。
1. **How would you like to set up Agentless Scanning?** セクションで、**Terraform** を選択します。
1. [Datadog エージェントレス スキャナー モジュール][2] のインストール手順に従います。
1. **Done** をクリックします。

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/azure#readme

{{% /tab %}}

{{% tab "既存の GCP プロジェクト" %}}

1. [Cloud Security Setup][1] ページで、**Cloud Integrations > GCP** をクリックします。
1. エージェントレス スキャナーをデプロイしたいプロジェクトを含むアカウントを展開します。
1. エージェントレス スキャナーをデプロイする GCP プロジェクトの **Enable** ボタンをクリックします。
1. **Vulnerability Scanning** をオンに切り替えます。
1. [Datadog エージェントレス スキャナー モジュール][2] のインストール手順に従います。
1. **Done** をクリックします。

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme

{{% /tab %}}
{{< /tabs >}}

##### Terraform モジュールのバージョンを更新する

エージェントレス スキャナー モジュールの `source` 参照を最新リリースに更新します。最新バージョンは [GitHub Releases](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/releases) で確認できます。

利用例については、[GitHub リポジトリ](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples) を参照してください。

[1]: /ja/security/cloud_security_management/agentless_scanning
[2]: #aws-cloudformation-setup
[5]: #azure-resource-manager-setup

{{% /collapse-content %}}

<br />

### AWS Cloudformation

AWS CloudFormation テンプレートを使用して CloudFormation スタックを作成します。テンプレートには、エージェントレス スキャナーをデプロイして管理するために必要な IAM 権限が含まれます。

{{% collapse-content title="AWS CloudFormation セットアップ ガイド" level="h4" id="aws-cloudformation-setup" %}}
すでに [Cloud Security をセットアップ][10] 済みで、新しいクラウド アカウントを追加したい場合、または統合済みの既存 AWS アカウントで [エージェントレス スキャン][1] を有効化したい場合は、[Terraform][7] または AWS CloudFormation を利用できます。この記事では AWS CloudFormation を使う方法を詳しく説明します。

<div class="alert alert-info">Cloud Security を初めてセットアップする場合は、<a href="#quick-start-setup">クイック スタート ワークフロー</a> に従うこともできます。このワークフローでも AWS CloudFormation を使用してエージェントレス スキャンを有効化します。</div>

<div class="alert alert-danger">エージェントレス スキャナーの実行には追加コストが発生します。安定した 12 時間ごとのスキャンを維持しつつコストを最適化するため、Datadog では既定のテンプレートとして <a href="#terraform-setup">Terraform によるエージェントレス スキャン</a> のセットアップを推奨します。</div>

<div class="alert alert-danger">クラウド ストレージ向けの Sensitive Data Scanner は Limited Availability です。参加するには <a href="https://www.datadoghq.com/private-beta/data-security">Request Access</a> から申請してください。</div>

##### AWS CloudFormation のセットアップ

{{< tabs >}}
{{% tab "新しい AWS アカウント" %}}

1. [Cloud Security Setup][1] ページで、**Cloud Integrations** > **AWS** をクリックします。
1. AWS セクションの下部で、**Add AWS accounts by following these steps** をクリックします。**Add New AWS Account(s)** ダイアログが表示されます。
1. CloudFormation スタックを作成する AWS リージョンを選択します。
1. Remote Configuration が設定済みの API キーを選択します。選択した API キーで Remote Configuration が無効な場合は、そのキーに対して Remote Configuration が自動的に有効化されます。
1. クラウド ストレージ向けに **Sensitive Data Scanner** を有効化するかどうかを選択します。有効化すると、Amazon S3 リソース内の機密データが自動的にカタログ化・分類されます。
1. **Launch CloudFormation Template** をクリックします。新しいウィンドウが開き、AWS CloudFormation 画面が表示されます。提供される CloudFormation テンプレートを使ってスタックを作成します。このテンプレートには、エージェントレス スキャナーをデプロイして管理するために必要な IAM 権限が含まれます。

[1]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "既存の AWS アカウント" %}}

1. [Cloud Security Setup][1] ページで、**Cloud Integrations** > **AWS** をクリックします。
1. エージェントレス スキャナーをデプロイしたい AWS アカウントの **Edit** ボタン ({{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}}) をクリックします。
1. **Enable Resource Scanning** がオンになっていることを確認します。オフの場合は **Enable Resource Scanning** をオンに切り替え、[新しい AWS アカウント][2] の手順 3-7 を完了してください。
1. **Agentless Scanning** セクションで、**Enable Vulnerability Management (Host, Container and Lambda)** をオンに切り替えます。
1. **Enable Sensitive Data Scanner for Cloud Storage** を有効化するかどうかを選択します。有効化すると、Amazon S3 リソース内の機密データが自動的にカタログ化・分類されます。
1. **Done** をクリックします。

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: /ja/security/cloud_security_management/setup/agentless_scanning/enable?tab=newawsaccount#set-up-aws-cloudformation

{{% /tab %}}
{{< /tabs >}}

##### CloudFormation スタックの更新

Datadog では、新機能やバグ修正をリリースに合わせて利用できるよう、CloudFormation スタックを定期的に更新することを推奨しています。更新するには、次の手順に従ってください:
1. AWS コンソールにログインし、CloudFormation Stacks ページに移動します。
2. **DatadogIntegration-DatadogAgentlessScanning-...** の CloudFormation サブ スタックを選択し、**Update** をクリックしてから **Update nested stack** をクリックします。
3. **Replace existing template** をクリックします。
4. 次の S3 URL: `https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/<VERSION>/datadog_agentless_scanning.yaml` で、`<VERSION>` を [aws_quickstart/version.txt][14] に記載のバージョンに置き換えます。その URL を **Amazon S3 URL** フィールドに貼り付けます。
5. 以降のページは変更せずに進むため、**Next** をクリックして数ページ進めたら、フォームを送信します。
{{% /collapse-content %}}

<br />

### Azure Resource Manager

Azure Resource Manager テンプレートを使用して、エージェントレス スキャナーをデプロイします。このテンプレートには、エージェントレス スキャナーをデプロイして管理するために必要なロール定義が含まれます。

{{% collapse-content title="Azure Resource Manager セットアップ ガイド" level="h4" id="azure-resource-manager-setup" %}}
すでに [Cloud Security をセットアップ][10] 済みで、新しい Azure アカウントを追加したい場合、または統合済みの既存 Azure アカウントで [エージェントレス スキャン][1] を有効化したい場合は、[Terraform][7] または Azure Resource Manager のいずれかを利用できます。この記事では Azure Resource Manager を使う方法を詳しく説明します。

<div class="alert alert-danger">エージェントレス スキャナーの実行には追加コストが発生します。安定した 12 時間ごとのスキャンを維持しつつコストを最適化するため、Datadog では既定のテンプレートとして <a href="#terraform-setup">Terraform によるエージェントレス スキャン</a> のセットアップを推奨します。</div>

{{< tabs >}}
{{% tab "新しい Azure アカウント" %}}

###### Datadog の Azure インテグレーションをセットアップする

[Datadog Azure integration][1] のセットアップ手順に従ってください。

{{% csm-agentless-azure-resource-manager %}}

[1]: /ja/integrations/guide/azure-manual-setup/?tab=azurecli
{{% /tab %}}

{{% tab "既存の Azure アカウント" %}}

{{% csm-agentless-azure-resource-manager %}}

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

## 構成

### セットアップを確認する

セットアップ完了後、Datadog 上でスキャン結果を確認することで、エージェントレス スキャンが正しく動作しているかを検証できます。結果は通常、最初のスキャン サイクルが完了した後に表示されます。

スキャン結果は次の場所で確認できます:

- **ホストとコンテナの脆弱性**: [CSM Vulnerabilities Explorer][15]。エージェントレス スキャンで検出された脆弱性のみに絞り込むには、検索バーでフィルター `origin:"Agentless scanner"` を使用します。
- **Lambda の脆弱性**: [Code Security (SCA) Explorer][16]
- **機密データの検出結果**: [Sensitive Data Scanner][17]

### スキャンからリソースを除外する

{{% csm-agentless-exclude-resources %}}

## エージェントレス スキャンを無効化する

{{< tabs >}}
{{% tab "AWS" %}}
1. [Cloud Security Setup][10] ページで、**Cloud Integrations** > **AWS** をクリックします。
1. 必要に応じてフィルターを使い、エージェントレス スキャンを停止したいアカウントを探します。アカウントをクリックすると、設定を含むサイド パネルが開きます。
1. **Features** タブで、**Configure Agentless Scanning** または **Manage** をクリックして、Agentless Scanning Setup モーダルを開きます。
1. **How would you like to set up Agentless scanning?** の下で、**Terraform** をクリックします。
1. **Enable Features** の下で、**Enable Agentless Vulnerability management** の横にあるトグルをオフに切り替えます。
1. **Done** をクリックします。

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "Azure" %}}
1. [Cloud Security Setup][10] ページで、**Cloud Integrations** > **Azure** をクリックします。
1. サブスクリプションのテナントを見つけ、サブスクリプション一覧を展開して、エージェントレス スキャンを無効化したいサブスクリプションを特定します。
1. **Enabled** ラベルの横にある **Edit** ボタン ({{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}}) をクリックして、Vulnerability Scanning モーダルを開きます。
1. **Vulnerability Scanning** の横にあるトグルをオフに切り替えます。
1. **Done** をクリックします。

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "GCP" %}}
1. [Cloud Security Setup][10] ページで、**Cloud Integrations** > **GCP** をクリックします。
1. エージェントレス スキャンを無効化したいプロジェクトを含むアカウントを展開します。
1. **Enabled** ラベルの横にある **Edit** ボタン ({{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}}) をクリックして、Vulnerability Scanning モーダルを開きます。
1. **Vulnerability Scanning** の横にあるトグルをオフに切り替えます。
1. **Done** をクリックします。

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{< /tabs >}}

## エージェントレス スキャンをアンインストールする

{{< tabs >}}
{{% tab "Terraform" %}}
エージェントレス スキャンをアンインストールするには、Terraform コードからスキャナー モジュールを削除します。詳細は [Terraform モジュール][9] のドキュメントを参照してください。

[9]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md#uninstall

{{% /tab %}}

{{% tab "AWS CloudFormation" %}}
エージェントレス スキャンをアンインストールするには、AWS コンソールにログインし、エージェントレス スキャン用に作成した CloudFormation スタックを削除します。
{{% /tab %}}

{{% tab "Azure Resource Manager" %}}
エージェントレス スキャンをアンインストールするには、Azure アカウントにログインします。エージェントレス スキャナー用に専用のリソース グループを作成している場合は、次の Azure ロール定義とあわせて、そのリソース グループを削除します:
  - Datadog Agentless Scanner Role
  - Datadog Agentless Scanner Delegate Role

専用のリソース グループを使用していない場合は、タグ `Datadog:true` および `DatadogAgentlessScanner:true` により識別できるスキャナー リソースを手動で削除する必要があります。
{{% /tab %}}
{{< /tabs >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cloud_security_management/agentless_scanning
[2]: /ja/integrations/amazon_web_services/
[3]: /ja/remote_configuration
[4]: https://app.datadoghq.com/security/csm/
[6]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner
[7]: #terraform-setup
[8]: mailto:success@datadoghq.com
[10]: https://app.datadoghq.com/security/configuration/csm/setup
[11]: #aws-cloudformation-setup
[12]: /ja/security/cloud_security_management/agentless_scanning
[13]: #azure-resource-manager-setup
[14]: https://github.com/DataDog/cloudformation-template/blob/master/aws_quickstart/version.txt
[15]: https://app.datadoghq.com/security/csm/vm
[16]: https://app.datadoghq.com/security/code-security/sca
[17]: https://app.datadoghq.com/sensitive-data-scanner/storage