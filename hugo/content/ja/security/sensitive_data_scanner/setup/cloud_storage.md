---
aliases:
- /ja/sensitive_data_scanner/setup/cloud_storage
description: Datadog Agentlessスキャナーをデプロイし、Sensitive Data Scannerを使用してAmazon S3バケットの機密データをスキャンします。Remote
  Configurationのセットアップと、CloudFormationまたはTerraformによるデプロイを対象としています。
disable_toc: false
further_reading:
- link: /security/cloud_security_management/agentless_scanning
  tag: ドキュメント
  text: クラウドセキュリティAgentlessスキャン
- link: /security/sensitive_data_scanner/scanning_rules/library_rules
  tag: ドキュメント
  text: すぐに使えるライブラリルールについて詳しく知る
- link: /security/sensitive_data_scanner/scanning_rules/custom_rules
  tag: ドキュメント
  text: カスタムルールの作成について詳しく知る
title: クラウドストレージ用Sensitive Data Scannerのセットアップ
---
{{< site-region region="gov,gov2" >}}

<div class="alert alert-danger">クラウドストレージのスキャンは、選択されたサイトでは利用できません ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

## 概要 {#overview}

Datadog Agentlessスキャナーを環境にデプロイし、クラウドストレージリソース内の機密情報をスキャンします。Agentlessスキャナーは、お客様が管理し、環境内で実行するEC2インスタンスです。スキャナーは[Remote Configuration][1]を使用して、S3バケットのリストとその依存関係を取得します。S3バケット内のCSVやJSONなど、多くの種類のテキストファイルをスキャンします。

Agentlessスキャナーが[SDSライブラリルール][2]のいずれかと一致するものを見つけると、スキャンインスタンスは一致したルールタイプと場所をDatadogに送信します。**注**: クラウドストレージリソースとそのファイルは環境内でのみ読み取られます。スキャンされた機密データがDatadogに送信されることはありません。

Sensitive Data Scannerの[Findingsページ][3]では、スキャンされたクラウドストレージリソースと、一致したルールを含む検出結果を確認できます。

