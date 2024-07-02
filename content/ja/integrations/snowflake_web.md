---
"app_id": "snowflake-web"
"app_uuid": "49ad5ddd-6cc2-4aa0-bd81-3a5c7186657f"
"assets":
  "dashboards":
    "Snowflake-Event-Tables-Overview": assets/dashboards/Snowflake-Event-Tables-Overview_dashboard.json
    "Snowflake-Overview-API-Based": assets/dashboards/Snowflake-Overview_dashboard.json
  "integration":
    "auto_install": false
    "events":
      "creates_events": false
    "metrics":
      "check":
      - snowflake.organization.balance.free_usage
      - snowflake.logins.fail.count
      "metadata_path": metadata.csv
      "prefix": snowflake.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10436"
    "source_type_name": Snowflake Web
  "monitors":
    "[Snowflake] High Error Log Count on Event Tables": assets/monitors/high_volume_event_table_logs_errors.json
    "[Snowflake] High Volume of Queries are Failing": assets/monitors/high_volume_queries_failing.json
    "[Snowflake] Increased Failed Login Attempts": assets/monitors/increased_failed_login_attempts.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com (日本語対応)
  "support_email": help@datadoghq.com
"categories":
- ai/ml
- コスト管理
- data stores
- モニター
- ログの収集
- security
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "snowflake_web"
"integration_id": "snowflake-web"
"integration_title": "Snowflake - API Based"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "snowflake_web"
"public_title": "Snowflake - API Based"
"short_description": "Identify long running and unsuccessful queries, reduce costs, find security threats, and monitor Snowpark workloads."
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::AI/ML"
  - "Category::Cost Management"
  - "Category::Data Stores"
  - "Category::Metrics"
  - "Category::Log Collection"
  - "Category::Security"
  - "Submitted Data Type::Metrics"
  - "Submitted Data Type::Logs"
  "configuration": "README.md#Setup"
  "description": Identify long running and unsuccessful queries, reduce costs, find security threats, and monitor Snowpark workloads.
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/snowflake-monitoring-datadog/"
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/snowflake-snowpark-monitoring-datadog/"
  "support": "README.md#Support"
  "title": Snowflake - API Based
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

<div class="alert alert-info">API ベースの Snowflake インテグレーションは、Datadog Agent ベースの Snowflake インテグレーションを置き換え、追加機能を提供します。API ベースの Snowflake インテグレーションをセットアップした後、Snowflake への API 呼び出し量を減らすために、Agent ベースの Snowflake インテグレーションをアンインストールすることをお勧めします。</div>

Snowflake のインフラストラクチャーやデータ取得を効果的に監視・最適化することは難しい場合があります。問題が発生すると、リソースの非効率的な利用、コストの増加、カスタマーエクスペリエンスの低下につながる可能性があります。

Datadog の Snowflake インテグレーションを使用すると、パフォーマンス向上とコスト削減のために長時間実行されているクエリを発見し、リアルタイムでセキュリティ脅威を特定し、Snowpark ワークロードを監視することができます。

Snowflake データをパースした後、Datadog は[すぐに使える概要ダッシュボード][1]に収集された全リソースに関する洞察を入力します。また、Snowpark の実行失敗や異常な量のログイン試行に対するアラートを設定するための推奨モニターも提供します。

<div class="alert alert-info"><strong>注</strong>: メトリクスは Snowflake へのクエリで収集されます。Datadog インテグレーションによって作成されたクエリは、Snowflake によって請求されます。</div>

## セットアップ

### インストール

インストール手順は不要です。

### 構成

#### Snowflake アカウントに接続

1. [Snowflake アカウントの URL][2] を見つけます。

{{< img src="integrations/snowflake/snowflake_account_url.png" alt="Snowflake の UI でアカウント URL のコピーオプションを選択したアカウントメニュー" popup="true">}}

2. 収集するリソースを有効にします。

##### アカウントと組織の使用量メトリクス

以下の表では、収集されるメトリクスの種類と関連するメトリクスのプレフィックスについて説明します。

