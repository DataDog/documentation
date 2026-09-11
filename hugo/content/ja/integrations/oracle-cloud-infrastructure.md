---
aliases:
- /ja/integrations/oracle_cloud_infrastructure
app_id: oracle-cloud-infrastructure
categories:
- cloud
- log collection
- network
- oracle
custom_kind: integration
description: OCI は、ホスト環境において多様なアプリケーションをサポートするよう設計されたクラウドサービスの集合体です。
further_reading:
- link: https://www.datadoghq.com/blog/monitor-oci-with-datadog/
  tag: ブログ
  text: Datadog で Oracle Cloud Infrastructure を監視する
- link: https://www.datadoghq.com/blog/datadog-oci-quickstart/
  tag: ブログ
  text: Datadog OCI QuickStart を使用して Oracle Cloud Infrastructure の監視を効率化
integration_version: 1.1.1
media: []
title: Oracle Cloud Infrastructure
---
{{< jqmath-vanilla >}}

## 概要 {#overview}

Oracle Cloud Infrastructure (OCI) は、エンタープライズ規模の企業で使用される Infrastructure-as-a-Service (IaaS) および Platform-as-a-Service (PaaS) です。これには、ホスティング、ストレージ、ネットワーキング、データベースなどに対応する、30 を超えるマネージドサービスのフルスイートが含まれています。

Datadog の OCI インテグレーションを使用すると、メトリクス、ログ、およびリソースデータを通じて OCI 環境を完全に可視化できます。このデータにより、ダッシュボードを駆動し、トラブルシューティングを支援することが可能になり、セキュリティおよびコンプライアンス体制を監視することができます。

## セットアップ{#setup}

