---
title: 속도 제한
type: api
---
{{< h2-with-copy-btn >}}속도 제한{{< /h2-with-copy-btn >}}

많은 API 엔드포인트는 속도 제한이 적용됩니다. 특정 기간에 특정 요청 횟수를 초과하면 Datadog은 오류를 반환합니다.

속도 제한이 적용되면 응답 코드에서 429를 확인할 수 있습니다. `X-RateLimit-Period`에 지정된 시간을 기다린 후 다시 호출하거나 `X-RateLimit-Limit` 또는 `X-RateLimit-Period`보다 약간 더 긴 간격으로 호출하도록 변경할 수 있습니다.

[Datadog 고객 지원팀에 문의][1]하여 기본값에서 속도 제한을 늘릴 수 있습니다.

API 속도 제한 정책 관련:

- Datadog은 **데이터 포인트/메트릭 제출에 대해 속도 제한을 두지 않습니다**(메트릭 제출 속도 처리 방식에 대한 자세한 내용은 [메트릭 섹션][2] 참조). 제한 적용 여부는 계약에 따른 [사용자 지정 메트릭][3] 수량에 따라 달라집니다.
- 로그 전송을 위한 API에는 속도 제한이 없습니다.
- 이벤트 제출에 대한 속도 제한은 조직당 분당 `250,000`개 이벤트입니다.
- 엔드포인트별 속도 제한은 서로 다르며 아래에 설명된 헤더에 포함됩니다. 이러한 제한은 요청에 따라 늘릴 수 있습니다.

<div class="alert alert-danger">
위 목록은 Datadog API의 모든 속도 제한을 포괄하지는 않습니다. 속도 제한이 발생하는 경우 사용 중인 API와 해당 제한에 대한 자세한 내용은 <a href="https://www.datadoghq.com/support/">지원팀</a>에 문의하세요.</div>

| 속도 제한 헤더      | 설명                                              |
| ----------------------- | -------------------------------------------------------- |
| `X-RateLimit-Limit`     | 특정 기간에 허용되는 요청 수             |
| `X-RateLimit-Period`    | 재설정 주기(초)(달력 기준) |
| `X-RateLimit-Remaining` | 현재 기간 동안 남은 허용 요청 수  |
| `X-RateLimit-Reset`     | 다음 재설정까지 남은 시간(초)                        |
| `X-RateLimit-Name`      | 속도 제한 상향 요청에 사용할 속도 제한 이름            |

### Datadog API 사용량 메트릭 {#datadog-api-usage-metrics}

모든 Datadog API에는 특정 기간에 대한 사용량 제한이 있습니다. API는 사용 중인 리소스에 따라 각각 고유한 속도 제한 버킷을 가질 수도 있고 하나의 버킷으로 그룹화될 수도 있습니다. 예를 들어, 모니터 상태 API에는 사람이나 자동화 스크립트가 분당 정해진 횟수만 쿼리할 수 있도록 하는 속도 제한이 있습니다. 엔드포인트는 초과 요청을 429 응답 코드와 함께 거부하며 재설정 기간이 끝날 때까지 요청 빈도를 줄이라는 안내를 제공합니다. API 사용량 메트릭을 통해 Datadog 사용자는 API 엔드포인트(메트릭, 로그 및 이벤트 제출 엔드포인트 제외)의 API 속도 제한 사용량을 직접 확인하고 감사할 수 있습니다. 다음 대시보드, 메트릭 및 태그를 사용하여 허용 및 차단된 요청을 조회하세요.

이러한 메트릭의 사전 구축된 보기는 [Datadog API Rate Limit Visibility dashboard][5]에서 조회할 수 있습니다. 대시보드를 열기 전에 이 페이지의 사이트 선택기에서 Datadog 사이트를 선택하세요.

#### 속도 제한 가시성 메트릭 {#rate-limit-visibility-metrics}

속도 제한 가시성 메트릭은 `datadog.apis.rate_limit.usage.*` 네임스페이스를 사용합니다. 메트릭 이름은 구성된 속도 제한의 범위를 나타냅니다.

| 범위 | 허용된 요청 | 차단된 요청 | 사용률 |
|-------|------------------|------------------|-------------|
| 조직 | `datadog.apis.rate_limit.usage.per_org_count` | `datadog.apis.rate_limit.usage.per_org_blocked_count` | `datadog.apis.rate_limit.usage.per_org_pct` |
| 사용자 | `datadog.apis.rate_limit.usage.per_user_count` | `datadog.apis.rate_limit.usage.per_user_blocked_count` | `datadog.apis.rate_limit.usage.per_user_pct` |
| API 키 | `datadog.apis.rate_limit.usage.per_api_key_count` | `datadog.apis.rate_limit.usage.per_api_key_blocked_count` | `datadog.apis.rate_limit.usage.per_api_key_pct` |

