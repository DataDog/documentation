---
description: 사후 분석 보고서를 생성 및 관리하여 인시던트를 문서화하고 지속적인 개선을 추진하세요.
further_reading:
- link: /incident_response/incident_management/setup_and_configuration/templates
  tag: 문서
  text: 사후 분석 보고서 템플릿 구성하기
- link: /incident_response/incident_management/setup_and_configuration/variables
  tag: 문서
  text: 인시던트 변수 참조
- link: /incident_response/incident_management/post_incident/follow-ups
  tag: 문서
  text: 인시던트 후속 작업 관리하기
- link: /notebooks/
  tag: 문서
  text: Datadog Notebooks
title: 인시던트 사후 분석 보고서
---
## 개요 {#overview}

사후 분석 보고서는 인시던트 중에 발생한 일, 발생 원인 및 재발 방지를 위해 취해야 할 조치를 기록하는 구조화된 문서입니다. 인시던트 발생 후 사후 분석 보고서를 생성하면 팀에 다음과 같은 이점이 있습니다.

- 향후 참조를 위해 근본 원인 및 영향 문서화
- 수정 작업에 대한 책임 강화
- 조직 지식을 구축하여 향후 인시던트의 주기 및 중증도 감소

Datadog은 사용자가 정의한 템플릿을 사용하여 인시던트 데이터로 사후 분석 보고서를 자동으로 채웁니다. [Datadog Notebooks][1], [Confluence][2] 또는 [Google Drive][3]로 사후 분석 보고서를 생성할 수 있습니다. Datadog Notebooks로 생성된 사후 분석 보고서는 Post-Incident 탭에 직접 포함되므로, 인시던트를 벗어나지 않고도 상태와 소유권을 조회, 편집 및 추적할 수 있습니다.

## 권한 {#permissions}

- 사후 분석 보고서를 생성하려면 **Incidents Write** 권한이 필요합니다.
- Datadog Notebooks에서 생성된 사후 분석 보고서를 조회하려면 **Notebooks Read** 권한이 필요합니다.

<div class="alert alert-danger">프라이빗 인시던트의 경우, Datadog Notebooks에서 생성된 사후 분석 보고서는 프라이빗 인시던트에 대한 액세스 권한 여부와 관계없이 Notebooks Read 권한이 있는 사용자라면 누구나 액세스할 수 있습니다. 민감한 데이터가 포함된 인시던트에 대해 사후 분석 보고서를 생성할 때 이 점을 고려하세요.</div>

## 사후 분석 보고서 생성 {#generate-a-postmortem}

{{< img src="/incident_response/incident_management/post_incident/postmortems/post_incident_tab_generate_postmortem.png" alt="Generate Postmortem 버튼, 템플릿 미리 보기 및 Follow-Ups 사이드바가 표시된 Post-Incident 탭" style="width:100%;" >}}

인시던트가 해결된 후 인시던트의 **Post-Incident** 탭에서 사후 분석 보고서를 생성할 수 있습니다.

사후 분석 보고서를 생성하려면 다음 단계를 따르세요.

1. 인시던트를 열고 **Post-Incident** 탭으로 이동합니다.
1. 사후 분석 보고서 템플릿을 선택합니다.
1. **Generate Postmortem**을 클릭합니다. Datadog은 템플릿에 구성된 대상에 사후 분석 보고서를 생성하고 이를 인시던트에 연결합니다.

### Workflow Automation으로 사후 분석 보고서 생성 {#generate-a-postmortem-with-workflow-automation}

**Generate postmortem** 액션을 사용하여 [워크플로][5]에서 사후 분석 보고서를 생성할 수도 있습니다. 이 액션은 인시던트와 사후 분석 보고서 템플릿을 사용하여 생성된 사후 분석 보고서를 해당 인시던트에 첨부합니다. 이 경로를 사용하여 인시던트 해결 후와 같은 자동화된 인시던트 후 프로세스의 일부로 사후 분석 보고서를 생성하세요.

