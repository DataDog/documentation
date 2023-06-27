---
title: Setting Up Database Monitoring for RDS Oracle
kind: documentation
description: Install and configure Database Monitoring for RDS Oracle
private: true
is_beta: true
further_reading:
- link: "/integrations/oracle/"
  tag: "Documentation"
  text: "Basic Oracle Integration"

---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

<div class="alert alert-info">
The features described on this page are in private beta.
</div>

Database Monitoring provides deep visibility into your Oracle databases by exposing query samples to profile your different workloads and diagnose issues.

Complete the following steps to enable Database Monitoring with your database:

1. [Agent database user setup](#agent-database-user-setup).
2. [Install the Agent][1].

## Agent database user setup

The Datadog Agent requires read-only access to the database server in order to collect samples.

### Create user

If you installed the legacy Oracle integration, skip this step because the user already exists. You must, however, execute the subsequent steps.

Create a read-only login to connect to your server and grant the required permissions:

```SQL
CREATE USER datadog IDENTIFIED BY your_password ;
```

### Grant permissions 

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
```

## Configure the Agent

To start collecting Oracle telemetry, first [install the Datadog Agent][1]. 

Create the Oracle Agent conf file `/etc/datadog-agent/conf.d/oracle-dbm.d/conf.yaml`. See the [sample conf file][2] for all available configuration options.

```yaml
init_config:
instances:
  - server: '<RDS_INSTANCE_ENDPOINT_1>:<PORT>'
    service_name: "<SERVICE_NAME>" # The Oracle CDB service name
    username: 'c##datadog'
    password: '<PASSWORD>'
    reported_hostname: '<USER_FRIENDLY_HOSTNAME>' #Optional
    dbm: true
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
  - server: '<RDS_INSTANCE_ENDPOINT_2>:<PORT>'
    service_name: "<SERVICE_NAME>" # The Oracle CDB service name
    username: 'c##datadog'
    password: '<PASSWORD>'
    reported_hostname: '<USER_FRIENDLY_HOSTNAME>' #Optional
    dbm: true
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
```

Use the `service` and `env` tags to link your database telemetry to other telemetry through a common tagging scheme. See [Unified Service Tagging][3] to learn more about how these tags are used in Datadog.

You can use the `reported_hostname` configuration parameter to define a user friendly hostname instead of the default cryptic hostname containing the IP address.

Once all Agent configuration is complete, [restart the Datadog Agent][4].

### Validate

[Run the Agent's status subcommand][5] and look for `oracle-dbm` under the **Checks** section. Navigate to the [Dashboard][7] and [Databases][6] page in Datadog to get started.

[1]: /database_monitoring/setup_oracle/#install-agent
[2]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle-dbm.d/conf.yaml.example
[3]: /getting_started/tagging/unified_service_tagging
[4]: /agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: /agent/guide/agent-commands/#agent-status-and-information
[6]: https://app.datadoghq.com/databases
[7]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
