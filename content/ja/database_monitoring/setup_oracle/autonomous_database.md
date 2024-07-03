---
description: Install and configure Database Monitoring for Oracle Autonomous Database
further_reading:
- link: /integrations/oracle/
  tag: Documentation
  text: Basic Oracle Integration
title: Setting Up Database Monitoring for Oracle Autonomous Database
---

{{% dbm-oracle-definition %}}

読み取り専用ユーザーとしてログインし、Agent でデータベースから直接テレメトリーを収集します。

## はじめに

{{% dbm-supported-oracle-versions %}}

{{% dbm-supported-oracle-agent-version %}}

パフォーマンスへの影響
: データベースモニタリングのデフォルトの Agent コンフィギュレーションは保守的ですが、収集間隔やクエリのサンプリングレートなどの設定を調整することで、よりニーズに合ったものにすることができます。ワークロードの大半において、Agent はデータベース上のクエリ実行時間の 1 % 未満、および CPU の 1 % 未満を占めています。<br/><br/>
データベースモニタリングは、ベースとなる Agent 上のインテグレーションとして動作します ([ベンチマークを参照][1]してください)。

Proxies, load balancers, and connection poolers
: The Agent must connect directly to the host being monitored. The Agent should not connect to the database through a proxy, load balancer, or connection pooler. Each Agent must have knowledge of the underlying hostname and should stick to a single host for its lifetime, even in cases of failover. If the Datadog Agent connects to different hosts while it is running, the values of metrics will be incorrect.

データセキュリティへの配慮
: Agent がお客様のデータベースからどのようなデータを収集するか、またそのデータの安全性をどのように確保しているかについては、[機密情報][2]を参照してください。

## セットアップ

Complete the following to enable Database Monitoring with your Oracle database:

1. [Create the Datadog user](#create-the-datadog-user)
1. [Grant the user access to the database](#grant-the-user-access-to-the-database)
1. [Agent をインストールする](#install-the-agent)
1. [Configure the Agent](#configure-the-agent)
1. [Install or verify the Oracle integration](#install-or-verify-the-oracle-integration)
1. [Validate the setup](#validate-the-setup)

### Create the Datadog user

{{% dbm-create-oracle-user %}}

### Grant the user access to the database

```SQL
grant create session to datadog ;
grant select on v$session to datadog ;
grant select on v$database to datadog ;
grant select on v$containers to datadog;
grant select on v$sqlstats to datadog ;
grant select on v$instance to datadog ;
grant select on dba_feature_usage_statistics to datadog ;
grant select on V$SQL_PLAN_STATISTICS_ALL to datadog ;
grant select on V$PROCESS to datadog ;
grant select on V$SESSION to datadog ;
grant select on V$CON_SYSMETRIC to datadog ;
grant select on CDB_TABLESPACE_USAGE_METRICS to datadog ;
grant select on CDB_TABLESPACES to datadog ;
grant select on V$SQLCOMMAND to datadog ;
grant select on V$DATAFILE to datadog ;
grant select on V$SYSMETRIC to datadog ;
grant select on V$SGAINFO to datadog ;
grant select on V$PDBS to datadog ;
grant select on CDB_SERVICES to datadog ;
grant select on V$OSSTAT to datadog ;
grant select on V$PARAMETER to datadog ;
grant select on V$SQLSTATS to datadog ;
grant select on V$CONTAINERS to datadog ;
grant select on V$SQL_PLAN_STATISTICS_ALL to datadog ;
grant select on V$SQL to datadog ;
grant select on V$PGASTAT to datadog ;
grant select on v$asm_diskgroup to datadog ;
grant select on v$rsrcmgrmetric to datadog ;
grant select on v$dataguard_config to datadog ;
grant select on v$dataguard_stats to datadog ;
grant select on v$transaction to datadog;
grant select on v$locked_object to datadog;
grant select on dba_objects to datadog;
grant select on cdb_data_files to datadog;
grant select on dba_data_files to datadog;
```

### Agent のインストール

See the [DBM Setup Architecture][12] documentation to determine where to install the Agent. The Agent doesn't require any external Oracle clients.

For installation steps, see the [Agent installation instructions][8].

### Agent の構成

Oracle Cloud からウォレットの zip ファイルをダウンロードし、解凍します。

Create the Oracle Agent conf file `/etc/datadog-agent/conf.d/oracle.d/conf.yaml`. See the [sample conf file][11] for all available configuration options.

**Note:** The configuration subdirectory for the Agent releases below `7.53.0` is `oracle-dbm.d`.

`protocol` と `wallet` の構成パラメーターを設定します。

```yaml
init_config:
instances:
  - server: '<HOST_1>:<PORT>'
    service_name: "<SERVICE_NAME>" # Oracle CDB サービス名
    username: 'datadog'
    password: '<PASSWORD>'
    protocol: TCPS
    wallet: <YOUR_WALLET_DIRECTORY>
    dbm: true
    tags:  # オプション
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
  - server: '<HOST_2>:<PORT>'
    service_name: "<SERVICE_NAME>" # Oracle CDB サービス名
    username: 'datadog'
    password: '<PASSWORD>'
    protocol: TCPS
    wallet: <YOUR_WALLET_DIRECTORY>
    dbm: true
    tags:  # オプション
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
```

すべての Agent の構成が完了したら、[Datadog Agent を再起動][4]します。

### Install or verify the Oracle integration

#### First-time installations

On the Integrations page in Datadog, install the [Oracle integration][9] for your organization. This installs an [Oracle dashboard][7] in your account that can be used to monitor the performance of your Oracle databases.

#### Existing installations

{{% dbm-existing-oracle-integration-setup %}}

### Validate the setup

[Run the Agent's status subcommand][5] and look for `oracle` under the **Checks** section. Navigate to the [DBM Oracle Database Overview][7] dashboard and [Databases][6] page in Datadog to get started.

## カスタムクエリ

Database Monitoring supports custom queries for Oracle databases. See the [conf.yaml.example][12] to learn more about the configuration options available.

<div class="alert alert-warning">カスタムクエリを実行すると、Oracle によって追加コストまたは手数料が課される場合があります。</div>

[1]: /ja/database_monitoring/agent_integration_overhead/?tab=oracle
[2]: /ja/database_monitoring/data_collected/#sensitive-information
[3]: /ja/getting_started/tagging/unified_service_tagging
[4]: /ja/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[5]: /ja/agent/configuration/agent-commands/#agent-status-and-information
[6]: https://app.datadoghq.com/databases
[7]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: https://app.datadoghq.com/integrations/oracle
[11]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle.d/conf.yaml.example
[12]: /ja/database_monitoring/architecture/

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}