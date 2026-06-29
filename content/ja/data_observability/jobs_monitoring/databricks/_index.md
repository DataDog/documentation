---
aliases:
- /ja/data_jobs/databricks
description: 'OAuth または個人用アクセストークン認証と Datadog Agent のインストールを使用して Databricks ワークスペースの
  Data Observability: Jobs Monitoring を有効にします。'
further_reading:
- link: /data_jobs
  tag: ドキュメント
  text: 'Data Observability: Jobs Monitoring'
- link: https://www.datadoghq.com/blog/databricks-serverless-jobs-datadog/
  tag: ブログ
  text: Databricks サーバーレスジョブモニタリングを使用して、問題を検出し、コストを最適化する
title: 'Databricks の Data Observability: Jobs Monitoring を有効にする'
---
[Data Observability: Jobs Monitoring][7] は、クラスターまたはサーバーレスコンピュート上で実行される Databricks ジョブとワークフローのパフォーマンスおよび信頼性を可視化します。

## セットアップ {#setup}

<div class="alert alert-info">Databricks ワークスペースで <a href="https://docs.databricks.com/en/security/network/front-end/index.html">Networking Restrictions</a> が有効になっている場合、Datadog の {{< region-param key="ip_ranges_url_webhooks" link="true" text="webhook IP ranges" >}} を許可リストに追加します。ワークスペースがプライベートリンクを使用している場合は、以下の<strong>プライベートリンク接続</strong>タブを参照してください。</div>

以下の手順に従って、Databricks の Data Observability: Jobs Monitoring を有効にします。