| **型** | **説明** | **収集されるメトリクスのプレフィックス**  |  
|------|-------------|-----------------------------|                                                                                            
| **アカウント使用量**      | アカウントレベルでのストレージ使用量、クレジット消費量、およびクエリメトリクス。<br>_毎時収集_。              | `snowflake.auto_recluster`<br>`snowflake.billing`<br>`snowflake.data_transfer`<br>`snowflake.logins`<br>`snowflake.pipe`<br>`snowflake.query`<br>`snowflake.replication`<br>`snowflake.storage`<br>`snowflake.storage.database`<br>`snowflake.storage.table` |
| **組織使用量** | 組織レベルでのクレジット消費量、データ転送履歴、予算メトリクス<br>_毎日収集_。 | `snowflake.organization` |

##### Logs

以下の表は、収集されるログの種類と含まれる Snowflake テーブルを示しています。

| **型**          | **説明** | **含まれる Snowflake テーブル**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|-------------------|---|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **クエリ履歴** | クエリ実行の履歴。<br>クエリ履歴ログをアクセス履歴ログで補完することで、データがクエリを通じてどのように使用され、その系譜をより深く知ることができます。  | <a href="https://docs.snowflake.com/en/sql-reference/account-usage/query_history">SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY</a>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Security**      | Utilize these logs with <a href="https://app.datadoghq.com/security/home">Cloud SIEM</a> to better detect and respond to security threats in your environment. | <a href="https://docs.snowflake.com/en/sql-reference/account-usage/login_history">SNOWFLAKE.ACCOUNT_USAGE.LOGIN_HISTORY</a> <br> <a href="https://docs.snowflake.com/en/sql-reference/account-usage/sessions">SNOWFLAKE.ACCOUNT_USAGE.SESSIONS</a> <br> <a href="https://docs.snowflake.com/en/sql-reference/account-usage/grants_to_users">SNOWFLAKE.ACCOUNT_USAGE.GRANTS_TO_USERS</a> <br> <a href="https://docs.snowflake.com/en/sql-reference/account-usage/data_transfer_history">SNOWFLAKE.ACCOUNT_USAGE.DATA_TRANSFER_HISTORY</a> <br> <a href="https://docs.snowflake.com/en/sql-reference/account-usage/stages">SNOWFLAKE.ACCOUNT_USAGE.STAGES</a> |
| **イベントテーブル**   | 関数やプロシージャによって生成されたメッセージおよびイベントデータ。<br>追加の GRANT 特権が必要です。 | カスタム<a href="https://docs.snowflake.com/en/developer-guide/logging-tracing/event-table-columns">イベントテーブル</a>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |  

##### Cloud Cost Management

Cloud Cost Management を有効にして、[SNOWFLAKE.ORGANIZATION_USAGE.USAGE_IN_CURRENCY_DAILY][3] テーブルから集計された Snowflake コストメトリクスを受け取ります。これらのメトリクスを [Cloud Cost Management][4] で使用することで、コストと使用量に関するさらなる洞察を得ることができます。

3. Snowflake を監視するために、Datadog 固有のロールとユーザーを作成します。Snowflake 環境で以下の一連のコマンドを実行し、Datadog にアクセス可能なユーザーを作成します。

{{< code-block lang="bash" filename="" disable_copy="false" collapsible="true" >}}
-- Snowflake の使用量を監視するための新しいロールを作成します。ロールの名前はカスタマイズ可能です。
create role DATADOG;

-- 新しいロールに SNOWFLAKE データベースの特権を付与します。
grant imported privileges on database SNOWFLAKE to role DATADOG;

-- DATADOG ロールにデフォルトのウェアハウスの使用権限を付与します。
grant usage on warehouse <WAREHOUSE> to role DATADOG;

-- 新しいロールに ORGANIZATION_BILLING_VIEWER を付与します。Snowflake のコストデータを収集したい場合に実行します。
grant database role SNOWFLAKE.ORGANIZATION_BILLING_VIEWER to role DATADOG;

