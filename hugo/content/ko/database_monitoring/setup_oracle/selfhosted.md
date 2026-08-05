---
description: 자체 호스팅 Oracle용 데이터베이스 모니터링 설치 및 설정
further_reading:
- link: /integrations/oracle/
  tag: 설명서
  text: 기본 Oracle 통합
title: 자체 호스팅 Oracle에 대한 데이터베이스 모니터링 설정
---

{{% dbm-oracle-definition %}}

Agent는 읽기 전용 사용자로 로그인하여 데이터베이스에서 직접 원격 분석을 수집합니다.

## 시작 전 참고 사항

{{% dbm-supported-oracle-versions %}}

{{% dbm-supported-oracle-agent-version %}}

성능에 미치는 영향
: 데이터베이스 모니터링의 기본 Agent는 보수적으로 설정되어 있지만 수집 간격, 쿼리 샘플링 속도 등을 필요에 맞게 조정할 수 있습니다. 대부분의 작업 부하에서 Agent는 데이터베이스 쿼리 실행 시간의 1% 미만과 CPU의 1% 미만을 나타냅니다. <br/><br/>
데이터베이스 모니터링은 기본  Agent 위에서 통합으로 실행됩니다([벤치마크 참조][6]).

프록시, 로드 밸런서 및 연결 풀러
: Agent는 모니터링 중인 호스트에 직접 연결해야 합니다. Agent는 프록시, 로드 밸런서 또는 연결 풀러를 통해 데이터베이스에 연결하면 안 됩니다. 각 Agent는 기본 호스트 이름을 알고 있어야 하며 장애 조치의 경우에도 수명 기간 동안 단일 호스트를 고수해야 합니다. Datadog Agent가 실행되는 동안 다른 호스트에 연결하면 메트릭 값이 올바르지 않게 됩니다.

데이터 보안 고려 사항
: Agent가 데이터베이스에서 수집하는 데이터와 해당 데이터의 보안을 유지하는 방법에 대한 자세한 내용은 [민감한 정보][5]를 참조하세요.

## 설정

Oracle 데이터베이스에서 데이터베이스 모니터링을 활성화하려면 다음을 완료하세요.