허용된 요청 메트릭은 API가 허용한 요청 수를 집계합니다. 차단된 요청 메트릭은 속도 제한을 초과하여 API가 거부한 요청 수를 집계합니다. `*_pct` 메트릭은 총 시도된 요청(허용된 요청 + 차단된 요청)을 구성된 제한 대비 백분율로 보고하며, `100`은 사용률 100%를 나타냅니다. `100`을 초과하는 값은 제한을 초과하여 요청이 차단되었음을 나타냅니다.

대시보드 위젯의 경우 허용된 요청 및 차단된 요청 메트릭에 1분 단위 `sum(60s)` 롤업을 사용하여 분당 요청 수를 표시하세요. 최대 사용률을 표시하려면 해당 간격의 최대 `*_pct` 값을 사용하세요. 메트릭을 `+`와 결합할 때는 아래 쿼리 예시와 같이 각 항을 `default_zero()`로 감싸세요.

다음 게이지는 각 속도 제한 이름에 대해 구성된 요청 한도를 보고합니다. 메트릭 이름은 범위를 식별합니다.

| 범위 | 구성된 요청 제한 |
|-------|--------------------------|
| 조직 | `datadog.apis.rate_limit.usage.per_org_limit_count` |
| 사용자 | `datadog.apis.rate_limit.usage.per_user_limit_count` |
| API 키 | `datadog.apis.rate_limit.usage.per_api_key_limit_count` |

##### 사용 가능한 태그 {#available-tags}

| 태그 이름 | 설명 | 가용성 |
|----------|-------------|--------------|
| `app_key_id` | 요청과 연결된 애플리케이션 키 ID입니다. 요청에 애플리케이션 키를 사용하지 않는 경우 태그는 빈 값으로 표시됩니다. | 요청 수, 차단된 요청 수 및 사용률 메트릭 |
| `child_org_name` | 복사된 메트릭으로 표시되는 하위 조직의 표시 이름입니다. | `org_scope:child_org` |를 포함하는 모든 메트릭
| `limit_name` | 속도 제한의 이름입니다. 서로 다른 엔드포인트가 동일한 이름을 공유할 수 있습니다. | 모든 메트릭 |
| `org_scope` | 메트릭과 이를 조회하는 조직 간의 관계: 로, `current_org`는 해당 조직 자체 트래픽에 사용되고 `child_org`는 루트 조직에서 볼 수 있는 하위 조직 복사본에 사용됩니다. | 모든 메트릭 |
| `user_uuid` | 요청과 연결된 사용자의 UUID입니다. | 요청 수, 차단된 요청 수 및 사용률 메트릭 |

하위 조직에서 메트릭을 조회할 때 해당 조직의 자체 메트릭은 `org_scope:current_org`를 사용합니다. `org_scope:child_org` 값과 `child_org_name` 태그는 루트 조직으로 전송된 추가 복사본에만 나타납니다.

##### 쿼리 예시 {#query-examples}

속도 제한 이름별 허용된 요청 수
: 세 가지 `*_count` 메트릭의 합계를 `limit_name`별로 그래프로 표시합니다.<br /><br />
  **예시:** `default_zero(sum:datadog.apis.rate_limit.usage.per_org_count{*} by {limit_name}) + default_zero(sum:datadog.apis.rate_limit.usage.per_user_count{*} by {limit_name}) + default_zero(sum:datadog.apis.rate_limit.usage.per_api_key_count{*} by {limit_name})`

속도 제한 이름별 차단된 요청 수
: 세 가지 `*_blocked_count` 메트릭의 합계를 `limit_name`별로 그래프로 표시합니다.<br /><br />
  **예시:** `default_zero(sum:datadog.apis.rate_limit.usage.per_org_blocked_count{*} by {limit_name}) + default_zero(sum:datadog.apis.rate_limit.usage.per_user_blocked_count{*} by {limit_name}) + default_zero(sum:datadog.apis.rate_limit.usage.per_api_key_blocked_count{*} by {limit_name})`

#### 레거시 사용량 메트릭에서 마이그레이션 {#migrate-from-legacy-usage-metrics}

`datadog.apis.rate_limit.usage.*` 메트릭이 `datadog.apis.usage.*` 메트릭을 대체합니다. 다음 대체 항목을 사용하여 대시보드 및 모니터를 업데이트하세요. `rate_limit_status`로 필터링되지 않은 레거시 `datadog.apis.usage.*` 메트릭에 대한 쿼리는 허용된 요청과 차단된 요청을 함께 계산했습니다. 해당 합계를 유지하려면 `*_count` 대체 메트릭과 함께 해당 `*_blocked_count` 메트릭을 추가하세요.

