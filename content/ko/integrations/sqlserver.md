---
app_id: sql-server
app_uuid: bfa2f276-da05-4153-b8d4-48d4e41f5e40
assets:
  dashboards:
    SQLServer-AlwaysOn: assets/dashboards/SQLServer-AlwaysOn_dashboard.json
    SQLServer-Overview: assets/dashboards/SQLServer-Overview_dashboard.json
    sqlserver: assets/dashboards/sqlserver_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: sqlserver.stats.connections
      metadata_path: metadata.csv
      prefix: sqlserver.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 45
    source_type_name: SQL Server
  monitors:
    Auto-parameterization attempts are failing: assets/monitors/sqlserver_high_number_failed_auto_param.json
    Availability Group is not healthy: assets/monitors/sqlserver_ao_not_healthy.json
    Availability group failover detected: assets/monitors/sqlserver_ao_failover.json
    Database is not online: assets/monitors/sqlserver_db_not_online.json
    Database not in sync: assets/monitors/sqlserver_db_not_sync.json
    Processes are blocked: assets/monitors/sqlserver_high_processes_blocked.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data stores
- log collection
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/sqlserver/README.md
display_on_public_website: true
draft: false
git_integration_title: sqlserver
integration_id: sql-server
integration_title: SQL Server
integration_version: 22.6.0
is_public: true
manifest_version: 2.0.0
name: sqlserver
public_title: SQL Server
short_description: 주요 SQL Server 성능 및 상태 메트릭을 수집하세요.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS:Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Data Stores
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: 주요 SQL Server 성능 및 상태 메트릭을 수집하세요.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-azure-sql-databases-datadog
  - resource_type: blog
    url: https://www.datadoghq.com/blog/sql-server-monitoring
  - resource_type: blog
    url: https://www.datadoghq.com/blog/sql-server-monitoring-tools
  - resource_type: blog
    url: https://www.datadoghq.com/blog/sql-server-performance
  - resource_type: blog
    url: https://www.datadoghq.com/blog/sql-server-metrics
  - resource_type: blog
    url: https://www.datadoghq.com/blog/migrate-sql-workloads-to-azure-with-datadog/
  support: README.md#Support
  title: SQL Server
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![SQL Server 그래프][1]

## 개요

SQL Server 통합은 SQL Server 인스턴스의 성능을 추적하며, 사용자 연결 수, SQL 컴파일 속도 등 여러 메트릭을 수집합니다.

쿼리 성능 및 데이터베이스 상태를 더욱 정밀하게 모니터링하려면 [Database Monitoring][2](DBM)을 활성화하세요. Datadog DBM은 표준 통합 외에도 쿼리 수준 메트릭, 실시간 및 과거 쿼리 스냅샷, 대기 이벤트 분석, 데이터베이스 부하, 쿼리 실행 계획, 차단 쿼리 인사이트를 제공합니다.

SQL Server 2012, 2014, 2016, 2017, 2019, 2022가 지원됩니다.

## 설정

<div class="alert alert-info">이 페이지는 SQL Server Agent 표준 통합에 관해 다룹니다. SQL Server용 Database Monitoring에 관한 정보는 <a href="https://docs.datadoghq.com/database_monitoring" target="_blank">Datadog Database Monitoring</a>을 참고하세요.</div>

### 설치

SQL Server 점검은 [Datadog Agent][3] 패키지에 포함되어 있어, SQL Server 인스턴스에 추가로 설치할 필요가 없습니다.

서버 속성에서 "SQL Server and Windows Authentication mode"를 활성화하여 SQL Server 인스턴스가 SQL Server 인증을 지원하는지 확인하세요.

_Server Properties_ -> _Security_ -> _SQL Server and Windows Authentication mode_

### 사전 요구 사항

**참고**: SQL Server용 Database Monitoring을 설치하려면 [문서 사이트][4]에서 호스팅 솔루션을 선택하여 관련 정보를 확인하세요.

SQL Server 점검에서 지원되는 SQL Server 버전은 Database Monitoring에서 지원되는 버전과 동일합니다. 현재 지원되는 버전은 [Setting up SQL Server 페이지][5]의 **Self-hosted** 항목에서 확인할 수 있습니다.

표준 통합을 단독으로 설치하는 경우에만 이 가이드의 다음 단계를 진행하세요.

1. 서버에 연결하려면 읽기 전용 로그인을 생성합니다.

    ```SQL
        CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
        USE master;
        CREATE USER datadog FOR LOGIN datadog;
        GRANT SELECT on sys.dm_os_performance_counters to datadog;
        GRANT VIEW SERVER STATE to datadog;
    ```

   데이터베이스당 파일 크기 메트릭을 수집하려면 다음을 실행하여 생성한 사용자(`datadog`)가 데이터베이스에 대한 [연결 권한 액세스][6]를 가지고 있는지 확인하세요.

   ```SQL
       GRANT CONNECT ANY DATABASE to datadog;
   ```

2. (AlwaysOn 및 `sys.master_files` 메트릭에 필요) AlwaysOn 및 `sys.master_files` 메트릭을 수집하려면 다음 추가 권한을 부여하세요.

    ```SQL
        GRANT VIEW ANY DEFINITION to datadog;
    ```

### 설정

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

