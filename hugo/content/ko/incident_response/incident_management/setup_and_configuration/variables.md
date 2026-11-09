---
description: 알림, 포스트모템, Jira 및 채널 이름 템플릿에 사용되는 Incident Management의 모든 템플릿 변수에 대한
  참조 자료입니다.
further_reading:
- link: /incident_response/incident_management/setup_and_configuration/templates
  tag: 설명서
  text: 알림 및 포스트모템 템플릿 구성
- link: /incident_response/incident_management/setup_and_configuration/notification_rules
  tag: 설명서
  text: 알림 규칙 설정
- link: /incident_response/incident_management/setup_and_configuration/property_fields
  tag: 설명서
  text: 속성 필드 구성
title: 인시던트 변수 참조
---
## 개요 {#overview}

인시던트 변수는 알림, 포스트모템, Jira 이슈 및 채널 이름에 인시던트 데이터를 동적으로 삽입하는 템플릿 변수입니다. 이 변수를 사용해서 관련 인시던트 컨텍스트로 템플릿을 자동으로 채워 인시던트 진행 중과 종료 후의 수동 작업을 줄이세요.

변수는 네 가지 템플릿 유형에서 사용할 수 있습니다.

- **알림**: 이메일, Slack 또는 기타 채널로 전송되는 수동 및 자동 인시던트 알림에 사용됩니다.
- **포스트모템 템플릿**: 포스트모템 생성 시 Datadog Notebooks 또는 Confluence 페이지를 자동으로 채우는 데 사용됩니다.
- **Jira 템플릿**: 인시던트에서 Jira 이슈가 생성되는 경우에 인시던트 필드를 Jira 이슈 필드에 매핑하는 데 사용됩니다.
- **채널 이름 템플릿**: Datadog이 인시던트를 위해 자동으로 생성하는 Slack 채널, Microsoft Teams 채널 또는 Google Chat 공간의 이름을 만드는 데 사용됩니다.

**참고**: Jira 템플릿에서 변수는 접두사 없이 표시됩니다. 예를 들어, `{{incident.title}}` appears as `{{ title }}`은 Jira 템플릿 편집기에서 사용합니다. 변수도 동일한 방식으로 작동합니다.

## 인시던트 변수 {#incident-variables}

다음 변수는 알림 메시지, 포스트모템 템플릿 및 Jira 템플릿에서 사용할 수 있습니다.

