---
description: Datadog MCP Server의 워크플로 도구 세트를 사용하여 AI 에이전트로 워크플로를 구축, 관리, 실행 및 디버깅하세요.
further_reading:
- link: mcp_server/setup
  tag: 설명서
  text: Datadog MCP Server 설정
- link: mcp_server
  tag: 설명서
  text: Datadog MCP Server 개요
- link: mcp_server/tools
  tag: 설명서
  text: Datadog MCP Server 도구
- link: actions/workflows/
  tag: 설명서
  text: Workflow Automation
title: Workflow Automation MCP 도구
---
## 개요 {#overview}

[Datadog MCP Server][1]를 사용하면 AI 에이전트가 [Model Context Protocol(MCP)][2]을 통해 워크플로를 구축하고 관리할 수 있습니다.

`workflows` 도구 세트로 Claude Code, Cursor, OpenAI Codex와 같은 AI 클라이언트가 워크플로, Action Catalog, 워크플로 스키마 및 실행 데이터에 액세스할 수 있습니다. 자연어를 사용하면 워크플로를 생성 및 업데이트하고, 사양을 검증하고, 게시된 워크플로를 실행하고, 실행 결과를 조사할 수 있습니다.

## 사용 사례 {#use-cases}

`workflows` 도구 세트를 사용하여 다음을 수행하는 자동화를 구축하세요.

- **모니터링 경보 조사**: 서비스 오류율 모니터링을 통해 경보가 전송되면 Bits Investigation을 실행하여 지연 시간, 최근 배포 및 다운스트림 서비스 상태의 상관관계를 분석한 다음 결과를 Slack 내 소유 팀으로 전송하세요.
- **사용자 지정 에이전트 사용**: 결제, 데이터 파이프라인 또는 Kubernetes와 같은 전문 시스템을 위한 사용자 지정 Bits Agent Builder 에이전트를 생성하고, 경보에 해당 도메인 전문 지식이 필요할 때마다 워크플로에서 호출하세요.
- **인시던트 에스컬레이션 자동화**: 심각한 인시던트가 선언되면 관련 서비스 컨텍스트를 수집하고, 적절한 온 콜 팀을 페이징하고, 케이스를 생성하고, 이해관계자에게 알리세요.
- **배포 회귀 조사**: 배포 후 현재 서비스 동작을 최근 변경 사항과 비교하고, 회귀 가능성이 발견되면 Bits Code 세션을 시작하여 관련 코드를 조사하고 수정 사항을 제안하세요.
- **경보에서 문제 해결 트리거**: 모니터링을 통해 알려진 실패 조건이 탐지되면 서비스 재시작, AWS Lambda 함수 호출 또는 내부 문제 해결 엔드포인트 호출과 같은 문제 해결 액션을 실행하세요.
- **코드 수정 생성**: 문제를 조사하고, Bits Code를 통해 코드 변경을 제안받고, 사람의 검토를 거쳐 제안된 수정 사항이 승인되면 변경 사항을 구현하세요.
- **심각도가 높은 보안 결과 에스컬레이션**: 치명적인 탐지 결과가 발견되면 케이스 또는 티켓을 생성하고, 소유 팀에 알리고, 적절한 대응자를 페이징하세요.

## 빠른 시작 {#quickstart}

<div class="alert alert-info"> <code>workflows</code> 도구 세트는 외부 MCP 클라이언트에 대해 기본적으로 활성화되지 않습니다.</div>

1. [Datadog MCP Server 설정][1]을 진행합니다.
1. AI 클라이언트를 Datadog MCP Server에 연결할 때 `workflows`를 `toolsets` 파라미터에 추가합니다. 예를 들어, Datadog US1 사이트의 경우 다음과 같습니다.

    {{< code-block lang="none" >}}
https://mcp.datadoghq.com/v1/mcp?toolsets=core,workflows
{{< /code-block >}}

    **참고**: 애플리케이션 키를 사용하여 인증하는 경우 [**Organization Settings > Application Keys**][4]에서 해당 키에 대해 [액션 API 액세스][3]를 활성화하세요. 액션 API 액세스는 애플리케이션 키에 대해 기본적으로 비활성화되며, Workflow Automation API에 액세스할 때 필요합니다.

