---
description: VS 코드의 로컬 환경에서 Synthetic 테스트를 직접 실행하는 방법에 대해 알아봅니다.
further_reading:
- link: /getting_started/synthetics/
  tag: 설명서
  text: Synthetic 모니터링 시작하기
- link: /continuous_testing/testing_tunnel/
  tag: 설명서
  text: Continuous Testing Tunnel에 대해 알아보세요.
- link: /integrations/guide/source-code-integration/
  tag: 설명서
  text: 소스 코드 통합에 대해 알아봅니다.
is_beta: true
kind: documentation
title: Visual Studio Code를 위한 Datadog 확장 기능
---

## 개요

 Visual Studio Code (VS Code)용 Datadog 확장 기능은 Datadog과 통합되어 개발을 촉진합니다.

{{< img src="/developers/ide_integrations/vscode/datadog-vscode.png" alt="VS 코드 확장을 위한 Datadog" style="width:100%;" >}}

**Code Insights** 보기를 통해 다음과 같은 정보를 얻을 수 있습니다:
- [Error Tracking][10]에서 발생하는 문제
- 애플리케이션 보안 관리에 의한 [Vulnerability][11] 보고서
- CI Visibility에 의해 감지된 [불안정한 테스트][12] 
- [Watchdog Insights][13]의 프로파일링 인사이트

**Synthetic 테스트**를 통해 다음을 수행할 수 있습니다:
- 로컬 환경에서 Synthetic 테스트 실행
- 원래 테스트 정의를 변경하지 않고 커스텀 파라미터 설정
- 로컬에서 테스트 결과를 확인하고 추가 정보에 액세스하려면 VS Code와 Datadog에서 확인하세요.
- 관련 테스트를 동시에 수행하여 중요한 것만 테스트
- 작업 공간에 연결하여 가장 자주 사용하는 Synthetic 테스트 목록 만들기

**View in VS Code** 기능은 Datadog에서 소스 파일로 직접 연결하는 링크를 제공합니다.

## 요구 사항

- **Datadog 계정**: 확장을 사용하기 위해서는 Datadog 계정이 필요합니다. Datadog을 처음 사용하신다면 [Datadog 웹사이트][2]에서 Datadog의 도구에 대해 자세히 살펴보시고, 무료 체험판에 가입하세요.

## 설정

Visual Studio Marketplace에서 [Datadog 확장][6]을 설치합니다.

## Code Insights
**Code Insights** 트리는 코드 기반과 관련된 Datadog 플랫폼에서 생성한 인사이트를 표시합니다. 인사이트는 성능, 안정성, 보안의 세 가지 카테고리로 분류됩니다.

{{< img src="/developers/ide_integrations/vscode/code-insights.png" alt="Code Insights 보기." style="width:100%;" >}}

Code Insights에는 각 문제에 대한 상세한 설명과 다음 링크가 포함됩니다:
- 관련 소스 코드 위치
- 추가 정보를 위한 Datadog 플랫폼

개별 인사이트를 해제하고 필터를 설정하여 가장 관심 있는 인사이트 카테고리를 볼 수 있습니다.

## Synthetic 테스트
Datadog 확장 기능을 사용하면 IDE에서 직접 [로컬 환경에서 Synthetic HTTP 테스트 및 브라우저 테스트를 실행][1]할 수 있습니다. 코드가 프로덕션 환경에 배포되어 최종 사용자에게 영향을 미치기 전에 코드 변경으로 인해 발생할 수 있는 잠재적 문제를 식별하고 해결할 수 있습니다.

{{< img src="developers/ide_integrations/vscode/vscode-extension-demo.png" alt="VS 코드의 Datadog 확장" style="width:100%;" >}}

### 로컬에서 Synthetic 테스트 실행

1. Synthetic 테스트를 선택하여 실행합니다. **Search** 아이콘을 클릭하여 특정 테스트를 검색할 수 있습니다.
2. 테스트의 설정을 변경하여 시작 URL을 변환하고 **Settings** 페이지에서 `localhost` URL을 지정합니다.
3. 테스트를 실행합니다.

{{< img src="developers/ide_integrations/vscode/test_configuration_modified_starturl.png" alt="테스트 설정 패널 및 설정 페이지에서 Synthetic 테스트의 시작 URL을 로컬 호스트 URL로 지정할 수 있습니다." style="width:100%;" >}}

Synthetic 테스트를 아직 설정하지 않은 경우 [Datadog 테스트를 생성합니다][3]. 로컬 환경에서 테스트를 실행하는 하는 방법에 대한 자세한 내용은 [API 테스트 시작][4], [브라우저 테스트 시작][5] 및 [지속적인 테스트 터널 설명서][1]를 참조하세요.

### 권한 허용

기본적으로 [Datadog 관리자 및 Datadog 표준 역할][7]을 가진 사용자만 Synthetic HTTP 및 브라우저 테스트를 생성, 편집 및 삭제할 수 있습니다. Synthetic HTTP 및 브라우저 테스트에 대한 생성, 편집 및 삭제 액세스 권한을 얻으려면, 사용자를 이 두 가지 [기본 역할][7] 중 하나로 업그레이드하세요.

[커스텀 역할 기능][8]을 사용하는 경우 `synthetics_read` 및 `synthetics_write` 권한을 포함하는 모든 커스텀 역할에 사용자를 추가합니다.

## VS 코드로 보기

**View in VS Code** 기능은 Datadog에서 소스 파일로 직접 링크를 제공합니다. UI에 표시된 스택 트레이스의 프레임 옆에 있는 버튼을 찾습니다(예: [Error Tracking][10]):

{{< img src="/developers/ide_integrations/vscode/view-in-vscode.png" alt="View in VS Code 버튼을 보여주는 Datadog 플랫폼의 스택 트레이스." style="width:100%;" >}}

<div class="alert alert-info">이 기능을 사용하려면 먼저 서비스에 대한 <a href="/integrations/guide/source-code-integration/">소스 코드 통합</a>을 설정하세요.</div>

## 피드백

피드백을 공유하려면 [team-ide-integration@datadoghq.com][9]로 이메일을 보내주세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/continuous_testing/testing_tunnel/
[2]: https://www.datadoghq.com/
[3]: https://app.datadoghq.com/synthetics/create
[4]: /ko/getting_started/synthetics/api_test
[5]: /ko/getting_started/synthetics/browser_test
[6]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode
[7]: /ko/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[8]: /ko/account_management/rbac/?tab=datadogapplication#custom-roles
[9]: mailto:team-ide-integration@datadoghq.com
[10]: /ko/tracing/error_tracking/
[11]: /ko/security/application_security/vulnerability_management/
[12]: /ko/continuous_integration/guides/flaky_test_management/
[13]: /ko/watchdog/insights