| 변수 | 설명 |
|---|---|
| `{{incident.<property_field_name>}}` | 조직에 맞게 구성된 [사용자 지정 속성 필드][2]로, `<property_field_name>`를 필드 이름으로 교체합니다. |
| `{{incident.id}}` | 인시던트의 공개 ID입니다. |
| `{{incident.title}}` | 인시던트 제목입니다. |
| `{{incident.severity}}` | 인시던트 심각도입니다(예시: `SEV-1`, `SEV-2`). |
| `{{incident.severity_number}}` | 인시던트 심각도의 숫자 부분으로, `1` for `SEV-1을 예로 들 수 있습니다.`. 숫자 값이 없다면 비워둡니다. |
| `{{incident.status}}` | 인시던트 [상태 수준][1]입니다. |
| `{{incident.created}}` | 인시던트가 생성된 시점의 타임스탬프입니다. |
| `{{incident.detected}}` | 인시던트가 감지된 시점의 타임스탬프입니다. |
| `{{incident.resolved}}` | 인시던트가 해결된 시점의 타임스탬프입니다. |
| `{{incident.time_to_detect}}` | 최초로 영향이 시작된 시점부터 감지 시점까지 경과한 시간입니다. |
| `{{incident.time_to_internal_response}}` | 감지 시점부터 선언 시점까지 경과한 시간입니다. |
| `{{incident.time_to_repair}}` | 감지 시점부터 가장 마지막으로 기록된 영향이 종료된 시점까지 경과한 시간입니다. |
| `{{incident.time_to_resolve}}` | 선언 시점부터 해결 시점까지 경과한 시간입니다. |
| `{{incident.time_from_detect_to_resolve}}` | 감지 시점부터 해결 시점까지 경과한 시간입니다. |
| `{{incident.mean_time_to_<metric>_<window>}}` | 유형이 동일한 다른 인시던트의 평균 지속 시간입니다. `<metric>`을 `detect`, `internal_response`, `repair`, 또는 `resolve`로 대체합니다. `<window>`를 `30_days`, `90_days`, 또는 `12_months` (365 days)로 대체합니다. 예시: `{{incident.mean_time_to_resolve_30_days}}`. |
| `{{incident.mean_time_from_detect_to_resolve_<window>}}` | 유형이 동일한 다른 인시던트의 감지 시점부터 해결 시점까지 경과한 평균 시간입니다. `<window>`를 `30_days`, `90_days`, 또는 `12_months` (365 days)로 대체합니다. |
| `{{incident.customer_impacted}}` | `참` 또는 `거짓`이며, 영향이 인시던트에 추가됐는지에 따라 달라집니다. |
| `{{incident.customer_impact}}` | 영향과 그 지속 시간에 대한 설명입니다. |
| `{{incident.scope_of_impact}}` | 영향에 대한 설명 목록입니다. |
| `{{incident.customer_impact_start}}` | 영향이 시작된 시간입니다. 복수의 영향이 추가된 경우에는 가장 이른 시작 시간을 의미합니다. |
| `{{incident.customer_impact_end}}` | 영향이 종료된 시간입니다. 복수의 영향이 추가된 경우에는 가장 늦은 종료 시간을 의미합니다. |
| `{{incident.customer_impact_duration}}` | 영향의 총 지속 시간으로, `customer_impact_start`부터 `customer_impact_end`까지입니다. |
| `{{incident.commander}}` | 인시던트 커맨더의 이름입니다. 사용자에게 이름이 없으면 이메일 주소가 되고, 이메일 주소가 없으면 핸들이 됩니다. |
| `{{incident.commander_name}}` | 인시던트 커맨더의 이름입니다. |
| `{{incident.commander_handle}}` | 인시던트 커맨더의 핸들입니다. |
| `{{incident.commander_email}}` | 인시던트 커맨더의 이메일 주소입니다. |
| `{{incident.created_by_name}}` | 인시던트를 생성한 사용자의 이름입니다. |
| `{{incident.created_by_handle}}` | 인시던트를 생성한 사용자의 핸들입니다. |
| `{{incident.created_by_email}}` | 인시던트를 생성한 사용자의 이메일 주소입니다. |
| `{{incident.responders_summary}}` | 인시던트 담당자에 대한 요약으로, 복수의 담당자가 존재하면 잘립니다. |
| `{{incident.responders_full_list}}` | 잘린 부분이 없는 인시던트 담당자 전체 목록입니다. |
| `{{incident.slack_channel_name}}` | 인시던트의 Slack 채널 이름입니다. |
| `{{incident.slack_channel_url}}` | 인시던트의 Slack 채널 URL입니다. |
| `{{incident.slack_channel_link}}` | 인시던트의 Slack 채널로 연결되는 마크다운 링크입니다. |
| `{{incident.slack_channel_id}}` | 인시던트의 Slack 채널 ID입니다. |
| `{{incident.ms_teams_channel_name}}` | 인시던트의 Microsoft Teams 채널 이름입니다. |
| `{{incident.ms_teams_channel_url}}` | 인시던트의 Microsoft Teams 채널 URL입니다. |
| `{{incident.ms_teams_channel_link}}` | 인시던트의 Microsoft Teams 채널로 연결되는 마크다운 링크입니다. |
| `{{incident.ms_teams_channel_id}}` | 인시던트의 Microsoft Teams 채널 ID입니다. |
| `{{incident.ms_teams_meeting_link}}` | 인시던트의 Microsoft Teams 회의로 연결되는 마크다운 링크입니다. 표시되는 텍스트는`Microsoft Teams Meeting {id}입니다.` |
| `{{incident.ms_teams_meeting_id}}` | 인시던트의 Microsoft Teams 회의 ID입니다. |
| `{{incident.zoom_id}}` |  Zoom 회의 ID입니다. |
| `{{incident.zoom_join_url}}` | Zoom 참석 URL입니다. |
| `{{incident.zoom_password}}` | Zoom 회의 비밀번호입니다(있는 경우). |
| `{{incident.zoom_link}}` | Zoom 회의로 연결되는 마크다운 링크입니다. 표시되는 텍스트는 `Zoom Meeting {id}`입니다. |

## 포스트모템 템플릿에서만 사용 가능한 변수 {#variables-available-only-in-postmortem-templates}

다음 변수는 포스트모템 템플릿에서만 작동합니다. 알림 또는 Jira 템플릿에서는 사용할 수 없습니다.

| 변수 | 설명 |
|---|---|
| `{{incident.card}}` | 포스트모템에 저절로 업데이트되는 인시던트 카드를 삽입합니다. **Datadog Notebooks에서 생성한 포스트모템에만 사용할 수 있습니다.** 이 변수는 Confluence 또는 Google Drive  제3자 사이트에서 생성한 포스트모템에서는 작동하지 않습니다. |
| `{{incident.timeline}}` | 포스트모템 템플릿에서 사용될 때 인시던트의 모든 타임라인 이벤트를 포스트모템으로 복사합니다. |

