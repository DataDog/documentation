---
description: Google Cloud SQL에서 Postgres 관리형 데이터베이스 모니터링을 설치하고 설정합니다.
further_reading:
- link: /integrations/postgres/
  tag: 설명서
  text: 기본 Postgres 통합
title: Google Cloud SQL 관리형 Postgres에서 데이터베이스 모니터링 설정
---

데이터베이스 모니터링은 쿼리 메트릭, 쿼리 샘플, 설명 계획, 데이터베이스 상태, 페일오버 및 이벤트를 노출하여 Postgres 데이터베이스에 대한 심층적인 가시성을 제공합니다.

에이전트는 읽기 전용 사용자로 로그인하여 데이터베이스에서 직접 원격 분석을 수집합니다. Postgres 데이터베이스로 데이터베이스 모니터링을 활성화하려면 다음 설정을 수행합니다.

1. [데이터베이스 파라미터 설정](#configure-postgres-settings)
1. [에이전트에 데이터베이스 접근 권한 부여](#grant-the-agent-access)
1. [에이전트를 설치 및 설정합니다](#install-and-configure-the-agent).
1. [클라우드 SQL 통합 설치](#Install-the-cloud-sql-integration)

## 시작 전 참고 사항

지원되는 PostgreSQL 버전
: 10, 11, 12, 13, 14, 15

지원되는 에이전트 버전
: 7.36.1+

성능에 미치는 영향
: 데이터베이스 모니터링에 대한 기본 에이전트 설정은 변경하지 않는 것이 좋으나 수집 간격 및 쿼리 샘플링 속도와 같은 설정은 필요에 맞게 조정할 수 있습니다. 대부분의 워크로드에서 에이전트는 데이터베이스에서 쿼리 실행 시간의 1% 미만, CPU의 1% 미만을 나타냅니다. <br/><br/>
데이터베이스 모니터링은 기본 에이전트 위에서 통합으로 실행됩니다([벤치마크 참조][1]).

프록시, 로드 밸런서 및 연결 풀러
: Datadog 에이전트는 모니터링 중인 호스트에 직접 연결해야 합니다. 자체 호스팅 데이터베이스의 경우 `127.0.0.1` 또는 소켓이 선호됩니다. 에이전트는 `pgbouncer`와 같은 프록시, 로드 밸런서, 연결 풀러를 통해 데이터베이스에 연결해서는 안됩니다. 에이전트가 실행되는 동안 다른 호스트에 연결하는 경우(페일오버, 로드밸런싱 등) 에이전트는 두 호스트 간의 통계 차이를 계산하여 부정확한 메트릭을 생성합니다.

데이터 보안 고려 사항
: 에이전트가 데이터베이스에서 수집하는 데이터와 데이터 보안을 유지하는 방법에 대한 자세한 내용은 [민감한 정보][2]를 참고하세요.

## Postgres 설정 구성

[데이터베이스 플래그][4]의 다음 [파라미터][3]를 설정한 다음 **서버를 다시 시작**해야 해당 설정이 적용됩니다. 해당 파라미터에 대한 자세한 내용을 확인하려면 [Postgres 문서][5]를 참고하세요.

| 파라미터 | 값 | 설명 |
| --- | --- | --- |
| `track_activity_query_size` | `4096` | 대규모 쿼리를 수집하는 데 필요합니다. `pg_stat_activity`의 SQL 텍스트의 크기를 늘립니다. 기본값으로 두면 `1024`자보다 긴 쿼리는 수집되지 않습니다. |
| `pg_stat_statements.track` | `all` | 선택 사항. 저장 프로시저 및 함수 내에서 명령문을 추적할 수 있습니다. |
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

**모든 데이터베이스에** 다음 스키마를 생성합니다.

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

<div class="alert alert-info">추가 테이블을 쿼리해야 하는 데이터 수집 또는 커스텀 메트릭의 경우 해당 테이블에 대한 <code>SELECT</code> 권한을 <code>datadog</code> 사용자에게 부여해야 할 수도 있습니다. 예: <code>&lt;TABLE_NAME&gt;에서 SELECT 권한을 Datadog에 부여합니다</code>. 자세한 내용은 <a href="https://docs.datadoghq.com/integrations/faq/postgres-custom-metric-collection-explained/">PostgreSQL 커스텀 메트릭 수집</a>을 참고하세요.</div>

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

## 에이전트 설치 및 구성

Cloud SQL 호스트를 모니터링하려면 인프라스트럭처에 Datadog 에이전트를 설치하고 각 인스턴스 엔드포인트에 원격으로 연결하도록 설정합니다. 에이전트는 데이터베이스에서 실행할 필요가 없으며 데이터베이스에 연결하기만 하면 됩니다. 여기에 언급되지 않은 추가 에이전트 설치 방법은 [에이전트 설치 지침][8]을 참고하세요.

{{< tabs >}}
{{% tab "호스트" %}}

호스트에서 실행하는 데이터베이스 모니터링 메트릭 수집을 설정하려면(예: 에이전트가 Google Cloud SQL 데이터베이스에서 수집할 수 있도록 소규모 GCE 인스턴스를 프로비저닝할 때) 다음을 따르세요.

1. `postgres.d/conf.yaml` 파일을 편집해 `host`/`port`를 가리키도록하고 마스터를 모니터링하도록 설정합니다. 사용할 수 있는 모든 설정 옵션을 보려면 [postgres.d/conf.yaml 샘플][1]을 참고하세요. `postgres.d` 디렉터리 위치는 운영 체제에 따라 다릅니다. 더 자세한 정보는 [에이전트 설정 디렉터리][4]를 참고하세요.
   ```yaml
   init_config:
   instances:
     - dbm: true
       host: '<INSTANCE_ADDRESS>'
       port: 5432
       username: datadog
       password: 'ENC[datadog_user_database_password]'
       ## Optional: Connect to a different database if needed for `custom_queries`
       # dbname: '<DB_NAME>'

       # After adding your project and instance, configure the Datadog Google Cloud (GCP) integration to pull additional cloud data such as CPU, Memory, etc.
       gcp:
        project_id: '<PROJECT_ID>'
        instance_id: '<INSTANCE_ID>'
   ```
2. [에이전트를 재시작합니다][2].

`project_id`와 `instance_id` 필드를 설정하는 방법에 관한 자세한 정보는 [Postgres 통합 스펙][3]을 참고하세요.

[1]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[2]: /ko/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[3]: https://github.com/DataDog/integrations-core/blob/master/postgres/assets/configuration/spec.yaml#L417-L444
[4]: /ko/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
{{% /tab %}}
{{% tab "Docker" %}}

Google Cloud Run과 같은 Docker 컨테이너에서 실행하는 데이터베이스 모니터링 에이전트를 구성하려면 에이전트 컨테이너에서 [자동탐지 통합 템플릿][1]을 Docker 레이블로 설정합니다.

**참고**: 에이전트에 Docker 자동탐지 레이블을 읽을 수 있는 권한이 있어야 작동합니다. 

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
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<INSTANCE_ADDRESS>", "port": 5432,"username": "datadog","password": "ENC[datadog_user_database_password]", "gcp": {"project_id": "<PROJECT_ID>", "instance_id": "<INSTANCE_ID>"}}]'
```

`project_id`와 `instance_id` 필드 설정에 관한 추가 정보는 [Postgres 통합 스펙][2]을 참고하세요.

[1]: /ko/agent/docker/integrations/?tab=docker
[2]: https://github.com/DataDog/integrations-core/blob/master/postgres/assets/configuration/spec.yaml#L417-L444
{{% /tab %}}
{{% tab "쿠버네티스" %}}

쿠버네티스 클러스터가 있는 경우 데이터베이스 모니터링에서  [Datadog 클러스터 에이전트][1]를 사용하세요.

쿠버네티스 클러스터에서 클러스터 점검을 아직 활성화하지 않은 경우 [클러스터 확인 활성화][2] 지침에 따라 활성화합니다. 클러스터 에이전트 컨테이너에 연결된 정적 파일을 이용하거나 서비스 주석을 이용해 Postgres 설정을 선언할 수 있습니다.

### Helm

다음 단계를 완료해 쿠버네티스 클러스터에서 [Datadog 클러스터 에이전트][1]를 설치하세요. 내 계정과 환경에 맞게 값을 변경하세요.

1. Helm용 [Datadog 에이전트 설치 지침][3]을 완료하세요.
2. 다음을 포함하도록 YAML 설정 파일(클러스터 에이전트 설치 지침의 `datadog-values.yaml`)을 업데이트하세요.
    ```yaml
    clusterAgent:
      confd:
        postgres.yaml: |-
          cluster_check: true
          init_config:
          instances:
          - dbm: true
            host: <INSTANCE_ADDRESS>
            port: 5432
            username: datadog
            password: 'ENC[datadog_user_database_password]'
            gcp:
              project_id: '<PROJECT_ID>'
              instance_id: '<INSTANCE_ID>'

    clusterChecksRunner:
      enabled: true
    ```

    Postgres 9.6의 경우 호스트와 포트가 지정된 인스턴스 설정에 다음 설정을 추가하세요.

    ```yaml
    pg_stat_statements_view: datadog.pg_stat_statements()
    pg_stat_activity_view: datadog.pg_stat_activity()
    ```

3. 명령줄에서 위의 설정 파일로 에이전트를 배포합니다.
    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
Windows의 경우 <code>--set targetSystem=windows</code>를 <code>helm 설치</code>명령에 추가하세요.
</div>

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ko/getting_started/site
[3]: /ko/containers/kubernetes/installation/?tab=helm#installation

### 연결된 파일로 설정

연결된 설정 파일로 클러스터 점검을 설정하려면 다음 경로로 설정 파일을 클러스터 에이전트 컨테이너에 연결합니다. `/conf.d/postgres.yaml`:

```yaml
cluster_check: true  # Make sure to include this flag
init_config:
instances:
  - dbm: true
    host: '<INSTANCE_ADDRESS>'
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    # 프로젝트 및 인스턴스를 추가한 후 Datadog GCP 통합을 설정하여 CPU, 메모리 등 추가 클라우드 데이터를 가져옵니다.
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
          "password": "ENC[datadog_user_database_password]",
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


[1]: /ko/agent/cluster_agent
[2]: /ko/agent/cluster_agent/clusterchecks/
[3]: https://helm.sh
[4]: https://github.com/DataDog/integrations-core/blob/master/postgres/assets/configuration/spec.yaml#L417-L444
{{% /tab %}}
{{< /tabs >}}

### 검증

[에이전트 상태 하위 명령을 실행][9]하고 점검 섹션에서 `postgres`를 찾으세요. 또는 [데이터베이스][10] 페이지에서 시작할 수도 있습니다.
## 에이전트 설정 예시
{{% dbm-postgres-agent-config-examples %}}

## Cloud SQL 통합 설치

Google Cloud에서 좀 더 포괄적인 데이터베이스를 수집하려면 [Cloud SQL 통합][1](선택 사항)을 설치하세요.

## 트러블슈팅

설명에 따라 통합과 에이전트를 설치하고 설정했는데 제대로 작동하지 않는 경우 [트러블슈팅][12]을 참고하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/database_monitoring/agent_integration_overhead/?tab=postgres
[2]: /ko/database_monitoring/data_collected/#sensitive-information
[3]: https://www.postgresql.org/docs/current/config-setting.html
[4]: https://cloud.google.com/sql/docs/postgres/flags
[5]: https://www.postgresql.org/docs/current/pgstatstatements.html
[6]: /ko/integrations/faq/postgres-custom-metric-collection-explained/
[7]: https://www.postgresql.org/docs/current/app-psql.html
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: /ko/agent/configuration/agent-commands/#agent-status-and-information
[10]: https://app.datadoghq.com/databases
[11]: /ko/integrations/google_cloudsql
[12]: /ko/database_monitoring/troubleshooting/?tab=postgres