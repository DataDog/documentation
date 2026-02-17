---
app_id: snowflake
app_uuid: 23e9084d-5801-4a71-88fe-f62b7c1bb289
assets:
  dashboards:
    Snowflake: assets/dashboards/snowflake.json
    Snowflake Organization Metrics: assets/dashboards/organization_metrics.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: snowflake.storage.storage_bytes.total
      metadata_path: metadata.csv
      prefix: snowflake.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10123
    source_type_name: Snowflake
  monitors:
    Snowflake failed logins: assets/monitors/snowflake_failed_logins.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- 데이터 스토어
- 비용 관리
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/snowflake/README.md
display_on_public_website: true
draft: false
git_integration_title: snowflake
integration_id: snowflake
integration_title: Snowflake
integration_version: 5.6.0
is_public: true
manifest_version: 2.0.0
name: snowflake
public_title: Snowflake
short_description: 크레딧 사용량, 저장 용량, 쿼리, 사용자 기록 등에 대한 주요 메트릭을 모니터링하세요.
supported_os:
- 리눅스
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - "\b카테고리::클라우드"
  - 카테고리::데이터 저장
  - Category::Cost Management
  configuration: README.md#Setup
  description: 크레딧 사용량, 저장 용량, 쿼리, 사용자 기록 등에 대한 주요 메트릭을 모니터링하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Snowflake
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 검사는 Datadog Agent를 통해 [Snowflake][1]를 모니터링합니다. Snowflake는 SaaS 분석 데이터 웨어하우스이며 완전히 클라우드 인프라스트럭처에서 실행됩니다.
이 통합은 크레딧 사용량, 청구, 저장용량, 쿼리 메트릭 등을 모니터링합니다.

<div class="alert alert-info"><bold>참고</bold>: 메트릭은 Snowflake에 대한 쿼리를 통해 수집됩니다. Datadog 통합으로 생성된 쿼리는 Snowflake에서 청구 가능합니다..</div>

## 설정

호스트에서 실행되는 Agent에 대해 이 검사를 설치하고 구성하려면 아래 지침을 따르세요.

### 설치

Snowflake 검사는 [Datadog Agent][2] 패키지에 포함되어 있습니다.

**참고**: Python 2를 사용하는 Datadog Agent v6에서는 Snowflake 검사를 사용할 수 없습니다. Agent v6에서 Snowflake를 사용하려면 [Datadog Agent v6에서 Python 3 사용][3]을 참조하거나 Agent v7로 업그레이드하세요.

### 구성
<div class="alert alert-danger">Snowflake에서는 `SYSADMIN`과 같은 대체 역할에 권한을 부여할 것을 권장합니다. 자세히 알아보려면 <a href="https://docs.snowflake.com/en/user-guide/security-access-control-considerations.html#control-the-assignment-of-the-accountadmin-role-to-users">ACCOUNTADMIN 역할</a> 제어를 참고하세요.</div>

1. Snowflake를 모니터링하려면 Datadog 특정 역할과 사용자를 생성하세요. Snowflake에서 다음을 실행하여 ACCOUNT_USAGE 스키마에 대한 액세스 권한이 있는 커스텀 역할을 생성합니다.

   참고: 기본적으로 이 통합은 `SNOWFLAKE` 데이터베이스와 `ACCOUNT_USAGE` 스키마를 모니터링합니다. `ORGANIZATION_USAGE` 스키마 모니터링 방법을 알아보려면 "Collecting Organization Data"를 참조하세요.
   이 데이터베이스는 기본적으로 사용 가능하며 `ACCOUNTADMIN` 역할 또는 [ACCOUNTADMIN이 부여한 모든 역할][4]의 사용자만 볼 수 있습니다.


    ```text
    use role ACCOUNTADMIN;
    grant imported privileges on database snowflake to role SYSADMIN;

    use role SYSADMIN;

    ```


    또는 `ACCOUNT_USAGE`에 대한 액세스 권한이 있는 `DATADOG` 커스텀 역할을 생성할 수 있습니다..


    ```text
    -- Snowflake 사용량을 모니터링하기 위한 새 역할을 만듭니다.
    create role DATADOG;

    -- SNOWFLAKE 데이터베이스에 대한 권한을 새 역할에 부여합니다.
    grant imported privileges on database SNOWFLAKE to role DATADOG;

    -- DATADOG 역할에 기본 웨어하우스 대한 사용 권한을 부여합니다.
   grant usage on warehouse <WAREHOUSE> to role DATADOG;

    -- 사용자를 생성합니다. 기존 사용자를 사용하는 경우 이 단계를 건너뜁니다.
    create user DATADOG_USER
    LOGIN_NAME = DATADOG_USER
    password = '<PASSWORD>'
    default_warehouse = <WAREHOUSE>
    default_role = DATADOG
    default_namespace = SNOWFLAKE.ACCOUNT_USAGE;

    -- 사용자에게 모니터 역할을 부여합니다.
    grant role DATADOG to user <USER>;
    ```


