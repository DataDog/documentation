---
description: 자체 호스팅 Postgres에서 데이터베이스 모니터링을 설치하고 설정합니다.
further_reading:
- link: /integrations/postgres/
  tag: 설명서
  text: 기본 Postgres 통합
title: 자체 호스팅 Postgres에서 데이터베이스 모니터링 설정
---

데이터베이스 모니터링은 쿼리 메트릭, 쿼리 샘플, 설명 계획, 데이터베이스 상태, 페일오버 및 이벤트를 노출하여 Postgres 데이터베이스에 대한 심층적인 가시성을 제공합니다.

Agent는 읽기 전용 사용자로 로그인하여 데이터베이스에서 직접 원격 분석을 수집합니다. Postgres 데이터베이스로 데이터베이스 모니터링을 활성화하려면 다음 설정을 수행합니다.

1. [데이터베이스 파라미터 설정](#configure-postgres-settings)
1. [에이전트에 데이터베이스 접근 권한 부여](#grant-the-agent-access)
1. [Agent 설치](#install-the-agent)

## 시작 전 참고 사항

지원되는 PostgreSQL 버전
: 9.6, 10, 11, 12, 13, 14, 15, 16

전제 조건
: Postgres 추가 제공 모듈을 설치해야 합니다. 대부분의 설치에서는 기본적으로 포함되어 있지만, 일반적인 설치가 아닌 경우에는 [ `postgresql-contrib` 패키지][1] 버전을 추가로 설치해야 할 수 있습니다.

지원되는 Agent 버전
: 7.36.1+

성능 영향
: 기본값 에이전트 설정 데이터베이스 모니터링은 보수적이지만 수집 간격 및 쿼리 샘플링 속도 등의 설정을 필요에 맞게 조정할 수 있습니다. 대부분의 워크로드에서 에이전트는 데이터베이스에서 쿼리 실행 시간의 1% 미만, CPU 의 1% 미만을 차지합니다. <br/><br/>
데이터베이스 모니터링은 기본 에이전트([벤치마크][2] 참조) 위에서 통합으로 실행됩니다.

프록시, 로드 밸런서 및 연결 풀러
: Datadog Agent는 모니터링 중인 호스트에 직접 연결해야 합니다. 자체 호스팅 데이터베이스의 경우 `127.0.0.1` 또는 소켓이 선호됩니다. Agent는 `pgbouncer`와 같은 프록시, 로드 밸런서, 연결 풀러를 통해 데이터베이스에 연결해서는 안됩니다. Agent가 실행되는 동안 다른 호스트에 연결하는 경우(페일오버, 로드밸런싱 등) Agent는 두 호스트 간의 통계 차이를 계산하여 부정확한 메트릭을 생성합니다.

데이터 보안 고려 사항
: 에이전트가 데이터베이스에서 수집하는 데이터와 데이터의 보안을 유지하는 방법에 대한 자세한 내용은 [민감한 정보][3]를 참조하세요.

## Postgres 설정 구성

`postgresql.conf` 파일에서 다음 [파라미터][4]을 설정한 다음 **서버를 다시 시작**해야 설정이 적용됩니다. 이러한 파라미터에 대한 자세한 내용은 [Postgres 설명서][5]를 참조하세요.

| 파라미터 | 값 | 설명 |
| --- | --- | --- |
| `shared_preload_libraries` | `pg_stat_statements` | `postgresql.queries.*` 메트릭에 필요합니다. [pg_stat_statements][5] 확장자를 사용하여 쿼리 메트릭 수집을 활성화합니다. |
| `track_activity_query_size` | `4096` | 더 대규모 쿼리를 수집하는 데 필요합니다. `pg_stat_activity`의 SQL 텍스트의 크기를 늘립니다. 기본값으로 두면 `1024`자보다 긴 쿼리는 수집되지 않습니다. |
| `pg_stat_statements.track` | `ALL` | 선택 사항. 저장 프로시저 및 함수 내에서 명령문을 추적할 수 있습니다. |
| `pg_stat_statements.max` | `10000` | 선택 사항. `pg_stat_statements`에서 추적되는 정규화된 쿼리 수를 늘립니다. 이 설정은 다양한 클라이언트의 다양한 유형의 쿼리를 보는 대용량 데이터베이스에 권장됩니다. |
| `pg_stat_statements.track_utility` | `off` | 선택 사항. PREPARE 및 EXPLAIN과 같은 유틸리티 명령을 비활성화합니다. 이 값을 `off`로 설정하면 SELECT, UPDATE, DELETE와 같은 쿼리만 추적됩니다. |
| `track_io_timing` | `on` | 선택 사항. 쿼리에 대한 블록 읽기 및 쓰기 시간 수집을 활성화합니다. |

## 에이전트에 접근 권한 부여

Datadog 에이전트가 통계와 쿼리를 수집하려면 데이터베이스에 읽기 전용 액세스가 필요합니다.

Postgres가 복제된 경우 클러스터의 **기본** 데이터베이스 서버(작성자)에서 다음 SQL 명령을 실행해야 합니다. 에이전트가 연결할 데이터베이스 서버에서 PostgreSQL 데이터베이스를 선택합니다. 에이전트는 연결된 데이터베이스에 관계없이 데이터베이스 서버의 모든 데이터베이스에서 텔레메트리를 수집할 수 있으므로 기본 `postgres` 데이터베이스를 사용하는 것이 좋습니다. 에이전트가 [해당 데이터베이스 고유의 데이터에 대한 사용자 지정 쿼리][6]를 실행하는 경우에만 다른 데이터베이스를 선택하세요.

선택한 데이터베이스를 수퍼유저(또는 충분한 권한이 있는 다른 사용자)와 연결합니다. 예를 들어 선택한 데이터베이스가 `postgres`면 다음을 실행하여 [psql][7]을 사용하는 `postgres` 사용자로 연결합니다.

 ```bash
 psql -h mydb.example.com -d postgres -U postgres
 ```

`datadog` 사용자 생성:

```SQL
CREATE USER datadog WITH password '<PASSWORD>';
```

{{< tabs >}}

{{% tab "Postgres ≥ 15" %}}

`datadog` 사용자에게 관련 테이블에 대한 권한을 부여합니다.

```SQL
ALTER ROLE datadog INHERIT;
```

**모든 데이터베이스에** 다음 스키마를 생성합니다.

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

{{% /tab %}}

{{% tab "Postgres ≥ 10" %}}

**모든 데이터베이스에** 다음 스키마를 생성합니다.

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

{{% /tab %}}
{{% tab "Postgres 9.6" %}}

**모든 데이터베이스에** 다음 스키마를 생성합니다.

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT SELECT ON pg_stat_database TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

Agent가 `pg_stat_activity` 및 `pg_stat_statements`의 전체 내용을 읽을 수 있도록 **모든 데이터베이스에** 함수를 만듭니다.

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

<div class="alert alert-info">추가 테이블을 쿼리해야 하는 데이터 수집 또는 커스텀 메트릭의 경우 해당 테이블에 대한 <code>SELECT</code> 권한을 <code>datadog</code> 사용자에게 부여해야 할 수도 있습니다. 예: <code>&lt;TABLE_NAME&gt;에서 SELECT 권한을 Datadog에 부여합니다</code>. 자세한 내용은 <a href="https://docs.datadoghq.com/integrations/faq/postgres-custom-metric-collection-explained/">PostgreSQL 커스텀 메트릭 수집</a>을 참조하세요.</div>

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

### 비밀번호를 안전하게 저장하기
{{% dbm-secret %}}

### 확인

권한이 정확한지 확인하려면 다음 명령을 실행해 에이전트 사용자가 데이터베이스에 연결하고 코어 테이블을 읽을 수 있는지 확인합니다.

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
  -c "select * from pg_stat_activity limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_statements limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```

{{% /tab %}}
{{< /tabs >}}

암호 입력 메시지가 나타나면 `datadog` 사용자를 생성할 때 입력한 암호를 사용합니다.

## 에이전트 설치

Datadog 에이전트를 설치하면 Postgres용 데이터베이스 모니터링에 필요한 Postgres 검사도 설치됩니다. Postgres 데이터베이스 호스트에 아직 에이전트를 설치하지 않았다면 [에이전트 설치 지침][8]을 참고하세요.

1. 에이전트의 `conf.d/postgres.d/conf.yaml` 파일을 편집해 `host`/`port`를 가리키도록 하고, 모니터링할 호스트를 설정합니다. 사용할 수 있는 모든 설정 옵션을 보려면 [postgres.d/conf.yaml 샘플][9]을 참고하세요.

{{< tabs >}}
{{% tab "Postgres ≥ 10" %}}

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

{{% /tab %}}
{{% tab "Postgres 9.6" %}}

   ```yaml
   init_config:
   instances:
     - dbm: true
       host: localhost
       port: 5432
       username: datadog
       password: 'ENC[datadog_user_database_password]'
       pg_stat_statements_view: datadog.pg_stat_statements()
       pg_stat_activity_view: datadog.pg_stat_activity()
       ## Optional: Connect to a different database if needed for `custom_queries`
       # dbname: '<DB_NAME>'
   ```

{{% /tab %}}
{{< /tabs >}}

**참고**: 특수 문자가 있는 경우 비밀번호를 작은 따옴표로 묶어 입력하세요.

2. [에이전트를 다시 시작합니다][10].

### 로그 수집(선택 사항)

PostgreSQL 로깅 기본값은 `stderr`이며, 로그에 상세 정보를 포함하지 않습니다. 파일에 로그줄 접두사로 지정한 추가 상세 정보를 로깅하는 것이 좋습니다. 더 자세한 정보를 보려면 PostgreSQL [설명서][1]에서 해당 토픽을 참고하세요.

1. `/etc/postgresql/<VERSION>/main/postgresql.conf` 파일에서 로깅을 설정합니다. 문 출력과 같은 정기적인 로그 결과를 보려면 로그 섹션에서 다음 파라미터의 주석 처리를 제거합니다.
   ```conf
     logging_collector = on
     log_directory = 'pg_log'  # directory where log files are written,
                               # can be absolute or relative to PGDATA
     log_filename = 'pg.log'   # log file name, can include pattern
     log_statement = 'all'     # log all queries
     #log_duration = on
     log_line_prefix= '%m [%p] %d %a %u %h %c '
     log_file_mode = 0644
     ## For Windows
     #log_destination = 'eventlog'
   ```
2. 더 자세한 기간 메트릭을 수집하여 Datadog 인터페이스에서 이를 검색할 수 있도록 하려면 문 자체와 함께 설정해야 합니다. 아래 권고 설정을 위와 비교하면 `log_statement`와 `log_duration` 옵션에서 주석 처리가 제거되었음을 알 수 있습니다. 이와 관련한 논의 내용을 보려면 [여기][12]를 참고하세요.

   이 설정에서는 모든 문의 로그를 기록합니다. 특정 시간이 걸린 문만 로그하도록 출력을 줄이려면 `log_min_duration_statement` 값을 원하는 최소 밀리초로 설정합니다(전체 SQL 문을 로깅해도 되는지 조직 프라이버시 요구 조건을 확인하세요).
   ```conf
     log_min_duration_statement = 0    # -1 is disabled, 0 logs all statements
                                       # and their durations, > 0 logs only
                                       # statements running at least this number
                                       # of milliseconds
     #log_statement = 'all'
     #log_duration = on
   ```
3. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.
   ```yaml
   logs_enabled: true
   ```
4. `conf.d/postgres.d/conf.yaml` 파일에서 다음 설정 블록을 추가 및 편집해 PostgreSQL 로그를 수집합니다.
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
   `service`와 `path` 파라미터 값을 내 환경에 맞게 변경하세요. 사용할 수 있는 설정 옵션을 모두 보려면 [Postgres.d/conf.yaml 샘플][9]을 참고하세요.
5. [에이전트를 다시 시작합니다][10].

### 검증

[에이전트 상태 하위 명령을 실행][13]하고 Checks 섹션 아래에서 `postgres`를 찾으세요. 또는 [데이터베이스][14] 페이지에서 시작할 수도 있습니다.

## 에이전트 설정 예시
{{% dbm-postgres-agent-config-examples %}}

## 트러블슈팅

설명에 따라 통합과 에이전트를 설치하고 설정했는데 제대로 작동하지 않는 경우 [트러블슈팅][15]을 참고하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.postgresql.org/docs/12/contrib.html
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