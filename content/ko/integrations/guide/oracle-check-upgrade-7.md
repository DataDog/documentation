---
title: Agent 7.50.1+에서 Oracle 통합 구성하기
---

[Oracle 통합][3]은 [Agent 릴리스][2] `7.53.0`에서 완전히 재작성되었으며, Agent `7.50.1` 이상에서 설정할 수 있습니다. 이 가이드에서는 새로운 Oracle 검사를 올바르게 설정하는 방법을 설명합니다.

## 무엇이 변경되었나요?

- 새 검사에는 Oracle JDBC 드라이버와 같은 외부 클라이언트가 필요하지 않습니다. `jdbc` 관련 파라미터는 새 검사에서 무시됩니다.

- 새로운 Oracle 검사는 더 이상 사용되지 않는 Oracle 통합과 동일한 [메트릭][1]을 생성합니다.

- 멀티테넌트 데이터베이스의 시스템 메트릭은 플러그 가능한 각 데이터베이스에 방출됩니다.

- 메트릭은 Agent 호스트 이름 대신 시스템 보기에 기록된 데이터베이스 호스트 이름(`v$instance.host_name`)으로 전송됩니다.

## 설정 단계

### Agent v7.53.0+

하위 디렉터리 `oracle.d` 설정은 동일하게 유지됩니다.

**참고**: 에이전트는 `V$` 뷰를 쿼리하여 모든 노드에서 개별적으로 정보를 수집하므로, Oracle Real Application 클러스터(RAC) 고객은 각 RAC 노드에 대해 에이전트를 설정해야 합니다. 에이전트 쿼리는 상호 연결 트래픽을 생성하지 않도록 `GV$` 보기를 생성하지 않습니다.

새로운 Oracle 검사에서는 더 이상 사용되지 않는 Oracle 통합보다 데이터베이스의 시스템 보기에 더 많은 읽기 권한이 필요합니다. Agent를 업그레이드하기 전에 호스팅 유형에 맞는 `grant` 명령을 실행하세요.

{{< tabs >}}
{{% tab "Multi-tenant" %}}

`sysdba`로 로그온하고, 다음 권한을 부여하세요:


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
`sysdba`로 로그인하여 다음 권한을 승인합니다.

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

권한이 누락된 경우 레거시 호환성 모드에서 Oracle 검사가 실행되고 로그 파일에 다음과 같은 경고가 나타납니다. `missing privileges detected, running in deprecated integration compatibility mode`.

### Agent v7.50.1-7.52.1

새로운 Oracle 검사는 Agent 릴리스 `7.50.1`에서 활성화할 수 있습니다.

`7.50.1` 및 `7.52.1` 사이의 Agent 릴리스 설정 하위 디렉터리는 `oracle-dbm.d`입니다.

**참고**: 에이전트는 `V$` 뷰를 쿼리하여 모든 노드에서 개별적으로 정보를 수집하므로, Oracle Real Application 클러스터(RAC) 고객은 각 RAC 노드에 대해 에이전트를 설정해야 합니다. 에이전트 쿼리는 상호 연결 트래픽을 생성하지 않도록 `GV$` 보기를 생성하지 않습니다.

1. 예를 들어 하위 디렉터리 `oracle.d`에서 `oracle-dbm.d`으로 설정 파일을 복사합니다.

```shell
cp /etc/datadog-agent/conf.d/oracle.d/conf.yaml /etc/datadog-agent/conf.d/oracle-dbm.d/conf.yaml
```

2. 다음 설정 파라미터를 사용하는 경우 이름을 변경합니다.
- `user`를 `username`으로 변경합니다,
- `use_instant_client`를 `instant_client`로

3. 예를 들어 `oracle.d` 하위 디렉터리에서 설정 파일을 비활성화합니다.

```shell
mv /etc/datadog-agent/conf.d/oracle.d/conf.yaml /etc/datadog-agent/conf.d/oracle.d/conf.yaml.bak
```

4. [Agent v7.53.0+용 설정 단계](#agent-v7530)에 설명된 대로 호스팅 유형에 맞는 Datadog 데이터베이스 계정에 권한을 부여합니다.

5. 에이전트를 재시작하세요

[1]: https://github.com/DataDog/integrations-core/blob/master/oracle/metadata.csv
[2]: https://github.com/DataDog/datadog-agent/releases
[3]: https://docs.datadoghq.com/ko/integrations/oracle