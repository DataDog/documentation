---
aliases:
- /ko/data_observability/datasets/?tab=databricks
description: Databricks를 Datadog Data Observability에 연결하여 데이터 품질을 모니터링하고, 사용량을 추적하며,
  문제를 감지하세요.
further_reading:
- link: /data_observability/
  tag: 설명서
  text: Data Observability 개요
- link: /monitors/types/data_observability/
  tag: 설명서
  text: Data Observability 모니터
title: Databricks
---
## 개요 {#overview}

Databricks 통합은 Datadog을 Databricks 워크스페이스에 연결하여 메타데이터와 테이블 수준 메트릭을 동기화합니다. 이를 사용하여 데이터 신선도를 모니터링하고, 이상을 감지하며, 데이터 스택 전반의 계보를 추적하세요.

**참고**: 아래 지침은 Quality Monitoring용입니다. Jobs Monitoring의 경우 [Databricks용 Data Observability: Jobs Monitoring 활성화][1]를 참조하세요.

## 전제 조건 {#prerequisites}

Databricks 워크스페이스가 IP별로 네트워크 액세스를 제한하는 경우, Datadog 웹훅 IP를 허용 목록에 추가하세요. IP 목록은 IP 범위 목록의 `webhooks` 섹션( {{< region-param key="ip_ranges_url" link="true" text="IP ranges list" >}})을 참조하세요.

## Databricks에서 계정 설정 {#set-up-your-account-in-databricks}

### 1단계 - Databricks 통합 타일 연결 {#step-1-connect-the-databricks-integration-tile}

1. Datadog의 통합 타일을 사용하여 [Databricks 통합 설명서][2]의 설치 지침을 완료하세요. 서비스 주체의 애플리케이션 ID를 기록하고 나중에 참조할 수 있도록 안전한 곳에 기록해 두세요.

   **참고**: Quality Monitoring에는 워크스페이스 관리자 권한이 필요하지 않습니다.

2. 통합을 구성할 때 {{< ui >}}Data Observability{{< /ui >}} 토글을 킵니다.
3. {{< ui >}}Save Databricks Workspace{{< /ui >}}를 클릭합니다.

### 2단계 - 액세스 권한 부여 {#step-2-grant-access}

Databricks에서 {{< ui >}}SQL Editor{{< /ui >}}를 열어 다음 명령을 실행합니다. `<application_id>`가 나타나는 모든 위치에는 서비스 주체의 표시 이름이 아닌 애플리케이션(클라이언트) ID를 사용하세요.

먼저 계보를 위해 시스템 스키마에 대한 액세스 권한을 부여합니다.

```sql
GRANT USE CATALOG ON CATALOG system TO `<application_id>`;
GRANT USE SCHEMA ON CATALOG system TO `<application_id>`;
GRANT SELECT ON CATALOG system TO `<application_id>`;
```

