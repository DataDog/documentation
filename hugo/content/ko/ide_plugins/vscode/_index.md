---
aliases:
- /ko/developers/ide_integrations/vscode/
- /ko/developers/ide_plugins/vscode/
- /ko/ide_plugins/vscode/logs/
description: Datadog 텔레메트리와 인사이트를 VS Code 및 기타 코드 편집기의 소스 코드에 통합
further_reading:
- link: /continuous_testing/
  tag: 문서
  text: Continuous Testing에 대해 알아보기
- link: /integrations/guide/source-code-integration/
  tag: 문서
  text: 소스 코드 통합에 대해 알아보기
- link: /mcp_server/
  tag: 문서
  text: Datadog MCP Server에 대해 알아보기
- link: https://www.datadoghq.com/blog/datadog-ide-plugins/
  tag: 블로그
  text: Datadog IDE 플러그인으로 문제 해결 중 컨텍스트 전환 줄이기
- link: https://www.datadoghq.com/blog/datadog-cursor-extension/
  tag: 블로그
  text: Datadog Cursor 확장 프로그램으로 실시간 프로덕션 문제 디버깅
is_beta: true
title: VS Code 및 Cursor용 Datadog 확장 프로그램
---
<!-- TO CONTRIBUTORS: This content also exists in the extension's README file. Remember to update the README when you change anything in this file. -->

## 개요 {#overview}

VS Code 및 Cursor용 Datadog 확장 프로그램은 코드 편집기에 Datadog을 통합하여 개발 속도를 높입니다.

{{< img src="/ide_plugins/vscode/datadog-vscode-3.png" alt="VS Code 및 Cursor용 Datadog 확장 프로그램" style="width:100%;" >}}

이 확장 프로그램에는 다음 기능이 포함됩니다.

