---
app_id: snowflake-web
app_uuid: 49ad5ddd-6cc2-4aa0-bd81-3a5c7186657f
assets:
  dashboards:
    Snowflake-Event-Tables-Overview: assets/dashboards/Snowflake-Event-Tables-Overview_dashboard.json
    Snowflake-Overview: assets/dashboards/Snowflake-Overview_dashboard.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - snowflake.organization.balance.free_usage
      - snowflake.logins.fail.count
      metadata_path: metadata.csv
      prefix: snowflake.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10436
    source_type_name: Snowflake Web
  monitors:
    A High Volume of Snowflake Queries are Failing: assets/monitors/high_volume_queries_failing.json
    Failed Login Attempts are Increasing: assets/monitors/increased_failed_login_attempts.json
    High volume of Error or Fatal Snowflake Event Table Logs: assets/monitors/high_volume_event_table_logs_errors.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- ai/ml
- 비용 관리
- 데이터 저장
- 메트릭
- log collection
- security
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: snowflake_web
integration_id: snowflake-web
integration_title: Snowflake
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: snowflake_web
public_title: Snowflake
short_description: 장기 실행 쿼리, 실패한 쿼리를 확인하고 비용을 절감하세요. 보안 위협을 발견하고 Snowpark 워크로드를 모니터링하세요.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AI/ML
  - Category::Cost Management
  - 카테고리::데이터 저장
  - Category::Metrics
  - 카테고리::로그 수집
  - Category::Security
  - Submitted Data Type::Metrics
  - 제출한 데이터 유형::로그
  - 제공::통합
  configuration: README.md#Setup
  description: 장기 실행 쿼리, 실패한 쿼리를 확인하고 비용을 절감하세요. 보안 위협을 발견하고 Snowpark 워크로드를 모니터링하세요.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/snowflake-monitoring-datadog/
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/snowflake-snowpark-monitoring-datadog/
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/data-observability-monitoring/
  support: README.md#Support
  title: Snowflake
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

<div class="alert alert-info">새로운 Snowflake 통합은 Datadog 에이전트 기반 Snowflake 통합을 대체하며 추가 기능을 제공합니다. 새 Snowflake 통합을 설정한 후 에이전트 기반 Snowflake를 제거하여 Snowflake에 대한 API 호출량을 줄이는 것이 좋습니다.</div>

Snowflake 인프라스트럭처 및 데이터 검색을 효과적으로 모니터링하고 최적화하기는 어려울 수 있습니다. 문제가 발생하여 비효율적 리소스 활용, 더 높아진 비용, 고객 경험 저하 등으로 이어질 수 있습니다.

Datadog 의 Snowflake 통합을 사용하면 장기 실행 쿼리를 발견하여 성능을 개선하고 비용을 절감하며, 실시간 보안 위협을 식별하고, Snowpark 워크로드를 모니터링할 수 있습니다.

Snowflake 데이터를 구문 분석한 후 Datadog는 [즉기 사용 가능한 개요 대시보드][1]를 수집한 전체 리소스에 대한 인사이트로 채웁니다. 이러한 대시보드는 또한 추천 모니터를 제공하여 Snowpark 실행 실패나 로그인 시도 횟수 이상과 같은 이벤트에 대한 알림을 받을 수 있도록 해줍니다.

<div class="alert alert-info"><strong>참고</strong>: 메트릭은 쿼리로 수집되며, 쿼리는 Datadog 통합에서 생성되고 Snowflake에서 청구됩니다.</div>

## 설정

### 설치

설치 단계가 필요하지 않습니다.

### 설정

#### Snowflake 계정과 연결

1. [Snowflake 계정 URL][2]을 찾습니다.

![Snowflake UI에서 계정 URL 복사 옵션이 선택된 계정 메뉴][3]

2. [Snowflake 통합 타일][4]에서  **Account URL** 필드에 Snowflake 계정 URL을 입력합니다.

3. **리소스 컬렉션** 탭 에서 수집하려는 리소스를 활성화합니다.