1. [Datadog 사용자 생성](#create-the-datadog-user)
1. [사용자에게 데이터베이스 액세스 권한 부여](#grant-the-user-access-to-the-database)
1. [뷰 생성](#create-a-view)
1. [Agent 설치](#install-the-agent)
1. [Agent 설정](#configure-the-agent)
1. [Oracle 통합 설치 및 확인](#install-or-verify-the-oracle-integration)
1. [설정 확인](#validate-the-setup)

### Datadog 사용자 생성

레거시 Oracle 통합이 이미 설치되어 있는 경우 사용자가 이미 존재하므로 이 단계를 건너뛰세요.

읽기 전용 로그인을 생성하여 서버에 연결하고 필요한 권한을 부여하세요.

{{< tabs >}}
{{% tab "Multi-tenant" %}}
```SQL
CREATE USER c##datadog IDENTIFIED BY &password CONTAINER = ALL ;

ALTER USER c##datadog SET CONTAINER_DATA=ALL CONTAINER=CURRENT;
```
{{% /tab %}}

{{% tab "Non-CDB" %}}
```SQL
CREATE USER datadog IDENTIFIED BY &password ;
```
{{% /tab %}}

{{% tab "Oracle 11" %}}
```SQL
CREATE USER datadog IDENTIFIED BY &password ;
```
{{% /tab %}}
{{< /tabs >}}

### 사용자에게 데이터베이스에 대한 액세스 권한 부여

`sysdba`로 로그온하고, 다음 권한을 부여하세요:


{{< tabs >}}

{{% tab "Multi-tenant" %}}
{{% dbm-oracle-multitenant-permissions-grant-sql %}}
{{% /tab %}}

{{% tab "Non-CDB" %}}
{{% dbm-oracle-non-cdb-permissions-grant-sql %}}
{{% /tab %}}

{{% tab "Oracle 11" %}}
{{% dbm-oracle-11-permissions-grant-sql %}}
{{% /tab %}}

{{< /tabs >}}

### 비밀번호를 안전하게 저장하기
{{% dbm-secret %}}

### 보기 생성하기

`sysdba`로 로그온하고 `sysdba` 스키마에 새 `view`를 생성한 다음 Agent 사용자에게 이에 대한 액세스 권한을 부여합니다:

{{< tabs >}}

{{% tab "Multi-tenant" %}}
{{% dbm-multitenant-view-create-sql %}}
{{% /tab %}}

{{% tab "Non-CDB" %}}
{{% dbm-non-cdb-view-create-sql %}}
{{% /tab %}}

{{% tab "Oracle 11" %}}
{{% dbm-oracle-11-view-create-sql %}}
{{% /tab %}}

{{< /tabs >}}

### 에이전트 설치

설치 단계는 [Agent 설치 지침][1]을 참조하세요.

### Agent 설정

Oracle Agent conf 파일 `/etc/datadog-agent/conf.d/oracle.d/conf.yaml`을 생성합니다. 사용 가능한 설정 옵션은 [샘플 conf 파일][4]을 참조하세요.

**참고:** `7.50.1`과 `7.53.0`사이의 Agent 릴리스에 대한 구성 하위 디렉터리는 `oracle-dbm.d`입니다. 자세한 내용은 [Agent 7.50.1 이상 버전에서 Oracle 통합 구성][10]을 참고하세요.

{{< tabs >}}
{{% tab "Multi-tenant" %}}
```yaml
init_config:
instances:
  - server: '<HOSTNAME_1>:<PORT>'
    service_name: "<CDB_SERVICE_NAME>" # The Oracle CDB service name
    username: 'c##datadog'
    password: 'ENC[datadog_user_database_password]'
    dbm: true
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
  - server: '<HOSTNAME_2>:<PORT>'
    service_name: "<CDB_SERVICE_NAME>" # The Oracle CDB service name
    username: 'c##datadog'
    password: 'ENC[datadog_user_database_password]'
    dbm: true
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
```

Agent는 루트 다중 테넌트 컨테이너 데이터베이스(CDB)에만 연결되며, 루트 CDB에 연결되어 있는 동안 PDB에 대한 정보를 쿼리합니다. 개별 PDB에 대한 연결은 생성하지 마세요.
{{% /tab %}}

{{% tab "Non-CDB" %}}
{{% dbm-oracle-selfhosted-config %}}
{{% /tab %}}

{{% tab "Oracle 11" %}}
{{% dbm-oracle-selfhosted-config %}}

{{% /tab %}}
{{< /tabs >}}

에이전트 설정이 모두 완료되면 [Datadog 에이전트를 다시 시작][9]하세요.

### 설정 확인 

[Agent의 상태 하위 명령을 실행][8]하고 **Checks** 섹션에서 `oracle`을 찾습니다. 시작하려면 Datadog의 [대시보드][2] 및 [데이터베이스][3] 페이지로 이동하세요.

## 커스텀 쿼리

데이터베이스 모니터링은 Oracle 데이터베이스에 대한 커스텀 쿼리를 지원합니다. 사용 가능한 설정 옵션에 대해 자세히 알아보려면 [conf.yaml.example][4]을 참조하세요.

<div class="alert alert-danger">커스텀 쿼리를 실행하면 Oracle에서 부과하는 추가 비용 또는 수수료가 발생할 수 있습니다.</div>

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[3]: https://app.datadoghq.com/databases
[4]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle.d/conf.yaml.example
[5]: /ko/database_monitoring/data_collected/#sensitive-information
[6]: /ko/database_monitoring/agent_integration_overhead/?tab=oracle
[7]: https://app.datadoghq.com/integrations/oracle
[8]: /ko/agent/configuration/agent-commands/#agent-status-and-information
[9]: /ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: /ko/integrations/guide/oracle-check-upgrade-7.50.1/

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}