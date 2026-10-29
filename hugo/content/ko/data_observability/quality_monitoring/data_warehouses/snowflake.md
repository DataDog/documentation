---
aliases:
- /ko/data_observability/datasets/?tab=snowflake
description: Snowflake를 Datadog Data Observability에 연결하여 데이터 품질을 모니터링하고, 사용량을 추적하며,
  문제를 탐지합니다.
further_reading:
- link: /data_observability/
  tag: 문서
  text: Data Observability 개요
- link: /monitors/types/data_observability/
  tag: 문서
  text: Data Observability 모니터
title: Snowflake
---
## 개요 {#overview}

Snowflake 통합은 Datadog을 Snowflake 계정에 연결하여 메타데이터, 쿼리 기록 및 표 수준 메트릭을 동기화합니다. 이를 사용하여 데이터 신선도를 모니터링하고, 이상을 탐지하며, 웨어하우스 및 다운스트림 도구 전반의 계보를 추적하세요.

## 전제 조건 {#prerequisites}

시작하기 전에 다음 항목이 있는지 확인하세요.

- Snowflake의 `ACCOUNTADMIN` 역할에 대한 액세스 권한.
- RSA 키 쌍. 자세한 내용은 [Snowflake 키 쌍 인증 문서][1]를 참조하세요.
- Snowflake 계정이 IP별로 네트워크 액세스를 제한하는 경우, Datadog 웹훅 IP를 네트워크 정책 허용 목록에 포함해야 합니다. IP 목록은 [IP 범위][7] 페이지의 `webhooks` 섹션을 참조하세요.

  <div class="alert alert-warning">IP 범위는 Datadog 사이트마다 다릅니다. <a href="/api/latest/ip-ranges/">IP 범위</a> 페이지에서 오른쪽 상단의 사이트 선택기를 사용하여 올바른 사이트별 엔드포인트 URL에서 IP를 가져오고 있는지 확인하세요.</div>

## Snowflake에서 계정 설정{#set-up-your-account-in-snowflake}

Snowflake에서 계정을 설정하려면 다음 단계를 따르세요.

1. 다음 변수를 정의합니다.

   ```sql
   SET role_name      = 'DATADOG_ROLE';
   SET user_name      = 'DATADOG_USER';
   SET warehouse_name = 'DATADOG_WH';
   ```

2. 역할, 웨어하우스 및 키 쌍 인증 사용자를 생성합니다.

   ```sql
   USE ROLE ACCOUNTADMIN;

   -- Create monitoring role
   CREATE ROLE IF NOT EXISTS IDENTIFIER($role_name);

   -- Create an X-SMALL warehouse (auto-suspend after 30s)
   CREATE WAREHOUSE IF NOT EXISTS IDENTIFIER($warehouse_name)
   WAREHOUSE_SIZE       = XSMALL
   WAREHOUSE_TYPE       = STANDARD
   AUTO_SUSPEND         = 30
   AUTO_RESUME          = TRUE
   INITIALLY_SUSPENDED  = TRUE;

   -- Raise the statement timeout so large crawls and queries aren't cut off,
   -- and cap concurrency so this warehouse can't be monopolized.
   ALTER WAREHOUSE IDENTIFIER($warehouse_name) SET
   MAX_CONCURRENCY_LEVEL               = 8
   STATEMENT_TIMEOUT_IN_SECONDS        = 3600
   STATEMENT_QUEUED_TIMEOUT_IN_SECONDS = 1200
   AUTO_SUSPEND                        = 30
   AUTO_RESUME                         = TRUE;

   -- Create Datadog user—key-pair only (no password)
   -- Replace <PUBLIC_KEY> with your RSA public key (PEM, no headers/newlines)
   CREATE USER IF NOT EXISTS IDENTIFIER($user_name)
   LOGIN_NAME     = $user_name
   RSA_PUBLIC_KEY = '<PUBLIC_KEY>';

   GRANT ROLE IDENTIFIER($role_name) TO USER IDENTIFIER($user_name);

   ALTER USER IDENTIFIER($user_name) SET
   DEFAULT_ROLE            = $role_name
   DEFAULT_WAREHOUSE       = $warehouse_name
   DEFAULT_SECONDARY_ROLES = ();
   ```