| 레거시 메트릭 | 대체 메트릭 |
|---------------|--------------------|
| `datadog.apis.usage.per_org` | `datadog.apis.rate_limit.usage.per_org_count` |
| `datadog.apis.usage.per_org_ratio` | `datadog.apis.rate_limit.usage.per_org_pct` |
| `datadog.apis.usage.per_user` | `datadog.apis.rate_limit.usage.per_user_count` |
| `datadog.apis.usage.per_user_ratio` | `datadog.apis.rate_limit.usage.per_user_pct` |
| `datadog.apis.usage.per_api_key` | `datadog.apis.rate_limit.usage.per_api_key_count` |
| `datadog.apis.usage.per_api_key_ratio` | `datadog.apis.rate_limit.usage.per_api_key_pct` |

대체 메트릭은 다음과 같은 방식으로 레거시 메트릭과 다릅니다.

- 허용된 요청과 차단된 요청은 `rate_limit_status` 태그 대신 별도의 메트릭을 사용합니다. 레거시 상태 필터를 해당 허용된 요청 또는 차단된 요청 메트릭으로 바꾸세요. 사용률 메트릭은 허용된 요청과 차단된 요청을 결합합니다.
- `org_scope` 및 `child_org_name` 태그가 레거시 `child_org` 태그를 대체합니다. 루트 조직에서 `org_scope:child_org`로 필터링하고 `child_org_name`을 사용하여 하위 조직의 표시 이름별로 필터링하거나 그룹화합니다. 조회 조직 자체 트래픽에는 `org_scope:current_org`를 사용하세요.
- `limit_count` 및 `limit_period` 태그는 포함되지 않습니다. 구성된 요청 제한에 해당하는 `*_limit_count` 게이지를 사용하세요. `X-RateLimit-Period` 응답 헤더에서 속도 제한 기간을 확인하세요.

### 속도 제한 상향 요청 {#increase-your-rate-limit}
**Help** > **New Support Ticket**에서 아래 세부 정보를 포함한 지원 티켓을 생성하여 속도 제한 상향을 요청할 수 있습니다. 속도 제한 상향 요청이 접수되면 Support Engineering 팀이 요청을 사례별로 검토하고, 필요한 경우 내부 엔지니어링 리소스와 협력하여 요청의 실행 가능성을 확인합니다.

    Title:
        Request to increase rate limit on endpoint: X

    Details:
        We would like to request a rate limit increase for API endpoint: X
        Example use cases/queries:
            Example API call as cURL or as URL with example payload

        Motivation for increasing rate limit:
            Example - Our organization uses this endpoint to right size a container before we deploy. This deployment takes place every X hours or up to Y times per day.

        Desired target rate limit:
            Tip - Having a specific limit increase or percentage increase in mind helps Support Engineering expedite the request to internal Engineering teams for review.

Datadog 지원팀이 사용 사례를 검토하고 승인하면 내부적으로 속도 제한 상향을 적용할 수 있습니다. Datadog의 SaaS 특성상 속도 제한을 늘릴 수 있는 상한이 있다는 점에 유의하세요. Datadog 지원팀은 사용 사례 및 엔지니어링 권장 사항에 따라 속도 제한 상향을 거부할 권리가 있습니다.

### 감사 로그 {#audit-logs}
API 제한 및 사용량 메트릭은 사용 패턴과 차단된 요청에 대한 인사이트를 제공합니다. 추가 세부 정보가 필요한 경우 Audit Trail을 통해 API 활동을 더 세부적으로 확인할 수 있습니다.

Audit Trail을 사용해 다음과 같은 데이터를 조회할 수 있습니다.
* **IP 주소 및 지리적 위치** – API 요청이 어디에서 발생했는지 식별합니다.
* **액터 유형** – 서비스 계정과 사용자 계정을 구분합니다.
* **API 키와 앱 키 인증 비교** – 요청이 API 키를 통해 이루어졌는지 또는 사용자가 직접 수행했는지 확인합니다.
* **연관 이벤트** – 구성 변경이나 보안 관련 작업 등 동시에 발생하는 다른 이벤트를 조회합니다.

Audit Trail은 API 사용량 및 차단된 요청에 대한 추가 컨텍스트를 제공하여 팀의 속도 제한 문제 해결을 지원합니다. 또한 보안 및 규정 준수 목적으로 조직 전체의 API 사용량을 추적할 수 있습니다.

API 활동을 더 자세히 확인하려면 **[Audit Trail][4]**을 사용해 보세요.


[1]: /ko/help/
[2]: /ko/api/v1/metrics/
[3]: /ko/metrics/custom_metrics/
[4]: /ko/account_management/audit_trail/events/
[5]: https://app.datadoghq.com/dash/integration/datadog_api_rate_limit_visibility