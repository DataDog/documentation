---
description: 데이터베이스 모니터링 설정 문제 해결
title: MySQL용 데이터베이스 모니터링 설정 문제 해결
---
이 페이지에서는 MySQL로 데이터베이스 모니터링을 설정하고 사용하는 과정에서 발생하는 일반적인 문제와 해결 방법을 자세히 설명합니다. Datadog은 Agent 버전 릴리스에 따라 변경될 수 있으므로, 안정적인 최신 Agent 버전을 유지하고 최신 [설정 설명서][1]를 따를 것을 권장합니다.

## 일반적인 문제 진단{#diagnosing-common-problems}

### Database Monitoring을 설정한 후 데이터가 나타나지 않음 {#no-data-is-showing-after-configuring-database-monitoring}

[설정 지침][1]에 따라 Agent를 구성한 후에도 데이터가 보이지 않으면 Agent 구성이나 API 키에 문제가 있을 가능성이 큽니다. [문제 해결 가이드][2]를 참고하여 Agent로부터 데이터를 수신하고 있는지 확인해 보세요.

시스템 메트릭과 같은 다른 데이터를 수신하고 있지만 데이터베이스 모니터링 데이터(예: 쿼리 메트릭, 쿼리 샘플)는 수신하지 못하는 경우, Agent나 데이터베이스 구성에 문제가 있을 수 있습니다. Agent 구성이 [설정 지침][1]의 예시와 동일한지 확인한 후 구성 파일의 위치를 다시 확인하세요.

디버그하려면 먼저 [Agent 상태 명령][3]을 실행해 수집한 데이터와 Datadog으로 전송한 데이터의 디버깅 정보를 수집하세요.

`Config Errors` 섹션에서 구성 파일이 유효한지 확인하세요. 예를 들어, 다음은 인스턴스 구성이 누락되었거나 파일이 유효하지 않음을 의미합니다.

```
  Config Errors
  ==============
    mysql
    -----
      Configuration file contains no valid instances
```

설정이 유효하면 다음과 같은 출력이 나타납니다.

```
=========
Collector
=========

  Running Checks
  ==============

    mysql (5.0.4)
    -------------
      Instance ID: mysql:505a0dd620ccaa2a
      Configuration Source: file:/etc/datadog-agent/conf.d/mysql.d/conf.yaml
      Total Runs: 32,439
      Metric Samples: Last Run: 175, Total: 5,833,916
      Events: Last Run: 0, Total: 0
      Database Monitoring Query Metrics: Last Run: 2, Total: 51,074
      Database Monitoring Query Samples: Last Run: 1, Total: 74,451
      Service Checks: Last Run: 3, Total: 95,993
      Average Execution Time : 1.798s
      Last Execution Date : 2021-07-29 19:28:21 UTC (1627586901000)
      Last Successful Execution Date : 2021-07-29 19:28:21 UTC (1627586901000)
      metadata:
        flavor: MySQL
        version.build: unspecified
        version.major: 5
        version.minor: 7
        version.patch: 34
        version.raw: 5.7.34+unspecified
        version.scheme: semver
```

출력에 다음 줄이 있어야 하며, 값이 1 이상이어야 합니다.

```
Database Monitoring Query Metrics: Last Run: 2, Total: 51,074
Database Monitoring Query Samples: Last Run: 1, Total: 74,451
```

Agent가 올바르게 구성되어 있다면 [Agent 로그를 확인][4]해 데이터베이스 통합을 실행할 때 경고나 오류가 있는지 찾아보세요.

또한 `check` CLI 명령을 실행해 Datadog Agent에서 직접 검사를 실행하여 출력에서 오류를 찾을 수 있습니다.

```bash
# For self-hosted installations of the Agent
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true datadog-agent check postgres -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true datadog-agent check mysql -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true datadog-agent check sqlserver -t 2

# For container-based installations of the Agent
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true agent check postgres -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true agent check mysql -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true agent check sqlserver -t 2
```
### 쿼리에 실행 계획 누락됨{#queries-are-missing-explain-plans}

