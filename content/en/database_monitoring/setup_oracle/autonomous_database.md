---
title: Setting Up Database Monitoring for Oracle Autonomous Database
kind: documentation
description: Install and configure Database Monitoring for Oracle Autonomous Database
further_reading:
- link: "/integrations/oracle/"
  tag: "Documentation"
  text: "Basic Oracle Integration"

---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

Database Monitoring provides deep visibility into your Oracle databases by exposing query samples to profile your different workloads and diagnose issues.

The Agent collects telemetry directly from the database by logging in as a read-only user. Do the following setup to enable Database Monitoring with your Oracle database:

1. [Create the user](#create-the-user)
1. [Grant the Agent access to the database](#grant-the-agent-access-to-the-database)
1. [Install the Agent](#install-the-agent)
1. [Configure the Agent](#configure-the-agent)
1. [Install or verify the Oracle integration](#install-or-verify-the-oracle-integration)

## Before you begin

Supported Oracle versions
: 11.2, 12c, 18c, 19c, 21c

Supported Agent versions
: 7.49.1+

Performance impact
: The default Agent configuration for Database Monitoring is conservative, but you can adjust settings such as the collection interval and query sampling rate to better suit your needs. For most workloads, the Agent represents less than one percent of query execution time on the database and less than one percent of CPU. <br/><br/>
Database Monitoring runs as an integration on top of the base Agent ([see benchmarks][1]).

Proxies, load balancers, and connection poolers
: The Agent must connect directly to the host being monitored. The Agent should not connect to the database through a proxy, load balancer, or connection pooler. Each Agent must have knowledge of the underlying hostname and should stick to a single host for its lifetime, even in cases of failover. If the Datadog Agent connects to different hosts while it is running, the values of metrics will be incorrect.

Data security considerations
: See [Sensitive information][2] for information about what data the Agent collects from your databases and how to ensure it is secure.

### Create the user

If you installed the legacy Oracle integration, skip this step because the user already exists. You must, however, execute the subsequent steps.

Create a read-only login to connect to your server and grant the required permissions:

```SQL
CREATE USER datadog IDENTIFIED BY your_password ;
```

### Grant the Agent access to the database 

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

## Install the Agent

See the [DBM Setup Architecture][10] documentation to determine where to install the Agent. The Agent doesn't require any external Oracle clients.

For installation steps, see the [Agent installation instructions][8].

## Configure the Agent

Download the wallet zip file from the Oracle Cloud and unzip it.

Create the Oracle Agent conf file `/etc/datadog-agent/conf.d/oracle-dbm.d/conf.yaml`. See the [sample conf file][2] for all available configuration options.

Set the `protocol` and `wallet` configuration parameters.

```yaml
init_config:
instances:
  - server: '<HOST_1>:<PORT>'
    service_name: "<SERVICE_NAME>" # The Oracle CDB service name
    username: 'datadog'
    password: '<PASSWORD>'
    protocol: TCPS
    wallet: <YOUR_WALLET_DIRECTORY>
    dbm: true
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
  - server: '<HOST_2>:<PORT>'
    service_name: "<SERVICE_NAME>" # The Oracle CDB service name
    username: 'datadog'
    password: '<PASSWORD>'
    protocol: TCPS
    wallet: <YOUR_WALLET_DIRECTORY>
    dbm: true
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
```

After all Agent configuration is complete, [restart the Datadog Agent][4].

### Validate

[Run the Agent's status subcommand][5] and look for `oracle-dbm` under the **Checks** section. Navigate to the [DBM Oracle Database Overview][7] dashboard and [Databases][6] page in Datadog to get started.

## Install or verify the Oracle integration

### First-time installations

On the Integrations page in Datadog, install the [Oracle integration][9] for your organization. This installs an [Oracle dashboard][10] in your account that can be used to monitor the performance of your Oracle databases.

### Existing installations

For an existing installation, verify that your configuration is located in the `conf.d/oracle-dbm.d/` directory. You may need to migrate the legacy configuration from the `conf.d/oracle.d/` directory.

Use the following command to migrate the Oracle integration from the legacy integration to the new one:

```shell
cp /etc/datadog-agent/conf.d/oracle.d/conf.yaml /etc/datadog-agent/conf.d/oracle-dbm.d/conf.yaml
```

Deactivate the legacy integration:

```shell
mv /etc/datadog-agent/conf.d/oracle.d/conf.yaml /etc/datadog-agent/conf.d/oracle.d/conf.yaml.bak
```

Deactivating the legacy integration prevents sending the system metrics twice.

Since the Agent doesn't require an external Oracle client, remove the `jdbc_driver_path` configuration parameter from the new parameter file `/etc/datadog-agent/conf.d/oracle-dbm.d/conf.yaml`.

## Custom queries

Database Monitoring supports custom queries for Oracle databases. See the [conf.yaml.example][11] to learn more about the configuration options available.

<div class="alert alert-warning">Running custom queries may result in additional costs or fees assessed by Oracle.</div>

[1]: /database_monitoring/setup_oracle
[2]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle-dbm.d/conf.yaml.example
[3]: /getting_started/tagging/unified_service_tagging
[4]: /agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[5]: /agent/configuration/agent-commands/#agent-status-and-information
[6]: https://app.datadoghq.com/databases
[7]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: https://app.datadoghq.com/integrations/oracle
[10]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[11]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle-dbm.d/conf.yaml.example

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