이 권한은 [쿼리 기록 시스템 테이블][4](`system.query.history`)을 포함하는 전체 `system` 카탈로그에 적용됩니다. Datadog은 이 테이블에서 쿼리 기록을 읽어 테이블 간의 계보를 구축하고, 테이블에 대해 실행되는 쿼리에 대한 가시성을 제공합니다. 해당 테이블의 쿼리 텍스트를 읽으려면 서비스 주체에게 [3단계](#step-3---grant-access-to-query-text)에서 설명한 그룹 멤버십도 필요합니다.

그런 다음 모니터링하려는 데이터 범위에 대해 읽기 전용 액세스 권한을 부여합니다.

{{< tabs >}}
{{% tab "전체 카탈로그 액세스" %}}

더 간단한 설정을 위해 전체 카탈로그 액세스 옵션을 사용하세요. 권한을 업데이트할 필요 없이 향후 생성될 테이블까지 자동으로 포함됩니다.


```sql
GRANT USE CATALOG ON CATALOG <catalog_name> TO `<application_id>`;
GRANT USE SCHEMA ON CATALOG <catalog_name> TO `<application_id>`;
GRANT SELECT ON CATALOG <catalog_name> TO `<application_id>`;
```

{{% /tab %}}
{{% tab "특정 테이블" %}}

최소 권한 액세스가 필요하거나 데이터의 하위 집합만 모니터링해야 하는 경우 특정 테이블 옵션을 사용하세요. 새 테이블을 추가할 때는 권한을 업데이트해야 합니다.

```sql
GRANT USE CATALOG ON CATALOG <catalog_name> TO `<application_id>`;
GRANT USE SCHEMA ON SCHEMA <catalog_name>.<schema_name> TO `<application_id>`;
GRANT SELECT ON TABLE <catalog_name>.<schema_name>.<table_name> TO `<application_id>`;
```

{{% /tab %}}
{{< /tabs >}}

이러한 권한은 다음과 같은 이유로 필요합니다.

- `GRANT USE CATALOG`: 카탈로그를 탐색하고 스키마를 검색하는 데 필요합니다.
- `GRANT USE SCHEMA` : 테이블을 열거하고 스키마 수준의 상태를 모니터링하는 데 필요합니다.
- `GRANT SELECT` : 사용자 지정 SQL 또는 분포 검사와 같은 데이터 품질 모니터링에 필요합니다.

### 3단계 - 쿼리 텍스트에 대한 액세스 권한 부여 {#step-3-grant-access-to-query-text}

Databricks는 계정 관리자가 아니거나 `databricks_pii_access` 계정 수준 그룹의 구성원이 아닌 모든 주체에 대해 SQL 쿼리 텍스트를 마스킹합니다. 마스킹된 주체의 경우, 쿼리 텍스트는 `system.query.history`, [Query History API][5], [List Queries API][6] 및 SQL 문 텍스트를 캡처하는 감사 로그 이벤트의 `statement_text` 열에서 `<Redacted>`로 반환됩니다.

쿼리 텍스트를 읽는 다음 기능을 사용하려면 서비스 주체를 `databricks_pii_access`에 추가하세요.

- **데이터 계보**: Databricks 쿼리 기록에서 쿼리 텍스트를 구문 분석하여 보완됩니다.
- **Databricks 서버리스 작업 모니터링**: 클러스터에서 Datadog Agent가 실행되지 않는 [서버리스 컴퓨팅][7]에서 실행되는 작업을 모니터링합니다.
- **SQL 웨어하우스 및 쿼리 모니터링**: SQL 웨어하우스에서 실행되는 쿼리에 대한 가시성과 Datadog에서 생성한 최적화 권장 사항을 제공합니다.

신선도, 행 수, 열 통계와 같은 테이블 수준 메트릭은 쿼리 텍스트가 아닌 테이블 데이터와 메타데이터를 읽으므로 이 멤버십 없이도 작동합니다.

[2단계](#step-2---grant-access)의 `system` 카탈로그 권한 외에도 그룹 멤버십이 필요합니다. 그룹에는 속해 있지만 `CATALOG system`에 대한 `SELECT` 권한이 없는 주체는 여전히 쿼리 기록을 읽을 수 없습니다.

그룹을 생성하고 서비스 주체를 추가하려면 다음을 수행하세요.

1. `databricks_pii_access` 그룹은 기본적으로 Databricks 계정에 존재하지 않으며, 워크스페이스 관리자가 자동으로 해당 그룹의 구성원이 되지는 않습니다. 대소문자를 구분하는 정확한 이름 `databricks_pii_access`로 생성하세요.
   - SCIM 또는 외부 ID 공급자로 그룹을 관리하지 않는 경우 {{< ui >}}Account Console{{< /ui >}} > {{< ui >}}User Management{{< /ui >}} > {{< ui >}}Groups{{< /ui >}} > {{< ui >}}Add Group{{< /ui >}}로 이동합니다.
   - SCIM 또는 외부 ID 공급자로 그룹을 관리하는 경우 대신 해당 위치에서 그룹을 생성합니다.
1. [1단계](#step-1---connect-the-databricks-integration-tile)의 서비스 주체를 그룹에 추가합니다.

자세한 내용은 [계정 수준 그룹 관리][8]에 대한 Databricks 설명서를 참조하세요.

## 다음 단계 {#next-steps}

통합을 구성하면 Datadog이 백그라운드에서 메타데이터와 열 수준 계보를 동기화하기 시작합니다. 초기 동기화는 Databricks 배포 규모에 따라 몇 시간이 걸릴 수 있습니다.

초기 동기화가 완료되면 [Data Observability 모니터][3]를 생성하여 신선도, 행 수, 열 수준 메트릭 및 사용자 지정 SQL 메트릭에 대한 알림 설정을 시작하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/data_observability/jobs_monitoring/databricks/
[2]: /ko/integrations/databricks/
[3]: /ko/monitors/types/data_observability/
[4]: https://docs.databricks.com/aws/en/admin/system-tables/query-history
[5]: https://docs.databricks.com/api/workspace/queryhistory/list
[6]: https://docs.databricks.com/api/workspace/queries/list
[7]: https://docs.databricks.com/aws/en/compute/serverless/
[8]: https://docs.databricks.com/aws/en/admin/users-groups/groups