---
algolia:
  rank: 65
  tags:
  - mcp
  - mcp server
  - code execution
  - code-exec
description: 단일 MCP 도구 호출로 Datadog API에 대해 에이전트가 작성한 JavaScript를 실행하여 여러 Datadog 제품에
  걸친 문제를 조사하세요.
further_reading:
- link: mcp_server
  tag: 설명서
  text: Datadog MCP Server
- link: mcp_server/setup
  tag: 설명서
  text: Datadog MCP Server 설정
- link: mcp_server/tools
  tag: 설명서
  text: Datadog MCP Server 도구
title: MCP Server를 통한 코드 실행
---
## 개요 {#overview}

Datadog MCP Server의 `code-exec` 도구 세트를 사용하면 AI 에이전트가 Datadog API에 대해 JavaScript를 작성하고 실행할 수 있으며, API 요청마다 도구를 호출하는 대신 단일 MCP 도구 호출로 처리할 수 있습니다. 에이전트가 생성한 코드는 Datadog이 관리하는 샌드박스 내에서 실행됩니다. 에이전트로 다시 전송되는 유일한 데이터는 코드가 반환하는 값입니다. 이는 대규모 API 응답이 모델의 컨텍스트에 포함되지 않도록 합니다.

여러 Datadog 제품에 걸친 조사나 에이전트가 여러 호출의 데이터를 결합, 필터링 또는 요약해야 하는 경우 코드 실행을 사용하세요. 예를 들어 동일한 서비스와 시간 범위의 오류 로그를 APM 지연 시간과 연관시키는 경우가 있습니다.

## 코드 실행을 사용하는 이유 {#why-use-code-execution}

코드 실행 기능이 없으면, 상위 오류 발생 서비스를 APM 지연 시간 데이터로 보강하라는 지시를 받은 에이전트는 각 서비스마다 별도의 도구 호출이 필요합니다. 또한 결과를 결합하기 위해 추가적인 턴이 필요합니다. 이러한 각 호출과 턴은 컨텍스트 창 공간을 소비합니다.

코드 실행 기능을 사용하면 에이전트는 동일한 조사를 단일 스크립트로 표현합니다.

1. 특정 시간 범위에서 오류 로그가 가장 많은 서비스에 대해 로그를 쿼리합니다.
1. 반환된 각 서비스에 대해 지연 시간 데이터를 얻기 위해 스팬을 쿼리합니다.
1. 두 결과 집합을 결합하고 간결한 객체를 반환합니다.

MCP Server는 스크립트를 실행하고 결합된 결과만 반환합니다. 에이전트는 서비스당 하나의 호출 대신 단일 도구 호출로 조사를 완료합니다.

## 사용 가능한 도구 {#available-tools}

`code-exec` 도구 세트는 다음을 제공합니다.

- **`execute_code`**: 샌드박스에서 에이전트가 작성한 JavaScript를 실행하고 구조화된 결과를 반환합니다. 권한 및 예시 프롬프트는 MCP Server Tools 참조의 [`execute_code`][1]를 참조하세요.
- **`search_datadog_sdk`**: 에이전트가 스크립트를 작성하는 데 사용할 수 있는 SDK 함수 및 API 메서드를 조회합니다. MCP Server Tools 참조의 [`search_datadog_sdk`][2]를 참조하세요.

생성된 코드는 공개 [Datadog API Client for TypeScript][3] 기반의 JavaScript입니다.

## 샌드박스가 액세스할 수 있는 항목 {#what-the-sandbox-can-access}

`code-exec` 도구 세트에서 실행되는 코드는 사용자의 ID를 사용하여 Datadog API에 대해 실행됩니다. 에이전트는 사용자가 액세스 권한을 가진 데이터만 읽을 수 있습니다. 기타 액세스 제한 사항은 다음과 같습니다.

- 샌드박스는 격리되어 있습니다. 스크립트는 로컬 머신, 파일 시스템, 임의의 네트워크 대상 또는 원시 Datadog 자격 증명에 액세스할 수 없습니다.
- 샌드박스는 읽기 전용 Datadog API 호출만 노출합니다. 에이전트는 `execute_code`를 사용하여 모니터 생성이나 대시보드 업데이트와 같은 쓰기 작업을 수행할 수 없습니다.
- 스크립트에서 수행된 API 호출에는 사용자의 기존 [역할 권한][4]이 적용됩니다. 데이터셋에 대한 액세스 권한이 없는 경우, 에이전트도 `execute_code`를 통해 해당 데이터셋을 쿼리할 수 없습니다.
- 원시 API 응답은 스크립트가 처리하는 동안 샌드박스 내부에 유지됩니다. 에이전트로 다시 전송되는 유일한 데이터는 코드가 반환하는 값입니다. 로그에 저장된 고객 데이터와 같이 원본 데이터가 민감한 경우 스크립트가 반환하는 내용을 검토하세요.

## 코드 실행 활성화 {#enable-code-execution}

코드 실행을 활성화하려면 AI 클라이언트를 Datadog MCP Server에 연결할 때 `toolsets` 쿼리 파라미터에 `code-exec`을 포함하세요. 클라이언트별 연결 지침은 [Datadog MCP Server 설정][5]을 참조하세요.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
예를 들어, 선택한 [Datadog 사이트][6]({{< region-param key="dd_site_name" >}})에 따라 이 URL을 사용하면 코드 실행과 함께 핵심 도구 세트를 활성화할 수 있습니다.

<pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,code-exec</code></pre>

`code-exec`은 `toolsets=all`에 포함되어 있으므로, 이미 모든 일반 제공 도구 세트를 활성화했다면 별도로 추가할 필요가 없습니다.

[6]: /ko/getting_started/site/
{{< /site-region >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/mcp_server/tools/#execute_code
[2]: /ko/mcp_server/tools/#search_datadog_sdk
[3]: https://github.com/DataDog/datadog-api-client-typescript
[4]: /ko/account_management/rbac/permissions/
[5]: /ko/mcp_server/setup