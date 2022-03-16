---
aliases: []
categories:
  - cloud
  - oracle
  - ログの収集
dependencies: []
description: カスタムログとサービスログを Oracle Cloud Infrastructure から Datadog に送信します。
doc_link: https://docs.datadoghq.com/integrations/oracle_cloud_infrastructure/
draft: false
further_reading: []
git_integration_title: oracle_cloud_infrastructure
has_logo: true
integration_id: oracle-cloud-infrastructure
integration_title: Oracle Cloud Infrastructure
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: oracle_cloud_infrastructure
public_title: Datadog-Oracle Cloud Infrastructure インテグレーション
short_description: Oracle Cloud からログを収集、監視します。
type: ''
version: '1.0'
---
## 概要

Oracle Cloud Infrastructure (OCI) は、エンタープライズ規模の企業で使用されるInfrastructure-as-a-Service (IaaS) および Platform-as-a-Service (PaaS) です。ホスティング、ストレージ、ネットワーキング、データベースなどのマネージドサービスの完全なスイートを備えています。

Datadog インテグレーションにより、OCI ユーザーはすべてのログを Datadog に直接ストリーミングでき、そこで無期限に保存し、トラブルシューティングのために分析し、セキュリティとコンプライアンスの姿勢を監視できます。

## セットアップ

### ログの収集

次のいずれかのプロセスに従って、Oracle Cloud Infrastructure から Datadog にログを送信します。

{{< tabs >}}
{{% tab "サービスコネクタハブ" %}}

1. OCI ログを構成します。
3. OCI 関数を作成します。
4. OCI サービスコネクタを設定します。

以下の手順では、OCI ポータルを使用してインテグレーションを設定します。

#### OCI ロギング

1. OCI ポータルで、*Solutions and Platform -> Logging -> Log Groups* に移動します。
2. **Create Log Group** をクリックして、**Create Custom Log** ページに移動します。
3. **Compartment name** を選択します。この選択は、インストール全体で一貫しています。
4. **Name** として "data_log_group" を使用し、選択した **Description** を入力します。
5. **Create** をクリックして、新しいロググループを設定します。
6. *Solutions and Platform -> Logging -> Logs* に移動します。
7. **Enable Service Log** をクリックします。
8. **Select Resource** で、**Compartment**、ログを収集する **Service**、およびそのサービスに属する **Resource** を選択します。
9. **Configure Log** で、**Log Category** として "Write Access Events" を選択し、選択した **Name** を入力します。
10. **Enable Log** をクリックして、新しい OCI ログを作成します。

OCI ログの詳細については、[リソースのログを有効にする][1]を参照してください。

#### OCI 関数

1. OCI ポータルで、*Solutions and Platform -> Developer Services -> Functions* に移動します。
2. 既存のアプリケーションを選択するか、**Create Application** をクリックします。
3. アプリケーション内に新しい OCI 関数を作成します。詳細については、[Oracle の関数概要][2]を参照してください。
4. 最初にボイラープレート Python 関数を作成し、自動生成されたファイルを Datadog のソースコードに置き換えることをお勧めします。
   - `func.py` を [Datadog OCI リポジトリ][3]のコードに置き換えます。
   - `func.yaml` を [Datadog OCI リポジトリ][4]のコードに置き換えます。`DATADOG_TOKEN` と `DATADOG_HOST` は、Datadog API キーとリージョンログの取り込みリンクに置き換える必要があります。
   - `requirements.txt` を [Datadog OCI リポジトリ][5]のコードに置き換えます。

#### OCI サービスコネクタハブ

1. OCI ポータルで、*Solutions and Platform -> Logging -> Service Connectors* に移動します。
2. **Create Connector** をクリックして、**Edit Service Connector** ページに移動します。
3. ロギングとして **Source** を選択し、関数として **Target** を選択します。
4. **Configure Source Connection** で、**Compartment name**、**Log Group**、**Log** を選択します。(最初のステップで作成された **Log Group** と **Log**)
5. **Audit Logs** も送信する場合は、**+Another Log** をクリックし、同じ **Compartment** を選択して、**Log Group** として "_Audit" を置き換えます。
6. **Configure Target Condition** で、**Compartment name**、**Function Application**、**Function** を選択します。(前のステップで作成された **Function Application** と **Function**)
7. ポリシーを作成するように求められたら、**Create** をクリックします。
8. **Save Changes** をクリックして、サービスコネクタの作成を完了します。

OCI オブジェクトストレージの詳細については、[Oracle のサービスコネクタのブログ記事][6]を参照してください。


[1]: https://docs.cloud.oracle.com/en-us/iaas/Content/Logging/Concepts/service_logs.htm#enabling_logging
[2]: https://docs.cloud.oracle.com/en-us/iaas/Content/Functions/Concepts/functionsoverview.htm
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


[1]: https://docs.cloud.oracle.com/en-us/iaas/Content/Logging/Concepts/service_logs.htm#enabling_logging
[2]: https://docs.cloud.oracle.com/en-us/iaas/Content/GSG/Tasks/addingbuckets.htm
[3]: https://docs.cloud.oracle.com/en-us/iaas/Content/Functions/Concepts/functionsoverview.htm
[4]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/func.py
[5]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/func.yaml
[6]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/requirements.txt
[7]: https://docs.cloud.oracle.com/en-us/iaas/Content/Events/Concepts/eventsgetstarted.htm
{{% /tab %}}

{{< /tabs >}}