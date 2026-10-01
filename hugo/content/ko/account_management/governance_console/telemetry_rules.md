---
description: 텔레메트리 규칙을 사용하여 메트릭, 로그, 스팬의 태그, 인덱싱 및 기타 특성을 관리하세요.
further_reading:
- link: /api/latest/tag-rules/
  tag: 설명서
  text: 태그 가시성 및 적용 규칙 API
- link: /account_management/governance_console/
  tag: 설명서
  text: Governance Console
- link: /account_management/governance_console/controls
  tag: 설명서
  text: Governance Console 제어
- link: /metrics/guide/tag-indexing-rules/
  tag: 설명서
  text: 태그 인덱싱 규칙
- link: /metrics/guide/agent-filtering-for-custom-metrics
  tag: 설명서
  text: Custom Metrics에 대한 Agent 필터링
is_beta: true
private: true
title: 텔레메트리 규칙
---
{{< beta-callout url="#" btn_hidden="true" header="false" >}}
텔레메트리 규칙은 미리 보기로 제공되고 있습니다. 문제가 발생하거나 새로운 기능을 제안하려면 제품 UI의 Give Feedback 버튼을 사용하세요.
{{< /beta-callout >}}

## 개요 {#overview}

텔레메트리 규칙은 관리자가 Governance Console에서 메트릭, 로그 및 스팬의 특성을 관리하여 원치 않는 텔레메트리 비용을 절감하도록 돕습니다. 텔레메트리 규칙은 태그 지정 표준화, 수집 및 인덱싱된 볼륨 관리, 사용되지 않거나 중복된 텔레메트리 최소화를 도울 수 있습니다.

## 전제 조건 {#prerequisites}

텔레메트리 규칙을 보려면 `governance_console_read` 권한이 필요합니다. 규칙을 생성, 편집 또는 삭제하려면 `telemetry_rules_write` 권한 또는 Datadog Admin 역할이 필요합니다. 규칙에서 필터링을 활성화하려면 `telemetry_rules_enforcement_write` 권한이 필요합니다.

<div class="alert alert-info">일부 규칙 유형은 추가 권한이나 Agent 버전이 필요할 수 있습니다. 자세한 내용은 개별 규칙 유형 페이지를 참조하세요.</div>

## 텔레메트리 규칙 유형 {#telemetry-rule-types}

| 규칙 유형 | 텔레메트리 유형 | 적용 위치 | 설명 |
|---|---|---|---|
| 태그 가시성 및 적용 | 메트릭, 로그, 스팬 | 수집 | 텔레메트리 태그 및 값이 규정을 준수하는지 확인하고, 필요시 수집 시점에 규정을 준수하지 않는 텔레메트리를 삭제합니다. |
| 태그 인덱싱 | 메트릭 | 수집 | 특정 메트릭에 대해 인덱싱해야 하는 Custom Metrics 태그를 결정합니다. |
| 메트릭 이름 필터링 | 메트릭 | Agent | 수집 전 Datadog Agent에서 특정 이름의 Custom Metrics를 직접 삭제합니다. |

## 태그 가시성 및 적용 규칙 {#tag-visibility-and-enforcement-rules}

### 태그 가시성 규칙 생성{#create-a-tag-visibility-rule}

