---
title: Setting Up Database Monitoring for RDS Oracle
kind: documentation
description: Install and configure Database Monitoring for RDS Oracle
further_reading:
- link: "/integrations/oracle/"
  tag: "Documentation"
  text: "Basic Oracle Integration"

---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

{{% dbm-oracle-definition %}}

The Agent collects telemetry directly from the database by logging in as a read-only user.

## Before you begin

{{% dbm-supported-oracle-versions %}}

{{% dbm-supported-oracle-agent-version %}}

Performance impact
: The default Agent configuration for Database Monitoring is conservative, but you can adjust settings such as the collection interval and query sampling rate to better suit your needs. For most workloads, the Agent represents less than one percent of query execution time on the database and less than one percent of CPU. <br/><br/>
Database Monitoring runs as an integration on top of the base Agent ([see benchmarks][1]).

Proxies, load balancers, and connection poolers
: The Agent must connect directly to the host being monitored. The Agent should not connect to the database through a proxy, load balancer, or connection pooler. Each Agent must have knowledge of the underlying hostname and should stick to a single host for its lifetime, even in cases of failover. If the Datadog Agent connects to different hosts while it is running, the values of metrics will be incorrect.

Data security considerations
: See [Sensitive information][6] for information about what data the Agent collects from your databases and how to ensure it is secure.

## Setup

Complete the following steps to enable Database Monitoring with your Oracle database:

1. [Create the Datadog user](#create-the-datadog-user)
1. [Grant the user access to the database](#grant-the-user-access-to-the-database)
1. [Install the Agent](#install-the-agent)
1. [Configure the Agent](#configure-the-agent)
1. [Install or verify the Oracle integration](#install-or-verify-the-oracle-integration)
1. [Validate the setup](#validate-the-setup)

### Create the Datadog user

{{% dbm-create-oracle-user %}}

### Grant the user access to the database

```SQL
grant create session to datadog ;
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SESSION','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$DATABASE','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$CONTAINERS','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SQLSTATS','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SQL','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$INSTANCE','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SQL_PLAN_STATISTICS_ALL','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('DBA_FEATURE_USAGE_STATISTICS','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$PROCESS','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SESSION','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$CON_SYSMETRIC','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('CDB_TABLESPACE_USAGE_METRICS','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('CDB_TABLESPACES','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SQLCOMMAND','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$DATAFILE','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SGAINFO','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SYSMETRIC','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$PDBS','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('CDB_SERVICES','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$OSSTAT','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$PARAMETER','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SQLSTATS','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$CONTAINERS','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SQL_PLAN_STATISTICS_ALL','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SQL','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$PGASTAT','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$ASM_DISKGROUP','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$RSRCMGRMETRIC','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$DATAGUARD_CONFIG','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$DATAGUARD_STATS','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$TRANSACTION','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$LOCKED_OBJECT','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('DBA_OBJECTS','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('CDB_DATA_FILES','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('DBA_DATA_FILES','DATADOG','SELECT',p_grant_option => false);
```

### Install the Agent

See the [DBM Setup Architecture][10] documentation to determine where to install the Agent. The Agent doesn't require any external Oracle clients.

For installation steps, see the [Agent installation instructions][8].

### Configure the Agent

Create the Oracle Agent conf file `/etc/datadog-agent/conf.d/oracle.d/conf.yaml`. See the [sample conf file][9] for all available configuration options.

**Note:** The configuration subdirectory for the Agent releases below `7.53.0` is `oracle-dbm.d`.

```yaml
init_config:
instances:
  - server: '<RDS_INSTANCE_ENDPOINT_1>:<PORT>'
    service_name: "<SERVICE_NAME>" # The Oracle CDB service name
    username: 'datadog'
    password: '<PASSWORD>'
    dbm: true
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
  - server: '<RDS_INSTANCE_ENDPOINT_2>:<PORT>'
    service_name: "<SERVICE_NAME>" # The Oracle CDB service name
    username: 'datadog'
    password: '<PASSWORD>'
    dbm: true
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
```

Once all Agent configuration is complete, [restart the Datadog Agent][2].

### Install or verify the Oracle integration

#### First-time installations

On the Integrations page in Datadog, install the [Oracle integration][7] for your organization. This installs an [Oracle dashboard][5] in your account that can be used to monitor the performance of your Oracle databases.

#### Existing installations

{{% dbm-existing-oracle-integration-setup %}}

### Validate the setup

[Run the Agent's status subcommand][3] and look for `oracle` under the **Checks** section. Navigate to the [Dashboard][5] and [Databases][4] page in Datadog to get started.

## Custom queries

Database Monitoring supports custom queries for Oracle databases. See the [conf.yaml.example][9] to learn more about the configuration options available.

<div class="alert alert-warning">Running custom queries may result in additional costs or fees assessed by Oracle.</div>

[1]: /agent/basic_agent_usage#agent-overhead
[2]: /agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[3]: /agent/configuration/agent-commands/#agent-status-and-information
[4]: https://app.datadoghq.com/databases
[5]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[6]: /database_monitoring/data_collected/#sensitive-information
[7]: https://app.datadoghq.com/integrations/oracle
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle.d/conf.yaml.example
[10]: /database_monitoring/architecture/

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
