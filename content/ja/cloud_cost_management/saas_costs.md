---
disable_toc: false
further_reading:
- link: /cloud_cost_management/
  tag: ドキュメント
  text: Cloud Cost Management
- link: /cloud_cost_management/aws
  tag: ドキュメント
  text: AWS の請求に関する洞察を得る
- link: /cloud_cost_management/azure
  tag: ドキュメント
  text: Azure の請求に関する洞察を得る
- link: /cloud_cost_management/google_cloud
  tag: ドキュメント
  text: Google Cloud の請求に関する洞察を得る
- link: /cloud_cost_management/custom
  tag: ドキュメント
  text: カスタムコストに関する洞察を得る
- link: https://www.datadoghq.com/blog/total-cost-of-service-ownership-ccm/
  tag: ブログ
  text: サービスに関連するクラウドや SaaS のコストを迅速かつ包括的に分析する
is_beta: true
private: true
title: SaaS コストインテグレーション
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では Cloud Cost Management はサポートされていません。</div>
{{< /site-region >}}

{{< beta-callout url="#" btn_hidden="true" >}}
SaaS Cost Integrations are in public beta.
{{< /beta-callout >}}

## 概要

SaaS Cost Integrations allow you to send cost data **directly from your providers** by configuring the accounts associated with your cloud cost data in Datadog.

{{< partial name="cloud_cost/cost-integrations.html" >}}

</br>

If your provider is not supported, use [Custom Costs][1] to upload any cost data source to Datadog and understand the total cost of your services.

## セットアップ

To use SaaS Cost Integrations, you must configure [Cloud Cost Management][2] for AWS, Azure, or Google Cloud.

各クラウドプロバイダーのドキュメントを参照してください。

{{< partial name="cloud_cost/getting-started.html" >}}

</br>

Navigate to [**Infrastructure > Cloud Costs > Settings > Accounts**][8] and click **Configure** on a provider to collect cost data.

{{< img src="cloud_cost/saas_costs/all_accounts.png" alt="Add your accounts with AWS, Azure, Google Cloud to collect cost data. You can also add your accounts for Fastly, Snowflake, Confluent Cloud, MongoDB, Databricks, OpenAI, and Twilio" style="width:100%" >}}

{{< tabs >}}
{{% tab "Databricks" %}}

1. Datadog の [Databricks インテグレーションタイル][101]に移動し、**Add Account** をクリックします。
2. Databricks インスタンスのデータウェアハウスに対応する `System Tables SQL Warehouse ID` を入力して、システムテーブルの請求データをクエリします。
3. **Resources** セクションで、各アカウントのトグルをクリックして `Databricks Cost Data Collection` を有効にします。
4. **Save** をクリックします。