##### 계정 및 조직 사용량 메트릭

하단 표는 수집되는 메트릭 유형과 관련 메트릭 접두어에 대해 설명합니다.

| **유형** | **설명** | **수집된 메트릭 접두어**  |
|------|-------------|-----------------------------|
| **계정 사용량**      | 계정 수준에서 사용량, 크레딧 사용량, 쿼리 메트릭을 보관합니다.<br>_매 시간 수집됩니다_.              | `snowflake.auto_recluster`<br>`snowflake.billing`<br>`snowflake.data_transfer`<br>`snowflake.logins`<br>`snowflake.pipe`<br>`snowflake.query`<br>`snowflake.replication`<br>`snowflake.storage`<br>`snowflake.storage.database`<br>`snowflake.storage.table` |
| **조직 사용량** | 조직 수준에서 크레딧 사용량, 데이터 전송 기록 및 예산 메트릭을 보관합니다.<br>_매 시간 수집됩니다_. | `snowflake.organization` |

##### 로그

아래 표에서는 수집된 로그 유형과 포함된 Snowflake 테이블에 대해 설명합니다.

<table>
  <tr>
    <td style="width:10%;"><strong>유형</strong></td>
    <td><strong>설명</strong></td>
    <td><strong>필수 테이블</strong></td>
  </tr>
  <tr>
    <td style="width:10%;">쿼리 기록</td>
    <td>쿼리 실행 기록입니다. 쿼리 기록 로그와 액세스 기록 로그를 함께 사용하면 쿼리와 쿼리 내역을 통해 데이터가 사용되는 방식에 대한 인사이트를 얻을 수 있습니다.</td>
    <td><a href="https://docs.snowflake.com/en/sql-reference/account-usage/query_history">SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY</a></td>
  </tr>
  <tr>
    <td style="width:10%;">보안</td>
    <td><a href="https://app.datadoghq.com/security/siem/home">Cloud SIEM</a>과 함께 이러한 로그를 활용하여 사용자 환경에서 보안 위협을 보다 효율적으로 탐지하고 이에 대응할 수 있습니다.</td>
    <td> <a href="https://docs.snowflake.com/en/sql-reference/account-usage/login_history">SNOWFLAKE.ACCOUNT_USAGE.LOGIN_HISTORY</a> <br> <a href="https://docs.snowflake.com/en/sql-reference/account-usage/sessions">SNOWFLAKE.ACCOUNT_USAGE.SESSIONS</a> <br> <a href="https://docs.snowflake.com/en/sql-reference/account-usage/grants_to_users">SNOWFLAKE.ACCOUNT_USAGE.GRANTS_TO_USERS</a> <br> <a href="https://docs.snowflake.com/en/sql-reference/account-usage/data_transfer_history">SNOWFLAKE.ACCOUNT_USAGE.DATA_TRANSFER_HISTORY</a> <br> <a href="https://docs.snowflake.com/en/sql-reference/account-usage/stages">SNOWFLAKE.ACCOUNT_USAGE.STAGES</a></td>
  </tr>
  <tr>
    <td style="width:10%;">이벤트 테이블</td>
    <td>함수 및 기타 절차에서 수집된 메시지와 이벤트 데이터를 보여줍니다. 허가(GRANT) 권한이 추가로 필요합니다.</td>
    <td>커스텀 <a href="https://docs.snowflake.com/en/developer-guide/logging-tracing/event-table-columns">이벤트 테이블</a></td>
  </tr>
</table>

##### 클라우드 비용 관리

[SNOWFLAKE.ORGANIZATION_USAGE.USAGE_IN_CURRENCY_DAILY][5] 테이블에서 집계된 Snowflake 비용 메트릭을 수신하려면 클라우드 비용 관리를 활성화하세요. [클라우드 비용 관리][6]와 함께 이러한 메트릭을 사용하여 비용 및 사용량에 대한 인사이트를 얻을 수 있습니다.