1. 연결 후 요청을 수행하면 AI 클라이언트가 사용자를 대신하여 적절한 도구를 호출합니다.
    - "내 팀이 소유하고 모니터링 경보에 의해 트리거된 워크플로를 찾아줘."
    - "이 모니터링을 통해 경보가 전송될 때 Bits Investigation을 실행하는 워크플로를 생성한 다음 결과를 Slack에 게시해 줘."
    - "마지막으로 실패한 워크플로 실행을 디버깅해 줘."

## 권한 {#permissions}

Workflow Automation MCP 도구는 사용자의 기존 Datadog 권한을 사용합니다. 작업은 MCP 인증에 사용되는 Datadog 조직에서 수행됩니다.

| 권한       | 기능                                                                          |
|------------------|----------------------------------------------------------------------------------------|
| 워크플로 읽기   | 워크플로, 스키마 및 액션 찾기 및 검색, 사양 검증, 실행 검사 |
| 워크플로 쓰기  | 워크플로 생성, 업데이트, 게시, 게시 취소 및 영구 삭제                   |
| 워크플로 실행    | 워크플로 시작 및 처리 중인 실행 취소                                          |

## 사용 가능한 도구 {#available-tools}

`workflows` 도구 세트는 이 도구 세트에서 지원하는 워크플로 수명 주기 부분별로 그룹화하여 다음 도구를 노출합니다. 여기에는 워크플로 찾기 및 검사, 사양 및 액션 검색, 워크플로 생성 및 관리, 사양 검증, 실행 처리 및 검사, 단계 디버깅이 포함됩니다. 자연어로 자동화 요청을 전송하면 AI 클라이언트가 사용자를 대신하여 이러한 도구를 호출합니다. AI 클라이언트는 결과를 연결하여 원하는 출력을 생성합니다. 권한 및 요청 예시를 포함한 각 도구에 대한 자세한 내용은 [Datadog MCP Server 도구 참조][5]를 참조하세요.

### 워크플로 검색 {#workflow-discovery}

- [`list_datadog_workflows`][6]
- [`get_datadog_workflow`][7]

### 사양 및 액션 검색 {#specification-and-action-discovery}

- [`get_datadog_workflow_spec_schema`][8]
- [`search_datadog_workflow_actions`][9]
- [`get_datadog_workflow_action`][10]

### 워크플로 생성 및 관리 {#workflow-creation-and-management}

- [`create_datadog_workflow`][11]
- [`update_datadog_workflow`][12]
- [`publish_datadog_workflow`][13]
- [`unpublish_datadog_workflow`][14]
- [`delete_datadog_workflow`][15]
- [`validate_datadog_workflow`][16]

### 워크플로 실행 {#workflow-execution}

- [`execute_datadog_workflow`][17]
- [`get_datadog_workflow_instance`][18]
- [`list_datadog_workflow_instances`][19]
- [`cancel_datadog_workflow_instance`][20]
- [`get_datadog_workflow_step_data`][21]

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/mcp_server/setup/
[2]: https://modelcontextprotocol.io/
[3]: /ko/account_management/api-app-keys/#actions-api-access
[4]: https://app.datadoghq.com/organization-settings/application-keys
[5]: /ko/mcp_server/tools/#workflows
[6]: /ko/mcp_server/tools/#list_datadog_workflows
[7]: /ko/mcp_server/tools/#get_datadog_workflow
[8]: /ko/mcp_server/tools/#get_datadog_workflow_spec_schema
[9]: /ko/mcp_server/tools/#search_datadog_workflow_actions
[10]: /ko/mcp_server/tools/#get_datadog_workflow_action
[11]: /ko/mcp_server/tools/#create_datadog_workflow
[12]: /ko/mcp_server/tools/#update_datadog_workflow
[13]: /ko/mcp_server/tools/#publish_datadog_workflow
[14]: /ko/mcp_server/tools/#unpublish_datadog_workflow
[15]: /ko/mcp_server/tools/#delete_datadog_workflow
[16]: /ko/mcp_server/tools/#validate_datadog_workflow
[17]: /ko/mcp_server/tools/#execute_datadog_workflow
[18]: /ko/mcp_server/tools/#get_datadog_workflow_instance
[19]: /ko/mcp_server/tools/#list_datadog_workflow_instances
[20]: /ko/mcp_server/tools/#cancel_datadog_workflow_instance
[21]: /ko/mcp_server/tools/#get_datadog_workflow_step_data
[22]: /ko/actions/actions_catalog/