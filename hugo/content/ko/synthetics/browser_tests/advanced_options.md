---
aliases:
- /ko/synthetics/guide/browser-tests-switch-tabs/
- /ko/synthetics/guide/browser-test-self-maintenance/
description: 브라우저 테스트 단계에 대한 고급 옵션 구성
further_reading:
- link: https://www.datadoghq.com/blog/browser-tests/
  tag: 블로그
  text: Synthetic 브라우저 테스트를 통한 사용자 경험 모니터링
- link: /synthetics/browser_tests/test_steps/
  tag: 설명서
  text: 브라우저 테스트 단계 알아보기
title: 브라우저 테스트 단계를 위한 고급 옵션
---
## 개요 {#overview}

이 페이지에서는 Synthetic Monitoring 브라우저 테스트를 위한 고급 옵션을 설명합니다. 

## 요소 찾기 {#locate-an-element}

### Datadog 알고리즘 {#datadog-algorithm}

프론트엔드 팀이 변경 사항을 구현할 때 테스트가 간혹 실패하고, 실제 애플리케이션 문제가 아닌 테스트 내 식별자로 인해 경보가 발생할 수 있습니다. 이러한 불안정성은 엔드투엔드 테스트의 골칫거리입니다.

불안정한 테스트를 방지하기 위해 Datadog은 로케이터 세트를 활용하여 브라우저 테스트의 요소를 대상으로 지정하는 알고리즘을 사용합니다. UI의 작은 변경으로 요소가 수정될 수 있습니다(예: 다른 위치로 이동). 브라우저 테스트는 변경의 영향을 받지 않는 참조 지점을 기반으로 요소를 자동으로 다시 찾습니다. 

테스트가 성공적으로 실행되면 브라우저 테스트는 업데이트된 값으로 손상된 로케이터를 다시 계산(또는 "자동 복구")하여 사소한 UI 변경으로 인해 테스트가 중단되지 않도록 하고 애플리케이션의 UI에 자동으로 적응합니다. 

브라우저 테스트가 예상치 못한 변경 사항을 검증하지 않도록 하려면 테스트 생성 시 [어설션][5]을 사용하세요. 어설션을 사용하면 테스트 단계 여정과 관련된 예상 동작과 예상되지 않는 동작을 정의할 수 있습니다. 

### 사용자 지정 로케이터 {#user-specified-locator}

기본적으로 브라우저 테스트는 Datadog 로케이터 시스템을 사용합니다. 테스트가 상호 작용할 특정 요소(예: 결제 버튼)를 검색할 때, 특정 XPath나 특정 CSS 선택자가 있는 요소를 찾는 대신 테스트는 여러 다른 참조 지점(예: XPath, 텍스트, 클래스 및 주변 요소)을 사용하여 요소를 찾습니다. 

이러한 참조 지점은 각각 요소를 고유하게 정의하는 로케이터 세트가 됩니다. Datadog 로케이터 시스템을 사용하면 테스트가 스스로 유지 관리되므로 사용자 지정 선택자는 예외적인 경우에만 사용해야 합니다.

사용자 지정 선택자는 레코더에서 페이지의 임의의 요소에 대해 관심 있는 단계(예: **클릭**, **호버** 또는 **어설션**)를 수행하여 생성됩니다. 이는 수행해야 할 단계의 종류를 지정합니다.

특정 식별자를 사용하려면(예: 요소의 내용과 관계없이 드롭다운 메뉴의 `nth` 요소를 클릭하려면):

1. [단계][1]를 기록하거나 기록에 수동으로 추가합니다.
2. 기록된 단계를 클릭한 다음 {{< ui >}}Advanced options{{< /ui >}} 항목을 클릭합니다.
3. HTML 요소에 대해 {{< ui >}}User Specified Locator{{< /ui >}} 아래에 XPath 1.0 선택기 또는 CSS 클래스/ID를 입력합니다(예: `div`, `h1` 또는 `.hero-body`).
4. 선택적으로 handlebars(`{{`) 구문을 사용하여 동적 콘텐츠를 삽입합니다. 미리 채워진 변수 드롭다운 목록이 표시됩니다:

{{< img src="synthetics/browser_tests/advanced_options/advanced_user_locator_2.png" alt="변수가 포함된 핸들바 구문이 강조 표시된 사용자 지정 로케이터 필드" style="width:70%">}}

5. 요소를 정의한 후 {{< ui >}}Highlight{{< /ui >}} 항목을 클릭하여 오른쪽 기록에서 해당 요소를 강조 표시합니다.

기본적으로 {{< ui >}}If user specified locator fails, fail test{{< /ui >}} 확인란이 선택되어 있습니다. 즉, 정의된 로케이터가 실패하면 테스트는 실패한 것으로 간주됩니다.

{{< img src="synthetics/browser_tests/advanced_options/css_2.mp4" alt="Test Highlighted Element" video=true >}}

{{< ui >}}If user specified locator fails, fail test{{< /ui >}} 상자의 선택을 해제하면 일반 브라우저 테스트 알고리즘으로 돌아가도록 설정할 수 있습니다.

{{< img src="synthetics/browser_tests/advanced_options/fail_test.png" alt="Fail test 옵션" style="width:70%">}}


## 제한 시간 {#timeout}

브라우저 테스트가 요소를 찾을 수 없는 경우 60초 동안 단계를 재시도합니다.

테스트가 단계의 대상 요소를 찾을 때 대기하는 시간을 줄이거나, 최대 300초까지 늘릴 수 있습니다.

{{< img src="synthetics/browser_tests/advanced_options/time_before_fail.png" alt="Time before fail" style="width:50%">}}

## 선택적 단계 {#optional-step}

