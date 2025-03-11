---
description: 자체 호스팅 MySQL에 대한 데이터베이스 모니터링을 설치하고 설정합니다.
further_reading:
- link: /integrations/mysql/
  tag: 설명서
  text: 기본 MySQL 통합
title: 자체 호스팅 MySQL에 대한 데이터베이스 모니터링 설정
---

{{< site-region region="gov" >}}
해당 지역에서는 데이터베이스 모니터링이 지원되지 않습니다
{{< /site-region >}}

데이터베이스 모니터링은 InnoDB 스토리지 엔진에 대한 쿼리 메트릭, 쿼리 샘플, 설명 계획, 연결 데이터, 시스템 메트릭, 텔레메트리를 표시하여 MySQL 데이터베이스에 대해 구체적인 가시성을 제공합니다.

Agent는 읽기 전용 사용자로 로그인하여 데이터베이스에서 직접 텔레메트리를 수집합니다. MySQL 데이터베이스로데이터베이스 모니터링을 활성화하려면 다음대로 설정하세요.

1. [데이터베이스 파라미터 설정](#configure-mysql-settings)
1. [Agent에 데이터베이스에 대한 액세스 권한 부여](#grant-the-agent-access)
1. [Agent 설치](#install-the-agent)

## 시작 전 참고 사항

지원되는 MySQL 버전
: 5.6, 5.7, 또는 8.0+

지원되는 Agent 버전
: 7.36.1+

성능에 미치는 영향
: 데이터베이스 모니터링에 대한 기본 Agent 설정은 변경하지 않는 것이 좋으나 수집 간격 및 쿼리 샘플링 속도와 같은 설정은 필요에 맞게 조정할 수 있습니다. 대부분의 워크로드에서 Agent는 데이터베이스에서 쿼리 실행 시간의 1% 미만, CPU의 1% 미만을 나타냅니다. <br/><br/>
데이터베이스 모니터링은 기본 Agent 위에서 통합으로 실행됩니다([벤치마크 참조][1]).

프록시, 로드 밸런서, 연결 풀러
:  Agent는 모니터링 대상 호스트에 직접 연결해야 합니다. 자체 호스팅 데이터베이스의 경우 `127.0.0.1` 또는 소켓을 사용하는 것이 좋습니다. Agent는 프록시, 로드 밸런서 또는 연결 풀러를 통해 데이터베이스에 연결해서는 안 됩니다. 이는 클라이언트 애플리케이션에 대한 안티 패턴이 될 수 있지만, 각 Agent는 기본 호스트 이름을 알고 있어야 하며 장애 조치 시에도 수명 기간 동안 단일 호스트를 고수해야 합니다. Datadog Agent가 실행되는 동안 다른 호스트에 연결하면 메트릭 값이 올바르지 않게 됩니다.

데이터 보안 고려 사항
: Agent가 데이터베이스에서 수집하는 데이터와 데이터 보안을 유지하는 방법에 대한 자세한 내용은 [민감한 정보][2]를 참조하세요.

## MySQL 설정 구성

쿼리 메트릭, 샘플, 설명 계획을 수집하려면  [MySQL 성능 스키마][3]를 활성화하고 명령줄 또는 설정 파일 (예: `mysql.conf`)에서 다음 [성능 스키마 옵션][4]을 설정합니다:

{{< tabs >}}
{{% tab "MySQL 5.6" %}}
| 파라미터 | 값 | 설명 |
| --- | --- | --- |
| `performance_schema`| `ON` | 필수 사항. 성능 스키마를 활성화합니다. |
| `max_digest_length`| `4096`| 더 큰 쿼리를 수집하기 위해 필요합니다. 기본값을 그대로 두면 `1024`보다 긴 쿼리가 수집되지 않습니다. | 
| <code style="word-break:break-all;">`performance_schema_max_digest_length`</code>| `4096`|  `max_digest_length`와 일치해야 합니다. | 
| `performance-schema-consumer-events-statements-current`| `ON` | 필수 사항. 현재 실행 중인 쿼리를 모니터링할 수 있습니다. |
| `performance-schema-consumer-events-waits-current`| `ON`| 필수 사항. 대기 이벤트 수집을 활성화합니다. |
| `performance-schema-consumer-events-statements-history-long`| `ON` | 권장 사항. 모든 스레드에서 더 많은 수의 최근 쿼리를 추적할 수 있습니다. 이를 사용하면 자주 발생하지 않는 쿼리에서 실행 세부 정보를 캡처할 가능성이 높아집니다. |
| `performance-schema-consumer-events-statements-history`| `ON` | 선택 사항. 스레드별로 최근 쿼리 기록을 추적할 수 있습니다. 이를 사용하면 자주 발생하지 않는 쿼리에서 실행 세부 정보를 캡처할 가능성이 높아집니다. |
{{% /tab %}}

{{% tab "MySQL ≥ 5.7" %}}
| 파라미터 | 값  | 설명 |
| --- | --- | --- |
| `performance_schema`| `ON`| 필수 사항. 성능 스키마를 활성화합니다. |
| `max_digest_length`|`4096`| 더 큰 쿼리를 수집하기 위해 필요합니다. 기본값을 그대로 두면 `1024`보다 긴 쿼리가 수집되지 않습니다. |
| <code style="word-break:break-all;">`performance_schema_max_digest_length`</code>| `4096`| `max_digest_length`와 일치해야 합니다. |
| <code style="word-break:break-all;">`performance_schema_max_sql_text_length`</code>| `4096`| `max_digest_length`와 일치해야 합니다. |
| `performance-schema-consumer-events-statements-current`| `ON`| 필수 사항. 현재 실행 중인 쿼리를 모니터링할 수 있습니다. |
| `performance-schema-consumer-events-waits-current`| `ON`| 필수 사항. 대기 이벤트 수집을 활성화합니다. |
| `performance-schema-consumer-events-statements-history-long`| `ON`| 권장 사항. 모든 스레드에서 더 많은 수의 최근 쿼리를 추적할 수 있습니다. 이를 사용하면 자주 발생하지 않는 쿼리에서 실행 세부 정보를 캡처할 가능성이 높아집니다 |
| `performance-schema-consumer-events-statements-history`|`ON`| 선택 사항. 스레드별로 최근 쿼리 기록을 추적할 수 있습니다. 이를 사용하면 자주 발생하지 않는 쿼리에서 실행 세부 정보를 캡처할 가능성이 높아집니다. |
{{% /tab %}}
{{< /tabs >}}


**참고**: Agent 액세스 권한 부여의 일부로 Agent가 런타임에 동적으로 `performance-schema-consumer-*` 설정을 사용하도록 허용합니다. [런타임 설정 컨슈머](#runtime-setup-consumers)를 참조하세요.

## Agent에 액세스 권한 부여

Datadog Agent가 통계와 쿼리를 수집하려면 데이터베이스에 대한 읽기 전용 액세스가 필요합니다.

다음 지침은 `datadog@'%'`를 사용하는 모든 호스트에서 로그인할 수 있도록 Agent에 권한을 부여합니다. `datadog@'localhost'`를 사용하여 로컬 호스트에서만 로그인하도록 `datadog` 사용자를 제한할 수 있습니다. 자세한 정보는 [MySQL 설명서][5]를 참조하세요.

{{< tabs >}}
{{% tab "MySQL ≥ 8.0" %}}

`datadog` 사용자를 생성하고 기본 권한을 부여하세요.

```sql
CREATE USER datadog@'%' IDENTIFIED by '<UNIQUEPASSWORD>';
ALTER USER datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT REPLICATION CLIENT ON *.* TO datadog@'%';
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{% tab "MySQL 5.6 & 5.7" %}}

`datadog` 사용자를 생성하고 기본 권한을 부여하세요.

```sql
CREATE USER datadog@'%' IDENTIFIED BY '<UNIQUEPASSWORD>';
GRANT REPLICATION CLIENT ON *.* TO datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{< /tabs >}}

다음 스키마 생성:

```sql
CREATE SCHEMA IF NOT EXISTS datadog;
GRANT EXECUTE ON datadog.* to datadog@'%';
GRANT CREATE TEMPORARY TABLES ON datadog.* TO datadog@'%';
```

Agent가 설명 계획을 수집할 수 있도록 `explain_statement` 절차를 생성합니다:

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

또한 설명 계획을 수집하려는 **모든 스키마에서** 이 절차를 생성합니다. `<YOUR_SCHEMA>`를 해당 데이터베이스 스키마로 변경하세요.

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

### 런타임 설정 컨슈머
다음 절차를 생성하여 Agent가 런타임에 `performance_schema.events_*` 컨슈머를 실행할 수 있는 기능을 제공하도록 합니다.

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

## 에이전트 설치하기

DataDog Agent를 설치하면 MySQL에 데이터베이스 모니터링에 필요한 MySQL 검사도 설치됩니다. MySQL 데이터베이스 호스트에 대한 Agent를 아직 설치하지 않은 경우 [Agent 설치 지침][6]을 참조하세요.

호스트에서 실행 중인 Agent에 대해 이 검사를 설정하려면:

[Agent의 설정 디렉터리][7] 루트에 있는 `conf.d/` 폴더에서 `mysql.d/conf.yaml` 파일을 편집하여 MySQL [메트릭](#metric-collection)과 [로그](#log-collection-optional) 수집을 시작하세요. 커스텀 메트릭을 포함하여 사용 가능한 모든 설정 옵션은 [sample mysql.d/conf.yaml][8]에서 확인하세요.

### 메트릭 수집

이 설정 블록을 `mysql.d/conf.yaml`에 추가하여 MySQL 메트릭을 수집하세요.

```yaml
init_config:

instances:
  - dbm: true
    host: 127.0.0.1
    port: 3306
    username: datadog
    password: '<YOUR_CHOSEN_PASSWORD>' # 앞서 CREATE USER 단계에서

**참고**: 특수 문자가 있는 경우 비밀번호를 작은따옴표로 묶어 입력하세요.


`datadog` 사용자는 MySQL 통합 설정에서 `localhost` 대신 `host: 127.0.0.1`로 설정되어야 합니다. 또는, `sock`를 사용합니다.

MySQL 메트릭을 Datadog으로 전송하기 위해 [Agent를 재시작합니다.][9]

### 로그 수집 (선택 사항)

Agent가 데이터베이스에서 수집한 텔레메트리 외에도 데이터베이스 로그를 Datadog으로 직접 전송하도록 선택할 수있습니다.

1. 기본적으로 MySQL은 읽기 위해 루트 액세스 권한이 필요한 모든 항목을 `/var/log/syslog`에서 기록합니다. 로그에 더 쉽게 액세스할 수 있도록 하려면 다음 단계를 따르세요:

   1. `/etc/mysql/conf.d/mysqld_safe_syslog.cnf`을 편집하여 모든 행에 코멘트를 추가합니다.
   2. `/etc/mysql/my.cnf`를 편집하여 원하는 로깅 설정을 사용하세요. 예를 들어, 일반, 오류 및 느린 쿼리 로그를 사용하도록 설정하려면 다음 구성을 사용합니다:

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
   4.  Agent가 `/var/log/mysql` 디렉토리 및 내부의 모든 파일에 대한 읽기 권한을 가지고 있는지 확인합니다. 이러한 파일이 고려되었는지, 사용 권한이 올바르게 설정되었는지 확인하기 위해 `logrotate` 설정을 다시 확인하세요.
      `/etc/logrotate.d/mysql-server`에는 다음과 유사한 내용이 있습니다:

     ```text
       /var/log/mysql.log /var/log/mysql/mysql.log /var/log/mysql/mysql_slow.log {
               daily
               rotate 7
               missingok
               create 644 mysql adm
               Compress
       }
     ```

2. Datadog Agent에서 로그 수집은 기본적으로 비활성화되어 있으므로 `datadog.yaml` 파일에서 활성화하세요.

   ```yaml
   logs_enabled: true
   ```

3. MySQL 로그 수집을 시작하려면 이 설정 블록을 `mysql.d/conf.yaml` 파일에 추가합니다:

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

4. [Agent를 재시작합니다][9].

## 검증

[Agent의 상태 하위 명령을 실행][10]하고 Checks 섹션에서 `mysql`을 찾습니다. 또는 [Databases][11] 페이지를 방문하여 시작하세요!

## Agent 설정 예시
{{% dbm-mysql-agent-config-examples %}}

## 트러블슈팅

설명에 따라 통합 및 Agent를 설치 및 설정하였으나 제대로 작동하지 않는 경우 [트러블슈팅][12]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/basic_agent_usage#agent-overhead
[2]: /ko/database_monitoring/data_collected/#sensitive-information
[3]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
[4]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-options.html
[5]: https://dev.mysql.com/doc/refman/8.0/en/creating-accounts.html
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: /ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[9]: /ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: /ko/agent/guide/agent-commands/#agent-status-and-information
[11]: https://app.datadoghq.com/databases
[12]: /ko/database_monitoring/troubleshooting/?tab=mysql