過去 15 か月間の Databricks コストデータは、24 時間後に Cloud Cost Management でアクセスできます。各 SaaS Cost インテグレーションで収集されたデータにアクセスするには、[収集データセクション](#data-collected)を参照してください。

{{< img src="cloud_cost/saas_costs/databricks_setup.png" alt="Databricks とインテグレーションしてコストデータを収集します。" style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/databricks

{{% /tab %}}
{{% tab "Confluent Cloud" %}}

1. Confluent Cloud の組織管理者ロールで API キーを作成または取得します。
2. Datadog の [Confluent Cloud インテグレーションタイル][101]に移動し、**Add Account** をクリックします。
3. Confluent Cloud アカウント名、API キー、API シークレットを入力し、オプションでタグを指定します。
4. **Additional Options** セクションで、`Collecting Billing Data` のトグルをクリックします。
5. **Save** をクリックします。

過去 15 か月間の Confluent Cloud コストデータは 24 時間後に Cloud Cost Management でアクセスできます。各 SaaS Cost インテグレーションで収集されたデータにアクセスするには、[収集データセクション](#data-collected)を参照してください。

{{< img src="cloud_cost/saas_costs/confluent_setup.png" alt="Confluent とインテグレーションしてコストデータを収集します。" style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/confluent-cloud

{{% /tab %}}
{{% tab "MongoDB" %}}

1. [Create an API token][101] in MongoDB with `Organizational Billing Viewer` permissions, and add `Organizational Read Only` permissions for cluster resource tags.
2. Datadog の [MongoDB Cost Management インテグレーションタイル][102]に移動し、**Add New** をクリックします。
3. MongoDB アカウント名、公開キー、秘密キー、組織 ID を入力し、オプションでタグを指定します。
4. **Save** をクリックします。

過去 15 か月間の MongoDB コストデータは、24 時間後に Cloud Cost Management でアクセスできます。各 SaaS Cost インテグレーションで収集されたデータにアクセスするには、[収集データセクション](#data-collected)を参照してください。

{{< img src="cloud_cost/saas_costs/mongodb_setup.png" alt="MongoDB とインテグレーションしてコストデータを収集します。" style="width:100%" >}}

[101]: https://www.mongodb.com/docs/cloud-manager/reference/user-roles/#organization-roles
[102]: https://app.datadoghq.com/integrations/mongodb-cost-management

{{% /tab %}}
{{% tab "Snowflake" %}}

1. Datadog の [Snowflake インテグレーションタイル][101]に移動し、**Add Snowflake Account** をクリックします。
2. 例えば、`https://xyz12345.us-east-1.snowflakecomputing.com` のように、Snowflake アカウントの URL を入力します。
3. **Connect your Snowflake account** セクションで、Cloud Cost Management で Snowflake を有効にするトグルをクリックします。
4. `User Name` フィールドに Snowflake のユーザー名を入力します。
5. Create a Datadog-specific role and user to monitor Snowflake.

   Snowflake で以下を実行してカスタムロールを作成します。

   ```shell
   -- Create a new role intended to monitor Snowflake usage.
   create role DATADOG;

   -- Grant privileges on the SNOWFLAKE database to the new role.
   grant imported privileges on database SNOWFLAKE to role DATADOG;

   -- Grant usage to your default warehouse to the role DATADOG.
   grant usage on warehouse <WAREHOUSE> to role DATADOG;

   -- If you have cost usage collection enabled, ensure that your credentials have permission to view the ORGANIZATION_USAGE schema.
   grant role orgadmin to role DATADOG

   -- Create a user.
   create user DATADOG_USER
   LOGIN_NAME = DATADOG_USER
   password = <PASSWORD>
   default_warehouse = <WAREHOUSE>
   default_role = DATADOG

   -- Grant the monitor role to the user.
   grant role DATADOG to user <USER>
   ```

4. キーと値のペア認証を構成します。

   - [公式 Snowflake ドキュメント][102]に従って秘密鍵を生成し、**Upload Key** をクリックして秘密キーファイルをアップロードします。
   - [公式 Snowflake ドキュメント][103]に従って公開キーを生成します。
   - [公式 Snowflake ドキュメント][104]に従って、ステップ 5 で作成したユーザーに公開キーを割り当てます。

5. **Save** をクリックします。

過去 15 か月分の Snowflake コストデータは、24 時間後に Cloud Cost Management でアクセスできます。各 SaaS Cost インテグレーションで収集されたデータにアクセスするには、[収集データセクション](#data-collected)を参照してください。

{{< img src="cloud_cost/saas_costs/snowflake_setup.png" alt="Snowflake とインテグレーションしてコストデータを収集します。" style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/snowflake-web
[102]: https://docs.snowflake.com/en/user-guide/key-pair-auth#generate-the-private-key
[103]: https://docs.snowflake.com/en/user-guide/key-pair-auth#generate-a-public-key
[104]: https://docs.snowflake.com/en/user-guide/key-pair-auth#assign-the-public-key-to-a-snowflake-user

{{% /tab %}}


{{% tab "Elastic Cloud" %}}

1. Go to the [API Key][102] section in your Elastic Cloud organization's settings.
2. Click **Create New Key**.
3. Choose a **Name** and **Expiration Date** for your API key.
4. Select the **Billing Admin** role.
5. Click **Create Key** to generate the key.
6. Go to the [Elastic Cloud integration tile][101] in Datadog
7. Click **Add Account**.
8. Enter your **Elastic Cloud Organization ID** and **Billing API Key** in the account table.

Your Elastic Cloud cost data for the past 15 months can be accessed in Cloud Cost Management after 24 hours. To access the available data collected by each SaaS Cost Integration, see the [Data Collected section](#data-collected).

{{< img src="cloud_cost/saas_costs/elasticcloud_setup.png" alt="Integrate with Elastic Cloud to collect cost data." style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/elastic-cloud-ccm
[102]: https://cloud.elastic.co/account/keys

{{% /tab %}}

{{% tab "OpenAI" %}}

1. OpenAI のアカウント設定で [API キーを作成][101]します。
2. Datadog の [OpenAI インテグレーションタイル][102]に移動し、**Add Account** をクリックします。
3. OpenAI のアカウント名を入力し、API キーを入力し、オプションでタグを指定します。
4. **Resources** セクションで、各アカウントのトグルをクリックして、`OpenAI Billing Usage Data Collection` を有効にします。
5. **Save** をクリックします。

過去 15 か月の OpenAI コストデータは、24 時間後に Cloud Cost Management でアクセスできます。各 SaaS Cost インテグレーションで収集されたデータにアクセスするには、[収集データセクション](#data-collected)を参照してください。

{{< img src="cloud_cost/saas_costs/openai_setup.png" alt="OpenAI とインテグレーションしてコストデータを収集します。" style="width:100%" >}}

[101]: https://platform.openai.com/docs/quickstart/account-setup
[102]: https://app.datadoghq.com/integrations/openai

{{% /tab %}}
{{% tab "Fastly" %}}

1. Fastly の [Personal API tokens][101] ページで、少なくとも `"global:read"` スコープと `"Billing"` ロールを持つ API トークンを作成します。
2. Datadog の [Fastly インテグレーションタイル][102]に移動し、**Add Account** をクリックします。
3. Enter your Fastly account name and API token.
4. `Collect Billing Data` のチェックボックスをクリックします。
5. **Save** をクリックします。

過去 15 か月間の Fastly コストデータは、24 時間後に Cloud Cost Management でアクセスできます。各 SaaS Cost インテグレーションで収集されたデータにアクセスするには、[収集データセクション](#data-collected)を参照してください。

{{< img src="cloud_cost/saas_costs/fastly_setup.png" alt="Fastly とインテグレーションしてコストデータを収集します。" style="width:100%" >}}

[101]: https://manage.fastly.com/account/personal/tokens
[102]: https://app.datadoghq.com/integrations/fastly

{{% /tab %}}
{{% tab "Twilio" %}}

1. Datadog の [Twilio インテグレーションタイル][101]に移動し、**Add Account** をクリックします。
2. **Resources** セクションで、各アカウントのトグルをクリックして、`Twilio in Cloud Cost Management` を有効にします。
3. Twilio アカウントの `Account SID` を入力します。
4. **Save** をクリックします。

過去 15 か月の Twilio コストデータは、24 時間後に Cloud Cost Management でアクセスできます。各 SaaS Cost インテグレーションで収集されたデータにアクセスするには、[収集データセクション](#data-collected)を参照してください。

{{< img src="cloud_cost/saas_costs/twilio_setup.png" alt="Twilio とインテグレーションしてコストデータを収集します。" style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/twilio

{{% /tab %}}
{{< /tabs >}}

## 収集データ

コストデータは、[**Cloud Costs Analytics** ページ][3]、[Cloud Costs Tag Explorer][4]、[ダッシュボード][5]、[ノートブック][6]、[モニター][7]で確認できます。また、これらのコストメトリクスを他のクラウドコストメトリクスや可観測性メトリクスと組み合わせることもできます。

次の表は、各 SaaS Cost インテグレーションに関連付けられたすぐに使えるタグの非網羅的なリストです。

{{< tabs >}}
{{% tab "Databricks" %}}

| タグ名 | タグの説明 |
|---|---
| `record_id` | このレコードの一意の ID。 |
| `account_id` | このレポートが生成されたアカウントの ID。 |
| `workspace_id` | この使用量が関連付けられたワークスペースの ID。 |
| `cloud` | この使用量が関連するクラウド。指定できる値は AWS、AZURE、GCP です。 |
| `custom_tags` | 使用状況に適用されるカスタムタグで、通常は追加のメタデータや分類のためのキーと値のペアです。 |
| `usage_metadata` | 使用量に関連するメタデータで、使用量タイプ、サービスカテゴリー、その他の関連情報などの詳細が含まれる場合があります。 |

{{% /tab %}}
{{% tab "Confluent Cloud" %}}

| タグ名 | タグの説明 |
|---|---
| `resource_id` | Confluent リソースの一意の識別子。 |
| `resource_name` | Confluent リソースの名前。 |
| `environment_id` | 環境の一意の識別子。 |
| `network_access_type` | クラスターのネットワークアクセスタイプ。指定できる値は `INTERNET`、`TRANSIT_GATEWAY`、`PRIVATE_LINK`、`PEERED_VPC` です。 |
| `product` | 製品名。指定できる値には `KAFKA`、`CONNECT`、`KSQL`、`AUDIT_LOG`、`STREAM_GOVERNANCE`、`CLUSTER_LINK`、`CUSTOM_CONNECT`、`FLINK`、`SUPPORT_CLOUD_BASIC`、`SUPPORT_CLOUD_DEVELOPER`、`SUPPORT_CLOUD_BUSINESS`、および `SUPPORT_CLOUD_PREMIER` が含まれます。 |

| タグ名 | タグの説明 |
|---|---|
| `invoice_id` | 請求書の一意の識別子。 |
| `status` | 支払いの状態。 |
| `mongo_org_id` | MongoDB の組織 ID。 |
| `cluster_name` | 請求が発生したクラスターの名前。 |
| `group_id` | 明細が関連付けられているプロジェクトの ID。 |
| `replica_set_name` | 明細が関連付けられているレプリカセットの名前。 |
| `resource_tags` | ユーザーが設定したクラスターの任意のタグ (通常はキーと値のペア)。 |

{{% /tab %}}
{{% tab "Snowflake" %}}

| タグ名 | タグの説明 |
|---|---|
| `organization_name` | 組織の名前。 |
| `contract_number` | 組織の Snowflake 契約番号。 |
| `account_name` | 使用量が消費されたアカウントの名前。 |
| `account_locator` | 使用量が消費されたアカウントのロケータ。 |
| `region` | アカウントが存在する地域の名前。 |
| `service_level` | Snowflake アカウントのサービスレベル (エディション) (Standard、Enterprise、または Business Critical)。 |
| `balance_source` | 毎日の使用量の支払いに使用される資金の出所。出所は以下のいずれかになります。<br>- **capacity**: 組織のキャパシティコミットメントに残っているクレジットで支払われる使用量。<br>- **rollover**: ロールオーバークレジットで支払われる使用量。組織がキャパシティコミットメントを更新すると、未使用のクレジットが新しい契約の残高にロールオーバークレジットとして追加されます。<br>- **free usage**: 組織に提供された無料クレジットでカバーされる使用量。<br>- **overage**: オンデマンド価格で支払われる使用量。これは、組織がキャパシティ、ロールオーバー、および無料クレジットを使い果たした場合に発生します。<br>- **rebate**: 他の組織とデータを共有したときに組織に付与されたクレジットでカバーされる使用量。 |
| `service_type` | 使用タイプ。指定できるサービスタイプは以下の通りです。<br>- **automatic_clustering**: 自動クラスタリングを参照してください。<br>- **cloud_services**: クラウドサービスのクレジット使用を参照してください。<br>- **data_transfer**: データ転送コストを理解するを参照してください。<br>- **logging**: ログおよびトレースの概要を参照してください。<br>- **materialized_view**: マテリアライズドビューの操作を参照してください。<br>- **replication**: 複数アカウント間のレプリケーションとフェイルオーバーの概要を参照してください。<br>- **query_acceleration**: クエリアクセラレーションサービスの使用を参照してください。<br>- **search_optimization**: 検索最適化サービスを参照してください。<br>- **serverless_task**: タスクの概要を参照してください。<br>- **snowpipe**: Snowpipe を参照してください。<br>- **snowpipe_streaming**: Snowpipe Streaming を参照してください。<br>- **storage**: ストレージコストを理解するを参照してください。<br>- **warehouse_metering**: 仮想ウェアハウスのクレジット使用を参照してください。これはサーバーレスまたはクラウドサービスのコンピュート利用を示すものではありません。 |
| `rating_type` | レコードの使用量がどのように評価されるか、または価格設定されるかを示します。指定できる値は以下の通りです。<br>- **compute**<br>- **data_transfer**<br>- **storage**<br>- **その他** |
| `billing_type` | 課金またはクレジットの内容を示します。指定できる請求タイプは以下の通りです。<br>- **consumption**: コンピュートクレジット、ストレージコスト、データ転送コストに関連する使用量。<br>- **rebate**: 他の組織とデータを共有したときに組織に付与されたクレジットでカバーされる使用量。<br>- **priority support**: 優先サポートサービスの料金。この料金はアカウントではなく、契約に付随しています。<br>- **vps_deployment_fee**: 仮想プライベート Snowflake デプロイの料金。<br>- **support_credit**: Snowflake サポートが Snowflake の問題に起因する課金を取り消すためにアカウントに入金したクレジット。 |

{{% /tab %}}
{{% tab "Elastic Cloud" %}}
| Tag Name | Tag Description |
|---|---
| `name` | The unique identifier of the Elastic Cloud resource. |
| `price_per_hour` | The cost of the Elastic Cloud resource per hour. |
| `kind` | The type of resource. |

{{% /tab %}}
{{% tab "MongoDB" %}}

{{% /tab %}}
{{% tab "OpenAI" %}}

| タグ名 | タグの説明 |
|---|---|
| `organization_id` | 組織の一意の識別子。 |
| `project_name` | プロジェクトの名前。 |
| `organization_name` | 組織の名前。 |

{{% /tab %}}
{{% tab "Fastly" %}}

| タグ名 | タグの説明 |
|---|---|
| `service_no` | 内部サービス番号。 |
| `aria_invoice_id` | Aria の請求書 ID。 |
| `rate_schedule_no` | 料金スケジュールの内部 ID。 |
| `rate_schedule_tier_no` | 料金スケジュール階層の内部 ID。 |
| `usage_type_no` | 使用タイプに関連付けられた ID。 |
| `usage_type_cd` | 使用タイプの名前。 |
| `plan_no` | プランに関連付けられた ID。 |
| `Plan_name` | プランの名前。 |
| `client_service_id` | クライアント固有のサービス識別子。 |
| `service_name` | Fastly サービスの名前。 |

{{% /tab %}}
{{% tab "Twilio" %}}

| タグ名 | タグの説明 |
|---|---|
| `account_sid` | Twilio アカウントを識別する英数字文字列。 |
| `category` | 使用カテゴリー。詳細については、[使用カテゴリー][101]を参照してください。 |
| `count_unit` | カウントを計測する単位 (例: 通話なら通話単位、SMS ならメッセージ単位)。 |
| `usage_unit` | 使用量を計測する単位 (例: 通話なら分単位、SMS ならメッセージ単位)。 |

[101]: https://www.twilio.com/docs/usage/api/usage-record#usage-categories

{{% /tab %}}
{{< /tabs >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/cloud_cost_management/custom
[2]: /ja/cloud_cost_management
[3]: https://app.datadoghq.com/cost/analytics
[4]: https://app.datadoghq.com/cost/tags?cloud=custom
[5]: /ja/dashboards
[6]: /ja/notebooks
[7]: /ja/monitors/types/cloud_cost
[8]: https://app.datadoghq.com/cost/settings/accounts