-- イベントテーブルのデータベース、スキーマ、およびテーブルの使用権限を付与します。
grant usage on database <EVENT_TABLE_DATABASE> to role DATADOG;
grant usage on schema <EVENT_TABLE_DATABASE>.<EVENT_TABLE_SCHEMA> to role DATADOG;
grant select on table <EVENT_TABLE_DATABASE>.<EVENT_TABLE_SCHEMA>.<EVENT_TABLE_NAME> to role DATADOG;

-- ユーザーを作成します。
create user <USERNAME>
LOGIN_NAME = <USERNAME>
password = <PASSWORD>
default_warehouse = <WAREHOUSE>
default_role = DATADOG

-- ユーザーにモニターロールを付与します。
grant role DATADOG to user <USERNAME>
{{< /code-block >}}

<div class="alert alert-info">
<strong>注</strong>:

- デフォルトでは、このインテグレーションは `SNOWFLAKE` データベースと `ACCOUNT_USAGE` スキーマを監視します。このデータベースはデフォルトで利用可能で、`ACCOUNTADMIN` ロールまたは `ACCOUNTADMIN` によって付与されたロールを持つユーザーのみが閲覧可能です。
- 組織メトリクスを収集するには、ユーザーは `ORGADMIN` ロールを持つ必要があります。
</div>

4. キーペア認証を構成します。公開キーは先ほど作成したユーザーに割り当て、秘密キーは Datadog にアップロードし、Datadog が Snowflake アカウントに接続できるようにします。
   a. [Snowflake の説明][5]に従って秘密キーを作成し、アップロードします。
   b. [Snowflake の説明][6]に従って公開キーを作成します。
   c. [Snowflake の説明][7]に従って、先ほど作成したユーザーに公開キーを割り当てます。

<div class="alert alert-info">
Datadog が Snowflake アカウントからデータを収集するには、特定の IP アドレスプレフィックスを許可リストに登録する必要があります。Datadog に属する IP プレフィックスのリストは、<a href="https://ip-ranges.datadoghq.com/">IP 範囲のページ</a>で確認でき、許可する範囲は <strong>webhooks</strong> で確認できます。
</div>

#### カスタムメトリクス

Snowflake インテグレーションは、カスタムメトリクスを収集するためのカスタムクエリをサポートしています。ユーザーは、カスタム SQL クエリを記述して特定のデータを抽出し、Datadog でメトリクスやメトリクスタグとして表示することができます。

デフォルトでは、インテグレーションは共有の `SNOWFLAKE` データベースと `ACCOUNT_USAGE` スキーマに接続します。`ACCOUNT_USAGE` スキーマ以外のテーブルをクエリする場合は、構成したロールがテーブルにアクセスする適切な権限を持っていることを確認してください。

以下の表では、カスタムメトリクスを定義するために使用するフィールドについて説明します。

| フィールド | 説明 | 必須 |
| -------------  | ----------- | --- |
| Custom Metric Identifier | これはカスタムメトリクスの識別子で、アカウントごとにカスタムメトリクスを区別するために使用されます。   | はい |
| クエリ | 実行する SQL です。単純なステートメントでも複数行のスクリプトでもかまいません。結果のすべての行が評価されます。複数行のスクリプトが必要な場合は、パイプ (|) を使用します。 | はい |
| Metadata 列 | 各列を左から右に順番に並べたリストです。各列には 2 つの必須フィールドがあります。<br>- **Custom Column Name**:<br>これは `metric_prefix` に追加するサフィックスで、完全なメトリクス名を形成します。タイプが `Tag Key` に指定されている場合、この列はこのクエリによって収集されたすべてのメトリクスにタグとして適用されます。<br>- **Metadata Type**:<br>これは送信方法 (例えば、gauge、count、rate) です。また、この列の項目の名前と値 (`<name>:<row_value>`) で行の各メトリクスのタグを設定することもできます。 | はい |


**注**:
   - 定義された列の少なくとも 1 つの項目は、メトリクスタイプ (gauge、count、rate、distribution) でなければなりません。
   - 列内のアイテム数は、クエリで返された列数と同じである必要があります。
   - 列の項目を定義する順番は、クエリで返される順番と同じでなければなりません。

**例**:

{{< img src="integrations/snowflake/custom_query.png" alt="Snowflake インテグレーションタイルのカスタムメトリクスタブ" popup="true">}}

#### 検証

結果を確認するには、Metric Summary を使用してメトリクスを検索します。

{{< img src="integrations/snowflake/snowflake_metrics.png" alt="Metric Summary ページの Snowflake メトリクス" popup="true">}}

## 収集データ

### メトリクス
{{< get-metrics-from-git "snowflake_web" >}}


### イベント

Snowflake Web インテグレーションにはイベントは含まれていません。

### サービスチェック

Snowflake Web インテグレーションには、サービスのチェック機能は含まれていません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

## Agent チェック: Snowflake

<div class="alert alert-danger">Snowflake Agent のチェックはサポートされなくなりました。追加機能と Snowflake への API 呼び出し量の削減のために、API ベースのインテグレーションへの切り替えをお勧めします。</div>

## Agent: 概要

このチェックは、Datadog Agent を通じて [Snowflake][11] を監視します。Snowflake は SaaS 型の分析データウェアハウスで、完全にクラウドインフラストラクチャー上で動作します。
このインテグレーションは、クレジットの使用量、請求、ストレージ、クエリのメトリクスなどを監視します。

<div class="alert alert-info"><bold>注</bold>: メトリクスは Snowflake へのクエリとともに収集されます。Datadog インテグレーションによるクエリは、Snowflake によって課金されます。</div>

## Agent: セットアップ

以下の手順に従って、このチェックをインストールし、ホストで実行中の Agent に対して構成します。

### Agent: インストール

Snowflake のチェックは、[Datadog Agent][12] パッケージに含まれています。

**注**: Python 2 を使用する Datadog Agent v6 では Snowflake チェックは使用できません。Agent v6 で Snowflake を使用するには、[Datadog Agent v6 で Python 3 を使用する][13]を参照するか、Agent v7 にアップグレードしてください。

### Agent: 構成

<div class="alert alert-warning">Snowflake は、`SYSADMIN` などの代替ロールにアクセス許可を付与することをお勧めします。詳細については、<a href="https://docs.snowflake.com/en/user-guide/security-access-control-considerations.html#control-the-assignment-of-the-accountadmin-role-to-users">ACCOUNTADMIN ロール</a>の制御の詳細をご覧ください。</div>

1. Snowflake を監視するための Datadog 固有のロールとユーザーを作成します。Snowflake で、以下を実行して、ACCOUNT_USAGE スキーマにアクセスできるカスタムロールを作成します。

   注: デフォルトでは、このインテグレーションは `SNOWFLAKE` データベースと `ACCOUNT_USAGE` スキーマを監視します。`ORGANIZATION_USAGE` スキーマを監視する方法については、"組織データの収集” を参照してください。
   このデータベースはデフォルトで利用可能であり、`ACCOUNTADMIN`ロールまたは [ACCOUNTADMIN によって付与された任意のロール][14]のユーザーのみが閲覧可能です。


```text
use role ACCOUNTADMIN;
grant imported privileges on database snowflake to role SYSADMIN;

use role SYSADMIN;

```
別の方法として、`ACCOUNT_USAGE` にアクセスできる `DATADOG` カスタムロールを作成することができます。


```text
-- Snowflake の使用量を監視するための新しいロールを作成します。
create role DATADOG;

-- 新しいロールに SNOWFLAKE データベースの特権を付与します。
grant imported privileges on database SNOWFLAKE to role DATADOG;

-- DATADOG ロールにデフォルトのウェアハウスの使用権限を付与します。
grant usage on warehouse <WAREHOUSE> to role DATADOG;

-- ユーザーを作成します (既存のユーザーを使用する場合はこのステップをスキップします)。
create user DATADOG_USER
LOGIN_NAME = DATADOG_USER
password = '<PASSWORD>'
default_warehouse = <WAREHOUSE>
default_role = DATADOG
default_namespace = SNOWFLAKE.ACCOUNT_USAGE;

-- ユーザーにモニターロールを付与します。
grant role DATADOG to user <USER>;
```


