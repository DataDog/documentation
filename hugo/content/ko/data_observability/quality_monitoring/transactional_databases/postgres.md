---
description: PostgreSQL을 Datadog Data Observability에 연결하여 스키마, 표 크기와 행 수를 모니터링합니다.
further_reading:
- link: /data_observability/
  tag: 설명서
  text: Data Observability 개요
- link: /monitors/types/data_observability/
  tag: 설명서
  text: Data Observability 모니터
- link: /database_monitoring/setup_postgres/
  tag: 설명서
  text: Database Monitoring for PostgreSQL
- link: /remote_configuration/
  tag: 설명서
  text: Remote Configuration
title: PostgreSQL
---
{{< callout url="#" btn_hidden="true" header="미리 보기" >}}
PostgreSQL용 Data Observability는 미리 보기로 제공되고 있습니다. 조직에서 이 기능을 활성화하려면 Datadog 담당자에게 문의하세요.
{{< /callout >}}

## 개요 {#overview}

Datadog Data Observability용 PostgreSQL 통합은 표 메타데이터를 추적하여 환경 전반의 스키마, 표 크기 및 행 수를 파악할 수 있도록 합니다.

PostgreSQL은 [데이터 웨어하우스 통합][7]과 같은 직접적인 클라우드 연결이 아닌 [Datadog Agent][1]를 통해 수집됩니다. 이 페이지는 Data Observability에 필요한 구성만 다룹니다. 전체 Database Monitoring 기능을 설정하려면 [PostgreSQL용 DBM 설정 가이드][2]를 참조하세요.

## 전제 조건 {#prerequisites}

시작하기 전에 다음 사항을 확인하세요.

