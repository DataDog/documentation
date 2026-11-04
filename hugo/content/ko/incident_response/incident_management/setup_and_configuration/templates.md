---
aliases:
- /ko/service_management/incident_management/incident_settings/templates/
- /ko/incident_response/incident_management/incident_settings/templates
further_reading:
- link: /incident_response/incident_management/setup_and_configuration/variables
  tag: 설명서
  text: 인시던트 변수 참조
- link: /incident_response/incident_management/notification
  tag: 설명서
  text: Incident Management Notifications에 대해 자세히 알아보세요.
- link: /incident_response/incident_management/post_incident/postmortems
  tag: 설명서
  text: 인시던트 사후 분석 보고서
title: 템플릿
---
## 개요 {#overview}

동적 템플릿은 인시던트 대응 및 운영 효율성을 개선하기 위한 포괄적인 프레임워크를 제공합니다. 필요에 따라 보내는 알림과 자동화된 알림 모두에 사용자 지정 메시지 템플릿을 사용하면 스트레스가 심한 인시던트 상황에서 시간을 절약할 수 있습니다. 또한 이는 메시지의 정확성을 일관되게 유지하고 관련 컨텍스트를 포함하여 수신자가 더 빠르게 상황을 이해하고 조치를 취할 수 있게 해줍니다.

사용자 지정 가능한 사후 분석 설정은 귀중한 정보와 장기적인 최적화를 제공할 수 있습니다. 조직의 고유한 상황에 맞게 보고서와 대시보드를 조정함으로써 반복되는 문제를 식별하고 예방 조치를 보다 효과적으로 실행할 수 있습니다.

## 메시지 {#messages}

메시지 템플릿은 [수동 인시던트 알림][1] 또는 자동화된 알림 규칙에 사용할 수 있는 동적 재사용 가능 메시지입니다. 메시지 템플릿은 [템플릿 변수][4](예: `{{incident.severity}}`)를 사용하여 알림 전송 대상 인시던트의 해당 값을 동적으로 삽입합니다. 메시지 템플릿은 마크다운을 지원하므로 인시던트 알림에 텍스트 서식, 표, 들여쓰기된 목록 및 하이퍼링크를 포함할 수 있습니다. 많은 수의 메시지 템플릿을 적절히 구성하려면 각 템플릿을 생성하는 과정에서 범주를 지정해야 합니다.

메시지 템플릿을 생성하는 방법은 다음과 같습니다.

1. **+ New Message Template** 버튼을 클릭합니다.
2. 템플릿에 이름을 부여합니다.
3. 템플릿에 새 범주 또는 기존 범주를 지정합니다.
4. 템플릿에 주제 라인(이메일용)을 부여합니다.
5. 템플릿의 메시지를 작성합니다.
6. **Save**를 클릭합니다.

**참고:** 템플릿 변수는 메시지의 제목 및 본문에서 지원됩니다.

### 알림을 위한 AI 변수 {#ai-variables-for-notifications}

인시던트 AI는 알림의 주요 세부 정보를 AI 생성 콘텐츠로 동적으로 채울 수 있습니다. 메시지 본문에 다음 변수 중 하나를 삽입하세요.

| 필드 | 변수 |
|---|---|
| AI 기여 요인 | `{{incident.ai_contributing_factors}}` |
| AI 영향 | `{{incident.ai_impact}}` |
| AI 이슈 | `{{incident.ai_issue}}` |
| AI 수정 | `{{incident.ai_remediation}}` |

{{< img src="incident_response/incident_management/investigate/incident_ai/message_template_variables.png" alt="AI 변수가 포함된 새 메시지 템플릿" style="width:80%;" >}}

## 사후 분석 {#postmortems}

포스트모템 템플릿은 포스트모템의 구조와 콘텐츠를 정의합니다. 포스트모템을 생성하면 Datadog이 인시던트의 데이터를 사용해서 템플릿을 자동으로 채웁니다. [템플릿 변수][4](예: `{{incident.severity}}`)를 사용하여 인시던트 데이터를 포함할지 제어합니다.

포스트모템 템플릿을 생성하는 방법은 다음과 같습니다.