일부 또는 모든 쿼리에 실행 계획이 존재하지 않을 수 있습니다. 지원되지 않는 쿼리 명령, 지원되지 않는 클라이언트 애플리케이션에서 수행한 쿼리, 오래된 Agent, 불완전한 데이터베이스 설정이 원인일 수 있습니다. 다음은 실행 계획 누락의 가능한 원인입니다.

#### 누락된 이벤트 문 컨슈머 {#events-statements-consumer-missing}
실행 계획을 캡처하려면 이벤트문 컨슈머를 활성화해야 합니다. 구성 파일에 다음 옵션을 추가하여 이 작업을 수행할 수 있습니다(예: `mysql.conf`).

```
performance-schema-consumer-events-statements-current=ON
```

Datadog은 추가로 다음을 활성화할 것을 권장합니다.

```
performance-schema-consumer-events-statements-history-long=ON
```
이 옵션을 사용하면 모든 스레드에서 더 많은 수의 최근 쿼리를 추적할 수 있습니다. 이 기능을 활성화하면 드물게 발생하는 쿼리의 실행 세부 정보를 캡처할 가능성이 높아집니다.

#### 누락된 실행 계획 프로시저({#explain-plan-procedure-missing})
Agent 작동을 위해서는 `datadog.explain_statement(...)` 프로시저가 `datadog` 스키마 내에 존재해야 합니다. `datadog` 스키마 생성에 관한 자세한 내용은 [설정 지침][1]을 참조하세요.

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
#### 누락된 적격 실행 계획 프로시저 ({#explain-plan-fq-procedure-missing})
Agent 작동을 위해서는 Agent가 샘플을 수집할 수 있는 **모든 스키마** 내에 `explain_statement(...)` 프로시저가 존재해야 합니다.

실행 계획을 수집하려는 **모든 스키마**에 이 프로시저를 생성합니다. `<YOUR_SCHEMA>`를 데이터베이스 스키마로 바꿉니다.

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

#### </md_tagAgent가 지원되지 않는 버전을 실행함 {#agent-is-running-an-unsupported-version}

Agent가 7.36.1 버전 이상을 실행 중인지 확인합니다. Datadog은 새 기능, 성능 개선, 보안 업데이트를 활용할 수 있도록 Agent를 정기적으로 업데이트할 것을 권장합니다.

#### 쿼리가 잘림 {#queries-are-truncated}