- PostgreSQL 인스턴스에 연결할 수 있는 호스트에 설치된 Datadog Agent `7.81.0` 이상 버전 해당 플랫폼의 [Agent 설치][1]를 참조하세요.
- 조직, Agent가 사용하는 API 키 및 Agent 자체에서 활성화된 [Remote Configuration][8] 데이터 품질 모니터는 Remote Configuration을 통해 Agent로 전달되므로, 이 기능이 없으면 표는 동기화되지만 모니터는 실행되지 않습니다. [Remote Configuration 활성화](#enable-remote-configuration)를 참조하세요.
- Datadog 사용자를 생성하고 권한을 부여하기 위한 PostgreSQL 인스턴스에 대한 슈퍼유저 액세스 권한
- Datadog 담당자가 조직에 활성화한 미리 보기 접근 권한

## Remote Configuration 활성화 {#enable-remote-configuration}

Data Observability는 [Remote Configuration][8]을 사용하여 모니터 쿼리를 Agent에 전달합니다. Datadog에서 데이터 품질 모니터를 생성하면 해당 쿼리가 인스턴스를 담당하는 Agent로 전송되고, Agent의 Postgres 검사가 모니터 일정에 따라 데이터베이스에서 해당 쿼리를 실행합니다.

표 메타데이터 수집은 Remote Configuration에 의존하지 않습니다. Remote Configuration을 사용할 수 없는 경우 표는 카탈로그에 계속 표시되지만, Agent가 실행할 쿼리를 수신하지 못하므로 해당 표에 대해 생성한 모든 모니터에는 데이터가 표시되지 않습니다.

Remote Configuration은 대부분의 환경에서 기본적으로 활성화되어 있지만, 다음 세 곳 모두에서 활성화되어야 합니다. 각 항목을 확인합니다.

 - **조직** [Remote Configuration][9] 설정 페이지에서 Remote Configuration이 활성화되어 있는지 확인합니다. 이를 활성화하려면 [`org_management`][11] 권한이 필요합니다.
 - **Agent의 API 키** Agent가 사용하는 API 키에는 Remote Configuration 기능이 있어야 합니다. [API 키][10] 페이지에서 확인합니다. 이 작업에는 [`api_keys_write`][12] 권한이 필요합니다. 이 기능이 없는 키를 사용하는 Agent는 `UNAUTHORIZED` 상태를 표시합니다.
 - **Agent** Agent `7.47.0` 이상에서는 `remote_configuration.enabled`의 기본값이 `true`이므로 일반적으로 변경할 필요가 없습니다. 다음 두 가지 경우에는 [`datadog.yaml`][13]에서(또는 `DD_REMOTE_CONFIGURATION_ENABLED`를 통해) 명시적으로 설정합니다.

   - 이전에 `false`로 설정되어 있었던 경우
   - Agent가 GovCloud(`ddog-gov.com`)에 보고하거나 FIPS 모드에서 실행되는 경우 해당 환경에서는 Remote Configuration이 **기본적으로 비활성화**되어 있으며, 설정하지 않으면 활성화되지 않습니다.

   ```yaml
   remote_configuration:
     enabled: true
   ```

   이 설정을 변경한 후 [Agent를 다시 시작][5]합니다.

각 Agent의 Remote Configuration 상태는 [Remote Configuration][9] 설정 페이지에도 나열됩니다. 상태 설명 및 네트워크 요구 사항은 [Agent Remote Configuration 상태][14]를 참조하세요.

## 이미 Database Monitoring을 사용하고 있습니까? {#already-using-database-monitoring}

이 데이터베이스에 대해 [Database Monitoring][2]이 이미 실행 중이라면 설정이 대부분 완료된 상태입니다. `datadog` 사용자가 이미 존재하며 `pg_monitor` 권한을 가지고 있습니다. 다음 세 가지 작업이 추가로 필요합니다.

1. **Agent 버전을 확인합니다.** `datadog-agent status`를 실행하고 헤더와 Collector 섹션의 Postgres 검사 행에서 버전을 확인합니다.

   ```text
   Agent (v7.81.0)
   ...
     postgres (23.9.1)
   ```

   Agent가 `7.81.0`보다 낮은 버전인 경우 [Agent를 업그레이드][6]합니다. `datadog-agent integration install`을 사용하여 Postgres 검사만 업그레이드하는 것으로는 충분하지 않습니다. 모니터 쿼리를 전달하는 Remote Configuration 핸들러는 검사 자체가 아닌 Agent에 포함되어 있기 때문입니다.

   Database Monitoring에는 Remote Configuration이 필요하지 않으므로, 다른 기능이 정상적으로 작동하는 Agent에서도 Remote Configuration이 비활성화되어 있을 수 있습니다. 계속하기 전에 Remote Configuration이 활성화되어 있는지 확인합니다. 자세한 내용은 [Remote Configuration 활성화](#enable-remote-configuration)를 참조하세요.

2. **데이터에 대한 `SELECT` 권한을 부여합니다.** Database Monitoring은 `public` 스키마에 대해 `pg_monitor` 및 `USAGE` 권한을 부여하지만, 표에 대한 `SELECT` 권한은 부여하지 않습니다. Data Observability는 행 수, 열 수준 메트릭 및 사용자 지정 SQL 결과를 계산하기 위해 이 권한이 필요합니다. 추적하려는 각 데이터베이스의 각 스키마에 대해 `CREATE USER` 단계를 건너뛰고 [Datadog 데이터베이스 사용자 설정](#set-up-the-datadog-database-user)에 나와 있는 권한 부여 명령을 실행합니다.

3. **Data Observability 작업을 활성화합니다.** `conf.d/postgres.d/conf.yaml`의 각 기존 인스턴스에 다음을 추가하고 `dbm: true`는 그대로 유지합니다.

   ```yaml
   data_observability:
     enabled: true
   ```

   인스턴스에서 이미 `database_autodiscovery`를 사용하는 경우, Data Observability는 탐지된 모든 데이터베이스를 수집하므로 `SELECT` 권한이 모든 데이터베이스에 부여되어 있는지 확인합니다.

[Agent를 다시 시작][5]하여 변경 사항을 적용한 다음 [표 메타데이터 탐색](#explore-your-table-metadata)부터 계속 진행합니다.

## Datadog 데이터베이스 사용자 설정 {#set-up-the-datadog-database-user}

1. 슈퍼유저로 데이터베이스에 연결하고 전용 사용자를 생성합니다.

   ```sql
   CREATE USER datadog WITH PASSWORD '<SECURE_PASSWORD>';
   GRANT pg_monitor TO datadog;
   GRANT SELECT ON pg_stat_database TO datadog;
   ```

2. 모니터링하려는 각 데이터베이스에 연결(`psql`에서 `\c my_database` 사용)하고 스키마에 대한 읽기 권한을 부여합니다.

   ```sql
   GRANT USAGE ON SCHEMA "<YOUR_SCHEMA>" TO datadog;
   GRANT SELECT ON ALL TABLES IN SCHEMA "<YOUR_SCHEMA>" TO datadog;

   -- Automatically apply read access to tables created later by <TABLE_OWNER_ROLE>
   ALTER DEFAULT PRIVILEGES FOR ROLE <TABLE_OWNER_ROLE> IN SCHEMA "<YOUR_SCHEMA>"
     GRANT SELECT ON TABLES TO datadog;
   ```

   `ALTER DEFAULT PRIVILEGES`는 `FOR ROLE`에 지정된 역할이 생성한 표에만 영향을 미칩니다. 스키마에서 **표를 생성하는 각 역할**에 대해 한 번씩 실행합니다. 그렇지 않으면 애플리케이션에서 새 표를 생성할 때 Data Observability가 해당 표에 대한 접근 권한을 갖지 못하게 됩니다. 스키마 내 표의 소유자 역할을 나열하려면 다음 단계를 따르세요.

   ```sql
   SELECT DISTINCT tableowner FROM pg_tables WHERE schemaname = '<YOUR_SCHEMA>';
   ```

   스키마 및 표 권한은 데이터베이스별로 다릅니다. 추적하려는 **모든 데이터베이스** 및 모든 스키마에 대해 이 명령을 다시 실행합니다.

### 특정 표로 제한(선택 사항) {#restrict-to-specific-tables-optional}

수집을 일부 표로 제한하려면 `ALL TABLES IN SCHEMA` 대신 대상 표에만 권한을 부여합니다.

```sql
GRANT USAGE ON SCHEMA "<YOUR_SCHEMA>" TO datadog;
GRANT SELECT ON "<YOUR_SCHEMA>"."orders" TO datadog;
GRANT SELECT ON "<YOUR_SCHEMA>"."users" TO datadog;
```

Data Observability는 `datadog` 사용자가 명시적인 `SELECT` 권한을 가진 표만 표시합니다.

## PostgreSQL 통합 구성 {#configure-the-postgresql-integration}

Agent의 `conf.d/postgres.d/conf.yaml` 파일을 편집하고 모니터링하려는 각 PostgreSQL 호스트에 대한 인스턴스를 추가합니다. 구성 옵션의 전체 목록은 [샘플 postgres.d/conf.yaml][4]을 참조하세요.

{{< tabs >}}
{{% tab "호스트의 모든 데이터베이스" %}}

호스트의 모든 사용자 데이터베이스에서 메타데이터를 수집하려면 `database_autodiscovery`를 활성화합니다.

```yaml
init_config:
instances:
  - host: <POSTGRES_HOST>
    port: 5432
    username: datadog
    password: '<SECURE_PASSWORD>'

    database_autodiscovery:
      enabled: true

    ## Required for Data Observability
    data_observability:
      enabled: true
```

{{% /tab %}}
{{% tab "단일 데이터베이스" %}}

하나의 데이터베이스에서만 메타데이터를 수집하려면 `dbname`을 설정합니다.

```yaml
init_config:
instances:
  - host: <POSTGRES_HOST>
    port: 5432
    username: datadog
    password: '<SECURE_PASSWORD>'
    dbname: <DATABASE_NAME>

    ## Required for Data Observability
    data_observability:
      enabled: true
```

{{% /tab %}}
{{< /tabs >}}

**참고**: 비밀번호에 특수 문자가 포함된 경우, 작은 따옴표로 묶어 입력하세요.

스키마 수집(`collect_schemas`)은 기본적으로 활성화되어 있으며 Data Observability에 표 데이터를 채우는 역할을 합니다. `dbm: true`는 Data Observability에 필수 항목이 **아닙니다**. [Database Monitoring][2]도 사용하는 경우에만 설정합니다.

변경 사항을 적용하려면 [Agent를 재시작][5]합니다.

```shell
sudo systemctl restart datadog-agent
```

### 구성 유효성 검사 {#validate-the-configuration}

검사가 실행 중인지 확인합니다.

```shell
sudo datadog-agent status | grep -A 20 'postgres'
```

출력에는 `postgres` 검사가 0보다 큰 `Total Runs` 수치 및 최근 `Last Successful Execution` 타임스탬프와 함께 표시되어야 합니다.

Agent가 Remote Configuration을 수신하고 있는지 확인합니다. Agent 상태의 `Remote Configuration` 섹션에는 조직 및 API 키 검사 결과가 직접 표시됩니다.

```shell
sudo datadog-agent status | grep -A 10 'Remote Configuration'
```

정상적인 Agent는 다음 상태를 보고합니다.

```text
====================
Remote Configuration
====================
  Organization enabled: True
  API Key: Authorized
  Last error: None
```

그 외의 상태는 모두 [Remote Configuration 활성화](#enable-remote-configuration)에 설명된 세 가지 검사 항목 중 하나와 관련이 있습니다.

- `Organization enabled: False`: 조직에 대해 Remote Configuration을 활성화합니다.
- `API Key: Not authorized`: 이 Agent가 사용하는 API 키에 Remote Configuration 기능을 추가합니다.
- `Remote Configuration is disabled because ...`: Agent 자체에서 꺼져 있습니다.

이 섹션이 정상 상태가 될 때까지 표는 계속 동기화되지만 모니터는 실행되지 않습니다.

## 표 메타데이터 탐색 {#explore-your-table-metadata}

초기 메타데이터 수집이 완료되기까지 약 1시간이 소요될 수 있습니다. 그런 다음 Data Observability 카탈로그에서 [PostgreSQL 표를 조회][3]할 수 있습니다.

표가 표시되지 않으면 다음 사항을 확인하세요.

1. `sudo datadog-agent status`에 `postgres` 검사가 성공적으로 보고된 것으로 표시됩니다.
2. `datadog` 사용자가 대상 표에 대한 `SELECT` 권한을 가지고 있습니다. 다음과 같이 테스트합니다.

   ```shell
   psql -U datadog -d <DATABASE_NAME> -c 'SELECT 1 FROM <YOUR_SCHEMA>.orders LIMIT 1'
   ```

3. Datadog 담당자가 조직에 미리 보기 접근 권한을 활성화했습니다.

## 데이터 품질 모니터 생성 {#create-data-quality-monitors}

표가 카탈로그에 표시되면 표의 상태에 대한 경보를 설정할 수 있습니다.

[Data Observability 카탈로그][3]에서 표로 이동하여 {{< ui >}}Monitors{{< /ui >}} 탭을 선택한 다음 {{< ui >}}Add Monitor{{< /ui >}}를 클릭합니다. 미리 보기에서는 다음 항목을 생성할 수 있습니다.

- **Row count**: 갑작스러운 감소나 정체 추세 등 데이터 양의 변동에 대한 경보를 생성합니다.
- **Column-level metrics**: null 비율, 카디널리티 또는 분포 변화와 같은 열 속성을 모니터링합니다.
- **Custom SQL**: `SELECT` 쿼리에 대한 경보를 생성합니다. 쿼리는 `dd_value`라는 별칭이 지정된 숫자 값 하나만 반환해야 합니다.

모니터는 수집 일정에 따라 실행됩니다. 참조된 모든 표에 대해 `datadog` 사용자의 `SELECT` 권한을 유지해야 합니다. 접근 권한이 취소되면 모니터 실행이 실패합니다.

모니터에 데이터가 보고되지 않으면 조직, Agent의 API 키 및 Agent 자체에서 [Remote Configuration](#enable-remote-configuration)이 활성화되어 있는지 확인합니다. 이 설정 없이는 Agent가 모니터 쿼리를 수신할 수 없습니다.

## 알려진 제한 사항 {#known-limitations}

Data Observability는 `dbm` 및 `collect_schemas`가 활성화된 인스턴스의 모든 PostgreSQL 표를 나열하며, `data_observability.enabled: true`가 없는 인스턴스도 포함합니다. 해당 데이터베이스 중 하나에 대해 모니터를 예약하면 데이터가 없는 모니터가 생성됩니다. 표는 나열되지만 모니터에 데이터가 표시되지 않는 경우 다음 단계를 따르세요.

- [이미 Database Monitoring을 사용 중이신가요?](#already-using-database-monitoring)의 안내에 따라 작업을 활성화하고 필요한 `SELECT` 권한을 부여합니다.
- [Remote Configuration](#enable-remote-configuration)이 활성화되어 있는지 확인합니다. 표 목록 표시에는 Remote Configuration이 필요하지 않지만, 모니터 쿼리에는 필요합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/
[2]: /ko/database_monitoring/setup_postgres/
[3]: https://app.datadoghq.com/datasets/catalog?integration=postgres
[4]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[5]: /ko/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[6]: /ko/agent/guide/upgrade_agent_fleet_automation/
[7]: /ko/data_observability/quality_monitoring/data_warehouses/
[8]: /ko/remote_configuration/
[9]: https://app.datadoghq.com/organization-settings/remote-config
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: /ko/account_management/rbac/permissions/#permissions-list
[12]: /ko/account_management/rbac/permissions/#permissions-list
[13]: /ko/agent/configuration/agent-configuration-files/#main-configuration-file
[14]: /ko/agent/guide/setup_remote_config/#agent-remote-configuration-status