1. [Governance Console > Telemetry](https://app.datadoghq.com/governance/telemetry)로 이동하여 **+ Create New Rule**을 클릭합니다.
2. 신호 유형(**메트릭**, **APM** 또는 **로그**)과 **태그 가시성 및 적용** 규칙 유형을 선택합니다.
3. 범위를 선택합니다. **모든 [스팬/메트릭/로그]**를 선택하여 선택한 유형의 모든 텔레메트리에 규칙을 적용합니다. **선택된 [스팬/메트릭/로그]**를 선택하여 규칙 범위를 하위 집합으로 지정한 다음, 태그 쿼리를 입력합니다(예: `service:web-store` 또는 `env:prod AND team:payments`). Datadog 모니터 및 대시보드에서 사용되는 것과 동일한 쿼리 구문이 여기에 적용됩니다.
4. 태그 키를 정의합니다. 적용하려는 태그 키를 입력합니다(예: `env` 또는 `team`). **Tag key must be present**를 선택하여 해당 키가 없는 텔레메트리를 비준수 상태로 플래그 지정합니다.

   <div class="alert alert-info"><strong>Tag key must be present</strong>를 선택하지 않으면 규칙은 지정된 태그 키가 이미 있는 텔레메트리만 평가합니다. 키가 없는 텔레메트리는 평가되지 않으며 준수하는 것으로 간주됩니다.</div>
5. 태그 값을 지정합니다. **Allowed tag values**를 선택하여 allowlist를 정의하거나, **Disallowed tag values**를 선택하여 denylist를 정의합니다. 값을 쉼표로 구분된 목록으로 입력합니다. 와일드카드가 지원됩니다(예: `us*`는 `us-east-1` 및 `us-west-2`와 일치).
6. 규칙 이름을 지정합니다. 규칙이 적용하는 내용에 대한 설명을 입력합니다(예: *모든 리소스에 팀 태그 필수*).

   <div class="alert alert-info"><strong>Filter data at ingest</strong>는 규칙을 생성한 후에만 전환할 수 있습니다.</div>
7. **Create Rule**을 클릭합니다.

{{< img src="account_management/governance_console/telemetry_rules/creating_telemetry_rule.mp4" alt="Governance Console에서 태그 가시성 규칙 생성" video="true" style="width:100%;" >}}

### 태그 가시성 규칙 준수 검토 {#review-tag-visibility-rule-compliance}

태그 가시성 규칙을 생성하면 Datadog은 일치하는 모든 텔레메트리의 준수 여부를 추적하기 시작합니다. 규칙을 열어 다음을 확인하세요.

- **규정 준수 점수**: 선택한 시간 범위 동안 계산된 규칙을 충족하는 범위 내 스팬, 메트릭 또는 로그 이벤트의 백분율입니다. 규정 준수 점수가 100%라는 것은 일치하는 모든 텔레메트리가 규칙을 준수함을 의미합니다. 점수가 0%라는 것은 일치하는 텔레메트리 중 규칙을 준수하는 것이 하나도 없음을 의미합니다.
- **시간 경과에 따른 점수**: 준수 추세를 보여주는 차트입니다. 시간 선택기를 사용하여 원하는 시간 범위에 따른 추세를 확인하세요. 이 차트는 메트릭에 사용할 수 없으며, 메트릭 기록은 최근 8시간으로 제한됩니다.
- **비준수 텔레메트리**: 규칙을 위반하는 개별 스팬, 메트릭 또는 로그 이벤트를 서비스 이름, 리소스 및 신호별 추가 세부 정보와 함께 보여주는 표입니다. 행을 클릭하여 해당 텔레메트리에 대한 자세한 내용을 확인하세요. 스팬에 대한 규칙의 경우, **View in Trace**를 클릭하여 비준수 스팬을 Trace Explorer에서 직접 여세요.

### 필터링을 통한 태그 준수 강제 적용 {#enforce-tag-compliance-through-filtering}

태그 가시성 규칙을 생성하고 검토한 후, 수집 시점에 비준수 텔레메트리를 필터링하여 이를 강제 적용할 수 있습니다.

<div class="alert alert-warning">필터링 규칙을 잘못 구성하면 영구적인 데이터 손실이 발생할 수 있습니다. 태그 가시성 규칙을 생성한 후 필터링을 활성화하기까지 5분의 필수 대기 시간이 있습니다.</div>

필터링을 활성화하려면 다음 단계를 따르세요.

1. 관련 태그 가시성 규칙으로 이동하여 엽니다.
2. 규칙 설명, 규정 준수 점수 및 비준수 텔레메트리를 주의 깊게 검토합니다.
3. **Rule action** 아래에서 **Filter data at ingest**를 토글하여 규칙을 강제 적용합니다.
4. 필수 텍스트를 입력하고 제출하여 필터링 적용을 확인합니다.

규칙은 수집 시점에서 비준수 텔레메트리를 즉시 필터링하기 시작합니다. 비준수 텔레메트리 샘플은 [Audit Trail](/account_management/audit_trail/)에 기록됩니다. 규칙으로 이동한 다음 표를 스크롤하거나 **View in Audit Trail**을 클릭하여 이러한 샘플을 조회할 수 있습니다.

{{< img src="account_management/governance_console/telemetry_rules/enforcing_telemetry_rule.mp4" alt="태그 가시성 규칙 강제 적용 및 필터링된 텔레메트리 보기" video="true" style="width:100%;" >}}

## 규칙 편집 또는 삭제 {#edit-or-delete-a-rule}

규칙 행의 **⋮** 메뉴를 클릭하여 편집하거나 삭제하세요. 규칙이 현재 텔레메트리를 필터링하거나 삭제하고 있는 경우에도 편집 사항은 즉시 적용되며, 이전 규칙 준수 데이터는 보존되지 않습니다.

## 기타 규칙 {#other-rules}

Governance Console에서 메트릭에 대한 특정 규칙을 생성하고 관리할 수 있습니다. 또는 Metrics Settings에서 이러한 규칙을 관리할 수 있습니다. 규칙별 세부 정보는 아래의 참조 설명서를 확인하세요.

- [태그 인덱싱](/metrics/guide/tag-indexing-rules/)
- [메트릭 이름 필터링](/metrics/guide/agent-filtering-for-custom-metrics)

## 제한 사항 {#limitations}

- 신호 유형당 최대 10개의 규칙을 생성할 수 있습니다(스팬, 메트릭, 로그 각각 10개로 제한됨).
- 태그 가시성 및 적용 규칙은 최대 30개의 태그 값을 지정할 수 있습니다.
- 텔레메트리 규칙은 메트릭, 로그, 스팬 이외의 텔레메트리 유형에는 사용할 수 없습니다.

더 많은 규칙이나 태그 값이 필요한 태그 전략을 사용하는 경우, Datadog 계정 팀에 문의하여 한도 상향을 요청하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}