3. 해당 역할에 모니터링 권한을 부여합니다.

   ```sql
   -- Warehouse usage
   GRANT USAGE ON WAREHOUSE IDENTIFIER($warehouse_name) TO ROLE IDENTIFIER($role_name);

   -- Account‐level monitoring (tasks, pipes, query history)
   GRANT MONITOR EXECUTION ON ACCOUNT TO ROLE IDENTIFIER($role_name);

   -- Snowflake account-usage views for metadata, usage, and governance
   -- metrics. These do not grant access to the contents of your data.
   GRANT DATABASE ROLE SNOWFLAKE.OBJECT_VIEWER TO ROLE IDENTIFIER($role_name);
   GRANT DATABASE ROLE SNOWFLAKE.USAGE_VIEWER TO ROLE IDENTIFIER($role_name);
   GRANT DATABASE ROLE SNOWFLAKE.GOVERNANCE_VIEWER TO ROLE IDENTIFIER($role_name);
   ```

   <div class="alert alert-info">새 표가 누락되지 않도록 스키마 수준의 future 권한을 사용하세요. Snowflake는 데이터베이스 수준 권한보다 스키마 수준 권한을 우선시합니다. Datadog에 데이터베이스 수준 권한만 있고 다른 역할에 동일한 스키마에 대한 스키마 수준 권한이 있는 경우, 새 표가 Datadog에 나타나지 않을 수 있습니다. 자세한 내용은 <a href="https://docs.snowflake.com/en/sql-reference/sql/grant-privilege#considerations">Snowflake 설명서</a>를 참조하세요.</div>

4. 데이터에 대한 읽기 전용 액세스 권한을 부여합니다. `grant_database_access`는 위에서 언급했듯이 다른 역할의 권한 부여보다 우선순위를 유지하기 위해 데이터베이스 수준이 아닌 스키마 수준의 액세스 권한을 부여하며, 단일 호출로 둘 이상의 데이터베이스에 액세스 권한을 부여할 수 있도록 JSON 배열을 허용합니다.

   ```sql
   -- A database must be selected in order to create a procedure. This can be
   -- any database.
   USE DATABASE SNOWFLAKE;

   CREATE OR REPLACE PROCEDURE grant_database_access(
       databaseNamesJson STRING,
       roleName STRING
   )
   RETURNS STRING
   LANGUAGE JAVASCRIPT
   EXECUTE AS CALLER
   AS
   $$
   function quoteIdentifier(name) {
       return '"' + name.replace(/"/g, '""') + '"';
   }

   var databaseNames;
   try {
       databaseNames = JSON.parse(DATABASENAMESJSON);
   } catch (error) {
       throw new Error("database_names_json must be a JSON array: " + error.message);
   }

   if (!Array.isArray(databaseNames) || databaseNames.length === 0) {
       throw new Error("database_names_json must contain at least one database");
   }

   // the role is always uppercased, so its name here matches regardless of
   // how it was entered when calling this procedure.
   var role = quoteIdentifier(String(ROLENAME).toUpperCase());

   // Grants on TABLE do not apply to dynamic tables, so they are listed
   // separately and additionally receive MONITOR, which dynamic tables need
   // to expose scheduling/lineage metadata.
   var selectKinds = [
       "TABLES",
       "VIEWS",
       "MATERIALIZED VIEWS",
       "EXTERNAL TABLES",
       "EVENT TABLES",
       "ICEBERG TABLES"
   ];

   var databaseCount = 0;
   var schemaCount = 0;

   for (var databaseIndex = 0;
        databaseIndex < databaseNames.length;
        databaseIndex++) {
       var database = quoteIdentifier(databaseNames[databaseIndex]);

       snowflake.execute({sqlText: "GRANT USAGE ON DATABASE " + database + " TO ROLE " + role});

       var schemaResultSet = snowflake.execute({
           sqlText:
               "SELECT SCHEMA_NAME " +
               "FROM " + database + ".INFORMATION_SCHEMA.SCHEMATA " +
               "WHERE SCHEMA_NAME <> 'INFORMATION_SCHEMA'"
       });

       while (schemaResultSet.next()) {
           var schema = quoteIdentifier(schemaResultSet.getColumnValue(1));
           var qualifiedSchema = database + "." + schema;

           snowflake.execute({sqlText: "GRANT USAGE ON SCHEMA " + qualifiedSchema + " TO ROLE " + role});

           for (var kindIndex = 0; kindIndex < selectKinds.length; kindIndex++) {
               var kind = selectKinds[kindIndex];
               snowflake.execute({sqlText: "GRANT SELECT ON ALL " + kind +
                       " IN SCHEMA " + qualifiedSchema + " TO ROLE " + role});
               snowflake.execute({sqlText: "GRANT SELECT ON FUTURE " + kind +
                       " IN SCHEMA " + qualifiedSchema + " TO ROLE " + role});
           }

           snowflake.execute({sqlText: "GRANT SELECT, MONITOR ON ALL DYNAMIC TABLES" +
                   " IN SCHEMA " + qualifiedSchema + " TO ROLE " + role});
           snowflake.execute({sqlText: "GRANT SELECT, MONITOR ON FUTURE DYNAMIC TABLES" +
                   " IN SCHEMA " + qualifiedSchema + " TO ROLE " + role});

           schemaCount++;
       }

       // Covers schemas created after onboarding. The schema-level future
       // grants above remain necessary because they take precedence
       // wherever both exist.
       snowflake.execute({sqlText: "GRANT USAGE ON FUTURE SCHEMAS IN DATABASE " + database +
               " TO ROLE " + role});

       for (var futureKindIndex = 0;
            futureKindIndex < selectKinds.length;
            futureKindIndex++) {
           snowflake.execute({sqlText: "GRANT SELECT ON FUTURE " + selectKinds[futureKindIndex] +
                   " IN DATABASE " + database + " TO ROLE " + role});
       }

       snowflake.execute({sqlText: "GRANT SELECT, MONITOR ON FUTURE DYNAMIC TABLES IN DATABASE " +
               database + " TO ROLE " + role});

       databaseCount++;
   }

   return (
       "Granted Datadog access to " + databaseCount +
       " database(s) and " + schemaCount +
       " existing schema(s)"
   );
   $$
   ;

   CALL grant_database_access('["<YOUR_DATABASE>"]', '<ROLE_NAME>');
   ```

   새 데이터베이스에 대한 액세스 권한을 부여하고 싶을 때마다(업데이트된 데이터베이스 목록과 함께) `CALL` 문을 다시 실행하거나, 임시 데이터베이스를 계속 읽을 수 있도록 [CI 설정의 일부로][8] 실행하세요.

