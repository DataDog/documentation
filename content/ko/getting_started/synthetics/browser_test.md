---
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: 학습 센터
  text: 신서틱(Synthetic) 테스트 소개
- link: /synthetics/browser_tests
  tag: 설명서
  text: 브라우저 테스트 알아보기
- link: /getting_started/synthetics/private_location
  tag: 설명서
  text: 프라이빗 위치 알아보기
- link: /continuous_testing/cicd_integrations
  tag: 설명서
  text: CI/CD 파이프라인에서 신서틱 테스트 트리거하는 방법 알아보기
- link: /synthetics/identify_synthetics_bots
  tag: 설명서
  text: API 테스트용 신서틱 봇을 식별하는 방법 알아보기
- link: /synthetics/guide/synthetic-test-monitors
  tag: 설명서
  text: 신서틱 테스트 모니터에 대해 알아보기
title: 브라우저 테스트 시작하기
---

## 개요

[브라우저 테스트][1]는 Datadog이 웹 애플리케이션에서 실행하는 시나리오입니다. 주기적 간격을 설정하여 여러 위치, 기기, 브라우저에서 테스트를 실행하거나 CI/CD 파이프라인에서 테스트를 할 수 있습니다. 이러한 테스트를 통해 사용자가 애플리케이션에서 **주요 비즈니스 트랜잭션**을 수행할 수 있는지, 그리고 최근 코드 변경으로 인해 부정적인 영향을 받지 않는지 확인할 수 있습니다.

## 브라우저 테스트 생성

아래 예시는 카트에 아이템을 추가한 후 결제에 성공하기까지의 사용자 여정을 매핑하는 브라우저 테스트를 생성하는 방법을 보여줍니다.

### 테스트 상세 설정

1. Datadog 사이트의 왼쪽 메뉴에서 **디지털 경험** 위로 마우스를 올리고 **[테스트][2]**(**신서틱(Synthetic) 모니터링 & 테스트** 하단의)를 선택합니다.
2. 상단 오른쪽 모서리에서 **New Test** > **[Browser Test][3]**를 클릭합니다.

다음 옵션 중 하나를 사용하여 테스트를 생성할 수 있습니다.

- **템플릿에서 테스트 생성하기**:

    1. 사전에 채워진 템플릿 중 하나에 마우스를 올리고 **템플릿 보기**를 클릭합니다. 테스트 세부 정보, 경고 조건, 단계, 옵션 변수가 포함된, 사전에 채워진 설정 정보가 표시되는 사이드 패널이 열립니다.
    2. **+테스트 생성하기**를 클릭하면 사전 입력된 설정 옵션을 검토하고 편집할 수 있는 설정 페이지가 열립니다. 표시되는 필드는 테스트 처음 생성 시 사용할 수 있는 필드와 동일합니다.
    3. 오른쪽 상단의 **저장 후 종료**를 클릭하여 브라우저 테스트를 제출합니다.<br /><br>

       {{< img src="/synthetics/browser_tests/synthetics_templates_browser.mp4" alt="템플릿을 사용한 Synthetics 브라우저 테스트 랜딩 페이지 영상" video="true" >}}

- **테스트 처음부터 빌드하기**:

    1. 새 브라우저 테스트를 처음부터 시작하려면 **+** 템플릿을 클릭합니다.
    1. 모니터링할 웹사이트 URL을 추가합니다. 어디에서부터 시작해야 할지 모르겠다면 테스트용 이커머스 웹 애플리케이션인 `https://www.shopist.io`를 사용해보세요.
    2. **Advanced Options**를 선택해 사용자 설정 요청 옵션, 인증서, 인증 자격 등을 설정할 수 있습니다.
    3. 테스트 이름을 지정하고 `env:prod` 및 `app:shopist` 등의 태그를 설정하세요. 태그를 사용하면 테스트 스위트(suite)를 정리하고, 홈페이지에서 관심 있는 테스트를 빠르게 찾을 수 있습니다.
    4. 테스트할 브라우저와 기기를 선택합니다.
    5. 브라우저 테스트를 제출하려면 **레코딩 저장 및 편집**을 클릭합니다.

### 위치 선택하기

테스트를 실행할 **Managed Locations** 또는 **Private Locations** 하나 이상을 선택하세요.

관리형 위치(Managed locations)를 사용하면 공개용 웹사이트와 엔드포인트를 테스트할 수 있습니다. 내부 애플리케이션을 테스트하거나 별도 지역의 사용자 행동을 시뮬레이션하는 경우에는 [프라이빗 위치(private locations)][4]를 선택하세요.

Shopist 애플리케이션은 `https://www.shopist.io/`에 공개되어 있으므로, 관리형 위치를 선택해 테스트를 실행할 수 있습니다.

### 테스트 빈도 지정

테스트를 실행할 빈도를 선택합니다. 기본 빈도인 1시간을 그대로 둘 수도 있습니다.

신서틱 테스트를 일정대로 실행하는 것과 더불어 [CI/CD 파이프라인][5]에서 수동으로 또는 직접 트리거할 수 있습니다.

### 경고 조건 정의

경고 조건을 정의하여 이따금 일시적으로 발생하는 네트워크 문제 등에 대하여 테스트가 트리거되지 않도록 설정할 수 있습니다. 이렇게 하면 애플리케이션에 실제 문제가 발생한 경우에만 경고를 받습니다.

위치에서 실행할 수 없다고 판단하기 전에 발생해야 하는 연속 실패 횟수를 지정할 수 있습니다.