1. [Databricks ワークスペースの Datadog-Databricks インテグレーションを構成](#configure-the-datadog-databricks-integration)します。
1. [Datadog Agent をワークスペース内の Databricks クラスターにインストール](#install-the-datadog-agent)します。


### Datadog-Databricks インテグレーションの構成{#configure-the-datadog-databricks-integration}

{{< tabs >}}

{{% tab "OAuth のサービスプリンシパルを使用する" %}}

<div class="alert alert-danger">新しいワークスペースインテグレーションは、OAuth を使用して認証する必要があります。すでに個人用アクセストークンで統合されているワークスペースは引き続き機能し、いつでも OAuth に切り替えることができます。ワークスペースが OAuth の使用を開始した後は、個人用アクセストークンに戻すことができません。</div>

#### Databricks でサービスプリンシパルを作成および構成する {#create-and-configure-the-service-principal-in-databricks}

1. **Databricks ワークスペース管理者**として、ワークスペースの右上隅にあるプロフィールをクリックして {{< ui >}}Settings{{< /ui >}} に移動します。
1. {{< ui >}}Identity and access{{< /ui >}} タブで、{{< ui >}}Service principals{{< /ui >}} の隣にある {{< ui >}}Manage{{< /ui >}} をクリックします。
1. {{< ui >}}Add service principal{{< /ui >}} をクリックし、その後 {{< ui >}}Add new{{< /ui >}} をクリックします。
1. 名前を入力し、その後**追加**をクリックします。

   <div class="alert alert-warning">Azure Databricks の場合は、「Databricks 管理」の管理タイプを選択します。Datadog は「Microsoft Entra ID 管理」サービスプリンシパルをサポートしていません。</div>

1. 新しいサービスプリンシパルの名前をクリックします。{{< ui >}}Secrets{{< /ui >}} タブで、{{< ui >}}Generate secret{{< /ui >}} をクリックします。
   1. {{< ui >}}Lifetime (days){{< /ui >}} を最大値 (730) に設定します。

   1. {{< ui >}}Generate{{< /ui >}} をクリックします。

   1. クライアント ID とクライアントシークレットをメモします。

  {{< img src="data_jobs/databricks/client-id-secret.png" alt="Databricks では、新しい OAuth シークレットに関連付けられたクライアント ID とシークレットを表示するモーダルが表示されます。" style="width:70%;" >}}

1. {{< ui >}}Permissions{{< /ui >}} タブで、{{< ui >}}Grant access{{< /ui >}} をクリックします。新しいサービスプリンシパルを検索し、{{< ui >}}Manage{{< /ui >}} の権限を付与して、{{< ui >}}Save{{< /ui >}} をクリックします。
1. {{< ui >}}Identity and access{{< /ui >}} タブに戻り、{{< ui >}}Groups{{< /ui >}} の隣にある {{< ui >}}Manage{{< /ui >}} をクリックします。
1. {{< ui >}}admins{{< /ui >}} グループをクリックし、{{< ui >}}Add members{{< /ui >}} をクリックして新しいサービスプリンシパルを追加します。

#### Databricks ワークスペースを Datadog に追加します。{#add-the-databricks-workspace-to-datadog}

1. Datadog で、Databricks インテグレーションタイルを開きます。
1. {{< ui >}}Configure{{< /ui >}} タブで、{{< ui >}}Add Databricks Workspace{{< /ui >}} をクリックします。
1. ワークスペース名、Databricks ワークスペース URL、および生成したクライアント ID とシークレットを入力します。
   {{< img src="data_jobs/databricks/connect-workspace-form-m2m.png" alt="Datadog-Databricks インテグレーションタイルに Databricks ワークスペースが表示されます。このワークスペースには、名前、URL、クライアント ID、およびクライアントシークレットがあります。" style="width:100%;" >}}
1. Data Observability: Jobs Monitoring または [Cloud Cost Management][18] で Databricks のコストを可視化するには、Datadog が[システムテーブル][20]をクエリするために使用できる [Databricks SQL Warehouse][19] の ID を提供します。
   - サービスプリンシパルは SQL Warehouse へのアクセス権を持っている必要があります。Warehouse の構成ページで、{{< ui >}}Permissions{{< /ui >}} (右上) に移動し、`CAN USE` の権限を付与します。
   - 次のコマンドを実行して、サービスプリンシパルに Unity Catalog [システムテーブル][20]への読み取りアクセス権限を付与します。
   ```sql
   GRANT USE CATALOG ON CATALOG system TO <service_principal>;
   GRANT SELECT ON CATALOG system TO <service_principal>;
   GRANT USE SCHEMA ON CATALOG system TO <service_principal>;
   ```
   権限を付与するユーザーは、`CATALOG system` で `MANAGE` の権限を持っている必要があります。

   -  SQL Warehouse は Pro または Serverless である必要があります。Classic Warehouses はサポートされて**いません**。コストを削減するために、Auto Stop を 5 〜 10 分に設定した 2XS ウェアハウスを推奨します。
1. **インテグレーションを設定する製品を選択する**セクションで、Data Observability: Jobs Monitoring が {{< ui >}}Enabled{{< /ui >}} であることを確認します。
1. {{< ui >}}Datadog Agent Setup{{< /ui >}} セクションで、次のいずれかを選択します
    - [Datadog 管理 (推奨)](?tab=datadogmanagedglobalinitscriptrecommended#install-the-datadog-agent): Datadog は、ワークスペース内のグローバル init スクリプトで Agent をインストールおよび管理します。
    - [手動](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent): 以下の[手順](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent)に従って、Agent をグローバルにまたは特定の Databricks クラスターにインストールするための init スクリプトをインストールおよび管理します。

[18]: https://docs.datadoghq.com/ja/cloud_cost_management/
[19]: https://docs.databricks.com/aws/en/compute/sql-warehouse/
[20]: https://docs.databricks.com/aws/en/admin/system-tables/

{{% /tab %}}

{{% tab "プライベートリンク接続" %}}

Databricks ワークスペースが[プライベートリンク接続][25]を使用してデプロイされている場合、Datadog は Databricks API に直接アクセスできません。これには、環境にデプロイされた[プライベートアクションランナー][26]を使用する必要があります。

完全なセットアップ手順については、[プライベートリンク接続 (プレビュー)][15]を参照してください。

[15]: /ja/data_observability/jobs_monitoring/databricks/private_link
[25]: https://docs.databricks.com/aws/en/security/network/front-end/front-end-private-connect
[26]: https://docs.datadoghq.com/ja/actions/private_actions/

{{% /tab %}}

{{% tab "個人用アクセストークン (レガシー) を使用する" %}}

<div class="alert alert-danger">このオプションは、2025 年 7 月 7 日以前に作成されたワークスペースインテグレーションにのみ利用可能です。新しいワークスペースインテグレーションは OAuth を使用して認証する必要があります。</div>

1. Databricks ワークスペースで、右上隅のプロフィールをクリックし、{{< ui >}}Settings{{< /ui >}} に移動します。左側のサイドバーで {{< ui >}}Developer{{< /ui >}} を選択します。{{< ui >}}Access tokens{{< /ui >}} の隣にある {{< ui >}}Manage{{< /ui >}} をクリックします。
1. {{< ui >}}Generate new token{{< /ui >}} をクリックし、{{< ui >}}Comment{{< /ui >}} フィールドに「Datadog Integration」と入力し、{{< ui >}}Lifetime (days){{< /ui >}} の値を最大許可値 (730 日) に設定し、期限切れになる前にトークンを更新するリマインダーを作成します。その後、{{< ui >}}Generate{{< /ui >}} をクリックします。トークンをメモします。

   **重要:**
   * Datadog 管理の init スクリプトインストール (推奨)[](?tab=datadogmanagedglobalinitscriptrecommended#install-the-datadog-agent) の場合、トークンのプリンシパルが<strong>ワークスペース管理者</strong>であることを確認します。
   * 手動 init スクリプトインストールの場合、モニター対象の Databricks のジョブとクラスターに対してトークンのプリンシパルが [CAN VIEW アクセス][9]権限を持っていることを確認します。

   また、[公式の Databricks ドキュメント][10]に従って[サービスプリンシパル][11]用のアクセストークンを生成することもできます。サービスプリンシパルは、[<strong>ワークスペースアクセス</strong>エンタイトルメント][17]が有効であり、上記のように<strong>ワークスペース管理者</strong>または [CAN VIEW アクセス][9]権限を持っている必要があります。
1. Datadog で、Databricks インテグレーションタイルを開きます。
1. {{< ui >}}Configure{{< /ui >}} タブで、{{< ui >}}Add Databricks Workspace{{< /ui >}} をクリックします。
1. ワークスペース名、Databricks ワークスペース URL、生成した Databricks トークンを入力します。
   {{< img src="data_jobs/databricks/configure-workspace-form.png" alt="Datadog-Databricks インテグレーションタイルに Databricks ワークスペースが表示されます。このワークスペースには、名前、URL、および API トークンがあります。" style="width:100%;" >}}
1. Data Observability: Jobs Monitoring または [Cloud Cost Management][18] で Databricks のコストを可視化するには、Datadog が[システムテーブル][20]をクエリするために使用できる [Databricks SQL Warehouse][19] の ID を提供します。

   - トークンのプリンシパルは、SQL Warehouse へのアクセス権を持っている必要があります。Warehouse 構成ページの右上にある**アクセス許可**から `CAN USE` の権限を付与します。
   - 次のコマンドを実行して、サービスプリンシパルに Unity Catalog [システムテーブル][20]への読み取りアクセス権限を付与します。
   ```sql
   GRANT USE CATALOG ON CATALOG system TO <token_principal>;
   GRANT SELECT ON CATALOG system TO <token_principal>;
   GRANT USE SCHEMA ON CATALOG system TO <token_principal>;
   ```
   権限を付与するユーザーは、`CATALOG system` で `MANAGE` の権限を持っている必要があります。
   -  SQL Warehouse は Pro または Serverless である必要があります。Classic Warehouses はサポートされて**いません**。コストを最小限に抑えるために、Auto Stop を 5 〜 10 分に設定した 2XS サイズのウェアハウスを推奨します。
1. **インテグレーションを設定する製品を選択する**セクションで、Data Observability: Jobs Monitoring 製品が**有効**であることを確認します。
1. {{< ui >}}Datadog Agent Setup{{< /ui >}} セクションで、次のいずれかを選択します
    - [Datadog 管理 (推奨)](?tab=datadogmanagedglobalinitscriptrecommended#install-the-datadog-agent): Datadog は、ワークスペース内のグローバル init スクリプトで Agent をインストールおよび管理します。
    - [手動](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent): 以下の[手順](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent)に従って、Agent をグローバルにまたは特定の Databricks クラスターにインストールするための init スクリプトをインストールおよび管理します。

[9]: https://docs.databricks.com/en/security/auth-authz/access-control/index.html#job-acls
[10]: https://docs.databricks.com/en/admin/users-groups/service-principals.html#manage-personal-access-tokens-for-a-service-principal
[11]: https://docs.databricks.com/en/admin/users-groups/service-principals.html#what-is-a-service-principal
[17]: https://docs.databricks.com/aws/en/security/auth/entitlements#entitlements-overview
[18]: https://docs.datadoghq.com/ja/cloud_cost_management
[19]: https://docs.databricks.com/aws/en/compute/sql-warehouse/
[20]: https://docs.databricks.com/aws/en/admin/system-tables/


{{% /tab %}}

{{< /tabs >}}

### Datadog Agent をインストールする {#install-the-datadog-agent}

Datadog Agent は、全用途またはジョブクラスターで実行される Databricks のジョブをモニターするために Databricks クラスターにインストールする必要があります。このステップは、[サーバーレスコンピュート][4]上のジョブをモニターすることには必要ありません。

{{< tabs >}}
{{% tab "Datadog 管理のグローバル init スクリプト (推奨)" %}}

Datadog は、Databricks ワークスペースでグローバル init スクリプトをインストールおよび管理できます。Datadog Agent は、ワークスペース内のすべてのクラスターが起動する際にインストールされます。

<div class="alert alert-danger">
<ul>
<li>このセットアップは、<strong>スタンダード</strong>アクセスモードの Databricks クラスターでは機能しません。グローバル init スクリプトはそれらのクラスターにインストールできないからです。<strong>スタンダード</strong>アクセスモードのクラスターを使用している場合、Datadog は複数のクラスターにわたって<a href="?tab=manuallyconfigureaclusterpolicy#install-the-datadog-agent">クラスターポリシーを手動で構成する</a>または<a href="?tab=manuallyinstallonaspecificcluster#install-the-datadog-agent">特定のクラスターに手動でインストールする</a>ことを推奨します。</li>
<li>このインストールオプションでは、Datadog が Datadog グローバル init スクリプトをインストールおよび管理します。Databricks アクセストークンが<strong>ワークスペース管理者</strong>の権限を持っている必要があります。CAN VIEW アクセス権限を持つトークンでは、Datadog が Databricks アカウントのグローバル init スクリプトを管理することはできません。</li>
</ul>
</div>

#### ワークスペースを Datadog と統合する場合 {#when-integrating-a-workspace-with-datadog}

1. **インテグレーションを設定する製品を選択する**セクションで、Data Observability: Jobs Monitoring 製品が**有効**であることを確認します。
1. {{< ui >}}Datadog Agent Setup{{< /ui >}} セクションで、{{< ui >}}Managed by Datadog{{< /ui >}} トグルボタンを選択します。
1. {{< ui >}}Select API Key{{< /ui >}} をクリックして、既存の Datadog API キーを選択するか、新しい Datadog API キーを作成します。
1. (オプション) ジョブと相関させるためにドライバーおよびワーカーログを収集したくない場合は、{{< ui >}}Enable Log Collection{{< /ui >}} を無効にします。
1. {{< ui >}}Save Databricks Workspace{{< /ui >}} をクリックします。
   {{< img src="data_jobs/databricks/configure-data-jobs-monitoring-new-2.png" alt="Datadog-Databricks インテグレーションタイルにおける Databricks ワークスペースを追加する場合の Datadog Agent のセットアップ。Datadog は、グローバル init スクリプトをインストールおよび管理できます。" style="width:100%;" >}}

#### Datadog と統合済みの Databricks ワークスペースに init スクリプトを追加する場合 {#when-adding-the-init-script-to-a-databricks-workspace-already-integrated-with-datadog}

1. **構成**タブで、ワークスペースのリストからワークスペースをクリックします
1. {{< ui >}}Configured Products{{< /ui >}} タブをクリックします
1. Data Observability: Jobs Monitoring 製品が**有効**になっていることを確認します。
1. {{< ui >}}Datadog Agent Setup{{< /ui >}} セクションで、{{< ui >}}Managed by Datadog{{< /ui >}} トグルボタンを選択します。
1. {{< ui >}}Select API Key{{< /ui >}} をクリックして、既存の Datadog API キーを選択するか、新しい Datadog API キーを作成します。
1. (オプション) ジョブと相関させるためにドライバーおよびワーカーログを収集したくない場合は、{{< ui >}}Enable Log Collection{{< /ui >}} を無効にします。
1. ブラウザウィンドウの下部にある **Databricks Workspace を保存**をクリックします。
   {{< img src="data_jobs/databricks/configure-data-jobs-monitoring-existing.png" alt="Datadog-Databricks インテグレーションタイルにおけるインテグレーションに追加された Databricks ワークスペースの Datadog Agent のセットアップ。Datadog は、グローバル init スクリプトをインストールおよび管理できます。" style="width:100%;" >}}

必要に応じて、Databricks UI のクラスターの {{< ui >}}Advanced Configuration{{< /ui >}} セクションで、または Databricks API で [Spark 環境変数][2]として以下の環境変数を構成することにより、Databricks クラスターおよび Spark パフォーマンスメトリクスにタグを追加できます。

| 変数                 | 説明                                                                                                                                                      |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| DD_TAGS                  | Databricks クラスターと Spark パフォーマンスメトリクスにタグを追加します。カンマまたはスペースで区切られた key:value ペア。[Datadog タグ規約][1]に従います。例: `env:staging,team:data_engineering` |
| DD_ENV                   | このクラスターからのメトリクス、トレース、およびログに `env` 環境タグを設定します。|
| DD_LOGS_CONFIG_PROCESSING_RULES | 処理ルールで収集されたログをフィルタリングします。詳細については、[高度なログ収集][3]を参照してください。|


[1]: /ja/getting_started/tagging/
[2]: https://docs.databricks.com/api/workspace/clusters/edit#spark_env_vars
[3]: /ja/agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules
[4]: https://docs.databricks.com/aws/en/compute/serverless/

{{% /tab %}}

{{% tab "クラスターポリシーを手動で構成します。" %}}

このアプローチは**スタンダード**アクセスモードのクラスターに推奨されます。

**init スクリプトを作成する**

1. Databricks で、次の内容の init スクリプトファイルを [Unity Catalog ボリューム][26]に作成します。ボリュームパスをメモしておくことを忘れないでください (例: `/Volumes/catalog_name/schema_name/volume_name/datadog-init-script.sh`)。

    ```shell
    #!/bin/bash

    # Download and run the latest init script
    curl -L https://install.datadoghq.com/scripts/install-databricks.sh > djm-install-script
    bash djm-install-script || true
    ```

    The script above downloads and runs the latest init script for Data Observability: Jobs Monitoring in Databricks. If you want to pin your script to a specific version, you can replace the filename in the URL with `install-databricks-0.14.0.sh` to use version `0.14.0`, for example. The source code used to generate this script, and the changes between script versions, can be found on the [Datadog Agent repository][3].

1. init スクリプトに読み取り専用権限を付与します。
    1. ボリュームレベルですべてのアカウントユーザーに `READ VOLUME` 権限を付与します。
    1. カタログレベルですべてのアカウントユーザーに `USE CATALOG` 権限を付与します。

1. **init スクリプトを許可リストに追加する**: **スタンダード**アクセスモードのクラスターでは、init スクリプトパスを Unity Catalog 許可リストに追加する必要があります。[Databricks のドキュメント][27]の指示に従って、init スクリプトパスを許可リストに追加します。

**コンピュートポリシーを構成する**

1. {{< ui >}}Compute{{< /ui >}} で、{{< ui >}}Policies{{< /ui >}} タブに移動します。すでにクラスターに適用済みのクラスターポリシーがある場合は、その既存のポリシーに移動して編集します。このポリシーはそれを使用するすべてのクラスターに自動的に適用されるため、より簡単なアプローチとなります。そうでない場合は、{{< ui >}}Create Policy{{< /ui >}} をクリックして新しいポリシーを作成します。
1. init スクリプトをクラスターポリシーに追加するには、{{< ui >}}Definition{{< /ui >}} セクションで {{< ui >}}Add Definition{{< /ui >}} をクリックします。開いたモーダルで、フィールドに入力します。
   1. {{< ui >}}Field{{< /ui >}} ドロップダウンで {{< ui >}}init_scripts{{< /ui >}} を選択します。
   1. {{< ui >}}Source{{< /ui >}} ドロップダウンで {{< ui >}}Volume{{< /ui >}} を選択します。
   1. {{< ui >}}Destination{{< /ui >}} で init スクリプトへのボリュームパスを入力します。
   1. {{< ui >}}Add{{< /ui >}} をクリックします。
1. 環境変数を構成します。作成したクラスターポリシーに以下の環境変数を追加する必要があります。

   | キー                  | 説明                  |
   |----------------------|------------------------------|
   | DD_API_KEY           | [Datadog API キー][1]。  |
   | DD_SITE              | Your [Datadog サイト][2]。     |
   | DATABRICKS_WORKSPACE | Databricks ワークスペースの名前。[Datadog-Databricks インテグレーションステップ](#configure-the-datadog-databricks-integration)で提供された名前と一致する必要があります。名前に空白が含まれている場合は、二重引用符で囲みます。|

   1. 上記の各変数について、{{< ui >}}Definition{{< /ui >}} セクションで {{< ui >}}Add Definition{{< /ui >}} をクリックします。開いたモーダルで、フィールドに入力します。
       1. {{< ui >}}Field{{< /ui >}} ドロップダウンで {{< ui >}}spark_env_vars{{< /ui >}} を選択します。
       1. {{< ui >}}Key{{< /ui >}} フィールドで環境変数キーを入力します。
       1. {{< ui >}}Value{{< /ui >}} フィールドで環境変数の値を入力します。
       1. {{< ui >}}Type{{< /ui >}} ドロップダウンで {{< ui >}}Fixed{{< /ui >}} を選択します。
       1. 機密性の高い値の露出を減らすために {{< ui >}}Hidden{{< /ui >}} チェックボックスをオンにします。
   1. オプションで、他の init スクリプトパラメーターや Datadog 環境変数を設定できます。例えば、`DD_ENV` および `DD_SERVICE` などです。次のパラメーターを使用してスクリプトを構成できます。

      | 変数                 |  説明                                                                                                                                                      |  デフォルト |
      |--------------------------| ------------------------------------------------------------------------------------------------------------------------------------------------------------------| ---------|
      | DRIVER_LOGS_ENABLED      | Datadog でスパークドライバーログを収集します。                                                                                                                         | false   |
      | WORKER_LOGS_ENABLED      | Datadog でスパークワーカーログを収集します。                                                                                                                           | false   |
      | DD_TAGS                  | カンマまたはスペースで区切られた key:value ペアを使用して、Databricks クラスターおよび Spark パフォーマンスメトリクスにタグを追加します。[Datadog タグ規約][4]に従います。例: `env:staging,team:data_engineering` |         |
      | DD_ENV                   | このクラスターからのメトリクス、トレース、およびログに `env` 環境タグを設定します。                                                                                         |         |
      | DD_LOGS_CONFIG_PROCESSING_RULES | 処理ルールで収集されたログをフィルタリングします。詳細については、[高度なログ収集][5]を参照してください。|         |

1. 新しいポリシーを作成する場合は {{< ui >}}Create{{< /ui >}} をクリックし、既存のポリシーを更新する場合は {{< ui >}}Save{{< /ui >}} をクリックします。既存のポリシーを更新する場合、そのポリシーを使用しているすべてのクラスターは次回の再起動時に自動的に変更を適用します。新しいポリシーを作成する場合は、以下の手順に従ってクラスターに適用します。

**クラスターポリシーをクラスターに適用する**

1. {{< ui >}}Compute{{< /ui >}}で、更新したいクラスターを選択するか、新しいクラスター用に {{< ui >}}Create Compute{{< /ui >}} をクリックします。
1. 上部の {{< ui >}}Policy{{< /ui >}} ドロップダウンで、作成したクラスターポリシーを選択します。
1. {{< ui >}}Confirm{{< /ui >}} をクリックして変更を保存します。ポリシーを有効にするには、クラスターを再起動する必要があります。

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ja/getting_started/site/
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/fleet/installer/setup/djm/databricks.go
[4]: /ja/getting_started/tagging/
[5]: /ja/agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules
[26]: https://docs.databricks.com/en/connect/unity-catalog/volumes.html
[27]: https://docs.databricks.com/en/data-governance/unity-catalog/manage-privileges/allowlist#how-to-add-items-to-the-allowlist

{{% /tab %}}

{{% tab "グローバル init スクリプトを手動でインストールする" %}}

<div class="alert alert-danger">
このセットアップは、<strong>スタンダード</strong>アクセスモードの Databricks クラスターでは機能しません。グローバル init スクリプトはそれらのクラスターにインストールできないからです。<strong>スタンダード</strong>アクセスモードのクラスターを使用している場合、Datadog は<a href="?tab=manuallyconfigureaclusterpolicy#install-the-datadog-agent">クラスターポリシーを手動で構成する</a>または<a href="?tab=manuallyinstallonaspecificcluster#install-the-datadog-agent">特定のクラスターに手動でインストールする</a>ことを推奨します。
</div>

1. Databricks で、ページの右上隅にある表示名 (メールアドレス) をクリックします。
1. {{< ui >}}Settings{{< /ui >}} を選択し、{{< ui >}}Compute{{< /ui >}} タブをクリックします。
1. {{< ui >}}All purpose clusters{{< /ui >}} セクションで、{{< ui >}}Global init scripts{{< /ui >}}の隣にある {{< ui >}}Manage{{< /ui >}} をクリックします。
1. {{< ui >}}Add{{< /ui >}} をクリックします。スクリプトに名前を付けます。その後、{{< ui >}}Script{{< /ui >}} フィールドに以下のスクリプトをコピーして貼り付け、プレースホルダーをパラメーター値に置き換えることを忘れないでください。

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

   上記のスクリプトは必要なパラメーターを設定し、Databricks の Data Observability: Jobs Monitoring の最新の init スクリプトをダウンロードして実行します。特定のバージョンにスクリプトを固定したい場合は、URL 内のファイル名を `install-databricks-0.14.0.sh` に置き換えてバージョン `0.14.0` を使用することができます。このスクリプトを生成するために使用されたソースコードと、スクリプトバージョン間の変更については、[Datadog Agent リポジトリ][3]で確認できます。

1. すべての新しいクラスターと再起動したクラスターでスクリプトを有効にするには、{{< ui >}}Enabled{{< /ui >}} に切り替えます。
   {{< img src="data_jobs/databricks/toggle.png" alt="Databricks UI、管理設定、グローバル init スクリプト。「install-datadog-agent」というスクリプトが、有効になっているトグルを持つリストに含まれます。" style="width:100%;" >}}
1. {{< ui >}}Add{{< /ui >}} をクリックします。

#### 必要な init スクリプトパラメーターを設定する {#set-the-required-init-script-parameters}

グローバル init スクリプトの最初に init スクリプトパラメーターの値を指定します。

```bash
export DD_API_KEY=<YOUR API KEY>
export DD_SITE=<YOUR DATADOG SITE>
export DATABRICKS_WORKSPACE="<YOUR WORKSPACE NAME>"
```

オプションとして、ここで `DD_ENV` や `DD_SERVICE` などの他の init スクリプトパラメーターおよび Datadog 環境変数を設定することもできます。以下のパラメーターを使用してスクリプトを構成できます。

| 変数                 | 説明                                                                                                                                                      | デフォルト |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| DD_API_KEY               | [Datadog API キー][1]。                                                                                                                                       |         |
| DD_SITE                  | [Datadog サイト][2]。                                                                                                                                          |         |
| DATABRICKS_WORKSPACE     | Databricks ワークスペースの名前。[Datadog-Databricks インテグレーションステップ](#configure-the-datadog-databricks-integration)で提供された名前と一致する必要があります。名前に空白が含まれている場合は、二重引用符で囲みます。|         |
| DRIVER_LOGS_ENABLED      | Datadog でスパークドライバーログを収集します。                                                                                                                         | false   |
| WORKER_LOGS_ENABLED      | Datadog でスパークワーカーログを収集します。                                                                                                                        | false   |
| DD_TAGS                  | Databricks クラスターと Spark パフォーマンスメトリクスにタグを追加します。カンマまたはスペースで区切られた key:value ペア。[Datadog タグ規約][4]に従います。例: `env:staging,team:data_engineering` |         |
| DD_ENV                   | このクラスターからのメトリクス、トレース、およびログに `env` 環境タグを設定します。                                                                                         |         |
| DD_LOGS_CONFIG_PROCESSING_RULES | 処理ルールで収集されたログをフィルタリングします。詳細については、[高度なログ収集][5]を参照してください。|         |

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ja/getting_started/site/
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/fleet/installer/setup/djm/databricks.go
[4]: /ja/getting_started/tagging/
[5]: /ja/agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules

{{% /tab %}}

{{% tab "特定のクラスターに手動でインストールする" %}}

1. Databricks で、次の内容の init スクリプトファイルを [Unity Catalog ボリューム][26]に作成します。ボリュームパスをメモしておくことを忘れないでください (例: `/Volumes/catalog_name/schema_name/volume_name/datadog-init-script.sh`)。

   ```shell
   #!/bin/bash

   # Download and run the latest init script
   curl -L https://install.datadoghq.com/scripts/install-databricks.sh > djm-install-script
   bash djm-install-script || true
   ```

   上記のスクリプトは、Databricks の Data Observability: Jobs Monitoring の最新の init スクリプトをダウンロードして実行します。特定のバージョンにスクリプトを固定したい場合は、URL 内のファイル名を置き換えることができます (例: バージョン `0.14.0` を使用するための `install-databricks-0.14.0.sh`)。このスクリプトを生成するために使用されたソースコードと、スクリプトバージョン間の変更については、[Datadog Agent リポジトリ][3]で確認できます。

1. **init スクリプトを許可リストに追加する** (**スタンダード**アクセスモードクラスターに必要): クラスターが**スタンダード**アクセスモードを使用している場合、init スクリプトのパスを Unity Catalog 許可リストに追加する必要があります。[Databricks のドキュメント][27]の指示に従って、init スクリプトパスを許可リストに追加します。

1. クラスター構成ページで、{{< ui >}}Advanced options{{< /ui >}} トグルをクリックします。
1. ページ下部の {{< ui >}}Init Scripts{{< /ui >}} タブに移動します。

   {{< img src="data_jobs/databricks/init_scripts.png" alt="Databricks UI、クラスター構成の高度なオプション、Init スクリプトタブ。「Destination」ドロップダウンと「Init スクリプトパス」ファイルセレクター。" style="width:80%;" >}}

   - {{< ui >}}Destination{{< /ui >}} ドロップダウンで {{< ui >}}Volume{{< /ui >}} を選択します。
   - {{< ui >}}Init script path{{< /ui >}} で init スクリプトへのボリュームパスを入力します。
   - {{< ui >}}Add{{< /ui >}} をクリックします。

#### 必要な init スクリプトパラメーターを設定する {#set-the-required-init-script-parameters-1}

1. Databricks のクラスター構成ページで、{{< ui >}}Advanced options{{< /ui >}} トグルをクリックします。
2. ページ下部の {{< ui >}}Spark{{< /ui >}} タブに移動します。
   {{< img src="data_jobs/databricks/configure-databricks-cluster-init-script-quoted.png" alt="Databricks UI、クラスター構成の高度なオプション、Spark タブ。「環境変数」というタイトルのテキストボックスには、DD_API_KEY と DD_SITE の値が含まれます。" style="width:100%;" >}}

   {{< ui >}}Environment variables{{< /ui >}} テキストボックスに、init スクリプトパラメーターの値を入力します。

   ```text
   DD_API_KEY=<YOUR API KEY>
   DD_SITE=<YOUR DATADOG SITE>
   DATABRICKS_WORKSPACE="<YOUR WORKSPACE NAME>"
   ```

   オプションとして、ここで `DD_ENV` や `DD_SERVICE` などの他の init スクリプトパラメーターおよび Datadog 環境変数を設定することもできます。以下のパラメーターを使用してスクリプトを構成できます。

| 変数                 | 説明                                                                                                                                                      | デフォルト |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| DD_API_KEY               | [Datadog API キー][1]。                                                                                                                                       |         |
| DD_SITE                  | [Datadog サイト][2]。                                                                                                                                          |         |
| DATABRICKS_WORKSPACE     | Databricks ワークスペースの名前。[Datadog-Databricks インテグレーションステップ](#configure-the-datadog-databricks-integration)で提供された名前と一致する必要があります。名前に空白が含まれている場合は、二重引用符で囲みます。|         |
| DRIVER_LOGS_ENABLED      | Datadog でスパークドライバーログを収集します。                                                                                                                         | false   |
| WORKER_LOGS_ENABLED      | Datadog でスパークワーカーログを収集します。                                                                                                                        | false   |
| DD_TAGS                  | Databricks クラスターと Spark パフォーマンスメトリクスにタグを追加します。カンマまたはスペースで区切られた key:value ペア。[Datadog タグ規約][4]に従います。例: `env:staging,team:data_engineering` |         |
| DD_ENV                   | このクラスターからのメトリクス、トレース、およびログに `env` 環境タグを設定します。                                                                                         |         |
| DD_LOGS_CONFIG_PROCESSING_RULES | 処理ルールで収集されたログをフィルタリングします。詳細については、[高度なログ収集][5]を参照してください。|         |


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

### すでに実行中のクラスターを再起動する {#restart-already-running-clusters}

init スクリプトは、クラスターが起動する際に Agent をインストールします。

すでに実行中の all-purpose クラスターまたは long-lived ジョブクラスターは、init スクリプトが Datadog Agent をインストールするために手動で再起動する必要があります。

ジョブクラスターで実行されるスケジュールされたジョブについては、init スクリプトが次回の実行時に自動的に Datadog Agent をインストールします。

## 検証 {#validation}

Datadog で [Data Observability: Jobs Monitoring][6] ページを表示すると、Databricks のすべてのジョブリストが表示されます。

一部のジョブが表示されない場合は、[構成][9]ページに移動して理由を確認してください。このページには、Agent がクラスターにまだ構成されていないすべての Databricks ジョブがリストされており、セットアップを完了するためのガイダンスが含まれています。

## トラブルシューティング {#troubleshooting}

製品をインストールした後、DJM にデータが表示されない場合は、以下の手順に従います。

1. **API キーの検証:** init スクリプトが手動でインストールされたもののクラスターデータが DJM 製品に表示されない場合は、[API key エンドポイントを検証する][25]を使用して、スクリプトに指定された Datadog API キーが有効であることを確認します。
1. **エージェントの検証:** init スクリプトが Datadog Agent をインストールします。正しくインストールされていることを確認するために、SSH でクラスターに接続し、Agent ステータスコマンドを実行します。
  ```shell
  sudo datadog-agent status
  ```

## 高度な構成 {#advanced-configuration}

### クラスターでログ収集をフィルタリングする {#filter-log-collection-on-clusters}

#### 個々のクラスターからすべてのログ収集を除外する {#exclude-all-log-collection-from-an-individual-cluster}
Databricks UI のクラスターの {{< ui >}}Advanced Configuration{{< /ui >}} セクションで、または Databricks API の [Spark 環境変数][18]として、次の環境変数を構成します。

```bash
DD_LOGS_CONFIG_PROCESSING_RULES=[{\"type\": \"exclude_at_match\",\"name\": \"drop_all_logs\",\"pattern\": \".*\"}]
```

### 権限 {#permissions}
Databricks ワークスペースに接続するユーザーまたはサービスプリンシパルに、{{< ui >}}Workspace Admin{{< /ui >}} 権限を付与します。これにより、Datadog は init スクリプトのインストールと更新を自動的に管理でき、構成ミスのリスクが軽減されます。

より詳細な制御が必要な場合は、ワークスペース内のすべてのジョブ、クラスター、およびクエリを引き続きモニターできるように、次の[ワークスペースレベルのオブジェクト][19]にこれらの最小限の権限を付与します。

| オブジェクト                 | 権限                                                                                                                                                      |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ジョブ                              | [CAN VIEW][20]
| コンピュート                          | [CAN ATTACH TO][21]
| Lakeflow Declarative Pipelines   | [CAN VIEW][22]
| クエリ                            | [CAN VIEW][23]
| SQL ウェアハウス                    | [CAN MONITOR][24]

さらに、Datadog が Data Observability: Jobs Monitoring または [Cloud Cost Management][26] で Databricks コストデータにアクセスするには、[システムテーブル][27]をクエリするために使用されるユーザーまたはサービスプリンシパルに次の権限が必要です。
   - `CAN USE` 権限 (SQL ウェアハウス)。
   - Unity Catalog 内の[システムテーブル][27]に対する読み取りアクセス。これは次のように付与できます。
   ```sql
   GRANT USE CATALOG ON CATALOG system TO <service_principal>;
   GRANT SELECT ON CATALOG system TO <service_principal>;
   GRANT USE SCHEMA ON CATALOG system TO <service_principal>;
   ```
   権限を付与するユーザーは、`CATALOG system` で `MANAGE` の権限を持っている必要があります。


### ランタイムでのタグスパン {#tag-spans-at-runtime}

{{% djm-runtime-tagging %}}

### 1 回限りのジョブ実行からクラスターメトリクスを集約する {#aggregate-cluster-metrics-from-one-time-job-runs}
   この構成は、ジョブに関するクラスターリソース使用状況データを取得し、[1 回限りの実行 API エンドポイント][8]を介して各実行のために新しいジョブとクラスターを作成する場合に適用されます (Databricks の外部で Airflow や Azure Data Factory などのオーケストレーションツールを使用する場合によく適用されます)。

   [1 回限りの実行 API エンドポイント][8]を介して Databricks ジョブを送信する場合、各ジョブ実行には一意のジョブ ID が付与されます。これにより、エフェメラルクラスターを使用するジョブのクラスターメトリクスをグループ化して分析することが難しくなる場合があります。同じジョブからのクラスター利用率を集約し、複数回の実行にわたるパフォーマンスを評価するには、すべての `new_cluster` の `spark_env_vars` 内に `DD_JOB_NAME` 変数を設定し、リクエストペイロードの `run_name` と同じ値にする必要があります。

   1 回限りのジョブ実行リクエスト本文の例は次のとおりです。

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

### Databricks Networking Restrictions を使用した Data Observability: Jobs Monitoring の設定 {#set-up-data-observability-jobs-monitoring-with-databricks-networking-restrictions}
[Databricks Networking Restrictions][12] により、Datadog は Databricks API にアクセスできない場合があり、これにより、Databricks ジョブ実行のトレース、タグ、およびその他のメタデータの収集ができなくなります。

[IP アクセスリスト][13]で Databricks API アクセスを制御している場合は、許可リスト Datadog の特定の {{< region-param key="ip_ranges_url_webhooks" link="true" text="webhook IP addresses" >}} を許可すると、Datadog がワークスペース内の Databricks API に接続できるようになります。Datadog API アクセスを提供するための[個別のワークスペース][16]の IP アクセスリストの構成については、Databricks のドキュメントを参照してください。

[Databricks プライベートリンク][14]接続を使用するワークスペースをモニターするには、[プライベートリンク接続 (プレビュー)][15]を参照してください。

[15]: /ja/data_observability/jobs_monitoring/databricks/private_link

## 参考資料 {#further-reading}

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