2. Agent の構成ディレクトリの root にある `conf.d/` フォルダ内の `snowflake.d/conf.yaml` ファイルを編集して、 Snowflake パフォーマンスデータの収集を開始します。利用可能なすべての構成オプションについては、[snowflake.d/conf.yaml のサンプル][15]を参照してください。

    ```yaml
        ## @param account - string - required
        ## Name of your account (provided by Snowflake), including the platform and region if applicable.
        ## For more information on Snowflake account names,
        ## see https://docs.snowflake.com/en/user-guide/connecting.html#your-snowflake-account-name
        #
      - account: <ORG_NAME>-<ACCOUNT_NAME>

        ## @param username - string - required
        ## Login name for the user.
        #
        username: <USER>

        ## @param password - string - required
        ## Password for the user
        #
        password: <PASSWORD>

        ## @param role - string - required
        ## Name of the role to use.
        ##
        ## By default, the SNOWFLAKE database is only accessible by the ACCOUNTADMIN role. Snowflake recommends
        ## configuring a role specific for monitoring:
        ## https://docs.snowflake.com/en/sql-reference/account-usage.html#enabling-account-usage-for-other-roles
        #
        role: <ROLE>

        ## @param min_collection_interval - number - optional - default: 15
        ## This changes the collection interval of the check. For more information, see:
        ## https://docs.datadoghq.com/developers/write_agent_check/#collection-interval
        ##
        ## NOTE: Most Snowflake ACCOUNT_USAGE views are populated on an hourly basis,
        ## so to minimize unnecessary queries, set the `min_collection_interval` to 1 hour.
        #
        min_collection_interval: 3600

        # @param disable_generic_tags - boolean - optional - default: false
        # Generic tags such as `cluster` will be replaced by <integration_name>_cluster to avoid
        # getting mixed with other integration tags.
        # disable_generic_tags: true
    ```

    <div class="alert alert-info">In the default `conf.yaml`, the <code>min_collection_interval</code> is 1 hour. 
    Snowflake metrics are aggregated by day, you can increase the interval to reduce the number of queries.<br>
    <bold>Note</bold>: Snowflake ACCOUNT_USAGE views have a <a href="https://docs.snowflake.com/en/sql-reference/account-usage.html#data-latency">known latency</a> of 45 minutes to 3 hours.</div>

3. [Agent を再起動します][16]。

#### 組織データの収集

デフォルトでは、このインテグレーションは `ACCOUNT_USAGE` スキーマを監視しますが、代わりに組織レベルのメトリクスを監視するように設定することができます。

組織メトリクスを収集するには、インテグレーションの構成でスキーマフィールドを `ORGANIZATION_USAGE` に変更し、`min_collection_interval` を 43200 に増やします。ほとんどの組織クエリのレイテンシーが最大 24 時間であるため、これにより Snowflake へのクエリ数を減らすことができます。

**注**: 組織のメトリクスを監視するには、`user` が `ORGADMIN` ロールを持っている必要があります。

  ```yaml
      - schema: ORGANIZATION_USAGE
        min_collection_interval: 43200
  ```

デフォルトでは、一部の組織メトリクスのみが有効になっています。利用可能なすべての組織メトリクスを収集するには、`metric_groups` 構成オプションを使用します。

  ```yaml
      metric_groups:
        - snowflake.organization.warehouse
        - snowflake.organization.currency
        - snowflake.organization.credit
        - snowflake.organization.storage
        - snowflake.organization.contracts
        - snowflake.organization.balance
        - snowflake.organization.rate
        - snowflake.organization.data_transfer
  ```

さらに、アカウントと組織の両方のメトリクスを同時に監視することができます。

  ```yaml
      instances:
      - account: example-inc
        username: DATADOG_ORG_ADMIN
        password: '<PASSWORD>'
        role: SYSADMIN
        schema: ORGANIZATION_USAGE
        database: SNOWFLAKE
        min_collection_interval: 43200

      - account: example-inc
        username: DATADOG_ACCOUNT_ADMIN
        password: '<PASSWORD>'
        role: DATADOG_ADMIN
        schema: ACCOUNT_USAGE
        database: SNOWFLAKE
        min_collection_interval: 3600
  ```

