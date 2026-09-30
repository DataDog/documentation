---
aliases:
- /ko/developers/ide_integrations/vscode/
- /ko/developers/ide_plugins/vscode/
description: Datadog 텔레메트리와 인사이트를 VS Code 및 기타 코드 편집기의 소스 코드에 통합
further_reading:
- link: /continuous_testing/
  tag: 설명서
  text: Continuous Testing에 대해 알아보기
- link: /integrations/guide/source-code-integration/
  tag: 설명서
  text: 소스 코드 통합에 대해 알아보기
- link: /bits_ai/mcp_server/
  tag: 설명서
  text: Datadog Model Context Protocol(MCP) Server에 대해 알아보기
- link: https://www.datadoghq.com/blog/datadog-ide-plugins/
  tag: 블로그
  text: Datadog IDE 플러그인으로 문제 해결 중 컨텍스트 전환 줄이기
- link: https://www.datadoghq.com/blog/exception-replay-datadog/
  tag: 블로그
  text: Datadog Exception Replay로 프로덕션 디버깅 간소화하기
- link: https://www.datadoghq.com/blog/datadog-cursor-extension/
  tag: 블로그
  text: Datadog Cursor 확장으로 실시간 프로덕션 문제 디버그
is_beta: true
title: VS Code 및 Cursor용 Datadog 확장
---
<!-- TO CONTRIBUTORS: This content also exists in the extension's README file. Remember to update the README when you change anything in this file. -->

