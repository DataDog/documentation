---
description: 자체 호스팅 Postgres에서 데이터베이스 모니터링을 설치하고 설정합니다.
further_reading:
- link: /integrations/postgres/
  tag: 설명서
  text: 기본 Postgres 통합
title: 자체 호스팅 Postgres에서 데이터베이스 모니터링 설정
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">데이터베이스 모니터링은 이 사이트에서 지원되지 않습니다.</div>
{{< /site-region >}}

데이터베이스 모니터링을 사용해 쿼리 메트릭, 쿼리 샘플, 실행 계획, 데이터베이스 상태, 장애 조치, 이벤트를 노출시켜 Postgres 데이터베이스를 상세히 가시화할 수 있습니다.

에이전트에서는 데이터베이스에 읽기 전용 사용자로 로그인해 원격 분석 데이터를 직접 수집합니다. Postgres 데이터베이스에서 데이터베이스 모니터링을 사용하려면 다음 단계를 따르세요.

1. [데이터베이스 파라미터 설정](#configure-postgres-settings)
1. [에이전트가 데이터베이스에 액세스할 수 있도록 권한 부여](#grant-the-agent-access)
1. [에이전트 설치](#install-the-agent)

## 시작 전에 참고 사항

지원되는 PostgreSQL 버전
: 9.6, 10, 11, 12, 13, 14

필수 구성 요소
: Postgres 추가 제공 모듈이 설치되어야 합니다. 대부분 설치할 시에 기본적으로 포함되어 있으나 일반적이지 않은 방법으로 설치하는 경우 적절한 [`postgresql-contrib` 패키지][1] 버전을 추가로 설치해야 할 수 있습니다.

지원되는 에이전트 버전
: 7.36.1+

성능에 미치는 영향
: 데이터베이스 모니터링을 위한 기본 에이전트 설정은 보수적이지만 수집 간격 및 쿼리 샘플 등 설정을 조정해 요구 사항을 더 잘 충족할 수 있습니다. 대부분의 워크로드의 경우 에이전트는 데이터베이스에서 쿼리 실행 시간의 1% 미만, CPU 비율의 1% 미만을 차지합니다. <br/><br/>
데이터베이스 모니터링은 기본 에이전트에서 통합으로 실행됩니다([벤치마크 참조][1]).

프록시, 로드 밸런서, 연결 풀러
: 에이전트는 모니터링 중인 호스트에 직접 연결해야 합니다. 자체 호스팅 데이트베이스는  `127.0.0.1`이나 소켓을 통해 연결하는 것이 좋습니다. 에이전트를 프록시, 로드 밸런`pgbouncer`와 같은 연결 풀러로 연결하지 마세요. 이는 클라이언트 애플리케이션에 안티 패턴일 수 있으나 각 에이전트가 기본 호스트 이름을 알고 있어야 하며, 장애 조치 시에도 수명 기간 동안에는 단일 호스트에 연결되어야 합니다. Datadog 에이전트가 실행되는 동안 다른 호스트에 연결되면 메트릭 값이 올바르지 않게 됩니다.

데이터 보안 고려사항
: 에이전트가 데이터베이스에서 어떤 정보를 수집하고 어떻게 보안을 확보하는지 알아보려면 [민감한 정보][3]를 참고하세요.

## Postgres 설정 구성

`postgresql.conf` 파일에서 다음 [파라미터][4]를 설정합니다. **서버를 재시작**해야 설정이 적용됩니다. 이 파라미터에 관한 더 자세한 정보는 [Postgres 설명서][5]를 참고하세요.

| 파라미터 | 값 | 설명 |
| --- | --- | --- |
|`shared_preload_libraries` | `pg_stat_statements` | `postgresql.queries.*` 메트릭에 필요. [pg_stat_statements][5] 확장을 통해 쿼리 메트릭 수집 활성화.|
| `track_activity_query_size` | `4096` | 대량 쿼리 수집에 필요. `pg_stat_activity`와 `pg_stat_statements`에서 SQL 텍스트 크기를 늘림. 기본값으로 두면 `1024`자보다 긴 쿼리가 수집되지 않음. |
| `pg_stat_statements.track` | `ALL` | 선택 사항. 저장된 절차와 함수 내에 있는 문 추적을 활성화. |
| `pg_stat_statements.max` | `10000` | 선택 사항. `pg_stat_statements`에 있는 표준화된 쿼리 추적 수를 늘림. 데이터베이스 볼륨이 크고 여러 클라이언트에서 다양한 유형의 쿼리가 포함된 경우에 이 설정을 추천. |
| `pg_stat_statements.track_utility` | `off` | 선택 사항. PREPARE 및 EXPLAIN과 같은 유틸리티 명령을 비활성화. 이 값을 `off`로 하면 SELECT, UPDATE, DELETE과 같은 쿼리만 추적함. |
| `track_io_timing` | `on` | 선택 사항. 블록 읽기 및 쓰기 쿼리 시간 수집 활성화. |

## 에이전트 액세스 허용

Datadog 에이전트가 통계와 쿼리를 수집하려면 데이터베이스 서버에 읽기 전용 액세스가 필요합니다.

Postgres가 복제되면 다음 SQL 명령을 **주** 데이터베이스 서버(쓰기 권한자)에서 실행해야 합니다. 데이터베이스 서버에서 에이전트를 연결할 PostgreSQL 데이베이스를 선택하세요. 어떤 데이터베이스에 연결하든 에이전트는 서버에 있는 모든 데이터베이스에서 원격 분석 데이터를 수집하기 때문에 기본값인 `postgres` 데이터베이스에 연결하는 것이 좋습니다. 에이전트에서 [특정 데이터베이스의 커스텀 쿼리][6]를 실행하고 싶을 경우에만 다른 데이터베이스를 선택하세요.

선택한 데이터베이스에 슈퍼 사용자(또는 충분한 권한이 있는 다른 사용자)로 연결합니다. 예를 들어 선택한 데이터베이스가 `postgres`면 다음을 실행하여 [psql][7]을 이용해 `postgres` 사용자로 연결합니다.

 ```bash
 psql -h mydb.example.com -d postgres -U postgres
 ```

`datadog` 사용자를 생성합니다.

```SQL
CREATE USER datadog WITH password '<PASSWORD>';
```

{{< tabs >}}
{{% tab "Postgres ≥ 10" %}}

**모든 데이터베이스**에 다음 스키마를 생성합니다.

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

{{% /tab %}}
{{% tab "Postgres 9.6" %}}

**모든 데이터베이스**에 다음 스키마를 생성합니다.

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT SELECT ON pg_stat_database TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

**모든 데이터베이스**에 함수를 생성해 에이전트가 `pg_stat_activity`와 `pg_stat_statements`의 모든 컨텐츠를 읽을 수 있도록 합니다.

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

<div class="alert alert-info">추가 테이블 쿼리가 필요한 데이터 수집이나 커스텀 메트릭의 경우 <code>datadog</code> 사용자에게 해당 테이블과 관련한 <code>SELECT</code> 권한을 부여해야 할 수 있습니다. 예: <code>grant SELECT on &lt;TABLE_NAME&gt; to datadog;</code>. 더 자세한 내용은 <a href="https://docs.datadoghq.com/integrations/faq/postgres-custom-metric-collection-explained/">PostgreSQL 커스텀 메트릭 수집</a>을 참고하세요.</div>

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

## 에이전트 설치하기

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
       password: '<PASSWORD>'
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
       password: '<PASSWORD>'
       pg_stat_statements_view: datadog.pg_stat_statements()
       pg_stat_activity_view: datadog.pg_stat_activity()
       ## Optional: Connect to a different database if needed for `custom_queries`
       # dbname: '<DB_NAME>'
   ```

{{% /tab %}}
{{< /tabs >}}

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
3. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml`파일에서 로그 수집을 사용하도록 설정합니다.
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
[2]: /ko/agent/basic_agent_usage#agent-overhead
[3]: /ko/database_monitoring/data_collected/#sensitive-information
[4]: https://www.postgresql.org/docs/current/config-setting.html
[5]: https://www.postgresql.org/docs/current/pgstatstatements.html
[6]: /ko/integrations/faq/postgres-custom-metric-collection-explained/
[7]: https://www.postgresql.org/docs/current/app-psql.html
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[10]: /ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://www.postgresql.org/docs/11/runtime-config-logging.html
[12]: https://www.postgresql.org/message-id/20100210180532.GA20138@depesz.com
[13]: /ko/agent/guide/agent-commands/#agent-status-and-information
[14]: https://app.datadoghq.com/databases
[15]: /ko/database_monitoring/troubleshooting/?tab=postgres