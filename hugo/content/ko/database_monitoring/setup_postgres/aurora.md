---
description: Amazon Aurora에서 Postgres용 Database Monitoring을 설치하고 구성합니다.
further_reading:
- link: /integrations/postgres/
  tag: 설명서
  text: 기본 Postgres 통합
- link: /database_monitoring/guide/parameterized_queries/
  tag: 설명서
  text: SQL 쿼리 파라미터 값 캡처
title: Aurora 관리형 Postgres에서 Database Monitoring 설정
---
Database Monitoring은 쿼리 메트릭, 쿼리 샘플, 계획 설명, 데이터베이스 상태, 대체 작동 및 이벤트를 노출하여 Postgres 데이터베이스에 대한 심층적인 가시성을 제공합니다.

Agent는 읽기 전용 사용자로 로그인하여 데이터베이스에서 직접 원격 분석을 수집합니다. Postgres 데이터베이스에서 Database Monitoring을 활성화하려면 다음 설정을 수행하세요.

1. [데이터베이스 파라미터 구성](#configure-postgres-settings)
1. [Agent에 데이터베이스 액세스 권한 부여](#grant-the-agent-access)
1. [Agent 설치 및 구성](#install-and-configure-the-agent)
1. [RDS 통합 설치](#install-the-rds-integration)

## 시작 전 참고 사항 {#before-you-begin}

지원되는 PostgreSQL 버전
: 9.6, 10, 11, 12, 13, 14, 15, 16, 17

지원되는 Agent 버전
: 7.36.1 이상

성능 영향
: Database Monitoring을 위한 기본 Agent 구성은 보수적이지만, 수집 간격 및 쿼리 샘플링 비율과 같은 구성을 조정하여 환경에 맞게 최적화할 수 있습니다. 대부분의 워크로드에서 Agent는 데이터베이스 쿼리 실행 시간의 1% 미만, CPU 사용량의 1% 미만을 차지합니다. <br/><br/>
Database Monitoring은 기본 Agent 위에서 실행되는 통합 기능입니다([벤치마크 참조][1]).

프록시, 로드 밸런서 및 연결 풀러
: Datadog Agent는 모니터링 대상 호스트에 직접 연결되어야 합니다. 자체 호스팅 데이터베이스의 경우 `127.0.0.1` 또는 소켓을 사용하세요. Agent는 프록시, 로드 밸런서, `pgbouncer`과 같은 연결 풀러 또는 **Aurora 클러스터 엔드포인트**를 통해 데이터베이스에 연결해서는 안 됩니다. 클러스터 엔드포인트에 연결할 경우 Agent는 임의의 복제본 하나에서만 데이터를 수집하므로 해당 복제본에 대한 가시성만 제공합니다. Agent가 실행 중에 다른 호스트로 연결을 전환하는 경우(예: 장애 조치, 로드 밸런싱 등), 서로 다른 두 호스트의 통계 차이를 계산하게 되어 부정확한 메트릭이 생성됩니다.

데이터 보안 고려 사항
: Agent가 데이터베이스에서 수집하는 데이터와 이를 안전하게 보호하는 방법에 대해서는 [민감한 정보][2]를 참조하세요.

## Postgres 설정 구성 {#configure-postgres-settings}

다음 [파라미터][3]를 [DB 파라미터 그룹][4]에서 구성한 후 설정이 적용되도록 **서버를 재시작**하세요. 이러한 파라미터에 대한 자세한 내용은 [Postgres 설명서][5]를 참조하세요.

**필수 파라미터**

| 파라미터 | 값 | 설명 |
| --- | --- | --- |
| `shared_preload_libraries` | `pg_stat_statements` | `postgresql.queries.*` 메트릭에 필요합니다. [pg_stat_statements][5] 확장을 사용하여 쿼리 메트릭 수집을 활성화합니다. Aurora에서는 기본적으로 활성화되어 있습니다. |
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

**참고:** IAM 인증도 지원됩니다. Aurora 인스턴스에서 이를 구성하는 방법은 [가이드][14]를 참조하세요.

{{< tabs >}}
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

## Agent 설치 및 구성 {#install-and-configure-the-agent}

Aurora 호스트를 모니터링하려면 인프라에 Datadog Agent를 설치하고 각 인스턴스 엔드포인트에 원격으로 연결되도록 구성하세요. Agent는 데이터베이스에서 실행될 필요가 없으며, 데이터베이스에 연결만 할 수 있으면 됩니다. 여기에서 언급되지 않은 추가 Agent 설치 방법은 [Agent 설치 지침][8]을 참조하세요.

### Autodiscovery 설정(권장) {#autodiscovery-setup-recommended}

Datadog Agent는 클러스터 내 모든 Aurora 엔드포인트에 대해 Autodiscovery를 지원합니다.

특정 인스턴스마다 다른 구성이 필요하거나 Aurora 엔드포인트를 수동으로 지정하고 싶은 경우 아래의 수동 설정 섹션을 따르세요.
그렇지 않으면 Datadog은 [Aurora DB 클러스터용 Autodiscovery 설정 지침][9]을 사용하는 것을 권장합니다.

{{< tabs >}}
{{% tab "호스트" %}}

호스트에서 실행하는 Agent를 위한 Database Monitoring 메트릭 수집을 구성하려면(예: 에이전트가 Aurora 데이터베이스에서 수집할 수 있도록 소규모 EC2 인스턴스를 프로비저닝할 때) 다음을 따릅니다.

1. `postgres.d/conf.yaml` 파일을 편집하여 `host` / `port`를 가리키도록 설정하고 모니터링할 마스터를 지정합니다. 사용 가능한 모든 구성 옵션은 [샘플 postgres.d/conf.yaml][1]을 참조하세요.

   ```yaml
   init_config:
   instances:
     - dbm: true
       host: '<AWS_INSTANCE_ENDPOINT>'
       port: 5432
       username: datadog
       password: 'ENC[datadog_user_database_password]'
       aws:
         instance_endpoint: '<AWS_INSTANCE_ENDPOINT>'
         region: '<REGION>'

       ## Optional: Connect to a different database if needed for `custom_queries`
       # dbname: '<DB_NAME>'
   ```

<div class="alert alert-danger">여기에는 클러스터 엔드포인트가 아니라 Aurora 인스턴스 엔드포인트를 사용해야 합니다.</div>

2. [Agent를 재시작][2]합니다.

[1]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[2]: /ko/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}

{{% tab "Docker" %}}
ECS 또는 Fargate와 같이 Docker 컨테이너에서 실행되는 Agent에 통합을 구성하려면 여러 가지 방법을 사용할 수 있으며, 자세한 내용은 [Docker 구성 설명서][1]에 설명되어 있습니다.

아래 예제에서는 [Docker 레이블][2]과 [Autodiscovery 템플릿][3]를 사용하여 Postgres 통합을 구성하는 방법을 보여줍니다.

**참고**: 레이블에 대한 Autodiscovery가 작동하려면 Agent에 Docker 소켓에 대한 읽기 권한이 있어야 합니다.

### 명령줄 {#command-line}

Agent를 시작하려면 [명령줄][4]에서 다음 명령을 실행합니다. 자리표시자 값은 실제 계정 및 환경 값으로 바꾸세요.

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=<AGENT_VERSION>

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.checks='{"postgres": {
    "init_config": {},
    "instances": [{
      "dbm": true,
      "host": "<AWS_INSTANCE_ENDPOINT>",
      "port": 5432,
      "username": "datadog",
      "password": "<UNIQUEPASSWORD>",
       "aws": {
         "instance_endpoint": "<AWS_INSTANCE_ENDPOINT>",
         "region": "<REGION>"
       },
      "tags": ["dbinstanceidentifier:<DB_INSTANCE_NAME>"]
    }]
  }}' \
  registry.datadoghq.com/agent:${DD_AGENT_VERSION}
```

Postgres 9.6의 경우 호스트와 포트가 지정된 인스턴스 구성에 다음 설정을 추가하세요.

```yaml
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()"
```

### Dockerfile {#dockerfile}

`Dockerfile`에 레이블을 지정하여 인프라 구성을 수정하지 않고도 사용자 지정 Agent를 빌드 및 배포할 수도 있습니다.

```Dockerfile
FROM registry.datadoghq.com/agent:<AGENT_VERSION>

LABEL "com.datadoghq.ad.check_names"='["postgres"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<AWS_INSTANCE_ENDPOINT>", "port": 5432,"username": "datadog","password": "ENC[datadog_user_database_password]","aws": {"instance_endpoint": "<AWS_INSTANCE_ENDPOINT>", "region": "<REGION>"}, "tags": ["dbinstanceidentifier:<DB_INSTANCE_NAME>"]}]'
```

Postgres 9.6의 경우 호스트와 포트가 지정된 인스턴스 구성에 다음 설정을 추가하세요.

```yaml
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()"
```

`datadog` 사용자의 비밀번호가 일반 텍스트로 노출되지 않도록 하려면 Agent의 [시크릿 관리 패키지][5]를 사용하고 `ENC[]` 구문을 사용하여 비밀번호를 선언하세요. 또는 [Autodiscovery 템플릿 변수 설명서][6]을 참조하여 환경 변수로 비밀번호를 제공할 수 있습니다.

[1]: /ko/containers/docker/integrations/?tab=labels#configuration
[2]: https://docs.docker.com/engine/manage-resources/labels/
[3]: /ko/getting_started/containers/autodiscovery/
[4]: /ko/containers/docker/integrations/?tab=labels#using-docker-run-nerdctl-run-or-podman-run
[5]: /ko/agent/configuration/secrets-management
[6]: /ko/agent/faq/template_variables/
{{% /tab %}}

{{% tab "Kubernetes" %}}
Kubernetes 클러스터를 실행 중인 경우 Database Monitoring을 활성화하려면 [Datadog Cluster Agent][1]를 사용하세요.

**참고**: 계속 진행하기 전에 Datadog Cluster Agent에서 [클러스터 검사][2]가 활성화되어 있는지 확인하세요.

아래에는 다양한 Datadog Cluster Agent 배포 방식을 사용하여 Postgres 통합을 구성하는 단계별 지침이 나와 있습니다.

### Operator {#operator}

[Kubernetes and Integrations의 Operator 지침][3]을 참고하여 다음 단계에 따라 Postgres 통합을 설정하세요.

1. 다음 구성을 사용하여 `datadog-agent.yaml` 파일을 생성 또는 업데이트합니다.

    ```yaml
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      global:
        clusterName: <CLUSTER_NAME>
        site: <DD_SITE>
        credentials:
          apiSecret:
            secretName: datadog-agent-secret
            keyName: api-key

      features:
        clusterChecks:
          enabled: true

      override:
        nodeAgent:
          image:
            name: agent
            tag: <AGENT_VERSION>

        clusterAgent:
          extraConfd:
            configDataMap:
              postgres.yaml: |-
                cluster_check: true
                init_config:
                instances:
                - host: <AWS_INSTANCE_ENDPOINT>
                  port: 5432
                  username: datadog
                  password: 'ENC[datadog_user_database_password]'
                  dbm: true
                  aws:
                    instance_endpoint: <AWS_INSTANCE_ENDPOINT>
                    region: <REGION>
                  tags:
                  - "dbinstanceidentifier:<DB_INSTANCE_NAME>"
    ```

    **Note**: For Postgres 9.6, add the following lines to the instance config where host and port are specified:

    ```yaml
    pg_stat_statements_view: datadog.pg_stat_statements()
    pg_stat_activity_view: datadog.pg_stat_activity()
    ```

2. 다음 명령을 사용하여 변경 사항을 Datadog Operator에 적용합니다.

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

### Helm {#helm}

[Kubernetes and Integrations의 Helm 지침][4]을 참고하여 다음 단계에 따라 Postgres 통합을 설정하세요.

1. 다음 구성을 사용하여 `datadog-values.yaml` 파일(Cluster Agent 설치 지침에서 사용하는 파일)을 업데이트합니다.

    ```yaml
    datadog:
      clusterChecks:
        enabled: true

    clusterChecksRunner:
      enabled: true

    clusterAgent:
      enabled: true
      confd:
        postgres.yaml: |-
          cluster_check: true
          init_config:
          instances:
          - dbm: true
            host: <AWS_INSTANCE_ENDPOINT>
            port: 5432
            username: datadog
            password: 'ENC[datadog_user_database_password]'
            aws:
              instance_endpoint: <AWS_INSTANCE_ENDPOINT>
              region: <REGION>
            tags:
            - "dbinstanceidentifier:<DB_INSTANCE_NAME>"
    ```

    **Note**: For Postgres 9.6, add the following lines to the instance config where host and port are specified:

    ```yaml
    pg_stat_statements_view: datadog.pg_stat_statements()
    pg_stat_activity_view: datadog.pg_stat_activity()
    ```

2. 다음 명령을 사용하여 위 구성 파일과 함께 Agent를 배포합니다.

    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
Windows에서는 <code>--set targetSystem=windows</code> 을(를) <code>helm install</code> 명령에 추가하세요.
</div>

### 마운팅된 파일로 구성 {#configure-with-mounted-files}

마운팅된 구성 파일로 클러스터 검사를 구성하려면 Cluster Agent 컨테이너의 다음 경로에 구성 파일을 마운트합니다. `/conf.d/postgres.yaml`

```yaml
cluster_check: true  # Make sure to include this flag
init_config:
instances:
  - dbm: true
    host: '<AWS_INSTANCE_ENDPOINT>'
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    aws:
      instance_endpoint: <AWS_INSTANCE_ENDPOINT>
      region: <REGION>
    tags:
    - "dbinstanceidentifier:<DB_INSTANCE_NAME>"

```

### Kubernetes 서비스 주석으로 구성 {#configure-with-kubernetes-service-annotations}

파일을 마운팅하는 대신 인스턴스 구성을 Kubernetes 서비스로 선언할 수 있습니다. Kubernetes에서 실행되는 Agent에 이 검사를 구성하려면 다음 구문을 사용하여 서비스를 생성합니다.

#### Autodiscovery annotations v2 {#autodiscovery-annotations-v2}

```yaml
apiVersion: v1
kind: Service
metadata:
  name: postgres
  labels:
    tags.datadoghq.com/env: '<ENV>'
    tags.datadoghq.com/service: '<SERVICE>'
  annotations:
    ad.datadoghq.com/service.checks: |
      {
        "postgres": {
          "init_config": <INIT_CONFIG>,
          "instances": [
            {
              "dbm": true,
              "host": "<AWS_INSTANCE_ENDPOINT>",
              "port": 5432,
              "username": "datadog",
              "password": "ENC[datadog_user_database_password]",
              "aws": {
                "instance_endpoint": "<AWS_INSTANCE_ENDPOINT>",
                "region": "<REGION>"
              },
              "tags": [
                "dbinstanceidentifier:<DB_INSTANCE_NAME>"
              ]
            }
          ]
        }
      }
spec:
  ports:
  - port: 5432
    protocol: TCP
    targetPort: 5432
    name: postgres
```

자세한 내용은 [Autodiscovery Annotations][5]를 참조하세요.

Postgres 9.6을 사용하는 경우 인스턴스 구성에 다음 내용을 추가합니다.

```json
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()"
```

Cluster Agent는 이 구성을 자동으로 등록하고 Postgres 검사 실행을 시작합니다.

`datadog` 사용자의 비밀번호가 일반 텍스트로 노출되지 않도록 하려면 Agent의 [시크릿 관리 패키지][6]를 사용하고 `ENC[]` 구문을 사용하여 비밀번호를 선언하세요.

[1]: /ko/containers/cluster_agent/setup/
[2]: /ko/containers/cluster_agent/clusterchecks/
[3]: /ko/containers/kubernetes/integrations/?tab=datadogoperator
[4]: /ko/containers/kubernetes/integrations/?tab=helm
[5]: /ko/containers/kubernetes/integrations/?tab=annotations#configuration
[6]: /ko/agent/configuration/secrets-management
{{% /tab %}}
{{< /tabs >}}

### Agent 설정 확인 {#verify-agent-setup}

[Agent의 상태 하위 명령을 실행][10]하고 검사 섹션에서 `postgres`를 찾습니다. 또는 [데이터베이스][11] 페이지를 방문하여 시작할 수 있습니다.

## Agent 구성 예시 {#example-agent-configurations}
{{% dbm-postgres-agent-config-examples %}}

## RDS 통합 설치 {#install-the-rds-integration}

CPU와 같은 AWS 인프라 메트릭을 DBM에서 직접 데이터베이스 텔레메트리와 함께 확인하려면 [RDS 통합][12]을 설치하세요(선택 사항).

## 문제 해결 {#troubleshooting}

설명한 대로 통합 및 Agent를 설치하고 구성했음에도 예상대로 작동하지 않는 경우 [문제 해결][13]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/database_monitoring/agent_integration_overhead/?tab=postgres
[2]: /ko/database_monitoring/data_collected/#sensitive-information
[3]: https://www.postgresql.org/docs/current/config-setting.html
[4]: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_WorkingWithParamGroups.html
[5]: https://www.postgresql.org/docs/current/pgstatstatements.html
[6]: /ko/integrations/faq/postgres-custom-metric-collection-explained/
[7]: https://www.postgresql.org/docs/current/app-psql.html
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: /ko/database_monitoring/guide/aurora_autodiscovery/?tab=postgres
[10]: /ko/agent/configuration/agent-commands/#agent-status-and-information
[11]: https://app.datadoghq.com/databases
[12]: /ko/integrations/amazon_rds
[13]: /ko/database_monitoring/troubleshooting/?tab=postgres
[14]: /ko/database_monitoring/guide/managed_authentication