2. Snowflake 성능 데이터 수집을 시작하려면 Agent 구성 디렉터리 루트에 있는 `conf.d/` 폴더에서 `snowflake.d/conf.yaml` 파일을 편집하세요. 사용 가능한 모든 구성 옵션은 [샘플 snowflake.d/conf.yaml][5]을 참조하세요.

    ```yaml
        ## @param account - string - required
        ## Name of your account (provided by Snowflake), including the platform and region if applicable.
        ## For more information on Snowflake account names,
        ## see https://docs.snowflake.com/en/user-guide/connecting.html#your-snowflake-account-name
        #
      - account: <ORG_NAME>-<ACCOUNT_NAME>

        ## @param username - string - required
        ## Login name for the user.
        #
        username: <USER>

        ## @param password - string - required
        ## Password for the user
        #
        password: <PASSWORD>

        ## @param role - string - required
        ## Name of the role to use.
        ##
        ## By default, the SNOWFLAKE database is only accessible by the ACCOUNTADMIN role. Snowflake recommends
        ## configuring a role specific for monitoring:
        ## https://docs.snowflake.com/en/sql-reference/account-usage.html#enabling-account-usage-for-other-roles
        #
        role: <ROLE>

        ## @param min_collection_interval - number - optional - default: 15
        ## This changes the collection interval of the check. For more information, see:
        ## https://docs.datadoghq.com/developers/write_agent_check/#collection-interval
        ##
        ## NOTE: Most Snowflake ACCOUNT_USAGE views are populated on an hourly basis,
        ## so to minimize unnecessary queries, set the `min_collection_interval` to 1 hour.
        #
        min_collection_interval: 3600

        # @param disable_generic_tags - boolean - optional - default: false
        # Generic tags such as `cluster` will be replaced by <integration_name>_cluster to avoid
        # getting mixed with other integration tags.
        # disable_generic_tags: true
    ```

    <div class="alert alert-info">In the default `conf.yaml`, the <code>min_collection_interval</code> is 1 hour.
    Snowflake metrics are aggregated by day, you can increase the interval to reduce the number of queries.<br>
    <bold>Note</bold>: Snowflake ACCOUNT_USAGE views have a <a href="https://docs.snowflake.com/en/sql-reference/account-usage.html#data-latency">known latency</a> of 45 minutes to 3 hours.</div>

3. [에이전트를 재시작합니다][6].

#### 조직 데이터 수집

기본적으로 이 통합은 `ACCOUNT_USAGE` 스키마를 모니터링하지만 대신 조직 수준 메트릭을 모니터링하도록 설정할 수 있습니다.

조직 메트릭을 수집하려면 통합 구성에서 스키마 필드를 `ORGANIZATION_USAGE`로 변경하고 `min_collection_interval`을 43200으로 늘립니다. 대부분의 조직 쿼리에는 최대 24시간의 지연 시간이 있으므로 이렇게 하면 Snowflake에 대한 쿼리 수가 줄어듭니다.

참고: 조직 메트릭을 모니터링하려면 `user`에게 `ORGADMIN` 역할이 있어야 합니다.

  ```yaml
      - schema: ORGANIZATION_USAGE
        min_collection_interval: 43200
  ```

기본적으로 일부 조직 메트릭만 활성화됩니다. 사용 가능한 모든 조직 메트릭을 수집하려면 `metric_groups` 구성 옵션을 활용하세요.

  ```yaml
      metric_groups:
        - snowflake.organization.warehouse
        - snowflake.organization.currency
        - snowflake.organization.credit
        - snowflake.organization.storage
        - snowflake.organization.contracts
        - snowflake.organization.balance
        - snowflake.organization.rate
        - snowflake.organization.data_transfer
  ```

