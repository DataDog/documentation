---
description: RDS Oracle용 데이터베이스 모니터링 설치 및 설정
further_reading:
- link: /integrations/oracle/
  tag: 설명서
  text: 기본 Oracle 통합
title: RDS Oracle에 대한 데이터베이스 모니터링 설정
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">이 사이트에서는 데이터베이스 모니터링이 지원되지 않습니다.</div>
{{< /site-region >}}

<div class="alert alert-info">
이 페이지에 설명된 기능은 베타 버전입니다. 피드백을 제공하거나 도움을 요청하려면 Customer Success Manager에게 문의하세요.
</div>

데이터베이스 모니터링은 쿼리 샘플을 노출하여 다양한 워크로드를 프로파일링하고 문제를 진단함으로써 Oracle 데이터베이스에 대한 심층적인 가시성을 제공합니다.

<div class="alert alert-danger">
아래 단계를 완료하기 전에 데이터베이스 모니터링에 대한 <a href="/database_monitoring/setup_oracle/?tab=linux#prerequisites">사전 요구 사항</a>을 충족했는지 확인하세요.
</div>

## Agent 데이터베이스 사용자 설정

Datadog Agent는 샘플을 수집하기 위해 데이터베이스 서버에 대한 읽기 전용 액세스 권한이 필요합니다.

### 사용자 생성

레거시 Oracle 통합을 설치한 경우, 사용자가 이미 존재하므로 이 단계를 건너뛰세요. 그러나 후속 단계를 실행해야 합니다.

읽기 전용 로그인을 생성하여 서버에 연결하고 필요한 권한을 부여하세요.

```SQL
CREATE USER datadog IDENTIFIED BY your_password ;
```

### 권한 허용

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
```

## Agent 설정

Oracle 텔레메트리 수집을 시작하려면, 먼저 [Datadog Agent를 설치하세요][1].

Oracle Agent 설정 파일 `/etc/datadog-agent/conf.d/oracle-dbm.d/conf.yaml`을 생성합니다. 사용 가능한 모든 설정 옵션은 [샘플 설정 파일][2]을 참조하세요.

```yaml
init_config:
instances:
  - server: '<RDS_INSTANCE_ENDPOINT_1>:<PORT>'
    service_name: "<SERVICE_NAME>" # Oracle CDB 서비스 이름
    username: 'datadog'
    password: '<PASSWORD>'
    dbm: true
    tags:  # 선택 사항
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
  - server: '<RDS_INSTANCE_ENDPOINT_2>:<PORT>'
    service_name: "<SERVICE_NAME>" # Oracle CDB 서비스 이름
    username: 'datadog'
    password: '<PASSWORD>'
    dbm: true
    tags:  # 선택 사항
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
```

모든 Agent 설정이 완료되면 [Datadog Agent를 다시 시작합니다][4].

### 검증

[Agent의 상태 하위 명령을 실행][5]하고 **Checks** 섹션에서 `oracle-dbm`을 찾으세요. 시작하려면 Datadog의 [Dashboard][7] 및 [Databases][6] 페이지로 이동하세요.

## 커스텀 쿼리

데이터베이스 모니터링은 Oracle 데이터베이스에 대한 커스텀 쿼리를 지원합니다. 사용 가능한 구성 옵션에 대해 자세히 알아보려면 [conf.yaml.example][11]을 참조하세요.

<div class="alert alert-warning">커스텀 쿼리를 실행하면 Oracle에서 부과하는 추가 비용 또는 수수료가 발생할 수 있습니다.</div>

[1]: /ko/database_monitoring/setup_oracle/#install-agent
[2]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle-dbm.d/conf.yaml.example
[3]: /ko/getting_started/tagging/unified_service_tagging
[4]: /ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: /ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://app.datadoghq.com/databases
[7]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[11]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle-dbm.d/conf.yaml.example

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}