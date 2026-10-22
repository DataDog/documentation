---
description: 자체 호스팅 MySQL에 대한 데이터베이스 모니터링을 설치하고 설정합니다.
further_reading:
- link: /integrations/mysql/
  tag: 문서
  text: 기본 MySQL 통합
title: 자체 호스팅 MySQL에 대한 데이터베이스 모니터링 설정
---
데이터베이스 모니터링은 InnoDB 스토리지 엔진에 대한 쿼리 메트릭, 쿼리 샘플, 실행 계획, 연결 데이터, 시스템 메트릭, 텔레메트리를 노출하여 MySQL에 대한 높은 가시성을 제공합니다.

**참고**: MariaDB를 사용하는 경우 대신 [MariaDB 설정][15]를 참조하세요.

Agent는 읽기 전용 사용자로 로그인하여 데이터베이스에서 직접 텔레메트리를 수집합니다. MySQL 데이터베이스에서 데이터베이스 모니터링을 활성화하려면 다음 설정을 수행하세요.

1. [데이터베이스 파라미터 구성](#configure-mysql-settings)
1. [Agent에 데이터베이스 액세스 권한 부여](#grant-the-agent-access)
1. [Agent 설치](#install-the-agent)

## 시작 전 참고 사항 {#before-you-begin}

지원되는 MySQL 버전
: 5.6, 5.7, 8.0+ 또는 9 (MySQL 9는 Agent 7.84 이상 필요)

지원되는 MariaDB 버전
: 10.5, 10.6, 10.11, 11.1, 12 또는 13 (MariaDB 12 및 13은 Agent 7.84 이상 필요) <br/><br/>
MariaDB용 데이터베이스 모니터링은 [알려진 제한 사항][13]과 함께 지원됩니다.

지원되는 Agent 버전
: 7.36.1 이상

성능 영향
: Database Monitoring을 위한 기본 Agent 구성은 보수적이지만, 수집 간격 및 쿼리 샘플링 비율과 같은 구성을 조정하여 환경에 맞게 최적화할 수 있습니다. 대부분의 워크로드에서 Agent는 데이터베이스 쿼리 실행 시간의 1% 미만, CPU 사용량의 1% 미만을 차지합니다. <br/><br/>
Database Monitoring은 기본 Agent 위에서 실행되는 통합 기능입니다([벤치마크 참조][1]).

프록시, 로드 밸런서 및 연결 풀러
: Datadog Agent는 모니터링 대상 호스트에 직접 연결되어야 합니다. 자체 호스팅 데이터베이스의 경우 `127.0.0.1` 또는 소켓을 사용하세요. Agent는 프록시, 로드 밸런서, 연결 풀러를 통해 데이터베이스에 연결해서는 안 됩니다. Agent가 실행 중에 다른 호스트로 연결을 전환하는 경우(예: 장애 조치, 로드 밸런싱 등), 서로 다른 두 호스트의 통계 차이를 계산하게 되어 부정확한 메트릭이 생성됩니다.

데이터 보안 고려 사항
: Agent가 데이터베이스에서 수집하는 데이터와 이를 안전하게 보호하는 방법에 대해서는 [민감한 정보][2]를 참조하세요.

## MySQL 설정 구성{#configure-mysql-settings}

쿼리 메트릭, 샘플, 실행 계획을 수집하려면 [MySQL 성능 스키마][3]를 활성화하고 명령줄 또는 설정 파일(예: `mysql.conf`)에서 다음 [성능 스키마 옵션][4]을 설정합니다:

{{< tabs >}}
{{% tab "MySQL ≥ 5.7" %}}
| 파라미터 | 값 | 설명 |
| --- | --- | --- |
| `performance_schema` | `ON` | 필수입니다. 성능 스키마를 활성화합니다. |
| `max_digest_length` | `4096` | 더 긴 쿼리 수집에 필요합니다. 기본값을 유지하면 `1024`자를 초과하는 쿼리는 수집되지 않습니다. |
| <code style="word-break:break-all;">`performance_schema_max_digest_length`</code> | `4096` | `max_digest_length`와 일치해야 합니다. |
| <code style="word-break:break-all;">`performance_schema_max_sql_text_length`</code> | `4096` | `max_digest_length`와 일치해야 합니다. |
| `performance-schema-consumer-events-statements-current` | `ON` | 필수입니다. 현재 실행 중인 쿼리에 대한 모니터링을 활성화합니다. |
| `performance-schema-consumer-events-waits-current` | `ON` | 필수입니다. 대기 이벤트 수집을 활성화합니다. |
| `performance-schema-consumer-events-statements-history-long` | `ON` | 권장됩니다. 모든 스레드에서 더 많은 수의 최근 쿼리 추적을 활성화합니다. 이 기능을 활성화하면 드물게 발생하는 쿼리의 실행 세부 정보를 캡처할 가능성이 높아집니다. |
| `performance-schema-consumer-events-statements-history` | `ON` | 선택 사항입니다. 스레드별 최근 쿼리 기록 추적을 활성화합니다. 이 기능을 활성화하면 드물게 발생하는 쿼리의 실행 세부 정보를 캡처할 가능성이 높아집니다. |
{{% /tab %}}
{{% tab "MySQL 5.6" %}}
| 파라미터 | 값 | 설명 |
| --- | --- | --- |
| `performance_schema` | `ON` | 필수입니다. 성능 스키마를 활성화합니다. |
| `max_digest_length` | `4096` | 더 긴 쿼리 수집에 필요합니다. 기본값을 유지하면 `1024`자를 초과하는 쿼리는 수집되지 않습니다. |
| <code style="word-break:break-all;">`performance_schema_max_digest_length`</code> | `4096` | `max_digest_length`와 일치해야 합니다. |
| `performance-schema-consumer-events-statements-current` | `ON` | 필수입니다. 현재 실행 중인 쿼리에 대한 모니터링을 활성화합니다. |
| `performance-schema-consumer-events-waits-current` | `ON` | 필수입니다. 대기 이벤트 수집을 활성화합니다. |
| `performance-schema-consumer-events-statements-history-long` | `ON` | 권장됩니다. 모든 스레드에서 더 많은 수의 최근 쿼리 추적을 활성화합니다. 이 기능을 활성화하면 드물게 발생하는 쿼리의 실행 세부 정보를 캡처할 가능성이 높아집니다. |
| `performance-schema-consumer-events-statements-history` | `ON` | 선택 사항입니다. 스레드별 최근 쿼리 기록 추적을 활성화합니다. 이 기능을 활성화하면 드물게 발생하는 쿼리의 실행 세부 정보를 캡처할 가능성이 높아집니다. |
{{% /tab %}}
{{< /tabs >}}


**참고**: Agent 액세스 권한 부여의 일부로 Agent가 런타임에 `performance-schema-consumer-*` 설정을 동적으로 활성화하도록 허용할 것을 권장합니다. [런타임 설정 컨슈머](#runtime-setup-consumers)를 참조하세요.

## Agent에 액세스 권한 부여 {#grant-the-agent-access}

Datadog Agent가 통계와 쿼리를 수집하려면 데이터베이스에 대한 읽기 전용 액세스가 필요합니다.

다음 지침에 따라 Agent가 `datadog@'%'`를 사용하여 모든 호스트에서 로그인할 수 있는 권한을 부여합니다. `datadog@'localhost'`를 사용하여 `datadog` 사용자가 로컬호스트를 통해서만 로그인하도록 제한할 수 있습니다. 자세한 내용은 [MySQL 설명서][5]를 참조하세요.

{{< tabs >}}
{{% tab "MySQL ≥ 5.7" %}}

`datadog` 사용자를 생성하고 기본 권한을 부여하세요.

```sql
CREATE USER datadog@'%' IDENTIFIED by '<UNIQUEPASSWORD>';
ALTER USER datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT REPLICATION CLIENT ON *.* TO datadog@'%';
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{% tab "MySQL 5.6" %}}

`datadog` 사용자를 생성하고 기본 권한을 부여하세요.

```sql
CREATE USER datadog@'%' IDENTIFIED BY '<UNIQUEPASSWORD>';
GRANT REPLICATION CLIENT ON *.* TO datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{< /tabs >}}

다음 스키마를 생성합니다.

```sql
CREATE SCHEMA IF NOT EXISTS datadog;
GRANT EXECUTE ON datadog.* to datadog@'%';
```

Agent가 실행 계획을 수집할 수 있도록 `explain_statement` 프로시저를 생성합니다.

```sql
DELIMITER $$
CREATE PROCEDURE datadog.explain_statement(IN query TEXT)
    SQL SECURITY DEFINER
BEGIN
    SET @explain := CONCAT('EXPLAIN FORMAT=json ', query);
    PREPARE stmt FROM @explain;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END $$
DELIMITER ;
```

또한 실행 계획을 수집하려는 **모든 스키마**에 이 프로시저를 생성합니다. `<YOUR_SCHEMA>`를 데이터베이스 스키마로 바꿉니다.

```sql
DELIMITER $$
CREATE PROCEDURE <YOUR_SCHEMA>.explain_statement(IN query TEXT)
    SQL SECURITY DEFINER
BEGIN
    SET @explain := CONCAT('EXPLAIN FORMAT=json ', query);
    PREPARE stmt FROM @explain;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END $$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE <YOUR_SCHEMA>.explain_statement TO datadog@'%';
```

인덱스 메트릭을 수집하려면 `datadog` 사용자에게 추가 권한을 부여합니다.

```sql
GRANT SELECT ON mysql.innodb_index_stats TO datadog@'%';
```

Agent v7.65부터 Datadog Agent는 MySQL 데이터베이스에서 스키마 정보를 수집할 수 있습니다. 이 수집 작업에 필요한 Agent 권한 부여 방법에 대한 자세한 내용은 아래의 [스키마 수집][14] 섹션을 참조하세요.


### 런타임 설정 컨슈머 {#runtime-setup-consumers}
Datadog은 Agent가 런타임에 `performance_schema.events_*` 컨슈머를 실행할 수 있도록 다음 프로시저를 생성할 것을 권장합니다.

```SQL
DELIMITER $$
CREATE PROCEDURE datadog.enable_events_statements_consumers()
    SQL SECURITY DEFINER
BEGIN
    UPDATE performance_schema.setup_consumers SET enabled='YES' WHERE name LIKE 'events_statements_%';
    UPDATE performance_schema.setup_consumers SET enabled='YES' WHERE name = 'events_waits_current';
END $$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE datadog.enable_events_statements_consumers TO datadog@'%';
```

### 비밀번호 안전하게 저장 {#securely-store-your-password}
{{% dbm-secret %}}

## Agent 설치 {#install-the-agent}

Datadog Agent를 설치하면 MySQL용 Database Monitoring에 필요한 MySQL 검사도 함께 설치됩니다. MySQL 데이터베이스 호스트에 아직 Agent를 설치하지 않았다면 [Agent 설치 지침][6]을 참조하세요.

호스트에서 실행 중인 Agent에 대해 이 검사를 구성하려면 다음 단계를 따르세요.

[Agent 구성 디렉터리][7] 루트의 `conf.d/` 폴더에 있는 `mysql.d/conf.yaml` 파일을 편집하여 MySQL [메트릭](#metric-collection) 및 [로그](#log-collection-optional) 수집을 시작합니다. 사용자 지정 메트릭 옵션을 포함하여 사용 가능한 모든 구성 옵션은 [샘플 mysql.d/conf.yaml][8]을 참조하세요.

### 메트릭 수집 {#metric-collection}

이 구성 블록을 `mysql.d/conf.yaml`에 추가하여 MySQL 메트릭을 수집합니다.

```yaml
init_config:

instances:
  - dbm: true
    host: 127.0.0.1
    port: 3306
    username: datadog
    password: 'ENC[datadog_user_database_password]' # from the CREATE USER step earlier
```

`datadog` 사용자는 MySQL 통합 구성에서 `host: 127.0.0.1` 대신 `localhost`로 설정해야 합니다. 또는 `sock`을 사용할 수 있습니다.

MySQL 메트릭을 Datadog으로 전송하기 위해 [Agent를 재시작합니다.][9]

### 로그 수집(선택 사항) {#log-collection-optional}

Agent가 데이터베이스에서 수집한 텔레메트리 외에도 데이터베이스 로그를 Datadog으로 직접 전송하도록 선택할 수있습니다.

1. 기본적으로 MySQL은 모든 항목을 `/var/log/syslog`에 기록하며, 이를 읽으려면 루트 액세스 권한이 필요합니다. 로그에 더 쉽게 액세스하려면 다음 단계를 따르세요.

   1. `/etc/mysql/conf.d/mysqld_safe_syslog.cnf`를 편집하고 모든 줄에 코멘트를 추가합니다.
   2. `/etc/mysql/my.cnf`를 편집하여 원하는 로깅 설정을 활성화합니다. 예를 들어 일반, 오류, 느린 쿼리 로그를 활성화하려면 다음 구성을 사용합니다.

     ```conf
       [mysqld_safe]
       log_error = /var/log/mysql/mysql_error.log

       [mysqld]
       general_log = on
       general_log_file = /var/log/mysql/mysql.log
       log_error = /var/log/mysql/mysql_error.log
       slow_query_log = on
       slow_query_log_file = /var/log/mysql/mysql_slow.log
       long_query_time = 3
     ```

   3. 파일을 저장하고 MySQL을 다시 시작합니다.
   4. Agent가 `/var/log/mysql` 디렉터리와 디렉터리 내 모든 파일에 대한 읽기 권한이 있는지 확인합니다. `logrotate` 구성을 다시 확인하여 해당 파일이 고려 대상에 포함되어 있고 권한이 올바르게 설정되었는지 확인합니다.
      `/etc/logrotate.d/mysql-server`에는 다음과 유사한 내용이 포함되어야 합니다.

     ```text
       /var/log/mysql.log /var/log/mysql/mysql.log /var/log/mysql/mysql_slow.log {
               daily
               rotate 7
               missingok
               create 644 mysql adm
               Compress
       }
     ```

2. 로그 수집은 기본적으로 Datadog Agent에서 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화하세요.

   ```yaml
   logs_enabled: true
   ```

3. 이 구성 블록을 `mysql.d/conf.yaml` 파일에 추가해 MySQL 로그 수집을 시작합니다:

   ```yaml
   logs:
     - type: file
       path: "<ERROR_LOG_FILE_PATH>"
       source: mysql
       service: "<SERVICE_NAME>"

     - type: file
       path: "<SLOW_QUERY_LOG_FILE_PATH>"
       source: mysql
       service: "<SERVICE_NAME>"
       log_processing_rules:
         - type: multi_line
           name: new_slow_query_log_entry
           pattern: "# Time:"
           # If mysqld was started with `--log-short-format`, use:
           # pattern: "# Query_time:"
           # If using mysql version <5.7, use the following rules instead:
           # - type: multi_line
           #   name: new_slow_query_log_entry
           #   pattern: "# Time|# User@Host"
           # - type: exclude_at_match
           #   name: exclude_timestamp_only_line
           #   pattern: "# Time:"

     - type: file
       path: "<GENERAL_LOG_FILE_PATH>"
       source: mysql
       service: "<SERVICE_NAME>"
       # For multiline logs, if they start by the date with the format yyyy-mm-dd uncomment the following processing rule
       # log_processing_rules:
       #   - type: multi_line
       #     name: new_log_start_with_date
       #     pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
       # If the logs start with a date with the format yymmdd but include a timestamp with each new second, rather than with each log, uncomment the following processing rule
       # log_processing_rules:
       #   - type: multi_line
       #     name: new_logs_do_not_always_start_with_timestamp
       #     pattern: \t\t\s*\d+\s+|\d{6}\s+\d{,2}:\d{2}:\d{2}\t\s*\d+\s+
   ```

4. [Agent를 재시작][9]합니다.

## 검증 {#validate}

[Agent의 상태 하위 명령][10]을 실행하고 Checks 섹션에서 `mysql`을 찾거나 [Databases][11] 페이지를 참조하여 시작하세요!

## Agent 구성 예시 {#example-agent-configurations}
{{% dbm-mysql-agent-config-examples %}}

## 문제 해결 {#troubleshooting}

설명에 따라 통합 및 Agent를 설치 및 설정하였으나 제대로 작동하지 않는 경우 [문제 해결][12]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/database_monitoring/agent_integration_overhead/?tab=mysql
[2]: /ko/database_monitoring/data_collected/#sensitive-information
[3]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
[4]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-options.html
[5]: https://dev.mysql.com/doc/refman/8.0/en/creating-accounts.html
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: /ko/agent/configuration/agent-configuration-files/#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[9]: /ko/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[10]: /ko/agent/configuration/agent-commands/#agent-status-and-information
[11]: https://app.datadoghq.com/databases
[12]: /ko/database_monitoring/troubleshooting/?tab=mysql
[14]: /ko/database_monitoring/setup_mysql/selfhosted?tab=mysql57#collecting-schemas
[15]: /ko/database_monitoring/setup_mariadb/