```text
Retry test 2 times after 300 ms in case of failure
```

또한 애플리케이션이 특정 시간 동안, 특정 개수의 위치에서 실행에 실패했을 때만 알림을 보내도록 테스트를 설정할 수도 있습니다. 다음 예시에서는 서로 다른 위치 두 곳에서 테스트가 3분간 실패할 경우 알림을 전송하도록 경고 규칙이 설정되어 있습니다.

```text
An alert is triggered if your test fails for 3 minutes from any 2 of 13 locations
```

### 테스트 모니터링 설정

경고 메시지를 설정하고 테스트 경고를 보낼 이메일 주소를 추가하세요

{{< img src="getting_started/synthetics/configured-browser-test.mp4" alt="브라우저 테스트 설정 예시" video="true" >}}

또한 Slack, PagerDuty, Microsoft Teams, 웹훅 등의 [알림 통합][6]을 사용할 수도 있습니다. 이러한 알림 도구에서 신서틱 경고를 트리거하려면 먼저 해당하는 [통합][7]을 설정하셔야 합니다.

테스트 설정 및 모니터링을 저장할 준비가 되면, **레코딩 저장 및 편집**을 클릭합니다.

자세한 내용은 [신서틱(Synthetic) 테스트 모니터링 사용][8]을 참조하세요.

## 기록 생성하기

테스트 설정을 저장하면 Datadog은 [Datadog 테스트 레코더][9] Chrome 확장 프로그램을 다운로드하여 설치하라는 메시지를 표시합니다. (해당 Chrome 확장 프로그램은 Microsoft Edge 브라우저에도 설치할 수 있습니다.)

확장 프로그램을 설치했다면 **Start Recording**을 클릭해 테스트 절차 기록을 시작하세요.

레코더 페이지 오른쪽의 iframe에서 페이지를 탐색합니다. div, 이미지 또는 페이지의 아무 영역이나 선택하면 Datadog이 브라우저 테스트에서 관련 단계를 기록 및 생성합니다.

테스트 절차 기록을 종료하려면 **Stop Recording**을 클릭하세요.

아래 예시는 장바구니에 상품을 추가한 후 `https://www.shopist.io`에서 정상적으로 결제 완료할 때까지 사용자 여정을 매핑하는 방법을 보여줍니다.

1. 샘플 웹사이트에서 **Chairs** 등의 가구 섹션 중 하나로 이동한 다음 **Add to cart**를 선택합니다.
2. **Cart**와 **Checkout**을 클릭합니다.
3. **Add New** 아래에서 **Assertion**을 선택하고 **"Test that some text is present on the active page"**를 클릭합니다.
4. 결제 완료 후 "Thank you!" 문구가 표시되는지 확인하려면 **Value** 필드에서 `Thank you!`를 입력하세요.
5. **Save & Quit**를 누릅니다.

**Assertion**을 사용해 브라우저 테스트를 완료하는 것이 중요합니다. 이렇게 해야 애플리케이션이 정의된 사용자 여정 이후에 예상한 상태에 확실히 도달하기 때문입니다.

{{< img src="getting_started/synthetics/record-test.mp4" alt="테스트 절차 기록" video="true" >}}

예시 웹사이트는 의도적으로 실패하는 오류를 규칙적으로 발생시킵니다. **해당 테스트에 대한 모니터링 설정** 필드에 이메일 주소를 포함하면, 테스트가 실패하고 복원되었을 때 이메일 알림을 받게 됩니다.

## 테스트 결과 보기

**Browser Test** 상세 페이지에는 테스트 설정 개요, 글로벌 및 위치별 업타임, 상호작용하기까지 걸린 시간과 테스트 기간에 대한 그래프, 성공한 테스트 결과와 실패한 테스트 결과 샘플, 모든 테스트 결과의 목록이 표시됩니다. 테스트 길이에 따라 첫 번째 테스트 결과가 표시될 때까지 몇 분 기다려야 할 수 있습니다.

[실패한 테스트][10]를 트러블슈팅하려면 실패한 테스트 결과를 선택하고 실패한 단계에 이르기까지의 스크린샷을 확인하세요. 잠재적인 **[Errors & Warnings][11]**, **[Resources][12]**, 및 **[Core Web Vitals][13]**를 확인하여 문제를 진단할 수도 있습니다.

아래 예시에서는 서버 타임아웃으로 인하여 실패한 테스트 사례를 볼 수 있습니다.

{{< img src="getting_started/synthetics/browser-test-failure.mp4" alt="브라우저 테스트 실패" video="true" >}}

Datadog의 [신서틱 모니터링과 APM 통합][14]을 이용하면 **트레이스** 탭에서 실행된 테스트를 통해 백엔드에서 생성된 트레이스를 확인할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/synthetics/browser_tests/
[2]: https://app.datadoghq.com/synthetics/tests
[3]: https://app.datadoghq.com/synthetics/browser/create
[4]: /ko/getting_started/synthetics/private_location
[5]: /ko/continuous_testing/cicd_integrations
[6]: /ko/integrations/#cat-notification
[7]: https://app.datadoghq.com/account/settings
[8]: /ko/synthetics/guide/synthetic-test-monitors
[9]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[10]: /ko/synthetics/browser_tests/test_results#test-failure
[11]: /ko/synthetics/browser_tests/test_results#errors
[12]: /ko/synthetics/browser_tests/test_results#resources
[13]: /ko/synthetics/browser_tests/test_results#page-performance
[14]: /ko/synthetics/apm/