Datadog では、QuickStart のセットアップ方法の使用が推奨されています。必要に応じて、[Terraform](#oci-terraform-setup) を使用してインテグレーションをセットアップすることもできます。

### データ収集 {#data-collection}

#### 注意点 {#considerations}

- ログ、メトリクス、リソースデータ、およびイベントの収集は、デフォルトで有効になっています。セットアップ中にログまたはイベントの収集を無効にすることができます。セットアップ完了後、[Datadog OCI インテグレーションタイル ](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure) から、リソースデータ収集、イベント収集、および個別のログまたはメトリクスサービスを変更できます。
- 2026 年 1 月 1 日時点で存在していたすべての OCI 商用リージョン (OC1 レルム内) がサポートされています。この日付以降に追加された OCI リージョンはサポートされていません。
- Datadog OCI インテグレーションは、テナンシーごとに 1 つのインテグレーションに制限されています。2025 年 6 月より前にインテグレーションをセットアップした場合、手動セットアップの手順に従っていることになります。その結果として作成されたすべての Datadog OCI インテグレーションデプロイメントスタックを、OCI QuickStart のセットアップ方法を使用する前に削除する必要があります。ログ転送を手動で構成しており、OCI QuickStart タイルでログ収集を有効にすることを選択した場合は、ログの二重送信を防ぐため、既存のログ転送リソースも削除する必要があります。詳細については、このページの [手動から QuickStart への移行セクション](#oci-integration-manual-to-quickstart-migration)を参照してください。

{{% collapse-content title="QuickStart (推奨)" level="h4" %}}

Datadog の OCI QuickStart は、わずか数回のクリックで OCI インフラストラクチャーとアプリケーションを監視できる、完全管理型で単一フローのセットアップエクスペリエンスです。OCI QuickStart は、メトリクス、ログ、およびリソースデータを Datadog に転送するために必要なインフラストラクチャーを作成し、データ収集のために新しいリソースや OCI コンパートメントを自動的に検出します。

#### 次の場合は QuickStart セットアップを選択してください... {#choose-quickstart-setup-if}

- OCI インテグレーションを初めてセットアップする。
- UI ベースのワークフローを好み、必要なリソースの作成と構成にかかる時間を最小限に抑えたい。
- スクリプトや CI/CD パイプラインでセットアップ手順を自動化したい。

#### QuickStart セットアップの前提条件 {#quickstart-setup-prerequisites}

- これらの手順を完了するには、OCI ユーザーアカウントに **Identity Domain Administrator** ロールが必要です。
- インテグレーションを行うテナンシーで OCI にログインしている必要があります。
- 画面右上で Home Region が選択された状態で OCI にログインしている必要があります。
- お使いの OCI ユーザーアカウントが、ログインしている ID ドメイン (指定されている場合はターゲットドメイン) 内でユーザー、ユーザーグループ、および動的グループを作成可能でなければなりません。ターゲットドメインの OCID を指定する場合、お使いの OCI ユーザーアカウントはそのドメインにおける管理者権限を持っている必要があります。
- お使いの OCI ユーザーアカウントが、root コンパートメントでポリシーを作成可能でなければなりません。

#### QuickStart セットアップ手順 {#quickstart-setup-instructions}

Datadog へのメトリクスおよびログ転送用のインフラストラクチャーをセットアップするには、以下の手順に従います。

- [Datadog OCI インテグレーションタイルを設定する](#configure-the-datadog-oci-integration-tile)
- [QuickStart ORM スタックをデプロイする](#deploy-the-quickstart-orm-stack)
- [Datadog でセットアップを完了する](#complete-the-setup-in-datadog)
- [メトリクスが送信されていることを確認する](#validation)
- [メトリクスまたはログの収集を設定する (オプション)](#configuration)
- [リソース収集を設定する (オプション)](#resource-collection)

このインテグレーションでは、Oracle Service Connector Hubs を使用してデータを Datadog に転送する必要があります。セットアップを完了する前に、[サービス制限の引き上げをリクエストする](https://docs.oracle.com/iaas/Content/General/Concepts/servicelimits.htm#Requesti)ことをお勧めします。必要な Service Connector Hubs のおおよその数は次のとおりです。

$$\\text"Service Connector Hubs" = \\text"Number of compartments in tenancy" / \\text"5"$$

##### Datadog OCI インテグレーションタイルを設定する{#configure-the-datadog-oci-integration-tile}

1. [Datadog OCI インテグレーションタイル](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure)に移動し、[**Add New Tenancy**] をクリックします。

1. インテグレーションに使用する Datadog API キーを選択するか、作成します。

1. Datadog アプリケーションキーを作成します。

1. トグルを使用して、ログを有効または無効にします。

1. トグルを使用して、イベント収集を有効または無効にします。

1. [**Create OCI Stack**] をクリックします。これにより、Oracle Resource Manager (ORM) スタックに移動し、デプロイを完了できます。<br />
   **注**: このスタックは、テナンシーごとに 1 回だけデプロイしてください。

##### QuickStart ORM スタックをデプロイする{#deploy-the-quickstart-orm-stack}

1. Oracle 利用規約に同意します。

1. カスタム Terraform プロバイダーを使用するオプションは未選択のままにします。

1. デフォルトの作業ディレクトリを使用してスタックをデプロイするか、必要に応じて別のディレクトリを選択します。

1. [**Next**] をクリックします。

1. Datadog では、このテナンシーの各リージョンに仮想クラウドネットワーク (VCN) とサブネットを新規作成するために、`(Optional) Choose specific subnet(s)` セクションを空白のままにすることを推奨しています。

   **オプションで**、Datadog QuickStart スタック用に既存のサブネット (OCI リージョンあたり最大 1 つ) を選択できます。その場合は、スタックにサブネット OCID を指定する必要があります。OCID を 1 行に 1 つずつ、カンマなしで入力します。Datadog QuickStart スタックは、各サブネットに対応するリージョンにデプロイされます。各サブネットの OCID は、`ocid1.subnet.oc[0-9].*` の形式である必要があります。例: `ocid1.subnet.oc1.iad.abcedfgh`。<br />
   **注**: 既存の VCN とサブネットを使用する場合、各リージョンの VCN が以下を満たしていることを確認してください。

   - NAT Gateway を経由した HTTP の外向き通信が許可されている。
   - "Oracle Services Network のすべてのサービス" をサポートするサービスゲートウェイを持っている。
   - NAT Gateway と Service Gateway を許可するルートテーブルのルールが設定されている。
   - HTTP リクエストを送信するためのセキュリティルールが設定されている。

1. Datadog では、ユーザーとグループを新規作成するために `(Optional) Choose a User` セクションを空白のままにすることを推奨しています。グループとユーザーは、現在ログインしている OCI ID ドメインに作成されます (デフォルトドメインである必要はありません)。<br />
   **必要に応じて**、Datadog QuickStart スタック用に既存のユーザーとグループを選択できます。この場合、Datadog はユーザーとグループのドメインを自動的に推論し、それを使用して動的グループを作成します。<br />
   a.**Group ID**: Datadog 認証に使用する既存の OCI グループの OCID を指定します。これを指定する場合、[**User ID**] も指定する必要があります。<br />
   b.**User ID**: Datadog 認証に使用する既存の OCI ユーザーの OCID を指定します。ユーザーは、指定されたグループのメンバーである必要があります。これを指定する場合、[**Group ID**] も指定する必要があります。

1. これらのユースケースは一般的ではないため、Datadog では `(Optional) Advanced configuration` セクションを空白のままにすることを推奨しています。<br />
   **必要に応じて**、Datadog QuickStart スタック用に既存のコンパートメントとドメインを選択できます。<br />
   a.**Compartment**: Datadog によって作成されるすべてのリソースを配置する既存のコンパートメントを選択します。<br />
   b.**Domain**: ユーザーとグループが作成される場所を上書きするために、既存の ID ドメインの OCID を指定します。このフィールドは、手順 6 で既存のユーザーとグループが指定されていない場合にのみ表示されます。これを指定する場合、[**User Email**] も指定する必要があります。**注**: OCI ユーザーアカウントには、ターゲットドメインにおける **Identity Domain Administrator** ロールが必要です。<br />
   c.**Resource tags**: Datadog QuickStart スタックによってデプロイされるすべての OCI リソースに追加する定義済みタグのリストを指定します。1 行に 1 つのタグを入力します。カンマは追加しないでください。各定義済みタグは、`namespace.key:value` の形式である必要があります。例: `CostCenter.Environment:prod`。空白のままにした場合、Datadog QuickStart スタックによってデプロイされた OCI リソースに定義済みタグは追加されません。<br />

1. [**Next**] をクリックします。

1. [**Create**] をクリックし、デプロイが完了するまで最大 30 分お待ちください。

##### Datadog でセットアップを完了する{#complete-the-setup-in-datadog}

[Datadog OCI インテグレーションタイル](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure)に戻り、[**Ready!**] をクリックします。

{{% /collapse-content %}}

{{% collapse-content title="Terraform" level="h4" id="oci-terraform-setup" %}}

#### 次の場合は Terraform セットアップを選択してください... {#choose-terraform-setup-if}

- インフラストラクチャーをコードとして管理しており、Datadog OCI インテグレーションをバージョン管理下に置きたい。
- 再利用可能な provider ブロックを使用して、複数のフォルダーまたはプロジェクトを一貫した構成にする必要がある。
- Terraform 管理環境に応じた、繰り返し可能で監査可能なデプロイメントプロセスを確立したい。

Terraform を使用して Datadog OCI インテグレーションをプロビジョニングできます。このガイドでは、前提条件、必須の変数、および初期化、計画、適用の正確な手順を説明します。

#### Terraform セットアップの前提条件 {#terraform-setup-prerequisites}

開始する前に、以下を行ってください。

- Terraform 1.x のインストールを完了する。
- 有効な [Datadog API キー](https://app.datadoghq.com/organization-settings/api-keys)を用意する。
- ターゲットドメインにおける Identity Domain Administrator ロールを持つ OCI アクセス権を用意する。

#### Terraform セットアップ手順 {#terraform-setup-instructions}

Datadog へのメトリクスおよびログ転送用のインフラストラクチャーをセットアップするには、以下の手順に従います。

- [OCI 設定ファイルを作成する](#create-an-oci-configuration-file)
- [Terraform モジュールを設定する](#configure-the-terraform-module)
- [Terraform でデプロイする](#deploy-with-terraform)
- [メトリクスが送信されていることを確認する](#validation)
- [メトリクスまたはログの収集を設定する (オプション)](#configuration)
- [リソース収集を設定する (オプション)](#resource-collection)

##### OCI 設定ファイルを作成する {#create-an-oci-configuration-file}

`~/.oci/config` ファイルが、Terraform に OCI 内でリソースを作成するための権限を付与します。[API キーを作成](https://cloud.oracle.com/identity/domains/my-profile/auth-tokens)して、それを設定に追加するか、[Oracle のドキュメント](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/sdkconfig.htm)に従ってください。ファイルは次のようになります。

```ini
[DEFAULT]
user=<USER_OCID>
fingerprint=<USER_FINGERPRINT>
tenancy=<TENANCY_OCID>
region=<HOME_REGION>
key_file=<PATH_TO_PRIVATE_KEY_FILE>
```

##### Terraform モジュールを設定する {#configure-the-terraform-module}

以下の入力項目は、Datadog OCI インテグレーションモジュールを設定します。必須フィールドは注記されています。利用可能な設定オプションの一覧については、[テナンシーの追加のページ](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure/add)を参照してください。

###### 1. Datadog API キーを追加します。{#1-add-a-datadog-api-key}

[**Select API Key**] をクリックし、使用する API キーを選択します。

###### 2. Datadog アプリケーションキーを作成します。{#2-create-a-datadog-application-key}

[**Create**] をクリックすると、アプリケーションキーが生成され、フィールドに追加されます。この画面を離れると再度アクセスできなくなるため、必ずこの値をコピーして安全な場所に保存してください。

###### 3. OCI テナンシー OCID を追加します。{#3-add-your-oci-tenancy-ocid}

1. Datadog で監視するテナンシーの OCID を入力します。これは [cloud.oracle.com/tenancy](https://cloud.oracle.com/tenancy) で確認できます。
1. オプションで、特定の OCI コンパートメントとサブネットを選択します。Datadog では、テナンシーの各リージョンに OCI コンパートメントと OCI Virtual Cloud Network (VCN) を新規作成するために、このセクションを空白のままにすることを推奨しています。

###### 4. 自分の OCI ユーザー OCID を追加します。{#4-add-your-oci-user-ocid}

ユーザー OCID を入力します。このユーザーには、Identity Domain Administrator ロールが必要です。これは、[cloud.oracle.com/identity/domains/my-profile](https://cloud.oracle.com/identity/domains/my-profile) で確認できます。

###### 5. ログ収集を設定します (オプション)。{#5-configure-log-collection-optional}

テナンシーからのすべてのログ収集を無効にするには、トグルをクリックしてください。特定の OCI サービスのログ収集を無効にする場合は、セットアップ後に [Datadog OCI インテグレーションタイル](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure) で設定を編集します。

###### 6. イベント収集を設定します (オプション)。{#6-configure-event-collection-optional}

テナンシーからのすべてのイベント収集を無効にするには、トグルをクリックしてください。セットアップ後にイベント収集を無効にする場合は、[Datadog OCI インテグレーションタイル](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure) で設定を編集します。

###### 7. 生成された Terraform モジュールの設定の詳細を確認します。{#7-confirm-the-configuration-details-of-the-generated-terraform-module}

生成された Terraform モジュールは、以下の形式に従う必要があります。

```hcl
module "datadog_oci" {
  source = "github.com/DataDog/oracle-cloud-integration//datadog-terraform-onboarding"

  datadog_api_key = <API_KEY>
  datadog_app_key = <APP_KEY>
  datadog_site    = <DATADOG_SITE>

  tenancy_ocid      = "<TENANCY_OCID>"
  current_user_ocid = "<CURRENT_USER_OCID>"

  logs_enabled              = true
  events_collection_enabled = true
}
```

#### Terraform でデプロイする {#deploy-with-terraform}

1. 生成された Terraform モジュールをコピーし、`.tf` ファイルに貼り付けます。
1. `terraform init && terraform apply` を実行して Terraform を初期化し、インテグレーションを作成します。変更をプレビューする場合は、`plan` を `apply` に置き換えてください。

#### トラブルシューティング {#troubleshooting}

##### Timeouts {#timeouts}

設定を変更せずに Terraform コマンドを再実行します。

##### プロバイダーの競合 {#provider-conflicts}

`terraform init` コマンドでプロバイダーの競合が発生した場合は、ローカルのプロバイダーの設定をモジュールで要求されるバージョンに合わせて更新してください。

##### セットアップ直後の Datadog で警告が発生する{#warnings-in-datadog-immediately-after-setup}

警告が消えるまで最大 15 分ほどお待ちください。

{{% /collapse-content %}}

#### 検証 {#validation}

Datadog の [OCI インテグレーション概要ダッシュボード ](https://app.datadoghq.com/dash/integration/31417/oracle-cloud-infrastructure-oci-overview) または [Metrics Explorer ページ](https://app.datadoghq.com/metric/explorer)で `oci.*` メトリクスを表示します。

<div class="alert alert-warning">OCI 関数メトリクス (<code>oci.faas</code> 名前空間) および Container インスタンスメトリクス (<code>oci_computecontainerinstance</code> 名前空間) はプレビュー版です。</div>

### 設定 {#configuration}

![Datadog における OCI テナンシーの設定タブ](images/oci_configuration_tab_2026-02-25.png)

セットアップ完了後、[Datadog OCI インテグレーションタイル](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure)の左側にテナンシーの設定タブが表示されるようになります。以下のセクションで説明されているように、テナンシー全体のデータ収集設定を適用してください。

#### リージョンを追加する {#add-regions}

[**General**] タブで、[**Regions**] チェックボックスリストからデータ収集対象のリージョンを選択します。リージョンの選択は、メトリクスとログの両方について、テナンシー全体に適用されます。

**注**: QuickStart セットアップ方法を使用し、その後新しい OCI リージョンをサブスクライブした場合は、ORM で初期セットアップスタックを再適用してください。新しいリージョンは、Datadog OCI タイルで使用できるようになります。

#### メトリクスとログを収集する {#metric-and-log-collection}

[**Metric collection**] タブと [**Log collection**] タブを使用して、どのメトリクスとログを Datadog に送信するかを設定します。

##### テナンシーからのすべてのメトリクスまたはログの収集を有効/無効にする {#enable-or-disable-all-metric-or-log-collection-from-a-tenancy}

[Metric collection] タブと [Log collection] タブには、テナンシー全体でそのデータタイプの収集を無効にするために使用できるメイントグルがあります。テナンシーで特定のデータタイプを収集する場合、以下のセクションを使用して、[サービス ](#limit-metric-or-log-collection-to-specific-oci-services)、[コンパートメント ](#limit-metric-or-log-collection-by-compartment)、および[特定のリソース ](#limit-metric-or-log-collection-to-specific-resources)ごとに詳細なフィルタリングを実装できます。

**注**: フィルターは順番に評価されます。[**Selected Service**] はサービスからのデータ収集の主要なトグルとして機能し、次にコンパートメントタグフィルターが適用され、最後にリソースタグフィルターが適用されます。

##### 特定の OCI サービスにメトリクスまたはログ収集を制限する{#limit-metric-or-log-collection-to-specific-oci-services}

[**Selected Service**] セクションを使用して、個々の OCI サービスからの収集を有効または無効にします。サービスを無効にすると、そのサービスに対して設定されているリソースタグフィルターに関係なく、そのサービスからのすべての収集が停止します。サービスが有効になっている場合、リソースタグフィルターを使用して、そのサービス内の特定のリソースに収集をさらに絞り込むことができます。一致する包含タグがないリソースは除外されます。

**注**: OCI でタグを変更した後、変更が Datadog に反映されるまで最大 15 分かかる場合があります。サービスのトグルの変更が有効になるまで、最大 5 分かかる場合があります。

{{% collapse-content title="タグフィルター構文" level="h6" id="tag-filter-syntax" %}}

[**Compartment Tags**] セクションと [**Limit Collection to Specific Resources**] セクションはいずれも、カンマで区切られた`key:value` OCI タグを受け付けます。タグの先頭に `!` を付けると、そのタグが否定されます。カンマ区切り文字の動作は、使用するタグの種類によって異なります。

- **正のタグのみ**: OR ロジック。OCI オブジェクト (コンパートメントまたは特定のリソース) がリストされたタグの**いずれか**を持っている場合に含められます。
- **負のタグのみ** (先頭に `!` を付加): OR ロジック。否定されたタグの**いずれか**が存在する場合に除外されます。
- **正のタグと負のタグの混合**: AND ロジック。リストされた**すべて**の条件を満たす場合に含められます。

例:

- `datadog:monitored,env:prod*`: **いずれか**のタグが存在する場合に含めます。
- `!env:staging,!testing:true`: **いずれか**のタグが存在する場合に除外します。
- `datadog:monitored,!region:us-phoenix-1`: `datadog:monitored`タグが存在し、**かつ**`region:us-phoenix-1` タグが存在しない場合にのみ含めます。

**タグキーの形式**: Datadog は、照合前に OCI タグキーを小文字の `snake_case` に正規化します。OCI で camelCase や PascalCase (例: `deploymentType` や `DeploymentType`) を使用して設定されたキーは、小文字の snake_case (`deployment_type`) に変換されて保存および照合されます。インテグレーションタイルでタグフィルターを指定する場合は、小文字の `snake_case` を使用してください。

{{% /collapse-content %}}

##### コンパートメント別にメトリクス/ログの収集を制限する{#limit-metric-or-log-collection-by-compartment}

[**Compartment Tags**] セクションを使用して、OCI コンパートメントタグに基づき特定のコンパートメントを含める/除外します。[タグフィルターの構文](#tag-filter-syntax)で構文を参照してください。

**注**: OCI では、タグは子コンパートメントに継承されません。各コンパートメントに個別にタグを付ける必要があります。

##### 特定のリソースにメトリクスまたはログの収集を制限する{#limit-metric-or-log-collection-to-specific-resources}

[**Limit Collection to Specific Resources**] セクションを使用して、Datadog にメトリクスやログを送信するリソースを定義します。ドロップダウンから OCI サービスを選択し、データ収集の対象とするリソースタグを指定します。[タグフィルターの構文](#tag-filter-syntax)で構文を参照してください。

{{% collapse-content title="メトリクス名前空間の一覧を参照してください" level="h4" id="oci-metric-namespaces" %}}

| インテグレーション                         | メトリクス名前空間                                                                                                                         |
|-------------------------------------| ---------------------------------------------------------------------------------------------------------------------------------------- |
| [API Gateway](https://docs.datadoghq.com/ja/integrations/oci_api_gateway/)                  | [oci_apigateway](https://docs.oracle.com/iaas/Content/APIGateway/Reference/apigatewaymetrics.htm)                                                                                                                    |
| [Autonomous Database](https://docs.datadoghq.com/ja/integrations/oci_autonomous_database/)           | [oci_autonomous_database](https://docs.oracle.com/iaas/autonomous-database-serverless/doc/autonomous-monitor-metrics-list.html)                                                                                                            |
| [Block Storage](https://docs.datadoghq.com/ja/integrations/oci_block_storage/)                       | [oci_blockstore](https://docs.oracle.com/iaas/Content/Block/References/volumemetrics.htm)                                                                                                                     |
| [Cloud Events](https://docs.datadoghq.com/ja/integrations/oci_cloudevents/)                       | [oci_cloudevents](https://docs.oracle.com/en-us/iaas/Content/Events/Reference/eventsmetrics.htm)                                                                                                                   |
| [Compute](https://docs.datadoghq.com/ja/integrations/oci_compute/)                       | [oci_computeagent](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#Availabl), [rdma_infrastructure_health](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_compute_rdma_network), [gpu_infrastructure_health](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_high_performance_compute), [oci_compute_infrastructure_health](https://docs.oracle.com/iaas/Content/Compute/References/infrastructurehealthmetrics.htm)       |
| [Container Instances (プレビュー)](https://docs.datadoghq.com/ja/integrations/oci_container_instances/) | [oci_computecontainerinstance](https://docs.oracle.com/iaas/Content/container-instances/container-instance-metrics.htm)                                                                                                       |
| [Database](https://docs.datadoghq.com/ja/integrations/oci_database/)                      | [oci_database](https://docs.oracle.com/iaas/base-database/doc/available-metrics-base-database-service-resources.html#DBSCB-GUID-57B7B9B1-288B-4DCB-82AE-D53B2BD9C78F), [oci_database_cluster](https://docs.oracle.com/iaas/base-database/doc/available-metrics-base-database-service-resources.html#DBSCB-GUID-A42CF0E3-EE65-4A66-B8A3-C89B62AFE489)                                                                                           |
| [Dynamic Routing Gateway](https://docs.datadoghq.com/ja/integrations/oci-dynamic-routing-gateway/)             | [oci_dynamic_routing_gateway](https://docs.oracle.com/iaas/Content/Network/Reference/drgmetrics.htm)                                                                                                        |
| [E-Business Suite (EBS)](https://docs.datadoghq.com/ja/integrations/oci_ebs/)             | [oracle_appmgmt](https://docs.oracle.com/en-us/iaas/stack-monitoring/doc/metric-reference.html)                                                                                                        |
| [FastConnect](https://docs.datadoghq.com/ja/integrations/oci_fastconnect/)                         | [oci_fastconnect](https://docs.oracle.com/iaas/Content/Network/Reference/fastconnectmetrics.htm)                                                                                                                    |
| [File Storage](https://docs.datadoghq.com/ja/integrations/oci_file_storage/)                        | [oci_filestorage](https://docs.oracle.com/iaas/Content/File/Reference/filemetrics.htm)                                                                                                                    |
| [Functions (プレビュー)](https://docs.datadoghq.com/ja/integrations/oci_functions/)           | [oci_faas](https://docs.oracle.com/iaas/Content/Functions/Reference/functionsmetrics.htm)                                                                                                                           |
| [GoldenGate](https://docs.datadoghq.com/ja/integrations/oci-goldengate/)           | [oci_goldengate](https://docs.oracle.com/en/cloud/paas/goldengate-service/ofroo/)                                                                                                                           |
| [GPU](https://docs.datadoghq.com/ja/integrations/oci_gpu/)           | [gpu_infrastructure_health](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_high_performance_compute)                                                                                                                           |
| [HeatWave MySQL](https://docs.datadoghq.com/ja/integrations/oci_mysql_database/)                | [oci_mysql_database](https://docs.oracle.com/iaas/mysql-database/doc/metrics.html)                                                                                                                 |
| [Instance Pools](https://docs.datadoghq.com/ja/integrations/oci-instancepools/)                | [oci_instancepools](https://docs.oracle.com/en-us/iaas/Content/Compute/References/instancepoolmetrics.htm)                                                                                                                 |
| [Internet Gateway](https://docs.datadoghq.com/ja/integrations/oci-internet-gateway/)                | [oci_internet_gateway](https://docs.oracle.com/en-us/iaas/Content/Network/Reference/IGWmetrics.htm)                                                                                                                 |
| [Kafka](https://docs.datadoghq.com/ja/integrations/oci-kafka/)                          | [oci_kafka](https://docs.oracle.com/en-us/iaas/Content/kafka/metrics.htm)                                                                                                                          |
| [Kubernetes Engine](https://docs.datadoghq.com/ja/integrations/oke/)                   | [oci_oke](https://docs.oracle.com/iaas/Content/ContEng/Reference/contengmetrics.htm)                                                                                                                            |
| [Load Balancer](https://docs.datadoghq.com/ja/integrations/oci_load_balancer/)                 | [oci_lbaas](https://docs.oracle.com/iaas/Content/Balance/Reference/loadbalancermetrics.htm), [oci_nlb](https://docs.oracle.com/iaas/Content/NetworkLoadBalancer/Metrics/metrics.htm)                                                                                                           |
| [Media Streams](https://docs.datadoghq.com/ja/integrations/oci_media_streams/)                   | [oci_mediastreams](https://docs.oracle.com/iaas/Content/dms-mediastream/mediastreams_metrics.htm?)                                                                                                                    |
| [NAT Gateway](https://docs.datadoghq.com/ja/integrations/oci_nat_gateway/)                   | [oci_nat_gateway](https://docs.oracle.com/iaas/Content/Network/Reference/nat-gateway-metrics.htm)                                                                                                                    |
| [Network Firewall](https://docs.datadoghq.com/ja/integrations/oci_network_firewall/)                   | [oci_network_firewall](https://docs.oracle.com/iaas/Content/network-firewall/metrics.htm)                                                                                                                    |
| [NoSQL Table](https://docs.datadoghq.com/ja/integrations/oci-nosqltable/)                        | [oci_nosql](https://docs.oracle.com/en/cloud/paas/nosql-cloud/mgygg)                                                                                                                         |
| [Object Storage](https://docs.datadoghq.com/ja/integrations/oci_object_storage/)                      | [oci_objectstorage](https://docs.oracle.com/iaas/Content/Object/Reference/objectstoragemetrics.htm)                                                                                                                  |
| [Oracle Fusion](https://docs.datadoghq.com/ja/integrations/oracle-fusion/)                      | [oci_fusion](https://docs.oracle.com/en-us/iaas/Content/fusion-applications/metrics.htm)                                                                                                                        |
| [Oracle Integration (OIC)](https://docs.datadoghq.com/ja/integrations/oci-integration/)                | [oci_integration](https://docs.oracle.com/en-us/iaas/application-integration/doc/modify-charts-and-create-custom-charts.html)                                                                                                                 |
| [PostgreSQL](https://docs.datadoghq.com/ja/integrations/oci_postgresql/)                   | [oci_postgresql](https://docs.oracle.com/iaas/Content/postgresql/metrics.htm)                                                                                                                    |
| [Queue](https://docs.datadoghq.com/ja/integrations/oci_queue/)                               | [oci_queue](https://docs.oracle.com/iaas/Content/queue/metrics.htm)                                                                                                                          |
| [Recovery Service](https://docs.datadoghq.com/ja/integrations/oci-recovery-service/)                   | [oci_recovery_service](https://docs.oracle.com/iaas/recovery-service/doc/available-recovery-service-metrics.html)                                                                                                              |
| [Secrets](https://docs.datadoghq.com/ja/integrations/oci-secrets/)                            | [oci_secrets](https://docs.oracle.com/iaas/Content/KeyManagement/Reference/keymgmtmetrics.htm)                                                                                                                       |
| [Service Connector Hub](https://docs.datadoghq.com/ja/integrations/oci_service_connector_hub/)               | [oci_service_connector_hub](https://docs.oracle.com/iaas/Content/connector-hub/metrics-reference.htm)                                                                                                          |
| [Service Gateway](https://docs.datadoghq.com/ja/integrations/oci_service_gateway/)                     | [oci_service_gateway](https://docs.oracle.com/iaas/Content/Network/Reference/SGWmetrics.htm)                                                                                                                |
| [Stack Monitoring](https://docs.datadoghq.com/ja/integrations/oci-stack-monitoring/)                  | [oci_stack_monitoring](https://docs.oracle.com/en-us/iaas/stack-monitoring/doc/metric-reference.html)                                                                                                                 |
| [VCN](https://docs.datadoghq.com/ja/integrations/oci_vcn/)                           | [oci_vcn](https://docs.oracle.com/iaas/Content/Network/Reference/vnicmetrics.htm)                                                                                                                            |
| [Visual Builder](https://docs.datadoghq.com/ja/integrations/oci_visual_builder/)               | [oci_visual_builder](https://docs.oracle.com/en-us/iaas/visual-builder/doc/view-instance-metrics.html)                                                                                                                |
| [VPN](https://docs.datadoghq.com/ja/integrations/oci_vpn/)                           | [oci_vpn](https://docs.oracle.com/iaas/Content/Network/Reference/ipsecmetrics.htm)                                                                                                                            |
| [Web Application Firewall](https://docs.datadoghq.com/ja/integrations/oci_waf/)            | [oci_waf](https://docs.oracle.com/iaas/Content/WAF/Reference/metricsalarms.htm)

{{% /collapse-content %}}

### Resource Catalog {#resource-collection}

[Datadog OCI インテグレーションタイル](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure)の [**Resource Collection**] タブで、[**Enable Resource Collection**] トグルをクリックします。[Datadog Resource Catalog](https://docs.datadoghq.com/ja/infrastructure/resource_catalog/)でリソースを確認できます。

イベント収集は、インテグレーションをセットアップするとデフォルトで有効になります。Datadog のイベント収集機能が利用可能になる前に OCI インテグレーションをセットアップした場合は、[**Resource Collection**] タブの [**Enable Resource Changes Collection**] トグルをクリックしてください。このトグルは、リソース変更イベントだけでなく、すべての OCI イベントの収集をコントロールします。OCI イベントは [Events Explorer](/event/explorer?query=source%3Aoci_events_service) に表示され、`source:oci_events_service`でフィルタリングできます。

## インテグレーションを更新する {#update-the-integration}

Datadog がバグ修正、セキュリティパッチ、または新しい OCI リソースや IAM ポリシーを必須とする新機能をリリースした場合は、インテグレーションのデプロイメントを再適用して、更新されたインフラストラクチャーをプロビジョニングしてください。

**注**: ORM スタックまたは Terraform 設定内の `logs_enabled` 変数と `events_collection_enabled` 変数は、初期セットアップ時にのみ使用されます。その後の適用では、これらの値は無視されます。Datadog インテグレーションタイルは、データ収集構成の正確な参照元となります。スタックを再適用しても、Datadog で構成したログ、メトリクス、またはイベント収集設定は上書きされません。

{{% collapse-content title="QuickStart (ORM スタック)" level="h3" %}}

**前提条件**: アップデートを適用する前に、OCI スタックで設定した [Datadog アプリケーションキー](https://app.datadoghq.com/organization-settings/application-keys) がまだ有効であることを確認してください。キーの有効期限が切れているか、取り消されている場合、destroy ジョブは失敗します。キーを更新するには、OCI コンソールでスタック変数 `datadog_app_key` を編集し、有効なアプリケーションキーを指定してから続行します。

スタックを最新バージョンに更新して変更を適用するには、[OCI Cloud Shell](https://cloud.oracle.com/resourcemanager/stacks?cloudshell=true) から次のコマンドを実行します。

```shell
curl -fL -o datadog-integration.zip \
  "https://github.com/DataDog/oracle-cloud-integration/releases/latest/download/datadog-integration.zip"

export STACK_ID="<YOUR_STACK_OCID>"
export OCI_CLI_REGION="<YOUR_HOME_OR_STACK_REGION>"

oci resource-manager stack update \
  --stack-id "$STACK_ID" \
  --config-source datadog-integration.zip \
  --region "$OCI_CLI_REGION" \
  --force

oci resource-manager job create-apply-job \
  --stack-id "$STACK_ID" \
  --execution-plan-strategy AUTO_APPROVED \
  --region "$OCI_CLI_REGION" \
  --wait-for-state SUCCEEDED
```

以下のようにプレースホルダーの値を置き換えます。

- `<YOUR_STACK_OCID>`: Datadog ORM スタックの OCID。[cloud.oracle.com/resourcemanager/stacks](https://cloud.oracle.com/resourcemanager/stacks) で確認してください。
- `<YOUR_HOME_OR_STACK_REGION>`: テナンシーの Home Region (例: us-ashburn-1)。

{{% /collapse-content %}}

{{% collapse-content title="Terraform" level="h3" %}}

**前提条件**: Terraform を再適用する前に、Terraform 構成内の `datadog_app_key` 変数に有効な [Datadog アプリケーションキー](https://app.datadoghq.com/organization-settings/application-keys) が保持されていることを確認してください。キーの有効期限が切れているか、取り消されている場合、destroy コマンドは失敗します。`.tf` ファイル内の値を更新するか、`terraform.tfvars` ファイルを通じて値を指定してから続行します。

Terraform を再実行して更新されたモジュールを初期化し、最新の変更を適用します。

```shell
terraform init -upgrade && terraform apply
```

必要に応じて、`apply` の前に `terraform plan` を実行して変更をプレビューします。

{{% /collapse-content %}}

## インテグレーションのアンインストール{#uninstalling-the-integration}

Datadog OCI インテグレーションをアンインストールするには、Datadog と OCI の両方でインテグレーションリソースを削除します。

### Datadog {#in-datadog}

[Datadog OCI インテグレーションタイル](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure)で、[**Delete Configuration**] をクリックします。この時点で、メトリクスとログは収集されなくなります。

![Datadog で OCI インテグレーション構成を削除する](images/oci_delete_configuration_2025-11-17.png)

### OCI{#in-oci}

**前提条件**: OCI リソースをクリーンアップする前に、上記の [Datadog](#in-datadog) 手順を完了してください。Datadog 構成を最初に削除することで、Datadog バックエンドで管理されているリソースが確実に事前に破棄されます。

{{% collapse-content title="QuickStart (ORM スタック)" level="h3" %}}

**前提条件**: destroy ジョブを実行する前に、OCI スタックで構成された Datadog アプリケーションキーがまだ有効であることを確認してください。キーの有効期限が切れているか、取り消されている場合、destroy ジョブは失敗します。キーを更新するには、OCI コンソールでスタック変数を編集し、有効なアプリケーションキーを指定してから続行します。

1. OCI コンソールの Oracle Resource Manager (ORM) に移動します。

1. インストール中に作成された Datadog QuickStart スタックを見つけます。デフォルトでは、スタックには `datadog-integration.zip-<NUMBER>` というラベルが付けられていますが、デプロイ時にカスタム名でスタックが構成されている可能性があります。

1.  スタックで `Destroy` ジョブを実行し、すべてのリージョンにわたってインテグレーションによって作成されたすべてのリソースを削除します。

   ![OCI の Datadog 統合スタックを破棄する](images/oci_destroy_stack.png)

1. **必要に応じて**、破棄が完了した後に Datadog OCI スタックを削除します。

**注**: QuickStart スタックで destroy ジョブを 1 回実行すると、インテグレーションがデプロイされたすべてのリージョンのすべてのリソースが自動的にクリーンアップされます。

{{% /collapse-content %}}

{{% collapse-content title="Terraform" level="h3" %}}

**前提条件**: destroy コマンドを実行する前に、`datadog_app_key`Terraform の設定でその変数に有効な [Datadog アプリケーションキー](https://app.datadoghq.com/organization-settings/application-keys)が保持されていることを確認します。キーの有効期限が切れているか、取り消されている場合、destroy コマンドは失敗します。`.tf`ファイルの値を更新するか、`terraform.tfvars`ファイルを通じて値を指定してから続行します。

`~/.oci/config` 内の `DEFAULT` プロファイルに、対応するテナンシーのリソースを管理するためのユーザー資格情報が含まれていることを確認した上で、以下を実行します。

```shell
terraform destroy
```

{{% /collapse-content %}}

## OCI インテグレーションの手動から QuickStart への移行{#oci-integration-manual-to-quickstart-migration}

### なぜ移行が必要なのですか？{#why-do-i-need-to-migrate}

Datadog OCI インテグレーションでは、1 つのテナンシーにつき 1 つのインテグレーションに制限されています。2025 年 6 月より前にインテグレーションをセットアップした場合、手動セットアップの手順に従ったことになります。そのため、OCI QuickStart セットアップ方法を使用する前に、以前の Datadog OCI インテグレーションデプロイメントスタックをすべて削除する必要があります。ログ転送を手動で構成しており、OCI QuickStart タイルでログ収集を有効にすることを選択した場合は、ログの二重送信を防ぐため、ログ転送リソースも削除する必要があります。

**注**: 手動インテグレーションが削除されてから QuickStart デプロイが完了するまでの間、メトリクスとログの収集にギャップが生じます。

### 移行方法{#how-to-migrate}

Datadog と OCI の両方で、以前のインテグレーションリソースを削除します。

#### Datadog{#in-datadog-1}

[Datadog OCI インテグレーションタイル](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure)で、[**Delete Configuration**] をクリックします。この時点で、メトリクスとログは収集されなくなります。

![Datadog で OCI インテグレーション構成を削除する](images/oci_delete_configuration_2025-11-17.png)

#### OCI{#in-oci-1}

**前提条件**: destroy ジョブを実行する前に、OCI スタックで構成された Datadog アプリケーションキーがまだ有効であることを確認してください。キーの有効期限が切れているか、取り消されている場合、destroy ジョブは失敗します。キーを更新するには、OCI コンソールでスタック変数を編集し、有効なアプリケーションキーを指定してから続行します。

手動インテグレーションが以前にデプロイされていた**各リージョン**について、以下の手順を完了します。

1. Datadog OCI メトリクス転送スタックで `Destroy` ジョブを実行し、そのスタックによって作成されたすべてのリソースを削除します。デフォルトでは、スタックには `datadog-oci-orm-metrics-setup.zip-<NUMBER>` というラベルが付けられていますが、デプロイ時にカスタム値でスタックが構成されている可能性があります。

1. Datadog OCI ポリシースタックで `Destroy` ジョブを実行します。デフォルトでは、スタックには `datadog-oci-orm-policy-setup.zip-<NUMBER>` というラベルが付けられていますが、デプロイ時にカスタム値でスタックが構成されている可能性があります。

   ![OCI の Datadog 統合スタックを破棄する](images/oci_destroy_stack.png)

1. **必要に応じて**、破棄が完了した後に Datadog OCI スタックを削除します。

1. ログ収集を設定した場合は、Datadog OCI アプリケーション、関数、および Service Connector Hub を削除します。

   ![OCI で logconnector を削除する](images/oci_delete_logconnector.png)

これで、[QuickStart セットアップ手順](#quickstart-setup-instructions)に従って OCI QuickStart をデプロイし、データ収集を再開する準備が整いました。OCI QuickStart のデプロイが完了するまで、最大 30 分かかる場合があります。

## アーキテクチャ {#architecture}

### メトリクスおよびログ転送リソース{#metric-and-log-forwarding-resources}

![このセットアップオプションで言及されている OCI メトリクスおよびログ転送リソースの図。データのフローが表示されています](images/oci_quickstart_infrastructure_diagram.png)

このセットアップオプションでは、監視対象の各リージョンについて、メトリクスとログを Datadog に転送するために、そのリージョン内に以下のインフラストラクチャーを作成します。

- 関数アプリケーション (`dd-function-app`)
- 2 つの関数:
  - メトリクスフォワーダー (`dd-metrics-forwarder`)
  - ログフォワーダー (`dd-logs-forwarder`)
- セキュアなネットワークインフラストラクチャーを備えた VCN (`dd-vcn`):
  - プライベートサブネット (`dd-vcn-private-subnet`)
  - インターネットへの外部アクセス用 NAT Gateway (`dd-vcn-natgateway`)
  - OCI サービスへの内部アクセス用 Service Gateway (`dd-vcn-servicegateway`)
- Datadog API キー保存用 Key Management Service (KMS) Vault (`datadog-vault`)
- 専用の **Datadog** コンパートメント (`Datadog`)

すべてのリソースには `ownedby = "datadog"` がタグ付けされます。

### IAM リソース {#iam-resources}

![このセットアップオプションで言及されている OCI IAM リソースの図。データのフローが表示されています](images/oci_quickstart_iam_diagram.png)

このセットアップオプションでは、Datadog へのデータ転送を有効にするために、以下の IAM リソースを作成します。

- サービスユーザー (`dd-svc`)。
- サービスユーザーが所属するグループ (`dd-svc-admin`)。
- API 認証用の RSA キーペア。
- サービスユーザー用の OCI API キー。
- Datadog コンパートメント内のすべてのサービスコネクタを含む動的グループ (`dd-dynamic-group-connectorhubs`)。
- Datadog コンパートメント内のすべての関数を含む動的グループ (`dd-dynamic-group-function`)。
- データの収集と転送に必要な、テナンシーリソースへの読み取りアクセス権と Datadog コンパートメント内の OCI インフラストラクチャーへの管理アクセス権をサービスユーザーに付与するポリシー (`dd-svc-policy`)。

{{% collapse-content title="ポリシーを参照" level="h6" %}}

```text
- Allow dd-svc-admin to read all-resources in tenancy
- Allow dd-svc-admin to use tag-namespaces in tenancy
- Allow dd-svc-admin to manage serviceconnectors in Datadog compartment
- Allow dd-svc-admin to manage functions-family in Datadog compartment
- Allow dd-svc-admin to use fn-invocation in Datadog compartment
- Allow dd-svc-admin to manage buckets in Datadog compartment where target.bucket.name=/dd-*/
- Allow dd-svc-admin to manage object-family in Datadog compartment where target.bucket.name=/dd-*/
- Endorse dd-svc-admin to read objects in tenancy usage-report
- Allow dd-svc-admin to manage cloudevents-rules in tenancy where any {request.permission = 'EVENTRULE_CREATE', target.resource.tag.DatadogManaged.marker = 'true'}
- Allow dd-svc-admin to manage streams in Datadog compartment where any {request.permission = 'STREAM_CREATE', target.resource.tag.DatadogManaged.marker = 'true'}
- Allow service objectstorage-<REGION> to manage object-family in Datadog compartment where target.bucket.name=/dd-*/
```

**注**: `Allow service objectstorage-<REGION>` ステートメントは、サブスクライブされたリージョンごとに 1 回追加する必要があります (例: `objectstorage-us-ashburn-1`, `objectstorage-ap-batam-1`)。これにより、Datadog はオブジェクトライフサイクルポリシーを通じて、Datadog が管理するバケット内の古いデータを自動的にクリーンアップできるようになります。

{{% /collapse-content %}}

- サービスコネクタと関数がデータを読み取って転送できるようにし、Datadog コンパートメント内のシークレット、バケット、ストリームへのアクセスを許可するポリシー `dd-dynamic-group-policy`。

{{% collapse-content title="ポリシーを参照" level="h6" %}}

```text
   - Allow dd-dynamic-group-connectorhubs to read log-content in tenancy
   - Allow dd-dynamic-group-connectorhubs to read metrics in tenancy
   - Allow dd-dynamic-group-connectorhubs to use fn-function in Datadog compartment
   - Allow dd-dynamic-group-connectorhubs to use fn-invocation in Datadog compartment
   - Allow dd-dynamic-group-functions to read secret-bundles in Datadog compartment
   - Allow dd-dynamic-group-functions to manage object-family in Datadog compartment where target.bucket.name=/dd-*/
   - Allow dd-dynamic-group-connectorhubs to use stream-pull in Datadog compartment where target.resource.tag.DatadogManaged.marker = 'true'
   - Allow any-user to use stream-push in Datadog compartment where all {request.principal.type = 'eventrule', target.resource.tag.DatadogManaged.marker = 'true'}
```

{{% /collapse-content %}}

<div class="alert alert-warning"><strong>インテグレーションリソースの名前を変更しないでください。</strong>Datadog は、関数イメージの更新などの重要なメンテナンス操作のために生成するリソースを識別する際に、OCID ではなくリソース名を使用します。上記のリソースの名前 (例: <code>dd-function-app</code>) を変更すると、インテグレーションが正常に動作しなくなる可能性があります。組織でカスタム命名規則が必要な場合は、<a href="https://www.datadoghq.com/support/">Datadog サポート</a>までお問い合わせください。</div>

## 収集されたデータ {#data-collected}

<!-- ### Metrics -->

<!-- See [metadata.csv][12] for a list of metrics provided by this integration. -->

### メトリクス {#metrics}

メトリクスの詳細なリストについては、[メトリクス名前空間のセクション ](#oci-metric-namespaces) で該当する OCI サービスを選択してください。

### サービスのチェック {#service-checks}

OCI インテグレーションには、サービスのチェック機能は含まれません。

### イベント {#events}

OCI Events Service からのすべてのイベントは、Datadog Events Explorer に転送されます。イベントを確認するには、`source:oci_events_service` でフィルタリングしてください。

## トラブルシューティング {#troubleshooting-1}

OCI インテグレーションに関する問題を解決するには、[OCI インテグレーションのトラブルシューティングガイド](https://docs.datadoghq.com/ja/integrations/guide/oci-integration-troubleshooting)を参照してください。