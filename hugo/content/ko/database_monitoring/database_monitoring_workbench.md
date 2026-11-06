---
description: Database Monitoring이 수집한 스키마와 통계를 기반으로 구축한 임시 Postgres 데이터베이스에서 운영 환경과
  유사한 조건으로 변경 사항을 개발하고 테스트합니다.
further_reading:
- link: /database_monitoring/
  tag: 설명서
  text: Database Monitoring
- link: /database_monitoring/schema_explorer/
  tag: 설명서
  text: 스키마 탐색기
- link: /database_monitoring/recommendations/
  tag: 설명서
  text: 권장 사항
- link: /mcp_server/
  tag: 설명서
  text: Datadog MCP Server
title: Database Monitoring Workbench
---
{{< callout url="https://app.datadoghq.com/forms/share/45a8d961134a872c7118d345cff413cfd3d88bc1f1558f76bb5067a85ae43118" btn_hidden="false" header="미리 보기에 참여하세요!" >}}
Database Monitoring Workbench는 미리 보기로 제공되고 있습니다. 액세스를 요청하려면 이 양식을 사용하세요.
{{< /callout >}}

## 개요 {#overview}

Database Monitoring Workbench는 운영 환경과 유사한 임시 Postgres 데이터베이스로, 변경 사항을 개발하고 테스트하는 데 사용할 수 있습니다. Database Monitoring이 수집한 스키마와 통계를 기반으로 구축되므로 운영 테이블, 인덱스, 행 수 및 메이저 버전과 구조가 일치합니다. Datadog은 테이블의 데이터를 복사하거나 전송하지 않습니다. Database Monitoring이 수집한 열 및 테이블 통계를 기반으로 생성된 합성 데이터가 Workbench에 자동으로 채워집니다. 원하는 경우 자체 데이터로 수동으로 채울 수 있습니다.

이 페이지에서는 다음 작업을 수행하는 방법을 설명합니다.

- MCP, API 또는 SQL 클라이언트를 사용하여 Workbench 인스턴스에 연결
- 쿼리 실행 계획 비교 및 인덱스, 마이그레이션 변경 사항 테스트
- CI에서 쿼리 실행 계획의 성능 회귀 탐지
- 데이터 모델 변경 사항 실험

## 요구 사항 {#requirements}

- [Database Monitoring][5]에서 모니터링하는 Postgres 데이터베이스
- 인스턴스뿐만 아니라 특정 논리 데이터베이스에 대해서도 활성화된 [Schema collection][1]
- **Database Monitoring Read** 권한 권한 관리 방법은 [역할 기반 액세스 제어][6]을 참조하세요.
- 조직에 활성화된 Workbench 액세스를 요청하려면 이 페이지 상단의 미리 보기 양식을 사용하세요.

## Workbench에 연결 {#connect-to-workbench}

### MCP 서버를 통한 연결 {#connecting-with-the-mcp-server}

[Datadog MCP 서버][2]를 사용하여 코딩 에이전트에서 Workbench 인스턴스를 생성하고 관리합니다. 에이전트에 추가하려면 [Datadog MCP 서버 설정][7]을 참조하세요. MCP 서버는 Workbench를 다음 세 가지 도구로 제공합니다.

<table style="width: 100%;">
  <thead>
    <tr>
      <th style="width: 50%;">도구</th>
      <th style="width: 50%;">설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="white-space: nowrap;"><code>create_datadog_database_workbench</code></td>
      <td>모니터링 대상 데이터베이스를 기반으로 샌드박스를 구축하고 준비가 완료될 때까지 기다립니다.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>get_datadog_database_workbench</code></td>
      <td>샌드박스가 준비되었는지 확인합니다.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>delete_datadog_database_workbench</code></td>
      <td>샌드박스를 삭제하여 연결 문자열을 무효화하고 컴퓨팅 리소스를 해제합니다.</td>
    </tr>
  </tbody>
</table>

에이전트가 인스턴스를 생성한 후에는 스키마를 읽고, 구문을 실행하고, 쿼리 실행 계획을 확인하고, 인덱스를 추가한 다음 실행 계획을 다시 확인할 수 있습니다. 실제 스키마, 인덱스 및 행 수를 기반으로 작동합니다.

