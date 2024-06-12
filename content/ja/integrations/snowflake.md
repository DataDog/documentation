---
app_id: snowflake
app_uuid: 23e9084d-5801-4a71-88fe-f62b7c1bb289
assets:
  dashboards:
    Snowflake: assets/dashboards/snowflake.json
    Snowflake Organization Metrics: assets/dashboards/organization_metrics.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: snowflake.storage.storage_bytes.total
      metadata_path: metadata.csv
      prefix: snowflake.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Snowflake
  monitors:
    Snowflake failed logins: assets/recommended_monitors/snowflake_failed_logins.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- cloud
- data store
- コスト管理
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/snowflake/README.md
display_on_public_website: true
draft: false
git_integration_title: snowflake
integration_id: snowflake
integration_title: Snowflake
integration_version: 4.5.4
is_public: true
manifest_version: 2.0.0
name: snowflake
public_title: Snowflake
short_description: クレジットの使用状況、ストレージ、クエリ、ユーザー履歴などの主要なメトリクスを監視します。
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Cloud
  - Category::Data Store
  - Category::Cost Management
  configuration: README.md#Setup
  description: クレジットの使用状況、ストレージ、クエリ、ユーザー履歴などの主要なメトリクスを監視します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Snowflake
---



## 概要

このチェックは、Datadog Agent を通じて [Snowflake][1] を監視します。Snowflake は SaaS 分析データウェアハウスであり、完全にクラウドインフラストラクチャー上で実行されます。
このインテグレーションにより、クレジットの使用状況、請求、ストレージ、クエリメトリクスなどが監視されます。

<div class="alert alert-info"><bold>注</bold>: メトリクスは Snowflake へのクエリとともに収集されます。Datadog インテグレーションによるクエリは、Snowflake によって課金されます。</div>

## セットアップ

以下の手順に従って、このチェックをインストールし、ホストで実行中の Agent に対して構成します。

### インストール

Snowflake チェックは [Datadog Agent][2] パッケージに含まれています。

**注**: Python 2 を使用する Datadog Agent v6 では、Snowflake チェックは利用できません。Agent v6 で Snowflake を使用するには、[Datadog Agent v6 で Python 3 を使用する][3]を参照するか、Agent v7 にアップグレードしてください。

<div class="alert alert-warning"><code>v7.23.0</code> でインテグレーションを構成している場合は、バージョンを <code>2.0.1</code> にアップグレードして最新機能をご利用ください。
下記の<a href=https://docs.datadoghq.com/agent/guide/integration-management/#install>コマンド</a>を使用してインテグレーションをアップグレードできます。<br>

```text
datadog-agent integration install datadog-snowflake==2.0.1
```
</div>

### コンフィギュレーション
<div class="alert alert-warning">Snowflake は、`SYSADMIN` などの代替ロールにアクセス許可を付与することをお勧めします。詳細については、<a href="https://docs.snowflake.com/en/user-guide/security-access-control-considerations.html#control-the-assignment-of-the-accountadmin-role-to-users">ACCOUNTADMIN ロール</a>の制御の詳細をご覧ください。</div>

1. Snowflake を監視するための Datadog 固有のロールとユーザーを作成します。Snowflake で、以下を実行して、ACCOUNT_USAGE スキーマにアクセスできるカスタムロールを作成します。

   注: デフォルトでは、このインテグレーションは `SNOWFLAKE` データベースと `ACCOUNT_USAGE` スキーマを監視します。`ORGANIZATION_USAGE` スキーマを監視する方法については、"組織データの収集” を参照してください。
   このデータベースはデフォルトで使用でき、表示できるのは `ACCOUNTADMIN` ロールまたは [ACCOUNTADMIN によって付与されたロール][4]のユーザーのみです。


    ```text
    use role ACCOUNTADMIN;
    grant imported privileges on database snowflake to role SYSADMIN;

    use role SYSADMIN;

    ```


    または、`ACCOUNT_USAGE` にアクセスできる `DATADOG` カスタムロールを作成することもできます。


    ```text
    -- Snowflake の使用状況を監視することを目的とした新しいロールを作成します。
    create role DATADOG;

    -- SNOWFLAKE データベースに対する権限を新しいロールに付与します。
    grant imported privileges on database SNOWFLAKE to role DATADOG;

    -- ユーザーを作成します。既存のユーザーを使用している場合は、この手順をスキップしてください。
    create user DATADOG_USER
    LOGIN_NAME = DATADOG_USER
    password = '<PASSWORD>'
    default_warehouse = <WAREHOUSE>
    default_role = DATADOG
    default_namespace = SNOWFLAKE.ACCOUNT_USAGE;

    -- ユーザーにモニターのロールを付与します。
    grant role DATADOG to user <USER>;
    ```