{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">
    선택한 <a href="/getting_started/site">Datadog 사이트</a>에 대해 Visual Studio Code용 Datadog 확장이 지원되지 않습니다({{< region-param key="dd_site_name" >}}).
</div>
{{% /site-region %}}

## 개요 {#overview}

VS Code 및 Cursor용 Datadog 확장은 코드 편집기에 Datadog을 통합하여 개발 속도를 높입니다.

{{< img src="/ide_plugins/vscode/datadog-vscode-3.png" alt="VS Code 및 Cursor용 Datadog 확장" style="width:100%;" >}}

이 확장에는 다음 기능이 포함됩니다.

-   [**Model Context Protocol(MCP) Server**](?tab=cursor#installation): 편집기의 AI 에이전트를 Datadog의 프로덕션 텔레메트리, 도구 및 컨텍스트에 연결합니다.

-   [**Logs**](#logs): 로그 볼륨을 측정하고 코드에서 로그를 검색합니다.

-   [**Code Insights**](#code-insights): 코드를 떠나지 않고도 런타임 오류, 취약점 및 불안정한 테스트에 대한 정보를 유지합니다.

-   [**View in IDE**](#view-in-ide): Datadog의 코드 참조에서 소스 파일로 직접 이동합니다.

-   [**Code Security**](#code-security): 커밋하기 전에 보안 문제를 감지하고 수정하며, 사용자 지정 규칙을 작성합니다.

-   [**Exception Replay**](#exception-replay): 프로덕션 코드를 디버깅합니다.

-   [**Live Debugger**](#live-debugger): 재배포 없이 실행 중인 서비스에 중단되지 않는 로그 포인트를 추가하여 런타임 데이터를 캡처합니다.

-   [**Fix in Chat**](?tab=cursor#fix-in-chat): AI 기반 제안 및 설명을 통해 코드 오류, 취약점 및 불안정한 테스트를 수정합니다.

<div class="alert alert-info">별도로 명시되지 않는 한, 모든 확장 기능은 VS Code 및 Cursor와 같은 VS Code 포크를 기반으로 한 다른 IDE에서 사용할 수 있습니다.</div>

## 요구 사항 {#requirements}

-   **Datadog 계정**: 대부분의 기능은 Datadog 계정이 필요합니다.

    -   Datadog을 처음 사용하시나요? Datadog의 모니터링 및 보안 도구에 대해 [자세히 알아보고][3] 무료 체험에 가입하세요.
    -   조직에서 `myorg.datadoghq.com`와 같은 [사용자 지정 하위 도메인][18]을 사용하는 경우, IDE의 `datadog.connection.oauth.setup.domain` 설정을 사용하여 이를 표시해야 합니다.

-   **Git**: IDE에서 Git이 활성화되어 있으면 확장 프로그램이 더 효과적으로 동작합니다. `git.enabled` 설정에서 Git 기능이 활성화되어 있는지 확인하세요.

## 설치 {#installation}

설치 단계는 다른 VS Code 기반 편집기에서 다를 수 있습니다.

{{< tabs >}}
{{% tab "VS Code" %}}
IDE에서 직접 또는 웹에서 확장 기능을 설치하세요.

-   **VS Code에서 설치**: 확장 보기(`Shift` + `Cmd/Ctrl` + `X`)를 열고, `datadog`을 검색한 후 Datadog의 공식 확장 기능을 선택하세요.

-   **웹에서 설치**: [Visual Studio Marketplace][1]의 확장 기능 페이지에서 설치하세요.

### MCP 서버 설정 {#mcp-server-setup}

이 확장 기능은 [Datadog Model Context Protocol(MCP) Server][3]에 대한 액세스를 포함합니다. 특정 Datadog 환경으로 편집기의 AI 기능을 향상시키기 위해 MCP 서버가 활성화되어 있는지 확인하세요.

1. 채팅 패널을 열고, 에이전트 모드를 선택한 후 **도구 구성** 버튼을 클릭하세요.
   {{< img src="bits_ai/mcp_server/vscode_configure_tools_button.png" alt="VS Code의 도구 구성 버튼" style="width:60%;" >}}

1. Datadog 서버와 도구를 목록에서 찾아 체크박스를 선택하여 활성화하세요(필요시 확장하거나 새로 고침하세요).

[1]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode
[3]: /ko/bits_ai/mcp_server/

{{% /tab %}}

{{% tab "커서" %}}
IDE에서 직접 또는 웹에서 확장 기능을 설치하세요.

-   **커서에서 설치**: 확장 보기 (`Shift` + `Cmd/Ctrl` + `X`)를 열고, `datadog`을 검색한 후 Datadog의 공식 확장 기능을 선택하세요.

-   **웹에서 설치**: [Open VSX Registry][2]에서 VSIX 파일을 다운로드하고, 명령 팔레트(`Shift` + `Cmd/Ctrl` + `P`)에서 `Extensions: Install from VSIX`로 설치합니다.

### Datadog MCP 서버 설정 {#datadog-mcp-server-setup}

[Datadog MCP Server][3]를 활성화하기 위해 Datadog 플러그인을 설치합니다. [Cursor Marketplace][4] 또는 **Cursor Settings** > **Plugins**에서 플러그인을 설치할 수 있습니다.

[2]: https://open-vsx.org/extension/datadog/datadog-vscode
[3]: /ko/bits_ai/mcp_server/setup/?tab=cursor
[4]: https://cursor.com/marketplace/datadog

{{% /tab %}}
{{< /tabs >}}

## 핵심 기능 {#core-features}

### Logs {#logs}

**Logs**를 사용하여 코드의 특정 로그 라인에서 생성된 로그의 양을 측정합니다. 이 확장 기능은 Datadog의 로그와 일치하는 감지된 로깅 패턴에 대해 코드 위에 주석을 추가합니다.

{{< img src="/ide_plugins/vscode/logs_navigation.mp4" alt="로그 탐색 미리보기" style="width:100%" video=true >}}

[Logs][20] 하위 섹션에서 더 많은 정보를 확인하세요.

### Code Insights {#code-insights}

**Code Insights**는 런타임 오류, 코드 취약점 및 불안정한 테스트를 포함하여 코드 베이스와 관련된 Datadog 생성 인사이트로 정보를 제공합니다.

{{< img src="/ide_plugins/vscode/code-insights-2.png" alt="Code insights 보기." style="width:100%;" >}}

[Code Insights][21] 하위 섹션에서 자세히 알아보세요.

### Code Security {#code-security}

[**Code Security**][19] 기능은 미리 정의된 규칙에 따라 로컬에서 코드를 분석하여, 변경 사항을 커밋하기 전에 보안 문제와 취약점을 감지하고 수정할 수 있도록 도와줍니다.

{{< img src="/ide_plugins/vscode/static_analysis.mp4" alt="Static Analysis 미리보기" style="width:100%" video=true >}}

[Code Security][19] 하위 섹션에서 자세히 알아보세요.

### Exception Replay {#exception-replay}

**Exception Replay**는 Error Tracking 코드 인사이트의 스택 트레이스 프레임을 검사하고 프로덕션에서 실행 중인 코드의 변수 값에 대한 정보를 제공합니다.

{{< img src="/ide_plugins/vscode/exception_replay.mp4" alt="Exception Replay 미리보기" style="width:100%" video=true >}}

[Exception Replay][22] 하위 섹션에서 자세히 알아보세요.

### Live Debugger {#live-debugger}

**Live Debugger**는 코드 재배포 없이 디버깅을 위해 런타임 데이터를 캡처할 수 있도록 실행 중인 서비스에 로그 포인트(자동 만료되는 비차단 중단점)를 추가할 수 있게 해줍니다.

{{< img src="/ide_plugins/vscode/live_debugger_overview.mp4" alt="Datadog Live Debugger 활동 개요" style="width:100%" video=true >}}

[Live Debugger][23] 하위 섹션에서 자세히 알아보세요.

## 기타 기능 {#other-features}

### View in IDE {#view-in-ide}

<div class="alert alert-info">이 기능은 VS Code 및 Cursor에서만 사용할 수 있습니다. VS Code의 다른 포크는 지원되지 않습니다.</div>

**View in VS Code** 또는 **View in Cursor** 기능은 Datadog에서 직접 소스 파일로 연결되는 링크를 제공합니다. UI에 표시된 스택 트레이스의 프레임 옆에 있는 버튼을 찾으세요(예: [Error Tracking][5]에서).

{{< img src="/ide_plugins/vscode/view-in-vscode-2.png" alt="Datadog에서 View in VS Code 버튼이 있는 스택 트레이스" style="width:100%;" >}}

이 기능을 사용하여 인사이트(예: Error Tracking의 오류)에서 소스 파일을 열 수도 있습니다.

{{< img src="/ide_plugins/vscode/view-in-vscode-error.png" alt="Datadog에서 View in VS Code 버튼이 있는 Error Tracking 문제" style="width:100%;" >}}

<div class="alert alert-info">이 기능을 사용하려면 먼저 <a href="/integrations/guide/source-code-integration/">소스 코드 통합</a>을 서비스에 구성하세요.</div>

### Fix in Chat {#fix-in-chat}

**Fix in Chat** 버튼은 확장 프로그램이 오류나 문제를 식별할 때 여러 상황에서 나타납니다. 버튼을 클릭하여 문제를 요약하고 관련 세부정보 및 맥락을 포함하며 에이전트에 대한 구체적인 지침을 제공하는 AI 채팅 프롬프트를 생성하세요.

{{< img src="/ide_plugins/vscode/cursor_fix_in_chat.mp4" alt="인라인 코드 오류를 수정하기 위해 채팅에서 수정 사용" style="width:100%" video=true >}}

## 데이터 및 텔레메트리 {#data-and-telemetry}

Datadog은 사용자가 IDE와 사용하는 방식, 사용 중 오류 발생 여부, 해당 오류의 원인, 사용자 식별자 등 사용자의 이 IDE 사용과 관련된 특정 정보를 수집하며, 수집은 [Datadog 개인정보 보호정책][13] 및 Datadog의 [VS Code 확장 EULA][12]에 따라 처리됩니다. 이 데이터는 확장 프로그램으로의 전환 및 서비스에 접근하기 위한 해당 Datadog 로그인 페이지 등 확장 프로그램의 성능 및 기능을 개선하는 데 사용됩니다.

이 데이터를 [Datadog][3]에 전송하지 않으려면, 언제든지 확장 프로그램의 설정(`Datadog > Telemetry > Setup > Enable Telemetry`)에서 비활성화하고 `disabled`를 선택하세요.

<div class="alert alert-info">Datadog 확장 프로그램은 <a href="https://code.visualstudio.com/docs/configure/telemetry#_output-channel-for-telemetry-events">VS Code 텔레메트리</a> 설정도 존중합니다.</div>

## 도움말 및 피드백{#help-and-feedback}

피드백을 공유하려면 [team-ide-integration@datadoghq.com][14]으로 이메일을 보내거나 확장 프로그램의 [공개 저장소][15]에 문제를 생성하세요.

[이슈][16] 섹션에서 알려진 문제를 확인하세요.

[Cursor][17] 또는 VS Code의 다른 포크를 사용하고 있습니까? [Open VSX Registry][2]에서 확장 프로그램을 찾아보세요.

## 라이선스{#license}

이 확장 프로그램을 다운로드하거나 사용하기 전에 [최종 사용자 라이선스 계약][12]을 정독하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode
[2]: https://open-vsx.org/extension/datadog/datadog-vscode
[3]: https://www.datadoghq.com/
[5]: /ko/tracing/error_tracking/
[12]: https://www.datadoghq.com/legal/eula/
[13]: https://www.datadoghq.com/legal/privacy/
[14]: mailto:team-ide-integration@datadoghq.com
[15]: https://github.com/DataDog/datadog-for-vscode
[16]: https://github.com/DataDog/datadog-for-vscode/issues?q=is%3Aissue+label%3A%22known+issue%22
[17]: https://www.cursor.com/
[18]: /ko/account_management/multi_organization/#custom-sub-domains
[19]: /ko/ide_plugins/vscode/code_security/
[20]: /ko/ide_plugins/vscode/logs/
[21]: /ko/ide_plugins/vscode/code_insights/
[22]: /ko/ide_plugins/vscode/exception_replay/
[23]: /ko/ide_plugins/vscode/live_debugger/