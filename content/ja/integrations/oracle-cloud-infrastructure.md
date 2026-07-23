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
  tag: blog
  text: Monitor Oracle Cloud Infrastructure with Datadog
- link: https://www.datadoghq.com/blog/datadog-oci-quickstart/
  tag: blog
  text: Accelerate Oracle Cloud Infrastructure monitoring with Datadog OCI QuickStart
integration_version: 1.1.0
media: []
title: Oracle Cloud Infrastructure
---
{{% site-region region="gov" %}}

<div class="alert alert-warning">選択中の <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では、Oracle Cloud Infrastructure インテグレーションはサポートされていません。</div>

{{% /site-region %}}

{{< jqmath-vanilla >}}

## 概要

Oracle Cloud Infrastructure (OCI) は、エンタープライズ規模の企業で利用されている infrastructure-as-a-service (IaaS) と platform-as-a-service (PaaS) です。ホスティング、ストレージ、ネットワーキング、データベースなど、30 を超えるマネージド サービスを包括的に提供しています。

Datadog の OCI インテグレーションを利用すると、メトリクス、ログ、リソース データを通じて OCI 環境を包括的に可視化できます。これらのデータは、ダッシュボードの構築やトラブルシューティングに役立つだけでなく、セキュリティやコンプライアンス態勢の監視にも活用できます。

## セットアップ

### メトリクスの収集

{{< tabs >}}

{{% tab "OCI QuickStart (Preview; recommended)" %}}

<div class="alert alert-info">
OCI QuickStart は Preview 提供中です。今すぐ申請するには、<a href="https://docs.google.com/forms/d/1nx4ALq7iwnc2afuRaPNFNzYqGHM6UNJtj-jsVuoybBw/preview?edit_requested=true">このフォーム</a> をご利用ください。
</div>

Datadog の OCI QuickStart は、数回クリックするだけで OCI のインフラとアプリケーションの監視を始められる、フル マネージドのセットアップです。OCI QuickStart は、メトリクス、ログ、リソース データを Datadog に転送するために必要な基盤を構築し、新しいリソースや OCI コンパートメントも自動的に検出してデータ収集に取り込みます。

**注**:

- デフォルトで送信されるのはメトリクスのみです。このセットアップが完了したら、[Datadog OCI インテグレーション タイル](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure) からログ収集とリソース データ収集を有効にしてください。
- 2025 年 7 月 15 日時点で存在していた OCI Commercial リージョンはすべてサポートされています。この日以降に追加された OCI リージョンは、現時点ではサポートされていません。

To set up the infrastructure for metric and log forwarding to Datadog:

- [Configure the Datadog OCI integration tile](#datadog-oci-integration-tile)
- [Deploy the QuickStart stack](#orm-stack)
- [Complete the setup in Datadog](#complete-the-setup-in-datadog)
- [Validate metrics are flowing](#validation)
- [Configure metric collection (optional)](#configuration)
- [Configure log collection (optional)](#log-collection)

このインテグレーションでは、Datadog へデータを転送するために Oracle Service Connector Hub を使用する必要があります。セットアップを完了する前に、[サービス制限の引き上げを申請する](https://docs.oracle.com/iaas/Content/General/Concepts/servicelimits.htm#Requesti) ことをおすすめします。必要となる Service Connector Hub のおおよその数は次のとおりです:

$$\\text"Service Connector Hubs" = \\text"テナンシ内のコンパートメント数" / \\text"5"$$

{{% collapse-content title="Prerequisites for this setup" level="h4" %}}

- Your OCI user account needs the **Cloud Administrator** role to complete these steps
- You must be logged into OCI in the tenancy you want to integrate with
- You must be logged into OCI with the Home Region selected in the top right of the screen
- Your OCI user account needs to be in the <a href="https://docs.oracle.com/iaas/Content/Identity/domains/the_default_domain.htm" target="_blank">Default Identity Domain</a>
- Your OCI user account must be able to create a user, user group, and dynamic group in the Default Identity Domain
- Your OCI user account must be able to create policies in the root compartment

{{% /collapse-content %}}

#### Datadog OCI integration tile

1. [Datadog OCI インテグレーション タイル](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure) に移動し、**Add New Tenancy** をクリックします。
1. Select or create a Datadog API key to use for the integration.
1. Create a Datadog application key.
1. Click **Create OCI Stack**. This takes you to an Oracle Resource Manager (ORM) stack to finish deployment.<br />
   **Note**: Deploy this stack only once per tenancy.

#### ORM stack

1. Oracle 利用規約に同意します。
1. Leave the option to use custom Terraform providers unchecked.
1. スタックのデプロイ先には既定の作業ディレクトリを使用するか、必要に応じて別のディレクトリを選択します。
1. Click **Next**, and **Next** again.<br />
1. **Create** をクリックし、デプロイが完了するまで最大 15 分待ちます。

#### Datadog で設定を完了する

[Datadog OCI インテグレーション タイル](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure) に戻り、**Ready!** をクリックします。

#### 検証

Datadog の [OCI インテグレーション概要ダッシュボード](https://app.datadoghq.com/dash/integration/31417/oracle-cloud-infrastructure-oci-overview) または [Metrics Explorer ページ](https://app.datadoghq.com/metric/explorer) で `oci.*` メトリクスを確認します。

<div class="alert alert-warning">OCI 関数メトリクス (<code>oci.faas</code> ネームスペース) とコンテナインスタンスメトリクス (<code>oci_computecontainerinstance</code> ネームスペース) はプレビュー版です。</div>

#### 設定

![Datadog における OCI テナンシの設定タブ](images/oci_configuration_tab.png)

セットアップが完了すると、[Datadog OCI インテグレーション タイル](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure) の左側で、そのテナンシ用の設定タブが利用できるようになります。以下のセクションで説明するように、テナンシ全体のデータ収集設定を適用してください。

##### Add regions

On the **General** tab, select the regions for data collection from the **Regions** checkbox list. Region selections apply to the entire tenancy, for both metrics and logs.

**Note**: If you used the QuickStart setup method, and afterward subscribed to a new OCI region, reapply the initial setup stack in ORM. The new region then becomes available in the Datadog OCI tile.

##### Metric and log collection

Use the **Metric collection** and **Log collection** tabs to configure which metrics and logs are sent to Datadog:

- **Enable** or **disable** collection of metrics or logs for the entire tenancy
- **Include** or **exclude** specific compartments based on `key:value` format compartment tags. For example:
  - `datadog:monitored,env:prod*` includes compartments if **either** of these tags is present
  - `!env:staging,!testing` では、**両方** のタグが存在する場合にのみコンパートメントが除外されます。
  - `datadog:monitored,!region:us-phoenix-1` includes compartments that both have the tag `datadog:monitored` and do not have the tag `region:us-phoenix-1`
- **Enable** or **disable** collection for specific OCI services

**注**:

- After modifying tags in OCI, it may take up to 15 minutes for the changes to appear in Datadog
- In OCI, tags are not inherited by child compartments; each compartment must be tagged individually

### Resource Collection

[Datadog OCI インテグレーション タイル](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure) の **Resource Collection** タブで、**Enable Resource Collection** トグルをクリックします。リソースは [Datadog Resource Catalog](https://docs.datadoghq.com/infrastructure/resource_catalog/) で確認できます。

{{% /tab %}}

{{% tab "Manual setup" %}}

OCI メトリクスを Datadog に転送するには

- [Enter tenancy info](#enter-tenancy-info)
- [Deploy OCI policy stack](#create-oci-policy-stack) in the home region of your tenancy to create a Datadog read-only user, group, and policies
- [Enter DatadogROAuthUser info](#enter-datadogroauthuser-info) in Datadog
- [Deploy OCI metric forwarding stack](#create-oci-metric-forwarding-stack) for every tenancy region you want to forward metrics from
- [Complete the setup in Datadog](#complete-the-setup-in-datadog)
- [Validate metrics are flowing](#validation)
- [Configure metric collection (optional)](#configuration)
- [Configure log collection (optional)](#log-collection)

For a visual representation of this architecture, see the [Architecture section](#architecture).

#### テナンシー情報を入力

{{% collapse-content title="Requirements for this section" level="h5" %}}

- Your OCI user account needs the **Cloud Administrator** role to complete these steps
- Tenancy OCID
- Home Region

{{% /collapse-content %}}

監視対象のテナンシの OCID と Home Region を、[Datadog OCI インテグレーション タイル](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure) に入力します。

- この情報は [テナンシ詳細ページ](https://cloud.oracle.com/tenancy) で確認できます。
- Home Region には、OCI の [Regions and Availability Domains ページ](https://docs.oracle.com/iaas/Content/General/Concepts/regions.htm) に記載されている **Region Identifier** の値を入力します。

#### Create OCI policy stack

{{% collapse-content title="Requirements for this section" level="h5" %}}

- OCI ユーザー アカウントには、Default ドメインで [動的グループとポリシーを作成する](https://docs.oracle.com/en/cloud/paas/weblogic-container/user/create-dynamic-groups-and-policies.html) 権限が必要です。
- You must be in the home region of the tenancy

{{% /collapse-content %}}

<div class="alert alert-warning">Ensure that the <strong>home region</strong> of the tenancy is selected in the top right of the screen.</div>

This Oracle Resource Manager (ORM) policy stack should only be deployed once per tenancy.

1. Click the **Create Policy Stack** button on the Datadog OCI integration tile.
1. Oracle 利用規約に同意します。
1. カスタム Terraform プロバイダーを使用するオプションは**未選択**のままにします。
1. Use the default name and compartment for the stack, or optionally provide your own descriptive name or compartment.
1. **Next** をクリックします。
1. Leave the tenancy field and current user field as-is.
1. **Next** をクリックします。
1. **Create** をクリックします。

#### Enter DatadogROAuthUser info

{{% collapse-content title="Requirements for this section" level="h5" %}}

- OCID of the `DatadogROAuthUser`
- OCI API key and fingerprint value

{{% /collapse-content %}}

1. In the OCI console search bar, search for `DatadogROAuthUser` and click on the User resource that appears.
1. Copy the user's OCID value.
1. その値を [Datadog OCI インテグレーション タイル](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure) の **User OCID** フィールドに貼り付けます。
1. Returning to the OCI console, generate an API key with these steps:<br />
   a. In the bottom left corner of the screen, under **Resources**, click **API keys**.<br />
   b. Click **Add API key**.<br />
   c. Click **Download private key**.<br />
   d. Click **Add**.<br />
   e. A **Configuration file preview** popup appears, but no action is needed; close the popup.

![OCI コンソールの Add API Key ページ](images/add_api_key.png)

5. フィンガープリント値をコピーし、[Datadog OCI インテグレーション タイル](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure) の **Fingerprint** フィールドに貼り付けます。
1. Copy the private key value with these steps:
   a. Open the downloaded private key `.pem` file in a text editor, or use a terminal command such as `cat` to display the file's contents.
   b. `-----BEGIN PRIVATE KEY-----` と `-----END PRIVATE KEY-----` を含む全内容をコピーします。
1. プライベートキーの値を Datadog OCI インテグレーションタイルの **Private Key** フィールドに貼り付けてください。

#### Create OCI metric forwarding stack

{{% collapse-content title="Requirements for this section" level="h5" %}}

- Your OCI user account must be able to create resources in the compartment
- [Datadog API Key](https://app.datadoghq.com/organization-settings/api-keys) の値
- Username and auth token for a user with the `REPOSITORY_READ` and `REPOSITORY_UPDATE` permissions to pull and push images to a Docker repo
  - 認証トークンの作成方法については、[認証トークンを取得する](https://docs.oracle.com/iaas/Content/Registry/Tasks/registrygettingauthtoken.htm) を参照してください。
  - 必要なポリシーの詳細については、[リポジトリ アクセスを制御するポリシー](https://docs.oracle.com/iaas/Content/Registry/Concepts/registrypolicyrepoaccess.htm#Policies_to_Control_Repository_Access) を参照してください。

**注**: Docker registry へのログイン設定が正しいことを確認するには、[Oracle Cloud Infrastructure Registry にログインする](https://docs.oracle.com/iaas/Content/Functions/Tasks/functionslogintoocir.htm) を参照してください。

{{% /collapse-content %}}

The metric forwarding stack must be deployed for **each combination of tenancy and region** to be monitored. For the simplest setup, Datadog recommends creating all the necessary OCI resources with the Oracle Resource Manager (ORM) stack provided below. Alternatively, you can use your existing OCI networking infrastructure.

All resources created by Datadog's ORM stack are deployed to the compartment specified, and for the region currently selected in the top right of the screen.

1. Click the **Create Metric Stack** button on the Datadog OCI integration tile.
1. Oracle 利用規約に同意します。
1. Leave the **Custom providers** option unchecked.
1. スタックに名前を付け、それをデプロイするコンパートメントを選択します。
1. **Next** をクリックします。
1. **Datadog API Key** フィールドに、[Datadog API Key](https://app.datadoghq.com/organization-settings/api-keys) の値を入力します。
1. In the **Network options** section, leave `Create VCN` checked.

{{% collapse-content title="(Optional) Use existing VCN instead" level="h4" %}}

If using an existing Virtual Cloud Network (VCN), the subnet's OCID must be provided to the stack. Make sure that the VCN:

- Is allowed to make HTTP egress calls through NAT gateway
- Is able to pull images from OCI container registry using service gateway
- Has the route table rules to allow NAT gateway and service gateway
- Has the security rules to send HTTP requests

7. In the **Network options** section, uncheck the `Create VCN` option and enter your VCN information:<br />
   a. In the **vcnCompartment** field, select your compartment.<br />
   b. In the **existingVcn** section, select your existing VCN.<br />
   c. **Function Subnet OCID** セクションで、使用するサブネットの OCID を入力します。

{{% /collapse-content %}}

8. In the **Metrics settings** section, optionally remove any metric namespaces from collection.
1. In the **Metrics compartments** section, enter a comma-separated list of compartment OCIDs to monitor. Any metric namespace filters selected in the previous step are applied to each compartment.
1. In the **Function settings** section, select `GENERIC_ARM`. Select `GENERIC_X86` if deploying in a Japan region.
1. **Next** をクリックします。
1. **Create** をクリックします。
1. [Datadog OCI インテグレーション タイル](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure) に戻り、**Create Configuration** をクリックします。

**注**:

- By default, only the root compartment is selected, and all of the metric namespaces from Step 8 which are present in the compartment are enabled (up to 50 namespaces are supported per connector hub). If you choose to monitor additional compartments, the namespaces added to them are an intersection of namespaces selected and the namespaces present in the compartment.
- Resource Manager スタックの Terraform state file にアクセスできるユーザーは、適切に管理する必要があります。詳しくは、Securing Resource Manager ページの [Terraform State Files セクション](https://docs.oracle.com/iaas/Content/Security/Reference/resourcemanager_security.htm#confidentiality__terraform-state) を参照してください。

{{% /tab %}}

{{< /tabs >}}

{{% collapse-content title="See the full list of metric namespaces" level="h4" %}}

### メトリクスネームスペース

| インテグレーション                         | メトリクスネームスペース                                                                                                                         |
|-------------------------------------| ---------------------------------------------------------------------------------------------------------------------------------------- |
| [API Gateway](https://docs.datadoghq.com/integrations/oci_api_gateway/)                  | [oci_apigateway](https://docs.oracle.com/iaas/Content/APIGateway/Reference/apigatewaymetrics.htm)                                                                                                                    |
| [Autonomous Database](https://docs.datadoghq.com/integrations/oci_autonomous_database/)           | [oci_autonomous_database](https://docs.oracle.com/iaas/autonomous-database-serverless/doc/autonomous-monitor-metrics-list.html)                                                                                                            |
| [Block Storage](https://docs.datadoghq.com/integrations/oci_block_storage/)                       | [oci_blockstore](https://docs.oracle.com/iaas/Content/Block/References/volumemetrics.htm)                                                                                                                     |
| [Compute](https://docs.datadoghq.com/integrations/oci_compute/)                       | [oci_computeagent](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#Availabl), [rdma_infrastructure_health](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_compute_rdma_network), [gpu_infrastructure_health](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_high_performance_compute), [oci_compute_infrastructure_health](https://docs.oracle.com/iaas/Content/Compute/References/infrastructurehealthmetrics.htm)       |
| [Container Instances (Preview)](https://docs.datadoghq.com/integrations/oci_container_instances/) | [oci_computecontainerinstance](https://docs.oracle.com/iaas/Content/container-instances/container-instance-metrics.htm)                                                                                                       |
| [Database](https://docs.datadoghq.com/integrations/oci_database/)                      | [oci_database](https://docs.oracle.com/iaas/base-database/doc/available-metrics-base-database-service-resources.html#DBSCB-GUID-57B7B9B1-288B-4DCB-82AE-D53B2BD9C78F), [oci_database_cluster](https://docs.oracle.com/iaas/base-database/doc/available-metrics-base-database-service-resources.html#DBSCB-GUID-A42CF0E3-EE65-4A66-B8A3-C89B62AFE489)                                                                                           |
| [Dynamic Routing Gateway](https://docs.datadoghq.com/integrations/oci-dynamic-routing-gateway/)             | [oci_dynamic_routing_gateway](https://docs.oracle.com/iaas/Content/Network/Reference/drgmetrics.htm)                                                                                                        |
| [E-Business Suite (EBS)](https://docs.datadoghq.com/integrations/oci_ebs/)             | [oracle_appmgmt](https://docs.oracle.com/iaas/stack-monitoring/doc/metric-reference.html#STMON-GUID-4E859CA3-1CAB-43FB-8DC7-0AA17E6B52EC)                                                                                                        |
| [FastConnect](https://docs.datadoghq.com/integrations/oci_fastconnect/)                         | [oci_fastconnect](https://docs.oracle.com/iaas/Content/Network/Reference/fastconnectmetrics.htm)                                                                                                                    |
| [File Storage](https://docs.datadoghq.com/integrations/oci_file_storage/)                        | [oci_filestorage](https://docs.oracle.com/iaas/Content/File/Reference/filemetrics.htm)                                                                                                                    |
| [Functions (Preview)](https://docs.datadoghq.com/integrations/oci_functions/)           | [oci_faas](https://docs.oracle.com/iaas/Content/Functions/Reference/functionsmetrics.htm)                                                                                                                           |
| [GoldenGate](https://docs.datadoghq.com/integrations/oci-goldengate/)           | [oci_goldengate](https://docs.oracle.com/en/cloud/paas/goldengate-service/ofroo/)                                                                                                                           |
| [GPU](https://docs.datadoghq.com/integrations/oci_gpu/)           | [gpu_infrastructure_health](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_high_performance_compute)                                                                                                                           |
| [HeatWave MySQL](https://docs.datadoghq.com/integrations/oci_mysql_database/)                | [oci_mysql_database](https://docs.oracle.com/iaas/mysql-database/doc/metrics.html)                                                                                                                 |
| [Kubernetes Engine](https://docs.datadoghq.com/integrations/oke/)                   | [oci_oke](https://docs.oracle.com/iaas/Content/ContEng/Reference/contengmetrics.htm)                                                                                                                            |
| [Load Balancer](https://docs.datadoghq.com/integrations/oci_load_balancer/)                 | [oci_lbaas](https://docs.oracle.com/iaas/Content/Balance/Reference/loadbalancermetrics.htm), [oci_nlb](https://docs.oracle.com/iaas/Content/NetworkLoadBalancer/Metrics/metrics.htm)                                                                                                           |
| [Media Streams](https://docs.datadoghq.com/integrations/oci_media_streams/)                   | [oci_mediastreams](https://docs.oracle.com/iaas/Content/dms-mediastream/mediastreams_metrics.htm?)                                                                                                                    |
| [NAT Gateway](https://docs.datadoghq.com/integrations/oci_nat_gateway/)                   | [oci_nat_gateway](https://docs.oracle.com/iaas/Content/Network/Reference/nat-gateway-metrics.htm)                                                                                                                    |
| [Network Firewall](https://docs.datadoghq.com/integrations/oci_network_firewall/)                   | [oci_network_firewall](https://docs.oracle.com/iaas/Content/network-firewall/metrics.htm)                                                                                                                    |
| [Object Storage](https://docs.datadoghq.com/integrations/oci_object_storage/)                      | [oci_objectstorage](https://docs.oracle.com/iaas/Content/Object/Reference/objectstoragemetrics.htm)                                                                                                                  |
| [PostgreSQL](https://docs.datadoghq.com/integrations/oci_postgresql/)                   | [oci_postgresql](https://docs.oracle.com/iaas/Content/postgresql/metrics.htm)                                                                                                                    |
| [Queue](https://docs.datadoghq.com/integrations/oci_queue/)                               | [oci_queue](https://docs.oracle.com/iaas/Content/queue/metrics.htm)                                                                                                                          |
| [Service Connector Hub](https://docs.datadoghq.com/integrations/oci_service_connector_hub/)               | [oci_service_connector_hub](https://docs.oracle.com/iaas/Content/connector-hub/metrics-reference.htm)                                                                                                          |
| [Service Gateway](https://docs.datadoghq.com/integrations/oci_service_gateway/)                     | [oci_service_gateway](https://docs.oracle.com/iaas/Content/Network/Reference/SGWmetrics.htm)                                                                                                                |
| [VCN](https://docs.datadoghq.com/integrations/oci_vcn/)                           | [oci_vcn](https://docs.oracle.com/iaas/Content/Network/Reference/vnicmetrics.htm)                                                                                                                            |
| [VPN](https://docs.datadoghq.com/integrations/oci_vpn/)                           | [oci_vpn](https://docs.oracle.com/iaas/Content/Network/Reference/ipsecmetrics.htm)                                                                                                                            |
| [Web Application Firewall](https://docs.datadoghq.com/integrations/oci_waf/)            | [oci_waf](https://docs.oracle.com/iaas/Content/WAF/Reference/metricsalarms.htm)

{{% /collapse-content %}}

### ログ収集

Use one of the methods below to send your OCI logs to Datadog:

{{< tabs >}}

{{% tab "OCI QuickStart (Preview; recommended)" %}}

1. メトリクスとログの両方を Datadog に転送するために必要な基盤を作成するには、[セットアップ セクション](#setup) の手順に従ってください。
1. [Datadog OCI インテグレーション タイル](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure) の **Log Collection** タブで、**Enable Log Collection** トグルをクリックします。

{{% /tab %}}

{{% tab "サービスコネクタハブ" %}}

1. OCI ログを構成します。
1. OCI 関数を作成します。
1. OCI サービスコネクタを設定します。

以下の手順では、OCI ポータルを使用してインテグレーションを設定します。

#### OCI ロギング

1. OCI ポータルで、*Logging -> Log Groups* に移動します。
1. コンパートメントを選択し、**Create Log Group** をクリックします。サイドパネルが開きます。
1. 名前には `data_log_group` を入力し、オプションで説明とタグを入力します。
1. **Create** をクリックして、新しいロググループを設定します。
1. **Resources** の下にある **Logs** をクリックします。
1. 必要に応じて、**Create custom log** または **Enable service log** をクリックします。
1. **Enable Log** をクリックして、新しい OCI ログを作成します。

OCI Logs の詳細については、[リソースの Logging を有効にする](https://docs.oracle.com/iaas/Content/Logging/Task/enabling_logging.htm) を参照してください。

#### OCI 関数

1. OCI ポータルで、*Functions* に移動します。
1. 既存のアプリケーションを選択するか、**Create Application** をクリックします。
1. アプリケーション内に新しい OCI 関数を作成します。詳しくは、[Oracle による関数の概要](https://docs.cloud.oracle.com/iaas/Content/Functions/Concepts/functionsoverview.htm) を参照してください。
1. It is recommended to create a boilerplate Python function first and replace the automatically-generated files with Datadog's source code:
   - `func.py` は、[Datadog OCI リポジトリ](https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/func.py) のコードに置き換えます。
   - `func.yaml` は、[Datadog OCI リポジトリ](https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/func.yaml) のコードに置き換えます。`DATADOG_TOKEN` と `DATADOG_HOST` は、使用している Datadog API Key とリージョンの logs intake リンクに置き換えてください。
   - `requirements.txt` は、[Datadog OCI リポジトリ](https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/requirements.txt) のコードに置き換えます。

#### OCI サービスコネクタハブ

1. OCI ポータルで、*Logging -> Service Connectors* に移動します。
1. **Create Service Connector** をクリックして、**Create Service Connector** ページに移動します。
1. ロギングとして **Source** を選択し、関数として **Target** を選択します。
1. **Configure Source Connection** で、**Compartment name**、**Log Group**、**Log** を選択します。(最初のステップで作成された **Log Group** と **Log**)
1. **Audit Logs** も送信したい場合は、**+Another Log** をクリックし、同じ **Compartment** を選択したうえで、**Log Group** に "\_Audit" を指定します。
1. **Configure target** で、**Compartment**、**Function application**、**Function** を選択します。(前のステップで作成された **Function Application** と **Function**)
1. ポリシーを作成するように求められたら、プロンプトから **Create** をクリックします。
1. 一番下の **Create** をクリックして、サービスコネクタの作成を完了します。

OCI Object Storage の詳細については、[Oracle の Service Connector に関するブログ記事](https://blogs.oracle.com/cloud-infrastructure/oracle-cloud-infrastructure-service-connector-hub-now-generally-available) を参照してください。

{{% /tab %}}

{{% tab "Object store" %}}

1. OCI ログを構成します。
1. OCI オブジェクトストアを作成し、OCI ログの読み取り/書き込みアクセスを有効にします。
1. OCI 関数を作成します。
1. OCI イベントを設定します。

以下の手順では、OCI ポータルを使用してインテグレーションを設定します。

#### OCI ロギング

1. OCI ポータルで、*Solutions and Platform -> Logging -> Logs* に移動します。
1. **Create Custom Log** をクリックして、**Create Custom Log** ページに移動します。
1. 新しい OCI ログに名前を付けます。
1. **Compartment** と **Log Group** を選択します。この選択は、インストール全体で一貫しています。
1. **Create Custom Log** をクリックして、**Create Agent Config** ページに移動します。
1. **Create new configuration** をクリックします。
1. 新しいコンフィギュレーションに名前を付けます。コンパートメントは事前に選択されています。
1. グループタイプを **Dynamic Group** に設定し、グループを既存のグループの 1 つに設定します。
1. 入力タイプを **Log Path** に設定し、希望の入力名を入力して、ファイルパスに "/" を使用します。
1. **Create Custom Log** をクリックすると、OCI ログが作成され、ログページで利用できるようになります。

OCI Logs の詳細については、[リソースの Logging を有効にする](https://docs.oracle.com/iaas/Content/Logging/Task/enabling_logging.htm) を参照してください。

#### OCI オブジェクトストレージ

1. OCI ポータルで、*Core Infrastructure -> Object Storage -> Object Storage* に移動します。
1. **Create Bucket** をクリックして、**Create Bucket** フォームに移動します。
1. ストレージ階層に **Standard** を選択し、**Emit Object Events** をチェックします。
1. 好みに応じてフォームの残りの部分に記入します。
1. **Create Bucket** をクリックすると、バケットが作成され、バケットリストで利用できるようになります。
1. アクティブなバケットリストから新しいバケットを選択し、リソースの下の **Logs** をクリックします。
1. Toggle **read** to enabled, which directs you to an **Enable Log** side menu.
1. **Compartment** と **Log Group** を選択します (OCI ログと同じ選択を使用します)。
1. **Log Name** の名前を入力し、希望するログ保持を選択します。

OCI Object Storage の詳細については、[Object Storage にデータを格納する](https://docs.cloud.oracle.com/iaas/Content/GSG/Tasks/addingbuckets.htm) を参照してください。

#### OCI 関数

1. OCI ポータルで、*Solutions and Platform -> Developer Services -> Functions* に移動します。
1. 既存のアプリケーションを選択するか、**Create Application** をクリックします。
1. アプリケーション内に新しい OCI 関数を作成します。詳しくは、[Oracle による関数の概要](https://docs.cloud.oracle.com/iaas/Content/Functions/Concepts/functionsoverview.htm) を参照してください。
1. It is recommended to create a boilerplate Python function first and replace the automatically-generated files with Datadog's source code:
   - `func.py` は、[Datadog OCI リポジトリ](https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/func.py) のコードに置き換えます。
   - `func.yaml` は、[Datadog OCI リポジトリ](https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/func.yaml) のコードに置き換えます。`DATADOG_TOKEN` と `DATADOG_HOST` は、使用している Datadog API Key とリージョンの logs intake リンクに置き換えてください。
   - `requirements.txt` は、[Datadog OCI リポジトリ](https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/requirements.txt) のコードに置き換えます。

#### OCI イベント

1. OCI ポータルで、*Solutions and Platform -> Application Integration -> Event Service* に移動します。
1. **Create Rule** をクリックして、**Create Rule** ページに移動します。
1. イベントルールに名前と説明を付けます。
1. 条件を *Event Type**、サービス名を **Object Storage**、イベントタイプを **Object - Create** として設定します。
1. アクションタイプを **Functions** として設定します。
1. 関数コンパートメントが、OCI ログ、OCI バケット、および OCI 関数に対して行った選択と同じであることを確認します。
1. Select your function application and function (according to the previous installation step).
1. **Create Rule** をクリックすると、ルールが作成され、ルールリストで利用できるようになります。

OCI Object Storage の詳細については、[Events の利用開始](https://docs.cloud.oracle.com/iaas/Content/Events/Concepts/eventsgetstarted.htm) を参照してください。

{{% /tab %}}

{{< /tabs >}}

## アーキテクチャ

{{< tabs >}}

{{% tab "OCI QuickStart (Preview; recommended)" %}}

### Metric and log forwarding resources

![このセットアップ オプションで使用する OCI のメトリクスおよびログ転送リソースと、データ フローを示した図](images/oci_quickstart_infrastructure_diagram.png)

監視対象の各リージョンについて、このセットアップ オプションでは、そのリージョン内に Datadog へメトリクスとログを転送するための次の基盤が作成されます:

- Function Application (`dd-function-app`)
- 2 つの関数:
  - Metrics Forwarder (`dd-metrics-forwarder`)
  - Logs Forwarder (`dd-logs-forwarder`)
- VCN (`dd-vcn`) with secure networking infrastructure:
  - Private subnet (`dd-vcn-private-subnet`)
  - NAT gateway (`dd-vcn-natgateway`) for external access to the internet
  - Service gateway (`dd-vcn-servicegateway`) for internal access to OCI services
- Key Management Service (KMS) vault (`datadog-vault`) to store the Datadog API key
- Dedicated **Datadog** compartment (`Datadog`)

All resources are tagged with `ownedby = "datadog"`.

### IAM resources

![このセットアップ オプションで使用する OCI IAM リソースと、データ フローを示した図](images/oci_quickstart_iam_diagram.png)

This setup option creates the following IAM resources to enable data forwarding to Datadog:

- Service user (`dd-svc`)
- Group (`dd-svc-admin`) that the service user belongs to
- RSA key pair for API authentication
- OCI API key for the service user
- Dynamic Group (`dd-dynamic-group-connectorhubs`) that includes all service connectors in the Datadog compartment
- Dynamic Group (`dd-dynamic-group-function`) that includes all functions in the Datadog compartment
- Policy (`dd-svc-policy`) to give the service user read access to the tenancy resources, as well as access to manage OCI Service Connector Hubs and OCI Functions in the compartment created and managed by Datadog

{{% collapse-content title="See the policy" level="h6" %}}

```text
- dd-svc-admin に tenancy 内の all-resources の読み取りを許可
- dd-svc-admin に Datadog コンパートメント内の serviceconnectors の管理を許可
- dd-svc-admin に Datadog コンパートメント内の functions-family の管理を許可 (権限を限定):
     * FN_FUNCTION_UPDATE
     * FN_FUNCTION_LIST
     * FN_APP_LIST
- dd-svc-admin が tenancy usage-report 内の objects を読み取れるように Endorse
```

{{% /collapse-content %}}

- Policy `dd-dynamic-group-policy` to enable the service connectors to read data (logs and metrics) and interact with functions. This policy also allows the functions to read secrets in the Datadog compartment (the Datadog API and application keys stored in the KMS vault)

{{% collapse-content title="See the policy" level="h6" %}}

```text
   - Allow dd-dynamic-group-connectorhubs to read log-content in tenancy
   - Allow dd-dynamic-group-connectorhubs to read metrics in tenancy
   - Allow dd-dynamic-group-connectorhubs to use fn-function in Datadog compartment
   - Allow dd-dynamic-group-connectorhubs to use fn-invocation in Datadog compartment
   - Allow dd-dynamic-group-functions to read secret-bundles in Datadog compartment
```

{{% /collapse-content %}}

{{% /tab %}}

{{% tab "Manual setup" %}}

### Metric forwarding resources

![このセットアップ オプションで使用する OCI リソースと、データ フローを示した図](images/OCI_metrics_integration_diagram.png)

このセットアップ オプションでは、OCI メトリクスを Datadog に転送するために、OCI の [Connector Hub](https://docs.oracle.com/iaas/Content/connector-hub/home.htm)、[関数アプリケーション](https://docs.oracle.com/iaas/Content/Functions/Concepts/functionsconcepts.htm#applications)、およびセキュアなネットワーク基盤を作成します。これらのリソース向け ORM スタックでは、テナンシ内の対象リージョンに関数用のコンテナ リポジトリが作成され、その関数で使用する Docker イメージがそこにプッシュされます。

### IAM resources

![インテグレーション認証に使用される OCI リソースとワークフローを示した図](images/OCI_auth_workflow_diagram.png)

This setup option creates:

- Dynamic group with `resource.type = 'serviceconnectors'`, to enable access to the connector hub
- User named **DatadogROAuthUser**, which Datadog uses to read tenancy resources
- Group to which the created user is added for policy access
- User named **DatadogAuthWriteUser**, which is used to push Docker images for the function
- Write access group that the `DatadogAuthWriteUser` is added to, for pushing images through policy access
- Policy in the root compartment to allow connector hubs to read metrics and invoke functions. This policy also gives the created user group read access to both the tenancy resources and write access group, to push images

{{% collapse-content title="See the policy" level="h6" %}}

```text
Allow dynamic-group Default/<GROUP_NAME> to read metrics in tenancy
Allow dynamic-group Default/<GROUP_NAME> to use fn-function in tenancy
Allow dynamic-group Default/<GROUP_NAME> to use fn-invocation in tenancy
Allow group Default/<USER_GROUP_NAME> to read all-resources in tenancy
Allow group Default/<WRITE_USER_GROUP_NAME> to manage repos in tenancy where ANY {request.permission = 'REPOSITORY_READ', request.permission = 'REPOSITORY_UPDATE', request.permission = 'REPOSITORY_CREATE'}
```

{{% /collapse-content %}}

{{% /tab %}}

{{< /tabs >}}

## 収集されるデータ

<!-- ### メトリクス -->

<!-- このインテグレーションで提供されるメトリクスの一覧は、[metadata.csv][12] を参照してください。 -->

### メトリクス

メトリクスの詳細一覧については、[メトリクス ネームスペース セクション](#metric-namespaces) で該当する OCI サービスを選択してください。

### サービス チェック

OCI インテグレーションには、サービスのチェック機能は含まれません。

### イベント

OCI インテグレーションには、イベントは含まれません。

## トラブルシューティング

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。

## その他の参考資料

役立つドキュメント、リンク、記事:

- [Datadog で Oracle Cloud Infrastructure を監視する](https://www.datadoghq.com/blog/monitor-oci-with-datadog/)
- [Datadog OCI QuickStart で Oracle Cloud Infrastructure の監視を加速する](https://www.datadoghq.com/blog/datadog-oci-quickstart/)