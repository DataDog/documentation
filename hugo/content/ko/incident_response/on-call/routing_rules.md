---
aliases:
- /ko/service_management/on-call/processing_rules/
- /ko/service_management/on-call/routing_rules/
further_reading:
- link: /incident_response/on-call/
  tag: 설명서
  text: Datadog On-Call
title: 라우팅 규칙
---
## 개요 {#overview}

라우팅 규칙은 팀 내에서 경보가 전달되는 방식을 결정합니다. 모든 경보를 단일 에스컬레이션 정책을 통해 보내는 대신, 우선순위, 태그, 모니터링 상태 또는 시간대와 같은 메타데이터를 기반으로 경보를 라우팅하는 규칙을 생성할 수 있습니다.

## 라우팅 규칙 생성 {#create-a-routing-rule}

규칙은 위에서 아래로 평가됩니다. 마지막 규칙은 일치하지 않는 모든 경보를 에스컬레이션 정책으로 라우팅하는 폴백이어야 합니다.

라우팅 규칙을 생성하는 방법은 다음과 같습니다.

1. [**On-Call** > **Teams**][1]로 이동하여 팀을 선택합니다.
1. **Page Routing** 섹션을 찾아 **Edit**을 클릭합니다. **Configure Page Routing** 창이 열립니다.
 
   {{< img src="incident_response/on-call/routing_rules/configure-page-routing2.png" alt="라우팅 조건 필드와 대상 구성 옵션을 보여주는 Datadog On-Call의 페이지 라우팅 구성 창" style="width:100%;" >}}