4. Datadog에 대한 역할 및 사용자를 생성하여 Snowflake를 모니터링하는 데 사용합니다. Snowflake 환경에서 아래 일련의 명령을 실행하여 Datadog에 액세스할 수 있는 사용자를 생성할 수 있습니다.

<div class="alert alert-info">

**권장 창고 설정**
- 자동 일시 중단 시간이 30초인 XS 웨어하우스를 생성합니다.
- 선택적으로, 일반적으로 하루 종일 활성화되어 있는 기존 XS 웨어하우스를 사용하는 것이 가장 비용 효율적인 옵션일 수 있습니다. **참고**: 통합 에서 만든 쿼리 은 기존 웨어하우스의 성능에 영향을 미칠 수 있습니다. 쿼리 성능이 중요한 웨어하우스에서 통합 을 실행하는 것은 권장 이 아닙니다.
</div>

{{< code-block lang="bash" filename="" disable_copy="false" collapsible="true" >}}

 -- Snowflake 사용량 모니터링을 위한 새로운 역할을 생성하세요. 역할의 이름은 커스터마이즈할 수 있습니다.
create role DATADOG;

-- SNOWFLAKE 데이터베이스에서 새로운 역할에 대한 권한을 허가합니다.
grant imported privileges on database SNOWFLAKE to role DATADOG;

-- DATADOG 역할에 기본 웨어하우스 사용량에 대한 권한을 허가합니다..
grant usage on warehouse <WAREHOUSE> to role DATADOG;

-- 새 역할에 다음 ACCOUNT_USAGE 보기에 대한 권한을 부여합니다. Snowflake 계정 사용량 로그 및 메트릭을 수집하려면 수행합니다.
grant database role SNOWFLAKE.OBJECT_VIEWER to role DATADOG;
grant database role SNOWFLAKE.USAGE_VIEWER to role DATADOG;
grant database role SNOWFLAKE.GOVERNANCE_VIEWER to role DATADOG;
grant database role SNOWFLAKE.SECURITY_VIEWER to role DATADOG;

-- 새 역할에 ORGANIZATION_USAGE_VIEWER 권한을 부여합니다. Snowflake 조직 사용량 메트릭을 수집하려면 수행합니다.
grant database role SNOWFLAKE.ORGANIZATION_USAGE_VIEWER to role DATADOG;

-- 새 역할에 ORGANIZATION_BILLING_VIEWER 권한을 부여합니다. Snowflake 비용 데이터를 수집하려면 이를 수행합니다.
grant database role SNOWFLAKE.ORGANIZATION_BILLING_VIEWER to role DATADOG;

-- 이벤트 테이블의 데이터베이스, 스키마와 테이블에 대한 사용량 권한을 부여합니다.
grant usage on database <EVENT_TABLE_DATABASE> to role DATADOG;
grant usage on schema <EVENT_TABLE_DATABASE>.<EVENT_TABLE_SCHEMA> to role DATADOG;
grant select on table <EVENT_TABLE_DATABASE>.<EVENT_TABLE_SCHEMA>.<EVENT_TABLE_NAME> to role DATADOG;
grant application role SNOWFLAKE.EVENTS_VIEWER to role DATADOG;
grant application role SNOWFLAKE.EVENTS_ADMIN to role DATADOG;

-- 사용자를 생성합니다.
create user <USERNAME>
LOGIN_NAME = <USERNAME>
password = '<PASSWORD>'
default_warehouse =<WAREHOUSE>
default_role = DATADOG;

-- 사용자에게 모니터 역할을 부여합니다.
grant role DATADOG to user <USERNAME>
{{< /code-block >}}

5. 키-쌍 인증을 설정합니다. 공개 키는 이전에 생성한 사용자에게 할당되며 비공개 키는 Datadog에 업로드되어 Datadog가 Snowflake 계정에 연결할 수 있도록 해줍니다.
    a. [Snowflake 지침][7]에 따라 개인 키를 생성하고 업로드합니다. Datadog은 현재 암호화되지 않은 개인 키만 지원합니다.
    b. [Snowflake 지침][8]에 따라 공개 키를 생성합니다.
    c. [Snowflake 지침][9]에 따라 이전에 생성된 사용자에게 공개 키를 할당합니다.

