---
description: Datadog Agent를 사용하여 Supabase용 Database Monitoring을 설치하고 구성하세요.
further_reading:
- link: /integrations/postgres/
  tag: 설명서
  text: 기본 Postgres 통합
title: Supabase 자체 호스팅에 대한 Database Monitoring 설정
---
Database Monitoring은 쿼리 메트릭, 쿼리 샘플, 실행 계획, 데이터베이스 상태, 장애 조치 및 이벤트를 노출하여 Supabase 데이터베이스에 대한 심층적인 가시성을 제공합니다.

<div class="alert alert-info">Datadog은 Supabase Cloud 통합 타일을 통해 Database Monitoring을 설정할 것을 권장합니다. Agent 설치는 필요하지 않습니다. 지침은 <a href="/database_monitoring/setup_postgres/supabase/cloud">Supabase Cloud</a>를 참조하세요.</div>

Agent는 읽기 전용 사용자로 로그인하여 데이터베이스에서 직접 텔레메트리를 수집합니다. Supabase 데이터베이스에서 Database Monitoring을 활성화하려면 다음 설정을 수행하세요.

1. [Agent에 데이터베이스 액세스 권한 부여](#grant-the-agent-access)
1. [Agent 설치](#install-the-agent)

## 시작하기 전에 {#before-you-begin}

지원되는 PostgreSQL 버전
: 9.6, 10, 11, 12, 13, 14, 15, 16, 17

지원되는 Agent 버전
: 7.69.1+

성능 영향
: Database Monitoring을 위한 기본 Agent 구성은 보수적이지만, 수집 간격 및 쿼리 샘플링 비율과 같은 구성을 조정하여 환경에 맞게 최적화할 수 있습니다. 대부분의 워크로드에서 Agent는 데이터베이스 쿼리 실행 시간의 1% 미만, CPU 사용량의 1% 미만을 차지합니다. <br/><br/>
Database Monitoring은 기본 Agent 위에서 실행되는 통합 기능입니다([벤치마크 참조][2]).

프록시, 로드 밸런서 및 연결 풀러
: Datadog Agent는 모니터링 대상 호스트에 직접 연결되어야 합니다. 자체 호스팅 데이터베이스의 경우 `127.0.0.1` 또는 소켓을 사용하세요. Agent는 프록시, 로드 밸런서 또는 Supabase의 전용 풀러(pgbouncer)나 세션 풀러(Supavisor)와 같은 연결 풀러를 통해 데이터베이스에 연결해서는 안 됩니다. Agent가 실행 중에 다른 호스트로 연결을 전환하는 경우(예: 장애 조치, 로드 밸런싱 등), 서로 다른 두 호스트의 통계 차이를 계산하게 되어 부정확한 메트릭이 생성됩니다.

데이터 보안 고려사항
: Agent가 데이터베이스에서 수집하는 데이터와 이를 안전하게 보호하는 방법에 대해서는 [민감한 정보][3]를 참조하세요.

## Agent에 액세스 권한 부여 {#grant-the-agent-access}

Datadog Agent가 통계와 쿼리를 수집하려면 데이터베이스 서버에 대한 읽기 전용 액세스가 필요합니다.

Supabase가 복제 구성인 경우 클러스터의 **기본** 데이터베이스 서버(쓰기 노드)에서 다음 SQL 명령을 실행해야 합니다. 데이터베이스 서버에서 Agent가 연결할 Supabase 데이터베이스를 선택하세요. Agent는 연결 대상과 관계없이 데이터베이스 서버의 모든 데이터베이스에서 텔레메트리를 수집할 수 있으므로 기본 `postgres` 데이터베이스를 사용하는 것이 좋습니다. Agent가 [해당 데이터베이스에만 존재하는 데이터를 대상으로 사용자 지정 쿼리를 실행][6]해야 하는 경우에만 다른 데이터베이스를 선택하세요.

슈퍼유저(또는 충분한 권한이 있는 다른 사용자)로 선택한 데이터베이스에 연결합니다. 예를 들어, 선택한 데이터베이스가 `postgres`인 경우 `postgres` 사용자로 연결하세요.

Supabase 내의 SQL Editor 탭으로 이동하여 다음을 실행하세요.

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
GRANT USAGE ON SCHEMA extensions TO datadog;
GRANT pg_monitor TO datadog;
```

또한, Supabase 프로젝트에 대해 `pg_stat_statements` 확장 프로그램이 활성화되어 있는지 확인합니다.```

{{% /tab %}}

{{% tab "Postgres ≥ 10" %}}

다음 스키마를 **모든 데이터베이스에** 생성합니다.

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT USAGE ON SCHEMA extensions TO datadog;
GRANT pg_monitor TO datadog;
```

또한, Supabase 프로젝트에 대해 `pg_stat_statements` 확장 프로그램이 활성화되어 있는지 확인합니다.```

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">데이터 수집 또는 추가 테이블 쿼리가 필요한 Custom Metrics의 경우, 해당 테이블에 대한 <code>SELECT</code> 권한을 <code>datadog</code> 사용자에게 부여해야 할 수 있습니다. 예시: <code>grant SELECT on &lt;TABLE_NAME&gt; to datadog;</code>자세한 내용은 <a href="https://docs.datadoghq.com/integrations/faq/postgres-custom-metric-collection-explained/">PostgreSQL Custom Metrics 수집</a>을 참조하세요. </div>

Agent가 실행 계획을 수집할 수 있도록 다음 함수를 **모든 데이터베이스에** 생성합니다.

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

### 열 통계 함수 생성{#create-the-column-statistics-function}

Agent가 `pg_stats`에서 표의 열 수준 통계를 수집할 수 있도록 다음 함수를 **모든 데이터베이스에** 생성합니다.

```SQL
CREATE OR REPLACE FUNCTION datadog.column_statistics()
RETURNS TABLE (
    schemaname name, tablename name, attname name,
    n_distinct real, avg_width integer, null_frac real,
    inherited boolean, correlation real, most_common_freqs real[]
) AS
$$ SELECT schemaname, tablename, attname, n_distinct, avg_width, null_frac,
          inherited, correlation, most_common_freqs
          FROM pg_catalog.pg_stats
          WHERE schemaname NOT IN ('pg_catalog', 'information_schema'); $$
LANGUAGE sql
SECURITY DEFINER
SET search_path = pg_catalog, pg_temp;
```

함수가 존재하면 Postgres 인스턴스 구성에서 수집을 활성화합니다.

```yaml
instances:
  - dbm: true
    ...
    collect_column_statistics:
      enabled: true
```

튜닝 옵션은 [고급 구성][18]을 참조하세요.

### 비밀번호 안전하게 저장 {#securely-store-your-password}

{{% dbm-secret %}}

### 확인 {#verify}

권한이 올바른지 확인하려면 `datadog` 사용자로 데이터베이스에 연결하고 다음 명령을 실행하세요. 예를 들어 데이터베이스가 `postgres`인 경우 [psql][7]을 사용하여 `datadog` 사용자로 연결하고 다음을 실행합니다.

```shell
psql -h {SUPABASE_HOST} -U datadog postgres -A \
  -c "select * from pg_stat_database limit 1;" \
  && echo -e "\e[0;32mPostgres connection - OK\e[0m" \
  || echo -e "\e[0;31mCannot connect to Postgres\e[0m"
psql -h {SUPABASE_HOST} -U datadog postgres -A \
  -c "select * from pg_stat_activity limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h {SUPABASE_HOST} -U datadog postgres -A \
  -c "select * from pg_stat_statements limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```

비밀번호를 묻는 메시지가 나타나면 `datadog` 사용자를 위해 생성한 비밀번호를 사용하세요.

## Agent 설치 {#install-the-agent}

Datadog Agent를 설치하면 Supabase용 Database Monitoring에 필요한 Postgres 검사도 함께 설치됩니다.
아직 Agent를 설치하지 않았다면 [Agent 설치 지침][8]을 참조하세요. 그런 다음, 여기로 돌아와 사용 중인 설치 방식에 맞는 지침을 계속 따르세요.

<div class="alert alert-info">Supabase의 기본 직접 연결 문자열은 IPv6 네트워크에서만 유효합니다.
이 방법을 사용하여 Agent를 Supabase 인스턴스에 연결하려면 Agent를 실행하는 머신에서 IPv6가 활성화되어 있는지 확인하세요. 자세한 내용은 클라우드 공급자의 설명서를 참조하세요.
Pro 플랜 이상의 Supabase 인스턴스는 애드온으로 IPv4 주소를 지원합니다.</div>

Agent의 `conf.d/postgres.d/conf.yaml` 파일을 수정하여 모니터링할 Supabase 인스턴스를 지정하세요. 구성 옵션의 전체 목록은 [샘플 postgres.d/conf.yaml][9]을 참조하세요.

```yaml
init_config:
instances:
    - dbm: true
      host: <SUPABASE_INSTANCE_ENDPOINT>
      port: 5432
      username: datadog
      password: 'ENC[datadog_user_database_password]'

      ## Optional: Connect to a different database if needed for `custom_queries`
      # dbname: '<DB_NAME>'
```

**참고**: 비밀번호에 특수 문자가 포함된 경우, 작은 따옴표로 묶어 입력하세요.

변경 사항을 적용하려면 [Agent를 재시작][16]합니다.

### 검증 {#validate}

[Agent의 상태 하위 명령을 실행][13]하고 검사 섹션에서 `postgres`를 찾습니다. 또는 [데이터베이스][14] 페이지를 방문하여 시작할 수 있습니다.

## Agent 구성 예시 {#example-agent-configurations}

### Supavisor의 세션 풀러 사용 시 {#with-supavisors-session-pooler}

프록시를 통한 연결보다는 데이터베이스에 직접 연결하는 것을 권장하지만, 위 옵션을 사용할 수 없는 경우에는 Agent를 Supabase 인스턴스에 연결할 수도 있습니다. 이는 Supabase 프로젝트에 인스턴스가 하나만 있을 때 가장 효과적입니다.

Connect 대화 상자를 통해 프로젝트의 세션 풀러 연결 문자열을 가져와 Agent 구성 파일에 복사하세요.

```yaml
init_config:
instances:
    - dbm: true
      host: <SUPABASE_POOLER_ENDPOINT>
      port: 5432
      username: datadog.some-project-id
      password: 'ENC[datadog_user_database_password]'
```

{{% dbm-postgres-agent-config-examples %}}

## 문제 해결 {#troubleshooting}

설명에 따라 통합 및 Agent를 설치하고 구성했음에도 예상대로 작동하지 않는 경우 [문제 해결][15]을 참조하세요.

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
[16]: /ko/agent/configuration/agent-commands/#restart-the-agent
[17]: https://supabase.com/docs/guides/platform/ipv4-address
[18]: /ko/database_monitoring/setup_postgres/advanced_configuration/#configuring-column-statistics-collection