#### 複数環境のデータ収集

複数の Snowflake 環境のデータを収集したい場合は、`snowflake.d/conf.yaml` ファイルに各環境をインスタンスとして追加します。例えば、`DATADOG_SYSADMIN` と `DATADOG_USER` という 2 つのユーザーのデータを収集する必要がある場合:

```yaml
instances:
  - account: example-inc
    username: DATADOG_SYSADMIN
    password: '<PASSWORD>'
    role: SYSADMIN
    database: EXAMPLE-INC

  - account: example-inc
    username: DATADOG_USER
    password: '<PASSWORD>'
    role: DATADOG_USER
    database: EXAMPLE-INC
```

#### プロキシのコンフィギュレーション

Snowflake では、[プロキシ構成のための環境変数][17]を設定することを推奨しています。

また、[snowflake.d/conf.yaml][15] の `init_config` で `proxy_host`、`proxy_port`、`proxy_user`、`proxy_password` を設定することもできます。

**注**: Snowflake はプロキシ構成を自動的にフォーマットし、[標準プロキシ環境変数][18]を設定します。
これらの変数は、Docker、ECS、Kubernetes などのオーケストレーターを含むインテグレーションからのすべてのリクエストにも影響します。

#### Snowflake 構成へのプライベート接続

[プライベートコネクティビティ][19] (例えば [AWS PrivateLink][20]) が Snowflake で有効になっている場合、`account` 構成オプションを以下の形式に更新することで Snowflake インテグレーションを構成できます。

  ```yaml
        - account: <ACCOUNT>.<REGION_ID>.privatelink
  ```

### Snowflake カスタムクエリ

Snowflake インテグレーションは、カスタムクエリに対応しています。デフォルトで、インテグレーションは共有 `SNOWFLAKE` データベースと `ACCOUNT_USAGE` スキーマに接続します。

別のスキーマまたはデータベースでカスタムクエリを実行するには、[snowflake.d/conf.yaml のサンプル][15]に別のインスタンスを追加し、`database` オプションと `schema` オプションを指定します。
ユーザーとロールが指定したデータベースまたはスキーマにアクセスできることを確認してください。

#### コンフィギュレーションオプション
`custom_queries` には以下のオプションがあります。

| オプション        | 必須 | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|---------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| クエリ         | はい      | 実行する SQL です。単純なステートメントでも複数行のスクリプトでもかまいません。結果のすべての行が評価されます。複数行のスクリプトが必要な場合は、パイプ (|) を使用します。                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 列       | はい      | 各列を左から右に順番に並べたリストです。<br><br>必要なデータは 2 つあります。<br> - **`name`**: これは `metric_prefix` に追加するサフィックスで、完全なメトリクス名を形成します。`type` が `tag` に指定されている場合、この列はこのクエリによって収集されたすべてのメトリクスにタグとして適用されます。<br> - **`type`**: これは送信方法 (`gauge`、`count`、`rate` など) です。また、`tag` に設定することで、この列の項目の名前と値 (`<name>:<row_value>`) を行の各メトリクスにタグ付けすることができます。 |
| usage-metering-get-hourly-usage-for-lambda-traced-invocations          | いいえ       | 各メトリクスに適用する静的タグのリスト。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
##### 注:
- 定義された `columns` の少なくとも 1 つの項目は、メトリクスタイプである必要があります (例えば、`gauge`、`count`、`rate`)。

- 列の項目の数は、クエリで返される列の数と同じでなければなりません。
- `columns` の項目を定義する順番は、クエリで返される順番と同じでなければなりません。

```yaml
custom_queries:
  - query: select F3, F2, F1 from Table;
    columns:
      - name: f3_metric_alias
        type: gauge
      - name: f2_tagkey
        type: tag
      - name: f1_metric_alias
        type: count
    tags:
      - test:snowflake
```

#### 例
次の例は、データベース名、スキーマ名、およびウェアハウス名でタグ付けされた [`QUERY_HISTORY` ビュー][21]内のすべてのクエリをカウントするクエリです。

