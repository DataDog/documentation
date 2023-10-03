---
description: Visual Studio Code를 통해 로컬 환경에서 직접 신서틱 테스트를 실행하는 방법에 대해 알아보세요.
further_reading:
- link: /getting_started/synthetics/
  tag: 설명서
  text: 신서틱(Synthetic) 모니터링 시작하기
- link: /continuous_testing/testing_tunnel/
  tag: 설명서
  text: Continuous Testing Tunnel에 대해 알아보세요.
is_beta: true
kind: 설명서
title: Visual Studio Code를 위한 Datadog 확장 프로그램
---

{{< callout url="#" btn_hidden="true">}}
Visual Studio Code용 Datadog 확장 프로그램은 공개 베타 버전입니다. <a href="https://docs.datadoghq.com/synthetics/#pagetitle">신서틱(Synthetic) 테스트</a>를 이미 설정한 Datadog 사용자를 대상으로 합니다. 확장 프로그램은 <a href="https://docs.datadoghq.com/synthetics/api_tests/http_tests">HTTP 테스트</a> 및 <a href="https://docs.datadoghq.com/synthetics/browser_tests">브라우저 테스트</a> 실행을 지원합니다. 예기치 않게 확장 프로그램이 작동을 중지하면 업데이트가 되어있는지 확인하거나 <a href=#feedback>관련 팀에 문의하세요</a>.
{{< /callout >}}

## 개요

Visual Studio Code를 위한 Datadog 확장 프로그램은 IDE의 [로컬 환경에서 신서틱 HTTP 테스트 및 브라우저 테스트를 실행][1]할 수 있어 코드 안정성을 향상시킬 수 있습니다. 확장 기능은 코드가 프로덕션에 배포되고 최종 사용자에게 영향을 미치기 전에 코드 변경으로 인한 잠재적인 문제를 식별하고 해결하도록 보장합니다.

{{< img src="developers/ide_integrations/vscode/vscode-extension-demo.png" alt="Visual Studio Code의 Datadog 확장 프로그램" style="width:100%;" >}}

Datadog 확장을 사용하여 다음 작업을 수행할 수 있습니다:

- 로컬 환경에서 신서틱(Synthetic) 테스트를 실행합니다.
- 기존 테스트 정의를 변경하지 않고 커스텀 파라미터를 설정합니다.
- 추가 정보에 액세스하려면 Visual Studio Code 및 Datadog에서 로컬 테스트 결과를 참조하세요.
- 관련 테스트를 동시에 실행하여 중요한 테스트만 진행합니다.
- 가장 자주 사용되는 신서틱(Synthetic) 테스트를 **즐겨찾기**에 추가하여 목록을 생성합니다.

## 요구 사항

- **Datadog 계정**: 확장 프로그램에는 Datadog 계정이 필요합니다. Datadog을 처음 사용하는 경우 [Datadog 웹 사이트][2]로 이동하여 Datadog의 주목할 만한 도구에 대해 자세히 알아보고 무료 체험에 가입하세요. 
- **신서틱(Synthetic) 테스트**: 확장 프로그램을 통해 신서틱(Synthetic) 테스트를 실행할 수 있습니다. 신서틱 테스트를 아직 설정하지 않았다면 [Datadog에서 테스트를 생성하세요][3]. 로컬 환경에서 테스트 실행에 대한 자세한 내용은 [API 테스트 시작하기][4], [브라우저 테스트 시작하기][5] 및 [Continuous Testing Tunnel 문서][1]를 참조하세요.

## 설정

Visual Studio Marketplace에서 [Datadog 확장 프로그램][6]을 설치합니다.

## 로컬에서 신서틱(Synthetic) 테스트를 실행합니다. 

1. Datadog 확장 프로그램을 설치한 후 Datadog에 로그인합니다.
2. 실행할 신서틱(Synthetic) 테스트를 선택합니다. **검색** 아이콘을 클릭하여 특정 테스트를 검색할 수 있습니다.
3. 로컬 환경에서 테스트를 실행하려면 시작 URL 변환을 활성화하고 **설정** 페이지에서 `localhost`URL을 지정하여 신서틱(Synthetic) 테스트의 설정을 업데이트합니다.
4. 테스트를 실행합니다.

{{< img src="developers/ide_integrations/vscode/test_configuration_modified_starturl.png" alt="테스트 설정 패널 및 설정 페이지에서 신서틱 테스트의 시작 URL을 로컬 호스트 URL로 지정할 수 있습니다." style="width:100%;" >}}

## 권한 허용

기본적으로 [Datadog Admin 및 Datadog Standard 역할][7]을 가진 사용자만 신서틱(Synthetic) HTTP 및 브라우저 테스트를 생성, 편집 및 삭제할 수 있습니다. 신서틱(Synthetic) HTTP 및 브라우저 테스트에 대한 생성, 편집 및 삭제 액세스 권한을 얻으려면 사용자를 이 두 가지 [기본 역할][7] 중 하나로 업그레이드하십시오[7].

[커스텀 역할 기능][8]을 사용하는 경우 `synthetics_read`및 `synthetics_write`사용 권한을 포함하는 커스텀 역할에 사용자를 추가합니다.

## 피드백

피드백을 공유하려면 [team-ide-integration@datadoghq.com ][9]로 이메일을 보내주세요.

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