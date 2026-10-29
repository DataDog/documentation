---
aliases:
- /ja/cloud_cost_management/saas_costs
disable_toc: false
further_reading:
- link: /cloud_cost_management/
  tag: ドキュメント
  text: Cloud Cost Management
- link: /cloud_cost_management/setup/aws
  tag: ドキュメント
  text: AWS の請求に関する情報を得る
- link: /cloud_cost_management/setup/azure
  tag: ドキュメント
  text: Azure の請求に関する情報を得る
- link: /cloud_cost_management/setup/google_cloud
  tag: ドキュメント
  text: Google Cloud の請求に関する情報を得る
- link: /cloud_cost_management/setup/oracle
  tag: ドキュメント
  text: Oracle の請求に関する情報を得る
- link: /cloud_cost_management/setup/custom
  tag: ドキュメント
  text: カスタムコストに関する情報を得る
- link: https://www.datadoghq.com/blog/total-cost-of-service-ownership-ccm/
  tag: ブログ
  text: サービスに関連するクラウドや SaaS のコストを迅速かつ包括的に分析する
- link: https://www.datadoghq.com/blog/cursor-cloud-cost-management/
  tag: ブログ
  text: Datadog Cloud Cost Management で Cursor コストを管理する
title: SaaS および AI コスト
---
## 概要{#overview}

SaaS および AI コストでは、Datadog のクラウドコストデータに関連付けられているアカウントを構成することで、**プロバイダーから直接**コストデータを送信できます。