```TEXT
select count(*), DATABASE_NAME, SCHEMA_NAME, WAREHOUSE_NAME from QUERY_HISTORY group by 2, 3, 4;
```
##### カスタムクエリの構成

`instances` のカスタムクエリのコンフィギュレーションは、以下のようになります。

```yaml
custom_queries:
  - query: select count(*), DATABASE_NAME, SCHEMA_NAME, WAREHOUSE_NAME from QUERY_HISTORY group by 2, 3, 4;
    columns:
      - name: query.total
        type: gauge
      - name: database_name
        type: tag
      - name: schema_name
        type: tag
      - name: warehouse_name
        type: tag
    tags:
      - test:snowflake
```


### Agent: 検証

[Agent の status サブコマンドを実行][22]し、Checks セクションで `snowflake` を探します。

## Agent: データ収集

<div class="alert alert-info"><bold>注</bold>: デフォルトでは、以下のメトリクスグループのメトリクスのみが有効になっています。<code>snowflake.query.*</code>、<code>snowflake.billing.*</code>、<code>snowflake.storage.*</code>、<code>snowflake.logins.*</code>

他のメトリクスグループのメトリクスを収集する場合は、<a href="https://github.com/DataDog/integrations-core/blob/master/snowflake/datadog_checks/snowflake/data/conf.yaml.example"></a>でこのインテグレーションのコンフィグファイル例を参照してください。
</div>

### Agent: メトリクス

このチェックで提供されるメトリクスのリストについては、[メトリクス](#metrics)を参照してください。

### Agent: イベント

Snowflake には、イベントは含まれません。

### Agent: サービスチェック

**snowflake.can_connect**
チェックが Snowflake 認証情報を認証できない場合、`CRITICAL` を返します。それ以外の場合は `OK` を返します。
*ステータス: ok, critical*

## Agent: トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog による Snowflake の監視][23]
- [Datadog による Snowflake Snowpark の監視][24]

[1]: https://app.datadoghq.com/dash/integration/31321/snowflake-overview
[2]: https://docs.snowflake.com/en/user-guide/organizations-connect
[3]: https://docs.snowflake.com/en/sql-reference/organization-usage/usage_in_currency_daily
[4]: https://app.datadoghq.com/cost/overview
[5]: https://docs.snowflake.com/en/user-guide/key-pair-auth#generate-the-private-key
[6]: https://docs.snowflake.com/en/user-guide/key-pair-auth#generate-a-public-key
[7]: https://docs.snowflake.com/en/user-guide/key-pair-auth#assign-the-public-key-to-a-snowflake-user
[8]: https://github.com/DataDog/integrations-internal-core/blob/main/snowflake_web/metadata.csv
[9]: https://github.com/DataDog/integrations-internal-core/blob/main/snowflake_web/assets/logs/snowflake.yaml
[10]: https://docs.datadoghq.com/help
[11]: https://www.snowflake.com/
[12]: https://app.datadoghq.com/account/settings/agent/latest
[13]: https://docs.datadoghq.com/agent/guide/agent-v6-python-3/?tab=hostagent
[14]: https://docs.snowflake.com/en/sql-reference/account-usage.html#enabling-account-usage-for-other-roles
[15]: https://github.com/DataDog/integrations-core/blob/master/snowflake/datadog_checks/snowflake/data/conf.yaml.example
[16]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[17]: https://docs.snowflake.com/en/user-guide/python-connector-example.html#using-a-proxy-server
[18]: https://github.com/snowflakedb/snowflake-connector-python/blob/d6df58f1c338b255393571a08a1f9f3a71d8f7b6/src/snowflake/connector/proxy.py#L40-L41
[19]: https://docs.snowflake.com/en/user-guide/private-snowflake-service.html
[20]: https://docs.snowflake.com/en/user-guide/admin-security-privatelink.html
[21]: https://docs.snowflake.com/en/sql-reference/account-usage/query_history.html
[22]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[23]: https://www.datadoghq.com/blog/snowflake-monitoring-datadog/
[24]: https://www.datadoghq.com/blog/snowflake-snowpark-monitoring-datadog/

