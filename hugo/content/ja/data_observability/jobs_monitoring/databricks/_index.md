---
aliases:
- /ja/data_jobs/databricks
description: 'OAuth または Personal Access Token 認証と Datadog Agent のインストールを使用して、Databricks
  ワークスペースの Data Observability: Jobs Monitoring を有効にします。'
further_reading:
- link: /data_jobs
  tag: ドキュメント
  text: 'Data Observability: Jobs Monitoring'
- link: https://www.datadoghq.com/blog/databricks-serverless-jobs-datadog/
  tag: ブログ
  text: Databricks Serverless Jobs Monitoring で問題を検出し、コストを最適化する
title: 'Databricks の Data Observability: Jobs Monitoring を有効にする'
---
[Data Observability: Jobs Monitoring][7] は、クラスターまたはサーバーレスコンピュートで実行される Databricks ジョブとワークフローのパフォーマンスと信頼性を可視化します。

## セットアップ {#setup}

<div class="alert alert-info">Databricks ワークスペースで<a href="https://docs.databricks.com/en/security/network/front-end/index.html">ネットワーク制限</a>が有効になっている場合は、Datadog の {{< region-param key="ip_ranges_url_webhooks" link="true" text="webhook IP ranges" >}} を許可リストに追加します。ワークスペースで Private Link を使用している場合は、以下の <strong>Private Link Connectivity</strong> タブを参照してください。</div>

以下の手順に従って、Databricks の Data Observability: Jobs Monitoring を有効にします。

