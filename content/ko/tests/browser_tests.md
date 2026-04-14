---
aliases:
- /ko/continuous_integration/guides/rum_integration
- /ko/continuous_integration/integrate_tests/browser_tests
- /ko/continuous_integration/tests/browser_tests
description: CI Visibility 및 RUM을 사용하여 테스트 결과를 브라우저 세션 및 세션 재생과 연결하는 방법을 알아보세요.
further_reading:
- link: /continuous_integration/tests
  tag: 설명서
  text: 테스트 가시성에 대해 알아보기
- link: /real_user_monitoring/browser
  tag: 설명서
  text: RUM 브라우저 모니터링에 대해 알아보기
title: RUM으로 브라우저 테스트 계측
---

## 개요

Test Visibility는 Datadog [실제 사용자 모니터링][2]과 통합되어 브라우저 테스트 심층 분석을 위한 도구를 제공합니다.

### 호환성

RUM 통합을 활성화하려면 테스트에 대해 [Test Visibility][1]가 설정되어 있고 테스트 중인 애플리케이션이 [RUM][2]을 사용하여 계측되었는지 확인하세요.

RUM 통합은 Cypress 브라우저 테스트 및 Selenium 기반 브라우저 테스트에 지원됩니다.

#### Cypress

* `cypress` >= 6.7.0
* `dd-trace-js` >= 1.7.0
* `browser-sdk` >= 3.11.0

#### Selenium

* `selenium-js` >= 4.11.0, `dd-trace-js` >= 5.11.0 / >= 4.35.0
* `selenium-java` >= 3.141.59, `dd-trace-java` >= 1.34.0
* `selenium-dotnet` >= 3.0.0, `dd-trace-dotnet` >= 2.51.0
* `selenium-ruby` >= 4.0.0, `datadog-ci` >= 1.0.0.beta6
* `browser-sdk` >= 5.15.0

<blockquote class="alert alert-info">
브라우저 SDK v5.0.0부터는 테스트 중에 `allowUntrustedEvents` 초기화 파라미터를 활성화하여 클릭을 올바르게 캡처할 수 있습니다.
</blockquote>

## 브라우저 테스트와 RUM 연결

Cypress 또는 Selenium을 사용하여 브라우저 테스트를 실행하고 테스트 중인 애플리케이션이 [실제 사용자 모니터링][2]을 사용하여 계측되는 경우 테스트 결과와 생성된 RUM 브라우저 세션 및 세션 재생이 자동으로 연결됩니다.

**Browser Sessions** 탭은 Test Visibility 테스트 세부정보 사이드 패널에 표시됩니다.

{{< img src="ci/ci-browser-session-tab.png" alt="Browser Session Tab in Test Detail" style="width:100%;">}}

RUM 세션에는 [RUM이 일반적으로 수집][3]하는 모든 데이터가 있으므로 브라우저 테스트에서 발생하는 잠재적 오류(예: 예상치 못한 오류)를 디버깅할 수 있습니다.

{{< img src="ci/ci-browser-session-tab-errors.png" alt="Browser Session Tab Errors in Test Detail" style="width:100%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tests/setup/
[2]: /ko/real_user_monitoring/browser/
[3]: /ko/real_user_monitoring/browser/data_collected/