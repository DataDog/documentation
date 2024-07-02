---
title: Setting Up Database Monitoring for Self-Hosted Oracle
description: Install and configure Database Monitoring for Self-Hosted Oracle
further_reading:
- link: /integrations/oracle/
  tag: Documentation
  text: Basic Oracle Integration
---

{{% dbm-oracle-definition %}}

読み取り専用ユーザーとしてログインし、Agent でデータベースから直接テレメトリーを収集します。

## はじめに

{{% dbm-supported-oracle-versions %}}

{{% dbm-supported-oracle-agent-version %}}

Performance impact
: The default Agent configuration for Database Monitoring is conservative, but you can adjust settings such as the collection interval and query sampling rate to better suit your needs. For most workloads, the Agent represents less than one percent of query execution time on the database and less than one percent of CPU. <br/><br/>
Database Monitoring runs as an integration on top of the base Agent ([see benchmarks][6]).

Proxies, load balancers, and connection poolers
: The Agent must connect directly to the host being monitored. The Agent should not connect to the database through a proxy, load balancer, or connection pooler. Each Agent must have knowledge of the underlying hostname and should stick to a single host for its lifetime, even in cases of failover. If the Datadog Agent connects to different hosts while it is running, the values of metrics will be incorrect.

Data security considerations
: See [Sensitive information][5] for information about what data the Agent collects from your databases and how to ensure it is secure.

## セットアップ

Complete the following to enable Database Monitoring with your Oracle database:

1. [Create the Datadog user](#create-the-datadog-user)
1. [Grant the user access to the database](#grant-the-user-access-to-the-database)
1. [Create a view](#create-a-view)
1. [Agent をインストールする](#install-the-agent)
1. [Configure the Agent](#configure-the-agent)
1. [Install or verify the Oracle integration](#install-or-verify-the-oracle-integration)
1. [Validate the setup](#validate-the-setup)

### Create the Datadog user

If you already have the legacy Oracle integration installed, skip this step, because the user already exists.

サーバーに接続するための読み取り専用ログインを作成し、必要な権限を付与します。

{{< tabs >}}
{{% tab "マルチテナント" %}}
```SQL
CREATE USER c##datadog IDENTIFIED BY &password CONTAINER = ALL ;

ALTER USER c##datadog SET CONTAINER_DATA=ALL CONTAINER=CURRENT;
```
{{% /tab %}}

{{% tab "Non-CDB" %}}
```SQL
CREATE USER datadog IDENTIFIED BY &password ;
```
{{% /tab %}}

{{% tab "Oracle 11" %}}
```SQL
CREATE USER datadog IDENTIFIED BY &password ;
```
{{% /tab %}}
{{< /tabs >}}

### Grant the user access to the database

`sysdba` としてログオンし、以下の権限を付与します。

{{< tabs >}}

{{% tab "Multi-tenant" %}}
{{% dbm-oracle-multitenant-permissions-grant-sql %}}
{{% /tab %}}

{{% tab "Non-CDB" %}}
{{% dbm-oracle-non-cdb-permissions-grant-sql %}}
{{% /tab %}}

{{% tab "Oracle 11" %}}
{{% dbm-oracle-11-permissions-grant-sql %}}
{{% /tab %}}

{{< /tabs >}}

### ビューの作成

`sysdba` としてログオンし、`sysdba` スキーマに新しい `view` を作成し、Agent ユーザーにアクセス権を与えます。

{{< tabs >}}

{{% tab "Multi-tenant" %}}
{{% dbm-multitenant-view-create-sql %}}
{{% /tab %}}

{{% tab "Non-CDB" %}}
{{% dbm-non-cdb-view-create-sql %}}
{{% /tab %}}

{{% tab "Oracle 11" %}}
{{% dbm-oracle-11-view-create-sql %}}
{{% /tab %}}

{{< /tabs >}}

### Agent のインストール

For installation steps, see the [Agent installation instructions][1].

### Agent の構成

Create the Oracle Agent conf file `/etc/datadog-agent/conf.d/oracle.d/conf.yaml`. See the [sample conf file][4] for all available configuration options.

**Note:** The configuration subdirectory for the Agent releases below `7.53.0` is `oracle-dbm.d`.

{{< tabs >}}
{{% tab "マルチテナント" %}}
```yaml
init_config:
instances:
  - server: '<HOSTNAME_1>:<PORT>'
    service_name: "<CDB_SERVICE_NAME>" # Oracle CDB サービス名
    username: 'c##datadog'
    password: '<PASSWORD>'
    dbm: true
    tags:  # オプション
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
  - server: '<HOSTNAME_2>:<PORT>'
    service_name: "<CDB_SERVICE_NAME>" # Oracle CDB サービス名
    username: 'c##datadog'
    password: '<PASSWORD>'
    dbm: true
    tags:  # オプション
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
```

The Agent connects only to the root multitenant container database (CDB). It queries the information about PDB while connected to the root CDB. Don't create connections to individual PDBs.
{{% /tab %}}

{{% tab "Non-CDB" %}}
{{% dbm-oracle-selfhosted-config %}}
{{% /tab %}}

{{% tab "Oracle 11" %}}
{{% dbm-oracle-selfhosted-config %}}

{{% /tab %}}
{{< /tabs >}}

すべての Agent の構成が完了したら、[Datadog Agent を再起動][9]します。

### Install or verify the Oracle integration

#### First-time installations

On the Integrations page in Datadog, install the [Oracle integration][7] for your organization. This installs an [Oracle dashboard][2] in your account that can be used to monitor the performance of your Oracle databases.

#### Existing installations

{{% dbm-existing-oracle-integration-setup %}}

### Validate the setup

[Run the Agent's status subcommand][8] and look for `oracle` under the **Checks** section. Navigate to the [Dashboard][2] and [Databases][3] page in Datadog to get started.

## カスタムクエリ

Database Monitoring supports custom queries for Oracle databases. See the [conf.yaml.example][4] to learn more about the configuration options available.

<div class="alert alert-warning">カスタムクエリを実行すると、Oracle によって追加コストまたは手数料が課される場合があります。</div>

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[3]: https://app.datadoghq.com/databases
[4]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle.d/conf.yaml.example
[5]: /database_monitoring/data_collected/#sensitive-information
[6]: /database_monitoring/agent_integration_overhead/?tab=oracle
[7]: https://app.datadoghq.com/integrations/oracle
[8]: /agent/configuration/agent-commands/#agent-status-and-information
[9]: /agent/guide/agent-commands/#start-stop-and-restart-the-agent

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}
