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
    metrics:
      check:
      - oci.computeagent.cpu_utilization
      metadata_path: metadata.csv
      prefix: oci.
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
  support: README.md#Support
  title: Oracle Cloud Infrastructure
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Oracle Cloud Infrastructure (OCI) は、エンタープライズ規模の企業で使用されるInfrastructure-as-a-Service (IaaS) および Platform-as-a-Service (PaaS) です。ホスティング、ストレージ、ネットワーキング、データベースなどのマネージドサービスの完全なスイートを備えています。

Datadog の OCI インテグレーションを使用して、ログとメトリクスを Datadog に転送し、ダッシュボードの作成、トラブルシューティングの支援、セキュリティおよびコンプライアンス状況の監視に活用できます。

## セットアップ

### メトリクスの収集

OCI メトリクスを Datadog に転送するには
   - Oracle Resource Manager スタックを使用して、テナンシーのホームリージョンで [Datadog 認証ユーザー、グループ、および必要なポリシーを作成](#create-a-policy-stack)します。このスタックは、
       * Datadog 認証ユーザーが OCI リソースからデータを読み取ることを可能にします。
       * メトリクスの転送を可能にします。
   - Datadog インテグレーションタイルで[テナンシー情報を入力](#enter-tenancy-info)します。
   - Oracle Resource Manager スタックを使用して、メトリクスを転送したいすべてのテナンシーリージョンで[必要な OCI インフラストラクチャーを作成](#create-a-metric-forwarding-stack)します。

### OCI スタックとテナンシー情報を作成する

**注**: これらの手順を完了するには、OCI ユーザーアカウントに **Cloud Administrator** ロールが必要です。

このインテグレーションは、OCI の[コネクタハブ][1]、[関数アプリ][2]、およびセキュアなネットワークインフラストラクチャーを使用して、OCI メトリクスを Datadog に転送します。

{{< img src="/integrations/oracle_cloud_infrastructure/OCI_metrics_integration_diagram.png" alt="このページで言及されている OCI リソースとデータフローを示す図" >}}

最も簡単なセットアップのために、Datadog は以下の ORM スタックを使用して、必要なすべての OCI リソースを作成することを推奨します。あるいは、既存の OCI ネットワークインフラストラクチャーや、[メトリクス転送スタックを作成する](#create-a-metric-forwarding-stack)で概要を説明する要件を満たす関数アプリを使用することもできます。

**注**: リソースマネージャースタックの Terraform 状態ファイルへのアクセス権を管理する必要があります。詳細については、Securing Resource Manager ページの [Terraform 状態ファイルのセクション][3]を参照してください。

#### ポリシースタックを作成する

{{< img src="/integrations/oracle_cloud_infrastructure/OCI_auth_workflow_diagram.png" alt="インテグレーション認証に使用される OCI リソースとワークフローの図" >}}

ORM ポリシースタックは、テナンシーの**ホームリージョン**に作成する必要があります。このポリシースタックは次を作成します。
 * コネクタハブへのアクセスを有効にするための `resource.type = 'serviceconnectors'` を持つ動的グループ。
 * テナンシーリソースを読み取るために Datadog が使用する **DatadogAuthUser** というユーザー。
 * 作成されたユーザーがポリシーアクセスのために追加されるグループ。
 * ルートコンパートメントにおける、コネクタハブがメトリクスを読み取り、関数を呼び出すことを許可するポリシー。さらに、作成されたユーザーグループにテナンシーリソースの読み取りアクセスを付与します。ポリシーに以下のステートメントが追加されます。

```text
Allow dynamic-group <GROUP_NAME> to read metrics in tenancy
Allow dynamic-group <GROUP_NAME> to use fn-function in tenancy
Allow dynamic-group <GROUP_NAME> to use fn-invocation in tenancy
Allow group <DOMAIN>/<USER_GROUP_NAME> to read all-resources in tenancy
```

スタックを作成するには、ユーザーアカウントが[動的グループとポリシーを作成][4]できる必要があります。

1. Datadog OCI インテグレーションタイルで **Create a stack** ボタンをクリックします。
2. Oracle 利用規約に同意します。
3. **Working directory** のドロップダウンで、`datadog-oci-orm/policy-setup` を選択します。
4. カスタム Terraform プロバイダーを使用するオプションは**未選択**のままにします。
5. `datadog-metrics-policy-setup` のようなわかりやすい名前を提供し、それをデプロイするコンパートメントを選択します。
6. **Next** をクリックします。
7. 作成される動的グループ、ユーザーグループ、およびポリシーの名前を指定するか、提供されたデフォルトの名前を使用します。
8. スタックを実行するユーザーのドメイン名を提供します。デフォルトのドメイン名は `Default` です。
9. テナンシーの**ホームリージョン**が選択されていることを確認します。
10. **Next** をクリックします。
11. **Create** をクリックします。

**注**: 
* スタックを実行するユーザーが `Default` 以外の IAM ドメインに属している場合、認証ユーザー、動的グループ、およびユーザーグループがそのドメイン内にのみ作成されるように、そのドメイン名を指定してください。
* ユーザーとグループが **Default** ドメインに作成されていない場合、そのドメインがテナンシーのすべてのサブスクライブされたリージョンにレプリケートされていることを確認してください。詳細については、[アイデンティティドメインを複数のリージョンにレプリケートする][5]を参照してください。

#### テナンシー情報を入力

1. 監視したいテナンシーの OCID とホームリージョンを [Datadog OCI インテグレーションタイル][6]に入力します。
   - この情報は[テナンシー詳細ページ][7]で見つけることができます。
   - OCI の [Regions and Availability Domains ページ][8]から **Region Identifier** の値を使用して、ホームリージョンを入力します。

2. 前のスタックを実行した後に作成された `DatadogAuthUser` の **OCID** 値をコピーし、それを [Datadog OCI インテグレーションタイル][6]のユーザー OCID フィールドに貼り付けてください。

3. OCI コンソールに戻り、次の手順で **API キー**を生成します。
   a. 作成された `DatadogAuthUser` に戻ります。
   b. 画面の左下の **Resources** の下にある **API keys** をクリックします。
   c. **Add API key** をクリックします。
   d. **Download private key** をクリックします。
   e. **Add** をクリックします。
   f. **Configuration file preview** のポップアップが表示されますが、特に操作は必要ありません。ポップアップを閉じてください。

{{< img src="/integrations/oracle_cloud_infrastructure/add_api_key.png" alt="OCI コンソールの Add API Key ページ" >}}

4. **Fingerprint** の値をコピーし、その値を [Datadog OCI インテグレーションタイル][6]の **Fingerprint** フィールドに貼り付けてください。
5. 次の手順で**プライベートキー**の値をコピーします。
   a. ダウンロードしたプライベートキー `.pem` ファイルをテキストエディタで開くか、`cat` のようなターミナルコマンドを使用してファイルの内容を表示します。
   b. `-----BEGIN PRIVATE KEY-----` と `-----END PRIVATE KEY-----` を含む全内容をコピーします。
6. プライベートキーの値を Datadog OCI インテグレーションタイルの **Private Key** フィールドに貼り付けてください。


#### メトリクス転送スタックを作成する

このスタックで作成されたすべてのリソースは、指定されたコンパートメントにデプロイされます。このスタックを実行するユーザーが、そのコンパートメントでリソースを作成するアクセス権を持っていることを確認してください。

1. OCI コンソールの[スタックの作成][9]に移動します。
2. Oracle 利用規約に同意します。
3. **Working directory** のドロップダウンで、`datadog-oci-orm/metrics-setup` を選択します。
4. カスタム Terraform プロバイダーを使用するオプションは**未選択**のままにします。
5. スタックに名前を付け、それをデプロイするコンパートメントを選択します。
6. **Next** をクリックします。
7. **Tenancy** の値は、そのままにしておいてください。これらは現在のリージョンとテナント、および以前に選択したコンパートメントによって指定されます。
8. **Datadog API Key** フィールドにあなたの [Datadog API キー][10]を入力します。
9. **Datadog Environment Endpoint** フィールドで、あなたの [Datadog サイト][11]に対応するエンドポイントを選択します。

| Datadog サイト   | エンドポイント                               |
| -------------  | -------------------------------------- |
| US1            | ocimetrics-intake.datadoghq.com        |
| US3            | ocimetrics-intake.us3.datadoghq.com    |
| US5            | ocimetrics-intake.us5.datadoghq.com    |
| EU1            | ocimetrics-intake.datadoghq.eu         |
| AP1            | ocimetrics-intake.ap1.datadoghq.com    |

_注:_ OCI インテグレーションは US1-FED サイトではサポートされていません。

{{< tabs >}}
{{% tab "ORM を使用して VCN を作成する (推奨)" %}}
10. **Network options** セクションで、`Create VCN` がチェックされたままにします。
    a. **vcnCompartment** フィールドで、あなたのコンパートメントを選択します。
{{% /tab %}}

{{% tab "既存の VCN を使用する" %}}
既存の VCN を使用する場合、サブネットの OCID をスタックに提供する必要があります。VCN が次を満たしていることを確認してください。
   - NAT ゲートウェイを通じて HTTP の外向きコールを行うことが許可されている。
   - サービスゲートウェイを使用して OCI コンテナレジストリからイメージを取得できる。
   - NAT ゲートウェイとサービスゲートウェイを許可するルートテーブルルールを持っている。
   - HTTP リクエストを送信するセキュリティルールを持っている。

10. **Network options** セクションで、`Create VCN` オプションのチェックを外し、あなたの VCN 情報を入力します。
    a. **vcnCompartment** フィールドで、あなたのコンパートメントを選択します。
    b. **existingVcn** セクションで、あなたの既存の VCN を選択します。
    c. **Function Subnet OCID** セクションで、使用するサブネットの OCID を入力します。
{{% /tab %}}
{{< /tabs >}}

{{< tabs >}}
{{% tab "ORM を使用して関数アプリケーションを作成する (推奨)" %}}
ORM スタックは、テナンシー内のリージョンに関数コンテナリポジトリを作成し、関数で使用するために Docker イメージがそこに送信されます。

11. **Function settings** セクションで以下の手順を完了します。
    a. **Function Application shape** フィールドで、値を `GENERIC_ARM` のままにします。
    b. OCI Docker レジストリのユーザー名とパスワードを入力します。
      - **OCI Docker registry user name** フィールドに、あなたの OCI ユーザー名を入力します。
      - **OCI Docker registry password** フィールドに、あなたの OCI ユーザーの認証トークンを入力します。詳細については、[認証トークンの取得][1]を参照してください。

    _注:_ Docker レジストリのログインが正しいかどうかを確認するには、[Oracle Cloud Infrastructure Registry へのログイン][2]を参照してください。




[1]: https://docs.oracle.com/iaas/Content/Registry/Tasks/registrygettingauthtoken.htm
[2]: https://docs.oracle.com/iaas/Content/Functions/Tasks/functionslogintoocir.htm
{{% /tab %}}

{{% tab "既存の関数アプリケーションを使用する" %}}
既存の関数アプリケーションを使用する場合、イメージはすでに存在しており、完全なイメージパスを提供する必要があります。以下は完全なイメージパスの例です。

```text
<REGION_KEY>.ocir.io/<TENANCY_NAMESPACE>/datadog-functions/datadog-function-metrics:latest
```

- `<REGION_KEY>` には、OCI の[リージョンと可用性ドメインのページ][1]のテーブルから **Region Key** の値を使用します。例えば、`US-EAST` のリージョンキーは `IAD` です。
- `<TENANCY_NAMESPACE>` には、[テナンシー詳細ページ][2]の **Object storage namespace** の値を使用します。

11. **Function settings** セクションで以下の手順を完了します。
    a. **Function Application shape** フィールドで、値を `GENERIC_ARM` のままにします。
    b. **Function Image Path** フィールドに、完全なイメージパスを入力します。

[1]: https://docs.oracle.com/iaas/Content/General/Concepts/regions.htm
[2]: https://cloud.oracle.com/tenancy
{{% /tab %}}
{{< /tabs >}}

12. **Service Connector hub batch size** を `5000` に設定します。
13. **Next** をクリックします。
14. **Create** をクリックします。
15. [Datadog OCI インテグレーションタイル][6]に戻り、**Create configuration** をクリックします。

**注**: デフォルトでは、ルートコンパートメントのみが選択され、Datadog OCI インテグレーションでサポートされているすべてのメトリクスネームスペースが有効になっています (コネクタハブあたり最大 50 のネームスペースがサポートされます)。

16. 任意で、コンパートメントを追加したり、有効なメトリクスネームスペースのリストを編集するには、新しく作成した [Connector Hub][12] の **Edit** をクリックします。
    - コンパートメントを追加するには、**+ Another compartment** をクリックします。
    - **Configure source** セクションで、**Namespaces** ドロップダウンからネームスペースを追加または削除します。

#### 検証

Datadog の [OCI インテグレーション概要ダッシュボード][13]または [Metrics Explorer ページ][14]で `oci.*` メトリクスを表示します。

<div class="alert alert-danger">OCI 関数メトリクス (<code>oci.faas</code> ネームスペース) とコンテナインスタンスメトリクス (<code>oci_computecontainerinstance</code> ネームスペース) はプレビュー版です。</div>

### メトリクスネームスペース

| インテグレーション                   | メトリクスネームスペース                                                                                                                         |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [Autonomous Database][15]     | [oci_autonomous_database][16]                                                                                                            |
| ブロックストレージ                 | [oci_blockstore][17]                                                                                                                     |
| [コンピュート][18]                 | [oci_computeagent][19]、[rdma_infrastructure_health][20]、[gpu_infrastructure_health][21]、[oci_compute_infrastructure_health][22]       |
| コンテナインスタンス (プレビュー)     | [oci_computecontainerinstance][23]                                                                                                       |
| [データベース][24]                | [oci_database][25]、[oci_database_cluster][26]                                                                                           |
| ダイナミックルーティングゲートウェイ       | [oci_dynamic_routing_gateway][27]                                                                                                        |
| FastConnect                   | [oci_fastconnect][28]                                                                                                                    |
| ファイルストレージ                  | [oci_filestorage][29]                                                                                                                    |
| 関数 (プレビュー)              | [oci_faas][30]                                                                                                                           |
| HeatWave MySQL                | [oci_mysql_database][31]                                                                                                                 |
| Kubernetes エンジン             | [oci_oke][32]                                                                                                                            |
| [ロードバランサー][33]           | [oci_lbaas][34]、[oci_nlb][35]                                                                                                           |
| [NAT ゲートウェイ][36]             | [oci_nat_gateway][37]                                                                                                                    |
| オブジェクトストレージ                | [oci_objectstorage][38]                                                                                                                  |
| キュー                         | [oci_queue][39]                                                                                                                          |
| サービスコネクタハブ         | [oci_service_connector_hub][40]                                                                                                          |
| サービスゲートウェイ               | [oci_service_gateway][41]                                                                                                                |
| [VCN][42]                     | [oci_vcn][43]                                                                                                                            |
| VPN                           | [oci_vpn][44]                                                                                                                            |
| Web Application Firewall      | [oci_waf][45]                                                                                                                            |

### ログ収集

次のいずれかのプロセスに従って、Oracle Cloud Infrastructure から Datadog にログを送信します。

{{< tabs >}}
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
4. 最初にボイラープレート Python 関数を作成し、自動生成されたファイルを Datadog のソースコードに置き換えることをお勧めします。
   - `func.py` を [Datadog OCI リポジトリ][3]のコードに置き換えます。
   - `func.yaml` を [Datadog OCI リポジトリ][4]のコードに置き換えます。`DATADOG_TOKEN` と `DATADOG_HOST` は、Datadog API キーとリージョンログの取り込みリンクに置き換える必要があります。
   - `requirements.txt` を [Datadog OCI リポジトリ][5]のコードに置き換えます。

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
{{% tab "オブジェクトストア" %}}

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
7. **read** を有効に切り替えると、**Enable Log** サイドメニューが表示されます。
8. **Compartment** と **Log Group** を選択します (OCI ログと同じ選択を使用します)。
9. **Log Name** の名前を入力し、希望するログ保持を選択します。

OCI オブジェクトストレージの詳細については、[データをオブジェクトストレージに格納する][2]を参照してください。

#### OCI 関数

1. OCI ポータルで、*Solutions and Platform -> Developer Services -> Functions* に移動します。
2. 既存のアプリケーションを選択するか、**Create Application** をクリックします。
3. アプリケーション内に新しい OCI 関数を作成します。詳細については、[Oracle の関数概要][3]を参照してください。
4. 最初にボイラープレート Python 関数を作成し、自動生成されたファイルを Datadog のソースコードに置き換えることをお勧めします。
   - `func.py` を [Datadog OCI リポジトリ][4]のコードに置き換えます。
   - `func.yaml` を [Datadog OCI リポジトリ][5]のコードに置き換えます。`DATADOG_TOKEN` と `DATADOG_HOST` は、Datadog API キーとリージョンログの取り込みリンクに置き換える必要があります。
   - `requirements.txt` を [Datadog OCI リポジトリ][6]のコードに置き換えます。

#### OCI イベント

1. OCI ポータルで、*Solutions and Platform -> Application Integration -> Event Service* に移動します。
2. **Create Rule** をクリックして、**Create Rule** ページに移動します。
3. イベントルールに名前と説明を付けます。
4. 条件を *Event Type**、サービス名を **Object Storage**、イベントタイプを **Object - Create** として設定します。
5. アクションタイプを **Functions** として設定します。
6. 関数コンパートメントが、OCI ログ、OCI バケット、および OCI 関数に対して行った選択と同じであることを確認します。
7. 関数適用と関数を選択します (前のインストール手順に従って)。
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

## 収集データ

### メトリクス
{{< get-metrics-from-git "oracle-cloud-infrastructure" >}}


### サービスチェック

OCI インテグレーションには、サービスのチェック機能は含まれません。

### イベント

OCI インテグレーションには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][46]までお問い合わせください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog で Oracle Cloud Infrastructure を監視する][47]


[1]: https://docs.oracle.com/iaas/Content/connector-hub/home.htm
[2]: https://docs.oracle.com/iaas/Content/Functions/Concepts/functionsconcepts.htm#applications
[3]: https://docs.oracle.com/iaas/Content/Security/Reference/resourcemanager_security.htm#confidentiality__terraform-state
[4]: https://docs.oracle.com/en/cloud/paas/weblogic-container/user/create-dynamic-groups-and-policies.html
[5]: https://docs.oracle.com/iaas/Content/Identity/domains/to-manage-regions-for-domains.htm
[6]: https://app.datadoghq.com/integrations/oracle-cloud-infrastructure
[7]: https://cloud.oracle.com/tenancy
[8]: https://docs.oracle.com/iaas/Content/General/Concepts/regions.htm
[9]: https://cloud.oracle.com/resourcemanager/stacks/create?zipUrl=https://github.com/Datadog/oracle-cloud-integration/releases/latest/download/datadog-oci-orm.zip
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: https://docs.datadoghq.com/ja/getting_started/site/
[12]: https://cloud.oracle.com/connector-hub/service-connectors
[13]: https://app.datadoghq.com/dash/integration/31417/oracle-cloud-infrastructure-oci-overview
[14]: https://app.datadoghq.com/metric/explorer
[15]: https://app.datadoghq.com/integrations/oci-autonomous-database
[16]: https://docs.oracle.com/iaas/autonomous-database-serverless/doc/autonomous-monitor-metrics-list.html
[17]: https://docs.oracle.com/iaas/Content/Block/References/volumemetrics.htm
[18]: https://app.datadoghq.com/integrations/oci-compute
[19]: https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#Availabl
[20]: https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_compute_rdma_network
[21]: https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_high_performance_compute
[22]: https://docs.oracle.com/iaas/Content/Compute/References/infrastructurehealthmetrics.htm
[23]: https://docs.oracle.com/iaas/Content/container-instances/container-instance-metrics.htm
[24]: https://app.datadoghq.com/integrations/oci-database
[25]: https://docs.oracle.com/iaas/base-database/doc/available-metrics-base-database-service-resources.html#DBSCB-GUID-57B7B9B1-288B-4DCB-82AE-D53B2BD9C78F
[26]: https://docs.oracle.com/iaas/base-database/doc/available-metrics-base-database-service-resources.html#DBSCB-GUID-A42CF0E3-EE65-4A66-B8A3-C89B62AFE489
[27]: https://docs.oracle.com/iaas/Content/Network/Reference/drgmetrics.htm
[28]: https://docs.oracle.com/iaas/Content/Network/Reference/fastconnectmetrics.htm
[29]: https://docs.oracle.com/iaas/Content/File/Reference/filemetrics.htm
[30]: https://docs.oracle.com/iaas/Content/Functions/Reference/functionsmetrics.htm
[31]: https://docs.oracle.com/iaas/mysql-database/doc/metrics.html
[32]: https://docs.oracle.com/iaas/Content/ContEng/Reference/contengmetrics.htm
[33]: https://app.datadoghq.com/integrations/oci-load-balancer
[34]: https://docs.oracle.com/iaas/Content/Balance/Reference/loadbalancermetrics.htm
[35]: https://docs.oracle.com/iaas/Content/NetworkLoadBalancer/Metrics/metrics.htm
[36]: https://app.datadoghq.com/integrations/oci-nat-gateway
[37]: https://docs.oracle.com/iaas/Content/Network/Reference/nat-gateway-metrics.htm
[38]: https://docs.oracle.com/iaas/Content/Object/Reference/objectstoragemetrics.htm
[39]: https://docs.oracle.com/iaas/Content/queue/metrics.htm
[40]: https://docs.oracle.com/iaas/Content/connector-hub/metrics-reference.htm
[41]: https://docs.oracle.com/iaas/Content/Network/Reference/SGWmetrics.htm
[42]: https://app.datadoghq.com/integrations/oci-vcn
[43]: https://docs.oracle.com/iaas/Content/Network/Reference/vnicmetrics.htm
[44]: https://docs.oracle.com/iaas/Content/Network/Reference/ipsecmetrics.htm
[45]: https://docs.oracle.com/iaas/Content/WAF/Reference/metricsalarms.htm
[46]: https://docs.datadoghq.com/ja/help/
[47]: https://www.datadoghq.com/blog/monitor-oci-with-datadog/