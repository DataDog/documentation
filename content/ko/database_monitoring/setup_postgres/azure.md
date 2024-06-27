---
description: Azure에서 PostgreSQL 관리형용 데이터베이스 모니터링을 설치하고 구성합니다.
further_reading:
- link: /integrations/postgres/
  tag: 설명서
  text: 기본 Postgres 통합
kind: 설명서
title: Azure Database for PostgreSQL용 데이터베이스 모니터링 설정
---

데이터베이스 모니터링은 쿼리 메트릭, 쿼리 샘플, 설명 계획, 데이터베이스 상태, 페일오버 및 이벤트를 노출하여 Postgres 데이터베이스에 대한 심층적인 가시성을 제공합니다.

Agent는 읽기 전용 사용자로 로그인하여 데이터베이스에서 직접 원격 분석을 수집합니다. Postgres 데이터베이스로 데이터베이스 모니터링을 활성화하려면 다음 설정을 수행합니다.

1. [데이터베이스 파라미터 설정](#configure-postgres-settings)
1. [에이전트에 데이터베이스 접근 권한 부여](#grant-the-agent-access)
1. [Agent 설치](#install-the-agent)
1. [Azure PostgreSQL 통합 설치](#install-the-azure-postgresql-integration)

## 시작 전 참고 사항

지원되는 PostgreSQL 버전
: 9.6, 10, 11, 12, 13, 14, 15

지원되는 Azure PostgreSQL 배포 유형
: Azure VM의 PostgreSQL, 단일 서버, 유연한 서버

지원되는 Agent 버전
: 7.36.1+

성능에 미치는 영향
: 데이터베이스 모니터링에 대한 기본 Agent 설정은 변경하지 않는 것이 좋으나 수집 간격 및 쿼리 샘플링 속도와 같은 설정은 필요에 맞게 조정할 수 있습니다. 대부분의 워크로드에서 Agent는 데이터베이스에서 쿼리 실행 시간의 1% 미만, CPU의 1% 미만을 나타냅니다. <br/><br/>
데이터베이스 모니터링은 기본 Agent 위에서 통합으로 실행됩니다([벤치마크 참조][1]).

프록시, 로드 밸런서 및 연결 풀러
: Datadog Agent는 모니터링 중인 호스트에 직접 연결해야 합니다. 자체 호스팅 데이터베이스의 경우 `127.0.0.1` 또는 소켓이 선호됩니다. Agent는 `pgbouncer`와 같은 프록시, 로드 밸런서, 연결 풀러를 통해 데이터베이스에 연결해서는 안됩니다. Agent가 실행되는 동안 다른 호스트에 연결하는 경우(페일오버, 로드밸런싱 등) Agent는 두 호스트 간의 통계 차이를 계산하여 부정확한 메트릭을 생성합니다.

데이터 보안 고려 사항
: Agent가 데이터베이스에서 수집하는 데이터와 데이터 보안을 유지하는 방법에 대한 자세한 내용은 [민감한 정보][2]를 참조하세요.

## Postgres 설정 구성

설정을 적용하려면 [서버 파라미터][4]에서 다음 [파라미터][3]를 구성한 다음 **서버를 재시작**합니다.

{{< tabs >}}
{{% tab "단일 서버" %}}

| 파라미터 | 값 | 설명 |
| --- | --- | --- |
| `track_activity_query_size` | `4096` | 더 큰 쿼리를 수집하는 데 필요합니다. `pg_stat_activity`에서 SQL 텍스트의 크기를 늘립니다. 기본값으로 두면 `1024`자보다 긴 쿼리는 수집되지 않습니다. |
| `pg_stat_statements.track` | `ALL` | 선택 사항. 저장 프로시저 및 함수 내에서 명령문을 추적할 수 있습니다. |
| `pg_stat_statements.max` | `10000` | 선택 사항. `pg_stat_statements`에서 추적되는 정규화된 쿼리 수를 늘립니다. 이 설정은 다양한 클라이언트의 다양한 유형의 쿼리를 보는 대용량 데이터베이스에 권장됩니다. |
| `pg_stat_statements.track_utility` | `off` | 선택 사항. PREPARE 및 EXPLAIN과 같은 유틸리티 명령을 비활성화합니다. 이 값을 `off`로 설정하면 SELECT, UPDATE, DELETE와 같은 쿼리만 추적됩니다. |
| `track_io_timing` | `on` | 선택 사항. 쿼리에 대한 블록 읽기 및 쓰기 시간 수집을 활성화합니다. |

{{% /tab %}}
{{% tab "유연한 서버" %}}

| 파라미터            | 값 | 설명 |
|----------------------| -- | --- |
| `azure.extensions` | `pg_stat_statements` | `postgresql.queries.*` 메트릭에 필요합니다. [pg_stat_statements][1] 확장을 사용하여 쿼리 메트릭 수집을 활성화합니다. |
| `track_activity_query_size` | `4096` | 더 큰 쿼리를 수집하는 데 필요합니다. `pg_stat_activity`에서 SQL 텍스트의 크기를 늘립니다. 기본값으로 두면 `1024`자보다 긴 쿼리는 수집되지 않습니다. |
| `pg_stat_statements.track` | `ALL` | 선택 사항. 저장 프로시저 및 함수 내에서 명령문을 추적할 수 있습니다. |
| `pg_stat_statements.max` | `10000` | 선택 사항. `pg_stat_statements`에서 추적되는 정규화된 쿼리 수를 늘립니다. 이 설정은 다양한 클라이언트의 다양한 유형의 쿼리를 보는 대용량 데이터베이스에 권장됩니다. |
| `pg_stat_statements.track_utility` | `off` | 선택 사항. PREPARE 및 EXPLAIN과 같은 유틸리티 명령을 비활성화합니다. 이 값을 `off`로 설정하면 SELECT, UPDATE, DELETE와 같은 쿼리만 추적됩니다. |
| `track_io_timing` | `on` | 선택 사항. 쿼리에 대한 블록 읽기 및 쓰기 시간 수집을 활성화합니다. |

[1]: https://www.postgresql.org/docs/current/pgstatstatements.html
{{% /tab %}}
{{< /tabs >}}

## 에이전트에 접근 권한 부여

Datadog 에이전트가 통계와 쿼리를 수집하려면 데이터베이스에 읽기 전용 액세스가 필요합니다.

Postgres가 복제된 경우 클러스터의 **기본** 데이터베이스 서버(작성자)에서 다음 SQL 명령을 실행해야 합니다. Agent가 연결할 데이터베이스 서버에서 PostgreSQL 데이터베이스를 선택합니다. Agent는 연결된 데이터베이스에 관계없이 데이터베이스 서버의 모든 데이터베이스에서 원격 측정을 수집할 수 있으므로 기본 `postgres` 데이터베이스를 사용하는 것이 좋습니다. Agent가 [해당 데이터베이스 고유의 데이터에 대한 사용자 지정 쿼리][5]를 실행하는 경우에만 다른 데이터베이스를 선택하세요.

선택한 데이터베이스를 수퍼유저(또는 충분한 권한이 있는 다른 사용자)와 연결합니다. 예를 들어 선택한 데이터베이스가 `postgres`면 다음을 실행하여 [psql][6]을 사용하는 `postgres` 사용자로 연결합니다.

 ```bash
 psql -h mydb.example.com -d postgres -U postgres
 ```

`datadog` 사용자 생성:

```SQL
CREATE USER datadog WITH password '<PASSWORD>';
```

**참고:** Microsoft Entra ID 관리 ID 인증도 지원됩니다. Azure 인스턴스에 대해 이를 구성하는 방법은 [가이드][12]를 참조하세요.


{{< tabs >}}
{{% tab "Postgres ≥ 16" %}}

**모든 데이터베이스에** 다음 스키마를 생성합니다.

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_read_all_settings TO datadog;
GRANT pg_read_all_stats TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

{{% /tab %}}

{{% tab "Postgres 15" %}}

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
```

{{% /tab %}}
{{% tab "Postgres 9.6" %}}

**모든 데이터베이스에** 다음 스키마를 생성합니다.

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT SELECT ON pg_stat_database TO datadog;
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

### 확인

권한이 정확한지 확인하려면 다음 명령을 실행해 에이전트 사용자가 데이터베이스에 연결하고 코어 테이블을 읽을 수 있는지 확인합니다.
{{< tabs >}}
{{% tab "Postgres ≥ 10" %}}

```shell
psql -h mydb.example.com -U datadog postgres -A \
  -c "select * from pg_stat_database limit 1;" \
  && echo -e "\e[0;32mPostgres connection - OK\e[0m" \
  || echo -e "\e[0;31mCannot connect to Postgres\e[0m"
psql -h mydb.example.com -U datadog postgres -A \
  -c "select * from pg_stat_activity limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h mydb.example.com -U datadog postgres -A \
  -c "select * from pg_stat_statements limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```
{{% /tab %}}
{{% tab "Postgres 9.6" %}}

```shell
psql -h mydb.example.com -U datadog postgres -A \
  -c "select * from pg_stat_database limit 1;" \
  && echo -e "\e[0;32mPostgres connection - OK\e[0m" \
  || echo -e "\e[0;31mCannot connect to Postgres\e[0m"
psql -h mydb.example.com -U datadog postgres -A \
  -c "select * from pg_stat_activity limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h mydb.example.com -U datadog postgres -A \
  -c "select * from pg_stat_statements limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```

{{% /tab %}}
{{< /tabs >}}

암호 입력 메시지가 나타나면 `datadog` 사용자를 생성할 때 입력한 암호를 사용합니다.

## 에이전트 설치

Azure Postgres 데이터베이스를 모니터링하려면 인프라스트럭처에 Datadog 에이전트를 설치하고 각 인스턴스에 원격으로 연결하도록 설정합니다. 에이전트를 데이터베이스에서 실행할 필요가 없고 데이터베이스에 연결만 하면 됩니다. 여기에 나와있지 않은 다른 설치 방법을 보려면 [에이전트 설치 지침][7]을 참고하세요.

{{< tabs >}}
{{% tab "Host" %}}

호스트에서 실행하는 데이터베이스 모니터링 메트릭 수집을 설정하려면(예: 에이전트가 Azure 데이터베이스에서 수집할 수 있도록 소규모 가상 머신 인스턴스를 프로비저닝할 때) 다음을 따릅니다.

1. `postgres.d/conf.yaml` 파일을 편집해 `host`/`port`를 가리키도록 하고, 모니터링할 마스터를 설정합니다. 사용할 수 있는 모든 설정 옵션을 보려면 [postgres.d/conf.yaml 샘플][1]을 참고하세요.
   ```yaml
   init_config:
   instances:
     - dbm: true
       host: '<AZURE_INSTANCE_ENDPOINT>'
       port: 5432
       username: 'datadog@<AZURE_INSTANCE_ENDPOINT>'
       password: '<PASSWORD>'
       ssl: 'require'
       ## Required for Postgres 9.6: Uncomment these lines to use the functions created in the setup
       # pg_stat_statements_view: datadog.pg_stat_statements()
       # pg_stat_activity_view: datadog.pg_stat_activity()
       ## Optional: Connect to a different database if needed for `custom_queries`
       # dbname: '<DB_NAME>'

       # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
       azure:
        deployment_type: '<DEPLOYMENT_TYPE>'
        fully_qualified_domain_name: '<AZURE_INSTANCE_ENDPOINT>'
   ```
2. [에이전트를 다시 시작합니다][2].

`deployment_type`과 `name` 필드를 설정하는 방법에 관한 자세한 정보는 [Postgres 통합 스펙][3]을 참고하세요.

[1]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[2]: /ko/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[3]: https://github.com/DataDog/integrations-core/blob/master/postgres/assets/configuration/spec.yaml#L446-L474
{{% /tab %}}
{{% tab "도커" %}}

도커 컨테이너에서 실행하는 데이터베이스 모니터링 에이전트를 구성하려면 에이전트 컨테이너에서 [Autodiscovery Integration Templates][1]을 도커 레이블로 설정합니다.

**참고**: 에이전트에 도커 자동탐지 레이블을 읽을 수 있는 권한이 있어야 작동합니다. 

### 명령줄

명령줄에 다음 명령을 실행해 에이전트를 실행합니다. 내 계정과 환경에 맞게 값을 변경하세요.

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=7.36.1

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.check_names='["postgres"]' \
  -l com.datadoghq.ad.init_configs='[{}]' \
  -l com.datadoghq.ad.instances='[{
    "dbm": true,
    "host": "<AZURE_INSTANCE_ENDPOINT>",
    "port": 5432,
    "username": "datadog@<AZURE_INSTANCE_ENDPOINT>",
    "password": "<UNIQUEPASSWORD>",
    "ssl": "require",
    "azure": {
      "deployment_type": "<DEPLOYMENT_TYPE>",
      "name": "<AZURE_INSTANCE_ENDPOINT>"
    }
  }]' \
  gcr.io/datadoghq/agent:${DD_AGENT_VERSION}
```

Postgres 9.6의 경우 호스트와 포트가 지정된 인스턴스 구성에 다음 설정을 추가하세요.

```yaml
pg_stat_statements_view: datadog.pg_stat_statements()
pg_stat_activity_view: datadog.pg_stat_activity()
```

### Dockerfile

`Dockerfile`에서도 레이블을 지정할 수 있어 인프라스트럭처 설정을 변경할 필요 없이 커스텀 에이전트를 빌드하고 배포할 수 있습니다.

```Dockerfile
FROM datadog/agent:7.36.1

LABEL "com.datadoghq.ad.check_names"='["postgres"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<AZURE_INSTANCE_ENDPOINT>", "port": 3306,"username": "datadog@<AZURE_INSTANCE_ENDPOINT>","password": "<UNIQUEPASSWORD>", "ssl": "require", "azure": {"deployment_type": "<DEPLOYMENT_TYPE>", "name": "<AZURE_INSTANCE_ENDPOINT>"}}]'
```

Postgres 9.6의 경우 호스트와 포트가 지정된 인스턴스 구성에 다음 설정을 추가하세요.

```yaml
pg_stat_statements_view: datadog.pg_stat_statements()
pg_stat_activity_view: datadog.pg_stat_activity()
```

`deployment_type`과 `name` 필드를 설정하는 방법에 관한 자세한 정보는 [Postgres 통합 스펙][2]을 참고하세요.

`datadog` 사용자 암호가 일반 텍스트로 노출되는 것을 예방하려면 에이전트의 [비밀 관리 패키지][3]를 이용해 `ENC[]` 구문을 사용하여 암호를 선언하거나 [자동탐지 템플릿 변수 설명서][4]에서 환경 변수로 암호를 전달하는 방법을 살펴보세요.


[1]: /ko/agent/docker/integrations/?tab=docker
[2]: https://github.com/DataDog/integrations-core/blob/master/postgres/assets/configuration/spec.yaml#L446-L474
[3]: /ko/agent/configuration/secrets-management
[4]: /ko/agent/faq/template_variables/
{{% /tab %}}
{{% tab "Kubernetes" %}}

쿠버네티스 클러스터가 있는 경우 데이터베이스 모니터링에서  [Datadog 클러스터 에이전트][1]를 사용하세요.

쿠버네티스 클러스터에서 클러스터 점검을 아직 활성화하지 않은 경우 [클러스터 확인 활성화][2] 지침에 따라 활성화합니다. 클러스터 에이전트 컨테이너에 연결된 정적 파일을 이용하거나 서비스 주석을 이용해 Postgres 설정을 선언할 수 있습니다.

### Helm 명령줄

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
    host: <AZURE_INSTANCE_ENDPOINT>
    port: 5432
    username: "datadog@<AZURE_INSTANCE_ENDPOINT>"
    password: "<UNIQUEPASSWORD>"
    ssl: "require"
    azure:
      deployment_type: "<DEPLOYMENT_TYPE>"
      fully_qualified_domain_name: "<AZURE_INSTANCE_ENDPOINT>"' \
  datadog/datadog
```

Postgres 9.6의 경우 호스트와 포트가 지정된 인스턴스 구성에 다음 설정을 추가하세요.

```yaml
pg_stat_statements_view: datadog.pg_stat_statements()
pg_stat_activity_view: datadog.pg_stat_activity()
```

### 연결된 파일로 설정

연결된 설정 파일로 클러스터 점검을 설정하려면 다음 경로로 설정 파일을 클러스터 에이전트 컨테이너에 연결합니다. `/conf.d/postgres.yaml`:

```yaml
cluster_check: true  # 이 플래그를 반드시 포함하세요
init_config:
instances:
  - dbm: true
    host: '<AZURE_INSTANCE_ENDPOINT>'
    port: 5432
    username: 'datadog@<AZURE_INSTANCE_ENDPOINT>'
    password: '<PASSWORD>'
    ssl: "require"
    # 프로젝트와 인스턴스를 추가한 후 CPU, 메모리 등과 같은 추가 클라우드 데이터를 가져오도록 Datadog Azure 통합을 구성합니다.
    azure:
      deployment_type: '<DEPLOYMENT_TYPE>'
      fully_qualified_domain_name: '<AZURE_INSTANCE_ENDPOINT>'

    ## 필수: Postgres 9.6의 경우 설정에서 생성된 함수를 사용하려면 이 줄의 주석 처리를 제거하세요.
    # pg_stat_statements_view: datadog.pg_stat_statements()
    # pg_stat_activity_view: datadog.pg_stat_activity()
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
          "host": "<AZURE_INSTANCE_ENDPOINT>",
          "port": 5432,
          "username": "datadog@<AZURE_INSTANCE_ENDPOINT>",
          "password": "<UNIQUEPASSWORD>",
          "ssl": "require",
          "azure": {
            "deployment_type": "<DEPLOYMENT_TYPE>",
            "fully_qualified_domain_name": "<AZURE_INSTANCE_ENDPOINT>"
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

Postgres 9.6의 경우 호스트와 포트가 지정된 인스턴스 구성에 다음 설정을 추가하세요.

```yaml
pg_stat_statements_view: datadog.pg_stat_statements()
pg_stat_activity_view: datadog.pg_stat_activity()
```

`deployment_type`과 `name` 필드를 설정하는 방법에 관한 자세한 정보는 [Postgres 통합 스펙][4]을 참고하세요.

클러스터 에이전트가 자동으로 설정을 등록하고 Postgres 점검을 실행합니다.

`datadog` 사용자 암호가 일반 텍스트로 노출되는 것을 예방하려면 에이전트의 [비밀 관리 패키지][5]를 이용해`ENC[]` 구문을 사용하여 암호를 선언하세요.

[1]: /ko/agent/cluster_agent
[2]: /ko/agent/cluster_agent/clusterchecks/
[3]: https://helm.sh
[4]: https://github.com/DataDog/integrations-core/blob/master/postgres/assets/configuration/spec.yaml#L446-L474
[5]: /ko/agent/configuration/secrets-management
{{% /tab %}}
{{< /tabs >}}

### 검증

[에이전트 상태 하위 명령을 실행][8]하고 점검 섹션에서 `postgres`를 찾으세요. 또는 [데이터베이스][9] 페이지에서 시작할 수도 있습니다.
## 에이전트 설정 예시
{{% dbm-postgres-agent-config-examples %}}
## Azure PostgreSQL 통합 설치

Azure에서 좀 더 포괄적인 데이터베이스를 수집하려면 [Azure PostgreSQL 통합][10](선택 사항)을 설치하세요.

## 알려진 문제

Postgres 16 데이터베이스의 경우 다음 오류 메시지가 로그 파일에 기록됩니다.

```
psycopg2.errors.InsufficientPrivilege: permission denied for function pg_ls_waldir
2024-03-05 12:36:16 CET | CORE | ERROR | (pkg/collector/python/datadog_agent.go:129 in LogMessage) | - | (core.py:94) | Error querying wal_metrics: permission denied for function pg_ls_waldir
2024-03-05 12:36:30 CET | CORE | ERROR | (pkg/collector/python/datadog_agent.go:129 in LogMessage) | postgres:cc861f821fbbc2ae | (postgres.py:239) | Unhandled exception while using database connection postgres
Traceback (most recent call last):
  File "/opt/datadog-agent/embedded/lib/python3.11/site-packages/datadog_checks/postgres/postgres.py", line 224, in db
    yield self._db
  File "/opt/datadog-agent/embedded/lib/python3.11/site-packages/datadog_checks/postgres/postgres.py", line 207, in execute_query_raw
    cursor.execute(query)
psycopg2.errors.InsufficientPrivilege: permission denied for function pg_ls_waldir
```

결과적으로 Agent는 Postgres 16에 대해 다음 메트릭을 수집하지 않습니다: `postgresql.wal_count`, `postgresql.wal_size`, `postgresql.wal_age`.

## 트러블슈팅

설명에 따라 통합과 에이전트를 설치하고 설정했는데 제대로 작동하지 않는 경우 [트러블슈팅][11]을 참고하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/database_monitoring/agent_integration_overhead/?tab=postgres
[2]: /ko/database_monitoring/data_collected/#sensitive-information
[3]: https://www.postgresql.org/docs/current/config-setting.html
[4]: https://docs.microsoft.com/en-us/azure/postgresql/howto-configure-server-parameters-using-portal
[5]: /ko/integrations/faq/postgres-custom-metric-collection-explained/
[6]: https://www.postgresql.org/docs/current/app-psql.html
[7]: https://app.datadoghq.com/account/settings/agent/latest
[8]: /ko/agent/configuration/agent-commands/#agent-status-and-information
[9]: https://app.datadoghq.com/databases
[10]: /ko/integrations/azure_db_for_postgresql/
[11]: /ko/database_monitoring/setup_postgres/troubleshooting/
[12]: /ko/database_monitoring/guide/managed_authentication