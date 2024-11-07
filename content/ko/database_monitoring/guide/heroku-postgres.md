---
further_reading:
- link: /agent/basic_agent_usage/heroku/
  tag: 설명서
  text: Datadog 헤로쿠 빌드팩
private: true
title: 데이터베이스 모니터링을 위해 헤로쿠(Heroku) Postgres 설정
---

이 가이드는 애플리케이션 다이노스에 [Datadog 헤로쿠 빌드팩][1]이 설정된 것으로 간주합니다.

[Datadog 데이터베이스 모니터링][2]을 사용하면 한 곳에서 모든 데이터베이스의 쿼리 메트릭과 실행 계획을 확인할 수 있습니다. 이 가이드는 [헤로쿠 Postgres 관리 데이터베이스][3]를 위해 데이터베이스 모니터링을 설정하는 방법을 다룹니다.

*참고*: [표준 및 프리미엄 플랜][4]의 데이터베이스에서만 통합에서 사용되는 메트릭을 게시합니다. 데이터베이스 모니터링의 일부 가능은 하비 플랜에서 Postgres 인스턴스를 사용하는 경우 사용할 수 없습니다.

먼저, 데이터베이스에 `datadog` 사용자를 생성합니다.

```shell
# 애플리케이션의 루트 디렉터리에 있는지 확인합니다.
heroku pg:credentials:create --name datadog

# 새로운 자격 증명을 애플리케이션에 연결합니다.
heroku addons:attach <database-name> --credential datadog
```

애플리케이션에 새로운 자격 증명을 연결하면 연결 URL로 애플리케이션에 새로운 환경 변수를 생성할 수 있습니다. 나중에 사용할 것이므로 환경 변수를 기록해 두세요.

기본 자격 증명을 사용해 Postgres 데이터베이스에 로그인하여 `datadog` 자격 증명에 올바른 권한을 제공합니다.

```shell
heroku pg:psql
```

psql 터미널에 있는 경우 다음 스키마를 생성합니다.

```
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

데이터베이스에서 다음 함수를 생성합니다.

```
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

마지막으로, Datadog 에이전트를 설정하여 새로운 자격 증명으로 Postgres 점검을 활성화합니다.

```shell
# Ensure that you are in the root directory of your application
# Create the folder for the integrations configuration in your application code
mkdir -p datadog/conf.d/
```

다음 콘텐츠를 포함하는 `postgres.yaml` 설정 파일을 생성합니다. 사전 실행 스크립트의 일부로 실행되므로 해당 콘텐츠를 자격 증명과 교체하지 마십시오.

```yaml
init_config:

instances:
  - dbm: true
    host: <YOUR HOSTNAME>
    port: <YOUR PORT>
    username: <YOUR USERNAME>
    password: <YOUR PASSWORD>
    dbname: <YOUR DBNAME>
    ssl: True
```

`datadog` 자격 증명이 애플리케이션에 연결되어 있는 경우 생성된 환경 변수를 사용합니다. 아래 예시에서 이 값은 `HEROKU_POSTGRESQL_PINK_URL`로 간주됩니다. 다음을 [사전 실행 스크립트][5]를 추가해 Datadog 에이전트 시작 전 해당 값을 교체합니다.

```bash
#!/usr/bin/env bash

# Update the Postgres configuration from above using the Heroku application environment variable
if [ -n "$HEROKU_POSTGRESQL_PINK_URL" ]; then
  POSTGREGEX='^postgres://([^:]+):([^@]+)@([^:]+):([^/]+)/(.*)$'
  if [[ $HEROKU_POSTGRESQL_PINK_URL =~ $POSTGREGEX ]]; then
    sed -i "s/<YOUR HOSTNAME>/${BASH_REMATCH[3]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<YOUR USERNAME>/${BASH_REMATCH[1]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<YOUR PASSWORD>/${BASH_REMATCH[2]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<YOUR PORT>/${BASH_REMATCH[4]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<YOUR DBNAME>/${BASH_REMATCH[5]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
  fi
fi
```

헤로쿠에 배포:

```shell
# Deploy to Heroku
git add .
git commit -m "Enable postgres integration"
git push heroku main
```

[1]: /ko/agent/basic_agent_usage/heroku/
[2]: https://www.datadoghq.com/product/database-monitoring/
[3]: https://devcenter.heroku.com/articles/heroku-postgresql
[4]: https://devcenter.heroku.com/articles/heroku-postgres-plans
[5]: /ko/agent/basic_agent_usage/heroku/#prerun-script