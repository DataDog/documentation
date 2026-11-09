---
description: Datadog Code Security MCP Server의 일반적인 문제와 해결 방법
further_reading:
- link: /security/code_security/dev_tool_int/mcp_server/
  tag: 설명서
  text: Code Security MCP Server 개요 및 설정
- link: /security/code_security/dev_tool_int/mcp_server/tools_reference/
  tag: 설명서
  text: 도구 참조
is_beta: true
title: 문제 해결
---
[Datadog Code Security MCP Server][3]와 관련된 문제가 발생하면 다음 방법을 사용하여 일반적인 문제를 진단하고 해결합니다.

<div class="alert alert-info">이 MCP 서버는 클라우드 기반 Datadog 기능 및 데이터 액세스를 제공하는 <a href="/mcp_server">Datadog MCP Server</a>와는 별개입니다. Code Security MCP Server는 로컬에서 실행되며 코드 수준 보안 스캔에 중점을 둡니다.</div>

## 바이너리를 찾을 수 없음 {#binary-not-found}

스캔에서 바이너리가 없다는 오류가 반환되면 다음과 같이 필요한 모든 스캐너를 나열합니다.

```shell
datadog-code-security-mcp version --detailed
```

[보안 바이너리 설치][1]의 지침에 따라 누락된 바이너리를 설치합니다. 에이전트 스킬을 설치한 후에는 `dd-codesec-setup-toolchain`을 사용하여 동일한 바이너리를 설치, 업데이트하고 문제를 진단할 수 있습니다. [에이전트 스킬 설치][4]를 참조하세요.

## 인증 오류 {#authentication-errors}

MCP 서버 구성에 설정된 키는 셸로 내보내지지 않습니다. `echo $DD_API_KEY`는 해당 셸로 내보낸 키만 표시하며, 직접 실행하는 CLI 명령에서도 이 키를 사용합니다.

- MCP 서버의 경우, [Code Security MCP Server][3] 페이지의 클라이언트 구성에 `DD_API_KEY` 및 `DD_APP_KEY`가 설정되어 있는지 확인합니다.
- CLI 명령을 직접 실행하는 경우 동일한 셸에서 `DD_API_KEY` 및 `DD_APP_KEY`를 내보냅니다. 필요시 `DD_SITE`를 내보냅니다.

값이 설정되어 있는데도 스캔이 계속 실패하면 키에 적절한 권한이 있는지 확인합니다. 자세한 내용은 [API 및 애플리케이션 키][2]를 참조하세요.

## MCP 서버 응답 없음 {#mcp-server-not-responding}

1. 바이너리가 설치되어 있고 액세스할 수 있는지 확인합니다.

    ```shell
    datadog-code-security-mcp version
    ```

2. MCP 서버 로그를 확인합니다.

    ```shell
    tail -f ~/Library/Logs/Claude/mcp*.log
    tail -f ~/.claude/logs/mcp*.log
    ```

3. 클라이언트 구성에 올바른 바이너리 경로가 지정되어 있는지 확인합니다. Homebrew를 통해 설치했다면 바이너리가 `PATH`에 있어야 합니다. 그렇지 않으면 구성에서 절대 경로를 사용합니다.

## 부분 결과 {#partial-results}

종합 스캔을 실행하면 일부 스캔 유형은 성공하고 다른 유형은 실패할 수 있습니다(예: 일부 바이너리만 설치된 경우). 서버는 다음을 반환합니다.

- 정상적으로 실행된 모든 스캐너의 결과
- 실패한 스캐너의 설치 지침이 포함된 오류 메시지

이는 예상된 동작입니다. 누락된 바이너리를 설치하고 스캔을 다시 실행하여 전체 결과를 확인합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/code_security/dev_tool_int/mcp_server/#install-security-binaries
[2]: /ko/account_management/api-app-keys/
[3]: /ko/security/code_security/dev_tool_int/mcp_server/
[4]: /ko/security/code_security/dev_tool_int/mcp_server/#install-agent-skills