5. (선택 사항) 조직에서 [Snowflake 이벤트 표][2]을 사용하는 경우 Datadog 역할에 해당 표에 대한 액세스 권한을 부여할 수 있습니다.

   ```sql
   -- Grant usage on the database, schema, and table of the event table
   GRANT USAGE ON DATABASE <EVENT_TABLE_DATABASE> TO ROLE IDENTIFIER($role_name);
   GRANT USAGE ON SCHEMA <EVENT_TABLE_DATABASE>.<EVENT_TABLE_SCHEMA> TO ROLE IDENTIFIER($role_name);
   GRANT SELECT ON TABLE <EVENT_TABLE_DATABASE>.<EVENT_TABLE_SCHEMA>.<EVENT_TABLE_NAME> TO ROLE IDENTIFIER($role_name);

   -- Snowflake-provided application roles for event logs
   GRANT APPLICATION ROLE SNOWFLAKE.EVENTS_VIEWER TO ROLE IDENTIFIER($role_name);
   GRANT APPLICATION ROLE SNOWFLAKE.EVENTS_ADMIN TO ROLE IDENTIFIER($role_name);
   ```

   Snowflake 설정을 완료한 후 Datadog에서 Snowflake 통합을 구성합니다.

## Datadog에서 Snowflake 통합 구성 {#configure-the-snowflake-integration-in-datadog}

Datadog에서 Snowflake 통합을 구성하려면 다음 단계를 따르세요.

1. [{{< ui >}}Datadog Data Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][3]로 이동합니다.
2. Snowflake 옵션에 대한 {{< ui >}}Configure{{< /ui >}} 버튼을 클릭합니다.

   {{< img src="data_observability/data-obs-settings-integrations.png" alt="설정 페이지의 Data Observability 통합 목록" style="width:100%;" >}}