- [**Code Security**](#code-security): 커밋하기 전에 보안 문제를 탐지하고 수정하며, 사용자 지정 규칙을 작성합니다.

- [**Code Insights**](#code-insights): 코드에서 벗어나지 않고 코드 및 라이브러리 취약성에 대한 정보를 확인합니다.

- [**View in IDE**](#view-in-ide): Datadog의 코드 참조에서 소스 파일로 바로 이동합니다.

- [**Fix in Chat**](?tab=cursor#fix-in-chat): AI 기반 제안과 설명을 활용해 코드 오류, 취약성 및 불안정한 테스트를 수정합니다.

<div class="alert alert-info">별도로 명시되지 않는 한, 모든 확장 프로그램 기능은 VS Code 및 Cursor와 같은 VS Code 포크를 기반으로 한 기타 IDE에서 사용할 수 있습니다.</div>

## 요구 사항 {#requirements}

- **Datadog 계정**: 대부분의 기능을 사용하려면 Datadog 계정이 필요합니다.
    - Datadog을 처음 사용하시나요? Datadog의 모니터링 및 보안 도구에 대해 [자세히 알아보고][3] 무료 체험에 가입하세요.
    - 조직에서 `myorg.datadoghq.com`과 같은 [사용자 지정 하위 도메인][18]을 사용하는 경우, IDE의 `datadog.connection.oauth.setup.domain` 설정에서 해당 하위 도메인을 지정해야 합니다.

- **Git**: IDE에서 Git이 활성화되어 있으면 확장 프로그램이 더 효과적으로 동작합니다. `git.enabled` 설정이 켜져 있는지 확인합니다.

## 설치 {#installation}

설치 단계는 다른 VS Code 기반 편집기에서 다를 수 있습니다.

{{< tabs >}}
{{% tab "VS Code" %}}
IDE에서 직접 또는 웹에서 확장 프로그램을 설치하세요.

- **VS Code에서 설치**: Extensions 보기를 열고(`Shift`+`Cmd/Ctrl`+`X`), `datadog`을 검색한 후 Datadog의 공식 확장 프로그램을 선택합니다.

- **웹에서 설치**: [Visual Studio Marketplace][1]의 확장 프로그램 페이지에서 설치합니다.

### Datadog MCP Server 설정 {#datadog-mcp-server-setup}

확장 프로그램을 사용하여 Datadog에 로그인하고 `Datadog: Open MCP Configuration Assistant` 명령을 실행합니다. 안내에 따라 [Datadog MCP Server][3]를 구성합니다.

[1]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode
[3]: /ko/mcp_server/

{{% /tab %}}

{{% tab "Cursor" %}}
IDE에서 직접 또는 웹에서 확장 프로그램을 설치하세요.

- **Cursor에서 설치**: Extensions 보기를 열고(`Shift`+`Cmd/Ctrl`+`X`), `datadog`을 검색한 후 Datadog의 공식 확장 프로그램을 선택합니다.

- **웹에서 설치**: [Open VSX Registry][2]에서 VSIX 파일을 다운로드하고, 명령 팔레트(`Shift`+`Cmd/Ctrl`+`P`)에서 `Extensions: Install from VSIX`로 설치합니다.

### Datadog MCP Server 설정 {#datadog-mcp-server-setup-1}

[Datadog MCP Server][3]를 활성화하기 위해 Datadog 플러그인을 설치합니다. [Cursor Marketplace][4] 또는 **Cursor Settings** > **Plugins**에서 플러그인을 설치할 수 있습니다.

[2]: https://open-vsx.org/extension/datadog/datadog-vscode
[3]: /ko/mcp_server/setup/?tab=cursor
[4]: https://cursor.com/marketplace/datadog

{{% /tab %}}
{{< /tabs >}}

## 핵심 기능 {#core-features}

### Code Security {#code-security}

[**Code Security**][19] 기능은 미리 정의된 규칙에 따라 로컬에서 코드를 분석하여 변경 사항을 커밋하기 전에 보안 문제와 취약성을 탐지하고 수정할 수 있도록 도와줍니다.

{{< img src="/ide_plugins/vscode/static_analysis.mp4" alt="Static Analysis 미리 보기" style="width:100%" video=true >}}

[Code Security][19] 하위 섹션에서 자세히 알아보세요.

### Code Insights {#code-insights}

**Code insights**는 코드베이스와 관련된 코드 및 라이브러리 취약성에 대한 정보를 제공합니다.

{{< img src="/ide_plugins/vscode/code-insights-2.png" alt="Code insights 보기." style="width:100%;" >}}

[Code Insights][21] 하위 섹션에서 자세히 알아보세요.

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

이 확장 프로그램은 Code Security에서 사용되는 {{< ui >}}Fix with Cursor{{< /ui >}} 딥 링크도 처리합니다. Datadog UI 또는 풀 리퀘스트 댓글에서 {{< ui >}}Fix with Cursor{{< /ui >}}를 클릭하면 확장 프로그램이 Cursor에서 작업 공간을 엽니다. 그런 다음 관련 리포지토리, 브랜치 및 커밋을 체크아웃하고 해당 발견 결과에 맞는 사용자 지정 수정 프롬프트를 로드합니다.

## 데이터 및 텔레메트리 {#data-and-telemetry}

Datadog은 이 IDE의 사용 방식에 대한 정보를 수집합니다. 여기에는 IDE와 상호 작용하는 방식, 오류 발생 여부, 오류의 원인 및 사용자 식별자가 포함됩니다. 수집은 [Datadog 개인정보 처리방침][13] 및 Datadog의 [VS Code 확장 프로그램 EULA][12]를 따릅니다. Datadog은 이 데이터를 사용하여 확장 프로그램의 성능과 기능을 개선합니다. 수집되는 정보에는 확장 프로그램과 Datadog 로그인 페이지 간의 이동도 포함됩니다.

이 데이터를 [Datadog][3]에 전송하지 않으려면, 언제든지 확장 프로그램의 설정(`Datadog > Telemetry > Setup > Enable Telemetry`)에서 비활성화하고 `disabled`를 선택하세요.

<div class="alert alert-info">Datadog 확장 프로그램은 <a href="https://code.visualstudio.com/docs/configure/telemetry#_output-channel-for-telemetry-events">VS Code 텔레메트리</a> 설정도 존중합니다.</div>

## 도움말 및 피드백{#help-and-feedback}

피드백을 공유하려면 [team-ide-integration@datadoghq.com][14]으로 이메일을 보내거나 확장 프로그램의 [퍼블릭 리포지토리][15]에 문제를 생성하세요.

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
[21]: /ko/ide_plugins/vscode/code_insights/