<div class="alert alert-info">
Datadog이 Snowflake 계정에서 데이터를 수집하려면 특정 IP 주소 접두사를 허용 목록에 추가해야 합니다. Datadog에 속한 IP 접두사 목록은 {{< region-param key="ip_ranges_url" link="true" text="IP ranges page">}}에서 확인할 수 있으며, 허용할 범위는 <strong>webhooks</strong>에서 확인할 수 있습니다..
</div>

#### 커스텀 메트릭

Snowflake 통합은 커스텀 쿼리 를 지원하며 커스텀 메트릭를 수집합니다. 사용자는 커스텀 SQL 쿼리를 작성하여 특정 데이터를 추출하고 Datadog에서 메트릭 및 메트릭 태그로 확인할 수 있습니다.

기본적으로 통합은 공유 `SNOWFLAKE` 데이터베이스 및 `ACCOUNT_USAGE` 스키마에 연결됩니다. `ACCOUNT_USAGE` 스키마 외부의 테이블을 쿼리하는 경우에는 설정된 역할에 해당 테이블에 액세스할 수 있는 적절한 권한이 있는지 확인하세요.

아래 표는 커스텀 메트릭을 정의하는 데 사용되는 필드를 설명합니다.

| 필드 | 설명 | 필수 |
| -------------  | ----------- | --- |
| 커스텀 메트릭 식별자 | 커스텀 메트릭의 식별자로, 각 계정의 각기 다른 커스텀 메트릭을 각각의 커스텀 쿼리 에 연결하는 데 사용됩니다.   | Yes |
| 쿼리 | 실행할 SQL입니다. 간단한 문이나 여러 줄의 스크립트일 수 있습니다. 결과의 모든 행이 평가됩니다.  | Yes |
| 메타데이터 열 | 각 열을 왼쪽에서 오른쪽으로 순차적으로 정렬한 목록입니다. 각 열에는 두 개의 필수 필드가 있습니다:<br> - 커스텀 열 이름**:<br> `metric_prefix`에 추가하여 전체 메트릭 이름을 형성하는 접미사입니다. 예를 들어 `my_custom_metric.count`는 전체 메트릭 이름 `snowflake.my_custom_metric.count`이 됩니다. 유형이 `Tag Key`로 지정된 경우, 열은 이 쿼리에서 수집한 모든 메트릭에 태그로 적용됩니다.<br> - **메타데이터 유형**:<br>제출 방법(예: 게이지, 카운트 또는 비율)입니다. 이 열에 있는 항목의 이름과 값(`<NAME>:<ROW_VALUE>`)을 사용해 행에 있는 각 매트릭을 태그로 설정할 수도 있습니다. | Yes |


**참고**:
   - 정의된 열의 항목 중 하나 이상은 메트릭 유형(게이지, 카운트, 요금, 분포)이어야 합니다.
   - 열의 항목 수는 쿼리에 반환된 열 수와 동일해야 합니다.
   - 열의 항목이 정의되는 순서는 쿼리에서 반환된 순서와 동일해야 합니다.

**예**:

![Snowflake 통합 타일의 커스텀 메트릭 탭][10]

#### 검증

결과를 확인하려면 메트릭 요약에서 메트릭을 사용하여 검색하세요.

![Metric Summary 페이지의 Snowflake 메트릭][11]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "snowflake-web" >}}


### 이벤트

Snowflake 웹 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Snowflake 웹 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][14]에 문의하세요.

## 에이전트 점검: Snowflake

<div class="alert alert-warning">Snowflake 에이전트 점검은 더 이상 지원되지 않으며, 추가 기능을 사용하고 Snowflake로의 API 통화량을 줄이려면 새로운 Snowflake 통합으로 전환하는 것이 좋습니다.</div>

## 에이전트: 개요

