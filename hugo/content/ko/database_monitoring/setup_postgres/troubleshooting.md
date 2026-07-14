---
description: Postgres에서 데이터베이스 모니터링 설정 트러블슈팅
title: Postgres에서 DMB 설정 트러블슈팅
---

이 페이지에서는 Postgres에서 데이터베이스 모니터링을 설정하고 사용할 때 발생하는 일반적인 문제와 이를 해결하는 방법을 설명합니다. 에이전트 버전에 따라 문제 해결 방법이 다를 수 있기 때문에 Datadog에서는 안정적인 최신 에이전트 버전을 사용하고 최신 [설정 설명서][1]를 참고하기를 권장합니다.

## 일반적인 문제 진단

### 데이터베이스 모니터링을 설정한 후 데이터가 나타나지 않음

[설정 지침][1]을 따라 에이전트를 설정했는데 데이터가 보이지 않으면 에이전트 설정이나 API 키에 문제가 있을 가능성이 큽니다. [트러블슈팅 가이드][2]를 따라 에이전트가 데이터를 받을 수 있도록 하세요.

시스템 메트릭과 같은 기타 데이터는 수신이 되는데 데이터베이스 모니터링 데이터(쿼리 메트릭, 쿼리 샘플 등)가 수신되지 않는다면, 에이전트나 데이터베이스 설정에 문제가 있을 가능성이 있습니다. [설정 지침][1]대로 에이전트를 설정했는지 확인하고 설정 파일 위치도 다시 확인하세요.

디버그하려면 먼저 [에이전트 상태 명령][3]을 실행해 수집한 데이터와 Datadog로 전송한 데이터의 디버깅 정보를 수집하세요.

`Config Errors` 섹션을 확인해 설정 파일이 유효한지 확인합니다. 다음 예시는 인스턴스 설정이나 유효 파일이 누락된 경우입니다.

```
  Config Errors
  ==============
    postgres
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
    postgres (8.0.5)
    ----------------
      Instance ID: postgres:d3dceb9fd36fd57e [OK]
      Configuration Source: file:/etc/datadog-agent/conf.d/postgres.d/conf.yaml
      Total Runs: 16,538
      Metric Samples: Last Run: 186, Total: 2,844,362
      Events: Last Run: 0, Total: 0
      Database Monitoring Query Metrics: Last Run: 2, Total: 24,274
      Database Monitoring Query Samples: Last Run: 1, Total: 17,921
      Service Checks: Last Run: 1, Total: 16,538
      Average Execution Time : 1.765s
      Last Execution Date : 2021-07-26 19:16:58 UTC (1627327018000)
      Last Successful Execution Date : 2021-07-26 19:16:58 UTC (1627327018000)
      metadata:
        version.major: 10
        version.minor: 17
        version.patch: 0
        version.raw: 10.17
        version.scheme: semver
```

출력에 다음 줄이 있어야 하며, 값이 1 이상이어야 합니다.

```
Database Monitoring Query Metrics: Last Run: 2, Total: 24,274
Database Monitoring Query Samples: Last Run: 1, Total: 17,921
```
에이전트가 올바로 구성되어 있어 있다면 [에이전트 로그를 확인][4]해 데이터베이스 통합을 실행할 때 경고나 오류가 있는지 찾아보세요.

또 `check` CLI 명령을 실행해 Datadog 에이전트에서 명시적으로 검사를 실행하여 출력에서 오류를 찾을 수도 있습니다.

```bash
# 자체 호스팅 에이전트 설치
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true datadog-agent check postgres -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true datadog-agent check mysql -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true datadog-agent check sqlserver -t 2

# 컨테이너 기반 에이전트 설치
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true agent check postgres -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true agent check mysql -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true agent check sqlserver -t 2
```
### 쿼리 메트릭 누락됨

