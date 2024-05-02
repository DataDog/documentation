---
title: Configuring the Oracle Integration on Agent 7.50.1+
kind: guide
---

The [Oracle integration][3] is completely rewritten in [Agent release][2] `7.53.0`, and can be configured for Agent `7.50.1` and above. This guide describes how to properly configure the new Oracle check.

## What has changed?

- The new check doesn't require any external clients, such as Oracle JDBC drivers. The `jdbc` related parameters are ignored in the new check.

- The new Oracle check emits the same [metrics][1] as the deprecated Oracle integration.

- System metrics in multi-tenant databases are emitted for each pluggable database.

- The metrics are emitted with the database host name as recorded in the system view `v$instance.host_name` instead of the Agent host name.

## Configuration steps

### Agent v7.53.0+

The configuration in the subdirectory `oracle.d` remains the same.

**Note**: Oracle Real Application Cluster (RAC) customers must configure the Agent for each RAC node, because the Agent collects information from every node separately by querying `V$` views. The Agent doesn't query any `GV$` views to avoid generating interconnect traffic.

The new Oracle check requires more read privileges on system views in the database than the deprecated Oracle integration. Run the `grant` commands for your hosting type prior to upgrading the Agent:

{{< tabs >}}
{{% tab "Multi-tenant" %}}

Log on as `sysdba`, and grant the following permissions:

```SQL
grant create session to c##datadog ;
grant select on v_$session to c##datadog ;
grant select on v_$database to c##datadog ;
grant select on v_$containers to c##datadog;
grant select on v_$sqlstats to c##datadog ;
grant select on v_$instance to c##datadog ;
grant select on dba_feature_usage_statistics to c##datadog ;
grant select on V_$SQL_PLAN_STATISTICS_ALL to c##datadog ;
grant select on V_$PROCESS to c##datadog ;
grant select on V_$SESSION to c##datadog ;
grant select on V_$CON_SYSMETRIC to c##datadog ;
grant select on CDB_TABLESPACE_USAGE_METRICS to c##datadog ;
grant select on CDB_TABLESPACES to c##datadog ;
grant select on V_$SQLCOMMAND to c##datadog ;
grant select on V_$DATAFILE to c##datadog ;
grant select on V_$SYSMETRIC to c##datadog ;
grant select on V_$SGAINFO to c##datadog ;
grant select on V_$PDBS to c##datadog ;
grant select on CDB_SERVICES to c##datadog ;
grant select on V_$OSSTAT to c##datadog ;
grant select on V_$PARAMETER to c##datadog ;
grant select on V_$SQLSTATS to c##datadog ;
grant select on V_$CONTAINERS to c##datadog ;
grant select on V_$SQL_PLAN_STATISTICS_ALL to c##datadog ;
grant select on V_$SQL to c##datadog ;
grant select on V_$PGASTAT to c##datadog ;
grant select on v_$asm_diskgroup to c##datadog ;
grant select on v_$rsrcmgrmetric to c##datadog ;
grant select on v_$dataguard_config to c##datadog ;
grant select on v_$dataguard_stats to c##datadog ;
grant select on v_$transaction to c##datadog;
grant select on v_$locked_object to c##datadog;
grant select on dba_objects to c##datadog;
grant select on cdb_data_files to c##datadog;
grant select on dba_data_files to c##datadog;
```
{{% /tab %}}

{{% tab "Non-CDB" %}}
Log on as `sysdba`, and grant the following permissions:

```SQL
grant create session to datadog ;
grant select on v_$session to datadog ;
grant select on v_$database to datadog ;
grant select on v_$containers to datadog;
grant select on v_$sqlstats to datadog ;
grant select on v_$instance to datadog ;
grant select on dba_feature_usage_statistics to datadog ;
grant select on V_$SQL_PLAN_STATISTICS_ALL to datadog ;
grant select on V_$PROCESS to datadog ;
grant select on V_$SESSION to datadog ;
grant select on V_$CON_SYSMETRIC to datadog ;
grant select on CDB_TABLESPACE_USAGE_METRICS to datadog ;
grant select on CDB_TABLESPACES to datadog ;
grant select on V_$SQLCOMMAND to datadog ;
grant select on V_$DATAFILE to datadog ;
grant select on V_$SYSMETRIC to datadog ;
grant select on V_$SGAINFO to datadog ;
grant select on V_$PDBS to datadog ;
grant select on CDB_SERVICES to datadog ;
grant select on V_$OSSTAT to datadog ;
grant select on V_$PARAMETER to datadog ;
grant select on V_$SQLSTATS to datadog ;
grant select on V_$CONTAINERS to datadog ;
grant select on V_$SQL_PLAN_STATISTICS_ALL to datadog ;
grant select on V_$SQL to datadog ;
grant select on V_$PGASTAT to datadog ;
grant select on v_$asm_diskgroup to datadog ;
grant select on v_$rsrcmgrmetric to datadog ;
grant select on v_$dataguard_config to datadog ;
grant select on v_$dataguard_stats to datadog ;
grant select on v_$transaction to datadog;
grant select on v_$locked_object to datadog;
grant select on dba_objects to datadog;
grant select on cdb_data_files to datadog;
grant select on dba_data_files to datadog;
```
{{% /tab %}}

{{% tab "RDS" %}}
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
{{% /tab %}}

{{% tab "Oracle Autonomous Database" %}}
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
{{% /tab %}}
{{< /tabs >}}

If the privileges are missing, the Oracle check executes in the legacy compatibility mode, and the following warning appears in the log file: `missing privileges detected, running in deprecated integration compatibility mode`.

### Agent v7.50.1-7.52.1

The new Oracle check can be activated as of the Agent release `7.50.1`.

The configuration subdirectory for the Agent releases between `7.50.1` and `7.52.1` is `oracle-dbm.d`.

**Note**: Oracle Real Application Cluster (RAC) customers must configure the Agent for each RAC node, because the Agent collects information from every node separately by querying `V$` views. The Agent doesn't query any `GV$` views to avoid generating interconnect traffic.

1. Copy the configuration file from the subdirectory `oracle.d` to `oracle-dbm.d`, for example:

```shell
cp /etc/datadog-agent/conf.d/oracle.d/conf.yaml /etc/datadog-agent/conf.d/oracle-dbm.d/conf.yaml
```

2. Rename the following configuration parameters if you are using them:
- `user` to `username`,
- `use_instant_client` to `instant_client`

3. Deactivate the configuration file in the `oracle.d` subdirectory, for example:

```shell
mv /etc/datadog-agent/conf.d/oracle.d/conf.yaml /etc/datadog-agent/conf.d/oracle.d/conf.yaml.bak
```

4. Grant privileges to the Datadog database account for your hosting type, as described in the [configuration steps for Agent v7.53.0+](#agent-v7530).

5. Restart the Agent.

[1]: https://github.com/DataDog/integrations-core/blob/master/oracle/metadata.csv
[2]: https://github.com/DataDog/datadog-agent/releases
[3]: https://docs.datadoghq.com/integrations/oracle

