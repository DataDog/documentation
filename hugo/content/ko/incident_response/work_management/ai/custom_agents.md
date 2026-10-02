---
aliases:
- /ko/incident_response/case_management/ai/custom_agents/
description: Bits Agent Builder로 구축된 사용자 지정 Agent를 사용하여 Datadog에서 Work Management
  워크플로를 자동화하는 방법을 알아보세요.
further_reading:
- link: /actions/agents/
  tag: 설명서
  text: Bits Agent Builder
- link: /actions/actions_catalog/
  tag: 설명서
  text: Action Catalog
title: Datadog AI Agent
---
{{< site-region region="gov" >}}
<div class="alert alert-danger">Work Management용 AI 기능은 선택한 <a href="/getting_started/site">Datadog 사이트</a>에서 지원되지 않습니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-info">사용자 지정 Agent와의 Work Management 통합은 현재 미리 보기 상태입니다.</div>

## 개요 {#overview}

Work Management는 [Bits Agent Builder][1]와 통합되어 수동 작업 항목 생성, 분류 및 해결에서 자동화된 방식으로 전환할 수 있도록 지원합니다. 다양한 워크플로를 지원하기 위해 작업 항목을 사용자 지정 Agent에 할당합니다.

## 사용자 지정 Agent 생성 {#create-custom-agents}

[Bits Agent Builder][1]를 사용하여 작업 항목을 분류하고 해결할 수 있는 사용자 지정 Agent를 만들 수 있습니다. Agent는 [Action Catalog][2]의 모든 작업을 수행할 수 있으며, 여기에는 작업 항목 생성, 업데이트 및 해결이 포함됩니다. Work Management에서 사용할 수 있는 에이전트 빌드 예시는 다음과 같습니다.

- **이슈 분류**: 별도 준비 없이 바로 작업할 수 있도록 들어오는 작업 항목을 구조와 컨텍스트로 보강합니다.
- **보안 신호 애그리게이터**: 관련 보안 신호를 하나의 통합된 조사 작업 항목으로 그룹화하여 사일로화된 분석을 방지합니다.
- **기능 구현자**: 기능 요청 사양을 초안 PR로 변환하여 개선 사항을 더 빠르게 배포할 수 있도록 돕습니다.
- **IT 액세스 요청 자동화 도구**: 작업 항목 세부 정보를 검토하고 누락된 세부 정보를 제출자에게 요청하며 관리자에게 필요한 승인을 자동으로 요청합니다.
- **지원 첫 대응자**: 지원 티켓에 대한 초기 응답을 작성하고 조사 프로세스를 시작하여 평균 해결 시간(MTTR)을 단축하도록 돕습니다.

## Work Management에서 사용자 지정 Agent 사용 {#using-custom-agents-in-work-management}

작업 항목의 **Agent Assignee** 필드를 사용하여 Bits Agent Builder의 Agent에 작업 항목을 수동 또는 자동으로 할당합니다.

### 수동 할당 {#manual-assignment}

작업 항목의 **Agent Assignee** 필드 드롭다운에서 에이전트를 선택합니다.

### 자동 할당 {#automated-assignment}

[작업 항목 자동화 규칙][3]을 사용하여 작업 항목을 에이전트에게 자동으로 할당합니다:

1. [Work Management > 설정][4]****으로 이동합니다.
1. 자동화 규칙을 생성할 프로젝트를 선택합니다.
1. Automation Rules**를 선택합니다.**
1. **New Rule**을 클릭합니다.
1. 규칙이 실행될 트리거를 정의합니다.
1. **Assign Agent**를 선택하고 일치하는 작업 항목을 할당할 사용자 지정 Agent를 선택합니다.
1. 규칙을 활성화하고 이름을 지정합니다.

**참고**: 에이전트는 해당 에이전트를 작업 항목에 할당한 사용자의 권한을 사용하여 실행됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/actions/agents/
[2]: /ko/actions/actions_catalog/
[3]: /ko/incident_response/work_management/automation_rules/
[4]: https://app.datadoghq.com/work/settings