다음 단계를 따라 누락된 쿼리 메트릭 데이터를 진단하기 전에 에이전트가 잘 실행되고 있고 [누락된 에이전트 데이터 파악하는 단계](#no-data-is-showing-after-configuring-database-monitoring)를 따랐는지 확인하세요. 다음은 쿼리 메트릭이 누락되는 몇 가지 원인입니다. 

#### pg_stat_statements 확장이 로딩되지 않음{#pg-stat-statements-not-loaded}
`pg_stat_statements` 확장이 로드되지 않았습니다. Postgres 설정에서 `shared_preload_libraries`를 통해 확장을 로드할 수 있습니다(**참고**: 이 변수를 수정한 후 서버를 재시작해야 변경 사항이 적용됨). 이 확장을 로드하는 방법에 관한 자세한 내용은 [설정 지침][1]을 참고하세요. 

#### pg_stat_statements 확장이 데이터베이스에서 생성되지 않음{#pg-stat-statements-not-created}
`pg_stat_statements` 확장이 올바른 데이터베이스에 설치되지 않았습니다. 에이전트가 연결된 모든 데이터베이스에 `CREATE EXTENSION pg_stat_statements`를 실행해야 합니다. 기본값은 에이전트가 `postgres` 데이터베이스에 연결하는 것입니다. 설정할 때 이 변수를 구성하는 방법에 관한 자세한 내용은 [설정 지침][1]을 참고하세요.

`pg_stat_statements`가 설치되었고 `datadog` 사용자로 액세스할 수 있는지 확인하려면 `postgres` 데이터베이스로 연결한 후 `datadog` 사용자로 쿼리를 시도해 봅니다. 최소 한 개 행이 성공적으로 반환되어야 합니다. 다음 예를 참고하세요.

```bash
psql -h localhost -U datadog -d postgres -c "select * from pg_stat_statements LIMIT 1;"
```

에이전트 설정에서 `dbname`을 기본값 `postgres`가 아닌 다른 것으로 지정했다면 해당 데이터베이스에 `CREATE EXTENSION pg_stat_statements`를 반드시 실행해야 합니다.

대상 데이터베이스에 확장을 생성했는데 이와 같은 경고가 나타난다면 `datadog` 사용자가 액세스할 수 없는 스키마에 확장을 생성한 것입니다. 이를 확인하려면 다음 명령을 실행해 `pg_stat_statements`가 생성된 스키마가 무엇인지 알아보세요.

```bash
psql -h localhost -U datadog -d postgres -c "select nspname from pg_extension, pg_namespace where extname = 'pg_stat_statements' and pg_extension.extnamespace = pg_namespace.oid;"
```

그 후 다음 명령을 실행해 `datadog` 사용자에게 보이는 스키마는 무엇인지 알아봅니다.

```bash
psql -h localhost -U datadog -d <your_database> -c "show search_path;"
```

`datadog` 사용자의 `search_path`에 `pg_stat_statements` 스키마가 보이지 않으면 `datadog` 사용자에 추가해야 합니다. 예를 들어 `<schema_with_pg_stat_statements>`를 `pg_stat_statements`가 있는 스키마로 대체합니다.

```sql
ALTER ROLE datadog SET search_path = "$user",public,<schema_with_pg_stat_statements>;
```

### 특정 쿼리가 누락됨

일부 쿼리의 데이터가 있지만 Database 모니터링에 예상한 특정 쿼리 또는 쿼리 집합이 표시되지 않는 경우 이 가이드를 따르세요.
| 가능한 원인 | 해결 방법
|----------------------------------------|-------------------------------------------|
| Postgres 9.6의 경우, Datadog 사용자가 실행한 쿼리만 표시되는 경우 인스턴스 구성에 일부 설정이 누락되었을 가능성이 있습니다. | Postgres 9.6의 인스턴스 모니터링의 경우, Datadog Agent 인스턴스 구성은 초기 설정 가이드에서 생성된 함수를 기반으로 `pg_stat_statements_view: datadog.pg_stat_statements()` 및 `pg_stat_activity_view: datadog.pg_stat_activity()` 설정을 사용해야 합니다. 이러한 함수는 모든 데이터베이스에서 생성되어야 합니다. |
| Datadog 사용자는 다른 사용자의 쿼리를 볼 수 있는 충분한 액세스 권한이 없습니다. | Datadog 사용자는 [`pg_monitor` 역할][25]이 있어야 `pg_stat_activity`와 같은 테이블에 액세스할 수 있습니다. Datadog 사용자에게 이 역할이 있는지 확인합니다. `GRANT pg_monitor TO datadog`. |
| 쿼리가 '상위 쿼리'가 아니므로 선택한 시간 프레임의 어느 시점에서든 총 실행 시간의 합이 정규화된 상위 200개 쿼리에 속하지 않습니다. | 쿼리는 '기타 쿼리' 행으로 그룹화될 수 있습니다. 추적되는 쿼리에 대한 자세한 내용은 [수집된 데이터][5]를 참조하세요. 추적된 상위 쿼리의 수는 Datadog 지원팀에 문의하여 늘릴 수 있습니다. |
| 쿼리가 SELECT, INSERT, UPDATE 또는 DELETE 쿼리가 아닙니다. | 비유틸리티 함수는 기본적으로 추적되지 않습니다. 이를 수집하려면 Postgres 파라미터 `pg_stat_statements.track_utility`를 `all`로 설정하세요. 자세한 내용은 [Postgres 설명서][6]를 참고하세요. |
| 쿼리가 함수 또는 저장 프로시저에서 실행됩니다. | 함수 또는 프로시저에서 실행된 쿼리를 추적하려면 구성 매개변수 `pg_stat_statements.track`을 `on`으로 설정하세요. 자세한 내용은 [Postgres 설명서][6]를 참고하세요. |
| `pg_stat_statements.max` Postgres 구성 파라미터가 워크로드에 비해 너무 낮을 수 있습니다. | 단시간에 많은 수의 정규화된 쿼리가 실행되는 경우(10초 동안 수천 개의 고유 정규화된 쿼리) `pg_stat_statements` 버퍼가 모든 정규화된 쿼리를 수용하지 못할 수 있습니다. 이 값을 늘리면 추적된 정규화된 쿼리의 적용 범위를 개선하고 생성된 SQL에서 발생하는 높은 이탈의 영향을 줄일 수 있습니다. **참고**: 열 이름이 정렬되지 않은 쿼리 또는 가변 길이의 배열을 사용하는 쿼리는 정규화된 쿼리 이탈률을 크게 증가시킬 수 있습니다. 예를 들어 `SELECT ARRAY[1,2]`와 `SELECT ARRAY[1,2,3]`는 `pg_stat_statements`에서 별도의 쿼리로 추적됩니다. 이 설정 조정에 대한 자세한 내용은 [고급 구성][7]을 참조하세요. |
| Agent가 마지막으로 재시작한 이후 쿼리가 한 번만 실행되었습니다. | 쿼리 메트릭은 Agent를 다시 시작한 이후 10초 간격으로 두 번 이상 실행된 후에만 릴리스됩니다. |

### 쿼리 샘플이 잘림

긴 쿼리는 데이터베이스 설정 때문에 전체 SQL 텍스트를 보여주지 않을 수 있습니다. 워크로드를 조정하려면 설정을 변경해야 합니다.

Postgres 설정 `track_activity_query_size`는 SQL 문 Postgres 가 저장하고 에이전트에서 볼 수 있는 최대 크기를 나타냅니다. 기본값은 1024 바이트입니다. 이 값을 4096으로 올리면 워크로드 쿼리 대부분을 캡처합니다. 그러나 쿼리가 복잡하거나 긴 배열을 사용할 경우에는 더 높은 값이 필요할 수 있습니다.

예를 들어, 배열에 다음과 같은 항목이 많은 쿼리는 데이터베이스에서 잘라냅니다.

```sql
SELECT DISTINCT address FROM customers WHERE id = ANY(ARRAY[11, 12, 13, ... , 9999, 10000 ]) LIMIT 5
```

표준화된 쿼리 결과가 다음과 같이 앱에 나타납니다.

```sql
SELECT DISTINCT address FROM customers WHERE id = ANY(ARRAY[ ?
```

이를 방지하려면 `track_activity_query_size` 설정에서 가장 큰 쿼리 텍스트 규모도 처리할 수 있을 정도로 높은 값으로 올립니다. 더 자세한 정보는 [런타임 통계][8]에서 Postgres 설명서를 참고하세요.

### 쿼리에 실행 계획 누락됨

일부 쿼리나 모든 쿼리에서 실행 계획이 없는 문제가 발생할 수 있습니다. 이는 지원되지 않는 쿼리 명령, 지원되지 않는 클라이언트 애플리케이션, 오래된 에이전트 버전, 데이터베이스 설정 미완료 등과 같은 원인으로 인해 발생할 수 있습니다. 아래 실행 계획이 누락되는 문제의 잠재적 원인을 참고하세요.

#### 실행 함수 누락{#undefined-explain-function}

문제: 에이전트가 데이터베이스의 `datadog` 스키마에 있는 필수 함수를 실행할 수 없음.

해결: 에이전트가 **모든 데이터베이스**에서 쿼리를 수집하려면 `datadog.explain_statement(...)` 함수가 있어야 합니다.

에이전트가 실행 계획을 수집하려면 **모든 데이터베이스**에 함수를 생성해야 합니다.

```SQL
CREATE OR REPLACE FUNCTION datadog.explain_statement(
   l_query TEXT,
   OUT explain JSON
)
RETURNS SETOF JSON AS
$$
DECLARE
curs REFCURSOR;
plan JSON;

BEGIN
   OPEN curs FOR EXECUTE pg_catalog.concat('EXPLAIN (FORMAT JSON) ', l_query);
   FETCH curs INTO plan;
   CLOSE curs;
   RETURN QUERY SELECT plan;
END;
$$
LANGUAGE 'plpgsql'
RETURNS NULL ON NULL INPUT
SECURITY DEFINER;
```
#### 에이전트가 지원되지 않는 버전을 실행
에이전트 버전이 7.3.6.1 이상이거나 최신 버전인지 확인합니다. Datadog에서는 새 기능, 성능 개선, 보안 업데이트 등의 서비스를 활용할 수 있도록 에이전트를 정기적으로 업데이트하는 것을 권장합니다.

#### 쿼리가 잘림
샘플 쿼리 텍스트 크기를 늘리는 방법에 관한 자세한 내용은 [잘린 쿼리 샘플](#query-samples-are-truncated) 섹션을 참고하세요.

#### Postgres 확장 쿼리 프로토콜

클라이언트가 Postgres [확장 쿼리 프로토콜][9]이나 준비된 문을 사용하는 경우 구문 분석한 쿼리와 원시 바인딩 파라미터가 분리되어 Datadog 에이전트가 실행 계획을 수집하지 못할 수 있습니다. 다음은 이 같은 문제를 해결할 수 있는 몇 가지 옵션입니다.

Postgres 버전 12 이상의 경우 다음 파라미터가 [Postgres 통합 구성][19]에서 기본적으로 활성화됩니다. Agent에서 설명 계획을 수집할 수 있습니다.
```
query_samples:
  explain_parameterized_queries: true
  ...
```

Postgres 12 이전 버전의 경우, 이 파라미터는 지원되지 **않습니다**. 그러나 클라이언트에서 단순 쿼리 프로토콜을 강제로 사용하는 옵션을 제공하는 경우 Datadog Agent를 사용하여 실행 계획을 수집할 수 있습니다.

| 언어 | 클라이언트 | 단순 쿼리 프로토콜 설정|
|----------|--------|----------------------------------------|
| 고(Go)       | [pgx][10] | 설정에서 `PreferSimpleProtocol`을 단순 쿼리 프로토콜([ConnConfig 설명서][11] 참고)로 바꿉니다. 또는 `Query`나 `Exec` 호출에서 [QuerySimpleProtocol][24] 플래그를 첫 인수로 사용해 쿼리나 호출별로 적용할 수 있습니다.
| 자바(Java)     | [Postgres JDBC 클라이언트][12] | 설정에서 `preferQueryMode = simple`을 단순 쿼리 프로토콜로 바꾸세요([PreferQueryMode 설명서][13] 참고). |
| 파이썬(Python)   | [asyncpg][14]              | 확장된 쿼리 프로토콜을 사용하며, 이를 비활성화할 수 없습니다. 준비된 문을 비활성화해도 문제가 해결되지 않습니다. 실행 계획 수집을 활성화하려면 [psycopg sql][15](또는 SQL 값을 이스케이프하는 기타 유사 SQL 포맷터)을 사용해 SQL Queries를 포맷한 후 DB 클라이언트로 전달합니다.                                                  |
| 파이썬(Python)   | [psycopg][16]             | `psycopg2`는 확장된 쿼리 프로토콜을 사용하지 않기 때문에 실행 계획을 수집하는 데 문제가 없습니다. <br/> `psycopg3`는 기본적으로 확장된 쿼리 프로토콜을 사용하며 비활성화할 수 없습니다. 준비된 문을 비활성화해도 문제가 해결되지 않습니다. 실행 계획 수집을 활성화하려면 [psycopg sql[15]을 사용해 SQL Queries를 포맷한 후 DB 클라이언트에 전달하세요. |
| Node     | [node-postgres][17]       | 확장된 쿼리 프로토콜을 사용하며 비활성화할 수 없습니다. Datadog 에이전트가 실행 계획을 수집할 수 있도록 하려면 [pg-format][18]을 사용해 SQL Queries를 포맷한 후 [node-postgres][17]로 전송합니다.|

#### 데이터베이스에 있는 쿼리가 에이전트 인스턴스 설정으로 인해 무시됨
Agent 인스턴스 설정 파일 `ignore_databases`에 의해 무시되는 데이터베이스에 쿼리가 있습니다. `rdsadmin` 및 `azure_maintenance` 데이터베이스와 같은 기본 데이터베이스는 `ignore_databases` 설정에서 무시됩니다. 이러한 데이터베이스의 쿼리에는 샘플이나 설명 계획이 없습니다. 인스턴스 구성에서 이 설정의 값과 [예제 구성 파일][19]의 기본값을 확인하세요.

**참고:** 에이전트 버전 <7.41.0에서는 `postgres` 데이터베이스가 기본적으로 무시됩니다.

#### 쿼리를 실행할 수 없음
BEGIN, COMMIT, SHOW, USE, ALTER와 같은 일부 쿼리는 데이터베이스에서 유효한 실행 계획을 가져올 수 없습니다. SELECT, UPDATE, INSERT, DELETE, REPLACE 쿼리만 실행 계획을 지원합니다.

#### 쿼리가 비교적 드물게 발생하거나 빨리 실행됨
쿼리가 데이터베이스의 총 실행 시간을 대표하지 않기 때문에 샘플로 채택되지 않았을 수 있습니다. 쿼리를 캡처하려면 [샘플링 비율 올리기][23]를 시도해 보세요.


#### 애플리케이션이 어떤 스키마에 쿼리할 것인지 정하기 위해 검색 경로에 의존함
Postgres에서는 [`pg_stat_activity`][21]에서 현재 [검색 경로][20]를 노출하지 않기 때문에 Datadog 에이전트가 활성화된 Postgres 프로세스 중에서 어떤 검색 경로를 사용 중인지 찾을 수 없습니다. 이를 해결하려면 Postgres 통합 설정에서 스키마를 포함하는 사용자 지정 검색 경로로 조정합니다.
```sql
ALTER ROLE datadog SET search_path = "$user",public,schema1,schema2,etc;
```

### `create extension pg_stat_statements`에서 설정 실패

`create extension pg_stat_statements` 오류 출력 예시:
```
create extension pg_stat_statements;
ERROR:  could not open extension control file "<path>/share/postgresql/extension/pg_stat_statements.control": No such file or directory
SQL State: 58P01
```

이 오류는 `pg_stat_statements` 확장을 포함하는 `postgresql-contrib` 패키지가 누락될 경우 발생합니다. 누락된 패키지를 설치하는 방법은 호스트 배포와 Postgres 버전에 따라 다릅니다. 예를 들어 Postgres 10용 Ubuntu에서 `contrib` 패키지를 설치하려면 다음을 실행합니다.

```
sudo apt-get install postgresql-contrib-10
```

더 자세한 정보는 [Postgres `contrib` 설명서][22]에서 적절한 버전을 참고하세요.

### 에이전트 쿼리가 느리거나 데이터베이스에 주는 영향이 큼

데이터베이스 모니터링을 위한 기본 에이전트 설정은 보수적이지만 수집 간격 및 쿼리 샘플 등 설정을 조정해 요구 사항을 더 잘 충족할 수 있습니다. 대부분의 워크로드의 경우 에이전트는 데이터베이스에서 쿼리 실행 시간의 1% 미만, CPU 비율의 1% 미만을 차지합니다. 다음은 에이전트 쿼리에 리소스가 더 많이 필요한 몇 가지 일반적인 이유입니다.

#### `pg_stat_statements.max` 값이 높음{#high-pg-stat-statements-max-configuration}
`pg_stat_statements.max`의 권장 값은 `10000`입니다. 이보다 높은 값으로 설정하면 쿼리를 수집하는 시간이 더 오래 걸리고, 이로 인해 쿼리 시간 제한이 발생하고 쿼리 메트릭 수집에 갭이 생길 수 있습니다. 에이전트에서 이와 관련한 경고를 보고할 경우, 데이터베이스 `pg_stat_statements.max` 값을 `10000`로 설정하세요.


[1]: /ko/database_monitoring/setup_postgres/
[2]: /ko/agent/troubleshooting/
[3]: /ko/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[4]: /ko/agent/configuration/agent-log-files
[5]: /ko/database_monitoring/data_collected/#which-queries-are-tracked
[6]: https://www.postgresql.org/docs/current/pgstatstatements.html#id-1.11.7.38.8
[7]: /ko/database_monitoring/setup_postgres/advanced_configuration
[8]: https://www.postgresql.org/docs/current/runtime-config-statistics.html
[9]: https://www.postgresql.org/docs/current/protocol-flow.html#PROTOCOL-FLOW-EXT-QUERY
[10]: https://github.com/jackc/pgx
[11]: https://pkg.go.dev/github.com/jackc/pgx#ConnConfig
[12]: https://jdbc.postgresql.org/documentation/head/connect.html
[13]: https://jdbc.postgresql.org/documentation/publicapi/org/postgresql/jdbc/PreferQueryMode.html
[14]: https://github.com/MagicStack/asyncpg
[15]: https://www.psycopg.org/docs/sql.html
[16]: https://www.psycopg.org/
[17]: https://node-postgres.com/
[18]: https://www.npmjs.com/package/pg-format
[19]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[20]: https://www.postgresql.org/docs/14/ddl-schemas.html#DDL-SCHEMAS-PATH
[21]: https://www.postgresql.org/docs/14/monitoring-stats.html#MONITORING-PG-STAT-ACTIVITY-VIEW
[22]: https://www.postgresql.org/docs/12/contrib.html
[23]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example#L281
[24]: https://pkg.go.dev/github.com/jackc/pgx/v4#QuerySimpleProtocol
[25]: https://www.postgresql.org/docs/current/predefined-roles.html#:~:text=a%20long%20time.-,pg_monitor,-Read/execute%20various