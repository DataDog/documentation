---
aliases:
- /ja/database_monitoring/aurora_autodiscovery
title: Amazon Aurora DB クラスターに対する Database Monitoring の構成
---
このガイドでは、Amazon Aurora [Postgres][1] または [MySQL][11] データベースに対して Database Monitoring を構成していることを前提としています。

## はじめに {#before-you-begin}

サポートされるデータベース
: Postgres、MySQL

サポート対象の Agent バージョン
: 7.53.0+

## 概要 {#overview}

Datadog の[自動検出][4]を使用すると、動的なインフラストラクチャーで監視を構成できます。この機能を使用すると、個々のデータベースホストエンドポイント (例えば、`postgres.d/conf.yaml`) を列挙することなく、Aurora クラスターを監視できます。これは、接続性やワークロードの変動に応じて Aurora レプリカの数を動的に調整する [Aurora 自動スケーリング][6]を使用するクラスターで特に役立ちます。Autodiscovery は、プライマリおよびレプリカエンドポイントインスタンスの両方を自動的に検出し、監視します。

Autodiscovery と Database Monitoring を使用すると、Postgres または MySQL チェックの構成テンプレートを定義し、各チェックを適用するクラスターを指定できます。

## Aurora クラスターでオートディスカバリーを有効にする {#enabling-autodiscovery-for-aurora-clusters}

1. [AWS 権限の付与](#grant-aws-permissions)
2. [Aurora タグの構成](#configure-aurora-tags)
3. [Datadog Agent の構成](#configure-the-datadog-agent)
4. [構成テンプレートの作成](#create-a-configuration-template)

### AWS 権限の付与 {#grant-aws-permissions}

Datadog Agent は、AWS アカウント内で `rds:DescribeDBClusters` および `rds:DescribeDBInstances` を実行するための権限が必要です。Datadog は、Agent が実行されている EC2 インスタンスに IAM ロールポリシーをアタッチすることを推奨します。

これらの権限を与えるポリシーの例:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "rds:DescribeDBClusters",
        "rds:DescribeDBInstances"
      ],
      "Resource": [
        "arn:aws:rds:<region>:<account>:cluster:*",
        "arn:aws:rds:<region>:<account>:db:*"
      ]
    }
  ]
}
```

[`AmazonRDSReadOnlyAccess`][3] ポリシーをアタッチすることもできます。

### Aurora タグの構成 {#configure-aurora-tags}

リスナーは、Agent が実行されているアカウントおよびリージョン内の、`datadoghq.com/scrape:true` タグが適用されたすべての Aurora クラスターを検出します。特定のタグを持つクラスターを検出するように Agent を構成することもできます。

これらのタグを DB クラスターに適用する必要があります (ロール: `Regional cluster`)。RDS リソースのタグ付けに関する詳細は、[AWS ドキュメント][7]を参照してください。

`tags` を空の配列として構成すると、Autodiscovery はアカウントおよびリージョン内のすべてのクラスターを検出します。

### Datadog Agent の構成{#configure-the-datadog-agent}

Autodiscovery は Agent サービスリスナーを使用します。Agent サービスリスナーは Aurora クラスター内のすべてのデータベースホストエンドポイントを発見し、発見されたエンドポイントを既存の Agent チェックスケジューリングパイプラインに転送します。リスナーは `datadog.yaml` ファイルで構成できます。

```yaml
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
```

**注**: Agent は、Agent と同じリージョンで実行されている Aurora インスタンスのみを検出します。インスタンスのリージョンを特定するために、Agent は [IMDS (Instance Metadata Service)][8] を使用します。EC2 インスタンスが `IMDSv2` を必要とする場合、以下に示すように、`datadog.yaml` 内の `ec2_prefer_imdsv2: true` を設定して Agent を `IMDSv2` を使用するように構成する必要があります。

``` yaml {hl_lines=[1]}
ec2_prefer_imdsv2: true
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true

```

By default, the listener only discovers Aurora clusters in the account and region where the Agent is running, and only those with the `datadoghq.com/scrape:true` tag. You can also configure the listener to discover clusters with specific tags.

To specify custom tags for Aurora cluster discovery in the `datadog.yaml` file:

``` yaml {hl_lines=["5-6"]}
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      tags:
        - "my-cluster-tag-key:value"
```

To monitor all clusters in the account and region:

``` yaml {hl_lines=["5"]}
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      tags: []