팝업을 닫는 단계와 같이 단계를 선택 사항으로 만들려면 {{< ui >}}If this step fails, continue to next step{{< /ui >}} 항목을 선택합니다. 단계가 제한 시간(기본값 60초) 이후에 실패하면 테스트는 다음 단계를 실행합니다.

이 옵션은 기본적으로 선택되어 있는 {{< ui >}}If this step fails, mark test as failed{{< /ui >}}도 표시합니다. 이 옵션이 선택되어 있으면 나머지 단계를 실행한 후 테스트가 실패로 처리됩니다. 선택적 단계가 실패할 때 테스트를 통과 상태로 유지하려면 이 옵션의 선택을 해제하세요.

{{< img src="synthetics/browser_tests/advanced_options/optional_step_2.png" alt="continue to next step이 선택되고 mark test as failed가 선택 해제된 단계의 고급 옵션입니다." style="width:50%">}}

## Exit on success {#exit-on-success}

단계가 성공적으로 완료된 후 테스트를 종료하도록 이 옵션을 설정하세요. 이렇게 하면 불필요한 단계가 실행되는 것을 방지하고 테스트가 실패로 표시되는 것을 피할 수 있습니다.

{{< img src="synthetics/browser_tests/advanced_options/exit_on_success_browser.png" alt="Exit on success" style="width:50%">}}

## Always run this step {#always-run-this-step}

이전 단계가 실패했더라도 이 단계를 실행하도록 이 옵션을 설정하세요. 이는 후속 단계를 진행하려는 경우 정리 작업에 유용할 수 있습니다.

{{< img src="synthetics/browser_tests/advanced_options/always_run_step.png" alt="이전 단계가 실패해도 항상 단계 실행" style="width:50%">}}


## Prevent screenshot capture {#prevent-screenshot-capture}

테스트 실행 시 단계 스크린샷이 캡처되지 않도록 할 수 있습니다. 이는 테스트 결과에 민감한 데이터가 포함되지 않도록 하는 데 도움이 됩니다. 실패 원인을 파악하기가 더 어려워질 수 있으므로 신중하게 사용하세요. 자세한 내용은 [Synthetic Monitoring 데이터 보안][2]을 참조하세요.

{{< img src="synthetics/browser_tests/advanced_options/screenshot_capture_option.png" alt="스크린샷 캡처 옵션" style="width:50%">}}

**참고:** 이 기능은 브라우저 테스트 구성의 [고급 옵션][3]으로 전역 테스트 수준에서도 사용할 수 있습니다.

## 하위 테스트 {#subtests}

[하위 테스트][4]의 고급 옵션을 사용하면 하위 테스트를 재생할 위치를 선택하고 하위 테스트가 실패할 경우 브라우저 테스트의 동작을 설정할 수 있습니다.

{{< img src="synthetics/browser_tests/advanced_options/subtest_advanced_2.png" alt="브라우저 테스트의 하위 테스트를 위한 고급 옵션" style="width:60%">}}

### 하위 테스트 창 설정 {#set-the-subtest-window}

* {{< ui >}}Main (default){{< /ui >}}: 하위 테스트가 다른 단계와 순차적으로 메인 창에서 재생됩니다.
* {{< ui >}}New{{< /ui >}}: 하위 테스트가 새 창에서 재생되며, 하위 테스트가 끝나면 창이 닫힙니다. 즉, 창을 재사용할 수 없습니다.
* {{< ui >}}Specific window{{< /ui >}}: 하위 테스트가 번호가 지정된 창에서 재생되며, 다른 하위 테스트에서 재사용할 수 있습니다.

하위 테스트를 메인 창에서 열면 이전 단계의 URL을 사용하므로 하위 테스트가 메인 테스트의 연속으로 진행됩니다. 하위 테스트를 새 창이나 특정 창에서 열면 테스트가 하위 테스트 시작 URL부터 실행됩니다.

### 실패 동작 설정 {#set-failure-behavior}

하위 테스트가 실패해도 상위 테스트가 계속되도록 {{< ui >}}If this step fails, continue to next step{{< /ui >}} 항목을 선택하세요. {{< ui >}}If this step fails, mark test as failed{{< /ui >}} 항목은 기본적으로 선택되어 있습니다. 이 옵션이 선택된 상태에서는 상위 테스트가 나머지 단계를 실행한 후 실패 처리됩니다. 하위 테스트가 실패할 때 상위 테스트를 통과 상태로 유지하려면 이 옵션의 선택을 해제하세요.

### 성공 동작 설정 {#set-success-behavior}

브라우저 테스트가 즉시 중지되고 통과로 표시되도록 하려면 {{< ui >}}If this step succeeds, stop this test and mark it as passed{{< /ui >}} 항목을 클릭하세요.

### 실행 동작 설정 {#set-execution-behavior}

브라우저 테스트의 이전 단계가 실패했더라도 이 단계가 실행되도록 하려면 {{< ui >}}Always run this step{{< /ui >}} 항목을 클릭하세요.

### 하위 테스트에서 변수 재정의 {#override-variables-in-subtests}

브라우저 테스트 하위 테스트에서 변수 값을 재정의하려면 하위 테스트에서 변수 이름을 지정하고 상위 테스트에서 동일한 변수 이름을 사용하세요. 그러면 브라우저 테스트가 하위 테스트 값을 재정의합니다.

자세한 내용은 [브라우저 테스트 단계][4]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/browser_tests/test_steps/
[2]: /ko/data_security/synthetics/
[3]: /ko/synthetics/browser_tests/?tab=privacy#test-configuration
[4]: /ko/synthetics/browser_tests/test_steps/#subtests
[5]: /ko/synthetics/browser_tests/test_steps/#assertion