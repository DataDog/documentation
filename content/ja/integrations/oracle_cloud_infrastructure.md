---
app_id: oracle-cloud-infrastructure
app_uuid: c2b4d38f-dd23-4ca2-8bc4-b70360868e8c
assets:
  dashboards:
    OCI-Overview-Beta: assets/dashboards/oci-overview-beta-dashboard.json
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
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- log collection
- network
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
short_description: Oracle Cloud Infrastructure (OCI) is an IaaS platform that delivers
  high-performance computing and simple migrations.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Log Collection
  - Category::Network
  - Category::Oracle
  configuration: README.md#Setup
  description: Oracle Cloud Infrastructure (OCI) is an IaaS platform that delivers
    high-performance computing and simple migrations.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Oracle Cloud Infrastructure
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Oracle Cloud Infrastructure (OCI) は、エンタープライズ規模の企業で使用されるInfrastructure-as-a-Service (IaaS) および Platform-as-a-Service (PaaS) です。ホスティング、ストレージ、ネットワーキング、データベースなどのマネージドサービスの完全なスイートを備えています。

Datadog インテグレーションにより、OCI ユーザーはすべてのログを Datadog に直接ストリーミングでき、そこで無期限に保存し、トラブルシューティングのために分析し、セキュリティとコンプライアンスの姿勢を監視できます。

## セットアップ

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

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。


[1]: https://docs.cloud.oracle.com/en-us/iaas/Content/Logging/Concepts/service_logs.htm#enabling_logging
[2]: https://docs.cloud.oracle.com/en-us/iaas/Content/Functions/Concepts/functionsoverview.htm
[3]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/func.py
[4]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/func.yaml
[5]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/requirements.txt
[6]: https://blogs.oracle.com/cloud-infrastructure/oracle-cloud-infrastructure-service-connector-hub-now-generally-available
[7]: https://docs.datadoghq.com/ja/help/
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



[1]: https://docs.cloud.oracle.com/en-us/iaas/Content/Logging/Concepts/service_logs.htm#enabling_logging
[2]: https://docs.cloud.oracle.com/en-us/iaas/Content/GSG/Tasks/addingbuckets.htm
[3]: https://docs.cloud.oracle.com/en-us/iaas/Content/Functions/Concepts/functionsoverview.htm
[4]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/func.py
[5]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/func.yaml
[6]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/requirements.txt
[7]: https://docs.cloud.oracle.com/en-us/iaas/Content/Events/Concepts/eventsgetstarted.htm
{{% /tab %}}
{{< /tabs >}}