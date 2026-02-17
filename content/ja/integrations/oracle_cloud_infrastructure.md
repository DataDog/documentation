---
app_id: oracle-cloud-infrastructure
app_uuid: c2b4d38f-dd23-4ca2-8bc4-b70360868e8c
assets:
  dashboards:
    Oracle-Cloud-Infrastructure-Overview-Dashboard: assets/dashboards/oracle-cloud-infrastructure-overview-dashboard.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 310
    source_type_name: Oracle Cloud Infrastructure
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- cloud
- ログの収集
- ネットワーク
- oracle
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oracle_cloud_infrastructure
integration_id: oracle-cloud-infrastructure
integration_title: Oracle Cloud Infrastructure
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oracle_cloud_infrastructure
public_title: Oracle Cloud Infrastructure
short_description: OCI は、ホスト環境において多様なアプリケーションをサポートするよう設計されたクラウドサービスの集合体です。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Log Collection
  - Category::Network
  - Category::Oracle
  - Offering::Integration
  configuration: README.md#Setup
  description: OCI は、ホスト環境において多様なアプリケーションをサポートするよう設計されたクラウドサービスの集合体です。
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-oci-with-datadog/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/datadog-oci-quickstart/
  support: README.md#Support
  title: Oracle Cloud Infrastructure
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
{{% site-region region="gov" %}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では、Oracle Cloud Infrastructure インテグレーションはサポートされていません。</div>
{{% /site-region %}}

{{< jqmath-vanilla >}}

## 概要

Oracle Cloud Infrastructure (OCI) は、エンタープライズ規模の企業で利用される infrastructure-as-a-service (IaaS) および platform-as-a-service (PaaS) です。ホスティング、ストレージ、ネットワーキング、データベースなどに利用できる 30 以上のマネージド サービス一式を提供します。

Datadog の OCI インテグレーションを利用すると、メトリクス、ログ、リソース データを通じて OCI 環境を包括的に可視化できます。これらのデータでダッシュボードを活用でき、トラブルシューティングにも役立ち、セキュリティやコンプライアンスの状況監視にも利用できます。

## セットアップ

### メトリクス収集

{{< tabs >}}

{{% tab "OCI QuickStart (Preview; recommended)" %}}

<div class="alert alert-info">
OCI QuickStart はプレビュー版です。<a href="https://docs.google.com/forms/d/1nx4ALq7iwnc2afuRaPNFNzYqGHM6UNJtj-jsVuoybBw/preview?edit_requested=true">このフォーム</a> から申請を送信してください。
</div>

Datadog の OCI QuickStart は、完全に管理された単一フローのセットアップ体験で、数回のクリックだけで OCI インフラストラクチャーとアプリケーションを監視できるようにします。OCI QuickStart は、メトリクス、ログ、リソース データを Datadog に転送するために必要な基盤を作成し、データ収集の対象となる新しいリソースや OCI コンパートメントを自動検出します。

**注**: デフォルトではメトリクスのみが送信されます。このセットアップ完了後に、[Datadog OCI インテグレーション タイル][1] でログ収集とリソース データ収集を有効にしてください。

Datadog へのメトリクスとログの転送基盤をセットアップするには:
   - [Datadog OCI インテグレーション タイルを設定](#datadog-oci-integration-tile)
   - [QuickStart stack をデプロイ](#orm-stack)
   - [Datadog でセットアップを完了](#complete-the-setup-in-datadog)
   - [メトリクスの送信を確認](#validation)
   - [メトリクス収集を設定 (オプション)](#configuration)
   - [ログ収集を設定 (オプション)](#log-collection)

このインテグレーションでは、Oracle Service Connector Hubs を使用して Datadog にデータを転送します。セットアップを完了する前に、[サービス制限の引き上げを申請][2] しておくことを推奨します。必要な Service Connector Hubs の概算は次のとおりです:

$$\\text"Service Connector Hubs" = \text"テナンシー内のコンパートメント数" / \text"5"\$$

{{% collapse-content title="このセットアップの前提条件" level="h4" %}}
- これらの手順を実行するには、OCI のユーザー アカウントに **Cloud Administrator** ロールが必要です
- 統合したいテナンシーで OCI にログインしている必要があります
- 画面右上で Home Region を選択した状態で、OCI にログインしている必要があります
- OCI のユーザー アカウントは <a href="https://docs.oracle.com/iaas/Content/Identity/domains/the_default_domain.htm" target="_blank">Default Identity Domain</a> に所属している必要があります
- OCI のユーザー アカウントは、Default Identity Domain でユーザー、ユーザー グループ、および動的グループを作成できる必要があります
- OCI のユーザー アカウントは、ルート コンパートメントでポリシーを作成できる必要があります
{{% /collapse-content %}}

{{% collapse-content title="サポート対象リージョン" level="h4" %}}
- us-ashburn-1
- ap-tokyo-1
- sa-saopaulo-1
- us-phoenix-1
- eu-frankfurt-1
- eu-stockholm-1
- ap-singapore-1
- us-sanjose-1
- ca-toronto-1
- sa-santiago-1
- uk-london-1
- eu-madrid-1
- me-jeddah-1
- us-chicago-1

<a href="https://docs.google.com/forms/d/1nx4ALq7iwnc2afuRaPNFNzYqGHM6UNJtj-jsVuoybBw/preview?edit_requested=true">このフォーム</a> から追加リージョンをリクエストしてください。

{{% /collapse-content %}}

#### Datadog OCI インテグレーション タイル

1. [Datadog OCI インテグレーション タイル][1] に移動し、**Add New Tenancy** をクリックします。
2. このインテグレーションで使用する Datadog API キーを選択するか、新規作成します。
3. Datadog のアプリケーション キーを作成します。
4. **Create OCI Stack** をクリックします。Oracle Resource Manager (ORM) のスタックに移動し、そこでデプロイを完了します。<br />
   **注**: このスタックはテナンシーごとに 1 回だけデプロイしてください。

#### ORM スタック

1. Oracle 利用規約に同意します。
2. カスタム Terraform プロバイダーを使用するオプションは、未選択のままにしてください。
3. デフォルトの作業ディレクトリでスタックをデプロイするか、必要に応じて別のディレクトリを選択してください。
4. **Next** をクリックし、もう一度 **Next** をクリックします。<br />
5. **Create** をクリックし、デプロイが完了するまで最大 15 分待ちます。

[1]: https://app.datadoghq.com/integrations/oracle-cloud-infrastructure
[2]: https://docs.oracle.com/iaas/Content/General/Concepts/servicelimits.htm#Requesti
{{% /tab %}}

{{% tab "Manual setup" %}}

OCI メトリクスを Datadog に転送するには
   - [テナンシー情報を入力](#enter-tenancy-info)
   - テナンシーのホーム リージョンで [OCI ポリシー スタックをデプロイ](#create-oci-policy-stack) し、Datadog の読み取り専用ユーザー、グループ、ポリシーを作成します
   - Datadog で [DatadogROAuthUser 情報を入力](#enter-datadogroauthuser-info)
   - メトリクスの転送元にしたい各テナンシー リージョンについて、[OCI メトリクス転送スタックをデプロイ](#create-oci-metric-forwarding-stack) します
   - [Datadog でセットアップを完了](#complete-the-setup-in-datadog)
   - [メトリクスの送信を確認](#validation)
   - [メトリクス収集を設定 (オプション)](#configuration)
   - [ログ収集を設定 (オプション)](#log-collection)

このアーキテクチャを図で確認するには、[アーキテクチャ](#architecture) セクションを参照してください。

#### テナンシー情報を入力

{{% collapse-content title="このセクションの要件" level="h5" %}}
- これらの手順を実行するには、OCI のユーザー アカウントに **Cloud Administrator** ロールが必要です
- Tenancy OCID
- Home Region
{{% /collapse-content %}}

監視したいテナンシーの OCID とホーム リージョンを、[Datadog OCI インテグレーション タイル][1] に入力します。
   - この情報は [Tenancy 詳細ページ][2] で確認できます。
   - ホーム リージョンは、OCI の [Regions and Availability Domains ページ][3] にある **Region Identifier** の値を使って入力します。

#### OCI ポリシー スタックを作成

{{% collapse-content title="このセクションの要件" level="h5" %}}
- OCI のユーザー アカウントは、Default domain で [動的グループとポリシーを作成][4] できる必要があります
- テナンシーのホーム リージョンにいる必要があります
{{% /collapse-content %}}

<div class="alert alert-warning">画面右上で、テナンシーの <strong>ホーム リージョン</strong> が選択されていることを確認してください。</div>

この Oracle Resource Manager (ORM) のポリシー スタックは、テナンシーごとに 1 回だけデプロイしてください。

1. Datadog OCI インテグレーション タイルの **Create Policy Stack** ボタンをクリックします。
2. Oracle 利用規約に同意します。
3. カスタム Terraform プロバイダーを使用するオプションは**未選択**のままにします。
4. スタックの名前とコンパートメントはデフォルトのままでも構いません。必要に応じて、分かりやすい名前やコンパートメントを指定することもできます。
5. **Next** をクリックします。
6. tenancy フィールドと current user フィールドは、そのまま変更しないでください。
7. **Next** をクリックします。
8. **Create** をクリックします。

#### DatadogROAuthUser 情報を入力

{{% collapse-content title="このセクションの要件" level="h5" %}}
- `DatadogROAuthUser` の OCID
- OCI API キーとフィンガープリント値
{{% /collapse-content %}}

1. OCI コンソールの検索バーで `DatadogROAuthUser` を検索し、表示された User リソースをクリックします。
2. ユーザーの OCID 値をコピーします。
3. その値を、[Datadog OCI インテグレーション タイル][1] の **User OCID** フィールドに貼り付けます。
4. OCI コンソールに戻り、次の手順で API キーを生成します:<br />
   a. 画面左下の **Resources** 配下で **API keys** をクリックします。<br />
   b. **Add API key** をクリックします。<br />
   c. **Download private key** をクリックします。<br />
   d. **Add** をクリックします。<br />
   e. **Configuration file preview** のポップアップが表示されますが、操作は不要です。ポップアップを閉じてください。

![OCI コンソールの Add API Key ページ][5]

5. フィンガープリント値をコピーし、[Datadog OCI インテグレーション タイル][1] の **Fingerprint** フィールドに貼り付けます。
6. 次の手順で、秘密鍵の値をコピーします:
   a. ダウンロードした秘密鍵の `.pem` ファイルをテキスト エディターで開くか、`cat` などのターミナル コマンドでファイル内容を表示します。
   b. `-----BEGIN PRIVATE KEY-----` と `-----END PRIVATE KEY-----` を含む全内容をコピーします。
7. プライベートキーの値を Datadog OCI インテグレーションタイルの **Private Key** フィールドに貼り付けてください。

#### OCI メトリクス転送スタックを作成

{{% collapse-content title="このセクションの要件" level="h5" %}}
- OCI のユーザー アカウントは、対象コンパートメント内でリソースを作成できる必要があります
- [Datadog API Key][6] の値
- Docker リポジトリに対してイメージを pull / push できるよう、`REPOSITORY_READ` と `REPOSITORY_UPDATE` 権限を持つユーザーのユーザー名と認証トークン
    - 認証トークンの作成方法は [認証トークンを取得する][7] を参照してください
    - 必要なポリシーの詳細は [リポジトリ アクセスを制御するポリシー][8] を参照してください

**注**: Docker レジストリへのログイン情報が正しいか確認するには、[Oracle Cloud Infrastructure Registry へのログイン][9] を参照してください。
{{% /collapse-content %}}

メトリクス転送スタックは、監視対象とする **テナンシーとリージョンの組み合わせごと** にデプロイする必要があります。最もシンプルな構成として、Datadog では以下で提供する Oracle Resource Manager (ORM) スタックを使い、必要な OCI リソースをまとめて作成する方法を推奨します。既存の OCI ネットワーク基盤を利用することも可能です。

Datadog の ORM スタックで作成されるリソースはすべて、指定したコンパートメントに、かつ画面右上で現在選択されているリージョンにデプロイされます。

1. Datadog OCI インテグレーション タイルで **Create Metric Stack** ボタンをクリックします。
2. Oracle 利用規約に同意します。
3. **Custom providers** オプションは未選択のままにしてください。
4. スタックに名前を付け、それをデプロイするコンパートメントを選択します。
5. **Next** をクリックします。
6. **Datadog API Key** フィールドに、[Datadog API キー][6] の値を入力します。
7. **Network options** セクションでは、`Create VCN` を選択したままにします。
{{% collapse-content title="(オプション) 既存の VCN を使用する" level="h4" %}}
既存の Virtual Cloud Network (VCN) を使用する場合は、サブネットの OCID をスタックに指定する必要があります。VCN が次の条件を満たしていることを確認してください:
   - NAT ゲートウェイ経由で HTTP のエグレス通信ができる
   - サービス ゲートウェイを使用して OCI コンテナ レジストリからイメージを pull できる
   - ルート テーブル ルールで NAT ゲートウェイとサービス ゲートウェイを許可している
   - セキュリティ ルールで HTTP リクエストの送信を許可している

7. **Network options** セクションで `Create VCN` を未選択にし、VCN 情報を入力します:<br />
   a. **vcnCompartment** フィールドで、コンパートメントを選択します。<br />
   b. **existingVcn** セクションで、既存の VCN を選択します。<br />
   c. **Function Subnet OCID** セクションで、使用するサブネットの OCID を入力します。
{{% /collapse-content %}}

8. **Metrics settings** セクションで、必要に応じて収集対象から除外するメトリクス ネームスペースを削除します。
9. **Metrics compartments** セクションで、監視するコンパートメント OCID をカンマ区切りで入力します。前の手順で選択したメトリクス ネームスペース フィルターが、各コンパートメントに適用されます。
10. **Function settings** セクションで `GENERIC_ARM` を選択します。日本リージョンにデプロイする場合は `GENERIC_X86` を選択してください。
11. **Next** をクリックします。
12. **Create** をクリックします。
13. [Datadog OCI インテグレーション タイル][1] に戻り、**Create Configuration** をクリックします。

**注**:
- デフォルトでは、ルート コンパートメントのみが選択され、手順 8 で選択したメトリクス ネームスペースのうち、該当コンパートメントに存在するものがすべて有効になります (Service Connector Hub あたり最大 50 ネームスペースまでサポート)。追加のコンパートメントを監視対象にした場合、そのコンパートメントに追加されるネームスペースは、「選択したネームスペース」と「コンパートメントに存在するネームスペース」の共通部分になります。
- Resource Manager スタックの Terraform state ファイルに誰がアクセスできるかは、適切に管理してください。詳細は、Securing Resource Manager ページの [Terraform State Files セクション][10] を参照してください。

[1]: https://app.datadoghq.com/integrations/oracle-cloud-infrastructure
[2]: https://cloud.oracle.com/tenancy
[3]: https://docs.oracle.com/iaas/Content/General/Concepts/regions.htm
[4]: https://docs.oracle.com/en/cloud/paas/weblogic-container/user/create-dynamic-groups-and-policies.html
[5]: images/add_api_key.png
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: https://docs.oracle.com/iaas/Content/Registry/Tasks/registrygettingauthtoken.htm
[8]: https://docs.oracle.com/iaas/Content/Registry/Concepts/registrypolicyrepoaccess.htm#Policies_to_Control_Repository_Access
[9]: https://docs.oracle.com/iaas/Content/Functions/Tasks/functionslogintoocir.htm
[10]: https://docs.oracle.com/iaas/Content/Security/Reference/resourcemanager_security.htm#confidentiality__terraform-state
{{% /tab %}}

{{< /tabs >}}

#### Datadog で設定を完了する

[Datadog OCI インテグレーション タイル][1] に戻り、**Ready!** をクリックします。

#### 検証

Datadog の [OCI integration overview dashboard][2] または [Metrics Explorer page][3] で `oci.*` メトリクスを確認します。

<div class="alert alert-warning">OCI 関数メトリクス (<code>oci.faas</code> ネームスペース) とコンテナインスタンスメトリクス (<code>oci_computecontainerinstance</code> ネームスペース) はプレビュー版です。</div>

#### 構成

![Datadog における OCI テナンシーの configuration タブ][4]

セットアップ完了後、[Datadog OCI インテグレーション タイル][1] の左側に、テナンシー用の configuration タブが表示されるようになります。以降のセクションで説明する手順に従い、テナンシー全体のデータ収集設定を適用してください。

##### Add regions

**General** タブで、**Regions** のチェック ボックス一覧からデータ収集対象のリージョンを選択します。リージョンの選択は、メトリクスとログの両方について、テナンシー全体に適用されます。

**注**: QuickStart 方式で初期セットアップを行い、その後に新しい OCI リージョンを購読した場合は、ORM で初期セットアップ スタックを再適用してください。これにより、新しいリージョンが Datadog OCI タイルで選択可能になります。

##### メトリクスとログの収集

**Metric collection** と **Log collection** タブで、Datadog に送信するメトリクスとログを設定します:

- テナンシー全体について、メトリクスまたはログの収集を **Enable** / **disable** する
- `key:value` 形式のコンパートメント タグを基に、特定のコンパートメントを **Include** / **exclude** する。例:
   - `datadog:monitored,env:prod*` は、いずれかのタグが存在するコンパートメントを対象に含めます
   - `!env:staging,!testing` は、両方のタグが存在する場合にのみコンパートメントを対象から除外します
   - `datadog:monitored,!region:us-phoenix-1` は、`datadog:monitored` タグがあり、かつ `region:us-phoenix-1` タグがないコンパートメントを対象に含めます
- 特定の OCI サービスについて、収集を **Enable** / **disable** する

**注**: 
- OCI 側でタグを変更してから Datadog に反映されるまで、最大 15 分かかる場合があります
- OCI では、タグは子コンパートメントに継承されません。各コンパートメントを個別にタグ付けする必要があります

{{% collapse-content title="メトリクス ネームスペースの全一覧を見る" level="h4" %}}
### メトリクスネームスペース

| インテグレーション                         | メトリクスネームスペース                                                                                                                         |
|-------------------------------------| ---------------------------------------------------------------------------------------------------------------------------------------- |
| [API Gateway][5]                  | [oci_apigateway][6]                                                                                                                    |
| [Autonomous Database][7]           | [oci_autonomous_database][8]                                                                                                            |
| [Block Storage][9]                       | [oci_blockstore][10]                                                                                                                     |
| [Compute][11]                       | [oci_computeagent][12], [rdma_infrastructure_health][13], [gpu_infrastructure_health][14], [oci_compute_infrastructure_health][15]       |
| [Container Instances (Preview)][16] | [oci_computecontainerinstance][17]                                                                                                       |
| [Database][18]                      | [oci_database][19], [oci_database_cluster][20]                                                                                           |
| ダイナミックルーティングゲートウェイ             | [oci_dynamic_routing_gateway][21]                                                                                                        |
| [E-Business Suite (EBS)][22]             | [oracle_appmgmt][23]                                                                                                        |
| [FastConnect][24]                         | [oci_fastconnect][25]                                                                                                                    |
| [File Storage][26]                        | [oci_filestorage][27]                                                                                                                    |
| [Functions (Preview)][28]           | [oci_faas][29]                                                                                                                           |
| [GPU][30]           | [gpu_infrastructure_health][14]                                                                                                                           |
| [HeatWave MySQL][31]                | [oci_mysql_database][32]                                                                                                                 |
| [Kubernetes Engine][33]                   | [oci_oke][34]                                                                                                                            |
| [Load Balancer][35]                 | [oci_lbaas][36], [oci_nlb][37]                                                                                                           |
| [Media Streams][38]                   | [oci_mediastreams][39]                                                                                                                    |
| [NAT Gateway][40]                   | [oci_nat_gateway][41]                                                                                                                    |
| [Network Firewall][42]                   | [oci_network_firewall][43]                                                                                                                    |
| [Object Storage][44]                      | [oci_objectstorage][45]                                                                                                                  |
| [PostgreSQL][46]                   | [oci_postgresql][47]                                                                                                                    |
| [Queue][48]                               | [oci_queue][49]                                                                                                                          |
| [Service Connector Hub][50]               | [oci_service_connector_hub][51]                                                                                                          |
| [Service Gateway][52]                     | [oci_service_gateway][53]                                                                                                                |
| [VCN][54]                           | [oci_vcn][55]                                                                                                                            |
| [VPN][56]                           | [oci_vpn][57]                                                                                                                            |
| [Web Application Firewall][58]            | [oci_waf][59]
{{% /collapse-content %}}

### ログ収集

OCI ログを Datadog に送信するには、以下のいずれかの方法を使用します:

{{< tabs >}}

{{% tab "OCI QuickStart (Preview; recommended)" %}}

1. メトリクスとログの両方を Datadog に転送するための基盤は、[セットアップ セクション](#setup) の手順に沿って作成します。
2. [Datadog OCI インテグレーション タイル][1] の **Log Collection** タブで、**Enable Log Collection** トグルをオンにします。

[1]: https://app.datadoghq.com/integrations/oracle-cloud-infrastructure
{{% /tab %}}

{{% tab "サービスコネクタハブ" %}}

1. OCI ログを構成します。
2. OCI 関数を作成します。
3. OCI サービスコネクタを設定します。

以下の手順では、OCI ポータルを使用してインテグレーションを設定します。

#### OCI ロギング

1. OCI ポータルで、*Logging -> Log Groups* に移動します。
2. コンパートメントを選択し、**Create Log Group** をクリックします。サイドパネルが開きます。
3. 名前には `data_log_group` を入力し、オプションで説明とタグを入力します。
4. **Create** をクリックして、新しいロググループを設定します。
5. **Resources** の下にある **Logs** をクリックします。
6. 必要に応じて、**Create custom log** または **Enable service log** をクリックします。
7. **Enable Log** をクリックして、新しい OCI ログを作成します。

OCI ログの詳細については、[リソースのログを有効にする][1]を参照してください。

#### OCI 関数

1. OCI ポータルで、*Functions* に移動します。
2. 既存のアプリケーションを選択するか、**Create Application** をクリックします。
3. アプリケーション内に新しい OCI 関数を作成します。詳細については、[Oracle の関数概要][2]を参照してください。
4. まずボイラープレートの Python 関数を作成し、自動生成されたファイルを Datadog のソース コードに差し替えることを推奨します:
   - [Datadog OCI リポジトリ][3] のコードで `func.py` を置き換えます
   - [Datadog OCI リポジトリ][4] のコードで `func.yaml` を置き換えます。`DATADOG_TOKEN` と `DATADOG_HOST` は、それぞれ Datadog API キーと、対象リージョンのログ取り込みリンク (logs intake link) に置き換える必要があります
   - [Datadog OCI リポジトリ][5] のコードで `requirements.txt` を置き換えます

#### OCI サービスコネクタハブ

1. OCI ポータルで、*Logging -> Service Connectors* に移動します。
2. **Create Service Connector** をクリックして、**Create Service Connector** ページに移動します。
3. ロギングとして **Source** を選択し、関数として **Target** を選択します。
4. **Configure Source Connection** で、**Compartment name**、**Log Group**、**Log** を選択します。(最初のステップで作成された **Log Group** と **Log**)
5. **Audit Logs** も送信する場合は、**+Another Log** をクリックし、同じ **Compartment** を選択して、**Log Group** として "_Audit" を置き換えます。
6. **Configure target** で、**Compartment**、**Function application**、**Function** を選択します。(前のステップで作成された **Function Application** と **Function**)
7. ポリシーを作成するように求められたら、プロンプトから **Create** をクリックします。
8. 一番下の **Create** をクリックして、サービスコネクタの作成を完了します。

OCI オブジェクトストレージの詳細については、[Oracle のサービスコネクタのブログ記事][6]を参照してください。

[1]: https://docs.oracle.com/iaas/Content/Logging/Task/enabling_logging.htm
[2]: https://docs.cloud.oracle.com/iaas/Content/Functions/Concepts/functionsoverview.htm
[3]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/func.py
[4]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/func.yaml
[5]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/requirements.txt
[6]: https://blogs.oracle.com/cloud-infrastructure/oracle-cloud-infrastructure-service-connector-hub-now-generally-available
{{% /tab %}}

{{% tab "Object store" %}}

1. OCI ログを構成します。
2. OCI オブジェクトストアを作成し、OCI ログの読み取り/書き込みアクセスを有効にします。
3. OCI 関数を作成します。
4. OCI イベントを設定します。

以下の手順では、OCI ポータルを使用してインテグレーションを設定します。

#### OCI ロギング

1. OCI ポータルで、*Solutions and Platform -> Logging -> Logs* に移動します。
2. **Create Custom Log** をクリックして、**Create Custom Log** ページに移動します。
3. 新しい OCI ログに名前を付けます。
4. **Compartment** と **Log Group** を選択します。この選択は、インストール全体で一貫しています。
5. **Create Custom Log** をクリックして、**Create Agent Config** ページに移動します。
6. **Create new configuration** をクリックします。
7. 新しいコンフィギュレーションに名前を付けます。コンパートメントは事前に選択されています。
8. グループタイプを **Dynamic Group** に設定し、グループを既存のグループの 1 つに設定します。
9. 入力タイプを **Log Path** に設定し、希望の入力名を入力して、ファイルパスに "/" を使用します。
10. **Create Custom Log** をクリックすると、OCI ログが作成され、ログページで利用できるようになります。

OCI ログの詳細については、[リソースのログを有効にする][1]を参照してください。

#### OCI オブジェクトストレージ

1. OCI ポータルで、*Core Infrastructure -> Object Storage -> Object Storage* に移動します。
2. **Create Bucket** をクリックして、**Create Bucket** フォームに移動します。
3. ストレージ階層に **Standard** を選択し、**Emit Object Events** をチェックします。
4. 好みに応じてフォームの残りの部分に記入します。
5. **Create Bucket** をクリックすると、バケットが作成され、バケットリストで利用できるようになります。
6. アクティブなバケットリストから新しいバケットを選択し、リソースの下の **Logs** をクリックします。
7. **read** を有効化すると、**Enable Log** のサイド メニューに移動します。
8. **Compartment** と **Log Group** を選択します (OCI ログと同じ選択を使用します)。
9. **Log Name** の名前を入力し、希望するログ保持を選択します。

OCI オブジェクトストレージの詳細については、[データをオブジェクトストレージに格納する][2]を参照してください。

#### OCI 関数

1. OCI ポータルで、*Solutions and Platform -> Developer Services -> Functions* に移動します。
2. 既存のアプリケーションを選択するか、**Create Application** をクリックします。
3. アプリケーション内に新しい OCI 関数を作成します。詳細については、[Oracle の関数概要][3]を参照してください。
4. まずボイラープレートの Python 関数を作成し、自動生成されたファイルを Datadog のソース コードに差し替えることを推奨します:
   - [Datadog OCI リポジトリ][4] のコードで `func.py` を置き換えます
   - [Datadog OCI リポジトリ][5] のコードで `func.yaml` を置き換えます。`DATADOG_TOKEN` と `DATADOG_HOST` は、それぞれ Datadog API キーと、対象リージョンのログ取り込みリンク (logs intake link) に置き換える必要があります
   - [Datadog OCI リポジトリ][6] のコードで `requirements.txt` を置き換えます

#### OCI イベント

1. OCI ポータルで、*Solutions and Platform -> Application Integration -> Event Service* に移動します。
2. **Create Rule** をクリックして、**Create Rule** ページに移動します。
3. イベントルールに名前と説明を付けます。
4. 条件を *Event Type**、サービス名を **Object Storage**、イベントタイプを **Object - Create** として設定します。
5. アクションタイプを **Functions** として設定します。
6. 関数コンパートメントが、OCI ログ、OCI バケット、および OCI 関数に対して行った選択と同じであることを確認します。
7. (前のインストール手順に従って) 関数アプリケーションと関数を選択します。
8. **Create Rule** をクリックすると、ルールが作成され、ルールリストで利用できるようになります。

OCI オブジェクトストレージの詳細については、[イベント入門][7]を参照してください。

[1]: https://docs.oracle.com/iaas/Content/Logging/Task/enabling_logging.htm
[2]: https://docs.cloud.oracle.com/iaas/Content/GSG/Tasks/addingbuckets.htm
[3]: https://docs.cloud.oracle.com/iaas/Content/Functions/Concepts/functionsoverview.htm
[4]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/func.py
[5]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/func.yaml
[6]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/requirements.txt
[7]: https://docs.cloud.oracle.com/iaas/Content/Events/Concepts/eventsgetstarted.htm
{{% /tab %}}

{{< /tabs >}}

### リソース収集

[Datadog OCI インテグレーション タイル][1] の **Resource Collection** タブで、**Enable Resource Collection** トグルをオンにします。リソースは [Datadog Resource Catalog][60] で確認できます。

## アーキテクチャ

{{< tabs >}}

{{% tab "OCI QuickStart (Preview; recommended)" %}}

### メトリクスとログの転送リソース

![このセットアップ オプションで使用する OCI のメトリクス / ログ転送リソースと、データの流れを示した図][1]

監視対象のリージョンごとに、このオプションでは、そのリージョン内に次の基盤を作成してメトリクスとログを Datadog に転送します:

- 関数アプリケーション (`dd-function-app`)
- 2 つの関数:
   - Metrics Forwarder (`dd-metrics-forwarder`)
   - Logs Forwarder (`dd-logs-forwarder`)
- セキュアなネットワーク基盤を備えた VCN (`dd-vcn`):
   - プライベート サブネット (`dd-vcn-private-subnet`)
   - インターネットへの外部アクセス用 NAT ゲートウェイ (`dd-vcn-natgateway`)
   - OCI サービスへの内部アクセス用サービス ゲートウェイ (`dd-vcn-servicegateway`)
- Datadog API キーを保管するための Key Management Service (KMS) vault (`datadog-vault`)
- 専用の **Datadog** コンパートメント (`Datadog`)

すべてのリソースに `ownedby = "datadog"` タグが付与されます。

### IAM リソース

![このセットアップ オプションで使用する OCI の IAM リソースと、データの流れを示した図][2]

このオプションでは、Datadog へのデータ転送を可能にするため、次の IAM リソースを作成します:

- サービス ユーザー (`dd-svc`)
- サービス ユーザーが所属するグループ (`dd-svc-admin`)
- API 認証用の RSA 鍵ペア
- サービス ユーザー用の OCI API キー
- Datadog コンパートメント内の全サービス コネクタを含む動的グループ (`dd-dynamic-group-connectorhubs`)
- Datadog コンパートメント内の全関数を含む動的グループ (`dd-dynamic-group-function`)
- Datadog が作成 / 管理するコンパートメント内で、テナンシー リソースの読み取り権限に加え、OCI Service Connector Hubs と OCI Functions を管理できる権限をサービス ユーザーに付与するポリシー (`dd-svc-policy`)
{{% collapse-content title="ポリシーを表示" level="h6" %}}
```text
- Allow dd-svc-admin to read all-resources in tenancy
- Allow dd-svc-admin to manage serviceconnectors in Datadog compartment
- Allow dd-svc-admin to manage functions-family in Datadog compartment with specific permissions:
     * FN_FUNCTION_UPDATE
     * FN_FUNCTION_LIST
     * FN_APP_LIST
- Endorse dd-svc-admin to read objects in tenancy usage-report
```
{{% /collapse-content %}}

- サービス コネクタがデータ (ログとメトリクス) を読み取り、関数と連携できるようにするためのポリシー `dd-dynamic-group-policy`。このポリシーにより、関数は Datadog コンパートメント内のシークレット (KMS vault に保存された Datadog API キーとアプリケーション キー) も読み取れるようになります

{{% collapse-content title="ポリシーを表示" level="h6" %}}
```text
   - Allow dd-dynamic-group-connectorhubs to read log-content in tenancy
   - Allow dd-dynamic-group-connectorhubs to read metrics in tenancy
   - Allow dd-dynamic-group-connectorhubs to use fn-function in Datadog compartment
   - Allow dd-dynamic-group-connectorhubs to use fn-invocation in Datadog compartment
   - Allow dd-dynamic-group-functions to read secret-bundles in Datadog compartment
```
{{% /collapse-content %}}

[1]: images/oci_quickstart_infrastructure_diagram.png
[2]: images/oci_quickstart_iam_diagram.png
{{% /tab %}}

{{% tab "Manual setup" %}}

### メトリクス転送リソース

![このセットアップ オプションで使用する OCI リソースと、データの流れを示した図][1]

このオプションでは、OCI メトリクスを Datadog に転送するために、OCI の [コネクタ ハブ][2]、[関数アプリ][3]、およびセキュアなネットワーク基盤を作成します。これらのリソース用の ORM スタックは、テナンシー内の当該リージョンに関数用コンテナ リポジトリを作成し、Docker イメージをそこへ push して関数から利用します。

### IAM リソース

![インテグレーション認証で使用する OCI リソースとワークフローの図][4]

このオプションで作成されるもの:

- コネクタ ハブへのアクセスを可能にするため、`resource.type = 'serviceconnectors'` を条件にした動的グループ
- Datadog がテナンシー リソースを読み取るために使用する、**DatadogROAuthUser** というユーザー
- 作成したユーザーをポリシーで許可するために追加するグループ
- 関数用の Docker イメージを push するために使用する、**DatadogAuthWriteUser** というユーザー
- `DatadogAuthWriteUser` を追加し、ポリシー経由でイメージを push できるようにする Write access group
- コネクタ ハブがメトリクスを読み取り、関数を呼び出せるようにするためのルート コンパートメントのポリシー。このポリシーは、作成したユーザー グループに対しても、テナンシー リソースの読み取り権限と Write access group へのアクセス権を付与し、イメージを push できるようにします

{{% collapse-content title="ポリシーを表示" level="h6" %}}
```text
Allow dynamic-group Default/<GROUP_NAME> to read metrics in tenancy
Allow dynamic-group Default/<GROUP_NAME> to use fn-function in tenancy
Allow dynamic-group Default/<GROUP_NAME> to use fn-invocation in tenancy
Allow group Default/<USER_GROUP_NAME> to read all-resources in tenancy
Allow group Default/<WRITE_USER_GROUP_NAME> to manage repos in tenancy where ANY {request.permission = 'REPOSITORY_READ', request.permission = 'REPOSITORY_UPDATE', request.permission = 'REPOSITORY_CREATE'}
```
{{% /collapse-content %}}

[1]: images/OCI_metrics_integration_diagram.png
[2]: https://docs.oracle.com/iaas/Content/connector-hub/home.htm
[3]: https://docs.oracle.com/iaas/Content/Functions/Concepts/functionsconcepts.htm#applications
[4]: images/OCI_auth_workflow_diagram.png
{{% /tab %}}

{{< /tabs >}}

## 収集データ

### メトリクス

このインテグレーションで提供されるメトリクスの一覧は、[metadata.csv][61] を参照してください。

### サービス チェック

OCI インテグレーションには、サービスのチェック機能は含まれません。

### イベント

OCI インテグレーションには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][62]までお問い合わせください。

## その他の参考資料

役立つドキュメント、リンク、記事:

- [Datadog で Oracle Cloud Infrastructure を監視][63]
- [Datadog OCI QuickStart で Oracle Cloud Infrastructure の監視を加速][64]


[1]: https://app.datadoghq.com/integrations/oracle-cloud-infrastructure
[2]: https://app.datadoghq.com/dash/integration/31417/oracle-cloud-infrastructure-oci-overview
[3]: https://app.datadoghq.com/metric/explorer
[4]: images/oci_configuration_tab.png
[5]: https://docs.datadoghq.com/ja/integrations/oci_api_gateway/
[6]: https://docs.oracle.com/iaas/Content/APIGateway/Reference/apigatewaymetrics.htm
[7]: https://docs.datadoghq.com/ja/integrations/oci_autonomous_database/
[8]: https://docs.oracle.com/iaas/autonomous-database-serverless/doc/autonomous-monitor-metrics-list.html
[9]: https://docs.datadoghq.com/ja/integrations/oci_block_storage/
[10]: https://docs.oracle.com/iaas/Content/Block/References/volumemetrics.htm
[11]: https://docs.datadoghq.com/ja/integrations/oci_compute/
[12]: https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#Availabl
[13]: https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_compute_rdma_network
[14]: https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_high_performance_compute
[15]: https://docs.oracle.com/iaas/Content/Compute/References/infrastructurehealthmetrics.htm
[16]: https://docs.datadoghq.com/ja/integrations/oci_container_instances/
[17]: https://docs.oracle.com/iaas/Content/container-instances/container-instance-metrics.htm
[18]: https://docs.datadoghq.com/ja/integrations/oci_database/
[19]: https://docs.oracle.com/iaas/base-database/doc/available-metrics-base-database-service-resources.html#DBSCB-GUID-57B7B9B1-288B-4DCB-82AE-D53B2BD9C78F
[20]: https://docs.oracle.com/iaas/base-database/doc/available-metrics-base-database-service-resources.html#DBSCB-GUID-A42CF0E3-EE65-4A66-B8A3-C89B62AFE489
[21]: https://docs.oracle.com/iaas/Content/Network/Reference/drgmetrics.htm
[22]: https://docs.datadoghq.com/ja/integrations/oci_ebs/
[23]: https://docs.oracle.com/iaas/stack-monitoring/doc/metric-reference.html#STMON-GUID-4E859CA3-1CAB-43FB-8DC7-0AA17E6B52EC
[24]: https://docs.datadoghq.com/ja/integrations/oci_fastconnect/
[25]: https://docs.oracle.com/iaas/Content/Network/Reference/fastconnectmetrics.htm
[26]: https://docs.datadoghq.com/ja/integrations/oci_file_storage/
[27]: https://docs.oracle.com/iaas/Content/File/Reference/filemetrics.htm
[28]: https://docs.datadoghq.com/ja/integrations/oci_functions/
[29]: https://docs.oracle.com/iaas/Content/Functions/Reference/functionsmetrics.htm
[30]: https://docs.datadoghq.com/ja/integrations/oci_gpu/
[31]: https://docs.datadoghq.com/ja/integrations/oci_mysql_database/
[32]: https://docs.oracle.com/iaas/mysql-database/doc/metrics.html
[33]: https://docs.datadoghq.com/ja/integrations/oke/
[34]: https://docs.oracle.com/iaas/Content/ContEng/Reference/contengmetrics.htm
[35]: https://docs.datadoghq.com/ja/integrations/oci_load_balancer/
[36]: https://docs.oracle.com/iaas/Content/Balance/Reference/loadbalancermetrics.htm
[37]: https://docs.oracle.com/iaas/Content/NetworkLoadBalancer/Metrics/metrics.htm
[38]: https://docs.datadoghq.com/ja/integrations/oci_media_streams/
[39]: https://docs.oracle.com/iaas/Content/dms-mediastream/mediastreams_metrics.htm?
[40]: https://docs.datadoghq.com/ja/integrations/oci_nat_gateway/
[41]: https://docs.oracle.com/iaas/Content/Network/Reference/nat-gateway-metrics.htm
[42]: https://docs.datadoghq.com/ja/integrations/oci_network_firewall/
[43]: https://docs.oracle.com/iaas/Content/network-firewall/metrics.htm
[44]: https://docs.datadoghq.com/ja/integrations/oci_object_storage/
[45]: https://docs.oracle.com/iaas/Content/Object/Reference/objectstoragemetrics.htm
[46]: https://docs.datadoghq.com/ja/integrations/oci_postgresql/
[47]: https://docs.oracle.com/iaas/Content/postgresql/metrics.htm
[48]: https://docs.datadoghq.com/ja/integrations/oci_queue/
[49]: https://docs.oracle.com/iaas/Content/queue/metrics.htm
[50]: https://docs.datadoghq.com/ja/integrations/oci_service_connector_hub/
[51]: https://docs.oracle.com/iaas/Content/connector-hub/metrics-reference.htm
[52]: https://docs.datadoghq.com/ja/integrations/oci_service_gateway/
[53]: https://docs.oracle.com/iaas/Content/Network/Reference/SGWmetrics.htm
[54]: https://docs.datadoghq.com/ja/integrations/oci_vcn/
[55]: https://docs.oracle.com/iaas/Content/Network/Reference/vnicmetrics.htm
[56]: https://docs.datadoghq.com/ja/integrations/oci_vpn/
[57]: https://docs.oracle.com/iaas/Content/Network/Reference/ipsecmetrics.htm
[58]: https://docs.datadoghq.com/ja/integrations/oci_waf/
[59]: https://docs.oracle.com/iaas/Content/WAF/Reference/metricsalarms.htm
[60]: https://docs.datadoghq.com/ja/infrastructure/resource_catalog/
[61]: https://github.com/DataDog/integrations-internal-core/blob/main/oracle_cloud_infrastructure/metadata.csv
[62]: https://docs.datadoghq.com/ja/help/
[63]: https://www.datadoghq.com/blog/monitor-oci-with-datadog/
[64]: https://www.datadoghq.com/blog/datadog-oci-quickstart/