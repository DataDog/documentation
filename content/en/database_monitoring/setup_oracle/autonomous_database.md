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

<div class="alert alert-info">
The features described on this page are in beta. Contact your Customer Success Manager to provide feedback or ask for help.
</div>

Database Monitoring provides deep visibility into your Oracle databases by exposing query samples to profile your different workloads and diagnose issues.

<div class="alert alert-danger">
Before completing the steps below, verify that you have met <a href="/database_monitoring/setup_oracle/?tab=linux#prerequisites">the prerequisites</a> for Database Monitoring.
</div>

## Agent database user setup

The Datadog Agent requires read-only access to the database server to collect samples.

### Create user

If you installed the legacy Oracle integration, skip this step because the user already exists. You must, however, execute the subsequent steps.

Create a read-only login to connect to your server and grant the required permissions:

```SQL
CREATE USER datadog IDENTIFIED BY your_password ;
```

### Grant permissions 

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
```

## Configure the Agent

Download the wallet zip file from the Oracle Cloud and unzip it.

To start collecting Oracle telemetry, first [install the Datadog Agent][1]. 

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
[11]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle-dbm.d/conf.yaml.example

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