1. [**Incident Management Settings > Postmortem Templates**][8]로 이동하여 **+ New Postmortem Template**을 클릭합니다.
2. 템플릿에 이름을 부여합니다.
3. 저장 위치를 선택합니다([저장 위치](#save-location) 참조).
4. 템플릿의 콘텐츠를 작성합니다(사용 가능한 템플릿 변수는 텍스트 상자 오른쪽에 표시).
5. (선택 사항) 템플릿을 기본값으로 설정합니다.
6. **Save**를 클릭합니다.

### 저장 위치 {#save-location}

생성된 포스트모템 문서를 저장할 위치를 선택하세요.

| 옵션 | 요구 사항 |
|---|---|
| **Datadog Notebooks** | 추가 설정이 필요하지 않습니다. |
| **Confluence** | [Confluence 통합][3]이 필요합니다. 대상으로 선택하기 전에 통합 설정에서 Confluence 계정을 구성하세요. |
| **Google Drive** | [Google Drive 통합][6]이 필요합니다. 대상으로 선택하기 전에 통합 설정에서 Google 계정을 구성하세요. |

### 포스트모템용 템플릿 변수 {#template-variables-for-postmortems}

템플릿은 포스트모템이 생성될 때 인시던트 데이터로 채워지는 변수를 지원합니다. 사용 가능한 변수의 전체 목록은 [인시던트 변수][4] 참조 자료에서 확인할 수 있습니다.

{{% collapse-content title="표준 변수" level="h4" %}}
표준 변수는 인시던트 필드에서 직접 가져오며 정의된 [사용자 지정 속성 필드][7]도 포함합니다.

| 변수 | 설명 |
|---|---|
| `{{incident.title}}` | The incident title |
| `{{incident.state}}` | 현재 인시던트 상태(예: `진행 중`, `안정적`, `해결됨`) |
| `{{incident.severity}}` | 인시던트 심각도 수준 |
| `{{incident.commander}}` | 인시던트 책임자의 이름(이름이 설정되지 않은 경우 이메일 또는 핸들) |

{{% /collapse-content %}}

{{% collapse-content title="기간 변수" level="h4" %}}
인시던트 대응 시간을 포함시켜 과거 평균과 비교하세요.

```text
Time to Detect: {{incident.time_to_detect}}
Time to Internal Response: {{incident.time_to_internal_response}}
Time to Repair: {{incident.time_to_repair}}
Time to Resolve: {{incident.time_to_resolve}}
Time from Detect to Resolve: {{incident.time_from_detect_to_resolve}}
Mean Time to Resolve (past 30 days): {{incident.mean_time_to_resolve_30_days}}
```

개별 기간은 계산이 불가능하거나 0 또는 음수일 때 `N/A`로 렌더링됩니다. 평균 기간은 해당하는 인시던트 중 양수 값이 있는 인시던트가 없을 때 `N/A`로 렌더링됩니다. 모든 변수 및 평균화 기간은 [인시던트 변수 참조][9]에서 확인할 수 있습니다.
{{% /collapse-content %}}

{{% collapse-content title="인시던트 카드 변수" level="h4" %}}
인시던트 카드변수(`{{incident.card}}`)는 인시던트 필드를 실시간으로 반영하는 요약 카드를 삽입합니다. 인시던트 필드가 변경되면 포스트모템의 카드가 자동으로 업데이트됩니다. 카드에는 포스트모템 상태 및 소유자 필드가 포함됩니다.

**참고**: 인시던트 카드는 Datadog Notebooks에서만 지원됩니다.
{{% /collapse-content %}}

{{% collapse-content title="후속 작업 변수" level="h4" %}}
후속 작업 변수(`{{incident.follow-ups}}`)는 포스트모템 노트북에 인시던트 후속 작업 목록을 삽입합니다. 노트북의 목록 보기에서 마감일을 설정하거나, 항목을 할당하거나, 새로운 후속 작업 항목을 생성할 수 있습니다. 변경 사항은 인시던트의 후속 작업 목록에 반영됩니다.

**참고**: 후속 작업 변수는 Datadog Notebooks에서만 지원됩니다.
{{% /collapse-content %}}

{{% collapse-content title="AI 변수" level="h4" %}}
AI 변수는 Bits AI를 사용하여 인시던트 데이터를 기반으로 제안된 콘텐츠를 생성합니다. AI 변수가 포함된 포스트모템을 생성하면 Datadog이 제안 값을 제공합니다. 사용자는 저장을 하기 전에 이를 수락하거나 편집하거나 거부할 수 있습니다.

{{% incident-ai-postmortem-variables %}}

이 변수를 사용하는 방법은 다음과 같습니다.
1. 템플릿 본문에 변수를 추가합니다.
1. 포스트모템을 생성할 때 **AI 콘텐츠가 포함된 일반 인시던트** 기본 제공 템플릿 또는 AI 변수가 포함된 사용자 지정 템플릿을 선택합니다.
1. AI 생성 콘텐츠가 채워질 때까지 최대 1분간 기다립니다. Datadog은 포스트모템을 공유하기 전에 AI 생성 콘텐츠를 검토하고 수정할 것을 권장합니다.

**참고**:
- AI 변수 앞에는 섹션 헤더가 있어야 합니다.
- AI 변수가 콘텐츠를 생성하려면 인시던트 타임라인에 최소 10개의 메시지가 포함되어야 합니다.

{{% /collapse-content %}}

이 템플릿을 사용하여 포스트모템을 생성하는 방법에 대한 자세한 내용은 [인시던트 포스트모템][5]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/incident_response/incident_management/notifications
[2]: /ko/notebooks/
[3]: /ko/integrations/confluence/
[4]: /ko/incident_response/incident_management/setup_and_configuration/variables
[5]: /ko/incident_response/incident_management/post_incident/postmortems
[6]: /ko/integrations/google_drive/
[7]: /ko/incident_response/incident_management/setup_and_configuration/property_fields
[8]: https://app.datadoghq.com/incidents/settings?section=postmortem-templates
[9]: /ko/incident_response/incident_management/setup_and_configuration/variables/#incident-variables