2. Snowflake のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `snowflake.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル snowflake.d/conf.yaml][5] を参照してください。

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

3. [Agent を再起動します][6]。

#### 組織データの収集

デフォルトでは、このインテグレーションは `ACCOUNT_USAGE` スキーマを監視しますが、代わりに組織レベルのメトリクスを監視するように設定することができます。

組織メトリクスを収集するには、インテグレーションの構成でスキーマフィールドを `ORGANIZATION_USAGE` に変更し、`min_collection_interval` を 43200 に増やします。ほとんどの組織クエリのレイテンシーが最大 24 時間であるため、これにより Snowflake へのクエリ数を減らすことができます。

注: 組織のメトリクスを監視するには、`user` が `ORGADMIN` ロールである必要があります。

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

Snowflake は、[プロキシコンフィギュレーションの環境変数][7]を設定することをお勧めします。

[snowflake.d/conf.yaml][5] の `init_config` の下に `proxy_host`、`proxy_port`、`proxy_user`、`proxy_password` を設定することもできます。

**注**: Snowflake は、プロキシコンフィギュレーションを自動的にフォーマットし、[標準プロキシ環境変数][8]を設定します。
これらの変数は、Docker、ECS、Kubernetes などのオーケストレーターを含むインテグレーションからのすべてのリクエストにも影響を与えます。

#### Snowflake 構成へのプライベート接続

Snowflake で[プライベート接続][9] ([AWS PrivateLink][10] など) が有効な場合、`account` 構成オプションを以下の形式に更新することで Snowflake とのインテグレーションを構成することが可能です。

  ```yaml
        - account: <ACCOUNT>.<REGION_ID>.privatelink
  ```

### Snowflake カスタムクエリ

Snowflake インテグレーションは、カスタムクエリに対応しています。デフォルトで、インテグレーションは共有 `SNOWFLAKE` データベースと `ACCOUNT_USAGE` スキーマに接続します。

カスタムクエリを別のスキーマまたはデータベースで実行するには、別のインスタンスを[サンプル snowflake.d/conf.yaml][5] に追加して `database` および `schema` オプションを指定します。
ユーザーとロールには、指定したデータベースまたはスキーマへのアクセス権があることを確認します。

#### コンフィギュレーションオプション
`custom_queries` には以下のオプションがあります。

| オプション        | 必須 | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|---------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| query         | 〇      | 実行する SQL です。簡単なステートメントにすることも、複数行のスクリプトにすることもできます。結果のすべての行が評価されます。複数行のスクリプトが必要な場合は、パイプを使用します。                                                                                                                                                                                                                                                                                                                                                                                                                              |
| columns       | 〇      | 列を表すリストです。左から右へ順に並べられます。<br><br>次の 2 つの必須データがあります。<br> - **`name`**: サフィックスとして metric_prefix に付加され、完全な名前を形成します。`type` が `tag` と指定されている場合、この列は、このクエリによって収集されるすべてのメトリクスにタグとして適用されます。<br> - **`type`**: 送信方法 (`gauge`、`count`、`rate` など)。`tag` と設定し、この列のアイテムの名前と値 (`<name>:<row_value>`) で行の各メトリクスにタグ付けすることができます。 |
| タグ          | ✕       | 各メトリクスに適用する静的タグのリスト。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |


##### 注
- 定義済みの `columns` のうち最低 1 つは、メトリクスタイプ (`gauge`、`count`、`rate` など) である必要があります。
- 列内のアイテム数は、クエリで返された列数と同じである必要があります。
- `columns` のアイテムが定義される順番は、クエリで返された順番と同じである必要があります。

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
以下は、データベース、スキーマ、ウェアハウス名でタグ付けされた [`QUERY_HISTORY` ビュー][11]ですべてのクエリをカウントするクエリの例です。

```TEXT
select count(*), DATABASE_NAME, SCHEMA_NAME, WAREHOUSE_NAME from QUERY_HISTORY group by 2, 3, 4;
```

##### コンフィギュレーション

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

##### 検証

結果を確認するには、[メトリクスの概要][12]を使用してメトリクスを検索します。

![Snowflake メトリクスの概要][13]


### 検証

[Agent の status サブコマンドを実行][14]し、Checks セクションで `snowflake` を探します。

## 収集データ

<div class="alert alert-info"><bold>注</bold>: デフォルトでは、以下のメトリクスグループのメトリクスのみが有効になっています。<code>snowflake.query.*</code>、<code>snowflake.billing.*</code>、<code>snowflake.storage.*</code>、<code>snowflake.logins.*</code>

他のメトリクスグループのメトリクスを収集する場合は、<a href="https://github.com/DataDog/integrations-core/blob/master/snowflake/datadog_checks/snowflake/data/conf.yaml.example"></a>でこのインテグレーションのコンフィグファイル例を参照してください。
</div>

### メトリクス
{{< get-metrics-from-git "snowflake" >}}


### イベント

Snowflake には、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "snowflake" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][17]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog で Snowflake を監視する][18]


[1]: https://www.snowflake.com/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-v6-python-3/?tab=hostagent
[4]: https://docs.snowflake.com/en/sql-reference/account-usage.html#enabling-account-usage-for-other-roles
[5]: https://github.com/DataDog/integrations-core/blob/master/snowflake/datadog_checks/snowflake/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.snowflake.com/en/user-guide/python-connector-example.html#using-a-proxy-server
[8]: https://github.com/snowflakedb/snowflake-connector-python/blob/d6df58f1c338b255393571a08a1f9f3a71d8f7b6/src/snowflake/connector/proxy.py#L40-L41
[9]: https://docs.snowflake.com/en/user-guide/private-snowflake-service.html
[10]: https://docs.snowflake.com/en/user-guide/admin-security-privatelink.html
[11]: https://docs.snowflake.com/en/sql-reference/account-usage/query_history.html
[12]: https://docs.datadoghq.com/ja/metrics/summary/
[13]: https://raw.githubusercontent.com/DataDog/integrations-core/master/snowflake/images/custom_query.png
[14]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[15]: https://github.com/DataDog/integrations-core/blob/master/snowflake/metadata.csv
[16]: https://github.com/DataDog/integrations-core/blob/master/snowflake/assets/service_checks.json
[17]: https://docs.datadoghq.com/ja/help/
[18]: https://www.datadoghq.com/blog/snowflake-monitoring-datadog/