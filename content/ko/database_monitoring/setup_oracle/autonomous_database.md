---
description: Oracle Autonomous Database용 데이터베이스 모니터링 설치 및 설정
further_reading:
- link: /integrations/oracle/
  tag: 설명서
  text: 기본 Oracle 통합
title: Oracle Autonomous Database에 대한 데이터베이스 모니터링 설정
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
```

## Agent 설정

Oracle Cloud에서 지갑 zip 파일을 다운로드하고 압축을 풉니다.

Oracle 텔레메트리 수집을 시작하려면 먼저 [Datadog Agent를 설치][1]하세요.

Oracle Agent 설정 파일 `/etc/datadog-agent/conf.d/oracle-dbm.d/conf.yaml`을 생성합니다. 사용 가능한 모든 설정 옵션은 [샘플 설정 파일][2]을 참조하세요.

`protocol` 및 `wallet` 설정 파라미터를 설정합니다.

```yaml
init_config:
instances:
  - server: '<HOST_1>:<PORT>'
    service_name: "<SERVICE_NAME>" # Oracle CDB 서비스 이름
    username: 'datadog'
    password: '<PASSWORD>'
    protocol: TCPS
    wallet: <YOUR_WALLET_DIRECTORY>
    dbm: true
    tags:  # 선택 사항 
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
  - server: '<HOST_2>:<PORT>'
    service_name: "<SERVICE_NAME>" # Oracle CDB 서비스 이름
    username: 'datadog'
    password: '<PASSWORD>'
    protocol: TCPS
    wallet: <YOUR_WALLET_DIRECTORY>
    dbm: true
    tags:  # 선택 사항
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
```

모든 Agent 설정이 완료되면 [Datadog Agent를 다시 시작합니다][4].

### 검증

[Agent의 상태 하위 명령을 실행][5]하고 **Checks** 섹션에서 `oracle-dbm`을 찾으세요. 시작하려면 Datadog에서 [DBM Oracle Database Overview][7] 대시보드 및 [Databases][6] 페이지로 이동하세요.

## 커스텀 쿼리

데이터베이스 모니터링은 Oracle 데이터베이스에 대한 커스텀 쿼리를 지원합니다. 사용 가능한 구성 옵션에 대해 자세히 알아보려면 [conf.yaml.example][11]을 참조하세요.

<div class="alert alert-warning">커스텀 쿼리를 실행하면 Oracle에서 부과하는 추가 비용 또는 수수료가 발생할 수 있습니다.</div>

[1]: /ko/database_monitoring/setup_oracle
[2]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle-dbm.d/conf.yaml.example
[3]: /ko/getting_started/tagging/unified_service_tagging
[4]: /ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: /ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://app.datadoghq.com/databases
[7]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[11]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle-dbm.d/conf.yaml.example

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}