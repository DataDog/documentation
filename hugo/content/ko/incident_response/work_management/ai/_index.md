---
aliases:
- /ko/service_management/case_management/mcp_server/
- /ko/incident_response/case_management/mcp_server/
- /ko/incident_response/case_management/ai/
description: Datadog Work Management는 AI 도구와 통합되어 Datadog MCP Server 및 사용자 지정 Agent를
  사용하여 작업 항목 분류, 할당 및 해결을 자동화하도록 지원합니다.
site_support_id: work_management_ai_site_support
title: Work Management를 위한 AI 도구
---
Datadog Work Management를 사용하면 사람과 함께 AI Agent에게도 작업 항목을 할당할 수 있습니다. 이 프로그램은 Datadog MCP Server 및 Bits Agent Builder로 구축된 사용자 지정 Agent와 통합되어 작업 항목 분류, 할당 및 해결을 자동화합니다.

## MCP Server {#mcp-server}

Datadog MCP Server는 [MCP(Model Context Protocol)][2]를 지원하는 AI Agent가 Work Management 데이터에 액세스할 수 있도록 `cases` 도구 세트를 노출합니다. `cases` 도구 세트를 사용하면 AI Agent가 작업 항목을 생성, 검색, 업데이트 및 관리할 수 있습니다. 지원되는 워크플로는 다음과 같습니다.

상태, 우선순위, 프로젝트 또는 기타 필터 기준 - **작업 항목 검색**
최신 작업 타임라인과 남은 작업을 파악하기 위한 - **작업 항목 세부 정보 검색**
진행 중인 조사와 관련된 정보를 추적하기 위한 - **새 작업 항목 생성**
새로운 결과, 관련 Jira 티켓 링크 또는 에스컬레이션된 우선순위로 - **기존 작업 항목 업데이트**

`cases` 도구 세트에 대한 설정 지침 및 전체 세부 정보는 [Datadog MCP Server 설명서][1]를 참조하세요.

## 사용자 지정 Agent {#custom-agents}

{{< callout url="https://www.datadoghq.com/product-preview/custom-agents-in-case-management/" btn_hidden="false" header="미리 보기에 참여하세요">}} 사용자 지정 Agent와의 Work Management 통합은 현재 미리 보기 상태입니다.{{< /callout >}}

[Bits Agent Builder][3]로 빌드된 특수 Agent에 작업 항목을 할당하여 초기 분류부터 후속 조치 및 해결까지 전체 작업 항목 수명 주기를 자동화할 수 있습니다. 예시 사용 사례, Agent 아키타입, 수동 및 자동 할당에 대한 내용은 [사용자 지정 Agent][4]를 참조하세요.

[1]: /ko/mcp_server
[2]: https://modelcontextprotocol.io/
[3]: /ko/actions/agents/
[4]: /ko/incident_response/work_management/ai/custom_agents/