3. 흐름에 따라 계정 세부 정보를 입력하고 개인 키를 업로드합니다.
4. {{< ui >}}Enable Data Observability for Snowflake tables{{< /ui >}}를 켭니다.
5. (선택 사항) {{< ui >}}Custom alias URLs{{< /ui >}} 아래에서 다른 도구가 이 Snowflake 계정을 참조하는 데 사용하는 추가 이름을 등록합니다. 예를 들어 dbt에 구성된 계정 식별자, BI 도구에서 사용하는 연결 문자열 또는 AWS PrivateLink URL이 있습니다. 이 기능이 필요한 경우 아래의 [사용자 지정 별칭 URL](#custom-alias-urls)을 참조하세요.
6. {{< ui >}}Save & Test{{< /ui >}}를 클릭합니다.

### 사용자 지정 별칭 URL {#custom-alias-urls}

이 필드는 선택 사항입니다. Datadog이 연결하는 Snowflake 계정 이름이 다른 도구에서 동일한 계정을 참조하는 방식과 일치하지 않을 때 사용하세요.

Datadog 외부의 계보 이벤트에는 OpenLineage 이미터, dbt 매니페스트 및 다른 도구의 쿼리 기록이 포함됩니다. 이러한 이벤트는 업스트림 도구가 구성된 이름을 사용하여 웨어하우스를 식별합니다. 해당 이름이 Datadog에서 사용하는 표준 계정 URL과 다른 경우, 해당 소스의 계보는 이 Snowflake 통합에 연결되지 않습니다.

각 대체 이름을 {{< ui >}}Custom alias URL{{< /ui >}}로 등록하면 Datadog에 해당 이름을 동일한 Snowflake 계정에 대한 참조로 처리하도록 지시하게 됩니다. 그러면 도구 간 계보가 올바르게 확인됩니다. 일반적인 경우는 다음과 같습니다.

- 계정은 AWS PrivateLink URL을 통해 액세스할 수 있습니다.
- dbt 프로젝트, BI 도구 또는 기타 커넥터가 표준 URL과 일치하지 않는 계정 식별자로 구성되어 있습니다.

별칭을 추가하려면 통합 설정 중에 {{< ui >}}Configure Data Observability{{< /ui >}}를 확장하고 {{< ui >}}Custom alias URLs{{< /ui >}} 아래에서 {{< ui >}}\+ Add Alias{{< /ui >}}를 클릭합니다. 대체 이름당 하나의 항목을 추가하세요. 별칭은 구성 중인 Snowflake 계정에만 적용되며, 각 Snowflake 통합은 자체 별칭 목록을 관리합니다.

## Snowflake 작업 및 Snowpipe {#snowflake-tasks-and-snowpipes}

Datadog은 SQL 정의를 구문 분석하여 Snowflake 작업 및 Snowpipe에서 계보를 파생합니다.
- 작업의 경우, 여기에는 작업 간 종속성 및 대상 표에 대한 계보가 포함됩니다.
- Snowpipe의 경우, Datadog은 소스 스테이지에서 대상 표로의 계보를 파생합니다.

두 기능 모두 설정 중에 부여된 `GRANT MONITOR EXECUTION ON ACCOUNT` 권한이 필요합니다.

<div class="alert alert-info">Snowflake 작업 트레이스는 미리 보기로 제공되고 있습니다. 이 기능을 활성화하려면 계정 담당자에게 문의하세요.</div>

이 기능이 활성화되면 각 작업 그래프 실행이 APM에서 트레이스로 나타나며, 개별 작업이 상태, 기간, 오류와 같은 실행 세부 정보가 포함된 스팬으로 표시됩니다. 이 정보를 찾는 방법은 다음과 같습니다.
1. Datadog에서 {{< ui >}}APM{{< /ui >}} > [{{< ui >}}Trace Explorer{{< /ui >}}][4]로 이동합니다.
2. 탐색기를 필터링합니다.
   - 최상위 작업 그래프 스팬의 경우, `operation_name:snowflake.task_graph`로 필터링합니다.
   - 개별 작업 스팬의 경우, `operation_name:snowflake.task`로 필터링합니다.

## 객체 태그 {#object-tags}

Datadog은 표에 적용된 [Snowflake 객체 태그][6]를 수집하여 Data Observability의 해당 표에 연결합니다. 태그는 설정 중에 부여된 `SNOWFLAKE.GOVERNANCE_VIEWER` 데이터베이스 역할을 사용하여 `SNOWFLAKE.ACCOUNT_USAGE.TAG_REFERENCES`에서 읽어오므로, 추가 권한이 필요하지 않습니다.

수집된 태그는 **Data Observability 메트릭** 데이터 소스의 속성으로 제공되며, `database`, `schema`, `table`, `entity_id`와 함께 사용할 수 있습니다. Metrics Explorer 및 대시보드 위젯 편집기에서 태그를 다음과 같이 사용할 수 있습니다.

- 비즈니스 차원(예: `data_source` 또는 `data_domain`)별로 표 메트릭을 필터링합니다.
- 태그 값별로 메트릭을 그룹화합니다.
- 대시보드에서 템플릿 변수를 제어합니다.

Datadog은 표당 최대 50개의 태그를 수집하는데, 이는 Snowflake의 문서화된 제한입니다. 태그는 크롤링할 때마다 새로 고쳐지므로 Snowflake의 변경 사항은 다음 동기화 후에 나타납니다.

## 다음 단계 {#next-steps}

저장 후 Datadog은 백그라운드에서 정보 스키마와 쿼리 기록을 동기화하기 시작합니다. 초기 동기화는 Snowflake 배포 규모에 따라 몇 시간까지 걸릴 수 있습니다.

초기 동기화가 완료되면, [Data Observability 모니터][5]를 생성하여 신선도, 행 수, 열 수준 메트릭 및 사용자 지정 SQL 메트릭에 대한 경보 설정을 시작하세요.

## 권한 문제 해결{#troubleshoot-permissions}

Datadog이 Snowflake 계정에서 예상되는 데이터베이스, 스키마 또는 표를 볼 수 없는 경우, 다음 단계를 따라 Datadog 역할이 올바른 액세스 권한을 가지고 있는지 확인하세요.

<div class="alert alert-info">Snowflake 콘솔은 기본적으로 보조 역할을 활성화하므로, 실제로 해당 역할이 가진 권한보다 더 많은 액세스 권한이 있는 것처럼 보일 수 있습니다. 아래 2단계는 Datadog 역할의 권한만으로 테스트할 수 있도록 도와줍니다.</div>

1. Datadog을 위해 프로비저닝된 것과 동일한 역할 및 사용자로 설정합니다.
   ```sql
   USE ROLE DATADOG_ROLE;
   ```

2. Datadog 역할의 권한만 활성화되도록 보조 역할을 비활성화합니다.
   ```sql
   USE SECONDARY ROLES NONE;
   ```

3. 올바른 역할이 설정되어 있고 보조 역할이 사용되고 있지 않은지 확인합니다.
   ```sql
   SELECT CURRENT_ROLE(), CURRENT_SECONDARY_ROLES();
   ```

4. Datadog 역할이 액세스할 수 있는 데이터베이스를 나열합니다.
   ```sql
   SELECT database_name FROM snowflake.information_schema.databases;
   ```

5. 특정 스키마 또는 표에 대한 액세스 권한을 확인합니다.
   ```sql
   SHOW SCHEMAS IN DATABASE "<DATABASE_NAME>";
   SHOW TABLES IN SCHEMA "<DATABASE_NAME>"."<SCHEMA_NAME>";
   ```

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.snowflake.com/en/user-guide/key-pair-auth#generate-the-private-key
[2]: https://docs.snowflake.com/en/developer-guide/logging-tracing/event-table-setting-up
[3]: https://app.datadoghq.com/data-obs/settings/integrations
[4]: https://app.datadoghq.com/apm/traces
[5]: /ko/monitors/types/data_observability/
[6]: https://docs.snowflake.com/en/user-guide/object-tagging
[7]: /ko/api/latest/ip-ranges/
[8]: /ko/data_observability/cicd/#drift-detection