```

The listener queries the AWS API for the list of hosts in a loop. The frequency with which the listener queries the AWS API, in seconds, is configurable in the `datadog.yaml` file:

``` yaml {hl_lines=["5"]}
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      discovery_interval: 300
```

The listener provides an `%%extra_dbm%%` variable that can be used to enable or disable DBM for the instance. This value defaults to `true` if the tag `datadoghq.com/dbm:true` is present. To specify a custom tag for this value use `dbm_tag`:

``` yaml {hl_lines=["5"]}
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      dbm_tag: "use_dbm:true"

```

The `%%extra_dbm%%` value is true if the tag is present, and false otherwise. It does not set its value to the value of the tag.

The listener provides an `%%extra_global_view_db%%` variable that can be used to set the `global_view_db` for the instance. This value defaults to the value of the tag `datadoghq.com/global_view_db`. To specify a custom tag for this value use `global_view_db_tag`:

``` yaml {hl_lines=["5"]}
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      global_view_db_tag: "my_db_tag"
```

### Create a configuration template 

The Datadog Agent supports configuration templates for the Postgres and MySQL integrations. Define a configuration template for the Aurora clusters you wish to monitor.

{{< tabs >}}
{{% tab "Postgres" %}}

まず、Aurora 管理の Postgres 用の `ad_identifier` を構成テンプレート (`postgres.d/conf_aws_aurora.yaml`) ファイルに追加します。

```yaml
ad_identifiers:
  - _dbm_postgres_aurora
```

次に、テンプレートの残りを定義します。[テンプレート変数](#supported-template-variables)を、`host` や `port` などの変更される可能性のあるパラメーターに使用します。

```yaml
ad_identifiers:
  - _dbm_postgres_aurora
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    dbm: "%%extra_dbm%%"
    database_autodiscovery:
      enabled: true
    aws:
      instance_endpoint: "%%host%%"
      region: "%%extra_region%%"
    tags:
    - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
    - "region:%%extra_region%%"
```

この例では、テンプレート変数 `%%host%%`、`%%port%%`、`%%extra_dbclusteridentifier%%`、`%%extra_dbm%%`、`%%extra_region%%` に Aurora クラスターからの情報が動的に入力されます。

#### 認証 {#authentication}

認証にパスワードを使用している場合、このテンプレートファイルで指定したパスワードは、検出されたすべてのデータベースで使用されることに注意してください。

{{% collapse-content title="パスワードを安全に保管" level="h5" id="securely-store-your-password" %}}
##### パスワードを安全に保管 {#securely-store-your-password}
{{% dbm-secret %}}

以下の構成テンプレートの例は、Aurora クラスターで発見されたすべてのインスタンスに適用されます。

``` yaml {hl_lines=[8]}
ad_identifiers:
  - _dbm_postgres_aurora
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    password: "ENC[datadog_user_database_password]"
    dbm: "%%extra_dbm%%"
    aws:
      instance_endpoint: "%%host%%"
      region: "%%extra_region%%"
    tags:
    - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
    - "region:%%extra_region%%"

```
{{% /collapse-content %}}

{{% collapse-content title="IAM Authentication" level="h5" id="iam-authentication" %}}
##### IAM Authentication

To use [IAM authentication][2] to connect to your Aurora cluster, use the following template:

``` yaml {hl_lines=["12-13"]}
ad_identifiers:
  - _dbm_postgres_aurora
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    dbm: true
    aws:
      instance_endpoint: "%%host%%"
      region: "%%extra_region%%"
      managed_authentication:
        enabled: "%%extra_managed_authentication_enabled%%"
    tags:
      - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
      - "region:%%extra_region%%"
```

The template variable `%%extra_managed_authentication_enabled%%` resolves to `true` if the instance is using IAM authentication.

[2]: /ja/database_monitoring/guide/managed_authentication/?tab=aurora#configure-iam-authentication
{{% /collapse-content %}}
{{% collapse-content title="Custom global_view_db (7.75.0+)" level="h5" id="global-view-db" %}}
##### カスタムグローバルビューデータベース {#custom-global-view-database}

データベースのオートディスカバリー用にカスタムグローバルビューデータベースを設定するには、Agent バージョン 7.75.0 以上を使用していることを確認し、次のテンプレートを使用してください。

``` yaml {hl_lines=["11"]}
ad_identifiers:
  - _dbm_postgres_aurora
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    dbm: true
    database_autodiscovery:
      enabled: true
      global_view_db: "%%extra_global_view_db%%"
    aws:
      instance_endpoint: "%%host%%"
      region: "%%extra_region%%"
    tags:
      - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
      - "region:%%extra_region%%"

