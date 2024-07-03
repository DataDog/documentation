---
description: Install and configure Database Monitoring for Oracle Exadata
further_reading:
- link: /integrations/oracle/
  tag: Documentation
  text: Basic Oracle Integration
title: Setting Up Database Monitoring for Oracle Exadata
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
: See [Sensitive information][7] for information about what data the Agent collects from your databases and how to ensure it is secure.

## セットアップ

Complete the following to enable Database Monitoring with your Oracle database:

1. [Create the Datadog user](#create-the-datadog-user)
1. [Agent をインストールする](#install-the-agent)
1. [Configure the Agent](#configure-the-agent)
1. [Install or verify the Oracle integration](#install-or-verify-the-oracle-integration)
1. [Validate the setup](#validate-the-setup)

### Create the Datadog user

{{% dbm-create-oracle-user %}}

### Agent のインストール

See the [DBM Setup Architecture][12] documentation to determine where to install the Agent. The Agent doesn't require any external Oracle clients.

For installation steps, see the [Agent installation instructions][9].

### Agent の構成

#### マルチノード Exadata

Configure the Agent for each node by following the instructions for [Oracle RAC][4].

#### シングルノード Exadata

Configure the Agent by following the instructions for [self-hosted Oracle databases][3].

### Install or verify the Oracle integration

#### First-time installations

On the Integrations page in Datadog, install the [Oracle integration][10] for your organization. This installs an [Oracle dashboard][11] in your account that can be used to monitor the performance of your Oracle databases.

#### Existing installations

{{% dbm-existing-oracle-integration-setup %}}

### Validate the setup

[Run the Agent's status subcommand][1] and look for `oracle` under the **Checks** section. Navigate to the [Dashboard][11] and the [Databases][2] page in Datadog to get started.

## カスタムクエリ

Database Monitoring supports custom queries for Oracle databases. See the [conf.yaml.example][5] to learn more about the configuration options available.

<div class="alert alert-warning">カスタムクエリを実行すると、Oracle によって追加コストまたは手数料が課される場合があります。</div>

[1]: /ja/agent/configuration/agent-commands/#agent-status-and-information
[2]: https://app.datadoghq.com/databases
[3]: /ja/database_monitoring/setup_oracle/selfhosted
[4]: /ja/database_monitoring/setup_oracle/rac
[5]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle.d/conf.yaml.example
[6]: /ja/database_monitoring/agent_integration_overhead/?tab=oracle
[7]: /ja/database_monitoring/data_collected/#sensitive-information
[8]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[9]: https://app.datadoghq.com/account/settings/agent/latest
[10]: https://app.datadoghq.com/integrations/oracle
[11]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[12]: /ja/database_monitoring/architecture/

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}