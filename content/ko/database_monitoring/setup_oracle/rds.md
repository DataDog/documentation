---
description: RDS Oracle용 데이터베이스 모니터링 설치 및 설정
further_reading:
- link: /integrations/oracle/
  tag: 설명서
  text: 기본 Oracle 통합
title: RDS Oracle에 대한 데이터베이스 모니터링 설정
---

{{% dbm-oracle-definition %}}

Agent는 읽기 전용 사용자로 로그인하여 데이터베이스에서 직접 원격 분석을 수집합니다.

## 시작 전 참고 사항

{{% dbm-supported-oracle-versions %}}

{{% dbm-supported-oracle-agent-version %}}

성능에 미치는 영향
: 데이터베이스 모니터링에 대한 기본 Agent 설정은 변경하지 않는 것이 좋으나 수집 간격 및 쿼리 샘플링 속도와 같은 설정은 필요에 맞게 조정할 수 있습니다. 대부분의 워크로드에서 Agent는 데이터베이스에서 쿼리 실행 시간의 1% 미만, CPU의 1% 미만을 나타냅니다. <br/><br/>
데이터베이스 모니터링은 기본 Agent 위에서 통합으로 실행됩니다([벤치마크 참조][1]).

프록시프록시, 로드 밸런서 및 연결 풀러
: Agent는 모니터링 중인 호스트에 직접 연결해야 합니다. Agent 는 프록시, 로드 밸런서 또는 연결 풀러를 통해 데이터베이스에 연결하면 안 됩니다. 각 Agent는 기본 호스트 이름을 알고 있어야 하며 장애 조치의 경우에도 수명 기간 동안 단일 호스트를 고수해야 합니다. Datadog Agent가 실행되는 동안 다른 호스트에 연결하면 메트릭 값이 올바르지 않게 됩니다.

데이터 보안 고려 사항
: Agent가 데이터베이스에서 수집하는 데이터와 해당 데이터의 보안을 보장하는 방법에 대한 자세한 내용은 [민감한 정보][6]를 참조하세요.

## 설정

Oracle 데이터베이스에서 데이터베이스 모니터링을 활성화하려면 다음 단계를 완료하세요.

1. [Datadog 사용자 생성](#create-the-datadog-user)
1. [사용자에게 데이터베이스 액세스 권한 부여](#grant-the-user-access-to-the-database)
1. [Agent 설치](#install-the-agent)
1. [Agent 설정](#configure-the-agent)
1. [Oracle 통합 설치 및 인증](#install-or-verify-the-oracle-integration)
1. [설정 검증](#validate-the-setup)

### Datadog 사용자 생성

{{% dbm-create-oracle-user %}}

### 사용자에게 데이터베이스에 대한 액세스 권한 부여

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
### 비밀번호를 안전하게 저장하기
{{% dbm-secret %}}

### 에이전트 설치

Agent를 설치할 위치를 결정하려면 [DBM 설치 아키텍처][10] 문서를 참조하세요. Agent에는 외부 Oracle 클라이언트가 필요하지 않습니다.

설치 단계는 [Agent 설치 지침][8]을 참조하세요.

### Agent 설정

Oracle Agent 구성 파일 `/etc/datadog-agent/conf.d/oracle.d/conf.yaml`을 생성합니다. 사용 가능한 모든 구성 옵션은 [샘플 구성 파일][9]을 참조하세요.

**참고:** `7.53.0` 이하 Agent 릴리스의 설정 하위 디렉터리는 `oracle-dbm.d`입니다.

```yaml
init_config:
instances:
  - server: '<RDS_INSTANCE_ENDPOINT_1>:<PORT>'
    service_name: "<SERVICE_NAME>" # Oracle CDB 서비스 이름
    username: 'datadog'
    password: 'ENC[datadog_user_database_password]'
    dbm: true
    tags:  # 선택 사항
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
  - server: '<RDS_INSTANCE_ENDPOINT_2>:<PORT>'
    service_name: "<SERVICE_NAME>" # Oracle CDB 서비스 이름
    username: 'datadog'
    password: 'ENC[datadog_user_database_password]'
    dbm: true
    tags:  # 선택 사항
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
```

모든 Agent 구성이 완료되면 [Datadog Agent를 다시 시작][2]합니다.

### Oracle 통합 설치 또는 확인

#### 최초 설치

Datadog의 통합 페이지에서 조직에 대한 [Oracle 통합][7]을 설치합니다. 그러면 Oracle 데이터베이스의 성능을 모니터링하는 데 사용할 수 있는 [Oracle 대시보드][5]가 계정에 설치됩니다.

#### 기존 설치

{{% dbm-existing-oracle-integration-setup %}}

### 설정 확인 

[Agent의 상태 하위 명령을 실행][3]하고 **Checks** 섹션에서 `oracle`을 찾습니다. 시작하려면 Datadog의 [Dashboard][5] 및 [Databases][4] 페이지로 이동하세요.

## 커스텀 쿼리

데이터베이스 모니터링은 Oracle 데이터베이스에 대한 커스텀 쿼리를 지원합니다. 사용 가능한 구성 옵션에 대해 자세히 알아보려면 [conf.yaml.example][9]을 참조하세요.

<div class="alert alert-danger">커스텀 쿼리를 실행하면 Oracle에서 부과하는 추가 비용 또는 수수료가 발생할 수 있습니다.</div>

[1]: /ko/database_monitoring/agent_integration_overhead/?tab=oracle
[2]: /ko/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[3]: /ko/agent/configuration/agent-commands/#agent-status-and-information
[4]: https://app.datadoghq.com/databases
[5]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[6]: /ko/database_monitoring/data_collected/#sensitive-information
[7]: https://app.datadoghq.com/integrations/oracle
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle.d/conf.yaml.example
[10]: /ko/database_monitoring/architecture/

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}