```
{{% /collapse-content %}}
{{% /tab %}}

{{% tab "MySQL" %}}
First, add an `ad_identifier` for Aurora-managed MySQL to your configuration template (`mysql.d/conf_aws_aurora.yaml`) file:

```yaml
ad_identifiers:
  - _dbm_mysql_aurora
```

Then, define the remainder of the template. Use [template variables](#supported-template-variables) for parameters that may change, such as `host` and `port`.

```yaml
ad_identifiers:
  - _dbm_mysql_aurora
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    dbm: "%%extra_dbm%%"
    aws:
      instance_endpoint: "%%host%%"
      region: "%%extra_region%%"
    tags:
    - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
    - "region:%%extra_region%%"
```

In this example, the template variables `%%host%%`, `%%port%%`, `%%extra_dbclusteridentifier%%`, `%%extra_dbm%%`, and `%%extra_region%%` are dynamically populated with information from the Aurora cluster.

#### Authentication 

If you are using password for authentication note that the password provided in this template file will be used across every database discovered.

{{% collapse-content title="パスワードを安全に保管" level="h5" id="securely-store-your-password" %}}
##### パスワードを安全に保管 {#securely-store-your-password-1}
{{% dbm-secret %}}

以下の構成テンプレートの例は、Aurora クラスターで発見されたすべてのインスタンスに適用されます。

``` yaml {hl_lines=[8]}
ad_identifiers:
  - _dbm_mysql_aurora
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    password: "ENC[datadog_user_database_password]"
    dbm: "%%extra_dbm%%"
    aws:
      instance_endpoint: "%%host%%"
      region: "%%extra_region%%"
    tags:
    - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
    - "region:%%extra_region%%"

```
{{% /collapse-content %}}

{{% collapse-content title="IAM Authentication (7.67.0+)" level="h5" id="iam-authentication" %}}
##### IAM Authentication

To use [IAM authentication][2] to connect to your RDS instance, make sure that you are using Agent version 7.67.0 or above and use the following template:

``` yaml {hl_lines=["12-13"]}
ad_identifiers:
  - _dbm_mysql_aurora
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    dbm: true
    aws:
      instance_endpoint: "%%host%%"
      region: "%%extra_region%%"
      managed_authentication:
        enabled: "%%extra_managed_authentication_enabled%%"
    tags:
      - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
      - "region:%%extra_region%%"
```

The template variable `%%extra_managed_authentication_enabled%%` resolves to `true` if the instance is using IAM authentication.

[2]: /ja/database_monitoring/guide/managed_authentication/?tab=aurora#configure-iam-authentication
{{% /collapse-content %}}
{{% /tab %}}
{{< /tabs >}}

インテグレーションによる Autodiscovery の構成の詳細については、[Autodiscovery のドキュメント][5]を参照してください。

#### サポートされているテンプレート変数 {#supported-template-variables}

| テンプレート変数                        | ソース                                                                                                                                        |
|:-----------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------|
| %%host%%                                 | Aurora インスタンスエンドポイント                                                                                                                  |
| %%port%%                                 | Aurora インスタンスのポート                                                                                                               |
| %%extra_region%%                         | インスタンスが配置されている AWS リージョン                                                                                                  |
| %%extra_dbclusteridentifier%%            | 発見された Aurora クラスターのクラスター識別子                                                                                       |
| %%extra_dbm%% | クラスターで DBM が有効かどうか。`dbm_tag` の存在によって決定され、デフォルトは `datadoghq.com/dbm:true` です。                                              |
| %%extra_managed_authentication_enabled%% | クラスターで IAM 認証が有効かどうか。<br/>これは、コネクションにマネージド認証を使用すべきかどうかを判断するために使用されます。|
| %%extra_global_view_db%%                       | `global_view_db_tag` の値であり、デフォルトは `datadoghq.com/global_view_db` です。                                                      |

[1]: /ja/database_monitoring/setup_postgres/aurora/?tab=postgres10
[3]: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonRDSReadOnlyAccess.html
[4]: /ja/getting_started/containers/autodiscovery/?tab=adannotationsv2agent736
[5]: /ja/containers/docker/integrations/?tab=dockeradv2
[6]: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.html
[7]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Tagging.html#Tagging.HowTo
[8]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
[9]: https://yum.datadoghq.com/beta/7/x86_64/datadog-agent-7.52.0~dbm~aurora~autodiscovery~beta~0.3-1.x86_64.rpm
[10]: https://docs.datadoghq.com/ja/agent/basic_agent_usage/amazonlinux/?tab=agentv6v7
[11]: /ja/database_monitoring/setup_mysql/aurora?tab=mysql56