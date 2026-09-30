---
description: 자체 호스팅 Postgres에서 Database Monitoring을 설치하고 구성합니다.
further_reading:
- link: /integrations/postgres/
  tag: 설명서
  text: 기본 Postgres 통합
- link: /database_monitoring/guide/parameterized_queries/
  tag: 설명서
  text: SQL 쿼리 파라미터 값 캡처
- link: https://www.datadoghq.com/blog/database-monitoring-explain-analyze
  tag: 블로그
  text: Datadog Database Monitoring에서 EXPLAIN ANALYZE를 사용해 PostgreSQL 쿼리 지연 시간을 빠르게
    디버깅
title: 자체 호스팅 Postgres에서 Database Monitoring 설정
---
Database Monitoring은 쿼리 메트릭, 쿼리 샘플, 계획 설명, 데이터베이스 상태, 대체 작동 및 이벤트를 노출하여 Postgres 데이터베이스에 대한 심층적인 가시성을 제공합니다.

Agent는 읽기 전용 사용자로 로그인하여 데이터베이스에서 직접 원격 분석을 수집합니다. Postgres 데이터베이스에서 Database Monitoring을 활성화하려면 다음 설정을 수행하세요.

1. [데이터베이스 파라미터 구성](#configure-postgres-settings)
1. [Agent에 데이터베이스 액세스 권한 부여](#grant-the-agent-access)
1. [Agent 설치](#install-the-agent)

## 시작 전 참고 사항 {#before-you-begin}

지원되는 PostgreSQL 버전
: 9.6, 10, 11, 12, 13, 14, 15, 16, 17, 18

전제 조건
: Postgres 추가 제공 모듈을 설치해야 합니다. 대부분의 설치에서는 기본적으로 포함되어 있지만, 일반적인 설치가 아닌 경우에는 [`postgresql-contrib` 패키지][1] 버전을 추가로 설치해야 할 수 있습니다.

지원되는 Agent 버전
: 7.36.1 이상

성능 영향
: Database Monitoring을 위한 기본 Agent 구성은 보수적이지만, 수집 간격 및 쿼리 샘플링 비율과 같은 구성을 조정하여 환경에 맞게 최적화할 수 있습니다. 대부분의 워크로드에서 Agent는 데이터베이스 쿼리 실행 시간의 1% 미만, CPU 사용량의 1% 미만을 차지합니다. <br/><br/>
Database Monitoring은 기본 Agent 위에서 실행되는 통합 기능입니다([벤치마크 참조][2]).

프록시, 로드 밸런서 및 연결 풀러
: Datadog Agent는 모니터링 대상 호스트에 직접 연결되어야 합니다. 자체 호스팅 데이터베이스의 경우 `127.0.0.1` 또는 소켓을 사용하세요. Agent는 프록시, 로드 밸런서, `pgbouncer`와 같은 연결 풀러를 통해 데이터베이스에 연결해서는 안 됩니다. Agent가 실행 중에 다른 호스트로 연결을 전환하는 경우(예: 장애 조치, 로드 밸런싱 등), 서로 다른 두 호스트의 통계 차이를 계산하게 되어 부정확한 메트릭이 생성됩니다.

데이터 보안 고려 사항
: Agent가 데이터베이스에서 수집하는 데이터와 이를 안전하게 보호하는 방법에 대해서는 [민감한 정보][3]를 참조하세요.

## Postgres 설정 구성 {#configure-postgres-settings}

설정을 적용하려면 `postgresql.conf` 파일에서 다음 [파라미터][4]를 구성한 다음 **서버 재시작**을 실행합니다. 이러한 파라미터에 대한 자세한 내용은 [Postgres 설명서][5]를 참조하세요.

**필수 파라미터**

| 파라미터 | 값 | 설명 |
| --- | --- | --- |
| `shared_preload_libraries` | `pg_stat_statements` | `postgresql.queries.*` 메트릭에 필요합니다. [pg_stat_statements][5] 확장을 사용하여 쿼리 메트릭 수집을 활성화합니다. |
| `track_activity_query_size` | `4096` | 더 긴 쿼리 수집에 필요합니다. `pg_stat_activity` 내 SQL 텍스트 크기를 증가시킵니다. 기본값을 유지하면 `1024`자를 초과하는 쿼리는 수집되지 않습니다. |

**선택적 파라미터**

| 파라미터 | 값 | 설명 |
| --- | --- | --- |
| `pg_stat_statements.track` | `ALL` | 저장 프로시저 및 함수 내에서 명령문 추적을 활성화합니다. |
| `pg_stat_statements.max` | `10000` | `pg_stat_statements`에서 추적되는 정규화된 쿼리 수를 증가시킵니다. 다양한 클라이언트에서 많은 종류의 쿼리가 실행되는 고트래픽 데이터베이스에 권장됩니다. |
| `pg_stat_statements.track_utility` | `off` | PREPARE 및 EXPLAIN과 같은 유틸리티 명령을 비활성화합니다. 이 값을 `off`로 설정하면 SELECT, UPDATE, DELETE와 같은 쿼리만 추적됩니다. |
| `track_io_timing` | `on` | 쿼리에 대한 블록 읽기 및 쓰기 시간 수집을 활성화합니다. |

## Agent 액세스 권한 부여 {#grant-the-agent-access}

Datadog Agent가 통계와 쿼리를 수집하려면 데이터베이스에 읽기 전용 액세스가 필요합니다.

Postgres가 복제 구성인 경우 클러스터의 **기본** 데이터베이스 서버(쓰기 노드)에서 다음 SQL 명령을 실행하세요. Agent는 어느 데이터베이스에 연결하든 서버 내 모든 데이터베이스의 텔레메트리를 수집할 수 있습니다. 특정 데이터베이스에만 존재하는 데이터를 대상으로 [사용자 지정 쿼리 실행][6]이 필요한 경우가 아니라면 기본 `postgres` 데이터베이스를 사용하세요.

슈퍼유저(또는 충분한 권한이 있는 다른 사용자)로 선택한 데이터베이스에 연결합니다. 예를 들어 [psql][7]을 사용하여 `postgres` 데이터베이스에 연결하려면 다음을 실행합니다.

 ```bash
 psql -h mydb.example.com -d postgres -U postgres
 ```

`datadog` 사용자를 생성합니다.

```SQL
CREATE USER datadog WITH password '<PASSWORD>';
```

{{< tabs >}}

{{% tab "Postgres ≥ 15" %}}

`datadog` 사용자에게 관련 테이블에 대한 권한을 부여합니다.

```SQL
ALTER ROLE datadog INHERIT;
```

다음 스키마를 **모든 데이터베이스에** 생성합니다.

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

{{% /tab %}}

{{% tab "Postgres ≥ 10" %}}

다음 스키마를 **모든 데이터베이스에** 생성합니다.

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

{{% /tab %}}
{{% tab "Postgres 9.6" %}}

다음 스키마를 **모든 데이터베이스에** 생성합니다.

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT SELECT ON pg_stat_database TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

Agent가 `pg_stat_activity` 및 `pg_stat_statements`의 전체 내용을 읽을 수 있도록 다음 함수를 **모든 데이터베이스에** 생성합니다.

```SQL
CREATE OR REPLACE FUNCTION datadog.pg_stat_activity() RETURNS SETOF pg_stat_activity AS
  $$ SELECT * FROM pg_catalog.pg_stat_activity; $$
LANGUAGE sql
SECURITY DEFINER;
CREATE OR REPLACE FUNCTION datadog.pg_stat_statements() RETURNS SETOF pg_stat_statements AS
    $$ SELECT * FROM pg_stat_statements; $$
LANGUAGE sql
SECURITY DEFINER;
```

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">데이터 수집 또는 추가 테이블 쿼리가 필요한 사용자 지정 메트릭의 경우, 해당 테이블에 대한 권한을 <code>SELECT</code> 사용자에게 부여해야 할 수 <code>datadog</code> 있습니다. 예시: <code>grant SELECT on &lt;TABLE_NAME&gt; to datadog;</code>자세한 내용은 <a href="https://docs.datadoghq.com/integrations/faq/postgres-custom-metric-collection-explained/">PostgreSQL 사용자 지정 메트릭 수집</a>을 참조하세요. </div>

### Explain Plan 함수 생성 {#create-the-explain-plan-function}

Agent가 Explain Plan을 수집할 수 있도록 다음 함수를 **모든 데이터베이스에** 생성합니다.

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
   SET TRANSACTION READ ONLY;

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

### 비밀번호 안전하게 저장 {#securely-store-your-password}
{{% dbm-secret %}}

### 데이터베이스 권한 확인 {#verify-database-permissions}

권한이 올바르게 설정되었는지 확인하려면 다음 명령을 실행하여 Agent 사용자가 데이터베이스에 연결하고 코어 테이블을 읽을 수 있는지 확인하세요.

{{< tabs >}}
{{% tab "Postgres ≥ 10" %}}

```shell
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_database limit 1;" \
  && echo -e "\e[0;32mPostgres connection - OK\e[0m" \
  || echo -e "\e[0;31mCannot connect to Postgres\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_activity limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_statements limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```

{{% /tab %}}
{{% tab "Postgres 9.6" %}}

```shell
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_database limit 1;" \
  && echo -e "\e[0;32mPostgres connection - OK\e[0m" \
  || echo -e "\e[0;31mCannot connect to Postgres\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from datadog.pg_stat_activity() limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from datadog.pg_stat_statements() limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```

{{% /tab %}}
{{< /tabs >}}

비밀번호 입력을 요청하면 `datadog` 사용자를 생성할 때 입력한 비밀번호를 사용하세요.

## Agent 설치 {#install-the-agent}

Datadog Agent를 설치하면 Postgres용 Database Monitoring에 필요한 Postgres 검사도 함께 설치됩니다.
아직 Agent를 설치하지 않았다면 [Agent 설치 지침][8]을 참조하세요. 그런 다음, 사용 중인 설치 방식에 맞는 지침을 계속 따르세요.

Agent의 `conf.d/postgres.d/conf.yaml` 파일을 수정하여 모니터링할 Postgres 인스턴스를 지정하세요. 구성 옵션의 전체 목록은 [샘플 postgres.d/conf.yaml][9]을 참조하세요.

```yaml
init_config:
instances:
 - dbm: true
   host: localhost
   port: 5432
   username: datadog
   password: 'ENC[datadog_user_database_password]'

  ## Optional: Connect to a different database if needed for `custom_queries`
  # dbname: '<DB_NAME>'
```

**참고**: 비밀번호에 특수 문자가 포함된 경우, 작은 따옴표로 묶어 입력하세요.

변경 사항을 적용하려면 [Agent를 재시작][10]하세요.

### 로그 수집(선택 사항) {#collecting-logs-optional}

PostgreSQL 로깅 기본값은 `stderr`이며, 로그에 상세 정보를 포함하지 않습니다. 파일에 로그줄 접두사로 지정한 추가 상세 정보를 로깅하세요. 자세한 내용은 PostgreSQL [설명서][11]를 참조하세요.

1. `/etc/postgresql/<VERSION>/main/postgresql.conf` 파일에서 로깅을 구성합니다. 문 출력과 같은 정기적인 로그 결과를 수집하려면 로그 섹션에 다음 파라미터를 설정하세요.
   ```conf
     logging_collector = on
     log_line_prefix = '%m [%p] %d %a %u %h %c ' # this pattern is required to correlate metrics in the Datadog product
     log_file_mode = 0644

     ## For Windows
     #log_destination = 'eventlog'
   ```
2. 자세한 기간 메트릭을 수집하여 Datadog 인터페이스에서 이를 검색할 수 있도록 하려면 문 자체와 함께 메트릭을 구성해야 합니다. 아래 권장 구성은 모든 문과 그 기간을 로깅합니다. 출력을 특정 기간 이상의 문으로 줄이려면, `log_min_duration_statement`를 원하는 최소 기간(밀리초)으로 설정합니다. 전체 SQL 문을 로깅하는 것이 조직의 개인정보 보호 요구 사항을 준수하는지 확인하세요.

   **참고**: `log_statement`와 `log_duration` 옵션은 모두 주석 처리되어 있습니다. 이 주제에 대한 논의는 [여기][12]에서 확인하세요.

   ```conf
     log_min_duration_statement = 0    # -1 is disabled, 0 logs all statements
                                       # and their durations, > 0 logs only
                                       # statements running at least this number
                                       # of milliseconds
     #log_statement = 'all'
     #log_duration = on
   ```
3. Datadog Agent에서는 로그 수집이 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.
   ```yaml
   logs_enabled: true
   ```
4. `conf.d/postgres.d/conf.yaml` 파일에서 다음 구성 블록을 추가 및 편집해 PostgreSQL 로그 수집을 시작합니다.
   ```yaml
   logs:
     - type: file
       path: "<LOG_FILE_PATH>"
       source: postgresql
       service: "<SERVICE_NAME>"
       #To handle multi line that starts with yyyy-mm-dd use the following pattern
       #log_processing_rules:
       #  - type: multi_line
       #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
       #    name: new_log_start_with_date
   ```
   환경에 맞게 `service` 및 `path` 파라미터 값을 변경합니다. 사용 가능한 모든 구성 옵션은 [샘플 postgres.d/conf.yaml][9]을 참조하세요.
5. [Agent를 재시작][10]합니다.

### `auto_explain`을 사용한 계획 수집(선택 사항){#collecting-plans-with-auto-explain-optional}

기본적으로 Agent는 실행 중인 쿼리의 일부 샘플에 대해서만 [`EXPLAIN`][17] 계획을 수집합니다. 이 계획들은 일반적인 수준의 정보만 제공하며, 특히 애플리케이션 코드에서 준비된 문을 사용할 때 더욱 그렇습니다.

모든 쿼리에서 가져온 전체 `EXPLAIN ANALYZE` 계획을 수집하려면 주요 제공업체에서 제공되는 PostgreSQL에 번들로 포함된 자사 확장 기능인 [`auto_explain`][18]을 사용해야 합니다. _`auto_explain` 수집_을 사용하려면 먼저 로그 수집을 활성화해야 합니다.

<div class="alert alert-danger">
  <strong> 중요:</strong> <code>auto_explain</code> 은 난독화되지 않은 SQL에 나타나는 원시 값과 마찬가지로 애플리케이션의 민감한 정보를 포함할 수 있는 로그줄을 생성합니다. <a href="/account_management/rbac/permissions/#database-monitoring"><code>dbm_parameterized_queries_read</code></a> 권한을 사용하여 결과 실행 계획을 볼 수 있는 사용자를 제한할 수 있지만, 로그줄 자체는 Datadog 조직 내의 모든 사용자에게 <i>표시됩니다</i>. <a href="/logs/guide/logs-rbac">로그용 RBAC</a>를 사용하면 이러한 로그가 적절한 사용자에게만 표시되도록 보장할 수 있습니다.
</div>

로그 수집을 활성화한 후:

1. `auto_explain`을 `postgresql.conf`의 `shared_preload_libraries` 목록에 추가합니다. 예를 들어, `shared_preload_libraries`가 `pg_stat_statements`로 설정되어 있다면, `pg_stat_statements,auto_explain`로 변경합니다.

2. `log_line_prefix`를 변경하여 더 풍부한 이벤트 상관관계를 활성화합니다. 이 패턴은 auto_explain 계획을 수집하는 데 필요합니다.
   ```conf
     log_line_prefix = '%m:%r:%u@%d:[%p]:%l:%e:%s:%v:%x:%c:%q%a:'
   ```

3. `auto_explain` 구성을 구성합니다. 로그 형식은 _반드시_ `json`여야 하지만, 다른 설정은 애플리케이션에 따라 달라질 수 있습니다. 아래 예시는 버퍼 정보는 포함하지만 (오버헤드가 있을 수 있는) 타이밍은 생략하는 조건으로 1초 이상 걸리는 모든 쿼리에 대한 `EXPLAIN ANALYZE` 계획을 기록합니다.

   ```conf
    auto_explain.log_format: "json"
    auto_explain.log_min_duration: "1000"
    auto_explain.log_analyze: "on"
    auto_explain.log_buffers: "on"
    auto_explain.log_timing: "off"
    auto_explain.log_triggers: "on"
    auto_explain.log_verbose: "on"
    auto_explain.log_nested_statements: "on"
    auto_explain.sample_rate: "1"
   ```

4. [Agent를 재시작][10]합니다.

### Agent 설정 확인 {#verify-agent-setup}

[Agent의 상태 하위 명령을 실행][13]하고 검사 섹션에서 `postgres`를 찾습니다. 또는 [데이터베이스][14] 페이지를 방문하여 시작할 수 있습니다.

## Agent 구성 예시 {#example-agent-configurations}
{{% dbm-postgres-agent-config-examples %}}

## 문제 해결 {#troubleshooting}

설명한 대로 통합 및 Agent를 설치하고 구성했음에도 예상대로 작동하지 않는 경우 [문제 해결][15]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.postgresql.org/docs/current/contrib.html
[2]: /ko/database_monitoring/agent_integration_overhead/?tab=postgres
[3]: /ko/database_monitoring/data_collected/#sensitive-information
[4]: https://www.postgresql.org/docs/current/config-setting.html
[5]: https://www.postgresql.org/docs/current/pgstatstatements.html
[6]: /ko/integrations/faq/postgres-custom-metric-collection-explained/
[7]: https://www.postgresql.org/docs/current/app-psql.html
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[10]: /ko/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[11]: https://www.postgresql.org/docs/11/runtime-config-logging.html
[12]: https://www.postgresql.org/message-id/20100210180532.GA20138@depesz.com
[13]: /ko/agent/configuration/agent-commands/#agent-status-and-information
[14]: https://app.datadoghq.com/databases
[15]: /ko/database_monitoring/troubleshooting/?tab=postgres
[17]: https://www.postgresql.org/docs/current/sql-explain.html
[18]: https://www.postgresql.org/docs/current/auto-explain.html