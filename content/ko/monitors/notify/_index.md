---
aliases:
- /ko/monitors/faq/how-do-i-add-custom-template-variables-to-my-monitor-message
- /ko/monitors/faq/how-do-i-setup-conditional-contacts-and-messages-in-a-single-monitor
- /ko/developers/faq/what-do-notifications-do-in-datadog
- /ko/monitors/notifications/
description: 모니터가 경보를 트리거할 때 팀에 알림 보내기
further_reading:
- link: /monitors/
  tag: 설명서
  text: 모니터 생성
- link: /monitors/manage/
  tag: 설명서
  text: 모니터 관리
- link: https://learn.datadoghq.com/courses/alert-monitor-notifications
  tag: 학습 센터
  text: 코스를 듣고 경보 모니터 알림 사용자 지정
- link: https://www.datadoghq.com/blog/monitor-notification-rules/
  tag: 블로그
  text: Datadog 모니터 알림 규칙을 사용해 모니터 경보 라우팅
title: Notifications
---
## 개요 {#overview}

Notifications는 모니터의 핵심 구성 요소로, 팀이 문제에 대한 정보를 계속 접할 수 있게 해 주고 문제 해결을 지원합니다. [모니터를 생성][1]할 때 응답이 다음과 같이 기능하도록 구성하세요.
- 실행 가능한 메시지를 작성합니다.
- 워크플로를 트리거하거나 모니터를 기반으로 워크플로를 생성합니다.
- [자동으로 케이스를 생성합니다][2].
- 자동으로 인시던트를 생성합니다.

## 효과적인 제목과 메시지 작성 {#constructing-effective-titles-and-messages}