<div class="alert alert-warning">사후 분석 보고서 템플릿에서 사용할 수 있는 AI 생성 변수(예: <code>{{incident.ai_summary}}</code>)는 <strong>Post-Incident</strong> 탭에서 생성된 사후 분석 보고서에 대해서만 값이 채워집니다. <strong>Generate postmortem</strong> 워크플로 액션을 통해 생성된 사후 분석 보고서는 이러한 변수를 빈 값으로 표시합니다. AI 생성 콘텐츠를 포함하려면 <strong>Post-Incident</strong> 탭에서 사후 분석 보고서를 생성하세요.</div>

사후 분석 보고서 템플릿에서 사용할 수 있는 전체 변수 목록은 [템플릿][4] 및 [인시던트 변수][6]를 참조하세요.

## 사후 분석 보고서 조회 및 편집 {#view-and-edit-a-postmortem}

대상에 따라 사후 분석 보고서를 조회하고 편집하는 방법은 다음과 같습니다.

- **Datadog Notebooks**: **Post-Incident** 탭에 포함되어 있습니다. Datadog을 떠나지 않고 읽고 편집할 수 있습니다. 여러 사용자가 커서 표시기를 사용하여 동시에 편집할 수 있습니다. 인라인 댓글을 추가합니다. 변경 사항은 원본 노트북에 반영됩니다.
- **Confluence**: Confluence에서 편집(**Post-Incident** 탭의 링크를 클릭하여 Confluence 작업 공간을 엽니다).
- **Google Drive**: Google Docs에서 편집(**Post-Incident** 탭의 링크를 클릭하여 Google Docs를 엽니다).

## 사후 분석 보고서 상태 및 소유자 {#postmortem-status-and-owner}

사후 분석 보고서에는 완료를 추적하고 책임감을 높이는 데 도움이 되는 두 가지 필드가 있습니다.

| 필드 | 설명 | 기본값 |
|---|---|---|
| **상태** | 사후 분석 보고서의 현재 완료 상태입니다. | 초안 |
| **소유자** | 사후 분석 보고서 완료를 책임지는 사람입니다. | 사후 분석 보고서를 생성한 사용자 |

사후 분석 보고서 상태 값은 다음과 같습니다.

| 상태 | 설명 |
|---|---|
| **초안** | 사후 분석 보고서가 진행 중입니다. |
| **In Review** | 사후 분석 보고서가 검토를 위해 준비되었습니다. |
| **Completed** | 사후 분석 보고서가 완료되었습니다. |

사후 분석 보고서 소유자는 Datadog 조직의 모든 사용자로 재지정할 수 있습니다. 사후 분석 보고서의 소유자는 인시던트 대응 팀에서 인시던트 지휘관 및 대응자와 함께 표시되는 시스템 역할입니다.

## 사후 분석 보고서 템플릿 구성 {#configure-postmortem-templates}

저장 위치 및 템플릿 변수를 포함한 사후 분석 보고서 템플릿을 만들거나 관리하려면 [템플릿][4]을 참조하세요.

## 기존 사후 분석 보고서 첨부 {#attach-an-existing-postmortem}

인시던트에 대한 사후 분석 보고서가 Datadog 외부에 이미 존재하거나 인시던트가 열리기 전에 생성된 경우, 새 사후 분석 보고서를 생성하지 않고 **Post-Incident** 탭에서 직접 연결할 수 있습니다. 연결된 사후 분석 보고서는 Datadog 노트북, Confluence 페이지, Google Doc 또는 기타 외부 문서 등 모든 URL이 될 수 있습니다.

기존 사후 분석 보고서를 첨부하려면 **Post-Incident** 탭을 열고 **Attach existing post-mortem** 옵션을 사용하여 링크를 추가하세요.

## 사후 분석 보고서 제거 {#remove-a-postmortem}

인시던트에서 사후 분석 보고서를 제거하려면 **Post-Incident** 탭을 열고 사후 분석 보고서 항목을 찾아 제거 옵션을 선택하세요. 링크를 제거해도 원본 문서는 삭제되지 않습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/notebooks/
[2]: /ko/integrations/confluence/
[3]: /ko/integrations/google_drive/
[4]: /ko/incident_response/incident_management/setup_and_configuration/templates
[5]: /ko/actions/workflows/
[6]: /ko/incident_response/incident_management/setup_and_configuration/variables/#incident-variables