このドキュメントでは、以下の手順を説明します。
- [Remote Configurationを有効にする](#enable-remote-configuration)（クラウドストレージ用Sensitive Data Scannerを使用するため）
- [セキュリティ上の考慮事項](#security-considerations)（クラウドストレージ用Sensitive Data Scannerを使用する際に留意すべき点）
- [CloudFormation](#automatically-deploy-scanners-using-cloudformation)または[Terraform](#manually-deploy-scanners-using-terraform)を使用して環境にスキャナーをデプロイする

## リモート構成を有効にする {#enable-remote-configuration}

リモート構成を使用すると、Datadogは構成データ（スキャン対象のクラウドストレージリソースなど）をデプロイ済みのスキャナーに送信できます。AWS環境で機密データスキャナーを使用するには、以下を確認する必要があります。
- Datadog組織でリモート構成が有効になっていること。
- スキャナーがデプロイされているAWSアカウントに対して、リモート構成が有効なDatadog APIキーを使用していること。

リモート構成は、ほとんどの組織でデフォルトで有効になっています。これを確認するには、[リモート構成][4]設定ページに移動します。有効になっていない場合は、以下を行います。
1. RBAC権限に[`org_management`][7]が含まれていることを確認します。
1. リモート構成の[セットアップページ][5]から、{{< ui >}}Enable for your Organization{{< /ui >}} > {{< ui >}}Next Step{{< /ui >}}をクリックします。
1. リモート構成で使用するAPIキーを検索して選択し、{{< ui >}}Enable Keys{{< /ui >}}をクリックします。
1. {{< ui >}}Next Step{{< /ui >}} > {{< ui >}}Done{{< /ui >}}をクリックします。AgentやトレーサーなどのDatadogコンポーネントを設定する必要はありません。

**注記**
- スキャナーがデプロイされているAWSアカウントのみ、リモート構成が有効なDatadog APIキーが必要です。
- `org_management`権限を持つ管理者のみが、組織のリモート構成を有効にできます。リモート構成が有効になった後、`api_keys_write`権限を持つユーザーのみが、個々のAPIキーに対してリモート構成を有効にできます。

## セキュリティに関する考慮事項 {#security-considerations}

スキャナーインスタンスには機密データへのアクセス権が付与される可能性があるため、Datadogでは、これらのインスタンスへのアクセスを管理者ユーザーのみに制限することを推奨しています。

このリスクをさらに軽減するために、Datadogでは以下のセキュリティ対策を実装しています。

- Datadogスキャナーはお客様のインフラストラクチャ内で動作し、機密データの検索結果を含むすべてのデータが分離され、安全に保たれるようにします。
- スキャナーとDatadog間のすべてのデータ転送は、データの機密性と整合性を確保するために、業界標準のプロトコル（HTTPSなど）を使用して暗号化されます。
- Datadogは、スキャナーが必要とする権限を慎重に検討および制限し、不必要なアクセスなしでスキャンを実行できるようにします。これは、スキャナーが最小権限の原則に基づいて動作し、効果的に実行するために必要な最小限の権限のみが付与されることを意味します。
- Datadogのスキャナーインスタンスでは、自動セキュリティアップデートが有効になっています。この機能により、手動操作を必要とせずに、重要なセキュリティパッチやアップデートをインストールするプロセスが自動化されます。
- Datadogのスキャナーインスタンスは、24時間ごとに自動的にローテーションされます。このローテーションにより、スキャナーインスタンスは常に最新のUbuntuイメージで更新されます。
- スキャナーインスタンスへのアクセスは、セキュリティグループを使用して厳密に制御されています。スキャナーへのインバウンドアクセスは許可されておらず、インスタンスが侵害されるリスクをさらに低減します。

Amazon S3バケットをスキャンするには、以下の権限が必要です。

- `s3:GetObject`
- `s3:ListBucket`
- `kms:Decrypt`
- `kms:GenerateDataKey`

## スキャナーをデプロイする {#deploy-scanners}

エージェントレススキャナーは、お客様の環境で実行されるEC2インスタンスです。これらは、お客様のS3バケットをスキャンして機密情報を検索します。

スキャナーをお客様の環境にデプロイするには、2つの方法があります。
- [CloudFormationを使用して自動的にデプロイする](#automatically-deploy-scanners-using-cloudformation)
- [Terraformを使用して手動でデプロイする](#manually-deploy-scanners-using-terraform)

### CloudFormationを使ったスキャナーの自動デプロイ {#automatically-deploy-scanners-using-cloudformation}

CloudFormationを使用してエージェントレススキャナーをデプロイする場合、アカウントごとに1つのスキャナーが作成され、そのアカウントのすべてのリージョンにわたってスキャンが行われます。スキャナーをデプロイするリージョンを設定します。

{{< img src="/sensitive_data_scanner/setup/cloud_storage/scanner-in-each-account.png" alt="各アカウント内のリージョンをスキャンするスキャナーを示す図" style="width:100%;" >}}

新しいAWSアカウントまたは既存のAWSアカウントにスキャナーを追加できます。

{{< tabs >}}
{{% tab "新しいAWSアカウント" %}}

1. [Sensitive Data Scanner][1]設定ページに移動します。
1. {{< ui >}}Storage{{< /ui >}}タブの{{< ui >}}Cloud Settings{{< /ui >}}セクションで、{{< ui >}}Add AWS accounts by following these steps{{< /ui >}}をクリックします。
1. {{< ui >}}Automatically using CloudFormation{{< /ui >}}を有効のままにします。
1. ドロップダウンメニューでAWSリージョンを選択します。
1. 既に構成されているAPIキー（リモート構成用）を選択します。選択したAPIキーでリモート構成が有効になっていない場合、選択時にそのキーのリモート構成が自動的に有効になります。**注**: `api_keys_write`権限を持つユーザーのみが、個々のAPIキーに対してリモート構成を有効にできます。
1. AWSログをDatadogに送信する場合は、{{< ui >}}Yes{{< /ui >}}を選択したままにします。
1. Datadog Cloud Securityを使用する場合は、{{< ui >}}Yes{{< /ui >}}を選択します。
1. {{< ui >}}Enable Sensitive Data Scanner{{< /ui >}}はデフォルトで自動的に選択されます。これにより、CloudFormationはAWS Managed SecurityAuditポリシーをDatadog AWS統合ロールに追加し、エージェントレススキャンを有効にしてクラウドデータストアのスキャンを開始します。
1. {{< ui >}}Launch CloudFormation Template{{< /ui >}}をクリックします。

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration/data-security

{{% /tab %}}
{{% tab "既存のAWSアカウント" %}}

1. [Sensitive Data Scanner][1]設定ページに移動します。
1. {{< ui >}}Storage{{< /ui >}}タブの{{< ui >}}AWS{{< /ui >}}セクションで、次の操作を行います。
    - アカウントでエージェントレススキャンが既に有効になっている場合：
      1. アカウントの鉛筆アイコンをクリックします。
      1. {{< ui >}}Enable Sensitive Data Scanning{{< /ui >}}をオンに切り替えて、アカウントにスキャナーを追加します。
      1. {{< ui >}}Save{{< /ui >}}をクリックします。
    - アカウントでエージェントレススキャンが有効になっていない場合：
      1. 機密データスキャンを有効にするアカウントのプラスアイコンをクリックします。
      1. CloudFormationを使用してスキャナーを追加することを選択します。
      1. ドロップダウンメニューでAWSリージョンを選択します。
      1. リモート構成用に既に構成されているAPIキーを選択します。選択したAPIキーでリモート構成が有効になっていない場合、選択時にそのキーのリモート構成が自動的に有効になります。
      1. {{< ui >}}Enable Sensitive Data Scanning{{< /ui >}}をオンに切り替えて、アカウントにスキャナーを追加します。
      1. {{< ui >}}Launch CloudFormation Template{{< /ui >}}をクリックします。

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration/data-security

{{% /tab %}}
{{< /tabs >}}

### Terraformを使用してスキャナーを手動でデプロイする {#manually-deploy-scanners-using-terraform}

[Terraform Module Datadog Agentless Scanner][7]を使用して、エージェントレススキャナーをデプロイできます。手動でスキャナーをデプロイする場合は、次の2つのセットアップオプションのいずれかを選択することをDatadogは推奨しています。

- エージェントレススキャナー専用のAWSアカウントを作成します。スキャン対象のクラウドリソースがあるすべてのリージョンに対してスキャナーをデプロイします。

  {{< img src="/sensitive_data_scanner/setup/cloud_storage/central-scanner.png" alt="リージョンごとの中央スキャナーと、異なるアカウント間でスキャンを行うスキャナーを示す図" style="width:100%;" >}}

- スキャン対象のクラウドリソースがあるすべてのリージョンに対してスキャナーをデプロイします。

  {{< img src="/sensitive_data_scanner/setup/cloud_storage/scanner-in-each-region.png" alt="各リージョン内のアカウントをスキャンする、各リージョンのスキャナーを示す図" style="width:100%;" >}}

## スキャングループ {#scanning-groups}

[Cloud Storage][6]設定ページでは、{{< ui >}}Scanning Groups{{< /ui >}}セクションは読み取り専用です。すべての[ライブラリルール][2]は、スキャングループ内で適用されます。

## クラウドサービスプロバイダーのコスト {#cloud-service-provider-cost}

エージェントレススキャンを使用する場合、クラウド環境でスキャナーを実行するための追加コストが発生します。

スキャナーのコスト見積もりについては、[Datadog Customer Success Manager][8]までお問い合わせください。

## エージェントレススキャンを無効にする {#disable-agentless-scanning}

1. [Sensitive Data Scanner][6]設定ページに移動します。
1. エージェントレススキャンを無効にするアカウントの横にある鉛筆アイコンをクリックします。
1. をオフに切り替えます。{{< ui >}}Enable Sensitive Data Scanning{{< /ui >}}

## エージェントレススキャンをアンインストールする {#uninstall-agentless-scanning}

エージェントレススキャンをアンインストールするには、AWSコンソールにログインし、エージェントレススキャン用に作成されたCloudFormationスタックを削除してください。

## さらに詳しく {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/remote_configuration
[2]: /ja/security/sensitive_data_scanner/scanning_rules/library_rules/
[3]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/data-security
[4]: https://app.datadoghq.com/organization-settings/remote-config
[5]: https://app.datadoghq.com/organization-settings/remote-config/setup
[6]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration/data-security
[7]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner
[8]: mailto:success@datadoghq.com
[9]: /ja/account_management/rbac/permissions#access-management