{{< card-grid >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=snowflake#configure-your-saas-accounts" src="integrations_logos/snowflake_small.svg" alt="snowflake" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=databricks#configure-your-saas-accounts" src="integrations_logos/databricks_small.svg" alt="databricks" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=openai#configure-your-saas-accounts" src="integrations_logos/openai_small.svg" alt="openai" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=anthropic#configure-your-saas-accounts" src="integrations_logos/anthropic_small.svg" alt="anthropic" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=cursor#configure-your-saas-accounts" src="integrations_logos/cursor_small.svg" alt="cursor" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=temporalcloud#configure-your-saas-accounts" src="integrations_logos/temporal_small.svg" alt="temporal cloud" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=github#configure-your-saas-accounts" src="integrations_logos/github_small.svg" alt="github" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=confluentcloud#configure-your-saas-accounts" src="integrations_logos/confluent-cloud_small.svg" alt="confluent cloud" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=mongodb#configure-your-saas-accounts" src="integrations_logos/mongodb_small.svg" alt="mongodb" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=elasticcloud#configure-your-saas-accounts" src="integrations_logos/elastic-cloud_small.svg" alt="elastic cloud" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=fastly#configure-your-saas-accounts" src="integrations_logos/fastly_small.svg" alt="fastly" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=twilio#configure-your-saas-accounts" src="integrations_logos/twilio_small.svg" alt="twilio" >}}
{{< /card-grid >}}

ご使用のプロバイダーがサポートされていない場合は、[カスタムコスト][1]を使用して任意のコストデータソースを Datadog にアップロードし、サービスの総コストを把握します。現時点では、米ドル (USD) の SaaS コストのみがサポートされています。

## セットアップ{#setup}

[**Cloud Cost**] (クラウドコスト) > [**Settings**] (設定) に移動して [[**Accounts**] (アカウント)][8] を選択し、コストデータを収集するプロバイダーの [{{< ui >}}Configure{{< /ui >}}] (構成) をクリックします。

{{< img src="cloud_cost/saas_costs/all_accounts.png" alt="コストデータを収集する AWS、Azure、Google Cloud のアカウントを追加します。Fastly、Snowflake、Confluent Cloud、MongoDB、Databricks、OpenAI、Twilio、GitHub、Cursor、Temporal Cloud のアカウントを追加することもできます。" style="width:100%" >}}

{{< tabs >}}

{{% tab "Snowflake" %}}

1. [Snowflake アカウントの URL][102] を見つけます。
   {{< img src="integrations/snowflake/snowflake_account_url.png" alt="Snowflake UI でアカウント URL をコピーするオプションが選択されているアカウントメニュー" style="width:100%;" >}}
2. Datadog の [Snowflake インテグレーションタイル][101]に移動し、[{{< ui >}}Add Snowflake Account{{< /ui >}}] (Snowflake アカウントを追加) をクリックします。
3. [{{< ui >}}Account URL{{< /ui >}}] (アカウント URL) フィールドに Snowflake アカウントの URL を入力します。例: `https://xyz12345.us-east-1.snowflakecomputing.com`。
4. [{{< ui >}}Connect your Snowflake account{{< /ui >}}] (Snowflake アカウントの接続) セクションで、トグルをクリックして Cloud Cost Management で Snowflake を有効にします。
5. [{{< ui >}}User Name{{< /ui >}}] (ユーザー名) フィールドに Snowflake のユーザー名を入力します。
6. [Snowflake インテグレーション][103]ページのステップ 4 に従って、Snowflake を監視するための Datadog 専用のロールとユーザーを作成します。
7. [Snowflake インテグレーション][103]ページのステップ 5 に従って、キー値ペア認証を構成します。
8. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

過去 6 か月間の Snowflake コストデータは、24 時間以内に Cloud Cost Management で利用可能になります。各 SaaS コストインテグレーションによって収集された利用可能なデータにアクセスするには、[収集されたデータのセクション](#data-collected)を参照してください。

**Snowflake クエリタグ**

[Snowflake のクエリタグ][105]は、クエリに関連付けることができる強力なメタデータ文字列です。[Snowflake Cost Management インテグレーション][101]は、Snowflake インテグレーションタイルのカンマ区切りの許可リストに含まれている [JSON 解析可能][106]なクエリタグを取り込みます。

たとえば、組織が Snowflake のコンピューティングコストを `team` と `application` ディメンションでグループ化する場合、特定のチームのアプリケーションに対して Snowflake クエリを次のようにタグ付けすることを選択できます。

```
ALTER SESSION SET QUERY_TAG = '{"team": "devops", "application": "CI_job_executor"}';
```
{{< img src="cloud_cost/saas_costs/snowflake_query_tags_example.png" alt="team および application クエリタグでコストをグループ化する。" style="width:100%" >}}

その結果、`team` および `application` クエリタグ付きで実行されたすべてのクエリのコストは、それらのコンセプトに帰属します。

Cost Management 内でクエリタグを使用するには、以下を確認してください。

- `query_tag` 文字列は JSON 解析可能である必要があります。具体的には、この文字列がネイティブの `PARSE_JSON` 関数で処理可能であることを意味します。

- Snowflake インテグレーションタイルでキーの許可リストを指定する必要があります。これらのキーは、JSON 形式の `query_tag` フィールドの最初のレイヤーにマッピングされます。この許可リストはカンマ区切りの文字列リストの形式で表示されます (例: `tag_1,tag_2,tag_3`)。文字列には、英数字、アンダースコア、ハイフン、ピリオドのみが含まれるようにしてください。この情報は、Snowflake タイルの [{{< ui >}}Resources Collected{{< /ui >}}] (収集されたリソース) > [{{< ui >}}Cloud Cost Management{{< /ui >}}] (クラウドコスト) > [{{< ui >}}Collected Query Tags{{< /ui >}}] (収集されたクエリ) から入力できます。

**注**: データ量を考慮してクエリタグを選択してください。適切なクエリタグとは、グループのカーディナリティが低から中程度のものです (例: team、user、service)。グループのカーディナリティが高いクエリタグ (ジョブ実行に関連付けられた一意の UUID など) を選択すると、データ取り込みとフロントエンドレンダリングの両方でボトルネックの問題が発生する可能性があります。

**Snowflake CCM オブジェクトタグ**

オブジェクトタグは、監査可能性とコスト分析を強化するために Snowflake オブジェクトに付与できる、ユーザー定義の文字列です。たとえばチームごとにコストを追跡するには、ウェハウスを使用する該当するチームのタグをウェアハウスに付けます。

すべてのオブジェクトタグ設定は [Snowflake][104] 内で行われます。

注:
- **タグの継承**: Snowflake オブジェクトは階層構造に従っており、CCM インテグレーションはコストデータを送信する際に継承されたタグを考慮します。

{{< img src="cloud_cost/saas_costs/snowflake_setup.png" alt="コストデータ収集のための Snowflake とのインテグレーション。" style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/snowflake-web
[102]: https://docs.snowflake.com/en/user-guide/organizations-connect
[103]: /ja/integrations/snowflake-web/#cloud-cost-management
[104]: https://docs.snowflake.com/en/user-guide/object-tagging
[105]: https://docs.snowflake.com/en/sql-reference/parameters#query-tag
[106]: https://docs.snowflake.com/en/sql-reference/functions/parse_json

{{% /tab %}}

{{% tab "Databricks" %}}

1. Datadog の [Databricks インテグレーションタイル][101]に移動し、[{{< ui >}}Configure{{< /ui >}}] (構成) をクリックします。
2. Databricks サービスプリンシパルに対応するワークスペース名、URL、クライアント ID、クライアントシークレットを入力します。
3. [{{< ui >}}Select products to set up integration{{< /ui >}}] (インテグレーションをセットアップする製品の選択) セクションで、各アカウントのトグルをクリックして Databricks `Cloud Cost Management` を有効にします。
4. Databricks インスタンスのデータウェアハウスに対応する `System Tables SQL Warehouse ID` を入力して、システムテーブルの請求データをクエリします。
5. [{{< ui >}}Save Databricks Workspace{{< /ui >}}] (Databricks ワークスペースを保存) をクリックします。

サービスプリンシパルには、Unity Catalog 内の [システムテーブル](https://docs.databricks.com/aws/en/admin/system-tables/)への読み取りアクセス権が必要です。Databricks で {{< ui >}}SQL Editor{{< /ui >}} を開き、サービスプリンシパルのクライアント ID (表示名ではない) を使用して、次のコマンドを実行します。

```sql
GRANT USE CATALOG ON CATALOG system TO `<CLIENT-ID>`;
GRANT USE SCHEMA ON CATALOG system TO `<CLIENT-ID>`;
GRANT SELECT ON CATALOG system TO `<CLIENT-ID>`;
```

過去 15 か月分の Databricks コストデータは、24 時間後に Cloud Cost Management でアクセスできるようになります。各 SaaS コストインテグレーションによって収集された利用可能なデータにアクセスするには、[収集されたデータのセクション](#data-collected)を参照してください。

{{< img src="cloud_cost/saas_costs/databricks_setup_1.png" alt="コストデータ収集のための Databricks とのインテグレーション。" style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/databricks

{{% /tab %}}


{{% tab "OpenAI" %}}

<div class="alert alert-danger">Cloud Cost Management の OpenAI コストデータを収集するには、<strong>管理者スコープの API キーが必要です</strong>。プロジェクトスコープの API キーではコストデータを収集できません。</div>

1. OpenAI アカウント設定で [admin API キー][103]を作成します。
   - [OpenAI Account][104] にログインします。
   - [[Admin Keys] ページ][105] に移動するか、[{{< ui >}}API keys{{< /ui >}}] の下の [{{< ui >}}Organization settings{{< /ui >}}] に移動して、[{{< ui >}}Admin keys{{< /ui >}}] タブを選択します。
   - [{{< ui >}}Create a new secret key{{< /ui >}}] をクリックし、作成された admin API キーをコピーします。
2. Datadog の [OpenAI インテグレーションタイル][102]に移動し、[{{< ui >}}Add Account{{< /ui >}}] (アカウントを追加) をクリックします。
3. OpenAI のアカウント名を入力し、admin API キーを入力し、オプションでタグを指定します。
4. [{{< ui >}}Resources{{< /ui >}}] (リソース) セクションで各アカウントのトグルをクリックして、`OpenAI Billing Usage Data Collection` を有効にします。
5. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

過去 15 か月分の OpenAI コストデータは、24 時間後に Cloud Cost Management でアクセスできるようになります。各 SaaS コストインテグレーションによって収集された利用可能なデータにアクセスするには、[収集されたデータのセクション](#data-collected)を参照してください。

{{< img src="cloud_cost/saas_costs/openai_setup.png" alt="コストデータ収集のための OpenAI とのインテグレーション。" style="width:100%" >}}

[102]: https://app.datadoghq.com/integrations/openai
[103]: https://platform.openai.com/docs/api-reference/admin-api-keys
[104]: https://platform.openai.com/
[105]: https://platform.openai.com/settings/organization/admin-keys

{{% /tab %}}

{{% tab "Anthropic" %}}

### 1. Admin API キーの生成 {#1-generate-an-admin-api-key}

まず、Anthropic から [Admin API キー](https://docs.anthropic.com/en/api/administration-api)を取得します。このキーにより、組織全体の使用量およびコストのレポートにアクセス可能になります。

1. 組織の設定に移動するか、Anthropic アカウント管理者に連絡して、新しい Admin API キーを作成します。
2. API キーを安全な場所にコピーします。

### 2. Datadog インテグレーションの構成 {#2-configure-the-datadog-integration}

1. Datadog で [**[Integrations] (インテグレーション) > [Anthropic Usage and Costs] (Anthropic の使用量とコスト)**](https://app.datadoghq.com/integrations?integrationId=anthropic-usage-and-costs) に移動します。
2. [{{< ui >}}Configure{{< /ui >}}] (構成) タブの [{{< ui >}}Account details{{< /ui >}}] (アカウントの詳細) で、Anthropic から取得した {{< ui >}}Admin API Key{{< /ui >}} を貼り付けます。
3. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

構成を保存すると、Datadog はこのキーを使用して Anthropic の使用量およびコストのエンドポイントのポーリングを開始し、ご使用の環境内のメトリクスを取り込みます。

**注**: Anthropic Enterprise アカウントとプラットフォームアカウントの両方のコストを追跡するには、セットアップ手順を繰り返して、API キーの種類ごとに個別のエントリを追加してください。標準のプラットフォーム使用量には [Admin API キー](https://docs.anthropic.com/en/api/administration-api)を使用し、Anthropic Enterprise の使用量には Enterprise Analytics API キーを使用します。

{{% /tab %}}

{{% tab "Cursor" %}}

<div class="alert alert-warning">Cursor Admin API キーを生成するには、Enterprise プランとチーム管理者ロールが必要です。Standard チームプランアカウントでは、アクセス拒否エラーが返されます。</div>

### 1. Admin API キーの生成 {#1-generate-an-admin-api-key-1}

まず、Cursor から Admin API キーを取得します。このキーにより、チーム全体の使用量およびコストのレポートにアクセス可能になります。

1. Cursor ダッシュボードで、**[Settings] > [Advanced] > [Admin API Keys]** に移動します。
2. 新しい Admin API キーを作成し、安全な場所にコピーします。

### 2. Datadog インテグレーションの構成 {#2-configure-the-datadog-integration-1}

1. Datadog で、**[Integrations] (インテグレーション) > [Cursor]**[101] に移動します。
2. [{{< ui >}}Configure{{< /ui >}}] (構成) タブの [{{< ui >}}Account details{{< /ui >}}] (アカウントの詳細) で、Cursor から取得した {{< ui >}}Admin API Key{{< /ui >}} を貼り付けます。
3. [{{< ui >}}Resources{{< /ui >}}] (リソース) セクションで各アカウントのトグルをクリックして、`Cursor in Cloud Cost Management` を有効にします。
4. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

構成を保存すると、Datadog はこのキーを使用して Cursor の使用量およびコストのエンドポイントのポーリングを開始し、ご使用の環境内のメトリクスを取り込みます。過去 15 か月分の Cursor コストデータは、24 時間後に Cloud Cost Management でアクセスできるようになります。各 SaaS コストインテグレーションによって収集された利用可能なデータにアクセスするには、[収集されたデータのセクション](#data-collected)を参照してください。

[101]: https://app.datadoghq.com/integrations/cursor

{{% /tab %}}

{{% tab "Temporal Cloud" %}}

<div class="alert alert-warning">Temporal Cloud Billing API キーを生成するには、<strong>Finance Admin</strong> または <strong>Account Owner</strong> ロールが付与されているサービスアカウントが必要です。Metrics Read-Only ロールと Account Admin ロールでは、Billing API にアクセスできません。</div>

### 1. Billing API キーの生成 {#1-generate-a-billing-api-key}

1. Temporal Cloud で、**[Settings] > [Service Accounts] > [Create Service Account]** に移動します。
2. サービスアカウントに **Finance Admin** または **Account Owner** ロールを割り当てます。
3. サービスアカウントの API キーを生成し、安全な場所にコピーします。Temporal Cloud では、キーは一度しか表示されません。

### 2. Datadog インテグレーションの構成 {#2-configure-the-datadog-integration-2}

1. Datadog で、**[Integrations] (インテグレーション) > [Temporal Cloud Cost Management]**[110] に移動します。
2. [{{< ui >}}Install Integration{{< /ui >}}] (インテグレーションをインストール) をクリックし、次に [{{< ui >}}Configure{{< /ui >}}] (構成) をクリックします。
3. [{{< ui >}}Add Account{{< /ui >}}] (アカウントを追加) をクリックし、Temporal Cloud の Billing API キーを貼り付けます。
4. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

構成を保存すると、Datadog はこのキーを使用して Temporal Cloud Billing API のポーリングを開始し、ご使用の環境内のメトリクスを取り込みます。Temporal Cloud のコストデータは、25～30 時間以内に Cloud Cost Management でアクセスできるようになります。各 SaaS コストインテグレーションによって収集された利用可能なデータにアクセスするには、[収集されたデータのセクション](#data-collected)を参照してください。

[110]: https://app.datadoghq.com/integrations/temporal-cloud-costs

{{% /tab %}}

{{% tab "GitHub" %}}

1. GitHub の [Personal Access Tokens][109] ページで、`manage_billing:enterprise` および `read:org` スコープを持つ個人用アクセストークン (クラシック) を作成します。
2. Datadog の [GitHub Costs タイル][108]に移動します。
3. [{{< ui >}}Add New{{< /ui >}}] (新規追加) をクリックします。
4. アカウント名、個人用アクセストークン、エンタープライズ名 (`enterprise-name` 形式)、および適切なタグを入力します。
5. チェックマークボタンをクリックして、このアカウントを保存します。

過去 15 か月分の GitHub コストデータは、24 時間後に Cloud Cost Management でアクセスできるようになります。各 SaaS コストインテグレーションによって収集された利用可能なデータにアクセスするには、[収集されたデータのセクション](#data-collected)を参照してください。

{{< img src="cloud_cost/saas_costs/github_setup.png" alt="コストデータ収集のための GitHub とのインテグレーション。" style="width:100%" >}}

[108]: https://app.datadoghq.com/integrations/github-costs
[109]: https://github.com/settings/tokens

{{% /tab %}}

{{% tab "Confluent Cloud" %}}

1. Confluent Cloud の [billing admin][102] ロールで API キーを作成または取得します。
2. Datadog の [Confluent Cloud インテグレーションタイル][101]に移動し、[{{< ui >}}Add Account{{< /ui >}}] (アカウントを追加) をクリックします。
3. Confluent Cloud アカウント名、API キー、API シークレットを入力し、オプションでタグを指定します。
4. [{{< ui >}}Resources{{< /ui >}}] (リソース) セクションで [{{< ui >}}Collect cost data to view in Cloud Cost Management{{< /ui >}}] (Cloud Cost Management で表示するコストデータを収集する) のトグルをクリックします。
5. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

Confluent Cloud のコストデータは、セットアップから 24 時間後に Cloud Cost Management で利用可能になります。このデータには、Confluent billing API が提供する最大期間である 12 か月分の履歴が自動的に含まれます。今後 3 か月にわたってデータは徐々に拡大し、15 か月分の履歴をカバーするようになります。各 SaaS コストインテグレーションによって収集された利用可能なデータにアクセスするには、[収集されたデータのセクション](#data-collected)を参照してください。

コストのクラスターレベルのタグやビジネスメタデータタグを収集する場合は、Schema Registry API キーとシークレットを追加できます。詳細については、[Confluent Cloud でのスキーマ管理][103]を参照してください。

{{< img src="cloud_cost/saas_costs/confluent_setup_1.png" alt="コストデータ収集のための Confluent とのインテグレーション。" style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/confluent-cloud
[102]: https://docs.confluent.io/cloud/current/security/access-control/rbac/predefined-rbac-roles.html#billingadmin-role
[103]: https://docs.confluent.io/cloud/current/get-started/schema-registry.html#quick-start-for-schema-management-on-ccloud

{{% /tab %}}
{{% tab "MongoDB" %}}

1. MongoDB で [API トークンを作成][101]し、`Organizational Billing Viewer` 権限を付与し、クラスターのリソースタグに対する `Organizational Read Only` 権限を追加します。
2. Datadog の [MongoDB Cost Management インテグレーションタイル][102]に移動し、[{{< ui >}}Add New{{< /ui >}}] (新規追加) をクリックします。
3. MongoDB アカウント名、公開キー、秘密キー、組織 ID を入力し、オプションでタグを指定します。
4. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

過去 15 か月分の MongoDB コストデータは、24 時間後に Cloud Cost Management でアクセスできるようになります。各 SaaS コストインテグレーションによって収集された利用可能なデータにアクセスするには、[収集されたデータのセクション](#data-collected)を参照してください。

{{< img src="cloud_cost/saas_costs/mongodb_setup.png" alt="コストデータ収集のための MongoDB とのインテグレーション。" style="width:100%" >}}

[101]: https://www.mongodb.com/docs/cloud-manager/reference/user-roles/#organization-roles
[102]: https://app.datadoghq.com/integrations/mongodb-cost-management

{{% /tab %}}

{{% tab "Elastic Cloud" %}}

1. Elastic Cloud 組織の設定にある [API Key][102] セクションに移動します。
2. [{{< ui >}}Create New Key{{< /ui >}}] をクリックします。
3. API キーの {{< ui >}}Name{{< /ui >}} と {{< ui >}}Expiration Date{{< /ui >}} を選択します。
4. {{< ui >}}Billing Admin{{< /ui >}} ロールを選択します。
5. {{< ui >}}Create Key{{< /ui >}} をクリックしてキーを生成します。
6. Datadog の [Elastic Cloud インテグレーションタイル][101]に移動します。
7. [{{< ui >}}Add Account{{< /ui >}}] (アカウントを追加) をクリックします。
8. アカウントテーブルに {{< ui >}}Elastic Cloud Organization ID{{< /ui >}} と {{< ui >}}Billing API Key{{< /ui >}} を入力します。

過去 15 か月分の Elastic Cloud コストデータは、24 時間後に Cloud Cost Management でアクセスできるようになります。各 SaaS コストインテグレーションによって収集された利用可能なデータにアクセスするには、[収集されたデータのセクション](#data-collected)を参照してください。

{{< img src="cloud_cost/saas_costs/elasticcloud_setup.png" alt="コストデータ収集のための Elastic Cloud とのインテグレーション。" style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/elastic-cloud-ccm
[102]: https://cloud.elastic.co/account/keys

{{% /tab %}}

{{% tab "Fastly" %}}

1. Fastly の [Personal API tokens][101] ページで、少なくとも `"global:read"` スコープと `"Billing"` ロールを使用して API トークンを作成します。
2. Datadog の [Fastly cost management インテグレーションタイル][102]に移動し、[{{< ui >}}Add New{{< /ui >}}] (新規追加) をクリックします。
3. Fastly アカウント名と API トークンを入力します。
4. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

過去 15 か月分の Fastly コストデータは、24 時間後に Cloud Cost Management でアクセスできるようになります。各 SaaS コストインテグレーションによって収集された利用可能なデータにアクセスするには、[収集されたデータのセクション](#data-collected)を参照してください。

{{< img src="cloud_cost/saas_costs/fastly_setup_1.png" alt="コストデータ収集のための Fastly とのインテグレーション。" style="width:100%" >}}

[101]: https://manage.fastly.com/account/personal/tokens
[102]: https://app.datadoghq.com/integrations/fastly-cost-management

{{% /tab %}}
{{% tab "Twilio" %}}

1. Datadog の [Twilio インテグレーションタイル][101]に移動し、[{{< ui >}}Add Account{{< /ui >}}] (アカウントを追加) をクリックします。
2. [{{< ui >}}Resources{{< /ui >}}] (リソース) セクションで各アカウントのトグルをクリックして、`Twilio in Cloud Cost Management` を有効にします。
3. Twilio アカウントの {{< ui >}}Account SID{{< /ui >}} を入力します。
4. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

過去 15 か月分の Twilio コストデータは、24 時間後に Cloud Cost Management でアクセスできるようになります。各 SaaS コストインテグレーションによって収集された利用可能なデータにアクセスするには、[収集されたデータのセクション](#data-collected)を参照してください。

{{< img src="cloud_cost/saas_costs/twilio_setup.png" alt="コストデータ収集のための Twilio とのインテグレーション。" style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/twilio

{{% /tab %}}
{{< /tabs >}}

## 収集されたデータ {#data-collected}

コストデータは、[**Cloud Cost Explorer** ページ][3]、[Cloud Cost Tag Explorer][4]、[ダッシュボード][5]、[ノートブック][6]、[モニター][7] で確認できます。また、これらのコストメトリクスを他の[クラウドコストメトリクス][2]や可観測性メトリクスと組み合わせることもできます。

次の表は、各 SaaS Cost インテグレーションに関連付けられているすぐに利用可能なタグの非網羅的なリストです。

{{< tabs >}}
{{% tab "Snowflake" %}}

<table>
  <thead>
    <tr>
      <th style="width: 200px;">タグ名</th>
      <th>タグの説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>account_locator</code></td>
      <td>使用量が消費されたアカウントのロケータ。</td>
    </tr>
    <tr>
      <td><code>account_name</code></td>
      <td>使用量が消費されたアカウントの名前。</td>
    </tr>
    <tr>
      <td><code>balance_source</code></td>
      <td>毎日の使用量の支払いに使用される資金の出所。出所は以下のいずれかになります。<br>- <b>capacity</b>: 組織のキャパシティコミットメントに残っているクレジットで支払われる使用量。<br>- <b>rollover</b>: ロールオーバークレジットで支払われる使用量。組織がキャパシティコミットメントを更新すると、未使用のクレジットが新しい契約の残高にロールオーバークレジットとして追加されます。<br>- <b>free usage</b>: 組織に提供された無料クレジットでカバーされる使用量。<br>- <b>overage</b>: オンデマンド価格で支払われた使用量。これは、組織がキャパシティ、ロールオーバー、および無料クレジットを使い果たした場合に発生します。<br>- <b>rebate</b>: 他の組織とデータを共有したときに組織に付与されたクレジットでカバーされる使用量。</td>
    </tr>
    <tr>
      <td><code>billing_type</code></td>
      <td>請求またはクレジットの内容を示します。指定できる請求タイプは以下の通りです。<br>- <b>consumption</b>: コンピュートクレジット、ストレージコスト、データ転送コストに関連する使用量。<br>- <b>rebate</b>: 他の組織とデータを共有したときに組織に付与されたクレジットでカバーされる使用量。<br>- <b>priority support</b>: 優先サポートサービスの料金。この料金はアカウントではなく、契約に付随しています。<br>- <b>vps_deployment_fee</b>: 仮想プライベート Snowflake デプロイの料金。<br>- <b>support_credit</b>: Snowflake サポートが Snowflake の問題に起因する課金を取り消すためにアカウントに入金したクレジット。</td>
    </tr>
    <tr>
      <td><code>charge_description</code></td>
      <td>個別の明細項目に関連付けられたコストタイプの説明。説明はコストタイプごとに異なり、 <code>servicename</code> タグで表されます。</td>
    </tr>
    <tr>
      <td><code>contract_number</code></td>
      <td>組織の Snowflake 契約番号。</td>
    </tr>
    <tr>
      <td><code>database_name</code></td>
      <td>クエリが実行されたデータベースの名前 (該当する場合)。<b>クエリアトリビューション</b>コストの場合にのみ検出されます。</td>
    </tr>
    <tr>
      <td><code>organization_name</code></td>
      <td>組織の名前。</td>
    </tr>
    <tr>
      <td><code>query_hash</code></td>
      <td>アトリビューション目的のクエリのパラメーター化されたバージョンを表す一意のハッシュ。<b>クエリアトリビューション</b>コストの場合にのみ検出されます。</td>
    </tr>
    <tr>
      <td><code>query_hash_version</code></td>
      <td> <code>query_hash</code>の生成に使用された Snowflake クエリハッシュアルゴリズムのバージョン。<b>クエリアトリビューション</b>コストの場合にのみ検出されます。</td>
    </tr>
    <tr>
      <td><code>rating_type</code></td>
      <td>レコードの使用量がどのように評価されるか、または価格設定されるかを示します。指定可能な値は以下の通りです。<br>- <b>compute</b><br>- <b>data_transfer</b><br>- <b>storage</b><br>- <b>その他</b></td>
    </tr>
    <tr>
      <td><code>region</code></td>
      <td>アカウントが存在する地域の名前。</td>
    </tr>
    <tr>
      <td><code>service_level</code></td>
      <td>Snowflake アカウントのサービスレベル (エディション) (Standard、Enterprise、または Business Critical)。</td>
    </tr>
    <tr>
      <td><code>servicename</code></td>
      <td>使用のタイプ。指定できるサービスタイプは以下の通りです。<br>- <b>automatic_clustering</b>:「自動クラスタリング」を参照してください。<br>- <b>data_transfer</b>:「データ転送コストを理解する」を参照してください。<br>- <b>logging</b>: 「ログおよびトレースの概要」を参照してください。<br>- <b>materialized_view</b>:「マテリアライズドビューの操作」を参照してください。<br>- <b>replication</b>:「複数アカウント間のレプリケーションとフェイルオーバーの概要」を参照してください。<br>- <b>query_acceleration</b>:「クエリアクセラレーションサービスの使用」を参照してください。<br>- <b>search_optimization</b>:「検索最適化サービス」を参照してください。<br>- <b>serverless_task</b>:「タスクの概要」を参照してください。<br>- <b>snowpipe</b> 「Snowpipe」を参照してください。<br>- <b>snowpipe_streaming</b>:「Snowpipe Streaming」を参照してください。<br>- <b>storage</b>:「ストレージコストを理解する」を参照してください。<br>- <b>warehouse_metering_query_attribution</b>:「実行時間が 100ms 以上のクエリの仮想ウェアハウスのクレジット使用」を参照してください。サーバーレスまたはクラウドサービスのコンピュート利用を示すものではありません。<br>- <b>warehouse_metering_query_attribution</b>:「実行時間が 100ms 以下のクエリの仮想ウェアハウスのクレジット使用、およびアイドル状態のウェアハウス時間」を参照してください。これはサーバーレスまたはクラウドサービスのコンピュート利用を示すものではありません。</td>
    </tr>
    <tr>
      <td><code>user_name</code></td>
      <td>クエリに関連付けられたユーザーまたはサービスアカウントの名前。</td>
    </tr>
    <tr>
      <td><code>warehouse_id</code></td>
      <td>コストが発生しているウェアハウスの識別子。</td>
    </tr>
    <tr>
      <td><code>warehouse_name</code></td>
      <td>この使用量に関連付けられているウェアハウスの名前。</td>
    </tr>
    <tr>
      <td><code>warehouse_size</code></td>
      <td>ウェアハウスのサイズ (例: Large、Medium)。</td>
    </tr>
  </tbody>
</table>

{{% /tab %}}
{{% tab "Databricks" %}}

**注**: Databricks コストインテグレーションでは、リスト価格と使用量データを使用してコストが計算されます。交渉済みの料金や割引料金は反映されません。

<table>
  <thead>
    <tr>
      <th style="width: 220px;">タグ名</th>
      <th>タグの説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>account_id</code></td>
      <td>このレポートが生成されたアカウントの ID。</td>
    </tr>
    <tr>
      <td><code>billing_origin_product</code></td>
      <td>請求イベントの発生元である製品または機能 (例: JOBS、CLUSTERS)。</td>
    </tr>
    <tr>
      <td><code>central_clean_room_id</code></td>
      <td>ワークロードに関連付けられているセントラルクリーンルームの ID (該当する場合)。</td>
    </tr>
    <tr>
      <td><code>charge_description</code></td>
      <td>クラウドタイプと関連 SKU 名の組み合わせ (例: AWS - PREMIUM_ALL_PURPOSE_COMPUTE)。</td>
    </tr>
    <tr>
      <td><code>cloud</code></td>
      <td>この使用量に関連するクラウド。指定可能な値は AWS、AZURE、GCP です。</td>
    </tr>
    <tr>
      <td><code>cluster_id</code></td>
      <td>この使用量に関連付けられているクラスターの ID。</td>
    </tr>
    <tr>
      <td><code>custom_tags</code></td>
      <td>使用量に適用されるカスタムタグで、通常は追加のメタデータや分類のためのキーと値のペアです。</td>
    </tr>
    <tr>
      <td><code>destination_region</code></td>
      <td>ワークロードが実行されるリージョン (該当する場合)。</td>
    </tr>
    <tr>
      <td><code>dlt_maintenance_id</code></td>
      <td>Delta Live Tables のメンテナンス ID (該当する場合)。</td>
    </tr>
    <tr>
      <td><code>dlt_pipeline_id</code></td>
      <td>Delta Live Tables パイプラインの ID (該当する場合)。</td>
    </tr>
    <tr>
      <td><code>dlt_tier</code></td>
      <td>Delta Live Tables サービスのティア (該当する場合)。</td>
    </tr>
    <tr>
      <td><code>dlt_update_id</code></td>
      <td>この使用量に関連付けられている Delta Live Tables 更新 ID (該当する場合)。</td>
    </tr>
    <tr>
      <td><code>endpoint_id</code></td>
      <td>SQL ベースまたはサービング関連の使用量のエンドポイント ID (該当する場合)。</td>
    </tr>
    <tr>
      <td><code>endpoint_name</code></td>
      <td>SQL またはサービングエンドポイントの名前 (該当する場合)。</td>
    </tr>
    <tr>
      <td><code>instance_pool_id</code></td>
      <td>使用されたインスタンスプールの ID (該当する場合)。</td>
    </tr>
    <tr>
      <td><code>is_photon</code></td>
      <td>Photon 処理が使用されたかどうかを示します (<code>true</code> または <code>false</code>)。</td>
    </tr>
    <tr>
      <td><code>is_serverless</code></td>
      <td>使用量がサーバーレスコンピューティングリソースに関連しているかどうかを示します (<code>true</code> または <code>false</code>)。</td>
    </tr>
    <tr>
      <td><code>job_id</code></td>
      <td>Databricks のジョブの一意の識別子。</td>
    </tr>
    <tr>
      <td><code>job_name</code></td>
      <td>Databricks のジョブの名前 (該当する場合)。</td>
    </tr>
    <tr>
      <td><code>job_run_id</code></td>
      <td>特定のジョブ実行の識別子 (該当する場合)。</td>
    </tr>
    <tr>
      <td><code>jobs_tier</code></td>
      <td>ジョブのティア (例: <code>CLASSIC</code> または <code>PREMIUM</code>。</td>
    </tr>
    <tr>
      <td><code>networking</code></td>
      <td>このジョブに使用されるネットワークの種類 (指定されている場合)。</td>
    </tr>
    <tr>
      <td><code>node_type</code></td>
      <td>この請求レコードで使用されるノードの種類 (例: m5d.large)。</td>
    </tr>
    <tr>
      <td><code>notebook_id</code></td>
      <td>この請求レコードで使用されるノートブックの ID (該当する場合)。</td>
    </tr>
    <tr>
      <td><code>notebook_path</code></td>
      <td>Databricks のノートブックのパス (該当する場合)。</td>
    </tr>
    <tr>
      <td><code>record_id</code></td>
      <td>このレコードの一意の ID。</td>
    </tr>
    <tr>
      <td><code>run_name</code></td>
      <td>現在のジョブまたはワークフロー実行の名前 (該当する場合)。</td>
    </tr>
    <tr>
      <td><code>serving_type</code></td>
      <td>使用されているサービングモデルのタイプ (該当する場合。例: Model Serving)。</td>
    </tr>
    <tr>
      <td><code>source_region</code></td>
      <td>この請求レコードの発生元リージョン (該当する場合)。</td>
    </tr>
    <tr>
      <td><code>sql_tier</code></td>
      <td>使用量に関連付けられている SQL ティア (該当する場合)。</td>
    </tr>
    <tr>
      <td><code>usage_metadata</code></td>
      <td>使用量に関連するメタデータで、使用量タイプ、サービスカテゴリー、その他の関連情報などの詳細が含まれる場合があります。</td>
    </tr>
    <tr>
      <td><code>usage_type</code></td>
      <td>請求対象の使用量タイプ (例: COMPUTE_TIME)。</td>
    </tr>
    <tr>
      <td><code>warehouse_id</code></td>
      <td>SQL ウェアハウスの ID (該当する場合)。</td>
    </tr>
    <tr>
      <td><code>workspace_id</code></td>
      <td>この使用量が関連付けられたワークスペースの ID。</td>
    </tr>
  </tbody>
</table>

{{% /tab %}}

{{% tab "OpenAI" %}}

| タグ名 | タグの説明 |
|---|---|
| `charge_description` | コストがこの料金に関連付けられているモデルの名前。|
| `organization_id` | 組織の一意の識別子。|
| `organization_name` | 組織の名前。|
| `project_id` | プロジェクトの一意の識別子。|
| `project_name` | プロジェクトの名前。|

{{% /tab %}}

{{% tab "Anthropic" %}}

| タグ名 | タグの説明 |
|---|---|
| `workspace_id` | Anthropic ワークスペースの一意の識別子。|
| `workspace_name` | タグで正規化されたワークスペース名のバージョン。|
| `display_workspace_name` | 変更されていないワークスペース名。|
| `org_id` | Anthropic 組織の一意の識別子。|
| `org_name` | タグで正規化された Anthropic 組織名のバージョン。|
| `display_org_name` | 変更されていない組織名。|
| `org_type` | Anthropic アカウントのタイプ (例: `enterprise` または `platform`)。|
| `model_id` | 正規の Anthropic モデル識別子 (例: `claude-3-opus-20240229`)。|
| `model` | `model_id` のエイリアス。使用量およびメトリクスとの互換性と一貫性を保つために提供されています。|
| `model_name` | モデルのフレンドリーネーム (例: `Claude 3 Opus`)。|
| `service_tier` | 使用量に関連付けられている Anthropic サービスプランまたはティア (例: `standard`、`pro`、`enterprise`)。|
| `token_type` | 消費されたトークンのカテゴリー。|
| `context_window` | トークンのコンテキストウィンドウサイズ (例: `tier_0-200k`)。|

{{% /tab %}}

{{% tab "Cursor" %}}

| タグ名 | タグの説明 |
|---|---|
| `billing_group` | 使用量が帰属する Cursor 組織内の請求グループ。|
| `charge_type` | Cursor 料金のカテゴリー (例: `fast_premium`、`slow_premium`)。|
| `hour` | 使用量が記録された時間 (UTC)。|
| `is_headless` | Cursor エディター外部で実行されるバックグラウンドエージェントなど、ヘッドレスセッションによって使用量が発生したかどうかを示します (`true` または`false`)。|
| `max_mode` | リクエストで Cursor Max が使用されたかどうかを示します。Cursor Max は、より高いコストでフロンティアモデルにクエリをルーティングします (`true`または`false`)。|
| `user` | コストを発生させた Cursor ユーザーのメールアドレス。|

{{% /tab %}}

{{% tab "Temporal Cloud" %}}

**注**: Temporal Cloud で構成されたカスタムネームスペースタグは、動的な `temporal_tag_<key>` タグとして表示されます (例: `tmprl_project` でタグ付けされたネームスペースは `temporal_tag_tmprl_project` として表示されます)。

| タグ名 | タグの説明 |
|---|---|
| `namespace` | 使用量が帰属する Temporal Cloud ネームスペース (例: `replay-2025`)。|
| `billing_account` | 料金に関連付けられている Temporal Cloud 請求アカウント。|
| `billing_account_id` | Temporal Cloud 請求アカウントの一意の識別子。|
| `resource_type` | 使用量を生成しているリソースのタイプ (例: `Namespace`)。|
| `service_subcategory` | 料金の発生要因となる使用量のカテゴリー (例: `Actions`、`Active Storage`、`Retained Storage`)。|
| `sku_id` | 料金に関連付けられている Temporal Cloud SKU の一意の識別子 (例: `business-actions`、`business-active-storage`)。|
| `sku_meter` | 料金の計算に使用される Temporal Cloud SKU メーター (例: `Actions`、`Active Storage`、`Retained Storage`)。|
| `charge_category` | Temporal Cloud 料金のカテゴリー (例: `usage`)。|
| `pricing_unit` | 料金の価格設定に使用される単位 (例: `GB/h`、`1 Million Actions`)。|
| `usage_unit` | 料金の請求対象として測定された使用量の単位 (例: `GB/h`、`1 Million Actions`)。|
| `unit_price` | 使用量単位あたりの価格。|
| `invoice_id` | 料金に関連付けられている Temporal Cloud 請求書の一意の識別子。|

{{% /tab %}}

{{% tab "GitHub" %}}

**注**: GitHub コストインテグレーションは、リスト価格と使用量データに基づいてコストを見積もります。利用可能な場合には割引額を含みます。交渉済みの料金は考慮されません。

| タグ名 | タグの説明 |
|---|---|
| `enterprise_name` | GitHub エンタープライズアカウントを識別する英数字文字列。|
| `charge_description` | 料金の説明。|
| `product` | 使用量の対象製品 (例: "actions" または "storage")。|
| `organization_name` | GitHub 組織。|
| `repository_name` | GitHub リポジトリ。|
| `billing_currency` | 請求通貨 (例: "USD")・|
| `discount` | コスト項目が割引であるかどうか。|

{{% /tab %}}

{{% tab "Confluent Cloud" %}}

<table>
  <thead>
    <tr>
      <th style="width: 200px;">タグ名</th>
      <th>タグの説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>charge_description</code></td>
      <td>コストのサブタイプ (例: KAFKA_NETWORK_WRITE)。</td>
    </tr>
    <tr>
      <td><code>environment_id</code></td>
      <td>環境の一意の識別子。</td>
    </tr>
    <tr>
      <td><code>network_access_type</code></td>
      <td>クラスターのネットワークアクセスタイプ。使用可能な値は <code>INTERNET</code>、<code>TRANSIT_GATEWAY</code>、<code>PRIVATE_LINK</code>、および <code>PEERED_VPC</code>です。</td>
    </tr>
    <tr>
      <td><code>product</code></td>
      <td>製品名。使用可能な値は <code>KAFKA</code>、<code>CONNECT</code>、<code>KSQL</code>、<code>AUDIT_LOG</code>、<code>STREAM_GOVERNANCE</code>、<code>CLUSTER_LINK</code>、<code>CUSTOM_CONNECT</code>、<code>FLINK</code>、<code>SUPPORT_CLOUD_BASIC</code>、<code>SUPPORT_CLOUD_DEVELOPER</code>、<code>SUPPORT_CLOUD_BUSINESS</code>、および <code>SUPPORT_CLOUD_PREMIER</code>です。</td>
    </tr>
    <tr>
      <td><code>resource_id</code></td>
      <td>Confluent リソースの一意の識別子。</td>
    </tr>
    <tr>
      <td><code>resource_name</code></td>
      <td>Confluent リソースの名前。</td>
    </tr>
  </tbody>
</table>

{{% /tab %}}

{{% tab "Elastic Cloud" %}}

| タグ名 | タグの説明 |
|---|---|
| `charge_description` | 料金の SKU。|
| `kind` | リソースのタイプ。|
| `name` | Elastic Cloud リソースの一意の識別子。|
| `price_per_hour` | Elastic Cloud リソースの 1 時間あたりのコスト。|

{{% /tab %}}
{{% tab "MongoDB" %}}

| タグ名 | タグの説明 |
|---|---|
| `charge_description` | 料金の説明。|
| `cluster_name` | 料金請求が発生したクラスターの名前。|
| `group_id` | 明細が関連付けられているプロジェクトの ID。|
| `invoice_id` | 請求書の一意の識別子。|
| `mongo_org_id` | MongoDB の組織 ID。|
| `replica_set_name` | 明細が関連付けられているレプリカセットの名前。|
| `resource_tags` | ユーザーが設定したクラスターの任意のタグ (通常はキーと値のペア)。|
| `status` | 支払いの状態。|

{{% /tab %}}

{{% tab "Fastly" %}}

<table>
  <thead>
    <tr>
      <th style="width: 200px;">タグ名</th>
      <th>タグの説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>charge_description</code></td>
      <td>料金の説明。</td>
    </tr>
    <tr>
      <td><code>credit_coupon_code</code></td>
      <td>このコスト項目に適用されたクーポンまたはクレジットのコード (利用可能な場合)。</td>
    </tr>
    <tr>
      <td><code>plan_name</code></td>
      <td>このサービスが該当するプランの名前。多くの場合 "product_line" と一致します。</td>
    </tr>
    <tr>
      <td><code>product_name</code></td>
      <td>請求対象となる特定の製品の名前 (例: "North America Bandwidth")。</td>
    </tr>
    <tr>
      <td><code>product_group</code></td>
      <td>製品のグループまたはカテゴリー (例: "Full Site Delivery")。</td>
    </tr>
    <tr>
      <td><code>product_line</code></td>
      <td>この項目が属する製品ライン (例: "Network Services")。</td>
    </tr>
    <tr>
      <td><code>region</code></td>
      <td>サービスの使用が発生したリージョン (例: "North America")。</td>
    </tr>
    <tr>
      <td><code>service_name</code></td>
      <td>このコスト項目に関連付けられているサービス名。多くの場合 "product_line" と一致します。 <code>product_name</code>です。</td>
    </tr>
    <tr>
      <td><code>usage_type</code></td>
      <td>請求対象の使用量タイプ (例: "Bandwidth")。</td>
    </tr>
    <tr>
      <td><code>usage_type_cd</code></td>
      <td>使用量タイプを表すコードまたはラベル (例: "North America Bandwidth")。</td>
    </tr>
  </tbody>
</table>

{{% /tab %}}
{{% tab "Twilio" %}}

<table>
  <thead>
    <tr>
      <th style="width: 200px;">タグ名</th>
      <th>タグの説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>account_sid</code></td>
      <td>Twilio アカウントを識別する英数字文字列。</td>
    </tr>
    <tr>
      <td><code>category</code></td>
      <td>使用量のカテゴリー。詳細については、<a href="https://www.twilio.com/docs/usage/api/usage-record#usage-categories" target="_blank">使用カテゴリー</a>を参照してください。</td>
    </tr>
    <tr>
      <td><code>charge_description</code></td>
      <td>料金の説明。</td>
    </tr>
    <tr>
      <td><code>count_unit</code></td>
      <td>カウントを計測する単位 (例: 通話なら通話単位、SMS ならメッセージ単位)。</td>
    </tr>
    <tr>
      <td><code>usage_unit</code></td>
      <td>使用量を計測する単位 (例: 通話の場合は分単位、SMS の場合はメッセージ単位)。</td>
    </tr>
  </tbody>
</table>

[101]: https://www.twilio.com/docs/usage/api/usage-record#usage-categories

{{% /tab %}}
{{< /tabs >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/cloud_cost_management/setup/custom
[2]: /ja/cloud_cost_management
[3]: https://app.datadoghq.com/cost/explorer
[4]: https://app.datadoghq.com/cost/tags?cloud=custom
[5]: /ja/dashboards
[6]: /ja/notebooks
[7]: /ja/monitors/types/cloud_cost
[8]: https://app.datadoghq.com/cost/settings/accounts