이 방식으로 접근하면 모니터 제목과 메시지가 명확하고 실행 가능하고 독자의 요구 사항에 따라 맞춤 설정되도록 보장하는 데 도움이 됩니다.
- **고유한 제목**: 모니터에 고유한 제목을 추가하세요(이것은 필수임). 다중 경보 모니터의 경우, 트리거 범위를 나타내는 태그 몇 개가 자동으로 삽입됩니다. [태그 변수][3]를 사용하여 구체성을 강화할 수 있습니다.
- **메시지 필드**: 메시지 필드는 표준 [Markdown 형식 지정][4] 및 [변수][5]를 지원합니다. [조건 변수][6]를 사용하여 다양한 연락처에 전송되는 알림 텍스트를 [@notifications](#notifications)로 조절하세요. [synthetics 템플릿 변수][23]를 사용하면 synthetics 실패 컨텍스트를 포함해 경보 메시지를 강화할 수 있습니다.

<div class="alert alert-info"> Markdown 형식 지정 지원은 알림 방법에 따라 다릅니다. 채널에 따라 Markdown 구문의 일부만 지원하는 경우도 있습니다.
<ul> 
  <li/>Slack 알림: 기본 형식 지정을 지원합니다(굵게, 기울임꼴, 인라인 코드, 링크). Markdown 헤더(에: <code>#</code>, <code>##</code>) 및 표는 렌더링되지 않고, 일반 텍스트로 표시됩니다.
  <li/>이메일 알림: 기본 형식 지정을 지원합니다(굵게, 기울임꼴, 인라인 코드, 링크). 표는 Markdown 표로 렌더링되지 않고 메시지 본문에 일반 텍스트로 표시됩니다.
</ul>
</div>

{{% collapse-content title="모니터 메시지 예시" level="h4" expanded=false %}}
모니터 메시지의 일반적인 사용 사례는 문제를 해결할 단계별 방법을 포함하는 것입니다. 예를 들어 다음과 같습니다.

```text
{{#is_alert}} <-- conditional variable

Steps to free up disk space on {{host.name}}: <-- tag variable

1. Remove unused packages
2. Clear APT cache
3. Uninstall unnecessary applications
4. Remove duplicate files

@slack-incident-response <-- channel to send notification

{{/is_alert}}

```

{{% /collapse-content %}}


## 알림 수신자 {#notification-recipients}
Datadog에서는 모니터 알림을 관리하는 데 [모니터 알림 규칙][22] 사용을 권장합니다. 알림 규칙을 사용하면 미리 정의된 조건 세트를 기반으로 모니터에 어느 알림 수신자를 추가할지 자동화할 수 있습니다. 모니터 알림의 태그에 따라 모니터 경보를 라우팅하도록 다양한 규칙을 생성하면 각각의 개별 모니터에 수신자나 알림 라우팅 로직을 수동으로 설정할 필요가 없습니다.

알림 규칙과 개별 모니터 양쪽 모두에서 `@notification`을 사용하여 알림에 팀 구성원, 통합, 워크플로 또는 케이스를 추가할 수 있습니다. 입력을 시작하면 Datadog이 드롭다운 메뉴에 기존 옵션을 추천해 드립니다. 옵션을 클릭하여 알림에 해당 옵션을 추가하세요. 또는 **@ 멘션 추가**, **워크플로 추가**나 **케이스 추가**를 클릭해도 됩니다.

@notification에는 해당 항목과 마지막 라인 문자 사이에 공백이 한 칸 있어야 합니다.

| 올바른 형식 | 잘못된 형식 |
|------------------|-------------------|
| `Disk space is low @ops-team@company.com` | `Disk space is low@ops-team@company.com` |

{{% collapse-content title="Integrations" level="h4" expanded=false %}}
{{% notifications-integrations %}}
{{% /collapse-content %}}

{{% collapse-content title="Teams" level="h4" expanded=false %}}
{{% notifications-teams %}}
{{% /collapse-content %}}

{{% collapse-content title="케이스" level="h4" expanded=false %}}
{{% notifications-cases %}}
{{% /collapse-content %}}

{{% collapse-content title="이메일" level="h4" expanded=false %}}
{{% notifications-email %}}
{{% /collapse-content %}}

### 모니터 @-handles 일괄 편집{#bulk-editing-monitor-handles}
Datadog은 여러 모니터에서 한꺼번에 경보 메시지 수신자를 편집하는 작업을 지원합니다. 이 기능을 사용하여 모니터 메시지 본문에서 `@-handles`를 효율적으로 추가, 제거 또는 교체하세요. 사용 사례의 예:

- **핸들 바꾸기**: 여러 모니터에서 한 핸들을 다른 핸들로 교체합니다. 예를 들어 `@pagerduty-sre`를 `@oncall-sre`로 변경합니다. 핸들 한 개를 핸들 여러 개와 바꿀 수도 있습니다. 예를 들어 `@pagerduty-sre`를`@pagerduty-sre` 및 `@oncall-sre`로 교체하면 이중 호출을 지원하거나 경보 커버리지를 확장할 수 있습니다.
- **핸들 추가**: 기존 수신자를 제거하지 않고 새 수신자를 추가합니다. 예를 들어 선택한 모든 모니터에 `@slack-infra-leads`를 추가합니다.
- **핸들 제거**: 모니터 메시지에서 특정 핸들을 제거합니다. 예를 들어 `@webhook-my-legacy-event-intake`를 제거합니다.

## 워크플로 {#workflows}
[워크플로 자동화][8]를 트리거하거나 모니터에서 새 워크플로를 생성할 수 있습니다.

모니터에 워크플로를 추가하기 전에, [워크플로에 모니터 트리거를 추가][9]합니다.

모니터 트리거를 추가하고 나서, [모니터에 기존 워크플로를 추가][10]하거나 새 워크플로를 생성합니다. 모니터 페이지에서 새 워크플로를 생성하는 방법:

1. **워크플로 추가**를 클릭합니다.
1. **+** 아이콘을 클릭하고 Blueprint를 선택하거나 **처음부터 시작**을 선택합니다.
   {{< img src="/monitors/notifications/create-workflow.png" alt="새 워크플로를 추가하려면 + 버튼 클릭" style="width:90%;">}}

워크플로 빌드에 관한 자세한 내용은 [워크플로 빌드][11]를 참조하세요.

## 인시던트 {#incidents}
모니터가 `alert`, `warn` 또는 `no data` 상태로 전환될 때 모니터에서 자동으로 인시던트가 생성될 수 있습니다. **인시던트 추가**를 클릭하고 `@incident-` 옵션을 선택합니다. 관리자는 [인시던트 설정][12]에서 `@incident-` 옵션을 생성할 수 있습니다.

모니터에서 인시던트가 생성되면 해당 모니터의 태그에 따라 자동으로 인시던트의 [필드 값][13]이 채워집니다. 예를 들어 모니터에 태그 `service:payments`가 있는 경우, 인시던트의 서비스 필드가 "payments"로 설정됩니다. 이러한 인시던트에 대한 알림을 받으려면 모니터의 태그가 인시던트 알림 규칙과 일치해야 합니다. **참고**: 인시던트 알림 규칙은 모니터 알림 규칙과 별도로 구성되며 따로 설정해야 합니다. 자세한 내용은 [인시던트 알림][14]을 참조하세요.

## 추가 콘텐츠 토글 {#toggle-additional-content}

모니터 알림에 모니터의 쿼리, 사용된 @-mentions, 메트릭 스냅샷(메트릭 모니터의 경우), Datadog의 관련 페이지로 돌아가는 링크를 포함합니다. 각 모니터에 대한 알림에 포함하거나 알림에서 제외하고자 하는 내용을 선택할 수 있습니다.

<div class="alert alert-danger">백분위수 애그리게이터가 있는 분포 메트릭(예: `p50`, `p75`, `p95` 또는 `p99`)은 알림에 스냅샷 그래프를 생성하지 않습니다. </div>

{{< img src="monitors/notifications/monitor_notification_presets.png" alt="모니터 프리셋 설정" style="width:70%;" >}}

가능한 옵션:

- **기본**: 콘텐츠를 숨기지 않습니다.
- **쿼리 숨기기**: 알림 메시지에서 모니터의 쿼리를 제거합니다.
- **핸들 숨기기**: 알림 메시지에 사용된 @-mentions를 제거합니다.
- **모두 숨기기**: 알림 메시지에 쿼리, 핸들, 각종 스냅샷(메트릭 모니터의 경우) 또는 바닥글의 추가 링크를 포함하지 않습니다.

**참고**: 통합의 종류에 따라 일부 콘텐츠가 기본적으로 표시되지 않을 수도 있습니다.

## 다시 알리기{#renotify}

모니터 다시 알리기(선택 사항)를 활성화하여 문제가 해결되지 않았다고 팀원들에게 알립니다.

  {{< img src="monitors/notifications/renotify_options.png" alt="다시 알리기 활성화" style="width:90%;" >}}

다시 알리기 간격, 모니터가 다시 알리는 대상 모니터 상태(`alert`, `no data` 및 `warn` 이내)를 구성하고, 선택 사항으로 전송되는 다시 알리기 메시지 개수에 한도를 설정합니다.

예를 들어 모니터를 `stop renotifying after 1 occurrence`로 구성하면 기본 경보 이후 에스컬레이션 메시지 한 개를 받게 됩니다.
**참고:** 다시 알리기의 [속성 및 태그 변수][3]는 다시 알리기 기간 중에 모니터에서 사용 가능한 데이터로 채워집니다.

다시 알리기를 활성화하면 모니터가 지정된 기간 동안 선택한 상태로 유지되는 경우 에스컬레이션 메시지를 포함할지 옵션이 제공됩니다.

에스컬레이션 메시지는 다음과 같은 방식으로 추가할 수 있습니다.

* 원본 알림 메시지의 `{{#is_renotify}}` 블록에(권장).
* `Configure notifications and automations` 섹션의 *다시 알리기 메시지* 필드에.
* API의 `escalation_message` 속성으로.

`{{#is_renotify}}` 블록을 사용하는 경우, 다시 알리기에 원본 알림 메시지도 포함됩니다.

1. `{{#is_renotify}}` 블록에 추가 세부 정보만 포함하고 원본 메시지 세부 정보는 반복하지 않습니다.
2. 에스컬레이션 메시지를 그룹의 하위 집합에 전송합니다.

그러한 사용 사례에 맞춰 모니터를 구성하는 방법은 [예시 섹션][15]을 참조하세요.

## 메타데이터 {#metadata}

모니터에 메타데이터(우선순위, 태그, Datadog Teams)를 추가하세요. 모니터 우선순위를 사용하면 P-레벨(P1~P5)을 통해 모니터의 중요도를 설정할 수 있습니다. UI에서는 모니터 태그(메트릭 태그와는 다름)를 사용하여 모니터를 그룹화하고 검색합니다. 태그 정책이 구성된 경우, 필수 태그와 태그 값을 추가해야 합니다. 자세한 내용은 [태그 정책][16]을 참조하세요. Datadog Teams를 사용하면 이 모니터에 소유권 계층을 설정하고, 사용자의 팀과 연결된 모든 모니터를 조회할 수 있습니다. 자세한 내용은 [Datadog Teams][17]를 참조하세요.

{{< img src="monitors/notifications/notifications_metadata.png" alt="정책 태그 구성을 조회합니다. '정책 태그' 아래의 '값 선택' 드롭다운 옆에 cost_center, product_id, env의 세 가지 태그 예시가 있습니다." style="width:100%;" >}}

{{% collapse-content title="우선순위" level="h4" expanded=false %}}

모니터와 연결된 우선순위(선택 사항)를 추가하세요. 값은 P1부터 P5까지이며, P1의 우선순위가 가장 높고 P5가 가장 낮습니다.
알림 메시지에서 모니터 우선순위를 재정의하려면 `{{override_priority 'Pi'}}` where `Pi` is between P1 and P5.

예를 들어 `alert`와 `warning` 알림에 각기 다른 우선순위를 설정할 수 있습니다.

```
{{#is_alert}}
{{override_priority 'P1'}}
 ...
{{/is_alert}}
{{#is_warning}}
{{override_priority 'P4'}}
...
{{/is_warning}}
```
{{% /collapse-content %}}


## 집계 {#aggregation}

모니터의 쿼리가 그룹화된 경우, 알림 그룹화에서 하나 이상의 디멘션을 제거할 수도 있고 아니면 디멘션을 모두 제거하고 Simple Alert로 알릴 수도 있습니다.

{{< img src="monitors/notifications/notifications_aggregation.png" alt="다중 경보로 설정된 집계 구성의 보기." style="width:100%;" >}}

이 기능에 대한 자세한 정보는 [모니터 구성][18]을 참조하세요.

## 알림 테스트{#test-notifications}

모니터를 정의한 다음, 모니터 페이지 오른쪽 하단에 있는 **알림 테스트** 버튼을 사용해 알림을 테스트하세요.

테스트 알림은 다음 [모니터 유형][19]에 대해 지원됩니다(호스트, 메트릭, 이상, 이상치, 예측, 로그, rum, apm, 통합(검사만), 프로세스(검사만), 네트워크(검사만), 사용자 지정 검사, 이벤트 및 복합 조건).

1. 테스트 알림 팝업에서 테스트할 모니터 전환과 그룹을 선택합니다(쿼리에 [그룹화][20]가 있는 경우에만 사용 가능). 경보 조건에 지정된 임계값에 대하여 모니터의 구성에서 사용 가능한 상태만 테스트할 수 있습니다. [복구 임계값][21]은 예외입니다. Datadog은 모니터가 더 이상 경보 상태가 아니게 되거나 경고 조건이 없는 경우 복구 알림을 보내기 때문입니다.

    {{< img src="/monitors/notifications/test_notification_modal.png" alt="이 모니터의 알림 테스트" style="width:70%;" >}}

1. **테스트 실행**을 클릭하여 모니터에 나열된 사용자와 서비스에 알림을 보냅니다.

### 이벤트 {#events}

알림을 테스트하면 이벤트 탐색기에서 검색할 수 있는 이벤트가 생성됩니다. 이러한 알림은 알림 제목에 `[TEST]`가 있고, 메시지 본문에 테스트를 시작한 사람이 누구인지 표시되어 있습니다.

태그 변수는 Datadog 하위 이벤트 텍스트에서만 채워집니다. 상위 이벤트는 집계 요약만 표시합니다.

### 변수{#variables-test-notification}

메시지 변수는 모니터의 정의 범위에 따라 무작위로 선택된 그룹으로 자동 완성됩니다. 예를 들면 다음과 같습니다.

```text
{{#is_alert}}
{{host.name}} <-- will populate
{{/is_alert}}
```

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/configuration
[2]: /ko/incident_response/case_management/create_case/#automatic-case-creation
[3]: /ko/monitors/notify/variables/?tabs=is_alert#attribute-and-tag-variables
[4]: http://daringfireball.net/projects/markdown/syntax
[5]: /ko/monitors/notify/variables/
[6]: /ko/monitors/notify/variables/#conditional-variables
[8]: /ko/service_management/workflows/
[9]: /ko/service_management/workflows/trigger/#add-a-monitor-trigger-to-your-workflow
[10]: /ko/service_management/workflows/trigger/#add-the-workflow-to-your-monitor
[11]: /ko/service_management/workflows/build/
[12]: https://app.datadoghq.com/incidents/settings?section=global-settings
[13]: /ko/incident_response/incident_management/setup_and_configuration/property_fields
[14]: /ko/incident_response/incident_management/notification
[15]: /ko/monitors/notify/variables/?tab=is_renotify#examples
[16]: /ko/monitors/settings/#tag-policies
[17]: /ko/account_management/teams/
[18]: /ko/monitors/configuration/#set-alert-aggregation
[19]: /ko/monitors/types
[20]: /ko/monitors/configuration/
[21]: /ko/monitors/guide/recovery-thresholds/
[22]: /ko/monitors/notify/notification_rules
[23]: /ko/synthetics/notifications/template_variables/