1. [Agent 구성 디렉터리][1]의 루트의 `conf.d/` 폴더에 있는 `sqlserver.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 구성 옵션은 [샘플 sqlserver.d/conf.yaml][2]에서 확인하세요.

   ```yaml
   init_config:

   instances:
     - host: "<SQL_HOST>,<SQL_PORT>"
       username: datadog
       password: "<YOUR_PASSWORD>"
       connector: adodbapi
       adoprovider: MSOLEDBSQL19  # Replace with MSOLEDBSQL for versions 18 and previous
   ```

    포트 autodiscovery를 사용한다면 `SQL_PORT`에 `0`을 입력하세요. [예시 점검 구성][2]에서 커스텀 쿼리로 자체 메트릭을 생성하는 방법을 포함한 전체 옵션 정보를 확인해 보세요.

    SQL Server 설정에 따라 [지원되는 드라이버][3]를 사용하세요.

    **참고**: Windows Authentication을 사용하면 사용자 이름과 비밀번호를 별도로 지정하지 않아도 됩니다. 방법은 다음과 같습니다.

      ```yaml
      connection_string: "Trusted_Connection=yes"
      ```


2. [에이전트를 재시작합니다][4].

##### Linux

Linux 호스트에서 SQL Server 통합을 실행하려면 추가 구성 단계가 필요합니다.

1. 예를 들어 [Microsoft ODBC 드라이버][5] 또는 [FreeTDS 드라이버][6]와 같은 ODBC SQL Server 드라이버를 설치합니다.
2. `odbc.ini`과 `odbcinst.ini` 파일을 `/opt/datadog-agent/embedded/etc` 폴더에 복사합니다.
3. `odbc` 커넥터를 사용하도록 `conf.yaml` 파일을 구성하고 `odbcinst.ini` 파일에 표시된 대로 적절한 드라이버를 지정합니다.

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

1. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

    ```yaml
    logs_enabled: true
    ```

2. 이 구성 블록을 `sqlserver.d/conf.yaml` 파일에 추가하여 SQL Server 로그 수집을 시작합니다.

    ```yaml
    logs:
      - type: file
        encoding: utf-16-le
        path: "<LOG_FILE_PATH>"
        source: sqlserver
        service: "<SERVICE_NAME>"
    ```

    `path` 및 `service` 파라미터 값을 환경에 따라 변경합니다. 사용 가능한 모든 구성 옵션은 [샘플 sqlserver.d/conf.yaml][2]을 참고하세요.

3. [에이전트를 재시작합니다][4].

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/database_monitoring/setup_sql_server/selfhosted/#supported-drivers
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server?view=sql-server-2017
[6]: http://www.freetds.org/
{{% /tab %}}
{{% tab "Containerized" %}}

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 아래 파라미터를 적용하는 방법이 안내되어 있습니다.

##### 메트릭 수집

| 파라미터            | 값                                                                                                                            |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `sqlserver`                                                                                                                      |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                                                                                                    |
| `<INSTANCE_CONFIG>`  | `{"host": "%%host%%,%%port%%", "username": "datadog", "password": "<UNIQUEPASSWORD>", "connector": "odbc", "driver": "FreeTDS"}` |

`<UNIQUEPASSWORD>`를 레이블 대신 환경 변수로 전달하려면 [Autodiscovery 템플릿 변수][2]를 참고하세요.

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

Datadog 에이전트에서 기본적으로 로그 수집이 비활성화되어 있습니다. 활성화하려면 [쿠버네티스 로그 수집]을 확인하세요.

| 파라미터      | 값                                             |
| -------------- | ------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "sqlserver", "service": "sqlserver"}` |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ko/agent/faq/template_variables/
[3]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 검증

[Agent의 상태 하위 명령을 실행][7]하고 Checks 섹션에서 `sqlserver`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "sql-server" >}}


대부분의 메트릭은 SQL Server의 `sys.dm_os_performance_counters` 테이블에서 제공됩니다.

### 이벤트

SQL Server 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "sql-server" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.

Agent를 ARM aarch64 프로세서에서 실행하면 점검 14.0.0 버전부터 알려진 문제가 발생합니다. Python 종속성이 로드되지 않고 [Agent의 상태 하위 명령][7]을 실행할 때 다음 메시지가 표시됩니다.

```
Loading Errors
  ==============
    sqlserver
    ---------
      Core Check Loader:
        Check sqlserver not found in Catalog
      JMX Check Loader:
        check is not a jmx check, or unable to determine if it's so
      Python Check Loader:
        unable to import module 'sqlserver': No module named 'sqlserver'
```

이 문제는 점검 버전 15.2.0과 Agent 버전 7.49.1 이상부터 발생하지 않습니다.

## 참고 자료

- [Datadog으로 Azure SQL Databases 모니터링][9]
- [SQL Server 모니터링용 주요 메트릭][10]
- [SQL Server 모니터링 도구][11]
- [Datadog으로 SQL Server 성능 모니터링][12]
- [상세 모니터링을 위한 커스텀 SQL Server 메트릭][13]
- [Datadog으로 SQL 워크로드의 Azure 마이그레이션 전략 수립][14]
- [Datadog Database Monitoring으로 SQL Server 성능 최적화][15]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/sqlserver/images/sqlserver_dashboard_02_2024.png
[2]: https://docs.datadoghq.com/ko/database_monitoring/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ko/database_monitoring/#sqlserver
[5]: https://docs.datadoghq.com/ko/database_monitoring/setup_sql_server/
[6]: https://docs.microsoft.com/en-us/sql/t-sql/statements/grant-server-permissions-transact-sql?view=sql-server-ver15
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/ko/help/
[9]: https://www.datadoghq.com/blog/monitor-azure-sql-databases-datadog
[10]: https://www.datadoghq.com/blog/sql-server-monitoring
[11]: https://www.datadoghq.com/blog/sql-server-monitoring-tools
[12]: https://www.datadoghq.com/blog/sql-server-performance
[13]: https://www.datadoghq.com/blog/sql-server-metrics
[14]: https://www.datadoghq.com/blog/migrate-sql-workloads-to-azure-with-datadog/
[15]: https://www.datadoghq.com/blog/optimize-sql-server-performance-with-datadog/