샘플 쿼리 텍스트의 크기를 늘리는 방법에 관한 자세한 내용은 [잘린 쿼리 샘플](#query-samples-are-truncated) 섹션을 참조하세요.

#### 쿼리를 실행할 수 없음 {#query-cannot-be-explained}

BEGIN, COMMIT, SHOW, USE, ALTER 쿼리 등 일부 쿼리는 데이터베이스에서 유효한 실행 계획을 가져올 수 없습니다. SELECT, UPDATE, INSERT, DELETE, REPLACE 쿼리만 실행 계획을 지원합니다.

#### 쿼리가 비교적 드물게 발생하거나 빨리 실행됨 {#query-is-relatively-infrequent-or-executes-quickly}

쿼리가 데이터베이스 총 실행 시간에 중대한 비중을 차지 않아 샘플로 채택되지 않았을 수 있습니다. 해당 쿼리를 캡처하려면 [샘플링 비율 높이기][5]를 시도해 보세요.

### 쿼리 메트릭 누락됨 {#query-metrics-are-missing}

다음 단계에 따라 누락된 쿼리 메트릭을 진단하기 전에, Agent가 정상적으로 실행 중인지 확인하고, [누락된 에이전트 데이터를 진단하는 단계](#no-data-is-showing-after-configuring-database-monitoring)에 따라 진행했는지 확인합니다. 다음은 쿼리 메트릭 누락의 가능한 원인입니다.

### 인덱스 메트릭 누락됨 {#index-metrics-are-missing}

Agent에 이 오류가 표시되는 경우:

```
Error querying mysql.innodb_index_stats: (1142, "SELECT command denied to user 'datadog'@'172.20.0.5' for table 'innodb_index_stats'")
```
인덱스 메트릭을 수집하려면 `datadog` 사용자에게 SELECT 권한을 부여하여 오류를 해결합니다.

```sql
GRANT SELECT ON mysql.innodb_index_stats TO datadog@'%';
```

#### `performance_schema`가 활성화되지 않음 ({#performance-schema-not-enabled})
Agent 작동을 위해서는 `performance_schema` 옵션을 활성화해야 합니다. MySQL에서 기본적으로 활성화되어 있지만, 구성이나 클라우드 공급자에 의해 비활성화된 상태일 수 있습니다. [설정 지침][1]에 따라 이 기능을 활성화합니다.

#### </md_tagGoogle Cloud SQL 한계 {#google-cloud-sql-limitation}
호스트는 Google Cloud SQL에서 관리하며 `performance_schema`를 지원하지 않습니다. Google Cloud SQL의 한계 때문에, Datadog 데이터베이스 모니터링은 [RAM 16GB 미만의 인스턴스에서 지원되지 않습니다][6].

### 특정 쿼리가 누락됨 {#certain-queries-are-missing}

일부 쿼리에서 데이터를 가져왔지만Database Monitoring의 쿼리나 특정 쿼리를 보려면, 이 가이드를 따르세요.


| 가능한 원인                         | 해결 방법                                  |
|----------------------------------------|-------------------------------------------|
| 쿼리가 '상위 쿼리'가 아닌 경우, 즉 선택한 시간 기간의 어느 시점에서 총 실행 시간의 합계가 상위 200개 표준화된 쿼리에 속하지 않는 경우를 의미합니다. | '기타 쿼리' 행으로 그룹화되었을 가능성이 있습니다. 추적되는 쿼리에 대한 자세한 정보는 [수집 데이터][7]를 참조하세요. 추적되는 상위 쿼리 수는 Datadog 지원팀에 문의하여 늘릴 수 있습니다. |
| `events_statements_summary_by_digest`가 가득 찬 상태일 수 있습니다. | `performance_schema`의 MySQL 표`events_statements_summary_by_digest`에는 저장할 수 있는 다이제스트(표준화된 쿼리) 수의 최대 한도가 있습니다. 유지 관리 작업의 일환으로 이 표를 정기적으로 잘라내면 시간 경과에 따라 모든 쿼리를 추적할 수 있습니다. 자세한 정보는 [고급 구성][5]을 참조하세요. |
| Agent가 마지막으로 재시작된 후 쿼리가 한 번 실행되었습니다. | 쿼리 메트릭은 Agent가 재시작된 후 약 10초 간격으로 2회 중 최소 1회 실행된 후에만 제거됩니다. |

### 쿼리 샘플이 잘림 {#query-samples-are-truncated}

쿼리가 더 길면 데이터베이스 구성으로 인해 전체 SQL 텍스트가 표시되지 않을 수 있습니다. 워크로드에 맞추려면 약간의 튜닝이 필요합니다.

Datadog Agent에 표시되는 MySQL SQL 텍스트 길이는 다음 [시스템 변수][8]로 결정됩니다.

```
max_digest_length=4096
performance_schema_max_digest_length=4096
performance_schema_max_sql_text_length=4096
```

### 쿼리 활동 누락됨 {#query-activity-is-missing}

<div class="alert alert-danger">Flexible Server에서는 쿼리 활동 및 대기 이벤트 수집이 지원되지 않습니다. 이 기능을 사용하려면 Flexible Server 호스트에서 제공되지 않는 MySQL 설정이 필요하기 때문입니다.</div>

다음 단계에 따라 누락된 쿼리 활동을 진단하기 전에, Agent가 정상적으로 실행 중인지 확인하고, [누락된 에이전트 데이터를 진단하는 단계](#no-data-is-showing-after-configuring-database-monitoring)에 따라 진행했는지 확인합니다. 다음은 쿼리 활동 누락의 가능한 원인입니다.

#### `performance-schema-consumer-events-waits-current` 가 활성화되지 않음{#events-waits-current-not-enabled}
Agent 작동을 위해서는 `performance-schema-consumer-events-waits-current` 옵션을 활성화해야 합니다. MySQL에서 기본적으로 비활성화되어 있지만, 클라우드 공급자에 의해 활성화된 상태일 수 있습니다. [설정 지침][1]에 따라 이 기능을 활성화합니다. 또는 데이터베이스 재시작 방지를 위해 런타임 설정 컨슈머를 설정하는 것을 고려해 보세요. Agent가 런타임에 `performance_schema.events_*` 컨슈머를 활성화할 수 있도록 다음 프로시저를 생성합니다.


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

**참고:** 이 옵션을 사용하려면 `performance_schema`를 추가로 활성화해야 합니다.


<!-- TODO: add a custom query recipe for getting the max sql text length -->

### 수집된 스키마에서 표가 누락됨 {#tables-are-missing-from-collected-schemas}

Agent 로그에 다음으로 시작하는 경고가 표시되는 경우:

```
No tables were found across any of the N databases.
```
MySQL은 `INFORMATION_SCHEMA`의 표를 해당 표에 대한 권한을 가진 사용자에게만 노출하므로, `datadog` 사용자는 권한이 없으면 표를 볼 수 없습니다. 데이터를 읽을 수 있는 권한을 Agent에 부여하지 않고도 표 메타데이터가 표시되도록, `REFERENCES` 권한을 부여하여 경고를 해결합니다.

```sql
GRANT REFERENCES ON *.* TO datadog@'%';
```

일부 표만 누락된 경우, 권한 부여 범위에 해당 표가 포함되어 있는지 확인합니다. 개별 열로 범위가 지정된 권한은 권한이 부여된 열만 표시하고, 하나의 데이터베이스/표로 범위가 지정된 권한은 해당 데이터베이스/표에 한해서 적용됩니다. 사용 가능한 범위는 [스키마 수집][10]을 참조하세요.

### MySQL 쿼리 메트릭 및 샘플에서 스키마 또는 데이터베이스가 누락됨 {#schema-or-database-missing-on-mysql-query-metrics-samples}

`schema` 태그(또는 '데이터베이스')는 쿼리를 실행한 연결에 기본 데이터베이스가 설정된 경우에만 MySQL 쿼리 메트릭 및 샘플에 표시됩니다. 기본 데이터베이스는 데이터베이스 연결 파라미터에 '스키마'를 지정하거나, 이미 존재하는 연결에서 [USE 문][9]을 실행하는 방식으로 애플리케이션에서 구성합니다.

연결에 설정된 기본 데이터베이스가 없는 경우, 해당 연결로 만들어진 어떤 쿼리에도 `schema` 태그가 존재하지 않습니다.

## MariaDB에 대해 알려진 제한 사항{#mariadb-known-limitations}

MariaDB를 사용하는 경우, MariaDB 문제 해결 가이드의 [MariaDB known limitations][14]을 참조하세요.

[1]: /ko/database_monitoring/setup_mysql/
[2]: /ko/agent/troubleshooting/
[3]: /ko/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[4]: /ko/agent/configuration/agent-log-files
[5]: /ko/database_monitoring/setup_mysql/advanced_configuration/
[6]: https://cloud.google.com/sql/docs/mysql/flags#tips-performance-schema
[7]: /ko/database_monitoring/data_collected/#which-queries-are-tracked
[8]: https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_max_digest_length
[9]: https://dev.mysql.com/doc/refman/8.0/en/use.html
[10]: /ko/database_monitoring/setup_mysql/selfhosted/?tab=mysql57#collecting-schemas
[14]: /ko/database_monitoring/setup_mariadb/troubleshooting/#mariadb-known-limitations