이 점검은 Datadog Agent를 통해 [Snowflake][15]를 모니터링합니다. Snowflake는 SaaS 분석 데이터 웨어하우스이며 클라우드 인프라스트럭처에서 완전히 실행됩니다.
이 통합은 크레딧 사용량, 빌링, 저장 공간, 쿼리 메트릭 등을 모니터링합니다.

<div class="alert alert-info"><bold>참고</bold>: 메트릭은 Snowflake에 대한 쿼리를 통해 수집됩니다. Datadog 통합으로 생성된 쿼리는 Snowflake에서 청구 가능합니다..</div>

## 에이전트: 설정

호스트에서 실행되는 Agent에 대해 이 검사를 설치하고 구성하려면 아래 지침을 따르세요.

### 에이전트: 설치

Snowflake 점검은 [Datadog Agent][16] 패키지에 포함되어 있습니다.

**참고**: Python 2를 사용하는 Datadog Agent v6에서는 Snowflake 점검을 사용할 수 없습니다. Agent v6에서 Snowflake를 사용하려면 [Datadog Agent v6에서 Python 3 사용][17]을 참조하거나 Agent v7로 업그레이드하세요.

### 에이전트: 설정

<div class="alert alert-danger">Snowflake에서는 `SYSADMIN`과 같은 대체 역할에 권한을 부여할 것을 권장합니다. 자세한 내용은 <a href="https://docs.snowflake.com/en/user-guide/security-access-control-considerations.html#control-the-assignment-of-the-accountadmin-role-to-users">ACCOUNTADMIN 역할</a> 제어를 참고하세요.

1. Snowflake를 모니터링하려면 Datadog 특정 역할과 사용자를 생성하세요. Snowflake에서 다음을 실행하여 ACCOUNT_USAGE 스키마에 대한 액세스 권한이 있는 커스텀 역할을 생성합니다.

   참고: 기본적으로 이 통합은 `SNOWFLAKE` 데이터베이스와 `ACCOUNT_USAGE` 스키마를 모니터링합니다. `ORGANIZATION_USAGE` 스키마를 모니터링하는 방법에 대한 자세한 내용은 "Collecting Organization Data"를 참조하세요.
   이 데이터베이스는 기본적으로 사용 가능하며 `ACCOUNTADMIN` 역할 또는 [ACCOUNTADMIN이 부여한 모든 역할][18]의 사용자만 볼 수 있습니다.


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