1. 라우팅 규칙을 추가하려면 **Add Conditions**를 클릭합니다. 
1. [라우팅 규칙 구문](#routing-rule-syntax)을 사용하여 일치 쿼리를 정의합니다.
1. 필요하다면 [지원 시간](#support-hours)을 설정하세요.

   1. **Use support hours**를 켭니다.
   1. 시간 간격을 추가하려면 **Add**를 클릭하세요. 각 간격마다 시간대와 요일을 선택한 다음 시작 시간과 종료 시간을 설정합니다.
   1. 필요하다면 **Outside support hours, hold escalation policy notifications until the next window** 토글을 활성화하세요.

   {{< img src="incident_response/on-call/routing_rules/page-routing-support-hours.png" alt="시간 간격 필드와 지원 시간 외에 에스컬레이션 정책 알림을 보류하는 옵션을 보여주는 라우팅 조건의 지원 시간 구성 패널" style="width:60%;" >}}

1. **Set targets** 아래에서 **Add**를 클릭하고 대상 유형을 선택합니다. 대상 유형은 규칙이 일치할 때 수행할 작업을 결정합니다.
   - **Page escalation policy**: [에스컬레이션 정책][3]을 선택하고 긴급도를 `DYNAMIC` (경보 상태 기준), `HIGH` 또는 `LOW`로 설정합니다.
   - **Send Slack message** (미리 보기): Slack 워크스페이스와 채널을 선택합니다.
   - **Send Microsoft Teams message** (미리 보기): Teams 테넌트, 팀, 채널을 선택합니다.
   - **Run Workflow** (미리 보기): 기존 [워크플로][4]를 선택합니다.
   - **Sync with a ServiceNow Incident** (미리 보기): ServiceNow 연결을 선택합니다. Datadog은 각 페이지에 대한 ServiceNow 인시던트를 생성하고 동기화 상태를 유지합니다. [Datadog On-Call과 ServiceNow 통합][5]을 참조하세요.

1. **Page escalation policy**를 선택한 경우, 필요에 따라 [Acknowledgment timeout](#acknowledgment-timeout)을 설정하세요.
   1. **Acknowledgment timeout**을 켭니다.
   1. 제한 시간을 설정합니다.

1. 필요에 따라 규칙을 더 추가하고 **Save**를 클릭합니다.

### 라우팅 규칙 구문 {#routing-rule-syntax}

라우팅 규칙은 [Datadog 쿼리 구문][2]을 사용하며 다중 `if/else` 조건을 지원합니다.

<div class="alert alert-info">라우팅 규칙 구문은 대소문자를 구분합니다. 예를 들어, <code>tags.env:Prod</code> 일치하지 않음 <code>tags.env:prod</code></div>

**지원되는 속성:**

| 속성      | 설명                                                                 | 예시                               |
|----------------|-----------------------------------------------------------------------------|---------------------------------------|
| `tags`         | 수신 경보의 태그                                                  | `tags.env:prod`                       |
| `groups`       | 모니터 그룹 이름                                                         | `groups.service:checkout-service`     |
| `priority`     | 모니터링 우선순위(1~5)                                                      | `priority:(1 OR 2)`                   |
| `alert_status` | 모니터링 상태(`error`, `warn`, `success`)                                 | `alert_status:(error OR warn)`        |

### 지원 시간 {#support-hours}

지원 시간은 에스컬레이션 정책이 담당자에게 알림을 보낼 수 있는 시간을 정의합니다.

라우팅 규칙에 지원 시간이 포함된 경우, Datadog은 현재 시간을 구성된 간격과 비교하여 다음 작업을 수행합니다.
- **지원 시간 내**: Datadog은 에스컬레이션 정책을 즉시 실행하고 담당자에게 알림을 보냅니다.
- **지원 시간 외**:
  - **Outside support hours, hold escalation policy notifications until the next window**가 활성화된 경우, Datadog은 페이지를 즉시 생성하지만 다음 지원 시간대가 시작될 때까지 에스컬레이션 정책 알림을 연기합니다. Datadog은 지연을 기록하기 위해 타임라인 항목을 추가합니다.
  - 이 옵션이 비활성화된 경우, Datadog은 라우팅 규칙을 건너뛰고 페이지를 생성하지 않습니다. 그런 다음 이어지는 규칙 중 일치하는 규칙을 평가합니다.

#### 지원 시간 구성 예시 {#example-support-hour-configurations}

**참고**: 다음 예시는 **Outside support hours, hold escalation policy notifications until the next window** 토글이 활성화되어 있다고 가정합니다.

{{% collapse-content title="표준 업무 시간" level="h5" %}}

간격 1개를 추가하세요. 월요일~금요일을 선택하고 시간 범위를 오전 9시~오후 5시로 설정한 다음 `America/New_York` 시간대를 선택합니다. 이 시간대 외에 생성된 페이지는 다음 주 월요일 오전 9시까지 연기됩니다.

{{< img src="incident_response/on-call/routing_rules/support-hours-biz.png" alt="월요일부터 금요일까지 오전 9시부터 오후 5시까지의 시간 간격이 정의된 지원 시간 팝업 모달" style="width:60%;" >}}

{{% /collapse-content %}}

{{% collapse-content title="분할 지원 근무(오전 및 오후)" level="h5" %}}

간격 2개를 추가하세요. 첫 번째는 오전 9시~오후 12시, 두 번째는 오후 2시~오후 6시로 설정하고 두 간격 모두 월요일~금요일을 선택합니다. 오후 12시에서 오후 2시 사이에 도착한 페이지는 오후 시간대가 시작될 때까지 연기됩니다.

{{% /collapse-content %}}

### Acknowledgment timeout {#acknowledgment-timeout}

에스컬레이션 정책을 대상으로 추가할 때 **Acknowledgment timeout**을 활성화할 수 있습니다. 이 옵션을 활성화하면 페이지가 확인되었지만 설정된 시간 내에 해결되지 않은 경우에 Datadog이 해당 페이지를 다시 triggered 상태로 변경하고 현재 On-Call 담당자에게 한 번 더 알림을 보냅니다.

Acknowledgment timeout을 설정하는 방법은 다음과 같습니다.

1. **Set targets**에서 **Page escalation policy**를 대상 유형으로 선택합니다.
1. **Acknowledgment timeout**을 켭니다.
1. 제한 시간을 설정합니다.

### Slack 및 Microsoft Teams의 페이지 {#pages-in-slack-and-microsoft-teams}

{{< img src="incident_response/on-call/routing_rules/page_in_slack_or_ms_teams.png" alt="수신되는 모든 페이지를 Slack 및 Microsoft Teams로 라우팅하는 라우팅 규칙 예시" style="width:100%;" >}}

페이지를 Slack 또는 Microsoft Teams로 라우팅하면 Datadog은 설정된 채널로 알림을 보내고 페이지를 생성합니다. 팀 구성원은 버튼을 사용하여 페이지를 확인하거나 에스컬레이션하거나 해결할 수 있습니다.

{{< img src="incident_response/on-call/routing_rules/page_representation_in_slack.png" alt="확인, 에스컬레이션 또는 해결 버튼이 포함된 Slack의 페이지 알림" style="width:70%;" >}}

사용자가 Slack 또는 Teams에서 페이지를 확인하거나 해결하면 Datadog은 추가 메시지를 보내지 않고 기존 알림을 업데이트합니다. 이렇게 하면 알림 수를 줄이고 원래 스레드에서 현재 페이지 상태를 계속 확인할 수 있습니다.

## 라우팅 규칙 예시 {#routing-rule-examples}

- **우선순위별 경보 라우팅**
  - **우선순위 1**은 기본 에스컬레이션 정책으로 경보를 라우팅합니다.
  - **우선순위 2~4**는 Slack 또는 Microsoft Teams로 경보를 라우팅합니다.

- **시간대별 경보 라우팅:**
  - 업무 시간 중에는 경보를 에스컬레이션 정책으로 라우팅합니다.
  - 업무 시간 외에는 중요 경보를 에스컬레이션 정책으로 라우팅하고 중요하지 않은 경보는 Slack 또는 Teams 채널로 라우팅합니다.

- **지원 시간 외 에스컬레이션 지연**
  - 라우팅 조건에서 [지원 시간](#support-hours)을 정의하여 다음 활성 시간대까지 에스컬레이션 정책 알림을 보류하세요.

- **`DYNAMIC` 긴급도를 사용하여 모니터링 경보 상태에 따라 긴급도를 설정합니다.** 
  - 모니터링 경보 상태가 `warn`인 경우, 긴급도를 `LOW`로 설정합니다.
  - 모니터링 경보 상태가 `error`인 경우, 긴급도를 `HIGH`로 설정합니다.

  긴급도는 담당자의 알림 기본 설정에 따라 알림을 받는 방식을 결정합니다.

## 모범 사례 {#best-practices}

- **가시성과 긴급도의 균형 유지**
  - 즉각적인 조치가 필요한 중요 경보에는 호출 및 에스컬레이션 정책을 사용하세요.
  - 상황을 파악해야 하지만 온콜 대응까지는 필요하지 않은 심각도가 낮은 문제에는 Slack 또는 Teams를 사용하세요.

- **지원 시간을 사용하여 근무 외 시간에는 담당자에게 알림이 전송되지 않도록 설정**
  - 중요하지 않은 경보의 경우, 팀의 근무 시간에 맞춰 지원 시간을 구성하세요. Datadog은 즉시 페이지를 생성하지만 활성 시간대에만 대응 담당자에게 알림을 보냅니다.
  - 시간에 관계없이 즉각적인 주의가 필요한 중요 경보의 경우, 라우팅 규칙에 지원 시간을 구성하면 안 됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/on-call/teams
[2]: /ko/tracing/trace_explorer/query_syntax/
[3]: /ko/incident_response/on-call/escalation_policies/
[4]: /ko/actions/workflows/
[5]: /ko/incident_response/on-call/integrations/servicenow/