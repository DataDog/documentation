---
algolia:
  tags:
  - follow ups
  - follow-up
  - follow up
aliases:
- /ko/service_management/incident_management/follow-ups/
- /ko/incident_response/incident_management/follow-ups
description: 인시던트 대응 프로세스 중에 정의된 후속 작업을 관리하세요.
further_reading:
- link: /incident_response/incident_management/setup_and_configuration
  tag: 설명서
  text: 인시던트 설정
- link: /service_management/incident_management/integrations/slack/
  tag: 설명서
  text: Slack과 Datadog Incident Management 통합
title: 인시던트 후속 작업
---
## 개요 {#overview}

인시던트 후속 작업은 인시던트가 해결된 후 수행되는 작업입니다. 인시던트 조사 중에 팀은 주의가 필요하지만 즉각적인 문제 해결과 직접적인 관련이 없는 문제를 식별할 수 있습니다. 서비스 복구 과정에서 이러한 항목을 놓치는 대신, 인시던트가 해결된 후 처리할 후속 작업으로 기록할 수 있습니다.

후속 작업을 생성하는 일반적인 예는 다음과 같습니다.

- **인프라 개선**: 인시던트 중에 발견된 잘못 구성된 로그, 누락된 경고 또는 불충분한 모니터링 범위
- **기술 부채**: 리팩터링이 필요한 코드, 강화가 필요한 취약 시스템 또는 업데이트가 필요한 문서
- **프로세스 개선**: 런북의 공백, 불분명한 에스컬레이션 경로 또는 누락된 액세스 권한
- **근본 원인 수정**: 즉각적인 완화보다 더 많은 시간이 필요한 근본적인 문제

이러한 항목을 후속 작업으로 기록하면 팀이 인시던트 해결에 집중하는 동시에 중요한 개선 사항을 잊지 않을 수 있습니다.

## AI 제안 후속 작업 {#ai-suggested-follow-up-tasks}

{{< site-region region="gov" >}}
<div class="alert alert-danger">AI 제안 후속 작업은 선택한 <a href="/getting_started/site">Datadog 사이트</a>({{< region-param key="dd_site_name" >}})에서 지원되지 않습니다.</div>
{{< /site-region >}}

인시던트가 해결되면 Incident AI가 인시던트 채널을 스캔하여 대응자가 인시던트 중에 언급한 후속 작업을 찾습니다. 그런 다음 클릭 한 번으로 검토하고 생성하라는 메시지를 표시합니다. 이 방식으로 저장된 작업은 Datadog Incident Management의 인시던트 후속 작업으로 표시됩니다.

AI 제안 후속 작업을 보려면 다음 단계를 따르세요.
1. Datadog에서 관련 인시던트로 이동합니다.
1. **Post-Incident** 탭을 열어 Slack에서 저장된 모든 후속 작업 목록을 확인합니다.

## 후속 조치 생성 및 관리 {#create-and-manage-follow-ups}

