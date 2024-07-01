---
description: Google Cloud SQL에서 Postgres 관리형 데이터베이스 모니터링을 설치하고 설정합니다.
further_reading:
- link: /integrations/postgres/
  tag: 설명서
  text: 기본 Postgres 통합
title: Google Cloud SQL 관리형 Postgres에서 데이터베이스 모니터링 설정
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">데이터베이스 모니터링은 이 사이트에서 지원되지 않습니다.</div>
{{< /site-region >}}

데이터베이스 모니터링을 사용해 쿼리 메트릭, 쿼리 샘플, 실행 계획, 데이터베이스 상태, 장애 조치, 이벤트를 노출시켜 Postgres 데이터베이스를 상세히 가시화할 수 있습니다.

에이전트에서는 데이터베이스에 읽기 전용 사용자로 로그인해 원격 분석 데이터를 직접 수집합니다. Postgres 데이터베이스에서 데이터베이스 모니터링을 사용하려면 다음 단계를 따르세요.

1. [데이터베이스 파라미터 설정](#configure-postgres-settings)
1. [에이전트가 데이터베이스에 액세스할 수 있도록 권한 부여](#grant-the-agent-access)
1. [에이전트 설치](#install-the-agent)
1. [Cloud SQL 통합 설치](#install-the-cloud-sql-integration)

## 시작 전에 참고 사항

지원되는 PostgreSQL 버전
: 10, 11, 12, 13, 14

지원되는 에이전트 버전
: 7.36.1+

성능에 미치는 영향
: 데이터베이스 모니터링을 위한 기본 에이전트 설정은 보수적이지만 수집 간격 및 쿼리 샘플 등 설정을 조정해 요구 사항을 더 잘 충족할 수 있습니다. 대부분의 워크로드의 경우 에이전트는 데이터베이스에서 쿼리 실행 시간의 1% 미만, CPU 비율의 1% 미만을 차지합니다. <br/><br/>
데이터베이스 모니터링은 기본 에이전트에서 통합으로 실행됩니다([벤치마크 참조][1]).

프록시, 로드 밸런서, 연결 풀러
: 에이전트는 모니터링 중인 호스트에 직접 연결해야 합니다. 자체 호스팅 데이트베이스는  `127.0.0.1`이나 소켓을 통해 연결하는 것이 좋습니다. 에이전트를 프록시, 로드 밸런`pgbouncer`와 같은 연결 풀러로 연결하지 마세요. 이는 클라이언트 애플리케이션에 안티 패턴일 수 있으나 각 에이전트가 기본 호스트 이름을 알고 있어야 하며, 장애 조치 시에도 수명 기간 동안에는 단일 호스트에 연결되어야 합니다. Datadog 에이전트가 실행되는 동안 다른 호스트에 연결되면 메트릭 값이 올바르지 않게 됩니다.

데이터 보안 고려사항
: 에이전트가 데이터베이스에서 어떤 정보를 수집하고 어떻게 보안을 확보하는지 알아보려면 [민감한 정보][2]를 참고하세요.

## Postgres 설정 구성

[데이터베이스 플래그][4]에서 다음 [파라미터][3]를 설정합니다. **서버를 재시작**해야 설정이 적용됩니다. 이 파라미터에 관한 더 자세한 정보는 [Postgres 설명서][5]를 참고하세요.

| 파라미터 | 값 | 설명 |
| --- | --- | --- |
| `track_activity_query_size` | `4096` | 대량 쿼리 수집에 필요. `pg_stat_activity`와 `pg_stat_statements`에서 SQL 텍스트 크기를 늘림. 기본값으로 두면 `1024`자보다 긴 쿼리가 수집되지 않음. |
| `pg_stat_statements.track` | `all` | 선택 사항. 저장된 절차와 함수 내에 있는 문 추적을 활성화. |
| `pg_stat_statements.max` | `10000` | 선택 사항. `pg_stat_statements`에 있는 표준화된 쿼리 추적 수를 늘림. 데이터베이스 볼륨이 크고 여러 클라이언트에서 다양한 유형의 쿼리가 포함된 경우에 이 설정을 추천. |
| `pg_stat_statements.track_utility` | `off` | 선택 사항. PREPARE 및 EXPLAIN과 같은 유틸리티 명령을 비활성화. 이 값을 `off`로 하면 SELECT, UPDATE, DELETE과 같은 쿼리만 추적함. |
| `track_io_timing` | `on` | 선택 사항. 블록 읽기 및 쓰기 쿼리 시간 수집 활성화. |


## 에이전트 액세스 허용

Datadog 에이전트가 통계와 쿼리를 수집하려면 데이터베이스 서버에 읽기 전용 액세스가 필요합니다.

Postgres가 복제되면 다음 SQL 명령을 **주** 데이터베이스 서버(쓰기 권한자)에서 실행해야 합니다. 데이터베이스 서버에서 에이전트를 연결할 PostgreSQL 데이베이스를 선택하세요. 어떤 데이터베이스에 연결하든 에이전트는 서버에 있는 모든 데이터베이스에서 원격 분석 데이터를 수집하기 때문에 기본값인 `postgres` 데이터베이스에 연결하는 것이 좋습니다. 에이전트에서 [특정 데이터베이스의 커스텀 쿼리][6]를 실행하고 싶을 경우에만 다른 데이터베이스를 선택하세요.

선택한 데이터베이스에 슈퍼 사용자(또는 충분한 권한이 있는 다른 사용자)로 연결합니다. 예를 들어 선택한 데이터베이스가 `postgres`면 다음을 실행하여 [psql][7]를 이용해 `postgres` 사용자로 연결합니다.

 ```bash
 psql -h mydb.example.com -d postgres -U postgres
 ```

`datadog` 사용자를 생성합니다.

```SQL
CREATE USER datadog WITH password '<PASSWORD>';
```

**모든 데이터베이스**에 다음 스키마를 생성합니다.

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

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

암호 입력 메시지가 나타나면 `datadog` 사용자를 생성할 때 입력한 암호를 사용합니다.

## 에이전트 설치

Cloud SQL 호스트를 모니터링하려면 인프라스트럭처에 Datadog 에이전트를 설치하고 각 인스턴스에 원격으로 연결하도록 설정합니다. 에이전트를 데이터베이스에서 실행할 필요가 없고 데이터베이스에 연결만 하면 됩니다. 여기에 나와있지 않은 다른 설치 방법을 보려면 [에이전트 설치 지침][8]을 참고하세요.

{{< tabs >}}
{{% tab "Host" %}}

호스트에서 실행하는 데이터베이스 모니터링 메트릭 수집을 설정하려면(예: 에이전트가 Google Cloud SQL 데이터베이스에서 수집할 수 있도록 소규모 GCE 인스턴스를 프로비저닝할 때) 다음을 따르세요.

1. `postgres.d/conf.yaml` 파일을 편집해 `host`/`port`를 가리키도록하고 마스터를 모니터링하도록 설정합니다. 사용할 수 있는 모든 설정 옵션을 보려면 [postgres.d/conf.yaml 샘플][1]을 참고하세요. `postgres.d` 디렉터리 위치는 운영 체제에 따라 다릅니다. 더 자세한 정보는 [에이전트 설정 디렉터리][4]를 참고하세요.
   ```yaml
   init_config:
   instances:
     - dbm: true
       host: '<INSTANCE_ADDRESS>'
       port: 5432
       username: datadog
       password: '<PASSWORD>'
       ## Optional: Connect to a different database if needed for `custom_queries`
       # dbname: '<DB_NAME>'

       # After adding your project and instance, configure the Datadog Google Cloud (GCP) integration to pull additional cloud data such as CPU, Memory, etc.
       gcp:
        project_id: '<PROJECT_ID>'
        instance_id: '<INSTANCE_ID>'
   ```
2. [에이전트를 다시 시작합니다][2].

`project_id`와 `instance_id` 필드를 설정하는 방법에 관한 자세한 정보는 [Postgres 통합 스펙][3]을 참고하세요.

[1]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[2]: /ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://github.com/DataDog/integrations-core/blob/master/postgres/assets/configuration/spec.yaml#L417-L444
[4]: /ko/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
{{% /tab %}}
{{% tab "도커(Docker)" %}}

Google Cloud Run과 같은 도커 컨테이너에서 실행하는 데이터베이스 모니터링 에이전트를 구성하려면 에이전트 컨테이너에서 [자동탐지 통합 템플릿][1]을 도커 레이블로 설정합니다.

**참고**: 에이전트에 도커 자동탐지 레이블을 읽을 수 있는 권한이 있어야 작동합니다. 

### 명령줄

명령줄에 다음 명령을 실행해 빠르게 에이전트를 실행합니다. 내 계정과 환경에 맞게 값을 변경하세요.

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=7.36.1

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.check_names='["postgres"]' \
  -l com.datadoghq.ad.init_configs='[{}]' \
  -l com.datadoghq.ad.instances='[{
    "dbm": true,
    "host": "<INSTANCE_ADDRESS>",
    "port": 5432,
    "username": "datadog",
    "password": "<UNIQUEPASSWORD>",
    "gcp": {
      "project_id": "<PROJECT_ID>",
      "instance_id": "<INSTANCE_ID>"
    }
  }]' \
  gcr.io/datadoghq/agent:${DD_AGENT_VERSION}
```

### Dockerfile

`Dockerfile`에서도 레이블을 지정할 수 있어 인프라스트럭처 설정을 변경할 필요 없이 커스텀 에이전트를 빌드하고 배포할 수 있습니다.

```Dockerfile
FROM gcr.io/datadoghq/agent:7.36.1

LABEL "com.datadoghq.ad.check_names"='["postgres"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<INSTANCE_ADDRESS>", "port": 5432,"username": "datadog","password": "<UNIQUEPASSWORD>", "gcp": {"project_id": "<PROJECT_ID>", "instance_id": "<INSTANCE_ID>"}}]'
```

`project_id`와 `instance_id` 필드 설정에 관한 추가 정보는 [Postgres 통합 스펙][2]을 참고하세요.

`datadog` 사용자 암호가 일반 텍스트로 노출되는 것을 예방하려면 에이전트의 [비밀 관리 패키지][3]를 이용해 `ENC[]` 구문을 사용하여 암호를 선언하거나 [자동탐지 템플릿 변수 설명서][4]에서 환경 변수로 암호를 전달하는 방법을 살펴보세요.


[1]: /ko/agent/docker/integrations/?tab=docker
[2]: https://github.com/DataDog/integrations-core/blob/master/postgres/assets/configuration/spec.yaml#L417-L444
[3]: /ko/agent/guide/secrets-management
[4]: /ko/agent/faq/template_variables/
{{% /tab %}}
{{% tab "쿠버네티스(Kubernetes)" %}}

쿠버네티스 클러스터가 있는 경우 데이터베이스 모니터링에서  [Datadog 클러스터 에이전트][1]를 사용하세요.

쿠버네티스 클러스터에서 클러스터 점검을 아직 활성화하지 않은 경우 [클러스터 확인 활성화][2] 지침에 따라 활성화합니다. 클러스터 에이전트 컨테이너에 연결된 정적 파일을 이용하거나 서비스 주석을 이용해 Postgres 설정을 선언할 수 있습니다.

### Helm을 사용한 명령줄

다음 [Helm][3] 명령을 실행해 쿠버네티스 클러스터에서 [Datadog 클러스터 에이전트][1]를 설치하세요. 내 계정과 환경에 맞게 값을 변경하세요.

```bash
helm repo add datadog https://helm.datadoghq.com
helm repo update

helm install <RELEASE_NAME> \
  --set 'datadog.apiKey=<DATADOG_API_KEY>' \
  --set 'clusterAgent.enabled=true' \
  --set 'clusterChecksRunner.enabled=true' \
  --set 'clusterAgent.confd.postgres\.yaml=cluster_check: true
init_config:
instances:
  - dbm: true
    host: <INSTANCE_ADDRESS>
    port: 5432
    username: datadog
    password: "<UNIQUEPASSWORD>"
    gcp:
      project_id: "<PROJECT_ID>"
      instance_id: "<INSTANCE_ID>"' \
  datadog/datadog
```

### 연결된 파일로 설정

연결된 설정 파일로 클러스터 점검을 설정하려면 다음 경로로 설정 파일을 클러스터 에이전트 컨테이너에 연결합니다: `/conf.d/postgres.yaml`

```yaml
cluster_check: true  # Make sure to include this flag
init_config:
instances:
  - dbm: true
    host: '<INSTANCE_ADDRESS>'
    port: 5432
    username: datadog
    password: '<PASSWORD>'
    # After adding your project and instance, configure the Datadog GCP integration to pull additional cloud data such as CPU, Memory, etc.
    gcp:
      project_id: '<PROJECT_ID>'
      instance_id: '<INSTANCE_ID>'
```

### 쿠버네티스 서비스 주석으로 설정

파일을 연결하는 대신 쿠버네티스 서비스로 인스턴스 설정을 지정할 수 있습니다. 쿠버네티스가 실행되는 에이전트에서 이 점검을 설정하려면 Datadog 클러스터 에이전트와 동일한 네임스페이스로 서비스를 생성하세요.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: postgres
  labels:
    tags.datadoghq.com/env: '<ENV>'
    tags.datadoghq.com/service: '<SERVICE>'
  annotations:
    ad.datadoghq.com/service.check_names: '["postgres"]'
    ad.datadoghq.com/service.init_configs: '[{}]'
    ad.datadoghq.com/service.instances: |
      [
        {
          "dbm": true,
          "host": "<INSTANCE_ADDRESS>",
          "port": 5432,
          "username": "datadog",
          "password": "<UNIQUEPASSWORD>",
          "gcp": {
            "project_id": "<PROJECT_ID>",
            "instance_id": "<INSTANCE_ID>"
          }
        }
      ]
spec:
  ports:
  - port: 5432
    protocol: TCP
    targetPort: 5432
    name: postgres
```

`project_id`와 `instance_id` 필드 설정에 관한 추가 정보는 [Postgres 통합 스펙][4]을 참고하세요.

클러스터 에이전트가 자동으로 설정을 등록하고 Postgres 점검을 실행합니다.

`datadog` 사용자 암호가 일반 텍스트로 노출되는 것을 예방하려면 에이전트의 [비밀 관리 패키지][5]를 이용해`ENC[]` 구문을 사용하여 암호를 선언하세요.

[1]: /ko/agent/cluster_agent
[2]: /ko/agent/cluster_agent/clusterchecks/
[3]: https://helm.sh
[4]: https://github.com/DataDog/integrations-core/blob/master/postgres/assets/configuration/spec.yaml#L417-L444
[5]: /ko/agent/guide/secrets-management
{{% /tab %}}
{{< /tabs >}}

### 검증

[에이전트 상태 하위 명령을 실행][9]하고 점검 섹션에서 `postgres`를 찾으세요. 또는 [데이터베이스][10] 페이지에서 시작할 수도 있습니다.
## 에이전트 설정 예시
{{% dbm-postgres-agent-config-examples %}}

## Cloud SQL 통합 설치

Google Cloud에서 좀 더 포괄적인 데이터베이스를 수집하려면 [Cloud SQL 통합][1](선택 사항)을 설치하세요.

## 문제 해결

설명에 따라 통합과 에이전트를 설치하고 설정했는데 제대로 작동하지 않는 경우 [트러블슈팅][12]을 참고하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/basic_agent_usage#agent-overhead
[2]: /ko/database_monitoring/data_collected/#sensitive-information
[3]: https://www.postgresql.org/docs/current/config-setting.html
[4]: https://cloud.google.com/sql/docs/postgres/flags
[5]: https://www.postgresql.org/docs/current/pgstatstatements.html
[6]: /ko/integrations/faq/postgres-custom-metric-collection-explained/
[7]: https://www.postgresql.org/docs/current/app-psql.html
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: /ko/agent/guide/agent-commands/#agent-status-and-information
[10]: https://app.datadoghq.com/databases
[11]: /ko/integrations/google_cloudsql
[12]: /ko/database_monitoring/troubleshooting/?tab=postgres