또한 계정과 조직 메트릭을 동시에 모니터링할 수 있습니다.

  ```yaml
      instances:
      - account: example-inc
        username: DATADOG_ORG_ADMIN
        password: '<PASSWORD>'
        role: SYSADMIN
        schema: ORGANIZATION_USAGE
        database: SNOWFLAKE
        min_collection_interval: 43200

      - account: example-inc
        username: DATADOG_ACCOUNT_ADMIN
        password: '<PASSWORD>'
        role: DATADOG_ADMIN
        schema: ACCOUNT_USAGE
        database: SNOWFLAKE
        min_collection_interval: 3600
  ```

#### 여러 환경에 대한 데이터 수집

여러 Snowflake 환경에 대한 데이터를 수집하려면 각 환경을 `snowflake.d/conf.yaml` 파일에 인스턴스로 추가하세요. 예를 들어 이름이 `DATADOG_SYSADMIN` 및 이`DATADOG_USER`인 두 명의 사용자에 대한 데이터를 수집해야 하는 경우:

```yaml
instances:
  - account: example-inc
    username: DATADOG_SYSADMIN
    password: '<PASSWORD>'
    role: SYSADMIN
    database: EXAMPLE-INC

  - account: example-inc
    username: DATADOG_USER
    password: '<PASSWORD>'
    role: DATADOG_USER
    database: EXAMPLE-INC
```

#### 프록시 설정

Snowflake에서는 [프록시 구성을 위한 환경 변수][7] 설정을 권장합니다.

[snowflake.d/conf.yaml][5]의 `init_config`에서 `proxy_host`, `proxy_port`, `proxy_user`, `proxy_password`를 설정할 수 있습니다.

**참고**: Snowflake는 자동으로 프록시 구성 형식을 지정하고 [표준 프록시 환경 변수][8]를 설정합니다.
이러한 변수는 Docker, ECS, Kubernetes와 같은 오케스트레이터를 포함한 통합의 모든 요청에도 영향을 미칩니다.

#### Snowflake 구성에 대한 프라이빗 연결

Snowflake에서 [프라이빗 연결][9](예: [AWS PrivateLink][10])이 활성화된 경우 `account` 구성 옵션을 다음과 같이 업데이트하여 Snowflake 통합을 구성할 수 있습니다.

  ```yaml
        - account: <ACCOUNT>.<REGION_ID>.privatelink
  ```

### Snowflake 커스텀 쿼리

Snowflake 통합은 커스텀 쿼리를 지원합니다. 기본적으로 통합은 공유 `SNOWFLAKE` 데이터베이스 및 `ACCOUNT_USAGE` 스키마에 연결됩니다.

다른 스키마나 데이터베이스에서 커스텀 쿼리를 실행하려면 [sample snowflake.d/conf.yaml][5]에 다른 인스턴스를 추가하고 `database` 및 `schema` 옵션을 지정합니다.
사용자 및 역할이 지정된 데이터베이스 또는 스키마에 대한 액세스 권한이 있는지 확인하세요.

#### 설정 옵션
`custom_queries` 옵션에는 다음과 같은 옵션이 있습니다.

| 옵션        | 필수 | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|---------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 쿼리         | 네      | 실행할 SQL입니다. 간단한 구문이나 여러 줄의 스크립트일 수 있습니다. 결과의 모든 열이 평가됩니다. 여러 줄 스크립트일 경우 파이프를 사용합니다.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 컬럼       | 네      | 각 컬럼을 나타내는 목록이 왼쪽에서 오른쪽으로 순차 정렬되어 있습니다.<br><br>다음과 같은 필수 데이터 두 가지가 있습니다:<br> -`name`**: metric_prefix에 추가하여 전체 메트릭 이름을 구성하는 접두사입니다. `type`을 `tag`으로 지정하면 해당 컬럼은 이 쿼리에서 수집한 모든 메트릭에 태그로 적용됩니다.<br> -`type`**: 제출 방법입니다(`gauge`, `count`, `rate` 등). `tag`로 설정하여 행의 각 메트릭에 이 컬럼에 있는 항목의 이름과 값(`<name>:<row_value>`)을 태그로 지정할 수도 있습니다. |
| tags          | 아니요       | 각 메트릭에 적용할 정적 태그 목록입니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |


##### 참고
- 정의된 `columns`의 항목 중 최소 하나 이상은 메트릭 유형(`gauge`, `count`, `rate` 등)이어야 합니다.
- 열의 항목 수는 쿼리에 반환된 열 수와 동일해야 합니다.
- 정의된 `columns` 항목의 순서는 쿼리에서 반환된 순서와 동일해야 합니다.

```yaml
custom_queries:
  - query: select F3, F2, F1 from Table;
    columns:
      - name: f3_metric_alias
        type: gauge
      - name: f2_tagkey
        type: tag
      - name: f1_metric_alias
        type: count
    tags:
      - test:snowflake
```

#### 예시
다음 예는 데이터베이스, 스키마 및 웨어하우스 이름으로 태그가 지정된 [`QUERY_HISTORY` 뷰][11]의 모든 쿼리를 계산하는 쿼리입니다.

```TEXT
select count(*), DATABASE_NAME, SCHEMA_NAME, WAREHOUSE_NAME from QUERY_HISTORY group by 2, 3, 4;
```

##### 구성

`instances`에서 커스텀 쿼리 구성은 다음과 같습니다.

```yaml
custom_queries:
  - query: select count(*), DATABASE_NAME, SCHEMA_NAME, WAREHOUSE_NAME from QUERY_HISTORY group by 2, 3, 4;
    columns:
      - name: query.total
        type: gauge
      - name: database_name
        type: tag
      - name: schema_name
        type: tag
      - name: warehouse_name
        type: tag
    tags:
      - test:snowflake
```

##### 검증

결과를 확인하려면 [Metrics Summary][12]를 사용하여 메트릭을 검색합니다.

![Snowflake Metric Summary][13]


### 검증

[Agent의 상태 하위 명령을 실행][14]하고 Checks 섹션에서 `snowflake`를 찾으세요.

## 수집한 데이터

<div class="alert alert-info"><bold>참고</bold>: 다음 메트릭 그룹의 메트릭만 기본적으로 활성화됩니다. <code>snowflake.query.*</code>, <code>snowflake.billing.*</code>, <code>snowflake.storage.*</code>, <code>snowflake.logins.*</code>.

다른 메트릭 그룹에서 메트릭을 수집하려면 <a href="https://github.com/DataDog/integrations-core/blob/master/snowflake/datadog_checks/snowflake/data/conf.yaml.example">이 통합에 대한 예제 구성 파일</a>을 참조하세요.
</div>

### 메트릭
{{< get-metrics-from-git "snowflake-web" >}}


### 이벤트

Snowflake는 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "snowflake-web" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][17]에 문의해 주세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog을 사용한 Snowflake 모니터링][18]


[1]: https://www.snowflake.com/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-v6-python-3/?tab=hostagent
[4]: https://docs.snowflake.com/en/sql-reference/account-usage.html#enabling-account-usage-for-other-roles
[5]: https://github.com/DataDog/integrations-core/blob/master/snowflake/datadog_checks/snowflake/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.snowflake.com/en/user-guide/python-connector-example.html#using-a-proxy-server
[8]: https://github.com/snowflakedb/snowflake-connector-python/blob/d6df58f1c338b255393571a08a1f9f3a71d8f7b6/src/snowflake/connector/proxy.py#L40-L41
[9]: https://docs.snowflake.com/en/user-guide/private-snowflake-service.html
[10]: https://docs.snowflake.com/en/user-guide/admin-security-privatelink.html
[11]: https://docs.snowflake.com/en/sql-reference/account-usage/query_history.html
[12]: https://docs.datadoghq.com/ko/metrics/summary/
[13]: https://raw.githubusercontent.com/DataDog/integrations-core/master/snowflake/images/custom_query.png
[14]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[15]: https://github.com/DataDog/integrations-core/blob/master/snowflake/metadata.csv
[16]: https://github.com/DataDog/integrations-core/blob/master/snowflake/assets/service_checks.json
[17]: https://docs.datadoghq.com/ko/help/
[18]: https://www.datadoghq.com/blog/snowflake-monitoring-datadog/