2. Snowflake 성능 데이터 수집을 시작하려면  Agent 구성 디렉터리 루트에 있는 `conf.d/` 폴더에서 `snowflake.d/conf.yaml` 파일을 편집하세요. 사용 가능한 모든 구성 옵션은 [샘플 snowflake.d/conf.yaml][19]을 참조하세요.

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
        # Generic tags such as `cluster` will be replaced by <INTEGRATION_NAME>_cluster to avoid
        # getting mixed with other integration tags.
        # disable_generic_tags: true
    ```

    <div class="alert alert-info">In the default `conf.yaml`, the <code>min_collection_interval</code> is 1 hour.
    Snowflake metrics are aggregated by day, you can increase the interval to reduce the number of queries.<br>
    <bold>Note</bold>: Snowflake ACCOUNT_USAGE views have a <a href="https://docs.snowflake.com/en/sql-reference/account-usage.html#data-latency">known latency</a> of 45 minutes to 3 hours.</div>

3. [에이전트를 다시 시작합니다][20].

#### 조직 데이터 수집

기본적으로 이 통합은 `ACCOUNT_USAGE` 스키마를 모니터링하지만 대신 조직 수준 메트릭을 모니터링하도록 설정할 수 있습니다.

조직 메트릭을 수집하려면 통합 구성에서 스키마 필드를 `ORGANIZATION_USAGE`로 변경하고 `min_collection_interval`을 43200으로 늘립니다. 대부분의 조직 쿼리에는 최대 24시간의 지연 시간이 있으므로 이렇게 하면 Snowflake에 대한 쿼리 수가 줄어듭니다.

**참고**: 조직 메트릭을 모니터링하려면, `user`에 `ORGADMIN` 역할이 부여되어 있어야 합니다.

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

Snowflake에서는 [프록시 구성을 위한 환경 변수][21] 설정을 권장합니다.

또한 [snowflake.d/conf.yaml][19]의 `init_config`에서 `proxy_host`, `proxy_port`, `proxy_user`,`proxy_password`를 설정할 수 있습니다.

**참고**: Snowflake는 자동으로 프록시 구성 형식을 지정하고 [표준 프록시 환경 변수][22]를 설정합니다.
이러한 변수는 Docker, ECS, Kubernetes와 같은 오케스트레이터를 포함한 통합의 모든 요청에도 영향을 미칩니다.

#### Snowflake 구성에 대한 프라이빗 연결

Snowflake에서 [프라이빗 연결][23](예: [AWS PrivateLink][24])이 활성화된 경우 `account` 구성 옵션을 다음 형식으로 업데이트하여 Snowflake 통합을 구성할 수 있습니다.

  ```yaml
        - account: <ACCOUNT>.<REGION_ID>.privatelink
  ```

### Snowflake 커스텀 쿼리

Snowflake 통합은 커스텀 쿼리를 지원합니다. 기본적으로 통합은 공유 `SNOWFLAKE` 데이터베이스 및 `ACCOUNT_USAGE` 스키마에 연결됩니다.

다른 스키마 또는 데이터베이스에서 커스텀 쿼리를 실행하려면 [샘플 snowflake.d/conf.yaml][19]에 다른 인스턴스를 추가하고 `database` 및 `schema` 옵션을 지정합니다.
사용자 및 역할이 지정된 데이터베이스 또는 스키마에 대한 액세스 권한이 있는지 확인하세요.

#### 설정 옵션
`custom_queries` 옵션에는 다음과 같은 옵션이 있습니다.

| 옵션        | 필수 | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|---------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 쿼리         | Yes      | 실행할 SQL입니다. 간단한 문이나 여러 줄의 스크립트일 수 있습니다. 결과의 모든 행이 평가됩니다. 여러 줄 스크립트가 필요한 경우 파이프를 사용합니다.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 컬럼       | Yes      | 목록 왼쪽에서 오른쪽으로 순차적으로 정렬된 각 열을 나타냅니다.<br><br>필수 데이터는 두 가지입니다.<br> -`name`**: 전체 메트릭 이름을 형성하기 위해 `metric_prefix` 에 추가하는 접미어입니다. `type`을 `tag`로 지정하면 이 열은 대신 이 쿼리에서 수집한 모든 메트릭을 태그로 적용합니다.<br> - **`type`**: 제출 메서드(`gauge`, `count`, `rate` 등)입니다. 이 열에 있는 항목의 이름과 값(`<NAME>:<ROW_VALUE>`)이 있는 행의 각 메트릭을 `tag` 태그로 설정할 수도 있습니다. |
| 태그          | No       | 각 메트릭에 적용할 정적 태그 목록입니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
##### 참고:
- 정의된 `columns` 항목 중 하나 이상은 메트릭 유형(예: `gauge`, `count`, `rate`)이어야 합니다.

- 열의 항목 수는 쿼리에서 반환되는 열의 수와 같아야 합니다.
- `columns`에 정의된 항목의 순서는 쿼리에 반환된 순서와 동일해야 합니다.

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
다음 예는 데이터베이스, 스키마 및 웨어하우스 이름으로 태그가 지정된 [`QUERY_HISTORY` 보기][25]의 모든 쿼리를 계산하는 쿼리입니다.

```TEXT
select count(*), DATABASE_NAME, SCHEMA_NAME, WAREHOUSE_NAME from QUERY_HISTORY group by 2, 3, 4;
```
##### 커스텀 쿼리 설정

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


### 에이전트: 유효성 검사

[Agent의 상태 하위 명령을 실행][26]하고 Checks 섹션에서 `snowflake`를 찾습니다.

## 에이전트: 수집된 데이터

<div class="alert alert-info"><bold>참고</bold>: 다음 메트릭 그룹의 메트릭만 기본적으로 활성화됩니다. <code>snowflake.query.*</code>, <code>snowflake.billing.*</code>, <code>snowflake.storage.*</code>, <code>snowflake.logins.*</code>.

다른 메트릭 그룹에서 메트릭을 수집하려면 <a href="https://github.com/DataDog/integrations-core/blob/master/snowflake/datadog_checks/snowflake/data/conf.yaml.example">이 통합에 대한 예제 구성 파일</a>을 참조하세요.
</div>

### 에이전트: 메트릭

[메트릭 점검](# )에서 제공되는 메트릭 목록을 참조하세요.

### 에이전트: 이벤트

Snowflake는 이벤트를 포함하지 않습니다.

### 에이전트: 서비스 점검

**snowflake.can_connect**
점검에서 Snowflake 자격 증명을 인증할 수 없는 경우 `CRITICAL`을 반환합니다. 그렇지 않으면 `OK`를 반환합니다.
*Statuses: ok, critical*

## 에이전트: 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][14]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog으로 Snowflake 모니터링][27]
- [Datadog으로 Snowflake Snowpark 모니터링][28]
- [Snowflake 비용 및 데이터 품질 모니터링을 위한 주요 메트릭][29]
- [주요 Snowflake 메트릭 수집 및 모니터링 도구][30]
- [Datadog으로 Snowflake 성능 및 데이터 품질 모니터링하는 방법][31]

[1]: https://app.datadoghq.com/dash/integration/31321/snowflake-overview
[2]: https://docs.snowflake.com/en/user-guide/organizations-connect
[3]: images/snowflake_account_url.png
[4]: https://app.datadoghq.com/integrations/snowflake-web
[5]: https://docs.snowflake.com/en/sql-reference/organization-usage/usage_in_currency_daily
[6]: https://app.datadoghq.com/cost/overview
[7]: https://docs.snowflake.com/en/user-guide/key-pair-auth#generate-the-private-key
[8]: https://docs.snowflake.com/en/user-guide/key-pair-auth#generate-a-public-key
[9]: https://docs.snowflake.com/en/user-guide/key-pair-auth#assign-the-public-key-to-a-snowflake-user
[10]: images/custom_query.png
[11]: images/snowflake_metrics.png
[12]: https://github.com/DataDog/integrations-internal-core/blob/main/snowflake_web/metadata.csv
[13]: https://github.com/DataDog/integrations-internal-core/blob/main/snowflake_web/assets/logs/snowflake.yaml
[14]: https://docs.datadoghq.com/ko/help
[15]: https://www.snowflake.com/
[16]: https://app.datadoghq.com/account/settings/agent/latest
[17]: https://docs.datadoghq.com/ko/agent/guide/agent-v6-python-3/?tab=hostagent
[18]: https://docs.snowflake.com/en/sql-reference/account-usage.html#enabling-account-usage-for-other-roles
[19]: https://github.com/DataDog/integrations-core/blob/master/snowflake/datadog_checks/snowflake/data/conf.yaml.example
[20]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[21]: https://docs.snowflake.com/en/user-guide/python-connector-example.html#using-a-proxy-server
[22]: https://github.com/snowflakedb/snowflake-connector-python/blob/d6df58f1c338b255393571a08a1f9f3a71d8f7b6/src/snowflake/connector/proxy.py#L40-L41
[23]: https://docs.snowflake.com/en/user-guide/private-snowflake-service.html
[24]: https://docs.snowflake.com/en/user-guide/admin-security-privatelink.html
[25]: https://docs.snowflake.com/en/sql-reference/account-usage/query_history.html
[26]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[27]: https://www.datadoghq.com/blog/snowflake-monitoring-datadog/
[28]: https://www.datadoghq.com/blog/snowflake-snowpark-monitoring-datadog/
[29]: https://www.datadoghq.com/blog/snowflake-metrics/
[30]: https://www.datadoghq.com/blog/snowflake-monitoring-tools/
[31]: https://www.datadoghq.com/blog/monitor-snowflake-with-datadog/