{{< img src="database_monitoring/database_monitoring_workbench/workbench_mcp_index_demo.mp4" alt="코딩 에이전트가 Datadog MCP 서버를 통해 Workbench 샌드박스를 생성하고, 운영 환경의 행 수를 불러오고, 순차 스캔을 인덱스 스캔으로 전환하는 인덱스를 추가한 다음 샌드박스를 삭제하는 과정" video="true" >}}

### API를 통한 연결 {#connecting-with-the-api}

Workbench API를 사용하여 스크립트나 CI 작업에서 Workbench 인스턴스를 생성합니다.

인스턴스를 생성하려면 모니터링 대상 데이터베이스의 이름을 지정하는 `POST` 요청을 보냅니다.

```shell
curl -X POST "{{< region-param key="dd_api" >}}/api/unstable/databases/workbench/session" \
  -H "DD-API-KEY: <DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "database_instance": "orders-db-primary",
    "database_name": "shop"
  }'
```

애플리케이션 키는 **Database Monitoring Read** 권한이 있는 사용자 또는 서비스 계정에 속해야 합니다. 조직에 Workbench가 활성화되어 있지 않으면 API는 `403`을 반환합니다.

| 파라미터 | 설명 |
| --------- | ----------- |
| <code style="white-space: nowrap;">database_instance</code> | Database Monitoring에서의 인스턴스 이름 |
| <code style="white-space: nowrap;">database_name</code> | `database_instance` 내의 논리적 데이터베이스 이름 |
| <code style="white-space: nowrap;">populate</code> | 생성된 데이터 없이 인스턴스를 만들려면 `false`로 설정합니다. 자체 데이터를 불러오려면 [SQL 클라이언트로 연결](#connecting-with-a-sql-client)을 참조하세요. |

요청에 대한 응답으로 인스턴스 ID, 상태 및 Postgres 연결 문자열이 포함된 `202 Accepted`가 반환됩니다.

{{< code-block lang="json" >}}
{
  "id": "workbench-123",
  "status": "pending",
  "connection": {
    "dsn": "postgres://workbench:<TOKEN>@<WORKBENCH_HOST>:5432/bench?sslmode=require"
  }
}
{{< /code-block >}}

인스턴스 생성은 비동기식입니다. 준비 상태를 확인하려면 `status`가 `ready`가 될 때까지 `GET /api/unstable/databases/workbench/session/{id}`을 보냅니다. 응답에는 `expires_at`도 포함됩니다.

인스턴스는 `ttl_seconds`에 설정된 시간이 지나면 만료되며, 기본값은 1,800초(30분)입니다. 요청에서 TTL을 설정할 수 없습니다.

인스턴스를 삭제하려면 `DELETE /api/unstable/databases/workbench/session/{id}`를 보냅니다. 요청이 성공하면 `204`를 반환합니다.

<div class="alert alert-danger">연결 문자열은 실제 데이터베이스에 액세스할 수 있는 자격 증명입니다. 시크릿으로 취급하고 커밋하거나 로그에 기록하거나 공유 채널에 붙여넣지 마세요. 작업이 끝나면 인스턴스를 삭제합니다. 인스턴스가 만료되거나 삭제되면 연결이 종료되고 모든 데이터가 폐기됩니다.</div>

### SQL 클라이언트를 통한 연결 {#connecting-with-a-sql-client}

MCP 서버 또는 API에서 받은 연결 문자열을 `psql`, GUI 또는 ORM 테스트 하네스 등 원하는 Postgres 클라이언트에서 사용합니다.
{{< code-block lang="shell" >}}
psql "postgres://workbench:<TOKEN>@<WORKBENCH_HOST>:5432/bench?sslmode=require"
{{< /code-block >}}

인스턴스에 데이터를 쓸 수 있으므로 인덱스를 생성하고 `EXPLAIN`을 다시 실행한 다음 실행 계획을 비교할 수 있습니다. 예시는 [Workbench 사용 방법](#how-to-use-workbench)을 참조하세요. 인스턴스가 만료되거나 삭제되면 열려 있는 연결이 종료되고 실행 중인 쿼리가 실패할 수 있습니다.

기본적으로 Workbench는 인스턴스에 합성 데이터를 채웁니다. 대신 자체 데이터를 사용하려면 API 요청에 `"populate": false`를 포함하여 인스턴스를 생성합니다. 그런 다음 `INSERT`, `COPY FROM STDIN` 또는 `psql``\copy` 명령으로 데이터를 불러온 후 `ANALYZE`를 실행합니다. 불러올 수 있는 데이터의 양은 인스턴스 리소스와 TTL에 따라 제한됩니다.

## Workbench 사용 방법 {#how-to-use-workbench}

[MCP 서버](#connecting-with-the-mcp-server) 또는 [API](#connecting-with-the-api)로 인스턴스를 생성하고 [SQL 클라이언트](#connecting-with-a-sql-client)로 연결합니다. 그런 다음 이 섹션에서 설명하는 작업에 인스턴스를 사용합니다.

### 변경 전후의 쿼리 실행 계획 비교 {#compare-query-plans-before-and-after-a-change}

쿼리를 작성할 때 풀 리퀘스트를 생성하기 전에 해당 쿼리의 실행 계획을 확인합니다. Database Monitoring에서 느린 쿼리를 발견한 후 이 단계에 따라 쿼리 재작성 결과를 테스트할 수도 있습니다. 쿼리가 실행된 데이터베이스에 대한 인스턴스를 생성합니다.

인스턴스에서 `EXPLAIN`을 실행하고 운영 환경과 유사한 행 수와 카디널리티를 기준으로 실행 계획을 확인합니다.

{{< code-block lang="sql" >}}
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM orders
WHERE customer_id = 42 AND created_at > '2026-01-01'
ORDER BY created_at DESC;
{{< /code-block >}}

실행 계획에 `Sort -> Seq Scan on orders`가 표시되면 쿼리가 테이블 전체를 스캔한다는 의미입니다. 인스턴스에 복합 조건 인덱스를 추가하고 실행 계획을 다시 생성한 다음 인덱스 스캔으로 변경되는지 확인합니다.

{{< code-block lang="sql" >}}
CREATE INDEX idx_orders_customer_created ON orders (customer_id, created_at DESC);
{{< /code-block >}}

그런 다음 쿼리와 함께 인덱스를 배포합니다. 느린 쿼리의 경우 재작성 전후의 실행 계획을 비교하고 결과를 풀 리퀘스트에 포함합니다. 운영 환경을 변경하거나 운영 데이터에 대한 액세스 권한을 요청하지 않고도 쿼리 재작성 결과를 테스트할 수 있습니다.

### 인덱스에 의존하는 쿼리 확인 {#check-which-queries-depend-on-an-index}

사용하지 않는 인덱스를 삭제하면 쓰기 처리량과 스토리지 사용량을 줄일 수 있지만, 쿼리가 의존하는 인덱스를 삭제하면 인시던트가 발생할 수 있습니다. 먼저 인스턴스에서 인덱스 삭제를 테스트합니다. 해당 인스턴스에서 인덱스를 삭제해도 운영 환경에는 영향을 주지 않습니다.

1. [쿼리 메트릭][3]에서 상위 쿼리를 확인합니다.
2. 각 쿼리에 대해 `EXPLAIN`을 실행하고 실행 계획을 저장합니다.
3. 인스턴스에서 인덱스를 삭제합니다.
4. 각 쿼리에 대해 `EXPLAIN`을 다시 실행하고 실행 계획을 비교합니다.

{{< code-block lang="sql" >}}
EXPLAIN SELECT id, total FROM orders WHERE status = 'pending' ORDER BY created_at;
--  Index Scan using idx_orders_status on orders  (cost=0.42..88.20 rows=312 width=20)

DROP INDEX idx_orders_status;

EXPLAIN SELECT id, total FROM orders WHERE status = 'pending' ORDER BY created_at;
--  Seq Scan on orders  (cost=0.00..14200.00 rows=312 width=20)
{{< /code-block >}}

실행 계획이 순차 스캔으로 되돌아가는 쿼리는 해당 인덱스에 의존하는 쿼리입니다. 검증되지 않은 주관적인 추측에 의존하지 말고 해당 실행 계획을 검토에 활용합니다. 대신 새 인덱스를 테스트하려면 인스턴스에 인덱스를 생성하고 쿼리의 실행 계획을 다시 생성합니다.

### 배포 전 마이그레이션 테스트 {#test-a-migration-before-you-deploy-it}

마이그레이션 문제는 테이블 크기와 동시 트래픽의 영향을 받는 경우가 많아 로컬 테스트 데이터베이스에서는 발견하지 못할 수 있습니다. 예:

- `CREATE INDEX CONCURRENTLY`여야 하지만 `CREATE INDEX`로 생성되어 인덱스 빌드가 진행되는 동안 쓰기 잠금을 유지하는 경우
- 항상 사용 중인 테이블에 예상보다 강한 잠금을 설정하는 `ALTER`

마이그레이션을 테스트하려면 인스턴스의 연결 문자열을 사용하여 마이그레이션 도구로 해당 인스턴스에서 마이그레이션을 실행합니다. DDL이 실행되는 동안 `pg_locks`를 쿼리하여 어떤 잠금이 설정되는지 확인합니다. 그 후, 주요 쿼리의 실행 계획을 다시 생성하여 새 스키마가 미치는 영향을 확인합니다.

테스트 마이그레이션은 운영 환경에서보다 시간이 적게 걸리지만 구조적으로 동일한 결과를 생성합니다.

### CI에서 쿼리 실행 계획의 성능 회귀 탐지 {#catch-plan-regressions-in-ci}

[API](#connecting-with-the-api)를 사용하여 파이프라인에 실행 계획 검사를 추가합니다. SQL 또는 스키마를 수정하는 각 풀 리퀘스트에 대해 다음 작업을 수행합니다.

1. 인스턴스를 생성합니다.
2. 상태가 `ready`가 될 때까지 폴링합니다.
3. 데이터를 준비합니다.
4. 변경 전후의 실행 계획을 비교하려면 `EXPLAIN`을 사용하여 기준 실행 계획을 캡처합니다.
5. 변경 사항을 적용합니다.
6. 상위 쿼리에 대해 `EXPLAIN`을 실행합니다.
7. 실행 계획이 불변 조건 중 하나라도 위반하면 빌드를 실패 처리합니다.
8. 이전 단계가 실패하더라도 인스턴스를 삭제합니다.

불변 조건의 예시:

- 대규모 테이블에서 새로운 순차 스캔이 발생하지 않아야 함
- 임계 경로에 있는 쿼리의 실행 계획 구조가 변경되지 않아야 함
- 사용 중인 인덱스가 삭제되지 않아야 함

다음 스크립트는 CI 작업에서 이 흐름을 실행합니다. `curl`, `jq`, `psql` 및 다음 환경 변수가 필요합니다.

- `DD_API_KEY` 및 `DD_APP_KEY`: Datadog API 키와 애플리케이션 키입니다.
- `DD_SITE`: `datadoghq.com` 또는 `us3.datadoghq.com`과 같은 Datadog 사이트입니다. 기본값은 `datadoghq.com`입니다.
- `DB_INSTANCE` 및 `DB_NAME`: 인스턴스를 생성하는 데 사용할 `database_instance` 및 `database_name`

```shell
#!/usr/bin/env bash
set -euo pipefail
API="https://api.${DD_SITE:-datadoghq.com}/api/unstable/databases/workbench/session"
AUTH=(-H "DD-API-KEY: ${DD_API_KEY}" -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" -H "Content-Type: application/json")

# Create (returns 202 with id + connection.dsn)
resp=$(curl -sf -X POST "$API" "${AUTH[@]}" \
  -d "{\"database_instance\":\"${DB_INSTANCE}\",\"database_name\":\"${DB_NAME}\"}")
id=$(jq -r .id <<<"$resp")
dsn=$(jq -r .connection.dsn <<<"$resp")
trap 'curl -sf -X DELETE "$API/$id" "${AUTH[@]}" >/dev/null || true' EXIT  # always delete

# Wait for ready
for _ in $(seq 60); do
  status=$(curl -sf "$API/$id" "${AUTH[@]}" | jq -r .status)
  [ "$status" = ready ] && break; sleep 5
done
[ "$status" = ready ] || { echo "Workbench not ready: $status"; exit 1; }

# Apply the change, then EXPLAIN top queries
psql "$dsn" -v ON_ERROR_STOP=1 -f migrations/change.sql
psql "$dsn" -v ON_ERROR_STOP=1 -f ci/explain_top_queries.sql > plans.txt

# Fail on a broken invariant (example)
if grep -q "Seq Scan on orders" plans.txt; then echo "Plan regression"; exit 1; fi
```

이 예시에서 `migrations/change.sql`에는 변경 사항이 포함되어 있고, `ci/explain_top_queries.sql`에는 각 상위 쿼리에 대한 `EXPLAIN` 문이 포함되어 있습니다. 마지막 검사에서는 실행 계획에 `orders`에 대한 순차 스캔이 포함되어 있으면 작업을 실패 처리합니다. 이를 사용자 지정 불변 조건으로 대체합니다.

### 데이터 모델 변경 사항 실험 {#experiment-with-data-model-changes}

데이터 모델을 변경하는 것은 데이터베이스에서 수행할 수 있는 가장 위험한 작업 중 하나입니다. 테이블을 분할하거나 열 유형을 변경하거나 외래 키를 추가하면 쿼리가 중단되거나 읽기 및 쓰기가 차단되거나 운영 데이터에서 작업이 실패할 수 있습니다. 이러한 변경 사항 대부분은 되돌리기 어렵습니다.

Workbench 인스턴스에서는 실제 스키마를 사용하여 실험할 수 있습니다. 변경 사항을 적용해 보고, 변경된 스키마에서 조인과 쿼리를 실행하고, 외래 키 관계를 추적하여 어떤 테이블이 크고 어떤 테이블이 조회용 테이블인지 확인합니다. 문제가 발생하면 인스턴스를 삭제하고 새 인스턴스를 생성합니다.

기본 합성 데이터를 사용하면 Workbench에 고객 데이터가 포함되지 않으므로 개인정보 보호 검토가 필요하지 않습니다.

## 제한 사항 {#limitations}

Workbench는 스키마, 쿼리 실행 계획 및 상대적 비용에 관한 정보를 제공합니다. 운영 환경의 하드웨어, 데이터 또는 모든 스키마 객체를 재현하지는 않습니다.

- **Postgres만 지원됩니다.** Workbench는 Postgres 12부터 18까지 지원합니다. 다른 데이터베이스 엔진은 지원되지 않습니다.
- **소요 시간이 다를 수 있습니다.** 인스턴스의 규모가 작으며 운영 환경의 하드웨어와 동일한 규모로 구성되지 않습니다. '이 쿼리는 40ms가 소요됩니다'와 같은 절대적인 실행 시간이 아니라 실행 계획의 구조, 예상 행 수, 인덱스 사용 여부, 변경 전후의 결과를 비교합니다. 재작성 또는 인덱스를 벤치마킹하려면 [Bits Database Optimization][4]을 사용합니다.
- **생성된 데이터는 실제 데이터와 근사하게 구성됩니다.** 기본적으로 Workbench는 수집된 통계를 기반으로 행을 생성하므로 테이블 크기가 운영 환경과 비슷합니다. 데이터 편향, 열 상관관계 및 값 분포가 다를 수 있으며, 이에 따라 이러한 특성에 의존하는 실행 계획이 달라질 수 있습니다. Workbench에 자체 데이터를 채우면 이러한 차이를 방지할 수 있습니다.
- **일부 인덱스 및 외래 키가 누락될 수 있습니다.** Workbench는 인덱스나 외래 키를 생략하거나 사용할 수 없는 함수를 호출하는 식을 제거할 수 있습니다.
- **뷰, 함수, 트리거, 역할 및 권한은 재구성되지 않습니다.** 이에 의존하는 변경 사항은 정확하게 재현되지 않습니다.
- **인스턴스는 일시적입니다.** 인스턴스는 기본적으로 30분 후에 만료되므로 계속 사용해야 하는 인스턴스는 새로 생성합니다. 테이블 수가 일정 기준을 초과하면 스키마가 완전히 구체화되지 않습니다.

Workbench를 사용하여 구조, 쿼리 실행 계획 및 대략적인 영향 규모를 확인할 수 있습니다. 그 외의 영향은 확인할 수 없습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/database_monitoring/schema_explorer/
[2]: /ko/mcp_server/
[3]: /ko/database_monitoring/query_metrics/
[4]: /ko/database_monitoring/bits_database_optimization/
[5]: /ko/database_monitoring/
[6]: /ko/account_management/rbac/permissions/
[7]: /ko/mcp_server/setup/