1. [Databricks ワークスペースの Datadog-Databricks インテグレーションを構成](#configure-the-datadog-databricks-integration)します。
1. [ワークスペース内の Databricks クラスターに Datadog Agent をインストール](#install-the-datadog-agent)します。


### Datadog-Databricks インテグレーションの構成 {#configure-the-datadog-databricks-integration}

{{< tabs >}}

{{% tab "OAuth にサービスプリンシパルを使用する" %}}

<div class="alert alert-danger">新しいワークスペースインテグレーションは、OAuth を使用して認証する必要があります。Personal Access Token ですでに統合されているワークスペースは引き続き機能し、いつでも OAuth に切り替えることができます。ワークスペースで OAuth の使用を開始すると、Personal Access Token に戻すことはできません。</div>

#### Databricks でサービスプリンシパルを作成および構成する {#create-and-configure-the-service-principal-in-databricks}

1. **Databricks ワークスペース管理者**として、ワークスペースの右上隅にあるプロフィールをクリックして {{< ui >}}Settings{{< /ui >}} に移動します。
1. {{< ui >}}Identity and access{{< /ui >}}タブで、{{< ui >}}Service principals{{< /ui >}} の横にある {{< ui >}}Manage{{< /ui >}} をクリックします。
1. {{< ui >}}Add service principal{{< /ui >}} をクリックし、次に {{< ui >}}Add new{{< /ui >}} をクリックします。

   <div class="alert alert-warning">Azure Databricks の場合は、[Databricks managed] 管理タイプを選択します。Datadog は [Microsoft Entra ID managed] サービスプリンシパルをサポートしていません。</div>
1. 名前を入力し、サービスプリンシパルに対して次のワークスペースエンタイトルメントを有効にします。
   - {{< ui >}}Workspace access{{< /ui >}}
   - {{< ui >}}Databricks SQL access{{< /ui >}}
   - {{< ui >}}Admin access{{< /ui >}}: Datadog が必要とするワークスペース管理者アクセス権を付与します。これは、サービスプリンシパルを `admins` グループに追加することと同等です。

   <div class="alert alert-info"><strong>管理者アクセス</strong>エンタイトルメントを付与できない場合は、代わりに高度な構成の<a href="#permissions">権限</a>セクションで説明されているように、きめ細かなアクセス権をプロビジョニングします。</div>
1. **Add** をクリックします。

1. 新しいサービスプリンシパルの名前をクリックします。{{< ui >}}Secrets{{< /ui >}} タブで、{{< ui >}}Generate secret{{< /ui >}} をクリックします。
   1. {{< ui >}}Lifetime (days){{< /ui >}} を許可される最大値 (730) に設定します。

   1. {{< ui >}}Generate{{< /ui >}} をクリックします。

   1. クライアント ID とクライアントシークレットを控えておきます。

  {{< img src="data_jobs/databricks/client-id-secret.png" alt="Databricks では、新しい OAuth シークレットに関連付けられたクライアント ID とシークレットを表示するモーダルが表示されます。" style="width:70%;" >}}

1. {{< ui >}}Permissions{{< /ui >}} タブで、{{< ui >}}Grant access{{< /ui >}} をクリックします。新しいサービスプリンシパルを検索し、{{< ui >}}Manage{{< /ui >}} 権限を付与して、{{< ui >}}Save{{< /ui >}} をクリックします。

#### Databricks ワークスペースを Datadog に追加する {#add-the-databricks-workspace-to-datadog}

1. Datadog で、Databricks インテグレーションタイルを開きます。
1. {{< ui >}}Configure{{< /ui >}} タブで、{{< ui >}}Add Databricks Workspace{{< /ui >}} をクリックします。
1. ワークスペース名、Databricks ワークスペース URL、および生成したクライアント ID とシークレットを入力します。
   {{< img src="data_jobs/databricks/connect-workspace-form-m2m.png" alt="Datadog-Databricks インテグレーションタイルに、Databricks ワークスペースが表示されます。このワークスペースには、名前、URL、クライアント ID、およびクライアントシークレットがあります。" style="width:100%;" >}}
1. Datadog がクエリを実行するための [Databricks SQL Warehouse][19] の ID を指定します。これにより、Jobs Monitoring または [Cloud Cost Management][18] で Databricks のコストを可視化し、[Quality Monitoring][21] を強化できます。
   1. Databricks で {{< ui >}}SQL Warehouses{{< /ui >}} に移動し、Datadog が使用するウェアハウスを選択します。Pro または Serverless である必要があります。Classic Warehouses はサポートされていません。コストを削減するには、Auto Stop を 5～10 分に設定した専用の 2XS ウェアハウスを使用します。
   1. ウェアハウスの概要ページから ID をコピーし (ウェアハウスの URL の最後のセグメントでもあります)、インテグレーションタイルに入力します。
   1. ウェアハウスの {{< ui >}}Permissions{{< /ui >}} タブ (右上) で、サービスプリンシパルに `CAN USE` を付与します。
   1. サービスプリンシパルに、Unity Catalog の [システムテーブル][20] への読み取りアクセス権を付与します。{{< ui >}}SQL Editor{{< /ui >}} で、サービスプリンシパルのクライアント ID (表示名ではありません) を使用して、次のコマンドを実行します。

      ```sql
      GRANT USE CATALOG ON CATALOG system TO `<CLIENT-ID>`;
      GRANT USE SCHEMA ON CATALOG system TO `<CLIENT-ID>`;
      GRANT SELECT ON CATALOG system TO `<CLIENT-ID>`;
      ```

      <div class="alert alert-info">これらのコマンドを実行するユーザーには、 <code>MANAGE</code> ( <code>CATALOG system</code>における) の権限が必要です。</div>
1. **インテグレーションを設定する製品を選択**セクションで、Data Observability: Jobs Monitoring が {{< ui >}}Enabled{{< /ui >}} になっていることを確認します。
1. {{< ui >}}Datadog Agent Setup{{< /ui >}} セクションで、以下のいずれかを選択します。
    - [Datadog による管理 (推奨)](?tab=datadogmanagedglobalinitscriptrecommended#install-the-datadog-agent): Datadog がワークスペース内のグローバル init script を使用して Agent をインストールおよび管理します。
    - [手動](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent): [以下の手順](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent)に従って、Agent をグローバルまたは特定の Databricks クラスターにインストールするための init script をインストールおよび管理します。

[18]: https://docs.datadoghq.com/ja/cloud_cost_management/
[19]: https://docs.databricks.com/aws/en/compute/sql-warehouse/
[20]: https://docs.databricks.com/aws/en/admin/system-tables/
[21]: /ja/data_observability/quality_monitoring/data_warehouses/databricks/

{{% /tab %}}

{{% tab "Private Link 接続" %}}

Databricks ワークスペースが [Private Link 接続][25] を使用してデプロイされている場合、Datadog は Databricks API に直接アクセスできません。これには、環境内にデプロイされた [Private Action Runner][26] を使用する必要があります。

設定手順の詳細については、[Private Link 接続 (プレビュー)][15] を参照してください。

[15]: /ja/data_observability/jobs_monitoring/databricks/private_link
[25]: https://docs.databricks.com/aws/en/security/network/front-end/front-end-private-connect
[26]: https://docs.datadoghq.com/ja/actions/private_actions/

{{% /tab %}}

{{% tab "Personal Access Token (レガシー) を使用する" %}}

<div class="alert alert-danger">このオプションは、2025 年 7 月 7 日より前に作成されたワークスペースインテグレーションでのみ利用できます。新しいワークスペースインテグレーションでは、OAuth を使用して認証する必要があります。</div>

1. Databricks ワークスペースで、右上隅のプロフィールをクリックし、{{< ui >}}Settings{{< /ui >}} に移動します。左側のサイドバーで {{< ui >}}Developer{{< /ui >}} を選択します。{{< ui >}}Access tokens{{< /ui >}} の横にある {{< ui >}}Manage{{< /ui >}} をクリックします。
1. {{< ui >}}Generate new token{{< /ui >}} をクリックし、{{< ui >}}Comment{{< /ui >}} フィールドに「Datadog Integration」と入力し、{{< ui >}}Lifetime (days){{< /ui >}} の値を最大許容値 (730 日) に設定して、トークンの有効期限前に更新するリマインダーを作成します。次に {{< ui >}}Generate{{< /ui >}} をクリックします。トークンを控えておきます。

   **重要:**
   * [Datadog による init script のインストール (推奨)](?tab=datadogmanagedglobalinitscriptrecommended#install-the-datadog-agent) の場合、トークンの Principal が <strong>Workspace Admin</strong> であることを確認します。
   * 手動で init script をインストールする場合は、トークンの Principal が、監視対象の Databricks ジョブおよびクラスターに対する [CAN VIEW access][9] 権限を持っていることを確認します。

   代わりに、[公式の Databricks ドキュメント][10] に従って、[サービスプリンシパル][11] のアクセストークンを生成します。サービスプリンシパルでは、[<strong>Workspace access</strong> エンタイトルメント][17] が有効になっており、かつ、上記で説明した <strong>Workspace Admin</strong> または [CAN VIEW access][9] の権限が付与されている必要があります。
1. Datadog で、Databricks インテグレーションタイルを開きます。
1. {{< ui >}}Configure{{< /ui >}} タブで、{{< ui >}}Add Databricks Workspace{{< /ui >}} をクリックします。
1. ワークスペース名、Databricks ワークスペース URL、および生成した Databricks トークンを入力します。
   {{< img src="data_jobs/databricks/configure-workspace-form.png" alt="Datadog-Databricks インテグレーションタイルに、Databricks ワークスペースが表示されます。このワークスペースには、名前、URL、および API トークンがあります。" style="width:100%;" >}}
1. Datadog がクエリを実行するための [Databricks SQL Warehouse][19] の ID を指定します。これにより、Jobs Monitoring または [Cloud Cost Management][18] で Databricks のコストを可視化し、[Quality Monitoring][21] を強化できます。
   1. Databricks で {{< ui >}}SQL Warehouses{{< /ui >}} に移動し、Datadog が使用するウェアハウスを選択します。Pro または Serverless である必要があります。Classic Warehouses はサポートされていません。コストを削減するには、Auto Stop を 5～10 分に設定した専用の 2XS ウェアハウスを使用します。
   1. ウェアハウスの概要ページから ID をコピーし (ウェアハウスの URL の最後のセグメントでもあります)、インテグレーションタイルに入力します。
   1. ウェアハウスの {{< ui >}}Permissions{{< /ui >}} タブ (右上) で、トークンの Principal に `CAN USE` を付与します。
   1. トークンの Principal に、Unity Catalog の [システムテーブル][20] への読み取りアクセス権を付与します。{{< ui >}}SQL Editor{{< /ui >}} で、Principal のクライアント ID (表示名ではありません) を使用して、次のコマンドを実行します。

      ```sql
      GRANT USE CATALOG ON CATALOG system TO `<CLIENT-ID>`;
      GRANT USE SCHEMA ON CATALOG system TO `<CLIENT-ID>`;
      GRANT SELECT ON CATALOG system TO `<CLIENT-ID>`;
      ```

      <div class="alert alert-info">これらのコマンドを実行するユーザーには、 <code>MANAGE</code> ( <code>CATALOG system</code>における) の権限が必要です。</div>
1. **インテグレーションを設定する製品を選択**セクションで、Data Observability: Jobs Monitoring 製品が **Enabled** になっていることを確認します。
1. {{< ui >}}Datadog Agent Setup{{< /ui >}} セクションで、以下のいずれかを選択します。
    - [Datadog による管理 (推奨)](?tab=datadogmanagedglobalinitscriptrecommended#install-the-datadog-agent): Datadog がワークスペース内のグローバル init script を使用して Agent をインストールおよび管理します。
    - [手動](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent): [以下の手順](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent)に従って、Agent をグローバルまたは特定の Databricks クラスターにインストールするための init script をインストールおよび管理します。

[9]: https://docs.databricks.com/en/security/auth-authz/access-control/index.html#job-acls
[10]: https://docs.databricks.com/en/admin/users-groups/service-principals.html#manage-personal-access-tokens-for-a-service-principal
[11]: https://docs.databricks.com/en/admin/users-groups/service-principals.html#what-is-a-service-principal
[17]: https://docs.databricks.com/aws/en/security/auth/entitlements#entitlements-overview
[18]: https://docs.datadoghq.com/ja/cloud_cost_management
[19]: https://docs.databricks.com/aws/en/compute/sql-warehouse/
[20]: https://docs.databricks.com/aws/en/admin/system-tables/
[21]: /ja/data_observability/quality_monitoring/data_warehouses/databricks/


{{% /tab %}}

{{< /tabs >}}

### Datadog Agent をインストールする {#install-the-datadog-agent}

Datadog Agent は、All-Purpose クラスターまたは Job クラスターで実行される Databricks ジョブを監視するために、Databricks クラスターにインストールする必要があります。この手順は、[サーバーレスコンピューティング][4] 上のジョブを監視する場合には不要です。

{{< tabs >}}
{{% tab "Datadog による管理のグローバル init script (推奨)" %}}

Datadog は、Databricks ワークスペース内でグローバル init script をインストールおよび管理できます。Datadog Agent は、ワークスペース内のすべてのクラスターの起動時にインストールされます。

<div class="alert alert-danger">
<ul>
<li>この設定は、<strong>Standard</strong> アクセスモードの Databricks クラスターでは機能しません。これは、それらのクラスターにはグローバル init script をインストールできないためです。<strong>Standard</strong> アクセスモードのクラスターを使用している場合、Datadog では、複数のクラスターにわたって<a href="?tab=manuallyconfigureaclusterpolicy#install-the-datadog-agent">クラスターポリシーを手動で構成</a>するか、<a href="?tab=manuallyinstallonaspecificcluster#install-the-datadog-agent">特定のクラスターに手動でインストール</a>することを推奨しています。</li>
<li>Datadog が Datadog グローバル init script をインストールおよび管理するこのインストールオプションには、<strong>Workspace Admin</strong> 権限を持つ Databricks アクセストークンが必要です。CAN VIEW access 権限を持つトークンでは、Datadog が Databricks アカウントのグローバル init script を管理することはできません。</li>
</ul>
</div>

#### ワークスペースを Datadog とインテグレーションする場合 {#when-integrating-a-workspace-with-datadog}

1. **インテグレーションを設定する製品を選択**セクションで、Data Observability: Jobs Monitoring 製品が **Enabled** になっていることを確認します。
1. {{< ui >}}Datadog Agent Setup{{< /ui >}} セクションで、{{< ui >}}Managed by Datadog{{< /ui >}} トグルボタンを選択します。
1. {{< ui >}}Select API Key{{< /ui >}} をクリックして、既存の Datadog API キーを選択するか、新しい Datadog API キーを作成します。
1. (オプション) ジョブとの関連付けに使用するドライバーおよびワーカーのログを収集しない場合は、{{< ui >}}Enable Log Collection{{< /ui >}} を無効にします。
1. {{< ui >}}Save Databricks Workspace{{< /ui >}} をクリックします。
   {{< img src="data_jobs/databricks/configure-data-jobs-monitoring-new-2.png" alt="Datadog-Databricks インテグレーションタイルで、Databricks ワークスペースを追加する際の Datadog Agent セットアップを行います。Datadog は、グローバル init script をインストールおよび管理できます。" style="width:100%;" >}}

#### Datadog とすでにインテグレーションされている Databricks ワークスペースに init script を追加する場合 {#when-adding-the-init-script-to-a-databricks-workspace-already-integrated-with-datadog}

1. **Configure** タブで、ワークスペースのリストからワークスペースをクリックします。
1. {{< ui >}}Configured Products{{< /ui >}} タブをクリックします。
1. Data Observability: Jobs Monitoring 製品が **Enabled** になっていることを確認します。
1. {{< ui >}}Datadog Agent Setup{{< /ui >}} セクションで、{{< ui >}}Managed by Datadog{{< /ui >}} トグルボタンを選択します。
1. {{< ui >}}Select API Key{{< /ui >}} をクリックして、既存の Datadog API キーを選択するか、新しい Datadog API キーを作成します。
1. (オプション) ジョブとの関連付けに使用するドライバーおよびワーカーのログを収集しない場合は、{{< ui >}}Enable Log Collection{{< /ui >}} を無効にします。
1. ブラウザウィンドウの下部にある **Save Databricks Workspace** をクリックします。
   {{< img src="data_jobs/databricks/configure-data-jobs-monitoring-existing.png" alt="Datadog-Databricks インテグレーションタイルで、インテグレーションにすでに追加されている Databricks ワークスペースの Datadog Agent セットアップを行います。Datadog は、グローバル init script をインストールおよび管理できます。" style="width:100%;" >}}

オプションで、Databricks UI のクラスターの {{< ui >}}Advanced Configuration{{< /ui >}} セクションで、または Databricks API を使用して [Spark env vars][2] として以下の環境変数を構成することにより、Databricks クラスターおよび Spark パフォーマンスメトリクスにタグを追加できます。

| 変数                 | 説明                                                                                                                                                      |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| DD_TAGS                  | Databricks クラスターおよび Spark パフォーマンスメトリクスにタグを追加します。カンマまたはスペースで区切られた key:value ペア。[Datadog タグ規則][1] に従います。例: `env:staging,team:data_engineering` |
| DD_ENV                   | このクラスターからのメトリクス、トレース、およびログの `env` 環境タグを上書きします。デフォルトでは、Databricks ワークスペース名が env として使用されます。|
| DD_LOGS_CONFIG_PROCESSING_RULES | 処理ルールを使用して収集されたログをフィルタリングします。詳細については、[高度なログ収集][3] を参照してください。|


[1]: /ja/getting_started/tagging/
[2]: https://docs.databricks.com/api/workspace/clusters/edit#spark_env_vars
[3]: /ja/agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules
[4]: https://docs.databricks.com/aws/en/compute/serverless/

{{% /tab %}}

{{% tab "クラスターポリシーを手動で構成する" %}}

この方法は、**Standard** アクセスモードのクラスターに推奨されます。

**init script を作成する**

1. Databricks で、以下の内容を含む init script ファイルを [Unity Catalog ボリューム][26] に作成します。ボリュームパスを必ず控えておきます (例: `/Volumes/catalog_name/schema_name/volume_name/datadog-init-script.sh`)。

    ```shell
    #!/bin/bash

    # Download and run the latest init script
    curl -L https://install.datadoghq.com/scripts/install-databricks.sh > djm-install-script
    bash djm-install-script || true
    ```

    The script above downloads and runs the latest init script for Data Observability: Jobs Monitoring in Databricks. If you want to pin your script to a specific version, you can replace the filename in the URL with `install-databricks-0.14.0.sh` to use version `0.14.0`, for example. The source code used to generate this script, and the changes between script versions, can be found on the [Datadog Agent repository][3].

1. init script への読み取り専用権限を付与します。
    1. ボリュームレベルで、すべてのアカウントユーザーに `READ VOLUME` 権限を付与します。
    1. カタログレベルで、すべてのアカウントユーザーに `USE CATALOG` 権限を付与します。

   <div class="alert alert-info">Databricks は、Unity Catalog ボリュームの権限を、クラスターを実行している Principal ではなく、<strong>クラスター所有者</strong>に対して評価します。</div>

1. **init script を許可リストに追加する**: **Standard** アクセスモードのクラスターの場合、init script のパスを Unity Catalog の許可リストに追加する必要があります。[Databricks ドキュメント][27] の手順に従って、init script のパスを許可リストに追加します。

**コンピューティングポリシーを構成する**

1. {{< ui >}}Compute{{< /ui >}} で、{{< ui >}}Policies{{< /ui >}} タブに移動します。クラスターにすでにクラスターポリシーが適用されている場合は、その既存のポリシーに移動して編集します。このポリシーは、それを使用するすべてのクラスターに自動的に適用されるため、こちらの方が簡単な方法です。それ以外の場合は、{{< ui >}}Create Policy{{< /ui >}} をクリックして新しいポリシーを作成します。
1. init script をクラスターポリシーに追加するには、{{< ui >}}Definition{{< /ui >}} セクションで {{< ui >}}Add Definition{{< /ui >}} をクリックします。開いたモーダルで、各フィールドに入力します。
   1. {{< ui >}}Field{{< /ui >}} ドロップダウンで、{{< ui >}}init_scripts{{< /ui >}} を選択します。
   1. {{< ui >}}Source{{< /ui >}} ドロップダウンで、{{< ui >}}Volume{{< /ui >}} を選択します。
   1. {{< ui >}}Destination{{< /ui >}} の下に、init script へのボリュームパスを入力します。
   1. {{< ui >}}Add{{< /ui >}} をクリックします。
1. 環境変数を構成します。作成したクラスターポリシーに、以下の各環境変数を追加する必要があります。

   | キー                  | 説明                  |
   |----------------------|------------------------------|
   | DD_API_KEY           | [Datadog API キー][1]。  |
   | DD_SITE              | [Datadog サイト][2]。     |
   | DATABRICKS_WORKSPACE | Databricks ワークスペースの名前。これは、[Datadog-Databricks インテグレーションの手順](#configure-the-datadog-databricks-integration)で指定した名前と一致している必要があります。|

   1. 上記の各変数について、{{< ui >}}Definition{{< /ui >}} セクションで {{< ui >}}Add Definition{{< /ui >}} をクリックします。開いたモーダルで、各フィールドに入力します。
       1. {{< ui >}}Field{{< /ui >}} ドロップダウンで、{{< ui >}}spark_env_vars{{< /ui >}} を選択します。
       1. {{< ui >}}Key{{< /ui >}} フィールドに、環境変数キーを入力します。
       1. {{< ui >}}Value{{< /ui >}} フィールドに、環境変数の値を入力します。
       1. {{< ui >}}Type{{< /ui >}} ドロップダウンで、{{< ui >}}Fixed{{< /ui >}} を選択します。
       1. 機密値の露出を減らすには、{{< ui >}}Hidden{{< /ui >}} チェックボックスをオンにします。
   1. 必要に応じて、その他の init script パラメータや Datadog 環境変数 (例: `DD_ENV` や `DD_SERVICE`) を設定します。以下のパラメータを使用してスクリプトを構成できます。

      | 変数                 |  説明                                                                                                                                                      |  デフォルト |
      |--------------------------| ------------------------------------------------------------------------------------------------------------------------------------------------------------------| ---------|
      | DRIVER_LOGS_ENABLED      | Datadog で Spark ドライバーログを収集します。                                                                                                                         | false   |
      | WORKER_LOGS_ENABLED      | Datadog で Spark ワーカーログを収集します。                                                                                                                           | false   |
      | DD_TAGS                  | Databricks クラスターおよび Spark パフォーマンスメトリクスにタグを追加します。カンマまたはスペースで区切られた key:value ペア。[Datadog タグ規則][4] に従います。例: `env:staging,team:data_engineering` |         |
      | DD_ENV                   | このクラスターからのメトリクス、トレース、およびログの `env` 環境タグを上書きします。デフォルトでは、Databricks ワークスペース名が env として使用されます。                                                                                        |         |
      | DD_LOGS_CONFIG_PROCESSING_RULES | 処理ルールを使用して収集されたログをフィルタリングします。詳細については、[高度なログ収集][5] を参照してください。|         |

1. 新しいポリシーを作成する場合は {{< ui >}}Create{{< /ui >}} を、既存のポリシーを更新する場合は {{< ui >}}Save{{< /ui >}} をクリックします。既存のポリシーを更新した場合、そのポリシーを使用しているすべてのクラスターに、次回の再起動時に変更が自動的に適用されます。新しいポリシーを作成した場合は、以下の手順に従ってクラスターに適用します。

**クラスターにクラスターポリシーを適用する**

1. {{< ui >}}Compute{{< /ui >}} で、更新するクラスターを選択するか、新しいクラスターの場合は {{< ui >}}Create Compute{{< /ui >}} をクリックします。
1. 上部の {{< ui >}}Policy{{< /ui >}} ドロップダウンで、作成したポリシーを選択します。
1. {{< ui >}}Confirm{{< /ui >}} をクリックして変更を保存します。ポリシーを有効にするには、クラスターを再起動する必要があります。

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ja/getting_started/site/
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/fleet/installer/setup/djm/databricks.go
[4]: /ja/getting_started/tagging/
[5]: /ja/agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules
[26]: https://docs.databricks.com/en/connect/unity-catalog/volumes.html
[27]: https://docs.databricks.com/en/data-governance/unity-catalog/manage-privileges/allowlist#how-to-add-items-to-the-allowlist

{{% /tab %}}

{{% tab "グローバル init script を手動でインストールする" %}}

<div class="alert alert-danger">
この設定は、<strong>Standard</strong> アクセスモードの Databricks クラスターでは機能しません。Standard アクセスモードのクラスターには、グローバル init script をインストールできないためです。<strong>Standard</strong> アクセスモードのクラスターを使用している場合、Datadog では<a href="?tab=manuallyconfigureaclusterpolicy#install-the-datadog-agent">クラスターポリシーを手動で構成する</a>か<a href="?tab=manuallyinstallonaspecificcluster#install-the-datadog-agent">特定のクラスターに手動でインストールする</a>ことを推奨しています。
</div>

1. Databricks で、ページ右上の表示名 (メールアドレス) をクリックします。
1. {{< ui >}}Settings{{< /ui >}} を選択し、{{< ui >}}Compute{{< /ui >}} タブをクリックします。
1. {{< ui >}}All purpose clusters{{< /ui >}} セクションで、{{< ui >}}Global init scripts{{< /ui >}} の横にある {{< ui >}}Manage{{< /ui >}} をクリックします。
1. {{< ui >}}Add{{< /ui >}} をクリックします。スクリプトに名前を付けます。次に、{{< ui >}}Script{{< /ui >}} フィールドに以下のスクリプトをコピー＆ペーストし、プレースホルダーを実際のパラメータ値に置き換えます。

   ```shell
   #!/bin/bash

   # Required parameters
   export DD_API_KEY=<YOUR API KEY>
   export DD_SITE=<YOUR DATADOG SITE>
   export DATABRICKS_WORKSPACE="<YOUR WORKSPACE NAME>"

   # Download and run the latest init script
   curl -L https://install.datadoghq.com/scripts/install-databricks.sh > djm-install-script
   bash djm-install-script || true
   ```

   上記のスクリプトは、必要なパラメータを設定し、Databricks の Data Observability: Jobs Monitoring 用の最新の init script をダウンロードして実行します。スクリプトを特定のバージョンに固定する場合は、URL 内のファイル名を `install-databricks-0.14.0.sh` に置き換えて、バージョン `0.14.0` を使用します。たとえば、次のようにします。このスクリプトの生成に使用されたソースコードと、スクリプトのバージョン間の変更点は、[Datadog Agent リポジトリ][3] で確認できます。

1. すべての新規クラスターおよび再起動されたクラスターでスクリプトを有効にするには、{{< ui >}}Enabled{{< /ui >}} をオンにします。
   {{< img src="data_jobs/databricks/toggle.png" alt="Databricks UI、管理者設定、グローバル init script。[install-datadog-agent] という名前のスクリプトが、有効な状態でリストに表示されます。" style="width:100%;" >}}
1. {{< ui >}}Add{{< /ui >}} をクリックします。

#### 必要な init script パラメータを設定する {#set-the-required-init-script-parameters}

グローバル init script の冒頭で、init script パラメータ値を指定します。

```bash
export DD_API_KEY=<YOUR API KEY>
export DD_SITE=<YOUR DATADOG SITE>
export DATABRICKS_WORKSPACE="<YOUR WORKSPACE NAME>"
```

必要に応じて、ここで他の init script パラメータや Datadog 環境変数 (`DD_ENV` や `DD_SERVICE` など) を設定することもできます。スクリプトは、次のパラメータを使用して構成できます。

| 変数                 | 説明                                                                                                                                                      | デフォルト |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| DD_API_KEY               | [Datadog API キー][1]。                                                                                                                                       |         |
| DD_SITE                  | [Datadog サイト][2]。                                                                                                                                          |         |
| DATABRICKS_WORKSPACE     | Databricks ワークスペースの名前。これは、[Datadog-Databricks インテグレーションの手順](#configure-the-datadog-databricks-integration)で指定した名前と一致している必要があります。名前に空白が含まれる場合は、二重引用符で囲みます。|         |
| DRIVER_LOGS_ENABLED      | Datadog で Spark ドライバーログを収集します。                                                                                                                         | false   |
| WORKER_LOGS_ENABLED      | Datadog で Spark ワーカーログを収集します。                                                                                                                        | false   |
| DD_TAGS                  | Databricks クラスターおよび Spark パフォーマンスメトリクスにタグを追加します。カンマまたはスペースで区切られた key:value ペア。[Datadog タグ規則][4] に従います。例: `env:staging,team:data_engineering` |         |
| DD_ENV                   | このクラスターからのメトリクス、トレース、およびログの `env` 環境タグを上書きします。デフォルトでは、Databricks ワークスペース名が env として使用されます。                                                                                        |         |
| DD_LOGS_CONFIG_PROCESSING_RULES | 処理ルールを使用して収集されたログをフィルタリングします。詳細については、[高度なログ収集][5] を参照してください。|         |

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ja/getting_started/site/
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/fleet/installer/setup/djm/databricks.go
[4]: /ja/getting_started/tagging/
[5]: /ja/agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules

{{% /tab %}}

{{% tab "特定のクラスターに手動でインストールする" %}}

1. Databricks で、以下の内容を含む init script ファイルを [Unity Catalog ボリューム][26] に作成します。ボリュームパスを必ず控えておきます (例: `/Volumes/catalog_name/schema_name/volume_name/datadog-init-script.sh`)。

   ```shell
   #!/bin/bash

   # Download and run the latest init script
   curl -L https://install.datadoghq.com/scripts/install-databricks.sh > djm-install-script
   bash djm-install-script || true
   ```

   上記のスクリプトは、Databricks の Data Observability: Jobs Monitoring 用の最新の init script スクリプトをダウンロードして実行します。スクリプトを特定のバージョンに固定したい場合は、URL 内のファイル名を置き換えます (例えば、`install-databricks-0.14.0.sh` に置き換えると、バージョン `0.14.0` を使用できます)。このスクリプトの生成に使用されたソースコードと、スクリプトのバージョン間の変更点は、[Datadog Agent リポジトリ][3] で確認できます。

1. init script への読み取り専用権限を付与します。
    1. ボリュームレベルで、すべてのアカウントユーザーに `READ VOLUME` 権限を付与します。
    1. カタログレベルで、すべてのアカウントユーザーに `USE CATALOG` 権限を付与します。

   <div class="alert alert-info">Databricks は、Unity Catalog ボリュームの権限を、クラスターを実行している Principal ではなく、<strong>クラスター所有者</strong>に対して評価します。</div>

1. **init script を許可リストに追加します** (**Standard** アクセスモードのクラスターで必須): クラスターで **Standard** アクセスモードを使用している場合は、init script のパスを Unity Catalog の許可リストに追加する必要があります。[Databricks ドキュメント][27] の手順に従って、init script のパスを許可リストに追加します。

1. クラスター構成ページで、{{< ui >}}Advanced options{{< /ui >}} トグルをクリックします。
1. ページ下部で、{{< ui >}}Init Scripts{{< /ui >}} タブを開きます。

   {{< img src="data_jobs/databricks/init_scripts.png" alt="Databricks UI、クラスター構成の高度なオプション、Init Scripts タブ。[Destination] ドロップダウンと [Init script path] ファイルセレクター。" style="width:80%;" >}}

   - {{< ui >}}Destination{{< /ui >}} ドロップダウンで、{{< ui >}}Volume{{< /ui >}} を選択します。
   - {{< ui >}}Init script path{{< /ui >}} の下に、init script へのボリュームパスを入力します。
   - {{< ui >}}Add{{< /ui >}} をクリックします。

#### 必要な init script パラメータを設定する {#set-the-required-init-script-parameters-1}

1. Databricks のクラスター構成ページで、{{< ui >}}Advanced options{{< /ui >}} トグルをクリックします。
2. ページ下部で、{{< ui >}}Spark{{< /ui >}} タブを開きます。
   {{< img src="data_jobs/databricks/configure-databricks-cluster-init-script.png" alt="Databricks UI、クラスター構成の高度なオプション、Spark タブ。[Environment variables] というタイトルのテキストボックスに、DD_API_KEY と DD_SITE の値が含まれています。" style="width:100%;" >}}

   {{< ui >}}Environment variables{{< /ui >}} テキストボックスに、init script パラメータの値を入力します。

   ```text
   DD_API_KEY=<YOUR API KEY>
   DD_SITE=<YOUR DATADOG SITE>
   DATABRICKS_WORKSPACE=<YOUR WORKSPACE NAME>
   ```

   必要に応じて、ここで他の init script パラメータや Datadog 環境変数 (`DD_ENV` や `DD_SERVICE` など) を設定することもできます。スクリプトは、次のパラメータを使用して構成できます。

| 変数                 | 説明                                                                                                                                                      | デフォルト |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| DD_API_KEY               | [Datadog API キー][1]。                                                                                                                                       |         |
| DD_SITE                  | [Datadog サイト][2]。                                                                                                                                          |         |
| DATABRICKS_WORKSPACE     | Databricks ワークスペースの名前。これは、[Datadog-Databricks インテグレーションの手順](#configure-the-datadog-databricks-integration)で指定した名前と一致している必要があります。|         |
| DRIVER_LOGS_ENABLED      | Datadog で Spark ドライバーログを収集します。                                                                                                                         | false   |
| WORKER_LOGS_ENABLED      | Datadog で Spark ワーカーログを収集します。                                                                                                                        | false   |
| DD_TAGS                  | Databricks クラスターおよび Spark パフォーマンスメトリクスにタグを追加します。カンマまたはスペースで区切られた key:value ペア。[Datadog タグ規則][4] に従います。例: `env:staging,team:data_engineering` |         |
| DD_ENV                   | このクラスターからのメトリクス、トレース、およびログの `env` 環境タグを上書きします。デフォルトでは、Databricks ワークスペース名が env として使用されます。                                                                                         |         |
| DD_LOGS_CONFIG_PROCESSING_RULES | 処理ルールを使用して収集されたログをフィルタリングします。詳細については、[高度なログ収集][5] を参照してください。|         |


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ja/getting_started/site/
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/fleet/installer/setup/djm/databricks.go
[4]: /ja/getting_started/tagging/
[5]: /ja/agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules
[26]: https://docs.databricks.com/en/connect/unity-catalog/volumes.html
[27]: https://docs.databricks.com/en/data-governance/unity-catalog/manage-privileges/allowlist#how-to-add-items-to-the-allowlist

3. {{< ui >}}Confirm{{< /ui >}} をクリックします。

{{% /tab %}}

{{< /tabs >}}

### 実行中のクラスターを再起動する {#restart-already-running-clusters}

init script は、クラスターの起動時に Agent をインストールします。

実行中の汎用クラスターや長時間稼働するジョブクラスターは、init script で Datadog Agent をインストールするために手動で再起動する必要があります。

ジョブクラスターで実行されるスケジュール済みジョブの場合、init script は次回の実行時に Datadog Agent を自動的にインストールします。

## 検証 {#validation}

Datadog で [Data Observability: Jobs Monitoring][6] ページを表示し、すべての Databricks ジョブの一覧を確認します。

一部のジョブが表示されない場合は、[構成][9] ページを開いて、その理由を確認します。このページには、クラスターに Datadog Agent がまだ構成されていないすべての Databricks ジョブと、セットアップを完了するための手順が一覧表示されます。

## トラブルシューティング {#troubleshooting}

製品のインストール後に Jobs Monitoring にデータが表示されない場合は、次の手順に従います。

### init script が実行されない、または失敗する {#init-script-not-running-or-failing}

1. **クラスターを再起動する**: init script はクラスターの起動時にのみ実行されます。init script を追加してからクラスターを再起動したことを確認します。
1. **init script が実行されたことを確認する**: Databricks でクラスターをクリックし、{{< ui >}}Event log{{< /ui >}} タブを開きます。`INIT_SCRIPTS_STARTED` が存在しない場合、このクラスターで init script が読み込まれていません。[インストール手順](#install-the-datadog-agent)に戻り、init script がクラスターに追加されていることを確認します。
1. **init script が正常に完了したことを確認する**: イベントログで `INIT_SCRIPTS_FINISHED` アクションを見つけてクリックし、JSON を確認します。これにより、init script が失敗して終了したかどうかを確認できます。
1. **init script の失敗を調査する**: `INIT_SCRIPTS_FINISHED` に失敗が表示される場合は、[クラスターのログ配信][29] を有効にして、init script のログを任意の送信先に送信します。ログを Unity Catalog ボリュームに送信することを推奨します。
   {{< img src="data_jobs/databricks/compute_logging_config.png" alt="ログ配信先を構成するオプションがある [Logging] タブを表示した Databricks クラスター構成ページ。" style="width:100%;" >}}
   ログ配信を有効にしてクラスターを再起動した後、ログの送信先を開きます。stdout および stderr のログは、次のパスにあります。
   ```
   <cluster-log-path>/<cluster-id>/init_scripts/<cluster-id>_<script-hash>/
   ```

### init script の実行が成功した後にデータが表示されない {#data-not-appearing-after-a-successful-init-script-run}

1. **API キーの検証:** init script を手動でインストールした場合は、[API キーの検証エンドポイント][25] を使用して、スクリプトで指定した Datadog API キーが有効であることを確認します。
1. **Agent の検証:** init script によって Datadog Agent がインストールされます。正しくインストールされていることを確認するには、SSH でクラスターに接続し、Agent のステータスコマンドを実行します。
  ```shell
  sudo datadog-agent status
  ```

## 高度な構成 {#advanced-configuration}

### クラスターでのログ収集をフィルタリングする {#filter-log-collection-on-clusters}

#### 個別のクラスターからのすべてのログ収集を除外する {#exclude-all-log-collection-from-an-individual-cluster}
Databricks UI のクラスターの {{< ui >}}Advanced Configuration{{< /ui >}} セクション、または Databricks API の [Spark 環境変数][18] として、次の環境変数を構成します。

```bash
DD_LOGS_CONFIG_PROCESSING_RULES=[{\"type\": \"exclude_at_match\",\"name\": \"drop_all_logs\",\"pattern\": \".*\"}]
```

### 権限 {#permissions}
Databricks ワークスペースに接続するユーザーまたはサービスプリンシパルには、以下に説明する権限に加えて、次のワークスペースエンタイトルメントが有効になっている必要があります。

- {{< ui >}}Workspace access{{< /ui >}}
- {{< ui >}}Databricks SQL access{{< /ui >}}

#### ワークスペース権限 {#workspace-permissions}

ユーザーまたはサービスプリンシパルに対して、次のいずれかの方法を選択します。

- **ワークスペース管理者権限** (推奨): {{< ui >}}Workspace Admin{{< /ui >}} 権限を付与します。これにより、Datadog が init script のインストールと更新を自動的に管理できるようになり、誤構成のリスクが軽減されます。
- **詳細な権限**: より細かい制御が必要な場合は、ワークスペース内のすべてのジョブ、クラスター、クエリを監視できるように、以下の [ワークスペースレベルのオブジェクト][19] にこれらの最小限の権限を付与します。

  | オブジェクト                 | 権限                                                                                                                                                      |
  |--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
  | [ジョブ][20]                              | CAN VIEW
  | [コンピュート][21]                          | CAN ATTACH TO
  | [Lakeflow Declarative Pipelines][22]   | CAN VIEW
  | [クエリ][23]                            | CAN VIEW
  | [SQL ウェアハウス][24]                    | CAN MONITOR

#### コストデータ権限 {#cost-data-permissions}

さらに、Data Observability: Jobs Monitoring または [Cloud Cost Management][26] で Datadog が Databricks のコストデータにアクセスできるようにするには、[システムテーブル][27] のクエリに使用するユーザーまたはサービスプリンシパルに、次の権限が必要です。
   SQL ウェアハウスに対する - `CAN USE` 権限
   - Unity Catalog 内の [システムテーブル][27] への読み取りアクセスDatabricks で {{< ui >}}SQL Editor{{< /ui >}} を開き、サービスプリンシパルのクライアント ID (表示名ではありません) を使用して、次のコマンドを実行します。
   ```sql
   GRANT USE CATALOG ON CATALOG system TO `<CLIENT-ID>`;
   GRANT USE SCHEMA ON CATALOG system TO `<CLIENT-ID>`;
   GRANT SELECT ON CATALOG system TO `<CLIENT-ID>`;
   ```
   これらを付与するユーザーは、`CATALOG system` に対する `MANAGE` 権限を持っている必要があります。


### 実行時にスパンにタグを付ける {#tag-spans-at-runtime}

{{% djm-runtime-tagging %}}

### クラスタータグを構成する {#configure-cluster-tags}

Databricks のカスタムクラスタータグは自動的に取得され、Data Observability: Jobs Monitoring および Datadog プラットフォーム全体で利用できます。唯一の例外は Azure リソースグループのタグで、これらは自動的に取得されません。

タグを手動で追加するには、クラスターの Spark 環境変数で `DD_TAGS` 環境変数を構成します。これは Databricks のカスタムクラスタータグと同じ効果がありますが、手動で構成する必要があります。[Datadog タグの規則][28] に従って、カンマまたはスペースで区切った key:value ペアを使用します。

```text
DD_TAGS=env:staging,team:data_engineering
```

### 単発ジョブ実行のクラスターからメトリクスを集計する {#aggregate-cluster-metrics-from-one-time-job-runs}
   この構成は、ジョブのクラスターリソース使用率データを取得したい場合や、[ワンタイム実行 API エンドポイント][8] を介して実行ごとに新しいジョブとクラスターを作成する場合 (Airflow や Azure Data Factory など、Databricks 外部のオーケストレーションツールを使用する場合に一般的) に適用されます。

   [ワンタイム実行 API エンドポイント][8] を介して Databricks ジョブを送信する場合、各ジョブ実行には一意のジョブ ID が割り当てられます。これにより、エフェメラルクラスターを使用するジョブのクラスターのメトリクスをグループ化して分析することが難しくなる場合があります。同じジョブのクラスター使用率を集計し、複数回の実行にわたってパフォーマンスを評価するには、すべての `new_cluster` の `spark_env_vars` 内で `DD_JOB_NAME` 変数を、リクエストペイロードの `run_name` と同じ値に設定する必要があります。

   以下は、ワンタイムジョブ実行リクエストボディの例です。

   {{< highlight json "hl_lines=2 18" >}}
   {
      "run_name": "Example Job",
      "idempotency_token": "8f018174-4792-40d5-bcbc-3e6a527352c8",
      "tasks": [
         {
            "task_key": "Example Task",
            "description": "Description of task",
            "depends_on": [],
            "notebook_task": {
               "notebook_path": "/Path/to/example/task/notebook",
               "source": "WORKSPACE"
            },
            "new_cluster": {
               "num_workers": 1,
               "spark_version": "13.3.x-scala2.12",
               "node_type_id": "i3.xlarge",
               "spark_env_vars": {
                  "DD_JOB_NAME": "Example Job"
               }
            }
         }
      ]
   }
   {{< /highlight >}}

### Databricks Networking Restrictions がある場合の Data Observability: Jobs Monitoring のセットアップ {#set-up-data-observability-jobs-monitoring-with-databricks-networking-restrictions}
[Databricks Networking Restrictions][12] がある場合、Datadog は Databricks API にアクセスできない可能性があります。その場合、Databricks ジョブ実行のトレースやタグ、その他のメタデータを収集できません。

[IP アクセスリスト][13] で Databricks API へのアクセスを制御している場合、Datadog 固有の {{< region-param key="ip_ranges_url_webhooks" link="true" text="webhook IP addresses" >}} を許可リストに追加することで、Datadog がワークスペース内の Databricks API に接続できるようになります。Datadog に API へのアクセスを許可するため、[個々のワークスペース][16] の IP アクセスリストの構成については、Databricks のドキュメントを参照してください。

[Databricks Private Link][14] 接続を使用するワークスペースを監視するには、[Private Link Connectivity (プレビュー)][15] を参照してください。

[15]: /ja/data_observability/jobs_monitoring/databricks/private_link

## 詳細情報 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/databricks?search=databricks
[4]: https://docs.databricks.com/en/security/secrets/index.html
[6]: https://app.datadoghq.com/data-jobs/
[7]: /ja/data_jobs
[8]: https://docs.databricks.com/api/workspace/jobs/submit
[9]: https://app.datadoghq.com/data-jobs/configuration
[12]: https://docs.databricks.com/en/security/network/front-end/index.html
[13]: https://docs.databricks.com/en/security/network/front-end/ip-access-list.html
[14]: https://www.databricks.com/trust/security-features/secure-your-data-with-private-networking
[16]: https://docs.databricks.com/en/security/network/front-end/ip-access-list-workspace
[18]: https://docs.databricks.com/api/workspace/clusters/edit#spark_env_vars
[19]: https://docs.databricks.com/aws/en/security/auth/access-control#access-control-lists-overview
[20]: https://docs.databricks.com/aws/en/security/auth/access-control#job-acls
[21]: https://docs.databricks.com/aws/en/security/auth/access-control#compute-acls
[22]: https://docs.databricks.com/aws/en/security/auth/access-control#lakeflow-declarative-pipelines-acls
[23]: https://docs.databricks.com/aws/en/security/auth/access-control#query-acls
[24]: https://docs.databricks.com/aws/en/security/auth/access-control#sql-warehouse-acls
[25]: https://docs.datadoghq.com/ja/api/latest/authentication/?code-lang=curl#validate-api-key
[26]: https://docs.datadoghq.com/ja/cloud_cost_management
[27]: https://docs.databricks.com/aws/en/admin/system-tables/
[28]: /ja/getting_started/tagging/
[29]: https://docs.databricks.com/aws/en/compute/configure#compute-log-delivery