후속 조치는 인시던트 중 언제든지(해결되기 전에도) 생성할 수 있으므로, 대응자가 필요한 작업을 발견하는 즉시 기록할 수 있습니다. 해결 후 [후속 조치를 내보내](#export-follow-ups) Jira 또는 Work Management로 통합하여 팀의 기존 워크플로에 포함할 수 있습니다.

**Datadog에서**: 인시던트의 **Post-Incident** 탭으로 이동하여 인시던트와 관련된 모든 후속 조치를 보고, 생성하고, 편집하고, 추적합니다.

**Slack에서**: 인시던트 채널에서 `/datadog followup`을 실행하여 새 후속 조치를 생성하거나 `/datadog followup list`를 실행하여 기존 후속 조치를 보고 관리합니다. 더 많은 Slack 명령은 [Slack과 Datadog Incident Management 통합][5]을 참조하세요.

## 사후 분석 노트북의 후속 조치 {#follow-ups-in-postmortem-notebooks}

`{{incident.follow-ups}}` 템플릿 변수를 사용하여 사후 분석 노트북에 후속 조치를 직접 표시할 수 있습니다. Datadog Notebooks 사후 분석 템플릿에 추가하면 이 변수가 후속 조치 항목 목록을 렌더링합니다. 노트북의 목록 보기에서 마감일을 설정하거나, 항목을 할당하거나, 새로운 후속 조치 항목을 생성할 수 있습니다. 자세한 내용은 [인시던트 사후 분석][6]을 참조하세요.

## 후속 조치 내보내기 {#export-follow-ups}

Incident Management에서 Work Management 또는 Jira로 후속 조치를 내보내 팀의 기존 워크플로 내에서 추적하고 관리할 수 있습니다. 후속 조치를 수동으로 내보내거나, 모든 후속 조치를 선택한 Work Management 또는 Jira 프로젝트로 자동으로 내보내도록 Incident Management를 구성할 수 있습니다.

후속 조치를 내보내려면 다음 단계를 따르세요.
1. [**Incident Management 설정 > 후속 조치**][1]로 이동합니다.
1. **내보내기 템플릿**을 추가하거나 정의합니다. 내보내기 템플릿은 Datadog이 후속 조치를 내보내고 동기화하는 방식을 설명합니다.
1. 다음 내보내기 템플릿 유형이 지원됩니다.
   1. [Work Management](#work-management-exports)
   1. [Jira](#jira-exports)
1. 템플릿을 정의할 때 후속 조치 및 해당 인시던트에서 제공하는 변수를 사용하여 Datadog이 결과 Datadog 작업 항목 또는 Jira 이슈의 필드를 설정하는 방법을 구성할 수 있습니다. 예를 들면 다음과 같습니다.
   * `{{ title }}`은 인시던트의 제목을 나타냅니다.
   * `{{ severity }}`는 인시던트의 심각도를 나타냅니다.
   * `{{ follow_up_description }}`은 후속 조치의 설명을 나타냅니다.
   * `{{ follow_up_due_date }}`은(는) 후속 조치의 마감일을 나타냅니다.
1. (선택 사항) 플랫폼 간 상태 변경이 동기화되도록 플랫폼 간 상태 매핑 방법을 정의할 수 있습니다. 후속 조치에는 **Open** 및 **Done**의 두 가지 상태가 있습니다.

### 수동 및 자동 내보내기 {#manual-and-automatic-exports}

내보내기 템플릿을 정의한 후에는 두 가지 옵션을 사용할 수 있습니다.

| 내보내기 옵션      | 설명                                                                                      | 사용 시점                                                                                      |
|--------------------|--------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| **수동 내보내기**  | 인시던트의 Post-Incident 탭에서 개별 후속 조치를 온디맨드로 내보냅니다.                      | 특정 후속 조치만 선택적으로 내보내려는 경우 이 옵션을 사용하세요.                            |
| **자동 내보내기** | Incident Management에서 후속 조치가 생성될 때마다 템플릿을 사용하여 모든 후속 조치를 자동으로 내보내도록 구성합니다. | 모든 후속 조치를 외부 시스템에서 기본적으로 추적하려면 이 옵션을 선택하세요.         |

### Work Management 내보내기{#work-management-exports}

후속 조치를 [Work Management][2]로 내보내면 Datadog에서 직접 후속 조치를 관리, 추적 및 분석할 수 있습니다. 예를 들어 다음을 수행할 수 있습니다.

* Datadog에서 특정 사용자에게 할당된 모든 Open 후속 조치 작업 항목 보기
* 팀별 후속 조치 작업 항목을 보여주는 Datadog 대시보드 생성
* 해당 작업 항목을 Jira 및 ServiceNow를 포함하여 Work Management와 통합되는 모든 외부 애플리케이션에 자동으로 동기화

Datadog이 인시던트 후속 조치를 Work Management로 내보내면 내보내기 템플릿에서 선택한 프로젝트에 해당 후속 조치를 위한 작업 항목이 생성됩니다.

**상태 동기화:** 내보내기 템플릿에서 정의한 매핑에 따라 Datadog이 후속 조치와 작업 항목 간의 상태를 **양방향으로** 동기화합니다.

**담당자 동기화:** Datadog이 후속 조치와 작업 항목 간의 담당자를 **양방향으로** 동기화합니다. 작업 항목에는 담당자를 한 명만 지정할 수 있으므로, 후속 조치의 첫 번째 담당자만 작업 항목에 추가됩니다.


### Jira 내보내기 {#jira-exports}

후속 조치를 Jira로 내보내려면 먼저 Jira integration을 설치해야 합니다. 자세한 내용은 [Jira와 Datadog Incident Management 통합][4]을 참조하세요.

Datadog이 인시던트 후속 조치를 Jira로 내보내면 내보내기 템플릿에서 선택한 프로젝트에 해당 후속 조치를 위한 Jira 이슈가 생성됩니다.

**상태 동기화:** 인시던트 후속 조치를 닫거나 열면 Datadog이 내보내기 템플릿에서 정의한 매핑을 기반으로 연결된 Jira 이슈의 상태를 자동으로 동기화합니다. **이것은 단방향 동기화입니다.**

양방향 동기화가 필요한 조직은 Jira 프로젝트와 양방향 동기화되도록 구성된 Work Management 프로젝트로 내보내야 합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/incidents/settings?section=follow-ups
[2]: /ko/service_management/case_management
[4]: /ko/integrations/jira/
[5]: /ko/service_management/incident_management/integrations/slack/#slack-commands
[6]: /ko/incident_response/incident_management/post_incident/postmortems