## 채널 이름 템플릿에서만 사용 가능한 변수 {#variables-available-only-in-channel-name-templates}

채널 이름 템플릿은 Datadog이 인시던트를 위해 자동으로 생성하는 Slack 채널, Microsoft Teams 채널, 또는 Google Chat 공간의 이름을 구성합니다. [Slack][3], [Microsoft Teams][4] 또는 [Google Chat][5] 통합 설정에서 이러한 템플릿을 구성하세요.

채널 이름 템플릿은 알림, 포스트모템 및 Jira 템플릿과 다른, 더 적은 수의 변수를 지원하며 `incident.` 접두사가 없는 구문을 사용합니다.

| 변수 | 설명 |
|---|---|
| `{{public_id}}` | 인시던트의 숫자 ID입니다. |
| `{{title}}` | 인시던트 제목입니다. |
| `{{created}}` | 인시던트 생성일로, `MM_DD_YYYY` 형식이며 사용자가 채널 이름 템플릿에서 구성한 표준 시간대에 맞춰집니다. |
| `{{yyyy}}` | 인시던트가 생성된 연도를 나타내는 네 자리 숫자이며, 사용자가 채널 이름 템플릿에서 구성한 표준 시간대에 맞춰집니다. |
| `{{mm}}` | 인시던트가 생성된 월을 나타내는 두 자리 숫자이며, 사용자가 채널 이름 템플릿에서 구성한 표준 시간대에 맞춰집니다. |
| `{{dd}}` | 인시던트가 생성된 날을 나타내는 두 자리 숫자이며, 사용자가 채널 이름 템플릿에서 구성한 표준 시간대에 맞춰집니다. |
| `{{severity}}` | 인시던트 심각도입니다. |
| `{{severity_number}}` | 인시던트 심각도입니다(예시: `1` for `SEV-1`). |
| `{{random_adjective}}` | 무작위로 정해지는 형용사입니다. |
| `{{random_noun}}` | 무작위로 정해지는 명사입니다. |
| `{{slug}}` | 슬러그 값입니다. 슬러그 소스가 `servicenow`로 설정되어 있을 때, 이 값은 ServiceNow 레코드 번호를 표시합니다. |

**참고**: Slack, Microsoft Teams 및 Google Chat은 자체 채널 이름 지정 제한을 적용하므로 Datadog은 렌더링된 채널 이름을 소문자로 변환하고 지원되지 않는 문자를 대체합니다.

## AI 변수 {#ai-variables}
{{< site-region region="gov,gov2" >}}<div class="alert alert-danger"> AI 변수는 다음에서 {{< region-param key="dd_site_name" >}}지원되지 않습니다.</div>{{< /site-region >}}

AI 변수는 알림 및 포스트모템 템플릿에서 사용할 수 있습니다. 조직에서 AI가 활성화되어 있어야 합니다.

### 알림 템플릿 {#notification-templates}

| 변수 | 설명 |
|---|---|
| `{{incident.ai_issue}}` | AI가 생성한 발생 이슈 설명입니다. |
| `{{incident.ai_impact}}` |  AI가 생성한 영향 설명입니다. |
| `{{incident.ai_remediation}}` | AI가 생성한 해결 단계(수행 완료) 설명입니다. |
| `{{incident.ai_contributing_factors}}` | AI가 생성한 기여 요인 요약입니다. |

### 포스트모템 템플릿 {#postmortem-templates}

| 변수 | 설명 |
|---|---|
| `{{incident.ai_summary}}` | AI가 생성한 인시던트 요약입니다. |
| `{{incident.ai_system_overview}}` | AI가 생성한 관련 서비스 요약입니다. |
| `{{incident.ai_key_timeline}}` | AI가 생성한 이벤트 주요 타임라인입니다. |
| `{{incident.ai_customer_impact}}` | AI가 생성한 고객 영향 설명입니다. |
| `{{incident.ai_lessons_learned}}` | AI가 생성한 교훈 요약입니다. |
| `{{incident.ai_action_items}}` | AI가 생성한 작업 항목 목록입니다. |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/incident_response/incident_management/setup_and_configuration/information#status-levels
[2]: /ko/incident_response/incident_management/setup_and_configuration/property_fields
[3]: /ko/incident_response/incident_management/setup_and_configuration/integrations/slack/#incident-channels
[4]: /ko/incident_response/incident_management/setup_and_configuration/integrations/microsoft_teams/#automatic-channel-creation
[5]: /ko/incident_response/incident_management/setup_and_configuration/integrations/google_chat/#incident-spaces